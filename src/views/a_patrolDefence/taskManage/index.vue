<template>
  <div class="sewage-control">
    <el-row :gutter="20">
      <!-- 智能监测 -->
      <el-col :span="12">
        <el-card>
          <h3>智能监测</h3>
          <el-table :data="waterQualityData" style="width: 100%">
            <el-table-column prop="location" label="监测点" width="150" />
            <el-table-column prop="ph" label="pH 值" />
            <el-table-column prop="turbidity" label="浊度 (NTU)" />
            <el-table-column prop="status" label="状态" />
          </el-table>
        </el-card>
      </el-col>

      <!-- 优化调度 -->
      <el-col :span="12">
        <el-card>
          <h3>污水泵和阀门状态优化调度</h3>
          <div id="optimizationChart" style="width: 100%; height: 300px;" />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <!-- 控制操作 -->
      <el-col :span="12">
        <el-card>
          <h3>控制操作</h3>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-button type="primary" @click="manualControl('sewagePump', 'start')">启动污水泵</el-button>
              <el-button type="danger" @click="manualControl('sewagePump', 'stop')">停止污水泵</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" @click="manualControl('valve', 'open')">打开阀门</el-button>
              <el-button type="danger" @click="manualControl('valve', 'close')">关闭阀门</el-button>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-alert :title="'最近操作:'+lastOperation" type="info" show-icon />
          </el-row>
        </el-card>
      </el-col>

      <!-- 系统状态 -->
      <el-col :span="12">
        <el-card>
          <h3>系统状态</h3>
          <el-table :data="systemStatus" style="width: 100%">
            <el-table-column prop="name" label="设备名称" width="150" />
            <el-table-column prop="status" label="当前状态" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      // 水质监测数据
      waterQualityData: [
        { location: '东部水域', ph: 7.2, turbidity: 5, status: '正常' },
        { location: '西部水域', ph: 6.8, turbidity: 12, status: '预警' },
        { location: '南部水域', ph: 7.0, turbidity: 7, status: '正常' },
        { location: '东部水域', ph: 7.2, turbidity: 5, status: '正常' },
        { location: '西部水域', ph: 6.8, turbidity: 12, status: '预警' },
        { location: '南部水域', ph: 7.0, turbidity: 7, status: '正常' },
        { location: '东部水域', ph: 7.2, turbidity: 5, status: '正常' }
      ],
      // 系统状态
      systemStatus: [
        { name: '污水泵A', status: '运行中' },
        { name: '阀门B', status: '关闭' },
        { name: '污水泵C', status: '待机' }
      ],
      // 最后操作记录
      lastOperation: '无操作记录'
    }
  },
  mounted() {
    this.initOptimizationChart()
  },
  methods: {
    // 初始化优化调度图表
    initOptimizationChart() {
      const chart = echarts.init(document.getElementById('optimizationChart'))

      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['污水泵', '阀门']
        },
        xAxis: {
          type: 'category',
          data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} %'
          }
        },
        series: [
          {
            name: '污水泵',
            type: 'line',
            data: [15, 25, 35, 45, 65, 55, 75]
          },
          {
            name: '阀门',
            type: 'line',
            data: [5, 10, 20, 30, 50, 45, 60]
          }
        ]
      }

      chart.setOption(option)
    },
    // 模拟手动控制操作
    manualControl(device, action) {
      const deviceMap = {
        sewagePump: '污水泵',
        valve: '阀门'
      }
      const actionMap = {
        start: '启动',
        stop: '停止',
        open: '打开',
        close: '关闭'
      }
      this.lastOperation = `${actionMap[action]}了${deviceMap[device]}`
    }
  }
}
</script>

<style scoped>
.sewage-control {
  padding: 20px;
}

.el-card {
  margin-bottom: 20px;
}

#optimizationChart {
  border: 1px solid #dcdfe6;
}
</style>
