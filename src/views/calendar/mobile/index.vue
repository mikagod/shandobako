<template>
  <div class="mobile">
    <img class="mobile-bgimg" :src="publicUrl + 'static/mobile/bg.png'" alt="" />
    <!-- 移动端主体内容 -->
    <div class="mobile-main">


      <van-popup v-model:show="showDatePicker" position="bottom">
        <van-date-picker :value="currentDate" v-model="currentDatev" @confirm="onDatePickConfirm" @cancel="onDatePickCancel" title="选择年月日" :min-date="new Date(1900, 0, 1)"
          :max-date="new Date(2035, 12, 31)" :columns-type="columnsType" />
      </van-popup>

      <van-popup v-model:show="showTimePicker" position="bottom">
        <van-time-picker :value="currentTime"  v-model="currentTimev" @confirm="onTimePickConfirm" @cancel="onDatePickCancel" title="选择时辰" :min-hour="1"
          :max-hour="24" :columns-type="columnsTimeType" />
      </van-popup>


      <div class="mobile-main-search">
        <img class="mobile-main-search-back" @click="router.go(-1)" src="../../../assets/img/personalPage/accountMessage/login_out/back.png" />
        <div class="mobile-main-search-inputImg" @click="showDatePicker = true">
          <img :src="publicUrl + 'static/mobile/search.png'" alt="" />
          <van-field v-model="birthDay" class="mobile-main-search-inputImg-input" placeholder="请写下阳历生日 例：1990-03-05-12" />
        </div>
        <img class="mobile-main-search-click" :src="publicUrl + 'static/mobile/input.png'" @click="getSearchData"
          alt="" />
      </div>
      <div class="mobile-main-date">
        <div class="mobile-main-date-left">
          <div class="shengchen">
            <div class="shengqiao-title">{{ shengxiao }}</div>
            <div class="shengqiao-list">
              <ul>
                <li v-for="(item, index) in lunarYear" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
          <span class="date">{{ Today.month }}/{{ Today.today }}</span>
          <span class="jieri">{{ jieQi }}</span>
          <div class="bazi">
            <img :src="publicUrl + 'static/mobile/bazidi.png'" alt="" />
            <ul>
              <li v-for="(item, index) in baziList" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
        <div class="mobile-main-date-right">
          <img :src="nametext" alt="" />
        </div>
      </div>
      <div class="mobile-main-calendar">
        <div class="mobile-main-calendar-bg">
          <div class="mobile-main-calendar-bg-shengxiao">{{ shengxiao }}</div>
        </div>
        <img class="mobile-main-calendar-bannerTop" :src="publicUrl + 'static/mobile/blue.png'" alt="" />
        <div class="mobile-main-calendar-yinyang" @click="isYin = !isYin">
          <img :src="publicUrl + 'static/mobile/yinyang.png'" alt="" />
          <div class="yinyang-content">
            <div class="yinyang-content-left">
              <img :src="publicUrl + 'static/pc/yin.png'" v-if="!isYin" alt="" />
              <span>阴</span>
            </div>
            <div class="yinyang-content-right">
              <img :src="publicUrl + 'static/pc/yang.png'" v-if="isYin" alt="" />
              <span>阳</span>
            </div>
          </div>
        </div>
        <!-- 年月选择器 -->
        <div class="mobile-main-calendar-yearSelect">
          <img :src="publicUrl + 'static/mobile/year-month.png'" alt="" />
          <div class="yearSelect-year" @click="isYear = !isYear">
            <img :src="publicUrl + 'static/pc/sanjiao.png'" alt="" />
            <span class="name">{{ year }}</span>
            <span class="title">年</span>
          </div>
          <div class="yearSelect-month" @click="isMonth = !isMonth">
            <span class="name">{{ month }}</span>
            <span class="title">月</span>
            <img :src="publicUrl + 'static/pc/sanjiao.png'" alt="" />
          </div>
        </div>
        <!-- 年选择器 -->
        <div class="yearSelection" v-if="isYear">
          <img :src="publicUrl + 'static/mobile/year.png'" alt="" />
          <div class="yearSelection-main">
            <ul>
              <li v-for="(item, index) in yearList" @click="getSelectYear(item)" :key="index"
                :class="{ yearActive: item == year }">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 月选择器 -->
        <div class="monthSelection" v-if="isMonth">
          <img :src="publicUrl + 'static/mobile/month.png'" alt="" />
          <div class="monthSelection-main">
            <ul>
              <li v-for="(item, index) in monthList" @click="getSelectMonth(item)" :key="index"
                :class="{ ulactive: item == month }">
                {{ item }}月
              </li>
            </ul>
          </div>
        </div>

        <!-- 星期 -->
        <div class="weekSelection">
          <ul>
            <li v-for="(item, index) in weekDate" :key="index">
              <div :class="item.isWork ? 'work' : 'nowork'">{{ item.name }}</div>
            </li>
          </ul>
        </div>

        <!-- 日期 -->
        <div class="dateSelection">
          <ul>
            <li v-for="(item, index) in monthDate" :key="index" @click="">
              <img v-if="item.day" class="imgUrl" :src="item.holiday || item.jieQi ? `${publicUrl}static/pc/red.png`
                : item.weekend ? `${publicUrl}static/pc/yellow.png` : `${publicUrl}static/pc/blue.png`" alt="" />
              <img v-if="item.day == date && date" class="currentImg" :src="publicUrl + 'static/pc/selected.png'"
                alt="" />
              <img v-if="item.daily" :src="publicUrl + 'static/pc/gantan.png'" alt="" class="recordImg" />
              <div @mousemove="date = item.day" @mouseleave="date = null" @mousedown="getCurrentDate(item)"
                :class="item.jieQi || item.holiday ? 'recordImgText' : ''" class="dataTitle">
                <span :class="item.jieQi != null || item.holiday != null || !isYin
                  ? 'hanziTitle'
                  : ''
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
    <!-- 宜忌弹窗 -->
    <div class="mobile-dialog" v-if="isDialog">
      <img :src="publicUrl + 'static/mobile/richengdi.png'" alt="" />
      <div class="mobile-dialog-content">
        <div class="mobile-dialog-content-time">
          <img :src="publicUrl + 'static/pc/taitou.png'" alt="" />
          <div class="taitou-month">{{ currentDate.month }}月</div>
          <div class="taitou-year">{{ currentDate.year }}</div>
          <div class="taitou-week">{{ currentDate.xingQiDate }}</div>
        </div>
        <div class="mobile-dialog-content-yiji">
          <div class="yiji-yi">
            <img :src="publicUrl + 'static/pc/yi.png'" alt="" />
            <ul>
              <li v-for="(item, index) in this.getNewList(currentDate.suitable)" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="yiji-jieqi">
            <img :src="publicUrl + 'static/pc/dihua.png'" alt="" />
            <span class="jieriContent-date">{{ currentDate.day }}</span>
            <span class="jieriContent-jieri">{{ currentDate.showJieQi }}</span>
          </div>
          <div class="yiji-ji">
            <img :src="publicUrl + 'static/pc/ji.png'" alt="" />
            <ul>
              <li v-for="(item, index) in this.getNewList(currentDate.fear)" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <div class="mobile-dialog-content-nongli">
          <img :src="publicUrl + 'static/pc/fenge.png'" alt="" />
          <span>{{ currentDate.yinLiNianYueRi }}</span>
        </div>
        <div class="mobile-dialog-content-list">
          <img :src="publicUrl + 'static/mobile/richeng.png'" alt="" />
          <div class="mobile-dialog-content-list-content">
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
        <div class="mobile-dialog-content-add">
          <img :src="publicUrl + 'static/mobile/add.png'" @click="isInput = true" alt="" />
        </div>
        <div class="mobile-dialog-content-del">
          <img @click="scheduleDialog" class="windowClose" :src="publicUrl + 'static/pc/close.png'" alt="" />
        </div>
      </div>
    </div>

    <!-- 输入日程弹窗 -->
    <div class="mobile-schedule" v-if="isInput">
      <img :src="publicUrl + 'static/mobile/shuru.png'" alt="" />
      <div class="mobile-schedule-content">
        <div class="mobile-schedule-content-input">
          <textarea placeholder="输入您的日程" v-model="textarea" cols="30" rows="10">{{ textarea }}</textarea>
          <img @click="closeInput" class="windowclose" :src="publicUrl + 'static/pc/windowclose.png'" alt="" />
        </div>
        <img @click="confirm" class="mobile-richeng-confirm" :src="publicUrl + 'static/pc/confirm.png'" alt="" />
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
// import "../../../utils/rem.js";
import common from "../../../utils/global.js";
import {getCurrentInstance, ref} from 'vue';
import {useRouter} from 'vue-router';
import localStorageObject from "../../../store/localStorageObject.js";
import dayjs from "dayjs";
import {getHomeConfiguration} from "../../../axios/api.js";
export default {
  setup() {
    const router = useRouter()
    // const currentDate = [];
    const columnsType = ['year', 'month', 'day'];
    const currentTime = [];
    const columnsTimeType = ['hour','minute'];
    return {
      columnsType,
      currentTime,
      columnsTimeType,
      router
    };
  },
  data() {
    return {
      year: "",
      month: "",
      date: "",
      hours: "",
      hour: "",
      jieQi: "",
      shengxiao: "",
      isYin: false,
      isInput: false,
      isYear: false,
      isMonth: false,
      isDialog: false, //弹窗
      Today: "",
      textarea: "",
      yearList: [],
      baziList: [],
      weekDate: [],
      lunarYear: [],
      monthList: [],
      monthDate: [],
      messageList: [],
      currentSchedule: {},
      allJieQiAndCurrentAnimal: [],
      isEditDel: false,
      phone: localStorageObject.getPhone(),
      publicUrl: "https://supercalender.oss-cn-beijing.aliyuncs.com/",
      currentDate: "",
      currentDatev: [],
      currentTimev: [],
      showDatePicker: false,
      showTimePicker: false,
      birthDay: "",
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
    //日期选择器回调
    onDatePickConfirm(e) {
      let timeVal = e.selectedValues.join().replace(/,/g, "-")
      this.birthDay = timeVal
      this.showDatePicker = false
      this.showTimePicker = true
    },
    //时间选择器回调
    onTimePickConfirm(e) {
      let timeVal = e.selectedValues.join().replace(/,/g, "-")
      this.birthDay = this.birthDay+"-"+timeVal
      this.showDatePicker = false
      this.showTimePicker = false
    },
    //时间选择器关闭回调
    onDatePickCancel() {
      this.showDatePicker = false
      this.showTimePicker = false
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
    // 关闭输入弹窗
    closeInput() {
      this.isInput = false;
      this.textarea = "";
    },
    // 获取月份
    getSelectMonth(item) {
      this.month = item < 10 ? "0" + item : item;
      this.isMonth = !this.isMonth;
      this.getScheduleByYearMonthInfo();
    },
    // 获取年份
    getSelectYear(item) {
      this.year = item;
      this.isYear = !this.isYear;
      this.getScheduleByYearMonthInfo();
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
          this.baziList = [nianZhu, yueZhu, riZhu, shiZhu];
        }
      });
    },
    // 关闭宜忌弹窗
    scheduleDialog() {
      this.messageList = [];
      this.isDialog = !this.isDialog;
      this.isEdit = false;
    },
    // 获取初始数据
    getData() {
      const date = new Date();
      this.year = date.getFullYear();
      const month = date.getMonth() + 1;
      const today = date.getDate();
      this.month = month < 10 ? "0" + month : month;
      this.date = today < 10 ? "0" + today : today;
      this.hours = date.getHours();
      this.Today = {
        month,
        today
      };
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
      this.getBaziInfo();
      this.getYearMonthList();
      this.getBaZiBynianyueri();
      this.getScheduleByYearMonthInfo();
      this.getAnimalandJieQiByYearMonth();
    },
    // 编辑当前日程
    editComment(item) {
      this.isEdit = true;
      this.textarea = item.message;
      this.isInput = true;
      this.currentSchedule = item;
    },
    // 删除当前日程
    delComment(item) {
      let isDel = confirm("确定删除吗?");
      if (isDel) {
        delSingleSchedule({
          scheduleTime: this.getScheduleTime(),
          scheduleId: item.scheduleId
        }).then(res => {
          if (res.data.code == "0") {
            alert("删除成功!");
            this.getQueryAllScheduleInfo();
            this.getScheduleByYearMonthInfo();
          }
        });
      }
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
          alert("更新成功!");
          this.getQueryAllScheduleInfo();
          this.getScheduleByYearMonthInfo();
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
          alert("添加成功!");
          this.getQueryAllScheduleInfo();
          this.getScheduleByYearMonthInfo();
        } else {
          alert("添加失败!");
        }
      });
    },
    // 获取年月数据
    getYearMonthList() {
      const range = (start, end, step) => {
        return Array.from(
          Array.from(Array(Math.ceil((end - start) / step)).keys()),
          x => start + x * step
        );
      };
      this.yearList = range(1900, 2051, 1);
      this.monthList = Array.from(Array(12), (i, x) => x + 1);
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
    // 查询功能
    getSearchData() {
      if (this.birthDay === null || this.birthDay === "") {
        alert("请输入您的生日信息！");
        return;
      } else {
        // if (common.checkDate(this.birthDay)) {
          const date = this.birthDay.split("-");
          this.getBaziInfo(date);
        // }
      }
    },
    // 通过年月获取生肖和当日节气
    getAnimalandJieQiByYearMonth(date) {
      let params = {};
      if (date) {
        params = {
          scheduleTime: `${date[0]}-${date[1]}-${date[2]}`
        };
      } else {
        params = {
          scheduleTime: `${this.year}-${this.month}-${this.date}`
        };
      }
      getAnimalandJieQiByYearMonth(params).then(res => {
        if (res.data.code == "0") {
          this.allJieQiAndCurrentAnimal =
            res.data.data.allJieQiAndCurrentAnimal;
          const item = this.allJieQiAndCurrentAnimal.find(
            item => item.day == this.currentDate.day
          );
          this.jieQi = item.jieQi;
          this.shengxiao = item.animal;
        }
      });
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
    // 获取当前时间
    getScheduleTime() {
      const { year, month, day } = this.currentDate;
      return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day
        }`;
    }
  },
  created() {
    this.getData();
    this.birthDay = ref(dayjs().format('YYYY-MM-DD-HH-mm')); // 在组件创建后设置初始值
    // 组件创建时，获取当前年份的节气日期
    this.solarTerms = this.getSolarTermsForYear(this.currentYear);
    this.setCurrentSolarTerm();
    // let datestr = dayjs().format('YYYY-MM-DD-HH-mm');
    let strings = this.birthDay.split('-');
    this.currentDatev= [strings[0],strings[1],strings[2]];
    this.currentTimev= [strings[3],strings[4]];
  }
};
</script>

<style lang="scss" scoped>
.mobile {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;

  &-bgimg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &-main {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 10px 10px;
    box-sizing: border-box;

    &-search {
      display: flex;
      justify-content: space-between;
      position: relative;
      z-index: 6;

      &-back{
        width: 32px;
        height: 32px;
      }

      &-vant {
        position: absolute;
        left: 0;
        top: 30px;
        width: 100%;
      }

      &-inputImg {
        height: 38px;
        z-index: 5;
        position: relative;

        >img {
          width: 100%;
        }

        &-input {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 38px;
          line-height: 32px;
          padding: 0 10px;
          color: #fff;
          border: none;
          outline: none;
          box-sizing: border-box;
          background: none;
          font-size: 14px;

          &::-webkit-input-placeholder {
            color: #fff;
            font-size: 14px;
          }

          &:-moz-placeholder {
            color: #fff;
            font-size: 14px;
            opacity: 1;
          }

          &::-moz-placeholder {
            color: #fff;
            font-size: 14px;
            opacity: 1;
          }

          &:-ms-input-placeholder {
            color: #fff;
            font-size: 14px;
          }
        }
      }

      &-click {
        height: 33px;
        z-index: 2;

        >img {
          width: 100%;
        }
      }
    }

    &-date {
      display: flex;
      justify-content: center;

      &-left {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: -8px;

        .shengchen {
          font-family: "xique";
          display: flex;
          color: #374556;
          align-items: center;
          text-shadow: 0 0 2vh #9b82ae;

          .shengqiao-title {
            font-size: 72px;
          }

          .shengqiao-list {
            font-size: 24px;
            font-weight: 600;

            ul {
              display: flex;

              li {
                writing-mode: tb-rl;
              }
            }
          }
        }

        .date {
          color: #fff;
          font-size: 48px;
          font-family: "xique";
          text-shadow: 0 0 8px #b896c7;
          margin-top: -18px;
          position: relative;
          left: 1vh;
        }

        .jieri {
          color: #fff;
          font-size: 32px;
          font-family: "xique";
          text-shadow: 0 0 12px #b0a1ca;
          position: relative;
          margin-top: -8px;
          left: 1vh;
        }

        .bazi {
          color: #e45872;
          position: relative;
          margin-top: 6px;
          margin-bottom: 8px;

          >img {
            width: 100%;
          }

          ul {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 16px;

            li {
              writing-mode: tb-rl;
              font-size: 21px;
              white-space: nowrap;
              font-family: "xique";
              display: flex;
              font-weight: bold;
              width: 32px;
              letter-spacing: -4px;
              text-shadow: 0 0 16px #b0a1ca;
              align-items: center;
            }
          }
        }
      }

      &-right {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        >img {
          width: 230px;
          position: absolute;
          right: -20px;
          top: -0.5vh;
          z-index: 1;
        }
      }
    }

    &-calendar {
      z-index: 2;
      position: relative;
      width: 100%;
      padding-bottom: 10px;

      &-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: -7px;
        border-radius: 16px;
        background-color: #c1f0ee;
        box-shadow: 2px 2px 5px #aac4df;
        overflow: hidden;

        &-shengxiao {
          font-family: "xique";
          font-size: 240px;
          position: absolute;
          left: -70px;
          top: -40px;
          color: #b8dfe9;
        }
      }

      &-bannerTop {
        position: absolute;
        right: 3px;
        top: -40px;
        height: 40px;
        z-index: -1;
      }

      &-yinyang {
        position: absolute;
        right: 30px;
        top: -34px;

        >img {
          height: 30px;
        }

        .yinyang-content {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          display: flex;

          .yinyang-content-left {
            position: relative;
            width: 50%;
            height: 100%;

            >img {
              height: 30px;
              margin-left: 2px;
            }

            >span {
              position: absolute;
              left: 6px;
              top: 0px;
              font-family: "xique";
              font-size: 20px;
              color: #fff;
            }
          }

          .yinyang-content-right {
            position: relative;
            width: 50%;
            height: 100%;

            >img {
              margin-left: -3px;
              height: 30px;
            }

            >span {
              position: absolute;
              left: 4px;
              top: 0px;
              font-family: "xique";
              font-size: 20px;
              color: #fff;
            }
          }
        }
      }

      &-yearSelect {
        position: relative;
        height: 30px;

        >img {
          height: 100%;
          width: 100%;
          padding-left: 8px;
          padding-right: 8px;
          object-fit: cover;
        }

        .yearSelect-year {
          width: 50%;
          height: 30px;
          position: absolute;
          left: 0;
          top: 0;
          display: flex;
          align-items: center;
          padding-left: 10px;
          line-height: 30px;

          >img {
            height: 10px;
            margin-left: 2px;
          }

          .title {
            color: #fff;
            font-family: "xique";
            font-size: 22px;
          }

          .name {
            color: #fff;
            font-family: "xique";
            font-size: 30px;
            letter-spacing: 2px;
            padding: 0 4px;
            height: 23px;
            line-height: 18px;
          }
        }

        .yearSelect-month {
          width: 50%;
          height: 30px;
          position: absolute;
          right: 0;
          top: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 8px;
          line-height: 30px;

          >img {
            height: 10px;
            margin-right: 4px;
            transform: rotate(180deg);
          }

          .title {
            color: #fff;
            font-family: "xique";
            font-size: 22px;
            margin-bottom: 0;
          }

          .name {
            color: #fff;
            font-family: "xique";
            font-size: 30px;
            letter-spacing: 2px;
            padding: 0 4px;
            height: 23px;
            line-height: 18px;
          }
        }
      }

      .yearSelection {
        position: absolute;
        top: 20px;
        left: 0;
        z-index: 1;

        >img {
          height: 280px;
        }

        .yearSelection-main {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          display: flex;
          justify-content: center;

          ul {
            display: flex;
            width: 60px;
            height: 240px;
            flex-direction: column;
            font-size: 16px;
            margin-top: 16px;
            color: #fff;
            align-items: center;
            font-family: "Microsoft YaHei", "Avenir", Helvetica, Arial,
              sans-serif;
            box-sizing: border-box;
            overflow-y: scroll;

            .yearActive {
              color: #67768c;
            }

            li {
              cursor: pointer;
              line-height: 24px;
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

      .monthSelection {
        position: absolute;
        top: 20px;
        right: 0;
        z-index: 1;

        >img {
          height: 280px;
        }

        .monthSelection-main {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;

          ul {
            display: flex;
            flex-direction: column;
            font-size: 16px;
            color: #fff;
            align-items: center;
            font-family: "Microsoft YaHei", "Avenir", Helvetica, Arial,
              sans-serif;
            padding: 13px;
            box-sizing: border-box;
            height: 100%;
            overflow: hidden;

            .ulactive {
              color: #67768c;
            }

            li {
              cursor: pointer;
              line-height: 20px;
            }
          }
        }
      }

      .weekSelection {
        width: 100%;
        // padding: 0 14px;
        box-sizing: border-box;

        ul {
          position: relative;
          font-size: 12px;
          color: #fff;
          display: flex;
          flex-wrap: nowrap;
          // justify-content: space-between;
          margin: 6px 0;

          li {
            width: calc((100%) / 7);
            display: flex;
            justify-content: center;
          }

          .work {
            width: 26px;
            height: 26px;
            line-height: 26px;
            font-size: 14px;
            border-radius: 50%;
            text-align: center;
            background-color: #9fcbf3;
          }

          .nowork {
            width: 26px;
            height: 26px;
            line-height: 26px;
            font-size: 14px;
            border-radius: 50%;
            text-align: center;
            background-color: #dfb0b9;
          }
        }
      }

      .dateSelection {
        width: 100%;

        ul {
          width: 100%;
          display: flex;
          flex-wrap: wrap;

          li {
            width: calc((100%) / 7);
            height: 42px;
            line-height: 50px;
            text-align: center;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            &:nth-child(7n + 7) {
              margin-right: 0;
            }

            .imgUrl {
              position: relative;
              top: 0.3vh;
              height: 42px;
            }

            .currentImg {
              position: absolute;
              height: 40px;
              left: 0;
              top: -4px;
              display: none;
            }

            .dataTitle {
              position: absolute;
              font-size: 13px;
              width: 100%;
              cursor: pointer;

              .hanziTitle {
                font-size: 13px;
                font-weight: normal;
                display: flex;
                justify-content: center;
              }
            }

            .recordImg {
              height: 12px;
              position: absolute;
              right: 8px;
              top: 4px;
            }

            .recordImgText {
              font-size: 13px;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }

  &-dialog {
    width: 100%;
    height: 100%;
    z-index: 6;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    >img {
      width: 333px;
      height: 477px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &-content {
      width: 333px;
      height: 440px;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      z-index: 7;
      position: relative;

      &-time {
        display: flex;
        width: 100%;
        justify-content: space-around;
        align-items: center;
        color: #fff;
        position: relative;
        line-height: 24px;

        >img {
          height: 24px;
          width: 80%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .taitou-month {
          flex: 1;
          text-align: right;
          height: 100%;
          font-weight: bold;
          font-size: 14px;
          z-index: 1;
        }

        .taitou-year {
          flex: 1;
          height: 100%;
          text-align: center;
          letter-spacing: 2px;
          font-family: "xique";
          font-size: 24px;
          color: #fff;
          z-index: 1;
          line-height: 18px;
        }

        .taitou-week {
          flex: 1;
          text-align: left;
          height: 100%;
          font-weight: bold;
          font-size: 14px;
          z-index: 1;
        }
      }

      &-yiji {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        margin: 10px 0;
        padding-left: 5px;
        padding-right: 5px;

        .yiji-yi {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          font-size: 14px;
          align-items: center;
          color: #df8080;
          font-weight: bold;

          >img {
            width: 30px;
          }

          ul {
            display: flex;
            flex-wrap: wrap;
            padding: 0 16px;
            box-sizing: border-box;

            li {
              flex: 0 0 50%;
              text-align: center;
              line-height: 16px;
            }
          }
        }

        .yiji-jieqi {
          flex: 1;
          font-family: "xique";
          color: #fff;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;

          >img {
            width: 88px;
          }

          .jieriContent-date {
            font-size: 40px;
            position: absolute;
            text-align: center;
            left: 0;
            top: -10px;
            width: 100%;
            text-shadow: 0 0 20px #a3cad3;
          }

          .jieriContent-jieri {
            font-size: 24px;
            position: absolute;
            text-align: center;
            left: 0;
            bottom: 12px;
            width: 100%;
            text-shadow: 0 0 20px #a3cad3;
          }
        }

        .yiji-ji {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          font-size: 14px;
          color: #747d9c;
          align-items: center;
          font-weight: bold;

          >img {
            width: 30px;
          }

          ul {
            display: flex;
            flex-wrap: wrap;
            padding: 0 16px;
            box-sizing: border-box;

            li {
              flex: 0 0 50%;
              text-align: center;
              line-height: 16px;
            }
          }
        }
      }

      &-nongli {
        width: 100%;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        >img {
          width: 85%;
        }

        >span {
          width: 100%;
          color: #fff;
          font-family: "xique";
          position: absolute;
          left: 0;
          top: 0;
          text-align: center;
          font-size: 12px;
          line-height: 12px;
        }
      }

      &-list {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        >img {
          width: 90%;
        }

        &-content {
          width: 90%;
          height: 99%;
          transform: translate(5%);
          position: absolute;
          left: 0;
          top: 0;
          overflow-y: scroll;
          padding: 10px;
          box-sizing: border-box;
          font-size: 16px;
          color: #fff;

          &::-webkit-scrollbar {
            width: 4px;
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
              margin-bottom: 6px;
              line-height: 20px;
              cursor: pointer;

              .diarylist-message-bg {
                height: 18px;
                cursor: pointer;
              }

              .edit {
                height: 12px;
                margin-left: 4px;
                margin-bottom: 3px;
              }

              .delete {
                max-height: 14px;
                max-width: 14px;
                min-height: 8px;
                min-width: 8px;
                object-fit: cover;
                // margin-top: 2px;
                margin-left: 5px;
              }

              .diarylist-messag-text {
                text-align: left;
                margin-left: 6px;
                line-height: 16px;
              }
            }
          }
        }
      }

      &-add {
        margin-top: 0px;
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        >img {
          height: 40px;
        }
      }

      &-del {
        position: absolute;
        right: 16px;
        top: -10px;
        z-index: 1000;

        >img {
          width: 20px;
        }
      }
    }
  }

  &-schedule {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 8;
    display: flex;
    justify-content: center;
    align-items: center;

    >img {
      width: 260px;
    }

    &-content {
      position: absolute;
      width: 240px;
      height: 130px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 12px;
      padding: 0 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;

      &-input {
        position: relative;
        display: flex;
        width: 100%;
        height: 60%;

        .windowclose {
          position: absolute;
          right: -6px;
          top: 0;
          width: 20px;
          cursor: pointer;
        }

        textarea {
          width: 98%;
          height: 100%;
          outline: none;
          border: none;
          background: none;
          color: #fff;
          resize: none;
          font-size: 10px;
          line-height: 14px;
          padding: 6px;
          box-sizing: border-box;

          &::-webkit-scrollbar {
            width: 4px;
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

      .mobile-richeng-confirm {
        width: 46px;
        cursor: pointer;
        margin-top: 18px;
      }
    }
  }
}
</style>
