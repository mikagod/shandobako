<script setup>
import {onMounted, ref, watch} from 'vue';
import { useRoute, useRouter } from 'vue-router'
import {getUserDecision} from "../../axios/api.js";
import store from "../../store/index.js";
const route = useRoute();
let router = useRouter();
const styleNormal = ref({});
const styleSelected = ref(
  {
    backgroundColor: 'rgba(255, 255, 255, 0.63)',
    color: '#3dccff',
  }
)
const VIPbackgroundStyle = ref({
  background: 'linear-gradient(#bee2fe, #35e2ff)',
});
const EmailbackgroundStyle = ref({
  background: 'linear-gradient(#59e9f4, #feffff)',
});
const goto = (path) => router.push(path);

const isActive = (path) => {
  if (route.path === path) {
    return styleSelected.value;
  } else {
    return styleNormal.value;
  }
}
const isActiveImg = (path) => {
  const newPath = path.substring(1);
  if (route.path === path) {
    return "/src/assets/img/personalPage/index/A_" + newPath + ".png";
  } else {
    return "/src/assets/img/personalPage/index/" + newPath + ".png";
  }
}
const getBackgroundStyle = () => {
  if (route.path === '/VIP') { return VIPbackgroundStyle.value }
  if (route.path === '/myEmail') { return EmailbackgroundStyle.value }
}
let ISMOBILE = ref(false);
// onMounted(() => {
//   goto('/accountMessage');
//   window.addEventListener('resize', ()=>{
//     debugger
//     if (window.innerWidth <=2000) {
//       ISMOBILE.value = window.innerWidth <=2000
//     }
//   });
// })

watch(
    () => route.path,
    (toPath) => {
      if (toPath === '/index') {
        goto('/accountMessage');
        ISMOBILE.value = window.innerWidth <=1000
      }
    },
    { immediate: true } // 如果需要组件挂载时就立即执行一次，可以添加这个选项
);

</script>
<template>
  <div class="top-title">
    <span class="title" style="width:100px;margin-bottom: -30px;">个人中心</span>
  </div>
  <div class="container">
    <div class="card">
      <div class="left" :style="getBackgroundStyle()">
        <div class="unit" @click="goto('accountMessage')" :style="isActive('/index')">
          <img :src="isActiveImg('/accountMessage')">
          账号信息
        </div>
        <div class="unit" @click="goto('VIP')" :style="isActive('/VIP')">
          <img :src="isActiveImg('/VIP')">
          会员中心
        </div>
        <div class="unit" @click="goto('bills')" :style="isActive('/bills')">
          <img :src="isActiveImg('/bills')">
          订单记录
        </div>
        <div class="unit" @click="goto('/identifyQuery')" :style="isActive('/identifyQuery')">
          <img :src="isActiveImg('/identify')">
          信息认证
        </div>
        <div class="unit" @click="goto('help')" :style="isActive('/help')">
          <img :src="isActiveImg('/help')">
          人工客服
        </div>
        <div class="unit" @click="goto('myEmail')" :style="isActive('/myEmail')">
          <img :src="isActiveImg('/myEmail')">
          我的信箱
        </div>
      </div>
      <div class="C-divider"></div> <!-- 分割线 -->
      <router-view v-if="!ISMOBILE" class="right" :style="getBackgroundStyle()"></router-view>
    </div>
  </div>
  <div class="container-phone">
    <router-view v-if="ISMOBILE" class="main" :style="getBackgroundStyle()"></router-view>
  </div>
  <div class="bottom-phone">
    <span class="unit" @click="goto('accountMessage')" :style="isActive('/index')">
      <img :src="isActiveImg('/accountMessage')">
      <span class="text">
        账号信息
      </span>
    </span>
    <span class="unit" @click="goto('VIP')" :style="isActive('/VIP')">
      <img :src="isActiveImg('/VIP')">
      <span class="text">
        会员中心
      </span>
    </span>
    <span class="unit" @click="goto('bills')" :style="isActive('/bills')">
      <img :src="isActiveImg('/bills')">
      <span class="text">
        订单记录
      </span>
    </span>
    <span class="unit" @click="goto('/identifyQuery')" :style="isActive('/identifyQuery')">
      <img :src="isActiveImg('/identify')">
      <span class="text">
        信息认证
      </span>
    </span>
    <span class="unit" @click="goto('help')" :style="isActive('/help')">
      <img :src="isActiveImg('/help')">
      <span class="text">
        人工客服
      </span>
    </span>
    <span class="unit" @click="goto('myEmail')" :style="isActive('/myEmail')">
      <img :src="isActiveImg('/myEmail')">
      <span class="text">
        我的信箱
      </span>
    </span>
  </div>
