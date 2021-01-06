
import Mock from 'mockjs'
import Tree from './tree'
const List = []
const count = 100
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'roleName|1': ['主管', '测试角色1', '测试角色2', '测试角色3', '测试角色4', '测试角色5'],
    'roleDesc|1': ['技术负责人', '测试角色描述1', '测试角色描述2', '测试角色描述3', '测试角色描述4', '测试角色描述5'],
    create_time: '@datetime',
    update_time: '@datetime',
    children: Tree

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
  },
  {
    url: '/roles/rightstree',
    type: 'get',
    response: config => {
      return {
        code: 200,
        list: Tree,
        msg: '获取树成功'
      }
    }
  }
]
