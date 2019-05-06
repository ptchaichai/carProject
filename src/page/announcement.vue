<template>
  <div class="announcement">
    <p>公告</p>
    <div class="search-add">
      <div class="box">
        <el-form ref="form" class="search-form">
          <el-input v-model="searchData" placeholder="请输入要搜索的字段" suffix-icon="el-icon-search"></el-input>
          <el-button type="success" class="search" @click="search">搜索</el-button>
        </el-form>
        <el-dialog title="添加公告" :visible.sync="dialogAdd" width="50%">
          <div class="dialog-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="add-form">
              <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
              </el-form-item>
              <el-form-item label="公告内容" prop="content">
                <el-input v-model="ruleForm.content" placeholder="请输入公告内容" type="textarea"></el-input>
              </el-form-item>
              <el-button
                round
                type="primary"
                class="addInformation"
                @click="addConfirm('ruleForm')"
              >确定</el-button>
              <el-button
                round
                type="info"
                class="cancelInformation"
                @click="addCancel('ruleForm')"
              >取消</el-button>
            </el-form>
          </div>
        </el-dialog>
        <el-button round type="primary" @click="open" class="add">添加新公告</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      ref="multipleTable"
      border
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column label="序号" type="index" show-overflow-tooltip width="50" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" min-width="30%" align="center"></el-table-column>
      <el-table-column prop="author" label="发布人" min-width="20%" align="center"></el-table-column>
      <el-table-column prop="identity" label="身份" min-width="20%" align="center"></el-table-column>
      <el-table-column prop="time" label="发布时间" min-width="20%" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150" min-width="30%" align="center">
        <template slot-scope="scope">
          <el-button
            slot="reference"
            type="primary"
            size="small"
            round
            class="update"
            @click="view(scope.$index)"
          >查看</el-button>
          <el-button @click="deleteRow(scope.$index)" type="info" size="small" round>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection(tableData)">全选</el-button>
      <el-button @click="toggleSelection()" :disabled="multipleSelection.length == 0">取消选择</el-button>
    </div>
    <el-dialog title="公告内容" :visible.sync="dialogView" width="50%">
      <div class="dialog-box">
        <span class="view-span">公告标题:</span>
        <el-input v-model="viewTitle" readonly="readonly"></el-input>
        <span class="view-span">公告内容:</span>
        <el-input v-model="viewContent" type="textarea" readonly="readonly" class="textarea"></el-input>
        <el-button round type="primary" @click="dialogView= false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="警告！" :visible.sync="dialogDelete" width="30%">
      <i class="el-icon-warning"></i>
      <span>是否要删除本条公告？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="removeConfirm()" round>确 定</el-button>
        <el-button @click="dialogDelete = false" round>取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Bus from "../components/bus.js";

export default {
  name: "updatePwd",
  data() {
    return {
      searchName: 'username', //搜索的条件
      searchData: "", //搜索的名字
      multipleSelection: [],
      show: false,
      showAnother: false,
      dialogAdd: false,
      dialogView: false,
      dialogEdit: false,
      dialogDelete: false,
      addContentVal: "",
      tableData: [
        {
          title:'店庆通知',
          author:'王宇庭',
          identity:'销售经理',
          time:'2019-1-22',
        },
        {
          title:'业绩下滑，需开会',
          author:'张旭',
          identity:'总经理',
          time:'2019-2-4',
        },
        {
          title:'清明放假通知',
          author:'张旭',
          identity:'总经理',
          time:'2019-3-28',
        },
        {
          title:'客户信息记录有问题，需开会商讨',
          author:'李平',
          identity:'销售经理',
          time:'2019-4-6',
        },
        ],
      viewTitle: "",
      viewContent: "",
      searchData: "",
      ruleForm: {
        title: "",
        content: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入公告内容", trigger: "blur" },
          {
            min: 10,
            max: 100,
            message: "长度在 10 到 100 个字符",
            trigger: "blur"
          }
        ]
      }
    };
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
        return "background-color: #409eff; color: #fff; font-weight: 500; border:none;";
      }
    },
    search: function() {
      const val = this.searchData;
      if (val !== "") {
        const form = {
          searchVal: val
        };
        this.$http
          .post("api/searchAnnouncement", this.qs.stringify(form))
          .then(res => {
            if (res.data.status === 0) {
              this.tableData = res.data;
            } else {
              this.$message.error("搜索失败");
            }
          });
      }
    },
    open: function() {
      this.dialogAdd = true;
    },
    // 添加公告
    addConfirm: function(ruleForm) {
      let form = {
        title: this.ruleForm.title,
        content: this.ruleForm.content,
        username: sessionStorage.getItem('name'),
        userrole: sessionStorage.getItem('role'),
        userid: sessionStorage.getItem('id')
      };
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$http
            .post("/api/addAnnouce", this.qs.stringify(form))
            .then(res => {
              if (res.data.status === 0) {
                this.tableData = res.data;
                this.$refs[ruleForm].resetFields();
                this.dialogAdd = false;
                this.$message.success("添加成功");
                Bus.$emit("add");
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
    view: function(index) {
      this.viewTitle = rowVal.title;
      this.viewContent = rowVal.title;
      this.dialogView = true;
      const thisData = this.tableData[index].data;
      this.viewTitle = thisData.title;
      this.viewContent = thisData.content;
    },
    deleteRow: function(index) {
      this.dialogDelete = true;
      this.currentIndex = index;
    },
    removeConfirm: function() {
      let form = {
        id: this.id
      };
      this.$http
        .post("api/deleteAnnouncement", this.qs.stringify(form))
        .then(res => {
          if (res.data.status === 0) {
            const i = this.currentIndex;
            this.tableData.splice(i, 1);
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
.announcement {
  margin: 0px auto;
  height: 770px;
  background: #fefefe;
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
.add {
  float: right;
  margin-top: -36px;
  height: 32px;
  line-height: 6px;
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
.edit-form {
  text-align: left;
}
.el-input {
  margin: 10px 0;
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
.search-form {
  width: 25%;
  position: relative;
}
.el-button--success {
  position: absolute;
  top: 10px;
  right: 0px;
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
