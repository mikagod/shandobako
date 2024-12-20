<template>
    <div class="myContainer">
        <img class="back" src="./../../../../assets/img/personalPage/accountMessage/login_out/back.png"
            @click="goto('/accountMessage')">

        <div class="top" style="transform: scale(1.3);">
            <img src="./../../../../assets/img/personalPage/accountMessage/address.png">
            编辑收货地址
        </div>

        <Form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed" style="transform: scale(1.3);">
            <FormItem class="region" label="收货人" name="consigneeName" :rules="[{ required: true, message: '请输入收货人信息' }]">
                <Input v-model:value="formState.consigneeName" />
            </FormItem>
            <FormItem class="region" label="手机号码" name="addressPhone" :rules="[{ required: true, message: '请输入手机号码!' }]">
                <Input v-model:value="formState.addressPhone" />
            </FormItem>
            <FormItem class="region" label="邮政编码" name="postalCode" :rules="[{ required: false, message: '请输入正确的邮政编码!' }]">
                <Input v-model:value="formState.postalCode" />
            </FormItem>
            <FormItem class="region" label="选择区域" name="area" :rules="[{ required: true, message: '请输入地区!' }]">
                <Cascader v-model:value="formState.area" placeholder="Please select" size="large" :options="options" />
            </FormItem>

            <FormItem class="region" label="详细地址" name="specificAddress" :rules="[{ required: true, message: '请输入详细地址!' }]">
                <Textarea v-model:value="formState.specificAddress" />
            </FormItem>

            <FormItem :wrapper-col="{ offset: 8, span: 16 }">
                <Button class="submit" type="primary" html-type="submit">保存</Button>
            </FormItem>

            <FormItem :wrapper-col="{ offset: 8, span: 16 }" class="phone-fix" style="min-height: 200px;">
                <div></div>
            </FormItem>
        </Form>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { Button, Input, Textarea, InputPassword, Form, FormItem, Cascader, message } from 'ant-design-vue'
import options from '../../../../util/address'
import { useRoute, useRouter } from 'vue-router'
import type { CascaderProps } from 'ant-design-vue';
import { insertAddress, updateAddress } from '../../../../axios/api';
const route = useRoute();
let router = useRouter();
const goto = (path: String) => router.push(path);
interface FormState {
    consigneeName: string;
    addressPhone: string;
    postalCode: string;
    area: string;
    specificAddress: string;
    userId: string;
}

const isExist = ref(route.params.exist)
onMounted(async () => {
    console.log(isExist.value);
})
const value = ref<string[]>([]);
const formState = reactive<FormState>({
    consigneeName: '',
    area: '',
    postalCode: '',
    addressPhone: '',
    specificAddress: '',
    userId: route.params.id,
});
const onFinish = async (values: any) => {
    if (Array.isArray(formState.area))
        formState.area = formState.area.join(' / ');

    const res = ref();
    if (isExist.value == "true") {
        res.value = await updateAddress(formState);
    }
    else { res.value = await insertAddress(formState); }
    console.log(res.value.data.code);

    if (res.value.data.code == 0) {
        message.success('更新成功,2s后返回个人中心');
        setTimeout(() => {
            goto("/index");
        }, 2000)
    } else {
        message.error(res.value.data.msg);
    }
    console.log(res.value);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
</script>



<style lang="scss" scoped>
.myContainer {
    transform: scale(1);

    .back {
        position: absolute;
        top: 40px;
        left: 40px;
    }

    .top {
        font-family: 'alimama';
        margin-bottom: 130px;
        font-size: 25px;
        color: #73c4ff;
        font-weight: bolder;
    }

    FormItem {
        width: 100px;
    }

    .region {
        width: 500px;
        margin-right: 100px;
        margin-bottom: 40px;
    }

    .submit {
        color: white;
        background: #ff9393;
        width: 100px;
        height: 50px;
        font-size: 18px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        margin-left: 50px;
    }

    position: relative;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;

    .phone-fix{
        display: none;
    }
}

@media only screen and (max-width: 940px) {
    .myContainer {
        transform: scale(1);
        width: 100%;
        height: 1120px;

        .back {
            width: 40px;
            position: absolute;
            top: 5vw;
            left: 5px;
        }

        .top {
            width: 170px;
            white-space: nowrap;
            font-family: 'alimama';
            // margin-top: 60px;
            margin-bottom: 160px;
            font-size: 16px;
            color: #73c4ff;
            font-weight: bolder;
            display: flex;
            align-items: center;

            img{
                width: 60px;
            }
        }

        .ant-form{
           display: flex;
           flex-direction: column;
           justify-content: center;
           align-items: center;
           margin-top: 30px;
        }

        FormItem {
            width: 100px;
        }

        .region {
            width: 80%;
            margin-bottom: 24px;
            margin-right: 0;
        }

        .submit {
            color: white;
            background: #ff9393;
            width: 100px;
            height: 50px;
            font-size: 18px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 30px;
            transform: translate(-80%,50%)scale(0.7);
        }

        position: relative;
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;

        .phone-fix{
            display: block;
        }

    }
}
</style>
