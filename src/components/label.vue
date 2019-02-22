<template>
    <div class="tag-wrap">
        <div class="tag" v-for="(item, index) in labelArr" :key="index">
            <span class="tag-text" v-html="item"></span>
            <img src="../assets/image/icon/icon_delete.png" @click="delLabel(index)">
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            labelArr: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            delLabel(index) {
                this.labelArr.splice(index, 1)
                this.$emit("delLabel", this.labelArr)
            }
        }
    }
</script>

<style lang="less" scoped>
    .tag-wrap {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .tag {
            display: flex;
            margin-bottom: 0.3rem;

            .tag-text {
                height: 0.68rem;
                padding: 0 0.6rem;
                background-color: #ebfffd;
                border-radius: 0.34rem;
                border: solid 1px #0dc6b6;
                text-align: center;
                box-sizing: border-box;
                line-height: 0.68rem;
            }
            > img {
                width: 0.34rem;
                height: 0.34rem;
                margin-left: 0.11rem;
                align-self: center;
            }
        }
    }
</style>
