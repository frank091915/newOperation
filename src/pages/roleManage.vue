<template>
  <div id="main">
    <div id="addBox">
        <div id="addButton">
            <a-button @click="addRole"  type="primary" size="small">新增</a-button>
        </div>
      
    </div>
    <div id="tableWrapper">
      <a-table :columns="columns" :dataSource="data" bordered :pagination="false">
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
              <a-button type="danger"  size="small">删除</a-button>
            </a-popconfirm>

            <a-button @click="modifyRole(record)" type="primary" size="small">编辑</a-button>
          </div>
        </template>
      </a-table>
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
    align:"center"
  },
  {
    title: "角色名称",
    dataIndex: "name",
    width: "10%",
    scopedSlots: { customRender: "name" },
    align:"center",
    align:"center"
  },
  {
    title: "状态",
    dataIndex: "status",
    width: "15%",
    scopedSlots: { customRender: "address" },
    align:"center"
  },
  {
    title: "备注",
    dataIndex: "remark",
    width: "10%",
    scopedSlots: { customRender: "remark" },
    align:"center"
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "10%",
    scopedSlots: { customRender: "operation" },
    align:"center"
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
      recordsTotal: ""
    };
  },
  methods: {
      modifyRole(userInfo){

        this.$router.push({path:"/modifyRole",query:{title:"角色管理",id:userInfo.id}})
      },
      addRole(){
          this.$router.push({path:"/addRole",query:{title:"角色管理"}})
      },
    confirmDelete (user) {
 
        this.$http.toDeleteRole(user.id).then((res)=>{

            if(res.data.success){
                this.$message.success('删除成功')
                this.getRoleList()
            }else{
                this.$message.success('删除失败，请重试')
            }
        })
    },
    cancelDelete (e) {
      console.log(e)

    },
    toDelete(record) {
      console.log(record);
    },
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
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleBlur() {
      console.log("blur");
    },
    handleFocus() {
      console.log("focus");
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    getRoleList(){
    this.$http.toGetRoleManageList().then(res => {
      console.log(res)
      var i=1;
      if(res.data.success){
        this.data=res.data.data.filter((res)=>{
          res["key"]=i++;
          res.status=res.status ? "正常" : "异常"
          return true
        })
        this.recordsTotal=res.data.recordsTotal
        this.$nextTick(()=>{

        })
      }
    });
    }
  },
  created() {
      this.getRoleList()
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
#main {
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
  overflow: auto;
}
#addButton {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
}
</style>
