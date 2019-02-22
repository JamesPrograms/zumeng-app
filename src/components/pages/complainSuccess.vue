<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="main-content">
            <img src="../../assets/image/icon/icon_success.png">
            <p>您的投诉已经提交</p>
            <button class="custom-btn-big" @click="util.goPage('/myIntention/intentionToBeConfirmed')">返回首页</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reserveSuccess",
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .main-content {
        box-sizing: border-box;
        padding-left: .3rem;
        padding-right: .3rem;
        padding-top: 0;
        text-align: center;
        img {
            width: 2rem;
            height: 2rem;
            margin-top: 1.61rem;
            margin-bottom: .59rem;
        }
        p {
            font-size: .4rem;
            line-height: .54rem;
            margin-bottom: 1.9rem;
        }
    }
</style>
