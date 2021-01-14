
import Catemock from './catemock'
const List = Catemock

export default [
  {
    url: '/cate/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20 } = config.query

      const pageList = List.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 200,
        list: pageList,
        total: List.length,
        msg: '获取列表成功'
      }
    }
  },

  {
    url: '/cate/save',
    type: 'post',
    response: config => {
      return {
        code: 200,
        msg: '保存成功'
      }
    }
  },
  {
    url: '/cate/del',
    type: 'get',
    response: config => {
      return {
        code: 200,
        msg: '删除成功'
      }
    }
  }

]
