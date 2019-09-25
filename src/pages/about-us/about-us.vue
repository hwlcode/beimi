<template>
    <div class="about-us">
        <v-header :showLogin="false"></v-header>
        <div class="banner">
            <img :src="banner" alt="">
        </div>
        <div class="partner">
            <div class="item"><span class="bold">4亿人民币</span><span>通过我们资助</span></div>
            <div class="item"><span class="bold">75+</span><span>我们的合作放款方</span></div>
            <div class="item"><span class="bold">73,000+</span><span>我们帮助过的企业</span></div>
        </div>
        <div class="caption border-1px">
            <div class="item" style="flex: 0 0 180px;">
                <img :src="img1" alt="">
            </div>
            <div class="item">
                <h2 style="margin-bottom: 20px;">改变世界<br/>需要一点现金流</h2>
                <p>但银行拒绝了80％的小企业贷款申请人，他们最终将普通企业的重要想法交易，因为他们无法获得所需资金。我们正在为小企业主创造新的现实。我们正在帮助他们获得贷款以支持他们的雄心壮志，这样他们就不仅仅是企业家 - 他们可以成为有远见的人和工匠，战士和创新人士。他们可以成为中国梦的建设者。强大而成功的中国并非始于政府或大公司。它始于小型企业。它从这里开始。这就是为什么我们每天都在做他们做的事情。</p>
            </div>
        </div>
        <div class="caption">
            <div class="item">
                <h2>我们提供了更多便利</h2>
                <h3>73000笔</h3>
                <h4>小企业贷款</h4>
                <p>这是73,000笔贷款，帮助小企业主雇用员工，购买设备或增加第二个位置。或者也许只是在经济衰退期间保持开门。这73,000笔贷款帮助小企业主向中国梦想迈出了一步。<br/>
                    而我们只是增加了我们的势头......</p>
            </div>
            <div class="item" style="flex: 0 0 180px;">
                <img :src="img2" alt="">
            </div>
        </div>
        <div class="next-step">
            <h2>我们的下一个里程碑，至少</h2>
            <p class="bold">十亿元</p>
            <h2 style="margin-bottom: 30px;">在小企业贷款，每一个，单，年</h2>
            <p>为什么十亿？当然，这是一个很好的，圆满的数字 - 但它也足以给中国经济带来巨大的推动力。 相信我们，我们已经完成了数学计算。</p>
            <div>1,000,000,000人民币不仅仅是小企业融资。这足以创造超过25,000个就业岗位，
                每年的经济影响为1,207,000,000人民币。<br/>
                这就是这场革命的全部意义 - 通过支持经济的核心来加速中国：小企业主。</div>
        </div>
        <div class="compare-lender">
            <h2>推动革命并非易事</h2>
            <p>我们很自豪能与这些行业领先的合作伙伴合作</p>
            <div class="banner">
                <img :src="img3" alt="">
            </div>
            <div class="btn-box">
                <a class="common-small-bth w200" @click.stop="checkLogin">比较贷方</a>
            </div>
        </div>
        <div class="job">
            <div class="job-h">
                <img :src="img4" alt="">
            </div>
            <h2>小企业贷款只是一个开始</h2>
            <p>对于在我们的市场平台上推动的每笔贷款<br/>
                Beimi通过希望基金向全球的低收入企业家捐赠一定比例的资金。</p>
            <div class="job-b">
                <img :src="img5" alt="">
            </div>
            <div class="view-more">
                <dl>
                    <dt>成为Beimi的合作伙伴</dt>
                    <dd>
                        <router-link to="/" class="more-link">了解更多</router-link>
                        <router-link to="/" class="more-link" style="text-align: right">&gt;&gt;</router-link>
                    </dd>
                </dl>
                <dl>
                    <dt>成为Beimi的合作伙伴</dt>
                    <dd>
                        <router-link to="/" class="more-link">了解更多</router-link>
                        <router-link to="/" class="more-link" style="text-align: right">&gt;&gt;</router-link>
                    </dd>
                </dl>
            </div>
        </div>
        <get-loan-now></get-loan-now>
        <v-footer></v-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import footerComponent from '../../components/footer/index';
    import getLoanNow from '../../components/get-loan-now/get-loan-now';
    import headerComponent from '../../components/header/index';

    export default {
        name: "about-us",
        data() {
            return {
                img1: require('./images/1.jpg'),
                img2: require('./images/2.jpg'),
                banner: require('./images/4.jpg'),
                img3: require('./images/5.jpg'),
                img4: require('./images/6.jpg'),
                img5: require('./images/3.jpg'),
                isLogin: false
            }
        },
        created(){
            if(window.sessionStorage.getItem('user')){
                this.isLogin = true
            }
        },
        methods: {
            checkLogin(){
                if(window.sessionStorage.getItem('user')){
                    this.$router.push('/step');
                }else{
                    this.$router.push('/login');
                }
            }
        },
        components: {
            'v-header': headerComponent,
            'v-footer': footerComponent,
            'get-loan-now': getLoanNow
        }
    };
