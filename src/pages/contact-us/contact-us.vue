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
                    <x-input title="" placeholder="" v-model="helpContent"></x-input>
                </group>
                <group title="* 您的问题或评论" label-width="0" label-align="right" class="form-item">
                    <x-input title="" placeholder="" v-model="question"></x-input>
                </group>
                <x-button type="default" class="form-btn" @click.native="commitForm">比较贷方</x-button>
                <div class="map">
                    <baidu-map class="bai-map" ak="zvWg6ieHbzdajEfFnki4ObZCtjCXGDUs" :center="{lng: 113.920949, lat: 22.589123}" :zoom="15">
                    </baidu-map>
                    <div class="contact-s">
                        <ul>
                            <li><i class="icon icon-1"></i>15112339298</li>
<!--                            <li><i class="icon icon-1"></i>188 6666 6666</li>-->
                            <li>
                                <i class="icon icon-1"></i>0755-85245354
                                <p class="work">周一至周五| 上午9点至晚上9点</p>
                            </li>
                            <li><i class="icon icon-1"></i>
                                <p class="address">广东省深圳市宝安区新安街道留仙二路61号</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import header from '../../components/header';
    import footerComponent from '../../components/footer/index';
    import {public_methods} from '../../assets/js/public_method';
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue';

    export default {
        name: "contact-us",
        data() {
            return {
                name: '',
                phone: '',
                wechat: '',
                email: '',
                question: '',
                helpContent: '',
            }
        },
        methods: {
            commitForm() {
                if (this.name == '') {
                    this.toast('请输入您的全名');
                    return
                }
                if (this.phone == '') {
                    this.toast('请输入您的手机号码');
                    return
                }
                if (this.helpContent == '') {
                    this.toast('请输入我们能帮到的内容');
                    return
                }
                if (this.question == '') {
                    this.toast('请输入您的问题或全名');
                    return
                }
                let url = public_methods.api.contactUs;
                this.axios.post(url, {
                    name: this.name,
                    phone: this.phone,
                    wechat: this.wechat,
                    email: this.email,
                    helpContent: this.helpContent,
                    question: this.question
                }).then(response => {
                        let data = response.data;

                        if (data.errorCode === 0) {
                            this.toast('您的信息己提交，我们会尽快处理。')
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            toast(text) {
                this.$vux.toast.show({
                    type: 'text',
                    text: text,
                    width: '80%',
                    position: 'top'
                });
            }
        },
        components: {
            'v-header': header,
            'v-footer': footerComponent,
            BaiduMap
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
                .bai-map{ height: 200px; width: 100%;}
            }
        }
        .contact-s{
            background: #5369E8;
            padding: 40px 100px 40px 40px;
            color: #fff;
            ul {
                li {
                    font-size: 16px; font-weight: 700; padding: 10px 0; border-bottom: 1px #667CFD dashed;
                    p{
                        font-size: 7px;
                        text-align: left;
                        margin-bottom: 0;
                        &.work{
                            font-size: 6px; color:#B8C2FF;
                        }
                        &.address{ display: inline;}
                    }
                    &:last-child{ border: 0;}
                    .icon{
                        display: inline-block; width: 17px; height: 17px;
                        background-size: contain; background-repeat: no-repeat;
                        margin-right: 5px; vertical-align: middle; margin-top: -4px;
                        &.icon-1{
                            background-image: url("./images/icon-1.png");
                        }
                        &.icon-2{
                            background-image: url("./images/icon-2.png");
                        }
                        &.icon-3{
                            background-image: url("./images/icon-3.png");
                        }
                        &.icon-4{
                            background-image: url("./images/icon-4.png");
                        }
                    }
                }
            }
        }
    }
</style>
