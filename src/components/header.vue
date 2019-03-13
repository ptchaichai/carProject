<template>
  <div class="header">
    <div class="title">
      <div>
        <img src="../assets/1.1.jpg" alt>
      </div>
      <div class="header-title">汽车销售管理系统</div>
        <router-link to="/announcement" class="router-link-exact-active">
        <el-badge is-dot class="item" v-show="badgeShow">
        </el-badge>
        <el-button round @click="goAnnouncement" val="true">公告</el-button>
        </router-link>
      <div class="loginIn">
        <el-dropdown  @command="back">
          <span class="el-dropdown-link">banana<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown" @click="back">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-dialog title="警告！" :visible.sync="dialogback" width="25%">
        <i class="el-icon-warning"></i>
        <span>是否退出登录？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="backConfirm" round>确 定</el-button>
          <el-button @click="dialogback = false"  round>取 消</el-button>
        </span>
      </el-dialog> -->
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
      dialogback: false
    };
  },
  methods: {
    back: function(command) {
      // this.dialogback = true;
      this.$emit("backLogin");
      this.$router.push({path:"/login"});
      this.$message({
        message: "成功退出",
        type: "success"
      });
    },
    backConfirm: function() {
      // this.$emit("backLogin");
      // this.$router.push({path:"/login"});
      // this.$message({
      //   message: "成功退出",
      //   type: "success"
      // });
      this.dialogback = false;
    },
    goAnnouncement() {
      this.badgeShow = false;
      this.$router.push({ path: "/announcement" });
    }
  },
  mounted() {
    Bus.$on("add", message => {
      this.badgeShow = message;
    });
  }
};
</script>
<style scoped>
.header {
  margin-top: 10px;
  height: 68px;
  background: #0093e6;
  padding: 0 25px 0 30px;
  line-height: 68px;
  text-align: left;
  position: fixed;
  width: 100%;
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
.router-link-exact-active {
  position: absolute;
  right: 330px;
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
