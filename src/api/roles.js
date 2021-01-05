import request from '@/utils/request'
export default {
  getRightsList () {
    return request({
      url: '/roles/rilist',
      method: 'get'
    })
  }

}
