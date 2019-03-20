
<template>
  <div class="saleInformation">
    <el-tag>汽车销售统计量</el-tag>
    <div class="div-flex" style="text-align:center">
        <div class="chart-tab activecss" id="chart-tab1" @click="Month($event)" ref="Month">当月</div>
        <div class="chart-tab" id="chart-tab2" @click="Year($event)" ref="Year">当年</div>
    </div>
    <div id="myChartMonth" ref="myChartMonth" :style="{width: '350px', height: '350px'}" v-show="monthShow"></div>
    <div id="myChartYear" ref="myChartYear" :style="{width: '350px', height: '350px'}" v-show="yearShow"></div>
    <div class="ranking-month" v-show="monthRank">
      <p>当前销售排名前三：</p>
      <div class="ranking-box">
        <ul class="num">
          <li v-for="(num,index) in nums" :key="index">{{num.n}}</li>
        </ul>
        <ul class="car-ul">
          <li v-for="(car,i) in cars" :key="i">{{car.type}}</li>
        </ul>
      </div>
    </div>
    <div class="ranking-year" v-show="yearRank">
      <p>当前销售排名前三：</p>
      <div class="ranking-box">
        <ul class="num">
          <li v-for="(num,index) in nums" :key="index">{{num.n}}</li>
        </ul>
        <ul class="car-ul">
          <li v-for="(car,i) in carsYear" :key="i">{{car.type}}</li>
        </ul>
      </div>
    </div>
</div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  data() {
    return {
      monthShow: true,
      yearShow: false,
      monthRank: true,
      yearRank:false,
      cars: [
        { type: "奥德赛" },
        { type: "宾智" },
        { type: "飞度" }
        ],
        carsYear: [
        { type: "锋范" },
        { type: "冠道" },
        { type: "飞度" }
        ],
      nums: [
        {n: 1},
        {n: 2},
        {n: 3}
      ]
    };
  },
  mounted() {
    this.$refs.Month.style.background = "#f56c6c";
    this.$refs.Month.style.color = "#fff";
    this.drawMonth();
  },
  methods: {
    drawMonth() {
      const myChartMonth = echarts.init(this.$refs.myChartMonth);
      myChartMonth.setOption({
        grid: {
          left: "3%",
          right: "20%", //距离右侧边距
          bottom: "9%",
          show: true,
          containLabel: true
        },
        tooltip: {},
        xAxis: {
          name: "车型",
          data: [
            "奥德赛",
            "宾智",
            "飞度",
            "锋范",
            "冠道",
            "凌派",
            "雅阁",
            "世锐PHEV"
          ],
          axisLabel: {
            interval: 0,
            rotate: -30
          }
        },
        yAxis: {
          name: "汽车销量"
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: [12, 13, 16, 33, 23, 25, 32, 54],
            itemStyle: {
              normal: {
                color: "#f56c6c"
              }
            }
          }
        ]
      });
    },
    Month: function(e) {
      this.$refs.Year.style.background = "#fff";
      this.$refs.Year.style.color = "#000";
      e.currentTarget.style.background = "#f56c6c";
      e.currentTarget.style.color = "#fff";
      this.yearShow = false;
      this.monthShow = true;
      this.monthRank=true;
      this.yearRank=false;
      this.drawMonth();
    },
    Year: function(e) {
      this.$refs.Month.style.background = "#fff";
      this.$refs.Month.style.color = "#000";
      e.currentTarget.style.background = "#409eef";
      e.currentTarget.style.color = "#fff";
      this.yearShow = true;
      this.monthShow = false;
      this.yearRank=true;
      this.monthRank=false;
      const myChartYear = echarts.init(this.$refs.myChartYear);
      myChartYear.setOption({
        grid: {
          left: "3%",
          right: "20%", //距离右侧边距
          bottom: "9%",
          show: true,
          containLabel: true
        },
        tooltip: {},
        xAxis: {
          name: "车型",
          data: [
            "奥德赛",
            "宾智",
            "飞度",
            "锋范",
            "冠道",
            "凌派",
            "雅阁",
            "世锐PHEV"
          ],
          axisLabel: {
            interval: 0,
            rotate: -30
          }
        },
        yAxis: {
          name: "汽车销量"
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: [33, 54, 22, 54, 23, 65, 34, 17],
            itemStyle: {
              normal: {
                color: "#409eef"
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.saleInformation {
  padding: 10px 15px;
  font-size: 15px;
  color: #737373;
  width: 64%;
  margin: 30px auto;
  position: relative;
}
.el-tag {
  font-size: 35px;
  background-color: #fff;
  border: none;
  margin-bottom: 30px;
}
.chart-tab {
  flex: 1;
  border-top: 1px #dcdcdc solid;
  border-left: 1px #dcdcdc solid;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  width: 100%;
  cursor: pointer;
}

.div-flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  width: 60%;
}
.ranking-month p{
  color: #f56c6c;
  font-size: 18px;
}
.ranking-year p {
  color: #409eff;
  font-size: 18px;
}
.selected {
  background-color: #eaeaea;
}
.ranking-month,.ranking-year {
  position: absolute;
  right: 50px;
  top: 180px;
}
ul {
  list-style: none;
}
.num li {
  width: 20px;
  height: 20px;
  margin-bottom: 10px;
}
.num li:nth-child(1) {
  background: #f54545;
  color: #fff;
}
.num li:nth-child(2) {
  background: #ff8547;
  color: #fff;
}
.num li:nth-child(3) {
  background: #ffac38;
  color: #fff;
}
.ranking-box {
  position: relative;
}
.car-ul {
  position: absolute;
  width: 100px;
  height: 20px;
  top: -15px;
}
.car-ul li {
  margin-bottom: 10px;
}
</style>
