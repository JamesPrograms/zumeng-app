<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
    import {Indicator, Progress} from 'mint-ui';

    export default {
        name: 'app',
        created() {
//            Indicator.open('加载中...');
        },
        components: {
            'myProgress': Progress
        }
    }
</script>

<style lang="less">
    #app {
        width: 100%;
        height: 100%;
    }
</style>
