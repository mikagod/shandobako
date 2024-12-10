<!-- 数选框 组件 -->
<script setup>
// 引入图片
const itemDefaul = new URL('/src/assets/image/img/Property 1=Defaul.png', import.meta.url).href;
const itemVariant = new URL('/src/assets/image/img/Property 1=Variant.png', import.meta.url).href;
// 导入模块
import { reactive, ref, onUnmounted  } from 'vue'
import { useGlobalStore } from '@/stores/global'; // 导入 全局状态管理实例 useGlobalStore
import { useSelectedStore } from '@/stores/MultiSelectArraySelectedStores';
import { useSelected_irrStore } from '@/stores/MultiSelectArray_irrStores';
const global = useGlobalStore();
const selectedStore = useSelectedStore();
const selectedStore_irr = useSelected_irrStore();

// 创建默认图片数组
const itemDefaulArray = reactive(new Array(100).fill(itemDefaul)) 

// 当前选中的项目索引（从0开始）
const selectedIndex = ref(null)
// 所有选中的项目索引数组（从1开始）
const selectedIndices = ref([])

// x-svg 的宽高
const xWidth = ref('25')
const xHeight = ref('25')

    // 根据屏幕尺寸动态调整 
    const resizeSetter = () => {
        if (innerWidth >= 1200) {
            xWidth.value = '25'
            xHeight.value = '25'
        }else if(innerWidth < 1200) {
            xWidth.value = '20'
            xHeight.value = '20'
        }
    }
    resizeSetter() // 初始化时设置一次
    window.addEventListener('resize', resizeSetter) // 监听窗口尺寸变化
    onUnmounted(() => {window.removeEventListener('resize', resizeSetter) }) // 清理窗口尺寸变化事件监听器

// 选中开关
function selectedSwitch(itemIndex) {
    if (selectedIndex.value === itemIndex) {
        // 如果点击的是已选中的项目，则取消选择
        itemDefaulArray[itemIndex] = itemDefaul;
        selectedIndex.value = null;
        // 从 selectedIndices 中移除当前索引（注意索引是从1开始的）
        selectedIndices.value = selectedIndices.value.filter(index => index !== itemIndex + 1);
    } else {
        // 如果点击的是其他项目，则先取消之前的选择
        if (selectedIndex.value !== null) {
            itemDefaulArray[selectedIndex.value] = itemDefaul;
            // 从 selectedIndices 中移除之前的索引（注意索引是从1开始的）
            selectedIndices.value = selectedIndices.value.filter(index => index !== selectedIndex.value + 1);
        }
        // 更新当前选中的项目
        itemDefaulArray[itemIndex] = itemVariant;
        selectedIndex.value = itemIndex;
        // 将新的索引（从1开始）添加到 selectedIndices 中
        selectedIndices.value.push(itemIndex + 1);
    }
    console.log(selectedIndices)
}

