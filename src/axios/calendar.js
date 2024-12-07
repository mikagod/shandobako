import axios from '../utils/request'
  //  const publicUrl=  'http://127.0.0.1:8080'
const publicUrl =  'https://www.shandobako.com/api'
// 查询八字
export function getBazi (params) {
  return axios({
    method: 'GET',
    url: `${publicUrl}/schedule/getBaZi`,
    params
  })
}

// 添加日程
export function addSchedule (params) {
  return axios({
    method: 'POST',
    url: `${publicUrl}/schedule/addSchedule`,
    data: params,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

// 删除当天所有日程
export function delAllSchedule (params) {
  return axios({
    method: 'GET',
    url: `${publicUrl}/schedule/delallSchedule`,
    params
  })
}

// 删除单个日程
export function delSingleSchedule (params) {
  return axios({
    method: 'DELETE',
    url: `${publicUrl}/schedule/delSchedule`,
    params
  })
}

// 更新日程
export function updSchedule (params) {
  return axios({
    method: 'POST',
    url: `${publicUrl}/schedule/updSchedule`,
    data: params,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

// 查询当日某个日程
export function getQueryoneschedule (params) {
  return axios({
    method: 'GET',
    url: `${publicUrl}/schedule/queryOneSchedule`,
    params
  })
}

// 通过年月日获取八字拼接年，月，日
export function getBaZinianyueri (params) {
  return axios({
    url: `${publicUrl}/schedule/getBaZiNianYueRi`,
    method: 'GET',
    params
  })
}

// 通过年月获取信息
export function getScheduleBynianyueInfo (params) {
  return axios({
    method: 'GET',
    url: `${publicUrl}/schedule/getScheduleByNianYue1`,
    params
  })
}

// 通过年月获取生肖和当日节气
export function getAnimalandJieQiByYearMonth (params) {
  return axios({
    method: 'GET',
    url: `${publicUrl}/schedule/getAnimalAndJieQiByNianYue`,
    params
  })
}

// 获取当天所有日程
export function getQueryallSchedule (params) {
  return axios({
    method: 'GET',
    url: `${publicUrl}/schedule/queryAllSchedule`,
    params
  })
}
