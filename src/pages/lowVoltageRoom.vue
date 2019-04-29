<template>
  <div id="convergeRoomWraper">
    <div id="statusBar">
      <div id="convergeRoomHeaderWraper">
        <div v-show="normal" id="statusBox">
          <div class="faultyCountBox">故障：{{fauly}}</div>
          <div class="abnormalCountBox">异常：{{abnormal}}</div>
          <div class="unknownCountBox">未知：{{unknown}}</div>
          <div class="normalCountBox">正常：{{normal}}</div>
        </div>
        <a-input-search placeholder="搜索汇聚机房名称" style="width: 200px" @search="onSearch"/>
      </div>
    </div>
    <div id="convergeRoomBox">
      <div
        v-for="item in roomList "
        :key="item.Id"
        :type="item.statusDescription"
        class="statusDisplay"
      >
        <div class="imgWrapper">
          <img :src='color(item.statusDescription)' @click="toShowDetails(item.Id)">
        </div>

        <p>{{item.roomName}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "convergeRoom",
  data() {
    return {
      roomList: [],
      normal: "",
      abnormal: "",
      fauly: "",
      unknown: 0,
      title:""
    };
  },
  methods: {
    onSearch(value) {
      console.log(value);
    },
    color(status) {
      switch (status) {
        case "异常":
          return ('../../static/assets/lowVoltageRoomYellow.png');
        case "正常":
          return ('../../static/assets/lowVoltageRoomGreen.png');
        case "故障":
          return ('../../static/assets/lowVoltageRoomRed.png');
      }
    },
    toShowDetails(id){
      console.log(id)
      this.$router.push({path:"/roomDetails",query:{title:"弱电间详情",detailsId:id,roomType:2}})
    }
  },
  created() {
    this.title=this.$route.query.title;
    this.$http.toGetlowVoltageRoomList().then(res => {
      if (res.data.success) {
        this.roomList = res.data.data.device;
        this.normal = res.data.data.normalCount;
        this.abnormal = res.data.data.exceptionCount;
        this.fauly = res.data.data.faultCount;
        this.$nextTick(() => {
          console.log(res);
        });
      } else {
        // 错误请求处理
      }
    });
  }
};
</script>
<style scoped>
html,body{
  height: 100%;
}
#main{
  max-height: 100%;
  overflow: auto;
  font-size: 14px;
}
#statusBar {
  height: 50px;
  border-bottom: 1px solid #bdbdbd;
  margin-left: 30px;
  width: 95%;
}
#convergeRoomHeaderWraper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
#convergeRoomWraper {
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
}
#convergeRoomBox {
  width: 95%;
  overflow: auto;
  margin-left: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
}
.statusDisplay {
  width: 90px;
  height: 100px;
  margin-top: 30px;
  margin-right: 102px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.imgWrapper {
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
}
.imgWrapper img{
  width: 40px;
  height: 40px;
}
#statusBox {
  width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #333333;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
}
</style>