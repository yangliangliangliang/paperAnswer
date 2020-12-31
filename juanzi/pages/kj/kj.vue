<template>
	<view class="kj">
		<!-- 横屏 -->
		<block v-if="Hscreen == 0">
			<landscape :sheetData="sheetData" :answerItems="answerItems" :classify="classify"/>
		</block>
		
		<!-- 竖屏 -->
		<block v-else-if="Hscreen == 1 && [3,4].includes(classify)">
			<!-- 标题  -->
			<detail :title="title" ></detail>
			
			<!-- 竖屏内容 -->
			<Portrait :sheetData="sheetData" 
				:answerItems="answerItems" 
				:classify="classify"
				:storeIconModel="storeIconModel"/>
			
			<!-- 总结 -->
			<induce :classify="classify"></induce>
		
		</block>
		
		<block v-else>
			<!-- 竖屏内容 -->
			<Portrait :sheetData="sheetData" 
				:answerItems="answerItems" 
				:classify="classify"
				:storeIconModel="storeIconModel"/>
		</block>
		
	</view>
	
	
</template>

<script>
	import landscape  from "@/components/kj/landscape.vue";
	import Portrait  from "@/components/kj/Portrait.vue";
	import detail from "@/components/kj/detail.vue";
	import induce from "@/components/kj/induce.vue";
	import store from "@/store/index.js";
	export default {
		components:{
			landscape,
			Portrait,
			detail,
			induce,
		},
		onLoad() {
			let { questionData,answerItems,Hscreen,classify,title } = store.state.paperData;
			let storeIconModel  = store.state.storeIconModel;
			this.sheetData = questionData;
			this.answerItems = answerItems || [];
			this.Hscreen  = Hscreen;
			this.classify  = classify;
			this.title  = title;
			this.storeIconModel = storeIconModel;
		},
		data() {
			return { 
				sheetData:[],
				answerItems:[],//答案
				Hscreen:"",//=>0 横屏 1 竖屏
				currentIndex:0,//=>当前所在滑块的 index
				classify:1,
				title:{},
				storeIconModel:[]
			}
		},
		methods:{
			
		}
	}
</script>


<style lang="scss" scoped>
	page{
		height: 100%;
		color: #000000;
	}
	.kj{
		height: 100%;
	}
	.button{
		width: 80%;
		height: 100%;
		border-radius: 50rpx;
		margin-top: 50rpx;
	}
	
	

</style>


