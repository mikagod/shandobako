<template>
  <div class="container">
    <div class="identify-title">个人身份信息认证</div>
    <div class="introduction">请上传本人身份证件，确保图片清晰，四角完整</div>
    <div class="divider"></div>

    <div class="identify-card">
      <!-- 身份证 -->
      <img class="idImg" :src="IDcard.front" style="" />
      <Upload
        v-model:file-list="fileList"
        :action="url"
        :max-count="1"
        @preview="handlePreview"
        :headers="headers"
        :showUploadList="false"
        @change="handleChange"
        :on-success="handleSuccess"
      >
        <div class="id-card-submit-button">上传</div>
      </Upload>
    </div>

    <div class="green-alert" v-if="isGreen">您上传的身份证照片符合规范，请您核对如下信总是否匹配</div>

    <div class="form">
<!--      <span class="input-label">真实姓名</span>-->
<!--      <span class="input-text"><el-input  v-model="userdata.trueName" /></span>-->
    </div>
    <div class="form">
<!--      <span class="input-label">身份证号码</span>-->
<!--      <span class="input-text"><el-input   v-model="userdata.idNumber" /></span>-->
    </div>
    <div class="red-alert" v-show="false">
      您的身份证件照片与信息不匹配，请检查后再提交！
    </div>
<!--    <div class="submit-button" @click="submit()">确认提交</div>-->
    
  </div>
  
</template>

<script setup>
import { message, Upload } from "ant-design-vue";
import Cookies from "js-cookie";
import { reactive } from "vue";
import { idCardSubmit } from "../../../axios/api";

let router = useRouter();
const goto = (path) => router.push(path);

const phone = ref(18148764734);
const IDcard = reactive({
  front: "/src/assets/img/personalPage/identify/def_idCard.png",
  back: "",
});
const url = ref('https://www.shandobako.com/api/api/OCRVerification?phone='+localStorage.getItem('superUserPhone'))
// const url = ref('http://127.0.0.1:8080/api/OCRVerification?phone='+localStorage.getItem('superUserPhone'))
const handleChange = (info) => {
  if (info.file.status !== "uploading") {
    message.success(`正在解析身份证`);
  }
  if (info.file.status === "done") {
  } else if (info.file.status === "error") {
    message.error(`你上传的身份证有异常`);
  }
};
const handleSuccess = (res) => {
  if (res.code == 0) {
    message.success(`身份证解析成功！`);
    userdata.trueName = res.data.trueName;
    userdata.idNumber = res.data.idNumber;
    IDcard.front = res.data.idNumberUrl;
    console.log(fileList.value[0]);
    isGreen.value = true;
    goto("/identifyQuery");
  } else {
    message.error(res.msg);
  }
};
const fileList = ref([]);
const headers = {
  token: Cookies.get("token"),
};
const idImgURL = ref('');
const userdata = reactive({
  trueName: "",
  idNumber: "",
  phone: localStorage.getItem('superUserPhone')
});
const isGreen = ref(false);
const submit = async () =>{
  if(userdata.trueName==""||userdata.idNumber==""){
    message.error('信息缺失，请检查后重新提交');
    return;
  }
  const res = await idCardSubmit(userdata);
  goto('/identifyQuery');
  console.log(res);
}
</script>

<style lang="scss" scoped>
@import "./../../../assets/font/font.css";

.container {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  flex-direction: column;
  line-height: 10px;
  .id-card-submit-button {
    margin-top: 20px;
    display: flex;
    border-radius: 10px;
    background-color: #3dccff;
    color: #fff;
    text-align: center;
    width: 100px;
    font-size: 18px;
    height: 40px;
    text-decoration: none;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
  .submit-button {
    margin-top: 20px;
    display: flex;
    border-radius: 20px;
    background-color: #4b63b8;
    color: #fff;
    text-align: center;
    width: 170px;
    font-size: 23px;
    height: 50px;
    text-decoration: none;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
  .identify-title {
    font-size: 30px;
    color: #546bbc;
    font-family: medium;
    font-weight: 100;
    margin-bottom: 80px;
  }

  .introduction {
    text-align: left;
    font-size: 18px;
    width: 80%;
    height: 20px;
    color: #7c7c7c;
  }

  .divider {
    border-top: 1px solid #dee2f2;
    width: 80%;
  }

  .identify-card {
    margin-top: 20px;
    width: 563px;
    height: 349px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    border: 3px solid #dbdbdb;
    border-radius: 15px;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 30px;
    .idImg{
      width: 290px;
      height: 177px;
    }
    .card-title {
      font-size: 24px;
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }

  .green-alert {
    color: #1cd95d;
    height: 18px;
    margin-bottom: 20px;
    font-size: 18px;
    text-align: left;
    width: 90%;
  }

  .form {
    flex-wrap: row;
    position: relative;
    display: flex;
    font-family: medium;
    font-weight: 100;
    margin-bottom: 20px;
    font-size: 18px;
    .input-label {
      width: 100px;
      display: flex;
      align-items: center;
      color: #4c64b8;
    }
    .input-text {
      width: 240px;
    }
  }
  .red-alert {
    font-size: 14px;
    display: flex;
    align-items: center;
    color: #ff3232;
    font-family: medium;
  }
}

@media only screen and (max-width: 940px) {
  .container {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  line-height: 10px;
  width: 100%;
  height: 600px;
  top: -128px;
  scale: 0.85;
  .id-card-submit-button {
    margin-top: 20px;
    display: flex;
    border-radius: 10px;
    background-color: #3dccff;
    color: #fff;
    text-align: center;
    width: 100px;
    font-size: 18px;
    height: 40px;
    text-decoration: none;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
  .submit-button {
    margin-top: 20px;
    display: flex;
    border-radius: 20px;
    background-color: #4b63b8;
    color: #fff;
    text-align: center;
    width: 170px;
    font-size: 23px;
    min-height: 50px;
    text-decoration: none;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
  .identify-title {
    font-size: 30px;
    color: #546bbc;
    font-family: medium;
    font-weight: 100;
    margin-bottom: 64px;
  }

  .introduction {
    text-align: center;
    font-size: 16px;
    white-space: nowrap;
    width: 100%;
    height: 20px;
    color: #7c7c7c;
  }

  .divider {
    border-top: 1px solid #dee2f2;
    width: 80%;
  }

  .identify-card {
    margin-top: 20px;
    width: 470px;
    height: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    border: 3px solid #dbdbdb;
    border-radius: 15px;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 30px;
    .idImg{
      width: 290px;
      height: 177px;
    }
    .card-title {
      font-size: 24px;
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }

  .green-alert {
    color: #1cd95d;
    height: 18px;
    margin-bottom: 20px;
    font-size: 18px;
    text-align: left;
    width: 90%;
  }

  .form {
    flex-wrap: row;
    position: relative;
    display: flex;
    font-family: medium;
    font-weight: 100;
    margin-bottom: 20px;
    font-size: 18px;
    .input-label {
      width: 100px;
      display: flex;
      align-items: center;
      color: #4c64b8;
    }
    .input-text {
      width: 240px;
    }
  }
  .red-alert {
    font-size: 14px;
    display: flex;
    align-items: center;
    color: #ff3232;
    font-family: medium;
  }
}
}
</style>
