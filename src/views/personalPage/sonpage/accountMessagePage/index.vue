<script setup>
import { ref } from "vue";
import {
  DatePicker,
  message,
  TimePicker,
  Upload,
  Button,
  SelectOption,
} from "ant-design-vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getUserData,
  updateUser,
  getAddress,
} from "./../../../../axios/api.js";
import { ElNotification } from "element-plus";
import Cookies from "js-cookie";
import store from "../../../../store/index.js";
import { onMounted } from "vue";
import localStorageObject from "../../../../store/localStorageObject.js";
const handleChange = (info) => {
  if (info.file.status !== "uploading") {
    message.success(`正在解析头像`);
  }
  if (info.file.status === "done") {
  } else if (info.file.status === "error") {
    message.error(`你上传的头像有异常`);
  }
};
const handleSuccess = (res) => {
  if (res.code == 0) {
    message.success(`头像上传成功！`);
    reloadUserData();
  } else {
    message.error(res.msg);
  }
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传jpg或者png格式头像!");
  }
  const isLt1M = file.size / 1024 / 1024 < 1;
  if (!isLt1M) {
    message.error("上传头像不得超过1MB");
  }
  return isJpgOrPng && isLt1M;
};
const fileList = ref([]);
const headers = {
  token: Cookies.get("token"),
};
dayjs.locale("zh-cn");
let router = useRouter();

const goto = (path) => router.push(path);
onMounted(() => {
  reloadUserData();
});

const reloadUserData = () => {
  nameActive.value = false;
  resumeActive.value = false;
  emailActive.value = false;
  addressActive.value = false;
  birthActive.value = false;
  // 这里需要延迟一秒是因为，刚修改完数据库的内容后马上读取会导致脏读
  setTimeout(() => {
    user_info.value.phone = localStorage.getItem("superUserPhone");
    getUserData(user_info.value)
      .then(async (res) => {
        if (res.data.code == "0") {
          // console.log("结果", res);
          user_info.value = res.data.data;
          const parts = '' ;
          let year = ''; // 年份
          let month = ''; // 月份
          let day = ''; // 日
          let hour = ''; // 小时
          if (user_info.value.userDate) {
            const parts = user_info.value.userDate.split("-") ;
             year = parts[0]; // 年份
             month = parts[1]; // 月份
             day = parts[2]; // 日
             hour = parts[3]; // 小时
          }


          user_info.value.userDate = `${year}年${month}月${day}日${hour}时`;
          passwordStyle.value.color = user_info.value.passwordLevel;

          //优化黄色等级的密码显示
          if (passwordStyle.value.color == "yellow") {
            passwordStyle.value.color = "#fbc02d";
          }

          // 获取地址
          const aRes = await getAddress({ userId: user_info.value.sdid });
          if (aRes.data.code == 401) {
            addressExist.value = false;
          } else {
            addressExist.value = true;
            const addressRes = aRes.data.data;
            const addressInfo =
              addressRes.consigneeName +
              " " +
              addressRes.addressPhone +
              " " +
              (addressRes.postalCode ? addressRes.postalCode + " " : +"") +
              addressRes.area +
              " " +
              addressRes.specificAddress;
            user_info.value.address = addressInfo;
          }
          // console.log("用户信息：", user_info.value);
        } else {
          // alert(res.data.msg + '为了安全考虑，关闭浏览器后需重新登录')
          // goto("/login");
        }
      })
      .finally(() => {
        // console.log("用户信息：", user_info.value);
      });
  }, 1000);
};
const isHover = ref(false);
const currentUpdate = ref("");
const getHoverSrc = (v) => {
  if (v === currentUpdate.value) {
    return "/src/assets/img/personalPage/accountMessage/update_A.png";
  } else {
    return "/src/assets/img/personalPage/accountMessage/update.png";
  }
};
const user_info = ref({
  sdid: "",
  userName: "",
  phone: "",
  password: "",
  userInfo: "",
  email: "",
  address: "",
  userDate: "",
  userPhoto: "",
});
const updateData = ref({
  phone: user_info.value.phone,
  userName: "",
  userInfo: "",
  email: "",
  userDate: "",
});
const clearUpdateData = () => {
  updateData.value = {
    phone: user_info.value.phone,
    userName: "",
    userInfo: "",
    email: "",
    userDate: "",
  };
};

const address = ref("");
const dateFormat = "YYYY年MM月DD日";
const birth = ref("");
const birth_hour = ref("");
const birthOne = () => {
  return window.innerWidth > 1024 ? "请输入您的生日日期" : "生日";
};
const birthTwo = () => {
  return window.innerWidth > 1024 ? "请选择你的生辰" : "时";
};

