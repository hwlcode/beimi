<template>
    <div class="qr">
        <div class="banner">
            <img :src="src1" alt="">
        </div>
        <div class="qr-code">
            <qrcode :value="QRCodeMsg" type="img" class="qr-img" :size="80"></qrcode>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { Qrcode } from 'vux'
    export default {
        name: "qr",
        data() {
            return {
                src1: require('./images/qr.jpg'),
                src: '',
                QRCodeMsg: "", //生成二维码信息
            }
        },
        created() {
            this.QRCodeMsg = process.env.API_ROOT + '/agent/register';
        },
        methods: {

        },
        components: {
            Qrcode
        }
    };
</script>

<style lang="less" scoped>
    .qr {
        .banner {
            img {
                width: 100%;
            }
        }
        .qr-code {
            background: url("./images/qr02.jpg") no-repeat 0 0;
            background-size: cover;
            height: 149px;
            width: 100%;
            position: relative;
            .qr-img{
                position: absolute;
                width: 90px!important;
                height: 90px!important;
                padding: 5px;
                right: 8%;
                bottom: 33.5%;
                background: #fff;
                border-radius: 5px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
