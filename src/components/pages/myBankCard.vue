<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="my-bankcard-wrap" v-if="myBankcardInfo.length">
            <div class="bankcard-wrap" v-for="(item,index) in myBankcardInfo" :key="index">
                <p class="bank-logo"><img src="../../assets/image/icon/jianshe_bank.png" alt="">{{item.bankName}}</p>
                <p class="bankcard-num">{{item.bankcardNo | encryptBankcardNo}}</p>
                <img class="bank-logo-bj" src="../../assets/image/icon/jianshe_bank.png" alt="">
            </div>
            <p class="tip-msg"><img src="../../assets/image/icon/warning_icon.png" alt="">为了保障资金安全，只允许绑定xxx本人的银行卡。</p>
        </div>
        <div class="no-bankcard-wrap" v-else>
            <img src="../../assets/image/img_nocard.png" alt="">
            <p>为了保障资金安全<br>只允许绑定xxx本人的银行卡</p>
            <div class="btn-wrap">
                <button class="custom-btn-big" @click="util.goPage('bindBankcard')">立即绑定</button>
            </div>
        </div>
        <div class="bottom-btn-wrap" v-if="myBankcardInfo.length">
            <button class="custom-btn-big" @click="util.goPage('bindBankcard')">重新绑定</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "myBankCard",
        data() {
            return {
                myBankcardInfo: []
            }
        },
        methods: {
            getMyBankcard: function () {
                const that = this;
                this.axios.post({
                    url: '/user-service/account/getMyBankcard',
                    loading: true,
                    sucFunc(response) {
                        that.myBankcardInfo = response.data;
                    }
                });
            }
        },
        filters: {
            encryptBankcardNo: function (value) {
                return value.replace(/\s/g, '').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2")
            }
        },
        mounted() {
            this.getMyBankcard();
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .my-bankcard-wrap {
        padding: .2rem .3rem;
        .bankcard-wrap {
            position: relative;
            padding: .8rem .4rem;
            background: linear-gradient(to right, #1c90ff, #3176ff);
            border-radius: 4px;
            color: @white;
            .bank-logo {
                img {
                    width: .48rem;
                    height: .48rem;
                    vertical-align: text-bottom;
                    margin-right: .16rem;
                }
                font-family: @font-family-medium;
                font-size: .32rem;
                margin-bottom: .45rem;
            }
            .bankcard-num {
                font-size: .36rem;
            }
            .bank-logo-bj {
                position: absolute;
                top: -1rem;
                right: -0.2rem;
                width: 4rem;
                height: 4rem;
                opacity: 0.05;
            }
        }
    }

    .no-bankcard-wrap {
        text-align: center;
        img {
            width: 2rem;
            height: 2rem;
            margin-top: 2.5rem;
            margin-bottom: 1.1rem;
        }
        p {
            font-family: @font-family-medium;
            font-size: .3rem;
            line-height: .48rem;
            color: @gray;
            margin-bottom: 1rem;
        }
        .btn-wrap {
            padding-left: 1.75rem;
            padding-right: 1.75rem;
        }
    }
</style>
