<template>
  <div class="login-center-wrap">
    <div
      style="margin-bottom: 24px"
      class="column is-half-mobile is-one-third-tablet is-one-fifth-desktop"
    ></div>
    <div class="mypoint">
      <div
        id="section"
        class="box has-text-centered-tablet container is-widescreen"
      >
        <div action="success.html" method="post">
          <img :src="nametext.url"  style="width: 90vw;height: auto"  />

          <h1
            style="
              font-size: 20px;
              font-family: 微软雅黑;
              color: dodgerblue;
              margin-bottom: 20px;
              text-align: center;
            "
          >
            <b>--- 用户登录 ---</b>
          </h1>

          <div class="geshi">
            <div class="field mt-2" v-if="logshow == '2'">
              <label
                class="label has-text-left-tablet"
                style="color: darkviolet"
                >用户名

                <div class="control">
                  <input
                    class="input is-info"
                    type="text"
                    name="userName"
                    v-model="userdata.userName"
                    placeholder="请输入您的用户名"
                    maxlength="20"
                    style="border-width: 2px"
                    pattern="\w{3,20}"
                    required
                  />
                </div>
              </label>
            </div>

            <div class="field mt-2" v-if="logshow == '2'">
              <label
                class="label content has-text-left-mobile has-text-left-tablet"
                style="color: darkviolet"
                >密码
                <div class="control">
                  <input
                    class="input is-info"
                    v-model="userdata.password"
                    type="password"
                    name="pwd"
                    placeholder="请输入您的密码"
                    maxlength="16"
                    style="border-width: 2px"
                    pattern="\w{6,16}"
                    required
                  />
                </div>
              </label>
            </div>

            <div class="field mt-2" v-if="logshow == '1'">
              <label
                class="label has-text-left-tablet"
                style="color: darkviolet"
                >手机号

                <div class="control">
                  <input
                    class="input is-info"
                    type="text"
                    name="userName"
                    v-model="userphone.phone"
                    placeholder="请输入您的手机号"
                    maxlength="20"
                    style="border-width: 2px"
                    pattern="\w{3,20}"
                    required
                  />
                </div>
              </label>
            </div>

            <div class="field mt-2" v-if="logshow == '1'">
              <label
                class="label content has-text-left-mobile has-text-left-tablet"
                style="color: darkviolet"
                >验证码
                <div class="control">
                  <input
                    class="input iphone-wrap is-info"
                    v-model="userphone.code"
                    type="password"
                    name="pwd"
                    placeholder="请输入验证码"
                    maxlength="16"
                    style="border-width: 2px"
                    pattern="\w{6,16}"
                    required
                  />
                  <button
                    class="codebtn button is-info is-outlined is-normal"
                    :disabled="btnclicn"
                    @click="getcode"
                  >
                    {{ btntext }}
                  </button>
                </div>
              </label>
            </div>

            <!--点击登录-按钮-->
            <div class="control" style="margin-top: 15px; text-align: center">
              <input
                type="submit"
                name="sub"
                value="点击登录"
                :disabled="lontnshow"
                @click="submint"
                style="width: 100%"
                class="button is-info is-outlined is-normal mt-2"
              />
            </div>

            <div class="control" style="margin-top: 15px; text-align: center">
              <span style="cursor: pointer" @click="logshow = '2'"
                >账号密码登陆</span
              >
              |
              <span style="cursor: pointer" @click="logshow = '1'"
                >手机号登陆</span
              >
              |
              <span tyle="cursor: pointer;" @click="$router.push('/restpwd')">
                忘记密码
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getHomeConfiguration, login} from "../axios/api.js";
import {ref, watch} from "vue";
import Cookies from "js-cookie";
import {useRoute, useRouter} from "vue-router";
import { useStore } from "vuex";
import { GetCode, loginsms, auths } from "../axios/api.js";

import { ElNotification } from "element-plus";
import store from "../store/index.js";
import localStorageObject from "../store/localStorageObject.js";



const nametext = ref({
  url: '/src/assets/img/shandobako.png'
})

const shandobako_colorful = getHomeConfiguration(0).then((res)=> {
  if (res.data.code == '0') {
    nametext.value.url =   res.data.data.url;
  }
})



