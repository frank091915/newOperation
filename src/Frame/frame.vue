<template>
  <div id="frame">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh" class="frame">
      <a-layout-sider
        width="250px"
        v-model="collapsed"
      >
        <div class="logo" >
          <img id="logo" src="../assets/sustech.png">
        </div>
        <div id="menuWrapper">
        <a-menu  theme="dark" :selectedKeys="[currentMenuId]" mode="inline"  :openKeys="[openedMenu]" v-for=" item in allParentMenu" :key="item.path">
          <!-- 渲染一级菜单 -->
          <a-menu-item v-if="!item.subPermissions.length"  :key="item.path" @click="toNavigate(item.path,item.title,item.id,item)">
            <span>{{item.title}}</span>
          </a-menu-item>
          <a-sub-menu
            v-else
            :key="item.id"  
            @titleClick='handleSelect' 
          >
            <span slot="title" ><span>{{item.title}}</span></span>
            <a-menu-item 
            v-for="subItem in item.subPermissions"
            :key="subItem.id"
            @click="toNavigate(subItem.path,subItem.title,subItem.id,subItem)"
            class="childrenMenu"
            style="height:25px;line-height:25px"
            >{{subItem.title}}</a-menu-item>
          </a-sub-menu>
        </a-menu>
        </div>
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
      parentMenu:[],
      currentMenuId:Number.parseInt(this.$route.query.menuId),
      allParentMenu:[],
      openedMenu:0, 
    }
  },
  created(){

    // 获取侧边栏菜单数据
    this.$http.toGetAsideMenu().then((res)=>{
      this.allParentMenu=res.data.data;
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
          this.openedParentMenu()
      })
    });

  },
  computed:{
    ...mapState(["accessToken"])
  },
  methods:{
    toNavigate(path,title,menuId,item){
      console.log(path)
      // 获取需要的路径字符串
      this.currentMenuId=menuId;
      let processedPath=path.slice(0,(path.length-3)).split("/").pop();
      let ultimatePath=path.split('/')
      ultimatePath=ultimatePath.slice(2,(ultimatePath.length-1))
      ultimatePath=ultimatePath.join("/")
      this.$router.push({path:"/"+ ultimatePath,query:{title,menuId}})
    },
    // 获取需要展开的父级菜单
    openedParentMenu(){
      let
      openedParentMenu=this.parentMenu.filter((item)=>{
        return item.subPermissions.some((subItem)=>{
          if(subItem.id==this.currentMenuId){
            return true
          }else{
            return false
          }
        })
      });

      this.openedMenu=Number.parseInt(openedParentMenu.length > 0 ?  openedParentMenu[0].id : "") 
    },
    handleSelect(item){
      if(this.openedMenu==item.key){
        this.openedMenu=''
      }else{
      this.openedMenu=item.key
      }
    }
  }
}
</script>

<style>
html{height:100%}
body{height:100%}
#frame{
  height:100%;
  position: fixed;
  z-index: 99;
}
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
#components-layout-demo-side{
   max-width: 260px !important;
   max-height: 100%;
}
.ant-layout-sider{
  min-width: 260px !important;
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
  .childrenMenu{
    box-sizing: border-box;
    padding-left: 65px !important;
    padding-right:5px !important;
    width: 260px !important;
  }
  #menuWrapper{
    height: calc(100% - 60px);
    overflow: auto;
  }
</style>
