
<template>
    <div class="announcement" >
      <p>{{count}}</p>
      <button @click="incre">点击加1</button>
    </div>
</template>

<script>
import Bus from '../components/bus.js';
export default {
  name: "updatePwd",
  data() {
    return {
      count:this.$store.state.count,
    };
  },
  methods: {
    incre(){
      this.$store.dispatch('incre');
    }
  }
};
</script>

<style scoped>
.announcement {
  width: 80%;
  margin: 50px auto;
}
.dialog-box {
  width: 100%;
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
