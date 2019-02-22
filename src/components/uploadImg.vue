<template>
    <div class="upload-img">
        <div class="preview-image" v-if="files.length" v-for="(file,idx) in files" :key="idx">
            <div @click="previewImage(idx)">
                <img class="show-img" :src="file">
                <img class="delete-img" src="../assets/image/icon/icon_delete.png"
                     @click.stop="onDeleteImg(idx)">
            </div>
        </div>
        <div class="img-wrap" v-if="files.length < 9" @click="chooseImg">
            <input class="input-file" id="upload_img" type="file" accept="image/gif,image/jpeg,image/jpg,image/png"  @change="changeImage($event)">
            <img src="../assets/image/icon/icon_camera.png">
        </div>
        <div class="text-wrap" v-if="files.length === 0">
            上传图片
            <span>添加更多的房屋图片比较吸引租户哦</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    import {MessageBox} from 'mint-ui';

    export default {
        data() {
            return {
                files: []
            }
        },
        methods: {
            onDeleteImg(index) {
                this.files.splice(index, 1)
                //每次用戶进行上传操作，都會觸發數據更新給頁面
                this.$emit('filesChange',this.files)
            },
            chooseImg() {
                document.getElementById('upload_img').click()
            },
            changeImage(e) {
                let file = e.target.files[0]
                // 如果图片数小于9，则添加到数组
                if (this.files.length < 9) {
                    let reader = new FileReader()
                    let that = this
                    reader.readAsDataURL(file)
                    reader.onload= function(e){
                        // 这里的this 指向reader
                        that.files.push(this.result)
                    }
                    this.$emit('fileChange', this.files)
                } else {
                    MessageBox({
                        title: '提示',
                        message: '图片数不能超过9张',
                        confirmButtonText: '知道了'
                    }).then(action => {

                    });
                }
            },
            previewImage() {

            }
        }
    }
</script>

<style lang="less" scoped>
    .img-wrap {
        position: relative;
        display: flex;
        flex: 0 0 22%;
        width: 1.6rem;
        height: 1.6rem;
        margin-top: 0.2rem;
        border-radius: 0.06rem;
        border: solid 1px #dddddd;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        img {
            width: 0.6rem;
            height: 0.49rem;
        }

        .input-file {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
        }
    }
    .upload-img-wrap {
        display: flex;
        flex: 1;
        margin-top: .2rem;
    }
    .text-wrap {
        flex: 0 0 75%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 0.28rem;
        color: #000000;
        padding-left: 0.2rem;
        box-sizing: border-box;
        > span {
            margin-top: .15rem;
            font-size: 0.28rem;
            color: #888888;
        }
    }
    .upload-img {
        display: flex;
        align-content: space-between;
        flex-wrap: wrap;

    }

    .preview-image {
        position: relative;
        display: flex;
        flex: 0 0 22%;
        width: 1.6rem;
        height: 1.6rem;
        justify-content: center;
        margin-top: 0.2rem;
        margin-right: 0.08rem;


        &:nth-child(4n) {
            margin-right: 0;
        }

        > div {
            position: relative;
            width: 1.6rem;
            height: 1.6rem;
            .show-img {
                width: 100%;
                height: 100%;
            }
            .delete-img {
                width: 0.3rem;
                height: 0.3rem;
                position: absolute;
                right: -0.07rem;
                top: -0.12rem;
            }
        }
    }

</style>
