<template>
    <div class="credit">
        <div v-if="!showReport" style="padding-top: 15px;">
        <div class="get-score" v-show="show">
            <div class="score">
                <div class="score-box">
                    <x-circle
                        :percent="percent"
                        :stroke-width="2"
                        stroke-color="#3e92f4">
                        <span>{{ percent }}%</span>
                    </x-circle>
                    <div class="show-score">
                        <span style="font-size: 45px;" v-if="companyCreditScore > 0">{{companyCreditScore}}分</span>
                        <span v-if="companyCreditScore == 0">未获取<br/>信用分</span>
                    </div>
                </div>
                <div class="btn-box">
                    <div style="flex: 0 0 50%; text-align: center;"><a href="tel:0755-85245354" class="consulting">咨询客服</a></div>
                    <x-button class="v-text" @click.native="beginTest">开始测试</x-button>
                </div>
            </div>
            <swiper loop auto :aspect-ratio="260/750">
                <swiper-item class="banner-item"><img :src="banner1"></swiper-item>
                <swiper-item class="banner-item"><img :src="banner2"></swiper-item>
                <swiper-item class="banner-item"><img :src="banner3"></swiper-item>
            </swiper>
            <!--        <div class="banner-list">-->
            <!--            <div class="banner-box">-->
            <!--                <div class="banner-item"><img :src="banner" alt=""></div>-->
            <!--                <div class="banner-item"><img :src="banner" alt=""></div>-->
            <!--                <div class="banner-item"><img :src="banner" alt=""></div>-->
            <!--            </div>-->
            <!--        </div>-->
<!--            <v-service :s-bottom="40"></v-service>-->
        </div>
        <div class="test-score" v-show="!show">
            <div class="score-body">
                <div class="users-list">
                    <h2>已有12334人查询</h2>
                    <div class="user-swiper">
                        <swiper auto height="130px" direction="vertical" :interval=2000 class="text-scroll"
                                :show-dots="false">
                            <swiper-item>
                                <dl>
                                    <dt><i class="icon icon-1"></i></dt>
                                    <dd>王女士  信用分754，获得贷款290000元</dd>
                                </dl>
                                <dl>
                                    <dt><i class="icon icon-2"></i></dt>
                                    <dd>李女士  信用分754，获得贷款290000元</dd>
                                </dl>
                                <dl>
                                    <dt><i class="icon icon-3"></i></dt>
                                    <dd>陈先生 信用分754，获得贷款290000元</dd>
                                </dl>
                            </swiper-item>
                            <swiper-item>
                                <dl>
                                    <dt><i class="icon icon-1"></i></dt>
                                    <dd>王女士  信用分754，获得贷款290000元</dd>
                                </dl>
                                <dl>
                                    <dt><i class="icon icon-1"></i></dt>
                                    <dd>李女士  信用分754，获得贷款290000元</dd>
                                </dl>
                                <dl>
                                    <dt><i class="icon icon-1"></i></dt>
                                    <dd>陈先生 信用分754，获得贷款290000元</dd>
                                </dl>
                            </swiper-item>
                            <swiper-item>
                                <dl>
                                    <dt><i class="icon icon-1"></i></dt>
                                    <dd>王女士  信用分754，获得贷款290000元</dd>
                                </dl>
                                <dl>
                                    <dt><i class="icon icon-1"></i></dt>
                                    <dd>李女士  信用分754，获得贷款290000元</dd>
                                </dl>
                                <dl>
                                    <dt><i class="icon icon-1"></i></dt>
                                    <dd>陈先生 信用分754，获得贷款290000元</dd>
                                </dl>
                            </swiper-item>
                        </swiper>
                    </div>
                    <p>具体能否下款以及下款额度以最终审核结果为准</p>
                </div>
                <div class="pay">
                    <p>￥199.00</p>
                    <span>支付费用</span>
                    <div><input type="checkbox" name="select" value="">本平台只提供贷款信息服务，服务含平台信息技术服务、人工客服咨询服务。</div>
                </div>
                <div class="pay-way">
                    <div class="title">选择支付方式：</div>
                    <div class="pay-item"><input type="radio" name="payway"> 微信支付</div>
                    <div class="pay-item"><input type="radio" name="payway"> 银行卡支付</div>
                </div>
                <div style="padding: 0 20px 38px; margin-top: 30px;">
                    <x-button :gradients="['#546BE0', '#546BE0']" @click.native="pay"
                              style="border-radius:99px;">确认支付
                    </x-button>
                </div>
