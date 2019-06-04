<template>
  <div id="signInForm">
    <a-card title="监控系统登录">
      <div id="signInFormWraper">
        <a-form :form="form">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="用户名"
          >
            <a-input
              @keydown.enter="check"
              v-decorator="[
          'username',
          {rules: [{ required: true, message: '请输入用户名' }]}
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
              @keydown.enter="check"
              type="password"
              v-decorator="[
          'password',
          {rules: [{ required: true, message: '请输入密码' }]}
        ]"
              placeholder="请输入密码"
            />
          </a-form-item>
          <a-form-item
            :label-col="formTailLayout.labelCol"
            :wrapper-col="formTailLayout.wrapperCol"
          >
            <a-button type="primary" @click="check">登陆</a-button>
          </a-form-item>
        </a-form>
      </div>
      <!-- 模态框 -->
      <a-button v-show="visible" @click="showConfirm">Confirm</a-button>
      <a-button duration="errorDuration" v-show="hasError" @click="error"></a-button>
    </a-card>
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
      this.form.validateFields((err, values) => {
        if (!err) {
          this.signIn(values);
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
    signIn(values) {
      this.$http.toSignIn(values).then(res => {
        if (res.data.success) {
          window.sessionStorage.setItem(
            "operationToken",
            JSON.stringify(res.data.accessToken)
          );
          // 提示用户登录成功，之后再跳转页面
          this.$router.push({
            path: "/summary",
            query: { title: "状态汇总", menuId: 1 }
          });
          // this.showConfirm();
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
            path: "/summary",
            query: { title: "状态汇总" }
          });
        },
        onCancel() {}
      });
    },
    error() {
      this.$message.config({
        duration: 1
      });
      this.$message.error("登录失败，请重新登录");
    }
  },
  mounted(){
    console.log(window.location.search)
    // if(window.location.search=='?invalidToken'){
    //   alert('登录失效，请重新登录')
    // }
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
  margin: 0 auto;
  margin-top: 200px;
}
#signInFormWraper {
  width: 600px;
}
</style>