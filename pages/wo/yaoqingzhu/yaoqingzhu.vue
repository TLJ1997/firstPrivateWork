<template>
	<view class="content" style="background-size: 100% 100%; width: 100%; position: relative;" :style="{ backgroundImage: 'url(' + yaoqingma + ')' }">
		<view class="header hi-columns" :style="'padding-top: ' + statusBarH + 'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image
					:src="hb_status ? '../../../static/home/nav_icon_back_day.png' : '../../../static/home/nav_icon_back_night.png'"
					mode=""
					style="width:46upx;height: 46upx;"
					@click="exit_btn"
				></image>
				<view style="font-size: 35upx; color: #FFF;" @tap="fenxiang">{{ $t('wo.fx') }}</view>
			</view>
		</view>
		<!-- <image :src="yaoqingma" mode="" @tap="fenxiang()" style="width: 120upx; height: 120upx;position: absolute; bottom: 30upx;right:30upx;"></image>
		<view style="position: absolute; bottom: 30upx; left: 30upx;width:70%; text-align: center;">
			<view style=" align-items:center; display: inline-flex; width: 100%; justify-content: flex-start;text-align: left;">
				<view style="margin-top: 5upx;color: #1113bf; font-size:35upx;">邀请码： {{yaoqingma}}</view>
				<view @tap="fuzhis(yaoqingma)" style="color: #1113bf; font-size: 25upx; margin-left: 15upx; border-radius: 10upx; padding: 0upx 10upx 0upx 10upx; border: 1upx solid #1113bf;">复制</view>
			</view>
			<view style=" align-items:center; display: inline-flex; width: 100%; justify-content:flex-start;text-align: left;">
				<view style="margin-top: 5upx;color: #000; font-size:27upx;;">imPooL </view>
			</view>
		</view> -->
	</view>
</template>

<script>
var This;
export default {
	data() {
		return {
			hb_status: false,
			statusBarH: '',
			windowHeight: 0,
			header_H: 0,
			share: '',
			url: '',
			erweima: '',
			token: '',
			yaoqingma: ''
		};
	},
	onLoad(e) {
		let This = this;
		uni.getSystemInfo({
			success(res) {
				This.statusBarH = res.statusBarHeight;
				This.windowHeight = res.windowHeight;
				console.log(JSON.stringify(res));
				console.log(This.windowHeight);
			}
		});
		var view = uni.createSelectorQuery().select('.header');
		// view.boundingClientRect(data => {
		// 	console.log("节点离页面顶部的距离为" + data.height);
		// 	This.header_H = data.height;
		// 	console.log(This.header_H)
		// }).exec();

		console.log(e);

		uni.request({
			url: this.websiteUrl + 'user/shareIt',
			data: {
				token: uni.getStorageSync('token'),
				userId: uni.getStorageSync('id')
			},
			dataType: 'json',
			method: 'GET',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'Accept-Language': 'zh' //自定义请求头信息
			},
			success: res => {
				console.log(res);
				if (res.data.code == 402) {
					if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
						console.log('开启了指纹手势可以验证登录');
						uni.reLaunch({
							url: '../../indexzhiwen/indexzhiwen'
						});
					} else {
						console.log('没开启指纹手势去登录');
						uni.reLaunch({
							url: '../../login/login'
						});
					}
				}
				this.yaoqingma = res.data.msg;
			}
		});
	},

	methods: {
		fuzhis(wallet) {
			uni.setClipboardData({
				data: wallet,
				success: function(res) {
					uni.showToast({
						title: this.i18n().copyOk,
						duration: 2000
					});
				}
			});
		},
		exit_btn() {
			uni.navigateBack({
				delta: 1
			});
		},

		fenxiang() {
			var img = this.yaoqingma;
			var that = this;
			var xia = plus.downloader.createDownload(img, {}, function(d, status) {
				if (status == 200) {
				} else {
					plus.nativeUI.toast(that.i18n().poster);
				}
				var message = {
					title: that.$t('wo.fxbt'),
					content: that.$t('wo.fxnr'),
					pictures: [d.filename]
				};
				plus.share.sendWithSystem(message, function(a) {}, function(e) {});
			});
			xia.start();
		}
	}
};
</script>

<style>
.header {
	padding: 0 30upx;
	box-sizing: border-box;
	position: fixed;
	width: 100%;
	left: 0;
	top: 0;
	z-index: 99999;
}
.header .header_box {
	height: 88upx;
}
page {
	height: 100%;
}

.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	width: 100%;
	background-size: 100% 100%;
}

.content .con {
	align-self: center;
	height: 100%;
}

.btn {
	width: 50%;
	height: 80upx;
	line-height: 80upx;
	text-align: center;
	background: #01afa9;
	color: #ffffff;
	margin-left: 25%;
	margin-top: 5%;
	border-radius: 10upx;
	font-size: 34upx;
}
</style>
