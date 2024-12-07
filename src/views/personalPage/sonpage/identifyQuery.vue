<template>
    <div class='myContainer' @click="goto('/identify')">
        <div class="unit">
            <img src="./../../../assets/img/identify/unit-icon.png" alt="">
            <font class="blue">{{ data.whatDo }} </font>
            <font v-if="data.type=='已完成'" class="green"> {{ data.type }} </font>
            <font v-if="data.type=='未完成'" class="red"> {{ data.type }} </font>

        </div>
    </div>
</template>

<script setup>
import { identifyQuery } from "../../../axios/api"

let router = useRouter();
const goto = (path) => router.push(path);
const data = ref(
    {
        whatDo:'',
        type:''
    }
);
    onMounted(
        async ()=>{
            const userPhone = {
                phone: localStorage.getItem('superUserPhone')
            }
            const res = await identifyQuery(userPhone);
            if(res.data.code==0){
                data.value = res.data.data[0];
            }
            console.log(data.value);
        }
    )
</script>
<style lang="scss" scoped>
    .myContainer {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items:flex-start;
        padding-top: 100px;
        .unit{
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #a4a4a4;
            border-radius: 20px;
            width: 600px;
            height: 100px;
            font-size: 19px;
            font-weight:bold ;
        }
        .blue{
            color: #4b63b8;
            margin-left: 10px;
            margin-right: 150px;
        }
        .green{
            color: #1cd95d;
        }

        .red {
          color: #d91c1c;
        }
    }

    @media only screen and (max-width: 940px) {
        .myContainer {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items:flex-start;
        padding-top: 16px;
        width: 100%;
        .unit{
            display: flex;

            justify-content: center;
            align-items: center;
            border: 1px solid #a4a4a4;
            border-radius: 20px;
            width: 80%;
            height: 100px;
            // font-size: 19px;
            font-weight:bold ;
        }
        .blue{
            color: #4b63b8;
            margin-left: 10px;
            white-space: nowrap;
            margin-right: 16px;
            font-size: 16px;
        }
        .green{
            color: #1cd95d;
            white-space: nowrap;
            font-size: 14px;
            margin-right: 16px;
        }

        img{
            width: 88px;
        }
    }
    }
</style>