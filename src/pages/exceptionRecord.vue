<template>
  <div id="main">
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
            <a-select-option :value="normalStatus">正常</a-select-option>
            <a-select-option :value="abnormalStatus">异常</a-select-option>
            <a-select-option :value="unknowStatus">未知</a-select-option>
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
            <a-select-option v-for="item in allBuildings" :value="item.Id" :key="item.Id">{{item.Address}}</a-select-option>
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
            <a-select-option v-for="item in allFloors" :value="item.Id" :key="item.Id">{{item.Description}}</a-select-option>
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
            style="width:165px;height:25px"
            @change="handleRoomChange"
            :filterOption="filterOption"
            v-model="room"
          >
            <a-select-option :value="nullStatus" :key="8874">全部</a-select-option>
            <a-select-option v-for="item in allRooms" :value="item.Id" :key="item.Id">{{item.Description}}</a-select-option>
          </a-select>
        </div>
      </div>
      <div id="searchByNames">
        <div id="searchByNamesInput">
          <a-button @click="search" type="primary" size="small">搜索</a-button>
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
      bordered>
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
    </div>
  </div>
</template>
<script>

const columns = [
  {
    title: "异常标号",
    dataIndex: "key",
    width: "8%",
    scopedSlots: { customRender: "address" }
  },
   {
    title: "异常名称",
    dataIndex: "exceptionRecord.exceptionName",
    width: "8%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "告警状态",
    dataIndex: "exceptionRecord.status",
    width: "8%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "告警次数",
    dataIndex: "exceptionRecord.waringCount",
    width: "8%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "起始时间",
    dataIndex: "exceptionRecord.startTime",
    width: "8%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "结束时间",
    dataIndex: "exceptionRecord.endTime",
    width: "8%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "记录状态",
    dataIndex: "exceptionRecord.warningStatus",
    width: "8%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "楼宇名称",
    dataIndex: "deviceInfo.buildingName",
    width: "8%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "楼层",
    dataIndex: "deviceInfo.floorName",
    width: "8%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "房间",
    dataIndex: "deviceInfo.roomName",
    width: "8%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "设备MAC",
    dataIndex: "deviceInfo.MacAddress",
    width: "8%",
    scopedSlots: { customRender: "address" }
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
      data:[],
      columns,
      recordsTotal:"",
      status:"全部",
      allBuildings:[],
      buildingId:"全部",
      nullStatus:"null",
      normalStatus:1,
      abnormalStatus:0,
      unknowStatus:-1,
      statusParam:"",
      buildingIdParam:"",
      page:1,
      searchParam:"",
      isLoading:true,
      allFloors:[],
      allRooms:[],
      floor:"全部",
      room:"全部"
    };
  },
  methods: {
    handleStatusChange() {
      this.statusParam=this.status==="null" ? null : this.status;
      this.$http.toGetBroadcastList(1,this.statusParam,this.buildingIdParam).then((res)=>{
        if(res.data.success){
          this.data=res.data.data
                  this.$nextTick(()=>{
            this.addOrder()
        })
        }else{
          
        }
      })
    },
    handleBuildingChange(e){
      this.$http.toGetAllFloors(e).then((res)=>{
        if(res.data.success){
          this.allFloors=res.data.data
          this.$nextTick(()=>{
          })
        }
      })
    },
    handleFloorChange(e){
        this.$http.toGetAllRooms(e).then((res)=>{
        if(res.data.success){
          this.allRooms=res.data.data

        }
      })

    },
    handleRoomChange(){

    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    search(){
      let buildingQuery=this.buildingId==="全部" ? null : this.this.buildingId,
          floorQuery=this.floor==="全部" ? null : this.this.floor,
          roomQuery=this.room==="全部" ? null : this.this.room;
      this.getExceptionList(this.page,true,buildingQuery,floorQuery,roomQuery)
    },
    getAllRooms(){
      console.log("获取所有房间")
    },
    getAllFloors(){
      console.log("获取所有楼层")
    },
    addOrder(){
        var i=1;
          this.data=this.data.filter((item)=>{
          item["key"]=i++;
          return true
        })
    },
    getExceptionList(page=1,status,buildingId,floorId,roomId){
          this.$http.toGetExceptionRecordList(page,status,buildingId,floorId,roomId).then((res)=>{
      console.log(res)
      if(res.data.success){
        this.data=res.data.data
        this.isLoading=false;
                  this.$nextTick(()=>{
            this.addOrder()
          })
      }
    })
    }
  },
  created() {
    // 获取所有楼宇名称
    this.$http.toGetBuildingList().then((res)=>{
      if(res.data.success){
        this.allBuildings=res.data.data
      }
    });
    this.getExceptionList(1)
  }
};
</script>
<style scoped>
html{
  height: 100%;
}
body{
  height: 100%;
}
#main{
  height: calc(100% - 50px);
width: 95%;
  margin-left: 20px;
}
#frame{
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
.ant-table-row td{
  background-color: aqua;
  padding:10px !important;
}
#tableWrapper{
  height: calc(100% - 100px);
  overflow: auto;
}
</style>