const nameActive = ref(false);
const resumeActive = ref(false);
const emailActive = ref(false);
const addressActive = ref(false);
const birthActive = ref(false);
const updateUserName = () => {
  nameActive.value = true;
  clearUpdateData();
  updateData.value.userName = user_info.value.userName;
};
const updateInfo = () => {
  resumeActive.value = true;
  clearUpdateData();
  updateData.value.userInfo = user_info.value.userInfo;
};
const updateEmail = () => {
  emailActive.value = true;
  clearUpdateData();
  updateData.value.email = user_info.value.email;
};
const updateDate = () => {
  birthActive.value = true;
  clearUpdateData();
};

const submitUpdate = (type) => {
  if (type == "birth") {
    updateData.value.userDate += birth.value;
    updateData.value.userDate += birth_hour.value;
  }
  updateData.value.sdid = user_info.value.sdid;
  updateUser(updateData.value).then((res) => {
    if (res.data.code != 0) {
      ElNotification.warning({
        title: "修改失败",
        message: res.data.msg,
        showClose: false,
        duration: 5000,
      });
    } else {
      ElNotification.success({
        title: "修改成功！",
        message: type == "userName" ? "用户名一年仅可修改3次" : "",
        showClose: false,
      });
      debugger
      if (type == "userName") {
        user_info.value.userName = updateData.value.userName;
        alert("请重新登录！")
        router.push('/login');
      }
    }
  });
  reloadUserData();
};
// 对手机号进行  *  处理
const getHiddenPhone = () => {
  user_info.value.phone;
  return user_info.value.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
};
// 对邮箱号进行 * 处理
const maskedEmail = () => {
  // 使用正则表达式匹配邮箱的用户名部分和域名部分
  var regex = /^(.)(.*)(.@.*)$/;

  // 使用 replace 方法替换中间三位字符为星号
  var maskedEmail =user_info.value.email ? user_info.value.email.replace(
    regex,
    function (match, firstChar, middlePart, domainPart) {
      var maskedMiddlePart = middlePart.replace(/./g, "*");
      return firstChar + maskedMiddlePart + domainPart;
    }
  ) : '';

  return maskedEmail;
};
// id号复制
const copy = () => {
  const textToCopy = user_info.value.sdid; // 替换为你要复制的字符串
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      message.success("复制成功，您的ID为：" + textToCopy);
    })
    .catch((error) => {
      console.error("复制失败:", error);
    });
};
const passwordStyle = ref({
  color: "#ff9898",
  fontSize: "18px",
});
const addressExist = ref(false);
const options = ref([...Array(24)].map((_, i) => ({ value: i })));
</script>
<template>
  <div class="account-message-index-container">
    <!-- 用户头像 -->
    <span class="icon">
      <!-- <img src="./../../../../assets/img/personalPage/accountMessage/def_icon.png" style=""> -->
      <img :src="user_info.userPhoto" style="" />
