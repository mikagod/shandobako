<template>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <div class="YYL-center1">

      <button class="b2"  type="button" value="bigy" @click="selectbz">
        {{ selectT }}
      </button>
      <button v-if="selectb" class="b2"  style="margin-left: 3px" type="button" value="bigy" @click="ganzhichange" >
        确认
      </button>
      <br>
      <div style="margin-bottom: 11px" v-if="selectb">

        <div class="YYLcard">
            <span class="YYL-unit">
                <span>年柱:</span>
                <select class="gcganzhi" v-model="bn_time.gan"  style="font-size: 10px;">
                  <option selected>请选择</option>
                  <option :value="item" v-for="item in ganarr" :key="item">{{ item }}</option>
                </select>

                <select class="gcganzhi"  v-model="bn_time.zhi"  style="font-size: 10px;">
                  <option selected>请选择</option>
                  <option :value="item" v-for="item in zhiarr" :key="item">{{ item }}</option>
                </select>
            </span>
          <span class="YYL-unit">
                <span>月柱:</span>
                <select class="gcganzhi" v-model="by_time.gan"  style="font-size: 10px;">
                  <option selected>请选择</option>
                  <option :value="item" v-for="item in ganarr" :key="item">{{ item }}</option>
                </select>

                <select class="gcganzhi" v-model="by_time.zhi"  style="font-size: 10px;">
                  <option selected>请选择</option>
                  <option :value="item" v-for="item in zhiarr" :key="item">{{ item }}</option>
                </select>
            </span>
        </div>

        <div class="YYLcard">
            <span class="YYL-unit">
                <span>日柱:</span>
                <select class="gcganzhi" v-model="br_time.gan"  style="font-size: 10px;">
                  <option selected>请选择</option>
                  <option :value="item" v-for="item in ganarr" :key="item">{{ item }}</option>
                </select>

                <select  class="gcganzhi" v-model="br_time.zhi"  style="font-size: 10px;">
                  <option selected>请选择</option>
                  <option :value="item" v-for="item in zhiarr" :key="item">{{ item }}</option>
                </select>
            </span>
          <span class="YYL-unit">
                <span>时柱:</span>
                <select class="gcganzhi" v-model="bs_time.gan"  style="font-size: 10px;">
                  <option selected>请选择</option>
                  <option :value="item" v-for="item in ganarr" :key="item">{{ item }}</option>
                </select>

                <select class="gcganzhi" v-model="bs_time.zhi" style="font-size: 10px;">
                  <option selected>请选择</option>
                  <option :value="item" v-for="item in zhiarr" :key="item">{{ item }}</option>
                </select>
            </span>
        </div>

        <div class="YYLcard">
          <span class="YYL-unit">
                <span>八字:</span>
                <select class="gcganzhi-shi" v-model="bztime.bz" @change="ganzhibzchange"  style="font-size: 10px;">
                  <option selected>请选择</option>
                  <option :value="item" v-for="item in ganzhibzarr.ganzhibzarr" :key="item">{{ item }}</option>
                </select>


            </span>
        </div>
        <p class="help is-info is-marginless" style="line-height: 20px;font-size: medium;">
          <span style="color: red;">* &nbsp;</span>选择年柱，月柱，日柱，时柱之后，请点击上方确认，再从八字中选择此八字的具体生辰。
        </p>

      </div>

        <span>出生时间：</span>
        <!--公历选择器-->
        <span>公历</span>
        <br>
