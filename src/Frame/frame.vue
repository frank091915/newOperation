<template>
  <div id="frame">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh" class="frame">
      <a-layout-sider
        width="250px"
        v-model="collapsed"
      >
        <div class="logo" >
          <img id="logo" src="../assets/u6.png">
        </div>
        <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
          <!-- 渲染一级菜单 -->
          <a-menu-item v-for="item in aloneMenu"  :key="item.id" @click="toNavigate(item.path,item.title)">
           
            <span>{{item.title}}</span>
          </a-menu-item>

          <a-sub-menu
            v-for="item in parentMenu" 
            :key="item.id"
          >
            <span slot="title"><span>{{item.title}}</span></span>
            <a-menu-item 
            v-for="subItem in item.subPermissions"
            :key="subItem.id"
            @click="toNavigate(subItem.path,subItem.title)"
            >{{subItem.title}}</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
    </a-layout>
  </div>
</template>
<script>
import {mapState} from "vuex"
export default {
  data() {
    return {
      collapsed: false,
      aloneMenu:[],
      parentMenu:[]
    }
  },
  created(){
    // 获取侧边栏菜单数据
    this.$http.toGetAsideMenu().then((res)=>{
      this.aloneMenu=res.data.data.filter((item)=>{
        if(item.subPermissions.length===0){
          return true
        }else{
          return false
        }
      });
      this.parentMenu=res.data.data.filter((item)=>{
        if(item.subPermissions.length != 0){
          return true
        }else{
          return false
        }
      })
      this.$nextTick(()=>{
      })
    })
  },
  computed:{
    ...mapState(["accessToken"])
  },
  methods:{
    toNavigate(path,title){
      // 获取需要的路径字符串
      let processedPath=path.slice(0,(path.length-3)).split("/").pop();
      let ultimatePath=path.split('/')
      ultimatePath=ultimatePath.slice(2,(ultimatePath.length-1))
      ultimatePath=ultimatePath.join("/")
      console.log(ultimatePath)

      this.$router.push({path:"/"+ ultimatePath,query:{title}})
    }
  }
}
</script>

<style>
html{height:100%}
body{height:100%}
#frame{
  max-height:100%;
}
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
#components-layout-demo-side{
   max-width: 250px !important;
   max-height: 100%;
}
.ant-layout-sider{
  min-width: 250px !important;
}
#components-layout-demo-side .logo{
  margin-bottom: 18px !important;
}
#logo{
  width: 162px;
  height: 44px;
}
#components-layout-demo-side .logo{
  margin: 0;
  height: 60px;
  background: rgba(0, 21, 41,1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.ant-menu-item{
  display: block;
}
.ant-menu{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.ant-menu .li{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.ant-menu-submenu{
  width: 100%;
}

.ant-menu-item{
  box-sizing: border-box;
  padding-left: 46px !important;
}
.ant-menu-submenu-title{
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
  box-sizing: border-box;
  padding-left: 46px !important;
  }
</style>
