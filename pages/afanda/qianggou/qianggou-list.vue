<template>
	<view class="Page">
		<view class="content" :style="'padding-top: ' + statusBarH + 'px;'">
			<view class="header">
				<view class="flex_left">
					<image :src="hb_status ? '../../../static/home/nav_icon_back_day.png' : '../../../static/home/nav_icon_back_night.png'"
					  @click="Back()" class="goback"></image>
					<view class="pageName">
						{{$t('afanda.qglist')}}
					</view>
				</view>
				<!-- 占位 -->
				<view></view>
			</view>
			<view class="list" v-for="(item, index) in list_data" :key="index">
				<view class="list_left">
					<image src="../../../static/home/icon_advanced.png" class="item_img"></image>
					<view>
						<view>{{$t('afanda.price')}}：<text class="price">{{item.price}}</text></view>
						<view class="price_txt">{{$t('afanda.start')}}：{{winnings[item.isWinning]}}</view>
					</view>
				</view>
				<view class="list_right">
					<view class="item_num">
						<text style="color: #ABABAB;margin-right:20upx;">{{$t('afanda.num')}}：</text> {{item.num}}
					</view>
					<view class="item_time">
						{{item.createDate}}
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
				tab_index: 1,
				bz_index: 1,
				index: 0, //币种切换
				bz_arr: [], //币种
				list_data: [],
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				pagejia: 1,
				hasMore: true,
				winnings: [this.$t('afanda.processing'), this.$t('afanda.Notwinning'), this.$t('afanda.HasWon')]
			};
		},
		onLoad() {
			var This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight;
					// console.log(JSON.stringify(res))
					console.log(This.windowHeight);
				}
			});
			this.getLedger();
		},
		onReachBottom: function() {
			var that = this;
			uni.showLoading({
				title: that.$t('stylePulic.Loading')
			});
			setTimeout(function() {
				uni.hideLoading();
				that.pagejia = Number(that.pagejia) + 1;
				// that.gengduozixuan()
				that.getLedger();
			}, 1000);
		},
		onShow() {
			// this.order_list();
		},
		methods: {
			Back() {
				uni.navigateBack({
					//后退
					delta: 1
				});
			},
			/* 获取账本列表 */
			getLedger() {
				let _this = this;
				if (_this.hasMore) {
					var gengduo = {
						token: uni.getStorageSync('token'),
						userId: uni.getStorageSync('id'),
						page: this.pagejia
					};
					console.log(gengduo);
					uni.request({
						url: this.websiteUrlzh + 'afd/getSnappedUpRecord', //仅为示例，并非真实接口地址。
						data: gengduo,
						header: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Accept-Language': 'zh'
						},
						method: 'GET',
						success: res => {
							console.log(res.data);
							if (res.data.code == 200) {
								if (res.data.currentPage >= res.data.totalPages) {
									uni.showToast({
										title: _this.$t('stylePulic.Nomore'),
										icon: 'none',
										duration: 1000
									});
									_this.hasMore = false;
								} else {
									uni.showToast({
										title: _this.$t('stylePulic.Loaded'),
										icon: 'none',
										duration: 1000
									});

								}
								_this.list_data = _this.list_data.concat(res.data.data);
							} else if (res.data.code == 500) {
								_this.myAlert(res.data.msg);
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
						title: _this.$t('stylePulic.NoMoreData'),
						icon: 'none'
					})
				}
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
					url: this.websiteUrlotc + 'otc/getMyselfShopList', //仅为示例，并非真实接口地址。
					data: gengduo,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							if (this.pagejia > res.data.data.totalPages) {
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
								if (res.data.data.list == null || res.data.data.list == '') {
									this.list_data = [];
								} else {
									this.list_data = this.list_data.concat(res.data.data.list);
									console.log(this.list_data);
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
					userId: uni.getStorageSync('id'),
					page: 1
				};
				console.log(zixuanlist);
				uni.request({
					url: this.websiteUrlotc + 'otc/getMyselfShopList', //仅为示例，并非真实接口地址。
					data: zixuanlist,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						uni.hideLoading();
						if (res.data.code == 200) {
							// this.list_data = res.data.data.list
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
			}
		},
		filters: {
			numFilter(value) {
				let realVal = value.toFixed(2);
				return realVal;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.Page {
		view {
			box-sizing: border-box;
		}

		padding: 0 30upx;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.flex_left {
				display: flex;
				justify-content: space-between;
				width: 200upx;

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

		.list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 90upx;

			.list_left {
				display: flex;
				justify-content: left;

				.item_img {
					width: 60upx;
					height: 80upx;
					margin-right: 30upx;
				}

				.price {
					font-size: 32upx;
					font-weight: 600;
					color: #33C7F2;
				}

				.price_txt {
					font-size: 26upx;
					color: #ABABAB;
				}
			}

			.list_right {
				text-align: right;
				color: #FDC069;

				.item_time {
					margin-top: 6upx;
					color: #ABABAB;
				}
			}
		}
	}
</style>
