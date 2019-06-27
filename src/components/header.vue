<template>
  <div id="header">
    <div id="headerInfo"><div id="headerIcon" :style="menuIconStyle()"></div> <div id="infoSpan">{{title}}</div></div>
    <div id="dropDown">
      <a-dropdown>
        <span class="ant-dropdown-link" href="#" style="color: #1890ff;">
          {{username}}
          <a-icon type="down"/>
        </span>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;" @click="signOut">退出登陆</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <div class="avator">
          <a-avatar style="backgroundColor:#87d068" icon="user" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data()
  {
    return{
      title:"",
      username:""
    }
  },
  created(){
    this.title=this.$route.query.title,
    this.$http.toGetUserInfo().then((res)=>{
      window.currentUserId=res.data.data.id
      this.username=res.data.data.username
    })
  },
  beforeRouteEnter (to, from, next) {
    
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.title=to.query.title
    })
  },
  methods:{
    signOut(){
      this.$http.toSignOut();
      this.$message.success('退出成功')
      this.$router.push("/signIn")
      window.sessionStorage.removeItem("operationToken")
    },
    menuIconStyle(){
      return{
        'background-image':`url('../../../../static/assets/${this.menuIconPath(this.$route.query.menuIconId)}')`
      }
      
    },
    menuIconPath(menuIconId){
      console.log(menuIconId)
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
  height: 61px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bdbdbd;
  position: fixed;
  top: 0;
  width: calc(100% - 260px) ;
  z-index: 99;
  background-color: white;
}
#headerInfo{
    margin-left: 60px;
    font-weight: 600;
    font-size: 18px;
}
#dropDown{
    width: 110px;
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
</style>