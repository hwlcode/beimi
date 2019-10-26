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
                <dd>这是您与西安恒生众利金融服务有限公司及其关联主体Beimi之间的一份法律协议，您访问本网站（<a href="https://www.huoxsq.cn" style="display: inline-block;">https://www.huoxsq.cn</a>)和本网站的任何子网站（统称为“网站”），和/或使用通过本网站可访问的任何服务（定义见下文），您将成为用户，并同意并受本协议和Beimi隐私政策，只要你继续使用该网站或服务，如果您不同意受本条款约束，请不要使用本网站或本服务。您使用或参与某些服务可能需要附加条款，这些条款将在其附加条款中列出，或在您注册使用此类服务或购买此类产品时提交给您同意。...</dd>
            </dl>
            <dl>
                <dt>
                    <span>隐私政策</span>
                    <router-link to="/privacy">阅读协议&gt;&gt;</router-link>
                </dt>
                <dd>本网站由Beimi拥有和运营。我们希望您了解我们收集的信息，我们如何保护这些信息，以及我们如何使用您的信息。本隐私政策适用于我们通过Beimi网站和其他方式收集的信息。您对Beimi网站和我们的服务的使用受本隐私政策和使用条款的约束。</dd>
            </dl>
            <dl>
                <dt>
                    <span>客户服务保证</span>
                    <router-link to="/customer-service">阅读协议&gt;&gt;</router-link>
                </dt>
                <dd>
                    我们对您的承诺：<br/>
                    我们将始终超越您的期望，有效地匹配您与全国各地的放款方，贷款顾问，并提供及时的沟通。<br/>
                    我们是来帮忙的：<br/>
                    Beimi客户服务保证让您知道您可以和应该从Beimi得到什么，以及我们每天都在做什么来让自己负起责任。
                </dd>
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
