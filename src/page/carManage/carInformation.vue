<template>
  <div class="call-client">
    <p>汽车销售信息</p>
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
              <el-form-item label="车名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入车名"></el-input>
              </el-form-item>
              <el-form-item label="车型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择车型" class="carType">
                  <el-option v-for="item in roles" :label="item.label" :key="item.id" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="颜色" prop="color">
                <el-input v-model="ruleForm.color" placeholder="请输入颜色"></el-input>
              </el-form-item>
              <el-form-item label="上架日期" prop="shelftime">
                <div class="block">
                  <el-date-picker v-model="ruleForm.shelftime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="下架日期" prop="droptime">
                <div class="block">
                  <el-date-picker v-model="ruleForm.droptime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="价格(万元)" prop="price">
                  <el-input v-model="ruleForm.price" placeholder="请输入价格"></el-input>
                </el-form-item>
              <el-button round type="primary" class="addInformation" @click="addConfirm('ruleForm')">确定</el-button>
              <el-button round type="info" class="cancelInformation" @click="addCancel('ruleForm')">取消</el-button>
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
      <el-table-column prop="id" label="编号" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="name" label="车名" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="type" label="型号" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="color" label="颜色" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="shelftiem" label="上架时间" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="droptiem" label="下架时间" min-width="15%" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="20%" align="center">
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
        <el-form-item label="车名" prop="color">
          <el-input v-model="updateForm.name" placeholder="请输入车名"></el-input>
        </el-form-item>
        <el-form-item label="车型" prop="type">
            <el-select v-model="updateForm.type" placeholder="请选择车型" class="carType">
              <el-option v-for="item in roles" :label="item.label" :key="item.id" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-input v-model="updateForm.color" placeholder="请输入颜色"></el-input>
        </el-form-item>
        <el-form-item label="上架日期" prop="shelftime">
          <div class="block">
            <el-date-picker v-model="updateForm.shelftime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="下架日期" prop="droptime">
          <div class="block">
            <el-date-picker v-model="updateForm.droptime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="价格(万元)" prop="price">
          <el-input v-model="updateForm.price" placeholder="请输入价格"></el-input>
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
        multipleSelection: [],
        dialogDelete: false,
        dialogUpdate: false,
        dialogAdd: false,
        checked: false,
        viewShow: false,
        searchData: "",
        reason: "",
        inputName: "",
        rowVal: "",
        currentIndex: "",
        currentIndex: "",
        tableData: [],
        reasonText: "",
        roles: [
          { label: "奥德赛", value: "奥德赛" },
          { label: "宾智", value: "宾智" },
          { label: "飞度", value: "飞度" },
          { label: "锋范", value: "锋范" },
          { label: "凌派", value: "凌派" },
          { label: "雅阁", value: "雅阁" }
        ],
        ruleForm: {
          id: "",
          name: "",
          type: "",
          color: "",
          shelftime: "",
          droptime: "",
          price: ""
        },
        rules: {
          id: [
            { required: true, message: "请输入编号", trigger: "blur" },
            { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
          ],
          name:[
            { required: true, message: "请输入车名", trigger: "blur" },
            { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
          ],
          type: [{ required: true, trigger: "blur", message: "请选择车型" }],
          color: [
            { required: true, message: "请输入颜色", trigger: "blur" },
            { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
          ],
          shelftime: [{ required: true, message: "请选择上架日期", trigger: "blur" }],
          droptime: [{ required: true, message: "请选择下架日期", trigger: "blur" }],
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
          name: "",
          type:"",
          color: "",
          shelftime: "",
          droptime: "",
          price: "",
        },
        rulesUpdate: {
          name:[
            { required: true, message: "请输入车名", trigger: "blur" },
            { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
          ],
          type: [{ required: true, trigger: "blur", message: "请选择车型" }],
          color: [
            { required: true, message: "请输入颜色", trigger: "blur" },
            { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
          ],
          shelftime: [{ required: true, message: "请选择上架日期", trigger: "blur" }],
          droptime: [{ required: true, message: "请选择下架日期", trigger: "blur" }],
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
      edit: function () {
        this.reasonEdit = true;
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
          this.$http.post("api/searchCall", this.qs.stringify(form)).then(res => {
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
          id: this.ruleForm.id,
          name: this.ruleForm.name,
          type: this.ruleForm.type,
          color: this.ruleForm.color,
          shelftime: this.ruleForm.shelftime,
          droptime: this.ruleForm.droptime,
          price: this.ruleForm.price
        };
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            // this.$http.post("api/addCall", this.qs.stringify(form)).then(res => {
            //   if (res.data.status === 0) {
            //     this.tableData = res.data;
            //     this.$refs[ruleForm].resetFields();
            //     this.dialogAdd = false;
            //     this.$message.success("添加成功");
            //   } else {
            //     this.$message.error("添加失败");
            //   }
            // });
            this.tableData.push(form);
          } else {
            return false;
          }
        });
      },
      addCancel: function (ruleForm) {
        this.$refs[ruleForm].resetFields();
        this.dialogAdd = false;
      },
      update: function (index) {
        const thisData = this.tableData[index].data;
        this.updateForm.name = thisData.name;
        this.updateForm.date = thisData.date;
        this.updateForm.price = thisData.price;
        this.updateForm.shelftime = thisData.shelftime;
        this.updateForm.droptime = thisData.droptime;
        this.dialogUpdate = true;
        this.currentIndex = index;
      },
      updateConfirm: function (updateForm) {
        const form = {
          name: this.updateForm.name,
          color: this.updateForm.color,
          shelftime: this.updateForm.shelftime,
          droptime: this.updateForm.droptime,
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
      updateCancel: function (updateForm) {
        this.$refs[updateForm].resetFields();
        this.dialogUpdate = false;
      },
      deleteRow: function (index) {
        this.dialogDelete = true;
        this.currentIndex = index;
      },
      removeConfirm: function () {
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
    background: #fefefe;
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

  .carType {
    margin: -10px 0 -10px;
  }
</style>