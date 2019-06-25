<template>
  <div id="pageWrapper">
    <div id="addBox">
      <div id="addButton"></div>
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
            <a-button @click="modifyBuildingPosition(record)" type="primary" size="small">编辑</a-button>
          </div>
        </template>
      </a-table>
      <div id="pagination" v-show="!isLoading">
        <div id="total">
          共
          <span style="margin:0 5px;">{{recordsTotal}}</span>条数据
        </div>
        <div id="paginationBox">
          <a-pagination @change="changePage" v-model="page" :total="recordsTotal" :pageSize="12" :hideOnSinglePage="true" />
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
    title: "楼栋编号",
    dataIndex: "cmdbCode",
    width: "10%",
    scopedSlots: { customRender: "cmdbCode" },
    align: "center",
    align: "center"
  },
  {
    title: "楼栋名称",
    dataIndex: "cmdbDescription",
    width: "15%",
    scopedSlots: { customRender: "cmdbDescription" },
    align: "center"
  },
  {
    title: "图片类型",
    dataIndex: "imageType",
    width: "10%",
    scopedSlots: { customRender: "imageType" },
    align: "center"
  },
  {
    title: "X坐标",
    dataIndex: "xPosition",
    width: "10%",
    scopedSlots: { customRender: "xPosition" },
    align: "center"
  },
  {
    title: "Y坐标",
    dataIndex: "yPosition",
    width: "10%",
    scopedSlots: { customRender: "yPosition" },
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
      recordsTotal: 0,
      page: 1,
      isLoading: true
    };
  },
  methods: {
    modifyBuildingPosition(record) {
      this.$router.push({
        path: "/modifyBuildingPosition",
        query: { title: "楼栋坐标信息管理", id: record.id,menuIconId:9 }
      });
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
    getBuildingPositionList() {
      this.$http.toGetBuildingPositionList(this.page).then(res => {
        this.isLoading = true;
        var i = 1;
        if (res.data.success) {
          this.data = res.data.data.filter(res => {
            res["key"] = i++;
            res.status = res.status ? "正常" : "异常";
            return true;
          });
          this.recordsTotal = res.data.recordsTotal;
          this.isLoading = false;
          this.$nextTick(() => {
            this.addOrder()
          });
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    changePage(page) {
      this.page = page;
      this.$nextTick(() => {
        this.getBuildingPositionList();
      });
    },
    addOrder() {
      var i = 1 + (this.page - 1) * 12;
      this.data = this.data.filter(item => {
        item["key"] = i++;
        return true;
      });
    },
  },
  created() {
    this.getBuildingPositionList();
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
#pagination {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
}
#total {
  font-size: 15px;
}
</style>
