<template>
<div>
  <el-col>
    <el-scrollbar height = "calc(100vh - 65px)">
    <el-menu
        style="width: 200px; min-height: calc(100vh - 65px)"
        :uniqueOpened="false"
        :default-active="defaultActive"
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
      <el-menu-item index="Main">
        <template #title>
          <span>概况</span>
        </template>
      </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <i class="el-icon-location"></i>
          <span>原料管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="select">布匹</el-menu-item>
          <el-menu-item index="add">针线</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-sub-menu index="3">
        <template #title>
          <i class="el-icon-location"></i>
          <span>产品管理</span>
        </template>
        <el-menu-item-group>
          <template #title>生产</template>
          <el-menu-item index="update">工序</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="成品">
          <el-menu-item index="delete">订单</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-sub-menu index="4">
        <template #title>
          <i class="el-icon-location"></i>
          <span>产品信息维护</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="color">颜色</el-menu-item>
          <el-menu-item index="style">样式</el-menu-item>
          <el-menu-item index="size">尺寸</el-menu-item>
          <el-menu-item index="type">种类</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-sub-menu index="5">
        <template #title>
          <i class="el-icon-location"></i>
          <span>人员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="user">员工</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
    </el-scrollbar>
  </el-col>
</div>
</template>

<script>

export default {
  name: "Aside",
  computed: {
    defaultActive: function(){
      return this.$route.path.replace('/', '');
    }
  },
}
</script>

<style scoped>
* {
  font-size: 16px;
}
</style>