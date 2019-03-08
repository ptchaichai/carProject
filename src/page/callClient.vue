<template>
    <div class="subordinate">
      <el-tag>来电客户信息管理</el-tag>
      <el-form ref="form" :model="form" class="search-form">
      <el-input v-model="search" placeholder="请输入名称"
            suffix-icon="el-icon-search"></el-input>
     </el-form>
     <el-popover
    placement="bottom"
    width="550"
    trigger="click">
    <div class="dialog-box">
        <el-form>
          <el-form-item label="姓名">
          <el-input v-model="input1" placeholder="请输入姓名"></el-input>
         </el-form-item>
          <el-form-item label="电话">
          <el-input v-model="input2" placeholder="请输入电话"></el-input>
         </el-form-item>
          <el-form-item label="地址">
          <el-input v-model="input3" placeholder="请输入地址"></el-input>
         </el-form-item>
         <el-button  round type="primary" class="addInformation">确定</el-button>
        </el-form>
      </div>
    <el-button slot="reference" type="primary" size="small" round class="add">添加</el-button>
  </el-popover>
      <el-table
    :data="tableData"
    border>
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
      width="200">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="150"
      left="475">
      <template slot-scope="scope">
    <el-popover
    placement="bottom"
    width="550"
    trigger="click"
    left="30">
    <div class="dialog-box">
        <el-form>
          <el-form-item label="姓名">
          <el-input v-model="input1" placeholder="请输入姓名"></el-input>
         </el-form-item>
          <el-form-item label="电话">
          <el-input v-model="input2" placeholder="请输入电话"></el-input>
         </el-form-item>
          <el-form-item label="地址">
          <el-input v-model="input3" placeholder="请输入地址"></el-input>
         </el-form-item>
         <el-button  round type="primary" class="addInformation">确定</el-button>
        </el-form>
      </div>
    <el-button slot="reference" type="primary" size="small" round class="update">修改</el-button>
  </el-popover>
        <el-button @click="handleClick(scope.row)" type="primary" size="small" round>删除</el-button>
      </template>
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
          name: '王小虎',
          tel: '34345345345646456',
          address: '上海市'
        }, {
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
  width: 782px;
  min-width: 780px;
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