</script>

<style lang="less" scoped>
    @import '~css/beimi.less';

    .about-us {
        margin-top: 50px;
        .banner img {
            width: 100%;
        }

        .partner {
            display: flex;
            background: #f7fafe;
            padding: 50px 0;

            .item {
                flex: 1;
                text-align: center;

                .bold {
                    color: #5369E8;
                    font-size: 19px;
                    font-weight: 700;
                }

                span {
                    color: #323232;
                    font-size: 10px;
                    display: block;
                    margin: 15px 0;
                }
            }
        }

        .caption {
            display: flex;
            padding: 40px 0;

            &.border-1px {
                border-bottom: 1px #DCDCDC solid;
            }

            .item {
                flex: 1;

                img {
                    width: 100%;
                }

                h2 {
                    font-size: 20px;
                    color: #323232;
                    padding: 0 20px;
                }

                h3 {
                    padding: 0 20px;
                    font-size: 35px;
                    color: #5369E8;
                }

                h4 {
                    padding: 0 20px;
                    margin-bottom: 10px;
                    font-size: 20px;
                    color: #323232;
                }

                p {
                    font-size: 9px;
                    color: #646464;
                    padding: 0 20px;
                }
            }

        }

        .next-step {
            background: #5369E8;
            padding: 40px;
            color: #fff;
            text-align: center;

            h2 {
                font-size: 20px;
                color: #fff;
            }

            p {
                font-size: 13px;

                &.bold {
                    font-size: 84px;
                    font-weight: 700;
                }
            }

            div {
                font-size: 9px;
                margin: 30px 0 20px 0;
            }
        }

        .compare-lender {
            background: #f7fafe;
            padding: 50px 0;
            text-align: center;
            color: #323232;

            h2 {
                font-size: 20px;
            }

            p {
                font-size: 10px;
                margin-bottom: 30px;
            }

            .w200 {
                width: 200px;
            }
            .btn-box{
                margin-top: 20px;
            }
        }
        .job{
            padding: 40px 10px;
            .job-h {
                width: 200px;
                margin: 0 auto;
                img {
                    width: 100%;
                }
            }
            h2{font-size: 20px; color: #323232; text-align: center; margin: 15px 0;}
            p{font-size: 10px; color: #646464; text-align: center;}
            .job-b{
                width: 300px;
                margin: 30px auto;
                img {
                    width: 100%;
                }
            }
            .view-more{
                display: flex;
                dl{
                    flex: 1; box-shadow:0px 12px 21px 0px rgba(83,105,232,0.11); padding: 20px; margin: 5px;
                    dt{font-size: 12px; color: #323232; margin-bottom: 30px;}
                    dd{
                        display: flex;
                        color:#5369E8; font-size:7px;
                        .more-link{
                            flex: 1;
                        }
                    }
                }

            }
        }

    }
</style>
