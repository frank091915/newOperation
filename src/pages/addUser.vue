<template>
<div>
  <div id="pageTitle">新增用户</div>
  <div id="addRoleWrapper">
    <a-form :form="form">
      <a-form-item
              style="margin-top:20px"
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
        label="微信号"
      >
        <a-input
          v-decorator="[
          'wxId',
          {rules: [{ required: true,message:'请输入微信号'}]}
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
          style="width: 218px"
          v-decorator="[
          'role',
          {rules: [{ required: true,message:'请选择角色'}]}
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
        <a-input type="textarea" v-decorator="[
          'remark'
        ]"/>
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
      value: 1,
      roleName: "",
      rolesGroup: []
    };
  },
  methods: {
    toReturn() {
      this.$router.go("-1");
    },
    toSave() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let userInfo = { ...values };
          userInfo.status = this.value ? true : false;
          // 添加权限菜单
          this.$http.toAddUser(userInfo).then(res => {
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
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    checkChange(e) {}
  },
  created() {
    this.$http.toGetAllRoleManageList(1).then(res => {
      if (res.data.success) {
        this.rolesGroup = res.data.data;
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
#menuSelection {
  max-height: calc(100% - 49px);
}

#components-layout-demo-side {
  min-height: 50px !important;
  border: 1px solid #e8e8e8;
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
#radioText {
  margin-right: 20px;
  color: rgba(0, 0, 0, 0.85);
}
#radioText span {
  margin-left: 2px;
}
#addRoleWrapper {
  margin-top: 20px;
  width: 880px;
  margin: 0 auto;
}
.ant-form-item {
  margin-bottom: 20px !important;
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
#permissionsMenu {
  margin-top: 20px;
}
#permissionsMenuTitle {
  margin-bottom: 2px;
}
#returnButton {
  margin-right: 50px;
}
</style>