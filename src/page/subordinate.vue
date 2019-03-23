<template>
    <div class="subordinate">
      <el-tag class="title">信息管理</el-tag>
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
      >
        <el-table-column
          prop="account"
          label="账号"
          width="100">
        </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="tel"
      label="电话"
      width="180">
    </el-table-column>
        <el-table-column
          prop="pwd"
          label="密码"
          width="200">
        </el-table-column>
        <el-table-column
          prop="role"
          label="角色"
          width="100">
        </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="150"
      left="475">
      <template slot-scope="scope">
     <el-button slot="reference" type="primary" size="small" round class="update" @click="update(scope.$index,scope.row)">修改</el-button>
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
import { isvalidPhone } from "./valid";
import verifyPassWordTip from "./verifyPassWordTip";
// import { isvalidpwd } from "./valid";
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
      dialogAdd:false,
      rowVal: "",
      currentIndex: "",
      isShowTip:false,
      deleteVal: "",
      roles:[
        {label:'总经理',id:1,value:'总经理'},
        {label:'销售经理',id:2,value:'销售经理'},
        {label:'销售人员',id:3,value:'销售人员'},
      ],
      updateForm: {
        name: "",
        tel: "",
        pwd: "",
        address: "",
        role: "",
      },
      ruleForm: {
        account: "",
        name: "",
        tel: "",
        pwd: "",
        address: "",
        role: "",
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
        tel: [{ required: true, trigger: "blur", validator: validPhone }],
        pwd: [{ required: true, trigger: "blur", message: "请填写密码"}],
        role: [{ required: true,message: "请选择角色", trigger: "blur" }],
      },
      rulesUpdate: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
        ],
        tel: [{ required: true, trigger: "blur", validator: validPhone }],
        pwd: [{ required: true, trigger: "blur", message: "请填写密码"}],
        role: [{ required: true,message: "请选择角色", trigger: "blur" }],
      }
    };
  },
  methods: {
    add:function(){
      this.dialogAdd=true;
    },
    changePasswordTip(isShow) {
      if (isShow) {
        this.isShowTip = true;
      } else {
        this.isShowTip = false;
      }
    },
    addInformation: function(ruleForm) {
      const inputAccount = this.ruleForm.account;
      const inputName = this.ruleForm.name;
      const inputTel = this.ruleForm.tel;
      const inputPwd = this.ruleForm.pwd;
      const inputAdd = this.ruleForm.address;
      const inputRole = this.ruleForm.role;
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.tableData.push({
            account: inputAccount,
            name: inputName,
            tel: inputTel,
            pwd: inputPwd,
            address: inputAdd,
            role: inputRole
          });
          this.$message({
            message: "添加成功",
          });
          this.$refs[ruleForm].resetFields();
          this.dialogAdd = false;
        } else {
          return false;
        }
      });
    },
    addCancel: function(ruleForm) {
      this.$refs[ruleForm].resetFields();
      this.dialogAdd = false;
    },
    update: function(rowIndex, rowVal) {
      this.updateForm.name = rowVal.name;
      this.updateForm.tel = rowVal.tel;
      this.updateForm.pwd = rowVal.pwd;
      this.updateForm.address = rowVal.address;
      this.updateForm.role = rowVal.role;
      this.currentIndex = rowIndex;
      this.rowVal = rowVal;
      this.dialogUpdate = true;
    },
    updateConfirm: function(updateForm) {
      const name = this.updateForm.name;
      const tel = this.updateForm.tel;
      const pwd = this.updateForm.pwd;
      const address = this.updateForm.address;
      const role = this.updateForm.role;
      this.$refs[updateForm].validate(valid => {
        if (valid) {
          this.tableData[this.currentIndex].name = name;
          this.tableData[this.currentIndex].tel = tel;
          this.tableData[this.currentIndex].pwd = pwd;
          this.tableData[this.currentIndex].address = address;
          this.tableData[this.currentIndex].role = role;
          this.dialogUpdate = false;
          this.$message({
            message: "修改成功",
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
    deleteRow: function(val) {
      this.dialogDelete = true;
      this.deleteVal = val;
    },
    removeConfirm: function() {
      this.tableData.splice(this.deleteVal, 1);
      this.dialogDelete = false;
    }
  }
};
</script>

<style scoped>
.subordinate {
  width: 95%;
  margin: 50px auto;
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
.el-table{
  width: 865px;
  margin: 25px auto;
}
.title {
  width: 1033px;
  min-width: 1033px;
  border: 1px solid #cecece;
  margin: 20px auto;
}
.role p{
  width: 32px;
}
.el-tag {
  font-size: 35px;
  background-color: #fff;
  border: none;
}
.has-gutter tr th{
  background: #0093e6 !important;
  color: #fff !important;
  text-align: center !important;
}
.el-button--small {
  margin-left: -10px;
}
.box {
  width: 865px;
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
.el-dialog__header{
  padding: 20px 20px 0px;
}
.el-dialog__title{
  font-weight: 700;
}
  .el-select{
    width: 100%;
    margin-bottom: 20px;
  }
</style>