</template>
<!-- 终端快捷键位CTRL + R -->
<style lang="scss" scoped>
@import "./../../assets/font/font.css";


/* 在宽度大于等于1024像素时应用的样式 */
/* 添加你的电脑样式代码 */
.top-title {
  position: relative;
  text-align: center;
  margin-top: 10px;
  margin-bottom: -100px;

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

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(0)scale(0.68);

  .card {
    height: 970px;
    width: 1250px;
    background-color: white;
    box-shadow: 0 0 30px 5px #dbdfff;
    border-radius: 50px;
    border: 1px solid #53dff1;
    display: flex;

    .left {
      width: 345px;
      height: 100%;
      padding-top: 5%;
      padding-bottom: 15%;
      background: linear-gradient(#c0fdec, #57e9f4);
      border-bottom-left-radius: 47px;
      border-top-left-radius: 47px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;

      .unit {
        width: 220px;
        height: 80px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #4c5fb6;
        font-size: 23px;
        font-family: medium;

        img {
          margin-right: 20px;
        }
      }

      .unit:hover {
        background: #e5fef8;
        background-color: rgba(255, 255, 255, 0.63);
        color: #3dccff;
      }
    }

    .C-divider {
      border-left: 5px solid #fff;
      /* 左边框为1像素宽的实线 */
      height: 100%;
    }

    .right {
      width: 905px;
      height: 100%;
      border-top-right-radius: 47px;
      border-bottom-right-radius: 47px;
      transform: scale(1);

    }

    ;
  }

}

.container-phone {
  display: none;
}

.bottom-phone {
  display: none;
}

@media screen and (min-width: 648px) {
  .container {
    width: 100%;
  }
}

@media screen and (max-width: 1024px) {
  .container {
    width: 100%;
    transform: translate(0)scale(0.68);
  }
}

@media screen and (max-width: 940px) {
  .container {
    max-width: 100%;
    overflow: hidden;
    transform: translate(0)scale(0.68);
  }
}

@media screen and (max-width: 840px) {
  .container {
    width: 100%;
    transform: translate(0)scale(0.68);
  }
}


// 手机样式
@media screen and (max-width: 648px) {
  .top-title {
    top: 0px;
    width: 100%;
    height: 50px;
    background: linear-gradient(to bottom, #a3ebda, #4ae0ed);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

    // position: fixed;
    width: 100%;
    background-color: #ff0000;

    .title {
      color: white;
      position: relative;
      bottom: -15px;
    }

    .title::before,
    .title::after {
      display: none;
    }
  }

  .container {
    display: none;
    overflow: visible;
  }

  .container-phone {
    position: absolute;
    top: 136px;
    bottom: 220px;
    height: 70%;
    display: flex;
    overflow: visible;
    width: 100%;
    // .main{
    //   display: flex;
    //   height: 300px;
    //   width: 100%;
    // }
  }

  .bottom-phone {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 190px;
    background: linear-gradient(to bottom, #a3ebda, #4ae0ed);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 16px;
    gap: 10px;

    .unit {
      transform: scale(0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 30%;
      height: 80px;
      border-radius: 10px;

      img {
        width: 40px;
      }

      .text {
        align-content: center;
        text-align: center;
        width: 70px;
      }
    }
  }
}</style>