<script setup>
    import { ref,onUnmounted  } from 'vue' // 导入vue相关的方法
    import { useGlobalStore } from '@/stores/global'; // 全局状态管理实例 useGlobalStore
    import { useRouter } from 'vue-router'; // 导入路由 useRouter
    const nextStepBtn =  new URL('/src/assets/image/img/Btn下一步.png', import.meta.url).href;// 导入“下一步”图片
    // 引入 流年运气 和 近期运气 未选 和 已选 状态的按钮图片
    const catButtonDefLeftImg =  new URL('/src/assets/image/img/流年运气Def.png', import.meta.url).href;
    const catButtonDefRightImg = new URL('/src/assets/image/img/近期运气Def.png', import.meta.url).href;
    const catButtonHoverLeftImg =  new URL('/src/assets/image/img/流年运气Hover.png', import.meta.url).href;
    const catButtonHoverRightImg =  new URL('/src/assets/image/img/近期运气Hover.png', import.meta.url).href;
    import Background from '@/components/container/bg.vue' // 导入背景组件 
    import Dropdown from '@/components/container/Dropdown.vue' // 导入下拉框组件

    // dropdown 组件的宽度和高度
    const dropdownComponentWidth = ref('600px') 
    const dropdownComponentHeight = ref('900px') 
    // 根据屏幕尺寸动态设置 Dropdown组件的宽度和高度
    const resizeSetter = () => {
      if (window.innerWidth >= 1200) {
        dropdownComponentWidth.value = '1100px'
        dropdownComponentHeight.value = '700px'
      } else if (window.innerWidth <= 767.98) {
        dropdownComponentWidth.value = '90%'
        dropdownComponentHeight.value = '700px'
      } else {
        dropdownComponentWidth.value = '500px'
        dropdownComponentHeight.value = '700px'
      }
    }
    resizeSetter() // 初始化时设置一次
    window.addEventListener('resize', resizeSetter) // 监听窗口尺寸变化
    onUnmounted(() => {window.removeEventListener('resize', resizeSetter) }) // 清理窗口尺寸变化事件监听器



    // 决定 流年运气 和 近期运气 按钮 是否被选中 的状态
    const catButtonLeft = ref(catButtonHoverLeftImg) // 默认未选中
    const catButtonRight = ref(catButtonHoverRightImg) // 默认未选中
    const showSelectedLeft = ref(false) // 左边 是否显示选中字幕
    const showSelectedRight = ref(false) // 右边 是否显示选中字幕

    const global = useGlobalStore(); // 全局状态管理实例
    const router = useRouter(); // 获取路由器实例

    global.luckValue = '' // 清空（初始化） 运气值
    global.showWhiteBG = true; // 让白色下背景显示

    // 按钮处理 流年运气
    function catButtonLeftHandle() {
        if (catButtonLeft.value === catButtonHoverLeftImg) {
            // 如果左侧按钮当前显示的是默认图片
            catButtonLeft.value = catButtonDefLeftImg; // 切换左侧按钮为选中状态的图片
            showSelectedLeft.value = true; // 设置左侧按钮为已选中状态

            // 如果右侧按钮当前是选中状态
            if (showSelectedRight.value) {
            catButtonRight.value = catButtonHoverRightImg; // 将右侧按钮恢复为默认图片
            showSelectedRight.value = false; // 设置右侧按钮为未选中状态
            }
            global.luckValue = '流年运气';
        } else {
            // 如果左侧按钮当前显示的是选中状态的图片
            catButtonLeft.value = catButtonHoverLeftImg; // 将左侧按钮恢复为默认图片
            showSelectedLeft.value = false; // 设置左侧按钮为未选中状态
            global.luckValue = '';
        }
    }
    // 按钮处理 近期运气
    function catButtonRightHandle() {
        if (catButtonRight.value === catButtonHoverRightImg) {
            // 如果右侧按钮当前显示的是默认图片
            catButtonRight.value = catButtonDefRightImg; // 切换右侧按钮为选中状态的图片
            showSelectedRight.value = true; // 设置右侧按钮为已选中状态

            // 如果左侧按钮当前是选中状态
            if (showSelectedLeft.value) {
            catButtonLeft.value = catButtonHoverLeftImg; // 将左侧按钮恢复为默认图片
            showSelectedLeft.value = false; // 设置左侧按钮为未选中状态
            }
            global.luckValue = '近期运气';
        } else {
            // 如果右侧按钮当前显示的是选中状态的图片
            catButtonRight.value = catButtonHoverRightImg; // 将右侧按钮恢复为默认图片
            showSelectedRight.value = false; // 设置右侧按钮为未选中状态
            global.luckValue = '';
        }
    }

    // 监听按钮点击事件（入口）
    function handleNextStepBtn(event) {
        if (global.luckValue === '') {
            event.preventDefault(); // 阻止默认行为
            alert('至少选择1个！');
        } else {
            // 如果条件满足，允许跳转
            console.log(`pinia里的luckValue状态为：`,global.luckValue);
            router.push('/luckAnalysis4'); // 使用路由器实例进行跳转
        }
    }


