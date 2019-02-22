<template>
    <div class="comments-wrapper">
        <div class="comment-list" :class="{'padding-bottom-10':!commentsInfo.hasPictures}" v-for="(item,index) in commentsInfo.comments" :key="index">
            <div class="commentator-info">
                <img class="avatar" :src="require(`../assets/image/${item.avatarUrl}`)" alt="">
                <p class="nickname">{{item.username}}</p>
                <p class="publish-date">{{item.date}}</p>
            </div>
            <div class="comment-text">
                {{item.comment}}
            </div>
            <div class="house-pictures" v-if="commentsInfo.hasPictures">
                <div class="pic" v-for="(pic ,i) in item.pictures" :key="i">
                    <img :src="require(`../assets/image/${pic}`)" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'comments',
        props: {
            commentsInfo: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {}
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/style/variable";

    .padding-bottom-10 {
        padding-bottom: .1rem;
    }

    .comments-wrapper {
        /*margin: .2rem;
        padding: .2rem;
        background-color: @white;*/
        box-shadow: 0px 1px 6px 0px rgba(53, 47, 47, 0.06);
        border-radius: 4px;
        /*.card-title {
            font-family: @font-family-bold;
            font-size: .32rem;
            color: @black;
            margin-bottom: .3rem;
        }*/
        .comment-list {
            border-bottom: 1px solid #dddddd;
            margin-bottom: .3rem;
            &:last-child {
                border-bottom: none;
            }
            .commentator-info {
                display: flex;
                margin-bottom: .2rem;
                .avatar {
                    width: .9rem;
                    height: .9rem;
                    border-radius: 100%;
                    margin-right: .1rem;
                }
                .nickname {
                    font-family: @font-family-medium;
                    font-size: .28rem;
                    color: @black;
                    align-self: center;
                }
                .publish-date {
                    font-family: @font-family-regular;
                    font-size: .2rem;
                    color: #b2b2b2;
                    text-align: right;
                    align-self: center;
                    flex-grow: 1;
                }
            }
            .comment-text {
                font-family: @font-family-regular;
                font-size: .24rem;
                color: @gray;
                line-height: .26rem;
                margin-bottom: .2rem;
            }

            .house-pictures {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: .3rem;
                .pic {
                    width: 2.1rem;
                    height: 1.2rem;
                    background-color: #aeaeae;
                    border: solid 1px #dddddd;
                    &:nth-child(2) {
                        margin: 0 .1rem;
                    }
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
