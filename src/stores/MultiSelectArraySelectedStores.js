/* 用于数测人生 流年运气多选列表 */

// 多选列表的图片资源
const injuryTreatmentBtn = new URL('/src/assets/image/img/font_blue/yearly_luck/财运如何.png', import.meta.url).href;
const workOfficialLuck = new URL('/src/assets/image/img/font_blue/yearly_luck/工作官运.png', import.meta.url).href;
const companyDevelopment = new URL('/src/assets/image/img/font_blue/yearly_luck/公司发展.png', import.meta.url).href;
const investmentProspects = new URL('/src/assets/image/img/font_blue/yearly_luck/投资吉凶.png', import.meta.url).href;
const emotionalMarriage = new URL('/src/assets/image/img/font_blue/yearly_luck/情感婚姻.png', import.meta.url).href;
const interpersonalRelations = new URL('/src/assets/image/img/font_blue/yearly_luck/人际关系.png', import.meta.url).href;
const whoCanHelp = new URL('/src/assets/image/img/font_blue/yearly_luck/谁能帮我.png', import.meta.url).href;
const askingForHelp = new URL('/src/assets/image/img/font_blue/yearly_luck/求人办事.png', import.meta.url).href;
const bearingChildren = new URL('/src/assets/image/img/font_blue/yearly_luck/生育子女.png', import.meta.url).href;
const physicalMentalHealth = new URL('/src/assets/image/img/font_blue/yearly_luck/身心健康.png', import.meta.url).href;
const illnessTreatment = new URL('/src/assets/image/img/font_blue/yearly_luck/伤病治疗.png', import.meta.url).href;
const marriageProspects = new URL('/src/assets/image/img/font_blue/yearly_luck/嫁娶吉凶.png', import.meta.url).href;
const officialDisputes = new URL('/src/assets/image/img/font_blue/yearly_luck/官灾是非.png', import.meta.url).href;
const academicExams = new URL('/src/assets/image/img/font_blue/yearly_luck/学业考试.png', import.meta.url).href;
const travelTrips = new URL('/src/assets/image/img/font_blue/yearly_luck/旅游出行.png', import.meta.url).href;
const vehicleProspects = new URL('/src/assets/image/img/font_blue/yearly_luck/车辆吉凶.png', import.meta.url).href;
const realEstateTransactions = new URL('/src/assets/image/img/font_blue/yearly_luck/房屋交易.png', import.meta.url).href;
const graveRelocation = new URL('/src/assets/image/img/font_blue/yearly_luck/迁坟吉凶.png', import.meta.url).href;
const fengshuiProspects = new URL('/src/assets/image/img/font_blue/yearly_luck/风水吉凶.png', import.meta.url).href;
const relocationProspects = new URL('/src/assets/image/img/font_blue/yearly_luck/搬迁吉凶.png', import.meta.url).href;
const lostItemsSearch = new URL('/src/assets/image/img/font_blue/yearly_luck/失物找寻.png', import.meta.url).href;
const tattooProspects = new URL('/src/assets/image/img/font_blue/yearly_luck/纹身吉凶.png', import.meta.url).href;
const omensOfEvents = new URL('/src/assets/image/img/font_blue/yearly_luck/交友预兆.png', import.meta.url).href;
const ownerProspects = new URL('/src/assets/image/img/font_blue/yearly_luck/助人吉凶.png', import.meta.url).href;
const harmProspects = new URL('/src/assets/image/img/font_blue/yearly_luck/害人吉凶.png', import.meta.url).href;
const resignationProspects = new URL('/src/assets/image/img/font_blue/yearly_luck/辞职吉凶.png', import.meta.url).href;
const skillLearning = new URL('/src/assets/image/img/font_blue/yearly_luck/技能学习.png', import.meta.url).href;
const livingTogetherProspects = new URL('/src/assets/image/img/font_blue/yearly_luck/与人同住吉凶.png', import.meta.url).href;
const relativeDeathProspects = new URL('/src/assets/image/img/font_blue/yearly_luck/亲人去世吉凶.png', import.meta.url).href;
const killingAnimalsOmen = new URL('/src/assets/image/img/font_blue/yearly_luck/杀伤动物预兆.png', import.meta.url).href;
const losingItemsOmen = new URL('/src/assets/image/img/font_blue/yearly_luck/失毁东西预兆.png', import.meta.url).href;
const petAdoptionAbandonment = new URL('/src/assets/image/img/font_blue/yearly_luck/收养弃养动物.png', import.meta.url).href;
const missingPeopleAnimals = new URL('/src/assets/image/img/font_blue/yearly_luck/走失人和动物.png', import.meta.url).href;
const weatherImpactOnTasks = new URL('/src/assets/image/img/font_blue/yearly_luck/做事天气影响.png', import.meta.url).href;

