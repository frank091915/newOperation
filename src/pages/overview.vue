<template>
  <div id="pageWrapper">
    <div id="chartWrapper" v-show="!isLoading">
      <div id="convergeRoomChart" :style="{width: '300px', height: '300px'}"></div>
      <div id="lowVoltageRoomChart" :style="{width: '300px', height: '300px'}"></div>
      <div id="controlNetChart" :style="{width: '300px', height: '300px'}"></div>
    </div>
    <div v-if="isLoading">
      <a-spin tip="数据正在加载中...">
        <div class="spin-content"></div>
      </a-spin>
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
      isLoading: true
    };
  },
  mounted() {},
  methods: {
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
              { value: this.MachineRoomStatistics.normalCount, name: "正常" },
              { value: this.MachineRoomStatistics.faultCount, name: "故障" },
              { value: this.MachineRoomStatistics.exceptionCount, name: "异常" }
            ],
            // itemStyle 设置饼状图扇形区域样式
            itemStyle: {
              // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
              // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(30, 144, 255，0.5)"
              }
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
              { value: this.WeakElectricStatistics.normalCount, name: "正常" },
              { value: this.WeakElectricStatistics.faultCount, name: "故障" },
              {
                value: this.WeakElectricStatistics.exceptionCount,
                name: "异常"
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
              }
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
                value: this.ControlNetworkStatistics.noProblemCount,
                name: "正常"
              },
              {
                value: this.ControlNetworkStatistics.problemCount,
                name: "异常"
              },
              {
                value: this.ControlNetworkStatistics.cmdbNoIpCount,
                name: "异常(cmdb没有ip信息)"
              },
              {
                value: this.ControlNetworkStatistics.zabbixNoDataCount,
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
              }
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
                formatter: "{c}"
              }
            }
          }
        ]
      });
    }
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
              this.$message.error(res.data.errorInfo);
            }
    });
  }
};
</script>

<style>
#pageWrapper {
  width: 100%;
}
#convergeRoomChart {
  width: 200px;
  height: 200px;
}
#chartWrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 300px;
}
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
</style>