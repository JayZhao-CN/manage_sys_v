<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="24">
        <div>
          <el-table :data="dataList" ref="multipleTable" style="font-weight: bold; font-size: 18px"
                    :header-cell-style="{background:'#d0d3d7',color:'#555555'}" stripe>
            <el-table-column property="typeName" label="类型名" key="typeName"/>
            <el-table-column property="processNames" label="已配置工序" key="processNames"/>
            <el-table-column align="right" key="option">
              <template #header>
                <span style="float: left">操作</span>
              </template>
              <template #default="scope">
                <el-col style="margin: 5px">
                  <el-button type="warning" @click="clickChange(scope.$index,scope.row)">变更</el-button>
                </el-col>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-dialog v-model="dialogChangeVisible" title="属性配置" :before-close="hideChange">
    <el-form ref="formRef" :model="changeList" label-width="120px">
      <el-form-item label="类型名称">
        <el-text size="60px">{{changeList.typeName}}</el-text>
      </el-form-item>
      <el-form-item label="工序">
        <el-select v-model="currentProcess" multiple placeholder="请选择工序">
          <el-option
                  v-for="item in processes"
                  :key="item.prcCode"
                  :label="item.prcName"
                  :value="item.prcCode"
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
        processes: [],

        // 修改信息的临时列表
        changeList: [],
        // 当前显示的配置
        currentProcess: [],
        // 还未修改的配置
        unchangedCurrentProcess: [],

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
        request.get("/sys_product_process/detail" + "?" + "pageNum=" + this.pageNum + "&&" + "pageSize=" + this.pageSize + "&&" + "company=" + this.$store.state.currentCompany.companyCode).then(res => {
          console.log(res);
          this.dataList = res.dataInfo.dataInfo.list !== null ? res.dataInfo.dataInfo.list : []
          // console.log(this.dataList);
          this.currentPage = res.dataInfo.dataInfo.pageNum
          this.pageNum = res.dataInfo.dataInfo.pageNum
          this.total = res.dataInfo.dataInfo.total
        })
      },

      // 查询工序信息
      async queryProcess() {
        await request.get("/sys_process/detail" + "?" + "prcCompany=" + this.$store.state.currentCompany.companyCode).then(res => {
          this.processes = res.dataInfo.dataInfo.list !== null ? res.dataInfo.dataInfo.list : []
        })
      },

      // 隐藏提交弹窗
      hideCommit() {
        this.loading = false
        this.dialogFormVisible = false
        this.addHad = false
      },

      // 修改按钮
      async clickChange(index) {
        this.changeList = Object.assign({}, this.dataList[index])
        await this.queryProcess()
        let rowProcess = this.changeList.processCodes;
        if (rowProcess !== null) {
        let rowProcesses = rowProcess.toString().split("/");
        let that = this
        rowProcesses.forEach(function (value) {
          if (value !== '') {
            that.processes.forEach(function (process) {
              if (process.prcCode === value) {
                that.currentProcess.push(process.prcCode)
                that.unchangedCurrentProcess.push(process.prcCode)
              }
            })
          }
        })
          // this.unchangedCurrentProcess = Object.assign({}, this.currentProcess)
      }
        this.dialogChangeVisible = true
      },

      // 隐藏修改框
      hideChange(){
        this.loading = false
        this.currentProcess = []
        this.dialogChangeVisible = false
      },

      // 提交修改信息
      async commitChange() {

        if (this.unchangedCurrentProcess.toString() === this.currentProcess.toString()) {
          this.msgAlert("提示", "配置未改变", "warning")
          this.hideChange();
          return
        }

        this.loading = true
        let formData = new FormData();
        formData.set("productTypeCode", this.changeList.typeCode)
        formData.set("processCodes", this.currentProcess)
        formData.set("company", this.$store.state.currentCompany.companyCode)

        await request.post("/sys_product_process/change", formData).then(res => {
          this.loading = false
          if (res.code === 100) {
            this.loading = false
            this.changeList = []
            res.dataInfo.state === 1 ? this.dialogFormVisible = false : this.dialogFormVisible = false
            this.queryData()
            this.dialogChangeVisible = false
            this.currentProcess = []
            this.msgAlert("成功", "配置成功！", "success")
          } else {
            this.loading = false
            this.msgAlert("失败", res.dataInfo.msg, "warning")
          }

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