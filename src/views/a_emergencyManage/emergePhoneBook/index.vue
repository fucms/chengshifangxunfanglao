<template>
  <div class="planning">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card>
          <h3>联排联调专项规划</h3>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="现有规划" name="current">
              <el-table :data="currentPlans" style="width: 100%">
                <el-table-column prop="facility" label="设施" width="150" />
                <el-table-column prop="description" label="规划描述" />
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="未来规划" name="future">
              <el-table :data="futurePlans" style="width: 100%">
                <el-table-column prop="facility" label="设施" width="150" />
                <el-table-column prop="description" label="规划描述" />
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-card>

        <!-- 操作日志 -->
        <el-card>
          <h3>操作日志</h3>
          <el-table :data="operationLogs" style="width: 100%">
            <el-table-column prop="date" label="日期" width="150" />
            <el-table-column prop="operation" label="操作描述" />
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="8">
        <!-- 地图展示 -->
        <el-card>
          <h3>设施位置</h3>
          <div id="map" style="width: 100%; height: 420px; background: #ccc;">
            <!-- 模拟地图展示 -->
            <MapContainer />
          </div>
        </el-card>

      </el-col>
    </el-row>

    <!-- 图表分析 -->
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="24">
        <el-card>
          <h3>规划影响分析</h3>
          <div ref="chart" style="width: 100%; height: 300px;" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import MapContainer from '@/components/MapContainer/MapContainer.vue'

export default {
  components: {
    MapContainer
  },
  data() {
    return {
      activeTab: 'current', // 默认展示“现有规划”标签页
      // 现有的联排联调专项规划数据
      currentPlans: [
        { facility: '城区东部水库', description: '现有水库的操作方案，以最大限度缓解汛期压力。' },
        { facility: '西湖', description: '湖泊水位控制在设定范围内，保持生态和防洪的平衡。' },
        { facility: '城区北部闸门', description: '定期检查并确保闸门的正常运行，防止洪水倒灌。' }
      ],
      // 未来高水高排实施后的联排联调专项规划数据
      futurePlans: [
        { facility: '城区东部水库', description: '升级水库容量，配合高水高排策略。' },
        { facility: '西湖', description: '增加排水能力，确保湖泊在高水位情况下的安全。' },
        { facility: '城区南部泵站', description: '新增泵站，提升排水效率以应对未来可能的极端天气。' }
      ],
      // 操作日志
      operationLogs: [
        { date: '2024-08-27', operation: '查看了现有规划 - 城区东部水库' },
        { date: '2024-08-28', operation: '修改了未来规划 - 城区南部泵站' }
      ],
      // 重点设施信息
      highlightedFacilities: [
        { name: '城区东部水库', location: '东部郊区', status: '正常', importance: '高' },
        { name: '西湖', location: '市中心', status: '警戒', importance: '中' }
      ]
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      const chart = echarts.init(this.$refs.chart)

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['现有规划', '未来规划']
        },
        xAxis: {
          type: 'category',
          data: ['东部水库', '西湖', '北部闸门', '南部泵站']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: [
          {
            name: '现有规划',
            type: 'bar',
            data: [85, 70, 90, 10]
          },
          {
            name: '未来规划',
            type: 'bar',
            data: [95, 85, 90, 80]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表
      chart.setOption(option)
    }
  }
}
</script>

<style scoped>
.planning {
  padding: 20px;
}

.el-card {
  margin-bottom: 20px;
}

#map, #chart {
  border: 1px solid #dcdfe6;
}

.facility-card {
  margin-bottom: 10px;
}
</style>
