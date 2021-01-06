const Tree = [
  {
    id: '101',
    authName: '用户管理',
    children: [
      {
        id: '106',
        authName: '用户列表'
      }
    ]
  },
  {
    id: '102',
    authName: '权限管理',
    children: [
      {
        id: '107',
        authName: '角色列表',
        children: [
          {
            id: '114',
            authName: '添加角色'
          },
          {
            id: '115',
            authName: '删除角色'
          },
          {
            id: '116',
            authName: '角色授权'
          },
          {
            id: '117',
            authName: '取消角色授权'
          },
          {
            id: '118',
            authName: '获取角色列表'
          },
          {
            id: '119',
            authName: '获取角色详情'
          },
          {
            id: '120',
            authName: '更新角色信息'
          },
          {
            id: '121',
            authName: '更新角色权限'
          }

        ]
      },
      {
        id: '108',
        authName: '权限列表',
        children: [
          {
            id: '122',
            authName: '参看权限'
          }
        ]
      }
    ]
  },
  {
    id: '103',
    authName: '商品管理',
    children: [
      {
        id: '109',
        authName: '商品列表',
        children: [
          {
            id: '123',
            authName: '商品修改'
          }
        ]
      },
      {
        id: '110',
        authName: '分类参数',
        children: [
          {
            id: '124',
            authName: '获取参数列表'
          },
          {
            id: '125',
            authName: '获取商品参数'
          },
          {
            id: '126',
            authName: '删除商品参数'
          }
        ]
      },
      {
        id: '111',
        authName: '商品分类',
        children: [
          {
            id: '127',
            authName: '添加分类'
          },
          {
            id: '128',
            authName: '获取分类详情'
          },
          {
            id: '129',
            authName: '删除分类'
          }
        ]
      }
    ]
  },
  {
    id: '104',
    authName: '订单管理',
    children: [
      {
        id: '112',
        authName: '订单列表',
        children: [
          {
            id: '130',
            authName: '添加订单'
          }
        ]
      }
    ]
  },
  {
    id: '105',
    authName: '数据统计',
    children: [
      {
        id: '113',
        authName: '数据报表',
        children: [
          {
            id: '131',
            authName: '下载报表'
          }
        ]
      }
    ]
  }
]

export default Tree
