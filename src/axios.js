import Vue from 'vue'
import axios from 'axios'

// todo 改成本地后端 API 基础 URL 就只有学生路径要用 其他的我拼接上http就不会使用baseurl了
const baseURL_local = 'http://127.0.0.1:8000/api'

// 创建一个 Axios 实例，配置基本的 URL 和请求头
const api = axios.create({
    baseURL: baseURL_local,
    // headers: {
    //     'Content-Type': 'application/json'
    // }
})

// 将 axios 和 api 实例注册为全局属性
Vue.prototype.$axios = axios
Vue.prototype.$api = api

// 导出 api 实例，以便在其他地方使用
export { api }
