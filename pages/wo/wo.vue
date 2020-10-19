<template>
	<view class="container" :class="hb_status ? 'nc-mode-day' : 'nc-mode-night'" style="width: 100%;height:100%;">
		<view class="header hi-columns" :style="'padding-top: ' + statusBarH + 'px;'" style="z-index: 999999;">
			<view class="header_box hi-rows hi-flex-vcenter hi-space-between">
				<view></view>
				<view>
					<!-- <image src="/static/wallet/icon_scan.png" mode="aspectFit"></image>
					<image src="/static/image/icon__me_message.png" mode="aspectFit"></image> -->
				</view>
			</view>
		</view>

		<image class="banner" :src="hb_status ? '../../static/wallet/bg_day.png' : '../../static/wallet/bg_night.png'" mode=""></image>
		<view class="content hi-columns">
			<view class="user_box">
				<view class="status_top nc-flex-column nc-flex-main-center">
					<view v-if="islogin" class="nc-flex-row nc-flex-sub-center" style="height:168upx;padding-left: 30rpx;">
						<image @tap="selectImage" :src="userdata" style="width:168upx;height:168upx;border-radius: 50%;" mode=""></image>
						<view class="nc-flex-column nc-text-color-white nc-flex-main-around" style="height: 100%;margin-left: 30rpx;">
							<text @tap="xiuni" style="color: #39BAE8;font-size: 42upx;font-weight: 600;">{{ nickname }}</text>
							<text style="color: #BCC1C4;">{{mobile}}</text>
							<view class="hi-flex hi-space-between hi-flex-vcenter">
								<text style="color: #8A8D8E;">{{ $t('wo.yqm') }}:{{ inviteCode }}</text>
								<image src="/static/index/copy_yellow.png" @tap="copyCode(inviteCode)" style="width: 24upx;height: 28upx;margin-left: 20upx;"></image>
							</view>
						</view>
					</view>
					<view v-if="!islogin" class="hi-columns" style="padding: 0 40upx;box-sizing: border-box;">
						<navigator class="login_btn hi-rows" open-type="navigate" url="../login/login" animation-type="fade-in">
							<text>{{ $t('wo.dl') }}</text>
							<text>{{ $t('wo.zc') }}</text>
						</navigator>
					</view>
					<view class="switch">
						<image src="../../static/wo/switch_tab.png" :class="hb_status ? 'active' : ''" mode="" @click="switch_btn()"></image>
					</view>
				</view>
			</view>
			<!-- write by wanggang -->
			<view class="settings">
				<navigator url="yaoqingzhu/yaoqingzhu" class="settings-item nc-bg-main nc-border-color">
					<view class="settings-item-lable nc-text-color-main">
						<image src="/static/index/yaoqingma.png" style="width: 34upx;height: 38upx;margin-right: 20upx;"></image>
						<text>{{ $t('wo.yqm') }}</text>
					</view>
					<text class="grace-icons icon-arrow-right settings-item-value"></text>
				</navigator>
				<navigator url="SafetyCenter/SafetyCenter" class="settings-item nc-bg-main nc-border-color">
					<view class="settings-item-lable nc-text-color-main">
						<image src="/static/index/anquan.png" style="width: 34upx;height: 38upx;margin-right: 20upx;"></image>
						<text>{{ $t('wo.aqzx') }}</text>
					</view>
					<text class="grace-icons icon-arrow-right settings-item-value"></text>
				</navigator>
				<navigator @tap="zanweikaifang()" class="settings-item nc-bg-main nc-border-color">
					<view class="settings-item-lable nc-text-color-main">
						<image src="/static/index/copy_yellow.png" style="width: 34upx;height: 38upx;margin-right: 20upx;"></image>
						<text>{{ $t('wo.jd') }}</text>
					</view>
					<text class="grace-icons icon-arrow-right settings-item-value"></text>
				</navigator>
				<!-- <view @tap="toShiming" class="settings-item nc-bg-main nc-border-color">
					<view class="settings-item-lable nc-text-color-main">
						<image src="/static/index/copy_yellow.png" style="width: 34upx;height: 38upx;margin-right: 20upx;"></image>
						<text>{{ $t('wo.smrz') }}</text>
					</view>
					<text class="grace-icons icon-arrow-right settings-item-value"></text>
				</view> -->
				<view @tap="toPayAdmin" class="settings-item nc-bg-main nc-border-color">
					<view class="settings-item-lable nc-text-color-main">
						<image src="/static/index/zhifu.png" style="width: 34upx;height: 38upx;margin-right: 20upx;"></image>
						<text>{{ $t('wo.zfgl') }}</text>
					</view>
					<text class="grace-icons icon-arrow-right settings-item-value"></text>
				</view>
				<navigator url="kefu" class="settings-item nc-bg-main nc-border-color">
					<view class="settings-item-lable nc-text-color-main">
						<image src="/static/index/slider/kefu2.png" style="width: 34upx;height: 38upx;margin-right: 20upx;"></image>
						<text>{{ $t('wo.zxkf') }}</text>
					</view>
					<text class="grace-icons icon-arrow-right settings-item-value"></text>
				</navigator>
				<navigator url="AboutUs/AboutUs" class="settings-item nc-bg-main nc-border-color">
					<view class="settings-item-lable nc-text-color-main">
						<image src="/static/index/guanyu.png" style="width: 34upx;height: 38upx;margin-right: 20upx;"></image>
						<text>{{ $t('wo.gywm') }}</text>
					</view>
					<text class="grace-icons icon-arrow-right settings-item-value"></text>
				</navigator>
				<navigator url="woset/woset" class="settings-item nc-bg-main nc-border-color">
					<view class="settings-item-lable nc-text-color-main">
						<image src="/static/index/shezhi.png" style="width: 34upx;height: 38upx;margin-right: 20upx;"></image>
						<text>{{ $t('wo.sz') }}</text>
					</view>
					<text class="grace-icons icon-arrow-right settings-item-value"></text>
				</navigator>
			</view>
		</view>

		<view class="containers" v-show="buxian">
			<view class="dot"></view>
			<view class="pulse"></view>
		</view>
		<view class="containers" v-show="buxian1">
			<view class="dot"></view>
			<view class="pulse1"></view>
		</view>
	</view>
