<template>
  <div id="app">
    <router-view name="frame"></router-view>
    <div id="main">
        <router-view name="signIn"></router-view>
        <router-view name="header"></router-view>
        <router-view name="main"></router-view>
    </div>
    <div id="components-back-top-demo-custom">
      <a-back-top :visibilityHeight="50" />
    </div>
  </div>
</template>

<script>



</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-height: 100%;
  box-sizing: border-box;
  height: 100%;
}
#main {
  flex: 1;
  /* position: fixed;
  left: 260px; */
  width: calc(100% - 260px );
  /* height: 100%; */
  margin-left: 260px;
  margin-top: 50px;
}
#components-back-top-demo-custom .ant-back-top {
    bottom: 20px;
    right: 10px;
    /* background-color: #1088e9; */
  }

</style>
