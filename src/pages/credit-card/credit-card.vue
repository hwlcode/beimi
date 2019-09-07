<template>
    <div class="credit-card" id="credit-card">
        <v-header :showLogin="false"></v-header>
        <div class="credit">
            <div class="banner"><img :src="img2" alt=""></div>
            <div style="position: relative">
                <tab class="top-tab" bar-active-color="#fff" default-color="#AAB6F7" active-color="#fff">
                    <tab-item @on-item-click="showAllEvent"><span style="font-weight: 700">所有卡片</span>
                        <x-icon v-if="showAll" type="ios-arrow-up" size="10"></x-icon>
                        <x-icon v-if="!showAll" type="ios-arrow-down" size="10"></x-icon>
                    </tab-item>
                    <tab-item @on-item-click="handler">低利率</tab-item>
                    <tab-item @on-item-click="handler">没有年费</tab-item>
                    <tab-item @on-item-click="handler">旅行奖励</tab-item>
                    <tab-item @on-item-click="handler">现金奖励</tab-item>
                </tab>
                <div class="show-all" v-show="showAll">
                    <Checker v-model="selectedMenu" type="checkbox" default-item-class="v-item"
                             selected-item-class="v-item-selected">
                        <CheckerItem v-for="(item, index) in submenu" :value="item.value" :key="index">{{item.text}}
                        </CheckerItem>
                    </Checker>
                </div>
            </div>

            <div class="card-list" ref="cardList" v-for="(item,index) in cardList">
                <div class="c-header">
                    <span>{{item.name}}的选择</span>
                    <h2>最佳旅行卡</h2>
                </div>
                <div class="c-body">
                    <Flexbox align="flex-start">
                        <FlexboxItem :span="4">
                            <div class="left-box">
                                <div class="img-box">
                                    <img :src="img1" alt="">
                                </div>
                                <div class="btn-box">
                                    <x-button class="btn" style="margin: 10px auto; width: 110px;">现在申请</x-button>
                                </div>
                            </div>
                        </FlexboxItem>
                        <FlexboxItem style="padding-left: 10px;">
                            <div class="right-title">美国运通 - BlueBusiness®Plus信用卡</div>
                            <Flexbox class="c-text">
                                <FlexboxItem :span="3">
                                    <div>奖励奖金</div>
                                    <span>N / A</span>
                                </FlexboxItem>
                                <FlexboxItem>
                                    <div>可变APR</div>
                                    <span>15.24% - 21.24%</span>
                                </FlexboxItem>
                                <FlexboxItem :span="2">
                                    <div>年费</div>
                                    <span>0</span>
                                </FlexboxItem>
                            </Flexbox>
                            <router-link to="/">价格和条款</router-link>
                        </FlexboxItem>
                    </Flexbox>
                </div>
                <ul style="display: none" >
                    <li>
                        ● 通过在卡会员资格的前3个月内使用您的美国运通®商务金卡购买联邦快递的合格服务，
                        以声明积分的形式赚取高达500美元的回报。
                    </li>
                    <li>● 限时优惠截止日期为11/06/2019。*</li>
                    <li>● 更多奖励：在您的企业每月花费最多的2个选择类别中获得4X会员奖励积分**</li>
                    <li>● **每个日历年，这两个类别的首次合计购买的首150,000美元适用4倍积分。*</li>
                    <li>● 航空奖励：在您使用Amex Travel预订的全部或部分合格航班上使用积分后，可获得25％的积分，
                        每个日历年最多可获得250,000积分。*
                    </li>
                    <li>● 支付超时选项：灵活的支付选项，帮助管理购买100美元或更多的现金流。*</li>
                    <li>● 费用管理工具：连接到Quickbooks，访问SpendManagerSM，收到年终摘要等。*
                        *条款适用
                    </li>
                </ul>
                <div class="show-btn">
                    <div @click="showMoreMsg($event)" ><span>展示细节</span>
                        <x-icon type="ios-arrow-down" size="10"></x-icon>
                    </div>
                    <div @click="hideMoreMsg($event)" style="display: none"><span>收起细节</span>
                        <x-icon type="ios-arrow-up" size="10"></x-icon>
                    </div>
                </div>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import footerComponent from '../../components/footer/index';
    import headerComponent from '../../components/header/index';
    import {Checker, CheckerItem, Flexbox, FlexboxItem} from 'vux'

    export default {
        name: "credit-card",
        data() {
            return {
                showAll: false,
                selectedMenu: '',
                img1: require('./images/2.jpg'),
                img2: require('./images/1.jpg'),
                submenu: [
                    {
                        text: '低利率',
                        value: 1,
                    },
                    {
                        text: '没有年费',
                        value: 2,
                    },
                    {
                        text: '现金奖励',
                        value: 3,
                    },
                    {
                        text: '积分奖励',
                        value: 4,
                    }
                ],
                cardList: [
                    {name: '1'},
                    {name: '2'},
                    {name: '3'},
                ]
            }
        },
        methods: {
            showAllEvent() {
                this.showAll = !this.showAll;
            },
            handler() {

            },
            showMoreMsg(e) {
                let moreMsg = e.currentTarget.parentElement.previousElementSibling;
                moreMsg.style.display = 'block';
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling.style.display = 'block';
            },
            hideMoreMsg(e) {
                let moreMsg = e.currentTarget.parentElement.previousElementSibling;
                moreMsg.style.display = 'none';
                e.currentTarget.style.display = 'none';
                e.currentTarget.previousElementSibling.style.display = 'block';
            }
        },
        components: {
            'v-header': headerComponent,
            'v-footer': footerComponent,
            Checker,
            CheckerItem,
            Flexbox,
            FlexboxItem
        }
    };
