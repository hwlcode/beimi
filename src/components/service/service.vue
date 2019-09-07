<template>
    <div class="service">
        <div class="service-icon" :style="{'bottom': sBottom + '%'}">
            <i class="s-icon"></i>
            <span>咨询客服</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            sBottom: {
                type: Number,
                defalt: 20
            }
        },
        name: "service"
    };
</script>

<style lang="less" scoped>
    .service {
        .service-icon {
            position: fixed;
            background-color: #5369E8;
            border-radius: 3px;
            right: 5px;
            bottom: 20%;
            width: 56px;
            height: 58px;
            text-align: center;
            .s-icon {
                display: inline-block;
                width: 50px;
                height: 40px;
                background: url("./images/service@2x.png") no-repeat center center;
                background-size: contain;
            }
            span{
                color: #fff; font-size: 7px;
                display: block;
                text-align: center;
                margin-top: -10px;
            }
        }
    }
</style>
