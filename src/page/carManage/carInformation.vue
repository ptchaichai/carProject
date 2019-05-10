<template>
  <div class="call-client">
    <p>汽车销售信息</p>
    <div class="search-add">
      <div class="box">
        <div class="search-input" style="width:400px">
          <el-input placeholder="请输入内容" v-model="searchData" class="input-with-select">
            <el-select v-model="searchName" slot="prepend" placeholder="类型" style="width: 80px;">
              <el-option label="姓名" value="username"></el-option>
              <el-option label="电话" value="phone"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <el-dialog title="添加信息" :visible.sync="dialogAdd" width="50%">
          <div class="dialog-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item label="编号" prop="car_id">
                <el-input v-model="ruleForm.car_id" placeholder="请输入编号"></el-input>
              </el-form-item>
              <el-form-item label="车型" prop="shape">
                <el-select v-model="ruleForm.shape" placeholder="请选择车型" class="carType">
                  <el-option v-for="item in roles" :label="item.label" :key="item.id" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="颜色" prop="color">
                <el-input v-model="ruleForm.color" placeholder="请输入颜色"></el-input>
              </el-form-item>
              <el-form-item label="是否上架" prop="status">
                <el-radio-group v-model="ruleForm.status">
                  <el-radio :label="0">上架</el-radio>
                  <el-radio :label="1">下架</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="价格(万元)" prop="price">
                <el-input v-model="ruleForm.price" placeholder="请输入价格"></el-input>
              </el-form-item>
              <el-button round type="primary" class="addInformation" @click="addConfirm('ruleForm')">确定</el-button>
              <el-button round type="info" class="cancelInformation" @click="addCancel('ruleForm')">取消</el-button>
            </el-form>
          </div>
        </el-dialog>
        <el-button type="primary" size="small" round class="add" @click="add" v-show="showAdd">添加</el-button>
      </div>
    </div>
    <el-table :data="tableData" ref="multipleTable" border :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column label="序号" type="index" show-overflow-tooltip width="50" align="center"></el-table-column>
      <el-table-column prop="car_id" label="编号" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="shape" label="型号" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="price" label="价格(万元)" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="color" label="颜色" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="add_time" label="添加时间" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" min-width="15%" align="center">
        <template slot-scope="scop">
          <span style="color:#67c23a" v-show="scop.row.status == 0">已上架</span>
          <span style="color:#f56c6c" v-show="scop.row.status == 1">已下架</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="20%" align="center" v-if="showAdd">
        <template slot-scope="scope">
          <el-button slot="reference" type="primary" size="small" round class="update" @click="update(scope.row)"
            v-show="scope.row.status == 0 ? true:false">修改
          </el-button>
          <el-button slot="reference" type="danger" size="small" round class="drop" @click="drop(scope.row)"
            v-show="scope.row.status == 0 ? true:false">下架
          </el-button>
          <el-button slot="reference" type="success" size="small" round class="drop" @click="shelf(scope.row)"
            v-show="scope.row.status == 1 ? true:false">上架
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection(tableData)">全选</el-button>
      <el-button @click="toggleSelection()" :disabled="multipleSelection.length == 0">取消选择</el-button>
    </div>
    <el-dialog title="警告！" :visible.sync="dialogDrop" width="30%">
      <i class="el-icon-warning"></i>
      <span>是否要将该车下架，下架之后不能进行操作？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dropConfirm()" round>确 定</el-button>
        <el-button @click="dialogDrop = false" round>取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示！" :visible.sync="dialogShelf" width="30%">
      <i class="el-icon-warning"></i>
      <span>是否要将该车上架？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="shelfConfirm()" round>确 定</el-button>
        <el-button @click="dialogShelf = false" round>取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改信息" :visible.sync="dialogUpdate" width="50%">
      <el-form :model="updateForm" :rules="rulesUpdate" ref="updateForm">
        <el-form-item label="价格(万元)" prop="price">
          <el-input v-model="updateForm.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-input v-model="updateForm.color" placeholder="请输入颜色"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="updateConfirm('updateForm')" round>确 定</el-button>
      <el-button @click="updateCancel('updateForm')" round>取 消</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import API from './../api.js'
  import { isvalidPrice } from "./../valid";
  const checkPrice = (rule, value, callback) => {
    if (!value) {
      callback(new Error("请输入价格"));
    } else if (!isvalidPrice(value)) {
      return callback(new Error("输入不能为空，且最多三位小数"));
    } else {
      callback();
    }
  };
  export default {
    name: "callClient",
    data() {
      return {
        showAdd: "",
        searchName: 'username', //搜索的条件
        searchData: "", //搜索的名字
        totalCount: 0,
        page: 1, //页码
        pageSize: 10, //一条默认页数
        multipleSelection: [],
        dialogDrop: false,
        dialogShelf: false,
        dialogUpdate: false,
        dialogAdd: false,
        checked: false,
        viewShow: false,
        searchData: "",
        reason: "",
        inputName: "",
        rowVal: "",
        currentIndex: "",
        currentIndex: "",
        tableData: [],
        reasonText: "",
        dropID: "",
        shelfID: "",
        roles: [
          { label: "奥德赛", value: "奥德赛" },
          { label: "宾智", value: "宾智" },
          { label: "飞度", value: "飞度" },
          { label: "锋范", value: "锋范" },
          { label: "凌派", value: "凌派" },
          { label: "雅阁", value: "雅阁" }
        ],
        ruleForm: {
          car_id: "",
          shape: "",
          color: "",
          price: "",
          status: 0
        },
        rules: {
          car_id: [
            { required: true, message: "请输入编号", trigger: "blur" },
            { min: 2, max: 10, message: "请输入 2 到 10 个字符", trigger: "blur" }
          ],
          shape: [{ required: true, trigger: "blur", message: "请选择车型" }],
          color: [
            { required: true, message: "请输入颜色", trigger: "blur" },
            { min: 1, max: 10, message: "请输入 1 到 10 个字符", trigger: "blur" }
          ],
          price: [{ required: true, trigger: "blur", validator: checkPrice }]
        },
        updateForm: {
          color: "",
          price: "",
        },
        rulesUpdate: {
          color: [
            { required: true, message: "请输入颜色", trigger: "blur" },
            { min: 1, max: 10, message: "请输入 1 到 10 个字符", trigger: "blur" }
          ],
          price: [{ required: true, trigger: "blur", validator: checkPrice }]
        },
        tableTel: []
      };
    },
    created() {
      this.getCarList();
      let role = sessionStorage.getItem("role");
      if (+role === 0) {
        this.showAdd = true;
      } else if (+role === 2 || +role === 1) {
        this.showAdd = false;
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      getCarList() {
        const params = {
          page: this.page,
          page_size: this.pageSize,
          search_idx: this.searchName,
          search_value: this.searchData
        }
        this.$http.post(API.GET_CARLIST, this.qs.stringify(params)).then((result) => {
          if (result.data.status === 0) {
            this.tableData = result.data.data.map((item) => {
              item.add_time = item.add_time.substr(0, 10);
              return item;
            });
            this.totalCount = result.data.count;
          } else {
            this.$message.error("获取列表失败");
          }
        })
      },
      handleSelectionChange(val) {
        //val 为选中数据的集合
        this.multipleSelection = val;
      },
      edit: function () {
        this.reasonEdit = true;
      },
      // 修改table tr行的背景色
      tableRowStyle({ row, rowIndex }) {
        if (rowIndex / 2 === 0) {
          return "background-color: #fff";
        } else {
          return "background-color: #f9f9f9";
        }
      },
      // 修改table header的背景色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return "background-color: #409eff; color: #fff; font-weight: 500; border:none;";
        }
      },
      search: function () {
        const val = this.searchData;
        if (val !== "") {
          const form = {
            searchVal: val
          };
          this.$http.post("api/searchCall", this.qs.stringify(form)).then(res => {
            if (res.data.status === 0) {
              this.tableData = res.data;
            } else {
              this.$message.error("搜索失败");
            }
          });
        }
      },
      drop: function (row) {
        this.dialogDrop = true;
        this.dropID = row.id;
      },
      dropConfirm: function () {
        // const date = new Date();
        // const year = date.getFullYear();
        // const month = date.getMonth() + 1;
        // const day = date.getDate();
        // const nowDate = year + '-' +month +'-'+ day;
        const form = {
          id: this.dropID,
          status: 1,
          // shelftime: 0,
          // droptime: nowDate,
        }
        this.$http.post(API.UPDATE_STATUS, this.qs.stringify(form)).then(res => {
          if (res.data.status === 0) {
            this.dialogDrop = false;
            this.$message.success("修改成功");
            this.getCarList();
          } else {
            this.$message.error("修改失败");
          }
        });
      },
      shelf: function (row) {
        this.dialogShelf = true;
        this.shelfID = row.id;
      },
      shelfConfirm: function () {
        // const date = new Date();
        // const year = date.getFullYear();
        // const month = date.getMonth() + 1;
        // const day = date.getDate();
        // const nowDate = year + '-' +month +'-'+ day;
        const form = {
          id: this.shelfID,
          status: 0,
          // droptime: 0,
          // shelftime: nowDate,
        }
        this.$http.post(API.UPDATE_STATUS, this.qs.stringify(form)).then(res => {
          if (res.data.status === 0) {
            this.dialogShelf = false;
            this.$message.success("修改成功");
            this.getCarList();
          } else {
            this.$message.error("修改失败");
          }
        });
      },
      add: function () {
        this.dialogAdd = true;
      },
      addConfirm: function (ruleForm) {
        const form = {
          ...this.ruleForm
        };
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            this.$http.post(API.ADD_CAR, this.qs.stringify(form)).then(res => {
              if (res.data.status === 0) {
                this.$refs[ruleForm].resetFields();
                this.dialogAdd = false;
                this.$message.success("添加成功");
                this.getCarList();
              } else {
                this.$message.error("添加失败,汽车编号不能重复！");
              }
            });
          } else {
            return false;
          }
        });
      },
      addCancel: function (ruleForm) {
        this.$refs[ruleForm].resetFields();
        this.dialogAdd = false;
      },
      update: function (row) {
        this.rowVal = row.id;
        this.updateForm.color = row.color
        this.updateForm.price = row.price;
        this.dialogUpdate = true;
      },
      updateConfirm: function (updateForm) {
        const form = {
          id: this.rowVal,
          price: this.updateForm.price,
          color: this.updateForm.color,
        };
        this.$refs[updateForm].validate(valid => {
          if (valid) {
            this.$http
              .post(API.UPDATE_CAR, this.qs.stringify(form))
              .then(res => {
                if (res.data.status === 0) {
                  this.dialogUpdate = false;
                  this.$message.success("修改成功");
                  this.getCarList();
                } else {
                  this.$message.error("修改失败");
                }
              });
          } else {
            return false;
          }
        });
      },
      updateCancel: function (updateForm) {
        this.$refs[updateForm].resetFields();
        this.dialogUpdate = false;
      },
      deleteRow: function (index) {
        this.dialogDelete = true;
        this.currentIndex = index;
      },
      removeConfirm: function () {
        const form = {
          id: this.id
        };
        this.$http.post("api/deleteCall", this.qs.stringify(form)).then(res => {
          if (res.data.status === 0) {
            this.tableData.splice(this.currentIndex, 1);
            this.dialogDelete = false;
            this.$message.success("删除成功");
          } else {
            this.$message.error("删除失败");
          }
        });
      }
    }
  };
</script>

<style scoped>
  .call-client {
    margin: 0px auto;
    height: 770px;
    background: #fefefe;
  }

  .dialog-box {
    width: 100%;
  }

  .el-table {
    width: 90%;
    border: 1px solid #cecece;
    margin: 30px auto;
  }

  .call-client p {
    text-align: left;
    border-bottom: 1px solid #ccc;
    color: #3a8ee6;
    font-size: 20px;
    font-weight: 700;
  }

  .el-button--small {
    margin-left: -10px;
  }

  .box {
    width: 90%;
    margin: 0 auto;
  }

  .add {
    float: right;
    margin-top: -36px;
    height: 32px;
  }

  .search-form {
    width: 265px;
    margin-top: 30px;
    position: relative;
  }

  .search {
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .update {
    margin-right: 20px;
  }

  .el-icon-warning {
    color: red;
  }

  .carType {
    width: 100%;
    margin-bottom: 20px;
  }

  .el-date-editor {
    width: 100%;
  }

  .reason-span {
    font-size: 10px;
    color: red;
    cursor: pointer;
  }

  .carType {
    margin: -10px 0 -10px;
  }
</style>