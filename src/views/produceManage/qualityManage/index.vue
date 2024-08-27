<template>
  <div class="warning-broadcast">
    <el-row :gutter="20" type="flex" justify="space-around">
      <!-- 信息快速发布 -->
      <el-col :span="12">
        <el-card>
          <h3>防汛防痨讯息发布</h3>
          <el-button type="primary" @click="showPublishDialog">点击发布</el-button>
          <el-dialog
            title="快速发布"
            :visible.sync="publishDialogVisible"
            width="50%"
            @close="resetPublishForm"
          >
            <el-form ref="publishForm" :model="publishForm" label-width="120px">
              <el-form-item label="标题" :rules="{ required: true, message: '请输入标题', trigger: 'blur' }">
                <el-input v-model="publishForm.title" />
              </el-form-item>
              <el-form-item label="内容" :rules="{ required: true, message: '请输入内容', trigger: 'blur' }">
                <el-input v-model="publishForm.content" type="textarea" rows="4" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="publishInfo">确认</el-button>
                <el-button @click="publishDialogVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-card>
      </el-col>

      <!-- 临时视频会议 -->
      <el-col :span="12">
        <el-card>
          <h3>临时视频会议</h3>
          <el-button type="success" @click="showMeetingDialog">创建临时会议</el-button>
          <el-dialog
            title="创建临时会议"
            :visible.sync="meetingDialogVisible"
            width="50%"
            @close="resetMeetingForm"
          >
            <el-form ref="meetingForm" :model="meetingForm" label-width="120px">
              <el-form-item label="会议标题" :rules="{ required: true, message: '请输入会议标题', trigger: 'blur' }">
                <el-input v-model="meetingForm.title" />
              </el-form-item>
              <el-form-item label="参与单位" :rules="{ required: true, message: '请选择参与单位', trigger: 'change' }">
                <el-select v-model="meetingForm.units" multiple placeholder="请选择参与单位">
                  <el-option v-for="unit in units" :key="unit.id" :label="unit.name" :value="unit.id" />
                </el-select>
              </el-form-item>
              <el-form-item label="会议时间" :rules="{ required: true, message: '请选择会议时间', trigger: 'change' }">
                <el-date-picker v-model="meetingForm.dateTime" type="datetime" placeholder="选择会议时间" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="createMeeting">创建会议</el-button>
                <el-button @click="meetingDialogVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-card>
      </el-col>
    </el-row>
    <!-- 防汛防涝信息表格 -->
    <el-row :gutter="20" class="info-table">
      <el-col :span="24">
        <el-card>
          <h3>防汛防涝信息</h3>
          <el-table :data="floodData" style="width: 100%" border>
            <el-table-column prop="title" label="标题" width="200" />
            <el-table-column prop="content" label="内容" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 信息快速发布
      publishDialogVisible: false,
      publishForm: {
        title: '',
        content: ''
      },

      // 防汛防涝信息的初始数据
      floodData: [
        { title: '城区东部高危预警', content: '预计未来2小时将有暴雨，请密切关注水位变化。' },
        { title: '城区南部中危预警', content: '水位上升较快，请做好排涝准备。' },
        { title: '城区东部高危预警', content: '预计未来2小时将有暴雨，请密切关注水位变化。' },
        { title: '城区南部中危预警', content: '水位上升较快，请做好排涝准备。' }
      ],

      // 临时视频会议
      meetingDialogVisible: false,
      meetingForm: {
        title: '',
        units: [],
        dateTime: ''
      },
      units: [
        { id: 1, name: '单位A' },
        { id: 2, name: '单位B' },
        { id: 3, name: '单位C' }
      ]
    }
  },
  methods: {
    showPublishDialog() {
      this.publishDialogVisible = true
    },
    publishInfo() {
      this.$refs.publishForm.validate(valid => {
        if (valid) {
          // 这里可以处理发布逻辑，例如发送请求到服务器
          if (this.publishForm.title && this.publishForm.content) {
            this.floodData.push({
              title: this.publishForm.title,
              content: this.publishForm.content
            })
            this.$message.success('信息发布成功')
            this.resetPublishForm() // 发布后重置表单
          } else {
            this.$message.error('请填写完整的发布信息')
          }
          this.publishDialogVisible = false
        }
      })
    },
    showMeetingDialog() {
      this.meetingDialogVisible = true
    },
    createMeeting() {
      this.$refs.meetingForm.validate(valid => {
        if (valid) {
          // 这里可以处理会议创建逻辑，例如发送请求到服务器
          this.$message.success('会议创建成功')
          this.resetMeetingForm()
          this.meetingDialogVisible = false
        }
      })
    },
    resetPublishForm() {
      this.publishForm.title = ''
      this.publishForm.content = ''
    },
    resetMeetingForm() {
      this.meetingForm.title = ''
      this.meetingForm.units = []
      this.meetingForm.dateTime = ''
    }
  }
}
</script>

<style scoped>
.warning-broadcast {
  padding: 20px;
}

.el-card {
  margin-bottom: 20px;
}

.el-button {
  margin-right: 10px;
}
</style>
