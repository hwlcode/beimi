<template>
    <div class="demand-wrapper">
        <!-- demand{{new Date().getTime()}} -->
        <h3>您需要多少钱？</h3>
        <checker class="select-list" v-model="moneyValue" default-item-class="select-item"
                 selected-item-class="select-item-selected">
            <checker-item :disabled="disabled" v-for="(item, index) in moneyList" :value="item.value" :key="index">
                {{item.text}}
            </checker-item>
        </checker>
        <h3>需要筹集资金的目的是什么？</h3>
        <checker class="select-list" v-model="aimValue" default-item-class="select-item"
                 selected-item-class="select-item-selected">
            <checker-item :disabled="disabled" v-for="(item, index) in aimList" :value="item.value" :key="index">
                {{item.text}}
            </checker-item>
        </checker>
        <div style="padding: 0 20px 20px 20px;">
            <x-button :gradients="['#546BE0', '#546BE0']" @click.native="handleNextStep"
                      style="border-radius:99px; margin-top: 80px;">
                下一步
            </x-button>

            <!--            <x-button :gradients="['#546BE0', '#546BE0']" @click.native="testPay"-->
            <!--                      style="border-radius:99px; margin-top: 80px;">-->
            <!--                测试支付-->
            <!--            </x-button>-->
        </div>
    </div>
</template>

<script>
    import {public_methods, toast} from '../../../assets/js/public_method';

    export default {
        name: 'demand',
        data() {
            return {
                moneyValue: '',
                moneyList: [
                    {
                        text: '0-1000元',
                        value: 1,
                    },
                    {
                        text: '1000-5000元',
                        value: 2,
                    },
                    {
                        text: '5000-10000元',
                        value: 3,
                    },
                    {
                        text: '10000-20000元',
                        value: 4,
                    },
                    {
                        text: '20000-50000元',
                        value: 5,
                    },
                    {
                        text: '50000元以上',
                        value: 6,
                    }
                ],
                aimValue: '',
                aimList: [
                    {
                        text: '开始一项新业务',
                        value: 1,
                    },
                    {
                        text: '营运资金',
                        value: 2,
                    },
                    {
                        text: '购销',
                        value: 3,
                    },
                    {
                        text: '设备租赁',
                        value: 4,
                    },
                    {
                        text: '装修',
                        value: 5,
                    },
                    {
                        text: '其他',
                        value: 6,
                    }
                ],
                disabled: false,
                identifyCode: '',
                channel: '',
                isFree: false
            }
        },
        created() {
            this.identifyCode = this.$route.query.identifyCode;
            this.channel = this.$route.query.channel;
            this.isFree = this.$route.query.type == 'invite';

            if (this.isFree) {
                if (window.localStorage.getItem('isFree')) {
                    window.localStorage.removeItem('isFree');
                    window.localStorage.setItem('isFree', this.isFree);
                } else {
                    window.localStorage.setItem('isFree', this.isFree);
                }
            } else {
                window.localStorage.removeItem('isFree');
            }
            // console.log(this.identifyCode, this.channel);
            if (!window.localStorage.getItem('user')) {
                let money = parseInt(this.$store.state.needMoney, 10);
                if (money > 0 && money <= 1000) {
                    this.moneyValue = 1;
                } else if (money > 1000 && money <= 5000) {
                    this.moneyValue = 2;
                } else if (money > 5000 && money <= 10000) {
                    this.moneyValue = 3;
                } else if (money > 10000 && money <= 20000) {
                    this.moneyValue = 4;
                } else if (money > 20000 && money <= 50000) {
                    this.moneyValue = 5;
                } else if (money > 50000) {
                    this.moneyValue = 6;
                }
            }
            this.getLoan();
        },
        mounted() {

        },
        methods: {
            handleNextStep() {
                if (this.moneyValue == '' || this.aimValue == '') {
                    this.$vux.toast.show({
                        type: 'text',
                        text: '请选择筹集资金以及目的',
                        width: '80%',
                        position: 'top'
                    });
                } else {
                    this.$router.push({
                        name: 'information',
                        params: {
                            moneyValue: this.moneyValue,
                            aimValue: this.aimValue,
                            identifyCode: this.identifyCode,
                            channel: this.channel
                        }
                    });
                }
            },
            testPay() {
                this.$router.push({
                    name: 'pay'
                });
            },
            getLoan() {
                if (window.localStorage.getItem('user')) {
                    this.axios.get(public_methods.api.loan)
                        .then(res => {
                            let data = res.data;
                            if (data.errorCode == 0) {
                                this.moneyValue = parseInt(data.data.loanMoney, 10);
                                this.aimValue = parseInt(data.data.loanAim, 10);
                                // console.log(this.moneyValue, this.aimValue);
                                // this.disabled = true;
                            } else {
                                toast(data.message);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .demand-wrapper {
        padding: 20px;

        .select-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        .select-item {
            padding: 5px 5px;
            width: 32%;
            font-size: 12px;
            margin: 0 0 10px 0;
            text-align: center;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(220, 220, 220, 1);
            border-radius: 5px;
        }

        .select-item-selected {
            background: rgba(83, 105, 232, 1);
            color: #fff;
        }

        & > h3 {
            font-size: 18px;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
            padding: 20px 0;

            &:nth-of-type(1) {
                padding-top: 0;
            }
        }
    }
</style>
