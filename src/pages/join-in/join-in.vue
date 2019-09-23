<template>
    <div class="join-in">
        <v-header :show-login="false"></v-header>
        <div class="join-in-form">
            <h1>申请成为beimi城市合伙人<br/>一起改变小企业贷款</h1>
            <div class="join-form">
                <p class="title">告诉我有关特许经营机会的更多信息</p>
                <group title="* 名字" label-width="0" label-align="right" class="form-item">
                    <x-input title="" placeholder="" v-model="lastName"></x-input>
                </group>
                <group title="* 姓氏" label-width="0" label-align="right" class="form-item">
                    <x-input title="" v-model="firstName"></x-input>
                </group>
                <group title="* 邮箱" label-width="0" label-align="right" class="form-item">
                    <x-input title="" v-model="email"></x-input>
                </group>
                <group title="* 电话号码" label-width="0" label-align="right" class="form-item">
                    <x-input title="" v-model="phone"></x-input>
                </group>
                <!--                <group title="* 邮政编码" label-width="0" label-align="right" class="form-item">-->
                <!--                    <x-input title="" v-model="zipCode"></x-input>-->
                <!--                </group>-->
                <group title="* 可用资金投资" label-width="0" label-align="right" class="form-item">
                    <x-input title="" v-model="investMoney"></x-input>
                </group>
                <p class="f-tips">或致电：<span class="blue-color">0755- 2301 1054</span> *必填字段</p>
                <div class="btn-box">
                    <x-button class="form-btn" type="default" @click.native="submit">提交我的请求</x-button>
                </div>
            </div>
        </div>
        <div class="caption">
            <h3>Beimi：简化小企业贷款流程</h3>
            <p>Beibi通过帮助小企业主跳过寻找小企业贷款的腿部工作来简化商业贷款。一个应用程序是他们所需要的，而不是填写数十个应用程序。<br/>
                作为Beibi，您将能够通过利用Beibi的商业贷款市场帮助小企业主找到他们发展业务所需的贷款。通过帮助您的客户完成一个单一的申请，他们将由超过75个贷方审查，使贷款申请的头痛出局</p>
            <img :src="img1" alt="">
        </div>
        <div class="our-task">
            <h3>我们的任务</h3>
            <p>通过简单的小企业贷款 推动中国梦</p>
            <div class="flex-box clearfix">
                <div class="flex-item"><i class="icon icon1"></i><span>选择</span></div>
                <div class="flex-item"><i class="icon icon2"></i><span>速度</span></div>
                <div class="flex-item"><i class="icon icon3"></i><span>信任</span></div>
            </div>
        </div>
        <div class="our-diff">
            <h3>是什么让Beimi城市合伙人与众不同</h3>
            <div class="flex-box clearfix">
                <div class="flex-item"><i class="icon icon1"></i><span>蓝海市场</span></div>
                <div class="flex-item"><i class="icon icon2"></i><span>专有技术</span></div>
                <div class="flex-item"><i class="icon icon3"></i><span>战略伙伴关系</span></div>
                <div class="flex-item"><i class="icon icon4"></i><span>低投资</span></div>
                <div class="flex-item"><i class="icon icon5"></i><span>完美定位</span></div>
                <div class="flex-item"><i class="icon icon6"></i><span>巨大的需求</span></div>
            </div>
        </div>
        <div class="join-us">
            <h3>加入Beimi家庭</h3>
            <div class="flex clearfix">
                <div class="flex-i left">
                    <p class="title" style="margin-top: 0;">你需要什么</p>
                    <p>★ 渴望建立一个企业</p>
                    <p>★ 对Beibi使命的承诺</p>
                    <p>★ 与您当地社区的紧密联系</p>
                    <p>★ 您当地的小型企业社区的卓越网络技</p>
                    <p>★ 流动资本55-65,000人民币</p>
                    <p class="title">你得到什么</p>
                    <p>★ 技术 - Beibi和专有CRM工具</p>
                    <p>★ 全国广告 - 电视，广播等</p>
                    <p>★ 合作伙伴关系 - UPS，Staples，GoDaddy等</p>
                    <p>★ 城市合伙人持团队 - 培训，营销支持等等！</p>
                </div>
                <div class="flex-i">
                    <img :src="img2" alt="">
                </div>
            </div>
        </div>
        <div class="partner clearfix">
            <div class="partner-item"><i class="icon icon1"></i><span>“过去需要几个月 才能在几周内完成。”</span></div>
            <div class="partner-item"><i class="icon icon2"></i><span>“Beibi对企业主来说 是一个简单的过程。”</span></div>
            <div class="partner-item"><i class="icon icon3"></i><span>“帮助企业主办理 申请贷款的过程。”</span></div>
            <div class="partner-item"><i class="icon icon4"></i><span>“帮助小企业在几分钟内 找到合适的贷款。”</span></div>
            <div class="partner-item"><i class="icon icon5"></i><span>“Beimi将企业主 介绍给活跃的贷方。”</span></div>
            <div class="partner-item"><i class="icon icon6"></i><span>“贷款审批率为70％”</span></div>
        </div>
        <get-loan-now></get-loan-now>
        <v-footer></v-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import header from '../../components/header';
    import getLoanNow from '../../components/get-loan-now/get-loan-now';
    import footerComponent from '../../components/footer/index';
    import {public_methods} from '../../assets/js/public_method';

    export default {
        name: "join-in",
        data() {
            return {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                // zipCode: '',
                investMoney: '',
                img1: require('./images/2.png'),
                img2: require('./images/12.jpg')
            }
        },
        methods: {
            submit() {
                if (this.lastName == '') {
                    this.toast('请输入您的名字');
                    return
                }
                if (this.firstName == '') {
                    this.toast('请输入您的姓氏');
                    return
                }
                if (this.email == '') {
                    this.toast('请输入您的电子邮箱');
                    return
                }
                if (this.phone == '') {
                    this.toast('请输入您的电话号码');
                    return
                }
                if (this.investMoney == '') {
                    this.toast('请输入您的可用投资资金');
                    return
                }
                let url = public_methods.api.joinApplication;
                this.axios.post(url, {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    phone: this.phone,
                    investMoney: this.investMoney
                }).then(response => {
                    let data = response.data;

                    if (data.errorCode === 0) {
                        this.toast('您的信息己提交，我们会尽快处理。')
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
            'v-header': header,
            'v-footer': footerComponent,
            'get-loan-now': getLoanNow
        }
    };
</script>

<style lang="less" scoped>
    .join-in {
        margin-top: 50px;

        .join-in-form {
            background-image: url("images/1.jpg");
            background-position: top center;
            background-size: cover;
            background-repeat: no-repeat;

            h1 {
                font-size: 22px;
                line-height: 27px;
                color: #fff;
                text-align: center;
                padding: 32px 0;
            }

            .join-form {
                padding: 0 15px;

                .title {
                    font-size: 14px;
                    color: #fff;
                    padding: 48px 0 20px 0;
                }

                .form-item {
                    margin-bottom: 15px;
                }

                /deep/ .weui-cells__title {
                    font-size: 16px;
                    color: #fff;
                    padding: 0;
                }

                .f-tips {
                    color: #fff;
                }

                .blue-color {
                    color: #05C2F0;
                }

                .btn-box {
                    padding-bottom: 10px;
                }

                .form-btn {
                    background: #5369E8;
                    width: 170px;
                    margin: 30px 0;
                    color: #fff;
                    border-radius: 30px;
                }
            }
        }

        .caption {
            padding: 50px 15px;
            color: #646464;

            h3 {
                font-size: 20px;
                margin-bottom: 20px;
            }

            p {
                margin-bottom: 20px;
            }

            img {
                width: 100%;
            }
        }

        .our-task {
            background: #5369E8;
            color: #fff;

            h3 {
                color: #fff;
                text-align: center;
                padding-top: 30px;
                font-size: 20px;
            }

            p {
                font-size: 15px;
                text-align: center;
            }

            .flex-box {
                display: flex;
                padding: 40px 0;
            }

            .flex-item {
                flex: 1;
                text-align: center;

                & > span {
                    display: inline-block;
                    padding: 10px 0;
                    width: 100%;
                }

                .icon {
                    background-position: top center;
                    background-size: cover;
                    background-repeat: no-repeat;
                    display: inline-block;

                    &.icon1 {
                        background-image: url("images/3.png");
                        width: 32px;
                        height: 34px;
                    }

                    &.icon2 {
                        background-image: url("images/4.png");
                        width: 36px;
                        height: 34px;
                    }

                    &.icon3 {
                        background-image: url("images/5.png");
                        width: 40px;
                        height: 34px;
                    }
                }

            }
        }

        .our-diff {
            background: #f7fafe;
            padding: 30px 0;

            h3 {
                color: #323232;
                font-size: 20px;
                text-align: center;
            }

            .flex-box {
                display: flex;
                padding: 40px 0 20px 0;
                flex-wrap: wrap;
            }

            .flex-item {
                flex: 0 0 33.333333%;;
                text-align: center;
                margin-bottom: 20px;

                & > span {
                    display: inline-block;
                    padding: 10px 0;
                    width: 100%;
                }

                .icon {
                    background-position: top center;
                    background-size: cover;
                    background-repeat: no-repeat;
                    display: inline-block;
                    width: 43px;
                    height: 43px;

                    &.icon1 {
                        background-image: url("images/6.png");
                    }

                    &.icon2 {
                        background-image: url("images/7.png");
                    }

                    &.icon3 {
                        background-image: url("images/8.png");
                    }

                    &.icon4 {
                        background-image: url("images/11.png");
                    }

                    &.icon5 {
                        background-image: url("images/10.png");
                    }

                    &.icon6 {
                        background-image: url("images/9.png");
                    }
                }

            }
        }

        .join-us {
            padding: 25px 0px 25px 10px;

            h3 {
                color: #323232;
                font-size: 20px;
                margin-bottom: 15px;
            }

            p {
                font-size: 12px;
                color: #646464;

                &.title {
                    margin-top: 20px;
                    font-weight: 700;
                }
            }

            .flex {
                display: flex;

                .flex-i {
                    flex: 0 0 141px;

                    &.left {
                        flex: 1;
                    }

                    img {
                        width: 100%;
                    }
                }
            }

        }

        .partner {
            display: flex;
            background: #f7fafe;
            flex-wrap: wrap;

            .partner-item {
                flex: 0 0 50%;
                box-sizing: border-box;
                height: 150px;
                position: relative;
                text-align: center;

                span {
                    display: block;
                    width: 140px;
                    margin: 10px auto;
                }

                &:after {
                    position: absolute;
                    left: 0;
                    top: 0;
                    content: ".";
                    height: 100%;
                    width: 100%;
                    display: inline-block;
                    border-right: 1px #BFBFBF solid;
                    border-bottom: 1px #BFBFBF solid;
                    margin-right: -1px;
                    margin-bottom: -1px;
                }

                .icon {
                    background-position: top center;
                    background-size: cover;
                    background-repeat: no-repeat;
                    display: inline-block;

                    &.icon1 {
                        background-image: url("images/13.png");
                        width: 69px;
                        height: 19px;
                        margin-top: 35px;
                    }

                    &.icon2 {
                        background-image: url("images/14.png");
                        width: 81px;
                        height: 15px;
                        margin-top: 35px;
                    }

                    &.icon3 {
                        background-image: url("images/15.png");
                        width: 49px;
                        height: 49px;
                        margin-top: 20px;
                    }

                    &.icon4 {
                        background-image: url("images/16.png");
                        width: 90px;
                        height: 18px;
                        margin-top: 53px;
                    }

                    &.icon5 {
                        background-image: url("images/17.png");
                        width: 80px;
                        height: 15px;
                        margin-top: 35px;
                    }

                    &.icon6 {
                        background-image: url("images/18.png");
                        width: 81px;
                        height: 17px;
                        margin-top: 35px;
                    }
                }
            }
        }
    }
</style>
