<template>
	<view style=" width: 100vw;position: relative;height:100vh;background-color: #FFF;" class="hi-flex hi-flex-vcenter hi-flex-center">
		<image src="../../static/lauch.png" style="width: 100vw;height:100vh;" mode="widthFix"></image>
	</view>
	<!-- <video src="/static/lauch.mp4" :autoplay="true" objectFit="cover" :loop="true" :controls="false" style="width:100vw;height:100vh;">
	</video> -->
</template>

<script>
	export default {
		data() {
			return {
				picUrl: ''
			}
		},
		onReady() {
			// 设置头部标题
			uni.setNavigationBarTitle({
				title: ""
			})
		},
		onLoad: function() {
			setTimeout(() => {
				this.toIndex();
			}, 4000);
		},
		methods: {
			toIndex() {
				uni.reLaunch({
					url: '../index/index'
				});

			}
		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}

	view {
		display: flex;
	}

	page,
	.content {
		background-color: #001314;
		flex-direction: column;
	}

		{
		position: relative;
		display: flex;
		width: 750upx;
		height: 100vh;
	}

	.navigatorTag {
		position: absolute;
		right: 20upx;
		top: 60upx;
		z-index: 6999;
		width: 80upx;
		height: 40upx;
		line-height: 40upx;
		font-size: 24upx;
		background: #a5a7b2;
		color: #fff;
		justify-content: center;
		text-align: center;
		border-radius: 20upx;
		margin-top: 35upx;
	}
</style>
