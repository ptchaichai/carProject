<template>
    <div class="login" >
    <div class="bg bg-blur"></div>
    <div class="contet content-front">
    <el-tag>用户登录</el-tag>
    <el-form  :model="rulesForm" :rules="rules" ref="rulesForm">
      <el-form-item label="账号:" prop="name">
        <el-input v-model="rulesForm.name" placeholder="请输入账号"></el-input>
      </el-form-item>
       <el-form-item label="密码:" prop="pwd">
        <el-input v-model="rulesForm.pwd" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="请选择身份：" prop="identity">
         <el-radio-group v-model="rulesForm.identity">
            <el-radio label="0"  border>总经理</el-radio>
            <el-radio label="1"  border>销售经理</el-radio>
            <el-radio label="2"  border>销售人员</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('rulesForm')">登录</el-button>
       <el-button type="info" @click="resetForm('rulesForm')">重置</el-button>
       </el-form-item>
    </el-form>
    </div>
    </div>
</template>

<script>
import API from "./api.js";
export default {
  name: "login",
  data() {
    return {
      rulesForm: {
        name: "",
        pwd: "",
        identity: "0"
      },
      rules: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
        identity: [
          {
            required: true,
            message: "请选择身份",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            name: this.rulesForm.name,
            pwd: this.rulesForm.pwd,
            role: this.rulesForm.identity
          };
          this.$http.post(API.LOGIN, this.qs.stringify(param)).then(result => {
            if (result.data.status === 0) {
              this.$router.push({ path: "/manage" });
              this.$message.success("登陆成功");
              console.log("登录成功");
            } else {
              this.$message.error("登录失败");
              console.log("登录失败");
              }
          });
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
  width: 100%;
  height: 100%;
  font-weight: 700;
}
.content {
  color: #ffffff;
  font-size: 40px;
}
.bg {
  background: url(../assets/cover.png) no-repeat;
  height: 100%;
  text-align: center;
  line-height: 600px;
}
.bg-blur {
  float: left;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: blur(1px);
}
.content-front {
  width: 60%;
  position: absolute;
  right: 10px;
  height: 600px;
  text-align: center;
  margin-top: 80px;
}
.el-form {
  width: 60%;
  margin: 20px auto;
}
.el-tag {
  font-size: 35px;
  border: none;
  background-color: #fff;
}
</style>
