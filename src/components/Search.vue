<template>
  <el-row style="background-color: #475669">
    <el-col :span="8">
      <div style="margin-top: 10px; margin-bottom: 10px; margin-left: 2px">
        <el-input
                placeholder="请输入关键字（通过逗号分离筛选条件）"
                v-model="keywordInput">
        </el-input>
      </div>
    </el-col>
    <el-col :span="4">
      <div style="margin-top: 10px">
        <el-button>
          <el-icon style="vertical-align: middle;">
            <search />
          </el-icon>
          筛选</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {

    }
  }
}
</script>

<style scoped>
</style>