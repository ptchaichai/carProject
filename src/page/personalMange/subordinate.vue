<template>
    <div class="subordinate">
      <p>信息管理</p>
      <div class="search-add">
        <div class="box">
      <el-form ref="form" :model="form" class="search-form">
      <el-input v-model="searchData" placeholder="请输入名称"></el-input>
          <el-button type="success"  class="search" @click="search">搜索</el-button>
     </el-form>
     <el-dialog title="添加信息" :visible.sync="dialogAdd" width="50%">
     <div class="dialog-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
         </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="ruleForm.pwd" @focus.capture.native='changePasswordTip(true)'  @blur.capture.native='changePasswordTip(false)' auto-complete="new-password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div style="position: absolute">
            <verify-pass-word-tip :password="ruleForm.pwd" :isShowTip = 'isShowTip'></verify-pass-word-tip>
          </div>
          <el-form-item label="电话" prop="tel">
            <el-input v-model="ruleForm.tel" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
          <el-select v-model="ruleForm.role" placeholder="请选择角色" @change="change">
            <el-option v-for="(item,id) in roles" :label="item.label" :key="item.id" :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
         <el-button  round type="primary" class="addInformation" @click="addInformation('ruleForm')">确定</el-button>
         <el-button  round type="info" class="addCancel" @click="addCancel('ruleForm')">取消</el-button>
        </el-form>
      </div>
     </el-dialog>
     <el-button type="primary" size="small" round class="add" @click="add">添加</el-button>
   </div>
  </div>
      <el-table
    :data="tableData"
    ref="searchTable"
    border
    @row-click="getDetails"
      :row-style="tableRowStyle"
    :header-cell-style="tableHeaderColor"
    >
    <el-table-column
      prop="account"
      label="账号"
      min-width="10%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      min-width="15%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="tel"
      label="电话"
      min-width="15%"
      align="center">
    </el-table-column>
        <el-table-column
          prop="pwd"
          label="密码"
         min-width="20%"
         align="center">
        </el-table-column>
        <el-table-column
          prop="role"
          label="角色"
         min-width="15%"
         align="center">
        </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      min-width="25%"
      align="center">
      <template slot-scope="scope">
     <el-button slot="reference" type="primary" size="small" round class="update" @click="update(scope.$index)">修改</el-button>
        <el-button @click="deleteRow(scope.$index)" type="info" size="small" round>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   <el-dialog title="警告！" :visible.sync="dialogDelete" width="30%">
        <i class="el-icon-warning"></i>
        <span>是否要删除本条信息？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="removeConfirm()" round>确 定</el-button>
          <el-button @click="dialogDelete = false"  round>取 消</el-button>
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
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="updateForm.pwd" @focus.capture.native='changePasswordTip(true)'  @blur.capture.native='changePasswordTip(false)' auto-complete="new-password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div style="position: absolute">
            <verify-pass-word-tip :password="ruleForm.pwd" :isShowTip = 'isShowTip'></verify-pass-word-tip>
          </div>
          <div class="role" prop="role">
            <p>角色</p></div>
          <el-select v-model="updateForm.role" placeholder="请选择角色" @change="change">
            <el-option v-for="item in roles" :label="item.label" :key="item.id" :value="item.value">
            </el-option>
          </el-select>

        </el-form>
        <el-button type="primary" @click="updateConfirm('updateForm')" round>确 定</el-button>
          <el-button @click="updateCancel('updateForm')"  round>取 消</el-button>
      </el-dialog>
    </div>
</template>

