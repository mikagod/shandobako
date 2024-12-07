<!-- 背景组件 -->

<script setup>
import { ref, onUnmounted } from 'vue';
import { useGlobalStore } from '@/stores/global';
const global = useGlobalStore(); // 全局状态

// props
const props = defineProps({
  bgPosition: {
    type: String,
    required: false,
    default: 'left center, right center'
  },
  bgSize: { 
    type: String,
    required: false,
    default: 'auto 100%'
  },
});

// 响应式数据
const computedBgPosition = ref(props.bgPosition);
const computedBgSize = ref(props.bgSize);

// 根据屏幕尺寸动态设置背景位置和大小
const resizeSetter = () => {
    if (window.innerWidth > 767.98 && window.innerWidth <= 1200) {
        computedBgPosition.value = 'left top, right top';
        computedBgSize.value = '30rem 30rem';
    } else if (window.innerWidth <= 767.98) {
        computedBgPosition.value = 'left top';
        computedBgSize.value = 'auto 90%';
    }
};

// 初始化时设置一次
resizeSetter()

// 监听窗口尺寸变化
window.addEventListener('resize', resizeSetter) // 监听

// 清理事件监听器
onUnmounted(() => {
    window.removeEventListener('resize', resizeSetter)
})



</script>

<template>
<!-- ********************大盒子******************** -->
<main class="container">
        <!-- 内容区 -->
        <section class="content">
            <!-- 内容背景 -->
            <div class="bg-content" 
                 :style="{
                    backgroundPosition: bgPosition,
                    backgroundSize: bgSize,
                 }">
                <slot name="page"></slot>
            </div>

            <!-- 按钮区 -->
            <div class="btn-content" v-if="global.showWhiteBG">
                <slot name="btn"></slot>
            </div>
        </section>
</main>

</template>

<style scoped>
 /* ********************大盒子 */
 .container {
			display: flex;
			flex-direction: column;
			/* width: 100%; */
			/* height: 800px; */
			/* background: blue; */
			/* max-width: 2660px; */
            max-width: 1680px !important; /* 为了让其在总项目里显示数测人生正常宽度 */
			margin: 0 auto;
            overflow: hidden; /* 因为目前有竖屏移动端往左拉会拉到右边留白，所以直接锁住！ */
		}
			/* ********************内容区 */
			.content {
				/* width: 100%; */
				/* flex: 1; */
				display: flex;
				flex-direction: column;
			}
				/* 内容背景 */
				.bg-content {
					flex: 3;
					/* background-color: rgb(91, 32, 32); */
                    background-color: #ebfffd;
					display: flex;
					justify-content: center;
					align-items: center;
					/* padding: 50px 0; */

                    /* 背景图片 */
                    background-image: 
                        url('/src/assets/image/img/Group 5.png'), 
                        url('/src/assets/image/img/Group 6.png');
                    background-repeat: no-repeat;
                }

                /* 按钮区 */
                .btn-content {
                    flex: 1;
                    background-color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }


    /* 超大屏幕 > 2560px */
    @media screen and (min-width: 2560px) {
      /* 大盒子 */
      .container {
        max-width: 1480px;
      }
    }

    /* 中屏幕 < 1200px */
    @media screen and (max-width: 1200px) {
        /* 背景 */
        .bg-content {
        background-image: 
            url('/src/assets/image/img/Group 5.png'), 
            url('/src/assets/image/img/Group 6.png');
            background-repeat: no-repeat;
        }
    }

    /* 小屏幕 < 768px */
    @media screen and (max-width: 767.98px) {
        /* 背景 */
        .bg-content {
            background-image: 
            url('/src/assets/image/img/Group 5.png');
            background-repeat: no-repeat;
        }
    }   

</style>