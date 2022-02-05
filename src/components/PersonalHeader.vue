<template>
  <div style="height: 65px; width: 100%; line-height: 65px; display: flex; background-color: rgba(1,20,31,0.87)">
    <div style="width: 200px; padding-left: 30px; font-size: 24px; font-weight: bold; color: #ffffff">
      个人中心
    </div>
    <div style="flex: 1; text-align: center">
        <span class="el-dropdown-link" @click="goBack">{{ this.$store.state.companyName }}</span>
    </div>
    <div style="width: 100px">
      <el-dropdown>
  <span class="el-dropdown-link">
    {{ this.$store.state.username }}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
        <template #dropdown>
          <el-dropdown-menu>
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
  name: "PersonalHeader",
  data() {
    return {
      companyName: "",
    }
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    logout(){
      this.$store.state.username = ""
      this.$store.state.token = ""
      this.$store.state.roles = ""
      this.$store.state.company = ""
      this.$router.replace("/")
    }
  },

  created() {
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

#div-company {
  visibility: hidden;
}
</style>