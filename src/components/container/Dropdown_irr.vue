<!-- 下滑框 组件 -->
<template>
    <div class="title-font">
        <slot name="header-title"></slot>      
    </div>      
    <div class="irr-container" :style="{ 
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
    import { ref, onMounted, watch } from 'vue'
    import { useSelected_irrStore } from '@/stores/MultiSelectArray_irrStores' // 导入多选列表组件状态管理实例 useSelectedStore
    
    // 获取状态管理实例
    const selectedStore = useSelected_irrStore()

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
    


    // 处理 选项中文字大于8导致的过宽的问题（有效，但不是最好的方法）
    // 窗口变化的时候
    function handle8cnCharItem(){
        if (window.innerWidth >= 768) {
            let container = document.querySelector('.irr-container');
            container.style.transform = 'scale(1.0)';
        }
        // 使用 watch 监听 paths 的变化
        watch(() => selectedStore.paths, (newPaths) => {
            console.log('paths目前的长度：', newPaths.length);

            if (newPaths.length > 0) {
                newPaths.forEach((el, idx) => {
                    // 从路径中提取 中文名
                    const regex = /\/assets\/image\/img\/(font_blue|font_white)\/recent_luck\/([^\/]+)\.png$/;
                    const match = el.match(regex);

                    if (match && match[2]) {
                        const name = match[2];
                        // 如果中文字符数大于8个字，则缩小滑动框
                        if (name.length > 8 && window.innerWidth < 768) {
                            console.log("超过8个字的选项：", name);
                            let container = document.querySelector('.irr-container');
                            container.style.transform = 'scale(0.55)';
                        }
                    }
                });
            }
        }, { deep: true }); // 深度监听数组内部的变化
    }
    onMounted(() => {
        handle8cnCharItem()
        window.addEventListener('resize', handle8cnCharItem);
    })




    
    </script>
    
    <style scoped>
        /* 套着这一层 */
        .irr-container{
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
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: flex-start;
            gap: 14px;
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
            /* 套着这一层 */
            .container{
                transform: scale(0.9);
            }
            .title-font {
                transform: scale(0.6);
            }
    
            .content-font {
                font-size: 12px; /* 固定字体大小 */
            }

            /* 可滚动框样式 */
            .Dropdown {
                gap: 20px;
            }
        }
        @media (max-width: 768px) {
            /* 套着这一层 */
            .container{
                transform: scale(0.8);
            }
        }
    </style>