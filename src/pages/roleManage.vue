<template>
  <div id="pageWrapper">
    <div id="addBox">
      <div id="addButton">
        <a-button @click="addRole" type="primary" size="small">新增</a-button>
         
      </div>
    </div>
    <div id="tableWrapper">
      <a-table 
      :columns="columns" 
      :dataSource="data" 
      :rowClassName="(record, index)=>{
            if(index%2 != 0) return 'table-evenRow'
          } "
      :pagination="false" 
      :loading="isLoading">
        <template
          v-for="col in ['name', 'age', 'address']"
          :slot="col"
          slot-scope="text, record,index"
        >
          <div :key="col">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              :pagination="false"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <template v-else>{{text}}</template>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <a-popconfirm
              title="确定要删除此角色?"
              @confirm="confirmDelete(record)"
              @cancel="cancelDelete(record)"
              okText="确定"
              cancelText="取消"
            >
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>

            <a-button @click="modifyRole(record)" type="primary" size="small">编辑</a-button>
          </div>
        </template>
      </a-table>
          <div id="pagination" v-show="!isLoading"> 
          <div id="paginationBox">
                        <div
              style="height: 25px;font-size:14px;line-height:25px;color: rgba(0, 0, 0, 0.65);margin-right:20px;"
            >
              <span>共</span>
              <span style="margin:0 5px">{{recordsTotal}}</span>
              <span>条记录</span>
            </div>
            <div v-show="recordsTotal >0"  style="margin-right:20px;color: rgba(0, 0, 0, 0.65);">
              <span>{{current}}/{{Math.ceil(recordsTotal/12)}}页</span>
            </div>
            <span
              v-show="recordsTotal >0"
              @click="firstPage"
              :style="{'cursor':current >1 ? 'pointer' : 'not-allowed','margin-right':'15px'}"
              class="pageChanger"
            >首页</span>
            <a-pagination
              @change="changePage"
              v-model="current"
              :total="recordsTotal"
              :pageSize="12"
              size="small"
            />
            <span
              v-show="recordsTotal >0"
              @click="nextPage"
              :style="{'cursor':current+1 <= Math.ceil(recordsTotal/12) ? 'pointer' : 'not-allowed','margin-left':'15px'}"
              class="pageChanger"
            >下一页</span>
            <div
              v-show="recordsTotal >0"
              @keydown.enter="turnPage"
              style="width:108px;height:25px;font-size:14px;margin-left:20px;line-height:25px"
            >
              <span style="margin-right:5px">跳至</span>
              <a-input v-model="turningPage" size="small" style="width:44px;height:20px;" />
              <span style="margin-left:5px">页</span>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: "序号",
    dataIndex: "key",
    scopedSlots: { customRender: "key" },
    align: "center"
  },
  {
    title: "角色名称",
    dataIndex: "name",
    scopedSlots: { customRender: "name" },
    align: "center",
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "status",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "备注",
    dataIndex: "remark",
    scopedSlots: { customRender: "remark" },
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
    align: "center"
  }
];

const data = [];

export default {
  name: "posMechine",
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data,
      columns,
      recordsTotal:0,
      page:1,
      isLoading:true,
      turningPage:"",
      current:1
    };
  },
  methods: {
    nextPage() {
      console.log(this.current + 1, Math.ceil(this.recordsTotal / 12));
      if (this.current < Math.ceil(this.recordsTotal / 12)) {
        this.page = this.current + 1;
        this.current = this.current + 1;
        this.$nextTick(() => {
          this.getRoleList();
        });
      }
    },
    turnPage() {
      console.log(this.turningPage);
      if (
        this.turningPage > 0 &&
        this.turningPage <= Math.ceil(this.recordsTotal / 12)
      ) {
        this.current = parseInt(this.turningPage);
        this.page = parseInt(this.turningPage);
        this.$nextTick(() => {
          this.getRoleList();
        });
      }
    },
    firstPage() {
      if (this.current > 1) {
        this.page = 1;
        this.current = 1;
        this.$nextTick(() => {
          this.getRoleList();
        });
      }
    },
    modifyRole(userInfo) {
      this.$router.push({
        path: "/modifyRole",
        query: { title: "角色管理", id: userInfo.id,menuIconId:9 }
      });
    },
    addRole() {
      this.$router.push({ path: "/addRole", query: { title: "角色管理",menuIconId:9 } });
    },
    confirmDelete(user) {
      this.$http.toDeleteRole(user.id).then(res => {
        if (res.data.success) {
          this.$message.success("删除成功");
          this.getRoleList();
        } else {
              this.$message.error(res.data.message);
            }
      });
    },
    cancelDelete(e) {},
    toDelete(record) {},
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        delete target.editable;
        this.data = newData;
        this.cacheData = newData.map(item => ({ ...item }));
      }
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    },
    handleChange(value) {},
    handleBlur() {},
    handleFocus() {},
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    getRoleList() {
      this.$http.toGetRoleManageList(this.page).then(res => {
        this.isLoading=true;
        var i = 1;
        if (res.data.success) {
          this.data = res.data.data.filter(res => {
            res["key"] = i++;
            res.status = res.status ? "正常" : "关闭";
            return true;
          });
          this.recordsTotal = res.data.recordsTotal;
          this.isLoading=false;
          this.turningPage='';
          this.$nextTick(() => {});
        }else {
              this.$message.error(res.data.message);
            }
      });
    },
    changePage(page){
      this.page=page;
      this.$nextTick(()=>{
        this.getRoleList()
      })
    }
  },
  created() {
    this.getRoleList();
  }
};
</script>
<style scoped>
html {
  height: 100%;
}
body {
  height: 100%;
}
#pageWrapper {
  height: calc(100vh - 91px);
  width:calc(100vw - 300px);
  background-color: #fff;
  box-sizing: border-box;
  margin: 10px 20px 20px 20px;
  border-radius: 8px;
}
#frame {
  height: 100%;
}
#searchBox {
  height: 50px;
  width: 880px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#statusSearch {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#searchByNames {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#searchByNamesInput {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.ant-table-row td {
  background-color: aqua;
  padding: 10px !important;
}
#tableWrapper {
  height: calc(100% - 100px);

}
#addButton {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
}
#pagination{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 3.7vh;
}
#paginationBox{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#total{
  font-size: 15px;
}
</style>
