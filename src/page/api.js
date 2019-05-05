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
   * 获取经理列表
   */
  GET_MANAGER_LIST: '/api/getManagerList',
  /**
   * 添加账号
   * @username 姓名
   * @password 密码
   * @phone 电话
   * @role 角色 0总经理 1销售主管 2销售职员
   */
  ADD_ACCOUNT: '/api/addEmployee',
  /**
   * 删除经理
   */
  DEL_MANAGER: '/api/delManager',
  /**
   * 修改经理信息
   */
  UPDATE_MANAGER: '/api/updateManager',
  /**
   * 获取汽车信息
   */
  GET_CARLIST: '/api/getCarList',
  /**
   * 添加汽车信息
   */
  ADD_CAR: '/api/addCar',
  /**
   * 修改汽车信息
   */
  UPDATE_CAR: '/api/updateCar'
}
