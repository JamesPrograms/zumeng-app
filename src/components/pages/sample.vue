<template>
    <div class="wrapper">
        <!--头部组件-->
        <v-header></v-header>

        <div class="main-content">
            <!-- 登录部分input输入框组件start -->
            <h1>登录部分input输入框组件</h1>
            <v-input :inputAttr="username"></v-input>
            <!-- 登录部分input输入框组件end -->

            <!--日期时间选择器部分start-->
            <h1>日期时间选择器</h1>
            <div class="booking-time">
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
            <!--日期时间选择器部分end-->

            <!-- vue-awesome-picker选择器部分start -->
            <h1>单列选择器</h1>
            <div class="my-picker" @click="showPicker0">
                <input type="text" v-model="picker0Info.value" disabled>
                <img src="../../assets/image/icon/icon_drop_down.png">
            </div>
            <awesome-picker
                ref="picker0"
                :textTitle="picker0.textTitle"
                :data="picker0.data"
                @confirm="handlePicker0Confirm">
            </awesome-picker>
            <!-- vue-awesome-picker选择器部分end -->

            <!-- 标签组件部分start -->
            <h1 style="margin-top: 0.3rem">纯显示标签</h1>
            <v-tags :is-clickable="false" :tags="showTags"></v-tags>

            <h1 style="margin-top: 0.3rem">单选标签</h1>
            <v-tags :is-clickable="true" :tags="rentType" v-on:sendData="getRentType"></v-tags>

            <h1 style="margin-top: 0.3rem">多选标签</h1>
            <v-tags :is-clickable="true" :is-multiply="true" :tags="tenantLimits" v-on:sendData="getTenantLimits"></v-tags>
            <!-- 标签组件部分end -->

        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import input from '../input';
    import vTags from '../tags';


    export default {
        name: 'sample',
        data() {
            return {
                /*input输入框组件数据start*/
                username: {
                    // 因为assets中的图片文件会被webpack打包，直接引入路径加载不出图片，此处用require引入
                    iconSrc: require('../../assets/image/icon/user_icon.png'),
                    // 如果type值为number，则只能输入数字
                    type: 'text',
                    value: '',
                    placeholder: '请输入您的姓名'
                },
                /*input输入框组件数据end*/

                /*日期时间选择器数据start*/
                currentDatetime: new Date(),
                pickerValue: '',
                formatPickerValue: '请选择预约时间',
                /*日期时间选择器数据end*/

                /*vue-awesome-picker数据start*/
                picker0Info: {index: 0, value: '0 - 500'},
                picker0: {
                    data: [
                        {
                            index: 0,
                            value: '0 - 500'
                        },
                        {
                            index: 1,
                            value: '500 - 1000'
                        },
                        {
                            index: 2,
                            value: '1000 - 1500'
                        },
                        {
                            index: 3,
                            value: '1500 - 2000'
                        },
                    ]
                },
                /*vue-awesome-picker数据start*/

                /* tags数据start */
                showTags: ['标签1', '标签2', '标签3'],
                rentType: ['整租', '合租'],
                tenantLimits: ['限男性', '限女性', '拒绝情侣', '拒绝养宠物', '不吸烟', '不做饭'],
                selectedTenantLimit: []
                /* tags数据end */
            }
        },
        components: {
            vInput: input,
            vTags
        },
        methods: {
            /*日期时间选择器方法start*/
            openPicker() {
                this.$refs.picker.open();
            },
            handleConfirm(data) {
                this.formatPickerValue = this.moment(data).format('YYYY-MM-DD HH:mm:ss');
            },
            /*日期时间选择器方法end*/

            /*vue-awesome-picker方法start*/
            showPicker0() {
                this.$refs.picker0.show()
            },
            handlePicker0Confirm(v) {
                this.picker0Info.index = v[0]['index'];
                this.picker0Info.value = v[0]['value'];
            },
            /*vue-awesome-picker方法end*/

            /* tags方法start */
            getRentType(data) {
                if (data.selected) {
                    Toast(`您选中了：${data.value}`);
                }
            },
            getTenantLimits(data) {
                // 这里返回的是一个数组（选中什么就返回什么值的数组）
                Toast(`您选中了：${data}`);
            }
            /* tags方法end */
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    h1 {
        font-family: @font-family-bold;
        font-size: .32rem;
        color: @black-bright;
        margin-bottom: .32rem;
    }

    .main-content {
        padding-right: .3rem;
        padding-left: .3rem;
    }

    .booking-time {
        padding-bottom: .35rem;
        .datetime-picker-wrap {
            display: flex;
            box-sizing: border-box;
            width: 100%;
            height: 1.2rem;
            padding-right: .2rem;
            padding-left: .2rem;
            background-color: #eeeeee;
            img {
                width: .34rem;
                height: .34rem;
                margin-right: .2rem;
                align-self: center;
            }
            span {
                flex-grow: 1;
                align-self: center;
                font-size: .28rem;
                color: @gray;
                background-color: #eeeeee;
            }
        }
    }
</style>
