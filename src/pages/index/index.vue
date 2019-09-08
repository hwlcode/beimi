<template>
    <div class="index-wrapper">
        <v-header :showLogin="true"></v-header>
        <div class="top">
            <div class="a">
                <h3>为您的小企业定制完美的贷款</h3>
                <h4>大数据匹配 方案定制 快速获得资金</h4>
                <div>
                    <input type="text" placeholder="￥您需要多少钱？" v-model="needMoney">
                    <router-link :to="{path: '/step'}" class="common-small-bth" @click.native="setNeedMoney">获取方案</router-link>
                </div>
            </div>
        </div>

        <div class="list">
            <dl>
                <dt></dt>
                <dd><h4 class="common-title">简单提交</h4>填写1个简单的申请表<br>没有任何费用或义务，也不会影响您的信用</dd>
                <dt></dt>
                <dd><h4 class="common-title">智能对比</h4>探索75+贷方的小企业贷款选择<br>我们会帮助您选择最好的一个</dd>
                <dt></dt>
                <dd><h4 class="common-title">成功</h4>只需24小时即可获得所需资金<br>这样您就可以重新开展业务。</dd>
            </dl>
            <router-link to="/step" class="common-small-bth">看看你是否符合资格</router-link>
        </div>

        <div class="info">
            <dl>
                <dt>多个贷方 一个应用程序</dt>
                <dd class="mb10">我们简化的申请流程和专有算法<br>将您与全国知名贷方的贷款选项相匹配。</dd>
                <dd>我们帮助像你这样的小企业主获得超过14亿的贷款。<br>这意味着我们必须持续提高自己的贷款匹配能力。</dd>
                <dd><img :src="img1"></dd>
                <dd>
                    <router-link to="/contact-us" class="common-small-bth w200">比较贷方</router-link>
                </dd>
                <dt>获得快速资助</dt>
                <dd class="mb10">时间紧迫？您只需15分钟即可填写我们的在线申请表<br>这比你在当地咖啡馆买拿铁咖啡要快</dd>
                <dd>资金极速到账 - 您可以在批准后24小时内获得现金</dd>
                <dd><img :src="img2"></dd>
                <dd>
                    <router-link to="/step" class="common-small-bth w200">开始吧</router-link>
                </dd>
            </dl>
        </div>
        <get-loan-now></get-loan-now>
        <v-footer></v-footer>

    </div>
</template>

<script>
    import footerComponent from '../../components/footer/index';
    import getLoanNow from '../../components/get-loan-now/get-loan-now';
    import headerComponent from '../../components/header/index';

    export default {
        name: 'indexComponent',
        data() {
            return {
                img1: require('./images/5.png'),
                img2: require('./images/6.png'),
                needMoney: ''
            }
        },
        mounted() {

        },
        methods: {
            setNeedMoney() {
                this.$store.commit('SET_NEED_MONEY', this.needMoney || 0);
            }
        },
        components: {
            'v-header': headerComponent,
            'v-footer': footerComponent,
            'get-loan-now': getLoanNow
        }
    }
</script>

<style lang="less" scoped>
    @import '~css/beimi.less';

    .index-wrapper {
        position: relative;
        margin-top: 50px;
        &.show-menu {
            filter: blur(2px);
        }

        .top {
            background: url(images/bg.png) repeat-x 0 0;
            height: 200px;

            & > .a {
                height: 161px;
                padding: 15px;
                // padding-top: 12px;
                background: url(images/1.png) no-repeat right 12px;
                background-size: 133px 161px;
                position: relative;

                h3 {
                    font-size: 23px;
                    font-weight: 400;
                    color: #000;
                    width: 200px;
                    line-height: 30px;
                }

                h4 {
                    font-size: 12px;
                    color: rgba(95, 99, 125, 1);
                    padding-top: 15px;
                }

                & > div {
                    padding-top: 25px;

                    input {
                        width: 130px;
                        height: 27px;
                        background: rgba(255, 255, 255, 0.2);
                        border: 1px solid rgba(160, 160, 160, 1);
                        border-radius: 13px;
                        line-height: 27px;
                        padding: 0 10px;
                        font-size: 13px;
                    }
                }
            }
        }

        .list {
            background: rgba(247, 250, 254, 1);
            text-align: center;
            padding: 25px 0;

            dl {
                dt {
                    height: 59px;
                    padding: 7px;
                    background-size: 45px 45px;
                    background-repeat: no-repeat;
                    background-position: center center;

                    &:nth-of-type(1) {
                        background-image: url(images/2.png);
                    }

                    &:nth-of-type(2) {
                        background-image: url(images/3.png);
                    }

                    &:nth-of-type(3) {
                        background-image: url(images/4.png);
                    }
                }

                dd {
                    h4 {
                        padding: 10px 0;
                    }

                    font-size: 12px;
                    color: rgba(95, 99, 125, 1);
                    line-height: 18px;
                }
            }

            & > a {
                margin-top: 30px;
            }
        }

        .info {
            padding: 35px;
            padding-top: 0;
            text-align: center;

            dt {
                font-size: 20px;
                font-weight: 400;
                color: rgba(0, 0, 0, 1);
                padding: 30px 20px;
            }

            dd {
                font-size: 13px;
                font-weight: 400;
                color: rgba(95, 99, 125, 1);
                line-height: 20px;

                img {
                    width: 100%;
                    padding: 30px 0;
                }

                .w200 {
                    width: 200px;
                }

                &.mb10 {
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>
