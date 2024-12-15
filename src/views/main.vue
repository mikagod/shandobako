<template>
  <div class="main-center-wrap">
    <div style="margin-bottom: 24px"></div>
    <div class="main m-2">
      <a href="/">{{data.msg}}</a>

    </div>
<!-- 原命路由跳转 -->
    <div class="container is-fullhd content has-text-centered has-background-primary-light" style="margin-bottom: 0">
      <div class="enterSystem">
        <form>
          <router-link to="/origin">
            <img :src="nametext.originUrl" class="round" />
            <p class="has-text-centered">
            <button class="button is-warning m-4">
              点击进入{{nametext.origin}}
            </button>
          </p>
          </router-link>

          
          <br />
        </form>
      </div>

<!-- 大运路由跳转 -->
      <div class="enterSystem">
        <form>
          <router-link to="/dayun">
            <img :src="nametext.dayunUrl" id="bigy" class="round" alt="大运" href="#" />
            <p class="has-text-centered">
            <button class="button is-warning m-4">
              点击进入{{nametext.dayun}}
            </button>
          </p>
          </router-link>
          
          <br />
        </form>
      </div>

<!-- 流年路由跳转 -->
      <div class="enterSystem">
        <form>
          <router-link to="/liunian">
            <img :src="nametext.liunianUrl" id="watern" class="round" alt="流年"  />
            <p class="has-text-centered">
            <button class="button is-warning m-4" @click="toLiunian()">
              点击进入{{nametext.liunian}}
            </button>
          </p>
          </router-link>
          
          
          <br />
        </form>
      </div>

    </div>

  <!-- 数测人生 入口  -->
    <div class="enterLuckAnalysis" style="cursor: pointer;">
        <img :src="numBtn" alt="数测人生" @click="toLuckAnalysis" />
    </div>
  </div>
</template>

<script setup>
import router from "../router/index.js";
import {getDaYun, getUserDecision, getHomeConfigurations} from './../axios/api.js';
import {ref, watch, onUnmounted} from "vue";
import store from "../store/index.js";
import {useRoute} from "vue-router";

const data = ref({
  msg: ''
})

const nametext = ref({
  origin: '原命决策系统',
  dayun: '大运决策系统',
  liunian: '流年决策系统',
  originUrl: '',
  dayunUrl: '',
  liunianUrl: ''
})

 const homeConfigurations = getHomeConfigurations().then((res)=> {
   if (res.data.code == '0') {
     console.log(res.data.data);
     nametext.value.origin = res.data.data[0].text;
     nametext.value.dayun = res.data.data[1].text;
     nametext.value.liunian = res.data.data[2].text;

     nametext.value.originUrl = res.data.data[0].url;
     nametext.value.dayunUrl = res.data.data[1].url;
     nametext.value.liunianUrl = res.data.data[2].url;
   }
 })

function goto(value) {
  router.push({path: '/'+value})
}
function toOrigin() {
  router.push({path: '/origin'})
}
function toDayun() {
  router.push({path: '/dayun'})
}
function toLiunian() {
  router.push({path: '/liunian'})
}
const route = useRoute();
watch(
    () => route.path,
    (toPath) => {
      if (toPath === '/main') {
        getUserDecision().then((res)=>{
          if(res.data.code == '0'){
            data.value.msg = res.data.data.msg
            var decision = res.data.data.decision;
            var type = res.data.data.type;

            if (decision <=0  && type ===0) {
              store.state.showGetVIP=true // 弹出开通会员界面
            } else {
              store.state.showGetVIP=false
            }
          }else{
            alert('请登录')
          }


        }).finally((err)=>{
          // submintbtn.value = false这里错误之后执行的行为
          // alert(res.data.msg)
        })
      }
    },
    { immediate: true } // 如果需要组件挂载时就立即执行一次，可以添加这个选项
);


// 数测人生 入口
import numBtn_l from '/src/assets/image/numBtn_l.png'
import numBtn_s from '/src/assets/image/numBtn_s.png'

const numBtn = ref('')
function luckAnalysisControlling() {
  if(window.innerWidth > 768) {
    numBtn.value = numBtn_l
  }else{
    numBtn.value = numBtn_s
  }
}
luckAnalysisControlling() // 初始化时设置一次
window.addEventListener('resize', luckAnalysisControlling) // 监听窗口尺寸变化
onUnmounted(() => {window.removeEventListener('resize', luckAnalysisControlling) }) // 清理窗口尺寸变化事件监听器

function toLuckAnalysis() {
  router.push({path: '/luckAnalysis'})
}

</script>


<style scoped>
@import url("../assets/css/main.css");

img, br {
  user-select: none; /*  禁止用户选择图片 */
}

.round{
  width: 384px;
  height: 384px;
}

/* 数测人生 入口 */
.enterLuckAnalysis {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

@media only screen and (max-width: 940px) {
  .round{
    height : auto;
    max-width : 100%;
  }

  /* 数测人生 入口 */
  .enterLuckAnalysis {
    margin: 15px;
  }

}




</style>