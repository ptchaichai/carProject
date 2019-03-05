<template>
  <div id="app">
    <v-sidebar></v-sidebar>
    <router-view></router-view>
    <v-content></v-content>
    <v-sManagerIndex></v-sManagerIndex>
  </div>
</template>

<script>
  import sidebar from './components/sManagerSidebar'
  import content from './components/content'
  import sManagerIndex from './components/sManagerIndex'
export default {
  name: 'App' ,
  components: {
    'v-sidebar':sidebar,
    'v-content':content,
    'v-sManagerIndex':sManagerIndex,

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
  margin-top: 60px;
}

</style>
