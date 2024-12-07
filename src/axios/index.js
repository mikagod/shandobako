import axios from 'axios'
import { ElMessage,ElLoading,ElNotification  } from 'element-plus'
import Cookies from 'js-cookie'
const service = axios.create({
  // baseURL:'http://127.0.0.1:8080'
    baseURL: 'https://www.shandobako.com/api'
})

let loading ;
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = Cookies.get('token')

    if(token){
      config.headers['token'] = token;
    }
    // loading = ElLoading.service({
    //   lock: false,
    //   text: 'Loading',
    //   background: 'rgba(0, 0, 0, 0)',
    // })
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // loading.close()
    return response;
  }, function (error) {
    // loading.close()
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElNotification({
      title: 'Error',
      message: error.response.statusText,
      type: 'error',
    })
    return Promise.reject(error);
  });

export default service