<template>
  <div class="subordinateManager">
    <p>销售经理信息管理</p>
    <div class="search-add">
      <div class="box">
        <div class="search-input">
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
                <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入电话"></el-input>
              </el-form-item>
              <el-form-item label="分区" prop="subarea" style="margin-bottom:5px">
                <el-select v-model="ruleForm.subarea" placeholder="请选择分区" class="role-select">
                  <el-option v-for="item in rolesArea" :label="item.label" :key="item.id" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-button round type="primary" class="addInformation" @click="addInformation('ruleForm')">确定</el-button>
              <el-button round type="info" class="addCancel" @click="addCancel('ruleForm')">取消</el-button>
            </el-form>
          </div>
        </el-dialog>
        <el-button type="primary" size="small" round class="add" @click="add">添加</el-button>
      </div>
    </div>
    <el-table :data="tableData" ref="multipleTable" border :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column label="序号" type="index" show-overflow-tooltip width="50" align="center"></el-table-column>
      <el-table-column prop="username" label="姓名" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="phone" label="电话" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="store_id" label="所属分区" min-width="15%" align="center">
        <template slot-scope="scop1">
          {{getStoreName(scop1.row.store_id)}}
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色" min-width="15%" align="center">
        <template slot-scope="scop">
          销售经理
        </template>
      </el-table-column>
      <el-table-column prop="add_time" label="加入时间" min-width="15%" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="25%" align="center">
        <template slot-scope="scope">
          <el-button slot="reference" type="primary" size="small" round class="update" @click="update(scope.$index)">
            修改
          </el-button>
          <el-button @click="deleteRow(scope.$index)" type="info" size="small" round>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="totalCount" :page-count="page" :page-size.sync="pageSize"
      :current-page.sync="page" @size-change="getPersionList()" @current-change="getPersionList()"
      @prev-click="getPersionList()" @next-click="getPersionList()">
    </el-pagination>
    <el-dialog title="警告！" :visible.sync="dialogDelete" width="30%">
      <i class="el-icon-warning"></i>
      <span>是否要删除本条信息？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="removeConfirm()" round>确 定</el-button>
        <el-button @click="dialogDelete = false" round>取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改信息" :visible.sync="dialogUpdate" width="50%">
      <el-form :model="updateForm" :rules="rulesUpdate" ref="updateForm">
        <el-form-item label="分区" prop="subarea" style="margin-bottom:5px">
          <el-select v-model="updateForm.subarea" placeholder="请选择分区" class="role-select">
            <el-option v-for="item in rolesArea" :label="item.label" :key="item.id" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="updateConfirm('updateForm')" round>确 定</el-button>
      <el-button @click="updateCancel('updateForm')" round>取 消</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import API from './../api.js'
  import { isvalidPhone } from "./../valid";
  import { isvalidEmail } from "./../valid";
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
  const validEmail = (rule, value, callback) => {
    if (!value) {
      callback(new Error("请输入邮箱"));
    } else if (!isvalidEmail(value)) {
      callback(new Error("请输入正确邮箱格式"));
    } else {
      callback();
    }
  };
  export default {
    name: "subordinateManager",
    components: {
      // verifyPassWordTip
    },
    data() {
      return {
        page: 1, //页码
        pageSize: 10, //一条默认页数
        searchName: 'username', //搜索的条件，
        totalCount: 0,
        searchData: "", //搜索的名字
        tableData: [],
        password: "",
        newTableData: [],
        dialogDelete: false,
        dialogUpdate: false,
        dialogAdd: false,
        rowVal: "",
        currentIndex: "",
        isShowTip: false,
        deleteVal: "",
        roles: [
          { label: "销售经理", id: 1, value: "销售经理" },
          { label: "销售人员", id: 2, value: "销售人员" }
        ],
        rolesArea: AREA,
        updateForm: {
          subarea: ""
        },
        ruleForm: {
          subarea: "",
        },
        rules: {
          name: [
            { required: true, message: "请输入姓名", trigger: "blur" },
            { min: 2, max: 4, message: "请输入 2 到 4 个字符", trigger: "blur" }
          ],
          subarea: [{ required: true, message: "请选择分区", trigger: "blur" }],
          phone: [{ required: true, trigger: "blur", validator: validPhone }],
        },
        rulesUpdate: {
          subarea: [{ required: true, message: "请选择分区", trigger: "blur" }],
        },
        multipleSelection: [],
      };
    },
    created() {
      this.getPersionList()
    },
    methods: {
      handleCommand(command) {
        this.$refs.dropLink.innerText = command;
      },
      //获取列表
      getPersionList() {
        const params = {
          role: sessionStorage.getItem('role'),
          page: this.page,
          page_size: this.pageSize,
          search_idx: this.searchName,
          search_value: this.searchData
        }
        this.$http.post(API.GET_MANAGER_LIST, this.qs.stringify(params)).then((result) => {
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
      //获取分区的名字
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
      // 搜索table
      search: function () {
        this.page = 1;
        this.pageSize = 10;
        this.getPersionList();
      },
      add: function () {
        this.dialogAdd = true;
      },
      addInformation: function (ruleForm) {
        const form = {
          username: this.ruleForm.name,
          phone: this.ruleForm.phone,
          store_id: this.ruleForm.subarea,
          role: 1,
        };
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            this.$http
              .post(API.ADD_ACCOUNT, this.qs.stringify(form))
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
                  this.dialogAdd = false;
                  this.$message.error("添加失败");
                }
              });
          } else {
            this.$message.error("添加失败");
            return false;
          }
        });
      },
      addCancel: function (ruleForm) {
        this.$refs[ruleForm].resetFields();
        this.dialogAdd = false;
      },
      //修改
      update: function (index) {
        this.currentIndex = index;
        this.updateForm.subarea = this.tableData[index].store_id;
        this.dialogUpdate = true;
      },
      //修改经理信息
      updateConfirm: function (updateForm) {
        const params = {
          subarea: this.updateForm.subarea,
          id: this.tableData[this.currentIndex].id
        }
        this.$http.post(API.UPDATE_MANAGER, this.qs.stringify(params)).then((result) => {
          if (result.data.status === 0) {
            this.$message.success("修改成功");
            this.getPersionList()
            this.currentIndex = null;
            this.dialogUpdate = false;
          } else {
            this.$message.error("修改失败");
          }
        })
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
      //删除经理信息
      removeConfirm: function () {
        const params = {
          id: this.tableData[this.currentIndex].id
        }
        this.$http.post(API.DEL_MANAGER, this.qs.stringify(params)).then((result) => {
          if (result.data.status === 0) {
            if (this.tableData.length === 1 && this.page > 1) {
              this.page = 1;
            }
            this.getPersionList();
            this.$message.success("删除成功");
          } else {
            this.$message.error("删除失败");
          }
          this.dialogDelete = false;
        })
      }
    }
  };
</script>

<style scoped>
  .subordinateManager {
    margin: 0px auto;
    height: 770px;
    background: #fefefe;
  }

  .subordinateManager p {
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

  .search-input {
    width: 400px;
  }

  .el-table {
    width: 90%;
    margin: 25px auto;
  }

  .drop-type {
    position: absolute;
    z-index: 1;
    top: 9px;
    left: 7px;
  }

  .el-input__inner {
    padding-left: 66px;
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

  .search-icon {
    position: absolute;
    top: 8px;
    font-size: 25px;
    color: #999;
    right: 8px;
  }

  .search-form {
    width: 340px;
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