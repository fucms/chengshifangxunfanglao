<template>
  <div>
    <el-dialog
      title="导入"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-steps direction="vertical" :active="1" :space="120" finish-status="process">
        <el-step title="下载空白模板">
          <template slot="description">
            <p>请先下载「空白模板」并按照模板填写后再上传。</p>
            <a :href="href" :download="downLoadText"><el-button type="primary">下载模板</el-button></a>
            <!-- <el-button plain type="primary" size="mini" @click="handleDownload">下载空白模板</el-button> -->
          </template>
        </el-step>
        <el-step title="导入填好的模板">
          <template slot="description">
            <p>请按照模板填写后，将文件上传到服务器。</p>
            <p>上传文件必须按照模板要求提供！</p>
            <up-load ref="uploadView" :limit="1" :clear="!dialogVisible" />
          </template>
        </el-step>
      </el-steps>
      <hr class="hr">
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">关闭窗口</el-button>
        <el-button type="primary" @click="handUploadTableList">确定导入</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import upLoad from '@/components/UploadView/index.vue'
export default {
  components: {
    upLoad
  },
  props: {
    href: {
      type: String,
      default: ''
    },
    downLoadText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      file: ''
    }
  },
  mounted() {

  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    handUploadTableList() {
      this.file = this.$refs.uploadView.getFileBlobNames()
      this.$emit('uploadTableList', this.file)
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
