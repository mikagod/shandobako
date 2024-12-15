<script setup>
    // 导入 需要的库数据
    import { ref, onUnmounted, onMounted,defineComponent } from 'vue'; // 导入vue相关的方法
    import { useRouter } from 'vue-router'; // 导入路由 useRouter
    import { useGlobalStore } from '@/stores/global'; // 导入 全局状态管理实例 useGlobalStore
    import { useSelectedStore } from '@/stores/MultiSelectArraySelectedStores'; // 导入多选列表组件状态管理实例 useSelectedStore
    const clickPredict = new URL('/src/assets/image/img/Btn点击预测.png', import.meta.url).href;  // 导入“点击预测”图片
    const reSelect = new URL('/src/assets/image/img/Btn重新选择.png', import.meta.url).href;  // 导入“重新选择”图片
    import Background from '@/components/container/bg.vue'; // 导入背景组件 
    import Dropdown from '@/components/container/Dropdown.vue'; // 导入下拉框组件
    import MultiSelectArray from '@/components/container/MultiSelectArray.vue'; // 导入多选列表组件
    import NumberSelecte from '@/components/container/NumberSelecte.vue'; // 导入数选框组件

    // 下拉框 组件 宽高
    const dropdownComponentWidth = ref('1100px');
    const dropdownComponentHeight = ref('400px');
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
    // 选项间的间距
    const itemGap = ref('30px');
    // 选中图标左右间距
    const iconMainMargin = ref('0 10px');

    // 根据屏幕尺寸动态设置 Dropdown组件的宽度和高度
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



    const router = useRouter(); // 获取路由器实例
    const global = useGlobalStore(); // 全局状态管理实例
    const selectedStore = useSelectedStore(); // 选中状态管理实例
    global.showWhiteBG = true; // 让白色下背景显示
    global.pageNum = '5'; // 确认页数 第5页
    global.luckValue = '流年运气' // 模块设置为流年运气


    /**
     * 对用于在视图中展示的数据做数 据持久化处理（防止刷新后，数据丢失。）
     * 
     * ps：`近期运气模块`没做持久化处理，而是一刷新就自动重选。
     * 
     * 先判断有选项数据没
     *    有则用从上一页得来的选项数据
     *    没有的话就判断localStorage里有没有
     *        有则用localStorage里的
     *        没有的话就提示“重新选择”
     */
    if (global.selectedItems.length === 0) {
      console.log('localStorage: ',localStorage.getItem('selectedItems_5'))
      if(localStorage.getItem('selectedItems_5') && localStorage.getItem('selectedItems_white_5')) {
        selectedStore.selectedItems_5 = JSON.parse(localStorage.getItem('selectedItems_5'));
        selectedStore.selectedItems_white_5 = JSON.parse(localStorage.getItem('selectedItems_white_5'));
        console.log('用的持久化的数据')
      }else{
        alert('请点击"重新选择"！');
      }
    }else{
      //-------------------第4页 传来的数据放pinia保存。包括视图也用这个数据--------------------------------
      selectedStore.selectedItems_5 =  global.selectedItems
      console.log(`selectedItems_5：`,selectedStore.selectedItems_5)
      //---------------------------------------------------
      selectedStore.selectedItems_backup_5 = global.selectedItems
      console.log(`selectedItems_backup_5：`,selectedStore.selectedItems_backup_5)
      //---------------------------------------------------
      global.selectedItems_white !== undefined ? selectedStore.selectedItems_white_5 = global.selectedItems_white.map (item => {
          return item.replace(/\/src\/assets\/image\/img\/font_blue\/yearly_luck\//, '/src/assets/image/img/font_white/yearly_luck/');
        }) : console.log('没有数据');
      console.log(`selectedItems_white_5：`,selectedStore.selectedItems_white_5)
      //---------------------------------------------------
      // 持久化
      localStorage.setItem('selectedItems_white_5', JSON.stringify(selectedStore.selectedItems_white_5))
      localStorage.setItem('selectedItems_5', JSON.stringify(selectedStore.selectedItems_5))
      console.log('localStorage.getItem(selectedItems_5)：',localStorage.getItem('selectedItems_5'))
    }




    // 恢复全部选项样式为 未选中
    for (let i = 0; i < selectedStore.indexItems.length; i++) {
        const index = selectedStore.indexItems[i];
        selectedStore.to_un_all(index);
    }


    // 定义一个函数，用于接收子组件传递的已选元素的数字
    const handleSelectedItems = (num) => { 
      // 已选元素 => 全局状态 selectedItems_five 属性
      global.selectedItems_five = num;
      // 已选元素（白字体） => 全局状态 selectedItems_whilte_five 属性
      global.selectedItems_whilte_five = global.selectedItems_five.map(item => {
        return item.replace(/\/src\/assets\/image\/img\/font_blue\/yearly_luck\//, '/src/assets/image/img/font_white/yearly_luck/');
    });
    } 




    // 监听点击预测按钮（待完善...）
    function handleClickPredict(event) {
      let itemsFromlocalStorage =  JSON.parse(localStorage.getItem('selectedItems_5')).length
      if (itemsFromlocalStorage !== global.selectedItems__Num.length) {
        event.preventDefault(); // 阻止默认行为
        console.log(`global.selectedItems.length =`, global.selectedItems.length)
        console.log(`global.selectedItems__Num.length =`, global.selectedItems__Num.length)
        alert('请给全部模块绑定数字！');
      } else {
        // 如果没选任何选项就跳转到对应页面先选好，如果选好了就正常跳转到后面的页面
        if (itemsFromlocalStorage === 0 && global.selectedItems__Num.length === 0){
          router.push('/yearly-luck-5'); // 使用路由器实例进行跳转
        }else {
          console.log(`pinia里的selectedItems__Num状态`,global.selectedItems__Num);
          router.push('/luckAnalysis7'); // 使用路由器实例进行跳转
        }

      }
      
    }



    // 监听重选按钮
    function handleReSelect() {
      global.selectedItems = []; // 清空选中的元素
      global.selectedItems__Num = []; // 清空 “被选中的元素” + “对应的数字” 数组
    //global.selectedItems_five = []; // 清空 “第5页被选中的元素” 数组
      selectedStore.selectedItems = [] // 清空 已选元素
      
      // 恢复全部选项样式为 未选中
      for (let i = 0; i < selectedStore.indexItems.length; i++) {
          const index = selectedStore.indexItems[i];
          selectedStore.to_un_all(index);
      }

      console.log('重选');
      

        console.log('global.selectedItems',  global.selectedItems)
        console.log('selectedStore.selectedItems',  selectedStore.selectedItems)
        console.log('global.selectedItems__Num',  global.selectedItems__Num)

      router.push('/yearly-luck-5'); // 使用路由器实例进行跳转
    }

    // 浏览器点回退跟重选一个效果
    onMounted(() => {
      window.addEventListener('popstate', handleReSelect)
    })

    // 为组件命名
    defineComponent({
      name: 'LuckAnalysisYearlyLuck6',
    });
</script>

<template>
  <body>

    <!-- ********************大盒子******************** -->
    <Background>
      <!-- 页面6 -->
      <template #page>
        <div class="page page-direction">
          <Dropdown
            :width="dropdownComponentWidth"
            :height="dropdownComponentHeight"
            :bgColor="'#ffffff5c'"
            :contentPadding="contentPadding"
            :overFlow="'hidden'"
          >
            <template #header-title>
              <img src="/src/assets/image/img/您要求测的对象：.png" alt="图片失效">
            </template>
            <!-- 多选列表 -->
            <MultiSelectArray
              :requiredIcon="true"
              :imgUrlArray="selectedStore.selectedItems_5"
              :imgUrlArray_Selected="selectedStore.selectedItems_white_5"
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
  .btn:nth-child(1) {
    margin: 10px 0 10px 0;
  }
  .btn:nth-child(2) {
    margin: 10px 0 10px 0;
  }
}
</style>