</template>
<script>
	var This;
	import avatar from '../../components/touxiang/yq-avatar/yq-avatar.vue';
	import youScroll from '@/components/you-scroll';
	export default {
		components: {
			youScroll,
			avatar
		},
		data() {
			return {
				islogin: false, //登录状态
				buxian: false,
				buxian1: false,
				heizhongtai: false,
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				windowHeight: 0,
				hb_status: true,
				list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				userdata: '',
				nickname: '',
				tximg: '',
				inviteCode: '',
				isRealName: 0,
				mobile: ''
			};
		},
		onLoad() {
			this.mobile = uni.getStorageSync('mobile');
			if (uni.getStorageSync('token') != '') {
				this.islogin = true;
				this.userdata = uni.getStorageSync('head');
				this.nickname = uni.getStorageSync('nickname');
			} else {
				this.islogin = false;
				uni.reLaunch({
					url: '../login/login'
				});
			}
			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight;
					console.log(This.windowHeight);
				}
			});
			this.isRealName = uni.getStorageSync('isRealName');
		},
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk');
			this.colorALL = uni.getStorageSync('localcol');
			this.inviteCode = uni.getStorageSync('inviteCode');
			setTimeout(() => {
				this.tab_init();
			}, 500);

			if (uni.getStorageSync('token') != '') {
				this.islogin = true;
				this.userdata = uni.getStorageSync('head');
				this.nickname = uni.getStorageSync('nickname');
			} else {
				this.islogin = false;
			}
			console.log('显示了');
			this.setTabbar();
		},
		methods: {
			setTabbar() {
				let _this = this;
				let tabbars = ['tabbar.index', 'tabbar.quotation', 'tabbar.trade', 'tabbar.assets', 'tabbar.my'];
				tabbars.map((item, index) => {
					uni.setTabBarItem({
						index: index,
						text: _this.$t(item)
					});
				});
			},
			copyCode(inviteCode) {
				let _this = this;
				uni.setClipboardData({
					data: inviteCode + '',
					success() {
						uni.showToast({
							title: _this.$t('wo.fzcg'),
							icon: 'none'
						});
					}
				});
			},
			zanweikaifang() {
				uni.showModal({
					title: this.$t('wo.zwkf'),
					showCancel: false
				});
			},
			xiuni() {
				uni.navigateTo({
					url: 'updateUser/updateUser'
				});
			},
			toShiming() {
				if (this.isRealName !== 1) {
					if (uni.getStorageSync('locale') == 'zh-cn') {
						uni.navigateTo({
							url: '../wo/certification/certification'
						});
					} else {
						uni.navigateTo({
							url: '../wo/certification/certification1'
						});
					}
				} else {
					uni.showToast({
						title: this.$t('wo.nywcsm')
					});
				}
			},
			toPayAdmin() {
				uni.navigateTo({
					url: 'paymentMethod/paymentMethod'
				});
			},
			selectImage() {
				var _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: function(res) {
						_this.myUpload(res.tempFilePaths[0]);
					}
				});
			},
			myUpload(path) {
				//更新头像

				var This = this;
				if (uni.getStorageSync('token') == '' || uni.getStorageSync('token') == null || uni.getStorageSync('token') ===
					undefined) {
					uni.navigateTo({
						url: '/pages/login/login'
					});
					return false;
				}

				uni.showLoading({
					title: this.$t('wo.scz'),
					mask: true
				});
				console.log(this.userdata);
				uni.uploadFile({
					url: This.websiteUrl + 'user/uploadFile', //仅为示例，非真实的接口地址
					filePath: path,
					name: 'file',
					header: {
						'content-type': 'multipart/form-data' //自定义请求头信息
					},
					formData: {
						state: 0
					},
					success: uploadFileRes => {
						console.log(uploadFileRes);

						var uploadFileRes = JSON.parse(uploadFileRes.data);
						uni.hideLoading();
						if (uploadFileRes.code == 200) {
							uni.showToast({
								title: This.$t('wo.sccg'),
								mask: true,
								duration: 1500,
								success() {
									This.userdata = uploadFileRes.data;
									uni.setStorageSync('head', uploadFileRes.data);
								}
							});
							uni.request({
								url: This.websiteUrl + 'user/changeHeadImg',
								method: 'POST',
								data: {
									token: uni.getStorageSync('token'),
									userId: uni.getStorageSync('id'),
									headImgUrl: uploadFileRes.data
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded',
									'Accept-Language': 'zh'
								},
								success: res => {
									console.log(res);

									if (res.data.code == 200) {} else {}
								},
								fail: () => {}
							});
						}

						console.log(JSON.stringify(uploadFileRes));
					}
				});
			},
			quhehuo() {
				// uni.navigateTo({
				// 	url: "hehuoren/hehuoren"
				// })
				uni.navigateTo({
					url: 'xinhehuo/xinhehuo'
				});
			},
			quyaoqing() {
				uni.navigateTo({
					url: 'yaoqingzhu/yaoqingzhu'
				});
			},
			qushiming() {
				if (uni.getStorageSync('isRealName') == 0) {
					uni.navigateTo({
						url: 'certification/certification'
					});
				} else {
					this.myAlert(this.$t('wo.cjsmrz'));
				}
			},
			set_btn() {
				uni.navigateTo({
					url: 'woset/woset'
				});
			},
			onPullDown(done) {
				// 下拉刷新
				setTimeout(() => {
					this.list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
					done(); // 完成刷新
				}, 1000 * 1);
			},
			onScroll(e) {
				// 监听滚动
				console.log(e.detail.scrollTop);
			},
			onLoadMore(e) {
				// 加载更多
				setTimeout(() => {
					let len = this.list.length;
					for (let i = 1; i <= 10; i++) {
						this.list.push(len + i);
					}
				}, 1000 * 1);
			},
			scrollTo() {
				this.$refs.scroll.goTop();
			},
			tab_init() {
				if (this.backgroundALL == '#1c1f22') {
					this.hb_status = false;
					this.heizhongtai = true;
					uni.setNavigationBarColor({
						frontColor: '#ffffff',
						backgroundColor: '#1c1f22'
					});
					uni.setTabBarStyle({
						backgroundColor: '#2d3033',
						color: '#8792A8',
						selectedColor: '#2889FA'
					});
				} else {
					this.hb_status = true;
					uni.setNavigationBarColor({
						frontColor: '#000000',
						backgroundColor: '#ffffff'
					});
					uni.setTabBarStyle({
						backgroundColor: '#ffffff',
						color: '#8792A8',
						selectedColor: '#2889FA'
					});
				}
			},
			switch_btn: function() {
				this.heizhongtai = !this.heizhongtai;
				console.log(this.heizhongtai);
				if (this.heizhongtai == true) {
					this.buxian = true;
					this.buxian1 = false;
					var that = this;
					setTimeout(function() {
						that.buxian = false;
						uni.hideLoading();
						uni.showToast({
							title: that.$t('wo.dkyjms'),
							icon: 'none',
							duration: 1000
						});
						that.backgroundALL = '#1c1f22';
						that.colorALL = '#FFF';
						that.hb_status = !that.hb_status;
						console.log('夜间模式hb_status:' + that.hb_status);

						uni.setNavigationBarColor({
							frontColor: '#ffffff',
							backgroundColor: '#2d3033'
						});
						uni.setTabBarStyle({
							backgroundColor: '#2d3033',
							color: '#737373',
							selectedColor: '#2889FA',
							borderStyle: 'black'
						});
					}, 2000);

					uni.setStorageSync('localbk', '#1c1f22');
					uni.setStorageSync('localcol', '#FFF');
				} else {
					this.buxian1 = true;
					this.buxian = false;
					var that = this;
					setTimeout(function() {
						that.buxian1 = false;
						uni.hideLoading();
						uni.showToast({
							title: that.$t('wo.gbyjms'),
							icon: 'none',
							duration: 1000
						});
						that.backgroundALL = '#FFF';
						that.colorALL = '#000';
						that.hb_status = !that.hb_status;
						console.log('白天模式hb_status:' + that.hb_status);
						uni.setNavigationBarColor({
							frontColor: '#000000',
							backgroundColor: '#ffffff'
						});
						uni.setTabBarStyle({
							backgroundColor: '#ffffff',
							color: '#737373',
							selectedColor: '#2889FA',
							borderStyle: 'white'
						});
					}, 2000);
					uni.setStorageSync('localbk', '#FFF');
					uni.setStorageSync('localcol', '#000');
				}
			}
		}
	};
