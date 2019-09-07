<template>
    <div class="header">
        <div class="main" v-if="!isSub">
            <router-link to="/" v-if="isLogo">
                <template v-if="$store.state.logoUrl">
                    <img :src="$store.state.logoUrl" />
                </template>
                <template v-else>
                    <img src="./logo.png" />
                </template>
            </router-link>
            <ul>
                <li v-if="isRead"><i class="iconfont" @click="onRead()">&#xe708;</i>最近阅读</li>
                <li v-if="isSearch"><i class="iconfont" @click="onSearch()">&#xe717;</i>搜索</li>
                <li v-if="isRank" @click="onRank()"><i class="iconfont">&#xe704;</i>排行榜</li>
            </ul>
        </div>
        <div class="sub" v-if="isSub||isBack" flex="cross:center">
            <div class="back" @click="back()">
                <i class="iconfont icon-arrow-left"></i>
                <span>返回</span>
            </div>
            <h2 flex-box="1" class="text-center">
                <span v-if="titleName">{{titleName}}</span>
            </h2>
            <div class="menu text-center" v-if="isMenu" @click="menuShow=!menuShow">
                <div>
                    <i class="iconfont icon-bottom-list"></i>
                    <p class="sub-tip">菜单</p>
                </div>
                <div class="drop-down" v-if="menuShow">
                    <div class="cover"></div>
                    <ul class="inner">
                        <li v-for="(item,index) in menuList" :key="index" @click="changeMenu(item)">
                            <i class="iconfont" :class="item.className"></i>
                            {{item.text}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const staticMenuList = [{ text: '返回首页', value: 1, className: 'icon-back-home' }, { text: '个人中心', value: 2, className: 'icon-my-empty' }, { text: '立即充值', value: 3, className: 'icon-h-recharge' }]
export default {
    props: {
        isSub: {
            type: Boolean,
            default: false
        },
        isBack: {
            type: Boolean,
            default: false
        },
        isSearch: {
            type: Boolean,
            default: true
        },
        isRead: {
            type: Boolean,
            default: false
        },
        isRank: {
            type: Boolean,
            default: false
        },
        titleName: String,
        isMenu: {
            type: Boolean,
            default: true
        },
        isLogo: {
            type: Boolean,
            default: true
        },
        isCustomBack:{
            type:Boolean,
            default:false
        },
        //返回几步
        backStep:{
    		type:Number,
    		default:-1
        }
    },
    data() {
        return {
            menuList: staticMenuList,
            menuShow:false
        }
    },
    mounted() {
        window.addEventListener('scroll', ()=>{
            this.menuShow=false
        })
    },
    methods: {
        changeMenu(item) {
            if(item.value===1){
                this.$router.push({
                    name:'index'
                })
            }else if(item.value===2){
                this.$router.push({
                    name:'my'
                })
            }else{
                this.$router.push({
                    name:'recharge'
                })
            }
        },
        back() {
            if(this.isCustomBack){
                this.$emit('custom-back')
            }else{
                this.$router.go(this.backStep)
            }
        },
        onRank() {
            this.$router.push({
                name: 'rank',
                params:{
                    fromName:this.$route.name
                }
            })
        },
        onSearch() {
            this.$router.push({
                name: 'search',
                params:{
                    fromName:this.$route.name
                }
            })
        },
        onRead() {
            this.$router.push({
                name: 'subscription',
                params: {
                    type: 2,
                    fromName:this.$route.name
                }
            })
        }
    }
}

</script>
<style scoped lang="less">
@import '~css/var.less';
.header {
    .border-mini-bottom;
    height: 60px;
    position: relative;
    .main {
        &>a>img {
            height: 25px;
            position: relative;
            left: 15px;
            top: 17px;
        }
        ul {
            position: absolute;
            right: 15px;
            top: 0;
            height: 100%;
            li {
                float: left;
                height: 100%;
                padding-left: 30px;
                text-align: center;
                font-size: 12px;
                i {
                    height: 18px;
                    width: 18px;
                    margin: 12px auto 0 auto;
                    padding-bottom: 5px;
                    display: block;
                    font-size: 15px;
                }
            }
        }
    }
    .sub {
        height: 100%;
        padding: 0 15px;
        h2{
        		max-width:calc(~"100% - 50px - 40px");
        }
        .menu {
            min-width: 35px;
            .sub-tip {
                font-size: 10px;
                line-height: 1;
            }
        }
    }
}

</style>
