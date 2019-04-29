<template>
  <div>
    <el-container>
      <el-header>
        <v-carHeader></v-carHeader>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <v-carSidebar></v-carSidebar>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import carHeader from "../components/carHeader";
import carSidebar from "../components/carSidebar";
import carFooter from "../components/carFooter";
export default {
  name: "manage",
  components: {
    "v-carHeader": carHeader,
    "v-carSidebar": carSidebar,
    "v-carFooter": carFooter
  }
};
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}
.carHeader {
  padding: 0;
}
.carSidebar {
  background-color: #eff0f5;
  height: 100%;
}
.carFooter {
  background-color: #ffffff;
}
.el-container {
  height: 95%;
  margin-top: -10px;
}

.el-aside {
  height: 100%;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 10px;
}
</style>
