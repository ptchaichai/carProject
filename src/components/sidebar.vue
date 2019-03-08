<template>
<div class="sidebar">
  <!-- <el-col :span="24">
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
          <div  class="el-menu-item-second" >信息管理</div>
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
  </el-col> -->


  <el-col :span="24">
     <el-menu
      :default-active="activePath"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router>
      <el-menu-item class="first-menu" v-for="(item ,i) in menulist"  v-if="!item.menuSubLink"
      :index="item.menuUrl"
      :key="i">
          <span slot="title">{{item.menuName}}</span>
      </el-menu-item>
      <el-submenu  v-else class="first-menu"
      :index="item.menuUrl">
        <template slot="title">
          <span>{{item.menuName}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item  v-for="(subitem ,sub) in item.menuSubLink"
          :index="subitem.menuUrl"
          :key='sub' >
          <span>{{subitem.menuName}}</span></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
   </el-col>
</div>
</template>

<script>
import { MENU } from "./pageMenu";
export default {
  name: "sidebar",
  data() {
    return {
      menulist: MENU,
      activeNav: "0",
      activePath: " "
    };
  },
  methods: {
    gologin() {
      this.$router.push({ path: "/login" });
    }
  },
  created: function() {
    // this.activePath = "/" + this.$route.path.split("/")[1];
  },
  watch: {
    $route: function() {
      // this.activePath = "/" + this.$route.path.split("/")[1];
    }
  }
};
</script>
<style scoped>
.sidebar {
  height: 100%;
  background-color: #fff;
}
.el-col {
  margin-top: 22px;
  border: 3px solid #0093e6;
  border-radius: 10px;
}
.el-menu-vertical-demo {
  border-radius: 20px;
}
.el-menu-item{
  min-width: 168px;
  border-radius: 8px;
}
.first-menu{
  font-size: 18px !important;
}
</style>
