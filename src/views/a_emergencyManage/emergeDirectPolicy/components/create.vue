<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" style="padding-bottom: 5vh" width="60%">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="auto" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="值守任务编号" prop="customerCode">
              <el-input v-model="temp.customerCode1" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="办理时间" prop="customerName">
              <el-input v-model="temp.customerCode2" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="办理流程" prop="customerName">
              <el-input v-model="temp.customerCode3" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="办理意见" prop="customerName">
              <el-input v-model="temp.customerCode4" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属部门" prop="customerName">
              <el-input v-model="temp.customerCode5" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行状态" prop="customerName">
              <el-select v-model="temp.value" placeholder="请选择">
                <el-option label="执行中" value="0" />
                <el-option label="已执行" value="1" />
              </el-select>
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
      title: '新增',
      visible: false,
      temp: {
        customerCode1: '',
        customerCode2: '',
        customerCode3: '',
        customerCode4: '',
        customerCode5: '',
        value: ''
      },
      rules: {}
    }
  },
  methods: {
    show(val) {
      this.visible = true
    },
    submitForm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.visible = false
          this.$emit('submit', this.temp)
          this.temp = {}
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
