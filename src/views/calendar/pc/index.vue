<template>
  <div class="pc" @scroll.prevent>
    <img class="pc-back" @click="router.go(-1)"
      src="../../../assets/img/personalPage/accountMessage/login_out/back.png" />
    <!-- 宜忌弹窗 -->
    <div class="pc-dialog" v-if="isDialog">
      <img :src="publicUrl + 'static/pc/dialog.png'" alt="" />
      <div class="pc-dialog-content">
        <div class="pc-dialog-content-date">
          <img :src="publicUrl + 'static/pc/taitou.png'" alt="" />
          <span class="taitou-month">{{ currentDate.month }}月</span>
          <span class="taitou-year">{{ currentDate.year }}</span>
          <span class="taitou-xingqiDate">{{ currentDate.xingQiDate }}</span>
        </div>
        <div class="pc-dialog-content-yiji">
          <div class="yijiTitle">
            <div class="yiContent">
              <img :src="publicUrl + 'static/pc/yi.png'" alt="" />
              <ul>
                <li v-for="(item, index) in this.getNewList(currentDate.suitable)" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="jieriContent">
              <img :src="publicUrl + 'static/pc/dihua.png'" alt="" />
              <span class="jieriContent-date">{{ currentDate.day }}</span>
              <span class="jieriContent-jieri">{{
                currentDate.showJieQi
              }}</span>
            </div>
            <div class="jiContent">
              <img :src="publicUrl + 'static/pc/ji.png'" alt="" />
              <ul>
                <li v-for="(item, index) in this.getNewList(currentDate.fear)" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="pc-dialog-content-yinli">
          <img :src="publicUrl + 'static/pc/fenge.png'" alt="" />
          <span class="pc-dialog-content-yinli-title">{{
            currentDate.yinLiNianYueRi
          }}</span>
        </div>
        <div class="pc-dialog-content-diarylist">
          <img :src="publicUrl + 'static/pc/diary.png'" alt="" />
          <div class="diarylist-message">
            <ul>
              <li v-for="(item, index) in messageList" :key="index">
                <img @click="isEditDel = !isEditDel" :src="publicUrl + 'static/pc/message.png'" alt=""
                  class="diarylist-message-bg" />
                <div class="diarylist-messag-text">
                  <span>{{ item.message }}</span>
                  <img v-if="isEditDel" title="编辑" :src="publicUrl + 'static/pc/edit.png'" alt="" class="edit"
                    @click="editComment(item)" />
                  <img v-if="isEditDel" title="删除" :src="publicUrl + 'static/pc/delete.png'" alt="" class="delete"
                    @click="delComment(item)" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="pc-dialog-content-add">
          <img @click="inputScheduleDialog()" :src="publicUrl + 'static/pc/add.png'" alt="" />
        </div>
        <img @click="scheduleDialog()" :src="publicUrl + 'static/pc/close.png'" alt="" class="pc-dialog-content-close" />
      </div>
    </div>
    <!-- 输入弹窗 -->
    <div class="pc-richeng" v-if="isInput">
      <img :src="publicUrl + 'static/pc/input.png'" alt="" />
      <div class="pc-richeng-content">
        <div class="pc-richeng-content-input">
          <textarea placeholder="输入您的日程" cols="30" rows="10" v-model="textarea">{{ textarea }}</textarea>
          <img @click="closeInput" class="windowclose" :src="publicUrl + 'static/pc/windowclose.png'" alt="" />
        </div>
        <img @click="confirm" class="pc-richeng-confirm" :src="publicUrl + 'static/pc/confirm.png'" alt="" />
      </div>
    </div>
    <div class="topbg">
    </div>
    <div class="rightbg">
    </div>
    <!-- <img class="pc-img" :src="publicUrl + 'static/pc/bg.png'" /> -->
    <!-- 左边框的日历 -->
    <div class="pc-diary">
      <div class="pc-diary-shengxiao">
        <span>{{ shengxiao }}</span>
      </div>
      <span class="pc-diary-bg" />
      <div class="pc-diary-tabs">
        <div class="pc-diary-tabs-check" @click="isYin = !isYin">
          <img class="pc-diary-tabs-check-bg" :src="publicUrl + 'static/pc/yin-yang.png'" />
          <div class="pc-diary-tabs-check-yin">
            <img :src="publicUrl + 'static/pc/yin.png'" :style="{ opacity: isYin ? 0 : 1 }" />
            <span>阴</span>
          </div>
          <div class="pc-diary-tabs-check-yang">
            <img :src="publicUrl + 'static/pc/yang.png'" :style="{ opacity: isYin ? 1 : 0 }" />
            <span>阳</span>
          </div>
        </div>
        <div class="pc-diary-tabs-title">
          <ul>
            <li v-for="(item, index) in lunarYear" :key="index">
              {{ item }}
            </li>
          </ul>
          <span>{{ shengxiao }}</span>
        </div>
      </div>
      <div class="pc-diary-dateSelect">
        <!-- 年月框 -->
        <div class="pc-diary-dateSelect-date">
          <div @click="isYear = !isYear" class="pc-diary-dateSelect-date-year">
            <img :src="publicUrl + 'static/pc/sanjiao.png'" alt="" />
            <span class="pc-diary-dateSelect-date-year-num">{{ year }}</span>
            <span class="pc-diary-dateSelect-date-year-name">年</span>
            <div class="pc-diary-dateSelect-date-year-select" v-if="isYear">
              <img class="year-select" :src="publicUrl + 'static/pc/year-select.png'" alt="" />
              <div class="pc-diary-yearSelect">
                <ul class="pc-diary-yearSelect-ul">
                  <li v-for="(item, index) in yearList" @click="getYearMonthInfo(item, 'year')" :key="index"
                    :class="{ yearActive: item == year }">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div @click="isMonth = !isMonth" class="pc-diary-dateSelect-date-month">
            <span class="pc-diary-dateSelect-date-month-num">{{ month }}</span>
            <span class="pc-diary-dateSelect-date-month-name">月</span>
            <img :src="publicUrl + 'static/pc/sanjiao.png'" alt="" />
            <div class="pc-diary-dateSelect-date-month-select" v-if="isMonth">

              <div class="pc-diary-monthSelect">
                <ul class="pc-diary-monthSelect-ul">
                  <li v-for="(item, index) in monthList" @click="getYearMonthInfo(item, 'month')" :key="index"
                    :class="{ ulactive: item == month }">
                    {{ item }}月
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- 星期几框 -->

        <div class="pc-diary-dateSelect-week">
          <ul>
            <li v-for="(item, index) in weekDate" :key="index">
              <div :class="item.isWork ? 'work' : 'nowork'">{{ item.name }}</div>
            </li>
          </ul>
        </div>
        <!-- 日列表框 -->

        <div class="pc-diary-dateSelect-list">
          <ul>
            <li v-for="(item, index) in monthDate" :key="index">
              <!-- <img
                v-if="item.day"
                class="imgUrl"
                :src="
                  item.weekend?
                  item.daily? `${publicUrl}static/pc/red.png`: `${publicUrl}static/pc/yellow.png`
                  : `${publicUrl}static/pc/blue.png`
                "
                alt=""
              /> -->
              <img v-if="item.day" class="imgUrl" :src="item.holiday || item.jieQi ? `${publicUrl}static/pc/red.png`
                : item.weekend ? `${publicUrl}static/pc/yellow.png` : `${publicUrl}static/pc/blue.png`


                " alt="" />
              <img v-if="item.day == date && date" class="currentImg" :src="publicUrl + 'static/pc/selected.png'"
                alt="" />
              <img v-if="item.daily" :src="publicUrl + 'static/pc/gantan.png'" alt="" class="recordImg" />
              <div @mousemove="date = item.day" @mouseleave="date = null" @mousedown="getCurrentDate(item)" :style="item.jieQi || item.holiday
                ? { fontSize: '2vh', whiteSpace: 'nowrap' }
                : ''
                " class="dataTitle">
                <span style="
                    fontSize: '2.0vh' 
                  " v-if="!isYin">{{
                    item.jieQi
                    ? item.jieQi
                    : item.holiday
                      ? item.holiday
                      : item.yinLi
                  }}</span>
                <span v-else>{{
                  item.jieQi
                  ? item.jieQi
                  : item.holiday
                    ? item.holiday
                    : item.day
                }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="pc-content">
      <div class="pc-content-search">
        <div class="pc-content-search-top">
          <DatePicker
              v-model:value="birthDay"
              class="elInput"
              format="YYYY-MM-DD HH:mm"
              value-format="YYYY-MM-DD HH:mm"
              :locale="locale"
              @change="isHour = true"
              show-time

          />
<!--          <img :src="publicUrl + 'static/pc/search-input.png'" alt="" />-->
          <img @click="getSearchData" :src="publicUrl + 'static/pc/search-btn.png'" alt="" />
<!--          <input :type="searchInputType" placeholder="输入阳历生日：年/月/日" v-model="birthDay" @focus ="searchInputType = 'text'" @mouseenter="searchInputType = 'date'" @change="isHour = true" class="pc-content-search-top-input" />-->
<!--           <el-date-picker v-model="elDate" type="datetime" placeholder="输入：年/月/日" format="YYYY-MM-DD" value-format="YYYY-MM-DD HH"/>-->


<!--          <span class="pc-content-search-top-input-hour"> {{ hour }} </span>-->
<!--          <span v-show="isHour" class="pc-content-search-top-hour">-->
<!--            <div style="text-align: center;">请选择时辰：</div>-->

<!--            <ul>-->
<!--              <li v-for="(item, index) in hourList" :key="index" @click="chooseHour(item)">-->
<!--                {{ item }}-->
<!--              </li>-->
<!--            </ul>-->
<!--          </span>-->
        </div>
        <div class="pc-content-search-message">
          <span>{{ jieQi }}</span>
          <ul>
            <li v-for="(item, index) in baziList" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>
      <div class="pc-content-jieri">
        <img :src="nametext" alt="" class="pc-content-jieri-person" />
        <div class="pc-content-jieri-title">
          <span v-for="(item, index) in jieQiList" :key="index">{{
            item
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getBazi,
  addSchedule,
  updSchedule,
  getBaZinianyueri,
  delSingleSchedule,
  getQueryallSchedule,
  getScheduleBynianyueInfo,
  getAnimalandJieQiByYearMonth
} from "../../../axios/calendar";
import "../../../assets/font/calendarfont/font.css";
// import "lib-flexible/flexible";
import common from "../../../utils/global.js";
import { useRouter } from 'vue-router'
import {getHomeConfiguration} from "../../../axios/api.js";
import {ref} from "vue";
import localStorageObject from "../../../store/localStorageObject.js";
import {
DatePicker,
} from "ant-design-vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";




export default {
  setup() {
    const router = useRouter()
    return { router,locale }
  },
  components: { DatePicker },
  data() {
    return {
      elDate: "",
      params: {},
      shengxiao: "",
      lunarYear: [],
      jieQi: "",
      jieQiList: [],
      baziList: [],
      yiList: [],
      jiList: [],
      textarea: "",
      isYin: false,
      isYear: false,
      isMonth: false,
      isDialog: false,
      isInput: false,
      isHour: false,
      currentDate: null,
      isEditDel: false,
      birthDay:  "",
      hour: "",
      birthDayWithHour: "",
      isEdit: false, //编辑还是删除
      allJieQiAndCurrentAnimal: [],
      currentSchedule: {},
      year: "",
      month: "",
      date: "",
      hours: "",
      time: "",
      phone: localStorageObject.getPhone(),
      isDateTime: true,
      weekDate: [],
      yearList: [],
      monthList: [],
      hourList: [],
      monthDate: [],
      messageList: [],
      resJson: [],
      publicUrl: "https://supercalender.oss-cn-beijing.aliyuncs.com/",
      searchInputType: "text",//搜索框类型切换
      setElDatePickClass: 'pc-content-search-top-input',
      nametext : '',
      currentDateSolarTerms: new Date(),
      currentYear: new Date().getFullYear(),
      solarTerms:  [],
      currentSolarTerm: 6,
    };
  },
  methods: {
    getSolarTermsForYear(year) {
      return [
        { name: 28, date: new Date(`${year}-01-05`) },//小寒
        { name: 29, date: new Date(`${year}-01-20`) },//大寒
        { name: 6, date: new Date(`${year}-02-04`) },//立春
        { name: 7, date: new Date(`${year}-02-19`) },//雨水
        { name: 8, date: new Date(`${year}-03-05`) },//惊蛰
        { name: 9, date: new Date(`${year}-03-20`) },//春分
        { name: 10, date: new Date(`${year}-04-04`) },//清明
        { name: 11, date: new Date(`${year}-04-19`) },//谷雨
        { name: 12, date: new Date(`${year}-05-05`) },//立夏
        { name: 13, date: new Date(`${year}-05-20`) },//小满
        { name: 14, date: new Date(`${year}-06-05`) },//芒种
        { name: 15, date: new Date(`${year}-06-21`) },//夏至
        { name: 16, date: new Date(`${year}-07-07`) },//小暑
        { name: 17, date: new Date(`${year}-07-22`) },//大暑
        { name: 18, date: new Date(`${year}-08-07`) },//立秋
        { name: 19, date: new Date(`${year}-08-23`) },//处暑
        { name: 20, date: new Date(`${year}-09-07`) },//白露
        { name: 21, date: new Date(`${year}-09-23`) },//秋分
        { name: 22, date: new Date(`${year}-10-08`) },//寒露
        { name: 23, date: new Date(`${year}-10-23`) },//霜降
        { name: 24, date: new Date(`${year}-11-07`) },//立冬
        { name: 25, date: new Date(`${year}-11-22`) },//小雪
        { name: 26, date: new Date(`${year}-12-07`) },//大雪
        { name: 27, date: new Date(`${year}-12-21`) }//冬至

      ];
    },
    setCurrentSolarTerm() {
      for (let i = 0; i < this.solarTerms.length - 1; i++) {
        const startDate = this.solarTerms[i].date;
        const endDate = this.solarTerms[i + 1].date;
        if (this.currentDateSolarTerms >= startDate && this.currentDateSolarTerms < endDate) {
          this.currentSolarTerm = this.solarTerms[i].name;
          break;
        }
        // 处理最后一个节气的情况
        if (i === this.solarTerms.length - 2 && this.currentDate >= endDate) {
          this.currentSolarTerm = this.solarTerms[i + 1].name;
        }
      }

      getHomeConfiguration(this.currentSolarTerm).then((res)=> {
        if (res.data.code == '0') {
          this.nametext =   res.data.data.url;
        }
      })

    },
    // 获取当前时间
    getScheduleTime() {
      const { year, month, day } = this.currentDate;
      return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day
        }`;
    },
    getNewList(arr) {
      const newArr = arr.filter(item => item.length === 2);
      return newArr.slice(0, 6);
    },
    // 确认提交
    confirm() {
      if (this.textarea.length > 0) {
        if (this.isEdit) {
          this.updateSchedule();
        } else {
          this.addScheduleInfo();
        }
      }
    },
    // 适配函数
    Adaptation() {
      const baseSize = 16;
      function setRem() {
        const scale = document.documentElement.clientWidth / 1920;
        document.documentElement.style.fontSize =
          baseSize * Math.min(scale, 2) + "px";
      }
      setRem();
      window.onresize = function () {
        setRem();
      };
    },
    getData() {
      const date = new Date();
      this.year = date.getFullYear();
      const month = date.getMonth() + 1;
      const today = date.getDate();
      this.month = month < 10 ? "0" + month : month;
      this.date = today < 10 ? "0" + today : today;
      this.hours = date.getHours();
      this.weekDate = [
        { name: "日", isWork: false },
        { name: "一", isWork: true },
        { name: "二", isWork: true },
        { name: "三", isWork: true },
        { name: "四", isWork: true },
        { name: "五", isWork: true },
        { name: "六", isWork: false }
      ];
      this.currentDate = {
        year: this.year,
        month: this.month,
        day: this.date
      };
      this.getAnimalandJieQiByYearMonth();
      this.getBaZiBynianyueri();
      this.getBaziInfo();
      this.getScheduleByYearMonthInfo();
    },
    // 选择年份/月份
    getYearMonthInfo(item, type) {
      this.year = type == "year" ? item : this.year;
      this.month =
        type == "month" ? (item < 10 ? "0" + item : item) : this.month;
      this.currentDate = {
        year: this.year,
        month: this.month,
        day: this.date
      };
      this.getScheduleByYearMonthInfo();

    },
    // 根据年月获取年月日八字
    getBaZiBynianyueri(date) {
      const params = {
        nian: date ? date[0] : this.year,
        yue: date ? date[1] : this.month,
        ri: date ? date[2] : this.date,
        shi: date ? date[3] : this.hours == 0 ? 1 : this.hours
      };
      getBaZinianyueri(params).then(res => {
        if (res.data.code == "0") {
          const { baZiNian, baZiRi, baZiYue } = res.data.data;
          this.lunarYear = [baZiNian, baZiYue, baZiRi];
        }
      });
    },
    // 通过年月获取信息
    getScheduleByYearMonthInfo() {
      const params = {
        scheduleTime: `${this.year}-${this.month}-${this.date}`,
        phone: this.phone
      };
      getScheduleBynianyueInfo(params).then(res => {
        if (res.data.code == "0") {
          const { allDate } = res.data.data;
          this.monthDate = common.getMonthDate(allDate).map(item => {
            if (item.holiday && item.holiday.length > 3) {
              item.holiday = item.holiday.substr(0, 3);
            }
            return item;
          });
        }
      });
    },
    // 获取当天所有日程
    getQueryAllScheduleInfo() {
      const params = {
        scheduleTime: this.getScheduleTime(),
        phone: this.phone
      };
      getQueryallSchedule(params).then(res => {
        if (res.data.code == "0") {
          this.messageList = res.data.data;
        }
      });
    },
    // 关闭日程弹窗
    scheduleDialog() {
      this.messageList = [];
      this.isDialog = !this.isDialog;
      this.isEdit = false;
    },
    // 点击获取当前数据
    getCurrentDate(item) {
      const message = this.allJieQiAndCurrentAnimal.find(
        it => it.day === item.day
      );
      this.currentDate = item;
      this.currentDate.showJieQi = message.jieQi;
      this.year = item.year;
      this.month = item.month < 10 ? "0" + item.month : item.month;
      this.date = item.day < 10 ? "0" + item.day : item.day;
      this.isDialog = true;
      // 获取当天所有日程
      this.getQueryAllScheduleInfo();
    },
    // 通过年月获取生肖和当日节气
    getAnimalandJieQiByYearMonth(date) {
      const params = {
        scheduleTime: date
          ? `${date[0]}-${date[1]}-${date[2]}`
          : `${this.year}-${this.month}-${this.date}`
      };
      getAnimalandJieQiByYearMonth(params).then(res => {
        if (res.data.code == "0") {
          this.allJieQiAndCurrentAnimal =
            res.data.data.allJieQiAndCurrentAnimal;
          const item = this.allJieQiAndCurrentAnimal.find(
            item => item.day == this.currentDate.day
          );
          this.jieQi = item.jieQi;
          this.jieQiList = item.jieQi.split("");
          this.shengxiao = item.animal;
        }
      });
    },
    // 查询八字
    getBaziInfo(date) {
      const params = {
        nian: date ? date[0] : this.year,
        yue: date ? date[1] : this.month,
        ri: date ? date[2] : this.date,
        shi: date ? date[3] : this.hours == 0 ? 1 : this.hours
      };
      getBazi(params).then(res => {
        if (res.data.code == "0") {
          const { nianZhu, yueZhu, riZhu, shiZhu } = res.data.data;
          this.baziList = [shiZhu, riZhu, yueZhu, nianZhu];
        }
      });
    },
    // 添加日程
    addScheduleInfo() {
      const params = {
        phone: this.phone,
        scheduleTime: this.getScheduleTime(),
        message: this.textarea
      };
      addSchedule(params).then(res => {
        if (res.data.code == "0") {
          this.textarea = "";
          this.isInput = false;
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          // 重新获取数据
          this.getQueryAllScheduleInfo();
          this.getScheduleByYearMonthInfo();
        } else {
          this.$message.error("添加失败!");
        }
      });
    },
    // 查询功能
    getSearchData() {
      if (this.birthDay === null || this.birthDay === "") {
        this.$message.error("请输入您的生日信息！");

        return;
      } else {
        // if (this.birthDayWithHour.length == 13) {
        //   const r = new RegExp(/^\d{4}\-\d{2}\-\d{2}\-\d{2}$/);
        //   if (r.test(this.birthDayWithHour)) {
        //     const date = this.birthDayWithHour.split("-");
          let arr1 = this.birthDay.split(" ");
          let arr2 = arr1[0].split("-");
          let arr3 = arr1[1].split(":");
          const date = [];
          date.push(arr2[0])
          date.push(arr2[1])
          date.push(arr2[2])
          date.push(arr3[0])
          this.getBaziInfo(date);
          // } else {
          //   this.$message.error("请输入正确的日期!");
          // }
        // } else {
        //   this.$message.error("请输入您的生日信息！");
        // }
      }
    },
    // 删除当前日程
    delComment(item) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delSingleSchedule({
            scheduleTime: this.getScheduleTime(),
            scheduleId: item.scheduleId
          }).then(res => {
            if (res.data.code == "0") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getQueryAllScheduleInfo();
              this.getScheduleByYearMonthInfo();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑当前日程
    editComment(item) {
      this.isEdit = true;
      this.textarea = item.message;
      this.isInput = true;
      this.currentSchedule = item;
    },
    // 更新日程
    updateSchedule() {
      const params = {
        message: this.textarea,
        scheduleTime: this.getScheduleTime(),
        scheduleId: this.currentSchedule.scheduleId
      };
      updSchedule(params).then(res => {
        this.isInput = false;
        this.textarea = "";
        if (res.data.code == "0") {
          this.$message({
            type: "success",
            message: "更新成功!"
          });
          this.getQueryAllScheduleInfo();
          this.getScheduleByYearMonthInfo();
        }
      });
    },
    // 关闭弹窗
    closeWindow() {
      this.isInput = !this.isInput;
      this.message = "";
      this.messageList = [];
    },
    // 关闭输入日程弹窗
    closeInput() {
      this.isInput = !this.isInput;
      this.textarea = "";
    },
    // 输入日程弹窗
    inputScheduleDialog() {
      this.isInput = true;
      this.isEdit = false;
      this.classList.toggle('rotate')
    },
    //选择时辰
    chooseHour(index) {
      this.hour = index + "时";
      if (index < 10) {
        this.birthDayWithHour = this.birthDay + '-0' + index;
      } else {
        this.birthDayWithHour = this.birthDay + '-' + index;

      }
      this.isHour = false;
    }
  },
  // 计算属性
  computed: {},
  created() {
    // 组件创建时，获取当前年份的节气日期
    this.solarTerms = this.getSolarTermsForYear(this.currentYear);
    // 并设置当前节气
    this.setCurrentSolarTerm();
    this.birthDay = ref(dayjs().format('YYYY-MM-DD HH:mm')); // 在组件创建后设置初始值
    const resJson = {
      code: 0,
      msg: "成功",
      data: {
        allDate: [
          {
            day: 1,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: "建党节",
            yinLi: "十四",
            xingQiDate: "星期六",
            suitable: [
              "嫁娶",
              "开光",
              "祭祀",
              "祈福",
              "出行",
              "解除",
              "移徙",
              "入宅",
              "开市",
              "纳财",
              "起基",
              "修造",
              "竖柱",
              "上梁",
              "盖屋",
              "作灶",
              "出火",
              "安香",
              "补垣",
              "塞穴",
              "拆卸",
              "放水",
              "扫舍",
              "造仓",
              "造船",
              "栽种",
              "安葬"
            ],
            fear: [
              "纳采",
              "订盟",
              "安床",
              "谢土",
              "破土",
              "动土"
            ],
            yinLiNianYueRi: "二〇二三年五月十四日",
            daily: false,
            weekend: true
          },
          {
            day: 2,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "十五",
            xingQiDate: "星期日",
            suitable: [
              "嫁娶",
              "祭祀",
              "理发",
              "作灶",
              "修饰垣墙",
              "平治道涂",
              "整手足甲",
              "沐浴",
              "冠笄"
            ],
            fear: [
              "破土",
              "出行",
              "栽种"
            ],
            yinLiNianYueRi: "二〇二三年五月十五日",
            daily: false,
            weekend: true
          },
          {
            day: 3,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "十六",
            xingQiDate: "星期一",
            suitable: [
              "嫁娶",
              "纳采",
              "订盟",
              "祭祀",
              "祈福",
              "求嗣",
              "开光",
              "出火",
              "出行",
              "拆卸",
              "修造",
              "动土",
              "进人口",
              "入宅",
              "移徙",
              "安床",
              "交易",
              "立券",
              "挂匾",
              "纳财",
              "入殓",
              "安葬",
              "启钻",
              "除服",
              "成服"
            ],
            fear: [
              "掘井",
              "破土"
            ],
            yinLiNianYueRi: "二〇二三年五月十六日",
            daily: false,
            weekend: false
          },
          {
            day: 4,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "十七",
            xingQiDate: "星期二",
            suitable: [
              "畋猎",
              "捕捉",
              "结网",
              "取渔",
              "祭祀",
              "沐浴",
              "馀事勿取"
            ],
            fear: [
              "嫁娶",
              "开市",
              "安葬",
              "启钻",
              "行丧"
            ],
            yinLiNianYueRi: "二〇二三年五月十七日",
            daily: false,
            weekend: false
          },
          {
            day: 5,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "十八",
            xingQiDate: "星期三",
            suitable: [
              "祭祀",
              "破屋",
              "坏垣",
              "馀事勿取"
            ],
            fear: [
              "移徙",
              "入宅",
              "开仓",
              "出货财"
            ],
            yinLiNianYueRi: "二〇二三年五月十八日",
            daily: false,
            weekend: false
          },
          {
            day: 6,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "十九",
            xingQiDate: "星期四",
            suitable: [
              "祭祀",
              "斋醮",
              "塑绘",
              "开光",
              "出行",
              "修造",
              "动土",
              "造畜稠",
              "安床",
              "放水",
              "掘井",
              "开池",
              "开厕",
              "结网",
              "破土"
            ],
            fear: [
              "出火",
              "入宅"
            ],
            yinLiNianYueRi: "二〇二三年五月十九日",
            daily: false,
            weekend: false
          },
          {
            day: 7,
            year: 2023,
            month: 7,
            jieQi: "小暑",
            holiday: null,
            yinLi: "二十",
            xingQiDate: "星期五",
            suitable: [
              "嫁娶",
              "纳采",
              "开市",
              "出行",
              "动土",
              "上梁",
              "移徙",
              "入宅",
              "破土",
              "安葬"
            ],
            fear: [
              "祭祀",
              "祈福"
            ],
            yinLiNianYueRi: "二〇二三年五月二十日",
            daily: false,
            weekend: false
          },
          {
            day: 8,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "廿一",
            xingQiDate: "星期六",
            suitable: [
              "嫁娶",
              "纳采",
              "开市",
              "出行",
              "动土",
              "上梁",
              "移徙",
              "入宅",
              "破土",
              "安葬"
            ],
            fear: [
              "赴任"
            ],
            yinLiNianYueRi: "二〇二三年五月廿一日",
            daily: false,
            weekend: true
          },
          {
            day: 9,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "廿二",
            xingQiDate: "星期日",
            suitable: [
              "祭祀",
              "作灶",
              "纳财",
              "捕捉"
            ],
            fear: [
              "开市",
              "破土"
            ],
            yinLiNianYueRi: "二〇二三年五月廿二日",
            daily: false,
            weekend: true
          },
          {
            day: 10,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "廿三",
            xingQiDate: "星期一",
            suitable: [
              "嫁娶",
              "开市",
              "立券",
              "祭祀",
              "祈福",
              "动土",
              "移徙",
              "入宅"
            ],
            fear: [
              "造庙",
              "安葬"
            ],
            yinLiNianYueRi: "二〇二三年五月廿三日",
            daily: false,
            weekend: false
          },
          {
            day: 11,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "廿四",
            xingQiDate: "星期二",
            suitable: [
              "补垣",
              "塞穴",
              "结网",
              "入殓",
              "除服",
              "成服",
              "移柩",
              "安葬",
              "启钻",
              "馀事勿取"
            ],
            fear: [
              "诸事不宜"
            ],
            yinLiNianYueRi: "二〇二三年五月廿四日",
            daily: false,
            weekend: false
          },
          {
            day: 12,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "廿五",
            xingQiDate: "星期三",
            suitable: [
              "嫁娶",
              "纳采",
              "出行",
              "祭祀",
              "祈福",
              "解除",
              "移徙",
              "入宅"
            ],
            fear: [
              "动土",
              "安葬"
            ],
            yinLiNianYueRi: "二〇二三年五月廿五日",
            daily: false,
            weekend: false
          },
          {
            day: 13,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "廿六",
            xingQiDate: "星期四",
            suitable: [
              "嫁娶",
              "祭祀",
              "祈福",
              "斋醮",
              "治病",
              "破土",
              "安葬"
            ],
            fear: [
              "开市",
              "入宅"
            ],
            yinLiNianYueRi: "二〇二三年五月廿六日",
            daily: false,
            weekend: false
          },
          {
            day: 14,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "廿七",
            xingQiDate: "星期五",
            suitable: [
              "嫁娶",
              "出行",
              "开市",
              "安床",
              "入殓",
              "启钻",
              "安葬"
            ],
            fear: [
              "祈福",
              "动土",
              "破土"
            ],
            yinLiNianYueRi: "二〇二三年五月廿七日",
            daily: false,
            weekend: false
          },
          {
            day: 15,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "廿八",
            xingQiDate: "星期六",
            suitable: [
              "嫁娶",
              "祭祀",
              "裁衣",
              "结网",
              "冠笄",
              "沐浴"
            ],
            fear: [
              "开仓",
              "出货财",
              "置产",
              "安葬",
              "动土",
              "破土",
              "掘井",
              "栽种"
            ],
            yinLiNianYueRi: "二〇二三年五月廿八日",
            daily: false,
            weekend: true
          },
          {
            day: 16,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "廿九",
            xingQiDate: "星期日",
            suitable: [
              "入宅",
              "移徙",
              "安床",
              "开光",
              "祈福",
              "求嗣",
              "进人口",
              "开市",
              "交易",
              "立券",
              "出火",
              "拆卸",
              "修造",
              "动土"
            ],
            fear: [
              "嫁娶",
              "破土",
              "置产",
              "栽种",
              "安葬",
              "修坟",
              "行丧"
            ],
            yinLiNianYueRi: "二〇二三年五月廿九日",
            daily: false,
            weekend: true
          },
          {
            day: 17,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "三十",
            xingQiDate: "星期一",
            suitable: [
              "祭祀",
              "解除",
              "沐浴",
              "整手足甲",
              "入殓",
              "移柩",
              "破土",
              "启钻",
              "安葬"
            ],
            fear: [
              "嫁娶",
              "入宅",
              "移徙",
              "作灶",
              "开市",
              "交易",
              "安门",
              "栽种"
            ],
            yinLiNianYueRi: "二〇二三年五月三十日",
            daily: false,
            weekend: false
          },
          {
            day: 18,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "初一",
            xingQiDate: "星期二",
            suitable: [
              "破屋",
              "坏垣",
              "馀事勿取"
            ],
            fear: [
              "诸事不宜"
            ],
            yinLiNianYueRi: "二〇二三年六月初一日",
            daily: false,
            weekend: false
          },
          {
            day: 19,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "初二",
            xingQiDate: "星期三",
            suitable: [
              "嫁娶",
              "开光",
              "出行",
              "理发",
              "作梁",
              "出火",
              "拆卸",
              "修造",
              "开市",
              "交易",
              "立券",
              "挂匾",
              "动土",
              "入宅",
              "移徙",
              "安床",
              "栽种"
            ],
            fear: [
              "伐木",
              "祭祀",
              "纳畜",
              "祭祀"
            ],
            yinLiNianYueRi: "二〇二三年六月初二日",
            daily: false,
            weekend: false
          },
          {
            day: 20,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "初三",
            xingQiDate: "星期四",
            suitable: [
              "嫁娶",
              "开光",
              "出行",
              "祈福",
              "求嗣",
              "解除",
              "拆卸",
              "动土",
              "修造",
              "进人口",
              "开市",
              "交易",
              "立券",
              "挂匾",
              "入宅",
              "移徙",
              "安床",
              "栽种",
              "纳畜",
              "入殓",
              "移柩",
              "安葬"
            ],
            fear: [
              "无"
            ],
            yinLiNianYueRi: "二〇二三年六月初三日",
            daily: false,
            weekend: false
          },
          {
            day: 21,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "初四",
            xingQiDate: "星期五",
            suitable: [
              "祭祀",
              "作灶",
              "纳财",
              "栽种",
              "纳畜",
              "进人口"
            ],
            fear: [
              "安葬",
              "经络",
              "修坟",
              "破土",
              "开市",
              "安床",
              "启钻",
              "立碑"
            ],
            yinLiNianYueRi: "二〇二三年六月初四日",
            daily: false,
            weekend: false
          },
          {
            day: 22,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "初五",
            xingQiDate: "星期六",
            suitable: [
              "祭祀",
              "祈福",
              "求嗣",
              "开光",
              "开市",
              "牧养",
              "理发"
            ],
            fear: [
              "嫁娶",
              "出行",
              "安葬",
              "入殓",
              "入宅",
              "作灶",
              "冠笄",
              "上梁"
            ],
            yinLiNianYueRi: "二〇二三年六月初五日",
            daily: false,
            weekend: true
          },
          {
            day: 23,
            year: 2023,
            month: 7,
            jieQi: "大暑",
            holiday: null,
            yinLi: "初六",
            xingQiDate: "星期日",
            suitable: [
              "祭祀",
              "入殓",
              "破土",
              "除服",
              "成服",
              "移柩",
              "启钻",
              "安葬",
              "谢土",
              "馀事勿取"
            ],
            fear: [
              "无"
            ],
            yinLiNianYueRi: "二〇二三年六月初六日",
            daily: false,
            weekend: true
          },
          {
            day: 24,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "初七",
            xingQiDate: "星期一",
            suitable: [
              "祭祀",
              "出行",
              "交易",
              "割蜜",
              "造畜稠"
            ],
            fear: [
              "嫁娶",
              "作灶",
              "安葬",
              "动土",
              "词讼",
              "作梁",
              "伐木",
              "掘井",
              "破土",
              "移徙"
            ],
            yinLiNianYueRi: "二〇二三年六月初七日",
            daily: false,
            weekend: false
          },
          {
            day: 25,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "初八",
            xingQiDate: "星期二",
            suitable: [
              "嫁娶",
              "祭祀",
              "祈福",
              "求嗣",
              "开光",
              "出火",
              "拆卸",
              "修造",
              "动土",
              "进人口",
              "开市",
              "交易",
              "立券",
              "挂匾",
              "入宅",
              "移徙",
              "栽种",
              "纳畜",
              "入殓",
              "启钻",
              "除服",
              "成服"
            ],
            fear: [
              "无"
            ],
            yinLiNianYueRi: "二〇二三年六月初八日",
            daily: false,
            weekend: false
          },
          {
            day: 26,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "初九",
            xingQiDate: "星期三",
            suitable: [
              "嫁娶",
              "开光",
              "解除",
              "安床",
              "牧养",
              "理发",
              "开市",
              "入殓",
              "启钻",
              "移柩",
              "安葬",
              "扫舍"
            ],
            fear: [
              "作灶",
              "动土",
              "上梁",
              "栽种",
              "入宅",
              "移徙",
              "修造",
              "祈福"
            ],
            yinLiNianYueRi: "二〇二三年六月初九日",
            daily: false,
            weekend: false
          },
          {
            day: 27,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "初十",
            xingQiDate: "星期四",
            suitable: [
              "祭祀",
              "解除",
              "馀事勿取"
            ],
            fear: [
              "诸事不宜"
            ],
            yinLiNianYueRi: "二〇二三年六月初十日",
            daily: false,
            weekend: false
          },
          {
            day: 28,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "十一",
            xingQiDate: "星期五",
            suitable: [
              "祭祀",
              "祈福",
              "求嗣",
              "开光",
              "伐木",
              "出火",
              "拆卸",
              "入宅",
              "安床",
              "修造",
              "动土",
              "上梁",
              "挂匾",
              "纳畜"
            ],
            fear: [
              "嫁娶",
              "栽种",
              "行丧",
              "理发",
              "修坟",
              "行丧",
              "作灶"
            ],
            yinLiNianYueRi: "二〇二三年六月十一日",
            daily: false,
            weekend: false
          },
          {
            day: 29,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "十二",
            xingQiDate: "星期六",
            suitable: [
              "解除",
              "祭祀",
              "理发",
              "入殓",
              "安葬",
              "破土"
            ],
            fear: [
              "嫁娶",
              "开市",
              "出火",
              "作灶",
              "置产",
              "斋醮",
              "入宅",
              "移徙",
              "安门"
            ],
            yinLiNianYueRi: "二〇二三年六月十二日",
            daily: false,
            weekend: true
          },
          {
            day: 30,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "十三",
            xingQiDate: "星期日",
            suitable: [
              "破屋",
              "坏垣",
              "馀事勿取"
            ],
            fear: [
              "诸事不宜"
            ],
            yinLiNianYueRi: "二〇二三年六月十三日",
            daily: false,
            weekend: true
          },
          {
            day: 31,
            year: 2023,
            month: 7,
            jieQi: null,
            holiday: null,
            yinLi: "十四",
            xingQiDate: "星期一",
            suitable: [
              "开市",
              "交易",
              "立券",
              "纳财",
              "动土",
              "开光",
              "出行",
              "嫁娶",
              "纳采",
              "订盟",
              "出行",
              "纳财",
              "入学",
              "开仓",
              "出货财",
              "纳畜",
              "牧养",
              "栽种",
              "破土",
              "启钻",
              "安葬",
              "立碑"
            ],
            fear: [
              "入宅",
              "移徙",
              "作灶",
              "祭祀",
              "谢土"
            ],
            yinLiNianYueRi: "二〇二三年六月十四日",
            daily: false,
            weekend: false
          }
        ]
      },
      username: null,
      phone: null
    };
    this.getData();
    this.Adaptation();
    this.monthList = Array.from(Array(12), (i, x) => x + 1);
    this.hourList = Array.from(Array(24), (i, x) => x + 1);
    const range = () => {
      const currentYear = new Date().getFullYear();
      const startYear = 1900;
      const yearsArray = [];
      for (let i = currentYear; i >= startYear; i--) {
        yearsArray.push(i);
      }
      return yearsArray;
    };
    this.yearList = range();
  }
};
</script>

<style lang="scss" scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  color: transparent;
  background: transparent;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}


.placeholder {
  position: absolute;
  left: 5vh;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 10px;
  color: rgb(255, 255, 255);
  font-size: 16px;
}

.topbg {
  position: fixed;
  width: 200px;
  height: 200px;
  border-radius: 500px;
  --c: #f79ad5;
  top: -80px;
  left: -20px;
  background-color: var(--c);
  filter: blur(60px);

  /* 阴影（发光效果） */
  box-shadow:
    0 0 300px var(--c),
    0 0 300px var(--c),
    0 0 300px var(--c),
    0 0 300px var(--c);
  /* 执行动画 */
  /* 计算并设置动画延迟时间 */
  animation-name: fd;
  /*关键帧名称*/
  animation-timing-function: ease-in-out;
  /*动画的速度曲线*/
  animation-iteration-count: infinite;
  /*动画播放的次数*/
  animation-duration: 4s;
  /*动画所花费的时间*/
  animation-delay: calc(-0.1s * var(--i));
  opacity: 0.8;
}

.rightbg {
  width: 1500px;
  height: 1600px;
  filter: blur(300px);

  position: fixed;
  top: -1250px;
  right: 200px;
  border-radius: 50%;
  --c: #ef62b7f7;
  background-color: var(--c);
  box-shadow: 0 0 50px var(--c),
    0 0 69px var(--c),
    0 0 40px var(--c),
    0 0 100px var(--c),
    0 0 150px var(--c),
    0 0 100px var(--c);
  opacity: 0.3;
  animation-name: fdd;
  /*关键帧名称*/
  animation-timing-function: ease-in-out;
  /*动画的速度曲线*/
  animation-iteration-count: infinite;
  /*动画播放的次数*/
  animation-duration: 4s;
  /*动画所花费的时间*/
  animation-delay: calc(-0.1s * var(--i));

}

@keyframes bg {
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}

@keyframes fd {
  0% {
    transform: scale(1);
    /*开始为原始大小*/
  }

  25% {
    transform: scale(1.1);
    /*放大1.1倍*/
  }

  50% {
    transform: scale(1);
  }

  75% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }

}

@keyframes fdd {
  0% {
    transform: scale(1);
    /*开始为原始大小*/
  }

  25% {
    transform: scale(1.03);
    /*放大1.1倍*/
  }

  50% {
    transform: scale(1);
  }

  75% {
    transform: scale(1.03);
  }

  100% {
    transform: scale(1);
  }

}

.pc {
  width: 100%;

  background: linear-gradient(to top right, #7ef0f9, #b2f6fb, #b6c2df);

  animation: bg 3s infinite linear forwards;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &-back {
    width: 56px;
    height: 56px;
    position: absolute;
    left: 6vh;
    top: 1vh;
    margin-top: 2vh;
    margin-left: -3vh;
    z-index: 10000;
  }

  &-richeng {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;

    >img {
      width: 60vh;
    }

    &-content {
      width: 54vh;
      height: 32vh;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 2vh;
      box-sizing: border-box;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;

      &-input {
        width: 100%;
        height: 20vh;
        position: relative;

        .windowclose {
          position: absolute;
          right: -1.2vh;
          top: -1.6vh;
          width: 4vh;
          cursor: pointer;
        }

        textarea {
          width: 96%;
          height: 18vh;
          outline: none;
          border: none;
          background: none;
          color: #fff;
          resize: none;
          font-size: 2.2vh;

          &::-webkit-scrollbar {
            width: 0.6vh;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 2vh;
            background: #87ff9a;
          }

          &::-webkit-input-placeholder {
            color: #fff;
          }

          &:-moz-placeholder {
            color: #fff;
            opacity: 1;
          }

          &::-moz-placeholder {
            color: #fff;
            opacity: 1;
          }

          &:-ms-input-placeholder {
            color: #fff;
          }
        }
      }

      .pc-richeng-confirm {
        width: 12vh;
        cursor: pointer;
      }
    }
  }

  &-dialog {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 8;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    >img {
      height: 80vh;
    }

    &-content {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      padding: 3vh 8vh;
      box-sizing: border-box;

      &-close {
        position: absolute;
        right: 4.4vh;
        top: 3.4vh;
        height: 4vh;
        cursor: pointer;
      }

      &-date {
        position: relative;
        color: #fff;
        margin-top: 2vh;
        display: flex;
        align-items: center;

        >img {
          width: 100%;
        }

        .taitou-month {
          position: absolute;
          left: 8vh;
          top: 0;
          font-size: 3vh;
          line-height: 5.5vh;
          letter-spacing: 0.8vh;
          font-weight: bold;
        }

        .taitou-year {
          position: absolute;
          left: 24vh;
          top: -0.1vh;
          font-family: "xique";
          font-size: 6vh;
          line-height: 4vh;
        }

        .taitou-xingqiDate {
          position: absolute;
          right: 6vh;
          top: 0;
          font-size: 3vh;
          line-height: 5.5vh;
          font-weight: bold;
          letter-spacing: 0.6vh;
        }
      }

      &-yiji {
        margin-top: 10px;

        .yijiTitle {
          display: flex;
          justify-content: space-between;

          .yiContent {
            display: flex;
            flex-direction: column;
            font-size: 2.4vh;
            align-items: center;
            color: #df8080;
            font-weight: bold;
            flex: 1;

            >img {
              width: 8vh;
            }

            ul {
              display: flex;
              flex-wrap: wrap;

              li {
                flex: 0 0 50%;
                text-align: center;
                line-height: 4vh;
              }
            }
          }

          .jieriContent {
            font-family: "xique";
            position: relative;
            color: #fff;
            display: flex;
            flex: 1;

            >img {
              width: 20vh;
            }

            .jieriContent-date {
              font-size: 12vh;
              position: absolute;
              left: 0.5vh;
              width: 19vh;
              text-align: center;
              top: -5vh;
              text-shadow: 0 0 2vh #a3cad3;
            }

            .jieriContent-jieri {
              font-size: 6vh;
              position: absolute;
              left: 4.0vh;
              // top: 1vh;
              bottom: 2vh;
              text-shadow: 0 0 2vh #a3cad3;
            }
          }

          .jiContent {
            display: flex;
            flex-direction: column;
            font-size: 2.4vh;
            color: #747d9c;
            align-items: center;
            font-weight: bold;
            flex: 1;

            >img {
              width: 8vh;
            }

            ul {
              display: flex;
              flex-wrap: wrap;

              li {
                flex: 0 0 50%;
                text-align: center;
                line-height: 4vh;
              }
            }
          }
        }
      }

      &-yinli {
        text-align: center;
        margin: 2vh 0;
        position: relative;

        >img {
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }

        &-title {
          color: #fff;
          font-family: "xique";
          font-size: 2.6vh;
          line-height: 3vh;
          position: relative;
        }
      }

      &-diarylist {
        position: relative;

        >img {
          width: 100%;
        }

        .diarylist-message {
          width: 100%;
          height: 21vh;
          position: absolute;
          left: 0;
          top: 0;
          overflow-y: scroll;
          padding: 2vh;
          box-sizing: border-box;
          font-size: 2.2vh;
          color: #fff;

          &::-webkit-scrollbar {
            width: 0.6vh;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 2vh;
            background: #87ff9a;
          }

          ul {
            display: flex;
            flex-direction: column;

            li {
              display: flex;
              margin-bottom: 1vh;
              line-height: 3.6vh;
              cursor: pointer;

              .diarylist-message-bg {
                height: 4vh;
                cursor: pointer;
              }

              .edit {
                height: 2.4vh;
                margin-left: 0.8vh;
              }

              .delete {
                height: 2.4vh;
                margin-left: 1vh;
              }

              .diarylist-messag-text {
                display: flex;
                align-items: center;
                margin-left: 2vh;
                line-height: 4vh;
              }
            }
          }
        }
      }

      &-add {
        display: flex;
        justify-content: center;

        >img {
          height: 8vh;
          padding: 1.4vh;
          background-color: #86e1f2;
          border-radius: 2vh;
          margin-top: 1vh;
          cursor: pointer;
          display: block;
          transition: all 1s ease;
          /* 添加过渡效果 */
        }

        >img:hover {
          transform: rotateZ(180deg);
          /* 设置翻转效果 */
        }
      }
    }
  }

  &-img {
    position: absolute;
    left: 0;
    top: 0;
  }

  &-diary {
    width: 90vh;
    min-width: 70vh;
    height: 86vh;
    position: relative;
    border-radius: 20px;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    &-shengxiao {
      width: 80vh;
      height: 68vh;
      overflow: hidden;
      font-size: 56vh;
      font-family: "xique";
      color: #b8dfe9;
      z-index: 1;
      position: absolute;
      left: 4.5vh;
      top: -11vh;

      span {
        position: absolute;
        left: -18vh;
        top: 0vh;
      }
    }

    &-bg {
      width: 80vh;
      height: 82vh;
      position: absolute;
      left: 4.5vh;
      top: 2.2vh;
      border-radius: 2vh;
      background: #c3eeee;
      box-shadow: 20px 20px 60px #b4d3e3,
        -20px -20px 60px #b4d3e3;

    }

    &-tabs {
      height: 15vh;
      margin: 4vh 6vh 0 6vh;
      display: flex;
      justify-content: space-between;
      z-index: 2;

      &-check {
        position: relative;
        display: flex;
        margin-top: 7vh;

        &-bg {
          height: 7.2vh;
          position: absolute;
          left: -1vh;
        }

        &-yin {
          flex: 1;
          cursor: pointer;
          position: relative;

          >img {
            height: 7vh;
            position: relative;
            margin-left: -0.4vh;
          }

          >span {
            font-family: "xique";
            text-align: center;
            position: absolute;
            left: 0.6vh;
            font-size: 4vh;
            color: #fff;
            line-height: 6vh;
          }
        }

        &-yang {
          flex: 1;
          cursor: pointer;
          position: relative;

          >img {
            position: relative;
            height: 7vh;
            margin-left: -1.6vh;
          }

          >span {
            font-family: "xique";
            text-align: center;
            position: absolute;
            left: 0.5vh;
            font-size: 4vh;
            color: #fff;
            line-height: 6vh;
          }
        }
      }

      &-title {
        font-family: "xique";
        color: #67768c;
        display: flex;

        ul {
          font-size: 3.2vh;
          writing-mode: tb-rl;
          font-weight: 600;
        }

        span {
          font-size: 16vh;
          line-height: 9vh;
        }
      }
    }

    &-dateSelect {
      flex: 1;
      margin: 1.4vh 6vh 4vh 6vh;
      display: flex;
      flex-direction: column;
      z-index: 2;

      &-date {
        width: 100%;
        height: 7vh;
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: 0 1.2vh;
        box-sizing: border-box;
        background-image: linear-gradient(to right, #90d0e7, #a7d0e6);
        border-radius: 3vh;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);

        >img {
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }

        &-year {
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "xique";
          color: #fff;
          z-index: 2;
          align-items: center;
          line-height: 8vh;
          cursor: pointer;
          position: relative;

          img {
            width: 100%;
            height: 2vh;
          }

          &-num {
            font-size: 5vh;
            margin-left: 1vh;
            line-height: 6vh;
            height: 8vh;
            letter-spacing: 0.4vh;
          }

          &-name {
            font-size: 3vh;
          }

          &-select {
            position: absolute;
            left: -21vh;
            top: -3.5vh;
            z-index: 4;

            .year-select {
              height: 42vh;
              width: auto;
            }

            .pc-diary-yearSelect {
              width: 13vh;
              height: 33vh;
              position: absolute;
              left: 5vh;
              top: 3vh;

              &-ul {
                display: flex;
                height: 33vh;
                flex-direction: column;
                font-size: 2.4vh;
                color: #fff;
                align-items: center;
                font-family: "Microsoft YaHei", "Avenir", Helvetica, Arial,
                  sans-serif;
                padding: 1vh;
                box-sizing: border-box;
                overflow-y: scroll;

                .yearActive {
                  color: #67768c;
                }

                li {
                  cursor: pointer;
                  line-height: 3vh;
                }

                &::-webkit-scrollbar {
                  width: 4px;
                }

                &::-webkit-scrollbar-thumb {
                  border-radius: 2vh;
                  background: #87ff9a;
                }
              }
            }
          }
        }

        &-month {
          display: flex;
          font-family: "xique";
          color: #fff;
          z-index: 2;
          align-items: center;
          cursor: pointer;

          img {
            width: 100%;
            height: 2vh;
            transform: rotate(180deg);
          }

          &-num {
            font-size: 5vh;
            line-height: 6vh;
            height: 8vh;
            letter-spacing: 0.4vh;
          }

          &-name {
            font-size: 3vh;
          }

          &-select {
            position: absolute;
            right: -11.6vh;
            top: 0vh;
            z-index: 4;
            background-image: linear-gradient(to right, #c4dbe9, #97dfef);
            border: 4px solid #d7fbfb;
            border-radius: 2vh;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
            height: 45vh;
            width: 11vh;
            display: flex;
            justify-content: center;
            align-items: center;

            .month-select {
              width: auto;
              height: 48vh;
            }

            .pc-diary-monthSelect {
              width: 11vh;
              height: 40vh;
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;

              &-ul {
                top: -1vh;
                display: flex;
                flex-direction: column;
                font-size: 2.4vh;
                color: #fff;
                align-items: center;
                font-family: "Microsoft YaHei", "Avenir", Helvetica, Arial,
                  sans-serif;
                box-sizing: border-box;
                margin-bottom: 0px;

                .ulactive {
                  color: #67768c;
                }

                li {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }

      &-week {
        width: 100%;
        height: 7vh;

        ul {
          position: relative;
          font-size: 2vh;
          color: #fff;
          display: flex;
          flex-wrap: nowrap;
          // justify-content: space-between;
          margin-top: 1vh;

          li {
            width: calc((100%) / 7);
            display: flex;
            justify-content: center;
          }


          .work {
            width: 5vh;
            height: 5vh;
            line-height: 5vh;
            font-size: 2.2vh;
            background-color: #9fcbf3;
            border-radius: 50%;
            text-align: center;
          }

          .nowork {
            width: 5vh;
            height: 5vh;
            line-height: 5vh;
            font-size: 2.2vh;
            border-radius: 50%;
            text-align: center;
            background-color: #dfb0b9;
          }
        }
      }

      &-list {
        width: 100%;
        flex: 1;
        margin-bottom: 4vh;

        ul {
          width: 100%;
          display: flex;
          flex-wrap: wrap;

          li {
            width: calc((100%) / 7);
            // padding-right: 1vh;
            // margin-right: 2.4vh;
            // width: 10vh;
            height: 8vh;
            line-height: 8vh;
            font-size: 2.2vh;
            text-align: center;
            color: #fff;
            // min-width: calc((100%-6vh) / 7);
            // max-width: calc((100%-6vh) / 7);
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            &:nth-child(7n + 7) {
              margin-right: 0;
            }

            .imgUrl {
              height: 8vh;
            }

            .currentImg {
              height: 11vh;
              position: absolute;
              // left: 0.2vh;
              top: -1.4vh;
              z-index: 2;
            }

            .dataTitle {
              position: absolute;
              z-index: 4;
              font-size: 2.2vh;
              font-weight: 500;
              width: 6.5vh;
              // left: 2vh;
              top: 0;
              height: 7vh;
              line-height: 7vh;
              cursor: pointer;
            }

            .recordImg {
              z-index: 5;
              height: 2.6vh;
              position: absolute;
              right: 2vh;
              top: 0;
            }
          }
        }
      }
    }
  }

  &-content {
    width: 60vh;
    height: 80vh;
    position: relative;
    border-radius: 4vh;
    display: flex;
    flex-direction: column;
    margin-left: -4vh;

    &-search {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 50vh;
      background-color: #c0f0ed;
      border-radius: 4vh;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);

      &-top {
        display: flex;
        margin-top: 2vh;
        z-index: 3;
        justify-content: center;
        align-items: center;
        position: relative;

        img:nth-child(1) {
          height: 4vh;
        }

        img:nth-child(2) {
          height: 4vh;
          margin-left: 2vh;
          cursor: pointer;
        }

        &-input {
          width: 20vh;
          background: none;
          position: absolute;
          left: 6vh;
          border: none;
          color: #fff;
          outline: none;

          &::-webkit-input-placeholder {
            color: #fff;
            font-size: 14px;
          }

          &::-moz-placeholder {
            color: #fff;
            font-size: 14px;
          }

          &:-moz-placeholder {
            color: #fff;
            font-size: 14px;
          }

          &:-ms-input-placeholder {
            color: #fff;
            font-size: 14px;
          }

          &-hour {
            position: relative;
            color: #fff;
            font-size: 14px;
            left: -18vh;
            width: 2vw;
          }
        }

        &-hour {
          width: 25vh;
          height: 45vh;
          background: #ffffff;
          position: absolute;
          left: 6vh;
          top: 15vh;
          border-radius: 2vh;
          box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
          display: inline-block;
          padding-left: 1vh;
          padding-right: 1vh;

          >ul {
            flex-wrap: wrap;
            justify-content: flex-start;
            display: flex;

            justify-content: center;
            align-items: center;

            .yearActive {
              color: #67768c;
            }

            li {
              background-color: #86e1f2;
              width: 20%;
              /* 因为一行放四个元素，所以每个元素宽度为总宽度的 25% */
              box-sizing: border-box;
              /* 防止内边距和边框增加元素大小 */
              display: flex;
              margin: 0.5vh;
              border-radius: 0.5vh;
              color: white;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
          }
        }

        &-time {
          width: 14vh;
          height: 4vh;
          background: none;
          position: absolute;
          top: 0;
          left: 27vh;
          border: none;
          color: #fff;
          outline: none;
          font-size: 2vh;

          &::-webkit-input-placeholder {
            color: #fff;
            font-size: 2vh;
          }

          &:-moz-placeholder {
            color: #fff;
            font-size: 2vh;
            opacity: 1;
          }

          &::-moz-placeholder {
            color: #fff;
            font-size: 2vh;
            opacity: 1;
          }

          &:-ms-input-placeholder {
            color: #fff;
            font-size: 2vh;
          }
        }
      }

      &-message {
        z-index: 3;
        flex: 1;
        display: flex;
        font-family: "xique";
        padding: 0 2vh;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;

        >span {
          font-size: 9vh;
          color: #67768c;
        }

        >ul {
          color: #e35a74;
          font-size: 4vh;
          writing-mode: tb-rl;
          letter-spacing: -1vh;
          margin-bottom: 0px;
        }
      }
    }

    &-jieri {
      position: relative;
      font-family: "xique";
      font-size: 32vh;
      color: #9fc2de;

      &-person {
        width: 50vh;
        position: absolute;
        left: -3px;
        top: -10vh;
      }

      &-title {
        z-index: -1;
        display: flex;
        line-height: 30vh;
        flex-direction: column;
        font-size: 40vh;
        margin-left: 4vh;

        span:nth-child(2) {
          text-align: right;
        }
      }
    }
  }
}
</style>
<style scoped>
.el-input__inner {
  padding-left: 7px;
  width: 20vh;
  height: 4vh;
  font-size: 14px;
  background-color: #8bdbe9;
  border: none;
  outline: none;
  color: #fff;
  margin-left: -5px;
  border-radius: 6px;
}

.el-input__wrapper{
  width: 20vh;
          background: none;
          position: absolute;
          left: 6vh;
          border: none;
          color: #fff;
          outline: none;
}

.el-input__icon {
  line-height: initial !important;
  display: none;
}
.elInput {
  background-color: transparent;
  background-image: url('https://supercalender.oss-cn-beijing.aliyuncs.com/static/pc/search-input.png');
  background-size: cover;
  background-repeat: no-repeat;
  width: 13vw;
  top: 0vw;
  height: 4vh;
  right: 0vw;
  border:none;
}
</style>
