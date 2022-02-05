<template>
  <div id="myChart" class="chart" style="width:100%; height:100%">
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "MainEcharts",
  data() {
    return {
      xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], // x轴数据，可根据需求 直角坐标系 X 轴
      yAxisData1: [120, 132, 101, 134, 90, 230, 210], // 数据1 邮件营销
      yAxisData2: [220, 182, 191, 234, 290, 330, 310], // 数据2 联盟广告
      yAxisData3: [150, 232, 201, 154, 190, 330, 410], // 数据3 视频广告
      yAxisData4: [320, 332, 301, 334, 390, 330, 320], // 数据4 直接访问
      yAxisData5: [820, 932, 901, 934, 1290, 1330, 1320], // 数据5 搜索引擎
    }
  },
  mounted() {
    this.loadLine();
  },
  methods: {
    loadLine() {
      let option = {
        // option 每个属性是一类组件
        title: {
          // 图标题
          text: '测试折线图堆叠'
        },
        tooltip: {
          trigger: 'axis' //提示框组件，坐标轴触发
        },
        //图例组件，
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        //直角坐标系内绘图网格
        grid: {
          left: '3%', //grid 组件离容器左侧的距离
          right: '4%',
          bottom: '3%',
          containLabel: true //grid 区域是否包含坐标轴的刻度标签
        },
        // 如果有多个同类组件，那么就是个数组。例如这里有三个 X 轴。
        xAxis: {
          type: 'category',
          boundaryGap: false, //坐标轴两边留白策略 默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间
          data: this.xAxisData // x轴数据
        },
        yAxis: {
          type: 'value'
        },
        // 这里有多个系列，也是构成一个数组。[表示实际数据]
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: this.yAxisData1 // y轴数据1
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: this.yAxisData2 // y轴数据2
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: this.yAxisData3 // y轴数据3
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: this.yAxisData4 // y轴数据5
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: this.yAxisData5 // y轴数据5
          }
        ]
      }
      // 创建 echarts 实例。
      this.myChartOne = echarts.init(document.getElementById('myChart'))
      // 调用 setOption 将 option 输入 echarts，然后 echarts 渲染图表。
      this.myChartOne.setOption(option)
    },
  },
}
</script>

<style scoped>

</style>