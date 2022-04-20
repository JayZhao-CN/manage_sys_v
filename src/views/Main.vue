<template>
  <!--    头部-->
  <Header/>
  <!--      侧边栏-->
  <Aside/>
  <!--    主体-->
  <div style="margin-left: 0; margin-bottom: 0">
    <!--      内容-->
    <el-scrollbar height = "calc(100vh - 65px)">
    <router-view/>
    </el-scrollbar>
  </div>
</template>

<script>
import Header from "../components/Header";
import Aside from "../components/Aside";

export default {
  name: "Main",
  components: {
    Header,
    Aside
  },
  mounted() {
    document.title=this.$store.state.currentCompany.companyName
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  }


}
</script>

<style>

</style>