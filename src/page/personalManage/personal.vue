<template>
  <div class="personal">
    <p class="title">个人信息</p>
    <div class="card">
      <div class="base-info">
        <div class="avatar-wrap">
          <img src="../../assets/default.jpg" alt>
        </div>
        <div class="base-wrap">
          <span class="username">{{personData.username}}</span>
          <div class="bing-info">
            <div class="info-title">
              <p>
                <span>加入时间：</span>
                <span style="color:#999">{{personData.time}}</span>
              </p>
              <p>
                <span>电话号码：</span>
                <span style="color:#999">{{personData.phone}}</span>
              </p>
              <p>
                <span>性别：</span>
                <span style="color:#999">{{personData.sex ? '男' : '女'}}</span>
              </p>
              <p>
                <span>身份证号：</span>
                <span style="color:#999">{{personData.idcard}}</span>
              </p>
              <p>
                <span>出生日期：</span>
                <span style="color:#999">{{personData.birthday}}</span>
              </p>
              <p>
                <span>邮箱：</span>
                <span style="color:#999">{{personData.email}}</span>
              </p>
              <p>
                <span>地址：</span>
                <span style="color:#999">{{personData.address}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="update-page">
        <span @click="goUpdate">前往修改/完善资料</span>
      </div>
      <div class="role">
        <p>
          <span>{{role}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import API from "./../api.js";
import bus from "./../bus.js";
// import func from './vue-temp/vue-editor-bridge.js';
export default {
  name: "personal",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      role: "",
      personData: {
        username: "", //姓名
        role: "", //角色
        phone: "", //电话
        sex: "", //性别
        time: "", //加入时间
        idcard: "", //身份证号,
        birthday: "", //生日,
        email: "", //邮箱,
        address: "" //地址
      }
    };
  },
  created() {
    this.getPersonalInfo();
  },
  methods: {
    goUpdate() {
      this.$router.push({ path: "/manage/advance/perfect" });
    },
    getPersonalInfo() {
      this.$http.post(API.GET_PERSON, this.qs.stringify({})).then(result => {
        if (result.data.status === 0) {
          this.personData = result.data.data;
          this.personData.time = this.personData.time.substr(0,10);
          // this.personData.birthday = this.personData.birthday.substr(0,10);
          this.getRoleName(this.personData.role);
        } else {
          this.$message.error("请求失败");
        }
      });
    },
    getRoleName(role) {
      switch (+role) {
        case 0:
          this.role = "总经理";
          break;
        case 1:
          this.role = "销售经理";
          break;
        case 2:
          this.role = "销售人员";
          break;
      }
    }
  }
};
</script>

<style scoped>
.personal {
  margin: 0px auto;
  height: 770px;
  background: #fefefe;
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
  display: inline-block;
  width: 82px;
  text-align: right;
}
.bing-info {
  margin: 15px 0;
}

.info-title {
  display: inline-block;
  line-height: 25px;
}
.info-title span:first-child {
  text-align: right;
  width: 90px;
  display: inline-block;
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
.role {
  float: right;
}
.role p {
  text-align: right;
  font-size: 24px;
  color: #888;
}

.update-page {
  float: left;
}
.update-page span {
  font-size: 20px;
  color: #0093e6;
  cursor: pointer;
}
</style>
