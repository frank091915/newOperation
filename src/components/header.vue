<template>
  <div id="header">
    <div id="headerInfo">header</div>
    <div id="dropDown">
      <a-dropdown>
        <a class="ant-dropdown-link" href="#">
          userId
          <a-icon type="down"/>
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">退出登陆</a>
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
export default {};
</script>
<style >
#header {
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
    border-bottom: 1px solid #bdbdbd;
}
#headerInfo{
    margin-left: 50px;
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