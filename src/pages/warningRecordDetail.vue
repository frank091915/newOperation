<template>
  <div>
    <div id="pageTitle">告警记录通知详情</div>
    <div id="supremeDetailsWrapper">
      <div id="roomDetailsWrapper">
        <div id="paramsBox">
          <div class="singleParamsBox">
            <div class="detailTitle" style="margin-right:10px">楼宇名称</div>
            <div class="detailParam">{{details.deviceInfo.buildingName}}</div>
          </div>
          <div class="singleParamsBox">
            <div class="detailTitle" style="margin-right:10px">楼层</div>
            <div class="detailParam">{{details.deviceInfo.floorName}}</div>
          </div>
          <div class="singleParamsBox">
            <div class="detailTitle" style="margin-right:10px">房间</div>
            <div class="detailParam">{{details.deviceInfo.roomName}}</div>
          </div>
          <div class="singleParamsBox">
            <div class="detailTitle" style="margin-right:10px">{{details.deviceInfo.roomName}}编号</div>
            <div class="detailParam">{{details.deviceInfo.Code}}</div>
          </div>
          <div class="singleParamsBox" style="margin-bottom: 15px;">
            <div class="detailTitle" style="margin-right:10px">描述</div>
            <div class="detailParam">{{details.deviceInfo.Description}}</div>
          </div>
          <div class="singleParamsBox" style="margin-bottom: 15px;">
            <div class="detailTitle" style="margin-right:10px">设备MAC地址</div>
            <div class="detailParam">{{details.deviceInfo.MacAddress}}</div>
          </div>
          <div class="singleParamsBox" style="margin-bottom: 15px;">
            <div class="detailTitle" style="margin-right:10px">异常类型</div>
            <div class="detailParam">{{details.warningRecord.exceptionRemark}}</div>
          </div>
          <div class="singleParamsBox" style="margin-bottom: 15px;">
            <div class="detailTitle" style="margin-right:10px">记录时间</div>
            <div class="detailParam">{{details.warningRecord.time}}</div>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align:center;font-weight: bolder;margin: 15px;">告警记录通知列表</div>
    <div id="pageWrapper">
      <a-table
        :columns="columns"
        :dataSource="notifyInfo"
        :pagination="false"
        bordered
        :scroll="{y:790}"
        :loading="isLoading"
      >
        <template v-for="col in ['name', 'age', 'address']" :slot="col" slot-scope="text, record">
          <div :key="col">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0;"
              :value="text"
              @change="e => handleChange(e.target.value, record.key)"
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
    title: "通知人员",
    dataIndex: "userName",
    width: "10%",
    scopedSlots: { customRender: "userName" },
    align: "center"
  },
  {
    title: "通知方式",
    dataIndex: "way",
    width: "10%",
    scopedSlots: { customRender: "way" },
    align: "center"
  },
  {
    title: "通知内容",
    dataIndex: "content",
    width: "40%",
    scopedSlots: { customRender: "content" },
    align: "center"
  },
  {
    title: "通知时间",
    dataIndex: "time",
    width: "10%",
    scopedSlots: { customRender: "time" },
    align: "center"
  },
  {
    title: "是否通知成功",
    dataIndex: "success",
    width: "10%",
    scopedSlots: { customRender: "success" },
    align: "center"
  }
];

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12, offset: 2 }
};
export default {
  data() {
    return {
      notifyInfo: [],
      columns,
      isLoading: true,
      checkNick: false,
      formItemLayout,
      formTailLayout,
      value: true,
      id: "",
      details: {}
    };
  },
  methods: {
    toReturn() {
      this.$router.go("-1");
    },
    select(value) {
      console.log(value);
      this.roleIds = value;
    },
    checkChange(e) {}
  },

  created() {
    this.details = this.$route.query.record;
    this.$http
      .getWarningRecordDetail(this.details.warningRecord.id)
      .then(res => {
        if (res.data.success) {
          this.notifyInfo = res.data.data.notifyList;
          this.notifyInfo = this.notifyInfo.filter(res => {
            if (res.way == 1) {
              console.log(this.notifyInfo);
              res.way = "邮件";
            }
            if (res.way == 2) {
              res.way = "短信";
            }
            if (res.way == 3) {
              res.way = "微信";
            }
            if (res.success) {
              res.success = "成功";
            } else {
              res.success = "失败";
            }
            return true;
          });

          this.$nextTick(() => {
            this.isLoading = false;
          });
        } else {
          this.$message.error(res.data.errorInfo);
        }
      });
  }
};
</script>
<style scoped>
#pageTitle {
  padding-left: 69px;
  height: 50px;
  border-bottom: 1px solid #bdbdbd;
  line-height: 50px;
  font-weight: 600;
}
.singleParamsBox {
  width: 25%;
  margin-top: 15px;
}
#paramsBox {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  background-color: #f2f2f2;
}
.detailTitle {
  color: #999999;
  width: 95px;
  text-align: right;
  float: left;
}
.detailParam {
  float: left;
}
#roomDetailsWrapper {
  margin: 0 auto;
}
#supremeDetailsWrapper {
  height: calc(100% - 50px);
  box-sizing: border-box;
}
</style>