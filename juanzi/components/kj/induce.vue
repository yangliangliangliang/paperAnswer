<template>
	<view class="induce">
		<textarea :disabled="classify == 4"  
				placeholder-class="placeholder-class" 
				maxlength = 110 
				:placeholder="placeholder"
				@blur="bindTextAreaBlur"/>
		
		<!-- 完成 -->
		<block v-if="classify !== 4">
			<view class="example-body" >
				<button class="button" type="primary" @click="confirm">
				<text class="button-text">完成</text></button>
			</view>
		</block>
		
		
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object
			},
			classify:{
				type:Number
			}
		},
		
		data() {
			return { 
				placeholder:"为此用户本次练习写下简单评语进行鼓励吧...",
				detailValue:"",
			}
		},
		methods:{
			bindTextAreaBlur(e){
				this.detailValue = e.detail.value;
				//添加评语
				this.$store.commit("getComment",{detailValue:this.detailValue});
				console.log(123)
			},
			confirm(){
				let data = this.$store.state.modelData;
				console.log(data)
				// window.webkit.messageHandlers.setPaperAnswerData.postMessage({"params":data});
			}
		}
	}
	
</script>
<style lang="scss">
	.induce{
		width: 94%;
		height: 240rpx;
		margin: auto;
		background: #F5F7FB;
		opacity: 1;
		border-radius: 20rpx;
		font-size: 30rpx;
		.example-body{
			width: 80%;
			margin: auto;
			padding-bottom: 100rpx;
			.button{
				border-radius: 45px;
			}
		}
		@media (orientation : landscape) {
			.placeholder-class{
				font-size: 22rpx !important;
			}
			textarea{
				height: 240rpx;
				margin-bottom: 20rpx;
				font-size: 20rpx !important; 
			}
		}
		textarea{
			width: 100%;
			padding-top: 20rpx;
			text-indent:50rpx;
		}
		.placeholder-class{
			font-size: 30rpx;
		}
	}
	
</style>
