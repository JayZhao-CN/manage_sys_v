<template>
  <div style="width: 100%; height: 100%">
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
          <el-button @click="getCol">获取列名注释</el-button>
        </div>
      </el-col>
      <el-col :span="6" :offset="12">
        <div style="margin: 5px 20px 5px 5px;float: right">
          <el-button style="color: #ffffff; background-color: #04609e" @click="addDialog">添加</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div style="margin: 2px">
          <el-table :data="dataList" ref="multipleTable" stripe>
            <el-table-column v-for="item in tableColumnList" :property="item.COLUMN_NAME" :label="item.COLUMN_COMMENT"
                             :key="item.COLUMN_NAME">
            </el-table-column>
            <el-table-column align="right" v-if="this.dataList.length !== 0" key="option">
              <template #header>
                <span style="float: left">操作</span>
              </template>
              <template #default="scope">
                <el-col style="margin: 5px">
                  <el-button type="warning" @click="clickChange(scope.$index,scope.row)">修改</el-button>
                </el-col>
                <el-col style="margin: 5px">
                  <el-button type="danger" @click="clickDelete()">删除</el-button>
                </el-col>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block" style="text-align: center; margin-top: 20px">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :currentPage=currentPage
              :page-size=pageSize
              layout="prev, pager, next, jumper"
              :total=total
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form>
        <el-form-item v-for="item in tableColumnList" :label="item.COLUMN_COMMENT">
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
        >提交</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// <!--  <div style="display: flow; min-height: calc(100vh - 65px); min-width: calc(100vw - 205px)">-->

import request from "../utils/request";
import moment from "moment";

export default {

  data() {
    return {
      opTableData: [],
      // 假数据
      list01:[0,1,2,3],
      // 表头数据
      tableColumnList: [],
      // 表头下划线数据
      table_column_list: [],
      // 表内数据
      dataList: [],
      checkArr: [],
      date: [],
      currentPage: 1,
      total: 0,
      pageNum: 1,
      pageSize: 3,
      opTableId: '',
      dialogFormVisible:false,
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

    // 对时间戳进行格式化
    dateFormat() {
      for (let i = 0; i < this.dataList.length; i++) {
        console.log(this.dataList)
        this.dataList[i].uTimeStart !== null ? this.dataList[i].uTimeStart = moment(this.dataList[i].uTimeStart * 1000).format("YYYY-MM-DD HH:mm:ss") : this.dataList[i] = this.dataList[i]
        this.dataList[i].uTimeEnd !== null ? this.dataList[i].uTimeEnd = moment(this.dataList[i].uTimeEnd * 1000).format("YYYY-MM-DD HH:mm:ss") : this.dataList[i] = this.dataList[i]
      }
    },

    // 查询表头信息
    queryFn(tableId) {
      this.dataList = []
      request.get("/table/by/" + tableId).then(res => {
        for (let i = 0; i < res.dataInfo.list.length; i++) {
          res.dataInfo.list[i].COLUMN_NAME = this.getCamelCase(res.dataInfo.list[i].COLUMN_NAME)
        }
        this.tableColumnList = res.dataInfo.list
      })
    },

    // 下划线转驼峰
    getCamelCase(str) {
      return str.replace(/_([a-z])/g, function (all, i) {
        return i.toUpperCase();
      })
    },

    // 查询表内数据
    queryData(tableId) {
      request.get("/" + tableId + "/detail" + "?" + "pageNum=" + this.pageNum + "&&" + "pageSize=" + this.pageSize).then(res => {
        this.dataList = res.dataInfo.dataInfo.list !== null ? res.dataInfo.dataInfo.list : []
        this.dateFormat()
        this.currentPage = res.dataInfo.dataInfo.pageNum
        this.pageNum = res.dataInfo.dataInfo.pageNum
        this.total = res.dataInfo.dataInfo.total
      })
    },

    // 查询可操作表
    queryOpTable() {
      request.get("/10").then(res => {
        console.log(res.dataInfo)
        this.opTableData = res.dataInfo.list
        // this.firstOption = res.dataInfo.list[res.dataInfo.list.length-1]
      })
    },

    addDialog(){
      console.log(this.tableColumnList);
      this.dialogFormVisible = true
    },

    // 以下为进度条官方方法
    handleSizeChange(val) {
      this.dataList = []
      this.pageSize = val
      this.queryData(this.opTableId)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.dataList = []
      this.pageNum = val
      this.queryData(this.opTableId)
      console.log(`当前页: ${val}`)
    },

    clearQuery() {
      this.query.name = ''
      this.queryFn()
    },
  }
}
</script>
<style>

#father_div + div {
  margin: 2px;
  width: calc(100vw - 205px);
}

</style>