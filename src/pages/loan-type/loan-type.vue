<template>
    <div class="loan-type">
        <v-header :showLogin="false"></v-header>
        <div class="loan">
            <div class="quota">
                <div class="left">
                    <h1>商业信贷额度</h1>
                    <p>您需要的安全性，您想要的灵活性</p>
                </div>
                <div class="right">
                    <p>让我们开始吧</p>
                    <input type="text" placeholder="￥你需要多少钱？" class="money">
                    <a class="common-small-bth" @click.stop="checkLogin">查看你的选择</a>
                </div>
            </div>
            <div class="cate">
                <div class="cate-item">
                    <i class="icon icon-1"></i>
                    <span>贷款额度</span>
                    <p>￥ 2,500-500,000</p>
                </div>
                <div class="cate-item">
                    <i class="icon icon-3"></i>
                    <span>贷款期限</span>
                    <p>1 - 3年</p>
                </div>
                <div class="cate-item">
                    <i class="icon icon-2"></i>
                    <span>资金筹集时间</span>
                    <p>最快24小时</p>
                </div>
                <div class="cate-item">
                    <i class="icon icon-4"></i>
                    <span>利率</span>
                    <p>低至8％</p>
                </div>
            </div>
            <div class="hurry-up">
                <h2>有时速度就是一切</h2>
                <p>
                    无论您做多少计划，小企业所有权都充满惊喜。<br/>
                    思考你的脚并提出快速解决方案往往是关闭你的大门和关闭竞争对手之间的区别。
                    当时间就是金钱时，短期贷款可以在短短24小时内获得融资。
                </p>
                <div class="btn-box">
                <a class="btn" style="width: 200px;" @click.stop="checkLogin">查看你的选择</a>
                </div>
                <div class="banner-box">
                    <img :src="img1" alt="">
                </div>
            </div>
            <div class="caption">
                <h2>探索这些领先贷方的小企业贷款选择</h2>
                <div class="banner-box"><img :src="img2" alt=""></div>
                <div class="btn-box">
                    <a class="btn" style="width: 200px;" @click.stop="checkLogin">搜索贷方</a>
                </div>
            </div>
            <div class="list">
                <dl>
                    <dt><i class="icon"></i></dt>
                    <dd>
                        <h3>它不仅快 - 它也很灵活</h3>
                        <p>短期贷款就像瑞士军刀贷款一样 - 它既方便又灵活，能够让你脱离困境。您可以使用它来支付意外成本，度过经济衰退，为短期项目融资，甚至利用新的商机。这绝对是你想要的贷款。
                        </p>
                    </dd>
                </dl>
                <dl>
                    <dt><i class="icon"></i></dt>
                    <dd>
                        <h3>获得短期贷款并不像你想象的那么难</h3>
                        <p>
                            如果您拥有可靠的信誉并且您已经经营了两年或更长时间，那么您很有可能获得短期贷款资格。您的贷方也可能会要求您放下一些抵押品以确保贷款。
                            您可以在更短的时间内了解您是否有资格获得早上拿铁：只需填写我们的免费，无义务申请，以比较75+贷方的短期贷款选项。现在有一个很好的方式开始你的一天。
                        </p>
                    </dd>
                </dl>
                <dl>
                    <dt><i class="icon"></i></dt>
                    <dd>
                        <h3>我们的团队可以帮助您找到最优惠的价格</h3>
                        <p>
                            你可能急于获得融资，但你不想急于进入错误的短期贷款。这就是我们的专家进来的地方。我们的个人资金经理可以帮助您比较各种贷款选项的费率，条款和付款，以便您可以为您的企业选择合适的贷款。这意味着您不仅可以获得短期贷款，还可以获得最优惠的价格。<br/>
                            使用我们的短期贷款计算器来确定您能负担多少，然后看看您的选择。
                        </p>
                    </dd>
                </dl>
            </div>
            <div class="caption-fo">
                <p class="text-1">
                    我和Doug一起为我们的淡季和即将到来的经销商节目提供短期融资。我从他身上学到了很多关于商业信用的知识。
                </p>
                <p>Doug</p>
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
        name: "loan-type",
        data(){
            return{
                img1: require('./iamges/5.jpg'),
                img2:require('./iamges/9.jpg'),
                isLogin: this.$store.state.isLogin
            }
        },
        components: {
            'v-header': headerComponent,
            'v-footer': footerComponent,
            'get-loan-now': getLoanNow
        },
        methods: {
            checkLogin(){
                if(this.isLogin){
                    this.$router.push('/step');
                }else{
                    this.$router.push('/login');
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    @import '~css/beimi.less';

    .loan-type {
        margin-top: 50px;

        .loan {
            .quota {
                background: #5369E8;
                padding: 50px 20px;
                display: flex;

                .left {
                    flex: 1;
                    h1{ font-size: 20px; color: #fff; font-weight: 700; margin-top: 50px;}
                    p{font-size: 10px; color: #fff;}
                }

                .right {
                    flex: 0 0 180px;
                    text-align: center;
                    background:rgba(247,250,254,0.4);
                    border-radius:5px;
                    padding: 30px 15px;
                    p{font-size: 14px; color: #fff; margin-bottom: 20px;}
                    .money{width: 140px; border-radius: 10px; margin-bottom: 20px; height: 25px; line-height: 25px;}
                    .common-small-bth{width: 140px;  background: #05C2F0; color:#fff;
                        font-size: 8px;}
                }
            }
            .cate{ background: #f7fafe; display: flex;
                flex-wrap: wrap;
                padding: 50px 0;
                .cate-item{
                    flex: 0 0 50%;
                    text-align: center;
                    margin-bottom: 30px;
                    .icon{
                        display: inline-block;
                        background-position: center center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        width: 29px;
                        height: 29px;
                        &.icon-1{
                            background-image: url("./iamges/1.png");
                        }
                        &.icon-2{
                            background-image: url("./iamges/2.png");
                        }
                        &.icon-3{
                            background-image: url("./iamges/3.png");
                        }
                        &.icon-4{
                            background-image: url("./iamges/4.png");
                        }
                    }
                    span{
                        display: block; color: #646464; font-size: 10px;
                    }
                    p{
                        color: #323232; font-size: 15px;
                    }
                }
            }
            .hurry-up{
                h2{ color: #323232; font-size: 20px; margin: 30px; text-align: center;}
                p{color: #646464; font-size: 9px; padding: 0 10px; text-align: center;}
                .btn-box{text-align: center;}
                .banner-box{
                    margin-bottom: 30px;
                    img{width: 100%;
                    }
                }
            }
            .caption{
                background: #f7fafe;
                padding-top: 30px;
                h2{
                    font-size: 20px; color: #323232; text-align: center; margin: 30px;
                }
                .banner-box{
                    img{width: 100%;}
                }
                .btn-box{
                    text-align: center;
                }
            }
            .list{
                padding: 30px 20px;
                dl{display: flex; margin-bottom: 40px;}
                dt{
                    flex: 0 0 22px;
                    .icon{
                        display: inline-block;
                        margin-top: 5px;
                        width: 22px;height: 22px;
                        background: url("./iamges/6.png") no-repeat center center;
                        background-size: contain;
                    }
                }
                dd{
                    flex: 1;
                    padding-left: 20px;
                    h3{ color:#323232; font-size: 14px; font-weight: 700; margin-bottom: 5px;}
                    p{font-size: 9px; color:#646464;}
                }
            }
            .caption-fo{
                text-align: center;
                border-top: 1px #E5E5E5 solid;
                padding: 40px 30px;
                p {
                    font-size: 10px; color:#323232; margin-bottom: 30px;
                    &.text-1{
                        position: relative;
                        &:before{
                            content: '.';
                            position: absolute;
                            left: -13px;
                            top:3px;
                            width: 14px;
                            height: 13px;
                            background: url("./iamges/7.png") no-repeat center center;
                            background-size: contain;
                        }
                        &:after{
                            content: '.';
                            position: absolute;
                            right: -13px;
                            top:3px;
                            width: 14px;
                            height: 13px;
                            background: url("./iamges/8.png") no-repeat center center;
                            background-size: contain;
                        }
                    }
                }
            }
        }
    }
</style>
