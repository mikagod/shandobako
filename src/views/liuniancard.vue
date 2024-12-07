<template>
    <div class="liunian-card">
        <span :class="currentIndex==0?'liunian-card-unit-active':'liunian-card-unit'" @click="select(0)">
        {{ props.liunianArr.one.split(' ')[0]}} &nbsp;&nbsp;&nbsp; <span class="liunian-card-bazi">{{ props.liunianArr.one.split(' ')[1]}}</span>
        </span>
        <span :class="currentIndex==1?'liunian-card-unit-active':'liunian-card-unit'" @click="select(1)">
              {{ props.liunianArr.two.split(' ')[0]}} &nbsp;&nbsp;&nbsp; <span class="liunian-card-bazi">{{ props.liunianArr.two.split(' ')[1]}}</span>
        </span>
        <span :class="currentIndex==2?'liunian-card-unit-active':'liunian-card-unit'" @click="select(2)">
            {{ props.liunianArr.three.split(' ')[0]}} &nbsp;&nbsp;&nbsp; <span class="liunian-card-bazi">{{ props.liunianArr.three.split(' ')[1]}}</span>
        </span>
        <span :class="currentIndex==3?'liunian-card-unit-active':'liunian-card-unit'" @click="select(3)">
          {{ props.liunianArr.four.split(' ')[0]}} &nbsp;&nbsp;&nbsp; <span class="liunian-card-bazi">{{ props.liunianArr.four.split(' ')[1]}}</span>
        </span>
        <span :class="currentIndex==4?'liunian-card-unit-active':'liunian-card-unit'" @click="select(4)">
          {{ props.liunianArr.five.split(' ')[0]}} &nbsp;&nbsp;&nbsp; <span class="liunian-card-bazi">{{ props.liunianArr.five.split(' ')[1]}}</span>
        </span>
        <span :class="currentIndex==5?'liunian-card-unit-active':'liunian-card-unit'" @click="select(5)">
             {{ props.liunianArr.six.split(' ')[0]}} &nbsp;&nbsp;&nbsp; <span class="liunian-card-bazi">{{ props.liunianArr.six.split(' ')[1]}}</span>
        </span>
        <span :class="currentIndex==6?'liunian-card-unit-active':'liunian-card-unit'" @click="select(6)">
              {{ props.liunianArr.seven.split(' ')[0]}} &nbsp;&nbsp;&nbsp; <span class="liunian-card-bazi">{{ props.liunianArr.seven.split(' ')[1]}}</span>
        </span>
        <span :class="currentIndex==7?'liunian-card-unit-active':'liunian-card-unit'" @click="select(7)">
             {{ props.liunianArr.eight.split(' ')[0]}} &nbsp;&nbsp;&nbsp; <span class="liunian-card-bazi">{{ props.liunianArr.eight.split(' ')[1]}}</span>
        </span>
        <span :class="currentIndex==8?'liunian-card-unit-active':'liunian-card-unit'" @click="select(8)">
             {{ props.liunianArr.nine.split(' ')[0]}} &nbsp;&nbsp;&nbsp; <span class="liunian-card-bazi">{{ props.liunianArr.nine.split(' ')[1]}}</span>
        </span>
        <span :class="currentIndex==9?'liunian-card-unit-active':'liunian-card-unit'" @click="select(9)">
               {{ props.liunianArr.ten.split(' ')[0]}} &nbsp;&nbsp;&nbsp; <span class="liunian-card-bazi">{{ props.liunianArr.ten.split(' ')[1]}}</span>
        </span>
    </div>


</template> 

<script setup>
import { computed, ref, watch, reactive } from 'vue'
import MyItem from './MyItem.vue'
import store from "../store/index.js";

const currentIndex = ref(10);
const liunianArr=ref(
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
  liunianArr:undefined,
})

const select = (index) => {
    currentIndex.value=index;
  if(index==0){store.state.liunianTime=props.liunianArr.one.substr(-2)}
  if(index==1){store.state.liunianTime=props.liunianArr.two.substr(-2)}
  if(index==2){store.state.liunianTime=props.liunianArr.three.substr(-2)}
  if(index==3){store.state.liunianTime=props.liunianArr.four.substr(-2)}
  if(index==4){store.state.liunianTime=props.liunianArr.five.substr(-2)}
  if(index==5){store.state.liunianTime=props.liunianArr.six.substr(-2)}
  if(index==6){store.state.liunianTime=props.liunianArr.seven.substr(-2)}
  if(index==7){store.state.liunianTime=props.liunianArr.eight.substr(-2)}
  if(index==8){store.state.liunianTime=props.liunianArr.nine.substr(-2)}
  if(index==9){store.state.liunianTime=props.liunianArr.ten.substr(-2)}
    emit("getValue", currentIndex);
}
const emit = defineEmits(["getValue"])


</script>

<style scoped>

.liunian-card-unit-active .liunian-card-bazi{
    font-size: 17px;
    color: #b581ea;
}
.liunian-card-unit .liunian-card-bazi{
    font-size: 17px;
    color:  rgb(107, 107, 107); 
}

.liunian-card {
    padding: 10px 5px 5px 5px;
    width: 300px;
    height:230px;
    border-radius: 30px;
    text-align: center;
    background: #defff2;
    margin: 0 auto;
}
.liunian-card-unit{
    color: rgb(107, 107, 107);
    display: inline-block;
    font-weight: 400;
    width: 130px;
    height: 40px;
    font-size: 20px;
    background-color: #defff2;
    border-radius: 50px;
    margin-bottom: 1px;
    margin-right: 5px;
    padding-bottom: 2px;
}
.liunian-card-unit:hover {
    background-color: #ffffff;
    color: #b581ea;
    margin-bottom: 0.5px;

    border: 1px dashed rgb(0, 0, 0);
}
.liunian-card-unit:hover .liunian-card-bazi{
    color: #b581ea;
}


.liunian-card-unit-active{
    color: #b581ea;
    display: inline-block;
    margin-right: 5px;

    font-weight: 400;
    width: 130px;
    height: 40px;
    font-size: 20px;
    background-color: #ffffff;
    border-radius: 50px;
    border: 1px dashed rgb(0, 0, 0);
    margin-top: 0px;
}
</style>