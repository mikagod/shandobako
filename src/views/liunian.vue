<template>
  <div class="origin-center-wrap">
    <div style="margin-bottom:24px" class="
    			  column
    			  is-half-mobile
    			  is-one-third-tablet
    			  is-one-fifth-desktop
    			">
    </div>
    <div class="container is-fluid has-text-centered-desktop">
      <div class="liunian-bt">
        <h1 id="ymjbt">流年决策系统</h1>
      </div>
    </div>

    <div class="center1">

      <div class="YYL-top YYL-top-unique">
        <p>
          <label for="OriName">
            <span>姓名: </span> </label>
        <br>
          <input class="input is-info" type="text" id="OriName" name="OriName" placeholder="请输入您的姓名" maxlength="6"   v-model="data.oriName"
            size="20">
        </p>

        <p>
          <span>性别：</span>
          <br>
          <input type="radio" id="gender" name="gender" value="1" v-model="data.gender"/> 男
          <input type="radio" id="gender" name="gender" value="0" v-model="data.gender"/> 女
        </p>
      </div>


      <div class="YYL-super">
       <YYL @getValue="getSonValue"></YYL>
      </div>



      <br>
      <p class="has-text-centered">
        <button class="dayun-b1"  @click="submit">
          生成大运
        </button>
        <br>

      </p>

      <div :hidden="hiddenDayun">

        <p class="has-text-centered" style="margin-top: 10px; margin-bottom:10px;">
<!--          <font color="#5f89ff">-->
<!--            请选择您要决策的大运：-->
<!--          </font>-->

          <br>
        </p>
        <p class="center1">
          <dayuncard @getValue="getDayunCardIndex" :dayunArr="dayunArr"></dayuncard>
        </p>

        <br>


        <p class="has-text-centered">
          <button
              class="liunian-b1"
              name="bigyButton"
              @click="submitLiunian"
          >
            生成流年
          </button>
          <br>
          <br>
        </p>
        <div :hidden="hiddenLiunian">
          <p class="has-text-centered">
            <font color="#5f89ff">
              请选择您要决策的流年:
            </font>
            <br>
          </p>
          <p class="center1">
            <liuniancard @getValue="getLiunianCardIndex" :liunianArr="liunianArr"></liuniancard>
          </p>
          <br>


          <p class="help is-info is-marginless"
             style="padding-bottom: 10px;">
            <span style="color: red;" >*</span>&nbsp;
            本系统不分析人的死亡时间、智力水平、学历文凭。
          </p>

        </div>



      </div>

    </div>

    <p class="has-text-centered">
            <button
                class="b1"
                name="bigyButton"
                @click="submitGetLiunianAll"
            >
              开始决策
            </button>
            <br>
            <br>
    </p>
    
  </div>

</template>

<script setup>
import { computed,ref, watch, reactive } from 'vue'
import MyItem from './MyItem.vue'
import dayuncard from './dayuncard.vue'
import liuniancard from './liuniancard.vue'
import YYL from './YYL.vue'
import {liunianAll} from '../axios/liunianApi.js'
import {getDaYun, getLiuNian} from '../axios/api.js'
import store from "../store/index.js";
import router from "../router/index.js";

