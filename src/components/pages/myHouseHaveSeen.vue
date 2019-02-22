<template>
    <v-list :state="myHouseState" :listArr="pageData"></v-list>
</template>

<script>
    import vList from '../myHouseStateList'

    export default {
        name: "myHouseHaveSeen",
        components: {
            vList
        },
        data() {
            return {
                myHouseState: 'haveSeen',
                pageData: ''
            }
        },
        methods: {
            getData: function () {
                let that = this;
                this.axios.get({
                    url: '/reserve-service/getMyIssuerReserve',
                    loading: true,
                    data: {state: 3},
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

<style scoped>

</style>
