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
  UPDATE_CAR: '/api/updateCar',
  /**
   * 删除销售人员
   */
  DEL_PERSON: '/api/delPerson',
  /**
   * 修改销售人员
   */
  UPDATE_PERSON: '/api/updatePerson',
  /**
   * 获取客户信息
   * @param label: 0来电 1来店 购车2
   */
  GET_CUSTOM: '/api/getCustomList',
  /**
   * 添加客户信息
   * @param label: 0来电 1来店 购车2
   */
  ADD_CUSTOM: '/api/addCustom',
  /**
   * 修改客户信息
   * 
   */
  UPDATE_CUSTOM:'/api/updateCustom',
  /**
   * 删除客户信息
   * 
   */
  DEL_CUSTOM:'/api/delCustom',
  /**
   * 添加公告
   */
  ADD_ANNOUNCE: '/api/addAnnounce',
  /**
   * 修改公告
   */
  UPDATE_ANNOUNCE: '/api/updateAnnounce',
  /**
   * 删除公告
   */
  DEL_ANNOUNCE: '/api/delAnnounce',
  /**
   * 获取公告列表
   */
  GET_ANNOUNCE: '/api/getAnnounceList',
  /**
   * 修改汽车状态
   */
  UPDATE_STATUS:'/api/updateStatus',
}
