<template>
  <div class="sidebar">
    <el-col :span="24">
      <el-menu
        :default-active="activePath"
        class="el-menu-vertical-demo"
        router>
        <el-menu-item class="first-menu" v-for="(item ,i) in menulist"
                       v-if="!item.menuSubLink"
                      :index="item.menuUrl"
                      :key="i">
          <span slot="title" class="first-menu">{{item.menuName}}</span>
        </el-menu-item>
        <el-submenu  v-else class="first-menu"
                     :index="item.menuUrl">
          <template slot="title">
            <span class="first-menu">{{item.menuName}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item  v-for="(subitem ,sub) in item.menuSubLink"
                           :index="subitem.menuUrl"
                           :key='sub'
                            v-show="subitem.show">
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
            menuUrl: '/manage/home',
            menuIndex: '0'
          },
          {
            menuName: '个人信息管理',
            menuUrl: '/manage/personalManage',
            menuIndex: '1',
            menuSubLink: [
              {
                menuName: '个人信息',
                menuUrl: '/manage/personalManage/personal',
                menuIndex: '1-1',
                show: true
              },
              {
                menuName: '销售经理信息管理',
                menuUrl: '/manage/personalManage/subordinateManager',
                menuIndex: '1-3',
                show: false
              },
              {
                menuName: '销售人员信息管理',
                menuUrl: '/manage/personalManage/subordinate',
                menuIndex: '1-3',
                show: false
              },
            ]
          },
          {
            menuName: '客户信息管理',
            menuUrl: '/manage/clientManage',
            menuIndex: '2',
            menuSubLink: [
              {
                menuName: '来电客户',
                menuUrl: '/manage/clientManage/callClient',
                menuIndex: '2-1',
                show: true
              },
              {
                menuName: '来店客户',
                menuUrl: '/manage/clientManage/comeClient',
                menuIndex: '2-2',
                show: true
              },
              {
                menuName: '购车客户',
                menuUrl: '/manage/clientManage/buyClient',
                menuIndex: '2-3',
                show: true
              },
            ]
          },
          {
            menuName: '销售信息管理',
            menuUrl: '/manage/saleInformation',
            menuIndex: '3'
          },
          {
            menuName: '汽车信息管理',
            menuUrl: '/manage/carManage',
            menuIndex: '4',
            menuSubLink:[
              {
                menuName: '汽车信息',
                menuUrl: '/manage/carManage/carInformation',
                menuIndex: '4-1',
                show: true
              },
              {
                menuName: '汽车销售排名',
                menuUrl: '/manage/carManage/carRank',
                menuIndex: '4-2',
                show: true
              }
            ]
          },
          {
            menuName: '高级设置',
            menuUrl: '/manage/advance',
            menuIndex: '5',
            menuSubLink: [
              {
                menuName: '修改资料',
                menuUrl: '/manage/advance/perfect',
                menuIndex: '5-1',
                show: true
              },
              {
                menuName: '修改密码',
                menuUrl: '/manage/advance/updatePwd',
                menuIndex: '5-2',
                show: true
              },
            ]
          },
        ]
      };
    },
    created (){
      let role = sessionStorage.getItem('role');
      if(+role === 0) {
        this.menulist[1].menuSubLink[1].show = true
        this.menulist[1].menuSubLink[2].show = true
      } else if(+role === 1) {
         this.menulist[1].menuSubLink[2].show = true
      }
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
    height: 792px;
    border-right: 2px solid #0093e6;
    background: #fafafa;
    border-radius: 10px;
  }
  .el-menu-vertical-demo {
    background: #fafafa;
  }
  .first-menu{
    font-size: 18px !important;
    color:#3a8ee6;
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
  .el-menu-item span{
    /* color:#3a8ee6; */
  }
  .el-submenu__title span{
    /* color:#3a8ee6; */
  }
  .el-menu-item-group span{
    /* color:#777; */
  }
</style>