<div class="YYLcard">
            <span class="YYL-unit">
                <span>年:</span>
                <!--公历年:份选择器-->
                <select name="gcYear" id="gcYear" v-model="g_time.year"
                @change="g_time.month = ''"
                style="font-size: 10px;"
                >
                <option  selected>请选择</option>
                    <option :value="item" v-for="item in yeararr" :key="item">{{ item }}</option>
                    
                </select>
            </span>

            <span class="YYL-unit">

                <span>月:</span>

                <!--公历月:份选择器-->
                <select name="gcMon" id="gcMon" :disabled="g_time.year == ''"
                v-model="g_time.month"
                    @change="g_time.day = ''"
                    style="font-size: 10px;"
                >
                <option  selected>请选择</option>

                    <option :value="item" v-for="item in montharr">{{ item }}</option>

                </select>
            </span>

            <span class="YYL-unit">
                <span>日:</span>
                <!--公历日:子选择器-->
                <select name="gcDate" id="gcDate" :disabled="g_time.month == ''" v-model="g_time.day"
                    @change="g_timechangeday"
                    style="font-size: 10px;"
                >
                <option  selected>请选择</option>

                    <option :value="item" v-for="item in dayarr" :key="item">{{ item }}</option>

                </select>
            </span>
            <span class="YYL-unit">

                <span>时:</span>
                <!--公历时辰选择器-->
                <select  name="gcDate" id="gcDate" v-model="g_time.time"
                @change="transValue"
                    style="font-size: 10px;"
                >
                <option  selected>请选择</option>
                    <option v-for="(item, index) in time1" :key="item" :value="item">
                        {{ item }}
                    </option>
                </select>
            </span>

            <span class="YYL-unit">
             <span>分:</span>

                    <select name="gcDate" id="gcDate" v-model="g_time.minutes"
                            @change="transValue"
                            style="font-size: 10px;"
                    >
                        <option  selected>请选择</option>
                        <option v-for="(item, index) in minutesArr" :key="item" :value="item">{{ item }}</option>

                    </select>
            </span>

    </div>
            <br>
            <span>出生时间：</span>
            <span>阴历</span>
            <br>
            <div class="YYLcard">
                <span>
                    <span>年:</span>

                    <select name="gcYear" id="gcYear" v-model="y_time.year"
                    @change="y_time.month = ''"
                    style="font-size: 10px;"
                >
                        <option  selected>请选择</option>
                        <option :value="item" v-for="item in yeararr" :key="item">{{ item }}</option>

                    </select>

                </span>
                <span>
                    <span>月:</span>

                    <select name="gcMon" id="gcMon" :disabled="y_time.year == ''" v-model="y_time.month"
                        @change="y_time.day = ''"
                    style="font-size: 10px;"
                >
                        <option  selected>请选择</option>

                        <option :value="item" v-for="item in montharr">{{ item }}</option>

                    </select>

                </span>

                <span>
                    <span>日:</span>

                    <select name="gcDate" id="gcDate" :disabled="y_time.month == ''" v-model="y_time.day"
                        @change="y_timechange"
                    style="font-size: 10px;"
                >
                        <option  selected>请选择</option>

                        <option :value="item" v-for="item in ydayarr" :key="item">{{ item }}</option>

                    </select>
                </span>
                <span>
                    <span>时:</span>

                    <select name="gcDate" id="gcDate" v-model="g_time.time"
                    @change="transValue"
                    style="font-size: 10px;"
                >
                        <option  selected>请选择</option>
                        <option v-for="(item, index) in time1" :key="item" :value="item">{{ item }}</option>

                    </select>
                </span>


              <span>
                    <span>分:</span>

                    <select name="gcDate" id="gcDate" v-model="g_time.minutes"
                            @change="transValue"
                            style="font-size: 10px;"
                    >
                        <option  selected>请选择</option>
                        <option v-for="(item, index) in minutesArr" :key="item" :value="item">{{ item }}</option>

                    </select>
                </span>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'
import calendarFormatter from '../assets/js/dateChange.js'
import store from "../store/index.js";
import {EightChar} from "tyme4ts";
import dayjs from "dayjs";
const emit = defineEmits(["getValue","getGanzhiValue"])

let bn_time = reactive({
  gan: "请选择",
  zhi: "请选择",
})
let by_time = reactive({
  gan: "请选择",
  zhi: "请选择",
})
let br_time = reactive({
  gan: "请选择",
  zhi: "请选择",
})
let bs_time = reactive({
  gan: "请选择",
  zhi: "请选择",
})
let bztime = reactive({
  bz: "请选择",
})
const getSernchEnd =  ()  =>{
  const formattedTimeTemp = dayjs().format('YYYY-MM-DD-HH-mm');
  const dateTemp = formattedTimeTemp.split('-');
  return Number(dateTemp[0]) + 100;
}

