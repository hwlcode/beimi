<template>
    <div class="questions">
        <v-header :showLogin="false"></v-header>
        <div class="list">
            <h1>常见问题解答</h1>
            <p>你有问题，我们有答案</p>
            <dl>
                <dt>我为什么要选择Beimi？</dt>
                <dd>那么，我们是全国最大的小企业贷款市场。没错，我们提供的贷款选择比其他任何人都多。<br/><br/>
                    而且因为我们致力于质量甚至超过数量，我们只有市场上最好的小企业贷方。其中包括美国运通，美国银行，大通，OnDeck，Kabbage等。<br/><br/>
                    我们还有一个15分钟的在线应用程序和专有算法，可以为您的小型企业提供最优惠的贷款 - 以及一个可以引导您完成选择并帮助您选择最佳贷款的个人资金经理团队。<br/><br/>
                    这意味着通过Beimi获得小额商业贷款比通过传统贷方申请更容易。事实上，虽然银行否认80％的小企业主，但我们发现超过65％的申请人获得融资。<br/><br/>
                    我们是否提到您可以在舒适的办公室，甚至沙发上完成所有这些工作？你甚至不需要穿鞋来通过Beimi获得小额商业贷款。<br/><br/>
                    所以真正的问题是：你还在等什么？你可以在15分钟后获得小额商业贷款。无论何时你准备申请我们都在这里......</dd>
                <dt>你是直接贷款人吗？</dt>
                <dd>不，我们不为任何贷款提供资金，所以我们不是贷款人。我们是一个在线借贷市场，这意味着我们只是借款人和贷方之间的桥梁。我们将像您这样的小企业主与我们全国75个以上银行的网络联系起来。<br/><br/>
                    把我们想象成小企业贷款的亚马逊Prime。你购物，然后我们交付。</dd>
                <dt>什么是在线借贷市场？</dt>
                <dd>我们不是春鸡 - 自2011年以来我们一直在帮助小企业主。<br/><br/>
                    这一切都始于我们注意到小企业主找到他们开始和发展业务所需的贷款是多么困难。考虑到99％的中国公司都是小企业，这是一个非常荒谬的问题。<br/><br/>
                    在解决问题的过程中，我们创建了一个解决方案：Beimi。快进几年，我们已帮助超过30,000名小企业主获得超过7.5亿人民币的贷款。因此，当您来到Beimi时，您可以放心地获得专业指导。</dd>
                <dt>您的服务费用是多少？</dt>
                <dd>您通过Beimi申请并浏览我们的小企业贷款选项绝对不收费。与任何贷款一样，您将支付利率或固定费用，但这笔钱将转给您的贷方，而不是我们。</dd>
            </dl>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import footerComponent from '../../components/footer/index';
    import headerComponent from '../../components/header/index';
    export default {
        name: "questions",
        components: {
            'v-header': headerComponent,
            'v-footer': footerComponent
        }
    };
</script>

<style lang="less" scoped>
.questions{
    margin-top: 50px;
    .list{
        background-size: contain;
        background-repeat: no-repeat;
        background-position: top center;
        background-image: url("./images/1.png");
        h1{
            text-align: center;color:#fff; font-size: 20px;padding-top: 40px; font-weight: 700;
        }
        p{ text-align: center;color:#fff; font-size: 10px;  }
        dl{
            padding: 50px 15px;
            dt{
                color:#323232; font-size: 16px; margin-bottom: 5px;
            }
            dd{
                color: #646464; font-size: 9px; margin-bottom: 30px;
            }
        }
    }
}
</style>
