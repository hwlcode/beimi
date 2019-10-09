<template>
    <div class="login">
        <navigation title="登录"></navigation>
        <div class="login-banner">
            <img :src="loginImg">
        </div>
        <div class="login-form">
            <group title="手机号" label-width="0" label-align="right" class="l-form-title">
                <x-input title="" placeholder="请输入您的手机号" v-model="phone"></x-input>
            </group>
            <group title="手机验证码" label-width="0" label-align="right" class="l-form-title">
                <div class="flex">
                    <x-input title="" placeholder="请输入手机验证码" class="flex-box-item" :max="6" v-model="mobileCode"></x-input>
                    <x-button class="code-btn" type="default" plain @click.native="getPhoneCode">
                        <span v-if="sending">获取验证码</span>
                        <span v-if="!sending">{{second}}秒后重发</span>
                    </x-button>
                </div>
            </group>
            <group title="图形验证码" label-width="0" label-align="right" class="l-form-title">
                <div class="flex">
                    <x-input title="" placeholder="请输入图形验证码" class="flex-box-item" v-model="imgCode"></x-input>
                    <x-button class="code-btn" type="default" plain @click.native="getImageCode">
                        <img :src="imageCode" alt="" v-show="showImageCode">
                        <span v-show="!showImageCode">获取验证码</span></x-button>
                </div>
            </group>
            <div>
                <x-button type="default" class="login-btn" @click.native="login">登录</x-button>
            </div>
            <div class="no-resi">
                还没有账号？
                <router-link to="/step" class="resi-btn">立即注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import navigation from '../../components/navigation/navigation';
    import {XButton} from 'vux';
    import {public_methods} from '../../assets/js/public_method';

    let PHONE_REGX = /^(1[3-9])\d{9}$/;

    export default {
        name: 'login-component',
        data() {
            return {
                loginImg: require('./images/login.png'),
                phone: '',
                sending: true,
                disabled: false,
                second: 60,

                mobileCode: '',
                imgCode: '', // 用户填写的验证码
                showImageCode: false,
                imageCode: '', // 服务器收到的图形验证码
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            getPhoneCode() {
                if (this.phone === '' || !PHONE_REGX.test(this.phone)) {
                    this.toast('请输入有效的手机号码');
                    return false;
                }
                this.axios.get(public_methods.api.loginVerifyCode + '?phone=' + this.phone)
                    .then(
                        data => {
                            data = data.data;
                            if (data.errorCode == 0) {
                                this.sending = false;
                                this.disabled = true;
                                let result = setInterval(() => {
                                    --this.second;
                                    if (this.second <= 0) {
                                        clearInterval(result);
                                        this.sending = true;
                                        this.disabled = false;
                                        this.second = 60;
                                    }
                                }, 1000);
                            }
                            if (data.errorCode === 1052) {
                                this.toast('手机号码未注册，请先注册');
                            }
                            // else {
                            //     this.toast(data.message);
                            // }
                        }).catch(e => {
                    this.toast(e);
                });
            },
            getImageCode() {
                if (this.phone === '' || !PHONE_REGX.test(this.phone)) {
                    this.toast('请输入有效的手机号码');
                    return false;
                }
                this.imageCode = public_methods.api.imageCode + '?phone=' + this.phone + '&v=' + new Date().getTime();
                this.showImageCode = true;
            },
            login() {
                if (this.phone === '' || !PHONE_REGX.test(this.phone)) {
                    this.toast('请输入有效的手机号码');
                    return false;
                }
                if (this.mobileCode == '' || this.imgCode == '') {
                    this.toast('短信验证码或图形验证码不正确！');
                    return;
                }
                this.axios.post(public_methods.api.login + '?phone=' + this.phone + '&verifyCode=' + this.mobileCode + '&randomCode=' + this.imgCode.toLowerCase())
                    .then(response => {
                        let data = response.data;
                        if (data.errorCode === 0) {
                            // 存储token
                            this.$store.commit('LOGIN', data.data.token);
                            this.$store.commit('SET_USER_ID', data.data.id);
                            this.$store.commit('SET_LOGIN_USER_PHONE', data.data.phone);
                            this.$store.commit('SET_NAME', data.data.name);

                            if (window.localStorage.getItem('user')) {
                                window.localStorage.removeItem('user');
                                window.localStorage.setItem('user', JSON.stringify(data.data));
                                window.localStorage.setItem('token', JSON.stringify(data.data.token));
                            }else{
                                window.localStorage.setItem('user', JSON.stringify(data.data));
                                window.localStorage.setItem('token', JSON.stringify(data.data.token));
                            }
                            this.hasReview();
                            // console.log(this.$store);
                            // this.$router.push({
                            //     path: '/step'
                            // });
                        }
                        if (data.errorCode === 1052) {
                            this.toast('手机号码未注册，请先注册');
                        } else if (data.message == null) {
                            this.toast('登录成功！');
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            hasReview() {
                this.axios.get(public_methods.api.hasReview).then(
                    response => {
                        let data = response.data;
                        if (data.data) {
                            this.$router.push({
                                name: 'loan'
                            });
                            this.$store.commit('SET_CURRENT_TAB_PAGE', 4);
                        } else {
                            this.$router.push({
                                name: 'demand'
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            toast(text) {
                this.$vux.toast.show({
                    type: 'text',
                    text: text,
                    width: '80%',
                    position: 'top'
                });
            }
        },
        components: {
            'navigation': navigation,
            XButton
        }
    }
</script>

<style lang="less" scoped>
    .login {
        background: #fff;

        .login-banner img {
            width: 100%;
        }

        .login-form {
            padding: 0 10px;

            /deep/ .weui-cells__title {
                font-size: 16px;
                color: #000000;
                padding: 0;
            }

            /deep/ .weui-cell {
                padding: 0px 0 10px 0;
            }

            /deep/ .weui-input {
                border: 1px #DCDCDC solid;
                height: 40px;
                line-height: 40px;
                border-radius: 10px;
                text-indent: 10px;
            }

            /deep/ .flex-box-item {
                flex: 1;
            }

            /deep/ .flex-box-item .weui-input {
                border-radius: 10px 0 0 10px;
            }

            /deep/ .code-btn {
                flex: 0 0 100px;
                margin: 0px 0 10px 0;
                font-size: 12px;
                color: #5369E8;
                border: 1px #DCDCDC solid;
                border-left: 0;
                height: 40px;
                line-height: 40px;
                border-radius: 0 10px 10px 0;
                padding-left: 0;
                padding-right: 0;
            }

            /deep/ .weui-cells:before {
                border-top: 1px #fff solid;
            }

            /deep/ .weui-cells:after {
                border-bottom: 1px #fff solid;
            }

            /deep/ .login-btn {
                background: #5369E8;
                border-radius: 20px;
                color: #fff;
                margin-bottom: 10px;
            }

            .l-form-title {
                margin-bottom: 25px;
            }

            .flex {
                display: flex;
            }

            .no-resi {
                text-align: center;
                color: #969696;
                font-size: 12px;
                padding-bottom: 20px;
            }

            .resi-btn {
                color: #5369E8
            }
        }

    }
</style>
