<template>
    <div class="subordinate">
      <el-tag>客户信息统计量</el-tag>
      <div class="subordinate-box">
      <div class="time-choose">
      <el-row class="tac">
       <el-col :span="12">
       <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>日期</span>
        </template>
        <el-menu-item-group>
          <el-menu-item >当日</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group >
          <el-menu-item >昨日</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>月份</span>
        </template>
        <el-menu-item-group>
          <el-menu-item >当月</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group >
          <el-menu-item >前一个月</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>季度</span>
        </template>
        <el-menu-item-group>
          <el-menu-item >当季度</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group >
          <el-menu-item >前一个季度</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>年份</span>
        </template>
        <el-menu-item-group>
          <el-menu-item >当年</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group >
          <el-menu-item >前一年</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    </el-col>
   </el-row>
</div>
<div class="num-show">
       <div class="call">
        <div class="container">
          <div class="call-show">
            <el-form>
              <el-form-item label="来电客户信息量:" prop="name">
              <el-input v-model="callNum" readonly="readonly" ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
       </div>
        <div class="come">
        <div class="container">
          <div class="come-show">
            <el-form>
              <el-form-item label="来店客户信息量:" prop="name">
              <el-input v-model="comeNum" readonly="readonly" ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
       </div>
        <div class="buy">
        <div class="container">
          <div class="buy-show">
            <el-form>
              <el-form-item label="购车客户信息量:" prop="name">
              <el-input v-model="buyNum" readonly="readonly" ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
       </div>
       </div>
       </div>
    </div>
</template>

<script>
export default {
  name: "updatePwd",
  data() {
      return {
        callNum:" ",
        comeNum:" ",
        buyNum:" ",
      };
    }
};
</script>

<style scoped>
.subordinate {
  width: 80%;
  margin: 50px auto;
}
.subordinate-box{
  display:flex;
  width: 50%;
  margin: 0 auto;
}
.el-tag {
  font-size: 35px;
  background-color: #fff;
  border: none;
}
.tac{
  width:288px;
}
.el-submenu__title{
  font-size: 16px;
  color: #0093e6;
}
.el-menu-item{
  min-width: 143px;
}
.time-choose{
  width: 40%;
  margin-top: 50px;
}
.num-show{
  width:50%;
}
.container{
  margin-top:50px;
  width: 100%;
}
.el-form{
  margin-left: 140px;
}
.el-form-item{
  width: 130px;
}
</style>
