<template>
  <!--    头部-->
  <Header/>
  <!--      侧边栏-->
  <Aside/>
  <!--    主体-->
  <div style="margin-left: 0">
    <!--      内容-->
    <router-view/>
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
  created() {
  }
}
</script>

<style>

</style>