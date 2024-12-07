<template>
  <div class="container is-fluid has-text-centered-desktop">
    <div style="margin-bottom:24px" class="
          			  column
          			  is-half-mobile
          			  is-one-third-tablet
          			  is-one-fifth-desktop
          			">
    </div>
    <div class="dayun-bt">
      <h1 id="ymjbt">大运决策系统</h1>
    </div>
  </div>
  <div class="center1">

    <div style="margin-bottom:24px" class="
    			  column
    			  is-half-mobile
    			  is-one-third-tablet
    			  is-one-fifth-desktop
    			">
    </div>


    <p>
      <label for="OriName">
        <span>姓名: </span> </label>

      <input class="input is-info" type="text" id="OriName" name="OriName" placeholder="请输入您的姓名" maxlength="6"
             v-model="data.oriName"
             size="20">
    </p>

    <p>
      <span>性别：</span>
      <input type="radio" id="gender" name="gender" value="1" v-model="data.gender"/> 男
      <input type="radio" id="gender" name="gender" value="0" v-model="data.gender"/> 女
    </p>


    <YYL @getValue="getSonValue"></YYL>

    <p class="help is-info is-marginless">
      <span style="color: red;">*</span>&nbsp;
      本系统不分析人的死亡时间、智力水平、学历文凭。
    </p>

    <br>
    <p class="has-text-centered">
      <button class="dayun-b1" @click="submit">
        生成大运
      </button>
      <br>
      <br>

    </p>
    <div :hidden="hidden">

      <dayuncard @getValue="getDayunCardIndex" :dayunArr="dayunArr"></dayuncard>

      <br>

      <p>
        <span style="color: red;">*</span>&nbsp;
        <span>在祖坟的什么方向居住工作（学习）：</span>
        <select name="qiqi_direction" id="qiqidirection" style="font-size: 10px;"
                v-model="data2.boku_direction_ancestors">
          <option selected>请选择</option>
          <option v-for="item in tiemarr" :key="item.id" :value="item.title">{{ item.title }}</option>

        </select>
      </p>

      <p>
        <span style="color: red;">*</span>&nbsp;
        <span>在自己居住点的什么方向工作（学习）：</span>

        <select name="qiqi_direction" id="qiqidirection" style="font-size: 10px;" v-model="data2.boku_direction_home">
          <option selected>请选择</option>
          <option v-for="item in tiemarr" :key="item.id" :value="item.title">{{ item.title }}</option>

        </select>
      </p>
      <p>
        <span style="color: red;">*</span>&nbsp;
        <span>常去自己居住点的什么方向休闲娱乐：</span>

        <select name="qiqi_direction" id="qiqidirection" style="font-size: 10px;" v-model="data2.boku_direction_wan">
          <option selected>请选择</option>
          <option v-for="item in tiemarr" :key="item.id" :value="item.title">{{ item.title }}</option>

        </select>
      </p>
      <p class="help is-info is-marginless"
         style="padding-bottom: 10px;">
        <span style="color: red;">*</span>&nbsp;
        本系统不分析人的死亡时间、智力水平、学历文凭。
      </p>
      <p class="has-text-centered">
        <button
            class="b1"
            @click="submit2"
        >
          开始决策
        </button>
        <br>
        <br>
      </p>

    </div>


  </div>

</template>

<script setup>
import {computed, ref, watch, reactive} from 'vue'
import MyItem from './MyItem.vue'
import dayuncard from './dayuncard.vue'
import YYL from './YYL.vue'
import {getDaYun} from '../axios/api.js'
import {dayunAll} from '../axios/dayunApi.js'
import router from "../router/index.js";
import store from "../store/index.js";
import {useRoute} from "vue-router";
import localStorageObject from "../store/localStorageObject.js";

