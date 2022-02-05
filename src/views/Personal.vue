<template>

<personal-header/>
<div style="height: 1px; background-color: rgba(198,196,196,0.78)"></div>
  <div STYLE="background-color: rgba(232,232,232,0.75); height: 100%">
  <el-row>
    <el-col :span="6">
      <div class="grid-content">
        <el-card class="box-card" style="margin: 20px 20px">
          <el-row>
            <el-col>
              <div style="text-align: center">
              <el-avatar :size="80" :src="circleUrl"></el-avatar>
              </div>
            </el-col>

            <el-col>
              <div style="text-align: center">
                <span style="font-size: 28px; font-style: normal; font-weight: bold">{{this.$store.state.username}}</span>
              </div>
            </el-col>
            <el-col>
              <div style="align-content: center; text-align: center; position: center">
                <img src="@/assets/ensure.png" height="16" width="16">
                <span style="font-size: 14px; font-style: normal">公司认证：{{ this.$store.state.companyName }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="text-align: right; float: bottom">
              <el-button type="text" style="font-size: 13px; font-style: normal; color: #0097ff">
              修改资料>>
              </el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card" style="margin: 20px 20px;height: calc(100vh - 381px)">
          <el-row>
            <el-col>
              <div style="text-align: center">
                <el-avatar :size="80" :src="circleUrl"></el-avatar>
              </div>
            </el-col>

            <el-col>
              <div style="text-align: center">
                <span style="font-size: 28px; font-style: normal; font-weight: bold">{{this.$store.state.username}}</span>
              </div>
            </el-col>
            <el-col>
              <div style="align-content: center; text-align: center; position: center">
                <img src="@/assets/ensure.png" height="16" width="16">
                <span style="font-size: 14px; font-style: normal">公司认证：{{ this.$store.state.companyName }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <div style="display: flex">
              <el-col>
              </el-col>
              <el-col>
              </el-col>
            </div>
          </el-row>
        </el-card>
      </div>
    </el-col>
    <el-col :span="18">
      <div class="grid-content">
        <el-card style="margin: 20px 20px; height: calc(100vh - 126px)">
          <router-view/>
        </el-card>
      </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import PersonalHeader from "../components/PersonalHeader";
export default {
  name: "Personal",
  components: {PersonalHeader},
  data(){
    return {
      circleUrl:""
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  height: calc(100vh - 106px);
}
</style>