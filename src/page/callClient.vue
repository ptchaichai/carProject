<template>
    <div class="subordinate">
      <el-tag>来电客户信息管理</el-tag>
      <el-form ref="form" :model="form" class="search-form">
      <el-input v-model="search" placeholder="请输入名称"
            suffix-icon="el-icon-search"></el-input>
     </el-form>
     <el-popover
       v-model="visible"
    placement="bottom"
    width="550"
    trigger="click">
    <div class="dialog-box">
        <el-form  :rules="rules" ref="ruleForm" :model="ruleForm">
          <el-form-item label="姓名" prop="name">
          <el-input v-model="inputName" placeholder="请输入姓名" ></el-input>
         </el-form-item>
          <el-form-item label="电话" prop="phone">
          <el-input v-model.number="inputTel" placeholder="请输入电话" ></el-input>
         </el-form-item>
          <el-form-item label="地址">
          <el-input v-model="inputAdd" placeholder="请输入地址"></el-input>
         </el-form-item>
         <el-button  round type="primary" class="addInformation" @click="confirm">确定</el-button>
          <el-button type="info"  round  @click="cancel">取消</el-button>
        </el-form>
    </div>
       <el-button slot="reference" type="primary" size="small" round class="add" @click="add">添加</el-button>
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
    left="30"
    v-model="visibleOne">
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
         <el-button  round type="primary" class="addInformation" @click="confirmOne(scope.row)">确定</el-button>
         <el-button  round type="info" @click="cancelOne">取消</el-button>
        </el-form>
      </div>
    <el-button slot="reference" type="primary" size="small" round class="update" @click="update(scope.row)">修改</el-button>
  </el-popover>
        <el-button @click="cancelRow(scope.row)" type="info" size="small" round>删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    </div>
</template>

<script>
  import {isvalidPhone} from './validPhone'
  const validPhone=(rule, value,callback)=>{
    if (!value){
      callback(new Error('请输入电话号码'))
    }else  if (!isvalidPhone(value)){
      callback(new Error('请输入正确的11位手机号码'))
    }else {
      callback()
    }
  };
export default {
  name: "updatePwd",
  data() {
    return {
      visible:false,
      visibleOne:false,
      inputName: "",
      inputTel: "",
      inputAdd: "",
      popoverName:'',
      popoverTel:'',
      popoverAdd:'',
      tableData: [
      ],
      ruleForm: {
        name: '',
        phone:''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],

        phone: [
          { required: true, trigger: 'blur', validator: validPhone }
        ]
      },
    };
  },
  methods:{
    add:function(){
      this.visible=true;
    },
    confirm:function(){
      const inputName=this.inputName;
      const inputTel=this.inputTel;
      const inputAdd=this.inputAdd;
      this.tableData.push({name:`${inputName}`,tel:`${inputTel}`,address:`${inputAdd}`});
      this.inputName='';
      this.inputTel='';
      this.inputAdd='';
      this.visible=false;
    },
    cancel:function(){
      this.inputName='';
      this.inputTel='';
      this.inputAdd='';
      this.visible=false;
    },
    update:function(val){
      this.popoverName=val.name;
      this.popoverTel=val.tel;
      this.popoverAdd=val.address;
    },
    confirmOne:function(val){
      val.inputName=this.popoverName;
      val.inputTel=this.popoverTel;
      val.inputAdd=this.popoverAdd;
      this.visibleOne=false;
    },
    cancelOne:function(){
      this.visibleOne=false;
    },
    cancelRow:function(index){
      this.tableData.splice(index,1);
    }

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
  top: 197px;
}
.update{
  margin-right: 20px;
}
.search-form{
      width: 30%;
    margin-top: 30px;
  margin-left: 106px;
}
</style>
