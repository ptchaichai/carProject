<template>
    <div class="announcement" v-show="show">
      <el-popover
       trigger="click" width="300px">
      <div class="dialog-box">
        <el-form>
          <el-form-item label="公告标题:">
          <el-input v-model="input" placeholder="请输入公告标题"></el-input>
         </el-form-item>
         <el-form-item label="公告内容:">
          <el-input v-model="inputText" placeholder="请输入公告内容" type="textarea"></el-input>
         </el-form-item>
         <el-button  round type="primary" class="add">添加</el-button>
        </el-form>
      </div>
     <el-button slot="reference" round type="primary">添加新公告</el-button>
    </el-popover>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100px">
      <template slot-scope="scope">
        <el-button type="primary"  @click="handleClick(scope.row)"  size="small" round>查看</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
  name: "updatePwd",
    props: ["val"],
  data() {
    return {
      show: val,
      input: "",
      inputText: "",
      tableData: [
        {
          title: "业绩不好，努力工作"
        },
        {
          title: "2016-05-04"
        },
        {
          title: "2016-05-01"
        },
        {
          title: "2016-05-03"
        }
      ]
    };
  },

};
</script>

<style scoped>
.announcement {
  width: 80%;
  margin: 100px auto;
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
  width: 90%;
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
  margin: 0px 60px;
}
</style>
