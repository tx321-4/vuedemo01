import request from '@/utils/request'
export default {
  Imgupload (data) {
    return request({
      url: '/upload/img',
      method: 'post',
      data
    })
  }
}
