<template>
    <div>
        <el-dialog :title="title" :visible.sync="visible" style="padding-bottom: 5vh" width="30%">
            <el-form ref="dataForm" :model="temp" label-position="left" label-width="auto" :rules="rules">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="资源名称" prop="customerCode">
                            <el-input v-model="temp.customerCode" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="资源层次" prop="customerName">
                            <el-input v-model="temp.customerName" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="是否注册" prop="type1">
                            <el-radio-group v-model="type1" size="mini">
                                <el-radio label="0" border>否</el-radio>
                                <el-radio label="1" border>是</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="是否共享" prop="type2">
                            <el-radio-group v-model="type2" size="mini">
                                <el-radio label="0" border>否</el-radio>
                                <el-radio label="1" border>是</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="地图格式" prop="product">
                            <el-input v-model="temp.product" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="资源状态" prop="type3">
                            <el-radio-group v-model="type3" size="mini">
                                <el-radio label="0" border>不正常</el-radio>
                                <el-radio label="1" border>正常</el-radio>
                            </el-radio-group>
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
    data() {
        return {
            title: '编辑资源信息',
            visible: false,
            temp: {
                customerCode: '',
                customerName: '',
                dutyParagraph: '',
                type1: null,
                type2: null,
                type3: null,
                product: '',
                branch: '',
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