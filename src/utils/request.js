import axios from 'axios'
import get from 'lodash/get'
import store from '@/store'
import { getToken } from '@/utils/token'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  const status = get(error, 'response.status')
  switch (status) {
    case 400: error.message = '请求错误'; break
    case 401: error.message = '未授权，请登录'; break
    case 403: error.message = '拒绝访问'; break
    case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
    case 408: error.message = '请求超时'; break
    case 500: error.message = '服务器内部错误'; break
    case 501: error.message = '服务未实现'; break
    case 502: error.message = '网关错误'; break
    case 503: error.message = '服务不可用'; break
    case 504: error.message = '网关超时'; break
    case 505: error.message = 'HTTP版本不受支持'; break
    default: break
  }
  return Promise.reject(error)
}

service.interceptors.request.use((config) => {
  if (config.method == 'post') {
    config.data = {
      ...config.data,
      _t: Date.parse(new Date()) / 1000
    }
  } else if (config.method == 'get') {
    config.params = {
      ...config.params,
      _t: Date.parse(new Date()) / 1000
    }
  }
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (store.getters.token) {
    config.headers.DianShan = getToken()
  }
  return config
}, errorHandler)
// request interceptor

service.interceptors.response.use((res) => {
  const data = res.data
  const code = data.code
  if (code === undefined) {
    // 如果没有 code 代表这不是项目后端开发的接口
    return data
  } else {
    switch (code) {
      // 200 代表没有错误
      case 200:
        return data
      default:
        // 不是正确的 code
        return '不是正确的code'
    }
  }
}, errorHandler)
export default service
