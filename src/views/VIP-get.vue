<script setup>
import {ref, watchEffect, onMounted, reactive, watch} from 'vue'
import {getBillState, getProductList, payApi, payApiPhone, getIP, getUserDecision} from '../axios/api';
import store from "./../store/index.js";
import { QRCode, message, Modal } from 'ant-design-vue';
import {useRoute} from "vue-router";
const isVIP = ref(true);
const backgroundSrc = ref('/src/assets/img/getVIP/superC经典支付页面UI/superC支付切图/VIP会员已选择.png');
const gotoVIP = (v) => {
  isVIP.value = v;
  if (v) {
    backgroundSrc.value = '/src/assets/img/getVIP/superC经典支付页面UI/superC支付切图/VIP会员已选择.png';
    setCurrentVIP(2588, 1)
  }
  else {
    backgroundSrc.value = '/src/assets/img/getVIP/superC经典支付页面UI/superC支付切图/购买次卡（已选择）.png'
    setCurrentVIP(50, 4)
  }
}

const currentVIP = ref(1888);
const displayPrice = ref(2560);
watchEffect(() => {
  // displayPrice.value = currentVIP.value;

  var targetValue = 1580;
  switch (currentVIP.value) {
    case 2588:
      targetValue = 1580;
      break;
    case 5160:
      targetValue = 2999;
      break;
    case 2580:
      targetValue = 1580;
      break;
  }
  const interval = 50; // 过渡间隔，单位毫秒
  const increment = 156;
  let currentValue = displayPrice.value;
  const timer = setInterval(async () => {

    currentValue -= increment;
    if (currentValue <= targetValue) {
      clearInterval(timer);
      currentValue = targetValue;
    }
    displayPrice.value = currentValue;

  }, interval)
})
const setCurrentVIP = (v, id) => {
  var money = 0;
  switch (v) {
    case 2588: money = 1580; break;
    case 5160: money = 2999; break;
    case 2580: money = 1580; break;
    default: money = v; break;
  }
  currentVIP.value = v;//currentVIP为价格
  displayPrice.value = v;
  data.productId = id;
  data.money = money;
  reloadPay();
}
const selectedStyle = ref({
  backgroundColor: '#04a9ff'
})
const getVIPbackground = (v) => {
  if (currentVIP.value === v) {
    return selectedStyle.value;
  }
  else { return null }
}
const getVIPsrc = (v) => {
  if (v == 1) {
    if (isVIP.value) {
      return '/src/assets/img/getVIP/superC经典支付页面UI/superC支付切图/VIP会员.png';
    } else {
      return '/src/assets/img/getVIP/superC经典支付页面UI/superC支付切图/VIP会员白色.png';
    }
  }

  else if (v == 2) {
    if (isVIP.value) {
      return '/src/assets/img/getVIP/superC经典支付页面UI/superC支付切图/购买次卡（未选择）.png';
    } else {
      return '/src/assets/img/getVIP/superC经典支付页面UI/superC支付切图/购买次卡蓝色.png';
    }
  }
}
const isAliPay = ref(false);
const getSelectedSRC = (v) => {
  if (v == isAliPay.value) {
    if (window.innerWidth < 1024) {
      //手机版的已选择
      return '/src/assets/img/getVIP/superC手机会员支付UI/手机会员/已选择.png'
    }
    return '/src/assets/img/getVIP/superC经典支付页面UI/superC支付切图/已选择.png'
  } else {
    if (window.innerWidth < 1024) {
      //手机版的未选择
      return '/src/assets/img/getVIP/superC手机会员支付UI/手机会员/未选择.png'
    }
    return '/src/assets/img/getVIP/superC经典支付页面UI/superC支付切图/未选择.png'
  }
}
const setAliPay = (v) => {
  if (v) {
    data.payMethod = 1;
  } else {
    data.payMethod = 2;
  }
  isAliPay.value = v;
  reloadPay();
}
const isDiscount = ref(true);
const showDiscount = ref(false);
const data = reactive(
  {
    productId: 6,
    payMethod: 2,
    money: 0.01,
    phone: localStorage.getItem("superUserPhone"),
    payerClientIp: '127.0.0.1',
    type: 'IOS'
  }
)
//电脑端支付二维码
const reloadPay = async () => {
  const res = await payApi(data);
  if (res) {
    if (data.payMethod == 2) {
      wxUrl.value = res.data.data ? res.data.data.result : "";
    } else {
      html.value = res.data.data.result;
    }
    queryBills.number = res.data.data ? res.data.data.sdbknumber : 0;
    // console.log(queryBills.number);
  }
}
//移动端支付页面
const mobilePay = async () => {
  //获取用户IP
  const ip = await getIP();
  //获取用户设备类型
  let type = 'OTHER';
  let userAgent = navigator.userAgent.toLowerCase();
  if (/(android|HarmonyOS|PC)/i.test(userAgent)) {
    type = 'ANDROID';
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    type = 'IOS';
  } else {
    type = 'OTHER';
  }
  data.payerClientIp = ip;
  data.type = type
  const res = await payApiPhone(data);

}
let billState = null;
// onMounted(async () => {
//
//   // 在组件挂载时添加滚动事件监听
//   window.addEventListener('scroll', handleScroll);
//   setCurrentVIP(2588, 1);
//   setTimeout(() => {
//     showDiscount.value = true;
//     // 这里设置定时器是因为。这个showDiscount是一个全屏遮罩,得等他父组件加载完再显示，不然就会位置错乱
//   }, 100);
//   const res = await getProductList();
//   productList.value = res.data.data;
//   const timer = setInterval(
//     async () => {
//       if (store.state.showGetVIP) {
//         billState = await getBillState(queryBills)
//         // console.log(billState.data);
//         if (billState.data.data != null && billState.data.data ==='支付成功') {
//           message.success("支付成功！")
//           visible.value = true;
//           store.state.showGetVIP = false
//           reloadPay();
//           clearInterval(timer);
//         }
//       }
//     }
//     , 4000)
//   // reloadPay();
// })

