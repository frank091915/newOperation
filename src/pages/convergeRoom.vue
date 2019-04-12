<template>
  <div id="convergeRoomWraper">
    <div id="statusBar">
      <div id="convergeRoomHeaderWraper">
        <div>汇聚机房状态展示</div>
        <a-input-search placeholder="搜索汇聚机房名称" style="width: 200px" @search="onSearch"/>
      </div>
    </div>
    <div id="convergeRoomBox">
      <div 
      v-for="item in roomList " 
      :key="item.roomInfo._id" 
      :type="item.roomInfo._type"
      class="statusDisplay">
        <img src="../assets/computerRoomGreen.png" >
        <p>{{item.roomInfo.Description}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "convergeRoom",
  data(){
  return{
    roomList:[]
  }
  },
  methods: {
    onSearch(value) {
      console.log(value);
    }
  },
  created(){
    this.$http.toGetconvergeRoomList().then((res)=>{
      if(res.data.success){
          this.roomList=res.data.data.device;
          this.$nextTick(()=>{

            console.log(this.roomList)
          })
      }else{
        // 错误请求处理
      }
    })
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
    width: 95%;
    margin-left: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: flex-start;
}
.statusDisplay{
  width: 90px;
  height: 100px;
  margin-top: 30px;
  margin-right: 102px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.statusDisplay img{
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
}
</style>