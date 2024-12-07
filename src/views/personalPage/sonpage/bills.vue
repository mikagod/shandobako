<template>
  <el-container class="container">
    <el-header>
      <div class="top">
        <font class="font">订单名称</font>
        <font class="font">订单金额</font>
        <font class="font">订单类型</font>
        <font class="font">下单时间</font>
        <font class="font">订单状态</font>
      </div>
    </el-header>
    <el-main class="bills-list">
      <el-collapse>
        <billsUnit v-for="bill in billsList" :key="bill.orderId" :bill="bill" />
      </el-collapse>
      <div class="phone-bottom">
        <img src="./../../../assets/img/personalPage/bills/上一页.png"
          @click="billsCondition.pageNum > 1 ? billsCondition.pageNum-- : haha()">
        <span class="page" v-for="(page, index) in pageArr" :key="index" @click="billsCondition.pageNum = page">
          {{ page }}
        </span>
        <img src="./../../../assets/img/personalPage/bills/下一页.png"
          @click="billsCondition.pageNum < pageArr.length ? billsCondition.pageNum++ : haha()">
      </div>
    </el-main>
    <div class="bottom">
      <img src="./../../../assets/img/personalPage/bills/上一页.png"
        @click="billsCondition.pageNum > 1 ? billsCondition.pageNum-- : haha()">
      <span class="page" v-for="(page, index) in pageArr" :key="index" @click="billsCondition.pageNum = page">
        {{ page }}
      </span>
      <img src="./../../../assets/img/personalPage/bills/下一页.png"
        @click="billsCondition.pageNum < pageArr.length ? billsCondition.pageNum++ : haha()">
    </div>
  </el-container>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { message } from 'ant-design-vue'
import { getBills } from "../../../axios/api";
import billsUnit from "./bills-unit.vue";
const billsList = ref();
const pageArr = ref([]);
const billsCondition = reactive({
  pageNum: 1,
  phone: localStorage.getItem("superUserPhone"),
  pageSize: 10,
});
onMounted(async () => {
  const res = await getBills(billsCondition);
  billsList.value = res.data.data.data;
  pageArr.value.length = res.data.data.pageSizes;
  for (var i = 0; i < res.data.data.pageSizes; i++) {
    pageArr.value[i] = i + 1;
  }
});
watch(
  billsCondition,
  async () => {
    const res = await getBills(billsCondition);
    billsList.value = res.data.data.data;
  }
)
const haha = () => {
  message.error("不能再翻页了！")
}
</script>

<style lang="scss" scoped>
@import "./../../../assets/font/font.css";

.container {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  flex-direction: column;
  align-items: center;
  transform: scale(1);

  .top {
    border: 3px solid #89fef6;
    border-radius: 20px;
    width: 100%;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    .font {
      color: #3dccff;
      font-size: 23px;
      padding: 24px;
      font-family: medium;
    }
  }
  .phone-bottom{
    display: none;
  }

  .bottom {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;

    .page {
      color: #4b63b8;
      font-size: 18px;
      font-family: "medium";
      display: flex;
      align-items: center;
      margin: 5px;
      cursor: pointer;
    }

    img {
      cursor: pointer;
    }
  }

  .bills-list {
    /* 隐藏默认滚动栏 */
    scrollbar-width: none;
    -ms-overflow-style: none;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 0px;

    .el-collapse {
      height: 780px;
      border-bottom: none;
    }

    /* 定义滚动栏样式 */
    &::-webkit-scrollbar {
      width: 8px;
      margin-left: -20px;
      /* 向左移动10px */
    }

    &::-webkit-scrollbar-track {
      margin-top: 50px;
      margin-bottom: 50px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #57e9f4;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #57e9f4;
    }
  }
}

// @media only screen and (max-width: 940px) {
//   .right{
//     width: 100%;
//   }
// }

@media only screen and (max-width: 940px) {
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    flex-direction: column;
    align-items: center;
    transform: scale(1);
    width: 100%;

    .el-header {
      width: 100%;
      padding: 0 8px 0 8px;
    }

    .top {
      border: 3px solid #89fef6;
      border-radius: 20px;
      width: 100%;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;

      .font {
        color: #3dccff;
        font-size: 18px;
        padding: 16px;
        font-family: medium;
      }
    }

    .bottom{
      display: none;
    }

    .phone-bottom {
      height: 20px;
      margin-bottom: 56px;
      margin-top: 16px;
      left: 50%;
      // transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;

      .page {
        color: #4b63b8;
        font-size: 14px;
        font-family: "medium";
        display: flex;
        align-items: center;
        margin: 5px;
        cursor: pointer;
      }

      img {
        cursor: pointer;
      }
    }

    .bills-list {
      /* 隐藏默认滚动栏 */
      scrollbar-width: none;
      -ms-overflow-style: none;
      width: 100%;
      margin-top: 0px;
      margin-bottom: 50px;
      

      .el-collapse {
        height: auto;
      }

      /* 定义滚动栏样式 */
      &::-webkit-scrollbar {
        width: 8px;
        margin-left: -20px;
        /* 向左移动10px */
      }

      &::-webkit-scrollbar-track {
        margin-top: 50px;
        margin-bottom: 50px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #57e9f4;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: #57e9f4;
      }
    }
  }
}

@media only screen and (max-width: 750px) {
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    flex-direction: column;
    align-items: center;
    transform: scale(1);
    width: 100%;

    .el-header {
      width: 100%;
      padding: 0 8px 0 8px;
    }

    .top {
      border: 3px solid #89fef6;
      border-radius: 20px;
      width: 100%;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;

      .font {
        color: #3dccff;
        font-size: 10px;
        padding: 8px;
        font-family: medium;
      }
    }

    .bottom{
      display: none;
    }

    .phone-bottom {
      height: 20px;
      margin-bottom: 56px;
      margin-top: 16px;
      left: 50%;
      // transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;

      .page {
        color: #4b63b8;
        font-size: 14px;
        font-family: "medium";
        display: flex;
        align-items: center;
        margin: 5px;
        cursor: pointer;
      }

      img {
        cursor: pointer;
      }
    }

    .bills-list {
      /* 隐藏默认滚动栏 */
      scrollbar-width: none;
      -ms-overflow-style: none;
      width: 100%;
      margin-top: 0px;
      margin-bottom: 50px;
      

      .el-collapse {
        height: auto;
      }

      /* 定义滚动栏样式 */
      &::-webkit-scrollbar {
        width: 8px;
        margin-left: -20px;
        /* 向左移动10px */
      }

      &::-webkit-scrollbar-track {
        margin-top: 50px;
        margin-bottom: 50px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #57e9f4;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: #57e9f4;
      }
    }
  }
}
</style>
