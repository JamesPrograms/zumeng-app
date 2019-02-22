<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="main-content">
            <img src="../../assets/image/icon/icon_success.png">
            <p>恭喜您成功租房<br>您的意向房源将全部清空</p>
            <button class="custom-btn-big">确认</button>
            <p class="attention">记得把你空出的房源发布给其他租友哦</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reserveSuccess",
        methods: {

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
        .attention {
            margin-top: 0.1rem;
            font-size: 0.28rem;
        }
    }
</style>
