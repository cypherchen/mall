import axios from 'axios'
export function request(config){
  // 创建axios实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })
  // 设置请求拦截器
  instance.interceptors.request.use(config => {
    return config
  },error => {
    console.log(error);
  })
  // 设置响应拦截器
  instance.interceptors.response.use(response => {
    return response.data
  },error =>
  console.log(error))
  // 返回配置
  return instance(config);
}
