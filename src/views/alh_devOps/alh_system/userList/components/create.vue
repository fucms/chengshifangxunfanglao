<template>
    <div>
        <el-dialog :title="title" :visible.sync="visible" style="padding-bottom: 5vh" width="30%">
            <el-form ref="dataForm" :model="temp" label-position="left" label-width="auto" :rules="rules">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="姓名" prop="customerCode">
                            <el-input v-model="temp.customerCode" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="部门" prop="customerName">
                            <el-input v-model="temp.customerName" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="工号" prop="customerName">
                            <el-input v-model="temp.customerName" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="员工组" prop="customerName">
                            <el-input v-model="temp.customerName" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="联系电话" prop="customerName">
                            <el-input v-model="temp.customerName" />
                        </el-form-item>
                    </el-col>
                    <!-- 上传附件 -->
                    <el-col :span="24">
                        <el-form-item label="员工组" prop="customerName">
                            <Upload />
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
import Upload from '@/components/UploadView/index.vue'
export default {
    data() {
        return {
            title: '新增用户信息',
            visible: false,
            temp: {
                customerCode: '',
                customerName: '',
                dutyParagraph: '',
                type1: '',
                type2: '',
                type3: '',
                product: '',
            },
            rules: {}
        }
    },
    components: {
        Upload
    },
    methods: {
        show(val) {
            this.visible = true
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