<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="card">
            <h1 class="card-title">投诉理由</h1>
            <mt-radio
                    v-model="pickedVal"
                    :options="defaultReasons"
            >
            </mt-radio>
            <div class="other-reason" v-show="pickedVal==3">
                <textarea v-model="otherReason" placeholder="请输入其他理由"></textarea>
            </div>
        </div>
        <div class="bottom-btn-wrap">
            <button class="custom-btn-big" @click="commitData">提交</button>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        name: "cancelTransaction",
        data() {
            return {
                transactionId: this.$route.params.id,
                defaultReasons: [
                    {
                        label: '黑中介',
                        value: '0'
                    },
                    {
                        label: '发布虚假消息',
                        value: '1'
                    },
                    {
                        label: '事前不与房东沟通',
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
            commitData: function () {
                this.util.goPage('/complainSuccess');
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
