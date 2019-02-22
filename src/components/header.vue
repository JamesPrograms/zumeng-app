<template>
    <mt-header :title="$store.state.headerInfo.title" class="my-header is-fixed">
        <mt-button slot="left" icon="back" v-if="$store.state.headerInfo.hasBackBtn" @click="util.goBack"></mt-button>
    </mt-header>
</template>

<script>
    import { Header } from 'mint-ui';
    export default {
        name: 'myHeader',
        components: {
            mtHeader: Header
        },
        methods: {
            // 点击返回按钮返回上一个路由
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="less" scoped>

</style>