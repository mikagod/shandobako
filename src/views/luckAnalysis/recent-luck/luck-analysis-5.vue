<script setup>
    import { ref, onUnmounted, onBeforeMount, onBeforeUnmount,defineComponent  } from 'vue'; // 导入vue相关的方法
    import { useRouter } from 'vue-router'; // 导入路由 useRouter
    import { useGlobalStore } from '@/stores/global'; // 导入 全局状态管理实例 useGlobalStore
    import { useSelected_irrStore } from '@/stores/MultiSelectArray_irrStores' // 导入多选列表组件状态管理实例 useSelectedStore
    const nextStepBtn = new URL('/src/assets/image/img/Btn下一步.png', import.meta.url).href; // 导入“下一步”图片
    import Background from '@/components/container/bg.vue'; // 导入背景组件 
    import Dropdown from '@/components/container/Dropdown_irr.vue'; // 导入下拉框组件
    import MultiSelectArray from '@/components/container/MultiSelectArray_irr.vue'; // 导入多选列表组件

    const router = useRouter(); // 获取路由器实例

    // Dropdown 内边距
    const contentPadding = ref('15px'); 
 
    // dropdown 组件的宽度和高度
    const dropdownComponentWidth = ref('1100px'); 
    const dropdownComponentHeight = ref('400px'); 

    // 根据屏幕尺寸动态设置 Dropdown组件的宽度和高度、page-1的决定子类排列方向的类
    const resizeSetter = () => {
      const innerWidth = window.innerWidth;

      if (innerWidth >= 1200) { // 桌面端
        dropdownComponentWidth.value = '1100px';

      } else if (innerWidth > 600 && innerWidth < 1024) { // 平板端
        dropdownComponentWidth.value = '92%';

      } else if (innerWidth >= 380 && innerWidth < 600) { // 移动端
        dropdownComponentWidth.value = '92%';
        contentPadding.value = '10px'; 

      }else if (innerWidth <= 380) { // 小屏移动端
        dropdownComponentWidth.value = '92%';
      }

      // 高度在所有情况下都是固定的
      dropdownComponentHeight.value = '400px';
    };
    resizeSetter() // 初始化时设置一次
    window.addEventListener('resize', resizeSetter) // 监听窗口尺寸变化
    onUnmounted(() => {window.removeEventListener('resize', resizeSetter) }) // 清理窗口尺寸变化事件监听器



const global = useGlobalStore(); // 全局状态管理实例
const selectedStore = useSelected_irrStore() // 多选列表状态管理实例
global.showWhiteBG = true; // 让白色下背景显示

// 页数为5
selectedStore.pageNum = 5;

// 重置选中相关状态，防止用户浏览器从上一页退回
// 清空已选列表
selectedStore.names = []
selectedStore.ids = []
selectedStore.paths = []
// 变成未选中样式
selectedStore.imgUrlArray.forEach((path, idx) => {
  selectedStore.to_blue(idx)
})




// 监听按钮点击事件
function handleNextStepBtn(event) {
  if (selectedStore.names.length > 0 && selectedStore.names.length <= 6) {
    router.push('/recent-luck-6'); // 使用路由器实例进行跳转
  } else {
    event.preventDefault(); // 阻止默认行为
    alert('至少选择1个,最多选6个！');
  }
}

    // 为组件命名
    defineComponent({
      name: 'LuckAnalysisRecentLuck5',
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
              :imgUrlArray="selectedStore.imgUrlArray"
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
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Standard syntax */
  }
}
</style>