// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueResource from 'vue-resource'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import App from './App'

import axios from 'axios'
import VueAxios from 'vue-axios'
// 复制功能
import Clipboard from 'clipboard';
Vue.prototype.Clipboard=Clipboard;

Vue.use(VueAxios, axios);
axios.defaults.baseURL = process.env.API_ROOT;
// 给每个请求头加上token
// axios.defaults.headers.common['token'] = `${window.localStorage.getItem('token').replace('"','')}`;

// 路由里面带有requireAuth选项，需要验证token是否存在，否则跳转到登录页面
router.beforeEach((to, from, next) => {
    // 处理jssdk签名,兼容history模式
    if (!store.state.url) {
        store.commit('SET_URL', document.URL);
    }
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (window.localStorage.getItem('user')) {  // 通过vuex state获取当前的token是否存在
            next();
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
});
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (window.localStorage.getItem('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers['token'] = `${window.localStorage.getItem('token').replace('"','').replace('"','')}`;
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
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit('LOGOUT');

                    router.push({
                        path: '/login'
                    });
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });

import './assets/css/normalize.css'
import './assets/css/reset.css'
import './assets/css/flex.css'
import './assets/css/iconfont/iconfont.css'
import './assets/css/iconfont/iconfont.js'
import './assets/css/common.less'
import './assets/css/var.less'
import './assets/css/common.css'


import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
// Vue.use(VueResource);

import {
    Tabbar,
    TabbarItem,
    // Rater,
    XDialog,
    XButton,
    XInput,
    Group,
    ToastPlugin,
    XHeader,
    Flexbox,
    FlexboxItem,
    Checklist,
    XImg,
    Popup,
    Cell,
    Range,
    InlineXSwitch,
    Panel,
    CellBox,
    LoadingPlugin,
    ConfirmPlugin,
    Tab,
    TabItem,
    Checker,
    CheckerItem,
    PopupPicker,
    AlertPlugin
} from 'vux'

// import Rater from './components/rater'
Vue.component('popupPicker', PopupPicker)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
// Vue.component('rater', Rater)
Vue.component('x-dialog', XDialog)
Vue.component('x-button', XButton)
Vue.component('x-input', XInput)
Vue.component('group', Group)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.component('x-header', XHeader)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('checklist', Checklist)
Vue.component('x-img', XImg)
Vue.component('popup', Popup)
Vue.component('cell', Cell)
Vue.component('range', Range)
Vue.component('inline-x-switch', InlineXSwitch)
Vue.component('panel', Panel)
Vue.component('cell-box', CellBox)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('checker', Checker)
Vue.component('checker-item', CheckerItem)
Vue.use(ConfirmPlugin)


import method from './assets/js/public_method.js';

Vue.config.productionTip = false

// import { AjaxPlugin } from 'vux'
import {WechatPlugin} from 'vux'

Vue.use(WechatPlugin);
Vue.use(AlertPlugin);
// Vue.use(AjaxPlugin)

FastClick.attach(document.body)
require('es6-promise').polyfill()

// console.info(Vue.http.options)


//判断地址栏中是否含有X-AUTH的参数，有的话就存储起来,并且设置
// let urlParams = method.tools.getUrlParam();
// for (let key in urlParams) {
//     if (key.indexOf('X-AUTH') > -1) {
//         //		Vue.http.headers.common[key] = urlParams[key];
//         method.tools.localItem(key, urlParams[key]);
//     };
// };

//设置请求头信息
// let XAUTHObj = method.current.getXAUTH();
// for (let key in XAUTHObj) {
//     Vue.http.headers.common[key] = XAUTHObj[key];
// };
//
// window.baseUrl = '/page/api';

//每次请求之前设置一下请求头
// Vue.http.options.before = function() {
//     let XAUTHObj = method.current.getXAUTH();
//     for (let key in XAUTHObj) {
//         Vue.http.headers.common[key] = XAUTHObj[key];
//     };
// };

// Vue.http.interceptors.push((request, next) => {
//     //在请求订单的时候不显示加载框
//     if (request.url.indexOf('order/info') == -1) {
//         Vue.$vux.loading.show();
//     };
//
//     next((response) => {
//         let httpCode = response.status
//         setTimeout(function() {
//             Vue.$vux.loading.hide()
//         }, 200)
//         if (httpCode === 200) {
//             // console.info(response.body)
//             let _code = response.body.code
//             let _msg = response.body.msg
//             let _data = response.body.data;
//
//             if (_code === 2) {
//                 //防止设置请求头失败时无限刷新的问题
//                 //	if( window.location.href.indexOf('X-AUTH') > 1 ){
//                 //    Vue.$vux.toast.text('登录失败');
//                 //    return ;
//                 //  };
//
//                 if (_data.local) {
//                     // 本地登录
//                     //console.log(_data.redirect)
//                     // router.push({
//                     //     name: 'my',
//                     //     query: {
//                     //         login: '1'
//                     //     }
//                     // })
//                     store.state.loginNum++;
//                 } else {
//                     // 微信登录
//                     let url = window.location.href;
//                     //获取X-AUTH
//                     let XAUTHObj = method.current.getXAUTH();
//                     let XAUTHStr = method.tools.formatParams(XAUTHObj);
//
//                     location.href = _data.redirect + '?redirect=' + encodeURIComponent(url) + (XAUTHStr.length ? '&' + XAUTHStr : '');
//                 }
//             } else if (_code === 1) {} else {
//                 !request.skipDataLoading && Vue.$vux.toast.text(_msg)
//             }
//         } else if (httpCode === 403) {
//             Vue.$vux.toast.text('服务器异常')
//         } else { // 服务器异常
//             Vue.$vux.toast.text('网络异常')
//         }
//         return response
//     })
// })

/* eslint-disable no-new */
let app = new Vue({
    el: '#app',
    store,
    router,
    created() {
        // 字体
        // let FZ = localStorage.getItem('fontSize')
        // if (!!FZ) {
        //   this.$store.commit('SET_FONT_SIZE', FZ);
        //  }
        //  // 阅读模式
        //  let readMode = localStorage.getItem('readMode') === "1" ? true : false;
        //  this.$store.commit('SET_READ_MODE', readMode);
        //
        //  // token
        //  let token = localStorage.getItem('X-AUTH-TOKEN')
        //  if (token) {
        //    this.$store.commit('SET_TOKEN', token);
        //   }
        //   let mobile = localStorage.getItem('user-mobile')
        //   if (mobile) {
        //     this.$store.commit('SET_MOBILE', mobile);
        //   }
    },
    components: {App},
    template: '<App/>'
})
