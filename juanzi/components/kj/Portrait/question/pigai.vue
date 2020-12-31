<template>
	<view class="" >
		<view class="example-body dialog" >
			<button class="button" type="primary" @click="confirmDialog">
			<text class="button-text">批改</text></button>
		</view>
		
		<uni-popup ref="popupDialog" type="dialog" ></uni-popup>
		<!-- 提交信息 -->
		<uni-popup ref="dialogInput" type="dialog" >
			<uni-popup-dialog mode="input" 
				title="输入内容" 
				placeholder="请输入内容"
				:value="inputValue"
			 @confirm="dialogInputConfirm"
			 @clickIndex="clickIndex"></uni-popup-dialog>
		</uni-popup>
	</view>
	
</template>

<script>
	var modelData;
	var clickIndex;
	import Vue from "vue";
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
	import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue';
	export default {
		props:{
			itemOrder:{
				type:Number,
			}
		},
		components:{
			uniPopupMessage,
			uniPopupDialog,
			uniPopupShare,
		},
		data() {
			return {
				inputValue:""
			}
		},
		methods:{
			//点击确定
			dialogInputConfirm(done, val) {
				let data;
				modelData = this.$store.state.paperData.modelData;
				this.value = val;
				//判断是否是数字
				data = isNaN(Number(this.value))?"":Number(this.value);
				this.inputValue = data;//input输入的数字值，做响应式的
				//更改每道题的true/false的图标
				this.$store.commit("storeIcon",{itemOrder:this.itemOrder - 1,clickIndex,data});
				//获取当前题目的正确分数
				let score = this.$store.state.modelData[this.itemOrder - 1].score;
				//判断是否有批改值
				data = data == 0 ?(clickIndex?0:score):data;
				//获取每道题的分值
				this.$store.commit("getInputValue",{questionScore:data,itemOrder:this.itemOrder});
				done()
			},
			clickIndex(index){
				clickIndex = index;
			},
			/**
			 * 打开提交信息
			 */
			confirmDialog() {
				this.$refs.dialogInput.open();
				Vue.prototype.$dialogInput = this.$refs.dialogInput;
			},
		}
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
