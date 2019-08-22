import axios from 'axios'
import router from '../router'
import Vue from '../main'

// axios 配置
axios.defaults.timeout = 6000;
axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:3000/api';//线上的http


// http request 拦截器
axios.interceptors.request.use(
    config => {
        let token = Vue.$store.getters.usertoken;
        if (token) {
            config.headers['Authorization'] = token;
            config.headers['Cache-Control'] = 'no-cache';
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
response => {
    return response;
},
error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 这里写清除token的代码
                Vue.$store.commit('loginout')
                router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                })
              Vue.$message.error('请重新登录！');
                break;
            default:
              Vue.$message.error(JSON.stringify(error.response.data));
        }
    }
    return Promise.reject(error);
});

export default axios;
