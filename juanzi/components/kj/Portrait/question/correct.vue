<template>
	<view class="correct">
		<view v-if="item.questionType==4" class="tk">
			<view class="answer com">正确答案：
				<text style="color: #1280EF;">
				
				</text>
			</view>
			<view class="com">答题用时：<text style="color: #1280EF;"></text></view>
			<view class="com">站内平均用时：<text style="color: #1280EF;"></text></view>
		</view>
		<view v-else-if="item.questionType==5" class="tk">
			<view class="answer com">正确答案：
				<text style="color: #1280EF;">
				
				</text>
			</view>
			<view class="com">答题用时：<text style="color: #1280EF;"></text></view>
			<view class="com">站内平均用时：<text style="color: #1280EF;"></text></view>
		</view>
		<view class="other" v-else>
			<view>正确答案：<text style="color: #1280EF;">{{ item.correct }}</text></view>
			<view>答题用时：<text style="color: #1280EF;"></text></view>
			<view>站内平均用时：<text style="color: #1280EF;"></text></view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object
			},
		},
		
		data() {
			return { }
		},
	}
</script>

<style lang="scss" scoped>
	.correct{
		width: 100%;
		height: 100%;
		margin: auto;
		font-size: 28rpx !important;
		
		.tk{
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.3);
			border-radius: 6rpx;
			@media (orientation : landscape) {
				.com{
					font-size: 20rpx;
				}
			}
			.com{
				margin: 15rpx  12rpx 0;
			}
			
		}
		@media (orientation : landscape) {
			.other{
				width: 100%;
				height: 35rpx !important;
				font-size: 20rpx;
				margin: 40rpx 0 20rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				border-radius: 46rpx;
				background: rgba(0, 0, 0, 0.3);
			}
		}
		.other{
			width: 100%;
			height: 80rpx;
			margin: 40rpx 0 20rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			border-radius: 46rpx;
			background: rgba(0, 0, 0, 0.3);
		}
	}
</style>
