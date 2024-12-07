<!-- 多选框 组件 -->
<script setup>
import { ref, onMounted, watch } from 'vue';
import { useGlobalStore } from '@/stores/global'; // 导入 全局状态管理实例 useGlobalStore
import { useSelectedStore } from '@/stores/MultiSelectArraySelectedStores';

// emit
const emit = defineEmits(['updateSelectedItems', 'indexSelectedItem']);

// props
const props = defineProps({
    // 图片数组（未选、已选）
    imgUrlArray: {
        type: Array,
        required: true,
    },
    imgUrlArray_Selected: {
        type: Array,
        required: true,
    },
    // 可选小盒子背景色
    bgColor: {
        type: String,
        required: false,
        default: '#e3fdfe'
    },
    // 被选小盒子背景色
    bgCheckedColor: {
        type: String,
        required: false,
        default: '#00d0d4'
    },
    // 小盒子宽
    itemWidth: {
        type: String,
        required: false,
        default: '330px'
    },
    // 小盒子高
    itemHeight: {
        type: String,
        required: false,
        default: '85px'
    },
    // 小盒子圆角
    itemBorderRadius: {
        type: String,
        required: false,
        default: '15px'
    },
    // 小盒子之间内边距
    itemGap: {
        type: String,
        required: false,
        default: '30px'
    },
    // 决定是否显示必选小盒子
    requiredIcon: {
        type: Boolean,
        required: false,
        default: false
    },
    // 决定能选的元素的个数
    selectedItemsLen: {
        type: Number,
        required: false,
        default: 6
    },
    // 选中图标的宽、高
    iconMainWidth: {
        type: String,
        required: false,
        default: 'auto'
    },
    iconMainHeight: {
        type: String,
        required: false,
        default: 'auto'
    },
    iconMainMargin : {
        type: String,
        required: false,
        default: '0 10px'
    },
    // 主要图片的宽、高
    imgMainWidth: {
        type: String,
        required: false,
        default: 'auto'
    },
    imgMainHeight: {
        type: String,
        required: false,
        default: 'auto'
    },
});



const global = useGlobalStore(); // 全局状态管理实例
const selectedStore = useSelectedStore();



onMounted(() => {
    selectedStore.isChecked = props.imgUrlArray.map(() => false); // 初始化选中状态数组，皆为false
});


// 监听选中状态的变化，并做对应操作
function toggleCheck(index) {
    console.log(`点击了索引 ${index}`); // 添加调试信息

    // 切换选中状态
    selectedStore.isChecked[index] = !selectedStore.isChecked[index]; 
    console.log(`选中状态:`, selectedStore.isChecked);

    // 当前项被选中
    if (selectedStore.isChecked[index]) {

        // 如果选中项的数量超过最大数量限制
        if (selectedStore.selectedItems.length >= props.selectedItemsLen) {
            alert("只能选" + props.selectedItemsLen + "个！");
            // 恢复选中状态
            selectedStore.isChecked[index] = false;
            return;
        } else {
            // 索引 给过去，放这里是防止点一下索引就变一下，就多一个索引，导致列表错乱
            selectedStore.indexItem = index;


            // 把选中元素名添加到数组中
            let newPath = decodeURIComponent(props.imgUrlArray[index]); // 新路径
            selectedStore.selectedItems.push(newPath); // 把选中元素名添加到数组中
            console.log('添加选项后的内容:', selectedStore.selectedItems, `55555`);


            // 更换样式
            if (global.pageNum === '5') {
                selectedStore.to_hv_5();
            } else {
                selectedStore.to_hv(); // 换成已选样式
            }



            // 如果是第5页的操作
            if (global.pageNum === '5') {
                console.log('页数5');
                global.showNumSelecte = true; // 显示数选框
                console.log(selectedStore.indexItem, '索引');
            }
        }

    // 当前项取消选中
    } else {
        // 索引 给过去，放这里是防止点一下索引就变一下，就多一个索引，导致列表错乱
        selectedStore.indexItem = index;


        // 从数组中删除选中元素
        const selectedIndex = selectedStore.selectedItems.indexOf(decodeURIComponent(props.imgUrlArray[index])); // 获取索引
        selectedStore.selectedItems.splice(selectedIndex, 1); // 删除选中的元素
        console.log('取消选项后的内容:', selectedStore.selectedItems, `66666`);


        // 更换样式
        if (global.pageNum === '5') {
            selectedStore.to_un_5();
        } else {
            selectedStore.to_un(); // 换成已选样式
        }



        // 如果是第5页的操作（取消的时候，删除数组里的对象）
        if (global.pageNum === '5') {
            global.showNumSelecte = false; // 隐藏数选框
            // 删除数组里的对象
            let targetValue = selectedStore.imgUrlArray.indexOf(encodeURI( props.imgUrlArray[index] ))+1; // 目标值

            for (let i = 0; i < global.selectedItems__Num.length; i++) {
                // 因为 global.selectedItems__Num[i].name 是一个 白色字体 路径，所以要去掉font_selectedColor来判断是否相等
                // console.log(global.selectedItems__Num[i].seqNumber,"\n", targetValue)
                if (global.selectedItems__Num[i].seqNumber === targetValue) {
                    console.log('取消选项后数组里拥有的对象：', global.selectedItems__Num);
                    global.selectedItems__Num.splice(i, 1); // 删除目标对象
                    break; // 找到并删除后退出循环
                }
            }

        }
    }

    // 发送事件到父组件 已选的元素
    emit('updateSelectedItems', selectedStore.selectedItems);
}




