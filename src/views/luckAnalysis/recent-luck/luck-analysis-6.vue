<script setup>
    import { ref, onUnmounted, onBeforeMount, onBeforeUnmount, nextTick, onMounted,defineComponent   } from 'vue'; // 导入vue相关的方法
    import { useRouter } from 'vue-router'; // 导入路由 useRouter
    import { useGlobalStore } from '@/stores/global'; // 导入 全局状态管理实例 useGlobalStore
    import { useSelected_irrStore } from '@/stores/MultiSelectArray_irrStores' // 导入多选列表组件状态管理实例 useSelectedStore
    const clickPredict = new URL('/src/assets/image/img/Btn点击预测.png', import.meta.url).href;  // 导入“点击预测”图片
    const reSelect = new URL('/src/assets/image/img/Btn重新选择.png', import.meta.url).href;  // 导入“重新选择”图片
    import Background from '@/components/container/bg.vue'; // 导入背景组件 
    import Dropdown from '@/components/container/Dropdown_irr.vue'; // 导入下拉框组件
    import MultiSelectArray from '@/components/container/MultiSelectArray_irr.vue'; // 导入多选列表组件
    import NumberSelecte from '@/components/container/NumberSelecte.vue'; // 导入组件

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



// 如果没有选项就跳转到 第5页 先去选择
if (selectedStore.names.length === 0) {
    // 清空列表
    selectedStore.names = []
    selectedStore.ids = []
    selectedStore.paths = []
    setTimeout(() => {
        router.push('/recent-luck-5')
    }, 500)
}


// 页数为6
selectedStore.pageNum = 6;
// 模块设置为近期运气
global.luckValue = '近期运气';


// 初始化已选列表
selectedStore.getSelectedPaths()


// 给数组按规则重新排序：为了让布局看起来好看
const adjustArrangeArray = () => {
      if (innerWidth >= 1024) { // 桌面端
        selectedStore.paths = selectedStore.arrangeArray_l(selectedStore.paths);
        selectedStore.paths_backup = selectedStore.arrangeArray_l(selectedStore.paths_backup);
        selectedStore.paths_white = selectedStore.arrangeArray_l(selectedStore.paths_white);
        console.log(selectedStore.paths_white)
        console.log('走的大屏')

      } else if (innerWidth < 1024) { // 平板端
        selectedStore.paths = selectedStore.arrangeArray_sm(selectedStore.paths);
        selectedStore.paths_backup = selectedStore.arrangeArray_sm(selectedStore.paths_backup);
        selectedStore.paths_white = selectedStore.arrangeArray_sm(selectedStore.paths_white);
        console.log('走的小屏')
      }
      console.log('调整后', selectedStore.paths)
        /**
         *  ！！！ 由于 屏幕变化的时候如果是选中某些选项的，
         *  选项的位置变化会导致样式出以及选中的选项不是原来的选项的bug
         *  暂时的解决办法：在屏幕变化的后每次都会清空选项，以及设置样式为未选中状态。
         */ 
        // 关闭数选框
        global.showNumSelecte = false;
        // 清空各选项相关数组
        selectedStore.names = []
        selectedStore.ids = []
        global.selectedItems__Num = [] // 清空要传给后端的编号
        // 设置所有选项样式为未选中状态
        selectedStore.paths.forEach((el,idx) => {
          selectedStore.to_blue(idx)
        });
        
};
onMounted(() => {
  // 如果paths是有值的就执行一遍排序
  if(selectedStore.paths[0] != undefined || selectedStore.paths != "" || selectedStore.paths.length != 0) {
    adjustArrangeArray(); // 初始化一次 
  }
});
window.addEventListener('resize', adjustArrangeArray) // 监听窗口尺寸变化
onUnmounted(() => {window.removeEventListener('resize', adjustArrangeArray) }) // 清理窗口尺寸变化事件监听器




// 把选中的名字全部转为编号并存储
// selectedStore.ids = selectedStore.names.map(name => {
//     return selectedStore.idcnMapHandler(name)
// })

// 清空已选列表
selectedStore.names = []

// 变成未选中样式
selectedStore.paths.forEach((path, idx) => {
  selectedStore.to_blue(idx)
})

// 监听按钮点击事件
function handleClickPredict(event) {
  // 如果所选的选项与所展示的选项数量相等
  if (selectedStore.ids.length === selectedStore.paths.length) {
    router.push('/luckAnalysis7'); // 使用路由器实例进行跳转
  } else {
    event.preventDefault(); // 阻止默认行为
    alert('请给所有选项选择一个数字！');
  }
}

// 监听重选按钮
function handleReSelect() {
  // 清空各选项相关数组
  selectedStore.names = []
  selectedStore.ids = []
  global.selectedItems__Num = [] // 清空要传给后端的编号

  // 设置所有选项样式为未选中状态
  selectedStore.paths.forEach((el,idx) => {
    selectedStore.to_blue(idx)
  })

  console.log('重选');
  router.push('/recent-luck-5'); // 使用路由器实例进行跳转
}

    // 为组件命名
    defineComponent({
      name: 'LuckAnalysisRecentLuck6',
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
              <img src="/src/assets/image/img/您要求测的对象：.png" alt="图片失效">
            </template>
            <!-- 多选列表 -->
            <MultiSelectArray
              :imgUrlArray="selectedStore.paths"
            />
          </Dropdown>
        </div>

        <!-- 数选框 -->
        <NumberSelecte v-if="global.showNumSelecte"/>
      </template>
      <!-- 按钮区 -->
      <template #btn>
        <div class="btn-p">
          <div @click="handleReSelect">
            <img class="btn" :src="reSelect" alt="图片失效">
          </div>
          <div @click="handleClickPredict">
            <img class="btn" :src="clickPredict" alt="图片失效">
          </div>
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
/* 按钮容器 */
.btn-p {
  display: flex; 
  justify-content: center; 
  align-items: center; 
  gap: 70px;
}
.btn-p > div {
  display: flex; 
  justify-content: center; 
  align-items: center; 
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
  /* 按钮容器 */
  .btn-p {
    gap: 50px;
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
    margin: 10px 0;
  }
  /* 按钮容器 */
  .btn-p {
    gap: 0;
    flex-direction: column;
  }

  /* 按钮 */
  .btn {
    width: 50%;
    height: 50%;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Standard syntax */
  }
}
</style>