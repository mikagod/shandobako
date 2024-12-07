<script setup>
import store from "./../../../store/index.js";
const props = defineProps(["bill"]);
</script>
<template>
  <div class="bills-unit">
    <el-collapse-item :name="bill.id">
      <template #title>
        <font class="name">{{ bill.productName }}</font>
        <font class="total">{{ bill.payMoney }}</font>
        <font class="type">{{ bill.productType }}</font>
        <font class="time">{{ bill.orderTime }}</font>
        <font class="state">{{ bill.payStatus }}</font>
      </template>
      <span class="bill-content">
        <div class="content-line">
        </div>
        <div class="content-line">
          <span class="content-title">产品名称:</span>
          <span class="content-value">{{ bill.productName }}</span>

          <span class="content-title">付款时间:</span>
          <span class="content-value">{{ bill.payTime ? bill.payTime : "---" }}</span>
        </div>
        <div class="content-line">
          <span class="content-title">订单号码:</span>
          <span class="content-value" style="">
            {{ bill.tradeNo }}
          </span>

          <span class="content-title">支付方式:</span>
          <span class="content-value" style="color:#4d65b9;width: 200px;">
            {{ bill.payMethodType }}
          </span>
        </div>
        <div class="content-line">
          <span class="content-title">SDBK交易号:</span>
          <span class="content-value">{{ bill.sdbknumber }}</span>

          <span class="content-title">购买天数:</span>
          <span class="content-value">{{ bill.dayTimeType }}</span>
        </div>
        <a class="continueVIP" @click="store.state.showGetVIP=true">续费会员</a>
      </span>
    </el-collapse-item>
  </div>
</template>
<style lang="scss" scoped>
@import "./../../../assets/font/font.css";

.bills-unit {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  flex-direction: column;
  padding-left: 30px;
  font-family: medium;
  width: 100%;

  .bill-content {
    padding-left: 20px;

    .continueVIP {
      position: absolute;
      right: 70px;
      color: #4b63b8;
    }

    .content-line {
      flex-basis: 100%;
      /* 独占一行 */
      line-height: 30px;

      .content-title {
        display: inline-block;
        width: 90px;
      }

      .content-value {
        display: inline-block;
        width: 150px;
        margin-left: 10px;
        margin-right: 90px;
      }
    }

    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    font-size: 14px;
    font-weight: 100;
  }

  font {
    width: 150px;
    text-align: center;
  }

  .name {
    font-size: 16px;
    font-weight: 800;
    color: #060606;
  }

  .total {
    font-size: 14px;
    font-weight: 800;
    color: #5068ba;
  }

  .type {
    font-size: 14px;
    font-weight: 800;
    color: #5068ba;
  }

  .time {
    font-size: 14px;
    font-weight: 800;
    color: #060606;
  }

  .state {
    font-size: 16px;
    font-weight: 800;
    color: #48d970;
  }
}

@media only screen and (max-width: 940px) {
  .bills-unit {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0px;
    flex-direction: column;
    padding-left: 30px;
    font-family: medium;
    width: 100%;

    .bill-content {
      width: 100%;
      padding-left: 0px;
      display: flex;
      justify-content: center;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      font-size: 14px;
      font-weight: 100;

      .continueVIP {
        font-size: 14px;
        transform: scale(0.8);
        position: absolute;
        right: 0px;
        color: #4b63b8;
      }

      .content-line {
        flex-basis: 100%;
        /* 独占一行 */
        line-height: 24px;
        display: flex;
        width: 500px;
        .content-title {
          text-align: left;
          display: inline-block;
          width: 10%;
          white-space: nowrap;
          transform: scale(0.8);
        }

        .content-value {
          text-align: left;
          display: inline-block;
          width: 200px;
          overflow: scroll;
          margin-left: 0px;
          margin-right: 0px;
          white-space: nowrap;
          transform: scale(0.8);
        }
      }

      
    }

    font {
      width: 140px;
      text-align: center;
      transform: scale(1.0);
      white-space: nowrap;
    }

    .name {
      font-size: 14px;
      font-weight: 800;
      color: #060606;
    }

    .total {
      width: 50px;
      font-size: 14px;
      font-weight: 800;
      color: #5068ba;
      margin-left: 16px;
    }

    .type {
      width: 50px;
      font-size: 14px;
      font-weight: 800;
      color: #5068ba;
    }

    .time {
      font-size: 14px;
      font-weight: 800;
      color: #060606;
      transform: scale(0.8);
    }

    .state {
      font-size: 14px;
      font-weight: 800;
      color: #48d970;
      padding-left: 24px;
      transform: scale(0.8);
    }
  }
}

@media only screen and (max-width: 750px) {
  .bills-unit {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0px;
    flex-direction: column;
    padding-left: 30px;
    font-family: medium;
    width: 100%;

    .bill-content {
      width: 100%;
      padding-left: 0px;
      display: flex;
      justify-content: center;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      font-size: 14px;
      font-weight: 100;

      .continueVIP {
        font-size: 14px;
        transform: scale(0.6);
        position: absolute;
        right: 0px;
        color: #4b63b8;
      }

      .content-line {
        flex-basis: 100%;
        /* 独占一行 */
        line-height: 24px;
        display: flex;
        width: 347px;
        .content-title {
          text-align: left;
          display: inline-block;
          width: 8%;
          white-space: nowrap;
          transform: scale(0.6);
        }

        .content-value {
          text-align: left;
          display: inline-block;
          width: 200px;
          overflow: scroll;
          margin-left: 0px;
          margin-right: 0px;
          white-space: nowrap;
          transform: scale(0.6);
        }
      }

      
    }

    font {
      width: 70px;
      text-align: center;
      transform: scale(0.8);
      white-space: nowrap;
    }

    .name {
      font-size: 14px;
      font-weight: 800;
      color: #060606;
    }

    .total {
      width: 50px;
      font-size: 14px;
      font-weight: 800;
      color: #5068ba;
      margin-left: 16px;
    }

    .type {
      width: 50px;
      font-size: 14px;
      font-weight: 800;
      color: #5068ba;
    }

    .time {
      font-size: 14px;
      font-weight: 800;
      color: #060606;
      transform: scale(0.6);
    }

    .state {
      font-size: 14px;
      font-weight: 800;
      color: #48d970;
      padding-left: 24px;
      transform: scale(0.6);
    }
  }
}
</style>
