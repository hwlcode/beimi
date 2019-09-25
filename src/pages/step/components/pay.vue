<template>
    <div class="pay">
        <div style="padding: 0 10px 20px 10px; margin-top: 30px;">
            <h2>选择充值金额</h2>
            <div class="tab">
                <div class="tab-bar" @click.stop="selectTab(0)" :class="{active:current==0}">399元</div>
                <div class="tab-bar" @click.stop="selectTab(1)" :class="{active:current==1}">599元</div>
                <div class="tab-bar" @click.stop="selectTab(2)" :class="{active:current==2}">999元</div>
            </div>
            <div class="tab-list">
                <div class="tab-item" v-show="current == 0">
                    <x-table full-bordered class="table">
                        <thead>
                        <tr>
                            <td colspan="2" style="background: #DFE4FF; font-size: 14px; font-weight: 700; ">充值获得五大权益
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="t-header odd">
                            <td width="50%">类目</td>
                            <td>权益</td>
                        </tr>
                        <tr>
                            <td>贷款顾问费佣金或大数据查询次数</td>
                            <td>8次</td>
                        </tr>
                        <tr class="odd">
                            <td>下款佣金</td>
                            <td>1%-6%</td>
                        </tr>
                        <tr>
                            <td>产品后台</td>
                            <td>可开通</td>
                        </tr>
                        <tr class="odd">
                            <td>转化后台</td>
                            <td>可开通</td>
                        </tr>
                        <tr>
                            <td>推广获客</td>
                            <td>可开通</td>
                        </tr>
                        </tbody>
                    </x-table>
                </div>
                <div class="tab-item" v-show="current == 1">
                    <x-table full-bordered class="table">
                        <thead>
                        <tr>
                            <td colspan="2" style="background: #DFE4FF; font-size: 14px; font-weight: 700; ">充值获得五大权益
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="t-header odd">
                            <td width="50%">类目</td>
                            <td>权益</td>
                        </tr>
                        <tr>
                            <td>贷款顾问费佣金或大数据查询次数</td>
                            <td>8次</td>
                        </tr>
                        <tr class="odd">
                            <td>下款佣金</td>
                            <td>1%-6%</td>
                        </tr>
                        <tr>
                            <td>产品后台</td>
                            <td>可开通</td>
                        </tr>
                        <tr class="odd">
                            <td>转化后台</td>
                            <td>可开通</td>
                        </tr>
                        <tr>
                            <td>推广获客</td>
                            <td>可开通</td>
                        </tr>
                        </tbody>
                    </x-table>
                </div>
                <div class="tab-item" v-show="current == 2">
                    <x-table full-bordered class="table">
                        <thead>
                        <tr>
                            <td colspan="2" style="background: #DFE4FF; font-size: 14px; font-weight: 700; ">充值获得五大权益
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="t-header odd">
                            <td width="50%">类目</td>
                            <td>权益</td>
                        </tr>
                        <tr>
                            <td>贷款顾问费佣金或大数据查询次数</td>
                            <td>8次</td>
                        </tr>
                        <tr class="odd">
                            <td>下款佣金</td>
                            <td>1%-6%</td>
                        </tr>
                        <tr>
                            <td>产品后台</td>
                            <td>可开通</td>
                        </tr>
                        <tr class="odd">
                            <td>转化后台</td>
                            <td>可开通</td>
                        </tr>
                        <tr>
                            <td>推广获客</td>
                            <td>可开通</td>
                        </tr>
                        </tbody>
                    </x-table>
                </div>
            </div>
            <div class="pay-way">
                <div class="title">选择支付方式：</div>
                <div class="pay-item"><input type="radio" name="pay-way" v-model="payway" value="1"> 微信支付</div>
                <div class="pay-item"><input type="radio" name="pay-way" v-model="payway" value="2"> 银行卡支付</div>
            </div>
            <x-button :gradients="['#546BE0', '#546BE0']" @click.native="payOurMoney"
                      style="border-radius:99px; margin-top: 20px;">下一步
            </x-button>
