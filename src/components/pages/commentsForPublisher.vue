<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="publisher-comments">
            <v-comments :commentsInfo="commentsInfo"></v-comments>
        </div>
    </div>
</template>

<script>
    import vComments from '../../components/comments'

    export default {
        name: "commentsForPublisher",
        components: {
            vComments
        },
        data(){
            return{
                commentsInfo: {
                    hasPictures: false,
                    comments: ''
                }
            }
        },
        methods: {
            getPublisherComments() {
                const that = this;
                this.axios.post({
                    url: '/comment-service/user/getComments',
                    loading: true,
                    data: {
                        targetUid: this.$route.params.publisherid,
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
            this.getPublisherComments();
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";
    .publisher-comments{
        margin: .2rem;
        padding: .2rem;
        background-color: @white;
    }
</style>
