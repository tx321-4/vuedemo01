import request from '@/utils/request'
export default {
  getUser (params) {
    return request({
      url: '/users/list',
      method: 'get',
      params
    })
  },
  userStateChanged (data) {
    return request({
      url: '/users/edit/state',
      method: 'post',
      data
    })
  },
  save (data) {
    return request({
      url: '/users/save',
      method: 'post',
      data
    })
  },
  del (params) {
    return request({
      url: '/users/del',
      method: 'get',
      params
    })
  },
  getRoles () {
    return request({
      url: '/users/roles',
      method: 'get'

    })
  }
}
