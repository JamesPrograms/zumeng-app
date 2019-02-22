<template>
    <div class="wrapper">
        <v-header></v-header>
        <div>
            <h1>发布者接受预约时间</h1>
            <v-tags :tags="publisherAcceptTime"></v-tags>
        </div>
        <div class="reserve-time">
            <h1>预约</h1>
            <div class="datetime-picker-wrap">
                <img src="../../assets/image/icon/icon_time_appoint.png" alt="">
                <span @click="openPicker()">{{formatPickerValue}}</span>
            </div>
            <mt-datetime-picker
                ref="picker"
                type="datetime"
                :startDate="currentDatetime"
                @confirm="handleConfirm"
                v-model="pickerValue"
            >
            </mt-datetime-picker>
        </div>
        <div class="cost-info">
            <h1>支付费用</h1>
            <div>
                <span>信息服务费</span>
                <div class="black">¥<span>2</span></div>
            </div>
            <div>
                <span>看房币</span>
                <div class="red">-¥<span class="font-size-28">1</span></div>
            </div>
            <div>
                <span class="font-bold">实际支付</span>
                <div class="theme-color">¥<span>1</span></div>
            </div>
        </div>
        <div class="btn-confirm">
            <button class="custom-btn-big" @click="confirmReserveTime()">确认预约</button>
        </div>
    </div>
</template>

<script>
    import vTags from '../../components/tags'

    export default {
        name: "reserveTime",
        components: {
            vTags
        },
        data() {
            return {
                publisherAcceptTime: this.$route.params.timeTags,
                currentDatetime: new Date(),
                pickerValue: '',
                formatPickerValue: '请选择预约时间'
            }
        },
        methods: {
            openPicker() {
                this.$refs.picker.open();
            },
            handleConfirm(data) {
                this.formatPickerValue = this.moment(data).format('YYYY-MM-DD HH:mm:ss');
            },
            confirmReserveTime() {
                const that = this;
                this.axios.post({
                    url: '/reserve-service/create',
                    data: {
                        houseid: this.$route.params.houseid,
                        datetime: this.moment(this.formatPickerValue).format('X')  // 日期时间字符串转成时间戳
                    },
                    loading: true,
                    sucFunc(response) {
                        if (response.code == 1) {
                            that.util.goPage('reserveSuccess')
                        }
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .wrapper {
        > div {
            margin: .2rem .2rem .1rem .2rem;
            padding: .2rem;
            background-color: #ffffff;
            box-shadow: 0px 1px 6px 0px rgba(53, 47, 47, 0.06);
            border-radius: 4px;
            h1 {
                font-family: @font-family-bold;
                font-size: .32rem;
                color: @black-bright;
                margin-bottom: .32rem;
            }
        }
        .reserve-time {
            padding-bottom: .35rem;
        }
        .cost-info {
            margin-bottom: 2.37rem;
            > div {
                display: flex;
                margin-bottom: .4rem;
                > span {
                    align-self: center;
                    font-family: @font-family-medium;
                    font-size: .28rem;
                    color: @gray-dim;
                }
                > div {
                    flex-grow: 1;
                    font-family: @font-family-bold;
                    font-size: .3rem;
                    text-align: right;
                    span {
                        font-size: .48rem;
                        &.font-size-28 {
                            font-size: .28rem;
                        }
                    }
                }
            }
        }
        .btn-confirm {
            position: fixed;
            bottom: 0;
            margin: 0;
            width: 100%;
            box-sizing: border-box;
        }
    }
</style>
