<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header'
  import sidebar from './components/sidebar'
  import footer from './components/footer'
  import login from './components/login'
  // import content from './components/content'
export default {
  name: 'App' ,
  components: {
     'v-header':header,
     'v-sidebar':sidebar,
     'v-footer':footer,
     'v-login':login,
  },
  data(){
    return {
      show:true,
      loginShow:false,
    }
  },
  methods:{
    loginSuccess(){
      this.show=true;
      this.loginShow=false;
    },
    backLogin(){
      this.show=false;
      this.loginShow=true;
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}
.header {
  padding: 0;
}
.sidebar {
  background-color: #EFF0F5;
  height: 100%;
}
.footer{
  background-color: #ffffff;
}
.el-container{
  height: 95%;
}

.el-aside {
      height: 100%;
    margin-top: 20px;
    margin-left: 20px;
        border-radius: 10px;
}
</style>