const ganzhichange = () => {
  ganzhibzarr.ganzhibzarr.splice(0, ganzhibzarr.ganzhibzarr.length);
  if (bn_time.zhi && bn_time.zhi !== '请选择' && bn_time.gan && bn_time.gan !== '请选择' &&
      by_time.zhi && by_time.zhi !== '请选择' && by_time.gan && by_time.gan !== '请选择' &&
      br_time.zhi && br_time.zhi !== '请选择' && br_time.gan && br_time.gan !== '请选择' &&
      bs_time.zhi && bs_time.zhi !== '请选择' && bs_time.gan && bs_time.gan !== '请选择') {
    let ganzhi = bn_time.gan + bn_time.zhi + ',' + by_time.gan + by_time.zhi + ',' + br_time.gan + br_time.zhi + ',' + bs_time.gan + bs_time.zhi
    let solarTimes= null;
    try {
      let  valuearr = ganzhi.split(',')
      solarTimes = new EightChar(valuearr[0], valuearr[1], valuearr[2], valuearr[3]).getSolarTimes(1801, getSernchEnd());
      // 如果上面的代码成功执行，你可以在这里处理 solarTimes 变量
    } catch (error) {

    }

    if(!solarTimes || solarTimes.length <=0){
      alert("您输入的八字不在可查询范围内，请重新选择哦~");
      return;
    }
    for(let i =0 ; i < solarTimes.length;i ++){
      let solarTime = solarTimes[i];
      let shijina = `${solarTime.getYear()}-${solarTime.getMonth()}-${solarTime.getDay()} ${solarTime.getHour()}:${solarTime.getMinute()}:${solarTime.getSecond()}`;
      shijina = dayjs(shijina).format('YYYY-MM-DD HH:mm:ss');
      ganzhibzarr.ganzhibzarr.push(shijina);
    }
    alert("八字已更新，请选择八字");
  }
}

const ganzhibzchange = () => {
    if (bztime.bz !=='' && bztime.bz !=='请选择') {
      g_time.year = bztime.bz.substring(0,4);
      g_time.month = bztime.bz.substring(5,7);
      g_time.day = bztime.bz.substring(8,10);
      let nongli = calendarFormatter.solar2lunar(parseFloat(g_time.year), parseFloat(g_time.month), parseFloat(g_time.day));
      y_time.year = nongli.lYear
      y_time.month = nongli.lMonth < 10 ? '0' + nongli.lMonth : nongli.lMonth
      y_time.day = nongli.lDay
      getganzhishi(parseInt( bztime.bz.substring(11,13)));
    }
    emit("getGanzhiValue",  bn_time.gan + bn_time.zhi + ',' + by_time.gan + by_time.zhi + ',' + br_time.gan + br_time.zhi + ',' + bs_time.gan + bs_time.zhi);
    transValue();
}

let ganarr = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
let zhiarr = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
let ganzhibzarr = reactive({
  ganzhibzarr: []
});

let g_time = reactive({
    year: "请选择",
    month: "请选择",
    day: "请选择",
    time: "请选择",
    minutes: "请选择"
})
// 点击事件触发emit，去调用我们注册的自定义事件getValue,并传递value参数至父组件
const transValue = () => {
    emit("getValue", g_time);

    store.state.yingli=y_time.year+'年' + y_time.month + '月' + y_time.day + '日'
    store.state.yangli=g_time.year+'年' + g_time.month + '月' + g_time.day + '日'
}

let y_time = reactive({
    year: "请选择",
    month: "请选择",
    day: "请选择",
    time: "请选择",
    minutes: "请选择"
})

let isrun = ref(false)

const fn = (year) => {
    var a1 = (year % 4 == 0) && (year % 100 != 0) //条件1
    var a2 = (year % 400 == 0) //条件2

    if (a1 || a2) {
        return true
    } else {
        return false
    }
}


const g_timechangeday = () => {
    let nongli = calendarFormatter.solar2lunar(parseFloat(g_time.year), parseFloat(g_time.month), parseFloat(g_time.day));
    y_time.year = nongli.lYear
    y_time.month = nongli.lMonth < 10 ? '0' + nongli.lMonth : nongli.lMonth
    y_time.day = nongli.lDay
    transValue();
}

