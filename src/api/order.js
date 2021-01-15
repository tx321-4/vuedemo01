import request from '@/utils/request'
export default {
  getOrder (params) {
    return request({
      url: '/order/list',
      method: 'get',
      params
    })
  }

}
