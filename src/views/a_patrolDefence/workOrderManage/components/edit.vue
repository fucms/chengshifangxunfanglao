<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" style="padding-bottom: 5vh" width="60%">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="auto" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="时间" prop="customerCode">
              <el-input v-model="temp.customerCode1" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="监测点" prop="customerName">
              <el-input v-model="temp.customerCode2" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="水位" prop="customerName">
              <el-input v-model="temp.customerCode3" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="流量" prop="customerName">
              <el-input v-model="temp.customerCode4" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="降水量" prop="customerName">
              <el-input v-model="temp.customerCode5" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="风险评估" prop="customerName">
              <el-select v-model="temp.value" placeholder="请选择">
                <el-option label="待处理" value="0" />
                <el-option label="已完成" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="水质" prop="customerName">
              <el-input v-model="temp.customerCode6" />
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
