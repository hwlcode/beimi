<template>
    <div class="contact-us">
        <v-header :show-login="false"></v-header>
        <div class="c-form">
            <h1>联系我们</h1>
            <p>我们很乐意听取您的意见并回答您的任何问题</p>
            <div class="form-box">
                <group title="* 您的全名" label-width="0" label-align="right" class="form-item">
                    <x-input title="" placeholder="" v-model="name"></x-input>
                </group>
                <group title="* 您的手机号" label-width="0" label-align="right" class="form-item">
                    <x-input title="" placeholder="" v-model="phone"></x-input>
                </group>
                <group title="您的微信号" label-width="0" label-align="right" class="form-item">
                    <x-input title="" placeholder="" v-model="wechat"></x-input>
                </group>
                <group title="您的邮箱电址" label-width="0" label-align="right" class="form-item">
                    <x-input title="" placeholder="" v-model="email"></x-input>
                </group>
                <group title="* 我们能帮到你什么?" label-width="0" label-align="right" class="form-item">
                    <x-input title="" placeholder="" v-model="question"></x-input>
                </group>
                <group title="* 您的问题或评论" label-width="0" label-align="right" class="form-item">
                    <x-input title="" placeholder="" v-model="commit"></x-input>
                </group>
                <x-button type="default" class="form-btn">比较贷方</x-button>
                <div class="map">
                    <img :src="img1" alt="">
                </div>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import header from '../../components/header';
    import footerComponent from '../../components/footer/index';

    export default {
        name: "contact-us",
        data() {
            return {
                name: '',
                phone: '',
                wechat: '',
                email: '',
                question: '',
                commit: '',
                img1: require('./images/2.jpg')
            }
        },
        components: {
            'v-header': header,
            'v-footer': footerComponent
        }
    };
</script>

<style lang="less" scoped>
    .contact-us {
        background: #f1f4fd;
        margin-top: 50px;
        .c-form {
            background-image: url("images/1.jpg");
            background-position: top center;
            background-size: contain;
            background-repeat: no-repeat;

            h1 {
                color: #fff;
                font-size: 20px;
                text-align: center;
                padding: 25px 0 10px 0;
            }

            p {
                font-size: 12px;
                color: #fff;
                text-align: center;
                margin-bottom: 30px;
            }

            .form-box {
                margin: 20px 17px;
                background: #fff;
                padding: 10px;
            }

            .form-btn {
                background: #5369e8;
                border-radius: 30px;
                width: 60%;
                margin: 20px auto;
                color: #fff;
            }

            .map {
                margin-bottom: 10px;
                img {
                    width: 100%;
                }
            }
        }
    }
</style>
