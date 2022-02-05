<template>
  <div style="height: 65px; width: 100%; line-height: 65px; display: flex; background-color: rgba(1,20,31,0.87)">
    <div style="width: 200px; padding-left: 30px; font-size: 24px; font-weight: bold; color: #ffffff">
      后台管理系统
    </div>
    <div style="flex: 1; text-align: center">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">{{ this.$store.state.currentCompany.companyName }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <div style="margin: 5px" v-show="this.$store.state.username === 'jay'">
              <el-input placeholder="输入公司名称" v-model="likeCompany" class="input-with-select">
                <template #append>
                  <el-button @click="queryCompanyLike">查找</el-button>
                </template>
              </el-input>
              <el-dropdown-item v-for="(item,index) in this.$store.state.companyLikeList" @click="clickCompany(index)">
                {{ item===null?'':item.coName }}</el-dropdown-item>
            </div>
            <el-dropdown-item v-for="(item,index) in this.$store.state.companyAndRoleList" @click="clickCompany(index)">
              {{ item.companyName }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div style="width: 100px">
      <el-dropdown>
  <span class="el-dropdown-link">
    {{ this.$store.state.username }}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toPersonal">个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import request from "../utils/request";

export default {
  name: "Header",
  data() {
    return {
      // 搜索到的公司列表
      searchList:[],
      // 搜索框输入的内容
      likeCompany: "",

    }
  },

  created() {
  },

  methods: {

    // 搜索公司
    queryCompanyLike() {
      let formData = new FormData();
      formData.set("chars",this.likeCompany)
        request.post("/sys_company/queryCompanyLike", formData).then(res=>{
          if (res.code === 100){
            // 搜索到的相似公司存入list显示
            this.$store.state.companies = res.dataInfo.dataInfo.list;
          }else {
            console.log(res)
          }
        })

    },

    // 点击搜索到的公司索引
    clickCompany(index){
      // 存入当前公司职位总表
      this.$store.state.currentCompanyRoleList = this.$store.state.companyAndRoleList[index].positionList
      // 当前表companyAndRoleList
      this.$store.state.currentCompany.companyName = this.$store.state.companyAndRoleList[index].companyName
      this.$store.state.currentCompany.companyCode = this.$store.state.companyAndRoleList[index].companyCode
      this.$store.state.currentPosition.positionCode = this.$store.state.companyAndRoleList[index].positionList === [] ? [] : this.$store.state.companyAndRoleList[index].positionList[0].positionCode
      this.$store.state.currentPosition.positionName = this.$store.state.companyAndRoleList[index].positionList === [] ? [] : this.$store.state.companyAndRoleList[index].positionList[0].positionName
    },

    // 退出登录 清除本地信息
    logout(){
      this.$router.replace("/")
    },
    // 跳转 个人中心
    toPersonal(){
       this.$router.push("/personal")
    }
  }
}
</script>
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #ffffff;
}

.el-icon-arrow-down {
  font-size: 18px;
}

</style>