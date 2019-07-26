<template>
  <div id="superWrapper">
    <div id="app">
      <router-view name="signIn">
      </router-view>
      <router-view name="frame"></router-view>
      <div id="main" >
          <router-view name="header"></router-view>
          <router-view name="main"></router-view>
      </div>
      <div id="components-back-top-demo-custom">
        <a-back-top :visibilityHeight="50" />
      </div>
    </div>
    <!-- <div v-show="logIn" id="logIn">
        <a-spin tip="数据正在加载中...">
          <div class="spin-content"></div>
        </a-spin>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      logIn:true,
      hasSavedInformation:false
    };
  },
  methods: {
    saveInformation(res){
        window.sessionStorage.setItem("token",res.data.token);
        window.sessionStorage.setItem("user",res.data.userProfileModule.user);
        window.sessionStorage.setItem('ln',res.data.userProfileModule.ln);
        window.sessionStorage.setItem('name',res.data.userProfileModule.name);
        window.sessionStorage.setItem('fn',res.data.userProfileModule.fn);
        window.sessionStorage.setItem('groups',res.data.userProfileModule.groups);
        window.sessionStorage.setItem('groupid',res.data.userProfileModule.groupid);
        window.sessionStorage.setItem('groupparentid',res.data.userProfileModule.groupparentid);
        window.sessionStorage.setItem('id', res.data.userProfileModule.id);
        window.sessionStorage.setItem('sid',res.data.userProfileModule.sid) ;
        window.sessionStorage.setItem('actionlist',res.data.userProfileModule.actionList.join(','));
        window.sessionStorage.setItem('isLogin',true);
        this.hasSavedInformation=true;
        this.$nextTick(()=>{
            console.log("拿到token后，跳转到首页")
            // window.location.replace("/")
            this.$router.push({path:'/mine'})
        })
    }
  },
  created(){
    console.log(window.location.pathname)
    if(window.location.pathname=="/index.html"){
          this.$http.ticektCheck().then((res)=>{
          console.log(res.data)
          if(res.data.isSuccess) {
            this.saveInformation(res)
              // window.sessionStorage.setItem("token",res.data.token);
              // window.sessionStorage.setItem("user",res.data.userProfileModule.user);
              // window.sessionStorage.setItem('ln',res.data.userProfileModule.ln);
              // window.sessionStorage.setItem('name',res.data.userProfileModule.name);
              // window.sessionStorage.setItem('fn',res.data.userProfileModule.fn);
              // window.sessionStorage.setItem('groups',res.data.userProfileModule.groups);
              // window.sessionStorage.setItem('groupid',res.data.userProfileModule.groupid);
              // window.sessionStorage.setItem('groupparentid',res.data.userProfileModule.groupparentid);
              // window.sessionStorage.setItem('id', res.data.userProfileModule.id);
              // window.sessionStorage.setItem('sid',res.data.userProfileModule.sid) ;
              // window.sessionStorage.setItem('actionlist',res.data.userProfileModule.actionList.join(','));
              // window.sessionStorage.setItem('isLogin',true);
              
          } else {
              // let logoutUrl = "https://cas.sustech.edu.cn/cas/logout";
              // this.$http.firstCheck(logoutUrl).then((res)=>{

              //     let cscURl = "https://cas.sustech.edu.cn/cas/login?service=" + "http://localhost:8080/loginredirect";
              //     window.location.href = cscURl;
              // })
          }
    })
    }else{
      console.log("不是/index.html")
    }

 },
  mounted(){

  },
  computed: {
  }
};

</script>

<style>
html,body{
  height: 100%;
}
#superWrapper{
  height: 100%;
  position: relative;
}
#logIn{
  position: absolute;
  top: 50%;
  left: 50%;
  bottom: 50%;
  right: 50%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  min-height: 100%;
}
#main {
  flex: 1;
  width: calc(100% - 220px );
  margin-left: 220px;
  margin-top: 61px;
  /* background-color: #F1F5F6; */
}
#components-back-top-demo-custom .ant-back-top {
    bottom: 20px;
    right: 10px;
    /* background-color: #1088e9; */
  }
/* ant-d表格样式 */
.table-evenRow {
  background-color: #F5F8FF;
}
.ant-table-tbody > tr > td{
  border:none;
}
.ant-table-thead > tr > th{
  font-weight: 600 !important;
}
/* .ant-table-thead{
  background-color: red !important;
} */
.ant-table-thead > tr > th{
  background-color: #ECF2FF !important;
}
.ant-pagination-item-active{
  border: 1px solid white !important;
}
.ant-table-footer{
  background-color: #ECF2FF !important;
}
.ant-form-item-label{
  display: flex !important;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.ant-tabs-tab{
  color: #A0A0A0 !important;
  margin-right: 0px !important;
  font-size: 17px !important;
  width: 160px !important;
  border-right:1px solid #F5F5F5  !important;
  text-align: center;
  box-sizing: border-box;
}
.ant-tabs-tab-active{
  background-color: #D4F1F0 !important;  
}
.ant-tabs-ink-bar{
  background-color:#2BB7B3 !important;
}
</style>
