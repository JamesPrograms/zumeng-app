<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="card">
            <h1 class="card-title">取消原因</h1>
            <mt-radio
                v-model="pickedVal"
                :options="defaultReasons"
            >
            </mt-radio>
            <div class="other-reason" v-show="pickedVal==3">
                <textarea v-model="otherReason" placeholder="请输入其他原因"></textarea>
            </div>
        </div>
        <div class="bottom-btn-wrap">
            <button class="custom-btn-big" @click="confirmCancel">确认取消</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cancelTransaction",
        data() {
            return {
                transactionId: this.$route.params.id,
                defaultReasons: [
                    {
                        label: '房东取消交易',
                        value: '0'
                    },
                    {
                        label: '房东涨价',
                        value: '1'
                    },
                    {
                        label: '不愿意租给该租客',
                        value: '2'
                    },
                    {
                        label: '其它',
                        value: '3'
                    }
                ],
                pickedVal: '',
                otherReason: ''
            }
        },
        methods: {
            confirmCancel: function () {
                const that = this;
                let sendData = {
                    tid: this.transactionId
                };
                if (this.pickedVal == 3) {
                    sendData.otherReason = this.otherReason
                }
                this.axios.post({
                    url: '/transaction-service/cancel',
                    loading: true,
                    data: sendData,
                    sucFunc(response) {
                        that.util.goPage('/myHouseResource/myHouseLocked')
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .other-reason {
        margin-top: .5rem;
        textarea {
            width: 100%;
            height: 1.8rem;
            padding: .2rem .3rem;
            background-color: #eeeeee;
            box-sizing: border-box;
            font-family: @font-family-medium;
            font-size: .28rem;
            color: #888888;
        }
    }
</style>
