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
          <a-menu-item key="1">
           
            <span>状态汇总</span>
          </a-menu-item>
          <a-menu-item key="2">

            <span>位置展示</span>
          </a-menu-item>
          <a-sub-menu
            key="sub1"
          >
            <span slot="title"><span>汇聚机房状态实时展示</span></span>
            <a-menu-item key="3">Tom</a-menu-item>
            <a-menu-item key="4">Bill</a-menu-item>
            <a-menu-item key="5">Alex</a-menu-item>
          </a-sub-menu>
          <a-sub-menu
            key="sub2"
          >
            <span slot="title"><span>弱电间实时状态</span></span>
            <a-menu-item key="6">Team 1</a-menu-item>
            <a-menu-item key="8">Team 2</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
    </a-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    }
  },
}
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
#components-layout-demo-side{
   max-width: 250px !important;
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
  padding-left: 0px !important;
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
  padding-right:104px !important;
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
