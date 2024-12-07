<template>
    <br><br><br>
    <div class="result" :hidden="store.state.pdf" id="originresultPage1">
        <div class="demo-collapse">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item class='item' name="0">
                    <template #title>
                        <div class="title" style="color: black;"> 时空坐标原命局决策系统 &nbsp 先天命运分析报告</div>
                    </template>
                    

                    <div class="layout_title_top">时空坐标——原命局决策系统</div>
                    <div class="layout_title">先天命运分析报告</div>

                    <div class="layout_creator">
                      <div  style="padding-left: 4vw">预测专家:
                        <input type="text" style="border: none;width: max-content;" v-model="yczj" placeholder="请输入名称">
                      </div>
                    </div>
                    <div class="layout_time">
                        {{store.state.result.decisionTime}}
                    </div>
                    <br><br>

                </el-collapse-item>
                <el-collapse-item class='item' name="1">

                    <template #title>
                        <div class="title">{{ store.state.result.partOne.title }}</div>
                    </template>
                    

                    <div class="div1">
                        <span class="key">您的姓名：</span>
                        {{ store.state.name }}
                    </div>
                    <div class="div1">
                        <span class="key">
                            您的性别：
                        </span>
                        {{ store.state.sex == 0 ? '女' : '男' }}
                    </div>
                    <div class="div1">
                        <span class="key">
                            您的出生时间：
                        </span>
                        <span class="rili">公历</span>
                        {{ store.state.yangli }}
                    </div>
                    <div class="div1">
                        <span class="rili" style="padding-left:138px ;">农历</span>
                        {{ store.state.yingli }}
                    </div>

                    <div class="div1">
                        <span class="key">
                            您的时间坐标：
                        </span>
                        <span class="bazi_value">
                            {{ store.state.bazi.nianZhu }} &nbsp;&nbsp; {{ store.state.bazi.yueZhu }}&nbsp;&nbsp; {{
                                store.state.bazi.riZhu }}&nbsp;&nbsp; {{ store.state.bazi.shiZhu }}
                        </span>

                    </div>

                    <MyItem v-for="messageList in store.state.result.partOne.messageList" :data="messageList"></MyItem>

                    <div >
                       <span class="key">
                        {{ store.state.result.partOne.shenSha.title }}
                        </span>
                    </div>
                    <div class="qianyan">{{ store.state.result.partOne.shenSha.qianYan }}</div>
                    <OriginMyItemOne v-for="messageList in store.state.result.partOne.shenSha.messageList" :data="messageList">
                    </OriginMyItemOne>
                    <br><br>
                </el-collapse-item>
                <el-collapse-item class='item' title="第二部分" name="2">
                    <template #title>
                        <div class="title">{{ store.state.result.partTwo.title }}</div>
                    </template>
                    

                    <div class="div1">
                        <span class="key">
                            您的时间坐标：
                        </span>
                        <span class="bazi_value">
                            {{ store.state.bazi.nianZhu }} &nbsp;&nbsp; {{ store.state.bazi.yueZhu }}
                            &nbsp;&nbsp;
                            {{ store.state.bazi.riZhu }}&nbsp;&nbsp; {{ store.state.bazi.shiZhu }}
                        </span>

                    </div>
                    <div class="div1">
                        <span class="key">
                            您“时间坐标”里隐藏的六亲命运信息：
                        </span>
                    </div>
                    <MyItem v-for="messageList in store.state.result.partTwo.messageList" :data="messageList"></MyItem>
                  <span class="key">
                            您“时间坐标”里隐藏的十神占位信息：
                        </span>
                   <OriginMyItemObject v-for="messageList2 in store.state.result.partTwo.messageList2" :data="messageList2"></OriginMyItemObject>
                  <span class="key">
                           您“时间坐标”里隐藏的干支命运信息：
                        </span>
                  <OriginMyItemObject v-for="messageList3 in store.state.result.partTwo.messageList3" :data="messageList3"></OriginMyItemObject>
                </el-collapse-item>
                <el-collapse-item class='item' title="第三部分" name="3">
                    <template #title>
                        <div class="title">{{ store.state.result.partThree.title }}</div>
                    </template>
                    



                    <OriginMyItemObject v-for="messageList in store.state.result.partThree.messageList" :data="messageList"></OriginMyItemObject>
                    <br><br>
                </el-collapse-item>
                <el-collapse-item class='item' title="第四部分" name="4">
                    <template #title>
                        <div class="title">{{ store.state.result.partFour.title }}</div>
                    </template>
                    


                    <div class="qianyan">{{ store.state.result.partFour.qianYan }}</div>
                    <div class="qianyan">{{ store.state.result.partFour.endMessage }}</div>

                    <OriginMyItemOne v-for="messageList in store.state.result.partFour.messageList" :data="messageList"></OriginMyItemOne>
                    <br><br>
                </el-collapse-item>
                <el-collapse-item class='item' title="第五部分" name="5">
                    <template #title>
                        <div class="title">{{ store.state.result.partFive.title }}</div>
                    </template>
                    


                    <div class="qianyan">{{ store.state.result.partFive.qianYan }}</div>
                    <MyItem v-for="messageList in store.state.result.partFive.messageList" :data="messageList"></MyItem>
                    <br><br>
                </el-collapse-item>
                <el-collapse-item class='item' title="第六部分" name="6">
                    <template #title>
                        <div class="title">{{ store.state.result.partSix.title }}</div>
                    </template>
                    


                    <div class="qianyan">{{ store.state.result.partSix.qianYan }}</div>
                    <OriginMyItemObjectSix v-for="messageList in store.state.result.partSix.messageList" :data="messageList"></OriginMyItemObjectSix>
                    <br><br>
                </el-collapse-item>
                <el-collapse-item class='item' title="第七部分" name="7">
                    <template #title>
                        <div class="title">{{ store.state.result.partSeven.title }}</div>
                    </template>
                    


                    <div class="qianyan">{{ store.state.result.partSeven.qianYan }}</div>
                    <OriginMyItemObject v-for="messageList in store.state.result.partSeven.messageList" :data="messageList"></OriginMyItemObject>
                    <br><br>
                </el-collapse-item>
                <el-collapse-item class='item' title="第八部分" name="8">
                    <template #title>
                        <div class="title">{{ store.state.result.partEight.title }}</div>
                    </template>
                    


                    <div class="qianyan">{{ store.state.result.partEight.qianYan }}</div>
                    <OriginMyItemObject v-for="messageList in store.state.result.partEight.messageList" :data="messageList"></OriginMyItemObject>
                    <br><br>
                </el-collapse-item>
            </el-collapse>
            <div class="result-button">
            <button class="b1" @click="pdfExport()">
                导出
            </button>
        </div>
        </div>
    </div>
    <div class="result" :hidden="!store.state.pdf" id="originresultPage2">
        <div class="layout_title_top">时空坐标——原命局决策系统</div>
        <div class="layout_title">先天命运分析报告</div>

        <div class="layout_creator">
          预测专家: {{ yczj }}</div>
        <div class="layout_time">
            公元
            {{ new Date().getFullYear() }}年
            {{ new Date().getMonth() }}月
            {{ new Date().getDate() }}日
        </div>
        <br><br><br><br>
        <div class="title">{{ store.state.result.partOne.title }}</div>

        <div class="div1">
            <span class="key">您的姓名：</span>
            {{ store.state.name }}
        </div>
        <div class="div1">
            <span class="key">
                您的性别：
            </span>
            {{ store.state.sex == 0 ? '女' : '男' }}
        </div>
        <div class="div1">
            <span class="key">
                您的出生时间：
            </span>
            <span class="rili">公历</span>
            {{ store.state.yangli }}
        </div>
        <div class="div1">
            <span class="rili" style="padding-left:138px ;">农历</span>
            {{ store.state.yingli }}
        </div>

        <div class="div1">
            <span class="key">
                您的时间坐标：
            </span>
            <span class="bazi_value">
                {{ store.state.bazi.nianZhu }} &nbsp;&nbsp; {{ store.state.bazi.yueZhu }}&nbsp;&nbsp; {{
                    store.state.bazi.riZhu }}&nbsp;&nbsp; {{ store.state.bazi.shiZhu }}
            </span>

        </div>

        <MyItem v-for="messageList in store.state.result.partOne.messageList" :data="messageList"></MyItem>

        <div class="shensha_title">{{ store.state.result.partOne.shenSha.title }}</div>
        <div class="qianyan">{{ store.state.result.partOne.shenSha.qianYan }}</div>
        <MyItem v-for="messageList in store.state.result.partOne.shenSha.messageList" :data="messageList">
        </MyItem>
        <br><br>

        <div class="title">{{ store.state.result.partTwo.title }}</div>

        <div class="div1">
            <span class="key">
                您的时间坐标：
            </span>
            <span class="bazi_value">
                {{ store.state.bazi.nianZhu }} &nbsp;&nbsp; {{ store.state.bazi.yueZhu }}
                &nbsp;&nbsp;
                {{ store.state.bazi.riZhu }}&nbsp;&nbsp; {{ store.state.bazi.shiZhu }}
            </span>

        </div>
        <div class="div1">
            <span class="key">
                您“时间坐标”里隐藏的六亲命运信息：
            </span>
        </div>
        <MyItem v-for="messageList in store.state.result.partTwo.messageList" :data="messageList"></MyItem>

      <span class="key">
                            您“时间坐标”里隐藏的十神占位信息：
                        </span>
      <OriginMyItemObject v-for="messageList2 in store.state.result.partTwo.messageList2" :data="messageList2"></OriginMyItemObject>
      <span class="key">
                           您“时间坐标”里隐藏的干支命运信息：
                        </span>
      <OriginMyItemObject v-for="messageList3 in store.state.result.partTwo.messageList3" :data="messageList3"></OriginMyItemObject>


        <div class="title">{{ store.state.result.partThree.title }}</div>



        <OriginMyItemObject v-for="messageList in store.state.result.partThree.messageList" :data="messageList"></OriginMyItemObject>
        <br><br>

        <div class="title">{{ store.state.result.partFour.title }}</div>


        <div class="qianyan">{{ store.state.result.partFour.qianYan }}</div>
        <div class="qianyan">{{ store.state.result.partFour.endMessage }}</div>

        <OriginMyItemOne v-for="messageList in store.state.result.partFour.messageList" :data="messageList"></OriginMyItemOne>
        <br><br>

        <div class="title">{{ store.state.result.partFive.title }}</div>


        <div class="qianyan">{{ store.state.result.partFive.qianYan }}</div>
        <MyItem v-for="messageList in store.state.result.partFive.messageList" :data="messageList"></MyItem>
        <br><br>

        <div class="title">{{ store.state.result.partSix.title }}</div>


        <div class="qianyan">{{ store.state.result.partSix.qianYan }}</div>
        <OriginMyItemObjectSix v-for="messageList in store.state.result.partSix.messageList" :data="messageList"></OriginMyItemObjectSix>
        <br><br>

        <div class="title">{{ store.state.result.partSeven.title }}</div>


        <div class="qianyan">{{ store.state.result.partSeven.qianYan }}</div>
       <OriginMyItemObject v-for="messageList in store.state.result.partSeven.messageList" :data="messageList"></OriginMyItemObject>
        <br><br>

        <div class="title">{{ store.state.result.partEight.title }}</div>

        <div class="qianyan">{{ store.state.result.partEight.qianYan }}</div>
        <OriginMyItemObject v-for="messageList in store.state.result.partEight.messageList" :data="messageList"></OriginMyItemObject>
        <br><br><br><br>
        
    
    </div>
    