const hidden = ref(true);
const currentIndex = ref(10);
const dayunArr = ref(
    {
      one: "19岁~28岁  [2001年-2010年]  丁巳",
      two: "19岁~28岁  [2001年-2010年]  丁巳",
      three: "29岁~38岁  [2011年-2020年]  戊午",
      four: "39岁~48岁  [2021年-2030年]  己未",
      five: "49岁~58岁  [2031年-2040年]  庚申",
      six: "59岁~68岁  [2041年-2050年]  辛酉",
      seven: "69岁~78岁  [2051年-2060年]  壬戌",
      eight: "79岁~88岁  [2061年-2070年]  癸亥",
      nine: "89岁~98岁  [2071年-2080年]  甲子",
      ten: "99岁~108岁  [2081年-2090年]  乙丑",
    }
);
const getSonValue = async (value) => {
  data.value.nian = value.year;
  data.value.yue = value.month;
  data.value.ri = value.day;
  data.value.shi = value.time;
  data2.value.nian = value.year;
  data2.value.yue = value.month;
  data2.value.ri = value.day;
  data2.value.shi = value.time;
  hidden.value = true;
}
const getDayunCardIndex = async (value) => {
  currentIndex.value = value.value;
  data2.value.daYunIndex = value.value;
  data2.value.sex = data.value.gender;
}
const data = ref({
  gender: "0",
  nian: "",
  yue: "",
  ri: "",
  shi: "",
  oriName: ""
})
const bazi_data = ref({
  nian: "",
  yue: "",
  ri: "",
  shi: "",
})
const submit = () => {
  if (
      data.value.gender == ''
      || data.value.nian == ''
      || data.value.yue == ''
      || data.value.ri == ''
      || data.value.shi == ''

  ) {
    alert('缺少必填内容')
    return false
  } else {
    getDaYun(data.value).then((res) => {
      if (res.data.code == '0') {
        dayunArr.value = res.data.data;
        console.log(dayunArr.value);

        hidden.value = false;
      } else {
        alert(res.data.msg)
      }

    }).finally((err) => {
      // submintbtn.value = false这里错误之后执行的行为
      // alert(res.data.msg)
    })
  }
}
const data2 = ref(
    {
      daYunIndex: 10,
      sex: '',
      nian: '',
      yue: '',
      ri: '',
      shi: '',
      boku_direction_home: '请选择',
      boku_direction_wan: '请选择',
      boku_direction_ancestors: '请选择',
      // daYunIndex: 9,
      // sex: '0',
      // nian: '2001',
      // yue:'2',
      // ri:'2',
      // shi:'2',
      // boku_direction_home:'甲',
      // boku_direction_wan:'甲',
      // boku_direction_ancestors:'甲'
      oriName: '',
      phone: store.state.phone,
    }
)
const submit2 = () => {
  if (
      data2.value.sex === '' ||
      data2.value.nian === '' ||
      data2.value.yue === '' ||
      data2.value.ri === '' ||
      data2.value.shi === '' ||
      data2.value.boku_direction_ancestors === '' ||
      data2.value.boku_direction_home === '' ||
      data2.value.daYunIndex === 10 ||
      data2.value.boku_direction_wan === '' ||
      data2.value.boku_direction_ancestors === '请选择' ||
      data2.value.boku_direction_home === '请选择' ||
      data2.value.boku_direction_wan === '请选择'
  ) {
    alert('缺少必填内容')
    console.log(data2.value);
    return false
  } else {
    data2.value.oriName = data.value.oriName

    dayunAll(data2.value).then((res) => {
      if (res.data.code == '0') {
        store.state.dayunresult = res.data.data;
        store.state.name = data.value.oriName;
        store.state.sex = data.value.gender;
        bazi_data.value.nian = data2.value.nian;
        bazi_data.value.yue = data2.value.yue;
        bazi_data.value.ri = data2.value.ri;
        bazi_data.value.shi = data2.value.shi;
        let personBaZi = res.data.data.personBaZi;
        let parts = personBaZi.split(" ");
        store.state.bazi.nianZhu = parts[0];
        store.state.bazi.yueZhu = parts[1];
        store.state.bazi.riZhu = parts[2];
        store.state.bazi.shiZhu = parts[3];
        router.push({name: "dayunResult", params: {}});

      } else {
        if (res.data.msg === '次数已经用完') {
          store.state.showGetVIP = true;
        }
        alert(res.data.msg)
      }

    }).finally((err) => {
      // submintbtn.value = false这里错误之后执行的行为
      // alert(res.data.msg)
    })
  }
}

const tiemarr = [
  {id: -1, title: "无"},
  {id: 0, title: "甲"},
  {id: 1, title: "卯"},
  {id: 2, title: "乙"},
  {id: 3, title: "辰"},
  {id: 4, title: "巽"},
  {id: 5, title: "巳"},
  {id: 6, title: "丙"},
  {id: 7, title: "午"},
  {id: 8, title: "丁"},
  {id: 9, title: "未"},
  {id: 10, title: "坤"},
  {id: 11, title: "庚"},
  {id: 12, title: "酉"},
  {id: 13, title: "辛"},
  {id: 14, title: "戌"},
  {id: 15, title: "乾"},
  {id: 16, title: "亥"},
  {id: 17, title: "壬"},
  {id: 18, title: "子"},
  {id: 19, title: "癸"},
  {id: 20, title: "丑"},
  {id: 21, title: "艮"},
  {id: 22, title: "寅"},
  {id: 23, title: "申"},
]

const route = useRoute();

watch(
    () => route.path,
    (toPath) => {
      if (toPath === '/origin') {
        if (data){
          data.value = {
            gender: "0",
            nian: "",
            yue: "",
            ri: "",
            shi: "",
            oriName: ""
          }
          hidden.value = true;
        }

      }
    }
);
</script>

<style scoped>
@import url('../assets/css/origin.css');


</style>