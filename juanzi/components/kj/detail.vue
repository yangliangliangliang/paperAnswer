<template>
	<view class="detail">
		<text>标题：{{ title.name }}</text>
		<text>答题人：{{ title.userName }}</text>
		<text>答题用时：{{ calcTime(title.doTime) }}</text>
		<text>正确率：{{ title.accuracy }}</text>
	</view>
</template>

<script>
	// import { calcTimer } from "@/utils/index.js";
	export default {
		props:{
			title:{
				type:Object,
				default(){
					return {}
				}
			},
		},
		data() {
			return { }
		},
		methods:{
			calcTime(timer) {
				if(typeof timer == 'undefined' || null ) {
					return '00:00'
				};
				let mm = Math.floor(timer / 60)
				let ss = Math.floor(timer % 60)
				if(mm < 10) {
					mm = '0' + mm
				}
				if(ss < 10) {
					ss = '0' + ss
				}
				return mm + '分' + ss + "秒"
			}
		}
	}
	
</script>
<style lang="scss" scoped>
	.detail{
		width: 90%;
		height: 276rpx;
		margin: auto;
		background: #F5F5FA;
		opacity: 1;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-bottom: 40rpx;
		padding-left: 48rpx;
	}
	
</style>
