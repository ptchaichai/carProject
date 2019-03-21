<template>
    <div>
        <h3>Count is {{count}}</h3>
        <h3>Count2 is {{count}}</h3>
        <h3>Count3 is {{count}}</h3>
        <p>组件自己的内部计算属性 {{ localComputed }}</p>
        <el-button @click="incre">点击加一</el-button>
        <el-button @click="decre">点击减一</el-button>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
      data:{
        return:{
          // count:0
        }
      },
      computed:  {
           localComputed () {
                return this.count + 10;
            },
            ...mapState([   // 数组
            "count"
        ]),
    },
        methods:{
          incre(){
            this.$store.dispatch('incre')
          },
          decre(){
            this.$store.dispatch('decre')
          },
        }
    }
</script>
