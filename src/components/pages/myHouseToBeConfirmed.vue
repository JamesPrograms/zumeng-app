<template>
    <v-list :state="myHouseState" :listArr="pageData"></v-list>
</template>

<script>
    import vList from '../myHouseStateList'

    export default {
        name: "myHouseToBeConfirmed",
        components: {
            vList
        },
        data() {
            return {
                myHouseState: 'toBeConfirmed',
                pageData: ''
            }
        },
        methods: {
            getData: function () {
                let that = this;
                this.axios.get({
                    url: '/reserve-service/getMyIssuerReserve',
                    loading: true,
                    data: {state: 1},
                    sucFunc(response) {
                        that.pageData = response.data;
                    }
                });
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>

<style lang="less" scoped>

</style>
