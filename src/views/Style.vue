<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div>
          <el-table :data="dataList" ref="multipleTable" style="font-weight: bold; font-size: 18px"
                    :header-cell-style="{background:'#d0d3d7',color:'#555555'}" stripe>
            <el-table-column property="stId" label="ID" key="stId"/>
            <el-table-column property="stName" label="样式名" key="stName"/>
            <el-table-column property="stCode" label="样式编号" key="stCode"/>
            <el-table-column>
              <template #header>
                <span style="float: left">样式图片展示</span>
              </template>
              <template #default="scope">
                <el-image
                    style="width: 100px; height: 100px"
                    :preview-src-list="imgList"
                    :initial-index="scope.$index"
                    :src="dataList[scope.$index].stImg"
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
                  <el-button type="warning" @click="clickChange(scope.$index,scope.row)">修改</el-button>
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
                                 @click="this.ensureTitle = '删除' + this.dataList[scope.$index].stName + '?' ">删除
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
    <el-dialog v-model="dialogFormVisible" title="新增样式" :before-close="hideCommit">
      <el-form ref="formRef" :model="form" label-width="120px">

        <el-form-item label="样式名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="选择样式图片">
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
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-button type="primary" v-else>选择本地图片</el-button>
          </el-upload>
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
    <el-dialog v-model="dialogChangeVisible" title="修改样式" :before-close="hideChange">
      <el-form ref="formRef" :model="changeList" label-width="120px">

        <el-form-item label="样式名称">
          <el-input v-model="changeList.stName"></el-input>
        </el-form-item>
        <el-form-item label="选择样式图片">
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
            <img v-if="imageUrlTemp" :src="imageUrlTemp" class="avatar" />
            <el-button type="primary" v-else>选择本地图片</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="hideChange">取消</el-button>
        <el-button type="primary" @click="commitChange" v-loading="loading"
        >修改</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import request from "../utils/request";
import {ElNotification} from "element-plus";

