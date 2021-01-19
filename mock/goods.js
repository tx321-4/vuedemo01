import Mock from 'mockjs'
const List = []

const count = 100
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    goods_name: '@cword(20)',
    'goods_price|1': /([0-9]{3})/,
    'goods_number|1': /([0-9]{3})/,
    goods_weight: '100',
    goods_introduce: '@cword(120)',
    goods_cat: [],
    add_time: '@datetime',
    create_time: '@datetime',
    update_time: '@datetime'

  }))
}
export default [
  {
    url: '/goods/list',
    type: 'get',
    response: config => {
      const { query, page = 1, limit = 20 } = config.query
      const mockList = List.filter(item => {
        if (query && item.goods_name.indexOf(query) < 0) return false

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
    url: '/goods/save',
    type: 'post',
    response: config => {
      return {
        code: 200,
        msg: '保存成功'
      }
    }
  },
  {
    url: '/goods/del',
    type: 'get',
    response: config => {
      return {
        code: 200,
        msg: '删除成功'
      }
    }
  }

]
