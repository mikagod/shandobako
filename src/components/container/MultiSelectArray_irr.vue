<script setup>
    import { ref, computed, watch } from 'vue';
    import { useSelected_irrStore } from '@/stores/MultiSelectArray_irrStores'
    import { useGlobalStore } from '@/stores/global'

// store
const selectedStore = useSelected_irrStore();
const global = useGlobalStore();

    
// props
const props = defineProps({
    // 图片数组（未选、已选）
    imgUrlArray: {
        type: Array,
        required: true,
    },
    // imgUrlArray_Selected: {
    //     type: Array,
    //     required: true,
    // },
});

// 存类对象的数组
const items = computed(() => {
  return props.imgUrlArray.map((imgUrl, index) => {
    // 提取文件名部分
    const fileName = decodeURI(imgUrl.match(/\/([^/]+)\.png$/)?.[1] || '');

    // 提取文件名中的中文字符
    const fileNameLen = fileName.length;
    
    // 根据字长决定添加哪个类对象
    if (fileNameLen >= 2 && fileNameLen <= 7) {
      return { type: 's-item' };
    } else if (fileNameLen >= 8) {
      return { type: 'b-item' };
    } 
  }).filter(item => item !== undefined);
});

// 点击选项后触发的函数
function toggleCheck(index) {
    
    // 把选择元素索引存入全局状态中
    selectedStore.lastSelectedIndex = index;

    let cnString = decodeURI(props.imgUrlArray[index].match(/\/([^/]+)\.png$/)?.[1] || ''); // 选项中文名

    // 检查当前选项是否已经被选中
    const isSelectedName = selectedStore.names.includes(cnString);
    const isSelectedId = selectedStore.ids.includes(selectedStore.idcnMapHandler(cnString));

    // 如果当前选项已被选中，则取消选中
    if (isSelectedName || isSelectedId) {

        // 如果是第6页
        if (selectedStore.pageNum === 6) {
                    // global.showNumSelecte = false
                    selectedStore.resetChooseIcon(index); // 切换选中状态
                    global.selectedItems__Num.splice(selectedStore.ids.indexOf(selectedStore.idcnMapHandler(cnString)), 1) // 清除将传给后端的编号
                    selectedStore.ids.splice(selectedStore.ids.indexOf(selectedStore.idcnMapHandler(cnString)), 1); // 清除选中的id
                    console.log('剩下的选项：',selectedStore.ids, 
                                '\n取消的选项',selectedStore.idcnMapHandler(cnString))
        }else {
                    selectedStore.resetChooseIcon(index); // 切换选中状态
                    selectedStore.names.splice(selectedStore.names.indexOf(cnString), 1);
        }
    } else {
       
        
        // 如果是第6页
        if (selectedStore.pageNum === 6) {

                    console.log('开启数选框',global.showNumSelecte)
                     // 如果当前选项未被选中且选中的数量不超过5个，则选中
                    if (selectedStore.names.length < 6) {
                        // 开启数选框
                        global.showNumSelecte = true
                        selectedStore.resetChooseIcon(index); // 切换选中状态
                        selectedStore.ids.push(selectedStore.idcnMapHandler(cnString)); // 添加到编号里
                        console.log('中文',cnString,'编号',selectedStore.idcnMapHandler(cnString))
                    } else {
                        alert('最多选6个！');
                    }    
                    console.log(selectedStore.ids);
          
        } else {
                    // 如果当前选项未被选中且选中的数量不超过5个，则选中
                    if (selectedStore.names.length < 6) {
                        selectedStore.resetChooseIcon(index); // 切换选中状态
                        selectedStore.names.push(cnString); // 添加到名字里
                    } else {
                        alert('最多选6个！');
                    }
                    console.log(selectedStore.names);
        }

    }


}
</script>

<template>

        <!-- 主要选项 -->
        <div 
            v-for="(item, index) in items" :key="index" 
            :class="['item', item.type]" 
            :style="{ backgroundColor: selectedStore.bgColorItem[index] }"
            @click="toggleCheck(index)"
        >
            <img :src="selectedStore.chooseIcon[index]" alt="图片失效" class="icon-img">
            <img :src="imgUrlArray[index]" alt="图片失效" class="font-img">
        </div>
        <div class="item s-item" style="background-color: #f4edff;">
            <img src="/src/assets/image/img/必选.png" alt="图片失效" class="icon-img">
            <img src="/src/assets/image/img/人工咨询服务.png" alt="图片失效" class="font-img">
        </div>
        <!-- 占位隐形选项 -->
        <div class="item s-item-placeholder"></div>
        <div class="item s-item-placeholder"></div>
        <div class="item s-item-placeholder"></div>
        <div class="item s-item-placeholder"></div>

</template>

<style scoped>
        img {
            user-select: none;
        }
        /* 总选项 */
        .item {
            background-color: rgb(227, 253, 254);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
            /* 选中图标 */
            .item .icon-img {
                position: absolute;
                left: 12px;
                width: 30px;
            }
            /* 文字图片 */
            .item .font-img {
                margin-left: 30px;
                transform: scale(0.75);
            }
        /* 小选项 */
        .s-item {
            width: 32%;
            height: 85px;
        }
        /* 大选项 */
        .b-item {
            width: calc(93% + 60px);
            height: 85px;
        }
        /* 占位选项 */
        .s-item-placeholder {
            width: 31%;
            height: 0;
        }


        /* ********************媒体查询 */

        /* 超大屏幕 > 2560px */
        @media screen and (min-width: 2560px) {

        }

        /* 中屏幕 < 1200px */
        @media screen and (max-width: 1200px) {
                /* 总选项 */
                .item {
                    border-radius: 10px;
                }
                /* 选中图标 */
                .item .icon-img {
                    position: absolute;
                    left: 5px;
                    width: 15px;
                }
                /* 文字图片 */
                .item .font-img {
                    margin-left: 18px;
                    transform: scale(0.45);
                }
            /* 小选项 */    
            .s-item {
                width: 45%;
                height: 50px;
            }
            /* 大选项 */
            .b-item {
                width: calc(84% + 62px);
                height: 50px;
            }
            /* 占位选项 */
            .s-item-placeholder {
                width: 45%;
                height: 0;
            }

        }

        /* 小屏幕 < 768px */
        @media screen and (max-width: 767.98px) {
                /* 总选项 */
                .item {
                    border-radius: 10px;
                }
                /* 选中图标 */
                .item .icon-img {
                    position: absolute;
                    left: 5px;
                    width: 15px;
                }
                /* 文字图片 */
                .item .font-img {
                    margin-left: 18px;
                    transform: scale(0.7);
                    height: 20px;
                }
            /* 小选项 */    
            .s-item {
                width: 45%;
                height: 50px;
            }
            /* 大选项 */
            .b-item {
                width: 100%;
                height: 50px;
            }
            /* 占位选项 */
            .s-item-placeholder {
                width: 45%;
                height: 0;
            }
        }
</style>