<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import { useSelectedStore } from '@/stores/MultiSelectArraySelectedStores';
import { useSelected_irrStore } from '@/stores/MultiSelectArray_irrStores';
import { postDataToApi } from '@/axios/articles';
import Background from '@/components/container/bg.vue';
import Dropdown from '@/components/container/Dropdown_final.vue';
import { ElMessageBox } from 'element-plus';
import store from "@/store/index.js";

const router = useRouter();
const global = useGlobalStore();
const selectedStore = useSelectedStore();
const selectedStore_irr = useSelected_irrStore();

global.showWhiteBG = false;

// 标题显示
const titleYearlyLuck = new URL('/src/assets/image/img/流年运气分析报告.png', import.meta.url).href;
const titleRecentLuck = new URL('/src/assets/image/img/近期运气分析报告.png', import.meta.url).href;
const exportBtn = new URL('/src/assets/image/img/Btn导出.png', import.meta.url).href;

const title = computed(() => {
  return global.luckValue === "近期运气" ? titleRecentLuck : titleYearlyLuck;
});

// 提交后触发的函数
function btnClick() {
  global.selectedItems = [];
  global.selectedItems__Num = [];
  // global.selectedItems_five = [];
  selectedStore.selectedItems = [];

  for (let i = 0; i < selectedStore.indexItems.length; i++) {
    const index = selectedStore.indexItems[i];
    selectedStore.to_un_all(index);
  }

  store.state.pdf = true;
  setTimeout(() => {
    store.state.pdf = false;
    window.print();
  }, 500);

  console.log('提交！！！');
}

// 异步数据
const prefix = ref(null);
const contentList = ref(null);
const tail = ref(null);

// 尝试从 localStorage 中恢复数据
const restoreFromLocalStorage = () => {
  prefix.value = JSON.parse(localStorage.getItem('prefix')) || null;
  contentList.value = JSON.parse(localStorage.getItem('contentList')) || null;
  tail.value = JSON.parse(localStorage.getItem('tail')) || null;
};

// 检查 localStorage 中的数据是否都存在且不为空
const isLocalStorageComplete = () => {
  return !!localStorage.getItem('prefix') && 
         !!localStorage.getItem('contentList') && 
         !!localStorage.getItem('tail');
};

// 发送请求并处理数据
const fetchDataAndSaveToLocalStorage = async () => {
  try {
    const response = await postDataToApi(
      global.selectedItems__Num, 
      global.luckValue === "流年运气" ? '/fleeting/analysisReport' : '/recent/analysisReport'
    );

    prefix.value = formatContentString(response.data.prefix, false, true);
    contentList.value = formatContentArray(response.data.contentList);
    tail.value = formatContentString(response.data.tail, true, false);

    // 保存到 localStorage
    localStorage.setItem('prefix', JSON.stringify(prefix.value));
    localStorage.setItem('contentList', JSON.stringify(contentList.value));
    localStorage.setItem('tail', JSON.stringify(tail.value));

    console.log('Data fetched and saved to localStorage.');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// 在组件挂载时的逻辑
onMounted(() => {
  // 第一步：检查 global.selectedItems__Num 是否为空
  if (global.selectedItems__Num.length > 0) {
    // 不为空，发送请求并保存数据到 localStorage
    fetchDataAndSaveToLocalStorage();
  } else {
    // 第二步：检查 localStorage 中是否有完整的数据
    if (isLocalStorageComplete()) {
      // 有完整的数据，恢复并使用
      restoreFromLocalStorage();
      console.log('Using data from localStorage.');
    } else {
      // 没有完整的数据，跳转到首页
      console.log('No data in localStorage, redirecting to home page.');
      router.push('/');
    }
  }
});

// 格式化内容数组
const formatContentArray = (contentList) => {
  return contentList.map(item => {
    const replaceContent = (content) => {
      let formattedContent = content.replace(/\n/g, '<br/>');
      formattedContent = formattedContent.replace(/(<br\/>)\s*/g, '$1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
      formattedContent = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${formattedContent}`;
      return formattedContent;
    };

    return {
      ...item,
      content: replaceContent(item.content)
    };
  });
};

// 格式化内容字符串
const formatContentString = (content, isTail = false, isPrefix = false) => {
  let formattedContent = content.replace(/\n/g, '<br/>');

  if (isTail) {
    formattedContent = formattedContent
      .replace(/<br\/>/, '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
      .replace(/感谢你使用《数测人生》命运分析系统！/g, '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp感谢你使用《数测人生》命运分析系统！');
  }

  if (isPrefix) {
    formattedContent = formattedContent.replace(/您/, '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您');
  }

  return formattedContent;
};
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
        <Dropdown :bgColor="'#ffffff5c'">
          <template #header-title>
            <img :src="title" alt="图片失效"/>
          </template>

          <template #fonts>
            <div v-html="prefix" class="required-content content-api"></div>

            <div v-for="item in contentList" :key="item.id" class="print-item">
              <div style="margin-top: 15px;">
                <div class="content-api content-title"><b>{{ item.title }}</b></div>
                <div class="content-api" v-html="item.content"></div>
              </div>
            </div>

            <div v-html="tail" class="content-api"></div>
          </template>

          <template #btn>
            <div class="btn-superbox" @click="btnClick" v-show="!store.state.pdf">
              <img class="btn" :src=exportBtn alt="图片失效">
            </div>
          </template>
        </Dropdown>
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
        height: auto;
        margin-bottom: 40px;
        position: relative; /* 为调整.btn-superbox 定位做准备 */
        z-index: 8;
    }
    .page-direction {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* 按钮 */	
    .btn-superbox {
        transform: scale(0.25);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 10;
        /* position: absolute;
        top: 680px; */
    }
    .btn {
        width: 100%;
        height: 100%;
        /* margin: 65px 0; */
        user-select: none;
        cursor: pointer;
    }


  /* ***********************打印 */
  @media print {
    .btn-superbox {
      display: none; /* 打印时隐藏按钮 */
    }

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
        transform: scale(0.35);
        top: 0px;
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
        height: 100%;
        }

        /* 按钮 */	
        .btn-superbox {
            transform: scale(1.0);
        }
        /* 按钮 */
        .btn {
        width: 50%;
        height: 50%;
        margin: 50px 0;
        }
        .btn-superbox {
          top: 0px;
        }
    }
</style>