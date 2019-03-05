<template>
<div class="car">
  <div class="car-left">
    <div class="car-logo">
      <p class="logo-title">汽车内部人员信息管理-<br>销售经理</p>
    </div>
    <div class="car-user">
      <h3 class="user">用户名:</h3>
      <a href="" class="goOut">退出登录</a>
      <h4 class="salesman">销售人员信息管理</h4>
      <h4 class="announcement">公告发布</h4>
      <h4 class="personal">个人信息管理</h4>\
      <router-link to="updatePwd">
          <h4 class="updatePwd">修改密码</h4>
        </router-link>
    </div>
  </div>
  <div class="car-right">
    <img src="../assets/1.1.jpg" alt="">
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    fun () {
      this.$router.push({name:updatePwd});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

  .car-left {
    background: linear-gradient(to bottom right,#999,#666);
    width: 20%;
    height: 100%;
    float: left;
  }

  .car-logo {
    background: linear-gradient(to bottom right,#888,#555);
    height: 80px;
    color: cadetblue;
  }

  .logo-title {
    color: whitesmoke;
    font-size: 20px;
    float: right;
    margin: 20px 28px 0px 5px;
    font-family: "微软雅黑";
  }

  .car-user {
    /*background:linear-gradient(to bottom right,#999,#666);*/
    padding: 30px 0px 20px 20px;
  }

  .user {
    color:whitesmoke;
    font-size: 18px;
    margin-left:20px;

  }

  .goOut {
    text-decoration: none;
    color:#ff0000;
    font-size: 13px;
    margin:5px 0 0 20px;
  }
  .salesman,
  .announcement,
  .personal,
  .updatePwd{
    padding-top: 50px;
    margin: 5px 0px 20px 20px;
    margin: 5px 0px 20px 20px;
    color: antiquewhite;
    background-size: 13%;
    cursor: pointer;
  }
  .car-right{
    width:80%;
    height:100%;
    float:right;
  }

</style>
