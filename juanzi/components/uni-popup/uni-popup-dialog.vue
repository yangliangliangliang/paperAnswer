<template>
	<view class="uni-popup-dialog">
		<view class="uni-dialog-title">
			<text class="uni-dialog-title-text" :class="['uni-popup__'+dialogType]">{{title}}</text>
		</view>
		<view class="example-body">
			<view v-for="(item,index) in modifyData"
					:key="index" 
					class="uni-dialog-content-list"
					@click="contentClick(index)">
				<view :class="[currentIndex == index?'active com':'title com']"></view>
				<view>
					{{item.content}}
				</view>
			</view>
			<view class="uni-dialog-content">
				<text class="uni-dialog-content-text" v-if="mode === 'base'">
					{{content}}
				</text>
				<input v-else class="uni-dialog-input" 
					v-model="val" 
					maxlength="4"
					@blur="inputBlur"
					:placeholder="placeholder" 
					:focus="focus" >
			</view>
		</view>
		
		<view class="uni-dialog-button-group">
			<view class="uni-dialog-button" @click="close">
				<text class="uni-dialog-button-text">取消</text>
			</view>
			<view class="uni-dialog-button uni-border-left" @click="onOk">
				<text class="uni-dialog-button-text uni-button-color">确定</text>
			</view>
		</view>
		
		

	</view>
</template>



<script>
	export default {
		name: "uniPopupDialog",
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			placeholder: {
				type: [String, Number],
				default: '请输入内容'
			},
			/**
			 * 对话框主题 success/warning/info/error	  默认 success
			 */
			type: {
				type: String,
				default: 'error'
			},
			/**
			 * 对话框模式 base/input
			 */
			mode: {
				type: String,
				default: 'base'
			},
			/**
			 * 对话框标题
			 */
			title: {
				type: String,
				default: '提示'
			},
			/**
			 * 对话框内容
			 */
			content: {
				type: String,
				default: ''
			},
			/**
			 * 拦截取消事件 ，如果拦截取消事件，必须监听close事件，执行 done()
			 */
			beforeClose: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				dialogType: 'error',
				focus: false,
				val: "",
				currentIndex:0,
				modifyData:[
					{
						content:"正确"
					},
					{
						content:"错误"
					},
				],
				clickIndex:0,
			}
		},
		inject: ['popup'],
		watch: {
			type(val) {
				this.dialogType = val
			},
			mode(val) {
				if (val === 'input') {
					this.dialogType = 'info'
				}
			},
			value(val) {
				this.val = val;
			}
		},
		created() {
			// 对话框遮罩不可点击
			this.popup.mkclick = false
			if (this.mode === 'input') {
				this.dialogType = 'info'
				this.val = this.value;
			} else {
				this.dialogType = this.type
			}
		},
		mounted() {
			this.focus = true
		},
		methods: {
			inputBlur(){ },
			//点击正确/错误
			contentClick(index){
				this.currentIndex = index;
				this.clickIndex = index;
			},
			/**
			 * 点击确认按钮
			 */
			onOk() {
				this.$emit('clickIndex',this.clickIndex);
				this.$emit('confirm', (item) => {
					this.popup.close();
					if (this.mode === 'input'){
						this.val = this.value;
					} 
				}, 
					this.mode === 'input' ? this.val : '',)
			},
			/**
			 * 点击取消按钮
			 */
			close() {
				if (this.beforeClose) {
					this.$emit('close', () => {
						this.popup.close()
					})
					return
				}
				this.popup.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	

	@media (orientation : landscape) {
		.uni-popup-dialog {
			width:450rpx !important;
			height: 338rpx !important;
			border-radius: 15px;
			background-color: #fff;
			top: 50% !important;
		}
	} 
	
	.uni-popup-dialog {
		position: fixed;
		top: 50vh;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 604rpx;
		height: 490rpx;
		border-radius: 15px;
		background-color: #F2F2F2;
		.example-body{
			width: 90%;
			height: 62%;
			margin: auto;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.uni-dialog-content-list{
				display: flex;
				align-items: center;
				.com{
					margin-left: 31rpx;
					margin-right: 18rpx;
					width: 20rpx;
					height: 18rpx;
					border-radius: 50%;
					opacity: 1;
					
				}
				.active{
					background: #1280EF;
					
				}
				.title{
					background: #E6E6E6;
				}
			}
		}
	}

	.uni-dialog-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 15px;
		padding-bottom: 5px;
		
		
	}


	

	.uni-dialog-title-text {
		font-size: 16px;
		font-weight: 500;
		
	}

	.uni-dialog-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-around;
		padding: 5px 15px 15px 15px;
		height: 20%;
	}

	.uni-dialog-content-text {
		font-size: 14px;
		color: #6e6e6e;
	}

	.uni-dialog-button-group {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		border-top-color: #f5f5f5;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.uni-dialog-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 45px;
	}

	.uni-border-left {
		border-left-color: #f0f0f0;
		border-left-style: solid;
		border-left-width: 1px;
	}

	.uni-dialog-button-text {
		font-size: 14px;
	}

	.uni-button-color {
		color: $uni-color-primary;
	}

	.uni-dialog-input {
		flex: 1;
		font-size: 14px;
		border: 1px solid #1280EF; 
	}

	.uni-popup__success {
		color: $uni-color-success;
	}

	.uni-popup__warn {
		color: $uni-color-warning;
	}

	.uni-popup__error {
		color: $uni-color-error;
	}

	.uni-popup__info {
		color: #909399;
	}
</style>






