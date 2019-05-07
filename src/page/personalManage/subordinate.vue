<template>
  <div class="subordinate">
    <p>销售人员信息管理</p>
    <div class="search-add">
      <div class="box">
        <div class="search-input" style="width:400px">
          <el-input placeholder="请输入内容" v-model="searchData" class="input-with-select">
            <el-select v-model="searchName" slot="prepend" placeholder="类型" style="width: 80px;">
              <el-option label="姓名" value="username"></el-option>
              <el-option label="电话" value="phone"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
        <el-dialog title="添加信息" :visible.sync="dialogAdd" width="50%">
          <div class="dialog-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入电话"></el-input>
              </el-form-item>
              <el-button round type="primary" class="addInformation" @click="addInformation('ruleForm')">确定</el-button>
              <el-button round type="info" class="addCancel" @click="addCancel('ruleForm')">取消</el-button>
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
      <el-table-column prop="username" label="姓名" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="phone" label="电话" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="subarea" label="所属分区" min-width="15%" align="center">
        <template slot-scope="scop1">
          {{getStoreName(scop1.row.store_id)}}
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色" min-width="15%" align="center">
        <template slot-scope="scop">
          销售人员
        </template>
      </el-table-column>
      <el-table-column prop="add_time" label="加入时间" min-width="15%" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="25%" align="center">
        <template slot-scope="scope" >
          <el-button slot="reference" type="primary" size="small" round class="update" @click="update(scope.$index)" v-show="showUp">修改
          </el-button>
          <el-button @click="deleteRow(scope.$index)" type="info" size="small" round v-show="showDel">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="totalCount" :page-count="page" :page-size.sync="pageSize"
      :current-page.sync="page" @size-change="getPersionList()" @current-change="getPersionList()"
      @prev-click="getPersionList()" @next-click="getPersionList()">
    </el-pagination>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection(tableData)">全选</el-button>
      <el-button @click="toggleSelection()" :disabled="multipleSelection.length == 0">取消选择</el-button>
    </div>
    <el-dialog title="警告！" :visible.sync="dialogDelete" width="30%">
      <i class="el-icon-warning"></i>
      <span>请确认该员工已离职，并且客户已经转交给其他人,否则客户将丢失，严重影响到业绩？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="removeConfirm()" round>确 定</el-button>
        <el-button @click="dialogDelete = false" round>取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改信息" :visible.sync="dialogUpdate" width="50%">
      <el-form :model="updateForm" :rules="rulesUpdate" ref="updateForm">
        <el-form-item label="分区" prop="subarea">
          <el-select v-model="updateForm.subarea" placeholder="请选择分区" class="role-select">
            <el-option v-for="item in rolesArea" :label="item.label" :key="item.id" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="updateConfirm('updateForm')" round>确 定</el-button>
        <el-button @click="updateCancel('updateForm')" round>取 消</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import API from "./../api.js";
  import { isvalidPhone } from "./../valid";
  import { AREA } from '../area'
  const validPhone = (rule, value, callback) => {
    if (!value) {
      callback(new Error("请输入电话号码"));
    } else if (!isvalidPhone(value)) {
      callback(new Error("请输入正确的11位手机号码"));
    } else {
      callback();
    }
  };
  export default {
    name: "subordinate",
    components: {
      // verifyPassWordTip
    },
    data() {
      return {
        showUp: false,
        showDel: false,
        showAdd: false,
        page: 1, //页码
        pageSize: 10, //一条默认页数
        searchName: "username", //搜索的条件
        searchData: "", //搜索的名字
        tableData: [], //数据
        password: "",
        newTableData: [],
        dialogDelete: false,
        dialogUpdate: false,
        dialogAdd: false,
        rowVal: "",
        totalCount: 0,
        currentIndex: "",
        isShowTip: false,
        deleteVal: "",
        updateForm: {
          subarea: "",
        },
        ruleForm: {
          name: "",
          phone: "",
        },
        rolesArea: AREA,
        rules: {
          name: [
            { required: true, message: "请输入姓名", trigger: "blur" },
            { min: 2, max: 4, message: "请输入 2 到 4 个字符", trigger: "blur" }
          ],
          phone: [{ required: true, trigger: "blur", validator: validPhone }],
        },
        rulesUpdate: {
          subarea: [{ required: true, message: "请选择分区", trigger: "blur" }],
        },
        multipleSelection: []
      };
    },
    created() {
      this.getPersionList();
      let role = sessionStorage.getItem("role");
      if (+role === 0) {
        this.showUp = true;
      } else if (+role === 1) {
        this.showDel= true;
        this.showAdd = true;
      }
    },

    methods: {
       // 全选
       toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        //val 为选中数据的集合
        this.multipleSelection = val;
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
          return "background-color: #409eff; color: #fff; font-weight: 500;";
        }
      },
      //获取列表
      getPersionList() {
        const params = {
          role: sessionStorage.getItem("role"),
          page: this.page,
          page_size: this.pageSize,
          search_idx: this.searchName,
          search_value: this.searchData,
          store_id: sessionStorage.getItem("storeID"),
        };
        this.$http
          .post(API.GET_PERSON_LIST, this.qs.stringify(params))
          .then(result => {
            if (result.data.status === 0) {
              this.tableData = result.data.data.map((item) => {
                item.add_time = item.add_time.substr(0, 10);
                return item;
              });
              console.log(this.tableData);
              this.totalCount = result.data.count;
            } else {
              this.$message.error("获取列表失败");
            }
          });
      },
      // 搜索table
      search: function () {
        this.page = 1;
        this.pageSize = 10;
        this.getPersionList();
       },
      // 获取分区名
      getStoreName(id) {
        if (id >= 0) {
          let store = this.rolesArea.find((item) => {
            return +item.value === +id
          })
          return store.label;
        } else {
          return '暂无分配'
        }
      },
      add: function () {
        this.dialogAdd = true;
      },
      addInformation: function (ruleForm) {
        const params = {
          username: this.ruleForm.name,
          phone: this.ruleForm.phone,
          store_id: sessionStorage.getItem("storeID"),
          role: 2,
        };
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            this.$http
              .post(API.ADD_ACCOUNT, this.qs.stringify(params))
              .then(res => {
                if (res.data.status === 0) {
                  this.tableData = res.data;
                  this.$refs[ruleForm].resetFields();
                  this.dialogAdd = false;
                  this.$message.success("添加成功");
                  this.page = 1;
                  this.pageSize = 10;
                  this.getPersionList();
                } else {
                  this.$message.error(res.data);
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
      update: function (index) {
        this.currentIndex = index;
        this.updateForm.subarea = this.tableData[index].store_id;
        this.dialogUpdate = true;
      },
      updateConfirm: function (updateForm) {
        const params = {
          subarea: this.updateForm.subarea,
          id: this.tableData[this.currentIndex].id
        }
        this.$refs[updateForm].validate(valid => {
          if (valid) {
            this.$http
              .post(API.UPDATE_PERSON, this.qs.stringify(params))
              .then(res => {
                if (result.data.status === 0) {
                  this.$message.success("修改成功");
                  this.getPersionList()
                  this.currentIndex = null;
                  this.dialogUpdate = false;
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
        this.currentIndex = null;
        this.$refs[updateForm].resetFields();
        this.dialogUpdate = false;
      },
      deleteRow: function (index) {
        this.dialogDelete = true;
        this.currentIndex = index;
      },
      removeConfirm: function () {
        const params = {
          id: this.tableData[this.currentIndex].id
        }
        this.$http.post(API.DEL_PERSON, this.qs.stringify(params)).then((result) => {
          if (result.data.status === 0) {
            if (this.tableData.length === 1 && this.page > 1) {
              this.page = 1;
            }
            this.getPersionList();
            this.$message.success("删除成功");
          } else {
            this.$message.error(result.data.data);
          }
          this.dialogDelete = false;
        })
      }
    }
  };
</script>

<style scoped>
  .subordinate {
    margin: 0px auto;
    height: 770px;
    background: #fefefe;
  }

  .subordinate p {
    text-align: left;
    border-bottom: 1px solid #ccc;
    color: #3a8ee6;
    font-size: 20px;
    font-weight: 700;
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

  .el-table {
    width: 90%;
    margin: 25px auto;
  }

  .el-table__row td {
    text-align: center;
  }

  .role p {
    width: 32px;
  }

  .has-gutter tr th {
    background: #0093e6 !important;
    color: #fff !important;
    text-align: center !important;
  }

  .el-button--small {
    margin-left: -10px;
  }

  .box {
    width: 90%;
    margin: 10px auto;
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

  .update {
    margin-right: 20px;
  }

  .search {
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .el-dialog {
    border-radius: 10px;
  }

  .el-icon-warning {
    color: red;
  }

  .role-select {
    width: 100%;
    margin-bottom: 20px;
  }
</style>