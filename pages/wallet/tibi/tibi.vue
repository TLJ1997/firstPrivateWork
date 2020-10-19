<template>
	<view class="Page" :style="backgroundALL == '#1c1f22' ? 'background:#05060F;' : 'background:#fff;'">
		<view class="header" :style="'padding-top: ' + statusBarH + 'px;'">
			<view class="flex_left">
				<image :src="hb_status ? '../../../static/home/nav_icon_back_day.png' : '../../../static/home/nav_icon_back_night.png'"
				 @click="Back()" class="goback"></image>
				<view class="pageName">
					{{$t('wallet.tb')}}
				</view>
			</view>
			<view class="head_right" url="qianggou-list"  @click="tibishuming()">
				{{$t('wallet.tbsm')}}
			</view>
		</view>
		<view class="title">
			<view class="name">
				{{ bizhongming }}
			</view>
			<view v-if="fee != ''">
				<text class="shoxu">{{$t('wallet.sxf')}}</text>
				<text class="money">{{ fee }}</text>
			</view>
		</view>
		<view class="keyong">
			可用余额：{{available}}
		</view>
		<view class="ipt_bg">
			<input v-model="addressshu" value="" :placeholder="copy" />
			<image src="../../../static/wallet/icon_scan.png" mode="" style="width: 40upx;height: 40upx;" @click="scan()"></image>
		</view>
		<view class="ipt_bg">
			<input type="text" v-model="shuliang" :placeholder="input_number"  placeholder-style="font-size:28upx;" />
			<view class="btn" @tap="quanbu(available)">
				{{$t('wallet.qb')}}
			</view>
		</view>
		<view class="ipt_bg">
			<input  type="password" v-model="jiaoyimi" value="" :placeholder="input_password" placeholder-style="font-size:28upx;" />
		</view>
		<view class="ipt_bg">
			<input type="number" v-model="msgCode" value="" :placeholder="input_code" placeholder-style="font-size:28upx;" />
			<view class="YZM" :disabled="btn_state" @tap="fs_yzm()">
				{{yzm_text}}
			</view>
		</view>
		
		<view class="submit" @tap="tijiao">
			{{$t('wallet.tjsq')}}
		</view>
	</view>
</template>

