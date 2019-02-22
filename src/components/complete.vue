<template>
    <div class="complete-warp">
        <img src="../assets/image/icon/icon_success.png" alt="">
        <p v-html="content"></p>
        <button class="custom-btn-big" @click="util.goPage(backPath)">完成</button>
    </div>
</template>

<script>
    export default {
        name: "complete",
        props: {
            content: {
                type: String,
                default: 'test content'
            },
            backPath: {
                type: String
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/style/variable";

    .complete-warp {
        padding-left: .3rem;
        padding-right: .3rem;
        text-align: center;
        img {
            width: 2rem;
            height: 2rem;
            margin-top: 1.6rem;
            margin-bottom: .6rem;
        }
        p {
            font-family: @font-family-medium;
            font-size: .4rem;
            color: @black;
            line-height: .54rem;
            margin-bottom: 1.9rem;
        }
    }
</style>
