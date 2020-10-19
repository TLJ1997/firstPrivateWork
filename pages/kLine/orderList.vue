<template>
	<view style=" min-height:100vh; width: 100%; box-sizing: border-box;height: 100%;float: left; background-size: 100%;">
		<image src="/static/kuangchi/tao/kcDetail.png"  class="bgImg"></image>
		<view class="header hi-columns" :style="'padding-top: ' + statusBarH + 'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image src="/static/home/nav_icon_back_night.png" mode="" style="width:46upx;height: 46upx;" @click="back()"></image>
				<view style="color: white;font-size: 37upx;text-align: center;font-weight: bold;">{{ type.toUpperCase() || '免费矿机' }}</view>
				<view style="color: #39BAE8; margin-right: 15rpx;" @tap="quliebiao">订单列表</view>
			</view>
		</view>

		<view class="kuangjiList">
			<view class="kuangjiItem" v-for="(item, index) in kuangjiList" :key="index">
				<view style="display: flex;justify-content: left;align-items: center;">
					<image src="/static/kuangchi/frc.png" mode="aspectFit" style="width: 120upx;height: 120upx;margin-right: 20upx;"></image>
					<view>
						<view class="kuangjixinghao">
							{{item.name}}
						</view>
						<view class="kuangjijiage">
							{{ item.grade }}USDT
						</view>
					</view>
				</view>
				<view class="buyBtn" @tap="quxiay(item, index)">购买</view>
			</view>
		</view>
		<!-- 购买弹框 -->
		<view class="grace-margin">
			<view class="grace-shade grace-shade-black" v-if="show3">
				<view class="grace-shade-msg grace-animate" style="border-radius: 30upx; padding: 0;">
					<view class="body" style="padding: 30upx; box-sizing: border-box;">
						<view style="width: 100%;font-size: 35upx; font-weight: bold; text-align: center;">预约矿机</view>
						<view style="width: 100%; text-align: center; justify-content: flex-start; display: block;line-height: 90upx;">预约详情：{{ qian || '' }}</view>
						<view style="width: 100%; display:flex; align-items:center; margin-top:25upx; margin-bottom: 25upx;">
							<input placeholder="请输入交易密码" type="password" v-model="mima" style=" width: 100%;height: 80upx; line-height: 80upx; text-align: left; border: 1upx solid #f5f5f5; padding-left: 10upx;" />
						</view>
					</view>
					<view style="display: inline-flex;width: 100%; border-top:1upx solid #f5f5f5 ;">
						<view @tap="beifen" style="font-size: 28upx;height: 80upx; line-height: 80upx; text-align: center; width: 49.5%; border-right: 1upx solid #f5f5f5; color: #007AFF;">
							确定
						</view>
						<view @tap="quxiaoshow" style="font-size: 28upx;height: 80upx; line-height: 80upx; text-align: center;width: 50%; color: #007AFF;">取消</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kuangjiList: [],
				
				
				isShowBalls: false,
				isQiandao: false,
				qiandaoClass: {
					right: '80rpx',
					bottom: '-320rpx'
				},
				balls: [], //
				ballCount: 50, //数量
				showBiAn: false,
				type: '', //币种类型
				header_H: 0,
				statusBarH: '',
				nickname: '',
				hb_status: true, //true 白色   false 黑色
				sel: 0,
				jdt: '',
				loading_status: false,
				circular: true, // 轮播图衔接轮播
				xuanid: '',
				userMeBg: userMeBg,
				zichan: '0.000',
				bgList: {
					earthCircle: earthCircle,
					earthImage: earthImage,
					leftBg: leftBg,
					buttonBg: buttonBg
				},
				show3: false,
				
				mima: '',
				shu: '',
				jiming: '',
				qian: '',
				userToken: uni.getStorageSync('user-token'),
				laiid: '',
				fromId: 0,
				zhimi: false, //是否绑定支付密码
				isFreeType: false, //是否是免费矿机
			};
		},
		onShow() {
			this.sel = 0;
			// this.loadOrder();
			/* 是否绑定支付密码 */
			this.checkPayPwd();
		},
		onLoad() {
			var This = this;
			// 获取矿机列表
			this.getList();

			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
				}
			});

		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 获取矿机列表
			getList() {
				let sendData = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					page: 1
				};
				uni.request({
					url: this.websiteUrlzhh + 'afd/getGradeList', //仅为示例，并非真实接口地址。
					data: sendData,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							this.kuangjiList = res.data.data;
							console.log('矿机列表',this.kuangjiList)
							this.get_grabBag(0);
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
			get_grabBag(index) {
				console.log(index);
				this.sel = index;
				this.laiid = this.kuangjiList[index].id;
				this.qian = this.kuangjiList[index].name + '-' + this.kuangjiList[index].grade;
			},
			loadOrder: function() {
				uni.request({
					url: this.webUrl + '/api/goods/index', //仅为示例，并非真实接口地址。
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
						Authorization: this.userToken,
						'Accept-Language': 'zh'
					},
					success: res => {
						console.log(res.data);
						if (res.data.status == 1000) {
							this.kuangjiList = [];
							this.kuangjiList = res.data.data.goods;
							this.laiid = this.kuangjiList[0].id;
							this.qian = this.kuangjiList[0].name + '-' + this.kuangjiList[0].price;
							this.zichan = res.data.data.shengyuedu;
						}
						if (res.data.code == 444) {
							uni.reLaunch({
								url: '../login'
							});
						}
					}
				});
			},
			quxiay(item, index) {
				if (item.state == 0) {
					this.get_grabBag(index);
					if (this.zhimi == false) {
						uni.showModal({
							title: '系统提示',
							content: '请绑定支付密码',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '../../wo/SafetyCenter/updatezhifu'
									});
								} else {}
							}
						});
						return false;
					}
					this.show3 = true;
				} else {
					uni.showToast({
						title: '无法购买',
						icon: 'none'
					});
				}
			},
			beifen(id) {
				if (this.laiid == '') {
					this.myAlert('没有获取到矿机');
					return false;
				}
				if (this.mima == '') {
					this.myAlert('请输入密码');
					return false;
				}
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确定购买么？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.showLoading({
								title: '提交中...',
								mask: true
							});
							var xuanle = {
								userId: uni.getStorageSync('id'),
								token: uni.getStorageSync('token'),
								typeId: that.laiid,
								payPwd: that.mima,
								MiningMachineryTypeId: that.fromId
							};
							console.log(xuanle);
							uni.request({
								url: that.websiteUrlzhh + 'afd/investment', //仅为示例，并非真实接口地址。
								method: 'POST',
								data: xuanle,
								header: {
									'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
									Authorization: that.userToken,
									'Accept-Language': 'zh'
								},
								success: res => {
									uni.hideLoading();
									console.log(res.data);
									if (res.data.code == 200) {
										that.show3 = false;
										that.shu = '';
										that.mima = '';
									} else if (res.data.code == 402) {
										that.mima = '';
										uni.reLaunch({
											url: '../../login/login'
										});
									}
									uni.showToast({
										title: res.data.msg,
										icon: 'none',
										duration: 2000
									});

									that.shu = '';
									that.mima = '';
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			checkPayPwd() {
				var that = this;
				var zhebishisha = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id')
				};
				uni.request({
					url: this.websiteUrl + 'user/isSettingPayPassword',
					method: 'GET',
					data: zhebishisha,
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					success: res => {
						console.log('判断是否绑定', res.data);

						if (res.data.code == 200) {
							that.zhimi = res.data.data;
						} else {}
					},
					fail: () => {}
				});
			},
			quxiaoshow() {
				this.show3 = false;
			},
			quliebiao() {
				uni.showToast({
					icon: 'none',
					title: '暂未开通'
				})
				// uni.navigateTo({
				// 	url: '../order-list'
				// });
			}
		}
	};
</script>
<style lang="scss" scoped>
	.bgImg{
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.kuangjiList {
		margin-top: 100upx;
		width: 600upx;
		margin-left: 75upx;
	}

	.kuangjiItem {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40upx;
		border-top: 8upx solid #39BAE8;
	}

	.kuangjiItem:first-child {
		border: 0;
	}

	.buyBtn {
		width: 200upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		border-radius: 30upx;
		background-color: #5A6A83;
		color: #39BAE8;
		font-size: 36upx;
		font-weight: 600;
	}

	.kuangjixinghao {
		font-size: 42upx;
		color: #FFFFFF;
	}

	.kuangjijiage {
		font-size: 34upx;
		color: #FFFFFF;
	}








	.bg-img {
		// background-image: url(/static/kuangchi/bg02.png);
		background-repeat: repeat;
	}

	.loading_c {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 999999;
		display: none;
	}

	.loading_c.active {
		display: block;
	}

	.header_box {
		margin-top: 25rpx;

		image {
			// background-color: white;
			border-radius: 50%;
		}
	}

	.head_banner {
		position: relative;
		width: 100%;
		height: 300upx;

		.swiper {
			position: absolute;
			bottom: 0upx;
			width: 100%;
			padding: 0 30upx;
			box-sizing: border-box;
			height: 280upx;

			image {
				width: 100%;
				height: 100%;
				border-radius: 15upx;
			}
		}
	}

	.grabBag_body {
		flex: 1;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		margin-top: 20upx;
		padding-top: 50upx;

		.grabBag_head {
			width: 100%;
			height: 300upx;
			padding-left: 30upx;
			box-sizing: border-box;
			display: flex;
			align-items: center;

			.label {
				margin-right: 44upx;
			}

			.grabBag_head_content {
				flex: 1;

				display: flex;
				align-items: center;
				padding-right: 10upx;
				box-sizing: border-box;

				&::-webkit-scrollbar {
					display: none;
				}

				.grabBag_head_inner {
					display: flex;

					.grabBag_head_item {
						position: relative;
						margin-right: 44upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						flex-shrink: 0;

						.date {
							font-size: 35upx;
							font-weight: bolder;
							color: #000000;
						}

						.label_text {
							margin-top: 16upx;
							font-size: 30upx;
							color: #fff;

							&.active {
								// margin-top: 10upx;
								// border-radius: 19upx;
								// padding: 6upx 21upx;
								font-size: 35upx;
								color: #7e31ce;
								font-weight: bold;
								// background-color: #00C777;
								// border-radius: 30upx;
							}
						}
					}
				}
			}
		}
	}

	page {
		background-color: #0f1113;
	}

	.shouRuList_item {
		margin-left: 30upx;
		padding-right: 30upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top: 20upx;
		padding-bottom: 20upx;
	}

	.shouRuList_item_name {}

	.shouRuList_item_info {
		margin-top: 10upx;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.date {}

	.price {}

	/* 矿机列表 */
	.kuangji-item {
		position: relative;
		width: 710rpx;
		height: 330rpx;
		margin: 20rpx auto;
		// background-image: url(/static/kuangchi/bg01@3x.png);
		background-size: 100% 100%;

		.kuangji-img {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			position: absolute;
			top: 40rpx;
			left: 50rpx;
			// background-image: url("/static/kuangchi/frc.png");
			// background-size: 100% 100%;
		}

		/* 矿机名称 */
		.kuangji-name {
			position: absolute;
			top: 49rpx;
			left: 210rpx;
			font-size: 42rpx;
			font-weight: bold;
			color: white;
		}

		.kuangji-type {
			position: absolute;
			top: 109rpx;
			left: 210rpx;
			font-size: 42rpx;
			font-weight: bold;
			color: white;
		}

		.kuangji-buy {
			position: absolute;
			top: 80rpx;
			right: 78rpx;
			font-size: 36rpx;
			font-weight: bold;
			// color: white;
		}

		.kuangchi-shouyi-title {
			position: absolute;
			bottom: 62rpx;
			left: 43rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: white;
		}

		.kuangchi-shouyi-count {
			position: absolute;
			bottom: 62rpx;
			left: 203rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: white;
		}

		.kuangchi-wakuang-title {
			position: absolute;
			bottom: 62rpx;
			right: 202rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: white;
		}

		.kuangchi-wakuang-count {
			position: absolute;
			bottom: 62rpx;
			right: 32rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: white;
		}
	}

	/* 免费矿机 */
	.free-kuangji {
		position: relative;
		height: 100vh;
		padding-top: 300rpx;
		box-sizing: border-box;

		/* 地球 */
		.earth {
			position: relative;
			width: 100%;
			height: 600rpx;

			.earth-circle {
				position: absolute;
				width: 600rpx;
				height: 600rpx;
				left: 75rpx;
				top: 0;
				background-size: 100% 100%;
				animation: earth-circle 10s linear infinite;
			}

			.earth-image {
				position: absolute;
				width: 300rpx;
				height: 300rpx;
				border-radius: 50%;
				left: 220rpx;
				top: 140rpx;
				// background-image: url('/static/kuangchi/world.png');
				background-size: auto 100%;
				animation: earth 10s linear infinite;
			}
		}

		/* 信息 */
		.kuangji-info {
			position: absolute;
			bottom: 60rpx;
			left: 20rpx;
			width: 710rpx;

			.kuangji-info-detail {
				position: absolute;
				bottom: 60rpx;
				height: 300rpx;
				width: 440rpx;
				// background-image: url(/static/kuangchi/the_order_bg@3x.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;

				text {
					color: #44d39f;
					font-size: larger;
					font-weight: bolder;
				}
			}

			.border-line {
				border-bottom: 1rpx solid #44d39f;
			}

			.kuangji-info-buttons {
				position: absolute;
				right: 0;
				bottom: 60rpx;
				height: 300rpx;
				width: 240rpx;

				.kuangji-info-button {
					position: absolute;
					top: 30rpx;
					right: 0;
					width: 240rpx;
					height: 100rpx;
					color: white;
					font-size: 36rpx;
					line-height: 100rpx;
					font-weight: bolder;
					text-align: center;
					// background-image: url(/static/kuangchi/button_bg@3x.png);
					background-size: 100% 100%;
					background-repeat: no-repeat;
				}

				.kuangji-info-button-tixian {
					top: 165rpx;
				}
			}
		}
	}

	/* 球 */
	.ball {
		position: absolute;
		// left: 0;
		// top: 0;
		width: 80rpx;
		height: 80rpx;
		color: white;
		transition: all 2s linear;

		.ball-item {
			position: absolute;
			left: 0;
			top: 0;
			width: 80rpx;
			height: 80rpx;
			animation: ball 3s linear infinite;
			animation-direction: alternate;

			/* 外框 */
			.ball-outer {
				position: absolute;
				left: 0;
				top: 0;
				width: 80rpx;
				height: 80rpx;
			}

			/* 内框 */
			.ball-inner {
				position: absolute;
				left: 20rpx;
				top: 20rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}

		.ball-count {
			position: absolute;
			left: 20rpx;
			bottom: -30rpx;
			font-size: 20rpx;
		}
	}

	/*  */
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

	/* 浮动 */

	@keyframes ball {
		from {
			top: 0;
			transform: rotate(0);
		}

		to {
			top: 25rpx;
			transform: rotate(360deg);
		}
	}
</style>
