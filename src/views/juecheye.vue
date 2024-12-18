<template>
  <div>
    <br>
    <div class="divider">
      <span class="left-line"></span>
      <span class="text">决策结果</span>
      <span class="right-line"></span>
    </div>
    <div class="gif">
      <img src="../assets/img/juecheye/flower.gif" alt="Example GIF">
    </div>
    <br>

    
    <div class="search">

        <span class="back-and-date">
            <img src="../assets/img/juecheye/left.png" class="clear" @click="clearSearch" v-bind:title="'显示所有'">

            <span class="date-select">
                <el-config-provider :locale="locale">
                    <el-date-picker popper-class="elDatePicker" v-model="conditions.historyTime" type="date" format="YYYY年MM月DD日" value-format="YYYY年MM月DD日" placeholder="请选择决策日期" >
                        <template #default="cell">
                            <div class="cell" :class="{ current: cell.isCurrent }">
                            <span class="text1">{{ cell.text }}</span>
                            </div>
                        </template>
                    </el-date-picker>
                </el-config-provider>

                <span class="search-calender-search-img">
                    <img src="../assets/img/juecheye/search.png" style="width: 22px;height: 22px;" @click="search">
                </span>
            </span>
        </span>

        <span class="search-search-byname">
            <input class="search-byname-font" type="text" placeholder="请输入被预测者姓名查询报告&nbsp;例:周星驰" v-model="conditions.userName">
            <img src="../assets/img/juecheye/x.png" style="width: 16px;height: 16px;" @click="conditions.userName=''">
            <span class="search-byname-right" @click="search">
                查询
            </span>
        </span>

    </div>



    <div class="result-Page">
      <unit :datas="data.records"></unit>
      <div class="page-container">
        <div class="page">
          <img src="../assets/img/juecheye/left.png" class="time-location-img" @click="currentPage>1?searchPage(--currentPage):0">
          <span class='page-num' v-for="page in pagearr" @click="searchPage(page)">
                    {{ page }}
                </span>
          <img src="../assets/img/juecheye/right.png" class="time-location-img" style="margin-left: 15px;" @click="currentPage<pagearr.length?searchPage(++currentPage):0">
        </div>
      </div>

    </div>
    <br>
  </div>

</template>

<script setup lang="ts">
import { computed, ref, watch, reactive, onMounted } from 'vue'
import unit from './juecheye-unit.vue'
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { getpage } from '../axios/OriginApi.js'
import store from "../store/index.js";
import router from "../router";
import {useRoute, useRouter} from 'vue-router';


const pagearr = ref([1]);
let locale = zhCn;
const currentPage = ref(1);
const data = ref({
    records: [
        {
            historyId: "123",
            userPhone: null,
            historyTime: "公元2023年04月21日 15:28",
            historyType: "原命局报告",
            subjectBazi: "己卯 丙寅 己亥 乙丑",
            historyData: '123',
            userName: "黄润科"
        },
        // {
        //     historyId: "123",
        //     userPhone: null,
        //     historyTime: "公元2023年04月21日 15:28",
        //     historyType: "大运报告",
        //     subjectBazi: "己卯 丙寅 己亥 乙丑",
        //     historyData: '123',
        //     userName: "黄润科"
        // },

    ]
});
const conditions = ref(
    {
        historyTime: '',
        historyType: '',
        page: '1',
        pageSize: '9',
        phone: '',
        userName: '',
    }
);

const route = useRoute();
onMounted(() => {
    search();
});

watch(
    () => route.path,
    (toPath) => {
      if (toPath === '/juecheye') {
        search(); // 路由变化时调用，如果新路径是/juecheye
      }
    }
);


const search = () => {
  if(conditions.value.historyTime && conditions.value.historyTime != '' && (!conditions.value.historyTime.startsWith('公元'))){
        conditions.value.historyTime='公元'+conditions.value.historyTime
    }
    // conditions.value.phone=store.state.phone;
    getpage(conditions.value).then((res) => {

            if (res.data.code == '0') {
                res.data.data.list.forEach(element => {
                    element.userPhone='';
                });
                data.value.records = res.data.data.list;
                var pageacount =Math.ceil(parseInt(res.data.data.total) / parseInt(res.data.data.pageSize));
                pagearr.value.length = pageacount;
                for (let i = 0; i <
                    pagearr.value.length;i++) {
                        pagearr.value[i]=i+1;
                }
            } else {
                alert(res.data.msg)
            }

        }).finally((err) => {
            // submintbtn.value = false这里错误之后执行的行为
            // alert(res.data.msg)
        })
  };