export default {
  name: "User",
  data() {
    return {
      opTableData: [],

      // 表内数据
      dataList: [],

      // 图片列表
      imgList: [],

      // 修改员工信息的临时列表
      changeList: [],
      // 修改员工 选择的岗位
      currentPosition: [],
      // 重置密码
      resetPw: false,

      // 删除确认提示文字
      ensureTitle: "",

      // 页数显示信息
      currentPage: 1,
      total: 0,
      pageNum: 1,
      pageSize: 4,

      // 是否显示新增弹窗
      dialogFormVisible: false,

      // 是否显示修改弹窗
      dialogChangeVisible: false,


      // 新增数据保存
      form: [],
      // 修改数据临时保存
      temp: [],

      // 图片数据
      uploadUrl: "localhost:80/sys_style/upload",
      imageUrl: '',
      // 临时缓存
      imageUrlTemp: '',

      fileList: [],
      // 缓存
      fileListTemp: [],

      // 新增员工 选择的岗位
      selectedPosition: [],
      // 显示加载按钮
      loading: false
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
      request.get("/sys_style/detail" + "?" + "pageNum=" + this.pageNum + "&&" + "pageSize=" + this.pageSize + "&&" + "stCompany=" + this.$store.state.currentCompany.companyCode).then(res => {
        console.log(res);
        this.dataList = res.dataInfo.dataInfo.list !== null ? res.dataInfo.dataInfo.list : []

        for (let i = 0; i < this.dataList.length; i++) {
          this.imgList[i] = (this.dataList[i].stImg)
        }
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


    // 隐藏提交弹窗
    hideCommit() {
      this.dialogFormVisible = false
      this.addHad = false
    },

    // 提交添加信息
    async commitAdd() {
      if (this.form.name === "" || this.form.name === undefined) {
        this.msgAlert("失败", "请填写样式名称！", "error")
        return
      }
      this.loading = true
      // 链式上传 上传图片触发方法 --》 具体上传方法 -- 》 上传添加信息
      await this.clickUpload()
    },

    // 修改按钮
    async clickChange(index) {

      this.changeList = Object.assign({}, this.dataList[index])
      this.imageUrlTemp = this.changeList.stImg
      this.dialogChangeVisible = true
    },

    // 隐藏修改框
    hideChange() {
      this.dialogChangeVisible = false
    },

    // 提交修改信息
    async commitChange() {
      if (this.changeList.stName === "") {
        this.msgAlert("失败", "样式名称不能为空！", "error")
        return
      }
      this.loading = true
      let formData = new FormData();
      if (this.changeList.stImg === this.imageUrlTemp){
        formData.set("stId", this.changeList.stId)
        formData.set("stName", this.changeList.stName)
        formData.set("stImg", this.changeList.stImg)
        formData.set("stCompany", this.$store.state.currentCompany.companyCode)

        await request.post("/sys_style/change", formData).then(res => {
          this.loading = false
          if (res.code === 100) {
            this.changeList = []
            res.dataInfo.state === 1 ? this.dialogFormVisible = false : this.dialogFormVisible = false
            this.queryData()
            this.dialogChangeVisible = false
            this.msgAlert("成功", "修改成功！", "success")
          } else {
            this.loading = false
            this.msgAlert("失败", res.dataInfo.msg, "warning")
          }

        })
      }else {
        // 上传图片
        await this.clickUpload()
      }

    },


    // 删除按钮
    clickDelete(item) {
      console.log(this.dataList[item].stId);

      request.get("/sys_style/delete" + "?" + "stId=" + this.dataList[item].stId + "&&" + "stCompany=" + this.$store.state.currentCompany.companyCode).then(res => {
        this.queryData()
      })
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


    // 添加图片成功
    handleAvatarSuccess(file,fileList) {
      console.log("file");
      if (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png' || file.raw.type ===  'image/jpg') {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.fileList = [fileList[fileList.length - 1]]
        console.log(this.fileList);
      }else {
        this.$message.error('请选择正确的图片文件！')
      }
    },

    // 修改图片成功
    handleAvatarChangeSuccess(file,fileListTemp) {
      console.log("tempfile");
      console.log(file.raw);
      if (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png' || file.raw.type ===  'image/jpg') {
        this.imageUrlTemp = URL.createObjectURL(file.raw)
        this.fileListTemp = [fileListTemp[fileListTemp.length - 1]]
        console.log(this.fileListTemp);
      }else {
        this.$message.error('请选择正确的图片文件！')
      }
    },

    // 添加图片上传
    uploadFile(param) {
      let uploadData = new FormData();
      console.log(param);
      uploadData.append('file', param.file);
      if (param.file != null){
        request.post("/sys_style/upload",uploadData).then(r=>{
          if (r.code === 100) {
            let formData = new FormData();
            formData.set("stName", this.form.name)
            formData.set("stImg",r.dataInfo.stImg)
            formData.set("stCompany", this.$store.state.currentCompany.companyCode)

            request.post("/sys_style/add", formData).then(res => {
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
          } else {
            this.loading = false
            this.msgAlert("失败", r.dataInfo.msg, "warning")
          }
        })
      }
    },

    // 修改图片上传
    uploadChangeFile(param) {
      let uploadData = new FormData();

      uploadData.append('file', param.file);
      if (param.file != null){
        request.post("/sys_style/upload",uploadData).then(r=>{
          if (r.code === 100) {
            let formData = new FormData();

            formData.set("stId", this.changeList.stId)
            formData.set("stName", this.changeList.stName)
            formData.set("stCompany", this.$store.state.currentCompany.companyCode)
            formData.set("stImg",r.dataInfo.stImg)

            request.post("/sys_style/change", formData).then(res => {
              this.loading = false
              if (res.code === 100) {
                this.loading = false
                this.changeList = []
                res.dataInfo.state === 1 ? this.dialogChangeVisible = false : this.dialogChangeVisible = false
                this.queryData()
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
      }
    },

    // 上传带图片
    async clickUpload(){
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>