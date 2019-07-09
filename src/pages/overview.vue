<template>
  <div id="overviewSuperWrappe">
          <div v-show="isLoading" >
        <a-spin tip="数据正在加载中...">
          <div class="spin-content"></div>
        </a-spin>
      </div>
    <div id="pageWrapper" >

      <div style="height:30vh" id="overallStatusbox" v-show="!isLoading" >
        <div id="overallStatusTitle" style="height:20px;margin-bottm:10px;">当前控制网状态汇总</div>
        <hr id="overallStatusboxStripe" />
          <div id="controlNetChartWrapper" >
            <div class="controlNetChartBox" style=" box-shadow: 10px 10px 5px #CEDEFF; background-color: #4181FF;"> 
              <div class="narmalTitle" id="narmalBlueTitle">
                  <p class="narmalTitleChinese">正常</p>
                  <p class="narmalTitleEnglish">NORMAL</p>
              </div>
              <div class="progressBox" id="narmalControlNetpie" :style="{'margin-top': '2px','width': autoProgressBoxWidth,'height': autoProgressBoxWidth}">
                  
              </div>
            </div>
            <div class="controlNetChartBox"> 
                <div class="narmalTitle">
                    <p class="narmalTitleChinese">异常</p>
                    <p class="narmalTitleEnglish">(CMDB中没有ip信息)</p>
                </div>
                <div class="progressBox" id="narmalControlNetpieWithoutIp" :style="{'margin-top': '2px','width': autoProgressBoxWidth,'height': autoProgressBoxWidth}">
                    
                </div>
            </div>
            <div class="controlNetChartBox">
                <div class="narmalTitle">
                    <p class="narmalTitleChinese">异常</p>
                    <p class="narmalTitleEnglish">ABNORMAL</p>
                </div>
                <div class="progressBox" id="abnormalControlNetpie" :style="{'margin-top': '2px','width': autoProgressBoxWidth,'height': autoProgressBoxWidth}">
                    
                </div>
            </div>
            <div class="controlNetChartBox"> 
                <div class="narmalTitle">
                    <p class="narmalTitleChinese">异常</p>
                    <div>(没有数据)</div>
                    <div>ABNORMAL</div>
                </div>
                <div class="progressBox" id="abnormalControlNetpieWithoutData" :style="{'margin-top': '2px','width': autoProgressBoxWidth,'height': autoProgressBoxWidth}">
                    
                </div>
            </div>
          </div>
      </div>
      <div id="chartWrapper" v-show="!isLoading">
          <div id="convergeroomWrapper" ref='convergeroomWrapper'>
              <div class="convergeroomTitle">
                  当前汇聚机房状态汇总
              </div>
              <hr class="convergeroomTitleStripe" />
              <div class="colorInstruction" :style="{'width':'300px','position':'absolute','top':'78px','left':convergeRoomChartWidth - 335 + 'px'}">
                  <div class="singleColorInstruction">
                      <span class="singleColorBlock" style="background-color:#4181FF">

                      </span>
                      <span class="singleColorTitle">
                        正常
                      </span>
                      <!-- '#4181FF','#FDB902',' #FB5B5C' -->
                  </div>
                  <div class="singleColorInstruction">
                      <span class="singleColorBlock" style="background-color:#FDB902">

                      </span>
                      <span>
                        故障
                      </span>
                  </div>
                  <div class="singleColorInstruction">
                      <span class="singleColorBlock" style="background-color:#FB5B5C">

                      </span>
                      <span>
                        异常
                      </span>
                  </div>
              </div>
              <div id="convergeRoomChartWrapper" style="margin-top:10px">

              </div>
          </div>
          <div id="lowVoltageRoomChartWrapper">
              <div class="convergeroomTitle">
                  当前弱电间状态汇总
              </div>
              <hr class="convergeroomTitleStripe" />
              <div id="lowVoltageRoomChart" ></div>
              <div class="colorInstruction">
                  <div class="singleColorInstruction">
                      <span class="singleColorBlock" style="background-color:#4181FF">

                      </span>
                      <span class="singleColorTitle">
                        正常
                      </span>
                      <!-- '#4181FF','#FDB902',' #FB5B5C' -->
                  </div>
                  <div class="singleColorInstruction">
                      <span class="singleColorBlock" style="background-color:#FDB902">

                      </span>
                      <span>
                        故障
                      </span>
                  </div>
                  <div class="singleColorInstruction">
                      <span class="singleColorBlock" style="background-color:#FB5B5C">

                      </span>
                      <span>
                        异常
                      </span>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      ControlNetworkStatistics: {},
      MachineRoomStatistics: {},
      WeakElectricStatistics: {},
      one: 99,
      isLoading: true,
      statusWrapperWidth:200,
      autoProgressBoxWidth:'200px',
      convergeRoomChartWidth:''
    };
  },
  mounted() {},
  methods: {
      drawnarmalControlNetpie() {
        console.log(this.ControlNetworkStatistics)
      // 基于准备好的dom，初始化echarts实例
      let narmalControlNetpie = this.$echarts.init(
        document.getElementById("narmalControlNetpie")
      );
      narmalControlNetpie.resize()
      // 绘制图表
      narmalControlNetpie.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        series: [
          {
            name: "生源地",
            type: "pie",
            // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
            radius: ["45%","60%"],// 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center : ['50%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: [
              { value: 75, name: "正常" },
              { value: 50, name: "故障"},
            ],
            roseType: 'radius',
            // itemStyle 设置饼状图扇形区域样式
            itemStyle: {
              // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
              // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
              // emphasis: {
              //   shadowBlur: 10,
              //   shadowOffsetX: 0,
              //   shadowColor: "rgba(30, 144, 255，0.5)"
              // },
              normal:{ 
                color: function (params){
                      var colorList = [' #FFFFFF','#538DFF'];
                    return colorList[params.dataIndex];
                    }
              },
            },
            // 设置值域的那指向线
            labelLine: {
              normal: {
                show: false // show设置线是否显示，默认为true，可选值：true ¦ false
              }
            },
            // 设置值域的标签
            label: {
              normal: {
                position: "outer", // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                // {a}指series.name  {b}指series.data的name
                // {c}指series.data的value  {d}%指这一部分占总数的百分比
                formatter: " "
              }
            },
            emphasis:{
              itemStyle:{

              }
            }
          }
        ],
        title: {
          text:this.ControlNetworkStatistics.noProblemCount,
          left:'center',
          top:'center',
          textStyle:{
            color:'#fff',
            fontSize:20,
            align:'center',

          }
        },
        });
    },
    drawAbnormalControlNetpieWithoutIp() {
      let number=this.ControlNetworkStatistics;
      console.log(number)
      // 基于准备好的dom，初始化echarts实例
      let narmalControlNetpie = this.$echarts.init(
        document.getElementById("narmalControlNetpieWithoutIp")
      );
      narmalControlNetpie.resize()
      // 绘制图表
      narmalControlNetpie.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        series: [
          {
            name: "生源地",
            type: "pie",
            // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
            radius: ["45%","60%"],// 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center : ['50%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: [
              { value: 75, name: "正常" },
              { value: 50, name: "故障"},
            ],
            roseType: 'radius',
            // itemStyle 设置饼状图扇形区域样式
            itemStyle: {
              // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
              // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
              // emphasis: {
              //   shadowBlur: 10,
              //   shadowOffsetX: 0,
              //   shadowColor: "rgba(30, 144, 255，0.5)"
              // },
              normal:{ 
                color: function (params){
                      var colorList = ['#FB5B5C','#FFEFEF'];
                    return colorList[params.dataIndex];
                    }
              },
            },
            // 设置值域的那指向线
            labelLine: {
              normal: {
                show: false // show设置线是否显示，默认为true，可选值：true ¦ false
              }
            },
            // 设置值域的标签
            label: {
              normal: {
                position: "outer", // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                // {a}指series.name  {b}指series.data的name
                // {c}指series.data的value  {d}%指这一部分占总数的百分比
                formatter: " "
              }
            },
            emphasis:{
              itemStyle:{

              }
            }
          }
        ],
        title: {
          text:this.ControlNetworkStatistics.cmdbNoIpCount,
          left:'center',
          top:'center',
          textStyle:{
            color:'#000',
            fontSize:20,
            align:'center',

          }
        },
        });
    },
    // abnormalControlNetpie
    drawAbnormalControlNetpie() {
      // 基于准备好的dom，初始化echarts实例
      let narmalControlNetpie = this.$echarts.init(
        document.getElementById("abnormalControlNetpie")
      );
      narmalControlNetpie.resize()
      // 绘制图表
      narmalControlNetpie.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        series: [
          {
            name: "生源地",
            type: "pie",
            // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
            radius: ["45%","60%"],// 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center : ['50%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: [
              { value: 75, name: "正常" },
              { value: 50, name: "故障"},
            ],
            roseType: 'radius',
            // itemStyle 设置饼状图扇形区域样式
            itemStyle: {
              // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
              // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
              // emphasis: {
              //   shadowBlur: 10,
              //   shadowOffsetX: 0,
              //   shadowColor: "rgba(30, 144, 255，0.5)"
              // },
              normal:{ 
                color: function (params){
                      var colorList = ['#FDB902','#FFF7E2'];
                    return colorList[params.dataIndex];
                    }
              },
            },
            // 设置值域的那指向线
            labelLine: {
              normal: {
                show: false // show设置线是否显示，默认为true，可选值：true ¦ false
              }
            },
            // 设置值域的标签
            label: {
              normal: {
                position: "outer", // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                // {a}指series.name  {b}指series.data的name
                // {c}指series.data的value  {d}%指这一部分占总数的百分比
                formatter: " "
              }
            },
            emphasis:{
              itemStyle:{

              }
            }
          }
        ],
        title: {
          text:this.ControlNetworkStatistics.problemCount,
          left:'center',
          top:'center',
          textStyle:{
            color:'#000',
            fontSize:20,
            align:'center',

          }
        },
        });
    },
    // abnormalControlNetpieWithoutData
    drawAbnormalControlNetpieWithoutData() {
      // 基于准备好的dom，初始化echarts实例
      let narmalControlNetpie = this.$echarts.init(
        document.getElementById("abnormalControlNetpieWithoutData")
      );
      narmalControlNetpie.resize()
      // 绘制图表
      narmalControlNetpie.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        series: [
          {
            name: "生源地",
            type: "pie",
            // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
            radius: ["45%","60%"],// 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center : ['50%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: [
              { value: 75, name: "正常" },
              { value: 50, name: "故障"},
            ],
            roseType: 'radius',
            // itemStyle 设置饼状图扇形区域样式
            itemStyle: {
              // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
              // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
              // emphasis: {
              //   shadowBlur: 10,
              //   shadowOffsetX: 0,
              //   shadowColor: "rgba(30, 144, 255，0.5)"
              // },
              normal:{ 
                color: function (params){
                      var colorList = ['#A561A6','#F6F0F7'];
                    return colorList[params.dataIndex];
                    }
              },
            },
            // 设置值域的那指向线
            labelLine: {
              normal: {
                show: false // show设置线是否显示，默认为true，可选值：true ¦ false
              }
            },
            // 设置值域的标签
            label: {
              normal: {
                position: "outer", // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                // {a}指series.name  {b}指series.data的name
                // {c}指series.data的value  {d}%指这一部分占总数的百分比
                formatter: " "
              }
            },
            emphasis:{
              itemStyle:{

              }
            }
          }
        ],
        title: {
          text:this.ControlNetworkStatistics.zabbixNoDataCount,
          left:'center',
          top:'center',
          textStyle:{
            color:'#000',
            fontSize:20,
            align:'center',

          }
        },
        });
    },
    drawLowVoltageRoomLine() {
      // 基于准备好的dom，初始化echarts实例
      let lowVoltageRoomChart = this.$echarts.init(
        document.getElementById("lowVoltageRoomChart")
      );
      // 绘制图表
      lowVoltageRoomChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        series: [
          {
            name: "生源地",
            type: "pie",
            // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
            radius: ["40%", "60%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ["50%", "40%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: [
              { value: this.WeakElectricStatistics.normalCount ? this.WeakElectricStatistics.normalCount : '', name: "正常" },
              { value: this.WeakElectricStatistics.faultCount ? this.WeakElectricStatistics.faultCount : '', name: "故障" },
              {
                value: this.WeakElectricStatistics.exceptionCount ? this.WeakElectricStatistics.exceptionCount : '',
                name: "异常"
              }
            ],
            // itemStyle 设置饼状图扇形区域样式
            itemStyle:{
              // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
              // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
              emphasis:{
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(30, 144, 255,0.5)"
              },
              normal:{ 
                color: function (params){
                    var colorList = ['#4181FF','#FDB902',' #FB5B5C'];
                    return colorList[params.dataIndex];
                    }
              },
            },
            // 设置值域的那指向线
            labelLine:{
              normal: {
                show: true // show设置线是否显示，默认为true，可选值：true ¦ false
              }
            },
            // 设置值域的标签
            label: {
              normal: {
                position: "outer", // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                // {a}指series.name  {b}指series.data的name
                // {c}指series.data的value  {d}%指这一部分占总数的百分比
                formatter: "{c}"
              }
            }
          }
        ]
      });
    },
    drawConvergeRoomChart() {
            console.log(document.getElementsByTagName('body')[0].offsetWidth)
            let bodyWidth=document.getElementsByTagName('body')[0].offsetWidth,
                convergeRoomChartWidth=bodyWidth -300 -bodyWidth/4-15;
                this.convergeRoomChartWidth=convergeRoomChartWidth;
                console.log(convergeRoomChartWidth)
        document.getElementById('convergeRoomChartWrapper').style.width=convergeRoomChartWidth + 'px';

        var myChart = this.$echarts.init(document.getElementById('convergeRoomChartWrapper'));

        // 指定图表的配置项和数据
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
            },
            toolbox: {
                feature: {
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'正常',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210, 90, 230, 210],
                    color:['#4181FF'],
                    smooth:true,
                    areaStyle:{
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                          offset: 0, color: '#D2E0FF' // 0% 处的颜色
                      }, {
                          offset: 1, color: '#F0F5FF' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    }
                },
                {
                    name:'故障',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310, 290, 330, 310],
                    color:['#FDB902'],
                    smooth:true,
                    areaStyle:{
                      color:'#FAEFCE'
                    }
                },
                {
                    name:'异常',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410, 201, 154, 190, 330, 410, 190, 330, 410],
                    color:['#FB5B5C'],
                    smooth:true,
                    areaStyle:{
                      color:'#FFF0F0'
                    }
                }
            ],
        };
        myChart.resize();
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

    },
  },
  mounted(){
      this.statusWrapperWidth=document.getElementById('overviewSuperWrappe').offsetWidth*0.24-34;
      this.$nextTick(()=>{
        this.autoProgressBoxWidth=200*this.statusWrapperWidth/350 + 'px';
        this.$nextTick(()=>{

        })
      })
  },
  created() {

    // 获取汇聚机房近15天状态
    this.$http.toGetRecentConvergeRoomStatus().then((res)=>{
      console.log(res)
    })
    
    this.$http.toGetSummary().then(res => {
      if (res.data.success) {
        this.WeakElectricStatistics = res.data.data.WeakElectricStatistics;
        this.MachineRoomStatistics = res.data.data.MachineRoomStatistics;
        this.ControlNetworkStatistics = res.data.data.ControlNetworkStatistics;
        this.$nextTick(() => {
          this.isLoading = false;
          this.drawLowVoltageRoomLine();
          this.drawConvergeRoomChart()
          this.drawnarmalControlNetpie();
          this.drawAbnormalControlNetpieWithoutIp();
          this.drawAbnormalControlNetpie();
          this.drawAbnormalControlNetpieWithoutData();
          console.log('控制网汇总',this.ControlNetworkStatistics)
        });
      }else {
              this.$message.error(res.data.message);
            }
    });
  }
};
</script>