<!--                <v-service :s-bottom="40"></v-service>-->
            </div>
        </div>
        </div>
        <div v-if="showReport" class="pdf">
            <p class="arrow">
                <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}"><x-icon type="ios-arrow-back" size="30"></x-icon></span>
                <span>{{currentPage}}/{{pageCount}}</span>
                <a :href="pdfSrc" class="download" :download="downloadName">下载</a>
                <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}"><x-icon type="ios-arrow-forward" size="30"></x-icon></span>
            </p>
            <pdf
                :src="pdfSrc"
            :page="currentPage"
            @num-pages="pageCount=$event"
            @page-loaded="currentPage=$event"
            @loaded="loadPdfHandler">
            </pdf>
        </div>
    </div>
</template>

<script>
    import {XCircle, SwiperItem, Swiper} from 'vux'
    import service from '../../../components/service/service';
    import {public_methods, toast} from '../../../assets/js/public_method';
    import pdf from 'vue-pdf'

    export default {

        name: 'credit',
        data() {
            return {
                banner1: require('../images/4.png'),
                banner2: require('../images/2.png'),
                banner3: require('../images/3.png'),
                percent: 60,
                show: true,
                companyCreditScore: 0,
                showReport: false,
                pdfSrc: '',
                downloadName: '',

                currentPage: 0, // pdf文件页码
                pageCount: 0, // pdf文件总页数
            }
        },
        created() {
            this.hasReview(); // 是否测算过
            this.companyCreditScore = this.$route.params.companyCreditScore;
            this.show = true;
        },
        mounted() {

        },
        methods: {
            changePdfPage (val) {
                if (val === 0 && this.currentPage > 1) {
                    this.currentPage--
                }
                if (val === 1 && this.currentPage < this.pageCount) {
                    this.currentPage++
                }
            },
            // pdf加载时
            loadPdfHandler () {
                this.currentPage = 1 // 加载的时候先加载第一页
            },
            beginTest() {
                this.show = false;
            },
            hasReview(){
                this.axios.get(public_methods.api.hasReview).then(
                    response => {
                        let data = response.data;
                        if (data.data) {
                            this.showReport  = true;
                            this.getCompanyReviewHistory();
                        }else{
                            this.showReport  = false;
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            pay(){
                this.$router.push({
                    name: 'loan'
                });
            },
            // getCompanyReview() {
            //     // let companyName = this.$store.state.companyName;
            //     let companyName = '测试';
            //     this.axios.get(public_methods.api.companyReview+'?type=1' + '&companyName='+companyName).then(
            //         response => {
            //             let data = response.data;
            //             console.log(data);
            //             if (data.errorCode === 0) {
            //                 // this.show = false;
            //             }else{
            //                 toast('');
            //             }
            //         })
            //         .catch(error => {
            //             console.log(error)
            //         });
            // },
            getCompanyReviewHistory() {
                this.axios.get(public_methods.api.companyReviewHistory).then(
                    response => {
                        let data = response.data;
                        console.log(data);
                        if (data.errorCode === 0) {
                            let evaluationContent = data.data[0]['evaluationContent'];
                            this.pdfSrc = evaluationContent.replace(/^http:\/\/[a-z]+\.[a-z]{2,3}:\d+/gi, '');
                            this.downloadName = evaluationContent.replace(/^http:\/\/[a-z]+\.[a-z]{2,3}:\d+\/[a-z]+\//gi, '');
                        }else{
                            toast(data.message);
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
        },
        components: {
            XCircle, SwiperItem, Swiper,
            'v-service': service,
            pdf
        }
    }
</script>

<style lang="less" scoped>
    .credit {
        .score {
            background: #fff;
            margin: 0px 15px 40px 15px;
            box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.05);
            border-radius: 5px;
            padding: 20px 20px 70px 20px;

            .score-box {
                width: 300px;
                height: 300px;
                margin: 0 auto;
                position: relative;

                .show-score {
                    position: absolute;
                    width: 260px;
                    height: 260px;
                    margin: 20px;
                    left: 0;
                    top: 0;
                    text-align: center;
                    background: url("../images/1.png") no-repeat center center;
                    background-size: contain;

                    span {
                        color: #3E92F4;
                        font-size: 25px;
                        display: inline-block;
                        padding-top: 96px;
                        font-weight: 700;
                    }
                }
            }

            .btn-box {
                font-size: 17px;
                display: flex;
                text-align: center;
                align-items: flex-start;
                position: absolute;
                width: 100%;
                top: 470px;
                left: 0;

                .weui-btn + .weui-btn {
                    margin-top: 0;
                }

                .consulting {
                    width: 135px;
                    height: 50px;
                    display: inline-block; line-height: 39px;
                    background: rgba(205, 212, 255, 1);
                    border: 5px solid rgba(245, 245, 245, 1);
                    border-radius: 20px;
                    color: #5369E8;
                }

                .v-text {
                    width: 135px;
                    height: 50px;
                    background: rgba(83, 105, 232, 1);
                    border: 5px solid rgba(245, 245, 245, 1);
                    border-radius: 20px;
                    color: #fff;
                }
            }
        }

        .banner-item {
            img {
                width: 100%;
            }
        }

        .score-body {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 10px 57px 0px rgba(83, 105, 232, 0.1);
            border-radius: 5px;
            margin: 0 15px 30px 15px;
            .user-swiper{
                padding: 15px;
            }
            .users-list {
                background: url("../images/8.png") no-repeat 0 0;
                background-size: contain;
                height: 262px;
                color: #fff;
                h2 {
                    text-align: center;
                    color: #fff;
                    font-size: 17px;
                    font-weight: 700;
                    padding: 15px 0;
                }

                .user-swiper {
                    background: rgba(234, 237, 255, 0.6);
                    border-radius: 6px;
                    margin: 0 15px 15px 15px;
                    color: #323232;
                }

                p {
                    text-align: center;
                    font-size: 10px;
                }

                dl{
                    display: flex;
                    margin-bottom: 6px;
                    dt{
                        flex: 0 0 35px;
                        .icon{
                            display: inline-block;
                            width: 35px;
                            height: 35px;
                            background-size: contain;
                            background-repeat: no-repeat;
                            background-position: center center;
                            &.icon-1{
                                background-image: url("../images/5.png");
                            }
                            &.icon-2{
                                background-image: url("../images/6.png");
                            }
                            &.icon-3{
                                background-image: url("../images/7.png");
                            }
                        }
                    }
                    dd{
                        flex: 1;
                        color: #323232;
                        font-size: 13px;
                        padding-left: 10px;
                        line-height: 35px;
                    }
                }

            }
        }

        .pay{
            text-align: center;
            p{color:#5369E8; font-size: 28px; font-weight: 700; margin: 50px 0 0px 0;}
            span{ display: inline-block;font-size: 9px; color: #969696; position: relative;
                &:before{
                    content: ".";
                    width: 25px;
                    height: 10px;
                    border-top: 1px #969696 solid;
                    position: absolute;
                    top: 8px;
                    left: -32px;
                    opacity: 0.6;
                }
                &:after{
                    content: ".";
                    width: 25px;
                    height: 10px;
                    border-top: 1px #969696 solid;
                    position: absolute;
                    top: 8px;
                    right: -32px;
                    opacity: 0.6;
                }
            }
            div{font-size: 9px; color: #969696; text-align: center; padding: 20px;}
        }

        .pay-way{
            color:#323232;
            margin: 0 10px;
            .title{ font-size: 16px; border-bottom: 1px #E5E5E5 solid; padding: 10px 0;}
            .pay-item{border-bottom: 1px #E5E5E5 solid; font-size: 13px; padding: 10px 0;}
        }
        .pdf{
            .arrow{
                font-size: 13px;
                background: #f1f1f1;
                display: flex;
                line-height: 30px;
                justify-content: space-between;
                padding: 10px 10px 0 10px;
                color: #333;
                .download{
                    border: 1px #999 solid; display: inline-block; padding: 0px 20px; border-radius: 20px; height: 30px;
                }
                .turn{

                }
                .vux-x-icon {
                    fill: #999;
                }
            }
        }
    }
</style>
