import api from './api';

// getMineBaseApi({commit}) {
//   alert('进入action');
//   api.mineBaseMsgApi()
//   .then(res => {
//       alert('action中调用封装后的axios成功');
//       console.log('action中调用封装后的axios成功')
//       commit(types.GET_BASE_API, res)
//   })
// }
export default {
  incre({commit}){
    commit('incre');
  },
  decre({commit}){
    commit('decre');
  },
  addcar({commit},type){
    commit('addcar',type);
  },
  addCall({commit},num){
    commit('addCall',num);
  }
}
