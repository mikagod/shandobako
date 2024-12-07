const localStorageObject = {
    // 定义一个方法来设置token
    setToken(authToken) {
        const expirationTime = Date.now() + 6 * 60 * 60 * 1000; // 当前时间加上6个小时
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('authTokenExpiration', expirationTime.toString());
    },
    // 定义一个方法来获取token
    getToken() {
        const expirationTime = localStorage.getItem('authTokenExpiration');
        const isTokenExpired = expirationTime ? new Date(parseInt(expirationTime, 10)).getTime() < Date.now() : true
        if (isTokenExpired) {
            // 这里可以清除token或者重新登录
            localStorage.removeItem('authToken');
            localStorage.removeItem('authTokenExpiration');
        } else {
            return localStorage.getItem('authToken');
        }
        return null;
    },
    setUserName(loginUsername) {
        localStorage.setItem('loginUsername', loginUsername);
    },
    getUserName() {
        return localStorage.getItem('loginUsername');
    },
    setPhone(loginPhone) {
        localStorage.setItem('loginPhone', loginPhone);

    },
    getPhone() {
        return localStorage.getItem('loginPhone');
    },
    setMemberLevel(loginMemberLevel) {
        localStorage.setItem('loginMemberLevel', loginMemberLevel);

    },
    getMemberLevel() {
        return localStorage.getItem('loginMemberLevel');
    }

};
export default localStorageObject
