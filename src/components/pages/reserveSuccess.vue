<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="main-content">
            <img src="../../assets/image/icon/icon_success.png" alt="">
            <p>预约申请已提交<br>请耐心等待发布者确认预约</p>
            <button class="custom-btn-big" @click="bookSuccess">完成</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reserveSuccess",
        methods: {
            bookSuccess() {  // 点完成之后的操作
                // 1. 将预定房源信息加入store
                const reservedHouseInfo = {
                    "name": "保利星语天涯国际1期",
                    "imgUrl": "",
                    "price": 2200,
                    "meter": 500,
                    "area": 88,
                    "type": "3室两厅1卫",
                    "longitude": 104.050779,
                    "latitude": 30.551915,
                    "tags": ["房屋安静","干净整洁","交通方便"]
                };
                this.$store.commit('setReservedHouseInfo', reservedHouseInfo);

                // 2. 跳转到意向房源页面
                this.util.goPage('myIntention');
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .main-content {
        box-sizing: border-box;
        padding-left: .3rem;
        padding-right: .3rem;
        padding-top: 0;
        text-align: center;
        img {
            width: 2rem;
            height: 2rem;
            margin-top: 1.61rem;
            margin-bottom: .59rem;
        }
        p {
            font-size: .4rem;
            line-height: .54rem;
            margin-bottom: 1.9rem;
        }
    }
</style>
