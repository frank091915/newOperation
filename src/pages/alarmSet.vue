
<template>
  <div id="alarmSetWrapper">
    <div id="tabWrapper">
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="告警配置" key="1" style="height:700px">
          <div id="alarmTitle">请选择需要关注的故障等级：</div>
          <div id="alarmSetStatus">
            <div id="fisrtFault" v-for="item in alarmData" :key="item.id">
              <a-checkbox @click="changeStatus(item.id)" :checked="item.mark">{{item.name}}</a-checkbox>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="汇聚机房" key="2" forceRender>
          <div id="convergeTableWrapper">
            <a-table 
            :columns="columns" 
            :dataSource="convergeData" 
            :pagination="false" 
            :rowClassName="(record, index)=>{
              if(index%2 != 0) return 'table-evenRow'
            } "
            :loading="isLoading">
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
                    @change="e => handleChange(e.target.value, record.key)"
                  />
                  <template v-else>{{text}}</template>
                </div>
              </template>
              <template slot="weChatcheckBox" slot-scope="text, record">
                <a-switch
                  :checked="record.switchWx"
                  @change="onChangeInformingMethod(3,record.Id,'NKD_AGG_DEVICE','2')"
                />
              </template>
              <template slot="messagecheckBox" slot-scope="text, record">
                <a-switch
                  :checked="record.switchPhone"
                  @change="onChangeInformingMethod(2,record.Id,'NKD_AGG_DEVICE','2')"
                />
              </template>
              <template slot="emailcheckBox" slot-scope="text, record">
                <a-switch
                  :checked="record.switchEmail"
                  @change="onChangeInformingMethod(1,record.Id,'NKD_AGG_DEVICE','2')"
                />
              </template>
            </a-table>
          <div id="pagination" v-show="!isLoading"> 
            <div id="paginationBox"> 
                  <div
                    style="height: 25px;font-size:14px;line-height:25px;color: rgba(0, 0, 0, 0.65);margin-right:20px;"
                  >
                    <span>共</span>
                    <span style="margin:0 5px">{{recordsTotal}}</span>
                    <span>条记录</span>
                  </div>
                  <div v-show="recordsTotal >0"  style="margin-right:20px;color: rgba(0, 0, 0, 0.65);">
                    <span>{{page}}/{{Math.ceil(recordsTotal/12)}}页</span>
                  </div>
                  <span
                    v-show="recordsTotal >0"
                    @click="firstPage"
                    :style="{'cursor':page >1 ? 'pointer' : 'not-allowed','margin-right':'15px'}"
                    class="pageChanger"
                  >首页</span>
                  <a-pagination
                    @change="changePage"
                    v-model="page"
                    :total="recordsTotal"
                    :pageSize="12"
                    size="small"
                  />
                  <span
                    v-show="recordsTotal >0"
                    @click="nextPage"
                    :style="{'cursor':page+1 <= Math.ceil(recordsTotal/12) ? 'pointer' : 'not-allowed','margin-left':'15px'}"
                    class="pageChanger"
                  >下一页</span>
                  <div
                    v-show="recordsTotal >0"
                    @keydown.enter="turnPage"
                    style="width:108px;height:25px;font-size:14px;margin-left:20px;line-height:25px"
                  >
                    <span style="margin-right:5px">跳至</span>
                    <a-input v-model="turningPage" size="small" style="width:44px;height:20px;" />
                    <span style="margin-left:5px">页</span>
                  </div>
            </div>
        </div>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="弱电间" key="3">
          <div id="lowVolttageTableWrapper">
            <a-table 
            :columns="electronicColumns" 
            :dataSource="electronicData" 
            :pagination="false" 
            :rowClassName="(record, index)=>{
              if(index%2 != 0) return 'table-evenRow'
            } "
            :loading="isLoading">
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
                    @change="e => handleChange(e.target.value, record.key)"
                  />
                  <template v-else>{{text}}</template>
                </div>
              </template>
              <template slot="weChatcheckBox" slot-scope="text, record">
                <a-switch
                  :checked="record.switchWx"
                  @change="onChangeInformingMethod(3,record.Id,'NKD_WEAK_ELECTRIC_ADVICE','3')"
                />
              </template>
              <template slot="messagecheckBox" slot-scope="text, record">
                <a-switch
                  :checked="record.switchPhone"
                  @change="onChangeInformingMethod(2,record.Id,'NKD_WEAK_ELECTRIC_ADVICE','3')"
                />
              </template>
              <template slot="emailcheckBox" slot-scope="text, record">
                <a-switch
                  :checked="record.switchEmail"
                  @change="onChangeInformingMethod(1,record.Id,'NKD_WEAK_ELECTRIC_ADVICE','3')"
                />
              </template>
            </a-table>
            <div id="pagination" v-show="!isLoading"> 
              <div id="paginationBox">
                  <div
                    style="height: 25px;font-size:14px;line-height:25px;color: rgba(0, 0, 0, 0.65);margin-right:20px;"
                  >
                    <span>共</span>
                    <span style="margin:0 5px">{{recordsTotal}}</span>
                    <span>条记录</span>
                  </div>
                  <div v-show="recordsTotal >0"  style="margin-right:20px;color: rgba(0, 0, 0, 0.65);">
                    <span>{{page}}/{{Math.ceil(recordsTotal/12)}}页</span>
                  </div>
                  <span
                    v-show="recordsTotal >0"
                    @click="firstPage"
                    :style="{'cursor':page >1 ? 'pointer' : 'not-allowed','margin-right':'15px'}"
                    class="pageChanger"
                  >首页</span>
                  <a-pagination
                    @change="changePage"
                    v-model="page"
                    :total="recordsTotal"
                    :pageSize="12"
                    size="small"
                  />
                  <span
                    v-show="recordsTotal >0"
                    @click="nextPage"
                    :style="{'cursor':page+1 <= Math.ceil(recordsTotal/12) ? 'pointer' : 'not-allowed','margin-left':'15px'}"
                    class="pageChanger"
                  >下一页</span>
                  <div
                    v-show="recordsTotal >0"
                    @keydown.enter="turnPage"
                    style="width:108px;height:25px;font-size:14px;margin-left:20px;line-height:25px"
                  >
                    <span style="margin-right:5px">跳至</span>
                    <a-input v-model="turningPage" size="small" style="width:44px;height:20px;" />
                    <span style="margin-left:5px">页</span>
                  </div>
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: "序号",
    dataIndex: "key",
    width: "5%",
    scopedSlots: { customRender: "num" },
    align:"center"
  },
  {
    title: "汇聚机房编号",
    dataIndex: "Code",
    width: "10%",
    scopedSlots: { customRender: "age" },
        align:"center"
  },
  {
    title: "描述",
    dataIndex: "Description",
    width: "10%",
    scopedSlots: { customRender: "address" },
        align:"center"
  },
  {
    title: "设备MAC地址",
    dataIndex: "MacAddress",
    width: "10%",
    scopedSlots: { customRender: "address" },
        align:"center"
  },
  {
    title: "微信警告",
    dataIndex: "switchWx",
    width: "10%",
    scopedSlots: { customRender: "weChatcheckBox" },
        align:"center"
  },
  {
    title: "短信警告",
    dataIndex: "floorNumber",
    width: "10%",
    scopedSlots: { customRender: "messagecheckBox" },
        align:"center"
  },
  {
    title: "邮件警告",
    dataIndex: "roomNumber",
    width: "10%",
    scopedSlots: { customRender: "emailcheckBox" },
        align:"center"
  }
];
const electronicColumns = [
  {
    title: "序号",
    dataIndex: "key",
    width: "5%",
    scopedSlots: { customRender: "num" },
    align:"center"
  },
  {
    title: "弱电间编号",
    dataIndex: "Code",
    width: "10%",
    scopedSlots: { customRender: "age" },
        align:"center"
  },
  {
    title: "描述",
    dataIndex: "Description",
    width: "10%",
    scopedSlots: { customRender: "address" },
        align:"center"
  },
  {
    title: "设备MAC地址",
    dataIndex: "MacAddress",
    width: "10%",
    scopedSlots: { customRender: "address" },
        align:"center"
  },
  {
    title: "微信警告",
    dataIndex: "switchWx",
    width: "10%",
    scopedSlots: { customRender: "weChatcheckBox" },
        align:"center"
  },
  {
    title: "短信警告",
    dataIndex: "floorNumber",
    width: "10%",
    scopedSlots: { customRender: "messagecheckBox" },
        align:"center"
  },
  {
    title: "邮件警告",
    dataIndex: "roomNumber",
    width: "10%",
    scopedSlots: { customRender: "emailcheckBox" },
        align:"center"
  }
];


