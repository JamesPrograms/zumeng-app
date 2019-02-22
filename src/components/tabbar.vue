<template>
    <ul class="tabbar">
        <router-link to="/houseResource" tag="li">
            <div class="icon-house"></div>
            <p>房源</p>
        </router-link>
        <router-link to="/myHouseResource" tag="li">
            <div class="icon-my-house"></div>
            <p>我的房源</p>
        </router-link>
        <router-link to="/myIntention" tag="li">
            <div class="icon-my-intention"></div>
            <p>  我的意向</p>
        </router-link>
        <router-link to="/setting" tag="li">
            <div class="icon-setting"></div>
            <p>个人中心</p>
        </router-link>
    </ul>
</template>

<script>
    export default {
        name: 'tabbar'
    }
</script>

<style lang="less" scoped>
    // 引入雪碧图less文件
    @import '../assets/style/sprite.less';

    .tabbar {
        width: 100%;
        height: 0.98rem;
        background-color: #ffffff;
        box-shadow: 0rem 0.01rem 0.2rem 0rem
        rgba(176, 176, 176, 0.31);
        position: fixed;
        display: flex;
        bottom: 0;
        justify-content: space-around;
        font-size: 0.2rem;
        color: #888888;

        .icon-house {
            .sprite(@icon-home);
        }
        .icon-my-house {
            .sprite(@icon-myhouse);
        }
        .icon-my-intention {
            .sprite(@icon-like);
        }
        .icon-setting {
            .sprite(@icon-mine);
        }

        .active {
            font-weight: normal;
            font-stretch: normal;
            color: #12caaf;
            .icon-house {
                .sprite(@icon-home-on);
            }
            .icon-my-house {
                .sprite(@icon-myhouse-on);
            }
            .icon-my-intention {
                .sprite(@icon-like-on);
            }
            .icon-setting {
                .sprite(@icon-mine-on);
            }
        }

        li {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            p {
                margin-top: 0.1rem;
            }
        }
    }
</style>