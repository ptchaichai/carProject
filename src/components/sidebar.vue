<template>
  <div class="sidebar">
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
  export default {
    name: "sidebar",
    data() {
      return {
        activeNav: "0",
        activePath: " ",
        menulist:[
          {
            menuName: '主页',
            menuUrl: '/home',
            menuIndex: '0'
          },
          {
            menuName: '个人信息管理',
            menuUrl: '/personal',
            menuIndex: '1',
            menuSubLink: [
              {
                menuName: '个人信息',
                menuUrl: '/information',
                menuIndex: '1-1'
              },
              {
                menuName: '修改密码',
                menuUrl: '/updatePwd',
                menuIndex: '1-2'
              },
              {
                menuName: '信息管理',
                menuUrl: '/subordinate',
                menuIndex: '1-3'
              },
            ]
          },
          {
            menuName: '客户信息管理',
            menuUrl: '/ client',
            menuIndex: '2',
            menuSubLink: [
              {
                menuName: '来电客户',
                menuUrl: '/callClient',
                menuIndex: '2-1'
              },
              {
                menuName: '来店客户',
                menuUrl: '/comeClient',
                menuIndex: '2-2'
              },
              {
                menuName: '购车客户',
                menuUrl: '/buyClient',
                menuIndex: '2-3'
              },
            ]
          },
          {
            menuName: '销售信息管理',
            menuUrl: '/saleInformation',
            menuIndex: '3'
          },
          {
            menuName: '汽车信息管理',
            menuUrl: '/carInformation',
            menuIndex: '4'
          },
          {
            menuName: '测试',
            menuUrl: '/test',
            menuIndex: '5'
          },
        ]
      };
    },
    methods: {
      gologin() {
        this.$router.push({ path: "/login" });
      }
    },
  };
</script>
<style scoped>
  .sidebar {
    height: 100%;
    background-color: #fff;
  }
  .el-menu-vertical-demo {
    /* border-radius: 20px; */
    border:1px solid #0093e6
  }
  .first-menu{
    font-size: 18px !important;
  }
  .el-submenu__title span{
    font-size: 18px;
  }
  .el-menu{
    margin-top: 35px;
  }
  .el-menu-item {
  min-width: 174px !important;
  }
</style>
