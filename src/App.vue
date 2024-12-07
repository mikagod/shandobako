<script setup>
	import store from "./store/index.js";

	// console.log(import.meta.env)
	import vipGet from './views/VIP-get.vue'
	const haha = ref(11);//这里的ref不用引入，因为我配置了自动引入，可在vite.config.ts下配置
</script>

<template>

	<router-view v-slot="{ Component }">
		<component :is="Component" />
	</router-view>
	<vipGet v-show="store.state.showGetVIP"></vipGet>
</template>

<style scoped>
	body {
		padding: 0;
		margin: 0;
	}
</style>