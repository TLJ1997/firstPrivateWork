<template>
	<view class="container hi-columns" :style="backgroundALL == '#1c1f22'?'background:#05060F;':'background:#F0F3F5;'">
		<!-- 标题栏 -->
		<view class="muen_header hi-columns" :style="'padding-top:'+statusBarH+'px;background:#4FBCFF'">
			<view class="hi-rows hi-flex-vcenter  hi-space-between">
				<view class="hi-rows hi-flex-vcenter">
					<image src="../../../static/home/nav_icon_back_night.png"
					 mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
				</view>
				<view class="hi-rows hi-flex-vcenter">
					<image src="../../../static/img/icon_chat.png" mode="" @click="chat()"  style="width:46upx;height: 46upx;"/>
				</view>
			</view>
		</view>
		<view class="header_title_box hi-rows hi-flex-vcenter hi-space-between" style="background:#4FBCFF;margin-top:0;padding:36upx;">
			<view class="header_item">
				<view class="t1" >{{$t('trade.qfk')}}</view>
				<text style="color: #fff;font-szie:32upx;padding-top:20upx;">{{$t('trade.fzznfk')}}</text>
			</view>
		</view>
		<view class="section-order" :style="hb_status?'background:#ffffff;color:#000000':'background:#252A31;color:#fff'">
			<view class="order-left">
				<view class="total"><text>￥</text>{{ orderData.num * orderData.price }}</view>
				<view class="price">{{$t('trade.dj')}}：￥{{ orderData.price }}</view>
				<view class="number">{{$t('trade.sl')}}：{{ orderData.num }}</view>
			</view>
			<view class="order-right">
				<image :src="orderData.shopUserHead" mode="" />
				<text>{{ orderData.symbol }}</text>
			</view>
		</view>
		<view class="section-text" :style="hb_status?'background:#ffffff;color:#000000':'background:#252A31;color:#fff'">
			<view class="title">{{$t('trade.yhkzz')}}</view>
			<text>{{$t('trade.tendz')}}</text>
		</view>
		<view class="section-pay" :style="hb_status?'background:#ffffff;color:#000000':'background:#252A31;color:#fff'">
			<uni-collapse :style="hb_status?'background:#ffffff;color:#000000':'background:#252A31;color:#fff'" accordion="true">
				<uni-collapse-item :title="zfb" thumb="/static/wo/icon_alipay_open.png" v-if="zfbData.name">
						<view class="pay-content" >
								<view class="title">{{$t('trade.syzfbfk')}}</view>
								<view class="title">{{$t('trade.skr')}}：{{ zfbData.name }}</view>
								<image :src="zfbData.img" mode="" />
						</view>
				</uni-collapse-item>
				<uni-collapse-item :title="wx" thumb="/static/wo/icon_wechat_open.png" v-if="wchatData != null">
						<view class="pay-content">
								<view class="title">{{$t('trade.qsywx')}}</view>
								<view class="title">{{$t('trade.skr')}}：{{ wchatData.name }}</view>
								<image :src="wchatData.img" mode="" />
						</view>
				</uni-collapse-item>
				<uni-collapse-item :title="yhk" thumb="/static/wo/icon_card_open.png" v-if="bankData.name">
						<view class="pay-bank">
								<view class="title">{{$t('trade.qsybryhk')}}</view>
								<view class="list">
									<view class="list-left">{{$t('trade.name')}}</view>
									<view class="list-right">
										<text class="list-name">{{ bankData.name }}</text>
										<text class="copy" @click="copy(bankData.name)">{{$t('trade.fz')}}</text>
									</view>
								</view>
								<view class="list">
									<view class="list-left">{{$t('trade.yhkh')}}</view>
									<view class="list-right">
										<text class="list-name">{{ bankData.bankNum }}</text>
										<text class="copy" @click="copy(bankData.bankNum)">{{$t('trade.fz')}}</text>
									</view>
								</view>
								<view class="list">
									<view class="list-left">{{$t('trade.khh')}}</view>
									<view class="list-right">
										<text class="list-name">{{ bankData.bank }}</text>
										<text class="copy" @click="copy(bankData.bank)">{{$t('trade.fz')}}</text>
									</view>
								</view>
								<view class="list">
									<view class="list-left">{{$t('trade.zhxx')}}</view>
									<view class="list-right">
										<text class="list-name">{{ bankData.bankInfo }}</text>
										<text class="copy" @click="copy(bankData.bankInfo)">{{$t('trade.fz')}}</text>
									</view>
								</view>
						</view>
				</uni-collapse-item>
		</uni-collapse>
		</view>
		<view class="section-seller" :style="hb_status?'background:#ffffff;color:#000000':'background:#252A31;color:#fff'">
			<view class="list">
				<view class="list-left">{{$t('trade.mjnc')}}</view>
				<view class="list-right">
					<text class="list-name">{{ orderData.shopUserNickname }}</text>
					<text class="grace-icons icon-arrow-right settings-item-value"></text>
				</view>
			</view>
		</view>
		<view class="btn" :style="'background:'+backgroundALL+';'">
			<view class="cancel button" @click="upDate(3)">{{$t('trade.qxdd')}}</view>
			<view class="confirm button" @click="upDate(1)">{{$t('trade.bjyzf')}}</view>
		</view>
	</view>
</template>

