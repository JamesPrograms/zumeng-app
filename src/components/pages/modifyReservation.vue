<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="card">
            <h1 class="card-title">预约时间</h1>
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
        <div class="bottom-btn-wrap">
            <button class="custom-btn-big" @click="confirmModify">确认修改</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "modifyReservation",
        data() {
            return {
                reservationId: this.$route.params.id,
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
                this.pickerValue = data;
                this.formatPickerValue = this.moment(data).format('YYYY-MM-DD HH:mm:ss');
            },
            confirmModify: function () {
                const that = this;
                this.axios.post({
                    url: '/reserve-service/modify',
                    loading: true,
                    data: {
                        reserveid: this.reservationId,
                        datetime: this.moment(this.pickerValue).format('X'),
                    },
                    sucFunc(response) {
                        that.util.goPage('modifyComplete');
                    }
                });
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
