<template>
  <div class="pwd">
    <p>修改密码</p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="旧密码:" prop="oldPwd">
        <el-input v-model="ruleForm.oldPwd" type="password" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newPwd">
        <el-input v-model="ruleForm.newPwd" @focus.capture.native='changePasswordTip(true)'
          @blur.capture.native='changePasswordTip(false)' auto-complete="new-password" type="password"
          placeholder="请输入新密码"></el-input>
      </el-form-item>
      <div style="position: absolute">
        <verify-pass-word-tip :password="ruleForm.newPwd" :isShowTip='isShowTip'></verify-pass-word-tip>
      </div>
      <el-form-item label="确认新密码:" prop="newPwdTwo">
        <el-input v-model="ruleForm.newPwdTwo" type="password" placeholder="请确认新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('ruleForm')">确定修改</el-button>
        <el-button type="info" @click="reset('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import verifyPassWordTip from "./../verifyPassWordTip";
  export default {
    name: "updatePwd",
    data() {
      return {
        password: "",
        isShowTip: false,
        ruleForm: {
          oldPwd: "",
          newPwd: "",
          newPwdTwo: ""
        },
        rules: {
          oldPwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
          newPwd: [
            { required: true, message: "请输入新密码", trigger: "blur" },
            { min: 8, max: 24, message: "长度在 8 到 24 个字符", trigger: "blur" }
          ],
          newPwdTwo: [
            { required: true, message: "请确认新密码", trigger: "blur" },
            { min: 8, max: 24, message: "长度在 8 到 24 个字符", trigger: "blur" }
          ]
        }
      };
    },
    components: {
      verifyPassWordTip
    },
    methods: {
      onSubmit: function (ruleForm) {
        const form = {
          id: sessionStorage.getItem('id'),
          old_password: this.ruleForm.oldPwd,
          new_password: this.ruleForm.newPwdTwo
        };
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            if (this.ruleForm.newPwd.trim() === this.ruleForm.oldPwd.trim()) {
              this.$message.error("新密码不能与旧密码相同");
            } else if (this.ruleForm.newPwd.trim() !== this.ruleForm.newPwdTwo.trim()) {
              this.$message.error("确认密码必须与新密码一致");
            } else {
              this.$http
                .post("api/updatePassword", this.qs.stringify(form))
                .then(res => {
                  if (res.data.status === 0) {
                    this.$message.success("修改成功");
                  } else {
                    this.$message.error("修改失败");
                  }
                });
            }
          } else {
            this.$http
              .post("api/updatePassword", this.qs.stringify(form))
              .then(res => {
                if (res.data.status === 2) {
                  this.$message.success('修改成功,请重新登录');
                } else {
                  this.$message.error(res.data.data);
                }
              });
          }
        });
      },
      reset: function (ruleForm) {
        this.$refs[ruleForm].resetFields();
      },
      /**
       * 改变密码提示是否显示
       **/
      changePasswordTip(isShow) {
        if (isShow) {
          this.isShowTip = true;
        } else {
          this.isShowTip = false;
        }
      }
    }
  };
</script>

<style scoped>
  .pwd {
    margin: 0px auto;
    height: 770px;
    background: #fefefe;
  }

  .el-form {
    margin-top: 50px;
    width: 60%;
    margin: 30px auto;
  }

  .pwd p {
    text-align: left;
    border-bottom: 1px solid #ccc;
    color: #3a8ee6;
    font-size: 20px;
    font-weight: 700;
  }
</style>