const hiddenDayun = ref(true);
const hiddenLiunian = ref(true);
const currentIndex = ref(10);
const dayunArr=ref(
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
const liunianArr=ref(
    {
      one: "2057 丁丑",
      two: "2058 戊寅",
      three: "2059 己卯",
      four: "2060 庚辰",
      five: "2061 辛已",
      six: "2062 王午",
      seven: "2863 癸未",
      eight: "2064 甲申",
      nine: "2065 乙西",
      ten: "2066 丙成",
    }
);

const getSonValue = async (value) => {
  data.value.nian=value.year;
  data.value.yue=value.month;
  data.value.ri=value.day;
  data.value.shi=value.time;
}
const getDayunCard = async (value) => {
  debugger
  data.value.nian=value.year;
  data.value.yue=value.month;
  data.value.ri=value.day;
  data.value.shi=value.time;

}

const getDayunCardIndex = async (value) => {
  data.value.daYunIndex = value.value;


}

const getLiunianCardIndex = async (value) => {
  data.value.liuNianIndex = value.value;
}


const data = ref({
		gender:"0",
		nian:"",
    yue:"",
    ri:"",
    shi:"",
    daYunIndex:currentIndex.value,
    liuNianIndex:currentIndex.value,
    qiqi_direction_home:"请选择",
    haha_direction_home:"请选择",
    oriName: ""
	})

const bazi_data = ref({
  nian:"",
  yue:"",
  ri:"",
  shi:"",
})
const submit = ()  =>{
		if(
      data.value.gender === ''
      || data.value.nian === ''
      || data.value.yue === ''
      || data.value.ri === ''
      || data.value.shi === ''

      ){
			alert('缺少必填内容')
			return false
		}else{
      getDaYun(data.value).then((res)=>{
				if(res.data.code == '0'){
          hiddenDayun.value =false
          console.log(res.data.data);
          dayunArr.value=res.data.data
				}else{
					alert(res.data.msg)
				}

			}).finally((err)=>{
                // submintbtn.value = false这里错误之后执行的行为
                // alert(res.data.msg)
            })
		}
	}

const submitLiunian = ()  =>{
  if(
      data.value.gender == ''
      || data.value.nian == ''
      || data.value.yue == ''
      || data.value.ri == ''
      || data.value.shi == ''
      || data.value.daYunIndex == 10
  ){
    alert('缺少必填内容')
    return false
  }else{
    getLiuNian(data.value).then((res)=>{
      if(res.data.code == '0'){
        hiddenLiunian.value =false
        console.log(res.data.data);
        liunianArr.value=res.data.data
      }else{
        alert(res.data.msg)
      }

    }).finally((err)=>{
      // submintbtn.value = false这里错误之后执行的行为
      // alert(res.data.msg)
    })
  }
}

const submitGetLiunianAll = ()  =>{
  if(
      data.value.gender == ''
      || data.value.nian == ''
      || data.value.yue == ''
      || data.value.ri == ''
      || data.value.shi == ''
      || data.value.daYunIndex == 10
      || data.value.liuNianIndex == 10
  ){
    alert('缺少必填内容')
    return false
  }else{
    liunianAll(data.value).then((res)=>{
      if(res.data.code == '0'){
        store.state.liunianResult=res.data.data;
        store.state.name = data.value.oriName;
        store.state.sex = data.value.gender;
        bazi_data.value.nian= data.value.nian;
        bazi_data.value.yue= data.value.yue;
        bazi_data.value.ri= data.value.ri;
        bazi_data.value.shi= data.value.shi;

        let  personBaZi = res.data.data.personBaZi;
        let parts = personBaZi.split(" ");
        store.state.bazi.nianZhu = parts[0];
        store.state.bazi.yueZhu  = parts[1];
        store.state.bazi.riZhu   = parts[2];
        store.state.bazi.shiZhu  = parts[3];
        router.push({name:"liunianResult",params:{}});

      }else{
        if (res.data.msg ==='次数已经用完') {
          store.state.showGetVIP = true;
        }
        alert(res.data.msg)
      }

    }).finally((err)=>{
      // submintbtn.value = false这里错误之后执行的行为
      // alert(res.data.msg)
    })
  }
}


const tiemarr = [
    { id: 0, title: "甲" },
    { id: 1, title: "卯" },
    { id: 2, title: "乙" },
    { id: 3, title: "辰" },
    { id: 4, title: "巽" },
    { id: 5, title: "巳" },
    { id: 6, title: "丙" },
    { id: 7, title: "午" },
    { id: 8, title: "丁" },
    { id: 9, title: "未" },
    { id: 10, title: "坤" },
    { id: 11, title: "庚" },
    { id: 12, title: "酉" },
    { id: 13, title: "辛" },
    { id: 14, title: "戌" },
    { id: 15, title: "乾" },
    { id: 16, title: "亥" },
    { id: 17, title: "壬" },
    { id: 18, title: "子" },
    { id: 19, title: "癸" },
    { id: 20, title: "丑" },
    { id: 21, title: "艮" },
    { id: 22, title: "寅" },
]

</script>

<style  scoped>
@import url('../assets/css/origin.css');
.dayun-card {
  padding-left: 5%;
  padding-top: 5%;
  padding-right: 5%;
  padding-bottom: 5%;
  width: 500px;
  height: 550px;
    border-radius: 30px;
    background: #eaf8ff;
  text-align: center;
  box-shadow: 0px;
}
.dayun-b1{
  margin-bottom: 10px;
}

/* 流年决策系统的特殊调整 */
@media screen and (max-width: 768px) {
  .YYL-top-unique {
    width: 80vw !important;
  }
}
</style>