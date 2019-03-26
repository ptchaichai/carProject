<template>
    <div class="announcement" >
      <p>公告</p>
      <div class="search-add">
      <div class="box">
      <el-form ref="form" :model="form" class="search-form">
      <el-input v-model="search" placeholder="请输入名称"
            suffix-icon="el-icon-search"></el-input>
     </el-form>
      <el-dialog title="添加公告" :visible.sync="dialogAdd"
       width="50%">
      <div class="dialog-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
         </el-form-item>
          <el-form-item label="公告内容" prop="content">
          <el-input v-model="ruleForm.content" placeholder="请输入公告内容" type="textarea"></el-input>
         </el-form-item>
         <el-button  round type="primary" class="addInformation" @click="addConfirm('ruleForm')">确定</el-button>
         <el-button  round type="info" class="cancelInformation" @click="addCancel('ruleForm')">取消</el-button>
        </el-form>
      </div>
    </el-dialog>
     <el-button round type="primary" @click="open">添加新公告</el-button>
      </div>
      </div>
     <el-table
    :data="tableData"
    border
    :row-style="tableRowStyle"
    :header-cell-style="tableHeaderColor">
    <el-table-column
      prop="title"
      label="标题"
      mix-width="30%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="author"
      label="发布人"
      mix-width="20%"
      align="center">
    </el-table-column>
    <el-table-column
      prop="time"
      label="发布时间"
      mix-width="20%"
      align="center">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="150"
      mix-width="30%"
      align="center">
      <template slot-scope="scope">
      <el-button slot="reference" type="primary" size="small" round class="update" @click="view(scope.$index,scope.row)">查看</el-button>
        <el-button @click="deleteRow(scope.$index)" type="info" size="small" round>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
     <el-dialog title="公告内容" :visible.sync="dialogView" width="50%">
              <div class="dialog-box">
                    <span class="view-span">公告标题:</span>
                    <el-input v-model="viewTitle" readonly="readonly"></el-input>
                    <span class="view-span">公告内容:</span>
                    <el-input v-model="viewContent" type="textarea" readonly="readonly" class="textarea"></el-input>
                  <el-button  round type="primary" @click="dialogView= false">关闭</el-button>
              </div>
            </el-dialog>
            <el-dialog title="警告！" :visible.sync="dialogDelete" width="30%">
            <i class="el-icon-warning"></i>
            <span>是否要删除本条公告？</span>
            <span slot="footer" class="dialog-footer">
           <el-button type="primary" @click="removeConfirm()" round>确 定</el-button>
          <el-button @click="dialogDelete = false"  round>取 消</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import Bus from '../components/bus.js';
export default {
  name: "updatePwd",
  data() {
    return {
      show: false,
      showAnother: false,
      dialogAdd: false,
      dialogView: false,
      dialogEdit: false,
      dialogDelete: false,
      addContentVal:"",
      tableData: [],
      viewTitle:"",
      viewContent:"",
      ruleForm: {
        title:"",
        content:"",
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入公告内容", trigger: "blur" },
          { min: 10, max: 100, message: "长度在 10 到 100 个字符", trigger: "blur" }
        ],
      },
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
    open: function() {
      this.dialogAdd = true;
    },
    addConfirm: function(ruleForm) {
      const inputTitle = this.ruleForm.title;
      const inputContent = this.ruleForm.content;
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.tableData.push({
            title: inputTitle,
            content: inputContent,
          });
          this.$refs[ruleForm].resetFields();
          this.dialogAdd = false;
          this.$message({
            message: "添加成功",
            type: "success"
          });
        } else {
          return false;
          this.$message.error("添加失败");
        }
      });
    },
    addCancel: function(ruleForm) {
      this.$refs[ruleForm].resetFields();
      this.dialogAdd = false;
    },
    viewContent: function(rowIndex, rowVal) {
      this.viewTitle = rowVal.title;
      this.viewContent = rowVal.title;
      this.dialogView = true;
    },
    cancelConfirm: function(i) {
      // this.items[i].title = this.oldTitle;
      // this.items[i].content = this.oldContent;
      // this.showAnother = false;
      // this.dialogEdit = false;
    },
    deleteRow: function(index) {
      this.dialogDelete = true;
      this.currentIndex = index;
    },
    removeConfirm: function() {
      const i = this.currentIndex;
      this.items.splice(i, 1);
      this.dialogDelete = false;
      this.$message({
            message: "删除成功",
            type: "success"
          });
    }
  }
};
</script>

<style scoped>
.announcement {
  margin: 0px auto;
  height: 770px;
  background: #fcfcfc;
}
.dialog-box {
  width: 100%;
}
.el-table {
  width: 90%;
  min-width: 780px;
  border: 1px solid #cecece;
  margin: 30px auto;
}
.announcement p {
  text-align: left;
  border-bottom: 1px solid #ccc;
  color: #3a8ee6;
  font-size: 20px;
  font-weight: 700;
}
.box {
  width: 90%;
  margin: 0 auto;
}
.addOne {
  margin: 0px 60px;
}
.container-wrapper {
  width: 100%;

  border: 1px solid #ccc;

  margin-top: 10px;
}
.el-dialog__body {
  padding: 20px 20px !important;
}
.view-span {
  display: block;
  text-align: left;
  margin: 5px 0;
}
.edit-form{
  text-align: left;
}
.el-input{
  margin:10px 0;
}
.container {
  position: relative;
}
.container p {
  color: #409eff;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 50%;
  margin: 18px 25px;
  text-align: left;
}
.container p:hover {
  color: #555;
}
.view {
  position: absolute;
  top: -5px;
  right: 50px;
}
.warning {
  color: red;
  margin-bottom: 10px;
}
.edit {
  position: absolute;
  right: -46px;
  top: -5px;
}
.el-form{
  width: 25%;
}
.textarea {
  margin: 10px 0;
}
.el-dialog {
  border-radius: 10px;
}
.el-icon-warning {
  color: red;
}
.star {
  color: red;
}
.title-span {
  display: block;
  position: absolute;
  top: -2px;
  left: 10px;
}
</style>
