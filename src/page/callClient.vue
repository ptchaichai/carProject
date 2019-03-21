<template>
    <div class="call-client">
      <el-tag>来电客户信息管理</el-tag>
      <div class="search-add">
      <div class="box">
      <el-form ref="form" :model="form" class="search-form">
      <el-input v-model="search" placeholder="请输入名称"
            suffix-icon="el-icon-search"></el-input>
     </el-form>
     <el-dialog title="添加信息" :visible.sync="dialogAdd" width="50%">
     <div class="dialog-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
         </el-form-item>
          <el-form-item label="电话" prop="tel">
          <el-input v-model="ruleForm.tel" placeholder="请输入电话"></el-input>
         </el-form-item>
          <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address" placeholder="请输入地址"></el-input>
         </el-form-item>
         <el-button  round type="primary" class="addInformation" @click="addConfirm('ruleForm')">确定</el-button>
         <el-button  round type="info" class="cancelInformation" @click="addCancel('ruleForm')">取消</el-button>
        </el-form>
      </div>
     </el-dialog>
     <el-button type="primary" size="small" round class="add" @click="add">添加</el-button>
   </div>
       </div>
      <el-table
    :data="tableData"
    border>
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
import { isvalidPhone } from "./valid";
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
  name: "callClient",
  data() {
    return {
      dialogDelete: false,
      dialogUpdate: false,
      dialogAdd: false,
      inputName: "",
      inputTel: "",
      inputAdd: "",
      popoverName: "",
      popoverTel: "",
      popoverAdd: "",
      rowVal: "",
      currentIndex: "",
      deleteVal: "",
      tableData: [],
      ruleForm: {
        name: "",
        tel: "",
        address: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 4, message: "请输入 2 到 4 个字符", trigger: "blur" }
        ],
        tel: [{ required: true, trigger: "blur", validator: validPhone }]
      },
      updateForm: {
        name: "",
        tel: "",
        address: ""
      },
      rulesUpdate: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 5, message: "请输入 2 到 5 个字符", trigger: "blur" }
        ],
        tel: [{ required: true, trigger: "blur", validator: validPhone }]
      },
      tableTel:[],
    };
  },
  methods: {
    add: function() {
      this.dialogAdd = true;
    },
    addConfirm: function(ruleForm) {
      const inputName = this.ruleForm.name;
      const inputTel = this.ruleForm.tel;
      const inputAdd = this.ruleForm.address;
      const tableL = this.tableData.length;
      if (tableL === 0) {
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            this.tableData.push({
              name: inputName,
              tel: inputTel,
              address: inputAdd
            });
            this.$refs[ruleForm].resetFields();
            this.dialogAdd = false;
            this.$store.dispatch("addCall", 0);
          } else {
            return false;
          }
        });
      } else if (tableL > 0) {
        for (let i = 0; i < tableL; i += 1) {
           this.tableTel.push(this.tableData[i].tel);
          if (this.tableTel.indexOf(inputTel) < 0) {
            this.$refs[ruleForm].validate(valid => {
              if (valid) {
                this.tableData.push({
                  name: inputName,
                  tel: inputTel,
                  address: inputAdd
                });
                this.$refs[ruleForm].resetFields();
                this.dialogAdd = false;
                this.$store.dispatch("addCall", 0);
              } else {
                return false;
              }
            });
          } else {
            this.$message({
              message: "该号码已存在",
              type: "warning"
            });
          }
        }
      }
    },
    addCancel: function(ruleForm) {
      this.$refs[ruleForm].resetFields();
      this.dialogAdd = false;
    },
    update: function(rowIndex, rowVal) {
      this.updateForm.name = rowVal.name;
      this.updateForm.tel = rowVal.tel;
      this.updateForm.address = rowVal.address;
      this.dialogUpdate = true;
      this.currentIndex = rowIndex;
      this.rowVal = rowVal;
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
    deleteRow: function(index) {
      this.dialogDelete = true;
      this.deleteVal = index;
    },
    removeConfirm: function() {
      this.tableData.splice(this.deleteVal, 1);
      this.dialogDelete = false;
    }
  }
};
</script>

<style scoped>
.call-client {
  width: 90%;
  margin: 50px auto;
}
.dialog-box {
  width: 100%;
}

.el-table {
  width: 782px;
  min-width: 780px;
  border: 1px solid #cecece;
  margin: 30px auto;
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
.el-icon-warning {
  color: red;
}
.el-dialog__header {
  padding: 20px 20px 0px;
}
.el-dialog__title {
  font-weight: 700;
}
</style>
