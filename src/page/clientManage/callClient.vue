<template>
  <div class="call-client">
    <p>来电客户信息管理</p>
    <div class="search-add">
      <div class="box">
        <div class="search-input" style="width:400px">
          <el-input placeholder="请输入内容" v-model="searchData" class="input-with-select">
            <el-select v-model="searchName" slot="prepend" placeholder="类型" style="width: 110px;"
              @keyup.enter.native='search()'>
              <el-option label="姓名" value="name"></el-option>
              <el-option label="电话" value="phone"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
        <el-dialog title="添加信息" :visible.sync="dialogAdd" width="50%">
          <div class="dialog-box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入电话"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="address">
                <el-input v-model="ruleForm.address" placeholder="请输入地址"></el-input>
              </el-form-item>
              <el-form-item label="价格意愿（万元）" prop="hope_price">
                <el-select v-model="ruleForm.hope_price" placeholder="请选择价格范围" class="select-input">
                  <el-option v-for="item in roles" :label="item.label" :key="item.id" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-button round type="primary" class="addInformation" @click="addConfirm('ruleForm')">确定</el-button>
              <el-button round type="info" class="cancelInformation" @click="addCancel('ruleForm')">取消</el-button>
            </el-form>
          </div>
        </el-dialog>
        <el-button type="primary" size="small" round class="add" @click="add" v-show="showAdd">添加</el-button>
      </div>
    </div>
    <el-table :data="tableData" ref="multipleTable" border :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="50" align="center"></el-table-column> -->
      <el-table-column label="序号" type="index" show-overflow-tooltip width="50" align="center"></el-table-column>
      <el-table-column prop="label" label="类型" min-width="15%" align="center">
        <template slot-scope="scop">
          {{scop.row.label == 0 ? '来电客户': (scop.row.label == 1 ? '来店客户' : '购车客户')}}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="phone" label="电话" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="20%" align="center"></el-table-column>
      <el-table-column prop="address" label="地址" min-width="20%" align="center"></el-table-column>
      <el-table-column prop="hope_price" label="价格意愿" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="user_name" label="处理人" min-width="23%" align="center">
        <template slot-scope="scop">
          <span>{{scop.row.user_name}}</span>(<span>{{scop.row.user_phone}}</span>)
        </template>
      </el-table-column>
      <el-table-column prop="add_time" label="添加时间" min-width="20%" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="45%" align="center" v-if="showAdd">
        <template slot-scope="scope">
          <el-button slot="reference" type="primary" size="small" round class="update" @click="update(scope.row)"
            v-show="(scope.row.user_id == nowId ? true :false)">修改
          </el-button>
          <el-button @click="deleteRow(scope.row)" type="info" size="small" round
            v-show="(scope.row.user_id == nowId ? true :false)">删除</el-button>
          <span @click="shift(scope.row)" style="color:#f56c6c; margin-left: 10px;font-size: 14px;cursor: pointer;"
            v-show="(scope.row.user_id == nowId ? true :false)">转移!
          </span>
          <span v-show="(scope.row.user_id == nowId ? false:true)">暂无权限</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="类型操作" min-width="23%" align="center" v-if="showAdd">
        <template slot-scope="scope">
          <span slot="reference" style="color:#f56c6c; margin-left: 10px;font-size: 14px;cursor: pointer;"
            @click="change(scope.row)" v-show="(scope.row.user_id == nowId ? true :false)">类型转换
          </span>
          <span v-show="(scope.row.user_id == nowId ? false:true)">暂无权限</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="totalCount" :page-count="page" :page-size.sync="pageSize"
      :current-page.sync="page" @size-change="getCustomList()" @current-change="getCustomList()"
      @prev-click="getCustomList()" @next-click="getCustomList()">
    </el-pagination>
    <div style="margin-top: 20px" v-show="false">
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
    <el-dialog title="提示：该操作将给客户类型转为购车客户" :visible.sync="dialogChange" width="35%">
      <el-form :model="changeForm" :rules="rulesChange" ref="changeForm">
        <el-form-item label="购买车型" prop="shape">
          <el-select v-model="changeForm.shape" placeholder="请选择车型" class="select-input">
            <el-option v-for="item in roles2" :label="item.label" :key="item.id" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购买价格（万元）" prop="sale_price" class="price-form">
          <el-input v-model="changeForm.sale_price" placeholder="请输入购买价格"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="changeConfirm('changeForm')" round>确 定</el-button>
      <el-button @click="changeCancel('changeForm')" round>取 消</el-button>
    </el-dialog>
    <el-dialog title="警告！" :visible.sync="dialogShift" width="35%">
      <i class="el-icon-warning"></i>
      <span>是否要要将此客户转移到其他人员名下，转移后不可更改？</span>
      <el-form :model="shiftForm" :rules="rulesShift" ref="shiftForm" style="width: 86%;margin: 0 auto;">
        <el-form-item label="接受客户的销售人员电话" prop="phone">
          <el-input v-model="shiftForm.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="shiftConfirm('shiftForm')" round>确 定</el-button>
      <el-button @click="shiftCancel('shiftForm')" round>取 消</el-button>
    </el-dialog>
    <el-dialog title="修改信息" :visible.sync="dialogUpdate" width="50%">
      <el-form :model="updateForm" :rules="rulesUpdate" ref="updateForm">
        <el-form-item label="电话" prop="phone">
          <el-input v-model="updateForm.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="updateForm.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="价格意愿（万元）" prop="hope_price">
          <el-select v-model="updateForm.hope_price" placeholder="请选择价格范围" class="select-input">
            <el-option v-for="item in roles" :label="item.label" :key="item.id" :value="item.value"></el-option>
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
  import { isvalidPrice } from "./../valid";
  import API from "./../api.js";
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
  const checkPrice = (rule, value, callback) => {
    if (!value) {
      callback(new Error("请输入价格"));
    } else if (!isvalidPrice(value)) {
      return callback(new Error("输入不能为空，且最多三位小数"));
    } else {
      callback();
    }
  };
  export default {
    name: "callClient",
    data() {
      return {
        showAdd: false,
        searchName: '选择', //搜索的条件
        searchData: "", //搜索的名字
        multipleSelection: [],
        searchData: "",
        page: 1, //页码
        pageSize: 10, //一条默认页数
        dialogDelete: false,
        dialogUpdate: false,
        dialogAdd: false,
        dialogChange: false,
        dialogShift: false,
        inputName: "",
        rowVal: "",
        nowId: "",
        changeID: "",
        delID: "",
        shiftID: "",
        changeTime:"",
        currentIndex: "",
        currentIndex: "",
        tableData: [],
        totalCount: 0,
        roles: [
          { label: "10万以下", value: "10万以下" },
          { label: "10~20(万)", value: "10~20(万)" },
          { label: "20~30(万)", value: "20~30(万)" },
          { label: "30~40(万)", value: "30~40(万)" },
          { label: "40万以上", value: "40万以上" }
        ],
        roles2: [
          { label: "奥德赛", value: "奥德赛" },
          { label: "宾智", value: "宾智" },
          { label: "飞度", value: "飞度" },
          { label: "锋范", value: "锋范" },
          { label: "凌派", value: "凌派" },
          { label: "雅阁", value: "雅阁" }
        ],
        ruleForm: {
          name: "",
          phone: "",
          email: "",
          address: "",
          price: ""
        },
        shiftForm: {
          phone: "",
        },
        changeForm: {
          shape: "",
          sale_price: "",
        },
        rulesShift: {
          phone: [{ required: true, trigger: "blur", validator: validPhone }],
        },
        rulesChange: {
          shape: [{ required: true, trigger: "blur", message: "请选择车型" }],
          sale_price: [{ required: true, trigger: "blur", validator: checkPrice }],
        },
        rules: {
          name: [
            { required: true, message: "请输入姓名", trigger: "blur" },
            { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
          ],
          address: [
            { required: true, message: "请输入地址", trigger: "blur" },
            { min: 2, max: 40, message: "长度在 2 到 40 个字符", trigger: "blur" }
          ],
          phone: [{ required: true, trigger: "blur", validator: validPhone }],
          email: [{ required: true, trigger: "blur", validator: validEmail }],
          price: [{ required: true, message: "请选择价格意愿", trigger: "blur" }]
        },
        updateForm: {
          name: "",
          phone: "",
          email: "",
          address: "",
          hope_price: ""
        },
        rulesUpdate: {
          name: [
            { required: true, message: "请输入姓名", trigger: "blur" },
            { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
          ],
          address: [
            { required: true, message: "请输入地址", trigger: "blur" },
            { min: 2, max: 40, message: "长度在 2 到 40 个字符", trigger: "blur" }
          ],
          phone: [{ required: true, trigger: "blur", validator: validPhone }],
          email: [{ required: true, trigger: "blur", validator: validEmail }],
          hope_price: [{ required: true, message: "请选择价格意愿", trigger: "blur" }]
        },
        tablephone: []
      };
    },
    created() {
      let role = sessionStorage.getItem("role");
      this.nowId = sessionStorage.getItem("id");
      if (+role === 0 || +role === 1) {
        this.showAdd = false;
      } else if (+role === 2) {
        this.showAdd = true;
      }
      this.getCustomList()
    },
    methods: {
      //获取列表
      getCustomList() {
        const params = {
          page: this.page,
          page_size: this.pageSize,
          search_idx: this.searchName,
          search_value: this.searchData,
          label: 0
        }
        this.$http.post(API.GET_CUSTOM, this.qs.stringify(params)).then((result) => {
          if (result.data.status === 0) {
            this.tableData = result.data.data.map((item) => {
              item.add_time = item.add_time.substr(0, 10);
              return item;
            });;
            this.totalCount = result.data.count;
          } else {
            this.$message.error("获取失败");
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
        if (rowIndex % 2 === 0) {
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
        this.page = 1;
        this.pageSize = 10;
        this.getCustomList();
      },
      add: function () {
        this.dialogAdd = true;
      },
      addConfirm: function (ruleForm) {
        const form = {
          name: this.ruleForm.name,
          phone: this.ruleForm.phone,
          email: this.ruleForm.email,
          address: this.ruleForm.address,
          hope_price: this.ruleForm.hope_price,
          label: 0,
          user_name: sessionStorage.getItem("name"),
          user_id: sessionStorage.getItem("id"),
          user_phone: sessionStorage.getItem("phone"),

        };
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            this.$http.post(API.ADD_CUSTOM, this.qs.stringify(form)).then(res => {
              if (res.data.status === 0) {
                this.$refs[ruleForm].resetFields();
                this.dialogAdd = false;
                this.$message.success("添加成功");
                this.getCustomList()
              } else {
                this.$message.error("添加失败，电话或邮箱已存在！");
              }
            });
          } else {
            return false;
          }
        });
      },
      addCancel: function (ruleForm) {
        this.$refs[ruleForm].resetFields();
        this.dialogAdd = false;
      },
      update: function (row) {
        this.rowVal = row.id;
        this.updateForm.phone = row.phone;
        this.updateForm.email = row.email;
        this.updateForm.address = row.address;
        this.updateForm.hope_price = row.hope_price;
        this.dialogUpdate = true;
      },
      updateConfirm: function (updateForm) {
        const form = {
          id: this.rowVal,
          phone: this.updateForm.phone,
          email: this.updateForm.email,
          address: this.updateForm.address,
          hope_price: this.updateForm.hope_price,
        };
        this.$refs[updateForm].validate(valid => {
          if (valid) {
            this.$http
              .post(API.UPDATE_CUSTOM, this.qs.stringify(form))
              .then(res => {
                if (res.data.status === 0) {
                  this.dialogUpdate = false;
                  this.$message.success("修改成功");
                  this.getCustomList()
                } else {
                  this.$message.error("修改失败，电话或邮箱已存在！");
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
      deleteRow: function (row) {
        this.delID = row.id;
        this.dialogDelete = true;
      },
      removeConfirm: function () {
        const form = {
          id: this.delID
        };
        this.$http.post(API.DEL_CUSTOM, this.qs.stringify(form)).then(res => {
          if (res.data.status === 0) {
            this.dialogDelete = false;
            this.$message.success("删除成功");
            this.getCustomList()
          } else {
            this.$message.error("删除失败");
          }
        });
      },
      shift: function (row) {
        this.shiftID = row.id;
        this.dialogShift = true;
      },
      shiftConfirm: function (shiftForm) {
        const form = {
          phone: this.shiftForm.phone,
          id: this.shiftID,
          role: 2,
        };
        this.$refs[shiftForm].validate(valid => {
          if (valid) {
            this.$http
              .post(API.SHIFT_CUSTOM, this.qs.stringify(form))
              .then(res => {
                if (res.data.status === 0) {
                  this.dialogShift = false;
                  this.$message.success("转移成功");
                  this.getCustomList()
                } else {
                  this.$message.error("转移失败，该销售人员不存在！");
                }
              });
          } else {
            return false;
          }
        });
      },
      shiftCancel: function (shiftForm) {
        this.$refs[shiftForm].resetFields();
        this.dialogShift = false;
      },
      change: function (row) {
        this.changeID = row.id;
        this.dialogChange = true;
        const date = new Date();
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes() + ':';
        const s = date.getSeconds();
        this.changeTime = Y + M + D + h + m + s;
      },
      changeConfirm: function (changeForm) {
        const form = {
          shape: this.changeForm.shape,
          sale_price: this.changeForm.sale_price,
          id: this.changeID,
          label: 2,
          add_time:this.changeTime,
        };
        this.$refs[changeForm].validate(valid => {
          if (valid) {
            this.$http
              .post(API.CHANGE_CUSTOM, this.qs.stringify(form))
              .then(res => {
                if (res.data.status === 0) {
                  this.dialogChange = false;
                  this.$message.success("转换成功");
                  this.getCustomList()
                } else {
                  this.$message.error("转换失败");
                }
              });
          } else {
            return false;
          }
        });
      },
      changeCancel: function (changeForm) {
        this.$refs[changeForm].resetFields();
        this.dialogChange = false;
      },
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
    width: 95%;
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
    width: 95%;
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

  .select-input {
    width: 100%;
    margin-bottom: 20px;
  }
</style>