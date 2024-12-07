<template>
    <div class="dayun-card-unit" @click="handleCheck(data)">
      <span class="key">{{ data.title1 }}</span>
      {{ data.content1 }}
      <span class="key">{{ data.title2 }}</span>
      {{ data.content2 }}
    </div>
	
</template>

<script>
import { computed,ref, watch, reactive } from 'vue'
export default {
    name:'OriginMyItemSix',
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

.key {
  font-size: 19px;
  font-weight: 900;
  color: black;
}
</style>