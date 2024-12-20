<template>
    <div class="repswd-container">
        <img class="back" src="./../../../../assets/img/personalPage/accountMessage/login_out/back.png"
            @click="goto('/accountMessage')">
        <div class="content-wrap" style="
    text-align: center;
">
            <h1>
                <span v-if="steps == '1'">重置手机号码</span>
                <span v-if="steps == '2'">原手机号验证</span>
                <span v-if="steps == '3'">发送验证码</span>
                <span v-if="steps == '4'">重置成功</span>
                <span v-if="steps == '5'">设置新手机号码</span>
            </h1>
            <br>
            <span v-if="steps == '1'">使用原手机号验证 重置新的手机号码</span>
            <span v-if="steps == '2'">请输入您原绑定账号的手机号码</span>
            <span v-if="steps == '3'">时空坐标 向您的原手机号发送了验证码</span>
            <span v-if="steps == '4'">新手机号码已设置成功，您可以通过此手机号进行日常登录，祝你好运~</span>
            <span v-if="steps == '5'">请您输入新的手机号码，
                并输入您的账号密码进行重置操作。</span>
            <br>
            <img v-if="steps == '1'" src="../../../../assets/img/restpwd/1.gif" alt="">
            <img v-if="steps == '2'" src="../../../../assets/img/restpwd/2.gif" alt="">
            <img v-if="steps == '3'" src="../../../../assets/img/restpwd/3.gif" alt="">
            <img v-if="steps == '4'" src="../../../../assets/img/restpwd/4.gif" alt="">
            <img v-if="steps == '5'" src="../../../../assets/img/restpwd/5.gif" alt="">
            <br>
            <div v-if="steps == '2'" class="step-2-wrap">
                <div class="l-text">
                    请输入原手机号码：
                </div>
                <div class="r-wrap">
                    <div class="leftbox">
                        +86
                    </div>
                    <input type="text" placeholder="请输入原手机号码" v-model="phone">
                </div>
            </div>

            <div v-if="steps == '5'" class="step-5-wrap" style="">
                <div class="item">
                    <div>
                        新手机号:
                    </div>
                    <input type="text" placeholder="新手机号" v-model="newphone">
                </div>
                <div class="item">
                    <div>
                        账号密码:
                    </div>
                    <input type="text" placeholder="账号密码" v-model="pwds">
                </div>
                <div class="item">
                    <div>
                        验证码:
                    </div>
                    <input type="text" placeholder="请输入验证码" v-model="code">
                    <button @click="ajaxcode5" class="codebtn" v-if="btntext == '发送验证码'"
                        :style="{ backgroundColor: '#FFB0B0' }">
                        {{ btntext }}
                    </button>
                    <button @click="ajaxcode5" class="codebtn" v-else :disabled="btntext != '重新发送'"
                        :style="{ backgroundColor: btntext != '重新发送' ? '#CCC' : '#FFB0B0' }">
                        {{ btntext }}
                    </button>
                </div>
            </div>
            <div v-if="steps == '3'" class="step-5-wrap step-3-wrap" style="">

                <div class="item">
                    <div>
                        验证码:
                    </div>
                    <input type="text" placeholder="请输入验证码" v-model="oldcode">
                    <button @click="ajaxcode" class="codebtn" :disabled="btntext != '重新发送'"
                        :style="{ backgroundColor: btntext != '重新发送' ? '#CCC' : '#FFB0B0' }">
                        {{ btntext }}
                    </button>
                </div>
            </div>
            <div v-if="steps == '4'" class="step-5-wrap" style="">
                -- 10秒后页面将自动跳转到登录界面 --

            </div>
            <br>
            <button v-if="steps == '1'" @click="step1">下一步</button>
            <button v-if="steps == '2'" @click="step2">下一步</button>
            <button v-if="steps == '3'" @click="step3">下一步</button>
            <button v-if="steps == '4'" @click="step4">重新登陆</button>
            <br>
            <button v-if="steps == '5'" @click="save" class="savebtn">下一步</button>
            <br>
            <div class="bottomtext" v-if="steps == '1'">
                原手机号无法收验证码？<span>联系我们</span>
            </div>
            <div class="bottomtext" v-if="steps == '5'">
                收不到验证码？<span>联系我们</span>
            </div>
        </div>
    </div>
</template>

