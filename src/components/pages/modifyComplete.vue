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
                contentStr: '预约申请已提交请<br>耐心等待对方确认预约',
                path: '/myHouseResource'
            }
        }
    }
</script>

<style scoped>

</style>
