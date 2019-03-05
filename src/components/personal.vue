<template>
    <div class="box">
      <h1>个人信息</h1>
      <table class="list">
        <th colspan="7">
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

          </td>
        </tr>
      </table>
    </div>
</template>

<script>
    export default {
        name: "personal"
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

  h1 {
    background-color: whitesmoke;
    color: #3399bb;
    padding: 10px 0px 10px 30px;
  }

  .list {
    width: 100%;
    text-align: center;
    padding: 30px;
    position: relative;
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

  .update{
    border: none;
    font-size: 15px;
    padding: 5px 0px;
    width: 30%;
    cursor: pointer;
    background:linear-gradient(160deg,#F8F8F8,#3399bb);
  }


</style>
