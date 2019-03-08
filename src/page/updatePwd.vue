<template>
    <div class="pwd">
    <el-tag>修改密码</el-tag>
    <el-form>
      <el-form-item label="旧密码:">
        <el-input v-model="inputOld" placeholder="请输入旧的密码"></el-input>
      </el-form-item>
       <el-form-item label="新密码:">
        <el-input v-model="inputNew" placeholder="请输入新的密码"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="onSubmit">确定修改</el-button>
      <el-button type="info">取消</el-button>
     </el-form-item>
    </el-form>
    </div>
</template>

<script>
export default {
  name: "updatePwd",
  data(){
    return{
      inputOld:'',
      inputNew:'',
    }
  }
};
</script>

<style scoped>
.pwd{
  width: 100%;
  height: 100%;
  margin-top: 50px;
}
.el-form{
  width: 60%;
  margin: 100px auto;
}
.el-tag{
  font-size:35px ;
  background-color: #fff;
  border:none;
}
</style>
