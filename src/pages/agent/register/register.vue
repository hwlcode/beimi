<template>
    <div class="register">
        <div class="a-header">注册</div>
        <div class="user-info">
            <group title="您的姓名" label-width="0" label-align="right">
                <x-input title="" placeholder="请输入您的姓名" v-model="name" type="text"></x-input>
            </group>
            <group title="您的电话" label-width="0" label-align="right">
                <x-input title="" placeholder="请输入您的手机号码" v-model="phone" type="tel"></x-input>
            </group>
            <group title="短信验证码" label-width="0" label-align="right">
                <Flexbox>
                    <FlexboxItem>
                        <x-input title="" placeholder="请输入短信验证码" v-model="verifyCode" type="text"></x-input>
                    </FlexboxItem>
                    <FlexboxItem :span="4">
                        <x-button plain class="phone-code" @click.native="getPhoneCode" :disabled="disabled">
                            <span v-if="sending">获取验证码</span>
                                                        <span v-if="!sending">{{second}}秒后重发</span>                    
                        </x-button>
                    </FlexboxItem>
                </Flexbox>
            </group>
            <div class="fl-box">
                <x-button @click.native="backHome" class="back-home"
                          style="border-radius:99px;">返回首页
                </x-button>
                <x-button :gradients="['#546BE0', '#546BE0']" @click.native="submitInfo"
                          style="border-radius:99px; width: 150px;">注册
                </x-button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Flexbox, FlexboxItem} from 'vux';
    import {public_methods} from '../../../assets/js/public_method';
    let PHONE_REGX = /^(1[3-9])\d{9}$/;

    export default {
        name: "register",
        data() {
            return {
                name: '',
                phone: '',
                disabled: false,
                verifyCode: '',
                sending: true,
                second: 60,
                identifyCode: '7MvIfktc4v4oMI/Z8qe68w'
            }
        },
        methods: {
            submitInfo() {
                if (this.phone == '' || !PHONE_REGX.test(this.phone)) {
                    this.toast('请输入手机号');
                    return;
                }
                if (this.verifyCode == '') {
                    this.toast('请输入验证码');
                    return;
                }
                let url = public_methods.api.agentRegister;
                this.axios.get(url + '?phone=' + this.phone + '&name=' + this.name + '&verifyCode='+this.verifyCode + '&identifyCode=' + this.identifyCode)
                    .then(response => {
                        let data= response.data;
                        if(data.errorCode === 0){
                            // 存储token
                            // this.$store.commit('LOGIN', data.data.token);
                            // this.$store.commit('SET_USER_ID', data.data.id);
                            // this.$store.commit('SET_LOGIN_USER_PHONE', data.data.phone);
                            this.toast('注册成功！我们会尽快安排工作人员与您联系！')
                            // this.$router.push('/login');
                        }else{
                            this.toast(data.message);
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            backHome() {
                this.$router.push('/');
            },
            getPhoneCode() {
                if (this.phone == '' || !PHONE_REGX.test(this.phone)) {
                    this.toast('请输入有效的手机号码');
                    return;
                }
                this.axios.get(public_methods.api.registerVerifyCod + '?phone=' + this.phone).then(data => {
                    if(data.data.errorCode == 0){
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
                    }else{
                        this.toast(data.data.message);
                    }

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
            Flexbox, FlexboxItem
        }
    };
</script>

<style lang="less" scoped>
    .register {
        .a-header{
            background: rgb(84, 107, 224);
            color: #fff; font-size: 18px; text-align: center; line-height: 45px;
        }
        .phone-code {
            font-size: 13px;
            color: #5369E8;
            border: 1px #DCDCDC solid;
        }
        .fl-box{
            display: flex;
            padding: 0 20px 20px 20px; margin-top: 30px;
        }
        .back-home{
            height: 42px; width: 150px; margin-top: 15px; border: 1px #BFBFBF solid; overflow: hidden; color: #646464;
        }
    }
</style>
