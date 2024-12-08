<script setup>

    import { ref,onUnmounted,onMounted,defineComponent  } from 'vue' // 导入vue相关的方法
    import { useGlobalStore } from '@/stores/global'; // 全局状态管理实例 useGlobalStore
    import Background from '@/components/container/bg.vue' // 导入背景组件
    import Dropdown from '@/components/container/Dropdown.vue' // 导入下拉框组件
    import { postDataToApi } from '@/axios/articles' // 导入 postDataToApi 函数

    const nextStepBtn = new URL('/src/assets/image/img/Btn下一步.png', import.meta.url).href; // 导入“下一步”图片

    // dropdown 组件的宽度和高度
    const dropdownComponentWidth = ref('600px')
    const dropdownComponentHeight = ref('900px')
    
    // 根据屏幕尺寸动态设置Dropdown组件的宽度和高度
    const resizeSetter = () => {
      if (window.innerWidth >= 1200) {
        dropdownComponentWidth.value = '1100px'
        dropdownComponentHeight.value = '400px'
      } else if (window.innerWidth >= 380 && window.innerWidth <= 767.98) {
        dropdownComponentWidth.value = '92%'
        dropdownComponentHeight.value = '555px'
      } else if (window.innerWidth <= 380){
        dropdownComponentWidth.value = '92%'
        dropdownComponentHeight.value = '555px'
      } else {
        dropdownComponentWidth.value = '92%'
        dropdownComponentHeight.value = '400px'
      }
    }
    resizeSetter() // 初始化时设置一次
    window.addEventListener('resize', resizeSetter) // 监听窗口尺寸变化
    onUnmounted(() => {window.removeEventListener('resize', resizeSetter)}) // 清理事件监听器

    

    const global = useGlobalStore(); // 全局状态管理实例
    global.showWhiteBG = true; // 让白色下背景显示

        // 异步数据
        const data = ref(null);

        // 在 mounted 生命周期钩子中调用异步函数
        onMounted(async () => {
          try {
            const response = await postDataToApi(
              global.selectedItems__Num,
              '/axios/fleeting/reason'
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
                        .replace(/。(\s)/g, '。<br/>$1') // 使用正则表达式匹配句号后面跟着空白字符的情况
                        .replace(/\s/g, '&nbsp;')
                        .replace(/\n/g, '<br/>')
                        .replace(/欢迎你利用/g, '<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp欢迎你利用')
                        .replace(/改变自己的运气！/g, '改变自己的运气！<br/><br/><br/>')
                        .replace(/《数测人生》/g, ' &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp《数测人生》')
        }

        // 为组件命名
        defineComponent({
          name: 'LuckAnalysis2',
        });
</script>

<template>
<body>

    <!-- ********************大盒子******************** -->
    <Background>
            <!-- 页面2 -->
            <template #page>
              <div class="page page-direction">
                  <Dropdown :width=dropdownComponentWidth :height=dropdownComponentHeight :bgColor="'#ffffff5c'">
                    <template #header-title>
                        <img src="/src/assets/image/img/求测前需要明白的道理.png" alt="图片失效">
                    </template>
                    <div v-html="data"></div>
                  </Dropdown>
              </div>
            </template>
            <!-- 按钮区 -->
            <template #btn>
            <router-link to="/luckAnalysis3" style="display: flex; justify-content: center; align-items: center;">
                <img class="btn" :src=nextStepBtn alt="图片失效" @click="btnClick">
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