import axios from 'axios';


// 请求会带cookies
axios.defaults.withCredentials = false;
axios.defaults.baseURL = process.env.VUE_APP_API_HOST;
axios.defaults.timeout = 30000; // 超时时间30秒


// 请求数据拦截处理
axios.interceptors.request.use(config => {
    /*添加 Authorization 信息*/
    //config.headers['Authorization'] = store.state.tokens.token;
    return config;

}, error => {
    return Promise.reject(error.response);
});

// 返回数据拦截处理
axios.interceptors.response.use(response => {

    if (response.status === 200) {
        return new Promise((resolve, reject) => {
            resolve(response.data);
        });
    } else {
        return new Promise((resolve, reject) => {
            reject(response.data);
        });
    }
}, error => {
    console.log(error.response);
    return Promise.reject(error.response);
});

export default axios;