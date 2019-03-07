<template>
<div class="sidebar">
  <el-col :span="24">
    <el-menu
      default-active="activePath"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#0093e6"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1" class="submenu1" >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>个人信息管理</span>
        </template>
       <el-menu-item-group @click="gologin()" index="/login">
       <!-- <router-link to="/login"> -->
          <div  class="el-menu-item-second" >信息管理</div>
          <!-- </router-link> -->
        </el-menu-item-group>
        <el-menu-item-group >
          <div  class="el-menu-item-second">修改密码</div >
        </el-menu-item-group>
        </el-submenu >
      <el-menu-item index="2" >
        <i class="el-icon-location"></i>
        <span slot="title">销售信息管理</span>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>客户信息管理</span>
        </template>
      <el-menu-item-group>
          <div  class="el-menu-item-second">来电客户</div>
        </el-menu-item-group>
        <el-menu-item-group>
          <div  class="el-menu-item-second">购车客户</div>
        </el-menu-item-group>
        <el-menu-item-group>
          <div  class="el-menu-item-second">来店客户</div>
        </el-menu-item-group>
        </el-submenu>

      <el-menu-item index="3" >
        <i class="el-icon-location"></i>
        <span slot="title">销售信息管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-location"></i>
        <span slot="title">汽车信息管理</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</div>
</template>

<script>
  import {MENU} from './pageMenu'
export default {
  name: "sidebar",
  data(){
    menulist:MENU
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    gologin() {
      this.$router.push({ path: '/login' });
    }
  }
};
</script>
<style scoped>
.el-submenu__title {
  margin: 20px 0px;
}
.el-col {
  height: 100%;
}
.submenu1 {
  margin-top: 55px !important;
}
.el-submenu,
.el-menu-item {
  margin: 10% 0px;
}
.el-icon-location {
  color: #555;
}
.el-menu-item-second {
  font-size: 14px;
  color: #cfcfcf;
  cursor: pointer;
  margin-left: 4px;
}
.el-menu-item-second:hover {
  background: #fff;
  opacity: 0.5;
  color: #000;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>
