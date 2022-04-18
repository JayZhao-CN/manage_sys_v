<template>
  <div>
    <el-row style="background-color: #475669">
      <el-col :span="8">
        <div style="margin-top: 10px; margin-bottom: 10px; margin-left: 2px">
      <el-input
          placeholder="请输入关键字（通过逗号分离筛选条件）"
          v-model="keywordInput">
      </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div style="margin-top: 10px">
        <el-button>
          <el-icon style="vertical-align: middle;">
            <search />
          </el-icon>
          筛选</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="24">
        <div>
          <el-table :data="dataList" ref="multipleTable" style="font-weight: bold; font-size: 18px"
                    :header-cell-style="{background:'#d0d3d7',color:'#555555'}" stripe>
            <el-table-column property="typeName" label="类型名" key="typeName"/>
            <el-table-column property="typePropties" label="已配置属性" key="typePropties"/>
            <el-table-column align="right" key="option">
              <template #header>
                <span style="float: left">操作</span>
              </template>
              <template #default="scope">
                <el-col style="margin: 5px">
                  <el-button type="warning" @click="clickChange(scope.$index,scope.row)">修改</el-button>
                </el-col>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-dialog v-model="dialogChangeVisible" title="属性配置" :before-close="hideChange">
      <el-form ref="formRef" :model="changeList" label-width="120px">
        <el-form-item label="属性选择">
          <el-select v-model="selectedPropties" multiple placeholder="请选择属性">
            <el-option
                v-for="item in propties"
                :key="item.pCode"
                :label="item.pName"
                :value="item.pCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="hideChange">取消</el-button>
        <el-button type="primary" @click="commitChange" v-loading="loading"
        >修改</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>

import request from "../utils/request";
import {ElNotification} from "element-plus";
import {Search} from "@element-plus/icons";

export default {

  name: "Type",
  components:{
    Search
  },
  data() {
    return {
      // 表内数据
      dataList: [],

      // 查询到的属性
      propties: [],

      select: '',
      keywordInput: '',

      // 修改信息的临时列表
      changeList: [],

      // 删除确认提示文字
      ensureTitle: "",

      // 页数显示信息
      currentPage: 1,
      total: 0,
      pageNum: 1,
      pageSize: 6,

      // 是否显示新增弹窗
      dialogFormVisible: false,

      // 是否显示修改弹窗
      dialogChangeVisible: false,

      // 属性配置 选择的属性
      selectedPropties: [],

      // 新增数据保存
      form: [],
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
      request.get("/sys_type/detail" + "?" + "pageNum=" + this.pageNum + "&&" + "pageSize=" + this.pageSize + "&&" + "tCompany=" + this.$store.state.currentCompany.companyCode).then(res => {
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

    // 隐藏提交弹窗
    hideCommit() {
      this.loading = false
      this.dialogFormVisible = false
      this.addHad = false
    },

    // 提交添加信息
    async commitAdd() {
      if (this.form.name === "" || this.form.name === undefined) {
        this.msgAlert("失败", "请填写类型名称！", "error")
        return
      }

      this.loading = true
      let formData = new FormData();
      formData.set("tName", this.form.name)
      formData.set("tCompany", this.$store.state.currentCompany.companyCode)

      await request.post("/sys_type/add", formData).then(res => {
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

    // 修改按钮
    async clickChange(index) {
      this.changeList = Object.assign({}, this.dataList[index])
      this.dialogChangeVisible = true
    },

    // 隐藏修改框
    hideChange() {
      this.loading = false
      this.dialogChangeVisible = false
    },

    // 提交修改信息
    async commitChange() {
      if (this.changeList.tName === "") {
        this.msgAlert("失败", "尺寸名称不能为空！", "error")
        return
      }

      this.loading = true
      let formData = new FormData();
      formData.set("tId", this.changeList.tId)
      formData.set("tName", this.changeList.tName)
      formData.set("tCompany", this.$store.state.currentCompany.companyCode)

      await request.post("/sys_type/change", formData).then(res => {
        this.loading = false
        if (res.code === 100) {
          this.loading = false
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
    },


    // 删除按钮
    clickDelete(item) {
      request.get("/sys_type/delete" + "?" + "tId=" + this.dataList[item].tId + "&&" + "tCompany=" + this.$store.state.currentCompany.companyCode).then(res => {
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
  },
}
</script>

<style scoped>
.el-table-column {
  font-weight: bold;
  background-color: #99a9bf;
}

.el-row{
  margin-bottom: 0;
  display: flex;
  flex-wrap: wrap
}
</style>