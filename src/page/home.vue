<template>
 <div class="home">
    <div class="block">
     <el-tag>欢迎来到广汽本田4s汽车销售管理系统</el-tag>
     <el-carousel height="150px">
       <el-carousel-item v-for="item in items" :key="item" interval="300">
         <h3>{{ item.content }}</h3>
       </el-carousel-item>
     </el-carousel>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      items:[
        {
          content:"本系统管理主要为店内人员管理"
        },
        {
          content:"用户身份分别为总经理、销售经理以及销售人员，实现上级对下级的信息管理"
        },
        {
          content:"记录来电、来店以及购车客户的基本信息"
        },
        {
          content:"以及记录购车的车辆信息以及排名"
        },
      ],
    };
  },

};
</script>
<style>
.home {
  margin-top: 50px;
}
.el-tag {
  font-size: 35px;
  background-color: #fff;
  border: none;
  margin-bottom: 50px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