</script>

<style lang="less" scoped>
    @import '~css/beimi.less';

    .credit-card {
        margin-top: 50px;
        background: #f7fafe;

        .banner {
            img {
                width: 100%;
            }
        }

        .credit {
            position: relative;

            /deep/ .vux-tab {
                background: #5369E8;
            }

            .top-tab {
                .vux-x-icon {
                    fill: #fff;
                }
            }

            .show-all {
                position: absolute;
                top: 40px;
                left: 0;
                z-index: 800;
                width: 100%;
                background: #fff;
                box-shadow: 0px 6px 7px 0px rgba(0, 0, 0, 0.2);
                padding: 15px;

                .vux-checker-box {
                    display: flex;
                    justify-content: space-between;

                    & > .v-item {
                        border: 1px #DCDCDC solid;
                        color: #646464;
                        padding: 5px;
                        flex: 0 0 20%;
                        text-align: center;

                    }

                    & > .v-item-selected {
                        border: 1px #5369e8 solid;
                        color: #646464;
                        background: #5369e8;
                        padding: 5px;
                        color: #fff;
                    }
                }
            }

            .card-list {
                margin: 10px 0;
                background: #fff;

                .c-header {
                    border: 1px #dcdcdc solid;
                    background: url("./images/3.png") no-repeat 0 0;
                    background-size: contain;
                    background-color: #fff;
                    height: 24px;
                    line-height: 24px;
                    text-align: center;
                    position: relative;
                    font-size: 12px;

                    span {
                        position: absolute;
                        left: 32px;
                        top: 0px;
                        color: #fff;
                    }

                    h2 {
                        display: inline-block;
                        color: #323232;
                        font-size: 12px;
                    }
                }

                .c-body {
                    padding: 20px 20px 0 20px;

                    a {
                        color: #5369E8;
                        font-size: 9px;
                    }
                }

                .img-box {
                    img {
                        width: 100%
                    }
                }

                .btn-box {
                    text-align: center;
                }

                .right-title {
                    font-size: 13px;
                    color: #323232;
                    margin-bottom: 10px;
                }

                .c-text {
                    font-size: 10px;
                    color: #646464;
                    margin-bottom: 10px;
                }

                ul {
                    padding: 10px 15px;
                    border-top: 1px #dcdcdc solid;

                    li {
                        font-size: 8px;
                        color: #646464
                    }
                }

                .show-btn {
                    border-top: 1px #dcdcdc solid;
                    border-bottom: 1px #dcdcdc solid;
                    text-align: center;

                    div {
                        span {
                            color: #5369E8;
                            display: inline-block;
                            padding: 5px 0;
                        }

                        .vux-x-icon {
                            fill: #5369E8;
                        }
                    }
                }
            }
        }

    }
</style>
