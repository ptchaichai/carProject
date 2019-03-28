<template>
 <div class="home">
    <div class="block">
     <el-tag>欢迎来到广汽本田4s汽车销售管理系统</el-tag>
     <!-- <el-carousel height="150px">
       <el-carousel-item v-for="item in items" :key="item" interval="300">
         <h3>{{ item.content }}</h3>
       </el-carousel-item>
     </el-carousel> -->
     <el-carousel :interval="2000" type="card" height="400px">
       <el-carousel-item v-for="item in imagebox" :key="item.id">
        <img :src="item.idView" class="image">
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
      imagebox:[
        {
          id:0,
          idView:require('../assets/car1.jpg')
        },
        {
          id:1,
          idView:require('../assets/car2.jpg')
        },
        {
          id:2,
          idView:require('../assets/car3.jpg')
        },
        {
          id:3,
          idView:require('../assets/car4.jpg')
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
.block img{
  width: 100%;
  height: 100%;
}
</style>
