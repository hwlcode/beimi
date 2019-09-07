<template>
    <div @click="viewBook">
        <flexbox class="book-item">
            <i class="iconfont" v-if="isCheck" :class="item.active?'icon-checkbox-fill':'icon-checkbox-empty'" @click.stop="check()"></i>
            <div class="image-cover" flex-box="0" v-bind:style="{backgroundImage:'url('+data.image+')'}"></div>
            <div class="info" flex-box="1">
                <h3>{{data.book_name}}</h3>
                <p class="author">by{{data.author}}</p>
                <p>已读至： {{data.chapter}}</p>
                <p>最新章节：{{data.end_chapter}}</p>
            </div>
            <div class="btn-gradient--primary" flex-box="0" v-if="isRead" @click.stop="readAgain(item)">继续阅读</div>
        </flexbox>
    </div>
</template>
<script>
import { Flexbox } from 'vux'
import imgUrl from '../assets/images/book-cover.jpg'
export default {
    components: {
        Flexbox
    },
    props: {
        data: Object,
        isRead: {
            type:Boolean,
            default:false
        },
        isCheck: {
            type:Boolean,
            default:false
        },
        toRead:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            item: {}
        }
    },
    watch:{
        isCheck(val){
            if(!val){
                this.item.active=false
            }
        }
    },
    created() {
        this.item = this.data
        this.$set(this.item, 'active', false)
    },
    methods: {
        viewBook(){
            if(this.isCheck){
                this.item.active = !this.item.active
                this.$emit('on-check', this.item)
                return
            }

            if(this.toRead){
                if(this.data.channel==3){
                    //漫画
                    this.$router.push({
                        name : 'cartoon',
                        params : {
                            bookId: this.data.book_id,
                            chapterId: this.data.chapter_id
                        }
                    })
                }else{
                    this.$router.push({
                        name : 'novel',
                        params : {
                            bookId: this.data.book_id,
                            chapterId: this.data.chapter_id,
                            lengthType: this.data.length_type
                        }
                    })
                }
            }else{
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
        },
        check() {
            this.item.active = !this.item.active
            this.$emit('on-check', this.item)
        },
        //继续阅读
        readAgain(item) {
            if(item.channel==3){
                //漫画
                this.$router.push({
                    name : 'cartoon',
                    params : {
                        bookId: item.book_id,
                        chapterId: item.chapter_id
                    }
                })
            }else{
                this.$router.push({
                    name : 'novel',
                    params : {
                        bookId: item.book_id,
                        chapterId: item.chapter_id,
                        lengthType: item.length_type
                    }
                })
            }
        }
    }
}

</script>
<style scoped lang="less">
.book-item {
    padding: 10px 15px;
    .image-cover {
        width: 71px;
        height: 98px;
        margin-right: 15px;
        box-shadow: 0 0 10px 0 rgba(166, 166, 166, 0.27);
    }
    .iconfont {
        margin-right: 15px;
        color: #999999;
        &.icon-checkbox-fill {
            color: #8698EC;
        }
    }
    .info {
        h3{
            font-weight: 600;
        }
        p {
            font-size: 13px;
            color: #666;
        }
        .author {
            font-size: 12px;
            color: #999;
            margin-bottom: 10px;
        }
    }
}

</style>