<style>
html,body{
  height: 100%;
}
#overviewSuperWrappe{
  height: 100%;
  background-color: #F1F5F6;
  overflow: hidden;

}
#pageWrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  margin-top: 20px;
}
#convergeRoomChart {
  width: 200px;
  height: 200px;
}
#app{
  background-color: white;
  background-image: url("");
}
#main{
  margin-left:260px;
  margin-top:61px;
}
#controlNetChartWrapper{
  height: 23vh;
  margin-bottom: 20px;
  background-color: #FFFFFF;
  display:flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
  padding: 20px 20px;
  border-radius: 10px;
  background-color: #fff;
}
#chartWrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  height: 56vh;
}
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
.controlNetChartBox{
  width: 24%;
  box-shadow: 10px 10px 5px #F9F9F9;
  height: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  padding-left: 34px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}


#overallStatusbox{
  background-color: #fff;
  box-sizing: border-box;
  padding-top: 20px;
  margin-bottom:20px;
  border-radius: 10px;
}
#overallStatusTitle{
  font-size: 18px;
  box-sizing: border-box;
  padding-left: 46px;
  background-repeat: no-repeat;
  background-image: url("../../static/assets/leftSideBar.png");
  background-position: 33px 5px;
  background-size: 2px  16px;
}
#overallStatusboxStripe{
  width: calc(100% - 70px );
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #F3F4F4;
  height: 1px;
  border:none
}
.convergeroomTitleStripe{
  width: calc(100% - 70px );
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #F3F4F4;
  height: 1px;
  border:none
}
.narmalTitleChinese{
  margin-top: 38px;
  font-size: 20px;
  height: 20px;
  margin-bottom: 15px;
  font-weight: 600;
}
.narmalTitleEnglish{

}
.narmalTitle{
  height: 150px;;
}

