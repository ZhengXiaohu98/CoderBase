import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

let loadingIns: any;
function startLoading() {
  loadingIns = ElLoading.service({
    lock: true,
    text: "Loading...",
    background: 'rgba(0,0,0,0.7)'
  })
}

const userService = axios.create({
  baseURL: "http://localhost:5007/users",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
})

userService.interceptors.request.use((config) => {
  startLoading();
  config.headers = config.headers || {}
  if (localStorage.token) {
    config.headers.Authorization = localStorage.token;
  }
  return config;
}), (err: Error) => {
  return Promise.reject(err)
}

userService.interceptors.response.use((res) => {
  loadingIns.close(); // close loading
  return res
}), (err: Error) => {
  loadingIns.close(); // close loading
  ElMessage.error("Oops! " + err.message)
  localStorage.removeItem('token')
  return Promise.reject(err)
}

export default userService