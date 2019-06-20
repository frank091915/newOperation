<template>
  <div id="pageWrapper">
    <div id="headerWrapper">
      <div id="searchByNamesInput">
          <a-input v-model="searchName" @keydown.enter="search" placeholder="请输入姓名"  size="small"/>
          <a-button  @click="search" type="primary" size="small" style="margin-left:10px">搜索</a-button>
      </div>
      <div id="addBox">
        <div id="addButton">
          <a-button @click="addUser" type="primary" size="small">新增</a-button>
        </div>
      </div>
    </div>
    <div id="tableWrapper">
      <a-table :columns="columns" :dataSource="data" bordered :pagination="false" :loading="isLoading">
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
              title="确定要删除此用户?"
              @confirm="confirmDelete(record)"
              @cancel="cancelDelete(record)"
              okText="确定"
              cancelText="取消"
            >
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>

            <a-button type="primary" @click="modifyUser(record)" size="small">编辑</a-button>
            <a-button type="primary" @click="ResetPassword(record)" size="small">重置密码</a-button>
            <a-button type="primary" @click="alarmSet(record)" size="small">告警设置</a-button>
          </div>
        </template>
      </a-table>
      <div id="pagination" v-show="!isLoading"> 
          <div id="total">
            共<span style="margin:0 5px;">{{recordsTotal}}</span>条数据
          </div>
          <div id="paginationBox">
            <a-pagination @change="changePage" v-model="page" :total="recordsTotal"   :pageSize="12" :hideOnSinglePage="true" />
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
    title: "工号",
    dataIndex: "jobNum",
    width: "8%",
    scopedSlots: { customRender: "jobNum" },
    align: "center"
  },
  {
    title: "姓名",
    dataIndex: "name",
    width: "8%",
    scopedSlots: { customRender: "name" },
    align: "center"
  },
  {
    title: "用户名",
    dataIndex: "username",
    width: "8%",
    scopedSlots: { customRender: "name" },
    align: "center"
  },
  {
    title: "手机号",
    dataIndex: "phone",
    width: "8%",
    scopedSlots: { customRender: "phone" },
    align: "center"
  },
  {
    title: "微信号",
    dataIndex: "wxId",
    width: "8%",
    scopedSlots: { customRender: "phone" },
    align: "center"
  },
  {
    title: "邮箱地址",
    dataIndex: "eMail",
    width: "8%",
    scopedSlots: { customRender: "eMail" },
    align: "center"
  },
  {
    title: "角色",
    dataIndex: "roles[0].name",
    width: "8%",
    scopedSlots: { customRender: "role" },
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "status",
    width: "8%",
    scopedSlots: { customRender: "status" },
    align: "center"
  },
  {
    title: "备注",
    dataIndex: "remark",
    width: "8%",
    scopedSlots: { customRender: "remark" },
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "18%",
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
      page:1,
      isLoading:true,
      searchName:''
    };
  },
  methods: {
    addUser() {
      this.$router.push({ path: "/addUser", query: { title: "用户管理" } });
    },
    search(){
        this.getUserList()
    },
    modifyUser(e) {
      this.$router.push({
        path: "/modifyUser",
        query: { title: "用户管理", id: e.id }
      });
    },
    alarmSet(e) {
      this.$router.push({
        path: "/alarmSet",
        query: { title: "用户管理", id: e.id }
      });
    },
    confirmDelete(user) {
      this.$http.toDeleteUser(user.id).then(res => {
        if (res.data.success) {
          this.$message.success("删除成功");
          this.getUserList();
        }else {
              this.$message.error(res.data.message);
            }
      });
    },
    ResetPassword(user) {
      this.$http.toResetPassword(user.id).then(res => {
        if (res.data.success) {
          if (user.id === window.currentUserId) {
            this.$router.push("/signIn");
          }
          this.$message.success("重置成功");
        }else {
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
    getUserList() {
      this.isLoading=true;
      this.$http.toUserList(this.page,this.searchName).then(res => {
        var i = 1;
        if (res.data.success) {
          this.data = res.data.data.filter(res => {
            res["key"] = i++;
            res.status = res.status ? "正常" : "禁用";
            return true;
          });
          this.recordsTotal = res.data.recordsTotal;
          this.isLoading=false;
          this.$nextTick(() => {});
        }else {
              this.$message.error(res.data.message);
            }
      });
    },
    changePage(page){
      this.page=page;
      this.$nextTick(()=>{
        this.getUserList()
      })
    }
  },
  created() {
    this.getUserList();
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
  height: calc(100% - 50px);
  width: 95%;
  margin-left: 20px;
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
    justify-content: space-between;
    margin-top: 15px;
}
#total{
  font-size: 15px;
}
#headerWrapper{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
