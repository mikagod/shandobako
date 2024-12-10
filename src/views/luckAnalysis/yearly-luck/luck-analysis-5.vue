<script setup>
    import { ref, onUnmounted, onBeforeMount, onBeforeUnmount,defineComponent  } from 'vue'; // 导入vue相关的方法
    import { useRouter } from 'vue-router'; // 导入路由 useRouter
    import { useGlobalStore } from '@/stores/global'; // 导入 全局状态管理实例 useGlobalStore
    import { useSelectedStore } from '@/stores/MultiSelectArraySelectedStores' // 导入多选列表组件状态管理实例 useSelectedStore
    const nextStepBtn = new URL('/src/assets/image/img/Btn下一步.png', import.meta.url).href;  // 导入“下一步”图片
    import Background from '@/components/container/bg.vue'; // 导入背景组件 
    import Dropdown from '@/components/container/Dropdown.vue'; // 导入下拉框组件
    import MultiSelectArray from '@/components/container/MultiSelectArray.vue'; // 导入多选列表组件

    const router = useRouter(); // 获取路由器实例

    // 多选列表 块 宽高
    const itemHeight = ref('85px'); 
    const itemWidth = ref('332px');
    // Dropdown 内边距
    const contentPadding = ref('15px'); 
    // 容器宽度
    const boxWidth = ref('100%'); 
    // 主要图片的宽高
    const imgMainWidth = ref('auto');
    const imgMainHeight = ref('auto');
    // 选中图标的宽高
    const iconMainWidth = ref('auto');
    const iconMainHeight = ref('auto');
    // dropdown 组件的宽度和高度
    const dropdownComponentWidth = ref('1100px'); 
    const dropdownComponentHeight = ref('400px'); 
    // 选项间的间距
    const itemGap = ref('30px');
    // 选中图标左右间距
    const iconMainMargin = ref('0 25px');

    // 根据屏幕尺寸动态设置 Dropdown组件的宽度和高度、page-1的决定子类排列方向的类
    const resizeSetter = () => {
      const innerWidth = window.innerWidth;

      if (innerWidth >= 1200) { // 桌面端
        dropdownComponentWidth.value = '1100px';
        itemHeight.value = '85px';
        itemWidth.value = '31%';
        contentPadding.value = '15px';
        boxWidth.value = '100%';
        imgMainWidth.value = '82%';
        imgMainHeight.value = '30%';
        iconMainWidth.value = '10%';
      } else if (innerWidth > 600 && innerWidth < 1024) { // 平板端
        dropdownComponentWidth.value = '92%';
        itemHeight.value = '85px';
        itemWidth.value = '45%';
        contentPadding.value = '15px';
        boxWidth.value = '95%';
        imgMainWidth.value = '90%';
        iconMainWidth.value = '10%';
      } else if (innerWidth >= 380 && innerWidth < 600) { // 移动端
        dropdownComponentWidth.value = '92%';
        itemHeight.value = '55px';
        itemWidth.value = '45%';
        contentPadding.value = '15px';
        boxWidth.value = '95%';
        imgMainWidth.value = '100%';
        iconMainWidth.value = '10%';
        itemGap.value = '15px';
        iconMainMargin.value = '0 10px';
      }else if (innerWidth <= 380) { // 小屏移动端
        dropdownComponentWidth.value = '92%';
        itemHeight.value = '55px';
        itemWidth.value = '45%';
        contentPadding.value = '15px';
        boxWidth.value = '95%';
        imgMainWidth.value = '100%';
        iconMainWidth.value = '10%';
        itemGap.value = '15px';
        iconMainMargin.value = '0 10px';
      }

      // 高度在所有情况下都是固定的
      dropdownComponentHeight.value = '400px';
    };
    resizeSetter() // 初始化时设置一次
    window.addEventListener('resize', resizeSetter) // 监听窗口尺寸变化
    onUnmounted(() => {window.removeEventListener('resize', resizeSetter) }) // 清理窗口尺寸变化事件监听器



// ****************************************为了实现每次进入该页面时刷新一次，重置数据**********************
// // 检查 sessionStorage 中是否存在标志
// const hasReloaded = sessionStorage.getItem('hasReloadedPage5');
// // 在首次进入组件时刷新页面
// onMounted(() => {
//   if (!hasReloaded) {
//     // 设置标志
//     sessionStorage.setItem('hasReloadedPage5', 'true');
//     // 刷新页面
//     window.location.reload();
//   }
// });
// // 在组件更新时刷新页面
// onBeforeRouteUpdate((to, from) => {
//   if (!hasReloaded) {
//     // 设置标志
//     sessionStorage.setItem('hasReloadedPage5', 'true');
//     // 刷新页面
//     window.location.reload();
//   }
// });
// // 在离开组件时重置标志变量
// onBeforeRouteLeave((to, from) => {
//   // 清除标志
//   sessionStorage.removeItem('hasReloadedPage5');
// });
// // 在组件卸载时清除标志
// onUnmounted(() => {
//   sessionStorage.removeItem('hasReloadedPage5');
// });

