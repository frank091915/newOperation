<template>
  <div id="header">
    <div id="headerInfo"><div id="headerIcon" :style="menuIconStyle()"></div> <div id="infoSpan">{{title}}</div></div>
    <div id="dropDown">
      <div id="informationBox">
        <!-- <a-badge count="8"  style="width:5px;height:5px;" :offset="['28px','']">
          <img src="../../static/assets/icon_news.png" style="width:30px;height:30px;">
        </a-badge> -->
        <el-badge :value="6" class="item">
          <img src="../../static/assets/icon_news.png" style="width:30px;height:30px;">
        </el-badge>
      </div>
      <div class="avator">
          <a-avatar style="backgroundColor:#87d068" icon="user" />
      </div>
      <a-dropdown style="color: #ffffff;background-color:#94DEDD;border: 1px solid #94DEDD;margin-top:5px; " >
        <a-button style="margin-left: 8px;height:24px">
          {{username}} <a-icon type="down" />
        </a-button>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;" @click="signOut">退出登陆</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data()
  {
    return{
      title:"",
      username:"超级管理员"
    }
  },
  created(){
    this.title=this.$route.query.title;
    // this.$http.toGetUserInfo().then((res)=>{
    //   window.currentUserId=res.data.data.id
    //   this.username=res.data.data.username
    // })
  },
  methods:{
    signOut(){
      this.removeStorage();
      let logoutUrl = "https://cas.sustech.edu.cn/cas/logout";
      window.location.href = logoutUrl;
    },
    menuIconStyle(){
      return{
        'background-image':`url('../../../../static/assets/${this.menuIconPath(this.$route.query.menuIconId)}')`
      }
      
    },
    removeStorage(){
        window.sessionStorage.removeItem("token");
        window.sessionStorage.removeItem("user");
        window.sessionStorage.removeItem('ln');
        window.sessionStorage.removeItem('name');
        window.sessionStorage.removeItem('fn');
        window.sessionStorage.removeItem('groups');
        window.sessionStorage.removeItem('groupid');
        window.sessionStorage.removeItem('groupparentid');
        window.sessionStorage.removeItem('id');
        window.sessionStorage.removeItem('sid') ;
        window.sessionStorage.removeItem('actionlist');
        window.sessionStorage.removeItem('isLogin');
        window.sessionStorage.removeItem('ticket');
        
    },
    menuIconPath(menuIconId){
      let menuPath="";
      switch(menuIconId){
        case 1 : 
        return 'leftbar_status summary.png';
        case 2 : 
        return 'leftbar_location display.png';
        case 3 : 
        return 'leftbar_ollect.png';
        case 4 : 
        return 'leftbar_weak current.png';
        case 5 : 
        return 'leftbar_controinet.png';
        case 6 : 
        return 'leftbar_report.png';
        case 8 : 
        return 'leftbar_alarm maintenance.png';
        case 9 : 
        return 'leftbar_system settings.png';
      }
    }
  }
};
</script>
<style >
#header {
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: calc(100% - 220px) ;
  z-index: 99;
  background-color: #45C2BF;
}
#headerInfo{
    margin-left: 60px;
    font-weight: 600;
    font-size: 18px;
}
#dropDown{
    width: 252px;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    margin-right: 20px;
}
#headerIcon{
  float: left;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  margin-right: 10px;
}
#infoSpan{
  float: left;
}
#informationBox{
  width: 30px;
  height: 30px;
}
.avator{
  width: 30px;
  height: 30px;
}
</style>