<template>
	<view class="container" :class="hb_status ? 'nc-mode-day' : 'nc-mode-night'">
		<view class="header hi-columns" :style="'padding-top: ' + statusBarH + 'px;'">
			<view class="header_box hi-rows hi-flex-vcenter">
				<image :src="hb_status ? '../../../static/home/nav_icon_back_day.png' : '../../../static/home/nav_icon_back_night.png'"
				 mode="" style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view :style="hb_status ? 'color:#000000' : 'color:#ffffff'" style="font-size: 37upx;font-weight: 600;">{{$t('wo.sz')}}</view>
			</view>
		</view>
		<view class="content hi-columns" style="padding-top: 100rpx;">
			<view class="set_text_title"></view>

			<view class="settings">
				<view class="settings-item nc-bg-main nc-border-color">
					<view style="display: flex;justify-content: flex-start;align-items: center;">
						<image src="/static/logo.png" style="width: 106upx;height: 52upx;"></image>
						<text class="settings-item-lable nc-text-color-main">{{$t('wo.bb')}}</text>
					</view>
					<view class="settings-item-value">
						<text>V2.2.1</text>
						<text class="grace-icons icon-arrow-right settings-item-icon"></text>
					</view>
				</view>
				<view class="settings-item nc-bg-main nc-border-color" @tap="setLanguage()">
					<view style="display: flex;justify-content: flex-start;align-items: center;">
						<image src="/static/logo.png" style="width: 106upx;height: 52upx;"></image>
						<text class="settings-item-lable nc-text-color-main">{{$t('wo.yy')}}</text>
					</view>
					<!-- <text class="settings-item-lable nc-text-color-main">{{$t('wo.yy')}}</text> -->
					<view class="settings-item-value">
						<text>{{$t('wo.jtzw')}}</text>
						<text class="grace-icons icon-arrow-right settings-item-icon"></text>
					</view>
				</view>
			</view>
			<!-- 退出登录按钮 -->
			<view class="exit-button nc-text-color-main nc-bg-main nc-border-color" @tap="btn()">{{$t('wo.tcdl')}}</view>
		</view>

		<view class="alert_box hi-rows hi-flex-vcenter hi-flex-center" v-show="isalert">
			<view class="mask_box" @tap="btn()" :style="hb_status ? 'background:rgba(255,255,255,.3);' : 'background:rgba(0,0,0,.3);'"></view>
			<view class="content_box hi-columns hi-flex-center hi-space-between" :style="backgroundALL == '#1c1f22' ? 'background: #2E2F31;' : 'background: #ffffff;'">
				<view class="text_box hi-rows hi-flex-center" :style="backgroundALL == '#1c1f22' ? 'color: #ffffff;' : 'color: #292C33;'">{{$t('wo.qdtcdlm')}}</view>
				<view class="btn_box hi-rows hi-flex-vcenter hi-space-between">
					<view @click="logout(0)">{{$t('wo.qx')}}</view>
					<view @click="logout(1)">{{$t('wo.qd')}}</view>
				</view>
			</view>
		</view>

		<view class="alert_box hi-rows hi-flex-vcenter hi-flex-center" v-show="isupdate">
			<view class="mask_box" @tap="upgradebtn()" :style="hb_status ? 'background:rgba(255,255,255,.3);' : 'background:rgba(0,0,0,.3);'"></view>
			<view class="content_box hi-columns hi-flex-center hi-space-between" :style="backgroundALL == '#1c1f22' ? 'background: #2E2F31;' : 'background: #ffffff;'">
				<view class="text_box hi-rows hi-flex-center" :style="backgroundALL == '#1c1f22' ? 'color: #ffffff;' : 'color: #292C33;'">{{$t('wo.fxxbb')}}</view>
				<view class="hi-rows hi-flex-center" style="color: #8792A8;font-size: 28upx;margin-bottom: 40upx;margin-top: 20upx;">{{$t('wo.gxbb')}}</view>

				<view class="btn_box hi-rows hi-flex-vcenter hi-space-between">
					<view @click="upgrade(0)" style="width: 240upx;border: 1px solid #8792A8;color: #8792A8;">{{$t('wo.shzs')}}</view>
					<view @click="upgrade(1)" style="width: 240upx;">{{$t('wo.ljsj')}}</view>
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
				userdatas: '',
				isalert: false, //弹窗
				isLanguage: false, //语言
				isTypeBi: false, //币种
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

			// console.log("backgroundALL == '#1c1f22':"+backgroundALL == '#1c1f22');
		},
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk');
			this.colorALL = uni.getStorageSync('localcol');

			if (this.backgroundALL == '#1c1f22') {
				this.hb_status = false;
			} else {
				this.hb_status = true;
			}
			setTimeout(() => {
				this.tab_init();
			}, 500)
			console.log(this.colorALL);
			var setdata = {
				token: uni.getStorageSync('token'),
				id: uni.getStorageSync('userId')
			};
			console.log(setdata);
			this.userdatas = uni.getStorageSync('head');
			this.nickname = uni.getStorageSync('nickname');
		},
		methods: {
			/* 设置币种 */
			setBiType() {
				uni.showActionSheet({
					itemList: [this.$t('wo.rmb'), this.$t('wo.my'), this.$t('wo.ry')],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			setLanguage() {
				this.$toggleLang();
			},
			upgrade(e) {
				if (e == 0) {
					this.upgradebtn();
					console.log('取消');
				} else {
					uni.showToast({
						title: this.$t('wo.tccg'),
						duration: 1000,
						icon: 'success'
					});

					this.upgradebtn();
					console.log('确定');
				}
			},

			logout(e) {
				if (e == 0) {
					// this.btn();
					console.log('取消');
				} else {
					// uni.showToast({
					// 	title:"退出成功",
					// 	duration:1000,
					// 	icon:"success"
					// })

					this.btn();
					console.log('确定');
				}
			},

			userdata() {
				uni.navigateTo({
					url: '../userdata/userdata'
				});
			},

			btn() {
				// this.isalert=!this.isalert;
				try {
					try {
						var that = this;
						uni.showModal({
							title: this.$t('wo.xtts'),
							content: this.$t('wo.sftcdl'),
							success: function(res) {
								if (res.confirm) {
									uni.removeStorageSync('token');
									uni.removeStorageSync('userId');
									uni.removeStorageSync('mobile');
									uni.navigateTo({
										url: '../../login/login'
									});
									uni.request({
										url: that.websiteUrl + 'user/outLogin',
										method: 'POST',
										data: {
											userId: uni.getStorageSync('id')
										},
										header: {
											'content-type': 'application/x-www-form-urlencoded',
											"Accept-Language": 'zh'
										},
										success: res => {
											console.log(res);
										},
										fail: () => {}
									});
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					} catch (e) {
						plus.nativeUI.alert(this.i18n().alert14);
					}
				} catch (e) {
					plus.nativeUI.alert(this.i18n().alert14);
				}
			},
			upgradebtn() {
				this.isupdate = !this.isupdate;
			},
			noticeorder_btn(e) {
				this.noticeorder = e.detail.value;
				console.log(e.detail.value);
			},
			noticechat_btn(e) {
				this.noticechat = e.detail.value;
				console.log(e.detail.value);
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

<style>
	page {
		height: 100%;
		background-color: #F2F2F2;
	}

	.container {
		width: 100%;
		height: 100%;
		/* background: #f0f3f5; */
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
		background-color: #FFFFFF;
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

	/* write by wanggang */
	/* 夜晚背景模式 */
	.night-mode {
		background-color: #2e2f31;
		color: #ffffff;
	}

	.night-border-color {
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-color: #1c1f22;
	}

	.night-color-text {
		color: #ffffff;
	}

	/* 白天模式背景 */
	.day-mode {
		background-color: #ffffff;
		color: #000000;
	}

	.day-border-color {
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-color: #eeeeee;
	}

	.day-color-text {
		color: #a8abbe;
	}

	/* 设置 */
	.settings {
		padding: 0 25upx;
	}

	.settings-item {
		height: 110upx;
		line-height: 110upx;
		padding: 0 10upx;
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		border-bottom-width: 2rpx;
		border-bottom-style: solid;
	}

	.settings-item-lable {
		font-size: 32upx;
	}

	.settings-item-value {
		color: #8f9498;
	}

	.settings-item-icon {
		margin-left: 15upx;
	}

	/* 退出登录 */
	.exit-button {
		height: 100upx;
		line-height: 100upx;
		width: 700upx;
		margin: 0 auto;
		margin-top: 30upx;
		border-radius: 30upx;
		line-height: 100upx;
		text-align: center;
		border-width: 2rpx;
		border-style: solid;
		background-color: #B9EDF8 !important;
		color: #FFFFFF !important;
		font-size: 36upx;
	}

	/* 语言 */
	.pop-area {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		text-align: center;
	}

	.pop-area-list {}

	.pop-area-list-item,
	.pop-area-cancel {
		padding: 20upx 0;
	}

	.pop-area-cancel {
		margin-top: 20upx;
	}
</style>
