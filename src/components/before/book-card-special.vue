<template>
    <div class="book-card-special" @click="viewBook">
        <div class="des-inner" v-bind:style="{'background':color}">
            <p class="des">{{data.description}}</p>
        </div>
        <flexbox class="info-panel">
            <div class="image-cover" flex-box="0" v-bind:style="{backgroundImage:'url('+data.image+')'}"></div>
            <div class="item-info" flex-box="1">
                <h3>{{(data.title.length>8)?(data.title.substring(0,8)+'...'):data.title}}</h3>
                <flexbox class="other">
                    <i class="iconfont icon-author"></i>
                    <span>{{data.author}}</span>
                    <ul class="tags text-right" flex-box="1">
                        <li class="status" v-for="(tag,i) in data.keyword" :key="i" v-if="i<3">{{tag}}</li>
                        <li class="status" :class="data.finish_flag=='1'?'status-s':'status-l'">{{getFinishText(data.finish_flag)}}</li>
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
        isRate: false,
        color:String
    },
    data() {
        return {
            rate: 0,
            finishOptions:staticFinishOptions
        }
    },
    mounted() {
        this.rate = this.data.rate
    },
    created() {},
    methods: {
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
.book-card-special {
    .image-cover {
        width: 47px;
        height: 63px;
        margin-right: 13px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
    }
    .status {
        border: 1px solid #999999;
        border-radius: 2px;
        color: #999999;
        font-size: 11px;
        padding: 0 2px;
        height: 18px;
        line-height: 16px;
        margin-left: 5px;
    }
    .status-l {
        border-color: #8C97CC;
        color: #8C97CC;
    }
    .status-s {
        border-color: #68CE8D;
        color: #68CE8D;
    }
    .info-panel {
        padding-left: 15px;
        position: relative;
        top: -32px;
        .item-info {
            h3 {
                color: #fff;
                font-weight: 600;
            }
        }
    }
    .des-inner {
        height: 100px;
        background-color: #E1B59A;
        width: 100%;
        padding: 12px 15px;
        .des {
            font-size: 14px;
            color: #fff;
            z-index: 10;
            margin-top: 5px;
            .ellipsis(2);
        }
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
                line-height: 16px;
            }
        }
    }
}

</style>
