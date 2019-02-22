<template>
    <div class="allocations-wrap" v-if="allocations.length > 0">
        <div class="allocation" v-for="(allocation,index) in allAllocations" :key="index" v-if="allocations[index]">
            <img :src="allocation.icon_on_src" alt="">
            <p>{{allocation.name}}</p>
        </div>
    </div>
    <div class="allocations-wrap" v-else>
        <div class="allocation" v-for="(allocation,index) in allAllocations" :key="index" @click="changeState(index)">
            <img :src=" allocation.isSelected?allocation.icon_on_src:allocation.icon_src" alt="">
            <p>{{allocation.name}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "allocations",
        props: {
            allocations: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                allAllocations: [
                    {
                        icon_src: require('../assets/image/icon/icon_washingmachine.png'),
                        icon_on_src: require('../assets/image/icon/icon_washingmachine_on.png'),
                        name: '洗衣机',
                        isSelected: false
                    },
                    {
                        icon_src: require('../assets/image/icon/icon_airconditioning.png'),
                        icon_on_src: require('../assets/image/icon/icon_airconditioning_on.png'),
                        name: '空调',
                        isSelected: false
                    },
                    {
                        icon_src: require('../assets/image/icon/icon_refrigerator.png'),
                        icon_on_src: require('../assets/image/icon/icon_refrigerator_on.png'),
                        name: '冰箱',
                        isSelected: false
                    },
                    {
                        icon_src: require('../assets/image/icon/icon_TV.png'),
                        icon_on_src: require('../assets/image/icon/icon_TV_on.png'),
                        name: '电视',
                        isSelected: false
                    },
                    {
                        icon_src: require('../assets/image/icon/icon_desk.png'),
                        icon_on_src: require('../assets/image/icon/icon_desk_on.png'),
                        name: '书桌',
                        isSelected: false
                    },
                    {
                        icon_src: require('../assets/image/icon/icon_wardrobe.png'),
                        icon_on_src: require('../assets/image/icon/icon_wardrobe_on.png'),
                        name: '衣柜',
                        isSelected: false
                    },
                    {
                        icon_src: require('../assets/image/icon/icon_bed.png'),
                        icon_on_src: require('../assets/image/icon/icon_bed_on.png'),
                        name: '床',
                        isSelected: false
                    },
                    {
                        icon_src: require('../assets/image/icon/icon_sofa.png'),
                        icon_on_src: require('../assets/image/icon/icon_sofa_on.png'),
                        name: '沙发',
                        isSelected: false
                    },
                    {
                        icon_src: require('../assets/image/icon/icon_heating.png'),
                        icon_on_src: require('../assets/image/icon/icon_heating_on.png'),
                        name: '暖气',
                        isSelected: false
                    },
                    {
                        icon_src: require('../assets/image/icon/icon_waterheater.png'),
                        icon_on_src: require('../assets/image/icon/icon_waterheater_on.png'),
                        name: '热水器',
                        isSelected: false
                    },
                    {
                        icon_src: require('../assets/image/icon/icon_balcony.png'),
                        icon_on_src: require('../assets/image/icon/icon_balcony_on.png'),
                        name: '独立阳台',
                        isSelected: false
                    },
                    {
                        icon_src: require('../assets/image/icon/icon_broadband.png'),
                        icon_on_src: require('../assets/image/icon/icon_broadband_on.png'),
                        name: '宽带',
                        isSelected: false
                    },
                    {
                        icon_src: require('../assets/image/icon/icon_microwaveoven.png'),
                        icon_on_src: require('../assets/image/icon/icon_microwaveoven_on.png'),
                        name: '微波炉',
                        isSelected: false
                    },
                    {
                        icon_src: require('../assets/image/icon/icon_cook.png'),
                        icon_on_src: require('../assets/image/icon/icon_cook_on.png'),
                        name: '可做饭',
                        isSelected: false
                    }
                ]
            }
        },
        methods: {
            changeState(index) {
                const that = this;
                let state = that.allAllocations[index].isSelected;
                that.allAllocations[index].isSelected = !state;
                that.$emit('sendData', {i: index, selected: that.allAllocations[index].isSelected})
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/style/variable";

    .allocations-wrap {
        display: flex;
        flex-wrap: wrap;
        margin-top: .09rem;
        .allocation {
            margin-left: .3rem;
            margin-right: .3rem;
            margin-bottom: .4rem;
            text-align: center;
            &:nth-child(5n+5) {
                margin-right: 0;
            }
            img {
                width: .8rem;
                height: .8rem;
                margin-bottom: .12rem;
            }
            p {
                font-size: .2rem;
                color: @gray-dim;
            }
        }
    }
</style>
