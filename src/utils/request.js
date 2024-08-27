import axios from 'axios'
import {
  MessageBox,
  Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { getItem } from '@/utils/storage'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['authorization'] = 'Bearer ' + getToken()
    }

    config.userName = getItem('userName')
    config.password = getItem('password')

    if (config.method === 'get') {
      const queryParams = config.params

      if (queryParams && queryParams.page && queryParams.limit) {
        // 增加abp分页属性 SkipCount MaxResultCount
        config.params = Object.assign(queryParams, {
          SkipCount: (queryParams.page - 1) * queryParams.limit,
          MaxResultCount: queryParams.limit
        })
      }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    return res
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    // console.log('err' + error) // for debug
    let message = ''

    if (error.response) {
      const status = error.response.status
      const responseData = error.response.data

      switch (status) {
        case 400:
          if (responseData.error === 'invalid_grant') {
            message = '登录失败，请检查您的账号和密码是否正确'
          } else {
            message = responseData.error.details // 接口验证异常
          }
          break
        case 401: // 该操作需要特定的用户权限，您可能未被授予相应权限。
          MessageBox.confirm('您已退出，您可以取消以保留在此页面，或重新登录', '确认退出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
          break
        case 403:
          message = responseData.error.message // 业务逻辑异常
          break
        case 500:
          // message = responseData.error.message
          // console.log(responseData);
          message = process.env.NODE_ENV === 'development' ? responseData.error.message : '请联系系统管理员或技术支持以获取帮助' // 服务器内部错误
          break
        default:
          message = JSON.stringify(error) // 未捕获到的异常
      }
    }

    // switch (true) {
    //   case error.response || error.message === 'Network Error':
    //     message = '网络连接出现问题，请检查您的网络连接并重试。'// Network Error
    //     break
    //   // case error.response && error.response.status === 400 && error.response.data.error === 'invalid_grant':
    //   //   message = '登录失败，请检查您的账号和密码是否正确。' // auth error
    //   //   break
    //   case error.response && error.response.status === 400: // 权限异常捕获
    //     message = error.response.data.error.details
    //     // message = '该操作需要特定的用户权限，您可能未被授予相应权限。'
    //     break
    //   case error.response && error.response.status === 401: // 权限异常捕获
    //     message = '该操作需要特定的用户权限，您可能未被授予相应权限。'
    //     break
    //   case error.response && error.response.status === 403: // abp业务异常捕获 403
    //     message = error?.response?.data?.error?.message || '请联系系统管理员或技术支持以获取帮助。'
    //     break
    //   case error.response && error.response.status === 500: // 服务器内部错误
    //     message = error?.response?.data?.error?.message || '请联系系统管理员或技术支持以获取帮助。'
    //     break
    // }

    // 自定义错误 检查是否有未捕获的错误
    if (!message) {
      message = JSON.stringify(error)
      // message = '系统异常，请联系系统管理员或技术支持以获取帮助。'
    }

    const errorMessage = message

    Message({
      message: errorMessage,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
