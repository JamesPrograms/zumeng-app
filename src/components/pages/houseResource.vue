<template>
    <div class="content">
        <div class="wrapper">
            <div class="input-btn-wrap" @click="util.goPage('houseDemand')">
                <span class="city">成都</span>
                <img src="../../assets/image/icon/icon_more.png" class="right-array">
                <img src="../../assets/image/icon/icon_serch.png" class="serch-icon">
                <span class="input-btn">
            <input type="text" readonly placeholder="哼哼 . 你想住哪里？" v-model="searchHouseInfo">
        </span>
            </div>
            <vue-scroll @load-start="handleStart">
                <div class="house-info-wrap">
                    <div class="house-info" v-for="info in houseInfo" @click="util.goPage('houseDetail')">
                        <div class="img-price">
                            <img src="../../assets/image/test.jpg">
                            <div class="house-rent">&yen;{{info.price}}/月</div>
                        </div>
                        <div class="house-desc">
                            <div class="name-position">
                                <p class="name">{{info.name}}</p>
                                <p class="position">
                                    <img src="../../assets/image/icon/icon_positioning.png"
                                         @click.stop="jumpToMap({longitude: info.longitude, latitude: info.latitude})">
                                    <span class="location">
                            {{info.meter}}m
                        </span>
                                </p>
                            </div>
                            <p class="size">
                                <span>{{info.area}}㎡</span>
                                <span>.</span>
                                <span>{{info.type}}</span>
                            </p>
                            <div class="tags">
                                <div class="tag" v-for="tag in info.tags">{{tag}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </vue-scroll>
        </div>
    </div>
</template>

<script>
    // 引入tabbar组件
    import tabbar from '../tabbar';
    export default {
        name: 'houseResource',
        data() {
            return {
                houseInfo: null,
                searchHouseInfo: ''
            }

        },
        created() {   // 进入页面做初始化渲染
            const self = this;
            const houseSearchInfo = this.$route.params;
            // 判断houseSearchInfo是否为空对象（如果从求租需求页面跳转过来，则该对象不为空对象）
            if (Object.keys(houseSearchInfo).length) {
                this.searchHouseInfo = `${houseSearchInfo.place}附近*${houseSearchInfo.selectedRentType[0]}*租金${houseSearchInfo.budgetPicker.value}`;
                this.axios.post({
                    url: '/house-service/allHouse',
                    loading: true,
                    data: houseSearchInfo,
                    sucFunc(jsonData) {
                        self.houseInfo = jsonData["data"];
                    }
                });
            } else {
                this.axios.post({
                    url: '/house-service/allHouse',
                    loading: true,
                    sucFunc(jsonData) {
                        self.houseInfo = jsonData["data"];
                    }
                });
            }

        },
        methods: {
            handleStart(vm, refreshDom, done) {  // 每次刷新掉一次接口（此处需要用原生axios的方法）
                const self = this;
                this.axios.origin.post('/house-service/allHouse')
                        .then(function (res) {
                            self.houseInfo = self.houseInfo.concat(res.data.data);
                            done();
                        })
            },
            jumpToMap(location) {
                this.util.goPage({
                    name: 'location',
                    params: location
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .input-btn-wrap {
        height: 0.88rem;
        position: fixed;
        top: 0.86rem;
        z-index: 1;
        width: 92%;
        box-sizing: border-box;
        background-color: @white;
        box-shadow: 0rem 0.01rem 0.3rem 0rem rgba(0, 0, 0, 0.1);
        border-radius: 0.06rem;
        padding-left: 0.26rem;
        display: flex;
        align-items: center;

        .city {
            font-size: 0.28rem;
        }

        .right-array {
            width: 0.2rem;
            margin-left: 0.1rem;
        }

        .serch-icon {
            width: 0.34rem;
            margin-left: 0.26rem;
        }

        .input-btn {
            width: 68%;
            padding-left: 0.2rem;
            input {
                font-size: 0.25rem;
                width: 100%;
                &::-webkit-input-placeholder {
                    color: @gray-light;
                }

                &::-moz-placeholder {
                    color: @gray-light;
                }

                &:-ms-input-placeholder {
                    color: @gray-light;
                }
            }
        }

    }

    .house-info-wrap {
        margin-top: 0.4rem;

        .house-info {
            /*height: 5rem;*/
            background-color: @white;
            box-shadow: 0rem 0.01rem 0.2rem 0rem rgba(32, 32, 32, 0.2);
            border-radius: 0.06rem;
            margin-bottom: 0.2rem;

            .img-price {
                height: 3rem;
                position: relative;

                img {
                    width: 100%;
                    height: 100%;
                    border-top-left-radius: 0.06rem;
                    border-top-right-radius: 0.06rem;
                }

                .house-rent {
                    width: 1.8rem;
                    height: 0.54rem;
                    text-align: center;
                    line-height: 0.54rem;
                    color: @white;
                    position: absolute;
                    right: 0.2rem;
                    bottom: -0.2rem;
                    background-image: linear-gradient(90deg, @theme-color 0%, @gradient-color-1 100%),
                    linear-gradient(@gradient-color-3, @gradient-color-3);
                    border-radius: 0.27rem;
                }
            }

            .house-desc {
                margin-top: 0.3rem;
                padding-left: 0.2rem;

                .name-position {
                    display: flex;

                    .name {
                        font-size: 0.32rem;
                        font-weight: bold;
                    }

                    .position {
                        margin-left: 0.32rem;
                        display: flex;
                        align-items: flex-end;

                        img {
                            width: 0.28rem;
                            height: 0.28rem;
                        }

                        .location {
                            font-size: 0.2rem;
                            color: @gray-light;
                            margin-left: 0.11rem;
                        }
                    }
                }

                .size {
                    padding: 0.2rem 0;
                    font-size: 0.28rem;
                }

                .tags {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    padding-bottom: 0.2rem;
                    font-size: 0.24rem;
                    color: @gray;

                    .tag {
                        height: 0.44rem;
                        padding: 0 0.23rem;
                        text-align: center;
                        line-height: 0.44rem;
                        margin-bottom: 0.1rem;
                        margin-right: 0.2rem;
                        background-color: #ffffff;
                        border-radius: 0.22rem;
                        border: solid 0.01rem #dddddd;
                    }
                }

            }
        }
    }
</style>
