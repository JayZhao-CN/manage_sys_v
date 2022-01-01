<template>
  <div style="display: flow; min-height: calc(100vh - 65px); min-width: calc(100vw - 205px)">
    <div style="display: flex ; margin: 5px">
      <div>
        <el-select v-model="opTableId" placeholder="请选择操作表" @change="selectChange">
          <el-option
              v-for="item in opTableData"
              :key="item.tiId"
              :label="item.tiName"
              :value="item.tiId"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button @click="dateFormat">格式化时间</el-button>
      </div>
    </div>
    <div style="margin: 2px">
      <el-table :data="dataList" ref="multipleTable" stripe>
        <el-table-column v-for="item in tableColumnList" :property="item.stColumn" :label="item.stName" :key="item.stColumn" >
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
  </div>
</template>

<script>


import request from "../utils/request";
import moment from "moment";

export default {
  data() {
    return {
      opTableData:[],
      // 这里为了简便我就没有调用后台接口获取数据，直接写的假数据  你要用的话可以调用后台接口获取tableColumnList，注意数据格式
      tableColumnList: [],
      // 这里为了简便我就没有调用后台接口获取数据，直接写的假数据
      dataList: [],
      optionalColumnList: [{prop: 'country', propName: '出口国家'},
        {prop: 'address', propName: '零售点'}],
      checkArr:[],
      date:[],
      currentPage: 1,
      total: 0,
      pageNum: 1,
      pageSize: 3,
      opTableId: '',
    }
  },


  created() {
    // this.queryFn()
    // this.queryData()
    this.queryOpTable()
  },
  methods: {

    // 当选择查询的表时
    selectChange(){
      this.queryFn(this.opTableId)
      this.queryData(this.opTableId)
    },

    // 对时间戳进行格式化
    dateFormat(){
      for (let i = 0; i < this.dataList.length; i++){
        console.log(this.dataList)
        // this.dataList[i].uTimeStart = moment(this.dataList[i].uTimeStart * 1000).format("YYYY-MM-DD HH:mm:ss")
        // this.dataList[i].uTimeEnd = moment(this.dataList[i].uTimeEnd * 1000).format("YYYY-MM-DD HH:mm:ss")
      }
    },

    // 查询表头信息
    queryFn(tableId) {
      request.get("/table/"+tableId).then(res=>{
        this.tableColumnList = res.dataInfo.list
      })
    },

    // 查询表内数据
    queryData(tableId){
      request.get("/"+tableId+"/detail"+"?"+"pageNum="+this.pageNum+"&&"+"pageSize="+this.pageSize).then(res=>{
        this.dataList = res.dataInfo.dataInfo.list
        this.dateFormat()
        this.currentPage = res.dataInfo.dataInfo.pageNum
        this.pageNum = res.dataInfo.dataInfo.pageNum
        this.total = res.dataInfo.dataInfo.total
      })
    },

    // 查询可操作表
    queryOpTable(){
      request.get("/tableInfo").then(res=>{
        this.opTableData = res.dataInfo.list
        // this.firstOption = res.dataInfo.list[res.dataInfo.list.length-1]
      })
    },

    // 以下为进度条官方方法
    handleSizeChange(val) {
      this.pageSize = val
      this.queryData()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.queryData()
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
#father_div+div {
  margin: 2px;
  width: calc(100vw - 205px);
}

</style>