const injuryTreatmentBtn_white = new URL('/src/assets/image/img/font_white/yearly_luck/财运如何.png', import.meta.url).href;
const workOfficialLuck_white = new URL('/src/assets/image/img/font_white/yearly_luck/工作官运.png', import.meta.url).href;
const companyDevelopment_white = new URL('/src/assets/image/img/font_white/yearly_luck/公司发展.png', import.meta.url).href;
const investmentProspects_white = new URL('/src/assets/image/img/font_white/yearly_luck/投资吉凶.png', import.meta.url).href;
const emotionalMarriage_white = new URL('/src/assets/image/img/font_white/yearly_luck/情感婚姻.png', import.meta.url).href;
const interpersonalRelations_white = new URL('/src/assets/image/img/font_white/yearly_luck/人际关系.png', import.meta.url).href;
const whoCanHelp_white = new URL('/src/assets/image/img/font_white/yearly_luck/谁能帮我.png', import.meta.url).href;
const askingForHelp_white = new URL('/src/assets/image/img/font_white/yearly_luck/求人办事.png', import.meta.url).href;
const bearingChildren_white = new URL('/src/assets/image/img/font_white/yearly_luck/生育子女.png', import.meta.url).href;
const physicalMentalHealth_white = new URL('/src/assets/image/img/font_white/yearly_luck/身心健康.png', import.meta.url).href;
const illnessTreatment_white = new URL('/src/assets/image/img/font_white/yearly_luck/伤病治疗.png', import.meta.url).href;
const marriageProspects_white = new URL('/src/assets/image/img/font_white/yearly_luck/嫁娶吉凶.png', import.meta.url).href;
const officialDisputes_white = new URL('/src/assets/image/img/font_white/yearly_luck/官灾是非.png', import.meta.url).href;
const academicExams_white = new URL('/src/assets/image/img/font_white/yearly_luck/学业考试.png', import.meta.url).href;
const travelTrips_white = new URL('/src/assets/image/img/font_white/yearly_luck/旅游出行.png', import.meta.url).href;
const vehicleProspects_white = new URL('/src/assets/image/img/font_white/yearly_luck/车辆吉凶.png', import.meta.url).href;
const realEstateTransactions_white = new URL('/src/assets/image/img/font_white/yearly_luck/房屋交易.png', import.meta.url).href;
const graveRelocation_white = new URL('/src/assets/image/img/font_white/yearly_luck/迁坟吉凶.png', import.meta.url).href;
const fengshuiProspects_white = new URL('/src/assets/image/img/font_white/yearly_luck/风水吉凶.png', import.meta.url).href;
const relocationProspects_white = new URL('/src/assets/image/img/font_white/yearly_luck/搬迁吉凶.png', import.meta.url).href;
const lostItemsSearch_white = new URL('/src/assets/image/img/font_white/yearly_luck/失物找寻.png', import.meta.url).href;
const tattooProspects_white = new URL('/src/assets/image/img/font_white/yearly_luck/纹身吉凶.png', import.meta.url).href;
const omensOfEvents_white = new URL('/src/assets/image/img/font_white/yearly_luck/交友预兆.png', import.meta.url).href;
const ownerProspects_white = new URL('/src/assets/image/img/font_white/yearly_luck/助人吉凶.png', import.meta.url).href;
const harmProspects_white = new URL('/src/assets/image/img/font_white/yearly_luck/害人吉凶.png', import.meta.url).href;
const resignationProspects_white = new URL('/src/assets/image/img/font_white/yearly_luck/辞职吉凶.png', import.meta.url).href;
const skillLearning_white = new URL('/src/assets/image/img/font_white/yearly_luck/技能学习.png', import.meta.url).href;
const livingTogetherProspects_white = new URL('/src/assets/image/img/font_white/yearly_luck/与人同住吉凶.png', import.meta.url).href;
const relativeDeathProspects_white = new URL('/src/assets/image/img/font_white/yearly_luck/亲人去世吉凶.png', import.meta.url).href;
const killingAnimalsOmen_white = new URL('/src/assets/image/img/font_white/yearly_luck/杀伤动物预兆.png', import.meta.url).href;
const losingItemsOmen_white = new URL('/src/assets/image/img/font_white/yearly_luck/失毁东西预兆.png', import.meta.url).href;
const petAdoptionAbandonment_white = new URL('/src/assets/image/img/font_white/yearly_luck/收养弃养动物.png', import.meta.url).href;
const missingPeopleAnimals_white = new URL('/src/assets/image/img/font_white/yearly_luck/走失人和动物.png', import.meta.url).href;
const weatherImpactOnTasks_white = new URL('/src/assets/image/img/font_white/yearly_luck/做事天气影响.png', import.meta.url).href;

