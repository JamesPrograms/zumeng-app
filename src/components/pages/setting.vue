<template>
    <div class="content">
        <div class="personal-info-wrap">
            <div class="personal-info">
                <div class="left">
                    <img :src="userInfo.avatar" alt="">
                </div>
                <div class="right">
                    <p class="username">{{userInfo.nick}}</p>
                    <p>{{userInfo.name | encryptStr('name')}}&nbsp;{{userInfo.idcardnum | encryptStr('idCard')}}</p>
                </div>
            </div>
        </div>
        <div class="space-white"></div>
        <div class="personal-item-wrap">
            <div class="personal-item">
                <img src="../../assets/image/icon/icon_coin.png" alt="">
                <p>看房币</p>
                <span class="look-house-coin">{{userInfo.coin}}</span>
            </div>
        </div>
        <div class="personal-item-wrap mar-bottom-22" @click="util.goPage('earnest')">
            <div class="personal-item no-border-bottom">
                <img src="../../assets/image/icon/icon_deposit.png" alt="">
                <p>订金</p>
                <span class="theme-color">￥<span class="earnest">{{userInfo.earnest}}</span><span class="goPage">&gt;</span></span>
            </div>
        </div>
        <div class="personal-item-wrap" @click="util.goPage('notificationMessage')">
            <div class="personal-item">
                <img src="../../assets/image/icon/icon_message.png" alt="">
                <p>通知消息</p>
                <span class="goPage">&gt;</span>
            </div>
        </div>
        <div class="personal-item-wrap" @click="util.goPage('myTransaction')">
            <div class="personal-item">
                <img src="../../assets/image/icon/icon_trading.png" alt="">
                <p>我的交易</p>
                <span class="goPage">&gt;</span>
            </div>
        </div>
        <div class="personal-item-wrap" @click="util.goPage('myBankCard')">
            <div class="personal-item no-border-bottom">
                <img src="../../assets/image/icon/icon_Bankcard.png" alt="">
                <p>我的银行卡</p>
                <span class="goPage">&gt;</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'setting',
        data() {
            return {
                userInfo: this.$store.state.userInfo
            }
        },
        filters: {
            encryptStr: function (str, type) {
                if (str) {
                    if (type === 'name') {
                        return str.replace(/^.(.+)(.)$/, "*$1$2");
                    } else if (type === 'idCard') {
                        return str.replace(/^(.{6})(?:\d+)(.{4})$/, "$1****$2")
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .content {
        padding: 0;
    }

    .personal-info-wrap {
        height: 3.5rem;
        padding-left: .15rem;
        padding-right: .15rem;
        background: @white url("../../assets/image/personal-bg.png") no-repeat 100% 100%;
        background-size: cover;
        .personal-info {
            position: relative;
            top: 1.6rem;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            padding: .42rem .6rem .4rem .4rem;
            background: url("../../assets/image/personal-info-bg.png") no-repeat;
            background-size: 100% 100%;
            .left {
                width: 1.28rem;
                height: 1.28rem;
                margin-right: .2rem;
                flex-shrink: 0;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }
            }
            .right {
                flex-grow: 1;
                align-self: center;
                p {
                    font-size: .24rem;
                    color: #353535;
                }
                .username {
                    font-family: @font-family-medium;
                    font-size: .32rem;
                    color: @black;
                    margin-bottom: .15rem;
                }
            }
        }
    }

    .space-white {
        height: .4rem;
        background-color: @white;
        margin-bottom: .22rem;
    }

    .personal-item-wrap {
        padding: 0 .3rem;
        background-color: @white;
        &.mar-bottom-22 {
            margin-bottom: .22rem;
        }
        .personal-item {
            display: flex;
            padding: .36rem 0;
            border-bottom: 1px solid #dddddd;
            &.no-border-bottom {
                border-bottom: none;
            }
            img {
                width: .3rem;
                height: .3rem;
                margin-right: .2rem;
            }
            p {
                flex-grow: 1;
                font-family: @font-family-medium;
                font-size: .28rem;
                color: @black;
                align-self: center;
            }
            + span {
                align-self: center;
            }
            .look-house-coin {
                font-family: @font-family-bold;
                font-size: .32rem;
                color: #f45656;
            }
            .earnest {
                font-family: @font-family-bold;
                font-size: .32rem;
                margin-right: .2rem;
            }
            .goPage {
                font-family: @font-family-bold;
                font-size: .28rem;
                color: #999999;
            }
        }
    }
</style>
