<template>
  <div id="pageWrapper">
    <div id="searchBox">
      <div id="statusSearch">
        <div class="label">记录状态：</div>
        <div id="statusSearchInput">
          <a-select
            size="small"
            defaultValue="全部"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            style="width: 80px;height:25px"
            @change="handleStatusChange"
            :filterOption="filterOption"
            v-model="status"
          >
            <a-select-option :value="nullStatus">全部</a-select-option>
            <a-select-option :value="ended">已完结</a-select-option>
            <a-select-option :value="notEnded">未完结</a-select-option>
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
            style="width: 120px;height:25px"
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
      <div id="floorSearch">
        <div class="label">楼层：</div>
        <div id="buildingSearchInput">
          <a-select
            size="small"
            defaultValue="检测中心"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            style="width: 165px;height:25px"
            @change="handleFloorChange"
            :filterOption="filterOption"
            v-model="floor"
          >
            <a-select-option :value="nullStatus" :key="8874">全部</a-select-option>
            <a-select-option
              v-for="item in allFloors"
              :value="item.Id"
              :key="item.Id"
            >{{item.Description}}</a-select-option>
          </a-select>
        </div>
      </div>

      <div id="roomSearch">
        <div class="label">房间：</div>
        <div id="buildingSearchInput">
          <a-select
            size="small"
            defaultValue="检测中心"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            style="width:200px;height:25px"
            @change="handleRoomChange"
            :filterOption="filterOption"
            v-model="room"
          >
            <a-select-option :value="nullStatus" :key="8874">全部</a-select-option>
            <a-select-option
              v-for="item in allRooms"
              :value="item.Id"
              :key="item.Id"
            >{{item.Description}}</a-select-option>
          </a-select>
        </div>
      </div>
      <div id="searchByNames">
        <div id="searchByNamesInput">
          <a-button @click="search(true)" type="primary" size="small">搜索</a-button>
        </div>
      </div>
    </div>
    <div id="tableWrapper">
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        size="small"
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
      </a-table>
      <div id="pagination" v-show="!isLoading">
        <div id="total">共{{recordsTotal}}条数据</div>
        <div id="paginationBox">
          <a-pagination
            @change="changePage"
            v-model="current"
            :total="recordsTotal"
            :pageSize="12"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: "异常标号",
    dataIndex: "key",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "异常名称",
    dataIndex: "exceptionRecord.exceptionName",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "告警状态",
    dataIndex: "exceptionRecord.warningStatusDescription",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "告警次数",
    dataIndex: "exceptionRecord.waringCount",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "起始时间",
    dataIndex: "exceptionRecord.startTime",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "结束时间",
    dataIndex: "exceptionRecord.endTime",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "记录状态",
    dataIndex: "exceptionRecord.recordingStatusDescription",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "楼宇名称",
    dataIndex: "deviceInfo.buildingName",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "楼层",
    dataIndex: "deviceInfo.floorName",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "房间",
    dataIndex: "deviceInfo.roomName",
    width: "8%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "设备MAC",
    dataIndex: "deviceInfo.MacAddress",
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
      ended: 1,
      notEnded: 0,
      statusParam: "",
      buildingIdParam: "",
      page: 1,
      searchParam: "",
      isLoading: true,
      allFloors: [],
      allRooms: [],
      floor: "全部",
      room: "全部",
      current: 1
    };
  },
  methods: {
    handleStatusChange() {
      this.statusParam = this.status === "null" ? null : this.status;
      switch (this.status) {
        case "全部":
          this.statusParam = null;
        case 1:
          this.statusParam = true;
        case 0:
          this.statusParam = false;
      }
    },
    handleBuildingChange(e) {
      this.floor = "全部";
      this.room = "全部";
      this.allFloors = [];
      this.allRooms = [];
      if (this.buildingId != "null") {
        this.$http.toGetAllFloors(e).then(res => {
          if (res.data.success) {
            this.allFloors = res.data.data;
            this.$nextTick(() => {});
          }
        });
      }
    },
    handleFloorChange(e) {
      this.room = "全部";
      this.allRooms = [];
      if (this.floor != "null") {
        this.$http.toGetAllRooms(e).then(res => {
          if (res.data.success) {
            this.allRooms = res.data.data;
          }
        });
      }
    },
    handleRoomChange() {},
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    search(isSearching) {
      let buildingQuery =
          this.buildingId === "全部" || this.buildingId === "null"
            ? null
            : this.buildingId,
        floorQuery =
          this.floor === "全部" || this.floor === "null" ? null : this.floor,
        roomQuery =
          this.room === "全部" || this.room === "null" ? null : this.room,
        statusQuery =
          this.status === "全部" || this.status === "null" ? null : this.status;
      this.isLoading = true;
      if (isSearching) {
        this.page = 1;
        this.$nextTick(() => {
          this.getExceptionList(
            this.page,
            statusQuery,
            buildingQuery,
            floorQuery,
            roomQuery,
            isSearching
          );
        });
      }else{
        this.getExceptionList(
          this.page,
          statusQuery,
          buildingQuery,
          floorQuery,
          roomQuery,
          isSearching
        );
      }

    },
    getAllRooms() {},
    getAllFloors() {},
    addOrder() {
      var i = 1 + (this.page - 1) * 12;
      this.data = this.data.filter(item => {
        item["key"] = i++;
        return true;
      });
    },
    addStatusDescription() {
      this.data = this.data.map(item => {
        item.exceptionRecord.warningStatusDescription = item.exceptionRecord
          .warningStatus
          ? "已完结"
          : "未完结";
        item.exceptionRecord.recordingStatusDescription = item.exceptionRecord
          .status
          ? "已完结"
          : "未完结";
        return item;
      });
      this.$nextTick(() => {});
    },
    getExceptionList(
      page = 1,
      status,
      buildingId,
      floorId,
      roomId,
      isSearching
    ) {
      this.$http
        .toGetExceptionRecordList(page, status, buildingId, floorId, roomId)
        .then(res => {
          if (res.data.success) {
            this.data = res.data.data;
            this.isLoading = false;
            this.recordsTotal = res.data.recordsTotal;
            if (isSearching) {
              this.current = 1;
            }
            this.$nextTick(() => {
              this.addOrder();
              this.addStatusDescription();
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
    // 获取所有楼宇名称
    this.$http.toGetBuildingList().then(res => {
      if (res.data.success) {
        this.allBuildings = res.data.data;
      }
    });
    this.getExceptionList(1);
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
  width: 900px;
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
#floorSearch {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#roomSearch {
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
.ant-table-row td {
  background-color: aqua;
  padding: 10px !important;
}
#tableWrapper {
  height: calc(100% - 100px);
  overflow: auto;
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