export default {
  data() {
    return {
      fisrtFault: "fisrtFault",
      secondFault: "secondFault",
      thirdFault: "thirdFault",
      alarmData: [],
      currentUserId: this.$route.query.id,
      convergeData: [],
      electronicData: [],
      columns,
      allDataArray: [],
      isLoading:true,
      page:1,
      recordsTotal:0,
      type:'NKD_AGG_DEVICE',
      electronicColumns,
      current:1,
      turningPage: ""
    };
  },
  methods: {
      nextPage() {
      console.log(this.current + 1, Math.ceil(this.recordsTotal / 12));
      if (this.current < Math.ceil(this.recordsTotal / 12)) {
        this.page = this.current + 1;
        this.current = this.current + 1;
        this.$nextTick(() => {
          this.changePage();
        });
      }
    },
    turnPage() {
      console.log(this.turningPage);
      if (
        this.turningPage > 0 &&
        this.turningPage <= Math.ceil(this.recordsTotal / 12)
      ) {
        this.current = parseInt(this.turningPage);
        this.page = parseInt(this.turningPage);
        this.$nextTick(() => {
          this.changePage();
        });
      }
    },
    firstPage() {
      if (this.current > 1) {
        this.page = 1;
        this.current = 1;
        this.$nextTick(() => {
          this.changePage();
        });
      }
    },
    callback(key) {
      this.page=1;
      this.$nextTick(()=>{
        if (key == 2) {
          this.toGetConvergeRoomAlarmSettings("NKD_AGG_DEVICE", key);
        } else if (key == 3) {
          this.toGetConvergeRoomAlarmSettings("NKD_WEAK_ELECTRIC_ADVICE", key);
        }
      })

    },
    changeStatus(typeId, $event) {
      this.$http.toSetAlarm(this.currentUserId, typeId).then(res => {
        if (res.data.success) {
          this.$message.success("设置成功");
          this.GetAlarmData();
        } else {
          this.$message.success("设置失败，请重试");
        }
      });
    },
    GetAlarmData() {
      this.isLoading=true;
      this.$http.toGetUserAlarmSettings(this.currentUserId).then(res => {
        if (res.data.success) {
          this.alarmData = res.data.data;
          this.isLoading=false;
          this.$nextTick(()=>{
            this.addOrder()
          })
        }else {
              this.$message.error(res.data.message);
            }
      });
    },
    toGetConvergeRoomAlarmSettings(type, key,isSetting) {
      console.log(type)
      this.type=type ? type : 'NKD_AGG_DEVICE';
      this.key= key ? key : 2;
      if(!isSetting){this.isLoading=true;}
      this.$nextTick(()=>{
              if (this.key == 2) {
        this.$http
          .toGetConvergeRoomAlarmSettings(this.currentUserId,this.type,this.page)
          .then(res => {
            if (res.data.success) {
              this.convergeData = res.data.data;
              this.isLoading=false;
              this.allDataArray = this.electronicData.concat(this.convergeData);
              this.recordsTotal=res.data.recordsTotal;
              this.turningPage='';
              this.$nextTick(()=>{
                  this.addOrder(this.key)
                  console.log(this.convergeData)
              })
            } else {
              this.$message.error(res.data.message);
            }
          });
      } else {
        this.$http
          .toGetConvergeRoomAlarmSettings(this.currentUserId, this.type,this.page)
          .then(res => {
            if (res.data.success) {
              this.isLoading=false;
              this.electronicData = res.data.data;
              this.recordsTotal=res.data.recordsTotal;
              this.allDataArray = this.electronicData.concat(this.convergeData);
              this.turningPage='';
              this.$nextTick(()=>{
                  this.addOrder(this.key)
                  console.log(this.electronicData)
              })
            } else {
              this.$message.error(res.data.message);
            }
          });
      }
      })

    },
    onChangeInformingMethod(noticeType, id, type,key) {
      let infoObj = {};
      infoObj.userId = this.$route.query.id;
      infoObj.type = type;
      infoObj.cmdbId = id;
      infoObj.noticeType = noticeType;
      // 找到当前设置的对象
      let currentObj = this.allDataArray.filter((item)=>{
          if(item.Id===id){
            return true
          }else{
            return false
          }
      });

      let informingMethod="";
      switch(noticeType){
        case 1:
          informingMethod="switchEmail";
          break;
        case 2:
          informingMethod="switchPhone";
          break;
        case 3:
          informingMethod="switchWx";
          break;
      }
      
      let toSwitch=currentObj[0][informingMethod];
      if(!toSwitch){
        this.$http.toSetAlarmOn(infoObj).then((res)=>{
          if(res.data.success){
            this.$message.success("设置成功");
            this.toGetConvergeRoomAlarmSettings(type,key,true);
          }else{
            this.$message.error("设置失败，请重试");
          }
        });
      }else{
        this.$http.toSetAlarmOff(infoObj).then((res)=>{
          if(res.data.success){
            this.$message.success("设置成功");
            this.toGetConvergeRoomAlarmSettings(type,key,true);
          }else{
            this.$message.error("设置失败，请重试");
          }
        });
      }
    },
    addOrder(key){
              var i=1+ (this.page - 1)*12;
      if(key==2){
          this.convergeData=this.convergeData.filter((item)=>{
          item["key"]=i++;
          return true
        })
      }else{
        this.electronicData=this.electronicData.filter((item)=>{
          item["key"]=i++;
          return true
        })
      }
    },
    changePage(page){
      if(page){
        this.page=page;
      }
      this.$nextTick(()=>{
        this.toGetConvergeRoomAlarmSettings(this.type,this.key)
      })
    }
  },
  created() {
    this.GetAlarmData();
  }
};
</script>
<style >
#alarmSetWrapper {
  height: calc(100vh - 91px);
  width:calc(100vw - 300px);
  background-color: #fff;
  box-sizing: border-box;
  margin: 10px 20px 20px 20px;
  border-radius: 8px;

}
#alarmSetStatus {
  margin-top: 5px;
  margin-left: 90px;
}
.ant-table {
  line-height: 1 !important;
}
#pagination{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 15px;
}
#paginationBox{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#total{
  font-size: 15px;
}
</style>