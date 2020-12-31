<template>
	<view class="box" @touchmove="handletouchmove">
		<view v-for="(item,index) in sheetData" :key="index" class="boxContent">
			<question :item="item" 
					:index="index" 
					:sheetData="sheetData" 
					:answerItems="answerItems"
					:classify="classify"
					:storeIconModel="storeIconModel">
			</question>
		</view>	
	</view>
</template>

<script>
	import question from "./Portrait/question.vue";
	import { debounce } from "@/utils/index.js";
	export default {
		components:{
			question
		},
		props:{
			sheetData:{
				type:[Array,Object]
			},
			answerItems:{
				type:Array
			},
			classify:{
				type:Number
			},
			storeIconModel:{
				type:Array
			}
		},
		data() {
			return { }
		},
		methods:{
			//滑动取消批改弹窗
			handletouchmove(){
				let refresh = debounce(this.$dialogInput.close,400,true);
				refresh();
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		display: flex;
		flex-direction: column;
		flex: 1;
		
		.boxContent{
			flex: 1;
		}
	}
</style>
