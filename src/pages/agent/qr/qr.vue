<template>
    <div class="qr">
        <div class="banner">
            <img :src="src1" alt="">
        </div>
        <div class="qr-code">
            <a class="btn_2" @click.stop="goRegsiter">立即注册</a>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "qr",
        data() {
            return {
                src1: require('./images/qr.jpg'),
                routerObj: null
            }
        },
        created() {
            this.routerObj = this.$route.query;
        },
        methods: {
            goRegsiter() {
                if (this.routerObj.type == 'invite') {
                    this.$router.push({path: '/agent/free-register', query: this.routerObj});
                } else {
                    this.$router.push({path: '/agent/register', query: this.routerObj});
                }
            }
        },
        components: {}
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

            .qr-img {
                position: absolute;
                width: 90px !important;
                height: 90px !important;
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

        a.btn_2 {
            height: 44px;
            background: #fff;
            border-radius: 22px;
            font-size: 18px;
            text-align: center;
            line-height: 44px;
            color: #293CD3;
            display: inline-block;
            margin: 25px 30px;
            width: 88%;
        }
    }
</style>
