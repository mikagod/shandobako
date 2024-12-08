<script setup>
    import { ref,onUnmounted,onMounted } from 'vue' // 导入vue相关的方法
    const nextStepBtn = new URL('/src/assets/image/img/Btn下一步.png', import.meta.url).href; // 导入“下一步”图片
    import Background from '@/components/container/bg.vue' // 导入背景组件 
    import Dropdown from '@/components/container/Dropdown.vue' // 导入下拉框组件
    import { useRouter } from 'vue-router'; // 导入路由 useRouter
    import { useGlobalStore } from '@/stores/global'; // 全局状态管理实例 useGlobalStore
    import { postDataToApi } from '@/axios/articles' // 导入 postDataToApi 函数

    // dropdown 组件的宽度和高度
    const dropdownComponentWidth = ref('600px') 
    const dropdownComponentHeight = ref('900px')

    // 根据屏幕尺寸动态设置 Dropdown组件的宽度和高度
    const resizeSetter = () => {
      if (window.innerWidth >= 1200) {
        dropdownComponentWidth.value = '1100px'
        dropdownComponentHeight.value = '400px'
      } else if (window.innerWidth >= 380 && window.innerWidth <= 767.98) {
        dropdownComponentWidth.value = '86%'
        dropdownComponentHeight.value = '555px'
      } else if (window.innerWidth <= 380){
        dropdownComponentWidth.value = '77%'
        dropdownComponentHeight.value = '555px'
      } else {
        dropdownComponentWidth.value = '500px'
        dropdownComponentHeight.value = '400px'
      }
    }
    resizeSetter() // 初始化时设置一次
    window.addEventListener('resize', resizeSetter) // 监听窗口尺寸变化
    onUnmounted(() => {window.removeEventListener('resize', resizeSetter) }) // 清理窗口尺寸变化事件监听器



    const router = useRouter(); // 获取路由器实例
    const global = useGlobalStore(); // 全局状态管理实例
    global.showWhiteBG = true; // 让白色下背景显示


    // 监听按钮点击事件
    function handleNextStepBtn(event) {
      if (global.luckValue === "流年运气") {
        router.push('/yearly-luck-5'); 
      } else if(global.luckValue === "近期运气") {
        router.push('/recent-luck-5'); 
      } else {
        router.push('/luckAnalysis3'); // 如果没有选择是流年运气还是近期运气就跳转到对应页面选择
        // event.preventDefault(); // 阻止默认行为
      }
    }


    // 异步数据
    const data = ref(null);

    // api url 根据全局状态值动态变化
    let api_url = global.luckValue === '流年运气' ? '/axios/fleeting/instructions' : '/axios/recent/instructions';

    // 在 mounted 生命周期钩子中调用异步函数
    onMounted(async () => {
      try {
        const response = await postDataToApi(
          global.selectedItems__Num,
          api_url
        );
        data.value = formatContentString(response.data.content);
        console.log(data.value);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    // 对后端API传过来的数据进行布局处理
    function formatContentString(content) {
      return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+content
    }
</script>

<template>
<body>

    <!-- ********************大盒子******************** -->
    <Background>
            <!-- 页面4 -->
            <template #page>
              <div class="page page-direction">
                  <Dropdown :width=dropdownComponentWidth :height=dropdownComponentHeight :bgColor="'#ffffff5c'">
                    <template #header-title>
                        <img v-if="global.luckValue === '流年运气'" src="/src/assets/image/img/流年运气求测须知.png" alt="图片失效">
                        <img v-else-if="global.luckValue === '近期运气'" src="/src/assets/image/img/近期运气求测须知.png" alt="图片失效">
                    </template>
                    <div 
                      style="width: 100%; 
                      height: 100%; 
                      display: flex; 
                      justify-content: center; 
                      align-items: center;"
                      >
                      <span v-html="data"></span>
                    </div>
                  </Dropdown>
              </div>
            </template>
            <!-- 按钮区 -->
            <template #btn>
            <div @click="handleNextStepBtn" style="display: flex; justify-content: center; align-items: center;">
                <img class="btn" :src=nextStepBtn alt="图片失效" @click="btnClick">
            </div>
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

    }

    /* 小屏幕 < 768px */
    @media screen and (max-width: 767.98px) {
        /* 页面 */
        .page {
        height: 700px;
        }

        /* 按钮 */
        .btn {
        width: 50%;
        height: 50%;
        margin: 50px 0;
        }
    }
</style>