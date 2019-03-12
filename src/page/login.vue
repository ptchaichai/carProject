<template>
    <div class="login" >
    <el-tag>用户登录</el-tag>
    <el-form>
      <el-form-item label="用户名:">
        <el-input v-model="inputName" placeholder="请输入用户名"></el-input>
      </el-form-item>
       <el-form-item label="密码:">
        <el-input v-model="inputPwd" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="请选择身份：" prop="identity">
         <el-radio-group v-model="identity">
            <el-radio label="总经理" border></el-radio>
            <el-radio label="销售经理" border></el-radio>
            <el-radio label="销售人员" border></el-radio>
          </el-radio-group>
        </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
      <el-button type="info">重置</el-button>
  </el-form-item>
    </el-form>
    </div>
</template>

<script>
export default {
  name: "login",
  data(){
    return{
      inputName:'',
      inputPwd:'',
      identity:'',
    }
  }
};
</script>

<style scoped>
.login{
  width: 100%;
  height: 100%;
  margin-top:50px;
}
.el-form{
  width: 60%;
  margin: 20px auto;
}
.el-tag {
  font-size: 35px;
  background-color: #fff;
  border: none;
}
</style>