const open = (data) => {
  ElNotification.success({
    title: "登录成功！",
    message: data.username + "，你好，欢迎回来",
    showClose: false,
    duration: 1000,
    type: "success",
  });
};
const fail = (data) => {
  ElNotification.warning({
    title: "登录失败",
    message: "缺少账号或密码",
    showClose: false,
    duration: 5000,
  });
};

let logshow = ref("1");
let btnclicn = ref(false);
let lontnshow = ref(false);
let btntext = ref("发送验证码");
const userdata = ref({
  userdata: "",
  password: "",
  gender: "0",
  nian: "",
  yue: "",
  ri: "",
  shi: "",
});
let userdata1 = ref({
  name: "",
  password: "",
});
let userphone = ref({
  phone: "",
  code: "",
  type: "login",
  name: "",
  password: "",
  level: null,
});
const router = useRouter();
const getcode = () => {
  var reg =
    "^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-9])|(18[0-9])|166|198|199|191|(147))\\d{8}$";
  var regExp = new RegExp(reg);
  if (regExp.test(userphone.value.phone)) {
    GetCode({
      phone: userphone.value.phone,
      type: "login",
    }).then((res) => {
      // console.log(res)
      if (res.data.code == "0") {
        let time = 60;
        btnclicn.value = true;
        let timer = setInterval(() => {
          time = time - 1;
          btntext.value = time + "s";

          if (time < 1) {
            clearInterval(timer);
            btntext.value = "发送验证码";
            btnclicn.value = false;
          }
        }, 1000);
      }
    });
  } else {
    alert("手机号格式错误");
    return false;
  }
};
const submint = () => {
  if (logshow.value == "1") {
    if (userphone.value.phone == "" || userphone.value.code == "") {
      fail();
      return false;
    } else {
      lontnshow.value = true;
      loginsms(userphone.value)
        .then((res) => {
          if (res.data.code == "0") {
            Cookies.set("token", res.data.data);
            Cookies.set("username", res.data.username);
            Cookies.set("userdata", JSON.stringify(res.data.data));
            store.dispatch("loginok", res.data.data);
            // auths({
            //   newPassword: res.data.data,
            //   phone: "15119380977",
            // });
            localStorage.setItem("superUserPhone", res.data.phone);
            localStorage.setItem("superUserToken", res.data.token);
            localStorageObject.setToken(res.data.token);
            localStorageObject.setUserName(res.data.username);
            localStorageObject.setPhone(res.data.phone);
            localStorageObject.setMemberLevel(res.data.memberLevel)
            store.state.phone = res.data.phone;
            store.state.user_name = res.data.username;
            router.push("/main");
            open(res.data);
          } else {
            alert(res.data.msg);
          }
        })
        .finally(() => {
          lontnshow.value = false;
        });
    }
  } else {
    if (userdata.value.name == "" || userdata.value.password == "") {
      alert("请输入必填内容");
      return false;
    } else {
      lontnshow.value = true;
      login(userdata.value)
        .then((res) => {
          console.log(res);

          if (res.data.code == "0") {
            Cookies.set("token", res.data.data);
            Cookies.set("username", res.data.username);

            localStorage.setItem("superUserPhone", res.data.phone);
            localStorage.setItem("superUserToken", res.data.token);
            localStorageObject.setToken(res.data.token);
            localStorageObject.setUserName(res.data.username);
            localStorageObject.setPhone(res.data.phone);
            localStorageObject.setMemberLevel(res.data.memberLevel)
            Cookies.set("userdata", JSON.stringify(res.data.data));
            store.state.phone = res.data.phone;
            store.state.user_name = res.data.username;
            store.dispatch("loginok", res.data.data);
            router.push("/main");
            open(res.data);
          } else {
            alert(res.data.msg);
          }
        })
        .finally(() => {
          lontnshow.value = false;
        });
    }
  }
};
</script>

<style>
@import url("../assets/css/login.css");

.login-center-wrap {
  background-color: #7b68ee;
  padding-bottom: 30px;
}

.iphone-wrap {
  width: 70%;
}

.codebtn {
  width: 30%;
}
</style>
