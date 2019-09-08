<template>
    <div class="get-loan-now">
        <div class="action">
            <h4>立即获取您的小企业贷款</h4>
            <div>
                <input type="text" placeholder="￥你需要多少钱？" style="width: 230px;" v-model="needMoney"><router-link :to="{ name: 'step'}" class="common-small-bth" style="width: 85px;" @click.native="setNeedMoney">开始</router-link>
            </div>
            <dl>
                <dt>申请是免费的，不会影响您的信用</dt>
                <dd>已经有账号？<router-link to="/login" style="color: #64E1FB; font-weight: 500;">登录</router-link></dd>
            </dl>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "get-loan-now",
        data() {
            return {
                needMoney: ''
            }
        },
        methods: {
            setNeedMoney() {
                this.$store.commit('SET_NEED_MONEY', this.needMoney || 0);
            }
        }
    };
</script>

<style lang="less" scoped>
    @import '~css/beimi.less';
    .action{
        background: rgba(83, 105, 232, 1);
        padding-bottom: 20px;
        text-align: center;
        h4{
            font-size:20px;
            font-weight:400;
            color:rgba(255,255,255,1);
            padding: 30px 20px 20px;
        }
        & > div {
            padding-bottom: 20px;
            & > input{
                width: 130px;
                height: 27px;
                // background:rgba(255,255,255,0.2);
                // border:1px solid rgba(160,160,160,1);
                border-radius: 13px;
                line-height: 27px;
                padding: 0 10px;
                font-size: 13px;
                color: #eee;
                background: #7688E6;
            }
            & > input::-webkit-input-placeholder{
                color: #eee;
            }
            & > a{
                margin-left: 10px;
                background-color: rgba(0, 228, 255, 1);
            }
        }
        dl {
            dt{
                padding-bottom: 8px;
            }
            dt, dd{
                font-size:13px;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:16px;
            }
        }
    }
</style>
