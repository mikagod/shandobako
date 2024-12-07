<script setup>
import { reactive } from "vue"
import { getEmaiDetail } from "../../../axios/api";
    //只有定义props了之后，才能在当前组件访问这个props.data属性，如果不访问的话就直接defineProps就好了
    const props = defineProps({
    //子组件接收父组件传递过来的值
    data:undefined,
})
    const details = ref(props.data);
    const activeStyle = reactive(
        {
            'height': 'max-content'
        }
    )
    const currentActive = ref(false);
    const getStyle = () => {
        if(currentActive.value)return activeStyle;
        return null;
    }
    const getDetails = async (id) => {
        currentActive.value = !currentActive.value;
        const res = await getEmaiDetail(id);
        details.value = res.data.data;

    }

  const getDetailsback = async (id) => {
    currentActive.value = !currentActive.value;
    const res = await getEmaiDetail(id);
    details.value = res.data.data;

    if (res.data.data && res.data.data.content && res.data.data.content.length>30) {
      res.data.data.content=  res.data.data.content.substring(0, 30) + "...";
    }
  }
</script>
<template>
    <div class="email-unit">
        <div class="title">
            <img src="./../../../assets/img/personalPage/myEmailUnit/时空坐标Logo.png">
            <span class="titleText">{{ data.sendUserName }}</span>
            <div class="flex-grow" />
            <span class="titleTime">{{ data.createDate }}</span>
            <span v-if="data.state==='未读'" class="titleState">{{ data.state }}</span>
            <span v-if="data.state==='已读'" class="green-titleState">{{ data.state }}</span>

        </div>
        <div class="divider"></div>
        <div class="content" :style="getStyle()">
            <div class="content-title">{{ details.title }}</div>
            <div class="content-text">
              <p class="content-text-p" >
                {{ details.content }}
              </p>
            </div>
            <img class="active-img" v-show="!currentActive" @click="getDetails(details.id)" src="./../../../assets/img/personalPage/myEmailUnit/detail.png">
            <img class="active-img back"  v-show="currentActive" @click="getDetailsback(details.id)" src="./../../../assets/img/personalPage/accountMessage/login_out/back.png">
<!--            <img class="sendImg" :src="details.sendPhoto" v-show="currentActive">-->
        </div>

    </div>
</template>
<style lang="scss" scoped>
@import "./../../../assets/font/font.css";
.email-unit {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: medium;
    line-height: 10px;
    width: 727px;
    margin: 0 auto;
    box-shadow: 0 0 30px 5px #9ed7fd;
    background: white;
    padding-top: 10px;
    padding-bottom: 5px;
    margin-bottom: 30px;
    .title {
        padding-left: 30px;
        padding-right: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 54px;
        margin-bottom: 5px;

        .flex-grow {
            flex-grow: 1;
        }

        .titleText {
            margin-left: 20px;
            font-size: 20px;
            color: #5068ba;
        }

        .titleTime {
            margin-left: 20px;
            font-size: 16px;
            color: #5068ba;
        }

        .titleState {
            margin-left: 20px;
            font-size: 20px;
            color: #ff8a71;
        }

      .green-titleState {
        margin-left: 20px;
        font-size: 20px;
        color: #1cd95d;
      }
    }

    .divider {
        border-top: 1px solid #dce6ff;
        width: 100%;
    }

    .content{
        width: 100%;
        padding-left: 20px;
        padding-right: 20px;
        margin-top: 10px;
            .sendImg{
                position: relative;
            }
            .content-title{
                padding-left: 10px;
                padding-top: 30px;
                text-align: left;
                font-size: 30px;
                font-weight: 100;
            }
            .content-text{
                padding-left: 10px;
                padding-top: 30px;
                padding-bottom: 10px;
                text-align: left;
                font-size: 20px;
                line-height: 20px;
                color: #7c8dcb;
            }
            .content-text-p{
              word-wrap: break-word;
              line-height: 1.5;
            }

            img{
                position: absolute;
                right: -10px;
                bottom: -20px;
            }

            .back{
                width: 50px;
                height: 50px;
                right: 0px;
                bottom: 20px;
            }
    }
}

@media only screen and (max-width: 940px) {
    .email-unit {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: medium;
    line-height: 10px;
    width: 100%;
    margin: 0 auto;
    box-shadow: 0 0 30px 5px #9ed7fd;
    background: white;
    padding-top: 10px;
    padding-bottom: 5px;
    margin-bottom: 30px;
    .title {
        padding-left: 16px;
        padding-right: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 54px;
        margin-bottom: 5px;

        .flex-grow {
            flex-grow: 1;
        }

        .titleText {
            margin-left: 8px;
            font-size: 14px;
            color: #5068ba;
            white-space: nowrap;
            scale: 0.9;
        }

        .titleTime {
            white-space: nowrap;
            margin-left: 20px;
            font-size: 14px;
            color: #5068ba;
            scale: 0.9;
        }

        .titleState {
            margin-left: 8px;
            font-size: 14px;
            color: #ff8a71;
        }
      .green-titleState {
        margin-left: 8px;
        font-size: 14px;
        color: #1cd95d;
      }
        img{
            width: 24px;
        }
    }

    .divider {
        border-top: 1px solid #dce6ff;
        width: 100%;
    }

    .content{
        width: 100%;
        padding-left: 20px;
        padding-right: 20px;
        margin-top: 10px;
            .sendImg{
                position: relative;
            }
            .content-title{
                padding-left: 10px;
                padding-top: 8px;
                text-align: left;
                font-size: 16px;
                font-weight: 100;
            }
            .content-text{
                padding-left: 10px;
                padding-top: 16px;
                padding-bottom: 10px;
                text-align: left;
                font-size: 14px;
                scale: 0.8;
                line-height: 20px;
                color: #7c8dcb;
            }
            .content-text-p{
              word-wrap: break-word;
              line-height: 1.5;
            }
            .active-img{
                width: 80px;
                height: 80px;
                position: absolute;
                right: -10px;
                bottom: 20px;
            }
            .back{
                width: 50px;
                height: 50px;
                right: 0px;
                bottom: 20px;
            }
    }
}
}
</style>