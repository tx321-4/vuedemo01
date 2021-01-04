import Mock from 'mockjs'
const List = []

const count = 100
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    username: '@cname',
    'role_name|1': ['访问者', '管理员', '超级管理员', '编辑员'],
    email: '@email',
    mobile: /1(\d[0-9]{10})/,
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
  }
]
