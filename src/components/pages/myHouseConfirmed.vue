<template>
    <v-list :state="myHouseState" :listArr="pageData"></v-list>
</template>

<script>
    import vList from '../myHouseStateList'

    export default {
        name: "myHouseConfirmed",
        components: {
            vList
        },
        data() {
            return {
                myHouseState: 'confirmed',
                pageData: ''
            }
        },
        methods: {
            getData: function () {
                let that = this;
                this.axios.get({
                    url: '/reserve-service/getMyIssuerReserve',
                    loading: true,
                    data: {state: 2},
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
