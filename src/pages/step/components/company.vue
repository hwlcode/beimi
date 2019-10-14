<template>
    <div class="compant-container">
        <div class="company-info" v-show="showCompanyInfo">
            <group title="公司名称" label-width="0" label-align="right">
                <x-input title="" placeholder="请选输入的公司名称" v-model="companyName" type="text"></x-input>
            </group>
            <group title="社会信用代码" label-width="0" label-align="right">
                <x-input title="" placeholder="请输入社会信用代码" v-model="companySocialCreditCode" type="text"></x-input>
            </group>
            <group title="经营城市" label-width="0" label-align="right">
                <x-address title="" v-model="selectedCity" value-text-align="left" :list="ChinaAddressV4Data"
                           placeholder="请选择经营城市"></x-address>
            </group>
            <group title="经营地址" label-width="0" label-align="right">
                <x-input title="" placeholder="请输入经营地址" v-model="companyBusinessAddress" type="text"></x-input>
            </group>
            <div style="padding: 0 20px 20px 20px; margin-top: 30px;">
                <x-button :gradients="['#546BE0', '#546BE0']" @click.native="submitInfo"
                          style="border-radius:99px;">下一步
                </x-button>
            </div>
            <!--            <v-service></v-service>-->
        </div>
        <div class="more-company-info" v-show="!showCompanyInfo">
            <!-- company -->
            <group title="公司成立多久" label-width="0" label-align="right">
                <popup-picker placeholder="请选择您公司成立的年数" :data="companyFoundList" show-name v-model="companyFoundYears"
                              value-text-align="left"></popup-picker>
            </group>

            <group title="公司每年上缴税金额度" label-width="0" label-align="right">
                <popup-picker title="" placeholder="请选择公司税金" :data="companyAnnualTaxList" show-name
                              v-model="companyAnnualTax"
                              value-text-align="left"></popup-picker>
            </group>

            <group title="公司年利润" label-width="0" label-align="right">
                <popup-picker title="" placeholder="请选择公司年利润" :data="companyAnnualProfitList" show-name
                              v-model="companyAnnualProfit"
                              value-text-align="left"></popup-picker>
            </group>
            <div class="tips-container">
            <span class="tips" @click.stop="viewCreditPoints">
                了解信用分&gt;
            </span>
                <group title="企业信用分" label-width="0" label-align="right">
                    <x-input title="" placeholder="请输入您的企业信用分" v-model="companyCreditScore"></x-input>
                </group>
            </div>
            <div style="padding: 0 20px 20px 20px; margin-top: 30px;">
                <x-button :gradients="['#546BE0', '#546BE0']" @click.native="submitCompanyInfo"
                          style="border-radius:99px;">下一步
                </x-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {XAddress, ChinaAddressV4Data} from 'vux'
    import {public_methods} from '../../../assets/js/public_method';
    import service from '../../../components/service/service';

    export default {
        name: 'company',
        data() {
            return {
                showCompanyInfo: true,

                selectedCity: [],
                ChinaAddressV4Data: ChinaAddressV4Data,
                companyName: '',
                companySocialCreditCode: '',
                companyBusinessAddress: '',

                companyFoundList: [[
                    {name: '一年以下', value: '1'},
                    {name: '1-2年', value: '2'},
                    {name: '2-3年', value: '3'},
                    {name: '3-5年', value: '4'},
                    {name: '5年以上', value: '5'}
                ]],
                companyAnnualTaxList: [[
                    {name: '5000及以下', value: '1'},
                    {name: '5千-1万', value: '2'},
                    {name: '1-5万', value: '3'},
                    {name: '5万-20万', value: '4'},
                    {name: '20万以上', value: '5'}
                ]],
                companyAnnualProfitList: [[
                    {name: '10万及以下', value: '1'},
                    {name: '10万-50万', value: '2'},
                    {name: '50-200万', value: '3'},
                    {name: '200-500万', value: '4'},
                    {name: '500万以上', value: '5'}
                ]],
                companyFoundYears: [],
                companyAnnualProfit: [],
                companyAnnualTax: [],
                companyCreditScore: '',

                isLogin: false
            }
        },
        created() {
            if (window.localStorage.getItem('user')) {
                this.isLogin = true;
                this.showCompanyInfo = true;
                this.getCompanyInfo();
                this.getCompanyOperate();
            } else {
                this.isLogin = false;
                this.showCompanyInfo = true;
            }
        },
        beforeRouteEnter(to, from, next) {
            if (to.name == 'company') {
                // 取不到this,组件还未创建
                // console.log(this);
                // this.showCompanyInfo = true;
                next(vm => {
                    vm.showCompanyInfo = true;
                });
            }
        },
        mounted() {

        },
        methods: {
            viewCreditPoints() {
                this.$store.commit('SET_CURRENT_TAB_PAGE', 1);
                this.$router.push({
                    name: 'credit',
                    params: {
                        companyCreditScore: this.companyCreditScore
                    }
                });
            },
            submitInfo() {
                if (this.companyName == '') {
                    this.toast('请选输入的公司名称');
                    return;
                }
                if (this.companySocialCreditCode == '') {
                    this.toast('请输入社会信用代码');
                    return;
                }
                if (this.selectedCity.length == 0) {
                    this.toast('请选择经营城市');
                    return;
                }
                if (this.companyBusinessAddress == '') {
                    this.toast('请输入经营地址');
                    return;
                }

                let body = {};
                let url = public_methods.api.companyInfo;

                body["companyName"] = this.companyName;
                body["companySocialCreditCode"] = this.companySocialCreditCode;
                body["companyBusinessAddress"] = this.companyBusinessAddress;
                body["userId"] = this.$store.state.userId;
                body["province"] = '';
                body["provinceCode"] = this.selectedCity[0];
                body["city"] = '';
                body["cityCode"] = this.selectedCity[1];
                body["area"] = '';
                body["areaCode"] = this.selectedCity[2];

                this.axios.post(url, body)
                    .then(response => {
                        let data = response.data;

                        if (data.errorCode === 0) {
                            this.showCompanyInfo = false;
                            this.$store.commit('SET_COMPONY_NAME', this.companyName);
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            submitCompanyInfo() {
                if (this.companyFoundYears.length == 0) {
                    this.toast('请选择您公司成立的年数');
                    return;
                }
                if (this.companyAnnualTax.length == 0) {
                    this.toast('请选择公司税金');
                    return;
                }
                if (this.companyAnnualProfit.length == 0) {
                    this.toast('请选择公司年利润');
                    return;
                }
                // if (this.companyCreditScore == '') {
                //     this.toast('请输入您的企业信用分');
                //     return;
                // }

                let data = {};
                data.companyFoundYears = this.companyFoundYears[0];
                data.companyAnnualTax = this.companyAnnualTax[0];
                data.companyAnnualProfit = this.companyAnnualProfit[0];
                data.companyCreditScore = this.companyCreditScore;
                data.userId = this.$store.state.userId;
                let url = public_methods.api.companyOperate;

                this.axios.post(url, data)
                    .then(response => {
                        let data = response.data;
                        if (data.errorCode === 0) {
                            if (window.localStorage.getItem('isFree')) {
                                this.$router.push({
                                    name: 'loan'
                                });
                                // this.$store.commit('SET_CURRENT_TAB_PAGE',4);
                            } else {
                                this.$router.push({
                                    name: 'credit',
                                    params: {
                                        companyCreditScore: this.companyCreditScore || 0,
                                    }
                                });
                                this.$store.commit('SET_CURRENT_TAB_PAGE', 2);
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            getCompanyInfo() {
                if (this.isLogin) {
                    this.axios.get(public_methods.api.getCompanyInfo)
                        .then(res => {
                            let data = res.data;
                            if (data.errorCode == 0) {
                                this.companyName = data.data.companyName;
                                this.companySocialCreditCode = data.data.companySocialCreditCode;
                                this.companyBusinessAddress = data.data.companyBusinessAddress;
                                if (data.data.provinceCode != null) {
                                    this.selectedCity.push(data.data.provinceCode + '');
                                    this.selectedCity.push(data.data.cityCode + '');
                                    this.selectedCity.push(data.data.areaCode + '');
                                }
                            } else {
                                this.toast(data.message);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
            getCompanyOperate() {
                if (this.isLogin) {
                    this.axios.get(public_methods.api.getCompanyOperate)
                        .then(res => {
                            let data = res.data;
                            if (data.errorCode == 0 && data.data.companyCreditScore != null) {
                                this.companyCreditScore = data.data.companyCreditScore;
                                this.companyFoundYears.push(data.data.companyFoundYears + '');
                                this.companyAnnualTax.push(data.data.companyAnnualTax + '');
                                this.companyAnnualProfit.push(data.data.companyAnnualProfit + '');
                            } else {
                                this.toast(data.message);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
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
            XAddress,
            ChinaAddressV4Data,
            'v-service': service
        }
    }
</script>

<style lang="less">
    .compant-container {
        padding-bottom: 30px;

        .weui-cells__title {
            color: rgba(0, 0, 0, 1);
            font-size: 16px;
        }

        .vux-cell-value {
            color: #000;
        }

        .tips-container {
            position: relative;

            .tips {
                position: absolute;
                left: 100px;
                top: 3px;
                font-size: 12px;
                display: block;
                padding: 0 5px;;
                background: rgba(83, 105, 232, 1);
                border-radius: 8px;
                color: #fff;
                height: 20px;
                line-height: 20px;
            }
        }
    }
</style>
