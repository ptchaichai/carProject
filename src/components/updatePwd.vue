<template>
  <div class="box">
    <h1 class="title">修改密码</h1>
    <button type="button" class="close" id="close">关闭</button>
      <div class="box-th">
        <p>旧密码</p>
        <input type="password" name="oldPwd" placeholder="请输入旧密码:"  id="oldPwd" class="oldPwd" required="required"/>
      </div>
      <div class="box-th">
        <p>新密码</p>
        <input type="password" name="newPwd" placeholder="请输入新密码:" id="newPwd" class="newPwd" required="required"/>
      </div>
      <div class="box-th">
        <p>确认密码</p>
        <input type="password" name="cnewPwd"  placeholder="请确认密码，必须与新密码一致" id="cnewPwd" class="cnewPwd" required="required"/>
      </div>
      <input type="submit" name="submit"class="submit" id="submit"value="提交"  />
  </div>
</template>

<script>
    export default {
        name: "updatePwd"
    }
</script>

<style scoped>
  body {
    width: 100%;
    height: 100%;
    background: linear-gradient(140deg,#F8F8F8,#A0A0A0)
  }

  .close{
    float:right;
    border:none;
    font-size:12px;
    width:60px;
    background:linear-gradient(170deg,#F8F8F8,#3399bb);
    padding:3px;
  }

  .title {

    color:#3399bb;
    padding: 10px 20px;
  }

  .box {
    width: 60%;
    height: 50%;
    background:linear-gradient(160deg, #d6d7d8, #999);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

  }

  .box-th {
    width: 60%;
    margin-top: 4%;
    margin-left: 18%;
    height: 40px;
    background: #e3e8ee;
  }

  .box-th p {
    width: 20%;
    height: 100%;
    color: #3399cc;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    line-height: 40px;
    float: left;
  }

  .box-th input {
    border: none;
    width: 80%;
    height: 100%;
    outline: none;
    float: left;
    text-align: center;
    background: whitesmoke;
  }

  .submit {
    width:15%;
    height: 30px;
    margin-top: 30px;
    margin-left: 40%;
    border: none;
    background: linear-gradient(160deg,#F8F8F8,#3375ff);
    margin-top: 20px;
    color: aliceblue;
  }
</style>
