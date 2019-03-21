import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import actions from "./actions"
import mutations from "./mutations"
import getters from "./getters"

export default new Vuex.Store({
  state: {
    count: 0,
    tableData: [],
    dayData: [0, 0, 0, 0, 0, 0],
    monthData: [0, 0, 0, 0, 0, 0],
    quarterData: [0, 0, 0, 0, 0, 0],
    yearData: [0, 0, 0, 0, 0, 0],
    monthCarData: [0, 0, 0, 0, 0, 0],
    yearCarData: [0, 0, 0, 0, 0, 0],
    carType: ["奥德赛", "宾智", "飞度", "锋范", "凌派", "雅阁"],
  },
  actions,
  mutations,
  getters
})
