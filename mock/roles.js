
import Mock from 'mockjs'
const List = []
const count = 100
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'roleName|1': ['主管', '测试角色1', '测试角色2', '测试角色3', '测试角色4', '测试角色5'],
    'roleDesc|1': ['技术负责人', '测试角色描述1', '测试角色描述2', '测试角色描述3', '测试角色描述4', '测试角色描述5'],
    create_time: '@datetime',
    update_time: '@datetime',
    children: [
      {
        id: '@increment',
        authName: '用户管理',
        children: [
          {
            id: '@increment',
            authName: '用户列表'
          }
        ]
      },
      {
        id: '@increment',
        authName: '权限管理',
        children: [
          {
            id: '@increment',
            authName: '角色列表',
            children: [
              {
                id: '@increment',
                authName: '添加角色'
              },
              {
                id: '@increment',
                authName: '删除角色'
              },
              {
                id: '@increment',
                authName: '角色授权'
              },
              {
                id: '@increment',
                authName: '取消角色授权'
              },
              {
                id: '@increment',
                authName: '获取角色列表'
              },
              {
                id: '@increment',
                authName: '获取角色详情'
              },
              {
                id: '@increment',
                authName: '更新角色信息'
              },
              {
                id: '@increment',
                authName: '更新角色权限'
              }

            ]
          },
          {
            id: '@increment',
            authName: '权限列表',
            children: [
              {
                id: '@increment',
                authName: '参看权限'
              }
            ]
          }
        ]
      },
      {
        id: '@increment',
        authName: '商品管理',
        children: [
          {
            id: '@increment',
            authName: '商品列表',
            children: [
              {
                id: '@increment',
                authName: '商品修改'
              }
            ]
          },
          {
            id: '@increment',
            authName: '分类参数',
            children: [
              {
                id: '@increment',
                authName: '获取参数列表'
              },
              {
                id: '@increment',
                authName: '获取商品参数'
              },
              {
                id: '@increment',
                authName: '删除商品参数'
              }
            ]
          }, {
            id: '@increment',
            authName: '商品分类',
            children: [
              {
                id: '@increment',
                authName: '添加分类'
              },
              {
                id: '@increment',
                authName: '获取分类详情'
              },
              {
                id: '@increment',
                authName: '删除分类'
              }
            ]
          }
        ]
      },
      {
        id: '@increment',
        authName: '订单管理',
        children: [
          {
            id: '@increment',
            authName: '订单列表',
            children: [
              {
                id: '@increment',
                authName: '添加订单'
              }
            ]
          }
        ]
      },
      {
        id: '@increment',
        authName: '数据统计',
        children: [
          {
            id: '@increment',
            authName: '数据报表',
            children: [
              {
                id: '@increment',
                authName: '下载报表'
              }
            ]
          }
        ]
      }
    ]

  }))
}

export default [
  {
    url: '/roles/list',
    type: 'get',
    response: config => {
      const { roleName, page = 1, limit = 20 } = config.query
      const mockList = List.filter(item => {
        if (roleName && item.roleName.indexOf(roleName) < 0) return false

        return true
      })
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 200,
        list: pageList,
        total: mockList.length,
        msg: '获取列表成功'
      }
    }
  },
  {
    url: '/roles/save',
    type: 'post',
    response: config => {
      return {
        code: 200,
        msg: '保存成功'
      }
    }
  },
  {
    url: '/roles/del',
    type: 'get',
    response: config => {
      return {
        code: 200,
        msg: '删除成功'
      }
    }
  },
  {
    url: '/roles/rightsdel',
    type: 'get',
    response: config => {
      return {
        code: 200,
        msg: '删除成功'
      }
    }
  }
]
