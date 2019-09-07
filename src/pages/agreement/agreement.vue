<template>
    <div class="agreement">
        <v-header :showLogin="false"></v-header>
        <div class="list">
            <h1>条款和协议</h1>
            <p>如果您想了解更多关于我们与借款人合作的政策或Lendio与借款人和贷方达成的协议，那么您就是在正确的地方。在这里您可以找到有关我们的隐私政策，我们的客户服务保证以及我们与贷方合作的条款和条件的信息。
                如果您在阅读后仍有疑问，请与<router-link to="/" style="font-weight: 700; font-size: 14px;">我们联系</router-link>。</p>
            <dl>
                <dt>
                    <span>使用条款</span>
                    <router-link to="/agreement-detail">阅读协议&gt;&gt;</router-link>
                </dt>
                <dd>这是您和特拉华州Lendio公司（“Lendio”）之间的法律协议，可以通过10235 South Jordan Gateway，Suite 410，South Jordan，UT 84095联系。通过访问本网站，以及任何子网站本网站的网站（统称“网站”），和/或使用本网站可访问的任何服务（定义如下），您成为用户并同意并受本协议条款和条件的约束只要您继续使用本网站或服务，就可以使用Lendio隐私政策（统称“条款”）。如果您不同意受条款约束，请勿使用本网站或服务。您使用或参与某些服务可能需要遵守其他条款…</dd>
            </dl>
            <dl>
                <dt>
                    <span>隐私政策</span>
                    <router-link to="/agreement-detail">阅读协议&gt;&gt;</router-link>
                </dt>
                <dd>本网站由Lendio，Inc。（“Lendio”）拥有和运营。我们希望您了解我们收集的信息，我们如何保护这些信息以及我们如何使用您的信息。本隐私政策适用于我们通过Lendio网站及其他方式收集的信息。您对Lendio网站和我们服务的使用受本隐私政策和使用条款的约束。</dd>
            </dl>
            <dl>
                <dt>
                    <span>客户服务保证</span>
                    <router-link to="/agreement-detail">阅读协议&gt;&gt;</router-link>
                </dt>
                <dd>Lendio客户服务保证<br/>
                    我们对您的承诺：<br/>
                    通过有效地将您与全国各地的活跃贷方进行匹配并提供及时沟通，我们将始终超越您的期望。</dd>
            </dl>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import footerComponent from '../../components/footer/index';
    import headerComponent from '../../components/header/index';
    export default {
        name: "agreement",
        components: {
            'v-header': headerComponent,
            'v-footer': footerComponent
        }
    };
</script>

<style lang="less" scoped>
.agreement{
    margin-top: 50px;
    .list{
        padding: 40px 20px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top center;
        background-image: url("./images/1.jpg");
        h1{
            text-align: center;color:#fff; font-size: 20px; font-weight: 700;
        }
        p{ text-align: center;color:#fff; font-size: 10px; margin-bottom: 30px;}
        dl{background: #fff; border-radius: 5px; padding: 20px; margin-bottom: 20px;
            dt{
                display: flex;
                margin-bottom: 10px;
                span{flex:1; font-size: 14px; color: #323232; font-weight: 700;}
                a{flex: 1; text-align: right; color: #5369E8; font-size: 11px;}
            }
            dd{font-size: 9px; color: #646464;}
        }

    }
}
</style>
