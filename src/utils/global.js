export default {
  getMonthDate(data) {
    const deps = {
      星期一: 1,
      星期二: 2,
      星期三: 3,
      星期四: 4,
      星期五: 5,
      星期六: 6,
      星期日: 0
    };
    const weekNum = deps[data[0].xingQiDate];
    if (weekNum < 7) {
      for (let i = 0; i < weekNum; i++) {
        data = [
          {
            date: null,
            isWeekend: false,
            weekDate: "",
            yinli: null,
            jieQi: null,
            holiday: null,
            isRecord: false
          },
          ...data
        ];
      }
    }
    return data;
  },
  checkDate(date) {
    if (date.length == 13) {
      const r = new RegExp(/^\d{4}\-\d{2}\-\d{2}\-\d{2}$/);
      if (r.test(date)) {
        return true;
      } else {
        alert("请输入正确的日期!");
        return false;
      }
    } else {
      alert("请输入您的生日信息！");
      return false;
    }
  }
};
