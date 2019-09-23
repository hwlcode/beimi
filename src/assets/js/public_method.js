export let public_methods = {
    api: {
        loginVerifyCode: '/v1/api/sms/loginVerifyCode', // 登录验证码
        imageCode: '/v1/api/random/code', // 图形验证码
        login: '/v1/api/user/loan/login', // 登录
        logout: '/v1/api/user/loan/logout', // 登出
        registerVerifyCod: '/v1/api/sms/registerVerifyCode', //注册验证码
        register: '/v1/api/user/loan/register', // 用户注册
        loan: '/v1/api/register/process/loan', // 获取注册用户贷款需求和个人信息
        processPerson: '/v1/api/register/process/person', // 补充用户信息
        getPersonInfo: '/v1/api/register/process/person', // 查询用户补全的信息

        companyInfo: '/v1/api/register/process/companyInfo', // 企业基本信息
        getCompanyInfo: '/v1/api/register/process/companyInfo', // 查询企业信息
        companyOperate: '/v1/api/register/process/companyOperate', // 企业补充信息
        getCompanyOperate: '/v1/api/register/process/companyOperate', // 查询企业补充信息

        hasReview: '/v1/api/register/process/hasReview', // 是否测算过

        companyReview: '/v1/api/register/process/free/review', // 查询企业的评审数据
        companyReviewHistory: '/v1/api/register/process/review/history', // 查询企业评审数据历史

        matchingProductList: '/v1/api/product/matchingProductList', // 信用卡匹配产品列表
        productList: '/v1/api/product/productList', // 信用卡产品列表,

        contactUs: '/v1/api/user/add/contactUs', // 联系我们
        joinApplication: '/v1/api/user/add/joinApplication', // 申请加盟

        agentRegister: '/v1/web/agent/register', // 个人代理注册
        agentLogin: '/v1/web/agent/login', // 个人代理登录
    },
    url: {
        domain: 'http://tutuspaces.com:10880'
    },
    tools: {
        //自定义的tap事件
        tap: function () {
            tap(window);

            function tap(nodes) {
                var x = 0;
                var y = 0;
                nodes.addEventListener('touchstart', function (ev) {
                    x = ev.changedTouches[0].clientX;
                    y = ev.changedTouches[0].clientY;
                }, false);
                nodes.addEventListener('touchend', function (ev) {
                    var endx = ev.changedTouches[0].clientX;
                    var endy = ev.changedTouches[0].clientY;
                    //创建自定义事件
                    var events = document.createEvent('CustomEvent');
                    events.initCustomEvent('tap', true, true, ev);
                    if (x == endx && y == endy) {
                        ev.target.dispatchEvent(events)
                    }
                    ;
                }, false);
            };
        },
        /*
            传入两个参数都为数字，返回两个数字之间的随机数
            传入两个都为字符串，返回两个字符串之间的随机数字符串
         */
        randomNum: function (num1, num2) {
            if (typeof num1 === 'string' && typeof num2 === 'string') {
                //返回位数相同的随机字符串
                var len = num1.length;
                var str = '';
                for (var i = 0; i < len; i++) {
                    str += Math.round(Math.random() * (num2.charAt(i) - num1.charAt(i)) + num1.charAt(i));
                }
                ;
                return str;
            } else if (typeof num1 === 'number' && typeof num2 === 'number') {
                //返回的是int类型随机数,1~100,生成的是1到100的随机整数
                return Math.round(Math.random() * (num2 - num1) + num1);
            }
            ;
        },
        //生成随机字符串
        randomStr: function (num) {
            var str = 'abcdefghijklmonpqrstuvwxyz1234567890ABCDEFGHIGKLMNOPRQSTUVWXYZ';
            num = num ? num : 32;
            var randomStr = '';
            for (var i = 0; i < num; i++) {
                var random = str.charAt(parseInt(Math.random() * str.length));
                randomStr += random;
            }
            ;
            return randomStr;
        },
        /*
         * 传入未来时间戳，转换为时间格式,
         * 没有参数表示：当前时间戳转换为时间格式
         * 一个参数表示：传入的时间戳转化为时间格式
         * 第二个参数(可选)：是否开启倒计时，当传入第二个参数的时候，第一个参数必须大于当前的时间戳
         */
        format: function (timeStamp, isCountDown) {
            var len = arguments.length;
            isCountDown = isCountDown === true ? true : false;
            var timeDate = new Date().getTime();
            if (len === 0) {
                //获取当前的时间格式
                var date = timeDate;
                return format(date);
            }
            ;
            if (len === 1) {
                //获取未来的时间格式
                var timeDifference = timeStamp;
                var date = new Date(timeDifference);
                return format(date);
            }
            ;
            if (len === 2 && isCountDown) {
                //未来时间减去现在时间的差值，并且转化为时间格式
                //计算时间差
                var timeDifference = timeStamp - timeDate;
                if (timeDifference <= 0) {
                    return {
                        nian: "00",
                        yue: "00",
                        ri: "00",
                        shi: "00",
                        fen: "00",
                        miao: "00"
                    };
                } else {
                    var time = parseInt(timeDifference / 1000);
                    var ri = parseInt(time / (24 * 60 * 60))//天数%一个月的天数
                    var shi = parseInt(time / (60 * 60) % 24)//小时%一天的小时数
                    var fen = parseInt(time / 60 % 60)//分钟%一分钟的秒数
                    var miao = parseInt(time % 60)//秒数%60
                    return {
                        ri: todo(ri),
                        shi: todo(shi),
                        fen: todo(fen),
                        miao: todo(miao)
                    }
                }
                ;
            }
            ;

            //时间补0
            function todo(num) {
                if (num < 10) {
                    return "0" + num;
                } else {
                    return "" + num;
                }
                ;
            };

            //格式化时间
            function format(date) {
                var myYear = date.getFullYear();//获得年份
                var myMonth = date.getMonth();//获得月份0--11
                var mydate = date.getDate();//获得日
                var myHours = date.getHours();//获得时
                var myMinutes = date.getMinutes();//获得分
                var myseconds = date.getSeconds();//获得秒
                return {
                    nian: todo(myYear),
                    yue: todo(myMonth + 1),
                    ri: todo(mydate),
                    shi: todo(myHours),
                    fen: todo(myMinutes),
                    miao: todo(myseconds)
                };
            };
        },
        //设置rem基数,参数表示传入的倍数
        setREM: function (base) {
            base = base ? base : 16;
            window.addEventListener("resize", setSize, false);
            window.addEventListener("orientationchange", setSize, false);
            setSize();

            //设置rem基数
            function setSize() {
                var oHtml = document.getElementsByTagName("html")[0];//   在js里找到html这个元素
                var iWidth = oHtml.getBoundingClientRect().width;//获取到html这个元素的宽度
                oHtml.style.fontSize = iWidth / base + "px";//给html设置字体大小，字体的大小刚好是html宽度的16分之一。
            };
        },
        //给body添加touchstart事件,为了手指按下元素的时候变色
        bodyStart: function (callback) {
            document.body.addEventListener('touchstart', function (ev) {
                callback && callback(ev);
//				ev.preventDefault();
            });
        },
        //设置缓存
        localItem: function (key, value) {
            var len = arguments.length;
            if (len === 2) {
                //设置
                if (typeof value == 'string') {
                    window.localStorage.setItem(key, value);
                } else {
                    window.localStorage.setItem(key, JSON.stringify(value));
                }
                ;
            } else if (len === 1) {
                //获取
                var localStorage = window.localStorage.getItem(key);
                return localStorage //eval('('+localStorage+')');
            }
            ;
        },
        //设置缓存
        sessionItem: function (key, value) {
            var len = arguments.length;
            if (len === 2) {
                //设置
                if (typeof value == 'string' || typeof value == 'number') {
                    window.sessionStorage.setItem(key, value);
                } else {
                    window.sessionStorage.setItem(key, JSON.stringify(value));
                }
                ;
            } else if (len === 1) {
                //获取
                var sessionStorage = window.sessionStorage.getItem(key);
                return sessionStorage;
            }
            ;
        },
        //修改title值
        setTitle: function (title) {
            var body = document.getElementsByTagName('body')[0];
            document.title = title;
            var iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.style.src = '/favicon.ico';

            iframe.onload = function () {
                setTimeout(function () {
                    iframe.onload = function () {
                    };
                    body.removeChild(iframe);
                }, 0);
            };
            body.appendChild(iframe);

        },
        //自定义弹窗，4秒以后消失
        toast: function (html, time) {
            var toastElement = document.querySelector('#toastElement');
            time = time ? time : 4000;
            if (toastElement) {
                toastElement.innerHTML = html;
                toastElement.style.display = 'block';
                clearTimeout(timer1);
                var timer1 = setTimeout(function () {
                    toastElement.style.opacity = '1';
                }, 20);
            } else {
                toastElement = document.createElement('div');
                toastElement.style.cssText = 'position:fixed;left:50%;padding:10px 0;bottom:120px;width:70%;transform:translateX(-50%);-webkit-transform:translateX(-50%);line-height:26px;color:#fff;background:rgba(0,0,0,.5);-webkit-transition:.3s opacity;opacity:0;text-align:center;border-radius:4px;z-index: 999;';
                toastElement.id = 'toastElement';
                toastElement.innerHTML = html;
                document.getElementsByTagName('body')[0].appendChild(toastElement);
                clearTimeout(timer3);
                var timer3 = setTimeout(function () {
                    toastElement.style.opacity = '1';
                }, 10);
            }
            ;

            clearTimeout(timer2);
            var timer2 = setTimeout(function () {
                toastElement.style.opacity = '0';
                setTimeout(function () {
                    toastElement.style.display = 'none';
                }, time);
            }, time);
        },
        //获取地址栏参数,参数表示是否转码为中文
        getQuery: function (queryTypeString, isChinese) {
            var queryType = null;
            var differType = '?';//区别#还是？

            var query = {};//要返回的参数集合
            if (queryTypeString === 'hash') {
                queryType = window.location.hash;
                differType = '#';
            } else {
                queryType = window.location.href;
                differType = '?';
            }
            ;
            if (queryType.indexOf(differType) === -1) {
                return query;
            }
            ;
            var queryArr = queryType.split(differType).pop().split('&');
            queryArr.forEach(function (item, i) {
                var key = item.split('=')[0];
                var value = item.split('=')[1];
                if (isChinese) {
                    query[key] = decodeURI(value);
                } else {
                    query[key] = value;
                }
                ;
            });
            return query;
        },

        getUrlParam: function (url) {
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
        },
        /*
             自定义的弹出框
         * */
        confirm: function (options) {
            if (typeof options !== 'object') {
                return;
            }
            ;
            var settings = {
                title: '标题',
                text: '内容',
                okText: '确认',
                cancelText: '取消',
                okCallback: function () {
                },
                cancelCallback: function () {
                },
            };

            for (var s in options) {
                settings[s] = options[s];
            }
            ;

            var confirmElement = document.querySelector('#confirmElement');
            if (confirmElement) {
                //有元素了
                confirmElement.style.display = 'block';
                setTimeout(function () {
                    var confirmBox = confirmElement.getElementsByClassName('confirmBox')[0];
                    confirmBox.style.webkitTransform = confirmBox.style.transform = 'scale(1)';
                    var title = confirmBox.getElementsByTagName('h3')[0];
                    var content = confirmBox.getElementsByTagName('div')[0];
                    var ok = confirmBox.getElementsByClassName('ok')[0];
                    var cancel = confirmBox.getElementsByClassName('cancel')[0];
                    title.innerHTML = settings.title;
                    content.innerHTML = settings.text;
                    ok.innerHTML = settings.okText;
                    cancel.innerHTML = settings.cancelText;

                    confirmElement.style.opacity = '1';
                }, 20);
            } else {
                //没有就创建一个div
                confirmElement = document.createElement('div');
                confirmElement.id = 'confirmElement';
                confirmElement.style.cssText = 'position:fixed;z-index:999;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.5);opacity:0;display:none;-webkit-transition:.3s opacity;transition:.3s opacity;';
                confirmElement.innerHTML = '<div class="confirmBox" style="position:absolute;width:280px;left:50%;top:50%;margin-left:-140px;margin-top:-90px;-webkit-transform:scale(1.2);transform:scale(1.2);background:#fff;border-radius:10px;box-sizing:border-box;text-align:center;overflow:hidden;transition:.3s transform;">' +
                    '<h3 style="font-size:20px;color:#333;padding:10px 20px;font-weight:700;line-height:34px;">' + settings.title + '</h3>' +
                    '<div style="padding:0 20px;font-size:16px;color:#333;line-height:24px;">' + settings.text + '</div>' +
                    '<div style="font-size:0px;border-top:1px solid #EBEBEB;margin-top:25px;line-height:48px;height:48px;overflow:hidden;">' +
                    '<a href="javascript:;" class="ok" style="font-size:16px;width:50%;display:inline-block;border-right:1px solid #EBEBEB;box-sizing:border-box;color:#0FA5F5;">' + settings.okText + '</a>' +
                    '<a href="javascript:;" class="cancel" style="font-size:16px;width:50%;display:inline-block;color:#0FA5F5;">' + settings.cancelText + '</a>' +
                    '</div>' +
                    '</div>';
            }
            ;

            setTimeout(function () {
                confirmElement.addEventListener('click', clickEvent);
            }, 100);

            function clickEvent(ev) {
                var className = ev.target.className;
                if (className == 'ok') {
                    settings.okCallback && settings.okCallback(ev);
                    confirmElement.removeEventListener('click', clickEvent);
                } else if (className == 'cancel') {
                    settings.cancelCallback && settings.cancelCallback(ev);
                    confirmElement.removeEventListener('click', clickEvent);
                } else {
                    return;
                }
                ;

                confirmElement.style.opacity = '0';
                setTimeout(function () {
                    confirmElement.style.display = 'none';
                    var confirmBox = confirmElement.getElementsByClassName('confirmBox')[0];
                    confirmBox.style.webkitTransform = confirmBox.style.transform = 'scale(1.2)';
                }, 300);
                ev.stopPropagation();
                ev.preventDefault();
            };

            document.getElementsByTagName('body')[0].appendChild(confirmElement);
            confirmElement.style.display = 'block';
            setTimeout(function () {
                confirmElement.getElementsByClassName('confirmBox')[0].style.webkitTransform = 'scale(1)';
                confirmElement.style.opacity = '1';
            }, 20);
        },
        //将参数格式化
        formatParams: function (paramsObj) {
            var str = '';
            for (var s in paramsObj) {
                str += '&' + s + '=' + paramsObj[s];
            }
            ;

            str = str.substring(1);
            return str;
        },
        //判断是否为微信浏览器，是返回true，否则返回false；
        isWechartBrowser: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
            ;
        },
        //获取地址栏地址
        host: function () {
            var href = window.location.href;
            var host = href.indexOf('https://') > -1 ? 'https://' : 'http://';
            return (host + window.location.host);
        }
    },
    //当前项目用的方法
    current: {
        //获取本地存储的key值带有X-AUTH的值
        getXAUTH: function () {
            var retuerObj = {};
            var storage = window.localStorage;
            var len = storage.length;
            for (var i = 0; i < len; i++) {
                var key = storage.key(i);
                var value = storage.getItem(key);
                if (key.indexOf('X-AUTH') > -1) {
                    retuerObj[key] = value;
                }
                ;
            }
            ;

            return retuerObj;
        }
    }
};

export let toast = (text) => {
    this.$vux.toast.show({
        type: 'text',
        text: text,
        width: '80%',
        position: 'top'
    });
}
