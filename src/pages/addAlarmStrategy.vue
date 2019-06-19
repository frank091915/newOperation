<template>
  <div id="alarmSetWrapper">
    <div id="tabWrapper">
      汇聚机房告警策略
      <div id="convergeRoomtitle"></div>

      <div id="convergeTableWrapper">
        <div id="formOneWrapper">
          <a-form :form="form">
            <a-form-item
              :label-col="theFormItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
              label="温度时长告警（s）"
            >
              <a-input
                size="small"
                v-decorator="[
                  
          'temperatureDuration',
          {rules: [{message:'请输入温度时长告警'}]}
        ]"
                style="margin-left:5px;width:280px;"
              />
            </a-form-item>
            <a-form-item
              :label-col="theFormItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
              label="湿度时长告警（s）"
            >
              <a-input
                size="small"
                v-decorator="[
                  
          'humidityDuration',
          {rules: [{message:'请输入湿度时长告警'}]}
        ]"
                style="margin-left:5px;width:280px;"
              />
            </a-form-item>
            <a-form-item
              :label-col="theFormItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
              label="烟雾时长告警（s）"
            >
              <a-input
                size="small"
                v-decorator="[
                  
          'smokeDuration',
          {rules: [{message:'请输入烟雾时长告警'}]}
         
        ]"
                style="margin-left:5px;width:280px;"
              />
            </a-form-item>
            <a-form-item
              :label-col="theFormItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
              label="门禁时长告警（s）"
            >
              <a-input
                size="small"
                v-decorator="[
                  
          'doorDuration',
          {rules: [{message:'请输入门禁时长告警'}]}
        ]"
                style="margin-left:5px;width:280px;"
              />
            </a-form-item>
            <a-form-item
              :label-col="theFormItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
              label="电力时长告警（s）"
            >
              <a-input
                size="small"
                v-decorator="[
                  
          'smokeDuration',
          {rules: [{message:'请输入电力时长告警'}]}
        ]"
                style="margin-left:5px;width:280px;"
              />
            </a-form-item>
            <a-form-item
              :label-col="theFormItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
              label="告警通知间隔（s）"
            >
              <a-input
                size="small"
                v-decorator="[
                  
          'warningInterval',
          {rules: [{message:'请输入告警通知间隔'}]}
        ]"
                style="margin-left:5px;width:280px;"
              />
            </a-form-item>
            <a-form-item
              :label-col="theFormItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
              label="最大警告次数"
            >
              <a-input
                size="small"
                v-decorator="[
                  
          'maxWarningCount',
          {rules: [{message:'请输入最大警告次数'}]}
        ]"
                style="margin-left:5px;width:280px;"
              />
            </a-form-item>
            <a-form-item
              :label-col="theFormItemLayout.labelCol"
              :wrapper-col="formTailLayout.wrapperCol"
            ></a-form-item>
          </a-form>
        </div>
        <a-form :form="form">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="最低温度"
          >
            <a-input
              size="small"
              v-decorator="[
                  
          'minTemperature',
          {rules: [{message:'请输入最低温度'}]}
        ]"
              style="margin-left:5px;width:280px;"
            />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="最低湿度"
          >
            <a-input
              size="small"
              v-decorator="[
                  
          'minHumidity',
          {rules: [{message:'请输入最低湿度'}]}
        ]"
              style="margin-left:5px;width:280px;"
            />
          </a-form-item>
        </a-form>

        <a-form :form="form">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="最高温度"
          >
            <a-input
              size="small"
              v-decorator="[
                  
          'maxTemperature',
          {rules: [{message:'请输入最高温度'}]}
        ]"
              style="margin-left:5px;width:280px;"
            />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="最高湿度"
          >
            <a-input
              size="small"
              v-decorator="[
                 
          'maxHumidity',
          {rules: [{message:'请输入最高湿度'}]}
        ]"
              style="margin-left:5px;width:280px;"
            />
          </a-form-item>
        </a-form>
      </div>
      <div id="convergeRoomOperationBox">
        <div id="opetarionBox">
          <a-button @click="toReturn" id="returnButton">返回</a-button>
          <a-button type="primary" @click="toSave">保存</a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
const columns = [
  {
    title: "序号",
    dataIndex: "key",
    width: "10%",
    scopedSlots: { customRender: "num" }
  },
  {
    title: "异常编号",
    dataIndex: "code",
    width: "10%",
    scopedSlots: { customRender: "age" }
  },
  {
    title: "描述",
    dataIndex: "remark",
    width: "15%",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "是否绑定",
    dataIndex: "mark",
    width: "10%",
    scopedSlots: { customRender: "weChatcheckBox" }
  }
];

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
      cmdbId: this.$route.query.cmdbId,
      warningStrategy: {}
    };
  },
  methods: {
    toReturn() {
      this.$router.go("-1");
    },
    toSave() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let alarmStrategy = {};
          alarmStrategy.warningStrategy = values;
          alarmStrategy.cmdbId = this.cmdbId;
          alarmStrategy.type = this.$route.query.type;
          // 添加权限菜单

          this.$http.toModifyAlarmStrategy(alarmStrategy).then(res => {
            if (res.data.success) {
              this.$message.success("添加告警策略");
              console.log("lalala")
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
    GetAlarmStrategyInfo(cmdbId, roomType) {
      this.$http.toGetAlarmStrategyInfo(cmdbId, roomType).then(res => {
        if (res.data.success) {
          this.warningStrategy = res.data.data.warningStrategy;
          this.$nextTick(() => {});
        } else {
          this.$message.error(res.data.message);
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
                this.addOrder(2);
              });
            } else {
              this.$message.error(res.data.message);
            }
          });
      }
    }
  },
  created() {}
};
</script>
<style scoped>
#alarmSetWrapper {
  width: 95%;
  height: calc(100% - 69px);
  margin-left: 20px;
  margin-top: 20px;
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
</style>