export function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  return reg.test(str)
}
export function isvalidEmail(str) {
  const reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])/;
  return reg.test(str);
}
export function isvalidPrice(str) {
  const reg = /^\d+(\.\d{1,3})?$/;
  return reg.test(str);
}
