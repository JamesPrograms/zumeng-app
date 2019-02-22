<template>
    <div class="tag-btn-wrap">
        <span class="tag-btn" :class="{ 'stress-tag': btnInfo.hasStressStyle }" @click="jumpToPage(btnInfo.jumpPath)" v-for="btnInfo in btnInfos">{{ btnInfo.content }}</span>
    </div>
</template>

<script>
    export default {
        name: "tagBtn",
        props: {
            btnInfos: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        methods: {
            jumpToPage(path) {
                this.util.goPage(path);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/style/variable";
    .tag-btn-wrap {
        padding: 0.18rem 0;
        display: flex;
        justify-content: flex-end;
        .tag-btn {
            display: inline-block;
            margin-right: .2rem;
            background-color: @white;
            border: solid 1px #dddddd;
            font-family: @font-family-regular;
            font-size: .28rem;
            color: #353535;
            padding: .2rem .4rem;
            border-radius: 34px;
            &:last-child {
                margin-right: 0;
            }
        }
        .stress-tag {
            background-color: #ebfffd;
            border-color: #0ec6b5;
            color: #0ec6b5;
        }
    }
</style>
