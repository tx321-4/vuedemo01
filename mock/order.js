import Mock from 'mockjs'
const List = []

const count = 100
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    order_number: /[a-z0-9]{5}-[a-z0-9]{18}/,
    order_price: /([0-9]{2})/,
    'pay_status|1': ['0', '1'],
    'is_send|1': ['是', '否'],
    create_time: '@datetime',
    update_time: '@datetime'

  }))
}
export default [
  {
    url: '/order/list',
    type: 'get',
    response: config => {
      const { order_number, page = 1, limit = 20 } = config.query
      const mockList = List.filter(item => {
        if (order_number && item.order_number.indexOf(order_number) < 0) return false

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
    url: '/users/edit/state',
    type: 'post',
    response: config => {
      return {
        code: 200,
        msg: '修改成功'
      }
    }
  },
  {
    url: '/users/save',
    type: 'post',
    response: config => {
      return {
        code: 200,
        msg: '保存成功'
      }
    }
  },
  {
    url: '/users/del',
    type: 'get',
    response: config => {
      return {
        code: 200,
        msg: '删除成功'
      }
    }
  },
  {
    url: '/users/roles',
    type: 'get',
    response: config => {
      return {
        code: 200,
        list: [
          {
            id: 1,
            roleName: '访问者'
          },
          {
            id: 2,
            roleName: '管理员'
          },
          {
            id: 3,
            roleName: '超级管理员'
          },
          {
            id: 4,
            roleName: '编辑员'
          },
          {
            id: 5,
            roleName: '访问者'
          },
          {
            id: 6,
            roleName: '超级管理员'
          },
          {
            id: 7,
            roleName: '编辑员'
          }
        ],

        msg: '获取列表成功'
      }
    }
  }
]
