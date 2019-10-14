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
        },
        mounted() {
            let path = this.$route.path;
            if (path.indexOf('demand') != -1) {
                this.step = 0;
            } else if (path.indexOf('information') != -1) {
                this.step = 1;
            } else if (path.indexOf('company') != -1) {
                this.step = 2;
            } else if (path.indexOf('credit') != -1) {
                this.step = 3;
            } else if (path.indexOf('loan') != -1) {
                this.step = 4;
            }
        },
        watch: {
            $route(to, from) {
                this.list.forEach((item, index) => {
                    if (this.$route.path.indexOf(item.value) != -1) {
                        this.step = index;
                    }
                });
            }
        },
        methods: {
            handleItemClick(index) {
                this.step = index;
                this.$router.push({
                    name: this.list[index].value
                });
                this.$store.commit('SET_CURRENT_TAB_PAGE', 1);
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
            },
            toast(text) {
                this.$vux.toast.show({
                    type: 'text',
                    text: text,
                    width: '80%',
                    position: 'top'
                });
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
