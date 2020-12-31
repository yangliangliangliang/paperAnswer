<template>
	<swiper class="swiper" @change="changePaper" :current=" $store.state.paperData.exactItem ">
		<swiper-item v-for="(item,index) in sheetData" :key="index" >
			<scroll-view scroll-y="true" class="Hlist">
				<question 
					:item="item" 
					:index="index" 
					:sheetData="sheetData" 
					:answerItems="answerItems"
					:classify="classify">
				</question>
			</scroll-view>
		</swiper-item>
	</swiper>
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
			}
		},
		data() {
			return { }
		},
		methods:{
			//页面切换
			changePaper(e){
				let index = e.detail.current;
				this.$store.commit("switchItem",index );
				window.webkit.messageHandlers.currentNumber.postMessage({"params":index+1});
			},
			//滑动取消批改弹窗
			handletouchmove(){
				let refresh = debounce(this.$dialogInput.close,400,true);
				refresh();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.swiper{
		height: 100%;
		.Hlist{
			height: 100%;
			overflow: hidden;
			display: flex;
		}	
	}
</style>
