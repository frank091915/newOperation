<template>
  <div id="signInForm">
      <div id="signInFormWraper">
          <div id="signInFormTitle">
          监控系统登录
      </div>
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
    <a-form-item
      :label-col="formTailLayout.labelCol"
      :wrapper-col="formTailLayout.wrapperCol"
    >
      <a-button
        type="primary"
        @click="check"
      >
        登陆
      </a-button>
    </a-form-item>
  </a-form>
      </div>
  </div>
</template>

<script>
	import {mapActions,mapGetters} from "vuex"
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};
export default {
  data () {
    return {
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),
    };
  },
  methods: {
    check  () {
      this.form.validateFields(
        (err) => {
          if (!err) {
            console.info('success');
            this.signIn()
          }else{
              
          }
        },
      );
    },
    handleChange  (e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true });
      });
    },
      signIn(){
      this.$http.toSignIn("1").then((res)=>{
          if(res.data.success){
            console.log(this.ifLogin)
            window.sessionStorage.setItem("operationToken",JSON.stringify({"accessToken":res.data.accessToken}))
            this.$router.push("/overview")
          }else{

          }
      })
     }
  },
  computed:{
    login:()=>{
      return "lalala"
    },
    ...mapGetters(["ifLogin"])
  }

};
</script>
<style scoped>
    body{
        height: 100%;
        width: 100%;
    }
    #signInForm{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #signInFormWraper{
        width: 600px;
    }
</style>