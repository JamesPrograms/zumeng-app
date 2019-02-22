<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="msg-list card" v-for="(list,index) in messages" :key="index">
            <h1 class="card-title">系统通知</h1>
            <p class="msg-content">
                您所关注的【{{list.houseInfo}}】房源，已被人意向锁定，请取消看房行程。
            </p>
            <p class="msg-date">{{list.notificationDate}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "notificationMessage",
        data() {
            return {
                messages: []
            }
        },
        methods: {
            getMyMessages: function () {
                const that = this;
                this.axios.get({
                    url: '/msg-service/getMyMessages',
                    loading: true,
                    data: {
                        pageIndex: 1,
                        pageSize: 10
                    },
                    sucFunc(response) {
                        that.messages = response.data;
                    }
                });
            }
        },
        mounted() {
            this.getMyMessages();
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .msg-list {
        padding: .3rem .2rem;
        margin-bottom: .2rem;
        background-color: @white;
        .card-title {
            margin-bottom: .3rem;
        }
        p {
            margin-bottom: .2rem;
        }
        .msg-content {
            font-size: .28rem;
            color: @black;
            line-height: .35rem;
        }
        .msg-date {
            text-align: right;
            font-size: .2rem;
            color: #b2b2b2;
        }
    }
</style>
