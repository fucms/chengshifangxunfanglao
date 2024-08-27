<template>
  <div class="shared-data-view">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-select v-model="selectedDepartment" placeholder="选择部门">
          <el-option v-for="item in departments" :key="item" :label="item" :value="item" />
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="filteredData" style="width: 100%" :default-sort="{ prop: 'timestamp', order: 'descending' }">
      <el-table-column prop="department" label="部门" width="180" />
      <el-table-column prop="info" label="信息" />
      <el-table-column prop="timestamp" label="时间" width="160" sortable />
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="5"
      :total="filteredData.length"
      style="margin-top: 20px"
    />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedDepartment: '',
      departments: ['市防汛办', '市建委', '城管', '园林', '防洪公司', '排管中心']
    }
  },
  computed: {
    filteredData() {
      return this.selectedDepartment
        ? this.data.filter(item => item.department === this.selectedDepartment)
        : this.data
    }
  }
}
</script>

<style scoped>
.shared-data-view {
  padding: 20px;
  margin-top: 20px;
}
.shared-data-view h2 {
  margin-bottom: 20px;
}
</style>
