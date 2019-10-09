<template>
    <div class="loan">
        <div class="tips">您的申请已提交!请参阅下面的贷款方案。</div>
        <div class="name-box">
            <p class="name">您好！{{user}}</p>
            <p class="desc">欢迎查看您的贷款列表</p>
        </div>
        <div class="captain">
            <h2>您目前处于{{checkStatus}}</h2>
            <p>
                <span>恭喜！根据筛选，您的企业似乎有资格获得Beimi的资助。</span>
                <span style="font-weight: 700; display: block;">下一步：我们的一位资助专家将致电您确认您的信息并查看资金选项。
                如果您想立即与专家联系，请致电您的贷款专家并提供客户编号#23kkjd</span>
            </p>
        </div>
        <div class="experts">
            <Flexbox>
                <FlexboxItem :span="4">
                    <div class="img-box"><img :src="header" alt=""></div>
                </FlexboxItem>
                <FlexboxItem class="experts-msg">
                    <h2>{{name}}<span>借贷专家</span></h2>
                    <div class="contact">
                        <div class="phone">{{phone}}</div>
                        <p>{{name}}在那里准备接听你的电话</p>
                    </div>
                    <a :href="'tel:' + phone" class="btn">和我们一起安排时间</a>
                </FlexboxItem>
            </Flexbox>
        </div>
        <div class="report-list">
            <h2>查看您的信用报告</h2>
            <x-table full-bordered style="background-color:#fff;">
                <tbody>
                <tr>
                    <td width="30%"><img :src="img2" alt="" width="30"></td>
                    <td>
                        <h3>信用报告普通版</h3>
                        <ul>
                            <li>★ 创建一个免费账户并开始跟踪您的财务状况</li>
                            <li>★ 通过自定义发票更快的获得付款</li>
                            <li>★ 连接您的银行并对费用和收入进行分类</li>
                            <li>★ 访问报告以帮助您了解您的业务</li>
                        </ul>
                        <div class="btn-box">
                            <x-button class="btn" @click.native="showCredit">点击查看详情</x-button>
                        </div>
                    </td>
                </tr>
                <!--                <tr>-->
                <!--                    <td><img :src="img3" alt="" width="30"></td>-->
                <!--                    <td>-->
                <!--                        <h3>信用报告专业版</h3>-->
                <!--                        <ul>-->
                <!--                            <li>★ 一小时内免费资助提案</li>-->
                <!--                            <li>★ 专注于创业/新业务资金</li>-->
                <!--                            <li>★ 无需财务或纳税申报表</li>-->
                <!--                            <li>★ 无需抵押品</li>-->
                <!--                            <li>★ 灵活的付款选项</li>-->
                <!--                        </ul>-->
                <!--                        <div class="btn-box">-->
                <!--                            <x-button class="btn">点击查看详情</x-button>-->
                <!--                        </div>-->
                <!--                        <p>-->
                <!--                            这里可以放一些其他文字内容这里可以放一些其他文字内容-->
                <!--                            这里可以放一些其他文字内容这里可以放一些其他文字内容-->
                <!--                            这里可以放一些其他文字内容-->
                <!--                        </p>-->
                <!--                    </td>-->
                <!--                </tr>-->
                </tbody>
            </x-table>
        </div>
        <div class="report-list">
            <h2>用企业贷款获得融资</h2>
            <x-table full-bordered style="background-color:#fff;" v-if="loans.length == 0">
                <tr>
                    <td>没有符合您的企业贷产品，我们为您推荐了以下产品</td>
                </tr>
            </x-table>
            <x-table full-bordered style="background-color:#fff;" v-if="loans.length > 0">
                <tbody>
                <tr v-for="item in loans">
                    <td width="30%"><img :src="item.logo" alt="" width="60"></td>
                    <td>
                        <h3>{{item.productName}}</h3>
                        <div v-html="item.productDesc" style="text-align: left; padding-left: 10px;"></div>
                        <Flexbox>
                            <FlexboxItem :span="4">
                                <div style="padding-left: 10px;">产品月费：</div>
                            </FlexboxItem>
                            <FlexboxItem :span="8">{{item.loanRate}}%/月</FlexboxItem>
                        </Flexbox>
                        <Flexbox>
                            <FlexboxItem :span="4">
                                <div style="padding-left: 10px;">额度氛围：</div>
                            </FlexboxItem>
                            <FlexboxItem :span="8">{{item.minLoan}}万元~{{item.maxLoan}}万元</FlexboxItem>
                        </Flexbox>
                        <div class="btn-box">
                            <a :href="item.productUrl" class="btn">点击查看详情</a>
                        </div>
                    </td>
                </tr>
                </tbody>
            </x-table>
        </div>
        <div class="report-list" v-if="credits.length > 0 || services.length > 0">
            <x-table full-bordered style="background-color:#fff; margin-top: 15px;">
                <tbody>
                <tr>
                    <td width="50%">
                        <p style="text-align: center; padding-top: 10px;">信用卡</p>
                        <p style="text-align: center; font-size: 20px; color: #5369E8; font-weight: 700;">
                            {{credits.length}}</p>
                        <p style="text-align: center; padding-bottom: 10px;">视图</p>
                    </td>
                    <td>
                        <p style="text-align: center; padding-top: 10px;">其他融资方案</p>
                        <p style="text-align: center; font-size: 20px; color: #5369E8;  font-weight: 700;">
                            {{services.length}}</p>
                        <p style="text-align: center; padding-bottom: 10px;">视图</p>
                    </td>
                </tr>
                </tbody>
            </x-table>
        </div>
        <div class="report-list">
            <h2>建立信贷或获取资金的其他方式</h2>
            <x-table full-bordered style="background-color:#fff;" v-if="credits.length == 0">
                <tr>
                    <td>没有符合您的信用卡产品，我们为您推荐了以上企业贷产品</td>
                </tr>
            </x-table>
            <x-table full-bordered style="background-color:#fff;" v-if="credits.length > 0">
                <thead>
                <tr>
                    <td colspan="2" style="background: #DFE4FF; font-size: 14px; font-weight: 700">合作伙伴服务</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in credits">
                    <td width="30%"><img :src="item.logo" alt="" width="60"></td>
                    <td>
                        <h3>{{item.productName}}</h3>
                        <div v-html="item.productDesc" style="text-align: left; padding-left: 10px;"></div>
                        <Flexbox>
                            <FlexboxItem :span="4">
                                <div style="padding-left: 10px;">产品月费：</div>
                            </FlexboxItem>
                            <FlexboxItem :span="8">{{item.loanRate}}%/月</FlexboxItem>
                        </Flexbox>
                        <Flexbox>
                            <FlexboxItem :span="4">
                                <div style="padding-left: 10px;">额度氛围：</div>
                            </FlexboxItem>
                            <FlexboxItem :span="8">{{item.minLoan}}万元~{{item.maxLoan}}万元</FlexboxItem>
                        </Flexbox>
                        <div class="btn-box">
                            <a :href="item.productUrl" class="btn">点击查看详情</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style=" background: #E5E5E5">
                        <router-link to="/credit-card">点击查看更多</router-link>
                        <x-icon type="ios-arrow-down" size="10"></x-icon>
                    </td>
                </tr>
                </tbody>
            </x-table>
        </div>
        <div class="report-list">
            <h2 style="margin-bottom: 0">为您的企业提供资源</h2>
            <x-table full-bordered style="background-color:#fff; margin-top: 15px;" v-if="services.length == 0">
                <tr>
                    <td>没有符合您的服务资源，请联系代理获取更多的资源</td>
                </tr>
            </x-table>
            <p style="text-align: center; margin-bottom: 20px;" v-if="services.length > 0">
                根据您的业务需求和情况，我们认为这些可能是您需要的优质资源</p>
            <x-table full-bordered style="background-color:#fff;" v-if="services.length > 0">
                <thead>
                <tr>
                    <td colspan="2" style="background: #DFE4FF; font-size: 14px; font-weight: 700">合作伙伴服务</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in services">
                    <td width="30%"><img :src="item.logo" alt="" width="60"></td>
                    <td>
                        <h3>{{item.productName}}</h3>
                        <div v-html="item.productDesc" style="text-align: left; padding-left: 10px;"></div>
                        <Flexbox>
                            <FlexboxItem :span="4">
                                <div style="padding-left: 10px;">产品月费：</div>
                            </FlexboxItem>
                            <FlexboxItem :span="8">{{item.loanRate}}%/月</FlexboxItem>
                        </Flexbox>
                        <Flexbox>
                            <FlexboxItem :span="4">
                                <div style="padding-left: 10px;">额度氛围：</div>
                            </FlexboxItem>
                            <FlexboxItem :span="8">{{item.minLoan}}万元~{{item.maxLoan}}万元</FlexboxItem>
                        </Flexbox>
                        <div class="btn-box">
                            <a :href="item.productUrl" class="btn">点击查看详情</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style=" background: #E5E5E5">
                        <router-link to="/credit-card">点击查看更多</router-link>
                        <x-icon type="ios-arrow-down" size="10"></x-icon>
                    </td>
                </tr>
                </tbody>
            </x-table>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import {Flexbox, FlexboxItem, XTable} from 'vux'
    import footerComponent from '../../../components/footer/index';
    import {public_methods} from '../../../assets/js/public_method';

    export default {
        name: 'loan',
        data() {
            return {
                img1: require('../images/9.jpg'),
                img2: require('../images/clipboard@2x.png'),
                img3: require('../images/newspaper@2x.png'),
                img4: require('../images/11.png'),
                img5: require('../images/12.png'),
                img6: require('../images/13.png'),
                img7: require('../images/14.png'),
                img8: require('../images/15.png'),

                // selectedCity: [],
                user: this.$store.state.name,
                isLogin: false,
                loans: [], // 已匹配贷款产品
                credits: [], // 己匹配信用卡产品
                services: [], // 已匹配服务
                status: 0,
                head: '',
                name: '',
                phone: '',
            }
        },
        created() {
            if (window.localStorage.getItem('user')) {
                this.isLogin = true;
                this.recommand();
                // this.getCompanyInfo();
            }
        },
        computed: {
            checkStatus() {
                let txt = '';
                if (this.status == 0) {
                    txt = '预审审批流程中';
                } else if (this.status == 1) {
                    txt = '审核通过状态';
                } else if (this.status == 2) {
                    txt = '审核未通过状态';
                }
                return txt;
            },
            header() {
                let img = '';
                if (this.head == '') {
                    img = require('../images/9.jpg');
                } else {
                    img = this.head;
                }
                return img;
            }
        },
        methods: {
            showCredit() {
                this.$router.push({
                    name: 'credit'
                });
                this.$store.commit('SET_CURRENT_TAB_PAGE', 3);
            },
            // hasReview() {
            //     this.axios.get(public_methods.api.hasReview).then(
            //         response => {
            //             let data = response.data;
            //             if (data.data) {
            //                 this.$router.push({
            //                     name: 'credit'
            //                 });
            //                 this.$store.commit('SET_CURRENT_TAB_PAGE', 3);
            //             } else {
            //                 this.$router.push({
            //                     name: 'credit'
            //                 });
            //                 this.$store.commit('SET_CURRENT_TAB_PAGE', 2);
            //             }
            //         })
            //         .catch(error => {
            //             console.log(error)
            //         });
            // },
            recommand() {
                this.axios.post(public_methods.api.recommand).then(res => {
                    let data = res.data;
                    if (data.errorCode == 0) {
                        this.loans = data.data.loans;
                        this.credits = data.data.credits;
                        this.services = data.data.services;
                        this.status = data.data.status;
                        this.head = data.data.head;
                        this.name = data.data.name;
                        this.phone = data.data.phone;
                    } else {
                        this.toast(data.message);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            // getCompanyInfo() {
            //     if (this.isLogin) {
            //         this.axios.get(public_methods.api.getCompanyInfo)
            //             .then(res => {
            //                 let data = res.data;
            //                 if (data.errorCode == 0) {
            //                     this.selectedCity.push(data.data.provinceCode + '');
            //                     this.selectedCity.push(data.data.cityCode + '');
            //                     this.selectedCity.push(data.data.areaCode + '');
            //
            //                     this.matchingProductList(this.selectedCity);
            //                 } else {
            //                     this.toast(data.message);
            //                 }
            //             })
            //             .catch(error => {
            //                 console.log(error);
            //             });
            //     }
            // },
            // matchingProductList(obj) {
            //     this.axios.post(public_methods.api.matchingProductList + `?provice=${obj[0]}&city=${obj[1]}area=${obj[2]}`).then(res => {
            //         let data = res.data;
            //         if (data.errorCode == 0) {
            //             console.log(data);
            //         } else {
            //             this.toast(data.message);
            //         }
            //     }).catch(error => {
            //         console.log(error);
            //     });
            // },
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
            FlexboxItem,
            XTable,
            'v-footer': footerComponent
        }
    }
</script>

<style lang="less" scoped>
    .loan {
        background: #eef2fd;

        .tips {
            background: rgba(83, 105, 232, 0.1);
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            color: #5369E8;
            padding-left: 30px;
            position: relative;

            &:before {
                content: ".";
                position: absolute;
                width: 14px;
                height: 14px;
                left: 10px;
                top: 8px;
                background: url("../images/checked@2x.png") no-repeat 0 0;
                background-size: contain;
            }
        }

        .name-box {
            padding: 20px 10px;
            color: #323232;
            background: #fff;

            .name {
                font-size: 17px;
                font-weight: 700;
            }

            .desc {
                font-size: 11px;
            }
        }

        .captain {
            background: #eee;
            padding: 10px;

            h2 {
                font-size: 14px;
                font-weight: 700;
                color: #5369E8;
                margin-bottom: 5px;
            }

            p {
                font-size: 12px;
                font-weight: 700;
                color: #323232;

                span {
                    font-size: 11px;
                    font-weight: 400;
                }
            }
        }

        .experts {
            background: #fff;
            margin-bottom: 10px;
            padding: 15px 20px;

            .img-box {
                img {
                    width: 100%;
                }
            }

            .experts-msg {
                padding-left: 10px;

                h2 {
                    color: #323232;
                    font-size: 18px;
                    font-weight: 700;

                    span {
                        font-size: 12px;
                        font-weight: 400;
                        display: inline-block;
                        padding-left: 5px;
                    }
                }

                .contact {
                    position: relative;
                    margin: 15px 0;
                    padding-left: 40px;

                    &:before {
                        content: ".";
                        position: absolute;
                        width: 30px;
                        height: 30px;
                        background: url("../images/checked@2x.png") no-repeat 0 0;
                        background-size: contain;
                        left: 0;
                        top: 7px;
                    }

                    .phone {
                        font-weight: 700;
                        font-size: 17px;
                        color: #5369E8;
                    }

                    p {
                        font-size: 10px;
                        color: #969696;
                    }
                }

                .btn {
                    border: 1px solid rgba(83, 105, 232, 1);
                    border-radius: 34px;
                    height: 35px;
                    line-height: 23px;
                    color: #5369E8;
                    font-size: 15px;
                    font-weight: 700;
                    background: #fff;
                }
            }
        }

        .report-list {
            background: #fff;
            padding: 10px;
            font-size: 10px;
            color: #646464;
            margin-bottom: 10px;

            .bold {
                font-weight: 700;
                font-size: 10px;
                margin-left: 10px;
                text-align: center;
                line-height: 20px;
            }

            .vux-flexbox-item {
                line-height: 20px;
            }

            h2 {
                color: #323232;
                font-size: 17px;
                font-weight: 700;
                text-align: center;
                margin: 15px 0;
            }

            h3 {
                text-align: left;
                color: #323232;
                font-weight: 700;
                font-size: 13px;
                padding-left: 10px;
            }

            ul > li {
                text-align: left;
                line-height: 20px;
                padding-left: 10px;
            }

            p {
                text-align: left;
                line-height: 20px;
                padding-left: 10px;
            }

            .btn-box {
                text-align: left;
                padding-left: 10px;
            }

            .btn {
                display: inline-block;
                width: 150px;
                line-height: 15px;
                background: rgba(83, 105, 232, 1);
                border-radius: 15px;
                color: #fff;
                font-size: 14px;
                font-weight: 700;
            }
        }
    }
</style>
