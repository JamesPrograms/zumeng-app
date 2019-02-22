<template>
    <div class="content">
        <div class="my-house-wrap" v-if="hasHouse">
            <div class="basic-info">
                <div class="left">
                    <h1 class="card-title">{{myHouseInfo.name}}{{myHouseInfo.building}}栋{{myHouseInfo.unit}}单元{{myHouseInfo.num}}室</h1>
                    <p><span class="rent">￥{{myHouseInfo.amount}}</span>/月&nbsp;&nbsp;&nbsp;&nbsp;<span class="tip">中介费：<span
                        class="color-red">{{myHouseInfo.tip}}</span>元</span></p>
                </div>
                <div class="right">
                    <div class="qrcode-wrap">
                        <img src="../../assets/image/erweima.png" alt="">
                    </div>
                </div>
            </div>
            <div class="state-wrap">
                <div class="state-menu">
                    <ul>
                        <li>
                            <router-link to="myHouseToBeConfirmed">待确认</router-link>
                            <div class="line"></div>
                        </li>
                        <li>
                            <router-link to="myHouseConfirmed">已确认</router-link>
                            <div class="line"></div>
                        </li>
                        <li>
                            <router-link to="myHouseHaveSeen">已看房</router-link>
                            <div class="line"></div>
                        </li>
                        <li>
                            <router-link to="myHouseLocked">已锁定</router-link>
                            <div class="line"></div>
                        </li>
                    </ul>
                </div>
                <div class="state-content">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </div>
            </div>
        </div>
        <div class="no-house-wrap" v-else>
            <img class="no-house" src="../../assets/image/icon/icon_nothing.png" alt="">
            <p>没有房源哦<br>赶紧发布你即将到期的房源吧</p>
            <img class="add-house" src="../../assets/image/icon/icon_add.png" alt="" @click="alertMessage()">
        </div>
    </div>

</template>

<script>
    import {MessageBox} from 'mint-ui';

    export default {
        name: 'myHouseResource',
        data() {
            return {
                hasHouse: false,
                myHouseInfo: '',
                messageStr: `<figure><img class="" src="${require('../../assets/image/communication.png')}"><p>发布前最好与房东沟通一下哦</p></figure>`,
            }
        },
        methods: {
            alertMessage() {
                MessageBox({
                    title: '提示',
                    message: this.messageStr,
                    confirmButtonText: '知道了'
                }).then(action => {
                    this.util.goPage('/addHouseBasicInfo');
                });
            },
            getMyHouse() {
                const that = this;
                this.axios.get({
                    url: '/house-service/getMyHouse',
                    loading: true,
                    sucFunc(response) {
                        response.data == null ? that.hasHouse = false : that.hasHouse = true;
                        that.myHouseInfo = response.data;
                    }
                });
            },
        },
        mounted() {
            this.getMyHouse();
        }
    }
</script>

