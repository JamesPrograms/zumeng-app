<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="card">
            <div class="look-house-date">
                <h1 class="card-title">看房日</h1>
                <div class="picker-wrap" @click="showLookHouseDatePickerr">
                    <input type="text" v-model="LookHouseDate" disabled>
                    <img src="../../assets/image/icon/icon_triangle.png" alt="">
                </div>
                <awesome-picker
                    ref="lookHouseDatePicker"
                    :data="lookHouseDateData"
                    @confirm="handleLookHouseDateConfirm">
                </awesome-picker>
            </div>
            <div class="look-house-date">
                <h1 class="card-title">看房时段</h1>
                <div class="picker-wrap" @click="showLookHouseTimePickerr">
                    <input type="text" v-model="LookHouseTime" disabled>
                    <img src="../../assets/image/icon/icon_triangle.png" alt="">
                </div>
                <awesome-picker
                    ref="lookHouseTimePicker"
                    :data="lookHouseTimeData"
                    @confirm="handleLookHouseTimeConfirm">
                </awesome-picker>
            </div>
        </div>
        <div class="bottom-btn-wrap">
            <button class="custom-btn-big" @click="submit">提交</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "lookHouseSetting",
        data() {
            return {
                LookHouseDate: '请选择',
                LookHouseTime: '请选择',
                lookHouseDateData: [
                    {
                        index: 1,
                        value: '随时'
                    },
                    {
                        index: 2,
                        value: '仅周末'
                    },
                    {
                        index: 3,
                        value: '工作日'
                    }
                ],
                lookHouseTimeData: [
                    {
                        index: 1,
                        value: '全天时段'
                    },
                    {
                        index: 2,
                        value: '18:00以后'
                    },
                    {
                        index: 3,
                        value: '工作日'
                    }
                ]
            }
        },
        methods: {
            showLookHouseDatePickerr: function () {
                this.$refs.lookHouseDatePicker.show();
            },
            showLookHouseTimePickerr: function () {
                this.$refs.lookHouseTimePicker.show();
            },
            handleLookHouseDateConfirm: function (v) {
                this.LookHouseDate = v[0]['value'];
            },
            handleLookHouseTimeConfirm: function (v) {
                this.LookHouseTime = v[0]['value'];
            },
            submit: function () {
                this.util.goPage({name: 'rentalInfo', params: {reserveDate: this.LookHouseDate, reserveTime: this.LookHouseTime}});
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .look-house-date {
        border-bottom: 1px solid #dddddd;
        margin-bottom: .3rem;
        &:last-child {
            border-bottom: none;
        }
        .picker-wrap {
            display: flex;
            height: .68rem;
            background-color: @white;
            border: 1px solid #aeaeae;
            border-radius: 6px;
            margin-bottom: .3rem;
            padding-left: .2rem;
            input {
                width: 100%;
                height: 100%;
                font-family: @font-family-medium;
                font-size: .3rem;
                color: #888888;
                padding: 0;
            }
            img {
                width: .2rem;
                height: .17rem;
                align-self: center;
                margin-right: .1rem;
            }
        }
    }

</style>
