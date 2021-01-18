const List = [
  {
    id: '125',
    authName: '用户管理',
    children: [
      {
        id: '150',
        authName: '用户列表',
        path: 'users'
      }
    ]
  },
  {
    id: '103',
    authName: '权限管理',
    children: [
      {
        id: '151',
        authName: '角色列表',
        path: 'roles'
      },
      {
        id: '152',
        authName: '权限列表',
        path: 'rights'
      }
    ]
  },
  {
    id: '101',
    authName: '商品管理',
    children: [
      {
        id: '153',
        authName: '商品列表',
        path: ''
      },
      {
        id: '154',
        authName: '分类参数',
        path: 'params'
      },
      {
        id: '155',
        authName: '商品分类',
        path: 'categories'
      }
    ]
  },
  {
    id: '102',
    authName: '订单管理',
    children: [
      {
        id: '156',
        authName: '订单列表',
        path: 'orders'
      }
    ]
  },
  {
    id: '145',
    authName: '数据统计',
    children: [
      {
        id: '157',
        authName: '数据报表',
        path: 'reports'
      }
    ]
  }
]
export default [
  {
    url: '/menu/list',
    type: 'get',
    response: config => {
      return {
        code: 200,
        list: List,
        msg: '获取列表成功'
      }
    }
  }
]
