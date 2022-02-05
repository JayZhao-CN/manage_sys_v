<template>
  <div style="width: 100%; height: 100%">
      <el-row :gutter="40" style="margin: 20px">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <li style="color: #ff6464; background-color: #ff6464"/>
            <el-card class="box-card">

              <el-row>
                <span style="font-style: normal">今日产量</span>
              </el-row>
              <el-row>
                <div style="display: flex">
                  <el-col>
                    <span style="font-style: normal; font-weight: bold; font-size: 24px">500</span>
                  </el-col>
                  <el-col>
                  <span
                      style="font-style: italic; font-weight: bold; font-size: 20px; color: rgba(98,255,0,0.49)">↑ 20%</span>
                  </el-col>
                </div>
              </el-row>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <li style="color: #d9b900; background-color: #d9b900"/>
            <el-card class="box-card">
              <el-row>
                <span>周产量</span>
              </el-row>
              <el-row>
                <div style="display: flex">
                  <el-col>
                    <span style="font-style: normal; font-weight: bold; font-size: 24px">500</span>
                  </el-col>
                  <el-col>
                  <span
                      style="font-style: italic; font-weight: bold; font-size: 20px; color: rgba(98,255,0,0.49)">↑ 20%</span>
                  </el-col>
                </div>
              </el-row>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <li style="color: #8bde51; background-color: #8bde51"/>
            <el-card class="box-card">
              <el-row>
                <span>月产量</span>
              </el-row>
              <el-row>
                <div style="display: flex">
                  <el-col>
                    <span style="font-style: normal; font-weight: bold; font-size: 24px">500</span>
                  </el-col>
                  <el-col>
                  <span
                      style="font-style: italic; font-weight: bold; font-size: 20px; color: rgba(98,255,0,0.49)">↑ 20%</span>
                  </el-col>
                </div>
              </el-row>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <li style="color: #18b8d4; background-color: #18b8d4"/>
            <el-card class="box-card">
              <el-row>
                <span>季度产量</span>
              </el-row>
              <el-row>
                <div style="display: flex">
                  <el-col>
                    <span style="font-style: normal; font-weight: bold; font-size: 24px">500</span>
                  </el-col>
                  <el-col>
                  <span
                      style="font-style: italic; font-weight: bold; font-size: 20px; color: rgba(98,255,0,0.49)">↑ 20%</span>
                  </el-col>
                </div>
              </el-row>
            </el-card>
          </div>
        </el-col>
      </el-row>
    <el-row>

    </el-row>
    <el-row>

    </el-row>
      <el-row :gutter="40" style="margin: 20px">
        <el-col :span="14">
          <div style="height: 350px;text-align: center">
            <main-echarts/>
          </div>
        </el-col>
        <el-col :span="10">
          <div style="height: 380px;text-align: center">
          <pie-echarts/>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import MainEcharts from "../components/MainEcharts";
import PieEcharts from "../components/PieEcharts";

export default {
  components: {
    PieEcharts,
    MainEcharts,
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {

  }
}
</script>
<style>
.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>