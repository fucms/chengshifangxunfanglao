<template>
  <el-container class="container">
    <!-- 顶部的标题和刷新按钮 -->
    <el-header>
      <el-row :gutter="20" align="middle" type="flex" justify="flex-start">
        <el-col :span="5">
          <h3>实时检测-水位趋势分析</h3>
        </el-col>
        <el-col :span="4" align="right">
          <el-button type="primary" size="medium" icon="el-icon-refresh" @click="refreshData">刷新数据</el-button>
        </el-col>
      </el-row>
    </el-header>

    <!-- 主体部分 -->
    <el-main>
      <!-- 数据概览 -->
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :span="6">
          <el-card>
            <div slot="header">当前水位</div>
            <p>{{ currentLevel }} cm</p>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div slot="header">最高水位</div>
            <p>{{ maxLevel }} cm</p>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div slot="header">最低水位</div>
            <p>{{ minLevel }} cm</p>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div slot="header">趋势状态</div>
            <p>{{ trendStatus }}</p>
          </el-card>
        </el-col>
      </el-row>

      <!-- 水位趋势折线图 -->
      <el-card>
        <div slot="header">水位趋势分析</div>
        <div ref="chart" style="width: 100%; height: 400px;" />
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      currentLevel: 0,
      maxLevel: 0,
      minLevel: 0,
      trendStatus: '保持稳定',
      trendData: [],
      timeData: []
    }
  },
  mounted() {
    this.initChart()
    this.loadData()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          data: this.timeData
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} cm'
          }
        },
        series: [
          {
            name: '水位',
            type: 'line',
            data: this.trendData,
            markLine: {
              data: [
                { type: 'average', name: '平均值' },
                { yAxis: 50, name: '警戒线' }
              ]
            }
          }
        ]
      })
    },
    loadData() {
      // 模拟加载数据
      this.timeData = ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30']
      this.trendData = [12, 14, 15, 20, 18, 17, 16]
      this.currentLevel = this.trendData[this.trendData.length - 1] // 当前水位为数组最后一个数据
      this.maxLevel = Math.max(...this.trendData)
      this.minLevel = Math.min(...this.trendData)
      this.trendStatus = this.currentLevel > this.maxLevel - 5 ? '上升' : '保持稳定'
      this.updateChart()
    },
    updateChart() {
      this.chart.setOption({
        xAxis: {
          data: this.timeData
        },
        series: [
          {
            data: this.trendData
          }
        ]
      })
    },
    refreshData() {
      // 模拟刷新数据
      const newLevel = Math.floor(Math.random() * 10 + 10)
      this.trendData.push(newLevel)
      this.timeData.push(new Date().toLocaleTimeString().slice(0, 5))
      this.currentLevel = newLevel
      this.maxLevel = Math.max(...this.trendData)
      this.minLevel = Math.min(...this.trendData)
      this.trendStatus = this.currentLevel > this.maxLevel - 5 ? '上升' : '保持稳定'
      this.updateChart()
    }
  }
}
</script>

<style scoped>
.container {
  margin: 10px;
  font-size: 14px;
}
</style>
