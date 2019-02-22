<template>
    <div class="input-wrap">
        <span class="input-icon">
            <img :src="inputAttr.iconSrc">
        </span>
        <!--此处子组件和父组件通信利用引用对象的特性，当inputAttr.value改变时，父组件的inputAttr.value也会跟着改变-->
        <input :type="inputAttr.type" v-model.trim="inputAttr.value" :placeholder="inputAttr.placeholder">
    </div>
</template>

<script>
    export default {
        name: 'myInput',
        props: {
            inputAttr: Object
        }
    }
</script>

<style lang="less" scoped>

</style>
