<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div>
          <el-table :data="dataList" ref="multipleTable" style="font-weight: bold; font-size: 18px"
                    :header-cell-style="{background:'#d0d3d7',color:'#555555'}" stripe>
            <el-table-column property="uUsername" label="员工名" key="uUsername"/>
            <el-table-column property="uCode" label="员工编号" key="uCode"/>
            <el-table-column property="uNickCode" label="自定义编号" key="uNickCode"/>
            <el-table-column property="uPhone" label="联系方式" key="uPhone"/>
            <el-table-column>
              <template #header>
                <span style="float: left">公司</span>
              </template>
              <template #default="scope">
                <span>{{ this.$store.state.currentCompany.companyName }}</span>
              </template>
            </el-table-column>
            <el-table-column property="uPositionDetail" label="职位" key="uPositionDetail"/>
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
                                 @click="this.ensureTitle = '删除' + this.dataList[scope.$index].uUsername + '?' ">删除
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
    <el-dialog v-model="dialogFormVisible" title="添加员工">
      <el-form ref="formRef" :model="form" label-width="120px">
        <el-form-item label="已有账号？">
          <div>
            <el-radio v-model="haveAcc" label="1" size="large">已有账号</el-radio>
            <el-radio v-model="haveAcc" label="2" size="large">注册账号</el-radio>
          </div>
          <el-col :span="16">
            <el-input v-model="form.code" :disabled="haveAcc === '2'" placeholder="输入已有的账号"/>
          </el-col>
          <el-col :span="8">
            <div style="margin-left: 10px; align-content: center; text-align: center">
              <el-button size="small" circle @click="queriedCode">√</el-button>
            </div>
          </el-col>
          <span v-show="queriedName !== ''" style="color: #de5151; margin-left: 20px; font-style: italic">{{
              queriedName
            }}</span>

        </el-form-item>
        <div v-show="haveAcc === '2'">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="岗位">
          <el-select v-model="selectedPosition" multiple placeholder="请选择岗位">
            <el-option
                v-for="item in position"
                :key="item.pCode"
                :label="item.pName"
                :value="item.pCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自定义编号">
          <el-input v-model="form.nickCode"></el-input>
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
    <el-dialog v-model="dialogChangeVisible" title="修改信息">
      <el-form ref="formRef" :model="changeList" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="changeList.uUsername" size="60px"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="changeList.uPhone"></el-input>
        </el-form-item>
        <el-form-item label="岗位">
          <el-select v-model="currentPosition" multiple placeholder="请选择岗位">
            <el-option
                v-for="item in position"
                :key="item.pCode"
                :label="item.pName"
                :value="item.pCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自定义编号">
          <el-input v-model="changeList.uNickCode"></el-input>
        </el-form-item>
        <el-form-item label="重置密码？">
          <el-switch v-model="resetPw" inline-prompt active-text="是" inactive-text="否">
          </el-switch>
        </el-form-item>

      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogChangeVisible = false">取消</el-button>
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
  name: "User",
  data() {
    return {
      opTableData: [],

      // 表内数据
      dataList: [],

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
      pageSize: 6,

      // 是否显示新增弹窗
      dialogFormVisible: false,

      // 是否显示修改弹窗
      dialogChangeVisible: false,

      // 新员工选择？
      haveAcc: '1',
      // 通过账号添加员工查到的员工
      queriedName: "",

      // 新增数据保存
      form: [],
      // 即使存在也添加？
      addHad: false,

      // 查询到的存在的岗位
      position: [],
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
      request.get("/sys_user/detail" + "?" + "pageNum=" + this.pageNum + "&&" + "pageSize=" + this.pageSize + "&&" + "uCompany=" + this.$store.state.currentCompany.companyCode).then(res => {
        console.log(res);
        this.dataList = res.dataInfo.dataInfo.list !== null ? res.dataInfo.dataInfo.list : []
        this.currentPage = res.dataInfo.dataInfo.pageNum
        this.pageNum = res.dataInfo.dataInfo.pageNum
        this.total = res.dataInfo.dataInfo.total
      })
    },

    // 查询岗位信息
    queryPosition() {
      request.get("/sys_position/detail" + "?" + "pageNum=" + this.pageNum + "&&" + "pageSize=" + this.pageSize + "&&" + "company=" + this.$store.state.currentCompany.companyCode).then(res => {
        this.position = res.dataInfo.dataInfo.list !== null ? res.dataInfo.dataInfo.list : []
      })
    },

    hideCommit(){
      this.dialogFormVisible = false
          this.addHad = false
    },

    // 提交添加信息
    commitAdd() {
      if (this.form.name === "") {
        this.msgAlert("失败", "请填写姓名！", "error")
        return
      }
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(this.form.phone)) {
        this.msgAlert("失败", "手机号填写错误！", "error")
        return
      }
      if (this.selectedPosition === "") {
        this.msgAlert("失败", "请选择岗位！", "error")
        return
      }

      // 已有账号
      if (this.haveAcc === '1') {

      }
      // 没有账号
      else if (this.haveAcc === '2') {
        this.loading = true
        let formData = new FormData();
        formData.set("new", "true")
        formData.set("uUsername", this.form.name)
        formData.set("uPhone", this.form.phone)
        formData.set("uPositions", this.selectedPosition)
        formData.set("uNickCode", this.form.nickCode)
        formData.set("uCompany", this.$store.state.currentCompany.companyCode)
        // 根据参数决定是否添加已存在的账号
        formData.set("addHad", this.addHad)

        request.post("/sys_user/add", formData).then(res => {
          this.loading = false
          if (res.code === 100) {
            console.log(res);
            if (res.dataInfo.state === "111") {
              this.queriedName = res.dataInfo.user.username + " 已存在，确定添加？再次点击 提交 即可添加！"
              this.addHad = true
            } else {
              this.loading = false
              this.form = []
              res.dataInfo.state === 1 ? this.dialogFormVisible = false : this.dialogFormVisible = false
              this.queryData()
              this.msgAlert("成功", "添加成功！", "success")
            }

          } else {
            this.loading = false
            this.msgAlert("失败", res.dataInfo.msg, "warning")
          }

        })
      }
    },

    // 添加已存在的用户
    clickAddHad() {

    },

    // 提交修改信息
    commitChange() {
      this.loading = true
      let formData = new FormData();
      formData.set("uId", this.changeList.uId)
      formData.set("uUsername", this.changeList.uUsername)
      formData.set("uPhone", this.changeList.uPhone)
      formData.set("uPosition", this.selectedPosition)
      formData.set("uNickCode", this.changeList.uNickCode)
      formData.set("resetPw", this.resetPw)
      formData.set("uCompany", this.$store.state.company)
      request.post("/sys_user/change", formData).then(res => {
        this.loading = false
        this.dialogChangeVisible = false
        this.changeList = []
      })
    },

    // 修改按钮
    clickChange(index) {
      this.queryPosition()
      this.changeList = this.dataList[index]
      this.currentPosition = this.changeList.uPositionDetail
      this.dialogChangeVisible = true
    },
    // 删除按钮
    clickDelete(item) {
      request.get("/sys_user/delete" + "?" + "uId=" + this.dataList[item].uId + "&&" + "uCompany=" + this.$store.state.currentCompany.companyCode).then(res => {
        this.queryData()
      })
    },
    // 添加按钮
    clickAdd() {
      this.dialogFormVisible = true
      this.queryPosition();
    },

    // 消息提示
    msgAlert(title, msg, type) {
      ElNotification({
        title: title,
        message: msg,
        type: type,
      })
    },

    // 添加 员工查询编号
    queriedCode() {
      if (this.form.code.length >= 6) {
        request.get("/sys_user/query/" + this.form.code).then(res => {
          this.queriedName = res.dataInfo.username
        })
      }
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