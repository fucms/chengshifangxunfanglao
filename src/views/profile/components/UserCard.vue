<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>个人中心</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>你好</div>
          {{ user.role }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div>

        <div class="user-change-avatar">
          <el-button type="primary" icon="el-icon-upload" @click="imageCropperShow = true">
            更换头像
          </el-button>
          <image-cropper
            v-show="imageCropperShow"
            :key="imageCropperKey"
            :url="url"
            field="file"
            lang-type="zh"
            @close="close"
            @crop-upload-success="cropSuccess"
          />
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import ImageCropper from '@/components/ImageCropper'
// import { changeAvatar } from '@/api/dashboard/changeAvatar'
export default {
  components: { PanThumb, ImageCropper },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          role: '',
          id: ''
        }
      }
    }
  },
  data() {
    return {
      imageCropperShow: false,
      imageCropperKey: 0,
      url: process.env.VUE_APP_BASE_API + '/file/upload'
    }
  },
  methods: {
    cropSuccess(resData) {
      this.imageCropperShow = false
      this.imageCropperKey = this.imageCropperKey + 1
      this.image = resData

      // 调用编辑头像api
      // changeAvatar(resData).then(res => {
      //   this.$notify({
      //     title: '头像编辑成功',
      //     type: 'success',
      //     duration: 2500
      //   })
      // })

      // 刷新页面
      window.location.reload()
    },
    close() {
      this.imageCropperShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
