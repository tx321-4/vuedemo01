const List = [
  {
    id: '125',
    authName: '用户管理',
    path: 'users',
    level: 0
  },
  {
    id: '150',
    authName: '用户列表',
    path: 'users',
    level: 1
  },
  {
    id: '103',
    authName: '权限管理',
    path: 'roles',
    level: 0
  },
  {
    id: '151',
    authName: '角色列表',
    path: 'roles',
    level: 1
  },
  {
    id: '152',
    authName: '权限列表',
    path: 'rights',
    level: 1
  },
  {
    id: '101',
    authName: '商品管理',
    path: 'goods',
    level: 0
  },
  {
    id: '153',
    authName: '商品列表',
    path: 'goods',
    level: 1
  },
  {
    id: '156',
    authName: '添加商品',
    path: 'goods',
    level: 2
  },
  {
    id: '154',
    authName: '分类参数',
    path: 'goods',
    level: 1
  },
  {
    id: '155',
    authName: '商品分类',
    path: 'goods',
    level: 1
  },
  {
    id: '102',
    authName: '订单管理',
    path: 'orders',
    level: 0
  },
  {
    id: '156',
    authName: '订单列表',
    path: 'orders',
    level: 1
  },
  {
    id: '157',
    authName: '添加订单',
    path: 'orders',
    level: 2
  },
  {
    id: '145',
    authName: '数据统计',
    path: 'tongji',
    level: 0
  },
  {
    id: '157',
    authName: '数据报表',
    path: 'tongji',
    level: 1
  }
]
export default [
  {
    url: '/roles/rilist',
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
