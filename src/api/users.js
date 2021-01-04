import request from '@/utils/request'
export default {
  getUser (params) {
    return request({
      url: '/users/list',
      method: 'get',
      params
    })
  }
}
