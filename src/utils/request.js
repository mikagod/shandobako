import Axios from "axios";
import Cookies from 'js-cookie'

// 引入提示框
import { ElMessageBox , ElMessage  } from "element-plus";

const axios = Axios.create({
  baseURL: "/api",
  timeout: 50000 // request timeout
});

let showMsg = true; //阻止错误多次弹窗
const isMobile =
  window.location.href.indexOf("Mindex.html") > -1 ? true : false;
// 添加请求拦截器  作用是在请求发送前进行一些操作
let token = Cookies.get('token')
axios.interceptors.request.use(
  config => {
    if (!token) {
      token = Cookies.get('token')
    }
    config.headers.token = token
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6InFxODMwMzAzIiwiZXhwIjoxNjk0MTQ4MTQyLCJ1c2VybmFtZSI6IjE4MTQ4NzY0NzM0In0.trFT9uWQuxtkG7DD0CB5e2GVGiUEM-SgsEJu2qhCBio";
    return config;
  },
  function(error) {
    if (isMobile) {
      alert("请求中错误:" + error);
    } else {
      // 抛出错误
      ElMessage.error("请求中错误:" + error);
    }
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器  作用是在接收到响应后进行一些操作
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (response.status == 200) { 
      if (response.data.code != 0) {
        //阻止弹窗多次弹出
        if (showMsg) {
          if (isMobile) {
            let isTure = confirm("错误");
            if (isTure) {
              localStorage.removeItem("userInfo");
            }
          } else {
            ElMessageBox.alert(response.data.msg, "错误", {
              confirmButtonText: "确定",
              type: "error"
            }).then(() => {
              if (response.data.code == 401) {
                localStorage.removeItem("userInfo");
              }
            });
          }
          showMsg = false;
          setTimeout(() => {
            showMsg = true;
          }, 3000);
        }
      }
    } else {
      // 获取成功后的错误提示
      if (isMobile) {
        confirm("系统错误");
      } else {
        ElMessageBox.alert("系统错误", "错误", {
          confirmButtonText: "确定",
          type: "error"
        });
      }
    }
    return response;
  },
  function(error) {
    // 在这里还可以进行响应码的判断
    switch (error.response.status) {
      case 400:
        error.message = "错误请求";
        break;
      case 500:
        error.message = "服务器端出错";
        break;
    }
    if (isMobile) {
      confirm("错误");
    } else {
      // 抛出错误提示
      ElMessageBox.alert(error, "错误", {
        confirmButtonText: "确定",
        type: "error"
      });
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default axios;
