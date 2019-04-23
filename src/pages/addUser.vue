<template>
  <div id="addRoleWrapper">
    <div id="pageTitle">新增用户</div>
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="工号"
      >
        <a-input
          v-decorator="[
          'jobNum',
          {rules: [{ required: true,message:'请输入工号'}]}
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="用户名"
      >
        <a-input
          v-decorator="[
          'username',
          {rules: [{ required: true,message:'请输入用户名'}]}
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="密码"
      >
        <a-input
          type="password"
          v-decorator="[
          'password',
          {rules: [{ required: true,message:'请输入密码'}]}
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
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="姓名"
      >
        <a-input
          v-decorator="[
          'name',
          {rules: [{ required: true,message:'请输入姓名'}]}
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="手机号"
      >
        <a-input
          v-decorator="[
          'phone',
          {rules: [{ required: true,message:'请输入手机号'}]}
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="邮箱地址"
      >
        <a-input
          v-decorator="[
          'email',
          {rules: [{ required: true,message:'请输入邮箱地址'}]}
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="角色"
      >
        <a-select
          showSearch
          placeholder="请选择角色"
          optionFilterProp="children"
          style="width: 350px"
          v-decorator="[
          'role',
          {rules: [{ required: true,message:'请输入邮箱地址'}]}
        ]"
        >
          <a-select-option v-for=" item in rolesGroup" :value="item.id" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <div id="radioBox">
        <div id="radioText">
          状态
          <span>:</span>
        </div>
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
        <a-input v-decorator="[
          'remark'
        ]"/>
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
      value: 1,
      roleName: "",
      rolesGroup: []
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
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(["nickname"], { force: true });
      });
    }
  },
  created() {
    this.$http.toGetRoleManageList().then(res => {
      if (res.data.success) {
        this.rolesGroup = res.data.data;
      }
    });
  }
};
</script>
<style scoped>
#pageTitle {
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
#radioText span {
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