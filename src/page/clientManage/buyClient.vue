<template>
  <div class="buy-client">
    <p>购车客户信息管理</p>
    <div class="search-add">
      <div class="box">
        <el-form ref="form" class="search-form">
          <el-input v-model="searchData" placeholder="请输入客户姓名" suffix-icon="el-icon-search"></el-input>
          <el-button type="success" class="search" @click="search">搜索</el-button>
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
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="address">
                <el-input v-model="ruleForm.address" placeholder="请输入地址"></el-input>
              </el-form-item>
              <el-form-item label="购买车型" prop="carType">
                <el-select v-model="ruleForm.carType" placeholder="请选择车型">
                  <el-option
                    v-for="item in roles"
                    :label="item.label"
                    :key="item.id"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="购买价格" prop="price" class="price-form">
                <el-select v-model="ruleForm.price" placeholder="请选择价格范围">
                  <el-option
                    v-for="item in roles1"
                    :label="item.label"
                    :key="item.id"
                    :value="item.value"
                  ></el-option>
                </el-select>
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
      ref="multipleTable"
      border
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column label="序号" type="index" show-overflow-tooltip width="50" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="tel" label="电话" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="address" label="地址" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="carType" label="购买车型" min-width="10%" align="center"></el-table-column>
      <el-table-column prop="carType" label="购买价格" min-width="10%" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150" min-width="20%" align="center">
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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="updateForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="updateForm.tel" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="updateForm.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="购买车型" prop="carType">
          <el-select v-model="updateForm.carType" placeholder="请选择车型">
            <el-option v-for="item in roles" :label="item.label" :key="item.id" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购买价格" prop="price">
          <el-select v-model="updateForm.price" placeholder="请选择价格范围" class="price-form">
            <el-option
              v-for="item in roles1"
              :label="item.label"
              :key="item.id"
              :value="item.value"
            ></el-option>
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
  name: "buyClient",
  data() {
    return {
      multipleSelection: [],
      searchData: "",
      dialogDelete: false,
      visible: false,
      dialogUpdate: false,
      dialogAdd: false,
      rowVal: "",
      currentIndex: "",
      currentIndex: "",
      tableData: [],
      roles: [
        { label: "奥德赛", value: "奥德赛" },
        { label: "宾智", value: "宾智" },
        { label: "飞度", value: "飞度" },
        { label: "锋范", value: "锋范" },
        { label: "凌派", value: "凌派" },
        { label: "雅阁", value: "雅阁" }
      ],
      roles1: [
        { label: "10万以下", value: "10万以下" },
        { label: "10~20(万)", value: "10~20(万)" },
        { label: "20~30(万)", value: "20~30(万)" },
        { label: "30~40(万)", value: "30~40(万)" },
        { label: "40万以上", value: "40万以上" }
      ],
      ruleForm: {
        name: "",
        tel: "",
        email: "",
        address: "",
        carType: "",
        price: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 2, max: 40, message: "长度在 2 到 40 个字符", trigger: "blur" }
        ],
        carType: [{ required: true, trigger: "blur", message: "请选择车型" }],
        price: [{ required: true, trigger: "blur", message: "请选择价格" }],
        tel: [{ required: true, trigger: "blur", validator: validPhone }],
        email: [{ required: true, trigger: "blur", validator: validEmail }]
      },
      updateForm: {
        name: "",
        tel: "",
        email: "",
        address: "",
        carType: "",
        price: ""
      },
      rulesUpdate: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 2, max: 40, message: "长度在 2 到 40 个字符", trigger: "blur" }
        ],
        carType: [{ required: true, trigger: "blur", message: "请选择车型" }],
        price: [{ required: true, trigger: "blur", message: "请选择价格" }],
        tel: [{ required: true, trigger: "blur", validator: validPhone }],
        email: [{ required: true, trigger: "blur", validator: validEmail }]
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
        name: this.ruleForm.name,
        tel: this.ruleForm.tel,
        email: this.ruleForm.email,
        address: this.ruleForm.address,
        carType: this.ruleForm.carType,
        price: this.ruleForm.price
      };
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$http.post("api/addBuy", this.qs.stringify(form)).then(res => {
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
      this.updateForm.name = thisData.name;
      this.updateForm.tel = thisData.tel;
      this.updateForm.email = thisData.email;
      this.updateForm.address = thisData.address;
      this.updateForm.carType = thisData.carType;
      this.updateForm.price = thisData.price;
      this.dialogUpdate = true;
      this.currentIndex = index;
    },
    updateConfirm: function(updateForm) {
      const form = {
        name: this.updateForm.name,
        tel: this.ruleForm.tel,
        email: this.updateForm.email,
        address: this.updateForm.address,
        carType: this.updateForm.carType,
        price: this.updateForm.price
      };
      this.$refs[updateForm].validate(valid => {
        if (valid) {
          this.$http.post("api/updatBuy", this.qs.stringify(form)).then(res => {
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
      this.$http.post("api/deleteBuy", this.qs.stringify(form)).then(res => {
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
.buy-client {
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
.buy-client p {
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
.price-form {
  margin-top: -20px;
}
</style>
