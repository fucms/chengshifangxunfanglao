<template>
  <div class="river-landscape-control">
    <el-row :gutter="20">
      <!-- 远程控制与管理 -->
      <el-col :span="12">
        <el-card>
          <h3>综合管理</h3>
          <el-table :data="managementData" style="width: 100%">
            <el-table-column prop="device" label="设备名称" width="150" />
            <el-table-column prop="status" label="状态" />
            <el-table-column prop="current" label="电流 (A)" />
            <el-table-column prop="voltage" label="电压 (V)" />
            <el-table-column prop="power" label="功率 (W)" />
          </el-table>
        </el-card>
      </el-col>

      <!-- 数据采集与检测 -->
      <el-col :span="12">
        <el-card>
          <h3>景观设备数据监测</h3>
          <div id="dataCollectionChart" style="width: 100%; height: 300px;" />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <!-- 综合管理 -->
      <el-col :span="16">
        <el-card>
          <h3>远程控制与管理</h3>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-button type="primary" @click="controlLandscape('lighting', 'on')">开启景观灯光</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="danger" @click="controlLandscape('lighting', 'off')">关闭景观灯光</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="controlLandscape('irrigation', 'start')">开始自动灌溉</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="danger" @click="controlLandscape('irrigation', 'stop')">停止自动灌溉</el-button>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px;">
            <el-alert :title="'最近操作:' +lastOperation " type="info" show-icon />
          </el-row>
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
      // 综合管理数据
      managementData: [
        { device: '景观灯A', status: '运行中', current: 2.5, voltage: 220, power: 550 },
        { device: '灌溉系统B', status: '待机', current: 1.2, voltage: 220, power: 264 },
        { device: '景观灯C', status: '离线', current: 0, voltage: 0, power: 0 },
        { device: '景观灯A', status: '运行中', current: 2.5, voltage: 220, power: 550 },
        { device: '灌溉系统B', status: '待机', current: 1.2, voltage: 220, power: 264 },
        { device: '景观灯C', status: '离线', current: 0, voltage: 0, power: 0 }
      ],
      // 最后操作记录
      lastOperation: '无操作记录'
    }
  },
  mounted() {
    this.initDataCollectionChart()
  },
  methods: {
    // 初始化数据采集与检测图表
    initDataCollectionChart() {
      const chart = echarts.init(document.getElementById('dataCollectionChart'))

      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['电流 (A)', '电压 (V)', '功率 (W)']
        },
        xAxis: {
          type: 'category',
          data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
        },
        yAxis: [
          {
            type: 'value',
            name: '电流 (A)',
            position: 'left'
          },
          {
            type: 'value',
            name: '电压 (V)',
            position: 'right'
          }
        ],
        series: [
          {
            name: '电流 (A)',
            type: 'line',
            yAxisIndex: 0,
            data: [2.5, 3.0, 2.8, 2.9, 3.2, 3.1, 2.9]
          },
          {
            name: '电压 (V)',
            type: 'line',
            yAxisIndex: 1,
            data: [220, 220, 221, 220, 220, 219, 220]
          },
          {
            name: '功率 (W)',
            type: 'line',
            yAxisIndex: 0,
            data: [550, 660, 616, 638, 704, 682, 638]
          }
        ]
      }

      chart.setOption(option)
    },
    // 模拟手动控制操作
    controlLandscape(device, action) {
      const deviceMap = {
        lighting: '景观灯光',
        irrigation: '自动灌溉'
      }
      const actionMap = {
        on: '开启',
        off: '关闭',
        start: '启动',
        stop: '停止'
      }
      this.lastOperation = `${actionMap[action]}了${deviceMap[device]}`
    }
  }
}
</script>

<style scoped>
.river-landscape-control {
  padding: 20px;
}

.el-card {
  margin-bottom: 20px;
}

#dataCollectionChart {
  border: 1px solid #dcdfe6;
}
</style>
