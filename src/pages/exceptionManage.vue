<template>
  <div id="pageWrapper">
    <div id="addBox">
      <div id="addButton">
        <a-button @click="addException" type="primary" size="small">新增</a-button>
      </div>
    </div>
    <div id="tableWrapper">
      <a-table
        :columns="columns"
        :dataSource="data"
        bordered
        :pagination="false"
        :loading="isLoading"
      >
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
              title="确定要删除此异常?"
              @confirm="confirmDelete(record)"
              @cancel="cancelDelete(record)"
              okText="确定"
              cancelText="取消"
            >
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>
            <a-button @click="modifyException(record)" type="primary" size="small">编辑</a-button>
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
    width: "2%",
    scopedSlots: { customRender: "key" },
    align: "center"
  },
  {
    title: "异常编号",
    dataIndex: "code",
    width: "10%",
    scopedSlots: { customRender: "name" },
    align: "center"
  },
  {
    title: "异常类型",
    dataIndex: "deviceType",
    width: "10%",
    scopedSlots: { customRender: "name" },
    align: "center"
  },
  {
    title: "备注",
    dataIndex: "remark",
    width: "10%",
    scopedSlots: { customRender: "remark" },
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "10%",
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
      isLoading: true,
      page:1
    };
  },
  methods: {
    modifyException(record) {
      this.$router.push({
        path: "/modifyException",
        query: { title: "异常管理", exceptionId: record.id }
      });
    },
    addException() {
      this.$router.push({ path: "addException", query: { title: "异常管理" } });
    },
    confirmDelete(fualt) {
      this.$http.toDeleteExceptionInfo(fualt.id).then(res => {
        console.log(res)
        if (res.data.success) {
          this.$message.success("删除成功");
          this.GetExceptionManageList();
        }else {
          this.$message.error(res.data.errorInfo);
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
    GetExceptionManageList() {
      this.isLoading = true;
      this.$http.toGetExceptionManageList(this.page).then(res => {
        var i = 1;
        if (res.data.success) {
          this.isLoading = false;
          this.data = res.data.data.map(res => {
            res["key"] = i++;
            res.deviceType = res.type == 1 ? "汇聚机房" : "弱电间";
            return res;
          });
          this.recordsTotal = res.data.recordsTotal;
        }else {
              this.$message.error(res.data.message);
            }
      });
    },
    changePage(page){
        this.page=page;
        this.$nextTick(()=>{
          this.GetExceptionManageList()
        })
    }
  },
  created() {
    this.GetExceptionManageList();
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
</style>
