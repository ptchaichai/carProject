<template>
  <div class="call-client">
    <p>来店客户信息管理</p>
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
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入电话"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="address">
                <el-input v-model="ruleForm.address" placeholder="请输入地址"></el-input>
              </el-form-item>
              <el-form-item label="关注车型" prop="shape">
                <el-select v-model="ruleForm.shape" placeholder="请选择车型" class="select-input">
                  <el-option v-for="item in roles" :label="item.label" :key="item.id" :value="item.value"></el-option>
                </el-select>
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
      <el-table-column prop="label" label="类型" min-width="15%" align="center">
        <template slot-scope="scop">
          {{scop.row.label == 0 ? '来电客户': (scop.row.label == 1 ? '来店客户' : '购车客户')}}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="phone" label="电话" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="20%" align="center"></el-table-column>
      <el-table-column prop="address" label="地址" min-width="20%" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="shape" label="关注车型" min-width="25%" align="center"></el-table-column>
      <el-table-column prop="user_name" label="处理人" min-width="23%" align="center">
        <template slot-scope="scop">
          <span>{{scop.row.user_name}}</span>(<span>{{scop.row.user_phone}}</span>)
        </template>
      </el-table-column>
      <el-table-column prop="add_time" label="添加时间" min-width="20%" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="35%" align="center" v-if="showAdd">
        <template slot-scope="scope">
          <el-button slot="reference" type="primary" size="small" round class="update" @click="update(scope.row)" v-show="(scope.row.user_id == nowId ? true :false)">修改
          </el-button>
          <el-button @click="deleteRow(scope.row)" type="info" size="small" round v-show="(scope.row.user_id == nowId ? true :false)">删除</el-button>
          <span v-show="(scope.row.user_id == nowId ? false:true)">暂无权限</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection(tableData)">全选</el-button>
      <el-button @click="toggleSelection()" :disabled="multipleSelection.length == 0">取消选择</el-button>
    </div>
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
        <el-form-item label="电话" prop="phone">
          <el-input v-model="updateForm.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="updateForm.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="关注车型" prop="shape">
          <el-select v-model="updateForm.shape" placeholder="请选择车型" class="select-input">
            <el-option v-for="item in roles" :label="item.label" :key="item.id" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="updateConfirm('updateForm')" round>确 定</el-button>
      <el-button @click="updateCancel('updateForm')" round>取 消</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import { isvalidPhone } from "./../valid";
  import { isvalidEmail } from "./../valid";
  import API from "./../api.js";
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
    name: "callClient",
    data() {
      return {
        showAdd: false,
        searchName: 'username', //搜索的条件
        searchData: "", //搜索的名字
        multipleSelection: [],
        searchData: "",
        dialogDelete: false,
        dialogUpdate: false,
        dialogAdd: false,
        inputName: "",
        rowVal: "",
        nowId:"",
        delID:"",
        currentIndex: "",
        currentIndex: "",
        tableData: [],
        totalCount: 0,
        roles: [
          { label: "奥德赛", value: "奥德赛" },
          { label: "宾智", value: "宾智" },
          { label: "飞度", value: "飞度" },
          { label: "锋范", value: "锋范" },
          { label: "凌派", value: "凌派" },
          { label: "雅阁", value: "雅阁" }
        ],
        ruleForm: {
          name: "",
          phone: "",
          email: "",
          address: "",
          carType: ""
        },
        rules: {
          name: [
            { required: true, message: "请输入姓名", trigger: "blur" },
            { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
          ],
          address: [
            { required: true, message: "请输入地址", trigger: "blur" },
            { min: 2, max: 40, message: "长度在 2 到 40 个字符", trigger: "blur" }
          ],
          phone: [{ required: true, trigger: "blur", validator: validPhone }],
          email: [{ required: true, trigger: "blur", validator: validEmail }],
          carType: [
            { required: true, message: "请选择价格意愿", trigger: "blur" }
          ]
        },
        updateForm: {
          name: "",
          phone: "",
          email: "",
          address: "",
          carType: ""
        },
        rulesUpdate: {
          name: [
            { required: true, message: "请输入姓名", trigger: "blur" },
            { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
          ],
          address: [
            { required: true, message: "请输入地址", trigger: "blur" },
            { min: 2, max: 40, message: "长度在 2 到 40 个字符", trigger: "blur" }
          ],
          phone: [{ required: true, trigger: "blur", validator: validPhone }],
          email: [{ required: true, trigger: "blur", validator: validEmail }],
          carType: [
            { required: true, message: "请选择价格意愿", trigger: "blur" }
          ]
        },
        tablephone: []
      };
    },
    created() {
      let role = sessionStorage.getItem("role");
      this.nowId = sessionStorage.getItem("id");
      if (+role === 0 || +role === 1) {
        this.showAdd = false;
      } else if (+role === 2) {
        this.showAdd = true;
      }
      this.getCustomList()
    },
    methods: {
      //获取列表
      getCustomList() {
        const params = {
          page: this.page,
          page_size: this.pageSize,
          search_idx: this.searchName,
          search_value: this.searchData,
          label: 1
        }
        this.$http.post(API.GET_CUSTOM, this.qs.stringify(params)).then((result) => {
          if (result.data.status === 0) {
            this.tableData = result.data.data.map((item) => {
              item.add_time = item.add_time.substr(0, 10);
              return item;
            });
            this.totalCount = result.data.count;
          } else {
            this.$message.error("获取失败");
          }
        })
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
          return "background-color: #409eff; color: #fff; font-weight: 500; border:none;";
        }
      },
      search: function () {
        const val = this.searchData;
        if (val !== "") {
          const form = {
            searchVal: val
          };
          this.$http.post("api/searchCome", this.qs.stringify(form)).then(res => {
            if (res.data.status === 0) {
              this.tableData = res.data;
            } else {
              this.$message.error("搜索失败");
            }
          });
        }
      },
      add: function () {
        this.dialogAdd = true;
      },
      addConfirm: function (ruleForm) {
        const form = {
          name: this.ruleForm.name,
          phone: this.ruleForm.phone,
          email: this.ruleForm.email,
          address: this.ruleForm.address,
          shape: this.ruleForm.shape,
          label: 1,
          user_name: sessionStorage.getItem("name"),
          user_id: sessionStorage.getItem("id"),
          user_phone: sessionStorage.getItem("phone"),
        };
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            this.$http.post(API.ADD_CUSTOM, this.qs.stringify(form)).then(res => {
              if (res.data.status === 0) {
                this.$refs[ruleForm].resetFields();
                this.dialogAdd = false;
                this.$message.success("添加成功");
                this.getCustomList()
              } else {
                this.$message.error("添加失败，号码已存在！");
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
        this.updateForm.phone = row.phone;
        this.updateForm.email = row.email;
        this.updateForm.address = row.address;
        this.updateForm.shape = row.shape;
        this.dialogUpdate = true;
      },
      updateConfirm: function (updateForm) {
        const form = {
          id:this.rowVal,
          phone: this.updateForm.phone,
          email: this.updateForm.email,
          address: this.updateForm.address,
          shape: this.updateForm.shape,
        };
        this.$refs[updateForm].validate(valid => {
          if (valid) {
            this.$http
              .post(API.UPDATE_CUSTOM, this.qs.stringify(form))
              .then(res => {
                if (res.data.status === 0) {
                  this.dialogUpdate = false;
                  this.$message.success("修改成功");
                  this.getCustomList()
                } else {
                  this.$message.error("修改失败，号码已存在！");
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
      deleteRow: function (row) {
        this.delID = row.id;
        this.dialogDelete = true;
      },
      removeConfirm: function () {
        const form = {
          id: this.delID
        };
        this.$http.post(API.DEL_CUSTOM, this.qs.stringify(form)).then(res => {
          if (res.data.status === 0) {
            this.dialogDelete = false;
            this.$message.success("删除成功");
            this.getCustomList()
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
    width: 95%;
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
    width: 95%;
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

  .select-input {
    width: 100%;
    margin-bottom: 20px;
  }
</style>