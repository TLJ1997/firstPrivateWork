<template>
	<view class="container hi-columns" :style="backgroundALL == '#1c1f22'?'background:#05060F;':'background:#FFF;'">
		<!-- 标题栏 -->
		<view class="muen_header hi-columns" :style="'padding-top:'+statusBarH+'px;'">
			<view class="hi-rows hi-flex-vcenter" style="display: flex;justify-content: flex-start;">
				<view class="hi-rows hi-flex-vcenter">
					<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'" style="width:46upx;height: 46upx;" @click="Back()"></image>
				</view>
				<text :style="hb_status?'color: #242833;':'color: #ffffff;'" style="font-size: 36upx;margin-left: 20upx;">{{$t('wallet.cbsm')}}</text>
			</view>
		</view>
		<view class="hi-columns" style="flex: 1;width: 100%;">
			<!-- <view class="header_title_box hi-rows hi-flex-vcenter hi-space-between">
				<view class="header_item hi-rows hi-flex-vcenter hi-space-between">
					<text class="t1" :style="hb_status?'color: #242833;':'color: #ffffff;'">{{$t('wallet.tbsm')}}</text>
				</view>
				<view class="header_item">
				</view>
			</view> -->

			<view class="content hi-columns" :style="hb_status?'background:#FFFFFF;color:#242933;margin-bottom: 100upx;':'background: #18253D;color:#ffffff;margin-bottom: 100upx;'">
				
				<view class="item hi-columns">
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin: 46upx 0 42upx 0;">
						<text class="t_text" :style="hb_status?'border-left: 6upx solid #242933;color: #242933;':'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'" >{{$t('wallet.zysx')}}</text>
						<text class="t_r_infto"></text>
					</view>
					<view class="hi-columns sm_text" style="flex: 1;overflow-y: auto;padding: 40upx;padding-top: 0; color: #6E778A;text-indent: 40upx;">
						<rich-text :nodes="neirong"></rich-text>
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
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				neirong:''
			}
		},
		onLoad(e) {
			
			let This = this;
			This.neirong = e.neirong
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight
				}
			})
			var view = uni.createSelectorQuery().select(".muen_header");
			view.boundingClientRect(data => {
				This.header_H = data.height;
			}).exec();
		},
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk')
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(()=>{
				this.tab_init();
			},500)
		},
		methods: {
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
	
	.content .item .t_text{font-size: 28upx;padding-left: 34upx;box-sizing: border-box;border-left: 6upx solid #242933;}
	.content .item .t_r_infto{color: #8792A8;font-size: 20upx;}
	.content .item .input_box{padding: 0 40upx;box-sizing: border-box;padding-left: 0;padding-bottom: 23upx;}
	.content .item .input_box input{font-size: 36upx;padding-left: 34upx;box-sizing: border-box;color: #8792A8;flex: 1;}
	.content .item .input_box .biz{font-size: 22upx;color: #8792A8;padding-right: 30upx;border-right: 2upx solid rgba(0,0,0,.1);margin-right: 30upx;}
	.content .item .input_box .all_btn{font-size: 28upx;color: #3A74FC;}
	.content .item .input_box .textarea_box{min-height: 240upx;background: #C0C4CC;width: 590upx;margin-left: 40upx;padding: 20upx;box-sizing: border-box;position: relative;}
		.content .item .input_box .textarea_box textarea{flex: 1;font-size: 28upx;width: 100%;padding-bottom: 20upx;box-sizing: border-box;}
		.content .item .input_box .textarea_box .num{font-size: 20upx;color: #8792A8;position: absolute;right: 20upx;bottom: 20upx;}
	
	.sm_text text{line-height: 48upx;}
	
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
	.bi_title .name{font-size: 36upx;margin: 0 20upx;}

	.content {
		width: 670upx;
		margin: 0 40upx;
		border-radius: 16upx;
		box-sizing: border-box;
		padding-bottom: 55upx;
	}

	
</style>
