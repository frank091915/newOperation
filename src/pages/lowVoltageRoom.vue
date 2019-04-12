<template>
  <div id="convergeRoomWraper">
    <div id="statusBar">
      <div id="convergeRoomHeaderWraper">
        <div>电间实时状态</div>
        <a-input-search placeholder="搜索汇聚机房名称" style="width: 200px" @search="onSearch"/>
      </div>
    </div>
    <div id="convergeRoomBox"></div>
  </div>
</template>
<script>
export default {
  name: "convergeRoom",
  methods: {
    onSearch(value) {
      console.log(value);
    }
  }
};
</script>
<style >
#statusBar {
  height: 50px;
  border-bottom: 1px solid #bdbdbd;
  margin-left: 30px;
  width: 95%;
}
#convergeRoomHeaderWraper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
#convergeRoomWraper{
    height: calc(100% - 50px);
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: center;
}
#convergeRoomBox{
    flex: 1;
    width: 95%;
    margin-left: 30px;
}
</style>