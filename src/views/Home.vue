<template>
  <div style="display: flow; min-height: calc(100vh - 65px); min-width: calc(100vw - 205px)">
    <div style="display: flex ; margin: 5px">
      <div>
        <el-button>b1</el-button>
      </div>
    </div>
    <div style="margin: 2px">
      <el-button>b2</el-button>
    </div>
    <div class="block" style="text-align: center; margin-top: 20px">
      <el-button>b3</el-button>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {}
  },
  methods: {}
}
</script>
<style>
#father_div+div {
  margin: 2px;
  width: calc(100vw - 205px);
}
</style>