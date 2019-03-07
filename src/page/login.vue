<template>
    <div class="login" v-show="show">
    <el-form>
      <el-form-item label="用户名:">
        <el-input v-model="input" placeholder="请输入用户名"></el-input>
      </el-form-item>
       <el-form-item label="密码:">
        <el-input v-model="input" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="onSubmit">登陆</el-button>
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
      show:false
    }
  }
};
</script>

<style scoped>
.login{
  width: 100%;
  height: 100%;
}
.el-form{
  width: 60%;
  margin: 100px auto;
}
</style>
