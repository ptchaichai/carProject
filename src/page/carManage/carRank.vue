<template>
  <div class="carInformation">
    <p>汽车销售统计量</p>
    <div class="div-flex" style="text-align:center">
      <div class="chart-tab activecss" id="chart-tab1" @click="Month($event,1)" ref="Month">当月</div>
      <div class="chart-tab" id="chart-tab2" @click="Year($event,3)" ref="Year">当年</div>
    </div>
    <div id="myChartMonth" ref="myChartMonth" :style="{width: '350px', height: '350px'}" v-show="monthShow"></div>
    <div id="myChartYear" ref="myChartYear" :style="{width: '350px', height: '350px'}" v-show="yearShow"></div>
    <div class="ranking-month" v-show="monthRank">
      <p>当前销售排名为：</p>
      <div class="ranking-box">
        <ul class="num">
          <li v-for="(num,index) in nums" :key="index">{{num.n}}</li>
        </ul>
        <ul class="car-ul">
          <li v-for="(car,i) in sortCars" :key="i">{{car.label}}</li>
        </ul>
      </div>
    </div>
    <div class="ranking-year" v-show="yearRank">
      <p>当前销售排名为：</p>
      <div class="ranking-box">
        <ul class="num">
          <li v-for="(num,index) in nums" :key="index">{{num.n}}</li>
        </ul>
        <ul class="car-ul">
          <li v-for="(car,i) in sortCars" :key="i">{{car.label}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import API from "./../api.js";
  // 引入基本模板
  let echarts = require("echarts/lib/echarts");
  // 引入柱状图组件
  require("echarts/lib/chart/bar");
  // 引入提示框和title组件
  require("echarts/lib/component/tooltip");
  require("echarts/lib/component/title");
  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return y-x;
    })
  }
  export default {
    data() {
      return {
        monthShow: true,
        yearShow: false,
        monthRank: true,
        yearRank: false,
        // cars: [],
        // carsYear: [{ type: "雅阁" }, { type: "锋范" }, { type: "飞度" }, { type: "凌派" }, { type: "奥德赛" }, { type: "宾智" },],
        nums: [{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }, { n: 6 }],
        cars: [
          // { label: "雅阁",number: 2},
          // { label: "飞度" ,number:1},
          // { label: "宾智" ,number:3},
          // { label: "凌派" ,number:1},
          // { label: "锋范" ,number:1},
          // { label: "奥德赛" ,number:2},

        ]
      };
    },
    mounted() {
      this.$refs.Month.style.background = "#f56c6c";
      this.$refs.Month.style.color = "#fff";
    },
    created() {
      this.getCount(1, '#f56c6c', 'myChartMonth');
    },
    computed: {
      sortCars: function () {
        return sortByKey(this.cars, 'number')
      }
    },
    methods: {
      getCount(data, currentColor, charyMonth) {
        const param = {
          type: data,
        }
        this.$http.post(API.STATICS_CAR, this.qs.stringify(param)).then(res => {
          if (res.data.status === 0) {
            this.data = res.data.data;
            this.cars = this.data;
            const arr = [];
            for (let i = 0; i < this.data.length; i += 1) {
              arr.push(this.data[i].number);
            }
            this.drawMonth(arr, currentColor, charyMonth);
          } else {
            this.$message.error("获取失败");
          }
        });
      },
      drawMonth(row, currentColor, charyMonth) {
        const myChartMonth = echarts.init(this.$refs[charyMonth]);
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
            data: ["奥德赛", "宾智", "飞度", "锋范", "凌派", "雅阁"],
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
              data: row,
              itemStyle: {
                normal: {
                  color: currentColor,
                }
              }
            }
          ]
        });
      },
      Month: function (e, type) {
        this.$refs.Year.style.background = "#fff";
        this.$refs.Year.style.color = "#000";
        this.$refs.Month.style.background = "#f56c6c";
        this.$refs.Month.style.color = "#fff";
        this.yearShow = false;
        this.monthShow = true;
        this.monthRank = true;
        this.yearRank = false;
        const myChartMonth = echarts.init(this.$refs.myChartMonth);
        this.getCount(type, '#f56c6c', 'myChartMonth');
      },
      Year: function (e, type) {
        this.$refs.Month.style.background = "#fff";
        this.$refs.Month.style.color = "#000";
        this.$refs.Year.style.background = "#409eef";
        this.$refs.Year.style.color = "#fff";
        this.yearShow = true;
        this.monthShow = false;
        this.yearRank = true;
        this.monthRank = false;
        const myChartYear = echarts.init(this.$refs.myChartYear);
        this.getCount(type, '#409eef', 'myChartYear');
      }
    }
  };

</script>

<style scoped>
  .carInformation {
    margin: 0px auto;
    height: 770px;
    background: #fefefe;
  }

  .carInformation p {
    text-align: left;
    border-bottom: 1px solid #ccc;
    color: #3a8ee6;
    font-size: 20px;
    font-weight: 700;
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
    margin-top: 80px;
  }

  .ranking-month p {
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

  .ranking-month,
  .ranking-year {
    position: absolute;
    left: 75%;
    top: 180px;
  }

  ul {
    list-style: none;
  }

  .num li {
    width: 20px;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
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

  .num li:nth-child(4),
  .num li:nth-child(5),
  .num li:nth-child(6) {
    background: #8eb9f5;
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
    line-height: 20px;
  }
</style>