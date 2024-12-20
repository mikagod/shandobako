<template>
  <div class="container">
    <div class="title">扫码企业微信 在线问询</div>
    <div class="card">
      <img class="pic" src="./../../../assets/img/personalPage/help/人工客服比心.gif" alt="">
      <img class="qr-code" src="./../../../assets/img/personalPage/help/微信客服.png" alt="">
      <div class="phone-tips">请将二维码截图保存于手机 在微信扫码</div>
    </div>
  </div>
</template>

<script setup>
</script>


<style lang="scss" scoped>
@import "./../../../assets/font/font.css";

.container {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .title {
    font-size: 30px;
    color: #546bbc;
    font-family: medium;
    font-weight: 100;
    margin-bottom: 90px;
    transform: scale(1.2);
  }

  .card {

    transform: scale(1.2);
    margin-top: 20px;
    width: 563px;
    height: 549px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    border: 3px solid #ccc;
    border-radius: 40px;
    padding: 10px;
    box-sizing: border-box;

    /* 其他样式 */
    .pic {
      width: 200;
      height: 200px;
      margin-bottom: 16px;
      margin-top: 16px;
    }

    .qr-code {
      width: 256px;
      height: 256px;
      margin-bottom: 16px;
    }
  }

  .phone-tips {
    display: none;
  }
}

@media only screen and (max-width: 940px) {
  .container {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 108px;

    .title {
      font-size: 30px;
      color: #546bbc;
      font-family: medium;
      font-weight: 100;
      margin-bottom: 10vw;
      transform: scale(1.2);
    }

    .card {

      transform: scale(1.0);
      margin-top: 0px;
      width: 90%;
      height: 549px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #fff;
      border: 3px solid #ccc;
      border-radius: 40px;
      padding: 10px;
      box-sizing: border-box;

      /* 其他样式 */
      .pic {
        width: 168px;
        height: 168px;
        margin-bottom: 8px;
        margin-top: -8px;
      }

      .qr-code {
        width: 200px;
        height: 200px;
        margin-bottom: 4px;
      }
    }

    .phone-tips {
      display: block;
      color: #f3a7a7;
    }
  }


}</style>