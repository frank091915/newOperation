<template>
  <div id="alarmSetWrapper">
    <div id="tabWrapper">
      <a-tabs :activeKey=defualfKey @change="callback">
        <a-tab-pane tab="汇聚机房告警策略" key='1' forceRender>
          <div id="tableWrapper">
            <a-table
              :columns="columns"
              :dataSource="convergeData"
              bordered
              :pagination="false"
              :loading="isLoading"
            >
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
                  <a-button
                    @click="modifyAlarmStrategy(record.warningStrategy.cmdbId,'1')"
                    type="primary"
                    size="small"
                  >编辑</a-button>
                </div>
              </template>
            </a-table>
            <div id="pagination" v-show="!isLoading">
              
              <div id="total">共<span style="margin:0 5px;">{{recordsTotal}}</span>条数据</div>
              <div id="paginationBox">
                <a-pagination
                  @change="changePageOnConvergeRoom"
                  v-model="current"
                  :total="recordsTotal"
                  :pageSize="12"
                  v-show="!isLoading"
                />
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="弱电间告警策略" key='2'>
          <div id="lowVolttageTableWrapper">
            <div id="tableWrapper">
              <a-table
                :columns="columns"
                :dataSource="electronicData"
                bordered
                :pagination="false"
                :loading="isLoading"
              >
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
                    <a-button
                      @click="modifyAlarmStrategy(record.warningStrategy.cmdbId,'2')"
                      type="primary"
                      size="small"
                    >编辑</a-button>
                  </div>
                </template>
              </a-table>
              <div id="pagination" v-show="!isLoading">
                
                <div id="total">共<span style="margin:0 5px;">{{recordsTotal}}</span>条数据</div>
                <div id="paginationBox">
                  <a-pagination
                    @change="changePageOnLovaltageRoom"
                    v-model="current"
                    :total="recordsTotal"
                    :pageSize="12"
                    v-show="!isLoading"
                  />
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
import {mapState,mapMutations} from "vuex"
const columns = [
  {
    title: "序号",
    dataIndex: "key",
    width: "5%",
    scopedSlots: { customRender: "key" },
    align: "center"
  },
  {
    title: "汇聚机房编号",
    dataIndex: "deviceInfo.Code",
    width: "8%",
    scopedSlots: { customRender: "name" },
    align: "center"
  },
  {
    title: "描述",
    dataIndex: "deviceInfo.Description",
    width: "15%",
    scopedSlots: { customRender: "address" },
    align: "center"
  },
  {
    title: "楼宇名称",
    dataIndex: "deviceInfo.buildingName",
    width: "10%",
    scopedSlots: { customRender: "remark" },
    align: "center"
  },
  {
    title: "楼层",
    dataIndex: "deviceInfo.floorName",
    width: "10%",
    scopedSlots: { customRender: "name" },
    align: "center"
  },
  {
    title: "房间",
    dataIndex: "deviceInfo.roomName",
    width: "15%",
    scopedSlots: { customRender: "name" },
    align: "center"
  },
  {
    title: "设备MAC地址",
    dataIndex: "deviceInfo.MacAddress",
    width: "10%",
    scopedSlots: { customRender: "name" },
    align: "center"
  },
  {
    title: "校园地图坐标点",
    dataIndex: "deviceInfo.location",
    width: "9%",
    scopedSlots: { customRender: "name" },
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "8%",
    scopedSlots: { customRender: "operation" },
    align: "center"
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
      recordsTotal: 0,
      roomType: this.$route.query.roomType ? this.$route.query.roomType :  "NKD_AGG_DEVICE",
      isLoading: true,
      current: 1,
      page: 1,
      type: 1,
      defualfKey:this.$route.query.defualfKey ? this.$route.query.defualfKey : '1',
    };
  },
  methods: {
    modifyAlarmStrategy(cmdbId,selectedKey) {
      this.changeDefualtKey(selectedKey)
      let roomName=selectedKey == '1' ? "汇聚机房"  : " 弱电间";
      this.$router.push({
        path: "/modifyAlarmStrategy",
        query: { title: "告警策略管理", cmdbId, type: this.roomType,defualfKey:this.defualfKey, roomName}
      });
    },
    addAlarmStrategy() {
      this.$router.push({
        path: "/addAlarmStrategy",
        query: { title: "告警策略管理", type: this.roomType }
      });
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
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    addOrder(type) {
      let i = 1 + (this.page - 1) * 12;
      if (type == 1) {
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
      this.changeDefualtKey(key)
      // console.log(this.defualtKeyFromVuex)
      this.defualfKey=key;
      this.roomType = key == 1 ? "NKD_AGG_DEVICE" : "NKD_WEAK_ELECTRIC_ADVICE";
      this.$nextTick(() => {
        this.current = 1;
        this.page = 1;
        this.$nextTick(() => {
          this.getAlarmStrategy(key, this.roomType, this.page);
        });
      });
    },
    getAlarmStrategy(roomType, roomName, page) {
      this.isLoading = true;
      this.$http.toGetAlarmStrategy(roomName, page).then(res => {
        if (res.data.success) {
          if (roomType == 1) {
            this.convergeData = res.data.data;
            this.$nextTick(() => {});
          } else {
            this.electronicData = res.data.data;
          }
          this.$nextTick(() => {
            this.recordsTotal = res.data.recordsTotal;
            this.isLoading = false;
            this.addOrder(roomType);
          });
        }else {
              this.$message.error(res.data.errorInfo);
            }
      });
    },
    toGetConvergeRoomAlarmSettings(type, key) {
      this.isLoading = true;
      if (key == 1) {
        this.$http
          .toGetConvergeRoomAlarmSettings(this.currentFualtId, type)
          .then(res => {
            if (res.data.success) {
              this.convergeData = res.data.data;
              this.allDataArray = this.electronicData.concat(this.convergeData);
              this.$nextTick(() => {
                this.isLoading = false;
                this.addOrder(1);
              });
            } else {
              this.$message.error(res.data.message);
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
                this.isLoading = false;
                this.addOrder(2);
              });
            } else {
              this.$message.error(res.data.message);
            }
          });
      }
    },
    onChangeFualtBinding(exceptionId, roomType) {
      this.$http
        .toChangeFualtException({ faultId: this.currentFualtId, exceptionId })
        .then(res => {
          if (res.data.success) {
            this.$message.success("设置成功");
            this.FualtException(roomType);
          } else {
            this.$message.error("设置失败，请重试");
          }
        });
    },
    changePageOnConvergeRoom(page) {
      this.page = page;
      this.$nextTick(() => {
        this.getAlarmStrategy(1, this.roomType, this.page);
        this.type = 1;
      });
    },
    changePageOnLovaltageRoom(page) {
      this.page = page;
      this.$nextTick(() => {
        this.getAlarmStrategy(2, this.roomType, this.page);
      });
    },
    ...mapMutations(['changeDefualtKey']),
  },
  created() {
    window.sessionStorage.setItem('alarmStrageSelectedKey',JSON.stringify({key:1}))
    console.log(this.defualtKeyFromVuex)
    this.getAlarmStrategy(this.defualfKey, this.roomType, 1);
  },
  computed:{
    ...mapState(['defualtKeyFromVuex'])
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log('leave')
    this.changeDefualtKey('1')
    next()
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
#alarmSetWrapper {
  max-height: calc(100% - 70px);
  box-sizing: border-box;
  padding-right: 10px;
}
#addBox {
  height: 20px;
  margin-bottom: 5px;
}
#pagination {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
}
</style>