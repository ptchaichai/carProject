<template>
    <div>
      <el-container v-show="show">
        <el-header>
          <v-header @backLogin="backLogin"></v-header>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <v-sidebar></v-sidebar>
          </el-aside>
          <el-container>
            <el-main><router-view v-show="show"></router-view></el-main>
          </el-container>
        </el-container>
      </el-container>
    </div>
</template>

<script>
    export default {
        name: "index.vue"
    }
</script>

<style scoped>

</style>
