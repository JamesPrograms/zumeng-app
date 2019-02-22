<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="search-demands">
            <div class="input-content" @click="util.goPage('chooseAddr')">
                <input type="text" placeholder="请选择租房的中心位置" readonly v-model.trim="place">
                <img src="../../assets/image/icon/icon_positioning.png">
            </div>

            <div class="type-budget">
                <div class="rent-type">
                    <p class="title">租房方式</p>
                    <v-tags :is-clickable="true" :is-multiply="false" :tags="rentType" @sendData="getRentType"></v-tags>
                </div>
                <div class="rent-budget">
                    <p class="title">租房预算</p>
                    <div class="my-picker" @click="openBudgetPicker">
                        <input type="text" v-model="budgetPicker.value" disabled>
                        <img src="../../assets/image/icon/icon_drop_down.png">
                    </div>
                    <awesome-picker
                            ref="budgetPickerList"
                            :data="budgetPickerList.data"
                            @confirm="budgetPickerConfirm">
                    </awesome-picker>
                </div>
            </div>

            <div class="other-info">
                <div class="check-in-info">
                    <p class="title">入住日期</p>
                    <div class="my-picker" @click="openDatePicker">
                        <input type="text" v-model="formatDatePickerValue" disabled>
                        <img src="../../assets/image/icon/icon_drop_down.png">
                    </div>
                    <mt-datetime-picker
                            ref="picker"
                            type="date"
                            :startDate="currentDatetime"
                            @confirm="datePickerConfirm">
                    </mt-datetime-picker>
                </div>
                <div class="agent-fee">
                    <p class="title">中介预算</p>
                    <input type="number" placeholder="请输入金额（元）" v-model.trim="agentBudget">
                </div>
                <div class="focus-tags">
                    <p class="title">核心关注</p>
                    <v-tags :is-clickable="true" :is-multiply="true" :tags="focusTag" @sendData="getFocusTag"></v-tags>
                </div>
            </div>

        </div>
        <div class="confirm-search">
            <button class="custom-btn-big" @click="goSearch">火速开找</button>
        </div>
    </div>
</template>

