<template>
  <div id="signInForm">
    <div id="signInFormWraper">
      <div id="signInFormTitle">监控系统登录</div>
      <a-form :form="form">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="用户名"
        >
          <a-input
            v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your name' }]}
        ]"
            placeholder="请输入用户名"
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
          'nickname',
          {rules: [{ required: true, message: 'Please input your nickname' }]}
        ]"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
          <a-button type="primary" @click="check">登陆</a-button>
        </a-form-item>
      </a-form>
    </div>
    <!-- 模态框 -->
    <a-button v-show="visible" @click="showConfirm">Confirm</a-button>
    <a-button duration="errorDuration" v-show="hasError" @click="error"></a-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
};
export default {
  data() {
    return {
      checkNick: false,
      formItemLayout,
      spinning: true,
      formTailLayout,
      form: this.$form.createForm(this),
      visible: false,
      hasError: false,
      errorDuration: 1
    };
  },
  methods: {
    check() {
      this.form.validateFields(err => {
        if (!err) {
          this.signIn();
        } else {
        }
      });
    },
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(["nickname"], { force: true });
      });
    },
    signIn() {
      this.$http.toSignIn("1").then(res => {
        console.log(res)
        if (res.data.success) {
          window.sessionStorage.setItem(
            "operationToken",
            JSON.stringify(res.data.accessToken)
          );
          // 提示用户登录成功，之后再跳转页面

          this.showConfirm();
        } else {
          this.error();
        }
      });
    },
    showConfirm() {
      this.$confirm({
        title: "登录成功",
        content: "立即跳转",
        onOk: () => {
          this.$router.push({
            path:"/summery",
            query:{title:"状态汇总"}
          });
        },
        onCancel() {}
      });
    },
    error() {
      this.$message.config({
        duration: 1,
      });
      this.$message.error("登录失败，请重新登录");
    }
  },
  computed: {
    login: () => {
      return "lalala";
    },
    ...mapGetters(["ifLogin"])
  }
};
</script>
<style scoped>
body {
  height: 100%;
  width: 100%;
}
#signInForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#signInFormWraper {
  width: 600px;
}
</style>