<script setup>
    import { ref,onUnmounted, onMounted, computed, defineComponent } from 'vue' // 导入vue相关的方法
    const titleYearlyLuck = new URL('/src/assets/image/img/流年运气分析报告.png', import.meta.url).href;
    const titleRecentLuck = new URL('/src/assets/image/img/近期运气分析报告.png', import.meta.url).href;
    const exportBtn = new URL('/src/assets/image/img/Btn导出.png', import.meta.url).href; // 导入“导出”图片
    import Background from '@/components/container/bg.vue' // 导入背景组件 
    import Dropdown from '@/components/container/Dropdown.vue' // 导入下拉框组件
    import { useRouter } from 'vue-router'; // 导入路由 useRouter
    import { useGlobalStore } from '@/stores/global' // 导入 全局状态管理实例 useGlobalStore 
    import { useSelectedStore } from '@/stores/MultiSelectArraySelectedStores' // 导入多选列表组件状态管理实例 useSelectedStore
    import { useSelected_irrStore } from '@/stores/MultiSelectArray_irrStores';
    import { postDataToApi } from '@/axios/articles' // 导入 postDataToApi 函数
    import { ElMessageBox } from 'element-plus'; // 弹窗组件

    // 下拉框组件的宽高
    const dropdownComponentWidth = ref('600px') 
    const dropdownComponentHeight = ref('900px')

    // 根据屏幕尺寸动态设置 Dropdown组件的宽度和高度、page-1的决定子类排列方向的类
    const resizeSetter = () => {
      if (window.innerWidth > 1366.98) {
        dropdownComponentWidth.value = '1100px'
        dropdownComponentHeight.value = '1090px'
      } else if (window.innerWidth >= 380 && window.innerWidth <= 1366.98) {
        dropdownComponentWidth.value = '88%'
        dropdownComponentHeight.value = '555px'
      } else if (window.innerWidth <= 380){
        dropdownComponentWidth.value = '88%'
        dropdownComponentHeight.value = '550px'
      }
    }
    resizeSetter() // 初始化时设置一次
    window.addEventListener('resize', resizeSetter) // 监听窗口尺寸变化
    onUnmounted(() => {window.removeEventListener('resize', resizeSetter) }) // 清理窗口尺寸变化事件监听器

    const router = useRouter(); // 获取路由器实例
    const global = useGlobalStore(); // 全局状态管理实例
    const selectedStore = useSelectedStore() // 多选列表状态管理实例 流年
    const selectedStore_irr = useSelected_irrStore(); // 多选列表状态管理实例 近期

    global.showWhiteBG = false; // 让白色下背景消失
    
    // 标题显示
    const title = computed(() => {
      return global.luckValue === "近期运气" ? titleRecentLuck : titleYearlyLuck;
    })

    // 提交后触发的函数
    function btnClick() {
      global.selectedItems = []; // 清空选中的元素
      global.selectedItems__Num = []; // 清空 “被选中的元素” + “对应的数字” 数组
    //global.selectedItems_five = []; // 清空 “第5页被选中的元素” 数组
      selectedStore.selectedItems = [] // 清空 已选元素
      
      // 恢复全部选项样式为 未选中
      for (let i = 0; i < selectedStore.indexItems.length; i++) {
          const index = selectedStore.indexItems[i];
          selectedStore.to_un_all(index);
      }
      router.push('/'); 
      console.log('提交！！！');
    }

    //*********************************************处理API数据********************************************************
    // 异步数据
    const prefix = ref(null);
    const contentList = ref(null);
    const tail = ref(null);

    // 在 mounted 生命周期钩子中调用异步函数 处理 API
    onMounted(async () => {
      try {
        const response = await postDataToApi(
          global.selectedItems__Num, 
          global.luckValue === "流年运气" ? '/fleeting/analysisReport' : '/recent/analysisReport'
        );
        prefix.value = formatContentString(response.data.prefix, false, true);
        contentList.value = formatContentArray(response.data.contentList);
        tail.value = formatContentString(response.data.tail, true, false);

        console.log(prefix.value);
        contentList.value.map( contentItem => console.log(contentItem) );
        console.log(tail.value);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
      // 清空参数列表
      global.selectedItems__Num = []
      
      // 清空近期运气各列表
      if (global.luckValue === "近期运气") {
        selectedStore_irr.ids = []
        selectedStore_irr.names = []
        selectedStore_irr.lastSelectedIndex = -1 
      }
    });

    const formatContentArray = (contentList) => {
          return contentList.map(item => {
        // 定义一个辅助函数来处理替换逻辑
        const replaceContent = (content) => {
          // 替换换行符
          let formattedContent = content.replace(/\n/g, '<br/>');
          
          // 在<br/>之后的行首添加空格
          formattedContent = formattedContent.replace(/(<br\/>)\s*/g, '$1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
          
          // 在内容的第一行前添加缩进
          formattedContent = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${formattedContent}`;

          return formattedContent;
        };

        // 对每个item的内容应用替换逻辑
        return {
          ...item,
          content: replaceContent(item.content)
        };
      });
    };
    // 方法：格式化内容 把 \n 替换为 <br/> 并 手动添加了首行缩进。  参数：字符串、布尔值
    const formatContentString = (content, isTail = false, isPrefix = false) => {
      let formattedContent = content.replace(/\n/g, '<br/>');

      if (isTail) {
        // 找到第一个 <br> 标签并在其后面添加首行缩进
        formattedContent = formattedContent
          .replace(/<br\/>/, '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
          .replace(/感谢你使用《数测人生》命运分析系统！/g, '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp感谢你使用《数测人生》命运分析系统！')
      }

      if (isPrefix) {
        // 找到第一个 <br> 标签并在其后面添加首行缩进
        formattedContent = formattedContent.replace(/您/, '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您');
      }

      return formattedContent;
    };
    //**************************************************************************************************************

    // ***********************************如果刷新数据为空的话，跳转到首页**************************************************    // 页面加载前检查 sessionStorage 标志并重定向
    const isRefresh = ref(false);
    // 检查 sessionStorage 中是否有刷新标记
    const checkRefresh = () => {
      const refreshFlag = sessionStorage.getItem('refreshFlag');
      if (refreshFlag) {
        // 如果有标记，说明是刷新后的页面加载
        // 执行跳转逻辑（这里跳转到首页）
        router.push('/');
        // 清除标记，避免下次加载时再次跳转
        sessionStorage.removeItem('refreshFlag');
      } else {
        // 如果没有标记，设置标记以便下次加载时能够识别出是刷新操作
        sessionStorage.setItem('refreshFlag', 'true');
      }
    };

    // 在组件挂载时检查刷新标记
    onMounted(() => {
      checkRefresh();
    });

    // 在组件卸载时清除标记（可选，因为标记会在下次加载时被覆盖）
    onBeforeUnmount(() => {
      sessionStorage.removeItem('refreshFlag');
    });
    //**************************************************************************************************************

    // 为组件命名
    defineComponent({
      name: 'LuckAnalysis7',
    });
</script>

<template>
<body>

    <!-- ********************大盒子******************** -->
    <Background 
            :bgPosition="'left top, right top'" 
            :bgSize="'auto 50%'"
    >
            <!-- 页面7 -->
            <template #page>
              <div class="page page-direction">
                  <Dropdown :width=dropdownComponentWidth :height=dropdownComponentHeight :bgColor="'#ffffff5c'" :innerHeight="'88%'">
                    <template #header-title>
                        <img :src="title" alt="图片失效">
                    </template>
                    
                    <div v-html="prefix" class="required-content content-api"></div>

                    <div v-for="item in contentList" :key="item.id" >
                      <div style="margin-top: 15px;">
                        <div class="content-api content-title"><b>{{ item.title }}</b></div>
                        <div class="content-api" v-html="item.content"></div>
                      </div>
                    </div>

                    <div v-html="tail" class="content-api"></div>
                    
                  </Dropdown>
                  <div class="btn-superbox" @click="btnClick">
                    <img class="btn" :src=exportBtn alt="图片失效">
                  </div>
              </div>
            </template>
    </Background>
    <!-- ********************/大盒子******************** -->


</body>
</template>

<style scoped>
    /* 后端数据静态内容 */
    .content-api {
      font-size: 16px;
    }
    .content-title {
        color: #485fc7;
    }
    .required-content {
      font-weight: bold;
      margin: 0px 0px 30px 0px;
    }

    /* 页面宽高 */
    .page {
        width: 1450px;
        height: 1500px;
        margin-bottom: 40px;
        position: relative; /* 为调整.btn-superbox 定位做准备 */
    }
    .page-direction {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* 按钮 */	
    .btn-superbox {
        transform: scale(0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 1260px;
    }
    .btn {
        width: 100%;
        height: 100%;
        margin: 65px 0;
        user-select: none;
        cursor: pointer;
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
      .btn-superbox {
        top: 1300px;
      }

    }

    /* 小屏幕 < 768px */
    @media screen and (max-width: 767.98px) {
        /* 后端数据静态内容 */
        .content-api {
          font-size: 13px;
        }
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
        .btn-superbox {
          top: 580px;
        }
    }
</style>