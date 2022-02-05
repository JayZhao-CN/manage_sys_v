<template>
  <el-row>
    <el-col :span="6">
      <div style="display: flex; margin: 5px">
        <el-select v-model="opTableId" placeholder="请选择操作表" @change="selectChange">
          <el-option
              v-for="item in opTableData"
              :key="item.tiTable"
              :label="item.tiName"
              :value="item.tiTable"
          >
          </el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :span="6" :offset="12">
      <div style="margin: 5px 20px 5px 5px;float: right">
        <el-button style="color: #ffffff; background-color: #04609e" @click="addDialog">添加</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import request from "../utils/request";
import moment from "moment";

export default {
  name: "TableOperation",

  data() {
    return {
      opTableData: [],
      opTableId: '',
    }
  },
  created() {
    this.queryOpTable()
  },
  methods: {
    getCol() {
      console.log(this.opTableId)
      request.get("/table/by/" + this.opTableId).then(res => {
        console.log(res)
      })
    },

    clickChange(index, row) {
      console.log(index + row.toString())
    },
    clickDelete(item) {
      console.log(item)
    },
    // 当选择查询的表时
    selectChange() {
      this.queryFn(this.opTableId)
      this.queryData(this.opTableId)
    },

    // 查询可操作表
    queryOpTable() {
      request.get("/10").then(res => {
        console.log(res.dataInfo)
        this.opTableData = res.dataInfo.list
        // this.firstOption = res.dataInfo.list[res.dataInfo.list.length-1]
      })
    },
  }
}
</script>

<style scoped>

</style>