<template>
  <div id="pageWrapper">
    <div id="searchBox">
      <div id="deviceType">
        <div class="label">设备类型：</div>
        <div id="statusSearchInput">
          <a-select
            defaultValue="全部"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            style="width: 120px"
            @change="handleDeviceTypeChange"
            :filterOption="filterOption"
            v-model="deviceType"
            size="small"
          >
            <a-select-option :value="nullStatus">全部</a-select-option>
            <a-select-option :value="convergeRoom">汇聚机房</a-select-option>
            <a-select-option :value="lowVoltageRoom">弱电间</a-select-option>
          </a-select>
        </div>
      </div>

      <div id="statusSearch" style="margin-left: 15px">
        <div class="label">告警类型：</div>
        <div id="statusSearchInput">
          <a-select
            size="small"
            defaultValue="全部"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            style="width: 120px"
            @change="handleStatusChange"
            :filterOption="filterOption"
            v-model="warningType"
          >
            <a-select-option :value="nullStatus">全部</a-select-option>
            <a-select-option
              v-for="item in exceptionList"
              :value="item.id"
              :key="item.id"
            >{{item.remark}}</a-select-option>
          </a-select>
        </div>
      </div>
      <div id="searchByNames" style="margin-left:15px">
        <div id="searchByNamesLabel">通知人员：</div>
        <div id="searchByNamesInput">
          <a-input size="small" v-model="searchName" placeholder="请输入通知人员" style="width: 120px"/>
          <a-button style="margin-left:10px" size="small" @click="search(true)" type="primary">查询</a-button>
        </div>
      </div>
    </div>
    <div id="tableWrapper">
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :loading="isLoading"
        :rowClassName="(record, index)=>{
            if(index%2 != 0) return 'table-evenRow'
          } "
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
        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <a-button @click="getWarningRecordDetail(record)" type="primary" size="small">详情</a-button>
          </div>
        </template>
      </a-table>
      <div id="pagination" v-show="!isLoading">
        <div id="total">
          共
          <span style="margin:0 5px;">{{recordsTotal}}</span>条数据
        </div>
        <div id="paginationBox">
          <a-pagination
            @change="changePage"
            v-model="current"
            :total="recordsTotal"
            :pageSize="12"
            :hideOnSinglePage="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: "警告标号",
    dataIndex: "key",
    scopedSlots: { customRender: "_id" },
    align: "center"
  },
  {
    title: "楼宇名称",
    dataIndex: "deviceInfo.buildingName",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "楼层",
    dataIndex: "deviceInfo.floorName",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "房间",
    dataIndex: "deviceInfo.roomName",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "设备MAC",
    dataIndex: "deviceInfo.MacAddress",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "告警通知方式",
    dataIndex: "warningRecord.way",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "告警值",
    dataIndex: "warningRecord.value",
    scopedSlots: { customRender: "SerialNumber" },
    align: "center"
  },
  {
    title: "告警时间",
    dataIndex: "warningRecord.time",
    scopedSlots: { customRender: "SerialNumber" },
    align: "center"
  },
  {
    title: "备注",
    dataIndex: "warningRecord.exceptionRemark",
    scopedSlots: { customRender: "address" },
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
      nullStatus: "全部",
      normalStatus: null,
      convergeRoomWarning: 1,
      electricRoomWarning: 2,
      warningType: "全部",
      buildingIdParam: "",
      page: 1,
      isLoading: true,
      exceptionId: "全部",
      searchName: "",
      deviceType: "全部",
      convergeRoom: 1,
      lowVoltageRoom: 2,
      exceptionList: [],
      current: 1
    };
  },
  methods: {
    getWarningRecordDetail(record) {
      this.$router.push({
        path: "/warningRecordDetail",
        query: { title: "告警记录", record: record,menuIconId:8 }
      });
    },
    handleStatusChange() {},
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    search(isSearching) {
      let warningTypeParam =
        this.warningType === "全部" ? null : this.warningType;
      let deviceTypeParam = this.deviceType === "全部" ? null : this.deviceType;
      if (isSearching) {
        this.page = 1;
        this.$nextTick(() => {
          this.getWarningList(
            this.page,
            deviceTypeParam,
            warningTypeParam,
            this.searchName,
            isSearching
          );
        });
      } else {
        this.getWarningList(
          this.page,
          deviceTypeParam,
          warningTypeParam,
          this.searchName,
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
    getWarningList(page, deviceType, type, searchName, isSearching) {
      this.isLoading = true;
      this.$http
        .toGetWarningRecordList(page, deviceType, type, searchName)
        .then(res => {
          if (res.data.success) {
            this.data = res.data.data;
            this.recordsTotal = res.data.recordsTotal;
            this.isLoading = false;
            if (isSearching) {
              this.current = 1;
            }
            this.$nextTick(() => {
              this.addOrder();
            });
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    handleDeviceTypeChange() {
      this.warningType = "全部";
      let deviceTypeParam = this.deviceType === "全部" ? null : this.deviceType;

      this.$http.toGetAllExceptionList(deviceTypeParam).then(res => {
        if (res.data.success) {
          this.exceptionList = res.data.data;
        }
      });
      // toGetAllExceptionList
    },
    changePage(page) {
      this.page = page;
      this.$nextTick(() => {
        this.search(false);
      });
    }
  },
  created() {
    this.getWarningList();
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
  justify-content: flex-start;
  align-items: center;
}
#statusSearch {
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
#deviceType {
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
