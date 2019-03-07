<template>
    <div class="content">
       <el-container>
         <v-login></v-login>
         <v-updatePwd></v-updatePwd>
         <v-announcement val=""></v-announcement>
         <v-subordinate></v-subordinate>
        </el-container>
    </div>
  <!--<v-content></v-content>-->
</template>
<script>
import login from "../page/login";
import updatePwd from "../page/updatePwd";
import announcement from "../page/announcement";
import subordinate from "../page/subordinate";
import eventVue from '../page/event.js'
export default {
  name: "content",
  val:false,
  components: {
    "v-login": login,
    "v-updatePwd": updatePwd,
    "v-announcement":announcement,
    "v-subordinate":subordinate
  },
  mounted() {
    eventVue.$on('go', function(){
      val=true;
    })
  }
};
</script>

<style scoped>
.content {
  width: 100%;
}
</style>
