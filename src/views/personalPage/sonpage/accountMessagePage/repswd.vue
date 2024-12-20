<template>
  <div class="repswd-container">
    <img
      class="back"
      src="./../../../../assets/img/personalPage/accountMessage/login_out/back.png"
      @click="goto('/accountMessage')"
    />
    <div class="content-wrap" style="text-align: center">
      <h1>
        <span v-if="steps == '1'">重置密码</span>
        <span v-if="steps == '2'">手机号码验证</span>
        <span v-if="steps == '3' || steps == '4'">发送验证码</span>
        <span v-if="steps == '5'">设置新密码</span>
      </h1>
      <br />
      <span v-if="steps == '1'">使用手机号验证 找回密码</span>
      <span v-if="steps == '2'">请输入您绑定账号的手机号码</span>
      <span v-if="steps == '5'"
        >为保障您的帐号安全，请重新设置密码；
        密码不少于6位，至少包含字母/数字/符号2种组合。</span
      >
      <br />
      <img
        v-if="steps == '1'"
        src="../../../../assets/img/restpwd/1.gif"
        alt=""
      />
      <img
        v-if="steps == '2'"
        src="../../../../assets/img/restpwd/2.gif"
        alt=""
      />
      <img
        v-if="steps == '3'"
        src="../../../../assets/img/restpwd/3.gif"
        alt=""
      />
      <img
        v-if="steps == '5'"
        src="../../../../assets/img/restpwd/5.gif"
        alt=""
      />
      <br />
      <div v-if="steps == '2'" class="step-2-wrap">
        <div class="l-text">请输入你的手机号</div>
        <div class="r-wrap">
          <div class="leftbox">+86</div>
          <input type="text" placeholder="请输入你的手机号" v-model="phone" />
        </div>
      </div>
      <!-- <div v-if="steps == '5'" class="step-3-wrap">
            <div class="l-text">
                验证码：
            </div>
    
            <button @click="ajaxcode" :disabled="btntext != '重新发送'" :style="{backgroundColor:btntext != '重新发送' ? '#CCC' :'#FFB0B0'}">
                {{btntext}}
            </button>
        </div> -->
      <div v-if="steps == '5'" class="step-5-wrap" style="">
        <div class="item">
          <div>设置新密码:</div>
          <input type="text" placeholder="新密码（最受6位数）" v-model="pwd" />
        </div>
        <div class="item">
          <div>再次输入密码:</div>
          <input type="text" placeholder="再次确认" v-model="pwds" />
        </div>
        <div class="item">
          <div>验证码:</div>
          <input type="text" placeholder="请输入验证码" v-model="code" />
          <button
            @click="ajaxcode"
            class="codebtn"
            :disabled="btntext != '重新发送'"
            :style="{
              backgroundColor: btntext != '重新发送' ? '#CCC' : '#FFB0B0',
            }"
          >
            {{ btntext }}
          </button>
        </div>
      </div>
      <button v-if="steps == '1'" @click="steps = '2'">下一步</button>
      <button v-if="steps == '2'" @click="step2">下一步</button>
      <button v-if="steps == '3'" @click="step3">下一步</button>
      <br />
      <button
        v-if="steps == '5'"
        style="width: 150px"
        @click="save"
        class="savebtn"
      >
        保存并重新登陆
      </button>
      <br />
      <div class="bottomtext" v-if="steps == '1'">
        手机号无法使用？<span>联系我们</span>
      </div>
      <div class="bottomtext" v-if="steps == '4'">
        收不到验证码？<span>联系我们</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage, ElLoading } from "element-plus";
import { GetCode, resetpassword } from "../../../../axios/api.js";
import { useRouter, onBeforeRouteLeave } from "vue-router";
const steps = ref("1");
const phone = ref("");
const code = ref("");
const pwd = ref("");
const pwds = ref("");
const btntext = ref("重新发送");
const router = useRouter();
const goto = (path) => router.push(path);

onMounted(() => {
  console.log("onMounted");
});

onBeforeRouteLeave(() => {
  steps.value = "1";
});

