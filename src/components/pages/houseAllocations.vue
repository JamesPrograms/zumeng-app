<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="house-allocations card">
            <h1 class="card-title">房间配置</h1>
            <v-allocations v-on:sendData="getData"></v-allocations>
        </div>
        <div class="bottom-btn-wrap">
            <button class="custom-btn-big" @click="next">下一步</button>
        </div>
    </div>
</template>

<script>
    import vAllocations from '../allocations'

    export default {
        name: "houseAllocations",
        components: {
            vAllocations
        },
        data() {
            return {
                allocations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        },
        methods: {
            getData(data) {
                this.allocations[data.i] = data.selected ? 1 : 0;
            },
            next() {
                this.$store.commit('setHouseInfo', {allocations:this.allocations});
                this.util.goPage('commentHouse');
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .house-allocations {
        padding-left: 0;
        padding-right: 0;
        h1 {
            padding-left: .2rem;
            margin-bottom: .5rem;
        }
    }
</style>
