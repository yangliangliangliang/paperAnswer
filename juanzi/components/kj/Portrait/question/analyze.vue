<template>
	<view class="analyze" >
		<view style="color: #1280EF;width: 100%;">
			解析：
		</view>
		<view style="margin: 20rpx 0 0  80rpx;" v-html="item.analyze"></view>
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
	.analyze{
		width: 100%;
		margin: auto;
		margin: 40rpx 0 20rpx;
		color: #000000;
	}
	
</style>
