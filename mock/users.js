import Mock from 'mockjs'
const List = []

const count = 100
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    username: '@cname',
    password: /[a-zA-Z0-9]{6,15}/,
    'role_name|1': ['访问者', '管理员', '超级管理员', '编辑员'],
    email: '@email',
    mobile: /1(\d[0-9]{9})/,
    'mg_state|1': [true, false],
    create_time: '@datetime',
    update_time: '@datetime'

  }))
}
export default [
  {
    url: '/users/list',
    type: 'get',
    response: config => {
      const { username, page = 1, limit = 20 } = config.query
      const mockList = List.filter(item => {
        if (username && item.username.indexOf(username) < 0) return false

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
