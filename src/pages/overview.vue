<template>
  <div id="overviewSuperWrappe">
          <div v-show="isLoading" >
        <a-spin tip="数据正在加载中...">
          <div class="spin-content"></div>
        </a-spin>
      </div>
    <div id="pageWrapper" >

      <div style="height:30vh" id="overallStatusbox" v-show="!isLoading" >
        <div id="overallStatusTitle" style="height:20px;margin-bottm:10px;">当前网络控制网络状态汇总</div>
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
        <div id="convergeRoomChart" :style="{width: '320px', height: '320px'}"></div>
        <div id="lowVoltageRoomChart" :style="{width: '320px', height: '320px'}"></div>
        <div id="controlNetChart" :style="{width: '320px', height: '320px'}"></div>
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
      autoProgressBoxWidth:'200px'
    };
  },
  mounted() {},
  methods: {
        drawnarmalControlNetpie() {
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
          text:'998',
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
          text:'998',
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
          text:'998',
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
          text:'998',
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
    drawMachineRoomLine() {
      // 基于准备好的dom，初始化echarts实例
      let convergeRoomChart = this.$echarts.init(
        document.getElementById("convergeRoomChart")
      );
      let lowVoltageRoomChart = this.$echarts.init(
        document.getElementById("lowVoltageRoomChart")
      );
      let controlNetChart = this.$echarts.init(
        document.getElementById("controlNetChart")
      );
      // 绘制图表
      convergeRoomChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          text: "当前汇聚机房状态汇总",
          // x 设置水平安放位置，默认左对齐，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: "center",
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: "top",
          // itemGap设置主副标题纵向间隔，单位px，默认为10，
          itemGap: 30,
          // 主标题文本样式设置
          textStyle: {
            fontSize: 20,
            fontWeight: "normal",
            color: "#aaa"
          }
        },
        legend: {
          // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
          orient: "horizontal",
          // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: "center",
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: "bottom",
          bottom: 30,
          itemWidth: 5, // 设置图例图形的宽
          itemHeight: 5, // 设置图例图形的高
          textStyle: {
            color: "#666" // 图例文字颜色
          },
          // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
          itemGap: 10,
          data: ["正常", "故障", "异常"]
        },
        series: [
          {
            name: "生源地",
            type: "pie",
            // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
            radius: ["30%", "60%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ["50%", "50%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: [
              { value: this.MachineRoomStatistics.normalCount ? this.MachineRoomStatistics.normalCount : '', name: "正常" },
              { value: this.MachineRoomStatistics.faultCount ? this.MachineRoomStatistics.faultCount : '', name: "故障" },
              { value: this.MachineRoomStatistics.exceptionCount ? this.MachineRoomStatistics.exceptionCount : '', name: "异常" }
            ],
            // itemStyle 设置饼状图扇形区域样式
            itemStyle: {
              // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
              // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(30, 144, 255，0.5)"
              },
              normal:{ 
                color: function (params){
                      var colorList = ['#4181FF','#FDB902',' #FB5B5C'];
                    return colorList[params.dataIndex];
                    }
              },
            },
            // 设置值域的那指向线
            labelLine: {
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
    drawLowVoltageRoomLine() {
      // 基于准备好的dom，初始化echarts实例
      let convergeRoomChart = this.$echarts.init(
        document.getElementById("convergeRoomChart")
      );
      let lowVoltageRoomChart = this.$echarts.init(
        document.getElementById("lowVoltageRoomChart")
      );
      let controlNetChart = this.$echarts.init(
        document.getElementById("controlNetChart")
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
        title: {
          text: "当前弱电间状态汇总",
          // x 设置水平安放位置，默认左对齐，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: "center",
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: "top",
          // itemGap设置主副标题纵向间隔，单位px，默认为10，
          itemGap: 30,
          // 主标题文本样式设置
          textStyle: {
            fontSize: 20,
            fontWeight: "normal",
            color: "#aaa"
          }
        },
        legend: {
          // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
          orient: "horizontal",
          // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: "center",
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: "bottom",
          bottom: 30,
          itemWidth: 5, // 设置图例图形的宽
          itemHeight: 5, // 设置图例图形的高
          textStyle: {
            color: "#666" // 图例文字颜色
          },
          // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
          itemGap: 10,
          data: ["正常", "故障", "异常"]
        },
        series: [
          {
            name: "生源地",
            type: "pie",
            // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
            radius: ["30%", "60%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ["50%", "50%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
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
    drawControlNetRoomLine() {
      // 基于准备好的dom，初始化echarts实例
      let convergeRoomChart = this.$echarts.init(
        document.getElementById("convergeRoomChart")
      );
      let lowVoltageRoomChart = this.$echarts.init(
        document.getElementById("lowVoltageRoomChart")
      );
      let controlNetChart = this.$echarts.init(
        document.getElementById("controlNetChart")
      );
      // 绘制图表
      controlNetChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          text: "当前控制网状态汇总",
          // x 设置水平安放位置，默认左对齐，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: "center",
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: "top",
          // itemGap设置主副标题纵向间隔，单位px，默认为10，
          itemGap: 10,
          // 主标题文本样式设置
          textStyle: {
            fontSize: 20,
            fontWeight: "normal",
            color: "#aaa"
          }
        },
        legend: {
          // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
          orient: "horizontal",
          // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: "center",
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: "bottom",
          bottom: 30,
          itemWidth: 5, // 设置图例图形的宽
          itemHeight: 5, // 设置图例图形的高
          textStyle: {
            color: "#666" // 图例文字颜色
          },
          // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
          itemGap: 10,
          data: [
            "正常",
            "异常",
            "异常(cmdb没有ip信息)",
            "异常(zabbix中没有数据)"
          ]
        },
        series: [
          {
            name: "生源地",
            type: "pie",
            // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
            radius: ["30%", "60%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ["50%", "50%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: [
              {
                value: this.ControlNetworkStatistics.noProblemCount ? this.ControlNetworkStatistics.noProblemCount  : '' ,
                name: "正常"
              },
              {
                value: this.ControlNetworkStatistics.problemCount ? this.ControlNetworkStatistics.problemCount : '' ,
                name: "异常"
              },
              {
                value: this.ControlNetworkStatistics.cmdbNoIpCount ? this.ControlNetworkStatistics.cmdbNoIpCount : '',
                name: "异常(cmdb没有ip信息)"
              },
              {
                value: this.ControlNetworkStatistics.zabbixNoDataCount ? this.ControlNetworkStatistics.zabbixNoDataCount : '',
                name: "异常(zabbix中没有数据)"
              }
            ],
            // itemStyle 设置饼状图扇形区域样式
            itemStyle: {
              // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
              // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(30, 144, 255，0.5)"
              },
              normal:{ 
                color: function (params){
                    var colorList = ['#4181FF','#FDB902','#FB5B5C','#A561A6'];
                    return colorList[params.dataIndex];
                    }
              },
            },
            // 设置值域的那指向线
            labelLine: {
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
    }
  },
  mounted(){

      this.statusWrapperWidth=document.getElementById('overviewSuperWrappe').offsetWidth*0.24-34;
      this.$nextTick(()=>{
        this.autoProgressBoxWidth=200*this.statusWrapperWidth/350 + 'px';
        console.log(200*this.statusWrapperWidth/364 + 'px');
        this.$nextTick(()=>{
            this.drawnarmalControlNetpie();
            this.drawAbnormalControlNetpieWithoutIp();
            this.drawAbnormalControlNetpie();
            this.drawAbnormalControlNetpieWithoutData()
        })
      })

      
  },
  created() {
    
    this.$http.toGetSummary().then(res => {
      if (res.data.success) {
        this.WeakElectricStatistics = res.data.data.WeakElectricStatistics;
        this.MachineRoomStatistics = res.data.data.MachineRoomStatistics;
        this.ControlNetworkStatistics = res.data.data.ControlNetworkStatistics;
        this.$nextTick(() => {
          this.isLoading = false;
          this.drawMachineRoomLine();
          this.drawLowVoltageRoomLine();
          this.drawControlNetRoomLine();
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
}
#chartWrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  background-color: #FFFFFF;
  height: 530px;
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
.narmalTitleChinese{
  margin-top: 38px;
  font-size: 20px;
  height: 20px;
  margin-bottom: 15px;
  font-weight: 500;
}
.narmalTitleEnglish{

}
.narmalTitle{
  height: 150px;;
}

#narmalBlueTitle{
  color: #fff;
}
</style>