<template>
  <div id="main">
    <div id="searchBox">
      <div id="statusSearch">
        <div class="label">状态：</div>
        <div id="statusSearchInput">
          <a-select
            defaultValue="全部"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            style="width: 200px"
            @change="handleStatusChange"
            :filterOption="filterOption"
            v-model="status"
            size="small"
          >
            <a-select-option :value="nullStatus">全部</a-select-option>
            <a-select-option :value="normalStatus">正常</a-select-option>
            <a-select-option :value="abnormalStatus">异常</a-select-option>
          </a-select>
        </div>
      </div>
      <div id="statusSearch">
        <div class="label">楼宇名称：</div>
        <div id="buildingSearchInput">
          <a-select
            size="small"
            defaultValue="检测中心"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            style="width: 200px"
            @change="handleBuildingChange"
            :filterOption="filterOption"
            v-model="buildingId"
          >
            <a-select-option :value="nullStatus" :key="8874">全部</a-select-option>
            <a-select-option
              v-for="item in allBuildings"
              :value="item.Id"
              :key="item.Id"
            >{{item.Address}}</a-select-option>
          </a-select>
        </div>
      </div>
      <div id="searchByNames">
        <div id="searchByNamesLabel">名称：</div>
        <div id="searchByNamesInput">
          <a-input v-model="searchParam" placeholder="请输入交换机名称" size="small"/>
          <a-button @click="search(true)" type="primary" size="small" style="margin-left:15px">搜索</a-button>
        </div>
      </div>
    </div>
    <div id="tableWrapper">
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        size="small"
        bordered
        :loading="isLoading"
        :scroll="{y:750}"
      >
        <template
          v-for="col in ['name', 'age', 'address']"
          :slot="col"
          slot-scope="text, record, index"
        >
          <div :key="col">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0;padding:10px !important"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <template v-else>{{text}}</template>
          </div>
        </template>
      </a-table>
      <div id="pagination"  v-show="!isLoading">
        <div id="total">共{{recordsTotal}}条数据</div>
        <div id="paginationBox">
          <a-pagination
            @change="changePage"
            v-model="current"
            :total="recordsTotal"
            :pageSize="12"
            v-show="!isLoading"
          />
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
    width: "8%",
    scopedSlots: { customRender: "_id" },
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "statusDescription",
    width: "8%",
    scopedSlots: { customRender: "age" },
    align: "center"
  },
  {
    title: "广播名称",
    dataIndex: "Description",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "型号",
    dataIndex: "Model",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "楼宇名称",
    dataIndex: "buildingName",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "楼层",
    dataIndex: "floorName",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "房间",
    dataIndex: "roomName",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "编号",
    dataIndex: "Code",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "ip地址",
    dataIndex: "SerialNumber",
    width: "8%",
    scopedSlots: { customRender: "SerialNumber" },
    align: "center"
  },
  {
    title: "备注",
    dataIndex: "remarks",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  }
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  });
}

export default {
  name: "posMechine",
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data: [],
      columns,
      recordsTotal: 0,
      status: "全部",
      allBuildings: [],
      buildingId: "全部",
      nullStatus: "null",
      normalStatus: 1,
      abnormalStatus: 0,
      unknowStatus: -1,
      statusParam: "",
      buildingIdParam: "",
      page: 1,
      searchParam: "",
      isLoading: true,
      current: 1
    };
  },
  methods: {
    handleStatusChange() {
      this.statusParam = this.status === "null" ? null : this.status;
      // this.isLoading = true;
      // this.$http
      //   .toGetinterchangerList(1, this.statusParam, this.buildingIdParam)
      //   .then(res => {
      //     if (res.data.success) {
      //       this.isLoading = false;
      //       this.data = res.data.data;
      //       this.recordsTotal = res.data.recordsTotal;
      //       this.$nextTick(() => {
      //         this.addOrder();
      //       });
      //     } else {
      //     }
      //   });
    },
    handleBuildingChange() {
      // this.buildingIdParam =
      //   this.buildingId === "null" ? null : this.buildingId;
      // this.isLoading = true;
      // this.$http
      //   .toGetinterchangerList(1, this.statusParam, this.buildingIdParam)
      //   .then(res => {
      //     if (res.data.success) {
      //       this.isLoading = false;
      //       this.data = res.data.data;
      //       this.recordsTotal = res.data.recordsTotal;
      //       this.$nextTick(() => {
      //         this.addOrder();
      //       });
      //     } else {
      //     }
      //   });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    search(isSearching) {
      let statusParam = this.status === "全部" || this.status === "null" ? null : this.status,
        buildingIdParam = this.buildingId === "全部" ||this.buildingId === "null" ? null : this.buildingId;
        console.log(statusParam)
        if(isSearching){
          this.page=1;
          this.$nextTick(()=>{
            this.GetinterchangerList(
              this.page,
              this.statusParam,
              buildingIdParam,
              this.searchParam,
              isSearching
            );
          })
        }
      this.GetinterchangerList(
        this.page,
        this.statusParam,
        buildingIdParam,
        this.searchParam,
        isSearching
      );
    },
    addOrder() {
      var i = 1 + (this.page-1)*12;
      this.data = this.data.filter(item => {
        item["key"] = i++;
        return true;
      });
    },
    GetinterchangerList(page, statusParam, buildingIdParam, searchParam,isSearching) {
      this.isLoading = true;
      this.$http
        .toGetinterchangerList(page, statusParam, buildingIdParam, searchParam)
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.isLoading = false;
            this.data = res.data.data;
            this.recordsTotal = res.data.recordsTotal;
            if(isSearching){
              this.current=1
            }
            console.log(isSearching)
            this.$nextTick(() => {
              this.addOrder();
            });
          }
        });
    },
    changePage(page) {
      console.log(page);
      this.page = page;
      this.$nextTick(() => {
        console.log(this.page);
        this.search(false);
      });
    }
  },
  created() {
    // 获得门禁列表
    this.GetinterchangerList(this.page);
    // 获取所有楼宇名称
    this.$http.toGetBuildingList().then(res => {
      if (res.data.success) {
        this.allBuildings = res.data.data;
      }
    });
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
#buildingSearch {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
