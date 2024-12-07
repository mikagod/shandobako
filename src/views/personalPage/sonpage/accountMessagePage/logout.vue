<template>
	<div class="container">
		<img class="back" src="./../../../../assets/img/personalPage/accountMessage/login_out/back.png"
			@click="goto('/accountMessage')">
		<img class="logout-img" src="./../../../../assets/img/personalPage/accountMessage/login_out/告别.gif">
		<div>
			<span class="title">真的要告别善音同学了吗？</span>
			<br>
			<img class="logout-button" src="./../../../../assets/img/personalPage/accountMessage/login_out/改变主意.png"
				@click="goto('/accountMessage')">
			<img class="logout-button" src="./../../../../assets/img/personalPage/accountMessage/login_out/确认注销.png"
				@click="goto('/account_logout2')">
		</div>
		

	</div>
	
</template>

<script setup>

import { useRoute, useRouter } from 'vue-router'
import { deleteUser } from '../../../../axios/api';
const route = useRoute();
let router = useRouter();
const goto = async (path) => {
	if (path == '/account_logout2') {
		await deleteUser(route.params.id);
	}
	router.push(path)

};
</script>

<style lang="scss" scoped>
@import "./../../../../assets/font/font.css";

.container {
	position: relative;
	display: flex;
	justify-content: center;
	padding-top: 30px;
	flex-direction: column;
	padding-left: 30px;
	line-height: 10px;
	transform: scale(1.2);
	.logout-button {
		margin: 20px;
		padding-top: 100px;
	}

	.logout-img {
		margin-bottom: 40px;
	}

	.back {
		position: absolute;
		top: 40px;
		left: 40px;
	}

	.title {
		font-size: 30px;
		color: #546bbc;
		font-family: medium;
		font-weight: 100;
		margin: 50px;
	}


}

@media only screen and (max-width: 940px) {
	.container {
	width: 100%;
	height: 1000px;
	position: relative;
	display: flex;
	justify-content: center;
	flex-direction: column;
	line-height: 10px;
	padding-top: 0px;
	margin-top: -300px;
	transform: scale(0.8);
	.logout-button {
		margin: 0px;
		padding-top: 24px;
		scale: 0.7;
	}

	.logout-img {
		width: 50%;
		margin-bottom: 16px;
	}

	.back {
		position: absolute;
		width: 32px;
		top: 0px;
		display: none;
		left: 0px;
	}

	.title {
		margin: 0;
		font-size: 16px;
		color: #546bbc;
		font-family: medium;
		font-weight: 100;
	}


}
}
</style>