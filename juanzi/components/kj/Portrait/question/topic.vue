<template>
	<view class="topic">
		<text>
			{{item.itemOrder}}.
		</text>
		
		
		<text v-html="this.topicText"></text>
		
		[{{	item.questionType==1?
			"单选题": (item.questionType==2?
			"多选题": (item.questionType==3?
			"判断题":(item.questionType==4?
			"填空题":(item.questionType==5?
			"简答题":(item.questionType==6?
			"材料题":".")))))}}]
			
		({{item.score}}分)
		<block v-if="classify == 3">
			<block v-if="storeIconModel[item.itemOrder-1].trueFalse == 0">
				<image src="@/static/dui.png" style="width: 40rpx;height: 40rpx;margin-bottom: -12rpx;">	
			</block>
			<block v-else-if="storeIconModel[item.itemOrder-1].trueFalse == 1">
				<image src="@/static/cuowu.png" style="width: 40rpx;height: 40rpx;margin-bottom: -12rpx;">	
			</block>
		</block>
		
		<block v-if="classify == 4 && answerItems">
			<!-- <block v-if="(classify == 4 && answerItems) || classify == 3 "> -->
			<block v-if="answerItems.doRight == 'YES'">
				<image src="@/static/dui.png" style="width: 40rpx;height: 40rpx;margin-bottom: -12rpx;">	
			</block>
			<block v-else>
				<image src="@/static/cuowu.png" style="width: 40rpx;height: 40rpx;margin-bottom: -12rpx;">	
			</block>
		</block>
			
			
	</view>
	
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
			},
			answerItems:{
				type:Object,
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
				topicText:""
			}
		},
		mounted() {
			this.topicText = this.item.content.replace(/p>/g,"text>");
		},
	}
	
</script>
<style lang="scss" scoped>
	.topic{
		width: 100%;
		margin-top: 10rpx;
		@media (orientation : landscape) {
			image{
				display: inline-block;
				width: 23rpx !important;
				height: 23rpx !important;
				margin-bottom: -6rpx !important;
			}
		}
		image{
			margin-left: 6rpx;
		}
	}
</style>
