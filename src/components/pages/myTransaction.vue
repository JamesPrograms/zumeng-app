<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="card">
            <h1 class="card-title">交易记录</h1>
            <div class="transactions-wrap">
                <div class="transaction-list" v-for="(list,index) in myTransactions" :key="index">
                    <div class="transaction-content">
                        <p>{{list.content}}</p>
                        <p :class="{'pay':list.type=='pay','income':list.type=='income'}">
                            {{list.type == "pay"?'-':"+"}}
                            {{list.amount}}
                        </p>
                    </div>
                    <p class="transaction-datetime">{{list.datetime}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "myTransaction",
        data() {
            return {
                myTransactions: []
            }
        },
        methods: {
            getData: function () {
                const that = this;
                this.axios.get({
                    url: '/payment-service/getMyOrders',
                    loading: true,
                    data: {
                        pageIndex: 1,
                        pageSize: 10
                    },
                    sucFunc(response) {
                        that.myTransactions = response.data;
                    }
                });
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .card {
        padding-right: 0;
        padding-left: 0;
        .card-title {
            padding-left: .2rem;
            padding-right: .2rem;
            margin-bottom: .3rem;
        }
    }

    .transactions-wrap {
        border-top: 1px solid #dddddd;
        padding-left: .2rem;
        padding-right: .2rem;
        padding-bottom: 1.4rem;
        .transaction-list {
            padding-top: .3rem;
            padding-bottom: .3rem;
            border-bottom: 1px solid #dddddd;
            .transaction-content {
                display: flex;
                p:first-child {
                    flex-grow: 1;
                    font-family: @font-family-medium;
                    font-size: .28rem;
                    color: @black;
                    margin-bottom: .2rem;
                }
                p:last-child {
                    font-family: @font-family-bold;
                    font-size: .32rem;
                    &.pay {
                        color: @black;
                    }
                    &.income {
                        color: @theme-color;
                    }
                }

            }
            .transaction-datetime {
                font-size: .2rem;
                color: #b2b2b2;
            }
        }
    }
</style>
