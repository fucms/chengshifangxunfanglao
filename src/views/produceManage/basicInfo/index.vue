<template>
  <div class="flood-warning">
    <el-row :gutter="20">
      <!-- 防汛信息 -->
      <el-col :span="24">
        <el-card>
          <h3>防汛信息</h3>
          <el-table :data="floodData" style="width: 100%">
            <el-table-column prop="location" label="位置" width="150" />
            <el-table-column prop="riskLevel" label="风险等级" />
            <el-table-column prop="status" label="状态" />
            <el-table-column prop="lastUpdated" label="更新时间" width="180" />
            <el-table-column prop="details" label="详情" width="150">
              <template slot-scope="scope">
                <el-button type="text" @click="showDetails(scope.row.details)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <!-- 统计分析 -->
      <el-col :span="12">
        <el-card>
          <h3>统计分析</h3>
          <el-table :data="statisticsData" style="width: 100%">
            <el-table-column prop="category" label="类别" width="150" />
            <el-table-column prop="count" label="数量" />
            <el-table-column prop="percentage" label="百分比" width="150">
              <template slot-scope="scope">
                {{ (scope.row.count / totalCount * 100).toFixed(2) }}%
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <!-- 预警提示 -->
      <el-col :span="12">
        <el-card>
          <h3>预警提示</h3>
          <el-alert
            v-for="alert in alerts"
            :key="alert.id"
            :title="alert.title"
            :type="alert.type"
            :description="alert.description"
            :closable="false"
            show-icon
          />
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      // 静态防汛信息数据
      floodData: [
        { location: '城区东部', riskLevel: '高危', status: '持续监测', lastUpdated: '2022-09-20 14:30', details: '预计未来2小时将有暴雨，请密切关注水位变化。' },
        { location: '城区西部', riskLevel: '低危', status: '正常', lastUpdated: '2022-10-20 14:00', details: '暂无特别情况，请正常处理。' },
        { location: '城区南部', riskLevel: '中危', status: '预警中', lastUpdated: '2022-11-10 13:50', details: '水位上升较快，请做好排涝准备。' }
      ],
      // 静态统计分析数据
      statisticsData: [
        { category: '低危区域', count: 10 },
        { category: '中危区域', count: 5 },
        { category: '高危区域', count: 2 }
      ],
      // 静态预警提示数据
      alerts: [
        { id: 1, title: '城区东部高危预警', type: 'error', description: '预计未来2小时将有暴雨，请密切关注水位变化。' },
        { id: 2, title: '城区南部中危预警', type: 'warning', description: '水位上升较快，请做好排涝准备。' }
      ],
      totalCount: 17 // 静态统计分析数据总数
    }
  },
  methods: {
    showDetails(details) {
      this.$message({
        message: details,
        type: 'info'
      })
    }
  }
}
</script>

<style scoped>
.flood-warning {
  padding: 20px;
}

.el-card {
  margin-bottom: 20px;
}

.el-button {
  margin-right: 5px;
}
</style>
