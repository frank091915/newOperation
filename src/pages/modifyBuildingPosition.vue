<template>
  <div>
    <div id="pageTitle">编辑坐标信息</div>
    <div id="addRoleWrapper">
      <a-form :form="form">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="楼栋编号"
        >
          <a-input
            disabled="disabled"
            v-decorator="['cmdbCode',{initialValue:buildingPositionInfo.cmdbCode}]"
          />
        </a-form-item>

        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="楼栋名称"
        >
          <a-input
            disabled="disabled"
            v-decorator="['cmdbDescription',{initialValue:buildingPositionInfo.cmdbDescription}]"
          />
        </a-form-item>

        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="图片类型"
        >
          <a-input
            disabled="disabled"
            v-decorator="['imageType',{initialValue:buildingPositionInfo.imageType}]"
          />
        </a-form-item>

        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="X坐标"
        >
          <a-input
            v-decorator="[
          'xPosition',{rules: [{ required: true, message: '请输入X坐标' }],initialValue:buildingPositionInfo.xPosition}
        ]"
          />
        </a-form-item>

        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="Y坐标"
        >
          <a-input
            v-decorator="[
          'yPosition', {rules: [{ required: true, message: '请输入Y坐标' }],initialValue:buildingPositionInfo.yPosition}
        ]"
          />
        </a-form-item>

        <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
          <div id="opetarionBox">
            <a-button @click="toReturn" id="returnButton">返回</a-button>
            <a-button type="primary" @click="toSave">保存</a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
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
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),
      value: true,
      id: "",
      buildingPositionInfo: {},
      allExceptions: []
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
    toSave() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let buildingPositionInfo = { ...values };
          buildingPositionInfo.id = this.$route.query.id;
          this.$http
            .toModifyBuildingPosition(buildingPositionInfo)
            .then(res => {
              if (res.data.success) {
                this.$message.success("修改坐标成功");
                this.$router.push({
                  path: "/position",
                  query: { title: "楼栋坐标信息管理" }
                });
              } else {
                this.$message.error(res.data.errorInfo);
              }
            });
        }
      });
    },
    checkChange(e) {}
  },

  created() {
    this.$http.toGetBuildingPositionById(this.$route.query.id).then(res => {
      if (res.data.success) {
        this.buildingPositionInfo = res.data.data;
        this.$nextTick(() => {
          console.log(this.buildingPositionInfo);
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
  margin-bottom: 20px;
}
#radioBox {
  box-sizing: border-box;
  padding-left: 230px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
#radioText {
  margin-right: 20px;
  color: rgba(0, 0, 0, 0.85);
}
#radioText span {
  margin-left: 2px;
}
.ant-form-item {
  margin-bottom: 20px !important;
}
#permissionsMenu {
  margin-top: 20px;
}
#opetarionBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 358px;
  box-sizing: border-box;
  padding-left: 145px;
}
#supremeWrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}
#opetarionBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 358px;
  box-sizing: border-box;
  padding-left: 70px;
}

#returnButton {
  margin-right: 50px;
}
#menuSelection {
  max-height: calc(100% - 49px);
  margin-left: 100px;
}

#components-layout-demo-side {
  min-height: 50px !important;
  border: 1px solid #e8e8e8;
}
#addRoleWrapper {
  margin-top: 30px;
  width: 880px;
  margin: 0 auto;
}
#radioBox {
  box-sizing: border-box;
  padding-left: 101px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
</style>