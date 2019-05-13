<template>
  <div id="addRoleWrapper">
    <div id="pageTitle">编辑用户</div>
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="工号"
      >
        <a-input
          v-decorator="[
          'jobNum',
          {rules: [{ required: true,message:'请输入工号'}],
          initialValue:userInformation.jobNum
          }
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
          {rules: [{ required: true,message:'请输入姓名'}],
          initialValue:userInformation.name
          }
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
          {rules: [{ required: true,message:'请输入手机号'}],
            initialValue:userInformation.phone
          }
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
          {rules: [{ required: true,message:'请输入微信号'}],
            initialValue:userInformation.wxId
          }
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
          {rules: [{ required: true,message:'请输入邮箱地址'}],
          initialValue:userInformation.eMail
          }
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
          'roleIds',
          {rules: [{ required: true,message:'请选择角色'}],initialValue:userInformation.roles.length ? userInformation.roles[0].name : ''
          },
        ]"
          @select="select"
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
          <a-button @click="toReturn" id="returnButton">返回</a-button>
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
      value: true,
      roleName: "",
      id: "",
      userInformation: {},
      rolesGroup: [],
      roleIds: ""
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
          let userInfo = { ...values };
          console.log(userInfo);
          userInfo.status = this.value ? "true" : "false";
          userInfo.userId = this.$route.query.id;
          userInfo.roleIds = this.roleIds;
          // 添加权限菜单
          this.$http.toModifyUser(userInfo).then(res => {
            if (res.data.success) {
              this.$message.success("用户编辑成功");
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
    this.$http.toGetUserInfoById(this.$route.query.id).then(res => {
      if (res.data.success) {
        this.userInformation = res.data.data;
        // this.roleIds=res.data.data
        this.$nextTick(() => {
          console.log(this.userInformation);
          this.roleIds = this.userInformation.roles[0].id;
          this.value = this.userInformation.status ? 1 : 0;
        });
      }else {
              this.$message.error(res.data.errorInfo);
            }
    });
    this.$http.toGetRoleManageList().then(res => {
      if (res.data.success) {
        this.rolesGroup = res.data.data;
      }
      this.$nextTick(()=>{
      })

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
#addRoleWrapper {
  width: 650px;
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
  margin-top: 20px;
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