<!--       action="http://127.0.0.1:8080"-->
      <Upload
        v-model:file-list="fileList"
        action="https://www.shandobako.com/api/api/upload"
        :showUploadList="false"
        :headers="headers"
        @change="handleChange"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
      >
        <img
          class="update"
          :src="getHoverSrc('icon')"
          @mouseover="currentUpdate = 'icon'"
          @mouseout="currentUpdate = ''"
        />
      </Upload>
    </span>

    <div class="divider"></div>

    <!-- 用户名 -->
    <div class="unit">
      <img
        src="./../../../../assets/img/personalPage/accountMessage/name.png"
      />
      <span class="key">预测专家</span>
      <font v-show="!nameActive" class="contentInput" style="color: #8f8f8f">{{
        user_info.userName
      }}</font>
      <img
        class="update"
        v-show="!nameActive"
        :src="getHoverSrc('name')"
        @mouseover="currentUpdate = 'name'"
        @mouseout="currentUpdate = ''"
        @click="updateUserName()"
      />
      <el-input
        v-show="nameActive"
        v-model="updateData.userName"
        class="elInput"
      />
      <img
        v-show="nameActive"
        src="./../../../../assets/img/personalPage/accountMessage/yes.png"
        @click="submitUpdate('userName')"
      />
      <img
        v-show="nameActive"
        src="./../../../../assets/img/personalPage/accountMessage/no.png"
        @click="nameActive = false"
      />
    </div>
    <div class="divider"></div>

    <!-- id -->
    <div class="unit">
      <img src="./../../../../assets/img/personalPage/accountMessage/id.png" />
      <span class="key">SSID</span>
      <font v-show="!idActive" class="contentInput" style="color: #8da1ff">{{
        user_info.sdid
      }}</font>
      <img
        src="./../../../../assets/img/personalPage/accountMessage/copy.png"
        @click="copy()"
      />
      <font v-show="!idActive" class="blue"> 这是您唯一的ID号，请妥善保存</font>
    </div>
    <div class="divider"></div>

    <!-- 密码 -->
    <div class="unit">
      <img
        src="./../../../../assets/img/personalPage/accountMessage/password.png"
      />
      <span class="key">密码</span>
      <font
        v-show="!passwordActive"
        class="contentInput"
        :style="passwordStyle"
      >
        {{ user_info.password }}
      </font>
      <img
        class="update"
        v-show="!passwordActive"
        :src="getHoverSrc('password')"
        @mouseover="currentUpdate = 'password'"
        @mouseout="currentUpdate = ''"
        @click="goto('repswd')"
      />
    </div>
    <div class="divider"></div>

    <!-- 手机 -->
    <div class="unit">
      <img
        src="./../../../../assets/img/personalPage/accountMessage/phone.png"
      />
      <span class="key">手机</span>
      <font v-show="!phoneActive" class="contentInput" style="color: #8f8f8f">{{
        getHiddenPhone()
      }}</font>
      <img
        class="update"
        v-show="!phoneActive"
        :src="getHoverSrc('phone')"
        @mouseover="currentUpdate = 'phone'"
        @mouseout="currentUpdate = ''"
        @click="goto('rephone')"
      />
    </div>
    <div class="divider"></div>

    <!-- 简介 -->
    <div class="unit" style="height: 100px">
      <img
        src="./../../../../assets/img/personalPage/accountMessage/resume.png"
      />
      <span class="key">个人简介</span>
      <font
        v-show="!resumeActive"
        class="contentInput"
        style="
          color: #8f8f8f;
          width: 350px;
          line-height: 30px;
          text-align: left;
        "
      >
        {{
          user_info.userInfo && user_info.userInfo.length > 38
            ? user_info.userInfo.slice(0, 38)
            : user_info.userInfo
        }}
      </font>
      <img
        class="update"
        v-show="!resumeActive"
        :src="getHoverSrc('resume')"
        @mouseover="currentUpdate = 'resume'"
        @mouseout="currentUpdate = ''"
        @click="updateInfo()"
      />
      <el-input
        v-show="resumeActive"
        style="width: 350px; line-height: 30px; text-align: left"
        v-model="updateData.userInfo"
        class="elInput"
      />
      <img
        v-show="resumeActive"
        src="./../../../../assets/img/personalPage/accountMessage/yes.png"
        @click="submitUpdate()"
      />
      <img
        v-show="resumeActive"
        src="./../../../../assets/img/personalPage/accountMessage/no.png"
        @click="resumeActive = false"
      />
    </div>
    <div class="divider"></div>

    <!-- 邮箱 -->
    <div class="unit">
      <img
        src="./../../../../assets/img/personalPage/accountMessage/email.png"
      />
      <span class="key">邮箱</span>
      <font v-show="!emailActive" class="contentInput" style="color: #8f8f8f">{{
        maskedEmail()
      }}</font>
      <img
        class="update"
        v-show="!emailActive"
        :src="getHoverSrc('email')"
        @mouseover="currentUpdate = 'email'"
        @mouseout="currentUpdate = ''"
        @click="updateEmail()"
      />
      <el-input
        v-show="emailActive"
        v-model="updateData.email"
        class="elInput"
      />
      <img
        v-show="emailActive"
        src="./../../../../assets/img/personalPage/accountMessage/yes.png"
        @click="submitUpdate()"
      />
      <img
        v-show="emailActive"
        src="./../../../../assets/img/personalPage/accountMessage/no.png"
        @click="emailActive = false"
      />
    </div>
    <div class="divider"></div>

    <!-- 生日 -->
    <div class="unit" style="width: 40vw">
      <img
        src="./../../../../assets/img/personalPage/accountMessage/birth.png"
      />
      <span class="key">阳历生日</span>
      <font v-show="!birthActive" class="contentInput" style="color: #8f8f8f">{{
        user_info.userDate
      }}</font>
      <img
        class="update"
        v-show="!birthActive"
        :src="getHoverSrc('birth')"
        @mouseover="currentUpdate = 'birth'"
        @mouseout="currentUpdate = ''"
        @click="updateDate()"
      />
      <DatePicker
        v-show="birthActive"
        v-model:value="birth"
        class="elInput"
        style="width: 9vw; top :0vw;right: 0vw"
        :format="dateFormat"
        :placeholder="birthOne()"
        valueFormat="YYYY-MM-DD-"
        :locale="locale"
      />
      <!-- <TimePicker v-show="birthActive" v-model:value="birth_hour" format="HH时" valueFormat="HH" :locale="locale" /> -->

      <el-select
        v-model="birth_hour"
        v-show="birthActive"
        class="elInput birth-hour"
        :placeholder="birthTwo()"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <img
        v-show="birthActive"
        src="./../../../../assets/img/personalPage/accountMessage/yes.png"
        @click="submitUpdate('birth')"
      />
      <img
        v-show="birthActive"
        src="./../../../../assets/img/personalPage/accountMessage/no.png"
        @click="birthActive = false"
      />
    </div>
    <div class="divider"></div>

    <!-- 地址 -->
    <div class="unit" style="height: 100px">
      <img
        src="./../../../../assets/img/personalPage/accountMessage/address.png"
      />
      <span class="key">地址管理</span>

      <font
        v-show="!addressActive"
        class="contentInput"
        style="
          color: #8f8f8f;
          width: 430px;
          line-height: 30px;
          text-align: left;
        "
      >
        {{
          user_info.address != null && user_info.address.length > 60
            ? user_info.address.slice(0, 60)
            : user_info.address
        }}
      </font>
      <img
        v-show="!addressActive"
        :src="getHoverSrc('address')"
        @mouseover="currentUpdate = 'address'"
        @mouseout="currentUpdate = ''"
        class="update"
        @click="goto('/updateAddress/' + user_info.sdid + '/' + addressExist)"
      />
    </div>
    <div class="divider"></div>

    <!-- 注销 -->
    <div class="unit">
      <img src="./../../../../assets/img/personalPage/accountMessage/out.png" />
      <span class="key">账号注销</span>
      <a @click="goto('/account_logout/' + user_info.sdid)" class="logout"
        >立即注销</a
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "./../../../../assets/font/font.css";

