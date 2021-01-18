
const List = [
  {
    id: 1,
    attr_name: '版式',
    sel: 'many',
    attr_vals: '49寸4k   26寸2k 30寸超薄'
  },
  {
    id: 5,
    attr_name: '尺寸',
    sel: 'many',
    attr_vals: ''
  },
  {
    id: 2,
    attr_name: '主体-商品名称',
    sel: 'only',
    attr_vals: ''

  },
  {
    id: 3,
    attr_name: '显示-曲面',
    sel: 'only',
    attr_vals: ''

  },
  {
    id: 4,
    attr_name: '系统-智能电视',
    sel: 'only',
    attr_vals: ''

  }
]

export default [
  {
    url: '/params/list',
    type: 'get',
    response: config => {
      const { sel, page = 1, limit = 20 } = config.query
      const mockList = List.filter(item => {
        if (sel && item.sel.indexOf(sel) < 0) return false

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
    url: '/params/save',
    type: 'post',
    response: config => {
      return {
        code: 200,
        msg: '保存成功'
      }
    }
  },
  {
    url: '/params/savetag',
    type: 'post',
    response: config => {
      return {
        code: 200,
        msg: '保存成功'
      }
    }
  },
  {
    url: '/params/del',
    type: 'get',
    response: config => {
      return {
        code: 200,
        msg: '删除成功'
      }
    }
  }

]
