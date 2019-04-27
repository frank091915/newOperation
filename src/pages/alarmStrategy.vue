<template>
  <div id="alarmSetWrapper">
    <div id="tabWrapper">
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="汇聚机房告警策略" key="1" forceRender>
          <div id="tableWrapper">
            <a-table :columns="columns" :dataSource="convergeData" bordered>
              <template
                v-for="col in ['name', 'age', 'address']"
                :slot="col"
                slot-scope="text, record,index"
              >
                <div :key="col">
                  <a-input
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    :pagination="false"
                    @change="e => handleChange(e.target.value, record.key, col)"
                  />
                  <template v-else>{{text}}</template>
                </div>
              </template>
              <template slot="operation" slot-scope="text, record, index">
                <div class="editable-row-operations">
                  <a-button @click="modifyAlarmStrategy(record.warningStrategy.cmdbId)" type="primary" size="small">编辑</a-button>
                </div>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="弱电间告警策略" key="2">
          <div id="lowVoltageRoom">弱电间告警策略</div>
          <div id="lowVolttageTableWrapper">
          <div id="tableWrapper">
            <a-table :columns="columns" :dataSource="convergeData" bordered>
              <template
                v-for="col in ['name', 'age', 'address']"
                :slot="col"
                slot-scope="text, record,index"
              >
                <div :key="col">
                  <a-input
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    :pagination="false"
                    @change="e => handleChange(e.target.value, record.key, col)"
                  />
                  <template v-else>{{text}}</template>
                </div>
              </template>
              <template slot="operation" slot-scope="text, record, index">
                <div class="editable-row-operations">
                  <a-button @click="modifyAlarmStrategy(record.warningStrategy.cmdbId)" type="primary" size="small">编辑</a-button>
                </div>
              </template>
            </a-table>
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
    scopedSlots: { customRender: "key" }
  },
  {
    title: "汇聚机房编号",
    dataIndex: "deviceInfo.Code",
    width: "8%",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "描述",
    dataIndex: "deviceInfo.Description",
    width: "8%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "楼宇名称",
    dataIndex: "deviceInfo.buildingName",
    width: "8%",
    scopedSlots: { customRender: "remark" }
  },
  {
    title: "楼层",
    dataIndex: "deviceInfo.floorName",
    width: "8%",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "房间",
    dataIndex: "deviceInfo.Room",
    width: "8%",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "设备MAC地址",
    dataIndex: "deviceInfo.MacAddress",
    width: "8%",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "校园地图坐标点",
    dataIndex: "deviceInfo.location",
    width: "8%",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "10%",
    scopedSlots: { customRender: "operation" }
  }
  
];
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
};
const theFormItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12, offset: 2 }
};

export default {
  data() {
    return {
      checkNick: false,
      formItemLayout,
      formTailLayout,
      theFormItemLayout,
      form: this.$form.createForm(this),
      value: 1,
      roleName: "",
      rolesGroup: [],
      alarmData: [],
      currentFualtId: this.$route.query.fualtId,
      convergeData: [],
      electronicData: [],
      columns,
      allDataArray: [],
      recordsTotal: "",
      roomType:"NKD_AGG_DEVICE"
    };
  },
  methods: {
    modifyAlarmStrategy(cmdbId) {
      this.$router.push({
        path: "/modifyAlarmStrategy",
        query: { title: "告警策略管理",cmdbId,type:this.roomType}
      });
    },
    addAlarmStrategy() {
      this.$router.push({ path: "/addAlarmStrategy", query: { title: "告警策略管理",type:this.roomType } });
    },
    confirmDelete(user) {
      this.$http.toDeleteRole(user.id).then(res => {
        if (res.data.success) {
          this.$message.success("删除成功");
          this.getRoleList();
        } else {
          this.$message.success("删除失败，请重试");
        }
      });
    },
    toReturn() {
      console.log("return");
      this.$router.go("-1");
    },
    toSave() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let userInfo = { ...values };
          userInfo.status = this.value ? true : false;
          // 添加权限菜单

          console.log(userInfo);
          this.$http.toAddUser(userInfo).then(res => {
            console.log(res);
            if (res.data.success) {
              this.$message.success("添加用户成功");
              this.$router.push({
                path: "/user",
                query: { title: "用户管理" }
              });
            } else {
              this.$message.error(res.data.errorInfo);
            }
          });
        }
      });
    },
    addOrder(type = 1) {
      let i = 1;
      if (type === 1) {
        this.convergeData = this.convergeData.filter(item => {
          item["key"] = i++;
          return true;
        });
      } else {
        this.electronicData = this.electronicData.filter(item => {
          item["key"] = i++;
          return true;
        });
      }
    },
    callback(key) {
        this.roomType= key==1? "NKD_AGG_DEVICE" :"NKD_WEAK_ELECTRIC_ADVICE";
        this.$nextTick(()=>{
            console.log(this.roomType)
         this.getAlarmStrategy(key,this.roomType);
        })

    },
    getAlarmStrategy(roomType, roomName, page=1) {
      this.$http.toGetAlarmStrategy(roomName, page).then(res => {
        if (res.data.success) {
          if (roomType === 1) {
            this.convergeData = res.data.data;
          } else {
            this.electronicData = res.data.data;
          }

          this.$nextTick(() => {
            console.log(res);
            this.addOrder(roomType);
          });
        } else {
          this.$message.error("获取数据失败，请重试");
        }
      });
    },
    toGetConvergeRoomAlarmSettings(type, key) {
      if (key == 1) {
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
    onChangeFualtBinding(exceptionId, roomType) {
      this.$http
        .toChangeFualtException({ faultId: this.currentFualtId, exceptionId })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.$message.success("设置成功");
            console.log(roomType);
            this.FualtException(roomType);
          } else {
            this.$message.error("设置失败，请重试");
          }
        });
    }
  },
  created() {
    this.getAlarmStrategy(1, this.roomType, 1);
  }
};
</script>
<style scoped>
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
.ant-form-item {
  margin-bottom: 0 !important;
}
#convergeTableWrapper {
  margin: 0 auto;
  display: flex;
  width: 1280px;
  flex-direction: row;
  justify-content: space-around;
}
#convergeRoomOperationBox {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#returnButton {
  margin-right: 100px;
}
#alarmSetWrapper{
    max-height: calc(100% - 70px);
    overflow: auto;
    box-sizing: border-box;
    padding-right: 10px;
}
#addBox{
    height: 20px;
    margin-bottom:5px;
}
</style>