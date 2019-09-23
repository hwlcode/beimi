<template>
    <div class="step-container">
        <x-header :left-options="{backText:'', preventGoBack: true}" @on-click-back="handleBack">{{list[step].title}}
        </x-header>
        <tab :scroll-threshold="5" bar-active-color="#fff" default-color="#AAB6F7" active-color="#fff">
            <tab-item
                v-for="(item, index) in list"
                :key="index"
                :selected="index===step"
                @on-item-click="handleItemClick">{{item.title}}
            </tab-item>
        </tab>
        <div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <!--        <div style="padding: 0 20px 20px 20px;">-->
        <!--            <x-button :gradients="['#546BE0', '#546BE0']" @click.native="handleNextStep" style="border-radius:99px;">下一步</x-button>-->
        <!--        </div>-->
    </div>
</template>

<script>
    export default {
        name: 'step-component',
        data() {
            return {
                step: 0,
                list: [
                    {title: '贷款需求', value: 'demand'},
                    {title: '个人信息', value: 'information'},
                    {title: '公司信息', value: 'company'},
                    {title: '企业信用', value: 'credit'},
                    {title: '企业贷款', value: 'loan'}
                ]
            }
        },
        created() {
            // if (this.step === 0) {
            //     this.handleSwitchComponent(this.list[0].value)
            // }
        },
        watch: {
            $route(to, from) {
                this.list.forEach((item,index) =>{
                    if(this.$route.path.indexOf(item.value) != -1){
                        this.step = index;
                    }
                });
            }
        },
        mounted() {

        },
        methods: {
            handleItemClick(index) {
                this.step = index;
                this.$router.push({
                    name: this.list[index].value
                })
            },
            handleBack() {
                if (this.step > 0) {
                    this.step--;
                    this.handleSwitchComponent(this.list[this.step].value)
                } else {
                    this.$router.push({
                        name: 'index'
                    })
                }
            },
            handleSwitchComponent(name) {
                this.$router.push({
                    name
                })
            },
            handleNextStep() {
                if (this.step < 4) {
                    this.step++;
                    this.handleSwitchComponent(this.list[this.step].value)
                } else {

                }
            }
        }
    }
</script>

<style lang="less">
    .step-container {
        .vux-tab {
            background-color: #546BE0 !important;
        }
    }
</style>
