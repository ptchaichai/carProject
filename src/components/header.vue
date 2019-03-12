<template>
  <div class="header">
    <div class="title">
      <div>
        <img src="../assets/1.1.jpg" alt>
      </div>
      <div class="header-title">汽车销售管理系统</div>
        <router-link to="/announcement"><el-button round @click="goAnnouncement" val="true">公告</el-button></router-link>
      <div class="hello">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">banana<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "header",
  data() {
    val:true
  },
  methods: {
    handleCommand(command) {
      this.$router.push({
        path: "/login"
      });
      this.$message("已退出登录");
    },
    goAnnouncement(){
      this.$router.push({path:'/announcement'})
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.title .hello {
  width: 100px;
  height: 68px;
  position: absolute;
  top: 2px;
  right: 120px;
  display: inline-block;
  font-size: 18px;
}
.title .hello .el-dropdown {
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
.el-button {
  position: absolute;
  top: 15px;
  right: 262px;
}
</style>
