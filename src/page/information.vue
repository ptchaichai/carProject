<template>
    <div class="subordinate">
      <el-tag>当前个人信息</el-tag>
      <el-table
    :data="tableData"
    border>
    <el-table-column
      fixed
      prop="id"
      label="工号"
      width="60">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="tel"
      label="电话"
      width="200">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="250">
    </el-table-column>
  </el-table>

    </div>
</template>

<script>
export default {
  name: "updatePwd",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      tableData: [
        {
          id:'001',
          name: '王小虎',
          tel: '34345345345646456',
          address: '上海市'
        }, {
           id:'02',
          name: '王小虎',
          tel: '34345345345646456',
          address: '上海市'
        },
      ]
    };
  }
};
</script>

<style scoped>
.subordinate {
  width: 90%;
  margin: 50px auto;
}
.dialog-box {
  width: 100%;
}
#el-popover-1912 {
  left: 328px !important;
  z-index: 2001;
  width: 60% !important;
  height: 45% !important;
}
.el-table {
  width: 632px;
  border: 1px solid #cecece;
  margin: 20px auto;
}
.el-tag {
  font-size: 35px;
  background-color: #fff;
  border: none;
}
.el-button--small {
  margin-left: -10px;
}
.add {
      position: absolute;
    top: 188px;
}
.update{
  margin-right: 20px;
}
.search-form{
      width: 30%;
    margin-top: 30px;
}
</style>
