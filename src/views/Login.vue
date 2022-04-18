<template>
  <div class="father" v-loading="loading" style="height: 100%; width: 100%">
    <div class="form" style="place-content: center">
      <el-form class="login-container" label-position="left" label-width="0px">
        <h3 class="login_title">系统登录</h3>
        <el-form-item>
          <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号" style="font-size: 16px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-on:keyup.enter = "login2sys" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="login2sys">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="div-ba">
        <a href="https://beian.miit.gov.cn/" target="_blank" style="text-decoration:none;color: #F3ECECFF;font-size: 14px">皖ICP备2021018240-1</a>
      <div style="height: 8px"/>
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34010402703598" style="text-decoration:none;color: #F3ECECFF;font-size: 14px;align-content: center">
          <div style="display: inline-block">
            <img src="@/assets/备案图标.png" style="float: left"/>
            <p style="display: inline"> 皖公网安备34010402703598号</p>
          </div>
        </a>
    </div>
  </div>
</template>

<script>
/*
      <form  method="post">
        <div class="item">
          <i class="fa fa-github-alt" style="font-size:24px"></i>
          <input type="text" v-model="loginForm.username" name="username" placeholder="用户名">
        </div>
        <div class="item">
          <i class="fa fa-search" style="font-size:24px"></i>
          <input type="password" v-on:keyup.enter = "login2sys" v-model="loginForm.password" name="password" placeholder="密码">
        </div>
        <div class="item" v-show="this.$store.state.loginMsg !== ''">
          <span style="color: brown">{{ this.$store.state.loginMsg }}</span>
        </div>
        <button type="button" @click="login2sys">登录</button>
      </form>
 */

import request from "../utils/request";

export default {
  name: "Login",
  data(){
    return {
      loginForm: {
        username: '',
        password: ''
      },

      showLogin: false,
      showMsg:false,
      loginMsg:"",
      loading:false,
    }
  },
  created() {
  },
  methods: {
    async login2sys(){
      this.loading = true
      let formdata = new FormData();
      formdata.set("username",this.loginForm.username)
      formdata.set("password",this.loginForm.password)
      await request.post("/login",formdata).then(res=>{
        if (res.code === 100){
          this.$store.state.userCode = this.loginForm.username
          this.$store.state.username = res.dataInfo.username
          this.$store.state.token = res.dataInfo.token
          // [{},{}] 存入总表
          this.$store.state.companyAndRoleList = res.dataInfo.companyAndRoleList
          // 存入当前公司职位总表
          this.$store.state.currentCompanyRoleList = res.dataInfo.companyAndRoleList[0].positionList
          // 当前表
          this.$store.state.currentCompany.companyName = res.dataInfo.companyAndRoleList[0].companyName
          this.$store.state.currentCompany.companyCode = res.dataInfo.companyAndRoleList[0].companyCode
          this.$store.state.currentPosition.positionCode = res.dataInfo.companyAndRoleList[0].positionList[0].positionCode
          this.$store.state.currentPosition.positionName = res.dataInfo.companyAndRoleList[0].positionList[0].positionName
          this.$router.replace('Main')
        }else {
          this.$store.state.userCode = ""
          this.$store.state.username = ""
          this.$store.state.token = ""
          // [{},{}] 存入总表
          this.$store.state.companyAndRoleList = ""
          // 存入当前公司职位总表
          this.$store.state.currentCompanyRoleList = ""
          // 当前表
          this.$store.state.currentCompany.companyName = ""
          this.$store.state.currentCompany.companyCode = ""
          this.$store.state.currentPosition.positionCode = ""
          this.$store.state.currentPosition.positionName = ""
          this.$store.state.loginMsg = res.dataInfo.auth
        }
      })
    },

    // 初始化查找公司
    async queryCompany(CompanyCodes) {
      await request.post("/sys_company/code/",codes).then(res=>{
        this.loading = false
        if (res.code === 100){
          console.log(res);
          this.showMsg = false
          this.$store.state.companies = res.dataInfo.companyNames
          this.$store.state.company.companyName = this.$store.state.companies[0].coName
          this.$store.state.company.companyCode = this.$store.state.companies[0].coCode
          // this.$router.push('Main')
          this.queryPosition(positions)
        }else {
          console.log(res)
        }
      })
    },

    // 初始化查找职位
    async queryPosition(codes) {
      await request.post("/sys_position/code/",codes).then(res=>{
        this.loading = false
        if (res.code === 100){
          this.showMsg = false
          this.$store.state.roles = res.dataInfo.positionNames
          // this.$router.push('Main')
          // for (let i = 0; i < this.$store.state.roles.length; i++){
          //   this.$store.state.roles[i].pCompany === this.$store.state.company.companyCode
          // }
          // this.$store.state.company.companyName = this.$store.state.companies[0].coName
          // this.$store.state.company.companyCode = this.$store.state.companies[0].coCode
          console.log(res);
        }else {
          console.log(res)
        }
      })
    },
  },
}
</script>

<style scoped>
/*#poster {*/
/*  background-color: #475669;*/
/*  background-position: center;*/
/*  height: 100%;*/
/*  width: 100%;*/
/*  background-size: cover;*/
/*  position: fixed;*/
/*}*/

.father{
  position : absolute;
  width : 100%;
  height : 100%;
  background-color: rgba(1,10,16,0.8);
}

.div-ba{
  position: fixed;
  width: 100%;
  bottom: 10px;
  place-content: center;
  text-align: center;
  }

.login-container {
  position: center;
  text-align: center;

  border-radius: 15px;
  background-clip: padding-box;
  margin: 200px auto;

  width: 400px;
  padding: 35px 35px 15px 35px;
  background: #babdc4;
  border: 1px solid #a8aab1;
  box-shadow: 0 0 25px #acb3c2;
}

.login_title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>