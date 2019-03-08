export const MENU = [
  {
    menuName: '首页',
    menuUrl: '/login',
    menuIndex: '0'
  },
  {
    menuName: '个人信息管理',
    menuUrl: '/personal',
    menuIndex: '1',
    menuSubLink: [
      {
        menuName: '个人信息',
        menuUrl: '/information',
        menuIndex: '1-1'
      },
      {
        menuName: '修改密码',
        menuUrl: '/updatePwd',
        menuIndex: '1-2'
      },
      {
        menuName: '信息管理',
        menuUrl: '/subordinate',
        menuIndex: '1-3'
      },
    ]
  },
  {
    menuName: '客户信息管理',
    menuUrl: '/ client',
    menuIndex: '2',
    menuSubLink: [
      {
        menuName: '来电客户',
        menuUrl: '/callClient',
        menuIndex: '2-1'
      },
      {
        menuName: '来店客户',
        menuUrl: '/comeClient',
        menuIndex: '2-2'
      },
      {
        menuName: '购车客户',
        menuUrl: '/buyClient',
        menuIndex: '2-3'
      },
    ]
  },


  {
    menuName: '销售信息管理',
    menuUrl: '/saleInformation',
    menuIndex: '3'
  },
  {
    menuName: '汽车信息管理',
    menuUrl: '/carInformation',
    menuIndex: '4'
  },


  // {
  //   menuName: '系统设置',
  //   menuUrl: '/system_set',
  //   menuIndex: '5',
  //   menuSubLink: [
  //     // {
  //     //   menuName: '角色权限设置',
  //     //   menuUrl: '/role_set',
  //     //   menuIndex: '5-1'
  //     // },
  //     {
  //       menuName: '用户管理',
  //       menuUrl: '/user_manage',
  //       menuIndex: '5-2'
  //     }
  //   ]
  // },
  // {
  //   menuName: '退出登录',
  //   menuUrl: '/login_out',
  //   menuIndex: '6'
  // }
]
