<template>
	<view class="av">
		<!-- 音频 -->
		<!-- :src="'https://push.ittun.com'+ item.analysisAudio" -->
		<view class=" analysis Audio" v-if="item.analysisAudio" >
			<view class="AudioPlay">
				<video id="myVideo"
						src="https://media.lycheer.net/lecture/90258602/5e3262
						4d521b272b49b1ff61_transcoded.m4a?0.1"
						class="hidden" 
						ref="video"
						 >
				</video>
			<!-- 	<video id="myVideo"
						src="https://media-cn2.tvcbook.com/c50d7a314621f942066a8b535431eeec/5fead546/v7/video/9eb61f16-2ec8-43ea-a1ae-c7b296fbbe84/9522b6a44bdd4732981b4ad1b6450803-mp4-hd.mp4"
						class="hidden" 
						ref="video"
						@ended="endPlay"
				>
				</video> -->
				
				<view class="slider-box" @tap="play">
					<image src="@/static/wifi.png"></image>
					<text>{{ overTimer }}</text> 
				</view>
				<!-- <button @tap="play">播放</button> -->
			</view>
			
			<view class="AudioText" v-if="Boolean(item.playbackTimes)">
				(&nbsp播放次数：<text style="color: #1280EF;">
					{{item.playbackTimes}}
				</text>次&nbsp)
			</view>
			<view class="AudioText" v-else>
				{{ item.playbackSpeed  }}
			</view>
		</view>
		
		
		<!-- 视频 -->
		<view class="analysis Video" 
			v-if="item.analysisVideo">
			<video id="myVideo" 
			:src="'https://push.ittun.com'+ item.analysisVideo" 
			enable-danmu 
			danmu-btn 
			controls></video>
		</view>
	</view>
</template>

<script>
	import { calcTimer } from "@/utils/index.js";
	export default {
		props:{
			item:{
				type:Object
			},
		},
		
		data() {
			return {
				lock: false, // 锁
				status: 1, // 1暂停 2播放
				currentTime: 0,  //当前进度
				duration: 100, // 总进度
				videoContext: '',
			}
		},
		computed:{
			timer() {
				return calcTimer(this.currentTime)
			},
			overTimer() {
				return calcTimer(this.duration)
			}
		},
		created() {
			this.videoContext = uni.createVideoContext('myVideo');
			// console.log(this.item);
		},
		mounted() {
		},
		methods: {
			// 倍速
			setRate(num) {
				this.videoContext.playbackRate(num)
			},
			
			// 播放
			play() {
				if(this.status == 1){
					this.videoContext.play();
					this.status = 2;
				}else{
					this.videoContext.pause();
					this.status = 1;
				}
			},
			
			// 暂停
			stop() {
				
				this.status = 1
			},
			//音频播放完毕
			endPlay(){
				console.log(777777777777772)
			},
			// 视频加载完成
			loadedmetadata(data) {
				this.duration = data.detail.duration;
				
			}
		}
	}
	
	
	
</script>

<style lang="scss" scoped>
	.av{
		width: 100%;
		.analysis{
			width: 100%;
			margin: 12rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.Audio{
			width: 100%;
			flex-direction: column;
			.AudioPlay{
				width: 100%;
				display: flex;
				justify-content: center;
			}
			.AudioText{
				width: 100%;
				text-align: center;
				margin: 10rpx 0;
			}
		}
		.slider-box {
			display: flex;
			align-items: center;
			font-size: 26upx;
			color: #1280EF;
			width: 70%;
			height: 70rpx;
			border: 1px solid #E8E8E8;
			box-shadow: 0px 4rpx 12rpx rgba(0, 0, 0, 0.1);
			opacity: 1;
			border-radius: 40rpx;
			margin-top: 28rpx;
			image{
				width: 30rpx;
				height: 40rpx;
				margin-left: 40rpx;
				margin-right: 12rpx;
			}
		}
		
		.hidden {
			position: fixed;
			z-index: -1;
			width: 1upx;
			height: 1upx;
		}
		
	}
	
</style>
