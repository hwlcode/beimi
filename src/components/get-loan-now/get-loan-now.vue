<template>
    <div class="get-loan-now">
        <div class="action">
            <h4>立即获取<br/>您的小企业贷款</h4>
            <div>
                <input type="text" placeholder="￥你需要多少钱？" v-model="needMoney">
                <a class="common-small-bth" @click.stop="checkLogin">开始</a>
            </div>
            <dl>
                <dt>申请是免费的，不会影响您的信用</dt>
                <dd>已经有账号？<router-link to="/login" style="color: #64E1FB; font-weight: 500;">登入</router-link></dd>
            </dl>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "get-loan-now",
        data() {
            return {
                needMoney: '',
                isLogin: this.$store.state.isLogin
            }
        },
        methods: {
            setNeedMoney() {
                this.$store.commit('SET_NEED_MONEY', this.needMoney || 0);
            },
            checkLogin(){
                if(this.isLogin){
                    this.$router.push({path: '/step'});
                }else{
                    this.$router.push({path: '/login'});
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    @import '~css/beimi.less';
    .action{
        background: rgba(83, 105, 232, 1);
        padding: 40px 30px 60px 30px;
        text-align: center;
        h4{
            font-size:24px;
            font-weight:700;
            color:rgba(255,255,255,1);
            display: inline-block;
            padding: 30px 20px 40px 20px;
        }
        & > div {
            padding-bottom: 20px;
            & > input{
                height: 45px;
                border-radius: 45px;
                line-height: 45px;
                padding: 0 10px;
                font-size: 13px;
                color: #eee;
                background: #7688E6;
                width: 100%;
            }
            & > input::-webkit-input-placeholder{
                color: #eee;
            }
            & > a{
                width: 100%;
                display: block;
                margin: 10px auto;
                font-weight: 700;
                background-color: rgba(0, 228, 255, 1);
            }
        }
        dl {
            dt{
                padding: 30px 0;
            }
            dt, dd{
                font-size:18px;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:16px;
            }
            dd > a{
                display: block;
                text-align: center;
                margin-top: 20px;
                font-size: 21px;
                margin-bottom: 20px;
            }
        }
    }
</style>