// 导入图标（选中、未选中）
const unChooseIcon = new URL('/src/assets/image/img/未选.png', import.meta.url).href; // 未选图标
const hvChooseIcon = new URL('/src/assets/image/img/已选.png', import.meta.url).href; // 已选图标

// 导入库
import { defineStore } from 'pinia';
import { reactive, ref, watch } from 'vue';

// 定义背景颜色（选中、未选中）
const bgColor = {
  hvBgColor: '#00d0d4', // 已选背景颜色 
  unBgColor: '#e3fdfe', // 未选背景颜色
} 


export const useSelectedStore = defineStore('selected', () => {
    
    // 保存 决定小盒子是否被选中的 true false 值
    const isChecked = ref([]); 

    // 保存 选中的小盒子的 名字
    const selectedItems = ref([]); 

    // 保存 图片数组

        // 黑字图片（未选中）
        const imgUrlArray = ref([
            injuryTreatmentBtn,workOfficialLuck,companyDevelopment,investmentProspects,emotionalMarriage,
            interpersonalRelations,whoCanHelp,askingForHelp,bearingChildren,physicalMentalHealth,
            illnessTreatment,marriageProspects,officialDisputes,academicExams,travelTrips,
            vehicleProspects,realEstateTransactions,graveRelocation,fengshuiProspects,relocationProspects,
            lostItemsSearch,tattooProspects,omensOfEvents,ownerProspects,harmProspects,
            resignationProspects,skillLearning,livingTogetherProspects,relativeDeathProspects,killingAnimalsOmen,
            losingItemsOmen,petAdoptionAbandonment,missingPeopleAnimals,weatherImpactOnTasks,
        ]);
        // 备份 黑字图片（未选中） 
        const imgUrlArray_backup = ref(
            JSON.parse(JSON.stringify(imgUrlArray.value))
        ); 
        // 白字图片（选中）
        const imgUrlArray_white = ref([
            injuryTreatmentBtn_white,workOfficialLuck_white,companyDevelopment_white,investmentProspects_white,emotionalMarriage_white,
            interpersonalRelations_white,whoCanHelp_white,askingForHelp_white,bearingChildren_white,physicalMentalHealth_white,illnessTreatment_white,
            marriageProspects_white,officialDisputes_white,academicExams_white,travelTrips_white,vehicleProspects_white,
            realEstateTransactions_white,graveRelocation_white,fengshuiProspects_white,relocationProspects_white,lostItemsSearch_white,tattooProspects_white,
            omensOfEvents_white,ownerProspects_white,harmProspects_white,resignationProspects_white,skillLearning_white,
            livingTogetherProspects_white,relativeDeathProspects_white,killingAnimalsOmen_white,losingItemsOmen_white,petAdoptionAbandonment_white,
            missingPeopleAnimals_white,weatherImpactOnTasks_white,
        ]); 

        /**
         * 第5页 字图 的特殊存取  
         */
        const selectedItems_5 = ref([]);
        const selectedItems_backup_5 = ref([]);
        const selectedItems_white_5 = ref([]);



    // 保存 选项 是否被选中的
    const chooseIcon = ref(imgUrlArray.value.map(() => unChooseIcon)); //  图标
    const bgColorItem = ref(imgUrlArray.value.map(() => bgColor.unBgColor)); // 背景颜色

    // 索引
    const indexItem = ref(-1); // 索引
    const indexItems = ref([]); // 索引数组
    

    // 统一操作
    function to_hv() {
        console.log(`索引为：`,indexItem.value,`（统一换成已选操作）`);
        chooseIcon.value[indexItem.value] = hvChooseIcon; // 换成已选
        bgColorItem.value[indexItem.value] = bgColor.hvBgColor; // 换成已选
        imgUrlArray.value[indexItem.value] = imgUrlArray_white.value[indexItem.value]; // 换成已选
    }
    function to_un() {
        console.log(`索引为：`,indexItem.value,`（统一换成未选操作）`);
        chooseIcon.value[indexItem.value] = unChooseIcon; // 换成未选
        bgColorItem.value[indexItem.value] = bgColor.unBgColor; // 换成未选
        imgUrlArray.value[indexItem.value] = imgUrlArray_backup.value[indexItem.value]; // 换成未选
    }
    function to_un_all(index) {
        console.log(`索引为：`,index,`（用于全部统一换成未选操作）`);
        chooseIcon.value[index] = unChooseIcon; // 换成未选
        bgColorItem.value[index] = bgColor.unBgColor; // 换成未选
        imgUrlArray.value[index] = imgUrlArray_backup.value[index]; // 换成未选
    }

      /**
       * 第5页 字图 的特殊更换样式 
       */
      function to_hv_5() {
        console.log(`索引为：`,indexItem.value,`（统一换成已选操作）`);
        chooseIcon.value[indexItem.value] = hvChooseIcon; // 换成已选
        bgColorItem.value[indexItem.value] = bgColor.hvBgColor; // 换成已选
        console.log('1选中啊啊啊啊啊啊啊啊啊',selectedItems_5.value[indexItem.value])
        console.log('白',selectedItems_white_5.value[indexItem.value])
        selectedItems_5.value[indexItem.value] = selectedItems_white_5.value[indexItem.value]; // 换成已选
        console.log('2选中啊啊啊啊啊啊啊啊啊',selectedItems_5.value[indexItem.value])
      }
      function to_un_5() {
        console.log(`索引为：`,indexItem.value,`（统一换成未选操作）`);
        chooseIcon.value[indexItem.value] = unChooseIcon; // 换成未选
        bgColorItem.value[indexItem.value] = bgColor.unBgColor; // 换成未选
        console.log('1不选中啊啊啊啊啊啊啊啊啊',selectedItems_5.value[indexItem.value])
        console.log('白',selectedItems_backup_5.value[indexItem.value])
        selectedItems_5.value[indexItem.value] = selectedItems_backup_5.value[indexItem.value]; // 换成未选
        console.log('2不选中啊啊啊啊啊啊啊啊啊',selectedItems_5.value[indexItem.value])
      }
      function to_un_all_5(index) {
        console.log(`索引为：`,index,`（用于全部统一换成未选操作）`);
        chooseIcon.value[index] = unChooseIcon; // 换成未选
        bgColorItem.value[index] = bgColor.unBgColor; // 换成未选
        selectedItems_5.value[index] = selectedItems_backup_5.value[index]; // 换成未选
      }


    // 监听索引变化
    watch(() => indexItem.value, (newValue, oldValue) => {
      if(!(indexItems.value.indexOf(newValue) !== -1)) {
        indexItems.value.push(newValue); // 记录索引
      }
    })

  return { 
    //---------------------------状态
    isChecked,
    selectedItems,
    chooseIcon,
    bgColorItem,
    indexItem,
    indexItems,
    imgUrlArray,
    imgUrlArray_backup,
    imgUrlArray_white,
    selectedItems_5,
    selectedItems_backup_5,
    selectedItems_white_5,
    //----------------------------操作
    to_hv,
    to_un,
    to_un_all,
    to_hv_5,
    to_un_5,
    to_un_all_5,
  };
});