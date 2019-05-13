<template>
  <div id="pageWrapper">
    <div id="searchBox">
      <div id="statusSearch">
        <div class="label">状态：</div>
        <div id="statusSearchInput">
          <a-select
            defaultValue="全部"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            style="width: 230px"
            @change="handleStatusChange"
            :filterOption="filterOption"
            v-model="status"
            size="small"
          >
            <a-select-option :value="nullStatus">全部</a-select-option>
            <a-select-option :value="normalStatus">正常</a-select-option>
            <a-select-option :value="abnormalStatus">异常</a-select-option>
            <a-select-option :value="unknownTwo">异常（cmdb中数据未存储ip）</a-select-option>
            <a-select-option :value="unknownThree">异常（该ip未在zabbix中存储）</a-select-option>
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
          <a-input
            v-model="searchParam"
            placeholder="请输入广播房间名称"
            size="small"
            @keydown.enter="search(true)"
          />
          <a-button @click="search(true)" type="primary" size="small" style="margin-left:15px">搜索</a-button>
        </div>
      </div>
    </div>
    <div id="tableWrapper">
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :loading="isLoading"
        bordered
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

        <template
          v-for="col in ['name','age', 'address','highLight']"
          slot="highLight"
          slot-scope="text, record,highLight"
        >
          <div :key="col" :style="color(record.status)">
            <a-input
              v-if="record.editable"
              style
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <template v-else>{{text}}</template>
          </div>
        </template>
      </a-table>
    </div>
    <div id="pagination" v-show="!isLoading">
      <div id="total">共{{recordsTotal}}条数据</div>
      <div id="paginationBox">
        <a-pagination @change="changePage" v-model="current" :total="recordsTotal" :pageSize="12"/>
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
    scopedSlots: { customRender: "_id" },
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "statusDescription",
    width: "15%",
    scopedSlots: { customRender: "highLight" },
    align: "center"
  },
  {
    title: "广播名称",
    dataIndex: "Description",
    width: "12%",
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
       unknownTwo: 2,
      unknownThree: 3,
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
      // this.isLoading = true;
      // this.statusParam = this.status === "null" ? null : this.status;
      // this.$http
      //   .toGetBroadcastList(1, this.statusParam, this.buildingIdParam)
      //   .then(res => {
      //     if (res.data.success) {
      //       this.recordsTotal = res.data.recordsTotal;
      //       this.data = res.data.data;
      //       this.$nextTick(() => {
      //         this.addOrder();
      //         this.isLoading = false;
      //       });
      //     } else {
      //       this.$message.error(res.data.errorInfo);
      //     }
      //   });
    },
    color(type) {
      if (type != 0) {
        return "color : red";
      }
    },
    handleBuildingChange() {
      // this.isLoading = true;
      // this.buildingIdParam =
      //   this.buildingId === "null" ? null : this.buildingId;
      // this.$http
      //   .toGetBroadcastList(1, this.statusParam, this.buildingIdParam)
      //   .then(res => {
      //     if (res.data.success) {
      //       this.data = res.data.data;
      //       this.recordsTotal = res.data.recordsTotal;
      //       this.$nextTick(() => {
      //         this.addOrder();
      //         this.isLoading = false;
      //       });
      //     } else {
      //       this.$message.error(res.data.errorInfo);
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
      let statusParam =
          this.status === "全部" || this.status === "null" ? null : this.status,
        buildingIdParam =
          this.buildingId === "全部" || this.buildingId === "null"
            ? null
            : this.buildingId;
      if (isSearching) {
        this.page = 1;
        this.$nextTick(() => {
          this.GetBroadcastList(
            this.page,
            statusParam,
            buildingIdParam,
            this.searchParam,
            isSearching
          );
        });
      }else{
        this.GetBroadcastList(
          this.page,
          statusParam,
          buildingIdParam,
          this.searchParam,
          isSearching
        );
      }


    },
    addOrder() {
      var i = 1 + (this.page - 1) * 12;
      this.data = this.data.filter(item => {
        item["key"] = i++;
        return true;
      });
    },
    GetBroadcastList(page, status, buildingId, searchRoom, isSearching) {
      this.isLoading = true;
      this.$http
        .toGetBroadcastList(page, status, buildingId, searchRoom)
        .then(res => {
          if (res.data.success) {
            this.data = res.data.data;
            this.recordsTotal = res.data.recordsTotal;
            if (isSearching) {
              this.current = 1;
            }
            this.$nextTick(() => {
              this.isLoading = false;
              this.addOrder();
            });
          }else {
              this.$message.error(res.data.errorInfo);
            }
        });
    },
    changePage(page) {
      this.page = page;
      this.$nextTick(() => {
        this.search(false);
      });
    }
  },
  created() {
    // 获得门禁列表
    this.GetBroadcastList(this.page);
    // 获取所有楼宇名称
    this.$http.toGetBuildingList().then(res => {
      if (res.data.success) {
        this.allBuildings = res.data.data;
      }
    });
  },
  mounted() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.search(true); // 登录方法名
        return false;
      }
    };
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
