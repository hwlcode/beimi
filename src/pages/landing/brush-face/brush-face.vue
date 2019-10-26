<template>
    <div class="brush-face">
        <div>
            <img :src="img" alt="" width="100%">
            <router-link class="register-btn" :to="{path: '/agent/free-register', query: routerObj}">立即注册</router-link>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "brush-face",
        data() {
            return {
                img: require('./images/shualian.jpg'),
                routerObj: null
            }
        },
        created() {
            this.routerObj = this.$route.query;
        }
    };
</script>

<style lang="less" scoped>
    .brush-face {
        .register-btn {
            display: block;
            background: #321B90;
            color: #fff;
            font-size: 18px;
            border-radius: 22px;
            height: 44px;
            line-height: 44px;
            text-align: center;
            margin: 0 30px;
        }
    }
</style>
