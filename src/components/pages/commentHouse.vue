<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="card">
            <h1 class="card-title">房屋详情</h1>
            <textarea class="textarea" placeholder="请简要描述一下你的房屋状况哦" v-model="rating"></textarea>
            <v-upload-img @fileChange="changeImage"></v-upload-img>
        </div>
        <div class="card">
            <h1 class="card-title">标签</h1>
            <v-label :label-arr="labelArr" @delLabel="delLabel"></v-label>
            <button class="add-tag-btn" @click="addLabel">
                <img src="../../assets/image/icon/icon_add_tag.png">
                添加标签
            </button>
        </div>

        <div class="bottom-btn-wrap"  @click="next">
            <button class="custom-btn-big">下一步</button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import VLabel from "../../components/label"
    import VUploadImg from "../../components/uploadImg"


    export default {
        data() {
          return {
              rating: '',
              labelArr: [],
              files: []
          }
        },
        mounted() {
            this.labelArr = this.$store.state.selectedLabel
            console.log(this.labelArr)
        },
        methods: {
            addLabel() {
                this.$router.push('addLabel')
            },
            delLabel(labelArr) {
                this.labelArr = labelArr
            },
            next() {
                this.$store.commit('setHouseInfo', {
                    tag: this.labelArr,
                    rating: this.rating,
                    files: this.files
                })

                console.log(this.labelArr)
                this.$router.push('rentalInfo')

            },
            changeImage(files) {
                this.files = files
            }

        },
        components: {
            VLabel,
            VUploadImg
        }
    }

</script>

<style lang="less" scoped>

    .textarea {
        width: 100%;
        height: 2.6rem;
        background-color: #f9f9f9;
        box-sizing: border-box;
        border-radius: 0.06rem;
        border: solid 1px #dddddd;

    }



    .add-tag-btn {
        width: 100%;
        height: .68rem;
        border: solid 1px #dddddd;
        border-radius: 0.34rem;
        box-sizing: border-box;
        font-size: 0.28rem;
        background-color: #ffffff;

        img {
            width: 0.2rem;
            height: 0.2rem;
        }
    }
</style>
