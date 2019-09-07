<template>
    <div class="information-wrapper">
        <div class="user-info" v-show="showUserInfo">
            <group title="您的姓名" label-width="0" label-align="right">
                <x-input title="" placeholder="请输入您的姓名" v-model="name" type="text" :disabled="!isLogin"></x-input>
            </group>
            <group title="您的身份证号" label-width="0" label-align="right">
                <x-input title="" placeholder="请输入您的身份证号" v-model="identityNumber" type="text" :disabled="!isLogin"></x-input>
            </group>
            <group title="您的电话" label-width="0" label-align="right">
                <x-input title="" placeholder="请输入您的手机号码" v-model="phone" type="tel" :disabled="!isLogin"></x-input>
            </group>
            <group title="短信验证码" label-width="0" label-align="right" v-show="!isLogin">
                <Flexbox>
                    <FlexboxItem>
                        <x-input title="" placeholder="请输入短信验证码" v-model="phoneCode" type="text"></x-input>
                    </FlexboxItem>
                    <FlexboxItem :span="3">
                        <x-button plain class="phone-code" @click.native="getPhoneCode" :disabled="disabled">
                            <span v-if="sending">获取验证码</span>
                                                        <span v-if="!sending">{{second}}秒后重发</span>                    
                        </x-button>
                    </FlexboxItem>
                </Flexbox>
            </group>
            <div style="padding: 0 20px 20px 20px; margin-top: 30px;">
                <x-button :gradients="['#546BE0', '#546BE0']" @click.native="submitUserInfo"
                          style="border-radius:99px;" v-show="!isLogin">下一步
                </x-button>
                <x-button :gradients="['#546BE0', '#546BE0']" @click.native="showUserInfoMsg"
                          style="border-radius:99px;" v-show="isLogin">下一步
                </x-button>
            </div>
        </div>
        <!-- information{{new Date().getTime()}} -->
        <div class="more-user-info" v-show="!showUserInfo">
            <group title="房车" label-width="0" label-align="right">
                <popup-picker placeholder="请选择您的购房方式" :data="purchaseEstateList" show-name v-model="purchaseEstateMethod"
                              value-text-align="left"></popup-picker>
            </group>
            <group title="保单" label-width="0" label-align="right">
                <popup-picker placeholder="请选择保单年数" :data="warrantyList" show-name v-model="warrantyYears"
                              value-text-align="left"></popup-picker>
            </group>
            <group title="车" label-width="0" label-align="right">
                <popup-picker placeholder="请选择您的购车方式" :data="purchaseCarList" show-name v-model="purchaseCarMethod"
                              value-text-align="left"></popup-picker>
            </group>
            <group title="公积金" label-width="0" label-align="right">
                <popup-picker placeholder="请选择公积金年数" :data="foundList" show-name v-model="foundYears"
                              value-text-align="left"></popup-picker>
            </group>
            <group title="卡发工资" label-width="0" label-align="right">
                <popup-picker placeholder="请选择卡发工资年数" :data="cardPayWageList" show-name v-model="cardPayWageYears"
                              value-text-align="left"></popup-picker>
            </group>

            <group title="社保" label-width="0" label-align="right">
                <popup-picker placeholder="请选择您的社保年数" :data="socialInsuranceList" show-name v-model="socialInsuranceYears"
                              value-text-align="left"></popup-picker>
            </group>
            <group title="学历" label-width="0" label-align="right">
                <popup-picker placeholder="请选择您的学历" :data="educationList" show-name v-model="education"
                              value-text-align="left"></popup-picker>
            </group>
            <div style="padding: 0 20px 20px 20px; margin-top: 30px;">
                <x-button :gradients="['#546BE0', '#546BE0']" @click.native="submitMoreUserInfo"
                          style="border-radius:99px;">下一步
                </x-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Flexbox, FlexboxItem} from 'vux'
    import {public_methods, toast} from '../../../assets/js/public_method';
    let PHONE_REGX = /^(1[3-9])\d{9}$/;

    export default {
        name: 'information',
        data() {
            return {
                purchaseEstateList: [[
                    {name:'无房产', value: '1'},
                    {name:'全款', value: '2'},
                    {name:'贷款已结清', value: '3'},
                    {name:'公积金贷款', value: '4'},
                    {name:'商业贷款', value: '5'},
                    {name:'组合贷款', value: '6'}
                ]],
                warrantyList: [[
                    {name:'无', value: '1'},
                    {name:'1年以下', value: '2'},
                    {name:'1-3年', value: '3'},
                    {name:'3-5年', value: '4'},
                    {name:'5-10年', value: '5'},
                    {name:'10年以上', value: '6'},
                ]],
                // warrantyList: [['无','1年以下','1-3年','3-5年','5-10年','10年以上']],
                purchaseCarList: [[
                    {name:'无车', value: '1'},
                    {name:'全款', value: '2'},
                    {name:'贷款已结清', value: '3'},
                    {name:'贷款未结清', value: '4'},
                ]],
                foundList: [[
                    {name:'无', value: '1'},
                    {name:'1年以下', value: '2'},
                    {name:'1-3年', value: '3'},
                    {name:'3-5年', value: '4'},
                    {name:'5-10年', value: '5'},
                    {name:'10年以上', value: '6'},
                ]],
                cardPayWageList: [[
                    {name:'无', value: '1'},
                    {name:'1年以下', value: '2'},
                    {name:'1-3年', value: '3'},
                    {name:'3-5年', value: '4'},
                    {name:'5-10年', value: '5'},
                    {name:'10年以上', value: '6'},
                ]],
                socialInsuranceList: [[
                    {name:'无', value: '1'},
                    {name:'1年以下', value: '2'},
                    {name:'1-3年', value: '3'},
                    {name:'3-5年', value: '4'},
                    {name:'5-10年', value: '5'},
                    {name:'10年以上', value: '6'},
                ]],
                educationList: [[
                    {name:'小学及以下', value: '1'},
                    {name:'初中', value: '2'},
                    {name:'高中', value: '3'},
                    {name:'专科', value: '4'},
                    {name:'本科', value: '5'},
                    {name:'硕士及以上', value: '6'}
                ]],
                showUserInfo: true,

                name: '',
                identityNumber: '',
                phone: '',
                phoneCode: '',

                purchaseEstateMethod: [], // 购房方式
                warrantyYears: [], // 保单年数
                purchaseCarMethod: [], // 购车方式
                foundYears: [], // 公积金年数
                cardPayWageYears: [], // 发卡工资年数
                socialInsuranceYears: [], // 社保年数
                education: [], // 学历

                sending: true,
                disabled: false,
                second: 60,

                isLogin: false,
            }
        },
        created() {
            if(this.$store.state.isLogin){
                this.isLogin = true;
                this.showUserInfo = true;
            }else{
                this.isLogin = false;
                this.showUserInfo = false;
            }
            this.getLoan();
            this.getPersonInfo();
        },
        mounted() {

        },
        methods: {
            submitUserInfo() {
                let idCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

                if (this.name == '') {
                    this.toast('请输入姓名');
                    return;
                }
                if (this.identityNumber == '' || !idCard.test(this.identityNumber)) {
                    this.toast('请输入正确身份证号码');
                    return;
                }
                if (this.phone == '' || !PHONE_REGX.test(this.phone)) {
                    this.toast('请输入手机号');
                    return;
                }

                let body = {};
                let param = this.$route.params;
                let url = public_methods.api.register + '?verifyCode=' + this.phoneCode;

                body["identityNumber"] = this.identityNumber + '';
                body["loanAim"] = param.aimValue + '';
                body["loanMoney"] = param.moneyValue;
                body["name"] = this.name + '';
                body["phone"] = this.phone + '';

                this.axios.post(url,body)
                    .then(response => {
                        let data= response.data;
                        if(data.errorCode === 0){
                            // 存储token
                            console.log(data.token);
                            this.$store.commit('LOGIN', data.data.token);
                            this.$store.commit('SET_USER_ID', data.data.id);
                            console.log(this.$store);
                            this.showUserInfo = false;
                        }else{
                            this.toast(data.message);
                        }
                    })
                    .catch(error => {
                        reject(error)
                    });
            },
            submitMoreUserInfo(){
                if(this.purchaseEstateMethod.length == 0){
                    this.toast('请选择您的购房方式');
                    return;
                }
                if(this.warrantyYears.length == 0){
                    this.toast('请选择保单年数');
                    return;
                }
                if(this.purchaseCarMethod.length == 0){
                    this.toast('请选择您的购车方式');
                    return;
                }
                if(this.foundYears.length == 0){
                    this.toast('请选择公积金年数');
                    return;
                }
                if(this.cardPayWageYears.length == 0){
                    this.toast('请选择卡发工资年数');
                    return;
                }
                if(this.socialInsuranceYears.length == 0){
                    this.toast('请选择您的社保年数');
                    return;
                }
                if(this.education.length == 0){
                    this.toast('请选择您的学历');
                    return;
                }

                let data = {};
                data.purchaseEstateMethod = this.purchaseEstateMethod[0];
                data.warrantyYears = this.warrantyYears[0];
                data.purchaseCarMethod = this.purchaseCarMethod[0];
                data.foundYears = this.foundYears[0];
                data.cardPayWageYears = this.cardPayWageYears[0];
                data.socialInsuranceYears = this.socialInsuranceYears[0];
                data.education =  this.education[0];
                data.userId = this.$store.state.userId;
                let url = public_methods.api.processPerson;

                this.axios.post(url,data)
                    .then(response => {
                        let data= response.data;
                        if(data.errorCode === 0){
                            this.$router.push({
                                name: 'company'
                            });
                        }
                    })
                    .catch(error => {
                        reject(error)
                    });
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
            getLoan() {
                if(this.isLogin){
                    this.axios.get(public_methods.api.loan)
                        .then(res => {
                            let data = res.data;
                            if (data.errorCode == 0) {
                                this.identityNumber = data.data.identityNumber;
                                this.name = data.data.name;
                                this.phone = data.data.phone;
                            } else {
                                toast(data.message);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
            getPersonInfo() {
                if(this.isLogin){
                    this.axios.get(public_methods.api.getPersonInfo)
                        .then(res => {
                            let data = res.data;
                            if (data.errorCode == 0) {
                                this.cardPayWageYears.push(data.data.cardPayWageYears + '');
                                this.education.push(data.data.education + '');
                                this.foundYears.push(data.data.foundYears + '');
                                this.purchaseCarMethod.push(data.data.purchaseCarMethod + '');
                                this.purchaseEstateMethod.push(data.data.purchaseEstateMethod +'');
                                this.socialInsuranceYears.push(data.data.socialInsuranceYears + '');
                                this.warrantyYears.push(data.data.warrantyYears+'');
                            } else {
                                toast(data.message);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
            showUserInfoMsg(){
              this.showUserInfo = false;
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
            Flexbox,
            FlexboxItem
        }
    }
</script>

<style lang="less">
    .information-wrapper {
        padding-bottom: 30px;

        .phone-code {
            font-size: 13px;
            color: #5369E8;
            border: 1px #DCDCDC solid;
        }

        .weui-cells__title {
            color: rgba(0, 0, 0, 1);
            font-size: 16px;
        }
    }
</style>
