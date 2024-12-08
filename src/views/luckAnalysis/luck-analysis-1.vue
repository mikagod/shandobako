<script setup>

    import { ref,defineComponent  } from 'vue' // 导入vue相关的方法
    import { useGlobalStore } from '@/stores/global' // 全局状态管理实例 useGlobalStore
    import Background from '@/components/container/bg.vue' // 导入 bg.vue 组件
    
    const clickIntoBtn = new URL('/src/assets/image/img/Btn点击进入.png', import.meta.url).href; // 导入“点击进入按钮”图片

    const numPage = ref(1) // 当前页码
    const global = useGlobalStore() // 全局状态
    global.showWhiteBG = true; // 让白色下背景显示

    // 为组件命名
    defineComponent({
      name: 'LuckAnalysis1',
    });
</script>

<template>
	<body>

		<!-- ********************大盒子******************** -->
    <Background>
          <!-- 页面1 -->
          <template #page>
            <div class="page page-direction" v-if="numPage === 1">
                <div class="page-1">
                  <img class="cat left-cat" src="/src/assets/image/img/LeftCat.png" alt="图片失效">
                </div>
                <div class="page-1">
                  <img class="main-font" src="/src/assets/image/img/TitPic.png" alt="图片失效">
                </div>
                <div class="page-1">
                  <img class="cat right-cat" src="/src/assets/image/img/RightCat.png" alt="图片失效">
                </div>
            </div>
          </template>
          <!-- 按钮区 -->
          <template #btn>
            <router-link to="/luckAnalysis2" style="display: flex; justify-content: center; align-items: center;">
              <img class="btn" :src=clickIntoBtn alt="图片失效" @click="btnClick">
            </router-link>
          </template>
    </Background>
    <!-- ********************/大盒子******************** -->

	</body>
</template>

<style scoped>
    /* 页面宽高 */
    .page {
      width: 1450px;
      height: 560px;
      margin-bottom: 40px;
    }
    .page-direction {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

      /* 分别控制装图盒子的占比 */
      .page-1:nth-child(1),
      .page-1:nth-child(3){
        flex: 1;
        /* background-color: yellowgreen; */
        margin-bottom: 15px;
      }
      .page-1:nth-child(2){
        flex: 2;
        /* background-color: cadetblue; */
      }
        .cat {
            width: 100%; /* 猫图占满盒子 */
      
        }
        .main-font {
            width: 100%; /* 字图占满盒子 */
        }

      /* 按钮 */	
      .btn {
        width: 100%;
        height: 100%;
        margin: 65px 0;
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

    }

    /* 小屏幕 < 768px */
    @media screen and (max-width: 767.98px) {

      .page {
        height: 700px;
      }

      .page-direction {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      /* 分别控制Cover装图盒子的占比 */
      .page-1:nth-child(3){
        display: none; /* 隐藏右猫 */
      }
      .page-1:nth-child(1){
        order: 2; /* 调换一下位置 */
        flex: 1;
        width: 300px;
      }
      .page-1:nth-child(2){
        order: 1;
        flex: 1;
      }
    /* 按钮 */
    .btn {
      width: 50%;
      height: 50%;
      margin: 50px 0;
      user-select: none;
      pointer-events: none;
    }

  }


</style>