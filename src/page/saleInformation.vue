<template>
    <div class="subordinate">
      <el-tag>销售信息统计量</el-tag>
      <el-table
    :data="tableData"
    border>
    <el-table-column
      fixed
      prop="type"
      label="信息类型"
      width="160">
    </el-table-column>
    <el-table-column
      fixed
      prop="date"
      label="当日"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="mouth"
      label="当月"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="quarter"
      label="当季度"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="year"
      label="当年"
      width="100">
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
          type: "来电客户数量",
          date: "34",
          mouth: "434",
          quarter: "3423",
          year: "5433"
        },
        {
          type: "来店客户数量",
          date: "34",
          mouth: "434",
          quarter: "3423",
          year: "5433"
        },
        {
          type: "购车客户数量",
          date: "34",
          mouth: "434",
          quarter: "3423",
          year: "5433"
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
  width: 562px;
  min-width: 554px;
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
.update {
  margin-right: 20px;
}
.search-form {
  width: 30%;
  margin-top: 30px;
}
</style>