</script>

<template>
<body>

    <!-- ********************大盒子******************** -->
    <Background>
            <!-- 页面3 -->
            <template #page>
            <div class="page page-direction">
                <Dropdown :width=dropdownComponentWidth :height=dropdownComponentHeight :paddingBottom="'200px'">
                <template #header-title>
                    <img src="/src/assets/image/img/请选择：.png" alt="图片失效">
                </template>
                <div style="
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    width: 100%; 
                    height: 100%;
                ">
                <div class="page-container">
                    <div class="row-two-box">
                        <div class="column-two-box" @click="catButtonLeftHandle()">
                            <img class="cat_botton" :src=catButtonLeft alt="图片失效">
                        </div>
                        <span class="selected-font">
                            <img v-if="showSelectedLeft" class="font-img" src="/src/assets/image/img/Frame 36.png" alt="">
                        </span>
                    </div>
                    <div class="row-two-box">
                        <div class="column-two-box" @click="catButtonRightHandle">
                            <img class="cat_botton" :src=catButtonRight alt="图片失效">
                        </div>
                        <span class="selected-font">
                            <img v-if="showSelectedRight" class="font-img" src="/src/assets/image/img/Frame 36.png" alt="">
                        </span>
                    </div>
                </div>
                </div>
                </Dropdown>
            </div>
            </template>
            <!-- 按钮区 -->
            <template #btn>
                <div @click="handleNextStepBtn" style="z-index: 10; /* 被未知盒子覆盖了，所以得让它优先级为10，这样才能触发点击事件 */ display: flex; justify-content: center; align-items: center;">
                    <img class="btn" :src="nextStepBtn" alt="图片失效">
                </div>
            </template>
    </Background>
    <!-- ********************/大盒子******************** -->


</body>
</template>

<style scoped>
img {
    user-select: none;
}
/* 页面内容 */
.page-container {
    display: flex;
    width: 80%;
    height: 350px;
}
    .row-two-box {
        flex: 2;
        display: flex;
        flex-direction: column;
        /* background-color: rebeccapurple; */
    }
        .column-two-box {
            flex: 3.2;
            /* background-color: salmon; */
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .selected-font {
            flex: 0.7;
            /* background-color: slateblue; */
            display: flex;
            justify-content: center;
            align-items: center;
        }	
            .font-img {
                width: 100px;
                height: 26px;
            }


    /* 页面宽高 */
    .page {
        width: 1450px;
        height: 560px;
        margin-bottom: 40px;
    }
    .page-direction {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* 按钮 */	
    .btn {
        width: 100%;
        height: 100%;
        margin: 65px 0;
        user-select: none;
        pointer-events: none;
    }

  /* ********************媒体查询 */

    /* 超大屏幕 > 2560px */
    @media screen and (min-width: 2560px) {
      .page {
        width: 1200px;
      }
    }

    
    /* 中屏幕 < 1200px */
    @media screen and (max-width: 1200px) {
        /* 按钮 */
        .btn {
        margin: 50px 0;
        }
        
        /* 页面内容 */
        .page-container {
            width: 1000px;
            height: 280px;
        }
        .cat_botton {
            width: 200px;
            height: 200px;
        }
    }

    /* 小屏幕 < 768px */
    @media screen and (max-width: 767.98px) {
        /* 页面 */
        .page {
            height: 500px;
        }
        
        /* 按钮 */
        .btn {
            width: 50%;
            height: 50%;
            margin: 50px 0;
        }

        /* 页面内容 */
        .page-container {
            width: 350px;
            height: 200px;
            padding-bottom: 190px;
        }
        .cat_botton {
            width: 160px;
            height: 175px;
        }

        /* 选中 图标 */
        .font-img {
            width: 76px;
            height: 20px;
        }
    } 
</style>