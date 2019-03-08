<template>
    <div class="subordinate">
      <el-tag>汽车信息统计量</el-tag>
      <el-table class="car-infor"
    :data="tableData"
    border>
    <el-table-column
      fixed
      prop="type"
      label="信息"
      width="160">
    </el-table-column>
    <el-table-column
      fixed
      prop="date"
      label="当日"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="mouth"
      label="当月"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="quarter"
      label="当季度"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="year"
      label="当年"
      width="100">
    </el-table-column>
  </el-table>
  <el-button  round type="primary" @click="lookCar">点击查看汽车销售排名</el-button>
  <el-table class="quarter-infor"
    :data="carData"
    border v-show="show">
    <el-table-column
      fixed
      prop="type"
      label="汽车类型"
      width="160">
    </el-table-column>
    <el-table-column
      fixed
      prop="date"
      label="当日"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="mouth"
      label="当月"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="quarter"
      label="当季度"
      width="100">
    </el-table-column>
    <el-table-column
      fixed
      prop="year"
      label="当年"
      width="100">
    </el-table-column>
     <el-table-column
      fixed
      prop="ranking"
      label="当前排名"
      width="100">
    </el-table-column>
  </el-table>
  <el-button  round type="primary" @click="close" v-show="show">关闭</el-button>
    </div>
</template>

<script>
export default {
  name: "updatePwd",
  data() {
    return {
      show: false,
      input1: "",
      input2: "",
      input3: "",
      tableData: [
        {
          type: "本田",
          date: "34",
          mouth: "434",
          quarter: "3423",
          year: "5433",
          ranking: "1"
        },
        {
          type: "本田",
          date: "34",
          mouth: "434",
          quarter: "3423",
          year: "5433",
          ranking: "2"
        }
      ],
      carData: [
        {
          type: "本田",
          date: "34",
          mouth: "434",
          quarter: "3423",
          year: "5433",
          ranking: "1"
        },
        {
          type: "本田",
          date: "34",
          mouth: "434",
          quarter: "3423",
          year: "5433",
          ranking: "2"
        }
      ]
    };
  },
  methods: {
    lookCar() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
  }
};
</script>

<style scoped>
.subordinate {
  width: 90%;
  margin: 50px auto;
}
.dialog-box {
  width: 100%;
}
#el-popover-1912 {
  left: 328px !important;
  z-index: 2001;
  width: 60% !important;
  height: 45% !important;
}
.car-infor {
  width: 562px;
  min-width: 554px;
  border: 1px solid #cecece;
  margin: 20px auto;
}
.quarter-infor {
  width: 662px;
  min-width: 662px;
  border: 1px solid #cecece;
  margin: 20px auto;
}

.el-tag {
  font-size: 35px;
  background-color: #fff;
  border: none;
}
.el-button--small {
  margin-left: -10px;
}
.add {
  position: absolute;
  top: 188px;
}
.update {
  margin-right: 20px;
}
.search-form {
  width: 30%;
  margin-top: 30px;
}
</style>
