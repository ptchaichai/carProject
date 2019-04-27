export default {
  /**
   * 登录
   * @param phone 电话
   * @param password 密码
   */
  LOGIN: '/api/login',
  check: '/api/check',
  /**
   * 查看个人信息
   * @param id
   */
  GET_PERSON: '/api/getPerson',
  /**
   * 获取人员信息列表
   */
  GET_PERSON_LIST: '/api/getPersonList',
  /**
   * 添加账号
   * @username 姓名
   * @password 密码
   * @phone 电话
   * @role 角色 0总经理 1销售主管 2销售职员
   */
  ADD_ACCOUNT: '/api/addSubordinate'
}
