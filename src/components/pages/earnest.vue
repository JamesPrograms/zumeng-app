<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="content">
            <p><span class="amount">{{earnestInfo.amount}}</span>元</p>
            <p>冻结{{earnestInfo.frozenMoney}}元，可提现{{earnestInfo.amount-earnestInfo.frozenMoney}}元</p>
            <button class="custom-btn-big" @click="withdraw">提现</button>
            <p>
                提现需扣除1%的手续费
                <br>
                不提现可抵扣你下次租房的订金
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "earnest",
        data() {
            return {
                earnestInfo: {
                    amount: 220,
                    frozenMoney: 200
                }
            }
        },
        methods: {
            withdraw: function () {
                const that = this;
                this.axios.post({
                    url: '/user-service/account/withdrawCash',
                    data: {
                        amount: this.earnestInfo.amount - this.earnestInfo.frozenMoney,
                    },
                    loading: true,
                    sucFunc: function (response) {
                        that.util.goPage('setting');
                    }
                });
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
            font-size: .4rem;
            color: @black;
            &:first-child {
                font-size: .24rem;
                color: #353535;
                margin-top: 1.6rem;
                margin-bottom: 1rem;
            }
            &:last-child {
                font-size: .24rem;
                color: @gray;
                line-height: .4rem;
            }
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
