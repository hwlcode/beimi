import Vue from 'vue'
import Router from 'vue-router'
import wechatPlugin from 'vue-wechat-plugin'
// 解决路由报NavigationDuplicated的问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
Vue.use(Router);

const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: resolve => require(['pages/index'], resolve),
            props: true
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['pages/login'], resolve),
            props: true
        },
        {
            path: '/join-in',
            name: 'join-in',
            component: resolve => require(['pages/join-in/join-in'], resolve),
            props: true
        },
        {
            path: '/contact-us',
            name: 'contact-us',
            component: resolve => require(['pages/contact-us/contact-us'], resolve),
            props: true
        },
        {
            path: '/about-us',
            name: 'about-us',
            component: resolve => require(['pages/about-us/about-us'], resolve),
            props: true
        },
        {
            path: '/questions',
            name: 'questions',
            component: resolve => require(['pages/questions/questions'], resolve),
            props: true
        },
        {
            path: '/agreement',
            name: 'agreement',
            component: resolve => require(['pages/agreement/agreement'], resolve),
            props: true
        },
        {
            path: '/agreement-detail',
            name: 'agreement-detail',
            component: resolve => require(['pages/agreement-detail/agreement-detail'], resolve),
            props: true
        },
        {
            path: '/customer-service',
            name: 'customer-service',
            component: resolve => require(['pages/customer-service/customer-service'], resolve),
            props: true
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: resolve => require(['pages/privacy/privacy'], resolve),
            props: true
        },
        {
            path: '/loan-type',
            name: 'loan-type',
            component: resolve => require(['pages/loan-type/loan-type'], resolve),
            props: true
        },
        {
            path: '/credit-card',
            name: 'credit-cart',
            component: resolve => require(['pages/credit-card/credit-card'], resolve),
            props: true
        },
        {
            path: '/agent/qr',
            name: 'qr',
            component: resolve => require(['pages/agent/qr/qr'], resolve),
            props: true
        },
        {
            path: '/agent/register',
            name: 'register',
            component: resolve => require(['pages/agent/register/register'], resolve),
            props: true
        },
        {
            path: '/step',
            name: 'step',
            component: resolve => require(['pages/step'], resolve),
            props: true,
            redirect: '/step/demand',
            children: [
                {
                    name: 'demand',
                    path: 'demand',
                    component: resolve => require(['pages/step/components/demand'], resolve)
                },
                {
                    name: 'information',
                    path: 'information',
                    component: resolve => require(['pages/step/components/information'], resolve)
                },
                {
                    name: 'company',
                    path: 'company',
                    meta: {
                        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                    },
                    component: resolve => require(['pages/step/components/company'], resolve)
                },
                {
                    name: 'credit',
                    path: 'credit',
                    meta: {
                        requireAuth: true
                    },
                    component: resolve => require(['pages/step/components/credit'], resolve)
                },
                {
                    name: 'loan',
                    path: 'loan',
                    meta: {
                        requireAuth: true
                    },
                    component: resolve => require(['pages/step/components/loan'], resolve),
                },
                {
                    name: 'pay',
                    path: 'pay',
                    component: resolve => require(['pages/step/components/pay'], resolve),
                },
            ]
        }]

});



function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

export default router
