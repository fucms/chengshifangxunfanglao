<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" style="padding-bottom: 5vh" width="60%">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="auto" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="信息编号" prop="customerCode">
              <el-input v-model="temp.customerCode1" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="积水地址" prop="customerName">
              <el-input v-model="temp.customerCode2" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="积水描述" prop="customerName">
              <el-input v-model="temp.customerCode3" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上传时间" prop="customerName">
              <el-input v-model="temp.customerCode4" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上报人" prop="customerName">
              <el-input v-model="temp.customerCode5" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="customerName">
              <el-input v-model="temp.customerCode6" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上传图片" prop="customerName">
              <el-input v-model="temp.customerCode7" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {
      title: '编辑',
      visible: false,
      temp: {
        customerCode: '',
        customerName: '',
        dutyParagraph: '',
        type1: '',
        type2: '',
        type3: '',
        product: ''
      },
      rules: {}
    }
  },
  methods: {
    show(val) {
      this.visible = true
      this.temp = { ...val }
    },
    submitForm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.visible = false
          this.$parent.getList()
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        }
      })
    }
  }
}
</script>
