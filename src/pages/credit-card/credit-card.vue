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
                    <tab-item @on-item-click="switchCardType(1)">低利率</tab-item>
                    <tab-item @on-item-click="switchCardType(2)">旅行奖励</tab-item>
                    <tab-item @on-item-click="switchCardType(3)">现金奖励</tab-item>
                    <tab-item @on-item-click="switchCardType(4)">额度高</tab-item>
                    <tab-item @on-item-click="switchCardType(5)">没有年费</tab-item>
                </tab>
                <div class="show-all" v-show="showAll">
                    <Checker v-model="selectedMenu" type="checkbox" default-item-class="v-item"
                             selected-item-class="v-item-selected" @click.native="selectedMenuEvent">
                        <CheckerItem v-for="(item, index) in submenu" :value="item.value" :key="index">{{item.text}}
                        </CheckerItem>
                    </Checker>
                </div>
            </div>

            <div v-if="cardList.length > 0" class="card-list" ref="cardList" v-for="(card,index) in cardList">
                <div class="c-header">
                    <span>{{card.name}}的选择</span>
                    <h2>最佳{{ cardType(index) }}卡</h2>
                </div>
                <div class="c-body">
                    <Flexbox align="flex-start">
                        <FlexboxItem :span="4">
                            <div class="left-box">
                                <div class="img-box">
                                    <img :src="card.productPicture" alt="">
                                </div>
                                <div class="btn-box">
                                    <a :href="card.productH5Url" class="btn"
                                       style="margin: 10px auto; width: 110px; color: #fff;">现在申请</a>
                                </div>
                            </div>
                        </FlexboxItem>
                        <FlexboxItem style="padding-left: 10px;">
                            <div class="right-title">{{card.productName}}</div>
                            <Flexbox class="c-text">
                                <FlexboxItem :span="4">
                                    <div>奖励奖金</div>
                                    <span>{{card.bonus}}元</span>
                                </FlexboxItem>
                                <FlexboxItem>
                                    <div>可变APR</div>
                                    <span>{{card.annualInterestRate}}%</span>
                                </FlexboxItem>
                                <FlexboxItem :span="4">
                                    <div>年费</div>
                                    <span>{{card.annualFee}}元</span>
                                </FlexboxItem>
                            </Flexbox>
                            <router-link to="/">价格和条款</router-link>
                        </FlexboxItem>
                    </Flexbox>
                </div>
                <div style="display: none" v-html="card.productDesc" class="desc"></div>
                <div class="show-btn">
                    <div @click="showMoreMsg($event)"><span>展示细节</span>
                        <x-icon type="ios-arrow-down" size="10"></x-icon>
                    </div>
                    <div @click="hideMoreMsg($event)" style="display: none"><span>收起细节</span>
                        <x-icon type="ios-arrow-up" size="10"></x-icon>
                    </div>
                </div>
            </div>
            <a href="javascript:;" v-if="!isLast" class="get-more" @click.stop="getMoreProducts">加载更多</a>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import footerComponent from '../../components/footer/index';
    import headerComponent from '../../components/header/index';
    import {Checker, CheckerItem, Flexbox, FlexboxItem} from 'vux';
    import {public_methods, toast} from '../../assets/js/public_method';
    let PAGESIZE = 5;
    let RECOMMENDSTATUS = 0;

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
                        text: '旅行奖励',
                        value: 2,
                    },
                    {
                        text: '现金奖励',
                        value: 3,
                    },
                    {
                        text: '额度高',
                        value: 4,
                    },
                    {
                        text: '没有年费',
                        value: 5,
                    }
                ],
                cardList: [],
                isLast: false,
                page: 1,
                selectedType: null
            }
        },
        computed: {
            cardType() {
                return index => {
                    let card = this.cardList[index];
                    let txt = '';
                    switch (card.cardType) {
                        case '1':
                            txt = '低利率';
                            break;
                        case '2':
                            txt = '旅行奖励';
                            break;
                        case '3':
                            txt = '现金奖励';
                            break;
                        case '4':
                            txt = '额度高';
                            break;
                        case '5':
                            txt = '没有年费';
                            break;
                    }
                    return txt;
                }
            }
        },
        created() {
            this.getProductList(this.page, PAGESIZE, '1,2,3,4,5', RECOMMENDSTATUS);
        },
        methods: {
            showAllEvent() {
                this.showAll = !this.showAll;
            },
            switchCardType(type) {
                this.showAll = false;
                this.page = 1;
                this.selectedType = type;
                this.cardList = [];
                this.getProductList(this.page, PAGESIZE, type, RECOMMENDSTATUS);
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
            },
            selectedMenuEvent(){
                this.cardList = [];
                this.selectedType = this.selectedMenu;
                this.getProductList(this.page, PAGESIZE, this.selectedMenu, RECOMMENDSTATUS);
            },
            getMoreProducts(){
                this.page++;
                this.getProductList(this.page, PAGESIZE, this.selectedType, RECOMMENDSTATUS);
            },
            /**
             * accumulationFund: "3" // 公积金
             annualFee: 1000 //年费
             annualInterestRate: 16 //年利率
             annualProfit: 60000 //年度利润
             area: "140203" // 区域
             bonus: 8000 //奖金
             businessOperationTime: 1567941625000 //经营时间
             car: "1" // 车
             cardType: "1" // 卡类型
             checkStatus: 1 // 检查状态
             checkUser: null // 检查用户
             city: "140200"  // 城市
             createUser: 10000002 // 创建用户
             creditRating: null // 信用评级
             creditScore: 300  // 信用评分
             divisionCode: "1" // 部门代码
             education: "3"  // 教育-学历
             gmtCreated: 1567732017000
             gmtModified: 1567732017000
             houseProperty: "1" // 房产
             id: 2
             insurancePolicy: "2" // 保险政策
             isPostCommission: true //是否提交委员会
             loanMaxDays: 1 // 贷款期限
             loanMaxMoney: 120000 // 贷款金额
             loanMethod: "本金等额" // 贷款方式
             loanMinDays: 1 // 贷款最低期限
             loanMinMoney: 1 // 贷款最低金额
             loanRank: "0" // 贷款等级
             percentage: 6 // 百分比
             productBonus: 12000 // 产品的奖金
             productDate: 180 //产品有效日期
             productDesc: "<p>准入要求</p><br/><span>1 必须有中国国籍</span><br/><span>2 年龄必须有23-55周岁</span>" // 产品描述
             productH5Url: "https://www.baidu.com" // 产品h5链接
             productName: "兴业福气贷" // 产品名称
             productPicture: "https://wuzhi.me/avatar/162004.1486698527.jpg" // 产品图片
             productType: 1 // 产品类型
             productUrl: "https://www.baidu.com" // 产品web链接
             province: "140000" // 省
             recommendStatus: 0 // 推荐状态
             settleMethod: "按月还款"
             socialSecurity: "4" // 解决方法
             sort: 1
             status: 0
             submitCommission: 800 // 提交委员会
             uploadClassify: 10000001 // 上传分类
             wages: 3 // 工资
             */
            getProductList(page = this.page, pageSize = PAGESIZE, cardType='', recommendStatus = RECOMMENDSTATUS) {
                this.axios.post(public_methods.api.productList + '?page=' + page + '&pageSize=' + pageSize + '&cardType=' + cardType + '&recommendStatus=' + recommendStatus).then(
                    response => {
                        let data = response.data;
                        if (data.errorCode === 0) {
                            this.cardList = this.cardList.concat(data.data.data);
                            this.isLast = data.data.totalNum < pageSize * page;
                        } else {
                            toast(data.data.message);
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
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
                        flex: 0 0 19%;
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
            .get-more{ display: block; background: #f1f1f1; color: #5369E8; text-align: center; line-height: 30px; margin-bottom: 10px; width: 80%; border-radius: 10px; border: 1px #dcdcdc solid;  margin: 20px auto;}
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

                .desc {
                    padding: 10px 15px;
                    border-top: 1px #dcdcdc solid;
                    font-size: 8px;
                    color: #646464
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