<script>
	var This;
	import md5 from '../../../static/js/md5.min.js'
	export default {
		data() {
			return {
				copy: this.$t('wallet.ztdz'),
				input_number: this.$t('wallet.qsrtbsl'),
				input_password: this.$t('wallet.srjymm'),
				input_code: this.$t('wallet.qsryzm'),
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				textarea_cursor_num: 0,
				bizhongming: '',
				fee: '',
				tbDescription: '',
				addressshu: '',
				shuliang: '',
				beizhu: '',
				available: '',
				jiaoyimi: '',
				btn_state: false,
				zhimi: false,
				yzm_text: this.$t('wallet.hqyzm'),
				msgCode: ''
			};
		},
		onLoad(e) {
			console.log(e);
			this.bizhongming = e.bizhong;
			if (e.addressshu != '') {
				this.addressshu = e.addressshu;
			}
			This = this;
			var zhebishisha = {
				symbol: this.bizhongming,
				token: uni.getStorageSync('token'),
				userId: uni.getStorageSync('id')
			};
			console.log(zhebishisha);
			uni.request({
				url: this.websiteUrlqiabao + 'account/getWithdrawalInfo',
				method: 'GET',
				data: zhebishisha,
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					"Accept-Language": 'zh'
				},
				success: res => {
					console.log(res);

					if (res.data.code == 200) {
						this.fee = res.data.data.fee;
						this.tbDescription = res.data.data.tbDescription;
						this.available = res.data.data.available;
					} else if (res.data.code == 402) {
						uni.navigateTo({
							url: '../../login/login'
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				},
				fail: () => {}
			});
			uni.request({
				url: this.websiteUrl + 'user/isSettingPayPassword',
				method: 'GET',
				data: zhebishisha,
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					"Accept-Language": 'zh'
				},
				success: res => {
					console.log('判断是否绑定', res.data);

					if (res.data.code == 200) {
						this.zhimi = res.data.data;
					} else if (res.data.code == 402) {
						uni.navigateTo({
							url: '../../login/login'
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				},
				fail: () => {}
			});
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight;
					// console.log(JSON.stringify(res))
					console.log(This.windowHeight);
				}
			});

			var view = uni.createSelectorQuery().select('.muen_header');
			view.boundingClientRect(data => {
				// console.log("节点离页面顶部的距离为" + data.height);
				This.header_H = data.height;
				console.log(This.header_H);
			}).exec();
		},
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk');
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(() => {
				this.tab_init();
			}, 500)
		},
		methods: {
			/* 发送验证码 */
			fs_yzm() {
				let _this = this;
				let account = uni.getStorageSync('mobile') || uni.getStorageSync('email');
				if (account == '') {
					uni.showToast({
						title: _this.$t('wallet.mybdzh'),
						icon: "none",
						duration: 1000
					});
					return false;
				}
				if (this.btn_state == false) {
					var shoudata = {
						mobileOrEmail: account,
						privateKey: md5(account + 'XOUdGYC62DHkMVNL')
					}
					console.log(shoudata)
					uni.request({
						url: this.websiteUrl + "user/send",
						dataType: "json",
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							"Accept-Language": 'zh' //自定义请求头信息
						},
						data: shoudata,
						method: "POST",
						success: (res) => {
							console.log(res.data)

							if (res.data.code == 200) {

								uni.showToast({
									title: _this.$t('wallet.yzmyfsz') + account,
									icon: "none",
									duration: 4000
								});
								this.btn_state = true;
								var sj_num = 60;
								var that = this
								var settime = setInterval(function() {
									that.yzm_text = _this.$t('wallet.fscg') + "(" + sj_num + ")";
									if (sj_num == 0) {
										that.btn_state = false;
										that.yzm_text = _this.$t('wallet.hqyzm');
										clearInterval(settime);
									}
									console.log(sj_num);
									console.log(that.btn_state)
									console.log(that.yzm_text)
									sj_num--;
								}, 1000)

							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none",
									duration: 1000
								});

							}

						}
					})




				}
			},
			/* 发送验证码 */
			fs_yzm1() {
				let _this = this;
				let mobilePhoe = uni.getStorageSync('mobile');
				if (mobilePhoe == '' || mobilePhoe.length != 11) {
					uni.showToast({
						title: _this.$t('wallet.mybdsjh'),
						icon: "none",
						duration: 1000
					});
					return false;
				}
				if (_this.btn_state == false) {
					var shoudata = {
						mobile: mobilePhoe,
						privateKey: md5(mobilePhoe + 'XOUdGYC62DHkMVNL')
					}
					console.log(shoudata)
					uni.request({
						url: _this.websiteUrl + "user/sendSms",
						dataType: "json",
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							"Accept-Language": 'zh' //自定义请求头信息
						},
						data: shoudata,
						method: "POST",
						success: (res) => {
							console.log(res.data)

							if (res.data.code == 200) {

								uni.showToast({
									title: _this.$t('wallet.yzmyfsz') + mobilePhoe,
									icon: "none",
									duration: 4000
								});
								this.btn_state = true;
								var sj_num = 60;
								var that = this
								var settime = setInterval(function() {
									that.yzm_text = _this.$t('wallet.fscg') + "(" + sj_num + ")";
									if (sj_num == 0) {
										that.btn_state = false;
										that.yzm_text = _this.$t('wallet.hqyzm');
										clearInterval(settime);
									}
									console.log(sj_num);
									console.log(that.btn_state)
									console.log(that.yzm_text)
									sj_num--;
								}, 1000)

							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none",
									duration: 1000
								});

							}

						}
					})




				}
			},
			quanbu(shu) {
				if (shu <= 0) {
					uni.showToast({
						title: this.$t('wallet.zwye'),
						icon: 'none'
					});
					// this.myAlert('暂无可提币的余额');
				} else {
					this.shuliang = shu;
				}
			},
			tijiao() {
				if (this.zhimi == false) {
					uni.showModal({
						title: this.$t('wallet.xtds'),
						content: this.$t('wallet.bdzfmm'),
						showCancel: false,
						success: function(res) {
							//console.log(res);
							if (res.confirm) {
								uni.navigateTo({
									url: '../../wo/SafetyCenter/shezhiupdatezhifu'
								});
							} else {}
						}
					});
					return false;
				}
				if (this.addressshu == '') {
					uni.showToast({
						title: this.$t('wallet.srdbdz'),
						icon: 'none'
					});
					// this.myAlert('');
					return false;
				}
				if (this.shuliang == '' || this.shuliang <= 0) {
					uni.showToast({
						title: this.$t('wallet.qzqsrtbsl'),
						icon: 'none'
					});
					// this.myAlert('请正确输入提币数量');
					return false;
				}
				if (this.jiaoyimi == '') {
					uni.showToast({
						title: qzqsrtbsl,
						icon: 'none'
					});
					// this.myAlert('请输入交易密码');
					return false;
				}
				if (this.jiaoyimi == '') {
					uni.showToast({
						title: this.$t('wallet.qsrjymm'),
						icon: 'none'
					});
					// this.myAlert('请输入交易密码');
					return false;
				}
				if (this.msgCode == '') {
					uni.showToast({
						title: this.$t('wallet.qsryzm'),
						icon: 'none'
					});
					// this.myAlert('请输入交易密码');
					return false;
				}
				var sssfffa = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					payPassWord: this.jiaoyimi
				};
				var that = this;
				console.log(sssfffa);
				// uni.request({
				// 	url: this.websiteUrl + 'user/verificationPayPassWord',
				// 	method: 'GET',
				// 	data: sssfffa,
				// 	header: {
				// 		'content-type': 'application/x-www-form-urlencoded'
				// 	},
				// 	success: res => {
				// 		console.log('看看密码对不对', res.data);

				// 		if (res.data.code == 200) {
				// 			var shifou = res.data.data;
				// 			if (shifou == true) {
				// 				// uni.showLoading({
				// 				// 	title: '提交中...',
				// 				// 	mask: true
				// 				// });
				// 				var thatt = that;
				// 				uni.showModal({
				// 					title: '系统提示',
				// 					content: '确定提现吗？',
				// 					showCancel: true,
				// 					success: function(res) {
				// 						if (res.confirm) {
				// 							uni.showLoading({
				// 								title: '提交中...',
				// 								mask: true
				// 							});
				// 							var quanbu = {
				// 								address: thatt.addressshu,
				// 								token: uni.getStorageSync('token'),
				// 								userId: uni.getStorageSync('id'),
				// 								num: thatt.shuliang,
				// 								symbol: thatt.bizhongming,
				// 								remark: thatt.beizhu
				// 							};

				// 							console.log(quanbu);
				// 							uni.request({
				// 								url: thatt.websiteUrlqiabao + 'account/mentionSymbol',
				// 								method: 'POST',
				// 								data: quanbu,
				// 								header: {
				// 									'Content-Type': 'application/x-www-form-urlencoded'
				// 								},
				// 								success: res => {
				// 									uni.hideLoading();
				// 									console.log(res);
				// 									if (res.data.code == 200) {
				// 										uni.showToast({
				// 											title: res.data.msg
				// 										});
				// 										// thatt.myAlert(res.data.msg);
				// 										setTimeout(function() {
				// 											uni.navigateBack({
				// 												delta: 2
				// 											});
				// 										}, 1500);
				// 									} else if (res.data.code == 500) {
				// 										uni.showToast({
				// 											title: res.data.msg
				// 										});
				// 										// thatt.myAlert(res.data.msg);
				// 									} else if (res.data.code == 402) {
				// 										if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
				// 											console.log('开启了指纹手势可以验证登录');
				// 											uni.reLaunch({
				// 												url: '../../../pages/indexzhiwen/indexzhiwen'
				// 											});
				// 										} else {
				// 											console.log('没开启指纹手势去登录');
				// 											uni.reLaunch({
				// 												url: '../../../pages/login/login'
				// 											});
				// 										}
				// 									}
				// 								}
				// 							});
				// 						} else {
				// 							uni.showToast({
				// 								title: res.data.msg
				// 							});
				// 						}
				// 					}
				// 				});
				// 			} else {
				// 			}
				// 		} else {
				// 			uni.showToast({
				// 				title: res.data.msg
				// 			});
				// 		}
				// 	},
				// 	fail: () => {}
				// });
				// 是否设置支付密码
				var thatt = that;
				uni.showModal({
					title: this.$t('wallet.xtds'),
					content: this.$t('wallet.qdytxm'),
					showCancel: true,
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: thatt.$t('wallet.tjz'),
								mask: true
							});
							var quanbu = {
								address: thatt.addressshu,
								token: uni.getStorageSync('token'),
								userId: uni.getStorageSync('id'),
								num: thatt.shuliang,
								symbol: thatt.bizhongming,
								remark: thatt.beizhu,
								payPwd: thatt.jiaoyimi,
								verificationCode: thatt.msgCode,
								account: uni.getStorageSync('mobile') || uni.getStorageSync('email')
							};

							console.log(quanbu);
							uni.request({
								url: thatt.websiteUrlqiabao + 'account/mentionSymbol',
								method: 'POST',
								data: quanbu,
								header: {
									'Content-Type': 'application/x-www-form-urlencoded',
									"Accept-Language": 'zh'
								},
								success: res => {
									uni.hideLoading();
									console.log(res);
									if (res.data.code == 200) {
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
										});
										// thatt.myAlert(res.data.msg);
										setTimeout(function() {
											uni.navigateBack({
												delta: 2
											});
										}, 1500);
									} else if (res.data.code == 500) {
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
										});
										// thatt.myAlert(res.data.msg);
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
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					}
				});
			},
			tibishuming() {
				uni.navigateTo({
					url: '../tibiExplain/tibiExplain?neirong=' + this.tbDescription
				});
			},
			textarea(e) {
				this.textarea_cursor_num = e.detail.cursor;
				console.log(JSON.stringify(e.detail.cursor));
			},
			scan() {
				//扫码
				var that = this;
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						that.addressshu = res.result;
					}
				});
			},
			Back() {
				uni.navigateBack({
					//后退
					delta: 1
				});
			},
			tab_init() {
				if (this.backgroundALL == '#1c1f22') {
					this.hb_status = false;
					uni.setNavigationBarColor({
						frontColor: '#ffffff',
						backgroundColor: '#1c1f22'

					})
					uni.setTabBarStyle({
						backgroundColor: '#1c1f22',
						"color": "#737373",
						"selectedColor": "#D3674D"
					})
				} else {
					this.hb_status = true;
					uni.setNavigationBarColor({
						frontColor: '#000000',
						backgroundColor: '#ffffff'
					})
					uni.setTabBarStyle({
						backgroundColor: '#ffffff',
						"color": "#737373",
						"selectedColor": "#D3674D"
					})
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.Page {
		view {
			box-sizing: border-box;
		}

		padding: 0 32upx;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.flex_left {
				display: flex;
				justify-content: space-between;
				width: 140upx;

				.pageName {
					font-size: 36upx;
					font-weight: 600;
				}

				.goback {
					width: 46upx;
					height: 46upx;
				}
			}

			.head_right {
				font-weight: 600;
				color: #4AC1E8;
			}
		}

		.title {
			display: flex;
			justify-content: space-between;
			margin: 70upx 0;

			.name {
				font-size: 46upx;
				font-weight: 600;
			}

			.shoxu {
				font-weight: 600;
				color: #A6A6A6;
				margin-right: 24upx;
			}

			.money {
				font-size: 42upx;
				color: #4DC1EA;
				font-weight: 600;
			}
		}

		.keyong{
			margin-bottom: 20upx;
			color: #39BAE8;
		}

		.ipt_bg {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20upx;
			width: 100%;
			height: 80upx;
			line-height: 80upx;
			background-color: #F6F6F6;
			border-radius: 18upx;
			margin-bottom: 30upx;

			.btn {
				font-weight: 600;
				color: #4ACDF2;
				padding: 12upx 20upx;
			}

			.YZM {
				height: 60upx;
				line-height: 60upx;
				padding: 0 12upx;
				border-radius: 14upx;
				background-color: #FDB44B;
				color: #FFFFFF;
			}
		}
		
		.submit{
			width: 100%;
			height: 70upx;
			line-height: 70upx;
			background-color: #39BAE8;
			color: #FFFFFF;
			text-align: center;
			font-size: 30upx;
			font-weight: 500;
			border-radius: 14upx;
			margin-top: 200upx;
		}
		
	}
</style>
