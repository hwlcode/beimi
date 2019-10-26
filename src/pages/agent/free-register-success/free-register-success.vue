<template>
    <div class="free-register-success">
        <div class="a-header">
            <p class="welcome">您好！{{userName}}</p>
            <p>恭喜您注册成功</p>
            <i class="icon-checked"></i>
        </div>
        <div class="msg">
            <p class="title">您目前处于预审审批流程中</p>
            <p>恭喜！根据筛选，您的资质似乎符合我们的要求。</p>
            <p class="bold">下一步：我们的客服将致电您确认您的信息并帮您
                开通业务。如果您想立即与客服联系，请致电您的客服
                并提供客户编号#23kkjd</p>
        </div>
        <div class="contact">
            <div class="icon-user-bg"><i class="icon-user"></i></div>
            <p class="name">{{name}}</p>
            <p class="user-ce">客服</p>
            <p class="user-phone">{{phone}}</p>
            <p class="user-tips">{{name}}正在那里准备接听你的电话</p>
            <div class="flex-box">
                <a href="javascript:;" class="btn_1" @click.stop="trigger()"><i class="icon-headphones"></i> 联系客服</a>
                <a :href="'tel:' + phone" class="btn_2"><i class="icon-phones"></i> 打我电话</a>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "free-register-success",
        data() {
            return {
                name: '',
                phone: '',
                userName: '',
                routerObj: null
            }
        },
        created(){
            this.routerObj = this.$route.query;
            this.name = this.routerObj.name || '';
            this.phone = this.routerObj.phone || '';
            this.userName = this.routerObj.userName || '';
        },
        methods: {
            trigger() {
                let zhiManager = (getzhiSDKInstance());
                zhiManager.expand();
            }
        }
    };
</script>

<style lang="less" scoped>
    .free-register-success {
        .a-header {
            background: rgb(84, 107, 224);
            color: #fff;
            font-size: 15px;
            text-align: center;
            padding: 20px 0;

            .welcome {
                font-size: 24px;
                font-weight: 700;
            }

            .icon-checked {
                width: 39px;
                height: 39px;
                background: url("./images/checked.png") no-repeat;
                display: inline-block;
                background-size: contain;
                margin-top: 5px;
            }
        }

        .msg {
            color: #323232;
            text-align: center;
            padding: 20px 44px;

            .title {
                color: #5369E8;
                font-size: 16px;
                font-weight: 700;
            }

            .bold {
                font-weight: 700;
            }
        }

        .contact {
            background: #eee;
            padding-top: 30px;

            .icon-user-bg {
                background: rgb(84, 107, 224);
                width: 125px;
                height: 125px;
                margin: 0px auto 10px auto;
                border-radius: 125px;
                text-align: center;
                padding-top: 28px;

                .icon-user {
                    width: 72px;
                    height: 72px;
                    background: url("./images/support.png") no-repeat;
                    display: inline-block;
                    background-size: contain;
                }
            }

            .name {
                text-align: center;
                color: #323232;
                font-size: 34px;
                font-weight: 700;
            }

            .user-ce {
                text-align: center;
                color: #323232;
                font-size: 21px;
                margin-bottom: 10px;
            }

            .user-phone {
                text-align: center;
                color: #5369E8;
                font-size: 23px;
                font-weight: 700;
            }

            .user-tips {
                text-align: center;
                color: #969696;
                font-size: 11px;
                margin-bottom: 40px;
            }

            .flex-box {
                display: flex;
                padding-bottom: 50px;
                justify-content: space-between;

                a {
                    width: 150px;
                    height: 44px;
                    background: rgba(83, 105, 232, 1);
                    border-radius: 22px;
                    font-size: 18px;
                    text-align: center;
                    line-height: 44px;
                    color: #fff;
                    display: inline-block;
                    margin: 0 30px;

                    .icon-headphones {
                        width: 27px;
                        height: 27px;
                        background: url("./images/headphones.png") no-repeat;
                        display: inline-block;
                        background-size: contain;
                        margin-top: -1px;
                        vertical-align: middle;
                    }

                    .icon-phones {
                        width: 27px;
                        height: 27px;
                        background: url("./images/phone.png") no-repeat;
                        display: inline-block;
                        background-size: contain;
                        margin-top: -1px;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
</style>
