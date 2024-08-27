<template>
  <div class="flood-control">
    <el-row :gutter="20">
      <!-- 智能监测 -->
      <el-col :span="12">
        <el-card>
          <h3>智能监测</h3>
          <el-table :data="monitoringData" style="width: 100%">
            <el-table-column prop="location" label="监测点" width="150" />
            <el-table-column prop="waterLevel" label="水位 (m)" />
            <el-table-column prop="flowRate" label="流量 (m³/s)" />
            <el-table-column prop="status" label="状态" />
          </el-table>
        </el-card>
      </el-col>

      <!-- 智能联排联控 -->
      <el-col :span="12">
        <el-card>
          <h3>水泵和阀门状态</h3>
          <div id="controlChart" style="width: 100%; height: 300px;" />
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
              <el-button type="primary" @click="manualControl('pump', 'start')">启动排水泵</el-button>
              <el-button type="danger" @click="manualControl('pump', 'stop')">停止排水泵</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" @click="manualControl('valve', 'open')">打开阀门</el-button>
              <el-button type="danger" @click="manualControl('valve', 'close')">关闭阀门</el-button>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-alert :title="'最后操作：'+lastOperation" type="info" show-icon />
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
      // 监测数据
      monitoringData: [
        { location: '城区东部', waterLevel: 1.5, flowRate: 2.5, status: '正常' },
        { location: '城区西部', waterLevel: 2.0, flowRate: 3.0, status: '预警' },
        { location: '城区南部', waterLevel: 0.8, flowRate: 1.2, status: '正常' },
        { location: '城区东部', waterLevel: 1.5, flowRate: 2.5, status: '正常' },
        { location: '城区西部', waterLevel: 2.0, flowRate: 3.0, status: '预警' },
        { location: '城区南部', waterLevel: 0.8, flowRate: 1.2, status: '正常' },
        { location: '城区东部', waterLevel: 1.5, flowRate: 2.5, status: '正常' }
      ],
      // 系统状态
      systemStatus: [
        { name: '东部水泵', status: '运行中' },
        { name: '西部阀门', status: '关闭' },
        { name: '南部闸门', status: '开启' }
      ],
      // 最后操作记录
      lastOperation: '无操作记录'
    }
  },
  mounted() {
    this.initControlChart()
  },
  methods: {
    // 初始化控制图表
    initControlChart() {
      const chart = echarts.init(document.getElementById('controlChart'))

      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['水泵', '阀门']
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
            name: '水泵',
            type: 'line',
            data: [20, 30, 40, 50, 70, 60, 80]
          },
          {
            name: '阀门',
            type: 'line',
            data: [10, 15, 30, 40, 60, 55, 70]
          }
        ]
      }

      chart.setOption(option)
    },
    // 模拟手动控制操作
    manualControl(device, action) {
      const deviceMap = {
        pump: '排水泵',
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
.flood-control {
  padding: 20px;
}

.el-card {
  margin-bottom: 20px;
}

#controlChart {
  border: 1px solid #dcdfe6;
}
</style>
