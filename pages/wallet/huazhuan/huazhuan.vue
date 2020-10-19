<template>
	<view class="container hi-columns" :style="backgroundALL == '#1c1f22'?'background:#05060F;':'background:#F0F3F5;'">
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
		<scroll-view class="hi-columns" scroll-y  :style="'height: '+(windowHeight - header_H)+'px;width: 100%;'">
			<view class="header_title_box hi-rows hi-flex-vcenter hi-space-between">
				<view class="header_item hi-rows hi-flex-vcenter hi-space-between">
					<text class="t1" :style="hb_status?'color: #242833;':'color: #ffffff;'">{{$t('wallet.hz')}}</text>
				</view>
				<view class="header_item">
					<view class="buy_btm_box hi-rows hi-flex-vcenter hi-space-between">
						<!-- <view class="item hi-columns hi-flex-vcenter">
							<image src="../../../static/wallet/icon_transfer.png" mode=""></image>
							<text>划转记录</text>
						</view> -->
						<view class="item hi-columns hi-flex-vcenter" @tap="xianmiao">
							<image src="../../../static/wallet/icon_explain.png" mode=""></image>
							<text>{{$t('wallet.hzsm')}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="bi_title hi-rows hi-flex-vcenter hi-flex-center" :style="hb_status?'background:#FFFFFF;color:#242933':'background:#18253D;color:#ffffff'" v-if="nadaona == 2">
				<image src="../../../static/wallet/icon_start_b.png" mode="" style="width: 40upx;height: 40upx;"></image>
				<text class="name" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{$t('wallet.bbzc')}}</text>
				<image src="../../../static/wallet/icon_process_b.png" style="width: 132upx;height: 6upx;" mode=""></image>
				<image src="../../../static/wallet/icon_end_b.png" style="width: 40upx;height: 40upx;margin-left: 20upx;" mode=""></image>
				<text class="name" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{$t('wallet.cwzc')}}</text>
				
			</view>
			<view class="bi_title hi-rows hi-flex-vcenter hi-flex-center" :style="hb_status?'background:#FFFFFF;color:#242933':'background:#18253D;color:#ffffff'" v-if="nadaona == 1">
				<image src="../../../static/wallet/icon_start_b.png" mode="" style="width: 40upx;height: 40upx;"></image>
				<text class="name" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{$t('wallet.cwzc')}}</text>
				<image src="../../../static/wallet/icon_process_b.png" style="width: 132upx;height: 6upx;" mode=""></image>
				<image src="../../../static/wallet/icon_end_b.png" style="width: 40upx;height: 40upx;margin-left: 20upx;" mode=""></image>
				<text class="name" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{$t('wallet.bbzc')}}</text>
				
			</view>
			<view class="content hi-columns" :style="hb_status?'background:#FFFFFF;color:#242933;':'background:#18253D;color:#ffffff;'">
				
				<view class="item hi-columns" :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);':'border-bottom: 1upx solid rgba(255,255,255,.1);'">
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin: 46upx 0 42upx 0;">
						<text class="t_text" :style="hb_status?'border-left: 6upx solid #242933;color: #242933;':'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'" >{{$t('wallet.hzsl')}}</text>
						<text class="t_r_infto"></text>
					</view>
					<view class="input_box hi-rows hi-flex-vcenter hi-space-between">
						<input type="text" v-model="huashu" :placeholder="input_number" placeholder-style="color:#8792A8;font-size:36upx" />
						<view class="">
							<text class="biz">{{bizhongming}}</text>
							<text class="all_btn" @tap="quanbu(available)">{{$t('wallet.qb')}}</text>
						</view>
					</view>
				</view>
				<view class="input_box hi-rows hi-flex-vcenter hi-space-between" v-if="nadaona == 2">
					<text style="color: #8792A8;padding-left: 40upx;margin-bottom: 10upx;margin-top: 20upx;">{{$t('wallet.kybbzc')}} {{available}} {{bizhongming}}</text>
				</view>
				<view class="input_box hi-rows hi-flex-vcenter hi-space-between" v-if="nadaona == 1">
					<text style="color: #8792A8;padding-left: 40upx;margin-bottom: 10upx;margin-top: 20upx;">{{$t('wallet.kycwzc')}} {{available}} {{bizhongming}}</text>
				</view>
			</view>
			
			<view class="btn_tj" @tap="tijiao">{{$t('wallet.tjsq')}}</view>
 

		</scroll-view>
		<view class="grace-margin">
			<view class="grace-shade grace-shade-black" v-if="show2" >
				<view class="grace-shade-msg grace-animate" style="border-radius: 30upx;">
					<view style="display: inline-flex; width: 100%; position: relative;">
						<view style="width:100%; height: 70upx; line-height: 70upx; font-size: 35upx;">{{$t('wallet.hzsm')}}</view>
						<view class="close-btn grace-icons icon-close3" style="font-size: 38upx; margin-top: 15upx; position: absolute; right: 15upx;" @tap="beifen"></view>
					</view>
					<view class="body">						
						<view style="width: 100%;padding: 30upx;box-sizing: border-box;">
							<rich-text :nodes="hzDescription"></rich-text>
							
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
				input_number:this.$t('wallet.qsrhzsl'),
				show2:false,
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				bizhongming:'',
				nadaona:'',
				huashu:'',
				tbDescription:'',
				available:0
			}
		},
		onLoad(e) {
			this.bizhongming = e.bizhong
			this.nadaona = e.changbi
			console.log(e)
			var zhebishisha = {
				symbol: this.bizhongming,
				token: uni.getStorageSync('token'),
				userId: uni.getStorageSync('id'),
				accountType:this.nadaona
			}
			console.log(zhebishisha)
			uni.request({
				url: this.websiteUrlqiabao + 'account/getTransferDescription',
				method: 'GET',
				data: zhebishisha,
				header: {
					'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
				},
				success: (res) => {
					console.log(res)
			
					if (res.data.code == 200) {
						this.tbDescription = res.data.data.hzDescription
						this.available = res.data.data.available
					} else {
			
					}
			
				},
				fail: () => {
			
				}
			});
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

		},
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk')
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(()=>{
				this.tab_init();
			},500)
		},
		methods: {
			quanbu(shu){
				if (shu <= 0) {
					this.myAlert(this.$t('wallet.zwkhzye'))
				} else{
					this.huashu = shu
				}
				
			},
			tijiao() {
				
				if (this.huashu == '' || this.huashu <= 0) {
					this.myAlert(this.$t('wallet.qzqsrkhzsl'))
					return false
				}
				uni.showLoading({
					title: this.$t('wallet.tjz'),
					mask: true
				})
				var quanbu = {
					num: this.huashu,
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					type: this.nadaona,
					symbol: this.bizhongming
					
				}
				console.log(quanbu)
				uni.request({
					url: this.websiteUrlqiabao + 'account/transfer',
					method: "POST",
					data: quanbu,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success: (res) => {
						uni.hideLoading()
						console.log(res)
						if (res.data.code == 200) {
							this.myAlert(res.data.msg)
							setTimeout(function() {
								uni.navigateBack({
									delta: 2
								})
							}, 1500)
			
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
			
			
			
			
			
					}
			
				})
			},
			xianmiao(){
				this.show2 = true
			},
			beifen(){
				this.show2 = false
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
	.content .item .t_text{font-size: 28upx;padding-left: 34upx;box-sizing: border-box;border-left: 6upx solid #242933;}
	.content .item .t_r_infto{color: #8792A8;font-size: 20upx;}
	.content .item .input_box{padding: 0 40upx;box-sizing: border-box;padding-left: 0;padding-bottom: 23upx;}
	.content .item .input_box input{font-size: 36upx;padding-left: 34upx;box-sizing: border-box;color: #8792A8;flex: 1;}
	.content .item .input_box .biz{font-size: 22upx;color: #8792A8;padding-right: 30upx;border-right: 2upx solid rgba(0,0,0,.1);margin-right: 30upx;}
	.content .item .input_box .all_btn{font-size: 28upx;color: #3A74FC;}
	.content .item .input_box .textarea_box{min-height: 240upx;background: #C0C4CC;width: 590upx;margin-left: 40upx;padding: 20upx;box-sizing: border-box;position: relative;}
		.content .item .input_box .textarea_box textarea{flex: 1;font-size: 28upx;width: 100%;padding-bottom: 20upx;box-sizing: border-box;}
		.content .item .input_box .textarea_box .num{font-size: 20upx;color: #8792A8;position: absolute;right: 20upx;bottom: 20upx;}
	
	.btn_tj{width: 670upx;height: 100upx;line-height: 100upx;text-align: center;border:2px solid rgba(58, 116, 252, 1);border-radius:50px;color: #3A74FC;font-size: 36upx;margin: 60upx 40upx;}
	
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
