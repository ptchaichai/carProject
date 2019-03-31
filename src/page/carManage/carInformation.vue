<template>
  <div class="call-client">
    <p>汽车销售信息</p>
    <el-checkbox v-model="checked" @change="checkBack">已退回</el-checkbox>
    <span v-show="backShow" @click="edit" class="reason-span">输入理由</span>
    <el-dialog title="添加信息" :visible.sync="reasonEdit" width="50%">
      <div class="dialog-box">
        <el-form>
          <el-form-item label="退回理由">
            <el-input v-model="reason" placeholder="请输入退回理由" type="textarea"></el-input>
          </el-form-item>
          <el-button type="primary" @click="addReason()" round>确 定</el-button>
          <el-button @click="reasonEdit = false" round>取 消</el-button>
        </el-form>
      </div>
    </el-dialog>
    <span v-show="viewShow" @click="viewReason" class="reason-span">查看理由</span>
    <el-dialog title="添加信息" :visible.sync="reasonView" width="50%">
      <div class="dialog-box">
        <el-form>
          <el-form-item label="退回理由">
            <el-input v-model="reasonText" type="textarea"></el-input>
          </el-form-item>
          <el-button @click="reasonView = false" round type="primary">关闭</el-button>
        </el-form>
      </div>
    </el-dialog>
    <div class="search-add">
      <div class="box">
        <el-form ref="form" class="search-form">
          <el-input v-model="searchData" placeholder="请输入汽车车型" suffix-icon="el-icon-search"></el-input>
          <el-button type="success" class="search" @click="search">搜索</el-button>
        </el-form>
        <el-dialog title="添加信息" :visible.sync="dialogAdd" width="50%">
          <div class="dialog-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item label="编号" prop="id">
                <el-input v-model="ruleForm.id" placeholder="请输入编号"></el-input>
              </el-form-item>
              <el-form-item label="型号" prop="type">
                <el-input v-model="ruleForm.type" placeholder="请输入型号"></el-input>
              </el-form-item>
              <el-form-item label="颜色" prop="color">
                <el-input v-model="ruleForm.color" placeholder="请输入颜色"></el-input>
              </el-form-item>
              <el-form-item label="售出日期" prop="date">
                <div class="block">
                  <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期"></el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="售出价格(万元)" prop="price">
                <el-input v-model="ruleForm.price" placeholder="请输入售出价格" type="number" step="0.001"></el-input>
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
        <el-button type="primary" size="small" round class="add" @click="add">添加</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
    >
      <el-table-column prop="id" label="编号" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="type" label="型号" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="color" label="颜色" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="date" label="售出日期" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="price" label="售出价格(万元)" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="back" label="是否退货" min-width="20%" align="center">
        <template>
          <el-checkbox v-model="checked" @change="checkBack">已退回</el-checkbox>
          <p v-show="backShow">编写理由</p>
          <p v-show="viewShow">查看理由</p>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="20%" align="center">
        <template slot-scope="scope">
          <el-button
            slot="reference"
            type="primary"
            size="small"
            round
            class="update"
            @click="update(scope.$index)"
          >修改</el-button>
          <el-button @click="deleteRow(scope.$index)" type="info" size="small" round>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        <el-form-item label="颜色" prop="color">
          <el-input v-model="updateForm.color" placeholder="请输入颜色"></el-input>
        </el-form-item>
        <el-form-item label="售出日期" prop="date">
          <div class="block">
            <el-date-picker v-model="updateForm.date" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="售出价格(万元)" prop="price">
          <el-input v-model="updateForm.price" placeholder="请输入售出价格"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="updateConfirm('updateForm')" round>确 定</el-button>
      <el-button @click="updateCancel('updateForm')" round>取 消</el-button>
    </el-dialog>
  </div>
</template>

<script>
const checkPrice = (rule, value, callback) => {
  if (value) {
    let rgx = /^\d+(\.\d{1,3})?$/;
    if (value.match(rgx) == null) {
      return callback(new Error("输入不能为空，且最多三位小数"));
    } else {
      callback();
    }
  }
};
export default {
  name: "callClient",
  data() {
    return {
      reasonEdit: false,
      reasonView: false,
      dialogDelete: false,
      dialogUpdate: false,
      dialogAdd: false,
      backShow: false,
      checked: false,
      viewShow: false,
      searchData: "",
      reason: "",
      inputName: "",
      rowVal: "",
      currentIndex: "",
      currentIndex: "",
      tableData: [],
      reasonText:"",
      roles: [
        { label: "10万以下", value: "10万以下" },
        { label: "10~20(万)", value: "10~20(万)" },
        { label: "20~30(万)", value: "20~30(万)" },
        { label: "30~40(万)", value: "30~40(万)" },
        { label: "40万以上", value: "40万以上" }
      ],
      ruleForm: {
        id: "",
        type: "",
        color: "",
        date: "",
        price: ""
      },
      rules: {
        id: [
          { required: true, message: "请输入编号", trigger: "blur" },
          { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请输入型号", trigger: "blur" },
          { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
        ],
        color: [
          { required: true, message: "请输入颜色", trigger: "blur" },
          { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
        ],
        date: [{ required: true, message: "请选择售出日期", trigger: "blur" }],
        price: [
          {
            required: true,
            message: "输入不能为空，且最多三位小数",
            trigger: "change"
          },
          { validator: checkPrice, trigger: "change" }
        ]
      },
      updateForm: {
        color: "",
        date: "",
        price: ""
      },
      rulesUpdate: {
        color: [
          { required: true, message: "请输入颜色", trigger: "blur" },
          { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
        ],
        date: [{ required: true, message: "请选择售出日期", trigger: "blur" }],
        price: [
          {
            required: true,
            message: "输入不能为空，且最多三位小数",
            trigger: "change"
          },
          { validator: checkPrice, trigger: "change" }
        ]
      },
      tableTel: []
    };
  },
  methods: {
    checkBack: function() {
      if (this.checked) {
        this.backShow = true;
      }
    },
    edit: function() {
      this.reasonEdit = true;
    },
    addReason: function() {
      this.reasonEdit = false;
      this.viewShow = true;
    },
    viewReason: function() {
      this.reasonView = true;
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
        this.$http.post("api/searchCall", this.qs.stringify(form)).then(res => {
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
    addConfirm: function(ruleForm) {
      const form = {
        id: this.ruleForm.id,
        type: this.ruleForm.type,
        color: this.ruleForm.color,
        date: this.ruleForm.date,
        price: this.ruleForm.price
      };
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$http.post("api/addCall", this.qs.stringify(form)).then(res => {
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
      this.updateForm.color = thisData.color;
      this.updateForm.date = thisData.date;
      this.updateForm.price = thisData.price;
      this.dialogUpdate = true;
      this.currentIndex = index;
    },
    updateConfirm: function(updateForm) {
      const form = {
        color: this.updateForm.color,
        date: this.updateForm.date,
        price: this.updateForm.price
      };
      this.$refs[updateForm].validate(valid => {
        if (valid) {
          this.$http
            .post("api/updateCall", this.qs.stringify(form))
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
      this.$http.post("api/deleteCall", this.qs.stringify(form)).then(res => {
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
.call-client {
  margin: 0px auto;
  height: 770px;
  background: #fcfcfc;
}
.dialog-box {
  width: 100%;
}

.el-table {
  width: 90%;
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
  width: 90%;
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
.el-select {
  width: 100%;
  margin-bottom: 20px;
}
.el-date-editor {
  width: 100%;
}
.reason-span {
  font-size: 10px;
  color: red;
  cursor: pointer;
}
</style>
