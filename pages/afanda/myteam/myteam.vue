<template>
	<view class="content">
		<view class="muen_header hi-columns" style="padding-top:30px;" :style="hb_status?'background:#FFF;':'background:#FFF;'">
			<view class="hi-rows hi-flex-vcenter  hi-space-between">
				<view class="hi-rows hi-flex-vcenter">
					<image src="../../../static/home/nav_icon_back_day.png" mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
				</view>
				<view class="hi-rows hi-flex-vcenter" style="font-size: 35upx; font-weight: bold;">{{$t('afanda.wdzt')}}</view>
				<view></view>
			</view>
		</view>
		<view class="hi-columns list_box">
			<block v-for="(item, index) in list_data" :key="index">
				<!-- <view class="hi-columns item">
					<view class="hi-columns c_con">
						<view class="hi-rows hi-space-between i_index">
							<text>{{$t('afanda.zh')}}:{{item.account}}</text>
							<view class="hi-flex hi-flex-vcenter">
								<text>{{$t('afanda.tz')}}:{{item.miningPoolHoldings||'0'}}</text>
								<text style="margin-left: 20rpx;">{{$t('afanda.yj')}}:{{item.per}}</text>
							</view>

						</view>
					</view>
				</view> -->
				
				<view class="listItem">
					<view class="listItemOne" style="width: 50%;">
						<view style="margin-bottom: 12upx;color: #999;">{{$t('afanda.zh')}}</view>
						<view style="font-weight: 600;">{{item.account}}</view>
					</view>
					<view class="listItemOne" style="width: 30%;">
						<view style="margin-bottom: 12upx;color: #999;">{{$t('afanda.tz')}}</view>
						<view style="color: #FDB44B;font-weight: 600;">{{item.miningPoolHoldings||'0'}}</view>
					</view>
					<view class="listItemOne" style="width: 20%;">
						<view style="margin-bottom: 12upx;color: #999;">{{$t('afanda.yj')}}</view>
						<view style="color: #00BBF0;font-weight: 600;">{{item.per}}</view>
					</view>
				</view>
				
			</block>
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
				pagejia: 1
			};
		},
		onLoad() {
			var This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight;
					console.log(This.windowHeight);
				}
			});
		},
		onReachBottom: function() {
			var that = this;
			uni.showLoading({
				title: that.$t('stylePulic.Loading')
			});
			setTimeout(function() {
				uni.hideLoading();
				that.pagejia = Number(that.pagejia) + 1;
				that.getLedger();
			}, 1000);
		},
		onShow() {
			this.getLedger();
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
				var This = this;
				var gengduo = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					page: this.pagejia
				};
				console.log(gengduo);
				uni.request({
					url: this.websiteUrlzh + '/afd/getDirectList', //仅为示例，并非真实接口地址。
					data: gengduo,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					method: 'GET',
					success: res => {
						console.log("myteam:" + JSON.stringify(res.data));
						if (res.data.code == 200) {
							if (res.data.currentPage >= res.data.totalPages) {
								uni.showToast({
									title: This.$t('stylePulic.Nomore'),
									icon: 'none',
									duration: 1000
								});
								// this.list_data = this.list_data.concat(res.data.data);
							} else {
								uni.showToast({
									title: This.$t('stylePulic.Loaded'),
									icon: 'none',
									duration: 1000
								});
								console.log(this.list_data);
							}
							this.list_data = this.list_data.concat(res.data.data);
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
	page {
		background-color: #FFF;
	}

	.muen_header>view {
		height: 88upx;
		padding: 0 40upx;
		box-sizing: border-box;
	}

	.header_title_box {
		padding: 0 0 20upx 40upx;
		box-sizing: border-box;
		margin: 0upx 0;
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
	}
	.listItem{
		display: flex;
		justify-content: space-around;
		margin:32upx 0;
		background-color: #F5F7FA;
		padding: 20upx 12upx;
		
	}
	.listItemOne{
		text-align: left;
	}

	.list_box .item {
		margin-bottom: 22upx;
		background: #ffffff;
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
