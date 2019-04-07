<template>
  <div class="perfect-box">
    <p>完善资料</p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="性别" prop="sex">
        <el-select v-model="ruleForm.sex" placeholder="请选择性别">
          <el-option
            v-for="(item,id) in roles"
            :label="item.label"
            :key="item.id"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期" prop="age">
        <div class="block">
          <el-date-picker format="yyyy-MM-dd" v-model="ruleForm.age" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
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
import bus from "./../bus.js";
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
  name: "perfect",
  data() {
    return {
      dateValue:"",
      value: "",
      roles: [
        { label: "男", id: 1, value: "男" },
        { label: "女", id: 2, value: "女" }
      ],
      ruleForm: {
        email: "",
        address: "",
        age: "",
        sex: ""
      },
      rules: {
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 2, max: 20, message: "请输入 2 到 20 个字符", trigger: "blur" }
        ],
        email: [{ required: true, trigger: "blur", validator: validEmail }],
        age: [{ required: true, trigger: "blur", message: "请选择出生日期" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }]
      },
      perfectArr: []
    };
  },
  methods: {
    // 获取时间
    // getTime(val) {
    //     this.ruleForm.age = val;
    //   },
    perfectConfirm: function(ruleForm) {
      const form = {
        sex: this.ruleForm.sex,
        age: this.ruleForm.age,
        email: this.ruleForm.email,
        address: this.ruleForm.address
      };
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.perfectArr = [form.sex, form.age, form.email, form.address];
          // this.$http.post("api/perfect", this.qs.stringify(form)).then(res => {
          //   if (res.data.status === 0) {
          //     bus.$emit("perfectSend", this.perfectArr);
          //     this.$message.success("提交成功");
          //     this.$refs[ruleForm].resetFields();
          //   } else {
          //     this.$message.error("提交失败");
          //   }
          // });
          console.log(form.age);
        } else {
          return false;
        }
      });
    },
    perfectCancel: function(ruleForm) {
      this.$refs[ruleForm].resetFields();
    }
  }
};
</script>

<style scoped>
.perfect-box {
  margin: 0px auto;
  height: 770px;
  background: #fcfcfc;
}
.el-form {
  margin-top: 50px;
  width: 60%;
  margin: 80px auto;
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
