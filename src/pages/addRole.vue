<template>
  <div id="addRoleWrapper">
      <div id="pageTitle">
          新增角色
      </div>
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="角色名称"
      >
        <a-input
          v-decorator="[
          'name',
          {rules: [{ required: true,message:'请输入角色名称'}]}
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Code"
      >
        <a-input
          v-decorator="[
          'code',
          {rules: [{ required: true,message:'请输入以ROLE_开头的Code'}]}
        ]"
          placeholder="请输入以ROLE_开头"
        />
      </a-form-item>
      <div id="radioBox">
        <div id="radioText">状态<span>:</span></div>
        <a-radio-group v-model="value">
          <a-radio :value="1">正常</a-radio>
          <a-radio :value="0">关闭</a-radio>
        </a-radio-group>
      </div>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="备注"
      >
        <a-input
          v-decorator="[
          'remark',
          {rules: [{ required: true, message: '请输入备注' }]}
        ]"
        />
      </a-form-item>
      <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
        <div id="opetarionBox">
          <a-button @click="toReturn">返回</a-button>
          <a-button type="primary" @click="toSave">保存</a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
};
const formTailLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12, offset: 2 }
};
export default {
  data() {
    return {
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),
      value: 1,
      roleName: ""
    };
  },
  methods: {
    toReturn() {
      console.log("return");
      this.$router.go("-1");
    },
    toSave() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let userInfo = { ...values };
          userInfo.status = this.value ? true : false;
          this.$http.toAddRole(userInfo).then(res => {
            console.log(res);
            if (res.data.success) {
              this.$message.success("添加角色成功");
              this.$router.push({
                path: "/role",
                query: { title: "角色管理" }
              });
            } else {
              this.$message.error(res.data.errorInfo);
            }
          });
        }
      });
    },
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(["nickname"], { force: true });
      });
    }
  }
};
</script>
<style scoped>
#pageTitle{
    margin-left: 52px;
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
#radioText span{
    margin-left: 2px;
}
#addRoleWrapper {
  margin-top: 20px;
}
.ant-form-item {
  margin-bottom: 20px !important;
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
</style>