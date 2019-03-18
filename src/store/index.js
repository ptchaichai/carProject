// store.js
import Vue from 'Vue'
import Vuex from 'vuex'

// 引入 axios
import axios from 'axios'

Vue.use(Vuex)
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const store = new Vuex.Store({
  state: {
    user: {
      uuid: '',
      name: '',
      tel: '',
      address: '',
    },
    announcement:[],
    client: {
      name: '',
      tel: '',
      address: '',
    },
    roles: {
      1: {
        text: '总经理',
      },
      2: {
        text: '销售经理',
      },
      3: {
        text: '销售人员',
      },
    },
    car: {
      type: '',
    },
    count:0,
  },
  actions: {
    addAnnouncement(context, form) {
      axios.post('/announcement', {
        title: form.title,
        content: form.content,
      }).then((res) => {
        result = res;
      }).catch((res) => {
        console(res);
      })
    },
    incre(content){
      this.$store.commit('incre');
    }
  },
  mutations:{
    addAnnouncement(state,{title,content}){
      state.announcement.push({ title: title, content: content });
    },
    incre(state){
      state.conut++;
    }
  }
});
