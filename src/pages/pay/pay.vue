<template>
    <div class="pay">
        <div class="a-header">充值</div>
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
                <div class="pay-item">
                    <check-icon :value.sync="payWay">微信支付</check-icon>
                </div>
                <!--                <div class="pay-item"><input type="radio" name="pay-way" v-model="payway" value="2"> 银行卡支付</div>-->
            </div>
            <x-button :gradients="['#546BE0', '#546BE0']"
                      style="border-radius:99px; margin-top: 20px;" @click.native="pay">充值
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
    import service from '../../components/service/service';
    import {XTable, CheckIcon} from 'vux';
    import {wexinPay} from '../../wechat/wechaty.js';
    import {public_methods, toast} from '../../assets/js/public_method';

    export default {
        name: "pay",
        data() {
            return {
                current: 0,

                payWay: true,
                code: null,
                openId: null,
                out_trade_no: `BM${new Date().getTime()}` // 正式的时候需要修改
            }
        },
        created() {

        },
        mounted() {
            // 获取code方法只有在mounted里面可以获取
            if (window.location.href.indexOf('code') != -1) {
                this.getOrderNo(false);
                this.code = this.getQueryString('code');
                this.getOpenId(this.code);
            }
            // h5支付成功，查询订单
            if (window.location.href.indexOf('wxback') != -1) {
                let self = this;
                this.$vux.confirm.show({
                    title: '确认支付结果',
                    'confirm-text': '己完成支付',
                    'cancel-text': '支付遇到问题',
                    onCancel: () => {
                        self.axios.get('/api/pay/wx_pay/orderQuery?out_trade_no=' + this.out_trade_no)
                            .then(data => {
                                console.log(data.data.return_code[0]);
                                if (data.data.return_code[0] == 'SUCCESS') {
                                    this.backOrder({
                                        orderNo: data.data.out_trade_no[0],
                                        payNo: data.data.transaction_id[0] || '',
                                        status: data.data.trade_state[0],
                                        succTime: data.data.time_end[0] || ''
                                    });
                                    console.log({
                                        orderNo: data.data.out_trade_no[0],
                                        payNo: data.data.transaction_id[0] || '',
                                        status: data.data.trade_state[0],
                                        succTime: data.data.time_end[0] || ''
                                    });
                                    // self.$router.push({
                                    //     name: 'loan'
                                    // });
                                } else {
                                    self.toast(data.data.msg);
                                }
                                self.$vux.confirm.hide();
                            })
                    },
                    onConfirm: () => {
                        self.axios.get('/api/pay/wx_pay/orderQuery?out_trade_no=' + this.out_trade_no)
                            .then(data => {
                                console.log(data.data.return_code[0]);
                                if (data.data.return_code[0] == 'SUCCESS') {
                                    this.backOrder({
                                        orderNo: data.data.out_trade_no[0],
                                        payNo: data.data.transaction_id[0] || '',
                                        status: data.data.trade_state[0],
                                        succTime: data.data.time_end[0] || ''
                                    });
                                    console.log({
                                        orderNo: data.data.out_trade_no[0],
                                        payNo: data.data.transaction_id[0] || '',
                                        status: data.data.trade_state[0],
                                        succTime: data.data.time_end[0] || ''
                                    });
                                    // self.$router.push({
                                    //     name: 'loan'
                                    // });
                                    self.toast('充值成功');
                                } else {
                                    self.toast(data.data.msg);
                                }
                                self.$vux.confirm.hide();
                            })
                    }
                });
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
            pay() {
                if (!this.payWay) {
                    this.toast('请择支付方式');
                    return;
                }
                let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    // 获取wx code： 公众号支付必须
                    let wxappid = 'wxe9cec454609e9fb9';
                    let return_uri = encodeURIComponent(public_methods.url.domain + '/#/step/pay');
                    let scope = 'snsapi_userinfo';
                    let oauthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize';
                    let url = `${oauthUrl}?appid=${wxappid}&redirect_uri=${return_uri}&response_type=code&scope=${scope}&state=123#wechat_redirect`;

                    window.location.href = url;
                } else {
                    this.h5pay();
                }
            },
            h5pay() {
                let attach = '充值'; // 标题
                let body = '充值-' + this.payMoney; // 描述
                let total_fee = 0.01;
                let out_trade_no = this.out_trade_no;
                let redirect_url = encodeURIComponent(public_methods.url.domain + '/#/agent/user/pay?wxback=true');
                this.axios.get(`/api/pay/wx_pay/create_h5_pay?attach=${attach}&body=${body}&total_fee=${total_fee}&out_trade_no=${out_trade_no}`).then(
                    res => {
                        let data = res.data;
                        window.location.href = data['mweb_url'][0] + `&redirect_url=${redirect_url}`;
                    }
                )
            },
            getOpenId(code) {
                this.axios.get('/api/pay/wx_pay/getOpenId?code=' + code).then(
                    res => {
                        this.openId = res.data.openid;
                        this.payOurMoney();
                    }
                )
            },
            getOrderNo(status) {
                this.axios.post(public_methods.api.wechatAddOrder, {
                    amount: this.payMoney,
                    source: 4
                }).then(res => {
                    let data = res.data;
                    console.log(data.data);
                    if (data.errorCode == 0) {
                        if (status) {
                            this.out_trade_no = data.data;
                            this.h5pay()
                        } else {
                            this.out_trade_no = data.data;
                        }
                    } else {
                        this.toast(data.message);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            payOurMoney() {
                let self = this;
                let openid = this.openId;
                let attach = '充值'; // 标题
                let body = '充值-' + this.payMoney; // 描述
                let total_fee = 0.01;
                let out_trade_no = this.out_trade_no;

                this.axios.get('/api/pay/wx_pay/order?openid=' + openid + '&attach=' + attach + '&body=' + body + '&total_fee=' + total_fee + '&out_trade_no=' + out_trade_no).then(
                    res => {
                        let data = res.data;
                        new wexinPay(data).then((data) => {
                            this.$vux.confirm.show({
                                title: '确认支付结果',
                                'confirm-text': '己完成支付',
                                'cancel-text': '支付遇到问题',
                                onCancel: () => {
                                    self.axios.get('/api/pay/wx_pay/public/orderQuery?out_trade_no=' + this.out_trade_no)
                                        .then(data => {
                                            console.log(data.data.return_code[0]);
                                            if (data.data.return_code[0] == 'SUCCESS') {
                                                this.backOrder({
                                                    orderNo: data.data.out_trade_no[0],
                                                    payNo: data.data.transaction_id[0] || '',
                                                    status: data.data.trade_state[0],
                                                    succTime: data.data.time_end[0] || ''
                                                });
                                                console.log({
                                                    orderNo: data.data.out_trade_no[0],
                                                    payNo: data.data.transaction_id[0] || '',
                                                    status: data.data.trade_state[0],
                                                    succTime: data.data.time_end[0] || ''
                                                });
                                                // self.$router.push({
                                                //     name: 'loan'
                                                // });
                                                // self.toast('充值成功');
                                            } else {
                                                self.toast(data.data.msg);
                                            }
                                            self.$vux.confirm.hide();
                                        })
                                },
                                onConfirm: () => {
                                    self.axios.get('/api/pay/wx_pay/public/orderQuery?out_trade_no=' + this.out_trade_no)
                                        .then(data => {
                                            console.log(data.data.return_code[0]);
                                            if (data.data.return_code[0] == 'SUCCESS') {
                                                this.backOrder({
                                                    orderNo: data.data.out_trade_no[0],
                                                    payNo: data.data.transaction_id[0] || '',
                                                    status: data.data.trade_state[0],
                                                    succTime: data.data.time_end[0] || ''
                                                });
                                                console.log({
                                                    orderNo: data.data.out_trade_no[0],
                                                    payNo: data.data.transaction_id[0] || '',
                                                    status: data.data.trade_state[0],
                                                    succTime: data.data.time_end[0] || ''
                                                });
                                                // self.$router.push({
                                                //     name: 'loan'
                                                // });
                                                self.toast('充值成功');
                                            } else {
                                                self.toast(data.data.msg);
                                            }
                                            self.$vux.confirm.hide();
                                        })
                                }
                            });
                        });
                    },
                    err => {
                        this.toast(err);
                    }
                )
            },
            toast(text) {
                this.$vux.toast.show({
                    type: 'text',
                    text: text,
                    width: '80%',
                    position: 'top'
                });
            },
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                let q = window.location.pathname.substr(1).match(reg_rewrite);
                if (r != null) {
                    return unescape(r[2]);
                } else if (q != null) {
                    return unescape(q[2]);
                } else {
                    return null;
                }
            }
        },
        components: {
            XTable, CheckIcon,
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

        .a-header {
            background: rgb(84, 107, 224);
            color: #fff;
            font-size: 18px;
            text-align: center;
            line-height: 45px;
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