</script>
<style>
	page {
		height: 100%;
	}

	.container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
	}

	.header {
		padding: 0 40upx;
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

	.banner {
		width: 750upx;
		height: calc(var(--status-bar-height) + 400upx);
		position: fixed;
		top: 0;
		left: 0;
	}

	.content {
		/* flex: 1; */
		width: 100%;
		height: 100%;
		padding-top: 120upx;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: auto;
		position: fixed;
		z-index: 99999;
	}

	.user_box {
		/* width: 670upx; */
		height: 300upx;
		/* background: #2d3033; */
		transition: all 0.3s;
		/* box-shadow: 0upx 4upx 20upx 0upx rgba(73, 102, 245, 0.2); */
		/* border-radius: 20upx; */
		/* margin: 0 40upx; */
		position: relative;
	}

	.user_box .status_top {
		height: 100%;
		width: 100%;
		position: relative;
	}

	.user_box .status_top .tx_box {
		position: absolute;
		z-index: 99999;
		top: -60upx;
		border: 2rpx solid #ffffff;
		left: 40upx;
		border-radius: 50%;
		width: 168upx;
		height: 168upx;
	}

	.user_box .status_top .switch {
		position: absolute;
		right: 40upx;
		top: 100upx;
		width: 100upx;
		height: 36upx;
		border-radius: 18upx;
		overflow: hidden;
	}

	.user_box .status_top .switch image {
		width: 200upx;
		height: 36upx;
		transition: all 0.3s;
		position: relative;
		left: 0;
		top: 0;
	}

	.switch image.active {
		left: -100upx !important;
	}

	.login_s_text {
		padding: 0 40upx;
		box-sizing: border-box;
	}

	.login_s_text .textfalse {
		font-size: 46upx;
		font-weight: 600;
	}

	.login_s_text .login_ts {
		font-size: 24upx;
		color: #8792a8;
		margin-top: 10upx;
	}

	.login_btn {
		width: 264upx;
		height: 88upx;
		line-height: 88upx;
		text-align: center;
		background: #3a74fc;
		color: #ffffff;
		border-radius: 44upx;
		justify-content: center;
		margin-top: 30upx;
	}

	.jy_zishu {
		padding: 0 40upx;
		box-sizing: border-box;
		margin: 30upx 0;
	}

	.jy_zishu .item {
		width: 33.333%;
		text-align: center;
	}

	.jy_zishu .item text:nth-of-type(1) {
		color: #f36c2a;
		font-size: 48upx;
		font-weight: 600;
	}

	.jy_zishu .item text:nth-of-type(2) {
		color: #8792a8;
		font-size: 26upx;
		margin-top: 10upx;
	}

	.menu_box {
		border-radius: 20upx;

		height: 100%;
	}

	.menu_box .item {
		width: 223.3333333333333upx;
		height: 223.3333333333333upx;
		box-sizing: border-box;
		text-align: center;
		border-right: 1upx solid rgba(255, 255, 255, 0.1);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		position: relative;
	}

	.menu_box .item image.icon_img {
		width: 66upx;
		height: 66upx;
	}

	.menu_box .item image.certified {
		width: 74upx;
		height: 74upx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 999;
	}

	.menu_box .item text {
		font-size: 24upx;
		color: #6e778a;
	}

	.menu_box .item:nth-of-type(3) {
		border-right: none;
	}

	.menu_box .item:nth-of-type(6) {
		border-right: none;
	}

	.menu_box .item:nth-of-type(9) {
		border-right: none;
	}

	.containers {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0upx;
		left: 0upx;
		overflow: hidden;
		box-sizing: border-box;
		z-index: 99999999999999999999999999999999999999;
	}

	@keyframes warn {
		0% {
			transform: scale(0);
			opacity: 0.9;
		}

		50% {
			transform: scale(0.1);
			opacity: 0.3;
		}

		100% {
			transform: scale(1);
			opacity: 0;
		}
	}

	@-webkit-keyframes "warn" {
		0% {
			-webkit-transform: scale(0);
			opacity: 0.9;
		}

		50% {
			-webkit-transform: scale(0.1);
			opacity: 0.3;
		}

		100% {
			-webkit-transform: scale(1);
			opacity: 0;
		}
	}

	/* 保持大小不变的小圆圈  */

	/* 产生动画（向外扩散变大）的圆圈  */
	.pulse {
		position: absolute;
		width: 500upx;
		height: 500upx;
		border: 400upx solid #000;
		left: 0upx;
		margin-left: -280upx;
		background-color: #000;
		-webkit-border-radius: 30px;
		-moz-border-radius: 30px;
		border-radius: 50%;
		z-index: 1;
		opacity: 0;
		-webkit-animation: warn 2s ease-out;
		-moz-animation: warn 2s ease-out;
		animation: warn 2s ease-out;
		-webkit-animation-iteration-count: infinite;
		-moz-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
	}

	.pulse1 {
		position: absolute;
		width: 500upx;
		height: 500upx;
		border: 400upx solid #fff;
		left: 0upx;
		margin-left: -280upx;
		background-color: #fff;
		-webkit-border-radius: 30px;
		-moz-border-radius: 30px;
		border-radius: 50%;
		z-index: 1;
		opacity: 0;
		-webkit-animation: warn 2s ease-out;
		-moz-animation: warn 2s ease-out;
		animation: warn 2s ease-out;
		-webkit-animation-iteration-count: infinite;
		-moz-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
	}

	/* write by wanggang */
	/* 夜晚背景模式 */
	.night-mode {
		background-color: #2d3033;
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
		/* padding: 0 25upx; */
		margin-top: 30upx;
	}

	.settings-item {
		height: 80upx;
		line-height: 100upx;
		padding: 0 30upx;
		margin-top: 10upx;
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
	}

	.settings-item-lable {
		font-size: 24upx;
		display: flex;
		align-items: center;
	}

	.settings-item-value {
		color: #8f9498;
	}

	.settings-item-icon {
		margin-right: 15upx;
	}
</style>
