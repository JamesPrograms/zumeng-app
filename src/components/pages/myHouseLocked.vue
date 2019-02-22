<template>
    <div>
        <v-list :state="myHouseState" :listArr="pageData" :is-confirmed-transaction="isConfirmTransaction" v-on:sendData="getIsConfirmTransaction"></v-list>
        <p class="tip-msg" v-if="isConfirmTransaction"><img src="../../assets/image/icon/warning_icon.png" alt="">请在协助对方签约时，督促对方完成交易</p>
    </div>
</template>

<script>
    import vList from '../myHouseStateList'

    export default {
        name: "myHouseLocked",
        components: {
            vList
        },
        data() {
            return {
                isConfirmTransaction: false,
                myHouseState: 'locked',
                pageData: ''
            }
        },
        methods: {
            getData: function () {
                let that = this;
                this.axios.get({
                    url: '/transaction-service/getIssuerTransaction',
                    loading: true,
                    sucFunc(response) {
                        that.pageData = response.data;
                    }
                });
            },
            getIsConfirmTransaction(data) {
                this.isConfirmTransaction = data;
            }
        },
        mounted() {
            this.getData();
            console.log(this.isConfirmTransaction)
        }
    }
</script>

<style scoped>

</style>
