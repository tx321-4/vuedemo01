import request from '@/utils/request'
export default {
  getRightsList () {
    return request({
      url: '/roles/rilist',
      method: 'get'
    })
  },
  getRole (params) {
    return request({
      url: '/roles/list',
      method: 'get',
      params
    })
  },
  save (data) {
    return request({
      url: '/roles/save',
      method: 'post',
      data
    })
  },
  del (params) {
    return request({
      url: '/roles/del',
      method: 'get',
      params
    })
  },
  // 删除权限标签
  rightsDel (params) {
    return request({
      url: '/roles/rightsdel',
      method: 'get',
      params
    })
  }

}
