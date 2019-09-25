<template>
    <div class="header-wrapper">
        <div class="header">
            <div class="h">
                <router-link to="/"><em>简单的小企业贷款</em></router-link>
                <div>
                    <div v-show="!isLogin"
                         style="display: inline-block; position: absolute;right: 36px; top: 50%; margin-top: -13px; width: 60px; font-size: 13px;">
                        <router-link to="/login" class="common-small-bth logout" v-show="showLogin">登录</router-link>
                    </div>
                    <x-button class="common-small-bth logout" v-show="isLogin" @click.native="logout" style="right: 40px; margin-top: 0;">退出</x-button>
                    <span class="menu" @click="showMenuEvent()"></span>
                </div>
            </div>
        </div>
        <div class="menu-body-y" v-show="showMenu">
            <div class="menu-body">
                <div class="close" @click="hideMenuEvent()"></div>
                <div class="menu-list">
                    <!--                    <dl class="menu-item">-->
                    <!--                        <dt>-->
                    <!--                            <router-link to="/" @click.native="move()">首页</router-link>-->
                    <!--                        </dt>-->
                    <!--                        <dd><i class="icon"></i></dd>-->
                    <!--                    </dl>-->
                    <dl class="menu-item">
                        <dt>
                            <router-link to="/" @click.native="move()">怎么申请</router-link>
                        </dt>
                        <dd><i class="icon"></i></dd>
                    </dl>
                    <dl class="menu-item">
                        <dt>
                            <router-link to="/loan-type" @click.native="move()">贷款类型</router-link>
                        </dt>
                        <dd><i class="icon"></i></dd>
                    </dl>
                    <dl class="menu-item">
                        <dt>
                            <router-link to="/credit-card" @click.native="move()">信用卡</router-link>
                        </dt>
                        <dd><i class="icon"></i></dd>
                    </dl>
                    <dl class="menu-item">
                        <dt>
                            <router-link to="/questions" @click.native="move()">常见问题</router-link>
                        </dt>
                        <dd><i class="icon"></i></dd>
                    </dl>
                    <dl class="menu-item">
                        <dt>
                            <router-link to="/login" @click.native="move()" v-show="!isLogin">登录</router-link>
                            <p v-show="isLogin">欢迎您，{{loginUserPhone}} <a href="javascript:;" @click.stop="logout" style="font-weight: 700;">退出</a></p>
                        </dt>
                        <dd><i class="icon"></i></dd>
                    </dl>
                    <dl class="menu-item">
                        <dt>
                            <router-link to="/login" @click.native="move()">代理登录</router-link>
                        </dt>
                        <dd><i class="icon"></i></dd>
                    </dl>
                    <dl class="menu-item">
                        <dt>
                            <router-link to="/login" @click.native="move()">获取贷款优惠</router-link>
                        </dt>
                        <dd><i class="icon"></i></dd>
                    </dl>
