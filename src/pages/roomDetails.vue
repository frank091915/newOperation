<template>
  <div id="supremeDetailsWrapper">
    <div id="roomDetailsWrapper">
      <div id="paramsBox">
        <div class="singleParamsBox">
          <div class="detailTitle" style="margin-right:10px">楼宇名称</div>
          <div class="detailParam">{{details.deviceInfo.buildingName}}</div>
        </div>
        <div class="singleParamsBox">
          <div class="detailTitle" style="margin-right:10px">楼层</div>
          <div class="detailParam">{{details.deviceInfo.floorName}}</div>
        </div>
        <div class="singleParamsBox">
          <div class="detailTitle" style="margin-right:10px">房间</div>
          <div class="detailParam">{{details.deviceInfo.roomName}}</div>
        </div>
        <div class="singleParamsBox">
          <div class="detailTitle" style="margin-right:10px">汇聚机房编号</div>
          <div class="detailParam">{{details.deviceInfo.Code}}</div>
        </div>
        <div class="singleParamsBox">
          <div class="detailTitle" style="margin-right:10px">描述</div>
          <div class="detailParam">{{details.deviceInfo.Description}}</div>
        </div>
        <div class="singleParamsBox">
          <div class="detailTitle" style="margin-right:10px">设备MAC地址</div>
          <div class="detailParam">{{details.deviceInfo.MacAddress}}</div>
        </div>
      </div>
      <div id="statusBox">
        <div class="singleStatusBox">
          <div class="iconBox">
            <img :src="color('smoke',details.deviceData.smoke)">
          </div>
          <div class="statusDescription">
            <div
              class="textDescription"
            >{{details.deviceData.smoke ? (details.deviceData.smoke ? " 正常 " : " 异常" ) : " 未知"}}</div>
            <div class="status">烟雾状态</div>
          </div>
        </div>
        <div class="singleStatusBox">
          <div class="iconBox">
            <img :src="color('electric',details.deviceData.ups)" id="ups">
          </div>
          <div class="statusDescription">
            <div
              class="textDescription"
            >{{details.deviceData.ups ? (details.deviceData.ups ? " 正常 " : " 异常" ) : " 未知"}}</div>
            <div class="status">电力状态</div>
          </div>
        </div>
        <div class="singleStatusBox">
          <div class="iconBox">
            <img :src="color('lock',details.deviceData.door)" id="lock">
          </div>
          <div class="statusDescription">
            <div
              class="textDescription"
            >{{details.deviceData.door ? (details.deviceData.door ? " 正常 " : " 异常" ) : " 未知"}}</div>
            <div class="status">门禁状态</div>
          </div>
        </div>
      </div>
      <div id="currentStatusBox">
        <div class="singleCureentStatusBox">
          <div class="currentTitle">实时温度</div>
          <div class="currentDetails"></div>
        </div>
        <div class="singleCureentStatusBox">
          <div class="currentTitle">实时湿度</div>
          <div class="currentDetails"></div>
        </div>
        <div class="singleCureentStatusBox">
          <div class="currentTitle">门禁截屏</div>
          <div class="currentDetails"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      details: {},
      roomType: this.$route.query.roomType,
      detailsId: this.$route.query.detailsId
    };
  },
  created() {
    if (this.roomType === 1) {
      console.log(this.roomType);
      this.$http.toGetconvergeRoomDetails(this.detailsId).then(res => {
        console.log(res);
        if (res.data.success) {
          this.details = res.data.data;
        } else {
          this.$message.error(res.data.errorInfo);
        }
      });
    } else {
      this.$http.toGetLowVoltageRoomDetails(this.detailsId).then(res => {
        console.log(res);
        if (res.data.success) {
          this.details = res.data.data;
        } else {
          this.$message.error(res.data.errorInfo);
        }
      });
    }
  },
  methods: {
    color(type, status) {
      switch (status) {
        case undefined:
          return `../../static/assets/${type}Grey.png`;
        case true:
          return `../../static/assets/${type}Green.png`;
        case false:
          return `../../static/assets/${type}Red.png`;
      }
    }
  }
};
</script>
<style scoped>
html,
body {
  height: 100%;
}
.singleParamsBox {
  width: 32%;
  margin-top: 15px;
  background-color: white;
}
#main {
  height: 100%;
}
#app {
  height: 100%;
}
#paramsBox {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 1200px;
  margin-bottom: 20px;
  background-color: white;
}
.detailTitle {
  color: #999999;
  width: 95px;
  text-align: right;
  float: left;
}
.detailParam {
  float: left;
}
#statusBox {
  background-color: white;
  width: 1200px;
  height: 110px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #bfbfbf;
}
.singleStatusBox {
  width: 33%;
  height: 100%;
}
.singleStatusBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.iconBox {
  width: 33%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.statusDescription {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.textDescription {
  font-size: 25px;
  font-weight: 600;
}
#currentStatusBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
}
.singleCureentStatusBox {
  background-color: white;
  width: 49.5%;
  height: 300px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 5px;
}
.currentTitle {
  height: 45px;
  border-bottom: 1px solid #dbdbdb;
  line-height: 45px;
}
.iconBox img {
  width: 80px;
  height: 80px;
}
#ups {
  width: 55px;
  height: 55px;
}
#lock {
  width: 55px;
  height: 55px;
}
#roomDetailsWrapper {
  width: 98%;
  margin: 0 auto;
  background-color: #e6e6e6;
}
#supremeDetailsWrapper {
  background-color: #e6e6e6;
  height: calc(100% - 50px);
  box-sizing: border-box;
  padding-top: 20px;
}
</style>