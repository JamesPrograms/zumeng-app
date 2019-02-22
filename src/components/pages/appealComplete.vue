<template>
    <div class="wrapper">
        <v-header></v-header>
        <v-complete :content="contentStr" :backPath="path"></v-complete>
    </div>
</template>

<script>
    import vComplete from '../complete'

    export default {
        name: "modifyComplete",
        components: {
            vComplete
        },
        data() {
            return {
                contentStr: '您的申诉请求已受理<br>我们将在3个工作日内为您处理',
                path: '/myHouseResource'
            }
        }
    }
</script>

<style scoped>

</style>