// // 每次重新进入页面时刷新
// onBeforeMount(() => {
//   // 检查本地存储中是否已经执行过刷新操作
//   const hasRefreshed = localStorage.getItem('hasRefreshed');
//   // 如果本地存储中没有记录或者记录为false，则执行刷新操作
//   if (!hasRefreshed) {
//     // 执行刷新操作
//     window.location.reload();
//     // 设置本地存储，标记已经执行过刷新操作
//     localStorage.setItem('hasRefreshed', true);
//   }
// })
// // 在组件销毁时清除存储，下次进入才会触发
// onBeforeUnmount(() => {
//   localStorage.removeItem('hasRefreshed');
// });
// ****************************************/为了实现每次进入该页面时刷新一次，重置数据**********************


const global = useGlobalStore(); // 全局状态管理实例
const selectedStore = useSelectedStore() // 多选列表状态管理实例
global.showWhiteBG = true; // 让白色下背景显示
global.pageNum = '4'; // 确认页数 第4页

// 清空（初始化） 被选元素
global.selectedItems = []; 
global.selectedItems_whilte = []

// 定义一个函数，用于接收子组件传递的已选元素的数据
const handleSelectedItems = (item) => { 
  // 已选元素 存入 => 全局状态 selectedItems 属性
  global.selectedItems = item; 
  // 已选元素（白字体） 存入 => 全局状态 selectedItems_white 属性
  global.selectedItems_white = global.selectedItems;

  console.log('已选元素的元素如下：', global.selectedItems_white);
} 




// 监听按钮点击事件
function handleNextStepBtn(event) {
  if (!(global.selectedItems.length > 0 && global.selectedItems.length < 7)) {
    event.preventDefault(); // 阻止默认行为
    alert('至少选择1个！');
  } else {
    // 如果条件满足，允许跳转
    console.log(`pinia里的selectedItems状态`,global.selectedItems);
    console.log(`pinia里的selectedItems_whilte状态`,global.selectedItems_whilte);
    selectedStore.selectedItems = [] // 清空选中项
    selectedStore.selectedItems_whilte = [] // 清空选中项
    global.showNumSelecte = false; // 隐藏数选框
    router.push('/yearly-luck-6'); // 使用路由器实例进行跳转
  }
}

    // 为组件命名
    defineComponent({
      name: 'LuckAnalysisYearlyLuck5',
    });
</script>

<template>
  <body>

    <!-- ********************大盒子******************** -->
    <Background>
      <!-- 页面5 -->
      <template #page>
        <div class="page page-direction">
          <Dropdown
            :width="dropdownComponentWidth"
            :height="dropdownComponentHeight"
            :bgColor="'#ffffff5c'"
            :contentPadding="contentPadding"
          >
            <template #header-title>
              <!-- 流年运气求测须知 -->
              <img src="/src/assets/image/img/请选择您要求测的对象：.png" alt="图片失效">
            </template>
            <!-- 多选列表 -->
            <MultiSelectArray
              :requiredIcon="true"
              :imgUrlArray="selectedStore.imgUrlArray"
              :imgUrlArray_Selected="selectedStore.imgUrlArray_white"
              :bgColor="'#e3fdfe'"
              :itemWidth="itemWidth"
              :itemHeight="itemHeight"
              :itemBorderReadius="'15px'"
              :itemGap="itemGap"
              :selectedItemsLen="6"
              @updateSelectedItems="handleSelectedItems"
              :imgMainHeight="imgMainHeight"
              :imgMainWidth="imgMainWidth"
              :iconMainHeight="iconMainHeight"
              :iconMainWidth="iconMainWidth"
              :iconMainMargin="iconMainMargin"
            />
          </Dropdown>
        </div>
      </template>
      <!-- 按钮区 -->
      <template #btn>
        <div @click="handleNextStepBtn" style="display: flex; justify-content: center; align-items: center;">
          <img class="btn" :src="nextStepBtn" alt="图片失效">
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
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Standard syntax */
  }
}
</style>