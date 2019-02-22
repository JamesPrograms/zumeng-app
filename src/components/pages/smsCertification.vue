<template>
    <div class="wrapper has-bg-img">
        <v-header></v-header>
        <div class="main-content">
            <div class="tip-msg">
                <img src="../../assets/image/icon/warning_icon.png" alt="提示">
                <p>
                    短信已发送至<span class="tel-num">{{phoneNum}}</span>的手机号，请输入6位验证码 。
                </p>
            </div>
            <div class="input-wrap">
                <span class="input-icon"><img src="../../assets/image/icon/shield_icon.png" alt="验证"></span>
                <input type="text" placeholder="请输入验证码">
                <span class="count-down" v-show="!isTimeUp">
                    <span>{{countDown}}'</span>
                </span>
                <span class="sms-resend" v-show="isTimeUp">
                    重新发送
                </span>
            </div>
            <button class="confirm custom-btn" :class="{'btn-enable':!hasError}" @click="submitData()">确认</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "smsCertification",
        data() {
            return {
                phoneNum:'15892217761',
                countDown:60,
                isTimeUp:false,
                hasError:false
            }
        },
        methods: {
            submitData() {
                // 调用接口进行认证
                /*this.axios.post('/user-service/verify', {
                    'name': this.username,
                    'phone': this.phoneNum,
                    'idcardtype': 1,
                    'idcardnum': this.idNum,

                }).then(response => {

                }).catch(error => {

                })*/
                // 跳转到首页
                this.$router.push('houseResource');
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
