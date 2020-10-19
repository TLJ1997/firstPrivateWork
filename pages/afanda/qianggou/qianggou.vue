<template>
	<view class="Page">
		<!-- 背景图 -->
		<image src="/static/youkey/bg.png" class="pagebg"></image>
		<view class="content" :style="'padding-top: ' + statusBarH + 'px;'">
			<view class="header">
				<view class="flex_left">
					<image  :src="hb_status ? '../../../static/home/nav_icon_back_day.png' : '../../../static/home/nav_icon_back_night.png'"  @click="exit_btn" class="goback"></image>
					<view class="pageName">
						{{$t('afanda.ykqg')}}
					</view>
				</view>
				<navigator class="head_right" url="qianggou-list">
					{{$t('afanda.qglist')}}
				</navigator>
			</view>
			
			<view class="detail">
				<view class="detail_header">
					<image src="/static/logo.png" class="logo"></image>
				</view>
				<view class="infos">
					<view class="infos_title">
						{{$t('afanda.qgxx')}}
					</view>
					<view class="infos_time">
						<view>{{$t('afanda.kssj')}}</view>
						<view class="time">{{ qianggouInfo.snappedStart}}</view>
					</view>
					<view class="infos_time">
						<view>{{$t('afanda.endtime')}}</view>
						<view class="time">{{ qianggouInfo.snappedEnd}}</view>
					</view>
					<view class="infos_time">
						<view>{{$t('afanda.thzl')}}</view>
						<view style="color: #6FCBED;">{{ qianggouInfo.numberToday}}</view>
					</view>
					<view class="infos_time">
						<view>{{$t('afanda.zddhl')}}</view>
						<view style="color: #FCD39C;">{{ qianggouInfo.max}}</view>
					</view>
				</view>
			</view>
			
			<view class="btn" @tap="qianggou">
				{{$t('afanda.shoping')}}
			</view>
			
			<view class="footer">
			    <view style="margin-bottom: 15rpx;">{{$t('afanda.sm')}}</view>
			    <view style="margin-bottom: 15rpx;">{{$t('afanda.realname')}}</view>
			    <view style="margin-bottom: 15rpx;">{{$t('afanda.qglx')}}</view>
			</view>
			
		</view>
		<pay-keyboard ref="son" :show_key="show_key" @hideFun="hideFun" @getPassword="getPassword"></pay-keyboard>
	</view>
</template>

