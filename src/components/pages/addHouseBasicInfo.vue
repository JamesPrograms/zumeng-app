<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="house-plot" @click="util.goPage('chooseAddr')">
            <span v-show="!basicInfo.name">请在地图上选择小区</span>
            <span v-show="basicInfo.name">{{basicInfo.name}}</span>
            <img src="../../assets/image/icon/icon_location.png" alt="">
        </div>
        <div class="house-basic">
            <div class="house-location">
                <h1>房屋位置</h1>
                <div class="flex-wrap has-space-70">
                    <div class="input-group">
                        <span>栋：</span>
                        <div class="custom-select" @click="showBuildingsPicker">
                            <input type="text" v-model="basicInfo.buildingPicked" disabled>
                            <img src="../../assets/image/icon/icon_triangle.png" alt="">
                        </div>
                        <awesome-picker
                            ref="buildingsPicker"
                            :data="buildingsNo"
                            @confirm="handleBuildingConfirm">
                        </awesome-picker>
                    </div>
                    <div class="input-group">
                        <span>单元：</span>
                        <div class="custom-select" @click="showUnitsPicker">
                            <input type="text" v-model="basicInfo.unitPicked" disabled>
                            <img src="../../assets/image/icon/icon_triangle.png" alt="">
                        </div>
                        <awesome-picker
                            ref="unitsPicker"
                            :data="unitsNo"
                            @confirm="handleUnitConfirm">
                        </awesome-picker>
                    </div>
                </div>
                <div class="input-group rom-number">
                    <span>房号：</span>
                    <input type="text" placeholder="请输入房号" v-model="basicInfo.romNumber">
                </div>
            </div>
            <div class="house-unit">
                <h1>房屋户型</h1>
                <div class="flex-wrap has-space-40">
                    <div class="input-group">
                        <span>室：</span>
                        <div class="custom-select" @click="showRoomsPicker">
                            <input type="text" v-model="basicInfo.roomPicked" disabled>
                            <img src="../../assets/image/icon/icon_triangle.png" alt="">
                        </div>
                        <awesome-picker
                            ref="roomsPicker"
                            :data="roomsNo"
                            @confirm="handleRoomConfirm">
                        </awesome-picker>
                    </div>
                    <div class="input-group">
                        <span>厅：</span>
                        <div class="custom-select" @click="showLivingRoomsPicker">
                            <input type="text" v-model="basicInfo.livingRoomPicked" disabled>
                            <img src="../../assets/image/icon/icon_triangle.png" alt="">
                        </div>
                        <awesome-picker
                            ref="livingRoomsPicker"
                            :data="livingRoomsNo"
                            @confirm="handleLivingRoomConfirm">
                        </awesome-picker>
                    </div>
                    <div class="input-group">
                        <span>卫：</span>
                        <div class="custom-select" @click="showBathroomsPicker">
                            <input type="text" v-model="basicInfo.bathroomPicked" disabled>
                            <img src="../../assets/image/icon/icon_triangle.png" alt="">
                        </div>
                        <awesome-picker
                            ref="bathroomsPicker"
                            :data="bathroomsNo"
                            @confirm="handleBathroomConfirm">
                        </awesome-picker>
                    </div>
                </div>
            </div>
            <div class="house-area">
                <h1>房屋面积</h1>
                <div class="input-group">
                    <input type="text" placeholder="请输入面积" v-model="basicInfo.houseArea">
                    <span>㎡</span>
                </div>
            </div>
        </div>
        <div class="bottom-btn-wrap">
            <button class="custom-btn-big" @click="next">下一步</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "addHouseBasicInfo",
        data() {
            return {
                basicInfo: {
                    longitude: this.$route.params.curLng,
                    latitude: this.$route.params.curLat,
                    name: this.$route.params.name,
                    buildingPicked: 1,
                    unitPicked: 1,
                    romNumber: '',
                    roomPicked: 1,
                    livingRoomPicked: 1,
                    bathroomPicked: 1,
                    houseArea: ''
                },
                buildingsNo: [
                    {
                        index: 1,
                        value: 1
                    },
                    {
                        index: 2,
                        value: 2
                    },
                    {
                        index: 3,
                        value: 3
                    },
                    {
                        index: 4,
                        value: 4,
                    },
                    {
                        index: 5,
                        value: 5,
                    },
                    {
                        index: 6,
                        value: 6,
                    },
                    {
                        index: 7,
                        value: 7,
                    },
                    {
                        index: 8,
                        value: 8,
                    },
                    {
                        index: 9,
                        value: 9,
                    },
                    {
                        index: 10,
                        value: 10,
                    }
                ],
                unitsNo: [
                    {
                        index: 1,
                        value: 1
                    },
                    {
                        index: 2,
                        value: 2
                    },
                    {
                        index: 3,
                        value: 3
                    },
                    {
                        index: 4,
                        value: 4,
                    },
                    {
                        index: 5,
                        value: 5,
                    },
                    {
                        index: 6,
                        value: 6,
                    },
                    {
                        index: 7,
                        value: 7,
                    },
                    {
                        index: 8,
                        value: 8,
                    },
                    {
                        index: 9,
                        value: 9,
                    },
                    {
                        index: 10,
                        value: 10,
                    }
                ],
                roomsNo: [
                    {
                        index: 1,
                        value: 1
                    },
                    {
                        index: 2,
                        value: 2
                    },
                    {
                        index: 3,
                        value: 3
                    },
                    {
                        index: 4,
                        value: 4,
                    },
                    {
                        index: 5,
                        value: 5,
                    },
                    {
                        index: 6,
                        value: 6,
                    },
                    {
                        index: 7,
                        value: 7,
                    },
                    {
                        index: 8,
                        value: 8,
                    },
                    {
                        index: 9,
                        value: 9,
                    },
                    {
                        index: 10,
                        value: 10,
                    }
                ],
                livingRoomsNo: [
                    {
                        index: 1,
                        value: 1
                    },
                    {
                        index: 2,
                        value: 2
                    },
                    {
                        index: 3,
                        value: 3
                    },
                    {
                        index: 4,
                        value: 4,
                    },
                    {
                        index: 5,
                        value: 5,
                    },
                    {
                        index: 6,
                        value: 6,
                    },
                    {
                        index: 7,
                        value: 7,
                    },
                    {
                        index: 8,
                        value: 8,
                    },
                    {
                        index: 9,
                        value: 9,
                    },
                    {
                        index: 10,
                        value: 10,
                    }
                ],
                bathroomsNo: [
                    {
                        index: 1,
                        value: 1
                    },
                    {
                        index: 2,
                        value: 2
                    },
                    {
                        index: 3,
                        value: 3
                    },
                    {
                        index: 4,
                        value: 4,
                    },
                    {
                        index: 5,
                        value: 5,
                    },
                    {
                        index: 6,
                        value: 6,
                    },
                    {
                        index: 7,
                        value: 7,
                    },
                    {
                        index: 8,
                        value: 8,
                    },
                    {
                        index: 9,
                        value: 9,
                    },
                    {
                        index: 10,
                        value: 10,
                    }
                ]
            }
        },
        methods: {
            showBuildingsPicker() {
                this.$refs.buildingsPicker.show();
            },
            showUnitsPicker() {
                this.$refs.unitsPicker.show();
            },
            showRoomsPicker() {
                this.$refs.roomsPicker.show();
            },
            showLivingRoomsPicker() {
                this.$refs.livingRoomsPicker.show();
            },
            showBathroomsPicker() {
                this.$refs.bathroomsPicker.show();
            },
            handleBuildingConfirm(v) {
                this.basicInfo.buildingPicked = v[0]['value'];
            },
            handleUnitConfirm(v) {
                this.basicInfo.unitPicked = v[0]['value'];
            },
            handleRoomConfirm(v) {
                this.basicInfo.roomPicked = v[0]['value'];
            },
            handleLivingRoomConfirm(v) {
                this.basicInfo.livingRoomPicked = v[0]['value'];
            },
            handleBathroomConfirm(v) {
                this.basicInfo.bathroomPicked = v[0]['value'];
            },
            next() {
                this.$store.commit('setHouseInfo', {basic: this.basicInfo});
                this.util.goPage('houseAllocations');
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .wrapper {
        > div {
            background-color: #ffffff;
            box-shadow: 0px 1px 6px 0px rgba(53, 47, 47, 0.06);
            border-radius: 4px;
            margin: .2rem;
            padding: .3rem .2rem;
        }
        .flex-wrap {
            display: flex;
            justify-content: space-between;
            &.has-space-70 {
                .input-group {
                    margin-right: .7rem;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
            &.has-space-40 {
                .input-group {
                    margin-right: .4rem;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
        .house-plot {
            display: flex;
            font-family: @font-family-medium;
            font-size: .28rem;
            color: @gray;
            span {
                align-self: center;
                flex-grow: 1;
            }
            img {
                width: .24rem;
                height: .24rem;
            }
        }
        .house-basic {
            > div {
                border-bottom: 1px solid #dddddd;
                margin-bottom: .3rem;
                padding-bottom: .3rem;
                &:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }
                h1 {
                    font-family: @font-family-bold;
                    font-size: .32rem;
                    color: @black;
                    margin-bottom: .25rem;
                }
                .input-group {
                    display: flex;
                    span {
                        align-self: center;
                        flex-shrink: 0;
                        font-family: @font-family-medium;
                        font-size: .28rem;
                    }
                    input {
                        flex-grow: 1;
                        font-family: @font-family-medium;
                        font-size: .28rem;
                        color: @gray;
                    }
                    .custom-select {
                        display: flex;
                        height: .68rem;
                        border-radius: 6px;
                        border: 1px solid #aeaeae;
                        background-color: @white;
                        input {
                            width: 100%;
                            height: 100%;
                            font-size: .3rem;
                            color: #333;
                            text-align: center;
                            border-top-left-radius: 6px;
                            border-bottom-left-radius: 6px;
                            padding: 0;
                        }
                        img {
                            width: .2rem;
                            height: .17rem;
                            align-self: center;
                            margin-right: .1rem;
                        }
                    }
                    &.rom-number {
                        margin-top: .2rem;
                        input {
                            height: .68rem;
                            text-indent: .2rem;
                            border: 1px solid #aeaeae;
                            border-radius: 6px;
                        }
                    }
                }
            }
            .house-area {
                .input-group {
                    border: 1px solid #aeaeae;
                    border-radius: 6px;
                    height: .68rem;
                    padding: 0 .2rem;
                    span {
                        align-self: center;
                        font-family: @font-family-bold;
                        font-size: .34rem;
                        margin-left: .2rem;
                    }
                }
            }
        }
        .bottom-btn-wrap {
            margin: 0;
            padding: .2rem .3rem;
        }
    }
</style>
