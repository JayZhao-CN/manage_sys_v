<template>
  <div style="height: 65px; line-height: 65px; display: flex; background-color: rgba(1,20,31,0.87)">
    <div style="width: 200px; padding-left: 30px; font-size: 24px; font-weight: bold; color: #ffffff">
      后台管理系统
    </div>
    <div style="flex: 1; text-align: center">
      <el-dropdown>
        <span class="el-dropdown-link">利辛雅舒美睡衣</span>
        <template #dropdown>
          <el-dropdown-menu>
            <div style="margin: 5px">
              <el-input placeholder="输入公司名称" v-model="input3" class="input-with-select">
                <template #append>
                  <el-button>查找</el-button>
                </template>
              </el-input>
            </div>
            <el-dropdown-item>鸿翔纱门</el-dropdown-item>
            <el-dropdown-item>红红杉树睡衣</el-dropdown-item>
            <el-dropdown-item>鸿翔纱门</el-dropdown-item>
            <el-dropdown-item>红红杉树睡衣</el-dropdown-item>
            <el-dropdown-item>鸿翔纱门</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div style="width: 100px">
      <el-dropdown>
  <span class="el-dropdown-link">
    管理员<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
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

#div-company{
  visibility: hidden;
}
</style>