<template>
    <div>
        <el-dialog :title="title" :visible.sync="visible" style="padding-bottom: 5vh" width="30%">
            <el-form ref="dataForm" :model="temp" label-position="left" label-width="auto" :rules="rules">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="图层名称" prop="customerCode">
                            <el-input v-model="temp.customerCode" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="图层类型" prop="customerName">
                            <el-input v-model="temp.customerName" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="本周访问数" prop="customerName">
                            <el-input v-model="temp.customerName" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="本月访问数" prop="customerName">
                            <el-input v-model="temp.customerName" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="本年度访问数" prop="customerName">
                            <el-input v-model="temp.customerName" />
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