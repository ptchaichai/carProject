<template>
  <div class="saleInformation">
    <p>销售信息统计量</p>
    <div class="div-flex" style="text-align:center">
      <div class="chart-tab" id="chart-tab0" @click="Day($event, 0)" ref="Day">当日</div>
      <div class="chart-tab activecss" id="chart-tab1" @click="Month($event,1)" ref="Month">当月</div>
      <div class="chart-tab" id="chart-tab2" @click="Quarter($event, 2)" ref="Quarter">当季度</div>
      <div class="chart-tab" id="chart-tab3" @click="Year($event, 3)" ref="Year">当年</div>
    </div>
    <div class="chart">
      <div id="myChartDay" ref="myChartDay" :style="{width: '400px', height: '400px'}" v-show="dayShow"></div>
      <div id="myChartMonth" ref="myChartMonth" :style="{width: '400px', height: '400px'}" v-show="monthShow"></div>
      <div id="myChartQuarter" ref="myChartQuarter" :style="{width: '400px', height: '400px'}" v-show="quarterShow">
      </div>
      <div id="myChartYear" ref="myChartYear" :style="{width: '400px', height: '400px'}" v-show="yearShow"></div>
    </div>
  </div>
</template>

<script>
  import API from "./api.js";
  // 引入基本模板
  let echarts = require("echarts/lib/echarts");
  // 引入柱状图组件
  require("echarts/lib/chart/bar");
  // 引入提示框和title组件
  require("echarts/lib/component/tooltip");
  require("echarts/lib/component/title");
  export default {
    name: "hello",
    data() {
      return {
        dayShow: true,
        monthShow: false,
        quarterShow: false,
        yearShow: false,
        data: []
      };
    },
    mounted() {
      this.$refs['Day'].style.background = "#f56c6c";
      this.$refs['Day'].style.color = "#fff";
    },
    created() {
      this.getCount(0, '#f56c6c', 'myChartDay');
    },
    methods: {
      getCount(data, currentColor, charyDay) {
        const param = {
          type: data
        }
        this.$http.post(API.STATICS_SALE, this.qs.stringify(param)).then(res => {
          if (res.data.status === 0) {
            this.data = res.data.data.count;
            this.drawDay(this.data, currentColor, charyDay);
          } else {
            this.$message.error("获取失败");
          }
        });
      },
      drawDay(row, currentColor, charyDay) {
        const myChartDay = echarts.init(this.$refs[charyDay]);
        myChartDay.setOption({
          grid: {
            left: "3%",
            right: "20%", //距离右侧边距
            bottom: "9%",
            show: true,
            containLabel: true
          },
          tooltip: {},
          xAxis: {
            name: "类型",
            data: ["来电客户量", "来店客户量", "购车客户量"],
            axisLabel: {
              interval: 0,
              rotate: -30
            }
          },
          yAxis: {
            name: "统计数量"
          },
          series: [
            {
              name: "销量",
              type: "bar",
              data: row,
              itemStyle: {
                normal: {
                  color: currentColor
                }
              }
            }
          ]
        });
      },
      Day: function (e, type) {
        this.$refs.Month.style.background = "#fff";
        this.$refs.Month.style.color = "#000";
        this.$refs.Quarter.style.background = "#fff";
        this.$refs.Quarter.style.color = "#000";
        this.$refs.Year.style.background = "#fff";
        this.$refs.Year.style.color = "#000";
        e.currentTarget.style.background = "#f56c6c";
        e.currentTarget.style.color = "#fff";
        this.dayShow = true;
        this.quarterShow = false;
        this.yearShow = false;
        this.monthShow = false;
        this.getCount(type, '#f56c6c', 'myChartDay');
      },
      Month: function (e, type) {
        this.$refs.Day.style.background = "#fff";
        this.$refs.Day.style.color = "#000";
        this.$refs.Quarter.style.background = "#fff";
        this.$refs.Quarter.style.color = "#000";
        this.$refs.Year.style.background = "#fff";
        this.$refs.Year.style.color = "#000";
        e.currentTarget.style.background = "#e6a23c";
        e.currentTarget.style.color = "#fff";
        this.dayShow = false;
        this.quarterShow = false;
        this.yearShow = false;
        this.monthShow = true;
        const myChartMonth = echarts.init(this.$refs.myChartMonth);
        this.getCount(type, '#e6a23c', 'myChartMonth');
      },
      Quarter: function (e, type) {
        this.$refs.Day.style.background = "#fff";
        this.$refs.Day.style.color = "#000";
        this.$refs.Month.style.background = "#fff";
        this.$refs.Month.style.color = "#000";
        this.$refs.Year.style.background = "#fff";
        this.$refs.Year.style.color = "#000";
        e.currentTarget.style.background = "#67c23a";
        e.currentTarget.style.color = "#fff";
        this.dayShow = false;
        this.quarterShow = true;
        this.yeardayShow = false;
        this.monthShow = false;
        const myChartQuarter = echarts.init(this.$refs.myChartQuarter);
        this.getCount(type, '#67c23a', 'myChartQuarter');
      },
      Year: function (e, type) {
        this.$refs.Day.style.background = "#fff";
        this.$refs.Day.style.color = "#000";
        this.$refs.Month.style.background = "#fff";
        this.$refs.Month.style.color = "#000";
        this.$refs.Quarter.style.background = "#fff";
        this.$refs.Quarter.style.color = "#000";
        e.currentTarget.style.background = "#409eef";
        e.currentTarget.style.color = "#fff";
        this.dayShow = false;
        this.quarterShow = false;
        this.yearShow = true;
        this.monthShow = false;
        const myChartYear = echarts.init(this.$refs.myChartYear);
        this.getCount(type, '#409eef', 'myChartYear');
      }
    }
  };
</script>

<style scoped>
  .saleInformation {
    margin: 0px auto;
    height: 770px;
    background: #fcfcfc;
  }

  .saleInformation p {
    text-align: left;
    border-bottom: 1px solid #ccc;
    color: #3a8ee6;
    font-size: 20px;
    font-weight: 700;
  }

  .chart {
    flex: 1 1 1 auto;
  }

  .activecss {
    background: #fff;
    color: #000;
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
    margin-top: 80px;
  }

  .selected {
    background-color: #eaeaea;
  }
</style>