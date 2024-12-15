import { createApp } from 'vue'
import { createPinia } from 'pinia';
import 'bulma/css/bulma.css'

import App from './App.vue' 
import bulma from 'bulma'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/reset.css';

import { Field, Lazyload, Popup, DatePicker, TimePicker } from "vant";
import "vant/lib/index.css";

//覆盖组件样式
import {getHomeConfiguration} from './axios/api.js';
getHomeConfiguration(30).then((res)=> {
    if (res.data.code == '0') {
        let link = document.querySelector('link[rel="icon"]');
         link.href =  res.data.data.url;
    }
})


const app = createApp(App);
const pinia = createPinia() // pinia实例
app.config.warnHandler = () => null


app
    .use(router)
    .use(ElementPlus)
    .use(store)
    .use(pinia)
    .use(bulma)
    .use(Field)
    .use(Lazyload)
    .use(Popup)
    .use(DatePicker)
    .use(TimePicker)
    .mount('#app');

