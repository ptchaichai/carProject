<template>
  <div id="app">
    <el-container>
      <el-header>
        <v-header></v-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <v-sidebar></v-sidebar>
        </el-aside>
        <el-container>
          <el-main><router-view></router-view></el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import header from './components/header'
  import sidebar from './components/sidebar'
  import footer from './components/footer'
  // import content from './components/content'
export default {
  name: 'App' ,
  components: {
     'v-header':header,
     'v-sidebar':sidebar,
     'v-footer':footer,
    //  'v-content':content,

  }
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
