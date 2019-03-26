<template>
    <div class="personal">
      <p class="title">个人信息</p>
      <div class="card">
        <div class="base-info">
        <div class="avatar-wrap">
          <img src="../../assets/default.jpg" alt="">
        </div>
        <div class="base-wrap">
        <span class="username">张三</span>
        <div class="bing-info">
          <div class="info-title">
            <p><span>加入时间：</span></p>
            <p><span>电话号码：</span></p>
            <p><span>邮箱：</span></p>
            <p><span>地址：</span></p>
          </div>
          <div class="info-content">
            <p><span>2018-3-2</span></p>
            <p><span>15082345567</span></p>
            <p><span>34123434@163.com</span></p>
            <p><span>深圳市福田区</span></p>
          </div>
        </div>
        </div>
        </div>
        <div class="role">
          <p><span>销售经理</span></p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "personal",
  data() {
    return {
      input1: "",
      input2: "",
      input3: ""
    };
  }
};
</script>

<style scoped>
.personal {
  margin: 0px auto;
  height: 770px;
  background: #fcfcfc;
}
.personal .title {
  text-align: left;
  border-bottom: 1px solid #ccc;
  color: #3a8ee6;
  font-size: 20px;
  font-weight: 700;
}
.card {
  padding: 1px 24px 24px;
  background-color: #fff;
  border-radius: 3px;
  margin: 24px 0;
}
.base-info {
  display: flex;
  padding: 10px 0 0;
  border-bottom: 1px solid #ddd;
}
.avatar-wrap {
  flex: 0 0 auto;
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
  margin: 14px 0;
}
.avatar-wrap img {
  display: block;
  height: 100%;
  width: auto;
}
.base-wrap {
  flex: 1 1 auto;
  margin-left: 20px;
  margin-top: 14px;
  text-align: left;
  padding-left: 50px;
}
.username {
  display: block;
  font-size: 24px;
  line-height: 26px;
  color: #3a8ee6;
  margin: 0;
  margin-top: 4px;
  font-weight: 700;
}
.bing-info {
  margin: 15px 0;
}

.info-title {
  display: inline-block;
  line-height: 25px;
  text-align: right;
}
.info-content {
  display: inline-block;
  line-height: 27px;
  padding-left: 20px;
}
.info-title p {
  color: #3a8ee6;
  font-size: 18px;
}
.info-content p {
  color: #555;
  font-size: 16px;
  font-weight: 400;
}
.role p {
  text-align: right;
  font-size: 24px;
  color: #888;
}
</style>
