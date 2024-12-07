<template>
  	<!--全屏显示-->
	 
	 <div class="index-center-wrap" style="    height: 610px !important;" >
		    <div style="margin-bottom:24px" class="
			  column
			  is-half-mobile
			  is-one-third-tablet
			  is-one-fifth-desktop
			">
			</div>
			<div class="container is-max-desktop" style="max-width: 600px;">

		<!--用户注册模块-->
		<div id="section" style="height:600px">
			<div action="success.html" method="post" class="box content has-text-centered">

				<img src="/src/assets/img/shandobako.png" style="width: 600px;height: 164px" />


				<h1 style="font-size: 20px; font-family:微软雅黑; color: dodgerblue ;" align="center"> <b>--- 用户注册 ---</b>
				</h1>

			

				<div style="width:400px;margin:0 auto">
					<div class="field mt-2">
					<div class="control">
						<input class="input is-info" type="text" v-model="userdata.name" name="userName" placeholder="请设置您的用户名" maxlength="20"
							pattern="\w{3,20}" required />
					</div>
				</div>

				<div class="control">
					<input class="input is-info is-focused" type="password" name="pwd" placeholder="请设置您的密码"
						maxlength="16" pattern="\w{6,16}" required v-model="userdata.password"/>
				</div>

				<div class="field mt-3">
					<div class="control code-wrap">
						<input class="input is-info" type="tel" name="tel" placeholder="请输入您的手机号" maxlength="11"
							pattern="1[3578]\d{9}" required v-model="userdata.phone" />
							<button class="codebtn button is-info is-outlined is-normal" :disabled="btnclicn" @click="getcode">{{ btntext }}</button>
							
					</div>
				</div>

				<div class="control">
					<input class="input is-info is-focused" type="password" name="pwd" placeholder="验证码"
						maxlength="16"  pattern="\w{6,16}" disable="true" required v-model="userdata.code"/>
				</div>
					<!--点击注册-按钮-->
					<div class="control">
					<input style="width:100%" type="submit" name="sub" @click="submint" :disabled="submintbtn" value="点击注册" class="button is-info is-outlined is-normal mt-2">
				</div>
				</div>
				<div class="control mt-2" v-show="false">
					<p>
                    <span>性别：</span> 
                    <input type="radio" id="sex" name="sex" value="男" v-model="userdata.sex" /> 男
                    <input type="radio" id="sex" name="sex" value="女" v-model="userdata.sex"/> 女
               	 </p>
				</div>

			

				<p id="ycjh" class="mt-2" style="font-size:15px" align="center">注册后将免费获得3次预测机会</p>

			</div>
		</div>

		<!--页脚-->

	</div>
	
	<footer class="footer is-rounded has-background-info-light">
			<div class="content has-text-centered">
				<p>
					<strong>Shandobako</strong> Designed by <a href="#/main">SDBK Lab.</a>
					<strong>Shandobako</strong> Designed by <a href="#/main">SDBK Lab.</a>
					<br>| 粤公网安备 44080202000111号 |
				</p>
			</div>
		</footer>
	 </div>

</template>

<script setup>
	import {ref} from 'vue'
	import {GetCode,signup} from '../axios/api.js'
	import {useRouter} from 'vue-router'
	import store from "../store/index.js";

	const router = useRouter()
	let userdata = ref({
		phone:"",
		code:"",
		type:"reg",
		name:"",
		password:"",
		newPassword:"",
		sex:"男",
		level:"1"
	})
	let submintbtn = ref(false)
	 const submint = async ()  =>{
		if(userdata.value.phone == '' || userdata.value.code == ''|| userdata.value.name == '' || userdata.value.password == ''){
			alert('缺少必填内容')
			return false
		}else{
			userdata.value.newPassword = userdata.value.password
			submintbtn.value = true
			// const res = await signup(userdata.value)
			// console.log(res)
			signup(userdata.value).then((res)=>{
		
				if(res.data.code == '0'){
					alert('注册成功')
					router.push('/login')
				}else{
					alert(res.data.msg)
				}
				
			}).finally((err)=>{
                submintbtn.value = false
            })
		}
	}
	let btntext = ref('获取验证码')
	let btnclicn = ref(false)
	const getcode = () =>{
		var reg='^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-9])|(18[0-9])|166|198|199|191|(147))\\d{8}$';
		var regExp=new RegExp(reg);
		if (regExp.test(userdata.value.phone )) {
			
			
			GetCode({"phone":userdata.value.phone,"type":"login"}).then((res)=>{
				// console.log(res)
					if(res.data.code == '0'){
						let time = 60
						btnclicn.value = true
						let timer = setInterval(() => {
							time = time -1
							btntext.value = time + 's'

							if(time < 1){
								clearInterval(timer)
								btntext.value = '获取验证码'
								btnclicn.value = false
							}
						}, 1000);
					}
			})
     	 }else{
			alert("手机号格式错误")
			return false
		 }
      
	}
</script>

<style lang="scss" scoped>
@import url('../assets/css/main.css');
.code-wrap{
	text-align: left;
	input{
		display: inline-block;
		width: 70%;
	}
	button{
		display: inline-block;
		width: 30%;
		height: 100%;
	}
}
.index-center-wrap{
	 background-color: #00D1B2;
}

</style>