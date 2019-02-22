<template>
    <div class="wrapper has-bg-img">
        <v-header></v-header>
        <div class="desc">
            <img src="../../assets/image/pig.png">
            <p class="desc-word">
                <img src="../../assets/image/zumeng.png">
                <span class="point">&bull;</span>
                <span class="word">租客互助是一家</span>
            </p>
        </div>
        <div class="login">
            <p class="login-title">
                <span class="line"></span>
                <span class="title">微信授权登录</span>
                <span class="line"></span>
            </p>
            <div class="button">
                <img src="../../assets/image/wechat_login.png" @click="toHouseResource">
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'login',
        methods: {
            toHouseResource: function () {
                // 在local storage中保存登录状态
                localStorage.setItem('login', true);
                const that = this;
                this.axios.post({
                    url: '/user-service/login',
                    // baseURL: '/api',
                    loading: true,
                    data: {
                        phone: "15208305979",
                        password: "1234"
                    },
                    sucFunc(response) {
                        // document.cookie = "SESSION=" + response.data.sessionID;
                        // that.$store.commit('setUserInfo', response.data);

                        // todo: 暂时先跳到根路径再重定向到houseResource页面，避免直接跳到houseResource页面tabbar不处于active状态
                        that.util.goPage('/');
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable.less";

    .container {
        position: relative;
    }

    .desc {
        margin-top: 1.4rem;

        > img {
            width: 1.94rem;
            display: block;
            margin: 0 auto;
        }

        > .desc-word {
            display: flex;
            margin-top: 0.3rem;
            justify-content: center;
            font-family: @font-family-bold;
            color: @black-bright;
            align-items: center;

            img {
                width: 0.96rem;
            }

            span {
                font-size: 0.36rem;

                &.point {
                    padding: 0 0.1rem;
                }
            }
        }
    }

    .login {
        width: 100%;
        position: absolute;
        bottom: 2.2rem;

        .login-title {
            display: flex;
            justify-content: center;
            align-items: center;

            .line {
                width: 0.6rem;
                height: 1px;
                background-color: @gray-dark;
            }

            .title {
                font-size: 0.24rem;
                padding: 0 0.3rem;
                color: @gray-dim;
            }
        }

        .button {
            display: flex;
            justify-content: center;
            margin-top: 0.3rem;

            > img {
                width: 1.2rem;
                height: 1.2rem;
            }
        }

    }
</style>
