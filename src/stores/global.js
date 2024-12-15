/* 用于数测人生 */

// src/stores/global.js
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const useGlobalStore = defineStore('global', () => {

  // 决定是否显示 白色下背景
  const showWhiteBG = ref(true);

  // 保存 `流年运气` 或 `近期运气` 字符
  const luckValue = ref('');

  // 保存 被选中的元素 数组
  const selectedItems = ref([]);
  const selectedItems_whilte = ref([]);

  // 保存5的被选中的元素 数组
  const selectedItems_five = ref([]);
  const selectedItems_whilte_five = ref([]);

  
  // 保存 被选中的元素 + 对应的数字
  const selectedItems__Num = ref([]);

  // 页数（用于显示数选框）
  const pageNum = ref('0');
  
  // 用于 显示数选框
  const showNumSelecte = ref(false);





  return { 
    showWhiteBG,
    //---------------------------
    luckValue,
    //---------------------------
    selectedItems,
    selectedItems_whilte,
    //---------------------------
    selectedItems_five,
    selectedItems_whilte_five,
    //---------------------------
    selectedItems__Num,
    //---------------------------
    showNumSelecte,
    pageNum,
    //---------------------------
  };
});