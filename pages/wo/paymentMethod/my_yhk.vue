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
				<view class="content_text_title" :style="hb_status?'color:#000000':'color:#ffffff'">{{$t('wo.wdyhk')}}：{{ qrCodeData.length }}{{$t('wo.zhang')}}</view>
				<view
				 class="section-pay"
				 style='background:#0091FF;' 
				 @click="toDetail(item)"
				 v-for="(item,index) in qrCodeData"
				 :key="index"
				 >
				 	<view class="pay-active" v-show="item.status==0">{{$t('wo.yjh')}}</view>
					<view class="card-name">
						<view class="title">
							<image src="../../../static/img/pay_yl.png" />
							<text class="name">{{ item.bank }}</text>
						</view>
						<text>{{$t('wo.cxk')}}</text>
					</view>
					<view class="card-number">
						****  ****  ****   
						<text>{{ item.bankNum.substring(item.bankNum.length-4) }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="add-qrCode" :style="hb_status?'background:#ffffff;':'background:#252A31;'" @click="toAdd">
			<image src="../../../static/img/icon_add.png" />
			<text>{{$t('wo.tjyhk')}}</text>
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
				qrCodeData: [],
				pages: 1,
				pageTotal: 0
			}
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
							"type": 1,
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
			toAdd(){
				uni.navigateTo({
						url: 'addPay_yhk'
				});
			},
			toDetail(item){
				uni.navigateTo({
						url: `yhk_detail?id=${item.id}&bank=${item.bank}&bankNum=${item.bankNum.substring(item.bankNum.length-4)}&status=${item.status}`
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
	padding: 30upx 30upx 44upx;
	border-radius: 20upx;
	color: #fff;
	.pay-active{
		position: absolute;
		top: 0;
		left: 0;
		background: #E44652;
		color: #fff;
		font-size: 32upx;
		padding: 8upx 20upx;
		border-radius: 6upx;
	}
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
