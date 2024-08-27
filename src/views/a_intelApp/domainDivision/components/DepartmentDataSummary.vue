<template>
  <el-card class="department-data-summary">
    <h3>{{ department }}</h3>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-statistic title="数据总量">
          <template slot="suffix">
            {{ totalCount }}
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="8">
        <el-statistic title="最近更新">
          <template slot="suffix">
            {{ latestUpdate }}
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="8">
        <el-statistic title="监控状态">
          <template slot="suffix">
            {{ status }}
          </template>
        </el-statistic>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    department: {
      type: String,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    },
    latestUpdate: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  }
}
</script>

  <style scoped>
  .department-data-summary {
    margin-top: 10px;
  }
  .department-data-summary h3 {
    margin-bottom: 20px;
  }
  </style>