.account-message-index-container {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  flex-direction: column;
  padding-left: 50px;
  line-height: 10px;

  .icon {
    position: absolute;
    top: 40px;
    right: 50px;
    width: 178px;
    height: 178px;
    overflow: hidden;

    img {
      border-radius: 178px;
    }

    .update {
      position: absolute;
      top: 5px;
      right: 2px;
    }
  }

  .unit {
    width: 680px;
    text-align: left;
    height: 60px;
    display: flex;
    align-items: center;
    color: #ff9072;
    font-size: 22px;
    font-family: medium;

    //.elInput {
    //  right: 2.5vw;
    //  top: -16px;
    //  width: 10vw;
    //}
    .elInput {
      width: 150px;
    }

    .contentInput {
      padding-left: 20px;
      padding-right: 30px;
      text-align: center;
      color: #8f8f8f;
    }

    img {
      margin-right: 20px;
    }

    .blue {
      color: #979eff;
      font-size: 15px;
      padding-left: 20px;
      padding-right: 30px;
      text-align: center;
      font-weight: 300;
      padding-top: 10px;
    }
    .logout {
      padding-left: 20px;
      padding-right: 30px;
      text-align: center;
      color: #ffbc4d;
      font-size: 18px;
    }
  }

  .divider {
    width: 80%;
    border-top: 1px solid #efefef;
    /* 上边框为1像素宽的实线 */
    margin: 10px 0;
    /* 设置分割线上下的外边距 */
  }
}
@media only screen and (max-width: 940px) {
  .account-message-index-container {
    // 这里面一个都不能删
    padding-top: 400px;
    flex-direction: column;
    padding-left: 0px;
    padding-bottom: 520px;
    line-height: 10px;
    width: 100%;
    .icon {
      top: 0px;
      right: 50%;
      width: 128px;
      height: 128px;
      display: flex;
      overflow: hidden;
      transform: translate(50%, 0) scale(0.7);
      img {
        border-radius: 178px;
      }

      .update {
        position: absolute;
        top: 5px;
        right: 2px;
      }
    }
    .unit {
      width: 100%;
      text-align: left;
      height: 36px;
      display: flex;
      align-items: center;
      color: #000000;
      font-size: 14px;
      font-family: medium;
      .update {
        position: absolute;
        right: 0px;
      }
      .elInput {
        min-width: 80px;
      }

      .birth-hour {
        min-width: 64px;
      }

      .contentInput {
        min-width: 87px;
        max-width: 160px;
        height: 24px;
        line-height: 24px;
        text-align: left;
        padding-left: 8px;
        padding-right: 8px;
        color: #8f8f8f;
        white-space: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
      }
      .key {
        display: flex;
        transform: scale(1);
        font-weight: 100;
        padding-top: 0px;
        margin-left: -30px;
        min-width: 64px;
        height: 10px;
      }

      img {
        transform: scale(0.5);
        margin-right: 20px;
      }

      .logout {
        font-size: 10px;
        color: #ef9090;
        padding-left: 0;
      }
      .blue {
        padding-left: 0;
        font-size: 14px;
        width: auto;
        line-height: 16px;
        scale: 0.8;
        // white-space: nowrap;
        overflow-x: visible;
      }
    }
    .divider {
      width: 100%;
    }
  }
}
</style>
