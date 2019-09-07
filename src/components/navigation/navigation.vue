<template>
    <div class="navigation">
        <h1>
            <x-button class="go-back-bth" @click.native="back">返回</x-button>
            {{title}}
        </h1>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "navigation",
        props: ['title'],
        methods:{
            back(){
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/');
            }
        }
    };
</script>

<style lang="less" scoped>
    @import '~css/beimi.less';

    .navigation {
        h1 {
            position: relative;
            background: #EDEDED;
            height: 40px;
            color: #323232;
            text-align: center;
            line-height: 40px;
            font-size: 18px;

            /deep/ .weui-btn:after {
                border: 0
            }

            .go-back-bth {
                position: absolute;
                width: 70px;
                left: 15px;
                top: 5px;
            }
        }
    }
</style>