<script>
	var This;
	import payKeyboard from '@/components/keyboard.vue';
	export default {
		components: {
			payKeyboard
		},
		data() {
			return {
				beijing: '../../../static/wallet/bg_totalassets.png',
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
				isupdate: false, //是否有更新
				list_data: '',
				yizhoulist: [],
				pagejia: 1,
				gaodi: '',
				dichibi: '',
				show_key: false,
				param: {
					num: 0,
					payPwd: '',
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id')
				},
				qianggouInfo: {}
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
			// var view = uni.createSelectorQuery().select('.header');
			// view.boundingClientRect(data => {
			//     console.log('节点离页面顶部的距离为' + data.height);
			//     This.header_H = data.height;
			//     console.log(This.header_H);
			// }).exec();
		},

		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk');
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(() => {
				this.tab_init();
			}, 500);
			var setdata = {
				token: uni.getStorageSync('token'),
				id: uni.getStorageSync('userId')
			};
			console.log(setdata);
			// this.zylist()
			this.getInfo();

		},
		methods: {
			// getSnappedUpSetting
			getInfo() {
				let _this = this;
				uni.request({
					url: this.websiteUrlzh + 'afd/getSnappedUpSetting',
					method: 'GET',
					data: {},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					success: res => {
						console.log('抢购信息：' + res);
						_this.qianggouInfo = res.data.data;
						if (res.data.code == 402) {
							uni.reLaunch({
								url: '../../login/login'
							});
							return false;
						}
					}
				});
			},
			hideFun() {
				this.show_key = false;
			},
			getPassword(n) {
				let _this = this;
				this.param.payPwd = n.password;
				this.hideFun();
				// this.pay();
				console.log('用户输入的密码', this.param.payPwd);

				var that = this;
				// uni.showModal({
				//     title: '系统提示',
				//     content: '确定抢购吗？',
				//     showCancel: true,
				//     success: function(res) {
				//         if (res.confirm) {

				//         } else {
				//         }
				//     }
				// });
				uni.request({
					url: that.websiteUrlzh + 'afd/subscribe',
					method: 'POST',
					data: _this.param,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					success: res => {
						console.log('抢购信息：' + JSON.stringify(res));
						uni.hideLoading();
						if (res.data.code == 402) {
							uni.reLaunch({
								url: '../../login/login'
							});
							return false;
						}
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
						// console.log(res)
						// if (res.data.code == 200) {
						// 	that.myAlert(res.data.msg)
						// } else if (res.data.code == 500) {
						// 	that.myAlert(res.data.msg)
						// } else if (res.data.code == 402) {
						// 	if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
						// 		console.log('开启了指纹手势可以验证登录')
						// 		uni.reLaunch({
						// 			url: '../../../pages/indexzhiwen/indexzhiwen'
						// 		});
						// 	} else {
						// 		console.log('没开启指纹手势去登录')
						// 		uni.reLaunch({
						// 			url: '../../../pages/login/login'
						// 		});

						// 	}
						// }
					}
				});
			},
			qianggou() {
				// #ifdef APP-PLUS
				let _this = this;
				console.log('已经进来了');
				// plus.nativeUI.prompt(
				//     '',
				//     function(e) {
				//         if (e.index == 0 && e.value > 0) {
				//             _this.param.num = e.value;
				//             _this.show_key = true;
				//         }
				//     },
				//     '数量',
				//     '请输入数量',
				//     ['确定', '取消']
				// );
				plus.nativeUI.prompt(
					_this.$t('afanda.num'),
					function(e) {
						if (e.index == 0 && e.value > 0) {
							_this.param.num = e.value;
							_this.show_key = true;
						}
					},
					'',
					_this.$t('afanda.num'),
					[_this.$t('afanda.submit'), _this.$t('afanda.qx')]
				);

				// #endif
			},
			zylist() {
				let This = this;
				uni.showLoading({
					title: This.$t('stylePulic.Loading'),
					mask: true
				});
				var zixuanlist = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					page: 1
				};
				console.log(zixuanlist);
				uni.request({
					url: this.websiteUrlzh + 'afd/getRushToBuy', //仅为示例，并非真实接口地址。
					data: zixuanlist,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						uni.hideLoading();
						if (res.data.code == 200) {
							this.yizhoulist = res.data.data;
						} else if (res.data.code == 500) {
							this.myAlert(res.data.msg);
						} else if (res.data.code == 402) {
							if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
								console.log('开启了指纹手势可以验证登录');
								uni.reLaunch({
									url: '../../../pages/indexzhiwen/indexzhiwen'
								});
							} else {
								console.log('没开启指纹手势去登录');
								uni.reLaunch({
									url: '../../../pages/login/login'
								});
							}
						}
					}
				});
			},
			gengduozixuan() {
				let This = this;
				var gengduo = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					page: this.pagejia
				};
				console.log(gengduo);
				uni.request({
					url: this.websiteUrlzh + 'afd/getOneWeekBonusRecord', //仅为示例，并非真实接口地址。
					data: gengduo,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					method: 'GET',
					success: res => {
						console.log('账本', res.data);
						if (res.data.code == 200) {
							if (this.pagejia > res.data.totalPages) {
								uni.showToast({
									title: This.$t('stylePulic.Nomore'),
									icon: 'none',
									duration: 1000
								});
							} else {
								uni.showToast({
									title: This.$t('stylePulic.Loaded'),
									icon: 'none',
									duration: 1000
								});
								if (res.data.data == null || res.data.data == '') {
									this.yizhoulist = [];
								} else {
									this.yizhoulist = this.yizhoulist.concat(res.data.data);
									console.log(this.yizhoulist);
								}
							}
						} else if (res.data.code == 500) {
							this.myAlert(res.data.msg);
						} else if (res.data.code == 402) {
							if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
								console.log('开启了指纹手势可以验证登录');
								uni.reLaunch({
									url: '../../../pages/indexzhiwen/indexzhiwen'
								});
							} else {
								console.log('没开启指纹手势去登录');
								uni.reLaunch({
									url: '../../../pages/login/login'
								});
							}
						}
					}
				});
			},
			order_list() {
				let This = this;
				uni.showLoading({
					title: This.$t('stylePulic.Loading'),
					mask: true
				});
				var zixuanlist = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id')
				};
				console.log(zixuanlist);
				uni.request({
					url: this.websiteUrlzh + 'afd/getCumulativeIncome', //仅为示例，并非真实接口地址。
					data: zixuanlist,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						uni.hideLoading();
						if (res.data.code == 200) {
							this.list_data = res.data.data;
						} else if (res.data.code == 500) {
							this.myAlert(res.data.msg);
						} else if (res.data.code == 402) {
							if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
								console.log('开启了指纹手势可以验证登录');
								uni.reLaunch({
									url: '../../../pages/indexzhiwen/indexzhiwen'
								});
							} else {
								console.log('没开启指纹手势去登录');
								uni.reLaunch({
									url: '../../../pages/login/login'
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
				if (this.backgroundALL == '#272A33') {
					this.hb_status = false;
					uni.setNavigationBarColor({
						frontColor: '#ffffff',
						backgroundColor: '#272A33'
					});
					uni.setTabBarStyle({
						backgroundColor: '#272A33',
						color: '#737373',
						selectedColor: '#267cc0'
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
						selectedColor: '#267cc0'
					});
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.Page {
		view{
			box-sizing: border-box;
		}
		.pagebg {
			position: fixed;
			width: 100vw;
			height: 100vh;
			top: 0;
			left: 0;
			z-index: -1;
		}
		.content{
			padding: 0 32upx;
			.header{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.flex_left{
					display: flex;
					justify-content: space-between;
					width: 140upx;
					.pageName{
						font-size: 36upx;
						font-weight: 600;
					}
					.goback{
						width: 46upx;
						height: 46upx;
					}
				}
				.head_right{
					font-weight: 600;
					color: #4AC1E8;
				}
			}
			.detail{
				width: 100%;
				border: 1px solid #95DEF8;
				border-radius: 10upx;
				margin-top: 30upx;
				padding: 28upx;
				.logo{
					width: 80upx;
					height: 80upx;
					border-radius: 40upx;
					background-color: #CAE8F4;
				}
				.infos{
					font-size: 26upx;
					font-weight: 600;
					.infos_title{
						font-size: 30upx;
						font-weight: 600;
						margin: 56upx 0;
					}
					.infos_time{
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 28upx;
						.time{
							font-size: 24upx;
							color: #ACAFB0;
						}
					}
				}
			}
			.btn{
				width: 100%;
				margin-top: 36upx;
				color: #FFFFFF;
				background-color: #1F6ED4;
				padding: 16upx 0;
				text-align: center;
				border-radius: 20upx;
				font-size: 34upx;
			}
			.footer{
				margin-top: 14upx;
				color: #B5B5B5;
				font-size: 22upx;
			}
		}
	}
</style>
