<template>
  <div class="header">
    <div class="title">
      <div>
        <img src="../assets/header.png" alt>
      </div>
      <div class="header-title"> </div>
        <div  class="accouncement-box">
        <el-badge is-dot class="item" v-show="badgeShow">
        </el-badge>
        <el-button round @click="go" val="true">公告</el-button>
        </div>
      <div class="loginIn">
        <el-dropdown  @command="back">
          <span class="el-dropdown-link">banana<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown" @click="back">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "./bus.js";
export default {
  name: "header",
  data() {
    return {
      val: true,
      badgeShow: false,
    };
  },
  methods: {
    back: function(command) {
      this.$emit("backLogin");
      this.$router.push({path:"/login"});
      this.$message.success("退出成功");
    },
    go() {
      this.badgeShow = false;
      this.$router.push({ path: "/manage/announcement" });
    }
  },
  mounted() {
    Bus.$on("add", () => {
      this.badgeShow = true;
    });
  }
};
</script>
<style scoped>
.header {
  height: 68px;
  background: #0093e6;
  padding: 0 25px 0 30px;
  line-height: 68px;
  text-align: left;
  position: fixed;
  width: 95%;
  z-index: 2000;
  color: #fff;
}
.header .title {
  height: 100%;
  position: relative;
}
.title div:nth-child(1) {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.title div:nth-child(1) img {
  display: inline-block;
  margin-top: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.title .header-title {
  width: 200px;
  height: 68px;
  display: inline-block;
  position: absolute;
  font-size: 22px;
  top: 2px;
  left: 70px;
}
.title .loginIn {
  width: 100px;
  height: 68px;
  position: absolute;
  top: 2px;
  right: 120px;
  display: inline-block;
  font-size: 18px;
}
.title .loginIn .el-dropdown {
  width: 100%;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  font-size: 18px;
}
.accouncement-box {
  position: absolute;
  right: 330px;
  top:0;
}
.el-badge {
  position: absolute;
  right: -40px;
  top: -8px;
}
.el-icon-warning {
  color: red;
}
.el-dialog__header span{
  padding: 0px 20px 0px !important;
  text-align: center !important;
}
.el-dialog__body span{
  padding: 0px 20px !important;
  text-align: center !important;
  font-size: 18px !important;
}
</style>
