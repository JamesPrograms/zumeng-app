<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="card">
            <h1 class="card-title">添加标签</h1>
            <div class="input-wrap">
                <input type="text" placeholder="请输入标签" v-model="tagName">
                <span  class="btn save-btn" @click="addSave">保存</span>
            </div>
            <div class="all-wrap">
                <h1 class="card-title">所有标签</h1>
                <v-tags :tags="tagArr" :isClickable="clickFlg" :is-multiply="true" @sendData="sendData"></v-tags>
            </div>
        </div>
        <div class="bottom-btn-wrap"  @click="saveTag">
            <button class="custom-btn-big">保存</button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import VLabel from "../../components/label"
    import VTags from "../../components/tags"

    export default {
        data() {
            return {
                clickFlg: true,
                tagName: '',
                tagArr: ['房东好', '近地铁', '家电齐全', '物管服务好', '生活便利', '新装修', '不通气'],
                selectedTag: []
            }
        },
        methods: {
            addSave() {
                if (this.tagName !== '') {
                    this.tagArr.push(this.tagName)
                }
            },
            sendData(objData) {
                // 则添加到数组
                this.selectedTag = objData
            },
            saveTag() {
                this.$store.commit('setSelectedLabel', this.selectedTag)
                console.log(this.$store.state.selectedLabel)
                // this.$router.go(-1)
                this.$router.push('commentHouse')
            }
        },
        components: {
            VLabel,
            VTags
        }
    }

</script>

<style lang="less" scoped>

    input::-webkit-input-placeholder {
        color: #888888;
        font-size: 0.28rem;
    }

    textarea::-webkit-input-placeholder {
        color: #888888;
        font-size: 0.28rem;
    }

    .all-wrap {
        margin-top: 0.3rem;
        padding-top: 0.3rem;
        border-top: 1px solid #dddddd;
        box-sizing: border-box;
    }
    .input-wrap {
        display: flex;
        justify-content: space-between;
        >input {
            width: 5rem;
            height: 0.78rem;
            padding-left: 0.2rem;
            border-radius: 0.06rem;
            border: solid 0.01rem #dddddd;
        }

        .save-btn {
            width: 1.2rem;
            height: 0.78rem;
            text-align: center;
            line-height: 0.78rem;
            background-color: #0ec6b5;
            border-radius: 0.06rem;
            font-size: 0.32rem;
            color: #ffffff;
        }
    }

</style>
