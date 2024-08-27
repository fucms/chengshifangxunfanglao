<template>
  <div>
    <el-input v-model="filter" style="width: 200px" class="filter-item" @keyup.enter.native="handleFilter" />
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
      搜索
    </el-button>
    <el-button
      class="filter-item"
      style="margin-left: 10px"
      type="primary"
      icon="el-icon-plus"
      @click="handleCreate"
    >新增</el-button>
    <el-button
      class="filter-item"
      style="margin-left: 10px"
      type="primary"
      icon="el-icon-bottom"
      @click="handleImport"
    >导入</el-button>
    <el-button
      class="filter-item"
      style="margin-left: 10px"
      type="primary"
      icon="el-icon-top"
      @click="handleDownload"
    >导出</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: ''
    }
  },
  methods: {
    handleFilter() { },
    handleCreate() {
      this.$refs.create.show()
    },
    handleImport() { },
    handleDownload() { }
  }
}
</script>

<style lang="scss" scoped></style>
