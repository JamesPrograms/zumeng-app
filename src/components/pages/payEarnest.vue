<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="content">
            <p><span class="amount">{{earnestInfo.amount}}</span>元</p>
            <p>感谢费预付10%给平台，</p>
            <p class="last-p">平台将在您签订完购房合同之后给到发布者</p>
            <button class="custom-btn-big" @click="payEarnest">预付定金</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "earnest",
        data() {
            return {
                earnestInfo: {
                    amount: 220
                }
            }
        },
        methods: {
            payEarnest: function () {
                // const that = this;
                // this.axios.post({
                //     url: '/user-service/account/withdrawCash',
                //     data: {
                //         amount: this.earnestInfo.amount - this.earnestInfo.frozenMoney,
                //     },
                //     loading: true,
                //     sucFunc: function (response) {
                //         that.util.goPage('setting');
                //     }
                // });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .content {
        text-align: center;
        p {
            font-family: @font-family-medium;
            font-size: 0.32rem;
            color: @black;
            &:first-child {
                color: #353535;
                margin-top: 1.6rem;
                margin-bottom: 1rem;
            }
        }
        .last-p {
            margin-top: 0.1rem;
        }
        button {
            margin-top: 2rem;
            margin-bottom: .6rem;
        }
    }

    .amount {
        font-family: @font-family-bold;
        font-size: 1.2rem;
        color: @theme-color;
    }
</style>
