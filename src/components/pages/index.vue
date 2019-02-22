<template>
    <div>
        <!--header组件-->
        <v-header class="is-fixed"></v-header>

        <!--页面容器-->
        <main>
            <!--<div style="height: 1000px">dd</div>-->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </main>

        <!--tabbar-->
        <tabbar></tabbar>
    </div>

</template>

<script>
    // 引入tabbar组件
    import tabbar from '../tabbar';

    export default {
        name: 'index',
        components: {
            tabbar
        }
    }
</script>