const route = useRoute();
watch(() => store.state.showGetVIP,
    async (showGetVIP) => {
      if (showGetVIP) {
        // 在组件挂载时添加滚动事件监听
        window.addEventListener('scroll', handleScroll);
        setCurrentVIP(2588, 1);
        setTimeout(() => {
          showDiscount.value = true;
          // 这里设置定时器是因为。这个showDiscount是一个全屏遮罩,得等他父组件加载完再显示，不然就会位置错乱
        }, 100);
        const res = await getProductList();
        productList.value = res.data.data;
        const timer = setInterval(
            async () => {
              if (store.state.showGetVIP) {
                billState = await getBillState(queryBills)
                // console.log(billState.data);
                if (billState.data.data != null && billState.data.data === '支付成功') {
                  message.success("支付成功！")
                  visible.value = true;
                  store.state.showGetVIP = false
                  reloadPay();
                  clearInterval(timer);
                }
              }
            }
            , 4000)
      } else {
        try {
          if (handleScroll) {
            window.removeEventListener('scroll', handleScroll);
          }
        } catch (e) {
          // handleScroll 未声明，这里可以处理错误或者什么也不做
        }

      }
    },
    { immediate: true } // 如果需要组件挂载时就立即执行一次，可以添加这个选项
);

const productList = ref();
const html = ref();
const wxUrl = ref();
const queryBills = reactive({
  number: 0
});
const hiddenDiscount = () => {
  showDiscount.value = false;
}
const visible = ref(false);
const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};

// onUnmounted(() => {
//   // 在组件卸载时移除滚动事件监听
//   window.removeEventListener('scroll', handleScroll);
// });
const handleScroll = () => {
  const container = document.querySelector('.VIP-get-container');
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth
  const containerHeight = container.offsetHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  // const top = (windowHeight / 2) - 150 + 'px';
  //根据宽度判断是否为手机
  if (windowWidth > 1024) {
    //电脑
    const top = (windowHeight / 2) + 'px';
    container.style.top = top;
  }


};
</script>

<template>
  <div class="VIP-get-container">
    <img class="vip-close" src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/关闭2.png"
      @click="store.state.showGetVIP = false">
    <div class="top">

      <img class="title-background" src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/上部标题.png">
      <span class="title">欢迎购买时空坐标SDBK会员</span>
    </div>
    <div class="VIP-content">
      <img class="content-background" :src="backgroundSrc">
      <img v-show="isVIP" class="account-card" src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/购买次数未选择.png">
      <img v-show="!isVIP" class="vip-card" src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/VIP会员（未选择）.png">

      <span class="vip-card-click" @click="gotoVIP(true)">
        <img class="text" :src="getVIPsrc(1)" />
      </span>
      <span class="account-card-click" @click="gotoVIP(false)">
        <img class="text" :src="getVIPsrc(2)" />
      </span>

      <div class="vip-content-main" v-show="isVIP">
        <div class="vip-price">
          <span class="selected-background" :style="getVIPbackground(2588)">
            <span class="selected-text" style="color: #e8f2fa;">
              90%用户的选择
            </span>
            <span class="white-card" @click="setCurrentVIP(2588, 1)">
              <div class="one">个人VIP·年卡</div>
              <br>
              <div class="two">
                <span class="t1">￥</span>
                1880元
                <span class="t2">/年</span>
              </div>
              <div class="three">
                <span class="th1">￥</span>
                2588元
                <span class="th2">/年</span>
              </div>
              <div class="four">（首客优惠券再减300）</div>
              <div class="five">

                <span class="f1">￥</span>
                1580元
                <span class="f2">/年</span>
              </div>

            </span>
          </span>
          <span class="selected-background" :style="getVIPbackground(5160)">
            <span class="selected-text">

            </span>
            <span class="white-card" @click="setCurrentVIP(5160, 2)">
              <div class="one">个人VIP·2年卡</div>
              <br>
              <div class="two">
                <span class="t1">￥</span>
                2999元
                <span class="t2">/2年</span>
              </div>
              <div class="three">
                <span class="th1">￥</span>
                5160元
                <span class="th2">/年</span>
              </div>
              <div class="four" style=" ">（送三个月）</div>
              <div class="five">

                <span class="f1">￥</span>
                2999元
                <span class="f2">/年</span>
              </div>

            </span>
          </span>