<!--                    <dl class="menu-item">-->
<!--                        <dt>-->
<!--                            <router-link to="/agent/qr" @click.native="move()">个代测试</router-link>-->
<!--                        </dt>-->
<!--                        <dd><i class="icon"></i></dd>-->
<!--                    </dl>-->
<!--                    <dl class="menu-item">-->
<!--                        <dt>-->
<!--                            <router-link to="/step/pay" @click.native="move()">支付测试</router-link>-->
<!--                        </dt>-->
<!--                        <dd><i class="icon"></i></dd>-->
<!--                    </dl>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {public_methods} from '../../assets/js/public_method';

    export default {
        name: 'headerComponent',
        props: {
            showLogin: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                showMenu: false,
                isLogin: false,
                loginUserPhone: '',
            }
        },
        created(){
            if(window.sessionStorage.getItem('user')){
                let user = JSON.parse(window.sessionStorage.getItem('user'));
                this.isLogin = true;
                this.loginUserPhone = user['userName']
            }else{
                this.isLogin = false;
                this.loginUserPhone = '';
            }
        },
        mounted() {

        },
        // watch: {
        //     showMenu(newVal, oldVal) { //监听值发生变化时执行的方法
        //         if (val) {
        //             this.stop();
        //         } else {
        //             this.move();
        //         }
        //     }
        // },
        methods: {
            showMenuEvent() {
                this.showMenu = true;
                this.stop();
            },
            hideMenuEvent() {
                this.showMenu = false;
                this.move();
            },
            logout() {
                this.axios.post(public_methods.api.logout)
                    .then(response => {
                        let data = response.data;
                        if (data.errorCode == 0) {
                            // 清除token
                            window.sessionStorage.removeItem('user');
                            window.sessionStorage.removeItem('token');

                            this.$store.commit('LOGOUT');
                            this.isLogin = false;

                            this.toast('您的帐号退出成功！');
                            this.showMenu = false;
                            console.log(this.$store);
                        } else {
                            this.showMenu = false;
                            this.toast(data.message);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            toast(text) {
                this.$vux.toast.show({
                    type: 'text',
                    text: text,
                    width: '80%',
                    position: 'top'
                });
            },
            /***滑动限制***/
            stop() {
                var mo = function (e) {
                    e.preventDefault();
                };
                document.body.style.overflow = 'hidden';
                document.addEventListener("touchmove", mo, false);//禁止页面滑动
            },
            /***取消滑动限制***/
            move() {
                this.showMenu = false;

                var mo = function (e) {
                    e.preventDefault();
                };
                document.body.style.overflow = '';//出现滚动条
                document.removeEventListener("touchmove", mo, false);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '~css/beimi.less';

    .header-wrapper {
        .header {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            background: #fff;
            z-index: 900;

            .h {
                height: 50px;
                padding: 0 15px;
                position: relative;

                & > a {
                    position: absolute;
                    left: 15px;
                    top: 16px;
                    height: 20px;
                    padding-left: 60px;
                    background: url(../../assets/images/logo.png) no-repeat 0 center;
                    background-size: 55px 17px;

                    & > em {
                        font-size: 14px;
                        background: rgba(83, 105, 232, 1);
                        display: inline-block;
                        height: 20px;
                        line-height: 20px;
                        color: #fff;
                        padding: 0 5px;
                    }
                }

                & > div {
                    height: 100%;
                    position: relative;

                    & > a {
                        position: absolute;
                        right: 36px;
                        top: 50%;
                        margin-top: -13px;
                    }

                    .logout {
                        position: absolute;
                        right: 4px;
                        top: 12px;
                        margin-top: -13px;
                        width: 60px;
                        height: 27px;
                        line-height: 27px;
                        font-size: 13px;
                    }

                    & > span {
                        display: inline-block;
                        width: 21px;
                        height: 18px;
                        background: url(../../assets/images/menu.png) no-repeat 0 0;
                        background-size: 21px 18px;
                        position: absolute;
                        right: 0;
                        top: 50%;
                        margin-top: -9px;
                    }
                }


            }
        }

        .menu-body-y {
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);

            .menu-body {
                position: relative;
                padding: 0 50px;

                .menu-list {
                    color: #fff;
                    font-size: 16px;
                    padding-top: 150px;

                    dl {
                        margin-bottom: 45px;
                        display: flex;
                    }

                    dt {
                        flex: 1;

                        & > a {
                            display: block;
                        }
                    }

                    dd {
                        flex: 0 0 7px;

                        .icon {
                            display: inline-block;
                            width: 7px;
                            height: 13px;
                            background: url("./images/icon@2x.png") no-repeat 0 0;
                            background-size: contain;
                        }
                    }
                }

                .close {
                    position: absolute;
                    right: 30px;
                    top: 30px;
                    width: 20px;
                    height: 20px;
                    background: url("./images/gb@2x.png") no-repeat 0 0;
                    background-size: contain;
                }
            }
        }
    }
</style>
