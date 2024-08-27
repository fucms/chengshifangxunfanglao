<template>
  <div>
    <!-- <el-dialog title="上传附件" :visible.sync="dialogFormVisible" width="50%" append-to-body="true"> -->
    <el-upload
      ref="upload"
      class="upload-demo"
      :action="action"
      :before-remove="beforeRemove"
      multiple
      :on-preview="handlePreview"
      :file-list="fileList"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      accept=".xls,.xlsx,.doc,.docx,.pdf,.jpg,.jpeg,.png,.gif"
      :on-remove="handleRemove"
      :limit="6"
      :on-exceed="handleExceed"
    >
      <el-button size="small" type="primary">选取附件</el-button>
    </el-upload>

    <!-- 查看 -->
    <div v-if="currentFile">
      <div v-if="currentFileType === 'excel'" class="officeShow">
        <vue-office-excel :src="fileSrc" style="height: 40vh;width: 100%;" />
      </div>
      <div v-else-if="currentFileType === 'pdf'" class="officeShow">
        <vue-office-pdf :src="fileSrc" style="height: auto;width: 100%;" />
      </div>
      <div v-else-if="currentFileType === 'word'" class="officeShow">
        <vue-office-docx :src="fileSrc" style="height: 40vh;width: 100%;overflow: scroll;" />
      </div>
      <div v-else class="officeShow">
        <img :src="fileSrc" style="height: auto;width: 100%;">
      </div>
    </div>

    <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="cancellation">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
        <el-button type="primary" @click="upClick">上传</el-button>
      </div> -->
    <!-- </el-dialog> -->
  </div>
</template>

<script>
// 引入VueOfficePdf组件
import VueOfficePdf from '@vue-office/pdf'
// docx
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
// 引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
// 引入相关样式
import '@vue-office/excel/lib/index.css'

export default {
  components: {
    VueOfficeExcel,
    VueOfficePdf,
    VueOfficeDocx
  },
  props: {
  },
  data() {
    return {
      dialogFormVisible: false,
      action: process.env.VUE_APP_BASE_API + '/file/upload',
      fileList: [],
      currentFile: null,
      files: []
    }
  },
  computed: {
    // 判断当前预览的文件类型
    currentFileType() {
      let type = ''
      if (this.currentFile.name) {
        const arr = this.currentFile.name && this.currentFile.name.split('.')
        type = arr[arr.length - 1]
      }
      switch (true) {
        case ['xls', 'xlsx'].includes(type):
          return 'excel'
        case ['doc', 'docx'].includes(type):
          return 'word'
        case ['pdf'].includes(type):
          return 'pdf'
        default:
          return 'img'
      }
    },
    fileSrc() {
      if (this.currentFileType === 'img') {
        const windowURL = window.URL || window.webkitURL
        const src = windowURL.createObjectURL(this.currentFile.raw)
        return src
      } else {
        return this.currentFile.raw
      }
    }
  },
  // 监听fileList的变化，并将最新的值传给父组件
  // watch: {
  //   fileList: {
  //     handler(newVal) {
  //       this.$emit('getFiles', newVal, this.files)
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    show() {
      this.dialogFormVisible = true
    },
    cancellation() {
      this.dialogFormVisible = false
      this.fileList = []
    },
    // 暂存
    // save() {
    //   this.dialogFormVisible = false
    //   this.$notify({
    //     title: '成功',
    //     message: '已保存',
    //     type: 'success',
    //     duration: 1000
    //   })
    // },
    handleRemove(file, fileList) {
      this.fileList = fileList
      // 判断溢出的文件是否当前预览中的文件
      if (fileList.findIndex(item => item.uid === this.currentFile.uid) === -1) {
        this.currentFile = null
      }
    },
    handlePreview(file) {
      // console.log(file)
      this.currentFile = file
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 6 个文件，本次选择了 ${files.length}个文件，共选择了 ${files.length + fileList.length}个文件`)
    },
    beforeRemove(file, fileList) {
      // debugger
      this.fileList = fileList
      // return this.$confirm(`确定移除 ${file.name} ？`)
    },
    handleSuccess(response, file, fileList) {
      // debugger
      this.files.push(response)
      // this.files = fileList
      this.$emit('getFiles', this.files, response)
    },
    beforeUpload(file) {
      const isLt20M = file.size / 1024 / 1024 < 20
      if (!isLt20M) {
        this.$message.error('上传文件大小不能超过 20MB!')
      }
      return isLt20M
    }
  }
}
</script>

<style lang="scss" scoped></style>
