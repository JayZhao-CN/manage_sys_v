<template>
<div>
  <el-col>
    <el-menu
        style="width: 200px; min-height: calc(100vh - 65px)"
        :uniqueOpened="false"
        :default-active="$route.path"
        @open="handleOpen"
        @close="handleClose"
        class="el-menu-vertical-demo"
        background-color="rgba(1,10,16,0.8)"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
    >

      <el-sub-menu index="1">
        <template #title>
          <span>公司总览</span>
        </template>
      <el-menu-item index="/">
        <template #title>
          <span>概况</span>
        </template>
      </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <i class="el-icon-location"></i>
          <span>常规操作</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="select">查询</el-menu-item>
          <el-menu-item index="add">添加</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-sub-menu index="3">
        <template #title>
          <i class="el-icon-location"></i>
          <span>敏感操作</span>
        </template>
        <el-menu-item-group>
          <template #title>一般操作</template>
          <el-menu-item index="update">修改</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="特殊操作">
          <el-menu-item index="delete">删除</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-col>
</div>
</template>

<script>

export default {
  name: "Aside",
  data() {
    return {
      activeIndex: "/"
    };
  },
  watch: {
    $route () {
      this.setCurrentRoute()
    }
  },
  methods: {
    setCurrentRoute () {
      this.activeIndex = this.$route.path //关键   通过他就可以监听到当前路由状态并激活当前菜单
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
  created () {
    this.setCurrentRoute()
  },
}
</script>

<style scoped>
* {
  font-size: 16px;
}
</style>