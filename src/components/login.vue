<template>
    <div class="login" >
    <el-tag>用户登录</el-tag>
    <el-form  :model="rulesForm" :rules="rules" ref="rulesForm">
      <el-form-item label="用户名:" prop="name">
        <el-input v-model="rulesForm.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
       <el-form-item label="密码:" prop="pwd">
        <el-input v-model="rulesForm.pwd" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="请选择身份：" prop="identity">
         <el-radio-group v-model="rulesForm.identity">
            <el-radio label="总经理" border></el-radio>
            <el-radio label="销售经理" border></el-radio>
            <el-radio label="销售人员" border></el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('rulesForm')">登录</el-button>
       <el-button type="info" @click="resetForm('rulesForm')">重置</el-button>
       </el-form-item>
    </el-form>
    </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      rulesForm: {
        name: "",
        pwd: "",
        identity: "总经理"
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
        identity: [
          // { type: "number", required: true, message: '请选择身份', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    onSubmit: function(rulesForm) {
      this.$refs[rulesForm].validate(valid => {
        if (valid) {
          this.$emit("loginSuccess");
          this.$message({
            message: "登陆成功",
            type: "success"
          });
          this.$refs[rulesForm].resetFields();
          this.$router.push({ path: "/home" });
        } else {
          return false;
        }
      });
    },
    resetForm: function(rulesForm) {
      this.$refs[rulesForm].resetFields();
    }
  }
};
</script>

<style scoped>
.login {
  width: 70%;
  height: 100%;
  margin: 50px auto;
}
.el-form {
  width: 60%;
  margin: 20px auto;
}
.el-tag {
  font-size: 35px;
  background-color: #fff;
  border: none;
}
</style>
