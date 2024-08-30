<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.filter" style="width: 200px" class="filter-item"
                @keyup.enter.native="handleFilter" /> -->
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="综合气象资讯">
          <el-input v-model="listQuery.filter" placeholder="请输入综合气象资讯" />
        </el-form-item>
        <el-form-item>
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
        </el-form-item>
      </el-form>

      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="综合气象资讯" prop="code" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.weatherInfo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="降雨信息" prop="type3" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.rainfallInfo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="内涝数据" prop="type3" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.floodData }}</span>
          </template>
        </el-table-column>
        <el-table-column label="告警信息" prop="type3" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.alertInfo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="业务流事件" prop="type3" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.businessEvent }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="120">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
      <!-- 导入 -->
      <UploadDownExcel
        ref="UploadDownExcel"
        :href="href"
        :down-load-text="downLoadText"
        @uploadTableList="uploadTableList"
      />
      <!-- 新增 -->
      <Create ref="create" @submit="create" />
      <!-- 编辑 -->
      <Edit ref="edit" />
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/aboutDocument'
import Pagination from '@/components/Pagination'
import UploadDownExcel from '@/components/UploadDownExcel/index.vue'
import Create from './components/create.vue'
import Edit from './components/edit.vue'
import { levelTypeColor, customerStatusColor } from '@/filters/components/customerType'
export default {
  components: {
    Pagination,
    UploadDownExcel,
    Create,
    Edit
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        filter: ''
      },
      total: 0,
      href: '/template/默认文件.xlsx',
      downLoadText: '默认文件.xlsx'
    }
  },
  computed: {},
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getList().then(res => {
        this.list = res.items.map((item, index) => {
          item.levelTypeColor = levelTypeColor(item.level)
          item.customerStatusColor = customerStatusColor(item.status)
          return {
            ...item,
            index: index + 1
          }
        })
        this.total = res.total
        this.listLoading = false
      })
    },
    create(form) {
      this.list.push({
        weatherInfo: form.customerCode1,
        rainfallInfo: form.customerCode2,
        floodData: form.customerCode3,
        alertInfo: form.customerCode4,
        businessEvent: form.customerCode5
      })
    },
    handleFilter() { },
    // 导入组件弹出
    handleImport() {
      this.$refs.UploadDownExcel.show()
    },
    // 导入文件
    uploadTableList(val) { },
    handleCreate() {
      this.$refs.create.show()
    },
    handleUpdate(val) {
      this.$refs.edit.show(val)
    },
    handleDelete() { },
    handleDownload() { }
  }
}
</script>

<style lang="less" scoped></style>
