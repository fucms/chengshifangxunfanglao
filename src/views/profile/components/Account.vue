<template>
  <el-form>
    <el-form-item label="账号">
      <el-input v-model.trim="user.userName" disabled />
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model.trim="user.phoneNumber" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

// import { updateMyProfile } from '@/api/documentation/user'
export default {
  components: { },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          userName: '',
          name: '',
          phoneNumber: '',
          email: ''
        }
      }
    }
  },
  data() {
    return {
      imageCropperShow: false,
      imageCropperKey: 0
    }
  },
  methods: {
    submit() {
      // const id = '5f569542-29bd-ad64-96dd-3a11b09dd6dd'
      // const data = {
      //   'userName': this.user.userName,
      //   'name': this.user.name,
      //   'email': this.user.email,
      //   'phoneNumber': this.user.phoneNumber,
      //   'isActive': true
      // }
      // updateUser(id, data).then(res => {
      //   this.$message({
      //     message: '用户信息更新成功',
      //     type: 'success',
      //     duration: 5 * 1000
      //   })
      // })
      const data = {
        'userName': this.user.userName,
        'name': this.user.name,
        'email': this.user.email,
        'phoneNumber': this.user.phoneNumber,
        'isActive': true,
        'avatar': this.user.avatar
      }

      // updateMyProfile(data).then(res => {
      //   this.$message({
      //     message: '用户信息更新成功',
      //     type: 'success',
      //     duration: 5 * 1000
      //   })
      // })
    }
  }
}
</script>