<script setup >
import { ref } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import { GetCode, updatephone, checkphone } from '../../../../axios/api.js'
import { useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import Cookies from 'js-cookie'
const steps = ref('1')
const phone = ref('')
const newphone = ref('')
const code = ref('')
const newcode = ref('')
const oldcode = ref('')
const pwd = ref('')
const pwds = ref('')
const btntext = ref('发送验证码')
const router = useRouter()
const goto = (path) => router.push(path);
var reg = '^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-9])|(18[0-9])|166|198|199|191|(147))\\d{8}$';
var regExp = new RegExp(reg);
var timers;
var timersetInterval;
onBeforeRouteLeave(() => {
    steps.value = '1'
})
const step4 = () => {
    clearTimeout(timers)
    router.push('/login')

}
const step1 = () => {
    if (!Cookies.get('token')) {
        ElMessage.error('请先登陆')
        router.push('/login')

    } else {
        steps.value = '2'
    }

}

const save = () => {
    if (code.value == '') {
        ElMessage.error('请输入验证码')
    } else {

        if (!regExp.test(newphone.value)) {
            ElMessage.error('请输入正确手机号')
        } else {
            if (pwds.value == '') {
                ElMessage.error('请输入密码')
            } else {
                updatephone({ "phone": newphone.value, "name": Cookies.get('username'), "code": code.value, "password": pwds.value }).then((res) => {
                    if (res.data.code == '0') {
                        ElMessage.success('修改成功')
                        steps.value = '4'
                        timers = setTimeout(() => {
                            router.push('/login')
                        }, 1000 * 10);

                    } else {
                        ElMessage.error(res.data.msg)
                    }
                }
                )
            }

        }


    }
}


const ajaxcode = () => {
    GetCode({ "phone": phone.value, "type": "updatePhone" }).then((res) => {
        if (res.data.code == '0') {
            ElMessage.success('发送成功')
            let num = 120
            timersetInterval = setInterval(() => {
                num--
                btntext.value = (num + 's 后重新发送')
                if (num <= 0) {
                    clearInterval(timersetInterval)
                    btntext.value = '重新发送'
                }
            }, 1000);
        } else {
            ElMessage.error(res.data.msg)
        }
    })
}
const ajaxcode5 = () => {
    GetCode({ "phone": newphone.value, "type": "updatePhone" }).then((res) => {
        if (res.data.code == '0') {
            ElMessage.success('发送成功')
            let num = 120
            timersetInterval = setInterval(() => {
                num--
                btntext.value = (num + 's 后重新发送')
                if (num <= 0) {
                    clearInterval(timersetInterval)
                    btntext.value = '重新发送'
                }
            }, 1000);
        } else {
            ElMessage.error(res.data.msg)
        }
    })
}

const step3 = () => {
    if (oldcode.value == '') {
        ElMessage.error('请输入验证码')
    } else {
        checkphone({ "phone": phone.value, "code": oldcode.value, "name": Cookies.get('username') }).then((res) => {
            if (res.data.code == '0') {
                steps.value = '5'
                clearInterval(timersetInterval)
                btntext.value = '发送验证码'
            } else {
                ElMessage.error(res.data.msg)
            }
        })
    }
}
const step2 = () => {

    // ret
    if (phone.value == '') {
        ElMessage.error('请输入手机号')
    } else {

        if (!regExp.test(phone.value)) {
            ElMessage.error('请输入正确手机号')
        } else {
            GetCode({ "phone": phone.value, "type": "updatePhone" }).then((res) => {
                if (res.data.code == '0') {
                    ElMessage.success('发送成功')
                    steps.value = '3'
                    let num = 120
                    timersetInterval = setInterval(() => {
                        num--
                        btntext.value = (num + 's 后重新发送')
                        if (num <= 0) {
                            clearInterval(timersetInterval)
                            btntext.value = '重新发送'
                        }
                    }, 1000);
                } else {
                    ElMessage.error(res.data.msg)
                }
            })
        }
    }
}
</script>


<style scoped lang="scss">
.repswd-container {
    transform: scale(1);
    padding-top: 150px;

    .back {
        position: absolute;
        top: 40px;
        left: 400px;
    }
}

@media screen and (max-width:998px) {
    .bottomtext {
        margin-left: 0 !important;
    }

}

@media screen and (max-width:537px) {
    .step-5-wrap {
        text-align: center !important;
    }

    .codebtn {
        width: 100%;
        margin-top: 20px !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
    }
}

@media screen and (max-width:374px) {
    .step-5-wrap .item div {
        text-align: left !important;
        width: 250px !important;
    }
}

.codebtn {
    width: auto !important;
}

.step-3-wrap button {
    width: auto;
}

.step-3-wrap {
    width: 100%;
    text-align: center !important;
}

button {
    cursor: pointer;
}

.step-5-wrap .item input {
    border: 1px solid #ccc;
    padding: 5px;
    outline: none;
    width: 250px;
}

.step-5-wrap .item {
    margin-bottom: 15px;
    display: block;
}

.step-5-wrap {
    text-align: left;
    display: inline-block;

}

.step-5-wrap .item div {
    color: #8C5BFF;
    font-size: 16px;
    font-weight: bold;
    margin-right: 5px;
    text-align: right;
    width: 120px;
}

.step-5-wrap .item * {
    display: inline-block;
}

.step-3-wrap>div {
    display: inline-block;
}

.step-5-wrap button {
    border: 0px;
    background-color: #FFB0B0;
    font-size: 14px;
    color: #fff;
    margin-left: 10px;
    padding: 5px 35px;
    box-sizing: border-box;
    border-radius: 10px;

}

.step-3-wrap .l-text {
    color: #8C5BFF;
    font-weight: bold;
    font-size: 16px;
}

.step-3-wrap .c-wrap input {
    border: 1px solid #ccc;
    padding: 5px;
    outline: none;
}

.step-2-wrap .r-wrap input {
    display: inline-block;
    width: 180px;
    height: 100%;
    border: 0px;
    outline: none;
    padding-left: 5px;
}

.step-2-wrap .r-wrap .leftbox {
    text-align: center;
    font-weight: bold;
    color: #000;
    padding-right: 10px;
    border-right: 1px solid #ccc;
    display: inline-block;
}

.step-2-wrap>div {
    display: inline-block;
}

.step-2-wrap .l-text {
    font-size: 16px;
    color: #8C5BFF;
    font-weight: bold;
}

.step-2-wrap .r-wrap {
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-left: 10px;
    padding: 0 10px;
    box-sizing: border-box;
}


.bottomtext {
    color: #000;
    font-weight: bold;
    font-size: 16px;
    display: inline-block;
    margin-left: -290px;
}

.bottomtext span {
    color: #8C5BFF;
}

.content-wrap h1 {
    font-size: 30px;
    font-weight: bold;
    color: #4470FF;
    text-align: center;
    border-bottom: 3px solid #4470FF;
    display: inline-block;
    width: 215px;
    margin: 0 auto;
    font-family: 微软雅黑;
}

.content-wrap>span {
    font-size: 16px;
    color: #3200DA;
    font-family: 微软雅黑;
    font-weight: regular;
    display: inline-block;
    margin: 10px auto;
}

.content-wrap img {
    width: 240px;
    height: 240px;
    display: inline-block;
    margin-bottom: 40px;
}

.content-wrap>button {
    background-color: #89A5FF;
    color: #fff;
    width: 113px;
    height: 54px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 10px;
    border: 0px;
    margin: 40px auto;
}

@media only screen and (max-width: 940px) {
    .repswd-container {
        transform: scale(1);
        padding-top: 150px;
        width: 100%;

        .back {
            position: absolute;
            top: 20px;
            left: 0px;
        }
    }

    .codebtn {
        width: auto !important;
    }

    .step-3-wrap button {
        width: auto;
    }

    .step-3-wrap {
        width: 100%;
        text-align: center !important;
    }

    button {
        cursor: pointer;
    }

    .step-5-wrap .item input {
        border: 1px solid #ccc;
        padding: 5px;
        outline: none;
        width: 250px;
    }

    .step-5-wrap .item {
        margin-bottom: 15px;
        display: block;
    }

    .step-5-wrap {
        text-align: left;
        display: inline-block;

    }

    .step-5-wrap .item div {
        color: #8C5BFF;
        font-size: 16px;
        font-weight: bold;
        margin-right: 5px;
        text-align: right;
        width: 120px;
    }

    .step-5-wrap .item * {
        display: inline-block;
    }

    .step-3-wrap>div {
        display: inline-block;
    }

    .step-5-wrap button {
        border: 0px;
        background-color: #FFB0B0;
        font-size: 14px;
        color: #fff;
        margin-left: 10px;
        padding: 5px 35px;
        box-sizing: border-box;
        border-radius: 10px;

    }

    .step-3-wrap .l-text {
        color: #8C5BFF;
        font-weight: bold;
        font-size: 16px;
    }

    .step-3-wrap .c-wrap input {
        border: 1px solid #ccc;
        padding: 5px;
        outline: none;
    }

    .step-2-wrap .r-wrap input {
        display: inline-block;
        width: 180px;
        height: 100%;
        border: 0px;
        outline: none;
        padding-left: 5px;
    }

    .step-2-wrap .r-wrap .leftbox {
        text-align: center;
        font-weight: bold;
        color: #000;
        padding-right: 10px;
        border-right: 1px solid #ccc;
        display: inline-block;
    }

    .step-2-wrap>div {
        display: inline-block;
    }

    .step-2-wrap .l-text {
        font-size: 16px;
        color: #8C5BFF;
        font-weight: bold;
    }

    .step-2-wrap .r-wrap {
        border: 1px solid #ccc;
        border-radius: 3px;
        margin-left: 10px;
        padding: 0 10px;
        box-sizing: border-box;
    }


    .bottomtext {
        color: #000;
        font-weight: bold;
        font-size: 16px;
        display: inline-block;
        margin-left: -290px;
    }

    .bottomtext span {
        color: #8C5BFF;
    }

    .content-wrap {
        position: absolute;
        width: 100%;
        height: 900px;
    }

    .content-wrap h1 {
        font-size: 30px;
        font-weight: bold;
        color: #4470FF;
        text-align: center;
        border-bottom: 3px solid #4470FF;
        display: inline-block;
        width: 215px;
        margin: 0 auto;
        font-family: 微软雅黑;
    }

    .content-wrap>span {
        font-size: 16px;
        color: #3200DA;
        font-family: 微软雅黑;
        font-weight: regular;
        display: inline-block;
        margin: 10px auto;
    }

    .content-wrap img {
        width: 240px;
        height: 240px;
        display: inline-block;
        margin-bottom: 40px;
    }

    .content-wrap>button {
        background-color: #89A5FF;
        color: #fff;
        width: 113px;
        height: 54px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 10px;
        border: 0px;
        margin: 40px auto;
    }
}</style>