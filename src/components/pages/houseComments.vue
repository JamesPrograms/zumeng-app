<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="house-tags">
            <v-tags :tags="houseTags"></v-tags>
        </div>
        <div class="house-comments">
            <div class="card-title">租户评论</div>
            <v-comments :commentsInfo="commentsInfo"></v-comments>
        </div>
    </div>
</template>

<script>
    import vTags from '../../components/tags'
    import vComments from '../../components/comments'

    export default {
        name: 'houseComments',
        components: {
            vTags,
            vComments,
        },
        data() {
            return {
                houseTags: this.$route.params.tags,
                commentsInfo: {
                    hasPictures: true,
                    comments: ''
                }
            }
        },
        methods: {
            getHouseComments() {
                const that = this;
                this.axios.post({
                    url: '/comment-service/house/getComments',
                    loading: true,
                    data: {
                        houseid: this.$route.params.houseid,
                        pageIndex: 1,
                        pageSize: 5
                    },
                    sucFunc(response) {
                        that.commentsInfo.comments = response.data;
                    }
                });
            }
        },
        mounted() {
            this.getHouseComments();
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .wrapper {
        > div {
            background-color: @white;
            box-shadow: 0px 1px 6px 0px rgba(53, 47, 47, 0.06);
            border-radius: 4px;
        }
    }

    .house-tags {
        margin: .2rem;
        padding: .2rem;
    }

    .house-comments {
        margin: .2rem;
        padding: .2rem;
        .card-title {
            margin-bottom: .3rem;
        }
    }
</style>
