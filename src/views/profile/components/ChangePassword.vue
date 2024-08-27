<template>
  <el-form ref="ruleForm" :rules="rules" :model="ruleForm">
    <el-form-item label="当前密码" prop="currentPassword">
      <el-input v-model="ruleForm.currentPassword" :type="passwordType">
        <el-button slot="append" icon="el-icon-view" @click="viewEye" />
      </el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="ruleForm.newPassword" :type="passwordType2">
        <el-button slot="append" icon="el-icon-view" @click="viewEye2" />
      </el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="newPassword2">
      <el-input v-model="ruleForm.newPassword2" :type="passwordType3">
        <el-button slot="append" icon="el-icon-view" @click="viewEye3" />
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">确认编辑</el-button>
      <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import { putMyProfile } from '@/api/profile'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.newPassword2 !== '') {
          this.$refs.ruleForm.validateField('newPassword2')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        currentPassword: '',
        newPassword: '',
        newPassword2: ''
      },
      passwordType: 'password',
      passwordType2: 'password',
      passwordType3: 'password',

      rules: {
        currentPassword: [
          { required: true, message: '请输入当前密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        newPassword2: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // putMyProfile(this.ruleForm).then(res => {
          //   this.$message.success('密码编辑成功')
          //   this.$store.dispatch('user/logout')
          //   this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          // })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.ruleForm = {
        currentPassword: '',
        newPassword: '',
        newPassword2: ''
      }
    },

    viewEye() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
    viewEye2() {
      this.passwordType2 = this.passwordType2 === 'password' ? 'text' : 'password'
    },
    viewEye3() {
      this.passwordType3 = this.passwordType3 === 'password' ? 'text' : 'password'
    }
  }
}
</script>