<!--            <x-button :gradients="['#546BE0', '#546BE0']" @click.native="scanQRCode"-->
<!--                      style="border-radius:99px; margin-top: 20px;" id="scanQRCode">扫码支付-->
<!--            </x-button>-->
            <p class="agreement">
                充值即同意
                <router-link to="/">《合作协议》</router-link>
                <router-link to="/">《贷款顾问合作行为规定》</router-link>
                <router-link to="/">《贷款顾问公约》</router-link>
            </p>
        </div>
        <!--        <v-service></v-service>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import service from '../../../components/service/service';
    import {XTable} from 'vux';
    import {wexinPay} from '../../../wechat/wechaty.js';
    // import {scanQRCode} from '../../../wechat/scanQRCode.js';

    export default {
        name: "pay",
        data() {
            return {
                current: 0,
                payway: 1,
                openId: '',
                code: '',
            }
        },
        created() {

        },
        mounted() {
            let reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)");
            let url = window.location.href.split('#')[0];
            let search = url.split('?')[1];
            if (search) {
                let r = search.match(reg);
                if (r != null) {
                    this.code = decodeURI(r[2]);
                    this.getOpenId(this.code);
                }
            }
        },
        watch: {},
        computed: {
            payMoney() {
                let money = 0;
                if (this.current == 0) {
                    money = 399;
                } else if (this.current == 1) {
                    money = 599;
                } else if (this.current == 2) {
                    money = 999;
                }
                return money;
            }
        },
        methods: {
            selectTab(cur) {
                this.current = cur;
            },
            getOpenId(code) {
                this.axios.get('/api/pay/wx_pay/getOpenId?code=' + code).then(
                    res => {
                        this.openId = res.data.openid;
                    }
                )
            },
            payOurMoney() {
                let openid = this.openId;
                let attach = '充值'; // 标题
                let body = '充值-' + this.payMoney; // 描述
                let total_fee = this.payMoney;
                this.axios.get('/api/pay/wx_pay/order?openid=' + openid + '&attach=' + attach + '&body=' + body + '&total_fee=' + total_fee).then(
                    res => {
                        let data = res.data;
                        new wexinPay(data);
                        console.log(data);
                    }
                )
            },
            // scanQRCode() {
            //     let openid = this.openId;
            //     let attach = '充值'; // 标题
            //     let body = '充值-' + this.payMoney; // 描述
            //     let total_fee = this.payMoney;
            //     this.axios.get('/api/pay/wx_pay/order?openid=' + openid + '&attach=' + attach + '&body=' + body + '&total_fee=' + total_fee).then(
            //         res => {
            //             let data = res.data;
            //             new scanQRCode(data);
            //             console.log(data);
            //         }
            //     )
            // }
        },
        components: {
            XTable,
            'v-service': service
        }
    };
</script>

<style lang="less" scoped>
    .pay {
        h2 {
            font-size: 16px;
            text-align: left;
            color: #000;
            font-weight: 700;
            margin: 20px 0;
        }

        .tab {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;

            .tab-bar {
                display: block;
                flex: 0 0 30%;
                border: 1px #DCDCDC solid;
                text-align: center;
                line-height: 40px;
                font-size: 13px;

                &.active {
                    background: #5369E8;
                    border: 1px #5369E8 solid;
                    color: #fff;
                    position: relative;
                }

                &.active:after {
                    content: "";
                    display: block;
                    width: 0;
                    height: 0;
                    border: 8px solid transparent;
                    border-top-color: #5369E8;
                    border-bottom: 0;
                    position: absolute;
                    left: 50%;
                    top: 41px;
                }
            }
        }

        .table {
            .t-header td {
                font-size: 10px;
            }

            .odd td {
                background: #eee;
            }

            font-size: 9px;
            color: #323232;
        }

        .pay-way {
            color: #323232;
            margin: 0 10px;

            .title {
                font-size: 16px;
                border-bottom: 1px #E5E5E5 solid;
                padding: 10px 0;
            }

            .pay-item {
                border-bottom: 1px #E5E5E5 solid;
                font-size: 13px;
                padding: 10px 0;
            }
        }

        .agreement {
            color: #969696;
            font-size: 9px;
            margin-top: 10px;

            & > a {
                color: #5369E8;
            }
        }
    }
</style>