const searchPage = (num) => {
    console.log(num)
    conditions.value.page=num;
    currentPage.value=num;
    search();
  };

const clearSearch = () => {
    conditions.value.historyTime='';
    conditions.value.userName='';
    conditions.value.historyType='';
    conditions.value.page='1';
    conditions.value.historyType='';
    search();
  };


</script>

<style scoped>
:deep(.el-date-table th) {
    padding-left: 13px;
    color: var(--el-datepicker-header-text-color);
    font-weight: 400;
    border-bottom: solid 1px var(--el-border-color-lighter);
}
.cell {
  height: 30px;
  width: 30px;
  padding: 3px 0;
  margin: 0 auto;
  box-sizing: border-box;
}
.cell .text1 {
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}
.back-and-date{
    display: flex;
    flex-direction: row;
    width: 250px;
    @media only screen and (max-width: 1110px) {
        margin: 0 auto;
        width: 250px ;
    }
}
.clear{
    height: 30px;
}
.page-container{
    display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.page {
    padding-top: 40px;
    height: 30px;
    display: flex;
    align-items: center;

    /* 垂直居中 */
    @media only screen and (max-width: 1110px) {}
}
.time-location-img {
    width: 20px;
    height: 20px;

    @media only screen and (max-width: 1110px) {
        margin-left: 5px;
        width: 30px;
        height: 30px;
        border-radius: 21px;
    }
}

.page-num {
    font-size: 18px;
    padding-left: 15px;
    color: #848484;
}



.result-Page {
    padding-top: 10px;
    padding-left: 15px;
    background-color: #fbfcff;
    position: relative;
    width: 80%;
    padding-bottom: 40px;
    margin: 0 auto;
    outline: 1px solid rgb(206, 206, 206);
    border-radius: 20px;

    @media only screen and (max-width: 1110px) {
        width: 380px;
    }
}

.search-byname-right {
    display: flex;
    align-items: center;
    /* 垂直居中 */
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    font-size: 15px;
    color: white;
    width: 65px;
    height: 30px;
    margin-left: 20px;
    padding-left: 18px;
    background-color: #4dfac9;
}

.search-byname-font {
    color: rgb(165, 160, 160);
    margin-left: 10px;
    width: 320px;
    border: none !important;
    overflow: hidden;
    height: 30px;
    display: flex;
    align-items: center;
    border: 0px;
    outline: none;
}
.search-search-byname {
    display: flex;
    align-items: center;
    /* 垂直居中 */
    width: 385px;
    font-size: 15px;
    color: rgb(98, 97, 97);
    background-color: #ffffff;
    height: 30px;
    padding-left: 5px;
    border-radius: 100px;
    outline: 1px solid rgb(231, 231, 231);
    margin-bottom: 20px;
}

.search-calender-search-img {

    display: flex;
    align-items: center;
    /* 垂直居中 */
    outline: 1px solid rgb(226, 226, 226);
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 100px;

    border-bottom-right-radius: 100px;
    width: 50px;
    height: 30px;
    padding-left: 5px;
    background-color: white;
}

.search-calender-img {
    width: 22px;
    height: 22px;
}

.search-calender-font {
    margin-left: 38px;
    width: 150px;
}

.search {
    width: 690px;
    margin: 0 auto;
    display: flex;

    /* 垂直居中 */
    @media only screen and (max-width: 1110px) {
        flex-direction: column;
        width: 390px;
    }
}

.date-select {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    /* 垂直居中 */
    width: 225px;
    font-size: 11px;
    font-weight: 500;
    color: rgb(98, 97, 97);
    height: 30px;
    padding-left: 20px;
    border-radius: 100px;
}

.divider {
    width: 300px;
    margin: 0 auto;
    position: relative;
}

.gif {
    width: 240px;
    margin: 0 auto;
}

.text {
    position: relative;
    z-index: 1;
    display: block;
    width: 80px;
    margin: 0 auto;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #495bb5;
}

.left-line {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 2px;
    width: 30%;
    background-color: #97a1d4;
    z-index: 0;
}

.right-line {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    height: 2px;
    width: 30%;
    background-color: #97a1d4;
    z-index: 0;
}

</style>