// 确认处理
function confirmHandle () {
    
    if (selectedIndices.value.length !== 0) {

        // 选项样式为 未选中
        selectedStore.selectedItems_backup_5 = selectedStore.selectedItems_backup_5.map (item => {
            return item.replace(/\/src\/assets\/image\/img\/font_white\//, '/src/assets/image/img/font_blue/');
        })
        itemDefaulArray[selectedIndex.value] = itemDefaul; // 恢复为未选中图标

        console.log('确定')
        let cicleNumber = selectedIndices.value[0]; // 数值

        // 这里判断是处理 流年运气模块 还是 近期运气模块
        console.log('// 这里判断是处理 流年运气模块 还是 近期运气模块')
        let seqNumber = null
        if (global.luckValue === '流年运气') {
            seqNumber = selectedStore.imgUrlArray.indexOf( encodeURI(global.selectedItems_five[global.selectedItems_five.length - 1]) ) + 1 // 名称
        }else if (global.luckValue === '近期运气') {

            // 取最后选中的选项的编号
            seqNumber = selectedStore_irr.ids[selectedStore_irr.ids.length - 1]
         
        }
        // console.log(global.luckValue)
        // console.log(`*********`, decodeURI(selectedStore.imgUrlArray))
        // console.log(`*********`, global.selectedItems_five[global.selectedItems_five.length - 1] )
        global.selectedItems__Num.push({seqNumber, cicleNumber}); // 添加数据    ***ADD***
        global.showNumSelecte = false // 关闭弹窗
        console.log('添加选项后数组里拥有的对象',global.selectedItems__Num)
    } else {
        alert('请选择数字！')
        console.log('selectedIndices 没值！')
    }
}

// 关闭处理
function closeHandle () {

    global.showNumSelecte = false // 关闭弹窗

    console.log('luckVlaue的值',global.luckValue)

    // 如果是近期运气的话
    if (global.luckValue === '近期运气') {
        // 清空已选列表
        selectedStore_irr.ids.splice(selectedStore_irr.ids.length - 1, 1)
        // 恢复为未选中样式
        selectedStore_irr.to_blue(selectedStore_irr.lastSelectedIndex)
    }

    
    // 如果是流年运气的话
    if (global.luckValue === "流年运气") {
        // 选项样式为 未选中
        selectedStore.selectedItems_backup_5 = selectedStore.selectedItems_backup_5.map (item => {
            return item.replace(/\/src\/assets\/image\/img\/font_white\//, '/src/assets/image/img/font_blue/');
        })
        selectedStore.to_un_5()
        
        selectedStore.isChecked[selectedStore.indexItem] = false // 重置选中状态

        const selectedIndex = selectedStore.selectedItems.indexOf(decodeURIComponent(selectedStore.selectedItems_5[selectedStore.indexItem])); // 获取索引
        selectedStore.selectedItems.splice(selectedIndex, 1); // 删除选中的元素
    }

}

</script>

<template>
    <div v-if="global.showNumSelecte" class="overlay"></div> <!-- 遮罩层 -->
    <div class="numSelectedLi">
        <img class="titleStyle" src="/src/assets/image/img/请选择：.png" alt="图片失效"> 
        <div class="x" @click="closeHandle">
            <span>
                <svg t="1731571476460" class="x-icon" viewBox="0 0 1024 1024" version="1.1" 
                    xmlns="http://www.w3.org/2000/svg" p-id="1642" 
                    :width="xWidth" :height="xHeight">
                    <path d="M867.648 951.296 512 595.648l-355.648 355.648c-11.52 11.52-30.272 11.52-41.856 0L72.64 909.44c-11.52-11.52-11.52-30.272 0-41.856L428.352 512 72.64 156.352c-11.52-11.52-11.52-30.272 0-41.856l41.856-41.856c11.52-11.52 30.272-11.52 41.856 0L512 428.288l355.648-355.648c11.52-11.52 30.272-11.52 41.856 0l41.856 41.856c11.52 11.52 11.52 30.272 0 41.856L595.648 512l355.648 355.648c11.52 11.52 11.52 30.272 0 41.856l-41.856 41.856C897.984 962.88 879.168 962.88 867.648 951.296L867.648 951.296z" p-id="1643" fill="#ffffff"></path>
                </svg>
            </span>
        </div>
        <div class="bg">
            <!-- 正常选项 -->
            <div class="items" v-for="(itemD, itemIndex) in itemDefaulArray" :key="itemIndex">
                <img class='itemImg' :src=itemD @click="selectedSwitch(itemIndex)"/>
                <span class="nums">{{ itemIndex + 1 }}</span>
            </div>
            <!-- 占位选项 -->
            <div class="items" style="height: 0px; width: 100px"></div>
            <div class="items" style="height: 0px; width: 100px"></div>
            <div class="items" style="height: 0px; width: 100px"></div>
            <div class="items" style="height: 0px; width: 100px"></div>
            <div class="items" style="height: 0px; width: 100px"></div>
            <div class="items" style="height: 0px; width: 100px"></div>
        </div>
        <img class="btn" src="/src/assets/image/img/Btn确认.png" alt="图片失效" @click="confirmHandle">
    </div>
</template>

<style scoped>
/* 遮罩层 */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0); /* 可以根据需要调整背景色和透明度 */
    z-index: 999; /* 确保遮罩层位于页面内容之上，但位于数选框组件之下 */
}

