<template>
    <div class="pwd">
    <el-tag>修改密码</el-tag>
    <el-form>
      <el-form-item label="旧密码:">
        <el-input v-model="inputOld" type="password" placeholder="请输入旧的密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码:">
        <el-input v-model="password" @focus.capture.native='changePasswordTip(true)'  @blur.capture.native='changePasswordTip(false)' auto-complete="new-password" type="password" placeholder="请输入新的密码"></el-input>
      </el-form-item>
      <div style="position: absolute">
          <verify-pass-word-tip :password="password" :isShowTip = 'isShowTip'></verify-pass-word-tip>
        </div>
      <el-form-item label="确认新密码:">
        <el-input v-model="inputNew" type="password"  placeholder="密码必须和新密码输入一致"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="onSubmit">确定修改</el-button>
      <el-button type="info" @click="reset">重置</el-button>
     </el-form-item>
    </el-form>
    </div>
</template>

<script>
import verifyPassWordTip from "./verifyPassWordTip";
export default {
  name: "updatePwd",
  data() {
    return {
      password: "",
      isShowTip: false,
      inputOld: "",
      inputNew: ""
    };
  },
  components: {
    verifyPassWordTip
  },
  methods: {
    reset: function() {
      this.password = "";
      this.inputNew = "";
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
  width: 100%;
  height: 100%;
  margin-top: 50px;
}
.el-form {
  width: 60%;
  margin: 0px auto;
}
.el-tag {
  font-size: 35px;
  background-color: #fff;
  border: none;
}
</style>
