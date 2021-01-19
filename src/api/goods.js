import request from '@/utils/request'
export default {
  getGood (params) {
    return request({
      url: '/goods/list',
      method: 'get',
      params
    })
  },

  save (data) {
    return request({
      url: '/goods/save',
      method: 'post',
      data
    })
  },
  Goodsave (data) {
    return request({
      url: '/goods/save2',
      method: 'post',
      data
    })
  },
  del (params) {
    return request({
      url: '/goods/del',
      method: 'get',
      params
    })
  }

}
