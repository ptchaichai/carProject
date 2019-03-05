<template>
  <div class="car">
    <div class="car-logo">
      <p class="logo-title">汽车内部人员信息管理-<br>销售经理</p>
    </div>
    <div class="car-user">
      <h3 class="user">用户名:</h3>
      <a href="" class="goOut">退出登录</a>
      <h4 class="salesman" @click="goSalesMan">销售人员信息管理</h4>
      <h4 class="announcement">公告发布</h4>
      <h4 class="personal">个人信息管理</h4>
      <router-link to="updatePwd">
        <h4 class="updatePwd">修改密码</h4>
      </router-link>
    </div>
  </div>
  <!--<v-sidebar></v-sidebar>-->
</template>

<script>
  export default {
    name: "sManagerSidebar",
    methods:{
      goSalesMan() {
        this.$router.push('/c');
      }
    }
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  .car {
    background: linear-gradient(to bottom right,#999,#666);
    width: 16%;

    height: 580px;

    float: left;

    border: 2px solid #0988AD;

    border-radius: 5px;

    min-width: 220px;
  }

  .car-logo {
    /*background: linear-gradient(to bottom right,#888,#555);*/
    height: 80px;
    color: cadetblue;
    background: #199FA9;
  }

  .logo-title {
    color: whitesmoke;
    font-size: 17px;
    float: right;
    margin: 20px 28px 0px 5px;
    font-family: "微软雅黑";
  }

  .car-user {
    /*background:linear-gradient(to bottom right,#999,#666);*/
    padding: 30px 0px 20px 20px;
    background:#7ca7a7;
    height: 449px;
  }

  .user {
    color:whitesmoke;
    font-size: 18px;

  }

  .goOut {
    text-decoration: none;
    color:#ff0000;
    font-size: 13px;
    margin:5px 0 0 0px;
  }
  .salesman,
  .announcement,
  .personal,
  .updatePwd{
    padding-top: 39px;
    margin: 5px 0px 20px 0px;
    color: antiquewhite;
    background-size: 13%;
    cursor: pointer;
  }
  .salesman:hover{
    color: #0988AD;
  }
  .announcement:hover{
    color: #0988AD;
  }
  .personal:hover{
    color: #0988AD;
  }
  .updatePwd:hover{
    color: #0988AD;
  }

</style>
