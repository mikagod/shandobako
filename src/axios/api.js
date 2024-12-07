import { message } from "ant-design-vue";
import axios from "./index";
import originAxios from 'axios'

// 注销
export const deleteUser = async (id) => {
    try {
        const res = await axios.delete(
            '/api/deleteUser',
            {
                params: {
                    sdid: id,
                    phone: localStorage.getItem('superUserPhone')
                }
            }
        )
        return res;
    } catch (e) {
        console.log(e);
    }
}
// 轮询查看支付状态
export const getBillState = async (v) => {
    try {
        const res = await axios.post('/api/checkOrderStatus',v)
        return res;
    } catch (e) {
        console.log(e);
    }
}
// 修改地址
export const updateAddress = async (v) => {
    try {
        const res = await axios.put('/api/updateAddress',v)
        return res;
    } catch (e) {
        console.log(e);
    }
}
// 添加地址
export const insertAddress = async (v) => {
    try {
        const res = await axios.post('/api/insertAddress',v)
        return res;
    } catch (e) {
        console.log(e);
    }
}
// 支付接口
export const getProductList = async () => {
    try {
        const res = await axios.post('/api/listProduct')
        return res;
    } catch (e) {
        console.log(e);
    }
}
// 支付接口
export const payApi = async (v) => {
    try {
        const res = await axios.post('/api/payForOrder',v)
        return res;
    } catch (e) {
        console.log(e);
    }
}
//手机支付接口
export const payApiPhone = async (v) => {
    try {
        const res = await axios.post('/api/payForOrderH5',v)
        return res;
    } catch (e) {
        console.log(e);
    }
}
//获取用户IP
export const getIP = async () => {
    const res = await originAxios.get("/ipJson.jsp?json=true")
    return res.data.ip
}
export const getEmaiDetail = async (id) =>{
    try{
        const res = await axios.get(
            '/api/queryMailboxById',
            {
                params: {
                    id: id
                }
            }
        );
        if(res.data.code==0){
            return res;
        }else{
            message.warn(res.data.msg);
        }
    }catch(err){
        message.error('网络错误！')
    }
}
export const getEmaiList = async (param) =>{
    try{
        const res = await axios.get(
            '/api/queryMailboxByUserId',
            {
                params: param
            }
        );
        if(res.data.code==0){
            return res;
        }else{
            message.warn(res.data.msg);
        }
    }catch(err){
        message.error('网络错误！')
    }
}
// 查询某个用户是否已认证。传入手机号
export const identifyQuery = async (v) => {
    try {
        const res = await axios.post('/api/listUserRelevant',v)
        return res;
    } catch (e) {
        console.log(e);
    }
}
// 身份认证
export const idCardSubmit = async (v) => {
    try {
        const res = await axios.post('/api/realName',v)
        if(res.data.code!=0){
            message.error(res.data.msg);
        }else{
            message.success('身份认证已成功!')
        }
        return res;
    } catch (e) {
        console.log(e);
    }
}
// 获取订单
export const getBills = async (v) => {
    try {
        const res = await axios.post(
            '/api/listOrder',
            v
            // post的第二个参数跟get的不一样，get的是config，post的是data
        );
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}
// 获取用户地址
export const getAddress = async (param) => {
    try {
        const res = await axios.get(
            '/api/findAddress',
            {
                params: param,
                // data: {bodyData1:"这里是请求体参数,但是在GET中这个data参数加了也没用"}
                // 而在post中，这样子写的话，params和data都会被当做是请求体参数.
            } //这里是一个config对象，不止用来放params
        );
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const updateUser = (data) => {
    return axios.put('/api/updateUserData', data)
}
export const getUserData = (phone) => {
    return axios.post('/api/auth', phone)
}
export const GetCode = (data) => {
    return axios.post('/api/send', data)
}

export const signup = (data) => {
    return axios.post('/api/signup', data)
}
export const login = (data) => {
    return axios.post('/api/login', data)
}
export const logout = (data) => {
    return axios.post('/api/logout', data)
}
export const loginsms = (data) => {
    return axios.post('/api/loginSms ', data)
}
export const resetpassword = (data) => {
    return axios.put('/api/resetPassword', data)
}
export const updatephone = (data) => {
    return axios.post('/api/updatephone ', data)
}
export const checkphone = (data) => {
    return axios.post('/api/checkphone ', data)
}
export const auths = (data) => {
    return axios.post('/api/auth ', data)
}
export const getDaYun = (data) => {
    return axios.get('/life/getDaYun?' + 'gender=' + data.gender + '&nian=' + data.nian + '&yue=' + data.yue + '&ri=' + data.ri + '&shi=' + data.shi)
}
export const getLiuNian = (data) => {
    return axios.get('/life/getLiuNian?' + 'gender=' + data.gender + '&nian=' + data.nian + '&yue=' + data.yue + '&ri=' + data.ri + '&shi=' + data.shi + '&daYunIndex=' + data.daYunIndex )
}
export const getUserDecision = () => {
    return axios.get('/api/getUserDecision')
}

export const getHomeConfigurations = () => {
    return axios.get('/homeconfigurations/getHomeConfigurations')
}
export const getHomeConfiguration = (id) => {
    return axios.get('/homeconfigurations/getHomeConfiguration?id=' + id)
}
