<template>
	<!-- 收款码列表 -->
	<view class="container" :style="hb_status?'background:#ffffff;':'background:#05060F;'"> 
		<view class="header hi-columns" :style="'padding-top: '+statusBarH+'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'" mode=""
				 style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view class="set_text_title" :style="hb_status?'color:#000000':'color:#ffffff'">{{ type=='zfb'?$t('wo.zfbskm'):$t('wo.wxskm') }}</view>
			</view> 
		</view>
		<view class="content hi-columns" :style="hb_status?'height: 100vh;background:#F0F3F5;padding-top:'+(header_H)+'px;':'background:'+backgroundALL+';padding-top:'+(header_H)+'px;'">
			<view class="content-section">
				<view class="content_text_title" :style="hb_status?'color:#000000':'color:#ffffff'">{{ type=='zfb'?$t('wo.wdzfbskm'):$t('wo.wdwxskm') }}：{{ qrCodeData.length }}</view>
				<view
				 class="section-pay" 
				 :style="hb_status?'background:#ffffff;color:#000000':'background:#252A31;color:#fff'"
				 v-for="(item,index) in qrCodeData"
				 :key="index"
				 @click="selcet(item,0)"
				 >
				 	<view class="pay-active" v-show="item.status==0">{{$t('wo.yjh')}}</view>
					<view class="section-left">
							<image class="pay-logo" :src="codeType==2?'../../../static/img/pay_zfb.png':'../../../static/img/pay_wx.png'"></image>
							<text>{{ item.name }}</text>
					</view>
					<view class="section-right">
							<image class="pay-logo" :src="item.img"></image>
							<text @click.stop="selcet(item,3)">{{$t('wo.sc')}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="add-qrCode" :style="hb_status?'background:#ffffff;':'background:#252A31;'" @click="toAdd">
			<image src="../../../static/img/icon_add.png" />
			<text>{{$t('wo.tjskm')}}</text>
		</view>
		

	
		
		
	</view>
</template>
 
<script>

	var This;
	export default {
		data() {
			return {
				backgroundALL:'',
				colorALL:'',
				statusBarH: '',
				windowHeight:0,
				header_H:0,
				hb_status:true, //true 白色   false 黑色	
				isRealName:true,
				type: 'zfb',
				codeType: 2,
				qrCodeData: [],
				pages: 1,
				pageTotal: 0
			}
		},
		onLoad(receive) {
			this.type = receive.type;
			if(receive.type=='zfb'){
				this.codeType = 2
			}else{
				this.codeType = 3
			}
			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight
				}
			})
		},
		onReady() {
				var view = uni.createSelectorQuery().select(".header");
				view.boundingClientRect(data => {
					This.header_H = data.height;
				}).exec();
		},
		onShow() {
			this.qrCodeData = []
			this.getData()
			this.backgroundALL = uni.getStorageSync('localbk')
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(()=>{
				this.tab_init();
			},500)
		},
		methods: {
			getData(){
				uni.request({
						url: this.websiteUrl + 'user/getPayInfoList',
						method: 'GET',
						data: {
							"token": uni.getStorageSync("token"),
							"userId": uni.getStorageSync("id"),
							"type": this.codeType,
							"page": this.pages
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded',
								"Accept-Language":'zh'
						},
						success: (res) => {
							if (res.data.code == 200) {
								this.pageTotal = res.data.totalPages;
								this.qrCodeData = [...this.qrCodeData, ...res.data.data]
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
			exit_btn(){
				uni.navigateBack({  //后退按钮
					delta:1
				})
			},
			selcet(item,type){
				let This = this;
				let titleText = '';
				if(type==0){
					if(item.status==0){
						titleText = This.$t('wo.qxjh')
						type = 1
					}else{
						titleText =This.$t('wo.jh')
					}
				}else{
					titleText = This.$t('wo.sc')
				}
				uni.showModal({
					title: This.$t('wo.ts'),
					content: This.$t('wo.qd')+titleText+This.$t('wo.ma'),
					success: function (res) {
						if (res.confirm) {
							uni.request({
								url: This.websiteUrl + 'user/updatePayInfoStatus',
								method: 'POST',
								data: {
									"token": uni.getStorageSync("token"),
									"userId": uni.getStorageSync("id"),
									"id": item.id,
									"status": type,
									"type": item.type
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded',
										"Accept-Language":'zh'
								},
								success: (res) => {
									if (res.data.code == 200) {
										uni.showToast({
											title: '成功！',
											duration: 2000
										});
										setTimeout(()=>{
											This.pages = 1
											This.qrCodeData = []
											This.getData()
										},1500)
									} else if (res.data.code == 500) {
										This.myAlert(res.data.msg)
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
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			toAdd(){
				uni.navigateTo({
						url: 'addPay_qrCode?type='+ this.type
				});
			},
			tab_init(){
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
		},
		onReachBottom(){
			let This=this;
			if(this.pageTotal>this.pages){
				this.pages++
				uni.showLoading({
					title: This.$t('stylePulic.Loading')
				});
				this.getData()
			}else{
				uni.showToast({
					title: This.$t('stylePulic.Nomore'),
					icon: 'none',
					duration: 1000
				});
			}
		}
	}
</script>

<style lang="scss">
	.uni-text{
			font-size: 30upx;
			text-align: center;
			margin-top: 30upx;
	}
	
	
 page{min-height: 100%;}
.container{width: 100%;min-height: 100vh;background: #F0F3F5;}

.header {padding: 0 30upx;box-sizing: border-box;position: fixed;width: 100%;left: 0;top: 0;z-index: 99999;}
.header .header_box {height: 88upx;image{position: relative;}}

.content{flex: 1;width: 100%;overflow:auto;box-sizing: border-box;min-height: 100vh;}

.set_text_title{font-size: 36upx;width: 100%;margin-left: -60upx;font-weight: bold;text-align: center;}

.icon-arrow-right{color: #8792A8;font-size: 32upx;}
.item_l{margin: 0 40upx;width: 670upx;padding: 25upx 40upx;box-sizing: border-box;border-radius: 16upx;margin-bottom: 20upx;}


.yd_box{display: inline-flex; width: 16upx;height: 16upx;border-radius: 8upx;background:#E64340;position: relative;top: -30upx;right: -5upx;}

.btn{width: 670upx;margin: 0 40upx;margin-top: 140upx;border: 2upx solid #3A74FC;color: #3A74FC;text-align: center;height: 100upx; line-height: 100upx;font-size: 36upx;border-radius: 50upx;}
.content-section{
	padding: 30upx;
	.content_text_title{
		font-size: 28upx;
	}
}
.section-pay{
	position: relative;
	margin-top: 20upx;
	padding: 40upx 30upx;
	border-radius: 20upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.pay-active{
		position: absolute;
		top: 0;
		left: 0;
		background: #1586FF;
		color: #fff;
		font-size: 32upx;
		padding: 8upx 20upx;
		border-radius: 6upx;
	}
	.section-left{
		display: flex;
		align-items: center;
		image{
			width: 72upx;
			height: 72upx;
		}
		text{
			padding-left: 20upx;
			font-size: 36upx;
		}
	}
	.section-right{
		display: flex;
		align-items: center;
		image{
			width: 160upx;
			height: 160upx;
		}
		text{
			padding-left: 60upx;
			font-size: 32upx;
			color: #F33F3F;
		}
	}
}
.add-qrCode{
	position: fixed;
	width: 100%;
	bottom: 0;
	padding: 26upx 0;
	display: flex;
	align-items: center;
	justify-content: center;
	image{
		width: 44upx;
		height: 44upx;
	}
	text{
		font-weight: bold;
		font-size: 36upx;
		color: #1586FF;
		padding-left: 20upx;
	}
}
</style>
