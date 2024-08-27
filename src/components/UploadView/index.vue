<template>
  <div>
    <el-upload
      ref="upload"
      class="upload-demo"
      :action="action"
      :accept="accept"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :multiple="multiple"
      :limit="limit"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :headers="headers"
      :on-success="handleSuccess"
      :on-error="handleError"
    >
      <el-button size="small" type="primary">选取附件</el-button>
    </el-upload>
  </div>
</template>

<script>

// import { getFileUrl } from '@/utils/abp-file'
import { getToken } from '@/utils/auth'
export default {
  props: {
    limit: {
      type: Number, default: 10
    },
    multiple: {
      type: Boolean, default: true
    },
    confirm: {
      type: Boolean, default: true
    },
    clear: {
      type: Boolean, default: true // true 弹窗关闭 清空fileList
    },
    fileList: {
      type: Array, default: function() {
        return []
      }
    },
    accept: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      action: process.env.VUE_APP_BASE_API + '/file/upload',
      headers: {
        'authorization': 'Bearer ' + getToken()
      }
    }
  },
  watch: {
    clear: function(val, oldVal) {
      val && this.clearFiles()
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) { },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择${this.limit}个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      if (this.confirm) {
        return this.$confirm(`确定移除 ${file.name}？`)
      }
    },
    handleSuccess(response, file, fileList) {

    },
    handleError(err, file, fileList) {
      // console.log(err)
      if (err && err.message) {
        const r = JSON.parse(err.message)
        this.$notify({
          title: r.error.message,
          type: 'error',
          duration: 2000
        })
      }
    },
    clearFiles() {
      this.$refs.upload.clearFiles()
    },
    getFileBlobNames() {
      // debugger
      const blobNameArray = this.$refs.upload.uploadFiles.map(x => x.response || x.blobName)
      return blobNameArray
    }
  }
}
</script>

<style lang="less" scoped>
.hr {
  margin-top: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
