<template>
  <div class="perfect-box">
    <p>修改资料</p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="电话" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="请输入电话"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idcard" v-show="show">
        <el-input v-model="ruleForm.idcard" placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item label="出生日期" prop="age" v-show="show">
        <div class="block">
          <el-date-picker format="yyyy-MM-dd" v-model="ruleForm.age" type="date" placeholder="选择日期"
            value-format="yyyy-MM-dd"></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="性别" prop="sex" v-show="show">
        <el-select v-model="ruleForm.sex" placeholder="请选择性别">
          <el-option v-for="(item,id) in roles" :label="item.label" :key="item.id" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="住址" prop="address">
        <el-input v-model="ruleForm.address" placeholder="请输入住址"></el-input>
      </el-form-item>
      <el-button round type="primary" class="addInformation" @click="perfectConfirm('ruleForm')">提交</el-button>
      <el-button round type="info" class="addCancel" @click="perfectCancel('ruleForm')">取消</el-button>
    </el-form>
  </div>
</template>

<script>
  import { isvalidEmail } from "./../valid";
  import { isvalidPhone } from "./../valid";
  import API from "./../api.js";
  const validEmail = (rule, value, callback) => {
    if (!value) {
      callback(new Error("请输入邮箱"));
    } else if (!isvalidEmail(value)) {
      callback(new Error("请输入正确邮箱格式"));
    } else {
      callback();
    }
  };
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
    name: "perfect",
    data() {
      return {
        show: false,
        dateValue: "",
        role: "",
        value: "",
        roles: [
          { label: "男", id: 1, value: "0" },
          { label: "女", id: 2, value: "1" }
        ],
        ruleForm: {
          phone: "",
          email: "",
          address: "",
          idcard: "",
          age: "",
          sex: "",
          idcard: "",
        },
        rules: {
          address: [
            { required: true, message: "请输入地址", trigger: "blur" },
            { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
          ],
          idcard: [
            { required: true, message: "请输入地址", trigger: "blur" },
            { min: 18, max: 18, message: "请输入正确的身份证号", trigger: "blur" }
          ],
          email: [{ required: true, trigger: "blur", validator: validEmail }],
          age: [{ required: true, trigger: "blur", message: "请选择出生日期" }],
          phone: [{ required: true, trigger: "blur", validator: validPhone }],
          sex: [{ required: true, message: "请选择性别", trigger: "blur" }]
        },
        perfectArr: []
      };
    },
    created() {
      this.getPersonalInfo();
      let role = sessionStorage.getItem("role");
      if (+role === 0) {
        this.show = false;
      } else if (+role === 1 || +role === 2) {
        this.show = true;
      }
    },
    methods: {
      // 获取时间
      // getTime(val) {
      //     this.ruleForm.age = val;
      //   },
      perfectConfirm: function (ruleForm) {
        const form = {
          id: sessionStorage.getItem('id'),
          sex: this.ruleForm.sex,
          age: this.ruleForm.age,
          email: this.ruleForm.email,
          address: this.ruleForm.address,
          phone: this.ruleForm.phone,
          idcard: this.ruleForm.idcard,
          role: sessionStorage.getItem('role')
        };
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            this.$http.post("/api/updateInformation", this.qs.stringify(form)).then(res => {
              if (res.data.status === 0) {
                sessionStorage.setItem('phone', this.ruleForm.phone)
                this.$message.success("提交成功");
                this.$refs[ruleForm].resetFields();
              } else {
                this.$message.error("提交失败");
              }
            });
          } else {
            return false;
          }
        });
      },
      //先获取
      getPersonalInfo() {
        this.$http.post(API.GET_PERSON, this.qs.stringify({})).then(result => {
          if (result.data.status === 0) {
            this.ruleForm = {
              sex: result.data.data.sex = 0 ? '男' : '女',
              age: result.data.data.birthday ? result.data.data.birthday.substr(0, 10) : null,
              email: result.data.data.email,
              address: result.data.data.address,
              phone: result.data.data.phone,
              idcard: result.data.data.idcard,
              role: sessionStorage.getItem('role')
            }
          } else {
            this.$message.error("请求失败");
          }
        });
      },
      perfectCancel: function (ruleForm) {
        this.$refs[ruleForm].resetFields();
      }
    }
  };
</script>

<style scoped>
  .perfect-box {
    margin: 0px auto;
    height: 770px;
    background: #fefefe;
  }

  .el-form {
    margin-top: 50px;
    width: 60%;
    margin: 30px auto;
  }

  .el-date-editor {
    width: 100%;
  }

  .perfect-box p {
    text-align: left;
    border-bottom: 1px solid #ccc;
    color: #3a8ee6;
    font-size: 20px;
    font-weight: 700;
  }

  .el-select {
    width: 100%;
  }
</style>