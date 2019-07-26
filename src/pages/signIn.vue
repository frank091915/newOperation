<template>
  <div id="signInWrapper" >
    <!-- <a-spin size="large" /> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";


export default {
  data() {
    return {

    };
  },
  methods: {
    signIn(values) {

    },
  },
  created(){
    // 跳转到南科大cas认证系统
    let casAddress="https://cas.sustech.edu.cn/cas/login?service=";
    window.location.replace(casAddress + 'http://localhost:8080/index.html');
    // this.$http.turnToLoginPage((res)=>{
    //   console.log(res)
    //   alert("接收控制权")
    // })
 },
  mounted(){

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
#signInWrapper{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>