<script>
import { isvalidPhone } from "./../valid";
import verifyPassWordTip from "./../verifyPassWordTip";
var validPhone = (rule, value, callback) => {
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
    verifyPassWordTip
  },
  data() {
    return {
      searchData: "",
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
        { label: "总经理", id: 1, value: "总经理" },
        { label: "销售经理", id: 2, value: "销售经理" },
        { label: "销售人员", id: 3, value: "销售人员" }
      ],
      updateForm: {
        account: "",
        name: "",
        tel: "",
        pwd: "",
        address: "",
        role: ""
      },
      ruleForm: {
        account: "",
        name: "",
        tel: "",
        pwd: "",
        address: "",
        role: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 1, max: 20, message: "请输入 1 到 20 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 2, max: 40, message: "长度在 2 到 40 个字符", trigger: "blur" }
        ],
        tel: [{ required: true, trigger: "blur", validator: validPhone }],
        pwd: [{ required: true, trigger: "blur", message: "请填写密码" }],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }]
      },
      rulesUpdate: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 1, max: 20, message: "请输入 1 到 20 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 2, max: 40, message: "长度在 2 到 40 个字符", trigger: "blur" }
        ],
        tel: [{ required: true, trigger: "blur", validator: validPhone }],
        pwd: [{ required: true, trigger: "blur", message: "请填写密码" }],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }]
      }
    };
  },
  methods: {
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
    changePasswordTip(isShow) {
      if (isShow) {
        this.isShowTip = true;
      } else {
        this.isShowTip = false;
      }
    },
    // 搜索table
    search: function() {
      const val = this.searchData;
      if (val !== "") {
        const form = {
          searchVal: val
        };
        this.$axios
          .post("api/searchSubordinate", this.$qs.stringify(form))
          .then(res => {
            if (res.data.status === 0) {
              this.tableData = res.data;
            } else {
              this.$message.error("搜索失败");
            }
          });
      }
    },
    add: function() {
      this.dialogAdd = true;
    },
    addInformation: function(ruleForm) {
      const form = {
        account: this.ruleForm.account,
        name: this.ruleForm.name,
        tel: this.ruleForm.tel,
        pwd: this.ruleForm.pwd,
        address: this.ruleForm.address,
        role: this.ruleForm.role
      };
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$axios
            .post("api/addSubordinate", this.$qs.stringify(form))
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
        } else {
          return false;
        }
      });
    },
    addCancel: function(ruleForm) {
      this.$refs[ruleForm].resetFields();
      this.dialogAdd = false;
    },
    update: function(index) {
      const thisData = this.tableData[index].data;
      this.updateForm.account = thisData.account;
      this.updateForm.name = thisData.name;
      this.updateForm.tel = thisData.tel;
      this.updateForm.pwd = thisData.pwd;
      this.updateForm.address = thisData.address;
      this.updateForm.role = thisData.role;
      this.currentIndex = index;
      this.dialogUpdate = true;
    },
    updateConfirm: function(updateForm) {
      const form = {
        account: this.updateForm.account,
        name: this.updateForm.name,
        tel: this.ruleForm.tel,
        pwd: this.updateForm.pwd,
        address: this.updateForm.address,
        role: this.updateForm.role
      };
      this.$refs[updateForm].validate(valid => {
        if (valid) {
          this.$axios
            .post("api/updateSubordinate", this.$qs.stringify(form))
            .then(res => {
              if (res.data.status === 0) {
                this.tableData[currentIndex] = res.data;
                this.dialogUpdate = false;
                this.$message.success("添加成功");
              } else {
                this.$message.error("修改失败");
              }
            });
        } else {
          return false;
        }
      });
    },
    updateCancel: function(updateForm) {
      this.$refs[updateForm].resetFields();
      this.dialogUpdate = false;
    },
    deleteRow: function(index) {
      this.dialogDelete = true;
      this.currentIndex = index;
    },
    removeConfirm: function() {
      const form = {
        id: this.id
      };
      this.$axios
        .post("api/deleteAnnouncement", this.$qs.stringify(form))
        .then(res => {
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
.subordinate {
  margin: 0px auto;
  height: 770px;
  background: #fcfcfc;
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
.el-select {
  width: 100%;
  margin-bottom: 20px;
}
</style>
