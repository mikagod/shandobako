<!-- 流年运气专用框 -->
<!-- 下滑框 组件 -->
<template>
<div class="title-font">
    <slot name="header-title"></slot>      
</div>      
<div class="container" :style="{ 
        width: width, 
        height: height, 
        backgroundColor: bgColor, 
        paddingBottom: paddingBottom,
    }">
    <div class="Dropdown content-font" 
        :style="{ 
           width: innerWidth,
           height: innerHeight,
           padding:  contentPadding,
           overflow: overFlow,
           overflowX: 'hidden'
        }">
        <slot>

        </slot>
    </div>
    
</div>
</template>

<script lang="js" setup>
import { ref, onMounted } from 'vue'

// 定义 props
const props = defineProps({
    // 宽
    width: {
        type: String,
        required: true
    },
    // 高
    height: {
        type: String,
        required: true
    },
    // 内部宽高
    innerWidth: {
        type: String,
        required: false,
        default: '100%'
    },
    innerHeight: {
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

onMounted(() => {
  // console.log(props.paddingBottom); // 检查传递的 background 值
})

</script>

<style scoped>
    /* 套着这一层 */
    .container{
        border-radius: 15px;
        padding: 15px;
    }
    /* 可滚动框样式 */
    .Dropdown {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
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