<template>
	<view class="container" style="height: 100vh;">
		<!-- image占位 -->
		<image src="/static/kuangchi/tao/chaojuhe.png" mode="" style="position: absolute;top: 0;left: 0;height: 100%;width: 100%;"></image>
		<view class="header hi-columns" :style="'padding-top: ' + statusBarH + 'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image src="/static/home/nav_icon_back_night.png" mode="" style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view style="color:#FFFFFF;font-size: 37upx;text-align: center;font-weight: bold;">超聚合</view>
				<view style="color:#00BBF0;" @tap="gotoFreeDetail()">免费矿机</view>
			</view>
		</view>
		<view class="content hi-columns" style="height: 100vh;padding-top:50px;'">
			<view class="set_text_title" :style="hb_status ? 'color:#000000' : 'color:#ffffff'"></view>

			<view class="kuangji-list" style="text-transform: uppercase;">
				<view style="position: absolute;top: 0;left: 0;color: white;">
					<image src="/static/kuangchi/tao/xiaotubiao.png" style="width: 48upx;height: 48upx;position: absolute;left: 470rpx;top: 146rpx; "></image>
					<view style="position: absolute;left: 540rpx;top: 120rpx;">
						<view @tap="gotoDetail(list[0])" style="width: 200rpx;height: 100rpx;line-height: 100rpx;font-size: 28rpx;font-weight: bold;">{{list[0].type}}</view>
					</view>
					<image src="/static/kuangchi/tao/xiaotubiao.png" style="width: 48upx;height: 48upx;position: absolute;left: 470rpx;top: 356rpx; "></image>
					<view style="position: absolute;left: 540rpx;top: 330rpx;">
						<view @tap="gotoDetail(list[1])" style="width: 200rpx;height: 100rpx;line-height: 100rpx;font-size: 28rpx;font-weight: bold;">{{list[1].type}}</view>
					</view>
					<image src="/static/kuangchi/tao/xiaotubiao.png" style="width: 48upx;height: 48upx;position: absolute;left: 470rpx;top: 646rpx; "></image>
					<view style="position: absolute;left: 540rpx;top: 620rpx;">
						<view @tap="gotoDetail(list[2])" style="width: 200rpx;height: 100rpx;line-height: 100rpx;font-size: 28rpx;font-weight: bold;">{{list[2].type}}</view>
					</view>
					<image src="/static/kuangchi/tao/xiaotubiao.png" style="width: 48upx;height: 48upx;position: absolute;left: 470rpx;top: 846rpx; "></image>
					<view style="position: absolute;left: 540rpx;top: 820rpx;">
						<view @tap="gotoDetail(list[3])" style="width: 200rpx;height: 100rpx;line-height: 100rpx;font-size: 28rpx;font-weight: bold;">{{list[3].type}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var This;
	export default {
		data() {
			return {
				list: [],
				// beijing: '../../../static/wallet/bg_totalassets.png',
				userdatas: '',
				isalert: false, //弹窗
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				windowHeight: 0,
				header_H: 0,
				nickname: '',
				hb_status: true, //true 白色   false 黑色
				noticeorder: true, //通知订单
				noticechat: true, //通知聊天
				isupdate: false //是否有更新
			};
		},
		onLoad() {
			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight;
					console.log(JSON.stringify(res));
					console.log(This.windowHeight);
				}
			});
			var view = uni.createSelectorQuery().select('.header');
			view.boundingClientRect(data => {
				console.log('节点离页面顶部的距离为' + data.height);
				This.header_H = data.height;
				console.log(This.header_H);
			}).exec();

			this.getMiningMachineryTypeList();
		},
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk');
			this.colorALL = uni.getStorageSync('localcol');
			this.tab_init();
			console.log(this.colorALL);
			var setdata = {
				token: uni.getStorageSync('token'),
				id: uni.getStorageSync('userId')
			};
			console.log(setdata);
		},
		methods: {
			/* 去往详情页面 */
			gotoDetail(item) {
				if (item.status !== 0) {
					console.log(123)
					uni.navigateTo({
						url:'./orderList?id=' + item.id + '&type=' + item.type
					});
				} else {
					uni.showToast({
						title: '暂未开放'
					});
				}
			},
			gotoFreeDetail() {
				let sendData = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id')
				};
				uni.request({
					url: this.websiteUrlzhh + 'afd/getIsCertification', //仅为示例，并非真实接口地址。
					data: sendData,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language": 'zh'
					},
					method: 'POST',
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							console.log('返回数据:' + JSON.stringify(res));

							/* 已经实名 进入免费矿机*/
							if (res.data.data) {
								uni.navigateTo({
									url: 'kuangchi-detail?isFreeType=true'
								});
							}
						} else if (res.data.code == 500) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						} else if (res.data.code == 402) {
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
					}
				});

			},
			getMiningMachineryTypeList() {
				let sendData = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					page: 1
				};
				uni.request({
					url: this.websiteUrlzhh + 'afd/getMiningMachineryTypeList', //仅为示例，并非真实接口地址。
					data: sendData,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language": 'zh'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							console.log('返回数据:' + JSON.stringify(res));
							if (res.data.data[0].type == 'bec矿机') {
								res.data.data[0].type = 'best矿机'
							}

							this.list = res.data.data;

						} else if (res.data.code == 500) {
							this.myAlert(res.data.msg);
						} else if (res.data.code == 402) {
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
					}
				});
			},
			yaoqing() {
				uni.navigateTo({
					url: '../../wo/yaoqingzhu/yaoqingzhu'
				});
			},
			exit_btn() {
				uni.navigateBack({
					//后退按钮
					delta: 1
				});
			},
			tab_init() {
				if (this.backgroundALL == '#1c1f22') {
					this.hb_status = false;
					uni.setNavigationBarColor({
						frontColor: '#ffffff',
						backgroundColor: '#1c1f22'
					});
					uni.setTabBarStyle({
						backgroundColor: '#1c1f22',
						color: '#737373',
						selectedColor: '#D3674D'
					});
				} else {
					this.hb_status = true;
					uni.setNavigationBarColor({
						frontColor: '#000000',
						backgroundColor: '#ffffff'
					});
					uni.setTabBarStyle({
						backgroundColor: '#ffffff',
						color: '#737373',
						selectedColor: '#D3674D'
					});
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.kuangji-list {
		position: relative;
		height: 1080rpx;
		background-repeat: no-repeat;
		background-position: 0 0;

		.left-bg {
			position: absolute;
			left: -150rpx;
			top: 250rpx;
			height: 500rpx;
			width: 500rpx;

			.earth-circle {
				width: 500rpx;
				height: 500rpx;
				position: absolute;
				left: 0;
				top: 0;
				animation: earth-circle 10s linear infinite;
			}

			.earth-map {
				width: 300rpx;
				height: 300rpx;
				position: absolute;
				left: 100rpx;
				top: 100rpx;
				animation: earth-circle 10s linear infinite;
			}

			.right-bg {
				position: absolute;
				left: 200rpx;
				top: -150rpx;
				width: 675rpx;
				height: 828rpx;
			}
		}

		.img-item {
			position: absolute;
			height: 80rpx;
			width: 80rpx;
		}

		.img-item-1 {
			left: 250rpx;
			top: 130rpx;
		}

		.img-item-2 {
			left: 350rpx;
			top: 340rpx;
		}

		.img-item-3 {
			left: 350rpx;
			top: 630rpx;
		}

		.img-item-4 {
			left: 200rpx;
			top: 820rpx;
		}
	}

	@keyframes earth {
		from {
			background-position-x: 0;
		}

		to {
			background-position-x: 632rpx;
		}
	}

	@keyframes earth-circle {
		from {
			transform: rotate(0);
		}

		to {
			transform: rotate(360deg);
		}
	}

	page {
		height: 100%;
	}

	.container {
		width: 100%;
		height: 100%;
		background: #0F1113;
		// background-image: url(../../../static/kuangchi/bg02.png);
		// background-size: 100% 100%;
	}

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

	.content {
		flex: 1;
		width: 100%;
		overflow: auto;
		box-sizing: border-box;
		height: 100%;
		// background-image: url(../../../static/kuangchi/home_bg@2x.png);
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.set_text_title {
		font-size: 48upx;
		width: 100%;
		margin: 30upx 0;
		padding: 0 40upx;
		box-sizing: border-box;
		text-align: right;
	}

	.icon-arrow-right {
		color: #8792a8;
		font-size: 32upx;
	}

	.item_l {
		margin: 0 40upx;
		width: 670upx;
		padding: 25upx 40upx;
		box-sizing: border-box;
		border-radius: 16upx;
		margin-bottom: 20upx;
	}

	.userinfo {}

	.userinfo .user_text {
		margin-left: 30upx;
	}

	.userinfo .user_text .name {
		font-size: 38upx;
		color: #ffffff;
		line-height: 120upx;
	}

	.userinfo .user_text .title {
		font-size: 32upx;
		color: #ffffff;
	}

	.userinfo .user_text .userid {
		font-size: 24upx;
		color: #8792a8;
	}

	.userinfo .user_text image {
		width: 320rpx;
		height: 320rpx;
	}

	.right_box {}

	.right_box .cheched_text {
		font-size: 28upx;
		color: #6e778a;
		margin-right: 25upx;
	}

	.btn {
		width: 670upx;
		margin: 0 40upx;
		margin-top: 140upx;
		border: 2upx solid #6e778a;
		color: #6e778a;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		font-size: 36upx;
		border-radius: 50upx;
	}

	.yd_box {
		display: inline-flex;
		width: 16upx;
		height: 16upx;
		border-radius: 8upx;
		background: #e64340;
		position: relative;
		top: -30upx;
		right: -5upx;
	}

	/* 弹出对话框 */
	.alert_box {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 0 43upx;
		box-sizing: border-box;
		z-index: 999999999999999999999999999999;
	}

	.alert_box .mask_box {
		background: rgba(0, 0, 0, 0.2);
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.alert_box .content_box {
		width: 580upx;
		height: 350upx;
		border-radius: 20upx;
		position: relative;
		z-index: 99999;
		padding: 40upx 30upx;
		box-sizing: border-box;
	}

	.alert_box .content_box .text_box {
		width: 100%;
		font-size: 36upx;
		color: #ffffff;
		padding-top: 60upx;
	}

	.alert_box .content_box .btn_box view {
		text-align: center;
		height: 70upx;
		line-height: 70upx;
		border-radius: 35upx;
		width: 240upx;
		box-sizing: border-box;
	}

	.alert_box .content_box .btn_box view:nth-of-type(1) {
		border: 1px solid #e64340;
		color: #e64340;
	}

	.alert_box .content_box .btn_box view:nth-of-type(2) {
		background: #3a74fc;
		color: #ffffff;
	}

	.kuangchi-list {
		background-color: white;
		border-radius: 20rpx;
		margin: 20rpx;
		padding: 20rpx;

		.left {
			image {
				border: 1px solid #1735da;
				border-radius: 10rpx;
				height: 160rpx;
				width: 160rpx;
			}
		}

		.right {
			image {
				height: 40rpx;
				width: 40rpx;
			}
		}
	}
</style>