img {
    user-select: none;
}
/* 标题 */
.titleStyle {
  margin-bottom: 30px;  
  display: flex;
  position: relative;
}
/* × 按钮 */
.x {
    background-color: #86e1f3;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 60px;
    left: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
}
    .x span {
        user-select: none; /* 禁止选择 */
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .x-icon {
            width: 100%;
            height: 100%;
        }
/* 数选框 */
.numSelectedLi {
    /* 让整体居中 */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* 宽高 */
    width: 800px;
    height: 900px;
    /* 盒子内容的布局 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* 背景 */
    background-image: url("/src/assets/image/img/Bg弹窗.png");
    background-size: 100%; /* 控制背景图片大小 */
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1000; /* 调整数值确保数选框组件位于遮罩层之上 */
}

.bg {
    /* background-color: violet; */
    width: 676px;
    height: 545px;
    overflow: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
.items {
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    position: relative;
    cursor: pointer;
}
/* 选项 */
.itemImg {
    width: 100px;
    height: 110px;
}
/* 数值 */
.nums {
    position: absolute;
    top: 35px;
    color: white;
    font-size: 25px;
    pointer-events: none; /* 禁止点击 */
    user-select: none; /* 禁止选择 */
}
/* 按钮 */
.btn {
    transform: scale(0.8);
    margin-top: 20px;
    margin-bottom: 20px;
}

/* ************************************媒体查询************************************************** */
/* 超大屏幕 > 2560px */
@media screen and (min-width: 2560px) {

}

/* 中屏幕 < 1200px */
@media screen and (max-width: 1200px) {
/* 遮罩层 */
.overlay {
    background-color: rgba(0, 0, 0, 0.3); /* 可以根据需要调整背景色和透明度 */
}
/* 标题 */
.titleStyle {
    margin-top: 50px;  
    margin-bottom: 0px;  
    display: flex;
    position: relative;
    transform: scale(0.6);
}
/* × 按钮 */
.x {
    width: 35px;
    height: 35px;
    top: 53px;
    left: 410px;
}
    .x span {
        font-size: 35px;
        color: white;
    }
        .x-icon {
            margin-bottom: 0;
        }

/* 数选框 */
.numSelectedLi {
    /* 宽高 */
    width: 480px;
    height: 563px;
}
.bg {
/* background-color: violet; */
    width: 372px;
    height: 336px;
}
/* 选项 */
.itemImg {
    width: 71px;
    height: 85px;
}
/* 数值 */
.nums {
    top: 23px;
    font-size: 25px;
}
/* 按钮 */
.btn {
    transform: scale(0.5);
    position: relative;
    top: -30px;
}

}

/* 小屏幕 < 768px */
@media screen and (max-width: 767.98px) {
    /* 遮罩层 */
    .overlay {
        background-color: rgba(0, 0, 0, 0.3); /* 可以根据需要调整背景色和透明度 */
    }
    
    .numSelectedLi {
        transform: scale(0.7) translate(-50%, -50%); /* 整体缩小70% 并保持居中 */
        transform-origin: top left; /* 保持顶部和左侧对齐 */
        position: fixed;
        top: 50%;
        left: 50%;
    }
    .x span {
        font-size: 28px;
        color: white;
    }
        .x-icon {
            margin-bottom: 0;
        }
}

/* ************************************修改滚动条样式********************************************* */
/* 定义滚动条的整体样式 */
::-webkit-scrollbar {
    width: 10px; /* 滚动条宽度 */
}
/* 定义滚动条轨道的样式 */
::-webkit-scrollbar-track {
    background-color: #485fc710; /* 轨道背景色 */
}
/* 定义滑块的样式 */
::-webkit-scrollbar-thumb {
    background-color: #485fc7; /* 滑块颜色 */
    border-radius: 10px; /* 滑块圆角 */
    width: 15px;
    border-right: 5px solid transparent;
}
/* 当鼠标悬停在滑块上时的样式 */
::-webkit-scrollbar-thumb:hover {
    background-color: #6678c7; /* 鼠标悬停时滑块颜色 */
}
/* 隐藏滚动条上的上下箭头按钮 */
::-webkit-scrollbar-button {
    width: 10px; /* 按钮宽度，与滚动条宽度一致 */
    height: 10px; /* 按钮高度，根据需要调整 */
    opacity: 0; /* 使按钮透明 */
}
</style>