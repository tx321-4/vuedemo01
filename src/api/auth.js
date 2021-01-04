import request from '@/utils/request'
export default {
  login (username, password) {
    return request({
      url: '/user/login',
      method: 'post',
      data: {
        username,
        password
      }
    })
  }
}
