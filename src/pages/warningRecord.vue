<template>
  <div id="main">
    <div id="searchBox">
      <div id="statusSearch">
        <div class="label">告警类型：</div>
        <div id="statusSearchInput">
          <a-select
            defaultValue="全部"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            style="width: 200px"
            @change="handleStatusChange"
            :filterOption="filterOption"
            v-model="exceptionId"
          >
            <a-select-option :value="nullStatus">全部</a-select-option>
            <a-select-option :value="normalStatus">温度异常</a-select-option>
            <a-select-option :value="abnormalStatus">湿度异常</a-select-option>

          </a-select>
        </div>
      </div>
      <div id="searchByNames">
        <div id="searchByNamesLabel">通知人员：</div>
        <div id="searchByNamesInput">
          <a-input v-model="searchName" placeholder="请输入通知人员"/>
          <a-button @click="search" type="primary">查询</a-button>
        </div>
      </div>
    </div>
    <div id="tableWrapper">
      <a-table 
      :columns="columns" 
      :dataSource="data"
      :pagination="false"
      :loading="isLoading"
      size="small"
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
    title: "警告标号",
    dataIndex: "key",
    width: "8%",
    scopedSlots: { customRender: "_id" }
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
  },
  {
    title: "告警类型",
    dataIndex: "warningRecord.way",
    width: "8%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "告警值",
    dataIndex: "warningRecord.value",
    width: "8%",
    scopedSlots: { customRender: "SerialNumber" }
  },
  {
    title: "告警时间",
    dataIndex: "warningRecord.time",
    width: "8%",
    scopedSlots: { customRender: "SerialNumber" }
  },
  {
    title: "通知人员",
    dataIndex: "warningRecord.userName",
    width: "8%",
    scopedSlots: { customRender: "SerialNumber" }
  },
  {
    title: "备注",
    dataIndex: "warningRecord.exceptionRemark",
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
      exceptionId:"",
      searchName:""
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
    handleBuildingChange(){
      this.buildingIdParam=this.buildingId==="null" ? null : this.buildingId;
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
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    search(){
            console.log(this.searchParam)
          this.isLoading=true;
          this.$http.toGetWarningRecordList(this.page,1,this.searchName).then((res)=>{
          console.log(res)
          this.data=res.data.data
          this.recordsTotal=res.data.recordsTotal
          this.isLoading=false
          this.$nextTick(()=>{
              this.addOrder()
          })
    })

    },
    addOrder(){
        var i=1;
          this.data=this.data.filter((item)=>{
          item["key"]=i++;
          return true
        })
    }
  },
  created() {
    this.$http.toGetWarningRecordList().then((res)=>{
        console.log(res)
                this.data=res.data.data
        this.recordsTotal=res.data.recordsTotal
        this.isLoading=false
        this.$nextTick(()=>{
            this.addOrder()
        })
    })
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
.ant-table-row td{
  background-color: aqua;
  padding:10px !important;
}
#tableWrapper{
  height: calc(100% - 100px);
  overflow: auto;
}
</style>
