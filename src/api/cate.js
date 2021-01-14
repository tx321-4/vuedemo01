import request from '@/utils/request'
export default {
  getCate (params) {
    return request({
      url: '/cate/list',
      method: 'get',
      params
    })
  },

  save (data) {
    return request({
      url: '/cate/save',
      method: 'post',
      data
    })
  },
  del (params) {
    return request({
      url: '/cate/del',
      method: 'get',
      params
    })
  }

}
