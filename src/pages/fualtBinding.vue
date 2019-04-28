
<template>
  <div id="alarmSetWrapper">
    <div id="tabWrapper">
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="汇聚机房" key="1" forceRender>
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
                  :checked="record.mark"
                  @change="onChangeFualtBinding(record.id,1)"
                />
              </template>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="弱电间" key="2">
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
                  :checked="record.mark"
                  @change="onChangeFualtBinding(record.id,2)"
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
    scopedSlots: { customRender: "num" },
    align:"center"
  },
  {
    title: "异常编号",
    dataIndex: "code",
    width: "10%",
    scopedSlots: { customRender: "age" },
    align:"center"
  },
  {
    title: "描述",
    dataIndex: "remark",
    width: "15%",
    scopedSlots: { customRender: "address" },
    align:"center"
  },
  {
    title: "是否绑定",
    dataIndex: "mark",
    width: "10%",
    scopedSlots: { customRender: "weChatcheckBox" },
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
      currentFualtId: this.$route.query.fualtId,
      convergeData: [],
      electronicData: [],
      columns,
      allDataArray: []
    };
  },
  methods: {
    addOrder(type=1) {
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
        this.FualtException(key)
    },
    changeStatus(typeId, $event) {
      this.$http.toSetAlarm(this.currentFualtId, typeId).then(res => {
        if (res.data.success) {
          this.$message.success("设置成功");
          this.GetAlarmData();
        } else {
          this.$message.error("设置失败，请重试");
        }
      });
    },
    FualtException(roomType) {
      this.$http.toGetFualtExceptionList(1,this.currentFualtId,roomType).then(res => {
        if (res.data.success) {
          if(roomType===1){
          this.convergeData = res.data.data;
          }else{
            this.electronicData = res.data.data;
          }

        this.$nextTick(()=>{
          console.log(res)
            this.addOrder(roomType)
        })
        } else {
          this.$message.error("获取数据失败，请重试");
        }
      });
    },
    toGetConvergeRoomAlarmSettings(type, key) {
      if (key == 2) {
        this.$http
          .toGetConvergeRoomAlarmSettings(this.currentFualtId, type)
          .then(res => {
            if (res.data.success) {
              this.convergeData = res.data.data;
              this.allDataArray = this.electronicData.concat(this.convergeData);
              this.$nextTick(() => {
                this.addOrder(1);
              });
            } else {
              this.$message.error("获取数据失败，请重试");
            }
          });
      } else {
        this.$http
          .toGetConvergeRoomAlarmSettings(this.currentFualtId, type)
          .then(res => {
            if (res.data.success) {
              this.electronicData = res.data.data;
              this.allDataArray = this.electronicData.concat(this.convergeData);
              this.$nextTick(() => {
                this.addOrder(2);
              });
            } else {
              this.$message.error("获取数据失败，请重试");
            }
          });
      }
    },
    onChangeFualtBinding(exceptionId,roomType) {
      this.$http.toChangeFualtException({faultId:this.currentFualtId,exceptionId}).then((res)=>{
        console.log(res);
        if (res.data.success) {
          this.$message.success("设置成功");
          console.log(roomType)
          this.FualtException(roomType)
        } else {
          this.$message.error("设置失败，请重试");
        }
      })
    }
  },
  created() {
    this.FualtException(1);
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