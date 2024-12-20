<template>
    <p class="has-text-centered">
    <font color="#5f89ff">
    请选择您要决策的大运:
    </font>
    
  <br>
  </p>
    <div class="dayun-card">
        
        <div :class="currentIndex==0?'dayun-card-unit-active':'dayun-card-unit'" @click="select(0)">
        {{ props.dayunArr.one.split(' ')[0] }} &nbsp; {{ props.dayunArr.one.split(' ')[2] }} &nbsp; {{ props.dayunArr.one.split(' ')[4] }}
        </div>
        <div :class="currentIndex==1?'dayun-card-unit-active':'dayun-card-unit'" @click="select(1)">
            {{ props.dayunArr.two.split(' ')[0] }} &nbsp; {{ props.dayunArr.two.split(' ')[2] }} &nbsp; {{ props.dayunArr.two.split(' ')[4] }}

        </div>
        <div :class="currentIndex==2?'dayun-card-unit-active':'dayun-card-unit'" @click="select(2)">
            {{ props.dayunArr.three.split(' ')[0] }} &nbsp; {{ props.dayunArr.three.split(' ')[2] }} &nbsp; {{ props.dayunArr.three.split(' ')[4] }}
        </div>
        <div :class="currentIndex==3?'dayun-card-unit-active':'dayun-card-unit'" @click="select(3)">
            {{ props.dayunArr.four.split(' ')[0] }} &nbsp; {{ props.dayunArr.four.split(' ')[2] }} &nbsp; {{ props.dayunArr.four.split(' ')[4] }}


        </div>
        <div :class="currentIndex==4?'dayun-card-unit-active':'dayun-card-unit'" @click="select(4)">
            {{ props.dayunArr.five.split(' ')[0] }} &nbsp; {{ props.dayunArr.five.split(' ')[2] }} &nbsp; {{ props.dayunArr.five.split(' ')[4] }}


        </div>
        <div :class="currentIndex==5?'dayun-card-unit-active':'dayun-card-unit'" @click="select(5)">
            {{ props.dayunArr.six.split(' ')[0] }} &nbsp; {{ props.dayunArr.six.split(' ')[2] }} &nbsp; {{ props.dayunArr.six.split(' ')[4] }}


        </div>
        <div :class="currentIndex==6?'dayun-card-unit-active':'dayun-card-unit'" @click="select(6)">
            {{ props.dayunArr.seven.split(' ')[0] }} &nbsp; {{ props.dayunArr.seven.split(' ')[2] }} &nbsp; {{ props.dayunArr.seven.split(' ')[4] }}


        </div>
        <div :class="currentIndex==7?'dayun-card-unit-active':'dayun-card-unit'" @click="select(7)">
            {{ props.dayunArr.eight.split(' ')[0] }} &nbsp; {{ props.dayunArr.eight.split(' ')[2] }} &nbsp; {{ props.dayunArr.eight.split(' ')[4] }}


        </div>
        <div :class="currentIndex==8?'dayun-card-unit-active':'dayun-card-unit'" @click="select(8)">
            {{ props.dayunArr.nine.split(' ')[0] }} &nbsp; {{ props.dayunArr.nine.split(' ')[2] }} &nbsp; {{ props.dayunArr.nine.split(' ')[4] }}


        </div>
        <div :class="currentIndex==9?'dayun-card-unit-active':'dayun-card-unit'" @click="select(9)">
            {{ props.dayunArr.ten.split(' ')[0] }} &nbsp; {{ props.dayunArr.ten.split(' ')[2] }} &nbsp; {{ props.dayunArr.ten.split(' ')[4] }}

        </div>
    </div>


</template> 

<script setup>
import { computed, ref, watch, reactive } from 'vue'
import MyItem from './MyItem.vue'
import store from "../store/index.js";

const currentIndex = ref(10);
const dayunArr=ref(
    {
      one: "",
      two: "",
      three: "",
      four: "",
      five: "",
      six: "",
      seven: "",
      eight: "",
      nine: "",
      ten: "",
    }
);
const props = defineProps({
  //子组件接收父组件传递过来的值
  dayunArr:undefined,
})
const select = (index) => {
    currentIndex.value=index;
    if(index==0){store.state.dayunTime=props.dayunArr.one.substr(-2)}
    if(index==1){store.state.dayunTime=props.dayunArr.two.substr(-2)}
    if(index==2){store.state.dayunTime=props.dayunArr.three.substr(-2)}
    if(index==3){store.state.dayunTime=props.dayunArr.four.substr(-2)}
    if(index==4){store.state.dayunTime=props.dayunArr.five.substr(-2)}
    if(index==5){store.state.dayunTime=props.dayunArr.six.substr(-2)}
    if(index==6){store.state.dayunTime=props.dayunArr.seven.substr(-2)}
    if(index==7){store.state.dayunTime=props.dayunArr.eight.substr(-2)}
    if(index==8){store.state.dayunTime=props.dayunArr.nine.substr(-2)}
    if(index==9){store.state.dayunTime=props.dayunArr.ten.substr(-2)}
    console.log(store.state.dayunTime);
    emit("getValue", currentIndex);
}
const emit = defineEmits(["getValue"])

</script>

<style scoped>

.dayun-card {
    padding: 10px 10px 10px 10px;
    width: 390px;
    height:440px;
    border-radius: 30px;
    background: #eaf8ff;
    margin: 0 auto;
    text-align: center;
}
.dayun-card-unit{
    width: 360px;
    font-size: 20px;
    font-weight:500;
    color: rgb(98, 97, 97);
    background-color: #eaf8ff;
    height: 40px;
    border-radius: 50px;
    margin-top: 2px;
    margin-left: 6px;
    padding-top: 3px;
}
.dayun-card-unit:hover {
    background-color: aquamarine;
    border: 1px dashed rgb(0, 0, 0);
    margin-top: 2px;
    margin-left: 6px;

}


.dayun-card-unit-active{
    color: white;
    width: 270px;
    font-size: 15px;
    background-color: #bdbfff;
    height: 40px;
    border-radius: 50px;
    border: 1px dashed rgb(0, 0, 0);
    margin-left: 6px;
    margin-top: 2px;
    padding-top: 3px;

}

@media screen and (max-width: 768px) {
    .dayun-card {
        width: 300px;
    }
    .dayun-card-unit{
        width: 270px;
        font-size: 15px;
    }
}
</style>