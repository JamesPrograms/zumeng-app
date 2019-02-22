<template>
    <div class="house-info">
        <div class="basic-info">
            <div class="info">
                <img src="../assets/image/test.jpg">
                <div class="desc">
                    <p class="house-name">{{houseInfo.name}}</p>
                    <p class="house-size">{{houseInfo.size}}</p>
                    <p class="house-price"><span>&yen;{{houseInfo.rentPrice}}</span>/月</p>
                </div>
            </div>
            <a :href="`tel:${houseInfo.phoneNum}`" class="phone-icon">
                <img src="../assets/image/icon/icon_phone.png">
            </a>

            <div class="type-tag">{{houseInfo.type}}</div>
        </div>
        <v-tags :is-clickable="false" :tags="houseInfo.tags" class="house-tag"></v-tags>
        <p class="book-info" v-if="houseInfo.bookInfo" :class="{'theme-color': houseInfo.type === '待确认'}">{{houseInfo.bookInfo}}</p>
        <div class="buttons">
            <tag-btn :btnInfos="houseInfo.btnInfos"></tag-btn>
        </div>
    </div>
</template>

<script>
    import vTags from './tags';
    import tagBtn from './tagBtn';
    export default {
        name: "houseInfo",
        props: {
            houseInfo: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        components: {
            vTags,
            tagBtn
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/style/variable";

    .house-info {
        background-color: @white;
        box-shadow: 0rem 0.01rem 0.06rem 0rem rgba(53, 47, 47, 0.06);
        border-radius: 0.04rem;
        padding: 0.26rem 0.23rem 0;
        .basic-info {
            height: 1.6rem;
            display: flex;
            justify-content: space-between;
            position: relative;
            .info {
                display: flex;
                img {
                    width: 1.8rem;
                    height: 100%;
                }
                .desc {
                    margin-left: 0.12rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    .house-name {
                        font-size: 0.32rem;
                        color: @black-bright;
                    }
                    .house-size {
                        font-size: 0.28rem;
                        color: @gray-dim;
                    }
                    .house-price {
                        font-size: 0.24rem;
                        color: @gray-dim;
                        span {
                            font-size: 0.38rem;
                            color: @theme-color;
                        }
                    }
                }
            }
            .phone-icon {
                margin-right: 0;
               img {
                   width: 0.6rem;
                   height: 0.6rem;
               }
            }
            .type-tag {
                font-size: 0.24rem;
                background-color: #efefef;
                width: 1.2rem;
                height: 0.44rem;
                box-sizing: border-box;
                padding: 0.12rem 0.12rem 0.12rem 0.28rem;
                border-radius: 0.22rem 0rem 0rem 0.22rem;
                position: absolute;
                top: 1.08rem;
                right: -0.23rem;
            }
        }
        .house-tag {
            margin-top: 0.2rem;
            border-bottom: dashed 0.01rem @gray-lighter;
        }
        .book-info {
            height: 1rem;
            line-height: 1rem;
            font-size: 0.32rem;
            border-bottom: dashed 0.01rem @gray-lighter;
        }
        .theme-color {
            color: @theme-color;
        }
    }
</style>