<template>
    <div class="tags-wrap" v-if="!isClickable">
        <span class="tag" v-for="(item,index) in tags" :key="index">{{item}}</span>
    </div>
    <div class="tags-wrap" v-else>
        <span class="tag tag-clickable" v-for="(item,index) in tags" :key="index"
              @click="tagsClick(item)" :class="{'clicked':checkActive(item)}">{{item}}</span>
    </div>
</template>

<script>
    export default {
        name: "tags",
        props: {
            isClickable: {
                type: Boolean,
                default: false
            },
            isMultiply: {
                type: Boolean,
                default: false
            },
            tags: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                currValArr: []
            }
        },
        methods: {
            checkActive(item) {
                if (this.isMultiply === false) {
                    this.currValArr.length = 1;
                }
                return this.currValArr.indexOf(item) !== -1;
            },
            tagsClick(item) {
                //单选
                if (this.isMultiply === false) {
                    this.$set(this.currValArr, 0, item) // 将该值设为当前数组的第一项
                } else {
                    //多选
                    if (this.currValArr.indexOf(item) === -1) {
                        // 当前数组中没有该值则push到数组
                        this.currValArr.push(item)
                    } else {
                        //当前数组中有该值，找到该值下标并删除
                        this.currValArr.splice(this.currValArr.indexOf(item), 1)
                    }
                }
                // 向父组件传值
                this.$emit('sendData', this.currValArr);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/style/variable";

    .tags-wrap {
        font-size: 0; // 去除inline-block的间隙
        .tag {
            display: inline-block;
            padding: .15rem .24rem;
            margin-right: .2rem;
            margin-bottom: .2rem;
            background-color: @white;
            border: solid 1px #dddddd;
            border-radius: 27px;
            font-family: @font-family-medium;
            font-size: .24rem;
            color: @gray;
        }
        .tag-clickable {
            font-family: @font-family-regular;
            font-size: .28rem;
            color: #353535;
            padding: .2rem .4rem;
            border-radius: 34px;
            &.clicked {
                background-color: #ebfffd;
                border-color: #0ec6b5;
                color: #0ec6b5;
            }
        }
    }
</style>
