<template>
    <div class="footer-wrapper">
        <div class="footer">
            <dl>
                <dt>0755 - 8524 5354</dt>
                <dd>周一至周五| 上午9点至晚上9点</dd>
            </dl>
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <div class="link">
                <router-link to="/contact-us">联系我们</router-link>
                <span>/</span>
                <router-link to="/about-us">关于我们</router-link>
                <span>/</span>
                <router-link to="/agreement">条款与协议</router-link>
<!--                <span>/</span>-->
<!--                <router-link to="/">商务合作</router-link>-->
                <span>/</span>
                <router-link to="/join-in">申请加盟</router-link>
            </div>

        </div>

        <div class="copyright">
            版权所有©2019 Lendio。版权所有。使用条款 隐私政策<br>
            4100 Chapel Ridge Road，Suite 500，Lehi，UT 84043
        </div>
    </div>
</template>

<script>
    export default {
        name: 'footerComponent',
        data() {
            return {}
        },
        mounted() {

        },
        methods: {}
    }
</script>

<style lang="less" scoped>
    .footer{
        background-color:rgba(241,241,241,1);
        padding: 20px;
        position: relative;
        & > dl{
            dt{
                height: 18px;
                font-size: 18px;
                font-weight:bold;
                color:rgba(83,105,232,1);
                line-height:18px;
                padding-left: 22px;
                background: url(images/7.png) no-repeat 0 0;
                background-size: 18px 18px;
            }
            dd {
                font-size:12px;
                font-weight:400;
                color:rgba(150,150,150,1);
                line-height: 32px;
                opacity:0.96;
            }
        }
        & > ul{
            position: absolute;
            right: 20px;
            top: 20px;
            height: 34px;
            width: 122px;
            & > li{
                height: 34px;
                width: 34px;
                background-position: 0 0;
                background-repeat: no-repeat;
                background-size: 34px 34px;
                margin-right: 10px;
                float: left;
                &:nth-child(1){
                    background-image: url(images/8.png);
                }
                &:nth-child(2){
                    background-image: url(images/9.png);
                }
                &:nth-child(3){
                    background-image: url(images/10.png);
                    margin-right: 0;
                }
            }
        }
        & > .link{
            padding: 10px 0 0 0;
            text-align: center;
            font-size: 12px;
            font-weight:400;
            color: rgba(50, 50, 50, 1);
            & > span{
                margin: 0 20px;
            }
        }
    }
    .copyright{
        text-align: center;
        padding: 10px 0 18px 0;
        background-color:rgba(241,241,241,1);
        border-top: 1px solid #ddd;
        font-size: 11px;
        font-weight:400;
        color:rgba(150,150,150,1);
        line-height: 20px;
    }
</style>