#narmalBlueTitle{
  color: #fff;
}
#lowVoltageRoomChart{
  width: 25vw;
  height: 25vw;
  background-color: #fff;
}
.convergeroomTitle{
  height: 20px;
}
#superConvergeroomWrapper{
  width: 28vw;
  height: 100%;
  background-color: #fff;

}
#convergeroomWrapper{
  background-color: #fff;
  height: 100%;
  flex: 1;
  margin-right: 15px;
  border-radius: 10px;
  box-sizing: border-box;
  padding-top: 20px;
    position: relative;
}
#lowVoltageRoomChartWrapper{
    background-color: #fff;
    height: 100%;
    box-sizing: border-box;
    padding-top: 20px;
    position: relative;
    border-radius: 10px;
}
.convergeroomTitle{
  font-size: 18px;
  box-sizing: border-box;
  padding-left: 46px;
  background-repeat: no-repeat;
  background-image: url("../../static/assets/leftSideBar.png");
  background-position: 33px 5px;
  background-size: 2px  16px;
}
.colorInstruction{
  width: 85%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  background-color: #fff;
  position:absolute;
  bottom: 20px;
  left: calc(50% - (85%/2));
  box-shadow: 3px 3px 10px #F2F2F2,-1px -2px 10px #F2F2F2;
  border-radius: 5px;
}
.singleColorBlock{
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 12px;
  margin-top: 4px;
  float: left;
}
.singleColorTitle{
  float: left;
}
#convergeRoomChartWrapper{
  height: 47vh;
  width: 100%;
  margin: 0 auto;
}
</style>