<script>
    import vTags from '../tags';

    export default {
        name: "houseDemand",
        components: {
          vTags
        },
        data() {
            return {
                // 整租/合租部分
                rentType: ['整租', '合租'],
                selectedRentType: [],
                selectedFocusTag: [],

                // 核心关注部分
                focusTag: ['干净卫生','新装修','购物方便','吃饭方便','近地铁','物管好'],

                // 预算选择部分
                budgetPicker: {index: 0, value: '0-500'},
                budgetPickerList: {
                    colorCancel: '#0dc6b6',
                    data: [
                        {
                            index: 0,
                            value: '0-500'
                        },
                        {
                            index: 1,
                            value: '500-1000'
                        },
                        {
                            index: 2,
                            value: '1000-1500'
                        },
                        {
                            index: 3,
                            value: '1500-2000'
                        },
                        {
                            index: 4,
                            value: '2000-2500'
                        },
                        {
                            index: 5,
                            value: '2500-3000'
                        },
                        {
                            index: 6,
                            value: '3000以上'
                        },
                    ]
                },

                // 中介预算部分
                agentBudget: '',

                // 中心位置
                place: '',

                // 入住时间选择部分
                currentDatetime: new Date(),
                formatDatePickerValue: this.moment(this.currentDatetime).format('YYYY-MM-DD')
            }
        },
        activated() {
            if (this.$route.params.name) {
                this.place = this.$route.params.name;
            }
        },
        methods: {
            getRentType(data) {
                this.selectedRentType = data;
            },
            getFocusTag(data) {
                this.selectedFocusTag = data;
            },
            openBudgetPicker() { // 打开picker插件
                this.$refs.budgetPickerList.show()
            },
            budgetPickerConfirm (v) { // picker插件点击确认按钮后的操作
                this.budgetPicker.index = v[0]['index'];
                this.budgetPicker.value = v[0]['value'];
            },
            openDatePicker() { // 打开date picker插件
                this.$refs.picker.open();
            },
            datePickerConfirm(date) { // date picker插件点击确认按钮后的操作
                this.formatDatePickerValue = this.moment(date).format('YYYY-MM-DD');
            },
            goSearch() {  // 点火速开找后的操作
                const houseSearchInfo = { // 求租信息集合
                    place: this.place,
                    selectedRentType: this.selectedRentType,
                    budgetPicker: this.budgetPicker,
                    formatDatePickerValue: this.formatDatePickerValue,
                    agentBudget: this.agentBudget,
                    selectedFocusTag: this.selectedFocusTag
                };

                // 获取验证规则
                const validRules =  [
                    this.valid.inputRequired(this.place, "中心位置"),
                    this.valid.tagRequired(this.selectedRentType, "租房方式"),
                    this.valid.inputRequired(this.agentBudget, "中介预算"),
                    this.valid.tagRequired(this.selectedFocusTag, "核心关注")
                ];
                // 验证全部通过才做跳转
                if (!this.valid.getValid(validRules)) {
                    this.util.goPage({ // 跳转到房源页面
                        name: 'houseResource',
                        params: houseSearchInfo
                    });
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .search-demands {
        padding: 0 0.2rem;
        margin-top: 0.2rem;

        .input-content {
            width: 100%;
            height: 0.88rem;
            padding: 0.3rem 0.22rem;
            box-sizing: border-box;
            background-color: @white;
            box-shadow: 0rem 0.01rem 0.06rem 0rem rgba(53, 47, 47, 0.06);
            border-radius: 0.04rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            input {
                width: 85%;
                font-size: 0.25rem;
                &::-webkit-input-placeholder {
                    color: @gray;
                }
                &::-moz-placeholder {
                    color: @gray;
                }
                &:-ms-input-placeholder {
                    color: @gray;
                }
            }
            img {
                width: 0.3rem;
            }
        }

        .type {
            display: flex;
            flex-wrap: wrap;
            padding: 0.3rem 0;
            span {
                background-color: @white;
                padding: 0.19rem 0.58rem;
                font-size: 0.28rem;
                border-radius: 0.34rem;
                border:1px solid #aeaeae;
                color: @gray-dim;
                &:nth-of-type(1) {
                    margin-right: 0.2rem;
                }
                &.type-active {
                    color: white;
                    background-color: @theme-color;
                }
            }
        }

        .type-budget {
            background-color: @white;
            box-shadow: 0rem 0.01rem 0.06rem 0rem
            rgba(53, 47, 47, 0.06);
            border-radius: 0.04rem;
            margin-top: 0.12rem;
            padding: 0.22rem 0.22rem 0.3rem;
            .title {
                font-size: 0.32rem;
            }
            .rent-type {
                border-bottom: 1px solid @gray-lighter;

            }
            .rent-budget {
                margin-top: 0.32rem;
                .budget-select {
                    height: 0.68rem;
                    border-radius: 0.06rem;
                    border: 0.01rem solid @gray-lighter;
                    margin-top: 0.2rem;
                }
            }
        }

        .other-info {
            background-color: @white;
            box-shadow: 0rem 0.01rem 0.06rem 0rem
            rgba(53, 47, 47, 0.06);
            border-radius: 0.04rem;
            margin-top: 0.12rem;
            padding: 0.22rem 0.22rem 0.3rem;
            .title {
                font-size: 0.32rem;
            }
            .check-in-info {
                padding-bottom: 0.3rem;
                border-bottom: 0.01rem solid @gray-lighter;
            }
            .agent-fee {
                margin-top: 0.22rem;
                input {
                    display: inline-block;
                    padding-left: 0.22rem;
                    margin-top: 0.3rem;
                    width: 100%;
                    height: 0.68rem;
                    border-radius: 0.06rem;
                    box-sizing: border-box;
                    border: 0.01rem solid @gray-lighter;
                }
                padding-bottom: 0.3rem;
                border-bottom: 0.01rem solid @gray-lighter;
            }
            .focus-tags {
                margin: 0.22rem 0 1.5rem;
                .type {
                    span {
                        padding: 0.19rem 0.38rem;
                        &:nth-of-type(2) {
                            margin-right: 0.2rem;
                        }
                        &:nth-of-type(4) {
                            margin-right: 0.2rem;
                            margin-top: 0.2rem;
                        }
                        &:nth-of-type(5) {
                            margin-right: 0.2rem;
                            margin-top: 0.2rem;
                        }
                        &:nth-of-type(6) {
                            margin-top: 0.2rem;
                        }
                    }
                }
            }
        }
    }

    .confirm-search {
        width: 100%;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        margin: 0;
        padding: .16rem .3rem;
        box-shadow: 0px 1px 20px 0px rgba(176, 176, 176, 0.31);
        background-color: @white;
    }

    .tags-wrap {
        margin-top: 0.3rem;
        margin-bottom: 0.1rem;
    }
</style>
