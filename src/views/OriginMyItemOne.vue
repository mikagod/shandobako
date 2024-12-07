<template>
    <div class="dayun-card-unit" @click="handleCheck(data)">
      <span class="key">{{ beforeColon(data) }}</span>
      {{ afterColon(data) }}
    </div>
	
</template>

<script>
import { computed,ref, watch, reactive } from 'vue'
export default {
    name:'OriginMyItemOne',
		props:['index','data','checkTodo'],
		methods: {
			//勾选or取消勾选
			handleCheck(data){
				this.$emit('fMethod',data);
				const arr=reactive(data.split(' '))
			},
      beforeColon(str){
        let index = str.indexOf('：') == -1 ? str.indexOf(':'):str.indexOf('：');
        if (index > 30) {
          return ""
        }
        return  str.slice(0, index + 1); // 加上1是因为要包括':'
      },
      afterColon(str){
        let index = str.indexOf('：') == -1 ? str.indexOf(':'):str.indexOf('：');
        if (index > 30) {
          return str
        }
        return  str.slice(index + 1); // 加上1是因为要包括':'
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