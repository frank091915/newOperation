
<template>
  <div id="alarmSetWrapper">
    <div id="tabWrapper">
      <a-tabs defaultActiveKey="2" @change="callback">
        <a-tab-pane tab="汇聚机房" key="2" forceRender>
          汇聚机房
          <div id="convergeRoomtitle"></div>
          <div id="convergeTableWrapper">
            <a-table :columns="columns" :dataSource="convergeData" :pagination="false" bordered>
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
                  @change="onChangeInformingMethod(3,record.Id,'NKD_AGG_DEVICE')"
                />
              </template>
              <template slot="messagecheckBox" slot-scope="text, record">
                <a-switch
                  :checked="record.switchPhone"
                  @change="onChangeInformingMethod(2,record.Id,'NKD_AGG_DEVICE')"
                />
              </template>
              <template slot="emailcheckBox" slot-scope="text, record">
                <a-switch
                  :checked="record.switchEmail"
                  @change="onChangeInformingMethod(1,record.Id,'NKD_AGG_DEVICE')"
                />
              </template>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="弱电间" key="3">
          <div id="lowVoltageRoom">弱电间</div>
          <div id="lowVolttageTableWrapper">
            <a-table :columns="columns" :dataSource="electronicData" :pagination="false" bordered>
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
                  @change="onChangeInformingMethod(3,record.Id,'NKD_WEAK_ELECTRIC_ADVICE')"
                />
              </template>
              <template slot="messagecheckBox" slot-scope="text, record">
                <a-switch
                  :checked="record.switchPhone"
                  @change="onChangeInformingMethod(2,record.Id,'NKD_WEAK_ELECTRIC_ADVICE')"
                />
              </template>
              <template slot="emailcheckBox" slot-scope="text, record">
                <a-switch
                  :checked="record.switchEmail"
                  @change="onChangeInformingMethod(1,record.Id,'NKD_WEAK_ELECTRIC_ADVICE')"
                />
              </template>
            </a-table>
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
    width: "10%",
    scopedSlots: { customRender: "num" }
  },
  {
    title: "汇聚机房编号",
    dataIndex: "Code",
    width: "10%",
    scopedSlots: { customRender: "age" }
  },
  {
    title: "描述",
    dataIndex: "Description",
    width: "15%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "设备MAC地址",
    dataIndex: "MacAddress",
    width: "10%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "微信警告",
    dataIndex: "switchWx",
    width: "10%",
    scopedSlots: { customRender: "weChatcheckBox" }
  },
  {
    title: "短信警告",
    dataIndex: "floorNumber",
    width: "10%",
    scopedSlots: { customRender: "messagecheckBox" }
  },
  {
    title: "邮件警告",
    dataIndex: "roomNumber",
    width: "10%",
    scopedSlots: { customRender: "emailcheckBox" }
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
      allDataArray: []
    };
  },
  methods: {
    addOrder(type) {
      let i = 1;
      if(type===1){
      this.convergeData = this.convergeData.filter(item => {
        item["key"] = i++;
        return true;
      });
      }else{
    this.electronicData = this.electronicData.filter(item => {
        item["key"] = i++;
        return true;
      });
      }


    },
    callback(key) {
      if (key == 2) {
        this.toGetConvergeRoomAlarmSettings("NKD_AGG_DEVICE", key);
      } else if (key == 3) {
        this.toGetConvergeRoomAlarmSettings("NKD_WEAK_ELECTRIC_ADVICE", key);
      }
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
      this.$http.toGetUserAlarmSettings(this.currentUserId).then(res => {
        if (res.data.success) {
          this.alarmData = res.data.data;
          this.$nextTick(() => {
          });
        } else {
          this.$message.success("获取数据失败，请重试");
        }
      });
    },
    toGetConvergeRoomAlarmSettings(type, key) {
      if (key == 2) {
        this.$http
          .toGetConvergeRoomAlarmSettings(this.currentUserId, type)
          .then(res => {
            if (res.data.success) {
              this.convergeData = res.data.data;
              this.allDataArray = this.electronicData.concat(this.convergeData);
              this.$nextTick(() => {
                this.addOrder(1);
              });
            } else {
              this.$message.success("获取数据失败，请重试");
            }
          });
      } else {
        this.$http
          .toGetConvergeRoomAlarmSettings(this.currentUserId, type)
          .then(res => {
            if (res.data.success) {
              this.electronicData = res.data.data;
              this.allDataArray = this.electronicData.concat(this.convergeData);
              this.$nextTick(() => {
                this.addOrder(2);
              });
            } else {
              this.$message.success("获取数据失败，请重试");
            }
          });
      }
    },
    onChangeInformingMethod(noticeType, id, type) {
      let infoObj = {};
      infoObj.userId = this.$route.query.id;
      infoObj.type = type;
      infoObj.cmdbId = id;
      infoObj.noticeType = noticeType;
      // 找到当前设置的对象
      let currentObj = this.allDataArray.filter(item => {
        if (item.Id === id) {
          return true;
        } else {
          return false;
        }
      });

      let informingMethod = "";
      switch (noticeType) {
        case 1:
          informingMethod = "switchEmail";
          break;
        case 2:
          informingMethod = "switchPhone";
          break;
        case 3:
          informingMethod = "switchWx";
          break;
      }

      let toSwitch = currentObj[0][informingMethod];
      if (!toSwitch) {
        this.$http.toSetAlarmOn(infoObj).then(res => {
          if (res.data.success) {
            this.$message.success("设置成功");
            this.toGetConvergeRoomAlarmSettings("NKD_AGG_DEVICE", 2);
            this.toGetConvergeRoomAlarmSettings("NKD_WEAK_ELECTRIC_ADVICE", 3);
          } else {
            this.$message.success("设置失败，请重试");
          }
        });
      } else {
        this.$http.toSetAlarmOff(infoObj).then(res => {
          if (res.data.success) {
            this.$message.success("设置成功");
            this.toGetConvergeRoomAlarmSettings("NKD_AGG_DEVICE", 2);
            this.toGetConvergeRoomAlarmSettings("NKD_WEAK_ELECTRIC_ADVICE", 3);
          } else {
            this.$message.success("设置失败，请重试");
          }
        });
      }
    }
  },
  created() {
    this.GetAlarmData();
    this.toGetConvergeRoomAlarmSettings("NKD_AGG_DEVICE",2)
  }
};
</script>
<style >
#alarmSetWrapper {
  width: 95%;
  height: calc(100% - 69px);
  margin-left: 20px;
  margin-top: 20px;
  border: 1px solid;
  border-color: rgba(153, 153, 153, 1);
}
#alarmSetStatus {
  margin-top: 5px;
  margin-left: 90px;
}
.ant-table {
  line-height: 1 !important;
}
</style>