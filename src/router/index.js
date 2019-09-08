import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
    routes: [{
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
            path: '/step',
            name: 'step',
            component: resolve => require(['pages/step'], resolve),
            props: true,
            redirect: '/step/demand',
            children: [{
                name: 'demand',
                path: 'demand',
                component: resolve => require(['pages/step/components/demand'], resolve)
            }, {
                name: 'information',
                path: 'information',
                // meta: {
                //     requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
                // },
                component: resolve => require(['pages/step/components/information'], resolve)
            }, {
                name: 'company',
                path: 'company',
                meta: {
                    requireAuth: true
                },
                component: resolve => require(['pages/step/components/company'], resolve)
            }, {
                name: 'credit',
                path: 'credit',
                meta: {
                    requireAuth: true
                },
                component: resolve => require(['pages/step/components/credit'], resolve)
            }, {
                name: 'loan',
                path: 'loan',
                meta: {
                    requireAuth: true
                },
                component: resolve => require(['pages/step/components/loan'], resolve)
            }]
        }]

});

function getUrlParam(url) {
    url = url || window.location.href;
    var objRequest = new Object();
    if (url.indexOf("?") != -1) {
        url = url.split("?")[1];
        var strArr = url.split("&");
        for (var i = 0; i < strArr.length; i++) {
            objRequest[strArr[i].split("=")[0]] = decodeURI((strArr[i].split("=")[1]));
        }
    }
    return objRequest;
}

router.afterEach(route => {
    //  setInterval(function() {
    //      if (getUrlParam()) {
    //          let query = getUrlParam()
    //              //console.info(query)
    //              //let str = query.slice(0, query.length - 2)
    //              //let o = JSON.parse(str)
    //              // localStorage.setItem('session_data', getQueryString('session_data'))
    //          for (var i in query) {
    //              if (query[i].indexOf('#/') > -1) {
    //                  query[i] = query[i].replace(/#\//ig, '')
    //              }
    //              //console.info(121212, query[i])
    //              localStorage.setItem(i, query[i])
    //          }
    //      }
    //  }, 2000)
})

function getQueryString(name) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i")
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "))
    return ""
}

export default router
