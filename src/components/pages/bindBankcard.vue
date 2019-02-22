<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="card">
            <h1 class="card-title">绑定银行卡</h1>
            <div class="input-group">
                <span>持卡人</span>
                <p>{{bankcardOwner|encryptName}}</p>
            </div>
            <div class="input-group">
                <span>卡号</span>
                <input type="text" placeholder="请输入您的银行卡号">
            </div>
            <div class="input-group">
                <span>手机号</span>
                <input type="text" placeholder="请输入您的预留手机号码">
            </div>
            <div class="btn-wrap">
                <button class="custom-btn-big" @click="util.goPage('verifyBankcard')">下一步</button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "bindBankcard",
        data() {
            return {
                bankcardOwner: '李孝利'
            }
        },
        filters: {
            encryptName: function (str) {
                return str.replace(/^.(.+)(.)$/, "*$1$2");
            }
        }
    }
</script>

<style lang="less" scoped>
    .card-title {
        margin-bottom: .4rem;
    }
</style>
