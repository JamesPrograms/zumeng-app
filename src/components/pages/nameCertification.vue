<template>
    <div class="wrapper has-bg-img">
        <v-header></v-header>
        <div class="main-content">
            <div class="tip-msg">
                <img src="../../assets/image/icon/warning_icon.png" alt="提示">
                <p>为了让保障各位租友的利益，信息的可靠，均需实名注册，你的个人信息不会被泄露。</p>
            </div>
            <v-input v-for="data in inputData" :inputAttr="data" :key="data.iconSrc"></v-input>
            <button class="next custom-btn" :class="{'btn-enabled':!hasError}" @click="nextStep()">下一步</button>
            <button class="skip custom-btn" @click="goPage()">暂时跳过</button>
        </div>
    </div>
</template>

<script>
    import vInput from '../input'

    export default {
        name: "nameCertification",
        components: {
            vInput
        },
        data() {
            return {
                inputData: [
                    {
                        type: 'text',
                        value:'',
                        placeholder: '请输入您的姓名',
                        iconSrc: require('../../assets/image/icon/user_icon.png'),
                    },
                    {
                        type: 'text',
                        value:'',
                        placeholder: '请输入您的身份证号',
                        iconSrc: require('../../assets/image/icon/id_card_icon.png'),
                    },
                    {
                        type: 'text',
                        value:'',
                        placeholder: '请输入您的电话号码',
                        iconSrc: require('../../assets/image/icon/tel_num_icon.png'),
                    }
                ],
                hasError: true
            }
        },
        methods: {
            checkInputVal() {

            },
            nextStep() {
                // 1.判断输入值是否有效
                /*if (!checkInputVal()) {
                    return;
                }*/
                // 跳转到短信认证页
                this.$router.push('smsCertification');
            },
            goPage() {
                // 跳转到首页
                this.$router.push('houseResource');
            }
        },
        watch: {},
        mounted(){

        },
        created(){

        }
    }
</script>

<style lang="less" scoped>

</style>
