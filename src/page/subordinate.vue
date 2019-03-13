<template>
    <div class="subordinate">
      <el-tag>信息管理</el-tag>
      <div class="search-add">
        <div class="box">
      <el-form ref="form" :model="form" class="search-form">
      <el-input v-model="searchData" placeholder="请输入名称"></el-input>
          <el-button type="success"  class="search" @click="search">搜索</el-button>
     </el-form>
     <el-popover
    placement="bottom"
    width="550"
     v-model="visible">
    <div class="dialog-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="工号" prop="id">
            <el-input v-model="ruleForm.id" placeholder="请输入工号"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
         </el-form-item>
          <el-form-item label="电话" prop="tel">
          <el-input v-model="ruleForm.tel" placeholder="请输入电话"></el-input>
         </el-form-item>
          <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address" placeholder="请输入地址"></el-input>
         </el-form-item>
         <el-button  round type="primary" class="addInformation" @click="addInformation('ruleForm')">确定</el-button>
         <el-button  round type="info" class="cancelInformation" @click="cancelInformation('ruleForm')">取消</el-button>
        </el-form>
      </div>
    <el-button slot="reference" type="primary" size="small" round class="add">添加</el-button>
  </el-popover>
   </div>
  </div>
      <el-table
    :data="tableData"
    ref="searchTable"
    border
    @row-click="getDetails"
      >
    <el-table-column
      fixed
      prop="id"
      label="工号"
      width="60">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="tel"
      label="电话"
      width="200">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="200">
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
          <el-form-item label="地址" prop="address">
          <el-input v-model="updateForm.address" placeholder="请输入地址"></el-input>
         </el-form-item>
        </el-form>
        <el-button type="primary" @click="updateConfirm('updateForm')" round>确 定</el-button>
          <el-button @click="updateCancel('updateForm')"  round>取 消</el-button>
      </el-dialog>
    </div>
</template>

<script>
import { isvalidPhone } from "./validPhone";
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
  data() {
    return {
      searchData: "",
      inputId: "",
      inputName: "",
      inputTel: "",
      inputAdd: "",
      popoverName: "",
      popoverTel: "",
      popoverAdd: "",
      visible: false,
      tableData: [],
      newTableData: [],
      dialogDelete: false,
      dialogUpdate: false,
      rowVal: "",
      currentIndex: "",
      deleteVal: "",
      updateForm: {
        name: "",
        tel: "",
        address: ""
      },
      ruleForm: {
        name: "",
        id: "",
        tel: "",
        address: ""
      },
      rules: {
        id: [
          { required: true, message: "请输入id", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个汉字", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "长度在 2 到 100 个字符",
            trigger: "blur"
          }
        ],
        tel: [{ required: true, trigger: "blur", validator: validPhone }]
      },
      rulesUpdate: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "长度在 2 到 100 个字符",
            trigger: "blur"
          }
        ],
        tel: [{ required: true, trigger: "blur", validator: validPhone }]
      }
    };
  },
  methods: {
    addInformation: function(ruleForm) {
      const inputId = this.ruleForm.id;
      const inputName = this.ruleForm.name;
      const inputTel = this.ruleForm.tel;
      const inputAdd = this.ruleForm.address;
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.tableData.push({
            id: inputId,
            name: inputName,
            tel: inputTel,
            address: inputAdd
          });
          this.$refs[ruleForm].resetFields();
          this.visible = false;
        } else {
          return false;
        }
      });
    },
    cancelInformation: function(ruleForm) {
      this.$refs[ruleForm].resetFields();
      this.visible = false;
    },
    update: function(rowIndex, rowVal) {
      this.updateForm.name = rowVal.name;
      this.updateForm.tel = rowVal.tel;
      this.updateForm.address = rowVal.address;
      this.currentIndex = rowIndex;
      this.rowVal = rowVal;
      this.dialogUpdate = true;
    },
    updateConfirm: function(updateForm) {
      const name = this.updateForm.name;
      const tel = this.updateForm.tel;
      const address = this.updateForm.address;
      this.$refs[updateForm].validate(valid => {
        if (valid) {
          this.tableData[this.currentIndex].name = name;
          this.tableData[this.currentIndex].tel = tel;
          this.tableData[this.currentIndex].address = address;
          this.dialogUpdate = false;
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
  width: 90%;
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
.el-table {
  width: 782px;
  min-width: 780px;
  border: 1px solid #cecece;
  margin: 20px auto;
}
.el-tag {
  font-size: 35px;
  background-color: #fff;
  border: none;
}
.el-button--small {
  margin-left: -10px;
}
.box {
  width: 780px;
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
</style>