<style lang="less">
    @import "../../assets/style/variable";

    .my-house-wrap {
        padding-top: .34rem;
        .basic-info {
            display: flex;
            .left {
                flex-grow: 1;
                p {
                    font-size: .24rem;
                    .rent {
                        font-family: @font-family-bold;
                        font-size: .48rem;
                        color: @theme-color;
                    }
                    .tip {
                        font-family: @font-family-regular;
                        color: #353535;
                    }
                    span.color-red {
                        color: #f45656;
                    }
                }
            }
            .qrcode-wrap {
                width: .9rem;
                height: .9rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .state-wrap {
            .state-menu {
                font-family: @font-family-medium;
                font-size: .3rem;
                background-color: @white;
                box-shadow: 0px 1px 6px 0px rgba(53, 47, 47, 0.06);
                border-radius: 4px;
                margin-top: .4rem;
                margin-bottom: .1rem;
                ul {
                    display: flex;
                    padding: .24rem 0;
                }
                li {
                    position: relative;
                    border-right: 1px solid #dddddd;
                    &:last-child {
                        border-right: none;
                    }
                    a {
                        text-decoration: none;
                        color: @gray;
                        display: block;
                        padding: .07rem .4rem;
                        &.router-link-exact-active {
                            color: @black;
                            + .line {
                                display: block;
                            }
                        }
                    }
                    .line {
                        display: none;
                        position: absolute;
                        bottom: -.24rem;
                        width: .4rem;
                        height: .04rem;
                        background-color: @theme-color;
                        margin-left: calc(50% - 0.2rem);
                    }
                }
            }
            .state-content {
                .list {
                    position: relative;
                    padding: .2rem;
                    margin-bottom: .1rem;
                    background-color: @white;
                    box-shadow: 0px 1px 6px 0px rgba(53, 47, 47, 0.06);
                    border-radius: 4px;
                    .waiting-tag {
                        position: absolute;
                        right: 0;
                        display: block;
                        padding: .11rem .23rem .10rem .34rem;
                        background-color: #efefef;
                        border-radius: 22px 0px 0px 22px;
                        font-family: @font-family-medium;
                        font-size: .24rem;
                        color: @black-bright;
                    }
                    .user-info {
                        display: flex;
                        padding-top: .1rem;
                        border-bottom: 1px dotted #dddddd;
                        &.no-border-bottom {
                            border-bottom: 0;
                        }
                        .left {
                            margin-right: .1rem;
                            img {
                                width: .9rem;
                                height: .9rem;
                                border-radius: 50%;
                            }
                        }
                        .right {
                            flex-grow: 1;
                            .username {
                                font-family: @font-family-medium;
                                font-size: .28rem;
                                color: @black;
                                margin-bottom: .16rem;
                                .date {
                                    float: right;
                                    font-family: @font-family-regular;
                                    font-size: .2rem;
                                    color: #b2b2b2;
                                }
                            }
                            .contact-ta {
                                display: inline-block;
                                padding: .12rem .2rem;
                                margin-bottom: .3rem;
                                background-color: @white-smoke;
                                border-radius: 24px;
                                font-size: .24rem;
                                color: #353535;
                                img {
                                    width: .2rem;
                                    height: .2rem;
                                }
                            }
                            .datetime {
                                font-family: @font-family-medium;
                                font-size: .32rem;
                                color: @theme-color;
                                margin-bottom: .3rem;
                                &.black-color {
                                    color: @black;
                                }
                            }
                        }
                    }
                    .cost-info {
                        text-align: center;
                        color: #353535;
                        font-size: .24rem;
                        border-bottom: 1px dotted #dddddd;
                        padding-top: .3rem;
                        padding-bottom: .6rem;
                        p:first-child {
                            font-family: @font-family-medium;
                            margin-bottom: .1rem;
                        }
                        p:last-child {
                            font-family: @font-family-bold;
                        }
                        .money {
                            font-size: 1.2rem;
                            color: @theme-color;
                        }
                    }
                    .list-bottom {
                        padding-top: .2rem;
                        text-align: right;
                        button {
                            margin-right: .2rem;
                            &:last-child {
                                margin-right: 0;
                            }
                            &.theme-color {
                                color: @theme-color;
                                border-color: @theme-color;
                            }
                        }
                        &.text {
                            text-align: left;
                        }
                    }
                }
            }
        }
    }

    .no-house-wrap {
        text-align: center;
        .no-house {
            width: 2rem;
            height: 2rem;
            margin-top: 2.52rem;
            margin-bottom: .6rem;
        }
        p {
            font-size: .3rem;
            line-height: .48rem;
            color: @gray;
            margin-bottom: 1.58rem;
        }
        .add-house {
            width: 1.6rem;
            height: 1.6rem;
        }
    }

    .mint-msgbox {
        width: 75%;
    }

    .mint-msgbox-message {

    }

    .mint-msgbox-title {
        font-family: @font-family-medium;
        font-size: .36rem;
        color: @black;
    }

    .mint-msgbox-content {
        border-bottom-color: #d2d3d5;
    }

    .mint-msgbox-btns {
        height: auto;
    }

    .mint-msgbox-confirm {
        font-family: @font-family-regular;
        font-size: .36rem;
        color: @theme-color;
        padding-top: .18rem;
        padding-bottom: .18rem;
    }

    figure {
        img {
            width: 1.94rem;
            height: 2rem;
            margin-top: .97rem;
            margin-bottom: .9rem;
        }
        p {
            font-size: .3rem;
        }
    }
</style>