<script>
	var This;
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {uniCollapse,uniCollapseItem},
		data() {
			return {
				zfb:this.$t('trade.zfb'),
				wx:this.$t('trade.wx'),
				yhk:this.$t('trade.yhk'),
				id:'',
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				paddingBottom:0,//判断苹果X底部高度
				isyichu:false,
				orderData:[],
				zfbData: [],
				wchatData: [],
				bankData: []
			}
		},
		onLoad(e) {
			this.id=e.id;
			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight
					// console.log(JSON.stringify(res))
					console.log(This.windowHeight)
					
					var model = res.model
					if (model.search('iPhone X') != -1){
					   This.paddingBottom = 68;
					}
			
				}
			})
			var asdwwww = {
				orderId: this.id,
				token: uni.getStorageSync('token'),
				userId: uni.getStorageSync('id')
			}
			uni.request({
				url: this.websiteUrlotc + 'otc/getOrderByOrderId',
				method: 'GET',
				data: asdwwww,
				header: {
					'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
				},
				success: (res) => {
					if (res.data.code == 200) {
						this.orderData = res.data.data
						this.zfbData = res.data.data.zfb
						this.wchatData = res.data.data.wchat
						this.bankData = res.data.data.bank
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
		onReady() {
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
			copy(e){
				let This=this;
				uni.setClipboardData({
						data: e,
						success: function () {
								uni.showToast({
									title: This.$t('trade.fzcg'),
									duration: 2000
								});
						}
				});
			},
			chat(){
				uni.navigateTo({
					url: "../order/order?id=" + this.id
				})
			},
			upDate(type) {
				let This = this;
				let titleText = '';
				if(type==1){
					titleText =This.$t('trade.yfk')
				}else{
					titleText =This.$t('trade.qx')
				}
				uni.showModal({
					title:  This.$t('stylePulic.prompt'),
					content: This.$t('trade.qd')+titleText+This.$t('trade.ma'),
					success: function (res) {
						if (res.confirm) {
							uni.request({
								url: This.websiteUrlotc + 'otc/updateOtcOrder',
								method: 'POST',
								data: {
									"token": uni.getStorageSync("token"),
									"userId": uni.getStorageSync("id"),
									"orderId": This.id,
									"state": type
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded',
										"Accept-Language":'zh'
								},
								success: (res) => {
									if (res.data.code == 200) {
										uni.showToast({
											title: This.$t('stylePulic.success'),
											duration: 2000
										});
										setTimeout(()=>{
											if(type==1){
												uni.navigateTo({
													url: "../order/order?id=" + This.id
												})
											}else{
												uni.navigateBack();
											}
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

<style lang="scss">
	page {height: 100%;}
	.br{border-radius: 20upx;overflow: hidden;}
	.p30{padding: 0 30upx;box-sizing: border-box;}
	.borderB1{width:100%;height:1upx;background:rgba(255,255,255,.1);margin: 30upx 0;}
	.mt30{margin-top: 30upx;padding-bottom: 20upx;}
	.b{color: #242833;}
	.h{color: #FFFFFF;}
	
	.container {width: 100%;min-height: 100vh;box-sizing: border-box;}
	.muen_header>view {height: 88upx;padding: 0 40upx;box-sizing: border-box;}
	.header_title_box {padding: 0 40upx;box-sizing: border-box;margin: 20upx 0;}
	.header_title_box .header_item .t1 {font-size: 48upx;color: #FFFFFF;font-weight: bold;}
	.header_title_box .header_item .t2 {color: #8792A8;font-size: 22upx;margin-left: 19upx;}
	.header_title_box .header_item .h_btn {color: #3A74FC;border: 1upx solid #3A74FC;width: 120upx;height: 58upx;border-radius: 29upx;line-height: 58upx;}

	.section-order{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30upx;
		.order-left{
			.total{
				font-size: 68upx;
				color: #4397F1;
				text{
					font-size: 28upx;
				}
			}
			.price{
				font-size: 28upx;
				padding-top: 24upx;
				padding-bottom: 20upx;
			}
			.number{
				font-size: 28upx;
			}
		}
		.order-right{
			text-align: center;
			image{
				width: 88upx;
				height: 88upx;
			}
			text{
				display: block;
				padding-top: 8upx;
				font-size: 36upx;
			}
		}
	}
	.section-text{
		padding: 30upx;
		margin: 20upx 0;
		.title{
			font-size: 36upx;
			padding-bottom: 18upx;
		}
		text{
			font-size: 24upx;
			color: #999;
		}
	}
	.section-seller{
		padding: 40upx 30upx;
		margin-bottom: 210upx;
		.list{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.list-left{
				font-size: 32upx;
				color: #999;
			}
			.list-right{
				flex: 1;
				text-align: right;
				.list-name{
					font-size: 32upx;
					padding-right: 30upx;
				}
			}
		}
	}
	.btn{
		position: fixed;
		bottom: 0;
		width: 92%;
		padding: 30upx;
		display: flex;
		justify-content: space-between;
		.button{
			width: calc(50% - 10upx);
			height: 88upx;
			line-height: 88upx;
			border-radius: 10upx;
			font-size: 42upx;
			text-align: center;
			border: 2upx solid transparent;
		}
		.cancel{
			border: 2upx solid #4397F1;
			color: #4397F1;
		}
		.confirm{
			background: #4397F1;
			color: #fff;
		}
	}
	.section-pay{
		margin-bottom: 20upx;
		.pay-content{
			padding-bottom: 30upx;
			text-align: center;
			.title{
				font-size: 30upx;
				margin-bottom: 30upx;
			}
			image{
				width: 220upx;
				height: 220upx;
			}
		}
		.pay-bank{
			padding: 0 30upx 30upx;
			.title{
				font-size: 32upx;
				margin: 20upx 0;
			}
			.list{
				padding: 40upx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.list-left{
					font-size: 32upx;
					color: #999;
				}
				.list-right{
					flex: 1;
					text-align: right;
					.list-name{
						font-size: 32upx;
						padding-right: 30upx;
					}
					.copy{
						font-size: 28upx;
						color: #F23030;
					}
				}
			}
		}
	}
</style>