const y_timechange = () => {
    let gongli = calendarFormatter.lunar2solar(parseFloat(y_time.year), parseFloat(y_time.month), parseFloat(y_time.day));
    g_time.year = gongli.cYear
    g_time.month = gongli.cMonth < 10 ? '0' + gongli.cMonth : gongli.cMonth
    g_time.day = gongli.cDay
    transValue();
}


let dayarr = ref([])
let ydayarr = ref([])

watch(() => g_time.month, (newval, oldval) => {

    dayarr.value = []
    let num = new Date(parseFloat(g_time.year), parseFloat(newval), 0).getDate();

    for (let i = 0; i < num; i++) {
        dayarr.value.push(String(i + 1));
    }
})
watch(() => y_time.month, (newval, oldval) => {

    ydayarr.value = []
    let num = new Date(parseFloat(y_time.year), parseFloat(newval), 0).getDate();

    for (let i = 0; i < num; i++) {
        ydayarr.value.push(i + 1)
    }
})



const getYearBetween = (start, end) => {
    var result = [];
    //使用传入参数的时间
    var startTime = new Date(start);
    var endTime = new Date(end);
    while (endTime - startTime >= 0) {
        //获取年:份
        let year = String(startTime.getFullYear());
        //加入数组
        result.push(year);
        //更新日:期
        startTime.setFullYear(startTime.getFullYear() + 1);
    }
    return result;
}
let yeararr = getYearBetween('1900-1-1', (new Date().getFullYear() + 10) + '-' + parseFloat(new Date().getMonth() + 1) + '-' + new Date().getDate()).reverse();

let montharr = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
]

let time1 = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
let minutesArr = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
// 

// const time1 = [
//     // { id: 0, title: "早子时(00:00-01:00)" },
//     { id: 1, title: "丑时(01:01-03:00)" },
//     { id: 3, title: "寅时(03:01-05:00)" },
//     { id: 5, title: "卯时(05:01-07:00)" },
//     { id: 7, title: "辰时(07:01-09:00)" },
//     { id: 9, title: "巳时(09:01-11:00)" },
//     { id: 11, title: "午时(11:01-13:00)" },
//     { id: 13, title: "未时(13:01-15:00)" },
//     { id: 15, title: "申时(15:01-17:00)" },
//     { id: 17, title: "酉时(17:01-19:00)" },
//     { id: 19, title: "戌时(19:01-21:00)" },
//     { id: 21, title: "亥时(21:01-23:00)" },
//     // { id: 23, title: "晚子时(23:00-24:00)" },
//   { id: 23, title: "子时(23:01-01:00)" },
// ]

const selectb = ref(false);
const selectT = ref("选择八字");
const selectbz =  ()  =>{
  selectb.value =!selectb.value;
  selectT.value =  selectb.value ? "取消八字" : "选择八字";
  if (!selectb.value) {
    bn_time.gan = '请选择';
    by_time.gan = '请选择';
    br_time.gan = '请选择';
    bs_time.gan = '请选择';

    bn_time.zhi = '请选择';
    by_time.zhi = '请选择';
    br_time.zhi = '请选择';
    bs_time.zhi = '请选择';
  }
}

const getganzhishi =  (ganzhishi)  =>{
  if (ganzhishi >=1 && ganzhishi< 3) {
    y_time.time = 1;
  }
  if (ganzhishi >=3 && ganzhishi< 5) {
    y_time.time = 3;
  }
  if (ganzhishi >=5 && ganzhishi< 7) {
    y_time.time = 5;
  }
  if (ganzhishi >=7 && ganzhishi< 9) {
    y_time.time = 7;
  }
  if (ganzhishi >=9 && ganzhishi< 11) {
    y_time.time = 9;
  }
  if (ganzhishi >=11 && ganzhishi< 13) {
    y_time.time = 11;
  }
  if (ganzhishi >=13 && ganzhishi< 15) {
    y_time.time = 13;
  }
  if (ganzhishi >=15 && ganzhishi< 17) {
    y_time.time = 15;
  }
  if (ganzhishi >=17 && ganzhishi< 19) {
    y_time.time = 17;
  }
  if (ganzhishi >=19 && ganzhishi< 21) {
    y_time.time = 19;
  }
  if (ganzhishi >=21 && ganzhishi< 23) {
    y_time.time = 21;
  }
  if (ganzhishi >=23  || ganzhishi< 1) {
    y_time.time = 23;
  }
}
</script>

