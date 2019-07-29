<template>
  <div id="frame" style="height: 100vh">
    <a-layout id="components-layout-demo-side"  class="frame">
      <a-layout-sider
        width="220px"
        v-model="collapsed"
      >
        <div class="logo"  style="background-color:#3BBDBA">
          <img id="logo" src="../assets/sustech.png">
        </div>
        <div id="menuWrapper">
        <a-menu   :selectedKeys="[currentMenuId]" mode="inline"  :openKeys="[openedMenu]" v-for=" item in allParentMenu" :key="item.path">
          <!-- 渲染一级菜单 -->
          <a-menu-item v-if="!item.SubActions"  :key="item.path" 
          @click="toNavigate(item.path,item.title,item.ActionID,item,item.ActionID)"
          :class=" {'ant-menu-item-selected': selectedMenuId == item.ActionID}"
          >
            <span class="menuIcon" :style="menuIconStyle(item.ActionID)"></span> <span  :class=" {'menu-item-active': selectedMenuId == item.ActionID}">{{item.ActionName}}</span>
          </a-menu-item>
          <a-sub-menu
            v-else
            :key="item.ActionID"  
            @titleClick='handleSelect' 
            :class=" {'ant-menu-item-selected': selectedMenuId == item.ActionID}"
          >
            <span slot="title" ><span class="menuIcon" :style="menuIconStyle(item.ActionID)"></span><span class="menuTitle">{{item.ActionName}}</span></span>
            <a-menu-item 
            v-for="subItem in item.SubActions"
            :key="subItem.ActionID"
            @click="toNavigate(subItem.path,subItem.title,subItem.ActionID,subItem,subItem.SupperActionID)"
            class="childrenMenu"
            :class=" {'ant-menu-item-selected': selectedMenuId == subItem.ActionID}"
            style="height:25px;line-height:25px"
            >{{subItem.ActionName}}</a-menu-item>
          </a-sub-menu>
        </a-menu>
        </div>
      </a-layout-sider>
    </a-layout>
    <!-- 版本信息 -->
    <!-- <div style="height:30px;width:220px;box-sizing:border-box;color:rgba(255, 255, 255, 0.65);padding-left:10px;text-align:center" >
      {{versionDescription +"  " + number}}
    </div> -->
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
      number:'',
      versionDescription:'',
      selectedMenuId:1
    }
  },
  created(){
    // 获取菜单
    let _this=this;
    setTimeout(function(){
          _this.$http.toGetMenu(window.sessionStorage.getItem("token")).then((res)=>{
            console.log("菜单",res)
            if(res.data.IsSuccess){
              console.log(res.data.Model.Actions)
              _this.allParentMenu=res.data.Model.Actions;
              
            }
          })
    },500)

    // // 获取侧边栏菜单数据
    // this.$http.toGetAsideMenu().then((res)=>{
    //   this.allParentMenu=res.data.data;
    //   this.aloneMenu=res.data.data.filter((item)=>{
    //     if(item.subPermissions.length===0){
    //       return true
    //     }else{
    //       return false
    //     }
    //   });
    //   this.parentMenu=res.data.data.filter((item)=>{
    //     if(item.subPermissions.length != 0){
    //       return true
    //     }else{
    //       return false
    //     }
    //   })
    //   this.$nextTick(()=>{
    //       this.openedParentMenu()
    //   })
    // });

    // // 请求版本信息
    // this.$http.toGetLatestVersion().then((res)=>{
    //   // console.log(res)
    //   if(res.data.success){
    //     this.number=res.data.data.number;
    //     this.versionDescription=res.data.data.test ? "测试" : '';
    //   }
    // })

  },
  computed:{
    ...mapState(["accessToken"])
  },
  methods:{
    toNavigate(path,title,menuId,item,menuIconId){
      // if(item.SubActions){
        this.openedMenu=menuIconId
      // }
      menuIconId=parseInt(menuIconId);

      // // console.log(path)
      // // 获取需要的路径字符串
      this.currentMenuId=menuId;

      // // 记录选中的父级菜单
      this.selectedMenuId=menuIconId;
      // let processedPath=path.slice(0,(path.length-3)).split("/").pop();
      // let ultimatePath=path.split('/')
      // ultimatePath=ultimatePath.slice(2,(ultimatePath.length-1))
      // ultimatePath=ultimatePath.join("/")
      // this.$router.push({path:"/"+ ultimatePath,query:{title,menuId,menuIconId}})
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
      // console.log(item.key)
      if(this.openedMenu==item.key){
        this.openedMenu=''
      }else{
      this.openedMenu=item.key
      }
    },
    menuIconStyle(id){
      if(this.selectedMenuId==id){
        return{
          'background-image':`url('../../../../static/assets/${this.menuIconPathSelected(id)}')`
        }
      }else{
        return{
          'background-image':`url('../../../../static/assets/${this.menuIconPathUnselected(id)}')`
        }
      }
    },
    menuIconPathSelected(id){
      switch(id){
        case 110130 : 
        return 'tab_icon_gerenshouye_s.png';
        case 110120 : 
        return 'tab_icon_fenxitongji_s.png';
        case 110020 : 
        return 'tab_icon_wodexiangmu_s.png';
        case 110090 : 
        return 'tab_icon_xinjianlichengbei_s.png';
        case 110060 : 
        return 'tab_icon_goutongguanli_s.png';
        case 110100 : 
        return 'tab_icon_xiangmuzichan_s.png';
        case 110020 : 
        return 'tab_icon_xiangmulixiang_s.png';
        case 110021 : 
        return 'tab_icon_jishuwenjian_s.png';
        case 110050 : 
        return 'tab_icon_xiangmuguanli_s.png';
        case 110070 : 
        return 'tab_icon_wenjianzhongxin_s.png';
        case 110040 : 
        return 'tab_icon_zhaobiaoguanli_s.png';
        case 110080 : 
        return 'tab_icon_jichuguanli_s.png';
        case 110110 : 
        return 'tab_icon_xiangmuhendaotu_s.png';
        case 110030 : 
        return 'tab_icon_gongyingshangguanli_s.png';
        case 110010 : 
        return 'tab_icon_yusuanguanli_s.png';
        case 110140 : 
        return 'tab_icon_xiangmuguanli_s.png';
        
      }
    },
    menuIconPathUnselected(id){
      switch(id){
        case 110130 : 
        return 'tab_icon_gerenshouye_n.png';
        case 110120 : 
        return 'tab_icon_fenxitongji_n.png';
        case 110020 : 
        return 'tab_icon_wodexiangmu_n.png';
        case 110090 : 
        return 'tab_icon_xinjianlichengbei_n.png';
        case 110060 : 
        return 'tab_icon_goutongguanli_n.png';
        case 110100 : 
        return 'tab_icon_xiangmuzichan_n.png';
        case 110020 : 
        return 'tab_icon_xiangmulixiang_n.png';
        case 110021 : 
        return 'tab_icon_jishuwenjian_n.png';
        case 110050 : 
        return 'tab_icon_xiangmuguanli_n.png';
        case 110070 : 
        return 'tab_icon_wenjianzhongxin_n.png';
        case 110040 : 
        return 'tab_icon_zhaobiaoguanli_n.png';
        case 110080 : 
        return 'tab_icon_jichuguanli_n.png';
        case 110110 : 
        return 'tab_icon_xiangmuhendaotu_n.png';
        case 110030 : 
        return 'tab_icon_gongyingshangguanli_n.png';
        case 110010 : 
        return 'tab_icon_yusuanguanli_n.png';
        case 110140 : 
        return 'tab_icon_xiangmuguanli_n.png';
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff !important;
}
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
#components-layout-demo-side{
   max-width: 220px !important;
   max-height: 100%;
}
.ant-layout-sider{
  min-width: 220px !important;
}
#components-layout-demo-side .logo{
  /* margin-bottom: 18px !important; */
}
#logo{
  width: 172px;
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
  padding-left: 20px !important;
  margin-bottom: 0px !important;
  margin-top: 0px !important;
  border-bottom: 1px solid #F7F7F7 !important;
}
.ant-menu-submenu{
  border-bottom: 1px solid #F7F7F7 !important;
}
.childrenMenu {
  border-bottom: none !important;
}
.ant-menu-item::after{
  border-right:none !important;
}
.ant-menu-submenu-title{
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
  box-sizing: border-box;
  padding-left: 20px !important;
  }
  .childrenMenu{
    box-sizing: border-box;
    padding-left: 55px !important;
    padding-right:5px !important;
    width: 220px !important;
  }
  .childrenMenu{
    margin-top: 3px !important;
    margin-bottom: 0 !important;
  }
  .childrenMenu:nth-child(1){
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  #menuWrapper{
    height: calc(100% - 60px);
    overflow: auto;
    background-color: #fff !important;
  }
  .menuIcon{
    display: inline-block;
    width: 13px;
    height: 13px;
    margin-top:13px;
    float: left;
    margin-right: 10px;
    background-size: 100% 100%;
  }
  .menuTitle{
    display: inline-block;
    float: left;
  }
  .ant-menu .ant-menu-inline .ant-menu-sub{
    z-index: 100 !important;
  }
  .childrenMenu .ant-menu-item{
    z-index: 100 !important;
  }
  .menu-item-active{
    color: #fff;
  }
</style>
