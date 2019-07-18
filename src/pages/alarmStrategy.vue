<template>
  <div id="alarmSetWrapper">
    <div id="tabWrapper">
      <a-tabs :activeKey=defualfKey @change="callback">
        <a-tab-pane tab="汇聚机房告警策略" key='1' forceRender>
          <div class="convergeRoomSearchWrapper">
              <div class="buildingSearch">
                <div class="label">楼宇名称：</div>
                <div id="buildingSearchInput">
                  <a-select
                    size="small"
                    defaultValue="检测中心"
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    style="width: 150px;height:25px;"
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
              <div class="floorSearch">
                <div class="label">楼层：</div>
                <div id="floorSearchInput">
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
              <div class="roomSearch">
                <div class="label">房间：</div>
                <div id="roomSearchInput">
                  <a-select
                    size="small"
                    defaultValue="检测中心"
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    style="width:230px;height:25px"
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
              <div class="searchByNames">
                <div class="searchByNamesInput">
                  <a-button @click="search(true)" type="primary" size="small">搜索</a-button>
                </div>
              </div>
          </div>
          <div id="tableWrapper">
            <a-table
              :columns="convergeColumns"
              :dataSource="convergeData"
              :rowClassName="(record, index)=>{
                if(index%2 != 0) return 'table-evenRow'
              } "
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
                    @click="modifyAlarmStrategy(record.warningStrategy.cmdbId,'1',record.deviceInfo.Code)"
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
                  :hideOnSinglePage="true"
                />
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="弱电间告警策略" key='2'>
                    <div class="convergeRoomSearchWrapper">
              <div class="buildingSearch">
                <div class="label">楼宇名称：</div>
                <div id="buildingSearchInput">
                  <a-select
                    size="small"
                    defaultValue="检测中心"
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    style="width: 150px;height:25px;"
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
              <div class="floorSearch">
                <div class="label">楼层：</div>
                <div id="floorSearchInput">
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
              <div class="roomSearch">
                <div class="label">房间：</div>
                <div id="roomSearchInput">
                  <a-select
                    size="small"
                    defaultValue="检测中心"
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    style="width:230px;height:25px"
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
              <div class="searchByNames">
                <div class="searchByNamesInput">
                  <a-button @click="search(true)" type="primary" size="small">搜索</a-button>
                </div>
              </div>
          </div>
          <div id="lowVolttageTableWrapper">
            <div id="tableWrapper">
              <a-table
                :columns="lowVolttageColumns"
                :dataSource="electronicData"
                :rowClassName="(record, index)=>{
                  if(index%2 != 0) return 'table-evenRow'
                } "
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
                      @click="modifyAlarmStrategy(record.warningStrategy.cmdbId,'2',record.deviceInfo.Code)"
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
                    :hideOnSinglePage="true"
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
const convergeColumns = [
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
const lowVolttageColumns = [
  {
    title: "序号",
    dataIndex: "key",
    width: "5%",
    scopedSlots: { customRender: "key" },
    align: "center"
  },
  {
    title: "弱电间编号",
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
    align: "center",
    customRender: (value, row, index) => {
      if(!row.deviceInfo.location){
        row.deviceInfo.location="——"
      }
      return value
    }
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
      convergeColumns,
      lowVolttageColumns,
      allDataArray: [],
      recordsTotal: 0,
      roomType: this.$route.query.defualfKey ? (this.$route.query.defualfKey ==1 ? "NKD_AGG_DEVICE" : "NKD_WEAK_ELECTRIC_ADVICE")  :  "NKD_AGG_DEVICE",
      isLoading: true,
      current: 1,
      page: 1,
      type: 1,
      defualfKey:this.$route.query.defualfKey ? this.$route.query.defualfKey : '1',
      buildingId: "全部",
      nullStatus: "null",
      allBuildings: [],
      allFloors: [],
      allRooms: [],
      floor: "全部",
      room: "全部",
    };
  },
  methods: {
    modifyAlarmStrategy(cmdbId,selectedKey,strategyCode) {
      console.log(strategyCode)
      this.changeDefualtKey(selectedKey)
      let roomName=selectedKey == '1' ? "汇聚机房"  : " 弱电间";
      this.$router.push({
        path: "/modifyAlarmStrategy",
        query: { title: "告警策略管理", cmdbId, type: this.roomType,defualfKey:this.defualfKey, roomName,strategyCode}
      });
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
    },handleFloorChange(e) {
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
      this.buildingId= "全部";
      this.floor = "全部";
      this.room = "全部";
      this.allFloors = [];
      this.allRooms = [];
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
    search(){
      this.page=1;
      this.current=1;
      this.$nextTick(()=>{
          console.log(this.defualfKey,this.page,this.buildingId,this.floor,this.room);
          let buildingParam=this.buildingId == "全部" || this.buildingId == "null" ? null : this.buildingId,
              floorParam=this.floor == "全部" || this.floor == "null" ? null : this.floor,
              roomParam=this.room == "全部" || this.room == "null" ? null : this.room;
              console.log(buildingParam ,floorParam ,roomParam)
              this.getAlarmStrategy(this.defualfKey,this.roomType,this.page,buildingParam,floorParam,roomParam);
      })
    },
    getAlarmStrategy(roomType, roomName, page,buildingParam,floorParam,roomParam) {
      this.isLoading = true;
      this.$http.toGetAlarmStrategy(roomName, page,buildingParam,floorParam,roomParam).then(res => {
        if (res.data.success) {
          if (roomType == 1) {
            this.convergeData = res.data.data;
            this.$nextTick(() => {
              this.convergeData=this.convergeData.map((item)=>{
                if(!item.deviceInfo.location){
                  item.deviceInfo.location="——"
                }
                return item
              })
            });
          } else {
            this.electronicData = res.data.data;
          }
          this.$nextTick(() => {
            this.electronicData=this.electronicData.map((item)=>{
                if(!item.deviceInfo.location){
                  item.deviceInfo.location="——"
                }
                return item
              })
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
      let buildingParam=this.buildingId == "全部" || this.buildingId == "null" ? null : this.buildingId,
          floorParam=this.floor == "全部" || this.floor == "null" ? null : this.floor,
          roomParam=this.room == "全部" || this.room == "null" ? null : this.room;
      this.page = page;
      this.$nextTick(() => {
        this.getAlarmStrategy(1, this.roomType, this.page,buildingParam,floorParam,roomParam);
        this.type = 1;
      });
    },
    changePageOnLovaltageRoom(page) {
      let buildingParam=this.buildingId == "全部" || this.buildingId == "null" ? null : this.buildingId,
          floorParam=this.floor == "全部" || this.floor == "null" ? null : this.floor,
          roomParam=this.room == "全部" || this.room == "null" ? null : this.room;
      this.page = page;
      this.$nextTick(() => {
        this.getAlarmStrategy(2, this.roomType, this.page,buildingParam,floorParam,roomParam);
      });
    },
    ...mapMutations(['changeDefualtKey']),
  },
  created() {
    window.sessionStorage.setItem('alarmStrageSelectedKey',JSON.stringify({key:1}))
    let defualfKey=this.$route.query.defualfKey ?  this.$route.query.defualfKey : 1;
    // console.log(defualfKey)
    this.getAlarmStrategy(defualfKey, this.roomType, 1);

    // 获取楼栋信息
    this.$http.toGetBuildingList().then(res => {
      if (res.data.success) {
        this.allBuildings = res.data.data;
      }
    });
  },
  computed:{
    ...mapState(['defualtKeyFromVuex'])
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`

    // this.changeDefualtKey('1')
    next()
  }
};
</script>
<style scoped>
#alarmSetWrapper {
  min-height: calc(100vh - 61px);
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
  margin-top: 2vh;
}
.convergeRoomSearchWrapper{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
}
.buildingSearch {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 230px;
  margin: 0 15px;
}
.floorSearch {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.roomSearch {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
}
.searchByNamesInput {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
}
</style>