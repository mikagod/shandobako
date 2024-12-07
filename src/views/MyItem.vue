<template>
    <div class="dayun-card-unit" @click="handleCheck(data)">
        {{ data }}
    </div>
	
</template>

<script>
import { computed,ref, watch, reactive } from 'vue'
export default {
    name:'MyItem',
		props:['index','data','checkTodo'],
		methods: {
			//勾选or取消勾选
			handleCheck(data){
				this.$emit('fMethod',data);
				const arr=reactive(data.split(' '))
			},
		},
    }

</script>
  
<style scoped>
.dayun-card-unit{
	font-size: 17px;
}
</style>