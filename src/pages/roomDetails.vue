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
          <div class="detailTitle" style="margin-right:10px">{{roomName}}编号</div>
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
            <img :src="color('smoke',details.dataList[0] ? details.dataList[0].smoke : undefined)">
          </div>
          <div class="statusDescription">
            <div
              class="textDescription"
            >{{details.dataList[0] ? (details.dataList[0].smoke ? " 正常 " : " 异常" ) : "无数据上报"}}</div>
            <div class="status">烟雾状态</div>
          </div>
        </div>
        <div class="singleStatusBox">
          <div class="iconBox">
            <img :src="color('electric',details.dataList[0] ? details.dataList[0].power : undefined)" id="ups">
          </div>
          <div class="statusDescription">
            <div
              class="textDescription"
            >{{details.dataList[0] ? (details.dataList[0].power ? " 正常 " : " 异常" ) : " 无数据上报"}}</div>
            <div class="status">ups状态</div>
          </div>
        </div>
        <div class="singleStatusBox">
          <div class="iconBox">
            <img :src="color('lock',details.dataList[0] ? details.dataList[0].door : undefined)" id="lock">
          </div>
          <div class="statusDescription">
            <div
              class="textDescription"
            >{{details.dataList[0] ? ( details.dataList[0].door ? " 正常 " : " 异常" ) : " 无数据上报"}}</div>
            <div class="status">门禁状态</div>
          </div>
        </div>
      </div>
      <div id="currentStatusBox">
        <div class="singleCureentStatusBox">
          <div class="currentStatusTitle" style="padding-left:10px;">
              <img src="../../static/assets/temperature.png" style="width:13px;height:13px;">
              <span> 实时温度</span>
          </div>
          <div class="currentDetails" id="tempChart" v-show='showCharts'>
          </div>
           <div class="errorTip" v-show='!showCharts'> 暂无上报数据</div>
        </div>
        <div class="singleCureentStatusBox">
          <div class="currentStatusTitle" style="padding-left:10px;">
            <img src="../../static/assets/umbrella.png" style="width:13px;height:13px;">
            <span>实时湿度</span>
          </div>
          <div class="currentDetails" id="humilityChart" v-show='showCharts'>
          </div>
           <div class="errorTip" v-show='!showCharts'>暂无上报数据</div>
        </div>
        <div class="singleCureentStatusBox">
          <div class="currentStatusTitle" style="padding-left:10px;">
             <img src="../../static/assets/camera.png" style="width:13px;height:13px;">
            <span>门禁截屏</span>
          </div>
          <div class="currentDetails" ></div>
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
      detailsId: this.$route.query.detailsId,
      roomName: this.$route.query.roomName,
      humilityList: [],
      temperatureList: [],
      dataList:[],
      showCharts:true,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    color(type, status) {
      switch (status) {
        case undefined:
          return `../../static/assets/${type}Red.png`;
        case true:
          return `../../static/assets/${type}Green.png`;
        case false:
          return `../../static/assets/${type}Red.png`;
      }
    },
    getData() {
      if (this.roomType == 1) {
        this.$http.toGetconvergeRoomDetails(this.detailsId).then(res => {
          if (res.data.success) {
            this.details = res.data.data;
            this.dataList=res.data.data.dataList;
            this.showCharts=res.data.data.dataList.length;
            this.$nextTick(()=>{
              if(this.showCharts){
                this.drawTempChart()
                this.drawHumilityChart()
              }else{
                this.showCharts=false
              }
            })
          } else {
            this.$message.error(res.data.errorInfo);
          }
        });
      } else {
        this.$http.toGetLowVoltageRoomDetails(this.detailsId).then(res => {
          if (res.data.success) {
            this.details = res.data.data;
            this.dataList=res.data.data.dataList;
            this.showCharts=res.data.data.dataList.length;
            this.$nextTick(()=>{
              if(this.showCharts){
                this.drawTempChart()
                this.drawHumilityChart()
              }else{
                this.showCharts=false
              }
            })
          } else {
            this.$message.error(res.data.errorInfo);
          }
        });
      }
    },
    drawTempChart() {
      let convergeRoomChart = this.$echarts.init(
        document.getElementById("tempChart")
      );
      let xTime = [];
      let yTemp = [];
      let yHumi = [];
      for (let i in this.dataList) {
        let item = this.dataList[i];
        let timestamp = item.timestamp.substring(11);
        xTime.push(timestamp);
        yTemp.push(item.temp);
        yHumi.push(item.humi);
      }
      let tempOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xTime,
          axisLabel: {  
            interval:1
          }  
        },
        yAxis: {
          type: "value",
          offset: 5
        },
        series: [
          {
            name: "温度",
            data: yTemp,
            type: "line",
            areaStyle: {},
            // 告警阈值线配置
            // markLine: {
            //   lineStyle: {
            //     color: "#61a0a8",
            //     width: 2,
            //     type: "solid"
            //   },
            //   data: [
            //     [
            //       {
            //         name: "最低警告阈值",
            //         coord: [0, this.tempConfig.min]
            //       },
            //       {
            //         coord: [19, this.tempConfig.min]
            //       }
            //     ],
            //     [
            //       {
            //         name: "警告最高阈值",
            //         coord: [0, this.tempConfig.max]
            //       },
            //       {
            //         coord: [19, this.tempConfig.max]
            //       }
            //     ]
            //   ]
            // }
          }
        ],
        color: ["#c23531"]
      };
      convergeRoomChart.setOption(tempOption);
    },
    drawHumilityChart() {
      let convergeRoomChart = this.$echarts.init(
        document.getElementById("humilityChart")
      );
      let xTime = [];
      let yTemp = [];
      let yHumi = [];
      for (let i in this.dataList) {
        let item = this.dataList[i];
        let timestamp = item.timestamp.substring(11);
        xTime.push(timestamp);
        yTemp.push(item.temp);
        yHumi.push(item.humi);
      }
      let tempOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xTime,
          axisLabel: {  
            interval:1
          }  
        },
        yAxis: {
          type: "value",
          offset: 5
        },
        series: [
          {
            name: "温度",
            data: yTemp,
            type: "line",
            areaStyle: {},
            // 告警阈值线配置
            // markLine: {
            //   lineStyle: {
            //     color: "#61a0a8",
            //     width: 2,
            //     type: "solid"
            //   },
            //   data: [
            //     [
            //       {
            //         name: "最低警告阈值",
            //         coord: [0, this.tempConfig.min]
            //       },
            //       {
            //         coord: [19, this.tempConfig.min]
            //       }
            //     ],
            //     [
            //       {
            //         name: "警告最高阈值",
            //         coord: [0, this.tempConfig.max]
            //       },
            //       {
            //         coord: [19, this.tempConfig.max]
            //       }
            //     ]
            //   ]
            // }
          }
        ],
        color: ["#c23531"]
      };
      convergeRoomChart.setOption(tempOption);
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
.currentStatusTitle {
  height: 40px;
  border-bottom: 1px solid #dbdbdb;
  line-height: 40px;
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
#tempChart{
  height: 300px;
  width: 680px;
}
#humilityChart{
    height: 300px;
  width: 680px;
}
.errorTip{
  color: #bfbfbf;
  font-weight: 600;
  margin:0 auto;
  font-size: 20px;
  margin-top:80px;
}
</style>