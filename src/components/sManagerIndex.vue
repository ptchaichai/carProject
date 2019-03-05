<template>
  <div class="box">
  <h1>销售经理信息</h1>
  <table class="list">
    <th colspan="7">
      <form action="" method="post">
        <input type="text" name="uName" id="search-input" class="search-input" />
        <input type="submit" class="search-submit" value="搜索" />
      </form>
    </th>
    <tr class="tr-title">
      <th>名称</th>
      <th>联系方式</th>
      <th>Email</th>
      <th>操作</th>
    </tr>
    <tr class="tr-value">
      <th>名称</th>
      <th>联系方式</th>
      <th>Email</th>
      <td>
        <button class="update" id="update">修改</button>
        <button class="delete" id="delete">删除</button>
      </td>
    </tr>
  </table>

  <button class="add" id="add">增加</button>
  <div class="add-box">
    <button class="close" id="close">关闭</button>
    <form action="" method="post" id="form">
      <div class="box-th">
        <p>名称</p>
        <input type="text" name="uName" id="uName" class="uName" />
      </div>
      <div class="box-th">
        <p>联系方式</p>
        <input type="text" name="phone" id="phone" class="phone" />
      </div>
      <div class="box-th">
        <p>Email</p>
        <input type="text" name="email" id="email" class="email" />
      </div>
      <input type="submit" class="submit" value="提交" />
    </form>
  </div>
  </div>
</template>

<script>
    export default {
        name: "sManagerIndex"
    }
</script>

<style scoped>
  * {
    margin: 0px;
    padding: 0px;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    background: linear-gradient(160deg,#F8F8F8,#B0B0B0);
  }
  .box{
    width: 100%;
    margin-left: 236px;
  }

  h1 {
    background-color: whitesmoke;
    color: #3399bb;
    padding: 10px 0px 10px 30px;
    width: 1070px;
  }

  .list {
    width: 100%;
    text-align: center;
    padding: 30px;
    position: relative;
    width: 1106px;
  }

  .tr-title {
    background: lightsteelblue;
    color: darkslategray;
  }

  .tr-title td {
    padding: 5px 0px;
  }

  .tr-value {
    background: whitesmoke;
    color: slategray;
  }

  .tr-value td {
    padding: 5px 0px;
  }

  .tr-value:hover {
    color: whitesmoke;
    background: lightsteelblue;
  }

  .search-input {
    width: 25%;
    height: 20px;
    margin-bottom: 10px;
    padding: 2px;
    border: 1px solid darkslategray;
  }

  .search-submit {
    border: none;
    width: 5%;
    height: 25px;
    background: linear-gradient(160deg,#F8F8F8,#3399bb);
  }

  .add-box {
    max-width: 45%;
    height: 50%;
    background: linear-gradient(160deg, #F8F8F8, #B0B0B0);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    box-shadow: 0 0 100px #333333;
    display: none;
    z-index: 99;
    border-radius: 4px;
  }

  .box-shadow {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: none;
    /*  */
    z-index: 98;
  }

  .box-th {
    width: 70%;
    height: 40px;
    margin-top: 4%;
    margin-left: 15%;
    background: aliceblue;
  }

  .box-th input {
    border: none;
    width: 75%;
    height: 100%;
    float: left;
    text-align: center;
    border-radius: 5px;
  }

  .box-th p {
    float: left;
    width: 25%;
    text-align: center;
    line-height: 40px;
    color: darkslateblue;
    border-radius: 5px;
  }

  .submit {
    border: none;
    width: 70%;
    margin-left: 15%;
    height: 35px;
    margin-top: 25px;
    font-size: 15px;
    background: linear-gradient(160deg,#F8F8F8,#3375ff);
  }

  .shaw {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    margin: auto;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    z-index: 98;
  }

  .add {
    /*边框 */
    border: none;
    /*背景颜色*/
    background:linear-gradient(160deg,#F8F8F8,#3399bb);
    /*宽高*/
    width: 5%;
    height: 25px;
    /*字体大小*/
    font-size: 15px;
    /*定位*/
    position: fixed;

    margin-top: 50px;
  }

  #close {
    border: none;
    background:linear-gradient(160deg,#F8F8F8,#3399bb);
    width: 65px;
    font-size: 15px;
    float: right;
    margin-top: 15px;
    padding: 3px;
  }

  .update,
  .delete {
    border: none;
    font-size: 15px;
    padding: 5px 0px;
    width: 30%;
    cursor: pointer;
  }

  .update {
    background:linear-gradient(160deg,#F8F8F8,#3399bb);
  }

  .delete {
    background: linear-gradient(160deg,#F8F8F8,#cc0000);
  }
</style>
