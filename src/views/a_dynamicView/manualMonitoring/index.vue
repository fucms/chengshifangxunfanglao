<template>
  <div class="app-container" style="width: 100vw; height: 100vh">
    <LineMarker />
  </div>
</template>

<script>
import { getList } from '@/api/aboutDocument'
import LineMarker from '@/components/Charts/LineMarker.vue'
import { levelTypeColor, customerStatusColor } from '@/filters/components/customerType'
export default {
  components: {
    LineMarker
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
      downLoadText: '默认文件.xlsx',
      active: 'second'
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

<style lang="less" scoped>

</style>
