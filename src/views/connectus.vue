<template>
  <div>
      <div class="top-title">
        <span class="title" style="width:100px;margin-bottom: -30px;">联系我们</span>
      </div>
    <div class="gif">
      <img src="/src/assets/img/cute.gif" alt="Example GIF">
      <p class="gif-title gif-title-1" >想要了解更多资讯</p>
      <p class="gif-title">请关注我们的微信公众号~</p>
    </div>
    <div class="cuteQR">
      <img src="/src/assets/img/cuteQR.jpg" alt="Example JPG">
      <p class="gif-title">有任何网站使用问题请咨询</p>
      <p class="gif-title">官方邮箱：spaceai@yeah.net</p>
    </div>
  </div>

</template>

<script setup lang="ts">




</script>

<style scoped>
.top-title {
  position: relative;
  text-align: center;
  margin-top: 10px;
  margin-bottom: -4vw;

  .title {
    font-size: 23px;
    color: #495bb5;
  }

  .title::before,
  .title::after {
    content: "";
    /* 必须添加content属性才能显示伪元素 */
    position: absolute;
    /* 设置绝对定位 */
    bottom: 0;
    /* 将伪元素定位在底部 */
    height: 2.5px;
    /* 设置横线的高度 */
    width: 15%;
    /* 设置横线的宽度，这里是标题宽度的一半 */
    top: 50%;
    background-color: #495bb5;
    /* 设置横线的颜色 */
  }

  .title::before {
    left: 30%;
    /* 将伪元素定位在标题的左侧 */
  }

  .title::after {
    right: 30%;
    /* 将伪元素定位在标题的右侧 */
  }

}
@media only screen and (max-width: 940px) {
  .top-title {
    position: relative;
    text-align: center;
    margin-top: 10px;
    margin-bottom: -4vw;

    .title {
      font-size: 23px;
      color: #495bb5;
    }

    .title::before,
    .title::after {
      content: "";
      /* 必须添加content属性才能显示伪元素 */
      position: absolute;
      /* 设置绝对定位 */
      bottom: 0;
      /* 将伪元素定位在底部 */
      height: 2.5px;
      /* 设置横线的高度 */
      width: 11%;
      /* 设置横线的宽度，这里是标题宽度的一半 */
      top: 50%;
      background-color: #495bb5;
      /* 设置横线的颜色 */
    }

    .title::before {
      left: 25%;
      /* 将伪元素定位在标题的左侧 */
    }

    .title::after {
      right: 25%;
      /* 将伪元素定位在标题的右侧 */
    }

  }
}
.gif {
  text-align: center;
  width: 240px;
  margin: 0 auto;
  margin-top: 5vw;
}
.gif-title{
  margin: 0 auto;
  font-size: 13px;
  color: #495bb5;
}
.gif-title-1{
  margin-top: 1vw
}
.cuteQR{
  text-align: center;
  width: 240px;
  margin: 0vw auto;

}
</style>