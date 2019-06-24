<template>
  <div id="signInWrapper" :style="{'position':'fixed','left':positionLeft()}">
    <div id="signInForm">
        
        <div id="signInFormWraper">
          <div id="signInTitle">监控系统</div>
          <a-form :form="form">
            <a-form-item
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
              style="border-bottom:1px solid #EBEBEB;position:relative;width:20vw"
            >
              <i style="display:inline-block;width:28px;height:30px;background-image:url('../../static/assets/login_icon_user.png');position:absolute;top:-5px;left:0;"></i>
              <a-input
                @keydown.enter="check"
                style="border:none;margin-left:30px;margin-bottom:10px;width:150px"
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
              style="border-bottom:1px solid #EBEBEB;position:relative;width:20vw"
            >
            <i style="display:inline-block;width:28px;height:30px;background-image:url('../../static/assets/login_icon_password.png');position:absolute;top:-5px;left:0;"></i>
              <a-input
                @keydown.enter="check"
                style="border:none;margin-left:30px;margin-bottom:10px;width:150px;"
                type="password"
                v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }]}
                 ]"
                placeholder="请输入密码"
              />
            </a-form-item>

              <a-button type="primary" @click="check" style="margin-top:9.35vh;width:200px;border-radius:18px;height:50px;font-size:18px;margin-left:5vw;">登陆</a-button>

          </a-form>
        </div>
        <!-- 模态框 -->
        <a-button v-show="visible" @click="showConfirm">Confirm</a-button>
        <a-button duration="errorDuration" v-show="hasError" @click="error"></a-button>
    </div>
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
    positionLeft(){
     
      let leftParam=1080*document.documentElement.clientWidth/1920;
       console.log(document.documentElement.clientHeight)
      return  leftParam +"px"
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
          this.error(res.data.message);
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
    error(message) {
      this.$message.config({
        duration: 1
      });
      this.$message.error(message);
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
<style >
#app{
  background-image: url("../../static/assets/login.png");
  background-size: 100% 100%;
}
#main{
  margin: 0;
}
#signInForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 29vh;
}
#signInFormWraper {
  width: 600px;
}
#signInTitle{
  font-size: 30px;
  color: rgb(51,51,51);
  font-family: SourceHanSansCN-Medium;
  margin-left: 7vw;
  margin-bottom: 8vh;
}
</style>