<template>
	<view class="container" :style="hb_status?'background:#ffffff;':'background:#05060F;'">
		<view class="header hi-columns" :style="hb_status?'background:#ffffff;padding-top: '+statusBarH+'px;':'background:#05060F;padding-top: '+statusBarH+'px;'">
			<view class="header_box hi-rows hi-flex-vcenter">
				<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'"
				 mode="" style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view class="header-title" :style="'color:'+colorALL">{{$t('afanda.symx')}}</view>
			</view>
		</view>
		<view class="content hi-columns" :style="hb_status?'background:#F0F3F5;padding-top:'+(header_H+10)+'px;':'background: #05060F;padding-top:'+(header_H+10)+'px;'">
			<view class="content-heyue" :style="'background:'+ backgroundALL+';color:'+colorALL">
				<view class="hi-columns list_box">
					<block v-for="(item, index) in list_data" :key="index">
						<!-- <view class="hi-columns item">
							<view class="hi-columns c_con">
								<view class="hi-rows hi-space-between i_index">
									<text class="dj_text">{{item.type+'：'}} <text style="font-size: 36upx;color: #43CBF3;">{{item.amount}}</text></text>
									<view class="hi-rows"></view>
								</view>
								<view class="hi-columns i_index">{{$t('afanda.createtime')}}：{{ item.createDate }}</view>
							</view>
						</view> -->
						
						<view class="shouyiList">
							<view class="title_shou">
								<view style="font-weight: 600;">
									{{item.type}}
								</view>
								<view style="font-size: 36upx;color: #24C3F1;margin-top: 18upx;">
									{{item.amount}}
								</view>
							</view>
							<view  style="font-weight: 600;color: #898989;">
								{{ item.createDate }}
							</view>
						</view>
					</block>
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
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				pagejia: 1
			};
		},
		onLoad() {
			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight
					console.log(JSON.stringify(res))
					console.log(This.windowHeight)
				}
			})
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
			this.backgroundALL = uni.getStorageSync('localbk')
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(() => {
				this.tab_init();
			}, 500)
		},
		onReady() {
			var view = uni.createSelectorQuery().select(".header");
			view.boundingClientRect(data => {
				console.log("节点离页面顶部的距离为" + data.height);
				This.header_H = data.height;
				console.log(This.header_H)
			}).exec();
		},
		methods: {
			exit_btn() {
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
			},
			/* 获取账本列表 */
			getLedger() {
				var _this = this;
				var gengduo = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					page: this.pagejia
				};
				console.log(gengduo);
				uni.request({
					url: this.websiteUrlzh + 'afd/getBonusRecordList', //仅为示例，并非真实接口地址。
					data: gengduo,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							if (_this.pagejia > res.data.totalPages) {
								uni.showToast({
									title: _this.$t('stylePulic.Nomore'),
									icon: 'none',
									duration: 1000
								});
							} else {
								uni.showToast({
									title: _this.$t('stylePulic.Loaded'),
									icon: 'none',
									duration: 1000
								});
								if (res.data.data == null || res.data.data == '') {
									_this.list_data = [];
								} else {
									_this.list_data = _this.list_data.concat(res.data.data);
									console.log(_this.list_data);
								}
							}
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
			},
			gengduozixuan() {
				This = this
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
				var This = this
				uni.showLoading({
					title: This.$t('stylePulic.Loaded'),
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

<style>
	.shouyiList{
		display: flex;
		justify-content: space-between;
		margin: 20upx 0;
		margin-bottom: 40upx;
		padding: 0 16upx;
	}
	
	
	
	page {
		background-color: #4397f1;
	}

	.header {
		padding: 0 30upx;
		box-sizing: border-box;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 99999;
		background-color: #FFF;
	}

	.header-title {
		font-size: 42upx;
		margin-left: 20upx;
		font-weight: bold;
	}

	.header .header_box {
		height: 88upx;
	}

	.header_title_box .header_item {
		text-align: center;
	}

	.header_title_box .header_item .t1 {
		font-size: 48upx;
		color: #ffffff;
		font-weight: bold;
	}

	.header_title_box .header_item .t2 {
		color: #8792a8;
		font-size: 22upx;
		margin-left: 19upx;
	}

	.header_title_box .header_item .h_btn {
		color: #3a74fc;
		border: 1upx solid #3a74fc;
		width: 120upx;
		height: 58upx;
		border-radius: 29upx;
		line-height: 58upx;
	}

	view,
	text {
		font-size: 28upx;
	}

	.nav_box {
		height: 88upx;
		align-items: center;
		border-bottom: 22upx solid #eff3f6;
		background: #ffffff;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}

	.nav_box view {
		flex: 1;
		text-align: center;
		padding: 20upx 0;
		font-size: 34upx;
		color: #78889e;
		border-bottom: 8upx solid #ffffff;
	}

	.nav_box view.active {
		border-bottom: 8upx solid #0080ff;
		color: #0080ff;
	}

	.list_box {
		padding: 30upx;
		box-sizing: border-box;
		background-color: transparent;
	}

	.list_box .item {
		margin-bottom: 22upx;
		border-radius: 15rpx;
	}

	.list_box .item>.hi-rows {
		border-bottom: 2upx solid #e5e8f3;
		padding: 42upx 20upx;
		box-sizing: border-box;
	}

	.list_box .item>.hi-columns {
		/* border-bottom: 2upx solid #e5e8f3; */
		padding: 42upx 20upx;
		box-sizing: border-box;
	}

	.list_box .item>.c_con {
		justify-content: flex-end;
	}

	.list_box .item>.c_con .i_index {
		justify-content: space-between;
		margin: 5upx 0;
		color: #a6a6ae;
	}

	.dj_text {
		font-size: 34upx;
		font-weight: bold;
		color: #757581;
	}

	.btn_box {
		justify-content: flex-end;
	}

	.btn_box text {
		padding: 10upx 30upx;
		color: #0080ff;
		border: 1upx solid #0080ff;
		border-radius: 10upx;
		margin: 0 20upx;
	}
</style>
