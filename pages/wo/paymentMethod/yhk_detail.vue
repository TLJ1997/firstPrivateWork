<template>
	<view class="container" :style="hb_status?'background:#ffffff;':'background:#05060F;'"> 
		<view class="header hi-columns" :style="'padding-top: '+statusBarH+'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'" mode=""
				 style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view class="set_text_title" :style="hb_status?'color:#000000':'color:#ffffff'">{{$t('wo.yhk')}}</view>
			</view> 
		</view>
		<view class="content hi-columns" :style="hb_status?'height: 100vh;background:#F0F3F5;padding-top:'+(header_H)+'px;':'background:'+backgroundALL+';padding-top:'+(header_H)+'px;'">
			<view class="content-section">
				<view class="section-pay" style='background:#0091FF;'>
					<view class="card-name">
						<view class="title">
							<image src="../../../static/img/pay_yl.png" />
							<text class="name">{{ bankData.bank }}</text>
						</view>
						<text>{{$t('wo.cxk')}}</text>
					</view>
					<view class="card-number">
						****  ****  ****   
						<text>{{ bankData.bankNum }}</text>
					</view>
				</view>
				<button class="del-btn" @click="selcet(3)">{{$t('wo.jbgyhk')}}</button>
				<button class="del-btn" style="margin-top:40upx;" @click="selcet(0)">{{ bankData.status==0?$t('wo.qxjh'):$t('wo.qhgyhk') }}</button>
			</view>
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
				bankData: []
			}
		},
		onLoad(e) {
			this.bankData = e
			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight
					console.log(JSON.stringify(res))
					console.log(This.windowHeight)
				}
			})
		},
		onReady() {
				var view = uni.createSelectorQuery().select(".header");
				view.boundingClientRect(data => {
					console.log("节点离页面顶部的距离为" + data.height);
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
			console.log(this.colorALL)
		},
		methods: {
			selcet(type){
				let This = this;
				let titleText = '';
				if(type==0){
					if(This.bankData.status==0){
						titleText = This.$t('wo.qxjh')
						type = 1
					}else{
						titleText =  This.$t('wo.jh')
					}
				}else{
					titleText =  This.$t('wo.jb')
				}
				uni.showModal({
					title:  This.$t('wo.ts'),
					content:  This.$t('wo.qd')+titleText+ This.$t('wo.ma'),
					success: function (res) {
						if (res.confirm) {
							uni.request({
								url: This.websiteUrl + 'user/updatePayInfoStatus',
								method: 'POST',
								data: {
									"token": uni.getStorageSync("token"),
									"userId": uni.getStorageSync("id"),
									"id": This.bankData.id,
									"status": type,
									"type": 1
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded',
										"Accept-Language":'zh'
								},
								success: (res) => {
									if (res.data.code == 200) {
										uni.showToast({
											title: This.$t('wo.cg'),
											duration: 2000
										});
										setTimeout(()=>{
											uni.navigateBack();
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
			exit_btn(){
				uni.navigateBack({  //后退按钮
					delta:1
				})
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
}
.section-pay{
	margin-top: 20upx;
	padding: 30upx 30upx 44upx;
	border-radius: 20upx;
	color: #fff;
	.card-name{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.title{
			display: flex;
			align-items: center;
		}
		image{
			width: 64upx;
			height: 64upx;
		}
		.name{
			font-size: 36upx;
			font-weight: bold;
			margin-left: 20upx;
		}
		text{
			font-size: 28upx;
		}
	}
	.card-number{
		padding-top: 10upx;
		margin-left: 84upx;
		font-size: 52upx;
		text{
			padding-left: 20upx;
		}
	}
}
.del-btn{
		width: 100%;
		margin-top: 80upx;
		background: #4397F1;
		border-radius: 14upx;
		height: 88upx;
		line-height: 88upx;
		color: #fff;
	}
</style>
