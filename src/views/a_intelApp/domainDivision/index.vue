<template>
  <div class="shared-data-page">
    <el-card>
      <el-row :gutter="20">
        <el-col v-for="summary in summaries" :key="summary.department" :span="8">
          <DepartmentDataSummary
            :department="summary.department"
            :total-count="summary.totalCount"
            :latest-update="summary.latestUpdate"
            :status="summary.status"
          />
        </el-col>
      </el-row>
      <SharedDataView :data="sharedData" />
    </el-card>
  </div>
</template>

<script>
import SharedDataView from './components/SharedDataView.vue'
import DepartmentDataSummary from './components/DepartmentDataSummary.vue'

export default {
  components: {
    SharedDataView,
    DepartmentDataSummary
  },
  data() {
    return {
      sharedData: [
        { department: '市防汛办', info: '水位正常', timestamp: '2022-09-18 10:00' },
        { department: '市建委', info: '管道检修中', timestamp: '2022-09-19 11:00' },
        { department: '城管', info: '道路畅通', timestamp: '2022-09-20 09:30' }
        // ...更多数据
      ],
      summaries: [
        { department: '市防汛办', totalCount: 100, latestUpdate: '2022/10/19', status: '正常' },
        { department: '市建委', totalCount: 80, latestUpdate: '2022/09/19', status: '注意' },
        { department: '城管', totalCount: 50, latestUpdate: '2022/09/23', status: '警告' }
        // ...更多摘要信息
      ]
    }
  }
}
</script>

<style scoped>
.shared-data-page {
  padding: 20px;
}
.shared-data-page .el-card {
  margin: 0 auto;
  max-width: 1000px;
  padding: 15px;
}
</style>
