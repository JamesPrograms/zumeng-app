<template>
    <div class="lists-wrap">
        <div class="list" v-for="(item,index) in listArr" :key="index">
            <span class="waiting-tag" v-if="state=='toBeConfirmed' && !item.isConfirmed">等待对方确认</span>
            <div class="user-info" :class="{'no-border-bottom':state=='locked'}">
                <div class="left">
                    <img class="avatar" src="../assets/image/touxiang.jpg" alt="">
                </div>
                <div class="right">
                    <p class="username">{{item.username}}<span class="date" v-if="state=='haveSeen' || state=='locked'">{{item.date}}</span></p>
                    <span class="contact-ta">
                        <img src="../assets/image/icon/icon_contact.png" alt="">
                        联系TA
                    </span>
                    <p v-if="state=='toBeConfirmed' || state=='confirmed'" class="datetime" :class="{'black-color':!item.isConfirmed || state=='confirmed'}">
                        {{item.reserveDate}},{{item.reserveLimit}},{{item.reserveTime}}</p>
                </div>
            </div>
            <div v-if="state=='locked' && !isConfirmedTransaction" class="cost-info">
                <p>定金</p>
                <p><span class="money">{{item.earnest}}</span>元</p>
            </div>
            <div v-else-if="state=='locked' && isConfirmedTransaction" class="cost-info">
                <p>感谢费</p>
                <p><span class="money">{{item.tip}}</span>元</p>
            </div>
            <div v-if="state=='haveSeen'" class="list-bottom text">
                {{item.comment}}
            </div>
            <div v-else class="list-bottom">
                <button class="custom-btn-small" v-if="state=='toBeConfirmed' || state=='confirmed'" @click="modifyReservation(item.id)">修改</button>
                <button class="custom-btn-small" v-if="state=='locked' && !isConfirmedTransaction" @click="cancelTransaction(item.id)">取消</button>
                <button class="custom-btn-small theme-color" v-if="(state=='locked' && !isConfirmedTransaction) || (state=='toBeConfirmed' && item.isConfirmed)"
                        @click="confirm(item.id)">
                    确认
                </button>
                <button class="custom-btn-small" v-if="state=='locked' && isConfirmedTransaction" @click="appealTip(item.id)">申诉领取</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "myHouseStateList",
        props: {
            state: {
                type: String,
                required: true
            },
            listArr: {
                // type: Array,
                default: function () {
                    return [];
                }
            },
            isConfirmedTransaction: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            modifyReservation: function (id) {
                this.util.goPage({name: 'modifyReservation', params: {id: id}});
            },
            cancelTransaction: function (id) {
                this.util.goPage({name: 'cancelTransaction', params: {id: id}});
            },
            confirm: function (id) {
                const that = this;
                if (this.state == 'locked') {
                    this.axios.post({
                        url: '/transaction-service/confirm',
                        loading: true,
                        data: {
                            tid: id
                        },
                        sucFunc(response) {
                            that.$emit('sendData', true);
                        }
                    });
                } else {
                    this.axios.post({
                        url: '/reserve-service/confirm',
                        loading: true,
                        data: {
                            reserveid: id
                        },
                        sucFunc(response) {
                            that.util.goPage('/myHouseResource/myHouseConfirmed')
                        }
                    });
                }
            },
            appealTip: function (id) {
                const that = this;
                this.axios.post({
                    url: '/transaction-service/applytips',
                    loading: true,
                    data: {
                        tid: id
                    },
                    sucFunc(response) {
                        that.util.goPage('/appealComplete')
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
