<template>
  <div class="login">
    <div class="bg bg-blur"><img src="" alt=""></div>
    <div class="contet content-front">
      <el-tag>用户登录</el-tag>
      <el-form :model="rulesForm" :rules="rules" ref="rulesForm">
        <el-form-item label="账号:" prop="account">
          <el-input v-model="rulesForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="pwd">
          <el-input v-model="rulesForm.pwd" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="验证码:" prop="vCode">
          <input type="text" placeholder="请输入验证码" class="yanzhengma_input" v-model="rulesForm.vCode">
          <input type="button" @click="createCode" class="verification" v-model="cCode" />
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
  import crypto from 'crypto'
  const validatevCode = (rule, value, callback) => {
    // 将用户输入数字转成字符串，同时转换成大写
    value = value + "";
    if (value.length > 4) {
      value = value.substring(0, 4);
      this.$set(this.loginInfo, "vCode", value);
    }
  };
  export default {
    name: "login",
    data() {
      return {
        cCode: "",
        picLyanzhengma: "",
        rulesForm: {
          account: "",
          pwd: "",
          vCode: ""
        },
        rules: {
          account: [{ required: true, message: "请输入账号", trigger: "blur" }],
          pwd: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
          vCode: [{ required: true, validator: validatevCode, triger: "blur" }]
        },
      };
    },
    mounted() {
      this.createCode();
    },
    methods: {
      // 图片验证码
      createCode() {
        //先清空验证码的输入
        let code = "";
        this.cCode = "";
        this.vCode = "";
        //验证码的长度
        //随机数
        const random = new Array(
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z"
        );
        for (let i = 0; i < 4; i++) {
          //取得随机数的索引（0~35）
          var index = Math.floor(Math.random() * 36);
          //根据索引取得随机数加到code上
          code += random[index];
        }
        //把code值赋给验证码
        this.cCode = code;
      },
      // 判断验证码是否输入正确
      checkCode() {
        let vCode = this.rulesForm.vCode;
        vCode = vCode.toUpperCase();
        let cCode = this.cCode;
        cCode = cCode.toUpperCase();
        if (vCode !== "" && vCode === cCode) {
          return 1;
        } else if (vCode === "") {
          return 0;
        } else if (vCode !== "" && vCode !== cCode) {
          return -1;
        }
      },
      onSubmit: function (rulesForm) {
        const md5 = crypto.createHash('md5');
        let codestatus = this.checkCode();
        if (codestatus === 1) {
          let param = {
            phone: this.rulesForm.account,
            password: md5.update(this.rulesForm.pwd).digest('hex')
          };
          this.$http
            .post(API.LOGIN, this.qs.stringify(param))
            .then(result => {
              if (result.data.status === 0) {
                sessionStorage.setItem('role', result.data.data.role)
                sessionStorage.setItem('name', result.data.data.name)
                sessionStorage.setItem('storeID', result.data.data.store_id)
                sessionStorage.setItem('phone', result.data.data.phone)
                sessionStorage.setItem('id', result.data.data.id)
                this.$message.success("登陆成功");
                this.$router.push({ path: "/manage" });
              } else {
                this.$message.error("登录失败");
                this.createCode();
              }
            });
        } else if (codestatus === 0) {
          this.$message.error("请输入验证码!");
          this.createCode();
        } else if (codestatus === -1) {
          this.$message.error("验证码输入错误!");
          this.createCode();
        }
      },
      resetForm: function (rulesForm) {
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
    margin-top: 60px;
  }

  .el-form {
    width: 60%;
    margin: 0px auto;
    min-width: 535px;
  }

  .el-tag {
    font-size: 35px;
    border: none;
    background-color: #fff;
  }

  .identity-box {
    width: 80%;
  }

  a {
    color: #3a8ee6;
    text-decoration: none;
  }

  .yanzhengma_input {
    border: 1px solid #fff;
    outline: none;
    border-radius: 5px;
    letter-spacing: 1px;
    font-weight: normal;
    padding: 5px 0 5px 10px;
    margin-left: 84px;
    height: 30px;
    border: 1px solid #e6e6e6;
    width: 207px;
  }

  .verification {
    border-radius: 12px;
    width: 100px;
    letter-spacing: 5px;
    margin-left: 50px;
    background: #3a8ee6;
    height: 40px;
    -webkit-transform: translate(-15px, 0);
    transform: translate(-15px, 0);
    color: #fff;
    border: none;
  }

  .captcha {
    height: 50px;
    text-align: justify;
  }
</style>