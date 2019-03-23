export function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}
export function isvalidType(str) {
  const arr=["奥德赛","宾智","飞度", "锋范","凌派","雅阁",]
  return arr.indexOf(str.trim())>=0
}
export function isvalidEmail(str) {
  const reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])/
  return reg.test(str);
}
