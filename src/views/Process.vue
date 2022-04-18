<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div>
          <el-table :data="dataList" ref="multipleTable" style="font-weight: bold; font-size: 18px"
                    :header-cell-style="{background:'#d0d3d7',color:'#555555'}" stripe>
            <el-table-column property="prcId" label="ID" key="prcId"/>
            <el-table-column property="prcName" label="产品编号" key="prcName"/>
            <el-table-column property="prcCode" label="工序编号" key="prcCode"/>
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
                                 @click="this.ensureTitle = '删除' + this.dataList[scope.$index].prcName + '?' ">删除
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
    <el-dialog v-model="dialogFormVisible" title="新增工序" :before-close="hideCommit">
      <el-form ref="formRef" :model="form" label-width="120px">
        <el-form-item label="工序名称">
          <el-input v-model="form.name"></el-input>
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
    <el-dialog v-model="dialogChangeVisible" title="修改类型" :before-close="hideChange">
      <el-form ref="formRef" :model="changeList" label-width="120px">
        <el-form-item label="类型名称">
          <el-input v-model="changeList.prcName"></el-input>
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

export default {
  name: "Type",
  data() {
    return {
      // 表内数据
      dataList: [],

      // 修改员工信息的临时列表
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
      request.get("/sys_process/detail" + "?" + "pageNum=" + this.pageNum + "&&" + "pageSize=" + this.pageSize + "&&" + "prcCompany=" + this.$store.state.currentCompany.companyCode).then(res => {
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
        this.msgAlert("失败", "请填写工序名称！", "error")
        return
      }

      this.loading = true
      let formData = new FormData();
      formData.set("prcName", this.form.name)
      formData.set("prcCompany", this.$store.state.currentCompany.companyCode)

      await request.post("/sys_process/add", formData).then(res => {
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
      if (this.changeList.prcName === "") {
        this.msgAlert("失败", "尺寸名称不能为空！", "error")
        return
      }

      this.loading = true
      let formData = new FormData();
      formData.set("prcId", this.changeList.prcId)
      formData.set("prcName", this.changeList.prcName)
      formData.set("prcCompany", this.$store.state.currentCompany.companyCode)

      await request.post("/sys_process/change", formData).then(res => {
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
      request.get("/sys_process/delete" + "?" + "prcId=" + this.dataList[item].prcId + "&&" + "prcCompany=" + this.$store.state.currentCompany.companyCode).then(res => {
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
</style>