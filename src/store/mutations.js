export default {
  // 加1
  incre(state) {
    state.count++;
  },
  decre(state) {
    state.count--;
  },
  addcar(state, type) {
    const typeval = type;
    const carType = state.carType;
      const carIndex = carType.indexOf(typeval);
      alert(carIndex);
      if (carIndex > -1) {
        state.monthCarData[carIndex]++;
        state.yeaCarrData[carIndex]++;
      }
  },
  addCall(state,num){
    const numVal=num;
    state.dayData[numVal]++;
    state.monthData[numVal]++;
    state.quarterData[numVal]++;
    state.yearData[numVal]++;
  }
}
