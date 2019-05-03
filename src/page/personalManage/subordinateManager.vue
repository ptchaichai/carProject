<template>
  <div class="subordinateManager">
    <p>销售经理信息管理</p>
    <div class="search-add">
      <div class="box">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-dialog title="添加信息" :visible.sync="dialogAdd" width="50%">
          <div class="dialog-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item label="账号" prop="account">
                <el-input v-model="ruleForm.account" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="tel">
                <el-input v-model="ruleForm.tel" placeholder="请输入电话"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="分区" prop="subarea" style="margin-bottom:5px">
                <el-select v-model="ruleForm.subarea" placeholder="请选择分区">
                  <el-option v-for="item in rolesArea" :label="item.label" :key="item.id" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="角色" prop="role">
                <el-select v-model="ruleForm.role" placeholder="请选择角色">
                  <el-option v-for="(item,id) in roles" :label="item.label" :key="item.id" :value="item.value">
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
      <el-table-column prop="account" label="账号" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="tel" label="电话" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="subarea" label="所属分区" min-width="15%" align="center"></el-table-column>
      <!-- <el-table-column prop="pwd" label="密码" min-width="20%" align="center"></el-table-column> -->
      <el-table-column prop="role" label="角色" min-width="15%" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="25%" align="center">
        <template slot-scope="scope">
          <el-button slot="reference" type="primary" size="small" round class="update" @click="update(scope.$index)">修改
          </el-button>
          <el-button @click="deleteRow(scope.$index)" type="info" size="small" round>删除</el-button>
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
        <el-form-item label="账号" prop="account">
          <el-input v-model="updateForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="updateForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="updateForm.tel" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateForm.eamil" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="分区" prop="subarea" style="margin-bottom:5px">
          <el-select v-model="updateForm.subarea" placeholder="请选择分区">
            <el-option v-for="item in rolesArea" :label="item.label" :key="item.id" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="updateForm.role" placeholder="请选择角色">
            <el-option v-for="(item,id) in roles" :label="item.label" :key="item.id" :value="item.value">
            </el-option>
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
        searchName: 'username', //搜索的条件
        searchData: "", //搜索的名字
        // tableData: [], //数据
        tableData: [
          // {
          //   account: '01',
          //   name: 'jack',
          //   tel: '13545656521',
          //   subarea: '罗湖区',
          //   role: '销售经理',
          // },
          // {
          //   account: '02',
          //   name: '周猛',
          //   tel: '13567655623',
          //   subarea: '南山区',

          //   role: '销售经理',
          // },
          {
            account: '03',
            name: '张康影',
            tel: '15655678652',
            subarea: '龙华区',

            role: '销售经理',
          },
          // {
          //   account: '04',
          //   name: '李平',
          //   tel: '13655487562',
          //   subarea: '龙岗区',
          //   role: '销售经理',
          // },
          {
            account: '05',
            name: '张华',
            tel: '13659866562',
            subarea: '龙岗区',
            role: '销售经理',
          },
        ],
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
        rolesArea: [
          { label: "福田区", id: 1, value: "福田区" },
          { label: "南山区", id: 2, value: "南山区" },
          { label: "罗湖区", id: 2, value: "罗湖区" },
          { label: "龙华区", id: 2, value: "龙华区" },
          { label: "龙岗区", id: 2, value: "龙岗区" },
          { label: "宝安区", id: 2, value: "宝安区" },
        ],
        updateForm: {
          account: "",
          name: "",
          tel: "",
          email: "",
          address: "",
          role: ""
        },
        ruleForm: {
          account: "",
          name: "",
          tel: "",
          email: "",
          subarea: "",
          role: ""
        },
        rules: {
          account: [
            { required: true, message: "请输入账号", trigger: "blur" },
            { min: 1, max: 20, message: "请输入 1 到 20 个字符", trigger: "blur" }
          ],
          name: [
            { required: true, message: "请输入姓名", trigger: "blur" },
            { min: 2, max: 4, message: "请输入 2 到 4 个字符", trigger: "blur" }
          ],
          subarea: [{ required: true, message: "请选择分区", trigger: "blur" }],
          tel: [{ required: true, trigger: "blur", validator: validPhone }],
          email: [{ required: true, trigger: "blur", validator: validEmail }],
          role: [{ required: true, message: "请选择角色", trigger: "blur" }]
        },
        rulesUpdate: {
          account: [
            { required: true, message: "请输入账号", trigger: "blur" },
            { min: 1, max: 20, message: "请输入 1 到 20 个字符", trigger: "blur" }
          ],
          name: [
            { required: true, message: "请输入姓名", trigger: "blur" },
            { min: 2, max: 4, message: "请输入 2 到 4 个字符", trigger: "blur" }
          ],
          subarea: [{ required: true, message: "请选择分区", trigger: "blur" }],
          tel: [{ required: true, trigger: "blur", validator: validPhone }],
          email: [{ required: true, trigger: "blur", validator: validEmail }],
          role: [{ required: true, message: "请选择角色", trigger: "blur" }]
        },
        multipleSelection: [],
      };
    },
    created() {
      this.getPerssionList()
    },

    methods: {
      handleCommand(command) {
        // this.$message('click on item ' + command);
        this.$refs.dropLink.innerText = command;
      },
      //获取列表
      getPerssionList() {
        const params = {
          role: sessionStorage.getItem('role'),
          page: this.page,
          page_size: this.pageSize,
          search_idx: this.searchName,
          search_value: this.searchData
        }
        this.$http.post(API.GET_PERSON_LIST, this.qs.stringify(params)).then((result) => {
          if (result.data.status === 0) {
            this.tableData = result.data.data;
          } else {
            this.$message.error("登录失败");
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
          return "background-color: #409eff; color: #fff; font-weight: 500;";
        }
      },
      // 输入密码判断
      // changePasswordTip(isShow) {
      //   if (isShow) {
      //     this.isShowTip = true;
      //   } else {
      //     this.isShowTip = false;
      //   }
      // },
      // 搜索table
      search: function () {
        const val = this.searchData;
        if (val !== "") {
          const form = {
            searchVal: val
          };
          this.$http
            .post("api/searchsubordinateManager", this.qs.stringify(form))
            .then(res => {
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
      addInformation: function (ruleForm) {
        const form = {
          username: this.ruleForm.name,
          phone: this.ruleForm.tel,
          role: this.ruleForm.role
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
                } else {
                  this.$message.error("添加失败");
                }
              });
            this.tableData.push(form);
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
      update: function (index) {
        // const thisData = this.tableData[index].data;
        // this.updateForm.account = thisData.account;
        // this.updateForm.name = thisData.name;
        // this.updateForm.tel = thisData.tel;
        // this.updateForm.subarea = thisData.subarea;
        // this.updateForm.role = thisData.role;
        this.currentIndex = index;
        this.dialogUpdate = true;
      },
      updateConfirm: function (updateForm) {
        const form = {
          account: this.updateForm.account,
          name: this.updateForm.name,
          tel: this.ruleForm.tel,
          subarea: this.updateForm.subarea,
          role: this.updateForm.role
        };
        this.$refs[updateForm].validate(valid => {
          if (valid) {
            this.dialogUpdate = false;
            this.$message.success("修改成功");
            // this.$http
            //   .post("api/updatesubordinateManager", this.qs.stringify(form))
            //   .then(res => {
            //     if (res.data.status === 0) {
            //       this.tableData[currentIndex] = res.data;
            //       this.dialogUpdate = false;
            //       this.$message.success("添加成功");
            //     } else {
            //       this.$message.error("修改失败");
            //     }
            //   });
          } else {
            this.$message.error("修改失败");
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
        // const form = {
        //   id: this.id
        // };
        // this.$http
        //   .post("api/deleteAnnouncement", this.qs.stringify(form))
        //   .then(res => {
        //     if (res.data.status === 0) {
        //       this.tableData.splice(this.currentIndex, 1);
        //       this.dialogDelete = false;
        //       this.$message.success("删除成功");
        //     } else {
        //       this.$message.error("删除失败");
        //     }
        //   });
        this.tableData.splice(this.currentIndex, 1);
        this.dialogDelete = false;
        this.$message.success("删除成功");
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

  .el-select {
    width: 100%;
    margin-bottom: 20px;
  }
</style>