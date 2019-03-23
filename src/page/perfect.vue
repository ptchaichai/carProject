<template>
    <div class="perfect-box">
      <el-tag class="title">信息管理</el-tag>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model="ruleForm.address" placeholder="请输入住址"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="ruleForm.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别色" @change="change">
            <el-option v-for="(item,id) in roles" :label="item.label" :key="item.id" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button  round type="primary" class="addInformation" @click="perfectConfirm('ruleForm')">提交</el-button>
        <el-button  round type="info" class="addCancel" @click="perfectCancel('ruleForm')">取消</el-button>
      </el-form>
    </div>
</template>

<script>
  import { isvalidEmail } from "./valid"
  const validEmail = (rule, value, callback) => {
    if (!value) {
      callback(new Error("请输入邮箱"));
    } else if (!isvalidEmail(value)) {
      callback(new Error("请输入正确邮箱格式"));
    } else {
      callback();
    }
  };
    export default {
        name: "perfect",
      data(){
          return{
            roles:[
              {label:'男',id:1,value:'男'},
              {label:'女',id:2,value:'女'},
            ],
            ruleForm: {
              email: "",
              address: "",
              age: "",
              sex:"",
            },
            rules: {
              address: [
                { required: true, message: "请输入地址", trigger: "blur" },
                { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
              ],
              email: [{ required: true, trigger: "blur", validator: validEmail }],
              age: [{ required: true, trigger: "blur", message: "请输入年龄"},{ type:'number', message: '必须是数字' }],
              sex: [{ required: true,message: "请选择性别", trigger: "blur" },],
            },
        }
      },
      methods:{
        perfectConfirm:function(ruleForm) {
          this.$refs[ruleForm].validate(valid => {
            if (valid) {
              this.$message({
                message: "提交成功",
              });
              this.$refs[ruleForm].resetFields();
            } else {
              return false;
            }
          });
        },
        perfectCancel: function(ruleForm) {
          this.$refs[ruleForm].resetFields();
        },
      }

    }
</script>

<style scoped>
.perfect-box{
  width: 60%;
  margin:10px auto;
}
.title {
  width: 85px;
  border: 1px solid #cecece;
  margin: 20px auto;
  border: none;
  background: #fff;
  color: #0093e6;
  font-size: 26px;
}
  .el-select{
    width: 100%;
  }
</style>