<style lang="scss" scoped>
.YYLcard {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    @media only screen and (max-width: 1030px) {
    flex-direction: column;
    }
}
.YYL-unit{
    color: black;
}
.YYL-unit-select{
    font-size: 1px;
}
.b2 {
  position: relative;
  display: inline-block;
  margin: 0 auto;
  padding: 3px 9px;
  text-align: center;
  font-family: SYHT;
  font-size: 16px;
  letter-spacing: 1px;
  text-decoration: none;
  color: #fefefe;
  background: #6694e1;
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid #6694e1;
  border-radius: 25px;
  box-shadow: inset 0 0 0 0 #5bdee3;
}

.b2:hover {
  color: white;
  box-shadow: inset 0 -100px 0 0 #5bdee3;

  border: 2px solid #5bdee3;
  border-radius: 25px;
}

.b2:active {
  transform: scale(0.9);
}

.YYL-center1{
    width: 515px;
    margin:0 auto;/*子元素水平居中*/
  }

#gcYear {
    background-color: azure;
    width: 70px;
    height: 30px;
    border-radius: 10px;
    border: 2px dashed lightcoral;
    margin-right: 10px;
    margin-top: 5px;
    margin-left: 5px;
}

#gcYear:hover {
    background-color: aquamarine;

}

.gcganzhi {
  background-color: azure;
  width: 70px;
  height: 30px;
  border-radius: 10px;
  border: 2px dashed lightcoral;
  margin-right: 9px;
  margin-top: 12px;
  margin-left: 10px;
}

.gcganzhi:hover {
  background-color: aquamarine;

}

.gcganzhi-shi {
  background-color: azure;
  border-radius: 10px;
  height: 30px;
  width: 150px;
  border: 2px dashed lightcoral;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;

}

.gcTime-shi:hover {
  background-color: aquamarine;
}


#gcMon {
    background-color: azure;
    border-radius: 10px;
    height: 30px;
    border: 2px dashed lightcoral;
    margin-right: 10px;
    margin-top: 5px;
    margin-left: 5px;

}

#gcMon:hover {
    background-color: aquamarine;
}


#gcDate {
    background-color: azure;
    width: 70px;
    border-radius: 10px;
    height: 30px;
    border: 2px dashed lightcoral;
    margin-top: 5px;
    margin-right: 10px;
    margin-left: 5px;

}

#gcDate:hover {
    background-color: aquamarine;
}

#gcTime {
    background-color: azure;
    border-radius: 10px;
    height: 30px;
    width: 150px;
    border: 2px dashed lightcoral;
    margin-top: 5px;
    margin-left: 5px;

}

#gcTime:hover {
    background-color: aquamarine;
}

#lcYear {
    background-color: cornsilk;
    width: 70px;
    height: 30px;
    border-radius: 10px;
    border: 2px dashed lightcoral;
    margin-right: 10px;
    margin-top: 5px;
    margin-left: 5px;

}

#lcYear:hover {
    background-color: mistyrose;
}

#lcMon {
    background-color: cornsilk;
    border-radius: 10px;
    height: 30px;
    border: 2px dashed lightcoral;
    margin-right: 10px;
    margin-top: 5px;
    margin-left: 5px;

}

#lcMon:hover {
    background-color: mistyrose;
}

#lcDate {
    background-color: cornsilk;
    width: 70px;
    height: 30px;
    border-radius: 10px;
    border: 2px dashed lightcoral;
    margin-right: 10px;
    margin-top: 5px;
    margin-left: 5px;

}

#lcDate:hover {
    background-color: mistyrose;
}

#lcTime {
    background-color: cornsilk;
    border-radius: 10px;
    height: 30px;
    border: 2px dashed lightcoral;
    width: 150px;
    margin-right: 10px;
    margin-top: 5px;
    margin-left: 5px;

}

#lcTime:hover {
    background-color: mistyrose;
}
</style>