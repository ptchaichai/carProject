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
         <div class="warning" v-show="show">标题和内容都不能为空！</div>
         <el-button  round type="primary" class="add" @click="add" >添加</el-button>
         <el-button  round type="info" class="add"  @click="cancleOne">取消</el-button>
        </el-form>
      </div>
     <el-button slot="reference" round type="primary" @click="open">添加新公告</el-button>
    </el-popover>
      <div class="container-wrapper" v-for="(item,i) in items" :key="i" :ref="announcementDiv">
        <div class="container">
          <p @click="viewContent">{{items[i].title}}</p>
          <div class="view">
              <el-button slot="reference" round type="info" class="view" @click="deleteRow(i)">删除</el-button>
              <el-button slot="reference" round type="primary" class="edit" @click="edit(i)">编辑</el-button>
          </div>
           <el-dialog title="公告内容" :visible.sync="dialogView" width="50%">
              <div class="dialog-box">
                    <el-input v-model="items[i].title" readonly="readonly"></el-input>
                    <el-input v-model="items[i].content" type="textarea" readonly="readonly" class="textarea"></el-input>
                  <el-button  round type="primary" @click="dialogView= false">关闭</el-button>
              </div>
            </el-dialog>
             <el-dialog title="编辑公告" :visible.sync="dialogEdit" width="50%">
              <div class="dialog-box">
                <el-form >
                <el-input v-model="items[i].title"></el-input>
                <el-input v-model="items[i].content"  type="textarea" class="textarea"></el-input>
                <div class="warning" v-show="showAnother">标题和内容都不能为空！</div>
                <el-button type="primary" @click="addContent(i)" round>确 定</el-button>
                <el-button @click="cancelContent(i)" round>取 消</el-button>
                </el-form>
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
      </div>
    </div>
</template>

<script>
export default {
  name: "updatePwd",
  data() {
    return {
      show: false,
      showAnother: false,
      inputTitle: "",
      inputContent: "",
      visible: false,
      dialogView: false,
      dialogEdit: false,
      dialogDelete: false,
      inputNewTile: "",
      inputNewContent: "",
      oldTitle: "",
      oldContent: "",
      items: [],
      currentIndex: ""
    };
  },
  methods: {
    open: function() {
      this.visible = true;
    },
    add: function() {
      const inputTitle = this.inputTitle;
      const inputContent = this.inputContent;
      if (inputTitle === "" || inputContent === "") {
        this.show=true;
        return false;
      } else {
        this.show=false;
        this.items.push({ title: inputTitle, content: inputContent });
        this.oldTitle = inputTitle;
        this.oldContent = inputContent;
        this.inputTitle = "";
        this.inputContent = "";
        this.visible = false;
      }
    },
    cancleOne: function() {
      this.inputTitle = "";
      this.inputContent = "";
      this.show=false;
      this.visible = false;
    },
    viewContent: function() {
      this.dialogView = true;
    },
    edit: function(i) {
      this.dialogEdit = true;
      this.oldTitle = this.items[i].title;
      this.oldContent = this.items[i].content;
    },
    addContent: function(i) {
      if(this.items[i].title===''||this.items[i].content===''){
        this.showAnother=true;
        return false;
      }else{
        this.showAnother=false;
        this.dialogEdit = false;
      }
    },
    cancelContent: function(i) {
      this.items[i].title = this.oldTitle;
      this.items[i].content = this.oldContent;
      this.showAnother=false;
      this.dialogEdit = false;
    },
    deleteRow: function(index) {
      this.dialogDelete = true;
      this.currentIndex = index;
    },
    removeConfirm: function() {
      const i = this.currentIndex;
      this.items.splice(i, 1);
      this.dialogDelete = false;
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
.container {
  position: relative;
}
.container p {
  color: #777;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 50%;
  margin: 18px 25px;
  text-align: left;
}
.container p:hover {
  color: #409eff;
}
.view {
  position: absolute;

  top: -5px;

  right: 50px;
}
.warning{
  color:red;
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
</style>
