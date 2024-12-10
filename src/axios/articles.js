// import axios from 'axios';
import axios from "./dayunIndex"; // 用的dayunIndex的过滤器等

/**
 * 发送POST请求，获取数据。
 * 
 * @param {Array<Object>} data - 要发送的数据数组
 * @param {string} API_URL - API的URL地址
 * @returns {Promise<Object>} - 返回API响应的数据
 */
export const postDataToApi = async (data, API_URL) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Detailed error:', error);
    const errorMessage = error.response ? error.response.data?.message || error.response.statusText : error.message;
    throw new Error(errorMessage || '提交数据失败');
  }
};