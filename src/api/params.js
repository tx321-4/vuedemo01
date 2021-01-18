import request from '@/utils/request'
export default {

  getAttributes (params) {
    return request({
      url: '/params/list',
      method: 'get',
      params
    })
  },
  save (data) {
    return request({
      url: '/params/save',
      method: 'post',
      data
    })
  },

  saveTag (data) {
    return request({
      url: '/params/savetag',
      method: 'post',
      data
    })
  },
  del (params) {
    return request({
      url: '/params/del',
      method: 'get',
      params
    })
  }

}
