<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="24">
        <div>
          <el-table :data="dataList" ref="multipleTable" style="font-weight: bold; font-size: 18px"
                    :header-cell-style="{background:'#d0d3d7',color:'#555555'}" stripe>
            <el-table-column property="typeName" label="类型名" key="typeName"/>
            <el-table-column property="proptiesNames" label="已配置属性" key="proptiesNames"/>
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
          <el-select v-model="currentPropties" multiple placeholder="请选择工序">
            <el-option
                    v-for="item in proptieses"
                    :key="item.proptiesCode"
                    :label="item.proptiesName"
                    :value="item.proptiesCode"
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
        proptieses: [],

        // 修改信息的临时列表
        changeList: [],
        // 当前显示的配置
        currentPropties: [],
        // 还未修改的配置
        unchangedcurrentPropties: [],

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
        request.get("/sys_product_propties/detail" + "?" + "pageNum=" + this.pageNum + "&&" + "pageSize=" + this.pageSize + "&&" + "company=" + this.$store.state.currentCompany.companyCode).then(res => {
          console.log(res);
          this.dataList = res.dataInfo.dataInfo.list !== null ? res.dataInfo.dataInfo.list : []
          // console.log(this.dataList);
          this.currentPage = res.dataInfo.dataInfo.pageNum
          this.pageNum = res.dataInfo.dataInfo.pageNum
          this.total = res.dataInfo.dataInfo.total
        })
      },

      // 查询属性信息
      async queryPropties() {
        await request.get("/sys_propties/detail" + "?" + "isAll=true" + "&&company=" + this.$store.state.currentCompany.companyCode).then(res => {
          this.proptieses = res.dataInfo.dataInfo.list !== null ? res.dataInfo.dataInfo.list : []
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
        await this.queryPropties()
        let rowPropties = this.changeList.proptiesCodes;
        if (rowPropties !== null) {
          let rowProptieses = rowPropties.toString().split("/");
          let that = this
          rowProptieses.forEach(function (value) {
            if (value !== '') {
              that.proptieses.forEach(function (propties) {
                if (propties.proptiesCode === value) {
                  that.currentPropties.push(propties.proptiesCode)

                  that.unchangedcurrentPropties.push(propties.proptiesCode)
                }
              })
            }
          })
          // this.unchangedcurrentPropties = Object.assign({}, this.currentPropties)
        }
        this.dialogChangeVisible = true
      },

      // 隐藏修改框
      hideChange(){
        this.loading = false
        this.currentPropties = []
        this.dialogChangeVisible = false
      },

      // 提交修改信息
      async commitChange() {

        if (this.unchangedcurrentPropties.toString() === this.currentPropties.toString()) {
          this.msgAlert("提示", "配置未改变", "warning")
          this.hideChange();
          return
        }

        this.loading = true
        let formData = new FormData();
        formData.set("productTypeCode", this.changeList.typeCode)
        formData.set("proptiesCodes", this.currentPropties)
        formData.set("company", this.$store.state.currentCompany.companyCode)

        await request.post("/sys_product_propties/change", formData).then(res => {
          this.loading = false
          if (res.code === 100) {
            this.loading = false
            this.changeList = []
            res.dataInfo.state === 1 ? this.dialogFormVisible = false : this.dialogFormVisible = false
            this.queryData()
            this.dialogChangeVisible = false
            this.currentPropties = []
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