const save = () => {
  if (code.value == "") {
    ElMessage.error("请输入验证码");
  } else {
    if (pwd.value.length < 6) {
      ElMessage.error("新密码不能小于6位数");
    } else {
      if (pwd.value != pwds.value) {
        ElMessage.error("两次输入的密码不同");
      } else {
        resetpassword({
          phone: phone.value,
          code: code.value,
          password: pwds.value,
        }).then((res) => {
          if (res.data.code == "0") {
            ElMessage.success("修改成功");
            router.push("/login");
          } else {
            ElMessage.error(res.data.msg);
          }
        });
      }
    }
  }
};
const ajaxcode = () => {
  GetCode({ phone: phone.value, type: "resetPassword" }).then((res) => {
    if (res.data.code == "0") {
      ElMessage.success("发送成功");
      let num = 120;
      let timer = setInterval(() => {
        num--;
        btntext.value = num + "s 后重新发送";
        if (num <= 0) {
          clearInterval(timer);
          btntext.value = "重新发送";
        }
      }, 1000);
    } else {
      ElMessage.error(res.data.msg);
    }
  });
};
const step3 = () => {
  if (code.value == "") {
    ElMessage.error("请输入验证码");
  } else {
  }
};
const step2 = () => {
  if (phone.value == "") {
    ElMessage.error("请输入手机号");
  } else {
    var reg =
      "^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-9])|(18[0-9])|166|198|199|191|(147))\\d{8}$";
    var regExp = new RegExp(reg);
    if (!regExp.test(phone.value)) {
      ElMessage.error("请输入正确手机号");
    } else {
      GetCode({ phone: phone.value, type: "resetPassword" }).then((res) => {
        if (res.data.code == "0") {
          ElMessage.success("发送成功");
          steps.value = "5";
          let num = 120;
          let timer = setInterval(() => {
            num--;
            btntext.value = num + "s 后重新发送";
            if (num <= 0) {
              clearInterval(timer);
              btntext.value = "重新发送";
            }
          }, 1000);
        } else {
          ElMessage.error(res.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.repswd-container {
  padding-top: 150px;

  .back {
    position: absolute;
    top: 40px;
    left: 32px;
  }
}

@media screen and (max-width: 998px) {
  .bottomtext {
    margin-left: 0 !important;
  }
}

@media screen and (max-width: 537px) {
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

@media screen and (max-width: 374px) {
  .step-5-wrap .item div {
    text-align: left !important;
    width: 250px !important;
  }
}

.codebtn {
  width: auto;
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
  color: #8c5bff;
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
  text-align: right;
  width: 120px;
}

.step-5-wrap .item * {
  display: inline-block;
}

.step-3-wrap > div {
  display: inline-block;
}

.step-5-wrap button {
  border: 0px;
  background-color: #ffb0b0;
  font-size: 14px;
  color: #fff;
  margin-left: 10px;
  padding: 5px 35px;
  box-sizing: border-box;
  border-radius: 10px;
}

.step-3-wrap .l-text {
  color: #8c5bff;
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

.step-2-wrap > div {
  display: inline-block;
}

.step-2-wrap .l-text {
  font-size: 16px;
  color: #8c5bff;
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
}

.bottomtext span {
  color: #8c5bff;
}

.content-wrap h1 {
  font-size: 30px;
  font-weight: bold;
  color: #4470ff;
  text-align: center;
  border-bottom: 3px solid #4470ff;
  display: inline-block;
  width: 215px;
  margin: 0 auto;
  font-family: 微软雅黑;
}

.content-wrap > span {
  font-size: 16px;
  color: #3200da;
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

.content-wrap > button {
  background-color: #89a5ff;
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
    padding-top: 150px;

    .back {
      position: absolute;
      top: 20px;
      left: 0%;
    }
  }

  .codebtn {
    width: auto;
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
    color: #8c5bff;
    font-size: 16px;
    font-weight: bold;
    margin-right: 5px;
    text-align: right;
    width: 120px;
  }

  .step-5-wrap .item * {
    display: inline-block;
  }

  .step-3-wrap > div {
    display: inline-block;
  }

  .step-5-wrap button {
    border: 0px;
    background-color: #ffb0b0;
    font-size: 14px;
    color: #fff;
    margin-left: 10px;
    padding: 5px 35px;
    box-sizing: border-box;
    border-radius: 10px;
  }

  .step-3-wrap .l-text {
    color: #8c5bff;
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

  .step-2-wrap > div {
    display: inline-block;
  }

  .step-2-wrap .l-text {
    font-size: 16px;
    color: #8c5bff;
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
  }

  .bottomtext span {
    color: #8c5bff;
  }

  .content-wrap {
    position: absolute;
    width: 100%;
    height: 900px;
  }

  .content-wrap h1 {
    font-size: 30px;
    font-weight: bold;
    color: #4470ff;
    text-align: center;
    border-bottom: 3px solid #4470ff;
    display: inline-block;
    width: 215px;
    margin: 0 auto;
    font-family: 微软雅黑;
  }

  .content-wrap > span {
    font-size: 16px;
    color: #3200da;
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

  .content-wrap > button {
    background-color: #89a5ff;
    color: #fff;
    width: 113px;
    height: 54px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 10px;
    border: 0px;
    margin: 40px auto;
  }
}
</style>
