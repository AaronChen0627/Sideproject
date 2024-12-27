import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// 设置 axios 的基础 URL 和请求拦截器
axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.timeout = 10000; // 设置请求超时

// 请求拦截器：自动附加 token 到请求头
axios.interceptors.request.use(
    config => {
      const token = store.getters['user/getToken']; // 从 Vuex 获取 token
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // 添加 token 到请求头
        console.log("Authorization Header:", config.headers['Authorization']);  // 打印 header 确认是否携带 token
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

const app = createApp(App);

// 注册 axios 为全局属性
app.config.globalProperties.$axios = axios;

app.use(store)
   .use(router)
   .mount('#app');
