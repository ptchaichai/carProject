<template>
    <div class="subordinate">
      <el-tag>客户信息统计量</el-tag>
       <div class="call">
        <div class="container">
          <div class="call-show">
            <el-form>
              <el-form-item label="来电客户信息量:" prop="name">
              <el-input v-model="callNum" readonly="readonly" ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="call-block">
            <span class="demonstration">选择日期</span>
            <el-date-picker
              v-model="value1"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
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
          <div class="come-block">
            <span class="demonstration">选择日期</span>
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
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
          <div class="buy-block">
            <span class="demonstration">选择日期</span>
            <el-date-picker
              v-model="value3"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions3">
            </el-date-picker>
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
        pickerOptions1: {
          shortcuts: [ {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        pickerOptions2: {
         shortcuts: [ {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        pickerOptions3: {
          shortcuts: [ {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: " ",
        value2: " ",
        value3: " ",
        callNum:" ",
        comeNum:" ",
        buyNum:" ",
      };
    }
};
</script>

<style scoped>
.subordinate {
  width: 870px;
  margin: 50px auto;
}
.el-tag {
  font-size: 35px;
  background-color: #fff;
  border: none;
}
.container{
  margin-top:50px;
  width: 800px;
}
.el-form{
  margin-left: 140px;
}
.el-form-item{
  width: 130px;
}
.call-block{
   float: right;
    height: 40px;
    margin-top: -62px;
}
.come-block{
   float: right;
    height: 40px;
    margin-top: -62px;
}
.buy-block{
   float: right;
    height: 40px;
    margin-top: -62px;
}
</style>
