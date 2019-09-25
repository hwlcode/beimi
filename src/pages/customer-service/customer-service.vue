<template>
    <div class="agreement-detail">
        <v-header :showLogin="false"></v-header>
        <div class="agreement">
            <h1>西安恒生客户服务保证</h1>
            <h2>我们对您的承诺：</h2>
            <p>我们将始终超越您的期望，有效地匹配您与全国各地的放款方，贷款顾问，并提供及时的沟通。</p>
            <h2>我们是来帮忙的：</h2>
            <p>Beimi客户服务保证让您知道您可以和应该从Beimi得到什么，以及我们每天都在做什么来让自己负起责任。</p>
            <p>1。如果我们为您提供贷款，我们将在您的申请完成后72小时内提供。</p>
            <p>西安恒生的技术建立在多年的经验之上。我们有超过70多个合作伙伴，可以很快将您匹配到最适合您需要的贷款人，为您节省时间和金钱。</p>
            <p>2。我们将以礼貌和尊重的态度对待你。</p>
            <p>我们招募、培训、发展和保留具有高度诚信、智慧和经验的专业人士。我们的客户代表和客户经理将以专业的方式进行自我管理，将他们的知识清晰、主动地传达给您。</p>
            <h2>三。我们将及时回答您的问题</h2>
            <p>电话：0755-85245354</p>
            <p>实时聊天：立即开始聊天</p>
            <p>或电子邮件：fengniao@keji.partner.onmschina.cn</p>
            <p>对于大多数请求，我们将在同一个工作日回复，对于所有请求，我们将在工作日24小时内回复，周末72小时内回复。</p>
            <h2>我们不保证资金：</h2>
            <p>西安恒生给了你70%的机会获得小企业贷款的批准。但是，我们不保证你会得到商业贷款。</p>
            <p>如果您对本担保或您与我们的合作经历有任何想法或想法，我们邀请您通过电子邮件<a href="mailto:">fengniao@keji.partner.onmschina.cn</a>与我们分享您的反馈。我们重视您的反馈，并将利用它来提升您未来的体验。</p>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import footerComponent from '../../components/footer/index';
    import headerComponent from '../../components/header/index';
    export default {
        name: "agreement-detail",
        components: {
            'v-header': headerComponent,
            'v-footer': footerComponent
        }
    };
</script>

<style lang="less" scoped>
    .agreement-detail{
        margin-top: 50px;
        .agreement {
            padding: 40px 20px;
            /*background-size: cover;*/
            /*background-repeat: no-repeat;*/
            /*background-position: top center;*/
            /*background-image: url("./images/1.png");*/

            h1 {
                font-size: 20px;
                color: #323232;
                font-weight: 700;
                margin-bottom: 10px;
            }

            p {
                font-size: 9px;
                color: #646464;
                margin-bottom: 30px;
            }

            h2{
                font-size: 12px; color: #323232; font-weight: 700; margin-bottom: 10px;
            }
            a{
                font-size: 12px; color: #5369E8; font-weight: 700; margin-bottom: 20px; display: block;
            }
            h3{
                font-weight: 700; font-size: 14px; color: #323232; margin-bottom: 10px;
            }
        }
    }
</style>
