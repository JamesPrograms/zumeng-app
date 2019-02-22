<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="card msg-verification">
            <h1 class="card-title">短信验证</h1>
            <p>短信已发送至&nbsp;<span class="tel">{{tel | encryptTelNo}}</span>&nbsp;的手机号</p>
            <div class="input-group">
                <span>验证码</span>
                <input type="number" placeholder="请输入6位验证码">
            </div>
            <div class="btn-wrap">
                <button class="custom-btn-big" @click="util.goPage('myBankCard')">确认</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "verifyBankcard",
        data() {
            return {
                tel: '13688564953'
            }
        },
        filters: {
            encryptTelNo: function (value) {
                return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');

            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .msg-verification {
        .card-title {
            margin-bottom: .4rem;
        }
        p {
            font-family: @font-family-medium;
            font-size: .24rem;
            color: #353535;
            margin-bottom: .6rem;
            .tel {
                font-size: .32rem;
                color: @black;
            }
        }
    }

</style>
