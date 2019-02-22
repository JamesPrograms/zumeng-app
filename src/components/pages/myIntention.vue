<template>
    <div class="content">
        <div class="has-info-wrap" v-if="hasBookedHouseInfo">
            <div class="todo-wrap">
                <div class="todo-menu">
                    <ul>
                        <li>
                            <router-link to="intentionToBeConfirmed">待确认</router-link>
                            <div class="line"></div>
                        </li>
                        <li>
                            <router-link to="intentionConfirmed">已确认</router-link>
                            <div class="line"></div>
                        </li>
                        <li>
                            <router-link to="intentionHaveSeen">已看房</router-link>
                            <div class="line"></div>
                        </li>
                        <li>
                            <router-link to="intentionLocked">已锁定</router-link>
                            <div class="line"></div>
                        </li>
                    </ul>
                </div>
                <div class="todo-content">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </div>
            </div>
        </div>
        <div class="no-info-wrap" v-else>
            <img class="no-house" src="../../assets/image/icon/icon_nothing.png">
            <p>还没有意向房源哦<br>立即发布租房求助吧</p>
            <button class="search-house" @click="util.goPage('houseDemand')">火速开找</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'myIntention',
        data() {
            return {
                headerInfo: {
                    title: '我的意向',
                    hasBackBtn: false
                },
                hasBookedHouseInfo: true // 是否有预定房源信息的标志
            }
        },
        created() {
            if (this.$store.state.bookedHouseInfos.length > 0) {
                this.hasBookedHouseInfo = true;
            }
        }
    }
</script>


<style lang="less" scoped>
    @import "../../assets/style/variable";
    .content {
        padding: 0.8rem 0 0.98rem;
    }

    .has-info-wrap {
        .todo-wrap {
            .todo-menu {
                font-size: .3rem;
                background-color: @white;
                box-shadow: 0px 1px 6px 0px rgba(53, 47, 47, 0.06);
                position: fixed;
                z-index: 2;
                width: 100%;
                top: 0.8rem;
                ul {
                    display: flex;
                    padding: .24rem 0;
                    justify-content: space-between;
                }
                li {
                    position: relative;
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
        }
        .todo-content {
            padding: 0 .2rem;
            margin-top: 1.15rem;
        }
    }

    .no-info-wrap {
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
        .search-house {
            width: 4rem;
            height: 0.88rem;
            .linear-gradient(@gradient-color-2);
            border-radius: 0.44rem;
            font-size: 0.32rem;
            color: @white;
        }
    }
</style>