<!--          <span class="selected-background" :style="getVIPbackground(2580)">-->
<!--            <span class="selected-text">-->

<!--            </span>-->
<!--            <span class="white-card" @click="setCurrentVIP(2580, 3)">-->
<!--              <div class="one">个人VIP·连续包年</div>-->
<!--              <br>-->
<!--              <div class="two">-->
<!--                <span class="t1">￥</span>-->
<!--                1580元-->
<!--                <span class="t2">/年</span>-->
<!--              </div>-->
<!--              <div class="three">-->
<!--                <span class="th1">￥</span>-->
<!--                2580元-->
<!--                <span class="th2">/年</span>-->
<!--              </div>-->
<!--              <div class="four" style="font-size: 15px;">(往后每年减200元,可随时取消)</div>-->
<!--              <div class="five">-->

<!--                <span class="f1">￥</span>-->
<!--                1580元-->
<!--                <span class="f2">/年</span>-->
<!--              </div>-->


<!--            </span>-->
<!--          </span>-->
        </div>
        <span class="pay-card">
          <span class="wx">
            <img src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/微信支付.png">
            <br>
            <img :src="getSelectedSRC(false)" @click="setAliPay(false)">
            <br>
            微信支付
          </span>
          <span class="ali">
            <img src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/支付宝.png">
            <br>
            <img :src="getSelectedSRC(true)" @click="setAliPay(true)">
            <br>
            支付宝支付
          </span>
          <span class="QRcode" v-show="data.payMethod == 2">
            <QRCode :value="wxUrl"></QRCode>
          </span>
          <span class="QRcode" v-show="data.payMethod == 1">
            <iframe id="myiFrame" class="QRcode-ali" :srcdoc="html"></iframe>
          </span>
          <span class="price">
            <img class="discount" src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/优惠券.png">
            <div class="discount-text">已优惠 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;300</div>
            <div class="price-text">
              <span class="one">券后年卡</span>
              <span class="two">￥</span>
              <span class="three">{{ displayPrice }}</span>
              <span class="four">/年</span>
            </div>
          </span>
        </span>
        <!-- 手机支付界面 -->
        <span class="pay-card-phone">
          <span class="price">
            <img class="discount" src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/优惠券.png">
            <div class="discount-text">已优惠 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;300</div>
            <div class="price-text">
              <span class="one">券后年卡</span>
              <span class="two">￥</span>
              <span class="three">{{ displayPrice }}</span>
              <span class="four">/年</span>
            </div>
          </span>
          <div class="pay-choose" style="height: 200px;">
            <span class="wx">
              <div>
                <img src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/微信支付.png">
                微信支付
              </div>
              <img :src="getSelectedSRC(false)" @click="setAliPay(false)">

            </span>
            <span class="ali">
              <div>
                <img src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/支付宝.png">
                支付宝支付
              </div>
              <img :src="getSelectedSRC(true)" @click="setAliPay(true)">

            </span>
          </div>

          <div class="phone-benefits">

            <div class="phone-benefits-title">
              会员权益：
              <router-link class="phone-goto" to="/VIP">
                更多权益进入个人中心查看>
              </router-link>
            </div>

            <div class="phone-benefits-content">
              <div class="phone-benefit-unit">
                <img class="benefits-icon" src="./../assets/img/getVIP/superC手机会员支付UI/手机会员/10空间.png" />
                <div class="benefit-disc">
                  <div class="one">10G空间</div>
                  <div class="two">超大云存储</div>
                </div>
              </div>
              <div class="phone-benefit-unit">
                <img class="benefits-icon" src="./../assets/img/getVIP/superC手机会员支付UI/手机会员/特权.png" />
                <div class="benefit-disc">
                  <div class="one">VIP特权</div>
                  <div class="two">解锁会员全部功能</div>
                </div>
              </div>
              <div class="phone-benefit-unit">
                <img class="benefits-icon" src="./../assets/img/getVIP/superC手机会员支付UI/手机会员/决策.png" />
                <div class="benefit-disc">
                  <div class="one">无限决策</div>
                  <div class="two">无限量决策次数</div>
                </div>
              </div>
              <div class="phone-benefit-unit">
                <img class="benefits-icon" src="./../assets/img/getVIP/superC手机会员支付UI/手机会员/模版.png" />
                <div class="benefit-disc">
                  <div class="one">专属模板</div>
                  <div class="two">解锁会员专属模板</div>
                </div>
              </div>
              <div class="phone-benefit-unit">
                <img class="benefits-icon" src="./../assets/img/getVIP/superC手机会员支付UI/手机会员/高清.png" />
                <div class="benefit-disc">
                  <div class="one">高清文件</div>
                  <div class="two">无水印高清文件下载</div>
                </div>
              </div>
            </div>
          </div>
          <div class="vip-protocol">
            <div>会员协议</div>
            <div>></div>
          </div>
          <div class="vip-protocol">
            <div>自动续费协议</div>
            <div>></div>
          </div>
          <span class="QRcode" v-show="data.payMethod == 2">
            <QRCode :value="wxUrl"></QRCode>
          </span>
          <!-- 手机底部价格 -->
          <div class="bottom-price">
            <div class="price-text">
              <div class="one">￥</div>
              <div class="two">{{ displayPrice }}</div>
              <div class="discount-text">已优惠&nbsp;￥300</div>
            </div>
            <div class="confirm-botton" @click="mobilePay()">
              {{ !isAliPay ? '截图微信扫码' : '确认协议并支付' }}
            </div>
          </div>

          <span class="QRcode" v-show="data.payMethod == 1">
            <iframe id="myiFrame" class="QRcode-ali" :srcdoc="html"></iframe>
          </span>

        </span>
      </div>
      <div class="vip-content-main" v-show="!isVIP">
        <div class="vip-price pc-price">
          <span class="selected-background" style="margin-right:80px" :style="getVIPbackground(50)">
            <span class="selected-text" style="color: #e8f2fa;">

            </span>
            <span class="white-card" @click="setCurrentVIP(50, 4)">
              <div class="one">单次决策卡</div>
              <br>
              <div class="two" style="font-size: 45px;">
                <span class="t1">￥</span>
                50元
              </div>
              <div class="four" style="font-weight: 1000; font-size: 25px;">24小时内使用</div>


            </span>
          </span>
          <span class="selected-background" style="margin-left:80px" :style="getVIPbackground(100)">
            <span class="selected-text">
            </span>
            <span class="white-card" @click="setCurrentVIP(100, 5)">
              <div class="one">三次决策卡</div>
              <br>
              <div class="two" style="font-size: 45px;">
                <span class="t1">￥</span>
                100元
              </div>
              <div class="four" style="font-weight: 1000; font-size: 25px;">24小时内使用</div>

            </span>
          </span>
        </div>
        <!-- 手机价格 -->
        <div class="vip-price phone-price">
          <span class="selected-background" style="margin-right: 16px;" :style="getVIPbackground(50)">
            <span class="selected-text" style="color: #e8f2fa;">

            </span>
            <span class="white-card" @click="setCurrentVIP(50, 4)">
              <div class="one">单次决策卡</div>
              <br>
              <div class="two" style="font-size: 24px; padding-top: 24px;">
                <span class="t1">￥</span>
                50元
              </div>
              <div class="four" style="font-weight: 1000; font-size: 16px;">24小时内使用</div>


            </span>
          </span>
          <span class="selected-background" :style="getVIPbackground(100)">
            <span class="selected-text">
            </span>
            <span class="white-card" @click="setCurrentVIP(100, 5)">
              <div class="one">三次决策卡</div>
              <br>
              <div class="two" style="font-size: 24px; padding-top: 24px;">
                <span class="t1">￥</span>
                100元
              </div>
              <div class="four" style="font-weight: 1000; font-size: 16px;">24小时内使用</div>

            </span>
          </span>
        </div>

        <span class="price">
          <div class="price-text">
            <span class="one" style="font-size: 16px;">次决策卡</span>
            <span class="two">￥</span>
            <span class="three" style="font-size: 24px;">{{ currentVIP }}元</span>
          </div>
        </span>

        <span class="pay-card">

          <span class="wx" @click="isAliPay = false">
            <img src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/微信支付.png">
            <br>
            <img :src="getSelectedSRC(false)" @click="setAliPay(false)">

            <br>
            微信支付
          </span>
          <span class="ali" @click="isAliPay = true">
            <img src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/支付宝.png">
            <br>
            <img :src="getSelectedSRC(true)" @click="setAliPay(true)">

            <br>
            支付宝支付
          </span>
          <span class="QRcode" v-show="data.payMethod == 2">
            <QRCode :value="wxUrl"></QRCode>
          </span>
          <span class="QRcode" v-show="data.payMethod == 1">
            <iframe id="myiFrame" class="QRcode-ali" :srcdoc="html"></iframe>
          </span>
          <span class="price">
            <div class="price-text">
              <span class="one" style="font-size: 20px;">次决策卡</span>
              <span class="two">￥</span>
              <span class="three" style="font-size: 50px;">{{ currentVIP }}元</span>
            </div>
          </span>
        </span>
        <!-- 手机支付界面 -->
        <span class="pay-card-phone">

          <div class="pay-choose" :style="[isAliPay? 'height: 180px':'height: 160px']">
            <span class="wx">
              <div>
                <img src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/微信支付.png">
                微信支付
              </div>
              <img :src="getSelectedSRC(false)" @click="setAliPay(false)">

            </span>
            <span class="ali">
              <div>
                <img src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/支付宝.png">
                支付宝支付
              </div>
              <img :src="getSelectedSRC(true)" @click="setAliPay(true)">

            </span>
            
          </div>

          <span class="QRcode" v-show="data.payMethod == 2">
              <QRCode :value="wxUrl"></QRCode>
            </span>

          

          <span class="QRcode" v-show="data.payMethod == 1">
            <iframe id="myiFrame" class="QRcode-ali" :srcdoc="html"></iframe>
          </span>

        </span>
        <!-- 手机底部价格 -->
        <div class="bottom-price-times">
            <div class="price-text">
              <div class="one">￥</div>
              <div class="two">{{ currentVIP }}</div>
            </div>
            <div class="confirm-botton" @click="mobilePay()">
              {{ !isAliPay ? '截图微信扫码' : '确认支付' }}
            </div>
          </div>
        <!-- 手机支付界面 -->
        <!-- <span class="pay-card-phone">
          <span class="wx" @click="isAliPay = false">
            <img src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/微信支付.png">
            <br>
            <img :src="getSelectedSRC(false)" @click="setAliPay(false)">

            <br>
            微信支付
          </span>
          <span class="ali" @click="isAliPay = true">
            <img src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/支付宝.png">
            <br>
            <img :src="getSelectedSRC(true)" @click="setAliPay(true)">

            <br>
            支付宝支付
          </span>
          <span class="QRcode" v-show="data.payMethod == 2">
            <QRCode :value="wxUrl"></QRCode>
          </span>
          <span class="QRcode" v-show="data.payMethod == 1">
            <iframe id="myiFrame" class="QRcode-ali" :srcdoc="html"></iframe>
          </span>
          <span class="price">
            <div class="price-text">
              <span class="one" style="font-size: 20px;">次决策卡</span>
              <span class="two">￥</span>
              <span class="three" style="font-size: 50px;">{{ currentVIP }}元</span>
            </div>
          </span>
        </span> -->
      </div>

      <span class="VIP-benefits">
        <span class="benefits-title">
          会员权益：
        </span>
        <span class="benefits-content">
          <br>
          10G超大存储空间
          <br>
          解锁会员全部功能
          <br>
          解锁会员专属模板
          <br>
           无限量决策次数
          <br>
          无水印高清文件下载
        </span>

        <router-link class="goto" to="/VIP">
          <br>
          其他权益请到个人中心
          <br>
          会员中心查看会员权益
        </router-link>

      </span>

    </div>
    <div class="discount-card" v-if="showDiscount">
      <img class="discount-img-close" src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/关闭1.png"
        @click="hiddenDiscount()">
      <img class="discount-img" src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/首客特惠券.png" alt="">
      <img class="discount-img-button" src="./../assets/img/getVIP/superC经典支付页面UI/superC支付切图/立即领取.png"
        @click="hiddenDiscount()">
    </div>

    <Modal :open="visible" title="时空坐标:" @ok="handleOk">
      <p>支付成功...</p>
    </Modal>
  </div>
