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
            defaultValue="检测中心"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            style="width: 200px"
            @change="handleBuildingChange"
            :filterOption="filterOption"
            v-model="buildingId"
            size="small"
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

        <div id="searchDeviceName" style="display:flex;flex-direction:row;justify-content:space-bettwen;align-items:center;width:220px;">
          <div id="searchByNamesLabel" style="width:150px;">设备名称：</div>
          <a-input
              v-model="deviceName"
              @keydown.enter="search(true)"
              placeholder="请输入服务器名称"
              size="small"
          />
        </div>

      <div id="searchByNames">
        <div id="searchByNamesLabel">房间名称：</div>
        <div id="searchByNamesInput">
          <a-input v-model="searchParam" placeholder="请输入服务器房间名称" size="small" style="width: 160px" />
          <a-button @click="search(true)" type="primary" size="small" style="margin-left:15px">搜索</a-button>
        </div>
      </div>
    </div>
    <div id="tableWrapper">
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :rowClassName="(record, index)=>{
            if(index%2 != 0) return 'table-evenRow'
          } "
        :loading="isLoading"
      >
        <template
          v-for="col in ['name', 'age', 'address']"
          :slot="col"
          slot-scope="text, record, index"
        >
          <div :key="col" :style="color(record.status)">
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
              <a-button
                :disabled="record.status != 1 ? true  : false "
                @click="getControlDetail(record.SerialNumber,'服务器')"
                type="primary"
                size="small"
              >详情</a-button>
            </div>
          </template>
      </a-table>
      <div id="pagination" v-show="!isLoading">
        <div id="total"><span>共</span> {{recordsTotal}} <span>条数据</span> </div>
        <div id="paginationBox">
          <a-pagination
            @change="changePage"
            v-model="current"
            :total="recordsTotal"
            :pageSize="12"
            v-show="!isLoading"
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
    title: "序号",
    dataIndex: "key",
    scopedSlots: { customRender: "_id" },
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "statusDescription",
    scopedSlots: { customRender: "age" },
    align: "center"
  },
  {
    title: "服务器名称",
    dataIndex: "Description",
    scopedSlots: { customRender: "SerialNumber" },
    align: "center"
  },
  {
    title: "型号",
    dataIndex: "Model",
    scopedSlots: { customRender: "SerialNumber" },
    align: "center"
  },
  {
    title: "楼宇名称",
    dataIndex: "buildingName",
    scopedSlots: { customRender: "SerialNumber" },
    align: "center"
  },
  {
    title: "楼层",
    dataIndex: "floorName",
    scopedSlots: { customRender: "SerialNumber" },
    align: "center"
  },
  {
    title: "房间",
    dataIndex: "roomName",
    scopedSlots: { customRender: "SerialNumber" },
    align: "center"
  },
  {
    title: "编号",
    dataIndex: "Code",
    scopedSlots: { customRender: "SerialNumber" },
    align: "center"
  },
  {
    title: "ip地址",
    dataIndex: "SerialNumber",
    scopedSlots: { customRender: "SerialNumber" },
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "remarks",
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
      nullStatus: "null",
      normalStatus: 1,
      abnormalStatus: 0,
      unknowStatus: -1,
      statusParam: "",
      buildingIdParam: "",
      page: 1,
      searchParam: "",
      isLoading: true,
      current: 1,
      deviceName:''
    };
  },
  methods: {
    handleStatusChange() {
      // console.log(this.status=== "null")
      // this.status = this.status === "null" ? null : this.status;
      // this.isLoading = true;
      // this.$http
      //   .toGetServerRoomList(1, this.statusParam, this.buildingIdParam)
      //   .then(res => {
      //     if (res.data.success) {
      //       this.recordsTotal = res.data.recordsTotal;
      //       this.isLoading = false;
      //       this.data = res.data.data;
      //       this.$nextTick(() => {
      //         this.addOrder();
      //       });
      //     } else {
      //     }
      //   });
    },
        color(type) {
      if (type != 0) {
        return "color : red";
      }
    },
    handleBuildingChange() {
      // this.buildingId =
      //   this.buildingId === "null" ? null : this.buildingId;
      //   console.log(this.buildingId=== "null")
      // this.isLoading = true;
      // this.$http
      //   .toGetServerRoomList(1, this.statusParam, this.buildingIdParam)
      //   .then(res => {
      //     if (res.data.success) {
      //       this.isLoading = false;
      //       this.recordsTotal = res.data.recordsTotal;
      //       this.data = res.data.data;
      //       this.$nextTick(() => {
      //         this.addOrder();
      //       });
      //     } else {
      //     }
      //   });
    },
    getControlDetail(ip, name) {
      console.log(ip)
      this.$router.push({
        path: "/controlDetail",
        query: { title: name + "异常状态详情", ip: ip, name: name }
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    search(isSearching) {
      let statusParam = this.status === "全部" ||this.status == 'null' ? null : this.status,
        searchParam = this.searchParam === "全部" ? null : this.searchParam,
        buildingIdParam = this.buildingId === "全部" ||  this.buildingId === "null"? null : this.buildingId;
        console.log(statusParam,searchParam,buildingIdParam)
      if (isSearching) {
        this.page = 1;
        this.$nextTick(() => {
          this.toGetServerRoomList(
            this.page,
            statusParam,
            buildingIdParam,
            this.searchParam,
            isSearching,
            this.deviceName
          );
        });
      } else {
        this.toGetServerRoomList(
          this.page,
          statusParam,
          buildingIdParam,
          this.searchParam,
          isSearching,
          this.deviceName
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
    toGetServerRoomList(page, status, buildingId, searchRoom, isSearching,deviceName) {
      this.isLoading = true;
      this.$http
        .toGetServerRoomList(page, status, buildingId, searchRoom,deviceName)
        .then(res => {
          if (res.data.success) {
            this.isLoading = false;
            this.data = res.data.data;
            if (isSearching) {
              this.current = 1;
              
            }
            this.recordsTotal = res.data.recordsTotal;
            this.$nextTick(() => {
              this.addOrder();
              console.log(this.data)
            });
          }else {
              this.$message.error(res.data.message);
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
    this.toGetServerRoomList(this.page);
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
  width: 1100px;
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