</script>

<template>
<!-- 大盒子 -->
<div class="bigBox" 
    :style="{
        gap:itemGap,
    }"
    >
    <!-- 可选小盒子 -->
    <div
        class="items"
        v-for="(imgUrl, index) in imgUrlArray" :key="index"
        :style="{
            backgroundColor: selectedStore.bgColorItem[index],
            width: itemWidth,
            height: itemHeight,
            borderRadius: itemBorderRadius,
        }"
        @click="toggleCheck(index)"
        >
            <!-- 选中状态图标 -->
            <img :src='selectedStore.chooseIcon[index]' alt="图片失效" class="icon-img"
            :style="{
                width: iconMainWidth,
                height: iconMainHeight,
                margin: iconMainMargin,
            }"
            >
            <!-- 文字图标 -->
            <div class="font-item">
                <img :src="imgUrl" alt="图片失效" class="font-img"
                :style="{
                    width: imgMainWidth,
                    height: imgMainHeight,
                }"
                >
            </div>
    </div>
    <!-- 必选小盒子 -->
     <div
        class="items"
        :style="{
            backgroundColor:'#f4edff',
            width: itemWidth,
            height: itemHeight,
            borderRadius: itemBorderRadius,
        }"
        v-if="requiredIcon"
     >
            <!-- 必选状态图标 -->
            <img src="/src/assets/image/img/必选.png" alt="图片失效" class="icon-img"
            :style="{
                width: iconMainWidth,
                height: iconMainHeight,
                margin: iconMainMargin,
            }"
            >
            <!-- 文字图标 -->
            <div class="font-item">
                <img src="/src/assets/image/img/人工咨询服务.png" alt="图片失效" class="font-img"
                :style="{
                    width: imgMainWidth,
                    height: imgMainHeight,
                }">
            </div>
     </div>
    <!-- 占位小盒子 -->
    <div class="items" :style="{ height: '0', width: itemWidth, }"></div>
    <div class="items" :style="{ height: '0', width: itemWidth, }"></div>
    <div class="items" :style="{ height: '0', width: itemWidth, }"></div>
    <div class="items" :style="{ height: '0', width: itemWidth, }"></div>
    <div class="items" :style="{ height: '0', width: itemWidth, }"></div>
    <div class="items" :style="{ height: '0', width: itemWidth, }"></div>
</div>

</template>

<style lang="css" scoped>

img {
    user-select: none;
    pointer-events: none;
}
/* 大盒子 */
.bigBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
    /* 小盒子 */
    .items {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        

    }
        .font-item {
            /* width: 100%; */
            display: flex;
            justify-content: center;
        }
        /* .items .icon-img {
            margin: 0 10px;
        } */
            .font-img {
                margin-right: 10px;
            }
</style>