<template>
    <div class="subordinate">
      <el-tag>信息管理</el-tag>
      <el-form ref="form" :model="form" class="search-form">
      <el-input v-model="search" placeholder="请输入名称"
            suffix-icon="el-icon-search"></el-input>
     </el-form>
     <el-popover
    placement="bottom"
    width="550"
     v-model="visible">
    <div class="dialog-box">
        <el-form>
          <el-form-item label="工号">
            <el-input v-model="inputId" placeholder="请输入工号"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
          <el-input v-model="inputName" placeholder="请输入姓名"></el-input>
         </el-form-item>
          <el-form-item label="电话">
          <el-input v-model="inputTel" placeholder="请输入电话"></el-input>
         </el-form-item>
          <el-form-item label="地址">
          <el-input v-model="inputAdd" placeholder="请输入地址"></el-input>
         </el-form-item>
         <el-button  round type="primary" class="addInformation" @click="addInformation">确定</el-button>
         <el-button  round type="info" class="cancelInformation" @click="cancelInformation">取消</el-button>
        </el-form>
      </div>
    <el-button slot="reference" type="primary" size="small" round class="add">添加</el-button>
  </el-popover>
      <el-table
    :data="tableData"
    border
      >
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
          <el-input v-model="popoverName" placeholder="请输入姓名"></el-input>
         </el-form-item>
          <el-form-item label="电话">
          <el-input v-model="popoverTel" placeholder="请输入电话"></el-input>
         </el-form-item>
          <el-form-item label="地址">
          <el-input v-model="popoverAdd" placeholder="请输入地址"></el-input>
         </el-form-item>
         <el-button  round type="primary" class="addInformation">确定</el-button>
        </el-form>
      </div>
    <el-button slot="reference" type="primary" size="small" round class="update" @click="update(scope.row)">修改</el-button>
  </el-popover>
        <el-button @click="cancle(scope.row)" type="info" size="small" round>删除</el-button>
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
      inputId: "",
      inputName: "",
      inputTel: "",
      inputAdd: "",
      popoverName:'',
      popoverTel:'',
      popoverAdd:'',
      visible:false,
      tableData: [

      ]
    };
  },
  methods :{
    addInformation:function(){
      const inputId=this.inputId;
      const inputName=this.inputName;
      const inputTel=this.inputTel;
      const inputAdd=this.inputAdd;
      this.tableData.push({id:`${inputId}`,name:`${inputName}`,tel:`${inputTel}`,address:`${inputAdd}`})
      this.inputId='';
      this.inputName='';
      this.inputTel='';
      this.inputAdd='';
      this.visible=false;
    },
    cancelInformation:function(){
      this.inputId='';
      this.inputName='';
      this.inputTel='';
      this.inputAdd='';
      this.visible=false;
    },
    update:function(val){
      this.popoverName=val.name;
      this.popoverTel=val.tel;
      this.popoverAdd=val.address;
      this.visible=false;
    },
    cancle:function(index){
      this.tableData.splice(index,1);
    }
  },
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
    top: 197px;
}
.update{
  margin-right: 20px;
}
.search-form{
      width: 30%;
    margin-top: 30px;
  margin-left: 108px;
}
</style>
