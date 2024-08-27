<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.filter" style="width: 200px" class="filter-item"
                @keyup.enter.native="handleFilter" /> -->
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="listQuery.filter1" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="listQuery.filter2" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="listQuery.filter3" placeholder="请选择用户状态">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色类型">
          <el-select v-model="listQuery.filter4" placeholder="请选择角色类型">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="8">
            <el-date-picker v-model="listQuery.date1" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="8">
            <el-time-picker v-model="listQuery.date2" placeholder="选择时间" style="width: 100%;" />
          </el-col>
        </el-form-item>
      </el-form>

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

      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="用户ID" prop="code" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.code1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名称" prop="type3" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.code2 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="登录账户" prop="type3" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.code3 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色类型" prop="type3" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.code4 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="区域名称" prop="type3" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.code5 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话号码" prop="type3" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.code6 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户状态" prop="type3" align="center">
          <template slot-scope="{ row }">
            <el-switch v-model="row.isRead" />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="type3" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.code7 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" min-width="200">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
            <el-button size="mini" type="info">密码重置</el-button>
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
        filter1: '',
        filter2: '',
        filter3: '',
        filter4: '',
        data1: '',
        data2: ''
      },
      total: 0,
      href: '/template/默认文件.xlsx',
      downLoadText: '默认文件.xlsx',
      value1: true
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
        code1: form.customerCode1,
        code2: form.customerCode2,
        code3: form.customerCode3,
        code4: form.customerCode4,
        code5: form.customerCode5,
        code6: form.customerCode6,
        code7: form.customerCode7
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
