<template>
  <div class="VIP-container">
    <img  class = "title" src="./../../../assets/img/personalPage/VIP/会员标题.png">
    <img  class = "getVIP" src="./../../../assets/img/personalPage/VIP/开通会员按钮.png" @click="store.state.showGetVIP=true">
    <img  class = "center pc-center" src="./../../../assets/img/personalPage/VIP/中间电路板框.png">
    <img  class = "center phone-center" src="./../../../assets/img/getVIP/superC手机会员支付UI/手机会员/手机VIP公众号.png">
    <img  class = "right-top" src="./../../../assets/img/personalPage/VIP/右上角打折.png">
    <img  class = "right-bottom" src="./../../../assets/img/personalPage/VIP/右下角活动名额.png">
    <img  class = "left-top" src="./../../../assets/img/personalPage/VIP/左上决策次数.png">
    <span class="count"> {{data.decision}} </span>
    <img  class = "left-bottom" src="./../../../assets/img/personalPage/VIP/左下角实体资料打折.png">
  </div>
</template>

<script setup>
  import store from "./../../../store/index.js";
  import {getBillState, getDaYun, getProductList, getUserDecision} from './../../../axios/api.js';
  import {ref, watch} from "vue";
  import {message} from "ant-design-vue";

  const data = ref({
    decision: 0
  })

  watch(() => store.state.showGetVIP,
       (showGetVIP) => {
        if (!showGetVIP) {
          getUserDecision().then((res)=>{
            if(res.data.code == '0'){
              data.value.decision = res.data.data.decision
            }else{
              alert(res.data.msg)
            }
          }).finally((err)=>{
            // submintbtn.value = false这里错误之后执行的行为
            // alert(res.data.msg)
          })
        }
      }// 如果需要组件挂载时就立即执行一次，可以添加这个选项
  );

  getUserDecision().then((res)=>{
    if(res.data.code == '0'){
      data.value.decision = res.data.data.decision
    }else{
      alert(res.data.msg)
    }

  }).finally((err)=>{
    // submintbtn.value = false这里错误之后执行的行为
    // alert(res.data.msg)
  })

</script>


<style lang="scss" scoped>
@import "./../../../assets/font/font.css";
.VIP-container {
  position: relative;
  display: flex;
  justify-content: center;

    img{
      transform: scale(1.2);
    }
    .count{
      position: absolute;
      top: 383px;
      left: 177px;
      font-family: "medium";
      color: white;
    }
    .title{
      position: absolute;
      
      transform: translate(-50%, -0%);
      left: 50%;
      top: 50px;
    }
    .getVIP{
      position: absolute;
      transform: translate(-50%, -0%);
      left: 50%;
      top: 160px;
    }

    .pc-center{
      display: block;
    }
    .phone-center{
      display: none;
    }

    .center{
      position: absolute;
      transform: translate(-50%, -0%) scale(1.2);
      left: 50%;
      top: 310px;
    }
    .left-bottom{
      position: absolute;
      bottom: 100px;
      left: 80px;
    }
    .left-top{
      position: absolute;
      top: 180px;
      left: 80px;
    }
    
    .right-top{
      position: absolute;
      right: 80px;
      top: 180px;
    }
    .right-bottom{
      position: absolute;
      bottom: 100px;
      right: 80px;
    }
}

@media only screen and (max-width: 940px) {
  .VIP-container {
    top: 3vw;
    width: 100%;
    height: 1100px;
    position: relative;
    overflow-y: scroll;
    display: flex;
    justify-content: center;

    img{
      transform: scale(1.2);
    }
    .count{
      position: absolute;
      top: 309px;
      left: 97px;
      font-family: "medium";
      font-size: 13px;
      color: white;
    }
    .title{
      position: absolute;
      padding: 0px 20% 0px 20%;
      transform: translate(-50%, -0%);
      left: 50%;
      top: 32px;
    }
    .getVIP{
      position: absolute;
      transform: translate(-50%, -0%);
      left: 50%;
      top: 104px;
    }

    .pc-center{
      display: none;
    }
    .phone-center{
      display: block;
    }

    .center{
      position: absolute;
      width: 40%;
      transform: translate(-50%, -0%) scale(1.2);
      left: 50%;
      top: 636px;
    }
    .left-bottom{
      position: absolute;
      width: 128px;
      height: 180px;
      top: 396px;
      left: 32px;
    }
    .left-top{
      position: absolute;
      width: 128px;
      height: 180px;
      top: 176px;
      left: 32px;
    }
    
    .right-top{
      position: absolute;
      width: 128px;
      height: 180px;
      right: 32px;
      top: 176px;
    }
    .right-bottom{
      position: absolute;
      width: 128px;
      height: 180px;
      top: 396px;
      right: 32px;
    }
}
}
</style>