</template>




<style lang="scss" scoped>
@import "./..../../../assets/font/font.css";

.VIP-get-container {
  position: fixed;
  top: 40%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, -50%) scale(0.68);
  display: flex;
  width: 1250px;
  height: 850px;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  font-family: 'alimama';

  .discount-card {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    /* 设置透明度 */
    top: -100%;
    left: -100%;
    width: 300%;
    height: 250%;
    z-index: 9;

    .discount-img {
      position: relative;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .discount-img-close {
      position: relative;
      top: 30%;
      left: 60%;
      z-index: 10;
      transform: translate(-50%, -50%);
    }

    .discount-img-button {
      position: relative;
      top: 60%;
      left: 31.5%;
      transform: translate(-50%, -50%);
    }
  }

  .top {
    position: relative;
    top: 0px;
    height: 220px;
    width: 100%;

    .title-background {
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .title {
      position: absolute;
      left: 5%;
      top: 25%;
      font-size: 50px;
      color: #fff;
    }
  }

  .vip-close {
    position: absolute;
    right: -15px;
    top: -15px;
    z-index: 15;
  }

  .VIP-content {
    top: 152px;
    position: absolute;

    .vip-content-main {
      position: absolute;
      top: 12%;
      right: 30px;
      // background-color: #a2d5f1;
      z-index: 5;
      width: 900px;
      height: 600px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding-top: 5px;

      justify-content: center;
      align-items: center;

      .vip-price {
        display: flex;
      }

      .phone-price {
        display: none;
      }

      .selected-background {
        position: relative;
        border-radius: 20px;
        margin-left: 25px;
        width: 254px;
        height: 330px;
        display: flex;
        color: #fafafa;
        font-family: 'medium';

        .selected-text {
          z-index: 7;
          position: absolute;
          left: 18%;
          top: 5px;
          font-size: 22px;
        }

        .white-card {
          position: absolute;
          background-color: #ffffff;
          border-radius: 20px;
          left: 2px;
          top: 38px;
          width: 250px;
          height: 290px;
          display: flex;
          flex-direction: column;
          z-index: 6;
          font-size: 18px;
          font-weight: 900;
          padding-top: 20px;
          text-align: center;
          line-height: 39px;

          .one {
            color: black;
            font-size: 22px;
            padding-left: 20px;
            text-align: left;

          }

          .two {
            color: #ffc62e;
            font-size: 28px;

            .t1 {
              font-size: 20px;
              margin-right: -10px;
            }

            .t2 {
              font-size: 18px;
              margin-left: -5px;
            }
          }

          .three {
            color: #ababab;
            text-decoration: line-through;

            .th1 {
              font-size: 10px;
              margin-right: -5px;
            }

            .th2 {
              font-size: 10px;
              margin-left: -5px;
            }
          }

          .four {
            color: black;
          }

          .five {
            color: #ff5a00;
            font-size: 35px;

            .f1 {
              font-size: 20px;
              margin-right: -12px;
            }

            .f2 {
              font-size: 20px;
              margin-left: -5px;
            }
          }
        }
      }

      .pay-card-phone {
        display: none;
      }

      .pay-card {
        position: relative;
        background-color: #fff;
        border-radius: 30px;
        width: 900px;
        height: 200px;
        margin: 25px;
        display: flex;
        flex-direction: row;
        align-items: center;

        span {
          display: flex;
          flex-direction: row;
          margin: 10px;
          height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .wx {
          width: 100px;
          padding-top: 5px;
        }

        .ali {
          // padding: 10px;
          width: 100px;
        }

        .QRcode {
          height: 170px;
          width: 250px;
        }

        .QRcode-ali {
          height: 170px;
          width: 250px;
          overflow: visible;
          padding-left: 40px;
        }

        .price {
          display: flex;
          width: 350px;
          justify-content: center;
          align-items: center;

          .discount {
            height: 50px;
            width: 200px;
          }

          .discount-text {
            color: white;
            position: absolute;
            top: 57px;
            font-size: 20px;
            font-family: 'medium';
            font-weight: 1000;
            padding-left: 10px;
          }

          .price-text {
            display: flex;
            width: 100%;
            height: 50px;
            flex-direction: row;
            width: 350px;
            justify-content: center;
            align-items: center;
            font-size: 30px;
            font-weight: 1000;
            color: #ff5a00;

            span {
              height: 40px;
              display: flex;
              text-align: center;
              display: flex;
              margin: 0;
            }

            .one {
              color: black;
              margin-right: -1px;
              padding-top: 10px;
            }

            .two {
              font-size: 25px;
              padding-top: 10px;
            }

            .three {
              font-family: 'medium';
              font-size: 40px;
            }

            .four {
              font-size: 25px;
              margin-left: -2px;
              padding-top: 10px;
            }
          }
        }
      }
    }

    span {
      z-index: 2;
    }

    .account-card {
      position: absolute;
      right: 0;
      top: 10px;
      z-index: 0;
    }

    .vip-card {
      position: absolute;
      left: 0;
      top: 10px;
      z-index: 0;
    }

    .account-card-click {
      position: absolute;
      right: 0;
      top: 10px;
      height: 60px;
      width: 50%;
      z-index: 3;

      .text {
        position: relative;
        top: 20%;
        height: 30px;
        left: 10%;
      }
    }

    .vip-card-click {
      position: absolute;
      left: 0;
      height: 60px;
      top: 10px;
      width: 50%;
      z-index: 3;

      .text {
        position: relative;
        top: 20%;
        left: 10%;
        height: 30px;
      }
    }

    .content-background {
      position: relative;
      z-index: 1;
    }

    .VIP-benefits {
      position: absolute;
      left: 5%;
      top: 18%;

    }

    .benefits-title {
      font-size: 40px;
      color: #4862d7;
      font-weight: 1000;
    }

    .benefits-content {
      position: relative;
      left: 2%;
      font-size: 25px;
      color: #04a9ff;
      font-weight: 1000;
      line-height: 75px;
    }

    .goto {

      position: relative;
      left: 4%;
      color: #5068d8;
      font-weight: 600;
      text-decoration: underline;
    }

    .price{
      display: none;
    }
  }


}


// 手机样式
@media screen and (max-width: 1024px) {
  .VIP-get-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #fafafa;
    font-family: 'alimama';
    transform: translate(0%, 0%)scale(1);

    overflow: scroll;


    .discount-card {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
      /* 设置透明度 */
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9;

      .discount-img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        transform: translate(-50%, -50%);
      }

      .discount-img-close {
        position: absolute;
        width: 30px;
        top: 30%;
        left: 80%;
        z-index: 10;
        transform: translate(-50%, -50%);
      }

      .discount-img-button {
        position: absolute;
        top: 70%;
        left: 50%;
        width: 200px;
        transform: translate(-50%, -50%);
      }
    }

    .top {
      position: relative;
      top: 0px;
      height: 120px;
      width: 100%;

      .title-background {
        width: 100%;
        height: 100%;
        z-index: 1;
      }

      .title {
        position: absolute;
        left: 5%;
        top: 35%;
        font-size: 24px;
        color: #fff;
      }
    }

    .vip-close {
      position: absolute;
      right: 15px;
      top: 15px;
      width: 24px;
      z-index: 15;
    }

    .VIP-content {
      top: 90px;
      position: absolute;

      .vip-content-main {
        position: absolute;
        top: 10%;
        right: 0px;
        // background-color: #a2d5f1;
        z-index: 5;
        width: 100%;
        height: 400px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        // padding-top: 5px;

        justify-content: center;
        align-items: center;
        

        .vip-price {
          width: 100%;
          height: 197px;
          display: flex;
          flex-direction: row;
          justify-content: center;

        }

        .pc-price {
          display: none;
        }


        .price {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 350px;
          height: 60px;
          background-color: url(../assets/img/getVIP/superC手机会员支付UI/手机会员/会员协议框.png);

          margin-top: 8px;
          margin-bottom: 16px;
          padding: 0 14px 0 14px;
          border-radius: 8px;
          box-shadow: 0px 2px 4px rgb(230, 230, 230);

          .price-text {
            .two {
              color: #ff5a00;
              margin-left: 16px;
            }

            .three {
              color: #ff5a00;
              font-weight: 1000;
            }
          }
        }


        .selected-background {
          position: relative;
          border-radius: 12px;
          width: 139px;
          height: 197px;
          display: flex;
          color: #fafafa;
          font-family: 'medium';
          margin-left: 0;

          //整体缩小
          transform: scale(0.9);
          ;

          .selected-text {
            z-index: 7;
            position: absolute;
            left: 18%;
            top: 5px;
            font-size: 8px;
          }

          .white-card {
            position: absolute;
            background-color: #ffffff;
            border-radius: 12px;
            left: 2px;
            top: 24px;
            width: 97%;
            height: 170px;
            display: flex;
            flex-direction: column;
            z-index: 6;
            font-size: 18px;
            font-weight: 900;
            padding-top: 8px;
            text-align: center;
            line-height: 28px;

            br {
              display: none;
            }

            .one {
              color: black;
              font-size: 12px;
              padding-left: 12px;
              text-align: left;

            }

            .two {
              color: #ffc62e;
              font-size: 18px;

              .t1 {
                font-size: 12px;
                margin-right: 0px;
              }

              .t2 {
                font-size: 10px;
                margin-left: -5px;
              }
            }

            .three {
              color: #ababab;
              text-decoration: line-through;
              font-size: 10px;

              .th1 {
                font-size: 10px;
                margin-right: -5px;
              }

              .th2 {
                font-size: 10px;
                margin-left: -5px;
              }
            }

            .four {
              width: 100%;
              overflow: scroll;
              color: black;
              font-size: 10px;
              transform: scale(0.8);
              white-space: nowrap;
            }

            .five {
              color: #ff5a00;
              font-size: 20px;

              .f1 {
                font-size: 10px;
                margin-right: 0px;
              }

              .f2 {
                font-size: 10px;
                margin-left: -5px;
              }
            }
          }
        }

        .pay-card {
          display: none;
        }

        .pay-card-phone {
          position: relative;
          background-color: #fafafa;
          border-radius: 30px;
          width: 100%;
          height: 200px;
          margin: 0px;
          display: flex;
          flex-direction: column;
          align-items: center;

          span {
            display: flex;
            flex-direction: row;
            margin: 10px;
            height: 150px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .pay-choose {
            width: 350px;
            min-height: 88px;
            display: flex;
            flex-direction: column;

            margin-top: 8px;
            padding: 0 14px 0 14px;
            border-radius: 8px;
            box-shadow: 0px 2px 4px rgb(230, 230, 230);
            overflow: scroll;

            .wx {
              display: flex;
              justify-content: space-between;
              flex-direction: row;
              font-size: 14px;

              img {
                width: 24px;
              }
            }

            .ali {
              display: flex;
              justify-content: space-between;
              flex-direction: row;
              font-size: 14px;

              img {
                width: 24px;
              }
            }
          }

          .QRcode {
            height: 164px;
            width: 90%;
            display: flex;
            justify-content: center;
            transform: scale(0.83);

          }

          .QRcode-ali {
            height: 170px;
            width: 250px;
            overflow: visible;
            padding-left: 40px;

            display: none;
          }

          .price {
            background-image: url('./../assets/img//getVIP/superC手机会员支付UI/手机会员/会员协议框.png');
            display: flex;
            width: 350px;
            justify-content: start;
            align-items: center;
            flex-direction: row;
            background-color: white;
            margin: 8px;
            padding: 16px 8px 16px 16px;
            border-radius: 8px;
            box-shadow: 0px 2px 4px rgb(230, 230, 230);

            .discount {
              height: 50px;
              width: 150px;
            }

            .discount-text {
              color: white;
              position: absolute;
              top: 36px;
              font-size: 18px;
              font-family: 'medium';
              font-weight: 1000;
              align-self: flex-start;
              padding-left: 16px;
            }

            .price-text {
              display: flex;
              width: 100%;
              height: 50px;
              flex-direction: row;
              width: 350px;
              justify-content: center;
              align-items: center;
              font-size: 16px;
              font-weight: 1000;
              color: #ff5a00;

              span {
                height: 40px;
                display: flex;
                text-align: center;
                display: flex;
                margin: 0;
              }

              .one {
                color: black;
                margin-right: -1px;
                padding-top: 8px;
              }

              .two {
                font-size: 16px;
                padding-top: 10px;
              }

              .three {
                font-family: 'medium';
                font-size: 24px;
              }

              .four {
                font-size: 16px;
                margin-left: -2px;
                padding-top: 10px;
              }
            }
          }
        }
      }

      span {
        z-index: 2;
      }

      .account-card {
        position: absolute;
        right: 0;
        top: 10px;
        z-index: 0;
      }

      .vip-card {
        position: absolute;
        left: 0;
        top: 10px;
        z-index: 0;
      }

      .account-card-click {
        position: absolute;
        right: 0;
        top: 10px;
        height: 60px;
        width: 50%;
        z-index: 3;

        .text {
          position: relative;
          top: 0;
          left: 25%;
          height: 15px;
        }
      }

      .vip-card-click {
        position: absolute;
        left: 0;
        height: 60px;
        top: 10px;
        width: 50%;
        z-index: 3;

        .text {
          position: relative;
          top: 0;
          left: 20%;
          height: 15px;
        }
      }

      .content-background {
        position: relative;
        z-index: 1;
        height: 312px;
      }

      .VIP-benefits {
        display: none;
      }

      .phone-benefits {
        width: 350px;
        display: flex;
        flex-direction: column;

        margin-top: 8px;
        padding: 16px 16px 16px 16px;
        border-radius: 8px;
        box-shadow: 0px 2px 4px rgb(230, 230, 230);

        .phone-benefits-title {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 8px;

          .phone-goto {
            color: #a5a5a5;
          }
        }

        .phone-benefits-content {
          display: flex;
          flex-wrap: wrap;

          .phone-benefit-unit {
            width: 100px;
            height: 50px;
            display: flex;
            justify-content: start;
            align-items: center;

            .benefits-icon {
              width: 24px;
              height: 24px;
            }

            .benefit-disc {
              line-height: 16px;

              .one {
                width: 60px;
                font-size: 16px;
                white-space: nowrap;
                font-weight: 600;
                transform: scale(0.7);
              }

              .two {
                width: 60px;
                font-size: 12px;
                white-space: nowrap;
                font-weight: 300;
                transform: scale(0.7);
              }
            }
          }
        }
      }

      .vip-protocol {
        width: 350px;
        padding: 16px 16px 16px 16px;
        margin-top: 8px;
        border-radius: 8px;
        box-shadow: 0px 2px 4px rgb(230, 230, 230);
        display: flex;
        justify-content: space-between;
      }

      .bottom-price {
        height: 70px;
        width: 100%;
        margin-top: 16px;
        padding: 8px 16px 8px 16px;
        background-color: white;
        // position: fixed;
        // z-index: 9999;
        // bottom: 0;
        // left: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .price-text {
          display: flex;

          .one {
            color: #ff5a00;
            font-weight: 1000;
            align-self: flex-end;
          }

          .two {
            color: #ff5a00;
            font-weight: 1000;
            font-size: 32px;
            line-height: 32px;
            align-self: flex-end;
          }

          .discount-text {
            color: #ff5a00;
            font-size: 12px;
            align-self: flex-end;
            margin-left: 16px;
          }
        }

        .confirm-botton {
          width: 130px;
          height: 42px;
          text-align: center;
          line-height: 42px;
          background-image: url('../assets/img/getVIP/superC手机会员支付UI/手机会员/确认按钮.png');
          background-size: cover;
        }
      }

      .bottom-price-times {
        position: fixed;
        top: 95%;
        height: 70px;
        width: 100%;
        margin-top: 16px;
        padding: 8px 16px 8px 16px;
        background-color: white;
        // position: fixed;
        z-index: 9999;
        // bottom: 0;
        // left: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .price-text {
          display: flex;

          .one {
            color: #ff5a00;
            font-weight: 1000;
            align-self: flex-end;
          }

          .two {
            color: #ff5a00;
            font-weight: 1000;
            font-size: 32px;
            line-height: 32px;
            align-self: flex-end;
          }

          .discount-text {
            color: #ff5a00;
            font-size: 12px;
            align-self: flex-end;
            margin-left: 16px;
          }
        }

        .confirm-botton {
          width: 130px;
          height: 42px;
          text-align: center;
          line-height: 42px;
          background-image: url('../assets/img/getVIP/superC手机会员支付UI/手机会员/确认按钮.png');
          background-size: cover;
        }
      }
    }
  }
}
</style>
