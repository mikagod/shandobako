<!-- 数测人生 最后生成结论 专用框 -->
<!-- 下滑框 组件 -->
<template>
    <div class="title-font">
        <slot name="header-title"></slot>      
    </div>      

    <div class="container" id="adropdown" :style="{ 
            height: 'auto', 
            backgroundColor: bgColor, 
            paddingBottom: paddingBottom,
        }">
        <div class="Dropdown content-font" 
            :style="{ 
            width: innerWidth,
            height: 'auto',
            padding:  contentPadding,
            overflow: overFlow,
            overflowX: 'hidden'
            }">
            <slot name="fonts">

            </slot>
        </div>
        <slot name="btn"></slot> 
    </div>
</template>

<script lang="js" setup>
import { ref, onMounted } from 'vue'

// 关于水印需要的
import store from "@/store/index.js"; // 导入 状态管理
import localStorageObject from '@/store/localStorageObject.js' // 引入本地存储对象
import { getmark } from '@/util/watermark.ts'
const { watermark } = getmark(); // 水印实例

// 定义 props
const props = defineProps({

    // 内部宽
    innerWidth: {
        type: String,
        required: false,
        default: '100%'
    },

    // 背景色
    bgColor: {
        type: String,
        required: false
    },
    // 底内边距
    paddingBottom: {
        type: String,
        required: false
    },
    // 内容的内边距
    contentPadding: {
        type: String,
        required: false,
        default: '15px',
    },
    // 是否有滑动条
    overFlow: {
        type: String,
        required: false,
        default: 'auto'
    }
})

    //************************************是否加水印************************************************************ */
    onMounted(() => {
      if (localStorageObject.getMemberLevel() <= 1) {
        store.state.watermark = false;
        console.log("用户等级为：", localStorageObject.getMemberLevel());
        console.log("水印是否隐藏：", store.state.watermark);
        watermark("时 空 坐 标 数 测 人 生 系 统 出 品", "adropdown", 0);
      }
    });
      
    
    //********************************************************************************************************* */


</script>

<style scoped>
    /* ***********************打印 */
    @media print {
        .content-font {
            max-width: 210mm; /* A4纸宽 */
            width: 800px;
            position: relative; /* 关键 */
            z-index: 1;
        }
        #adropdown {
            z-index: -1; /* 确保水印层在内容之上 */
            /* position: relative; */
            /* top: 0; */
            /* 让背景也能在打印的时候显示！！！ */
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; /* 确保跨浏览器兼容性 */
        }
    }
    

    /* ***********************自适应 */
    @media screen and (min-width: 1366.98px)   {
        .container {
            width: 1100px;
        }
    }
    @media screen and (min-width: 300px) and (max-width: 1366.97px)   {
        .container {
            width: 88%;
        }
    }
    @media screen and (max-width: 300px)   {
        .container {
            width: 88%;
        }
    }

    /* 套着这一层 */
    .container{
        border-radius: 15px;
        padding: 15px;
    }
    /* 可滚动框样式 */
    .Dropdown {
        width: 100%;
        height: 100%;
        overflow-y: visible;
        padding: 15px;
        box-sizing: border-box; /* 确保内边距不会增加容器的实际大小 */
        /* background-color: thistle; */
    }


    /* 标题文字样式 */
    .title-font {
        font-size: 30px;
        font-family: 'Times New Roman', Times, serif;
        margin: 50px 0 30px 0;
    }
    /* 内容文字样式 */
    .content-font {
        line-height: 2.0;
        margin-top: 0;
        font-size: 18px; /* 固定字体大小 */
    }

    /* 定义滚动条的整体样式 */
    ::-webkit-scrollbar {
        width: 10px; /* 滚动条宽度 */
    }
    /* 定义滚动条轨道的样式 */
    ::-webkit-scrollbar-track {
        background-color: transparent; /* 轨道背景色 */
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

    @media (max-width: 768px) {
        .title-font {
            transform: scale(0.6);
        }

        .content-font {
            font-size: 12px; /* 固定字体大小 */
        }
    }
</style>