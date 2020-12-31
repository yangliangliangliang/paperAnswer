<template>
	<view class="list" >
		<!-- 题目 -->
		<topic :item="item" 
				:answerItems="answerItems[index]" 
				:classify="classify"
				:storeIconModel="storeIconModel"/>
	
		<!-- 音频，视频 -->
		<AV :item='item'></AV>
		
		<!-- ABCD选项 -->
		<prefixContet :pageList="sheetData[index]" 
			:answerItems="answerItems" 
			:classify="classify">
		</prefixContet>
		
		<!-- 批改 -->
		<block v-if="[1,4,5].includes(classify) ">
			<!-- 正确答案 -->
			<correct :item='item' ></correct>
			<!-- 解析 -->
			<analyze :item='item'></analyze>
		</block>
		
		<block v-else-if="classify  == 3 ">
			<!-- 正确答案 -->
			<correct :item='item' ></correct>
			<!-- 解析 -->
			<analyze :item='item'></analyze>
			<!-- 批改 -->
			<pigai :itemOrder='item.itemOrder'></pigai>
		</block>
		
		
		<!-- 分割线 -->
		<view class="border"></view>
		
		
		
	</view>
</template>

<script>
	
	import topic from "./question/topic.vue";
	import prefixContet from "./question/prefixContet.vue";
	import pigai from "./question/pigai.vue";
	import analyze from "./question/analyze.vue";
	import correct from "./question/correct.vue";
	import AV from "./question/Audio_video.vue";
	export default {
		components:{
			topic,
			prefixContet,
			pigai,
			analyze,
			correct,
			AV
		},
		// mixins:
		props:{
			item:{
				type:Object
			},
			index:{
				type:Number
			},
			sheetData:{
				type:Array
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
			return { 
				type: 'top',
				msgType: 'success',
				message: '这是一条成功消息提示',
				value: '默认输入的内容'
			}
		},
		
	}
</script>
<style lang="scss" scoped>
	
	.list{
		width: 94%;
		flex: 1;
		margin: auto;
		.border{
			width: 94%;
			height: 2rpx;
			opacity: 1;
			margin: 40rpx  0 60rpx ;
		}
	}
</style>
