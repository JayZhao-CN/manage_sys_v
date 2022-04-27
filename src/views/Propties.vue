<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div>
                    <el-table :data="dataList" ref="multipleTable" style="font-weight: bold; font-size: 18px"
                              :header-cell-style="{background:'#d0d3d7',color:'#555555'}" stripe>
                        <el-table-column property="proptiesName" label="属性名称" key="proptiesName"/>
                        <el-table-column align="right" key="option">
                            <template #header>
                                <span style="float: left">操作</span>
                            </template>
                            <template #default="scope">
                                <el-col style="margin: 5px">
                                    <el-button type="primary" @click="clickDetail(scope.$index,scope.row)">详情
                                    </el-button>
                                </el-col>
                                <el-col style="margin: 5px">
                                    <el-popconfirm
                                            confirm-button-text="确定"
                                            cancel-button-text="取消"
                                            icon-color="red"
                                            :title="ensureTitle"
                                            @confirm="clickDelete(scope.$index)"
                                    >
                                        <template #reference>
                                            <el-button type="danger"
                                                       @click="this.ensureTitle = '删除' + this.dataList[scope.$index].proptiesName + '?' ">
                                                删除
                                            </el-button>
                                        </template>
                                    </el-popconfirm>
                                </el-col>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block" style="text-align: center; margin-top: 30px">
                    <el-row>
                        <el-col :span="8" :offset="8">
                            <div>
                                <el-pagination v-show="this.total/this.pageSize > 1"
                                               @size-change="handleSizeChange"
                                               @current-change="handleCurrentChange"
                                               :currentPage=currentPage
                                               :page-size=pageSize
                                               layout="prev, pager, next, jumper"
                                               :total=total
                                >
                                </el-pagination>
                            </div>
                        </el-col>
                        <el-col :span="4" :offset="4">
                            <div>
                                <el-button style="font-weight: bold" auto-insert-space="true"
                                           type="primary" size="large" @click="clickAdd">
                                    新增
                                </el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-dialog v-model="dialogFormVisible" title="新增属性" :before-close="hideCommit">
            <el-form ref="formRef" :model="form" label-width="120px">
                <el-form-item label="属性名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="是否添加颜色">
                    <el-switch
                            v-model="form.color"
                            active-color="#13ce66">
                    </el-switch>
                </el-form-item>
                <el-form-item label="是否添加图片">
                    <el-switch
                            v-model="form.image"
                            active-color="#13ce66">
                    </el-switch>
                </el-form-item>

            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="hideCommit">取消</el-button>
        <el-button type="primary" @click="commitAdd" v-loading="loading"
        >提交</el-button
        >
      </span>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogDetailVisible" :title="detailTitle" :before-close="hideDetail" width="90%"
                   height="100vh">
            <div>
                <div>
                    <el-table :data="dialogDataList" ref="multipleTable"
                              style="font-weight: bold; font-size: 18px;width: 100%"
                              :header-cell-style="{background:'#d0d3d7',color:'#555555'}" stripe
                              height="350"
                              border>
                        <el-table-column property="name"
                                         label="名称" key="name"/>
                        <el-table-column v-if="proptiesType==='color' || proptiesType==='yes'">
                            <template #header>
                                <span style="float: left">颜色展示</span>
                            </template>
                            <template #default="scope">
                                <el-card shadow="always"
                                         :style=" {'background': dialogDataList[scope.$index].color}"></el-card>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="proptiesType==='image' || proptiesType==='yes'">
                            <template #header>
                                <span style="float: left">图片展示</span>
                            </template>
                            <template #default="scope">
                                <el-image
                                        style="width: 100px; height: 100px"
                                        :preview-src-list="imgList"
                                        :initial-index="scope.$index"
                                        :src="dialogDataList[scope.$index].image"
                                        fit="cover"
                                >
                                </el-image>
                            </template>
                        </el-table-column>
                        <el-table-column align="right" key="option">
                            <template #header>
                                <span style="float: left">操作</span>
                            </template>
                            <template #default="scope">
                                <el-col style="margin: 5px">
                                    <el-button type="warning" @click="dialog2clickChange(scope.$index,scope.row)">
                                        修改
                                    </el-button>
                                </el-col>
                                <el-col style="margin: 5px">
                                    <el-popconfirm
                                            confirm-button-text="确定"
                                            cancel-button-text="取消"
                                            icon-color="red"
                                            :title="ensureTitle"
                                            @confirm="dialog2clickDelete(scope.$index)"
                                    >
                                        <template #reference>
                                            <el-button type="danger"
                                                       @click="this.ensureTitle = '删除' + this.dialogDataList[scope.$index].name + '?' ">
                                                删除
                                            </el-button>
                                        </template>
                                    </el-popconfirm>
                                </el-col>
                            </template>
                        </el-table-column>

                    </el-table>
                </div>
                <div class="block" style="text-align: center; margin-top: 30px">
                    <el-row>
                        <el-col :span="8" :offset="8">
                            <div>
                                <el-pagination v-show="this.dialog2total/this.dialog2pageSize > 1"
                                               @size-change="dialog2handleSizeChange"
                                               @current-change="dialog2handleCurrentChange"
                                               :currentPage=dialog2currentPage
                                               :page-size=dialog2pageSize
                                               layout="prev, pager, next, jumper"
                                               :total=dialog2total
                                >
                                </el-pagination>
                            </div>
                        </el-col>
                        <el-col :span="4" :offset="4">
                            <div>
                                <el-button style="font-weight: bold" auto-insert-space="true"
                                           type="primary" size="large" @click="dialog2clickAdd">
                                    新增
                                </el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <el-dialog v-model="dialog2AddVisible" :title="dialogAddTitle" :before-close="dialog2hideCommit">
                    <el-form :model="dialogAddForm" label-width="120px">
                        <el-form-item label="名称">
                            <el-input v-model="dialogAddForm.name"></el-input>
                        </el-form-item>

                        <el-form-item v-if="proptiesType==='color' || proptiesType==='yes'" label="选择助记颜色">
                            <el-color-picker v-model="dialogAddForm.color" size="large"/>
                        </el-form-item>

                        <el-form-item v-if="proptiesType==='image' || proptiesType==='yes'" label="选择图片">
                            <el-upload
                                    class="avatar-uploader"
                                    action=""
                                    ref="upload"
                                    :show-file-list="false"
                                    :auto-upload="false"
                                    :file-list="fileList"
                                    :http-request="uploadFile"
                                    :on-change="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                            >
                                <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
                                <el-button type="primary" v-else>选择本地图片</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialog2hideCommit">取消</el-button>
        <el-button type="primary" @click="dialog2commitAdd" v-loading="loading"
        >提交</el-button
        >
      </span>
                    </template>
                </el-dialog>
                <el-dialog v-model="dialog2ChangeVisible" title="修改" :before-close="dialog2hideChange">
                    <el-form :model="changeList" label-width="120px">
                        <el-form-item label="名称">
                            <el-input v-model="changeList.name"></el-input>
                        </el-form-item>

                        <el-form-item v-if="proptiesType==='color' || proptiesType==='yes'" label="选择助记颜色">
                            <el-color-picker v-model="changeList.color" size="large"/>
                        </el-form-item>

                        <el-form-item v-if="proptiesType==='image' || proptiesType==='yes'" label="选择图片">
                            <el-upload
                                    class="avatar-uploader"
                                    action=""
                                    ref="upload"
                                    :show-file-list="false"
                                    :auto-upload="false"
                                    :file-list="fileListTemp"
                                    :http-request="uploadChangeFile"
                                    :on-change="handleAvatarChangeSuccess"
                                    :before-upload="beforeAvatarUpload"
                            >
                                <img v-if="imageUrlTemp" :src="imageUrlTemp" class="avatar"/>
                                <el-button type="primary" v-else>选择本地图片</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialog2hideChange">取消</el-button>
        <el-button type="primary" @click="dialog2commitChange" v-loading="loading"
        >提交</el-button
        >
      </span>
                    </template>
                </el-dialog>
            </div>

            <template #footer>
      <span class="dialog2-footer">
        <el-button @click="hideDetail">取消</el-button>
      </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>

    import request from "../utils/request";
    import {ElNotification} from "element-plus";

    export default {
        name: "Type",
        data() {
            return {
                // 表内数据
                dataList: [],

                // 弹框表内数据
                dialogDataList: [],
                imgList: [],

                // 修改临时列表
                changeList: [],

                // 删除确认提示文字
                ensureTitle: "",

                // 详情弹框标题
                detailTitle: "",
                // 显示图片或颜色
                proptiesType: "",
                // 弹窗添加数据
                dialogAddTitle: "",

                // 页数显示信息
                currentPage: 1,
                total: 0,
                pageNum: 1,
                pageSize: 6,

                // 弹窗页数显示信息
                dialog2currentPage: 1,
                dialog2total: 0,
                dialog2pageNum: 1,
                dialog2pageSize: 2,

                // 是否显示新增弹窗
                dialogFormVisible: false,

                // 是否显示详情弹窗
                dialogDetailVisible: false,
                // 是否显示详情中新增弹窗
                dialog2AddVisible: false,
                // 是否显示弹窗内修改弹窗
                dialog2ChangeVisible: false,

                // 新增数据保存
                form: {
                    name: '',
                    color: false,
                    image: false
                },

                dialogAddForm: [],

                // 显示加载按钮
                loading: false,

                // 图片数据
                uploadUrl: "localhost:8080/sys_ext_propties/upload",
                imageUrl: '',
                // 临时缓存
                imageUrlTemp: '',

                fileList: [],
                // 缓存
                fileListTemp: [],

                // proptiesCode 弹窗内切换分页的传值缓存
                proptiesCode: "",
            }
        },

        // 页面创建时，查询列表数据
        created() {
            this.queryData()
        },
        methods: {
            // 查询表内数据
            queryData() {
                // get 页面和公司名
                request.get("/sys_propties/detail" + "?" + "pageNum=" + this.pageNum + "&&" + "pageSize=" + this.pageSize + "&&" + "company=" + this.$store.state.currentCompany.companyCode).then(res => {
                    console.log(res);
                    this.dataList = res.dataInfo.dataInfo.list !== null ? res.dataInfo.dataInfo.list : []
                    // console.log(this.dataList);
                    this.currentPage = res.dataInfo.dataInfo.pageNum
                    this.pageNum = res.dataInfo.dataInfo.pageNum
                    this.total = res.dataInfo.dataInfo.total
                })
            },
            // 添加按钮
            clickAdd() {
                this.dialogFormVisible = true
            },
            // 详情按钮
            async clickDetail(index) {
                this.detailTitle = this.dataList[index].proptiesName + '详情'
                this.proptiesType = this.dataList[index].proptiesType

                // 保存传值
                this.proptiesCode = this.dataList[index].proptiesCode
                // 查询数据
                this.queryDialogData(this.dataList[index].proptiesCode)
                this.dialogDetailVisible = true
            },
            // 删除按钮
            clickDelete(item) {
                request.get("/sys_propties/delete" + "?" + "id=" + this.dataList[item].id + "&&" + "company=" + this.$store.state.currentCompany.companyCode).then(res => {
                    this.queryData()
                })
            },

            // 隐藏提交弹窗
            hideCommit() {
                this.loading = false
                this.dialogFormVisible = false
            },
            // 隐藏详情框
            hideDetail() {
                this.loading = false
                this.dialogDetailVisible = false
                this.dialogDataList = []
            },

            // 提交添加信息
            async commitAdd() {
                if (this.form.name === "" || this.form.name === undefined) {
                    this.msgAlert("失败", "请填写属性名称！", "error")
                    return
                }

                if (this.form.color && this.form.image) {
                    this.form.type = "yes"
                    console.log(true);
                } else if (this.form.color && !this.form.image) {
                    this.form.type = "color"
                    console.log("color");
                } else if (this.form.image && !this.form.color) {
                    this.form.type = "image"
                    console.log("image");
                } else if (!this.form.color && !this.form.image) {
                    this.form.type = "no"
                    console.log(false);
                }

                console.log(this.form.type);

                this.loading = true
                let formData = new FormData();
                formData.set("proptiesName", this.form.name)
                formData.set("proptiesType", this.form.type)
                formData.set("proptiesCompanyCode", this.$store.state.currentCompany.companyCode)

                await request.post("/sys_propties/add", formData).then(res => {
                    this.loading = false
                    if (res.code === 100) {
                        this.loading = false
                        this.form = []
                        res.dataInfo.state === 1 ? this.dialogFormVisible = false : this.dialogFormVisible = false
                        this.queryData()
                        this.msgAlert("成功", "添加成功！", "success")
                    } else {
                        this.loading = false
                        this.msgAlert("失败", res.dataInfo.msg, "warning")
                    }

                })
            },

            /**
             * 弹窗内数据操作
             * @param proptiesCode
             */
            // 查询弹窗表内数据
            queryDialogData(proptiesCode) {
                // get 页面和公司名
                request.get("/sys_ext_propties/detail/" + proptiesCode + "?" + "pageNum=" + this.dialog2pageNum + "&&" + "pageSize=" + this.dialog2pageSize + "&&" + "company=" + this.$store.state.currentCompany.companyCode).then(res => {
                    console.log(res);
                    this.dialogDataList = res.dataInfo.dataInfo.list !== null ? res.dataInfo.dataInfo.list : []

                    for (let i = 0; i < this.dialogDataList.length; i++) {
                        this.imgList[i] = (this.dialogDataList[i].image)
                    }
                    // console.log(this.dataList);
                    this.dialog2currentPage = res.dataInfo.dataInfo.pageNum
                    this.dialog2pageNum = res.dataInfo.dataInfo.pageNum
                    this.dialog2total = res.dataInfo.dataInfo.total
                })
            },
            // 弹窗内添加按钮
            dialog2clickAdd() {
                this.dialog2AddVisible = true
            },
            // 弹窗内修改按钮
            async dialog2clickChange(index) {
                this.changeList = Object.assign({}, this.dialogDataList[index])
                this.imageUrlTemp = this.changeList.image
                this.dialog2ChangeVisible = true
            },

            // 弹窗内删除按钮
            dialog2clickDelete(item) {
                request.get("/sys_ext_propties/delete" + "?" + "id=" + this.dialogDataList[item].id + "&&" + "company=" + this.$store.state.currentCompany.companyCode).then(res => {
                    this.queryDialogData(this.proptiesCode)
                })
            },

            // 弹窗内隐藏添加弹窗
            dialog2hideCommit() {
                this.loading = false
                this.dialog2AddVisible = false
                this.dialogAddForm = []
                this.imageUrl = ''
                this.fileList = []
            },
            // 弹窗内提交添加信息
            async dialog2commitAdd() {
                if (this.dialogAddForm.name === "" || this.dialogAddForm.name === undefined) {
                    this.msgAlert("失败", "请填写名称！", "error")
                    return
                }

                this.loading = true
                // 根据是否需要上传图片选择上传方法

                if ((this.proptiesType !== "yes" && this.proptiesType !== "image") || this.imageUrl.length === 0) {
                    console.log("添加不需要图片");
                    this.uploadWithoutFile()
                } else {
                    console.log("添加需要图片");
                    // 链式上传 上传图片触发方法 --》 具体上传方法 -- 》 上传添加信息
                    await this.clickUpload()
                }
            },

            // 弹窗内隐藏修改框
            dialog2hideChange() {
                this.loading = false
                this.dialog2ChangeVisible = false
                this.changeList = []
                this.imageUrlTemp = ''
                this.fileListTemp = []
            },

            // 提交修改信息
            async dialog2commitChange() {
                if (this.changeList.name === "" || this.changeList.name === undefined) {
                    this.msgAlert("失败", "名称不能为空！", "error")
                    return
                }

                this.loading = true
                // 图片没改变
                if (this.changeList.image === this.imageUrlTemp || (this.proptiesType !== "yes" && this.proptiesType !== "image") || this.imageUrlTemp.length === 0) {
                    console.log("修改 无图片");
                    this.uploadChangeWithoutFile()
                } else {
                    console.log("修改 图片改变了");
                    // 上传图片
                    await this.clickUpload()
                    this.loading = false
                }
            },


            // 消息提示
            msgAlert(title, msg, type) {
                ElNotification({
                    title: title,
                    message: msg,
                    type: type,
                })
            },

            // 以下为进度条官方方法
            handleSizeChange(val) {
                this.dataList = []
                this.pageSize = val
                this.queryData()
                console.log(`每页 ${val} 条`)
            },
            handleCurrentChange(val) {
                this.dataList = []
                this.pageNum = val
                this.queryData()
                console.log(`当前页: ${val}`)
            },

            // 弹窗进度条方法
            dialog2handleSizeChange(val) {
                this.dialogDataList = []
                this.dialog2pageSize = val
                this.queryDialogData(this.proptiesCode)
                console.log(`每页 ${val} 条`)
            },
            dialog2handleCurrentChange(val) {
                this.dialogDataList = []
                this.dialog2pageNum = val
                this.queryDialogData(this.proptiesCode)
                console.log(`当前页: ${val}`)
            },


            // 添加图片成功
            handleAvatarSuccess(file, fileList) {
                console.log("file");
                if (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png' || file.raw.type === 'image/jpg') {
                    this.imageUrl = URL.createObjectURL(file.raw)
                    this.fileList = [fileList[fileList.length - 1]]
                    console.log(this.fileList);
                } else {
                    this.$message.error('请选择正确的图片文件！')
                }
            },

            // 修改图片成功
            handleAvatarChangeSuccess(file, fileListTemp) {
                console.log("tempfile");
                console.log(file.raw);
                if (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png' || file.raw.type === 'image/jpg') {
                    this.imageUrlTemp = URL.createObjectURL(file.raw)
                    this.fileListTemp = [fileListTemp[fileListTemp.length - 1]]
                    console.log(this.fileListTemp);
                } else {
                    this.$message.error('请选择正确的图片文件！')
                }
            },

            // 添加图片上传
            uploadFile(param) {

                let uploadData = new FormData();
                console.log(param);
                uploadData.append('file', param.file);
                if (param.file != null) {
                    request.post("/sys_ext_propties/upload", uploadData).then(r => {
                        if (r.code === 100) {
                            let formData = new FormData();
                            formData.set("name", this.dialogAddForm.name)
                            console.log(this.dialogAddForm.color);
                            if (this.dialogAddForm.color !== '' && this.dialogAddForm.color !== undefined) {
                                formData.set("color", this.dialogAddForm.color)
                            }
                            formData.set("image", r.dataInfo.image)
                            formData.set("proptiesCode", this.proptiesCode)
                            formData.set("company", this.$store.state.currentCompany.companyCode)

                            request.post("/sys_ext_propties/add", formData).then(res => {
                                this.loading = false
                                if (res.code === 100) {
                                    this.loading = false
                                    this.dialogAddForm = []

                                    res.dataInfo.state === 1 ? this.dialog2AddVisible = false : this.dialog2AddVisible = false
                                    this.queryDialogData(this.proptiesCode)
                                    this.dialog2hideCommit()
                                    this.msgAlert("成功", "添加成功！", "success")
                                } else {
                                    this.loading = false
                                    this.msgAlert("失败", res.dataInfo.msg, "warning")
                                }
                            })
                        } else {
                            this.loading = false
                            this.msgAlert("失败", r.dataInfo.msg, "warning")
                        }
                    })
                } else {
                    this.loading = false
                    this.msgAlert("失败", "请选择图片！", "warning")
                }
            },
            // 不添加图片上传
            uploadWithoutFile() {
                // 没有添加图片
                let formData = new FormData();
                formData.set("name", this.dialogAddForm.name)
                if (this.dialogAddForm.color !== '' && this.dialogAddForm.color !== undefined) {
                    formData.set("color", this.dialogAddForm.color)
                }
                formData.set("proptiesCode", this.proptiesCode)
                formData.set("company", this.$store.state.currentCompany.companyCode)

                request.post("/sys_ext_propties/add", formData).then(res => {
                    this.loading = false
                    if (res.code === 100) {
                        this.loading = false
                        this.dialogAddForm = []

                        res.dataInfo.state === 1 ? this.dialog2AddVisible = false : this.dialog2AddVisible = false
                        this.queryDialogData(this.proptiesCode)
                        this.msgAlert("成功", "添加成功！", "success")
                    } else {
                        this.loading = false
                        this.msgAlert("失败", res.dataInfo.msg, "warning")
                    }
                })
            },

            // 修改图片上传
            uploadChangeFile(param) {

                let uploadData = new FormData();
                uploadData.append('file', param.file);
                if (param.file != null) {
                    request.post("/sys_ext_propties/upload", uploadData).then(r => {
                        if (r.code === 100) {
                            let formData = new FormData();
                            formData.set("id", this.changeList.id)
                            formData.set("name", this.changeList.name)
                            if (this.changeList.color !== '' && this.changeList.color !== undefined) {
                                formData.set("color", this.changeList.color)
                            }
                            formData.set("image", r.dataInfo.image)
                            formData.set("proptiesCode", this.proptiesCode)
                            formData.set("company", this.$store.state.currentCompany.companyCode)

                            request.post("/sys_ext_propties/change", formData).then(res => {
                                this.loading = false
                                if (res.code === 100) {
                                    this.loading = false
                                    this.changeList = []
                                    this.imageUrlTemp = ''
                                    this.fileListTemp = []
                                    this.dialog2hideChange()
                                    res.dataInfo.state === 1 ? this.dialog2ChangeVisible = false : this.dialog2ChangeVisible = false
                                    this.queryDialogData(this.proptiesCode)
                                    this.msgAlert("成功", "修改成功！", "success")
                                } else {
                                    this.loading = false
                                    this.msgAlert("失败", res.dataInfo.msg, "warning")
                                }
                            })
                        } else {
                            this.loading = false
                            this.msgAlert("失败", r.dataInfo.msg, "warning")
                        }
                    })
                } else {
                    this.loading = false
                    this.msgAlert("失败", "请选择图片！", "warning")
                }
            },
            // 修改不带图片上传
            uploadChangeWithoutFile() {
                let formData = new FormData();
                formData.set("id", this.changeList.id)
                formData.set("name", this.changeList.name)
                if (this.changeList.color !== '' && this.changeList.color !== undefined) {
                    formData.set("color", this.changeList.color)
                }
                formData.set("proptiesCode", this.proptiesCode)
                formData.set("company", this.$store.state.currentCompany.companyCode)

                request.post("/sys_ext_propties/change", formData).then(res => {
                    this.loading = false
                    if (res.code === 100) {
                        this.loading = false
                        this.changeList = []
                        this.imageUrlTemp = ''
                        this.fileListTemp = []
                        res.dataInfo.state === 1 ? this.dialog2ChangeVisible = false : this.dialog2ChangeVisible = false
                        this.queryDialogData(this.proptiesCode)
                        this.msgAlert("成功", "修改成功！", "success")
                    } else {
                        this.loading = false
                        this.msgAlert("失败", res.dataInfo.msg, "warning")
                    }
                })
            },

            // 上传带图片
            async clickUpload() {
                await this.$refs.upload.submit();
            },

            // 校验文件格式
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/jpg'
                const isLt2M = file.size / 1024 / 1024 < 2

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 jpg/png/jpeg 格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                }
                return isJPG && isLt2M
            },
        },
    }
</script>

<style scoped>
    .el-table-column {
        font-weight: bold;
        background-color: #99a9bf;
    }
</style>