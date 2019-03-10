<template>
    <div class="announcement" >
      <el-popover v-model="visible"
       width="500">
      <div class="dialog-box">
        <el-form>
          <el-form-item label="公告标题:">
          <el-input v-model="inputTitle" placeholder="请输入公告标题" class="input-title"></el-input>
         </el-form-item>
         <el-form-item label="公告内容:">
          <el-input v-model="inputContent" placeholder="请输入公告内容" type="textarea"></el-input>
         </el-form-item>
         <el-button  round type="primary" class="add" @click="add" >添加</el-button>
         <el-button  round type="info" class="add"  @click="cancleOne">取消</el-button>
        </el-form>
      </div>
     <el-button slot="reference" round type="primary" @click="open">添加新公告</el-button>
    </el-popover>
      <div class="container-wrapper" v-for="(item,i) in items">
        <div class="container">
          <p>{{items[i].title}}</p>
          <div class="view">
            <el-popover v-model="visibleOne"
               width="500">
              <div class="dialog-box">
                    <el-input v-model="items[i].title" readonly="readonly"></el-input>
                    <el-input v-model="items[i].content" type="textarea" readonly="readonly" class="textarea"></el-input>
                  <el-button  round type="primary" class="addOne" @click="addOne">确定</el-button>
              </div>
              <el-button slot="reference" round type="primary" class="view" @click="viewContent">查看</el-button>
            </el-popover>
            <el-popover v-model="visibleTwo"
               width="500">
              <div class="dialog-box">
                <el-input v-model="items[i].title"></el-input>
                <el-input v-model="items[i].content"  type="textarea" class="textarea"></el-input>
                <el-button  round type="primary" class="addTwo" @click="addTwo">确定</el-button>
                <el-button  round type="info" class="addTwo" @click="cancelTwo">取消</el-button>
              </div>
              <el-button slot="reference" round type="primary" class="edit" @click="edit">编辑</el-button>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "updatePwd",
  data() {
    return {
      show:false,
      inputTitle: "",
      inputContent: "",
      visible:false,
      visibleOne:false,
      visibleTwo:false,
      inputNewTile:'',
      inputNewContent:'',
      items:[

      ],
    }
  },
    methods :{
      open:function(){
        this.visible=true;
      },
      add:function(){
        const inputTitle=this.inputTitle;
        const inputContent=this.inputContent;
        this.items.push({title:`${inputTitle}`,content:`${inputContent}`});
        // inputNewTile=this.inputTitle;
        // inputNewContent=this.inputContent;
        this.inputTitle='';
        this.inputContent='';
        this.visible=false;

      },
      cancleOne:function(){
        this.inputTitle='';
        this.inputContent='';
        this.visible=false;
      },
      viewContent:function(){
        this.visibleOne=true;
      },
      addOne:function(){
      this.visibleOne=false;
      },
      addTwo:function(){
        this.visibleTwo=false;
      },
      cancelTwo:function(){
        this.visibleTwo=false;
        // this.inputTitle=inputNewTile;
        // this.inputContent=inputNewContent;
      },
      edit:function(){
        this.visibleTwo=true;
      },

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
  .container-wrapper{
    width: 100%;

    border: 1px solid #ccc;

    margin-top: 10px;
  }
  .container{
    position: relative;
  }
  .view{
    position: absolute;

    top: -5px;

    right: 50px;
  }
  .edit{
    position: absolute;
    right: -46px;
    top:-5px;
  }
  .textarea{
    margin:10px 0;
  }
</style>