</template>

<script  setup lang="ts">
import { computed, ref, watch, reactive } from 'vue'
import MyItem from './MyItem.vue'
import OriginMyItemOne from './OriginMyItemOne.vue'
import OriginMyItemObjectSix from './OriginMyItemObjectSix.vue'
import OriginMyItemObject from './OriginMyItemObject.vue'
import { toRefs } from 'vue'
import store from "../store/index.js";
import localStorageObject from "../store/localStorageObject.js";
import { onMounted } from 'vue';
import { getmark } from "../util/watermark";

const { watermark } = getmark();
    

onMounted(() => {
  if (localStorageObject.getMemberLevel()<=1) {
    // 将年月日时分秒按照指定格式拼接为字符串
    store.state.watermark = false;
    watermark( "时 空 坐 标 原 命 局 决 策 系 统 出 品" ,"originresultPage1",1 );//水印名
    watermark( "时 空 坐 标 原 命 局 决 策 系 统 出 品" ,"originresultPage2",-1 );//水印名
  }
});

const pdfExport = () => {
    store.state.pdf=true;
    setTimeout(() => {
        window.print();
        store.state.pdf = false;
    }, 500); // 设置1秒的延迟
	
}
let date = new Date(); //Date() 方法可返回当天的日期和时间
const activeNames = ref(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
const handleChange = (val) => {
    console.log(val)
}
const yczj = ref<string>('');
const props = defineProps({
    //子组件接收父组件传递过来的值
    info: Object,
})
//使用父组件传递过来的值
const { info } = toRefs(props)
const info2 = ref(store.state.result)

</script>

<style lang="scss" scoped>
@import '../assets/font/font.css';
@media print {
    .dayunresult{
        -webkit-print-color-adjust: exact; // 打印页面背景图像
    }
    @page {
    /* 添加页眉边距 */
    margin-top: 3vh;
    /* 定义页眉的内容和样式 */
    @top-center{
      font-size: 18px;
      //content: "这里是页眉";
      content: "";
      display: running(headfoot);
    }
  }
 
  /* 设置页脚 */
  @page {
    /* 添加页脚边距 */
    margin-bottom: 50px;
    /* 定义页脚的内容和样式 */
    @bottom-center {
      font-size: 16px;
      //content: "这里是页脚";
      content: "";
      display: running(headfoot);
    }
}
}
.layout_creator {
    text-align: center;
    font-family: 'title';
    color: black;
    margin-top: 35%;
    margin-bottom: 30%;
    font-size: 21px;
   padding-left: 4vw;
}
.b1 {
    position: relative;
    display: inline-block;
    margin:0 auto;/*水平居中*/
    padding: 15px 30px;
    text-align: center;
    font-family: SYHT;
    font-size: 18px;
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

.b1:hover {
    color: white;
    box-shadow: inset 0 -100px 0 0 #5bdee3;
    
    border: 2px solid #5bdee3;
    border-radius: 25px;
}

.b1:active {
    transform: scale(0.9);
}
.result-button {
    text-align: center;
    font-family: 'title';
    color: black;
    width: 100%;
    margin-top: 20px;
}

.layout_time {
    text-align: center;
    font-weight: 900px;
    font-family: 'title';
    color: black;
    padding-bottom: 20%;
    font-size: 20px;
}

.layout_title_top {
    text-align: center;
    font-weight: 1500px;
    font-size: 24px;
    padding-top: 20vh;
    font-family: 'title';
    color: black;

}

.layout_title {
    text-align: center;
    font-size: 48px;
    padding-top: 5vh;
    font-family: 'title';
    color: black;
}

.key {
    font-size: 19px;
    font-weight: 900;
    color: black;
}

.bazi_value {
    font-size: 24px;
    color: #ed7d31;
}

.rili {
    color: #00b0f0;
    font-size: 20px;
    font-weight: 600;

}
@media print {
    .result{
        -webkit-print-color-adjust: exact; // 打印页面背景图像
    }
    @page {
    /* 添加页眉边距 */
    margin-top: 3vh;
    /* 定义页眉的内容和样式 */
    @top-center {
      font-size: 18px;
      //content: "这里是页眉";
      content: "";
      display: running(headfoot);
    }
  }
 
  /* 设置页脚 */
  @page {
    /* 添加页脚边距 */
    margin-bottom: 50px;
    /* 定义页脚的内容和样式 */
    @bottom-center {
      font-size: 16px;
      //content: "这里是页脚";
      content: "";
      display: running(headfoot);
    }
}
}
.result {
    font-size: 18px;
    line-height: 30px;
    width: 800px;
    position: relative;
    overflow: visible;
    @media only screen and (max-width: 1030px) {
        width: 500px;
    }

    padding-top: 3vh;
    padding-left: 50px;
    padding-right: 50px;
    margin:0 auto;
    padding-bottom: 5%;
    border-radius: 0.4em;
    box-shadow: 0.3em 0.3em 0.7em #00000015;
    transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    //border: rgb(250, 250, 250) 0.2em solid;
    font-family: 'regular';
}

//.result:hover {
//    border: #006fff 0.2em solid;
//}

.title {
    width: 100%;
    font-family: 'title';
    font-size: 25px;
    color: #5b9bd5;
    text-align: center;
    margin-top: 0px;
}



.shensha_title {
    font-size: 19px;
    font-family: 'title';
    color: black;
    margin-top: 20px;
}

.qianyan {
    font-size: 15px;
    color: #9ba399;
    padding-bottom: 10px;
}

.div1 {
    font-size: 18px;
}

.item {
    margin-top: 30px;

    
}
</style>