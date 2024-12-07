<template>
  <div class="container">
    <img class="logout-img" src="./../../../../assets/img/personalPage/accountMessage/login_out/谢谢.png">
    <div class="text">
      <div class="one">感谢您陪伴时空坐标 SDBK 走过一段珍贵的生命旅程...</div>
      <div class="two">愿有缘再见~</div>
      <div class="three">-5s后返回主页-</div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
const route = useRoute();
let router = useRouter();
const goto = (path) => router.push(path);
onMounted(() => {
  setTimeout(() => {
    
    goto('login');

  }, 5000);
})
</script>

<style lang="scss" scoped>
@import "./../../../../assets/font/font.css";

.container {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  flex-direction: column;
  padding-left: 30px;
  line-height: 10px;

  .logout-button {
    margin: 20px;
    padding-top: 100px;
  }

  .logout-img {
    margin-bottom: 40px;
  }

  .back {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .text {
    font-size: 30px;
    color: #546bbc;
    font-family: medium;
    font-weight: 100;
    margin: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    line-height: 100px;

    .one {}

    .two {
      color: #50ff74;
    }

    .three {
      color: #ff7be4;
      font-size: 18px;
      margin-top: 60px;
    }
  }


}

@media only screen and (max-width: 940px) {
  .container {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  flex-direction: column;
  padding-left: 30px;
  line-height: 10px;

  .logout-button {
    margin: 20px;
    padding-top: 100px;
  }

  .logout-img {
    margin-bottom: 40px;
  }

  .back {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .text {
    font-size: 30px;
    color: #546bbc;
    font-family: medium;
    font-weight: 100;
    margin: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    line-height: 100px;

    .one {}

    .two {
      color: #50ff74;
    }

    .three {
      color: #ff7be4;
      font-size: 18px;
      margin-top: 60px;
    }
  }


}
}
</style>