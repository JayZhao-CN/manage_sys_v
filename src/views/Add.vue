<template>
  <div style="display: flow; min-height: calc(100vh - 65px); min-width: calc(100vw - 205px)">
    <div style="display: flex ; margin: 5px">
      <div>
        <el-select v-model="value" placeholder="请选择操作表">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div style="margin: 2px">
      <el-table :data="dataList" stripe>
        <el-table-column v-for="item in tableColumnList"  :property="item.prop" :label="item.propName" :key="item.prop"></el-table-column>
      </el-table>
    </div>
    <div class="block" style="text-align: center; margin-top: 20px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          v-model:currentPage="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      tableData:[],
      // 这里为了简便我就没有调用后台接口获取数据，直接写的假数据  你要用的话可以调用后台接口获取tableColumnList，注意数据格式
      tableColumnList: [{prop: 'id', propName: '编号'},
        {prop: 'name', propName: '名字'},
        {prop: 'age', propName: '保质期'},
        {prop: 'remark', propName: '特点'}],
      // 这里为了简便我就没有调用后台接口获取数据，直接写的假数据
      dataList: [{'id': '100001','name': '小红萝卜','age': '2年','remark': '适合油炸','country': '中国','address': '广东省深圳市'},
        {'id': '100002','name': '萝卜妹','age': '2年','remark': '适合水煮','country': '美国','address': '硅谷'},
        {'id': '100003','name': '胖萝卜头','age': '1年','remark': '适合玩儿','country': '泰国','address': '清迈'},
        {'id': '100004','name': '萝卜酱','age': '4年','remark': '适合吃火锅','country': '韩国','address': '首尔'}],
      optionalColumnList: [{prop: 'country', propName: '出口国家'},
        {prop: 'address', propName: '零售点'}],
      checkArr:[],
      options:[{value: 'id', label: '编号'},
        {value: 'name', label: '名字'},
        {value: 'age', label: '保质期'},
        {value: 'remark', label: '特点'}],
      currentPage: 5,
    }
  },
  created() {
    this.queryFn()
  },
  methods: {
    queryFn() {
      // 调用后台接口获取tableColumnList和dataList的方法写在这里
      // getData().then(response =>{
      //   this.tableColumnList = response.data.tableColumnList
      //   this.dataList = response.data.dataList
      // })
      this.showList = this.dataList
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    clearQuery() {
      this.query.name = ''
      this.queryFn()
    },
    menuChange(item){
      // 注意  我这里都用的假数据，要从后台获取tableColumnList和dataList的时候
      //，每一次调用menuChange都要重新获取tableColumnList和dataList，保证属性和数据是对应的
      let flag = true
      for(var i=0;i<this.checkArr.length;i++){
        if(this.checkArr[i] === item.propName){
          flag = false
          break
        }
      }
      if(!flag){
        this.tableColumnList.push(item)
      }
      if(flag){
        Array.prototype.contains = function(obj) {
          var j = this.length;
          while (j--) {
            if (this[j] === obj) {
              return j; // 返回的这个 i 就是元素的索引下标，
            }
          }
          return false
        }
        this.tableColumnList.splice(this.tableColumnList.contains(item),1)
      }
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