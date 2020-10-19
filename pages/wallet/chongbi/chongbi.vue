<template>
	<view class="container hi-columns" :style="backgroundALL == '#1c1f22'?'background:#05060F;':'background:#fff;'">
		<!-- 标题栏 -->
		<view class="muen_header hi-columns" :style="'padding-top:'+statusBarH+'px;'">
			<view class="hi-rows hi-flex-vcenter  hi-space-between">
				<view class="hi-rows hi-flex-vcenter">
					<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'"
					 mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
				</view>
				<view class="hi-rows hi-flex-vcenter">
				</view>
			</view>
		</view>
		<scroll-view class="hi-columns" scroll-y :style="'height: '+(windowHeight - header_H)+'px;width: 100%;'">
			<view class="header_title_box hi-rows hi-flex-vcenter hi-space-between">
				<view class="header_item hi-rows hi-flex-vcenter hi-space-between">
					<text class="t1" :style="hb_status?'color: #242833;':'color: #ffffff;'">{{$t('wallet.cb')}}</text>
				</view>
				<view class="header_item">
					<view class="buy_btm_box hi-rows hi-flex-vcenter hi-space-between">
						<view class="item hi-columns hi-flex-vcenter" @tap="xianmiao()">
							<image src="../../../static/wallet/icon_explain.png" mode=""></image>
							<text style="color: #3FBCE8;">{{$t('wallet.cbsm')}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="bi_title" :style="hb_status?'background:#FFFFFF;color:#242933':'background:#18253D;color:#ffffff'">{{bizhongming}}{{bizhongming=='USDT'?'-ERC20':''}}</view> -->
			<view class="content hi-columns" :style="hb_status?'background:#FFFFFF;color:#242933;':'background:#18253D;color:#ffffff;'">
				<view class="" style="color: #8792A8;text-align: center;margin-top: 36upx;margin-bottom: 41upx;font-size: 28upx;display: flex;justify-content: center;">
					<view style="color:#56C4EB;">{{bizhongming}}</view>
					<view>{{bizhongming=='USDT'?'-ERC20':''}}</view>
				</view>
				<view class="erweima_box hi-columns hi-flex-vcenter">
					<image :src="chongbidata.walletQrcode" mode=""></image>
					<view class="save_erweima">{{$t('wallet.bcewm')}}</view>
				</view>
				<view class="h_t" :style="hb_status?'border:1upx dashed rgba(0,0,0,.4);':'border:1upx dashed rgba(255,255,255,.4);'"></view>
				<view class="erweima_box  hi-flex-vcenter" style="padding-bottom: 60upx;">
					<view class="t2" :style="hb_status?'color:#242933':'color:#ffffff'">充币地址：{{chongbidata.address}}</view>
					<image src="/static/index/copy_yellow.png" style="width: 40upx;height: 40upx;margin-left: 320upx;" @click="setClipData(chongbidata.address)"></image>
				</view>
			</view>
		</scroll-view>
		<view class="grace-margin">
			<view class="grace-shade grace-shade-black" v-if="show2">
				<view class="grace-shade-msg grace-animate" style="border-radius: 30upx;">
					<view style="display: inline-flex; width: 100%; position: relative;">
						<view style="width:100%; height: 70upx; line-height: 70upx; font-size: 35upx;">{{$t('wallet.cbsm')}}</view>
						<view class="close-btn grace-icons icon-close3" style="font-size: 38upx; margin-top: 15upx; position: absolute; right: 15upx;"
						 @tap="beifen"></view>
					</view>
					<view class="body">
						<view style="width: 100%;padding: 30upx;box-sizing: border-box;">
							<rich-text :nodes="chongbidata.czDescription"></rich-text>

						</view>
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
				show2: false,
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				bizhongming: '',
				chongbidata: ''
			}
		},
		onLoad(e) {
			this.bizhongming = e.bizhong
			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight
					// console.log(JSON.stringify(res))
					console.log(This.windowHeight)

				}
			})

			var view = uni.createSelectorQuery().select(".muen_header");
			view.boundingClientRect(data => {
				// console.log("节点离页面顶部的距离为" + data.height);
				This.header_H = data.height;
				console.log(This.header_H)
			}).exec();
			uni.request({
				url: this.websiteUrlqiabao + 'account/getSymbolAddress',
				method: 'GET',
				data: {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					symbol: this.bizhongming
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					"Accept-Language": 'zh'
				},
				success: (res) => {
					console.log(res)

					if (res.data.code == 200) {
						this.chongbidata = res.data.data

					} else if (res.data.code == 500) {
						this.myAlert(res.data.msg)
					} else if (res.data.code == 402) {

						if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
							console.log('开启了指纹手势可以验证登录')
							uni.reLaunch({
								url: '../../../pages/indexzhiwen/indexzhiwen'
							});
						} else {
							console.log('没开启指纹手势去登录')
							uni.reLaunch({
								url: '../../../pages/login/login'
							});

						}

					}

				},
				fail: () => {

				}
			});
		},
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk')
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(() => {
				this.tab_init();
			}, 500)
		},
		methods: {
			xianmiao() {
				// this.show2 = true
				uni.navigateTo({
					url:'./chongbiDetail?neirong=' + this.chongbidata.czDescription
				})
			},
			beifen() {
				this.show2 = false
			},
			setClipData(sdata) {

				uni.setClipboardData({
					data: sdata,
					success: function() {
						console.log('success');
					}
				});

			},
			Back() {
				uni.navigateBack({ //后退
					delta: 1
				})
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
	}
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

	.muen_header {}

	.muen_header>view {
		height: 88upx;
		padding: 0 40upx;
		box-sizing: border-box;
	}

	.header_title_box {
		padding: 0 40upx;
		box-sizing: border-box;
		margin: 20upx 0;
	}

	.header_title_box .header_item {
		text-align: center;
	}

	.header_title_box .header_item .t1 {
		font-size: 48upx;
		color: #FFFFFF;
		font-weight: bold;
	}

	.header_title_box .header_item .t2 {
		color: #8792A8;
		font-size: 22upx;
		margin-left: 19upx;
	}

	.header_title_box .header_item .h_btn {
		color: #3A74FC;
		border: 1upx solid #3A74FC;
		width: 120upx;
		height: 58upx;
		border-radius: 29upx;
		line-height: 58upx;
	}

	.buy_btm_box .item {
		margin-left: 60upx;
	}

	.buy_btm_box .item image {
		width: 30upx;
		height: 30upx;
	}

	.buy_btm_box .item text {
		font-size: 22upx;
		color: #8792A8;
		margin-top: 14upx;
	}

	.bi_title {
		width: 670upx;
		height: 88upx;
		margin: 30upx 40upx;
		border-radius: 16upx;
		line-height: 88upx;
		padding-left: 40upx;
		font-size: 36upx;
		box-sizing: border-box;
	}


	.content {
		width: 670upx;
		margin: 0 40upx;
		border-radius: 16upx;
		box-sizing: border-box;
	}

	.erweima_box {}

	.erweima_box image {
		width: 300upx;
		height: 300upx;
		/* border: 4upx solid rgba(135, 146, 168, 1); */
		border-radius: 6upx;
		box-sizing: border-box;
	}

	.erweima_box .save_erweima {
		width: 300upx;
		height: 50upx;
		line-height: 60upx;
		border: 2px solid #B7ECFB;
		border-radius: 30px;
		font-size: 28upx;
		color: #48CDF4;
		text-align: center;
		margin-top: 60upx;
	}

	.h_t {
		width: 590upx;
		height: 0px;
		margin: 0 40upx;
		margin-top: 61upx;
		margin-bottom: 37upx;
	}

	.erweima_box .t1 {
		color: #8792A8;
		text-align: center;
		margin-top: 20upx;
		margin-bottom: 20upx;
		font-size: 28upx;
	}

	.erweima_box .t2 {
		width: 590upx;
		text-align: center;
		margin-bottom: 30upx;
		word-wrap: break-word
	}

	.erweima_box .t2 text {
		color: #FFFFFF;
		font-size: 30upx;
	}
</style>
