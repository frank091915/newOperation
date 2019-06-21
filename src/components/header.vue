<template>
  <div id="header">
    <div id="headerInfo">{{title}}</div>
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
    }
  }
};
</script>
<style >
#header {
  height: 50px;
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
    margin-left: 50px;
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
</style>