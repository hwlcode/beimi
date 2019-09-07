<template>
<div @click="viewBook">
    <flexbox class="book-card">
        <div class="image-cover" flex-box="0" v-bind:style="{backgroundImage:'url('+data.image+')'}">
            <i class="iconfont icon-leaderboard-tip" :class="{'first':index==0,'second':index==1,'third':index==2}" v-if="isRank">
                <span>{{index+1}}</span>
            </i>
        </div>
        <div class="item-info" flex-box="1">
            <flexbox>
                <h3 v-html="data.title"></h3>
                <span class="status" :class="data.finish_flag=='1'?'status-s':'status-l'">{{data.finish_flag==1?'已完结':'连载中'}}</span>
                <div class="rate-inner" flex-box="1" v-if="isRate">
                    <rater v-model="data.average_score" star="<i class='iconfont icon-star-fill' style='font-size: 9px;'></i>" active-color="#EBA844" :font-size="9" disabled></rater>
                    <span class="score">{{data.average_score.toFixed(1)}}</span>
                </div>
            </flexbox>
            <p class="des">{{data.description}}</p>
            <flexbox class="other">
                <i class="iconfont icon-author"></i>
                <span>{{data.author}}</span>
                <ul class="tags text-right" flex-box="1">
                    <li class="status" v-for="(tag,i) in data.keyword" :key="i" v-if="i<3">{{tag}}</li>
                </ul>
            </flexbox>
        </div>
    </flexbox>
</div>
</template>
<script>
import { Flexbox, Rater } from 'vux'
const staticFinishOptions=[{text:'已完结',value:'1'},{text:'连载中',value:'0'}]
export default {
    components: {
        Flexbox,
        Rater
    },
    props: {
        data: Object,
        isRate: {
            type:Boolean,
            default:false
        },
        isRank:{
            type:Boolean,
            default:false
        },
        index:Number
    },
    data() {
        return {
            rate: 0,
            finishOptions:staticFinishOptions
        }
    },
    mounted() {
        // this.rate = this.data.rate
    },
    created() {
        if(this.isRank && this.data.keyword.length){
            this.data.keyword =this.data.keyword.splice(0,2)
        }
    },
    methods: {
        //此方法在windows版微信中会有问题
        getFinishText(key){
            let findItem=this.finishOptions.find((item,index)=>{
                return item.value==key
            })
            return findItem?findItem.text:''
        },
        viewBook(){
            let _route=JSON.stringify(Object.assign({},{
                    name:this.$route.name,
                    path:this.$route.path,
                    params:this.$route.params,
                    query:this.$route.query
                }))
            localStorage.setItem('fromBookRoute',_route)
            this.$router.push({
                name:'book-detail',
                params:{
                    bookId:this.data.book_id
                }
            })
        }
    }
}

</script>
<style scoped lang="less">
@import '~css/var.less';
.book-card {
    margin-bottom: 20px;
    .image-cover {
        width: 75px;
        height: 100px;
        margin-right: 13px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
        .iconfont{
            color: #555;
            position: relative;
            left: -1px;
            font-size: 23px;
            line-height: 1;
            &.first{
                color: #FF5754;
            }
            &.second{
                color: #FF7A3A;
            }
            &.third{
                color: #FFC000;
            }
            span{
                position: absolute;
                color: #fff;
                left: 50%;
                top: 45%;
                font-size: 12px;
                transform: translate(-50%,-50%);
            }
        }
    }
    .item-info{
        h3{
            font-weight: 600;
        }
    }
    .status {
        border: 1px solid #ccc;
        border-radius: 2px;
        color: #999999;
        font-size: 11px;
        padding: 0 2px;
        height: 18px;
        line-height: 16px;
        margin-left: 5px;
        margin-bottom:3px;
    }
    .status-l {
        border-color: #8C97CC;
        color: #8C97CC;
    }
    .status-s {
        border-color: #68CE8D;
        color: #68CE8D;
    }
    .rate-inner{
        text-align: right;
        .score{
            font-size: 9px;
            color: #666666;
        }
    }
    .des {
        font-size: 13px;
        color: #666;
        margin-top: 5px;
        .ellipsis(2);
    }
    .other {
        font-size: 11px;
        color: #999999;
        margin-top: 15px;
        .iconfont {
            font-size: 11px;
            margin-right: 3px;
        }
        .tags {
            .status {
                float: right;
            }
        }
    }
}

</style>
