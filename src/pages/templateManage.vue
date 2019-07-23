<template>
  <div id="pageWrapper">
    <div id="headerWrapper">
      <div id="searchByNamesInput"></div>
      <div id="addBox">
        <div id="addButton">
          <a-button @click="addTemplate" type="primary" size="small">新增</a-button>
        </div>
      </div>
    </div>
    <div id="tableWrapper">
      <a-table 
      :columns="columns" 
      :dataSource="data" 
      :rowClassName="(record, index)=>{
            if(index%2 != 0) return 'table-evenRow'
          } " 
      :pagination="false">
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
              title="确定要删除此模板?"
              @confirm="confirmDelete(record)"
              @cancel="cancelDelete(record)"
              okText="确定"
              cancelText="取消"
            >
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>

            <a-button type="primary" @click="modifyTemplate(record)" size="small">编辑</a-button>
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
    width: "5%",
    scopedSlots: { customRender: "key" },
    align: "center"
  },
  {
    title: "模板名称",
    dataIndex: "name",
    width: "8%",
    scopedSlots: { customRender: "name" },
    align: "center"
  },
  {
    title: "异常类型描述",
    dataIndex: "exceptionDescription",
    width: "8%",
    scopedSlots: { customRender: "exceptionDescription" },
    align: "center"
  },
  {
    title: "模板类型",
    dataIndex: "type",
    width: "8%",
    scopedSlots: { customRender: "type" },
    align: "center"
  },
  {
    title: "模板通知方式",
    dataIndex: "way",
    width: "8%",
    scopedSlots: { customRender: "way" },
    align: "center"
  },
  {
    title: "通知内容",
    dataIndex: "content",
    width: "28%",
    scopedSlots: { customRender: "content" },
    align: "center"
  },
  {
    title: "创建时间",
    dataIndex: "creatTime",
    width: "8%",
    scopedSlots: { customRender: "creatTime" },
    align: "center",
    customRender: (value, row, index) => {
      if(!row.creatTime){
        row.creatTime="——"
      }
      return value
    }
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    width: "8%",
    scopedSlots: { customRender: "updateTime" },
    align: "center",
    customRender: (value, row, index) => {
      if(!row.updateTime){
        row.updateTime="——"
      }
      return value
    }
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "8%",
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
      recordsTotal: 0,
      page: 1,
      current:1,
      isLoading: true,
      searchName: "",
      turningPage: ""
    };
  },
  methods: {
      nextPage() {
      console.log(this.current + 1, Math.ceil(this.recordsTotal / 12));
      if (this.current < Math.ceil(this.recordsTotal / 12)) {
        this.page = this.current + 1;
        this.current = this.current + 1;
        this.$nextTick(() => {
          this.getTemplateList();
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
          this.getTemplateList();
        });
      }
    },
    firstPage() {
      if (this.current > 1) {
        this.page = 1;
        this.current = 1;
        this.$nextTick(() => {
          this.getTemplateList();
        });
      }
    },
    addTemplate() {
      this.$router.push({
        path: "/addTemplate",
        query: { title: "新增模板",menuIconId:8 }
      });
    },
    modifyTemplate(e) {
      this.$router.push({
        path: "/modifyTemplate",
        query: { title: "编辑模板", id: e.id,menuIconId:8}
      });
    },
    confirmDelete(user) {
      this.$http.toDeleteTemplate(user.id).then(res => {
        if (res.data.success) {
          this.$message.success("删除成功");
          this.getTemplateList();
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
    // 获取用户列表
    getTemplateList() {
      this.isLoading = true;
      console.log(this.page)
      this.$http.toTemplateList(this.page).then(res => {
        var i = 1;
        if (res.data.success) {
          this.data = res.data.data.filter(res => {
            res["key"] = i++;
            if (res.type == 1) {
              res.type = "汇聚机房";
            }
            if (res.type == 2) {
              res.type = "弱电间";
            }
            if (res.way == 0) {
              res.way = "通用";
            }
            if (res.way == 1) {
              res.way = "邮件";
            }
            if (res.way == 2) {
              res.way = "短信";
            }
            if (res.way == 3) {
              res.way = "微信";
            }
            return true;
          });
          this.recordsTotal = res.data.recordsTotal;
          this.isLoading = false;
          this.turningPage='';
          this.$nextTick(() => {
            this.data=this.data.map((item)=>{
              if(!item.updateTime){
                item.updateTime="——"
              }
              if(!item.creatTime){
                item.creatTime="——"
              }
              return item;
            })
          });
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    changePage(page) {
      this.page = page;
      this.$nextTick(() => {
        this.getTemplateList();
      });
    }
  },
  created() {
    this.getTemplateList();
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
#pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
}
#paginationBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#total {
  font-size: 15px;
}
#headerWrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
