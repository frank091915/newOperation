<template>
  <div id="superWrapper">
    <div id="app">
      <router-view name="signIn">
      </router-view>
      <router-view name="frame"></router-view>
      <div id="main">
          <router-view name="header"></router-view>
          <router-view name="main"></router-view>
      </div>
      <div id="components-back-top-demo-custom">
        <a-back-top :visibilityHeight="50" />
      </div>
    </div>
  </div>
</template>

<script>


</script>

<style>
html,body{
  height: 100%;
}
#superWrapper{
  height: 100%;
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
  /* position: fixed;
  left: 260px; */
  width: calc(100% - 260px );
  /* height: 100%; */
  margin-left: 260px;
  margin-top: 61px;
  background-color: #F1F5F6;
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
</style>
