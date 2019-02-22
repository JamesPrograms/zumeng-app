<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="card rent-basic">
            <div class="rent-type">
                <h1 class="card-title">出租方式</h1>
                <v-tags :is-clickable="true" :tags="rentType" v-on:sendData="getRentType"></v-tags>
            </div>
            <div class="rent-money">
                <h1 class="card-title">出租租金</h1>
                <div class="input-wrap has-unit">
                    <input type="text" placeholder="请输入金额" v-model="rentMoney">
                    <span>元</span>
                </div>
            </div>
            <div class="check-in">
                <h1 class="card-title">入住日期</h1>
                <div class="input-wrap" @click="openPicker">
                    <input type="text" v-model="pickedVal" placeholder="请选择日期" disabled>
                </div>
                <mt-datetime-picker
                    ref="picker"
                    type="date"
                    v-model="pickerValue"
                    :startDate="now"
                    @confirm="handleConfirm">
                </mt-datetime-picker>
            </div>
            <div>
                <h1 class="card-title">中介费</h1>
                <div class="input-wrap has-unit">
                    <input type="text" placeholder="请输入期望金额" v-model="tip">
                    <span>元</span>
                </div>
            </div>
        </div>
        <div class="card">
            <h1 class="card-title">租客要求</h1>
            <v-tags :is-clickable="true" :is-multiply="true" :tags="tenantLimits" v-on:sendData="getTenantLimits"></v-tags>
        </div>
        <div class="card">
            <h1 class="card-title">看房预约时间</h1>
            <div class="reserve-datetime theme-color" @click="util.goPage('lookHouseSetting')">
                <p>{{reserveDate}}，{{reserveTime}}</p>
                <p>&gt;</p>
            </div>
        </div>
        <div class="bottom-btn-wrap">
            <button class="custom-btn-big" @click="publish">发布</button>
        </div>
    </div>
</template>

<script>
    import vTags from '../tags'

    export default {
        name: "rentalInfo",
        components: {
            vTags
        },
        data() {
            return {
                now: this.moment()._d,
                pickerValue: '',
                pickedVal: '',
                rentType: ['整租', '合租'],
                rentMoney: '',
                tip: '',
                tenantLimits: ['限男性', '限女性', '拒绝情侣', '拒绝养宠物', '不吸烟', '不做饭'],
                rentTypeVal: '',
                tenantLimitsVal: [],
                reserveDate: '',
                reserveTime: ''
            }
        },
        methods: {
            openPicker() {
                this.$refs.picker.open();
            },
            handleConfirm(curVal) {
                this.pickedVal = this.moment(curVal).format('YYYY-MM-DD');
                this.pickerValue = this.moment(curVal).valueOf();
            },
            getRentType(data) {
                if (data.length) {
                    data[0] === '整租' ? this.rentTypeVal = 1 : this.rentTypeVal = 0;
                }
            },
            getTenantLimits(data) {
                this.tenantLimitsVal = data;
            },
            publish() {
                // 获取全部有关房源信息
                let basic = this.$store.state.addHouseInfo.basic;
                let sendData = {
                    name: basic.name,
                    building: basic.buildingPicked,
                    unit: basic.unitPicked,
                    num: basic.romNumber,
                    room: basic.roomPicked,
                    parlor: basic.livingRoomPicked,
                    toilet: basic.bathroomPicked,
                    area: basic.houseArea,
                    longitude: basic.longitude,
                    latitude: basic.latitude,
                    installation: this.$store.state.addHouseInfo.allocations,
                    type: this.rentTypeVal,
                    amount: this.rentMoney,
                    outdate: this.pickerValue,
                    tip: this.tip,
                    tenantlimit: this.tenantLimitsVal,
                    reservedate: this.reserveDate,
                    reservetime: this.reserveTime,
                    tagList: this.$store.state.addHouseInfo.tag,
                    imglist: this.$store.state.addHouseInfo.files,
                    des: this.$store.state.addHouseInfo.rating,
                };
                const that = this;
                this.axios.post({
                    url: '/house-service/issueHouse',
                    loading: true,
                    data: {
                        'houseStr': sendData
                    },
                    sucFunc() {
                        that.util.goPage('myHouseResource');
                    }
                });
            }
        },
        activated() {
            this.reserveDate = this.$route.params.reserveDate != undefined ? this.$route.params.reserveDate : '周末';
            this.reserveTime = this.$route.params.reserveTime != undefined ? this.$route.params.reserveTime : '19:00之前';
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .wrapper {
        padding-bottom: 1.3rem;
        .rent-basic {
            > div {
                border-bottom: 1px solid #dddddd;
                margin-bottom: .3rem;
            }
        }
        .input-wrap {
            display: flex;
            height: .68rem;
            background-color: @white;
            border-radius: 6px;
            border: 1px solid #aeaeae;
            margin-bottom: .3rem;
            &.has-unit {
                input {
                    border-bottom-right-radius: 0;
                    border-top-right-radius: 0;
                }
            }
            input {
                flex-grow: 1;
                font-family: @font-family-medium;
                font-size: .28rem;
                text-indent: .2rem;
                border-radius: 6px;
            }
            span {
                align-self: center;
                margin-left: .2rem;
                margin-right: .2rem;
                font-family: @font-family-bold;
                font-size: .34rem;
                color: #333;
            }
        }
        .rent-type {
            padding-bottom: .1rem;
        }
        .reserve-datetime {
            display: flex;
            padding-top: .3rem;
            font-size: .28rem;
            p:first-child {
                flex-grow: 1;
            }
        }
    }

</style>
