<template>
	<view class="container" :style="hb_status?'height: 100vh;background:#ffffff;':'background:#05060F;'">
		<view class="header hi-columns" :style="hb_status?'background:#ffffff;padding-top: '+statusBarH+'px;':'background:#05060F;padding-top: '+statusBarH+'px;'">
			<view class="header_box hi-rows hi-flex-vcenter">
				<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'"
				 mode="" style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view class="header-title" :style="'color:'+colorALL">{{$t('afanda.cbsx')}}</view>
				<view class="header-title-right" @click="toDetail">{{$t('afanda.symx')}}</view>
			</view>
		</view>
		<view class="content hi-columns" :style="hb_status?'background:#fff;padding-top:'+(header_H+10)+'px;':'background: #05060F;padding-top:'+(header_H+10)+'px;'">
			<view class="header-content" :style="'background:'+ backgroundALL+';color:'+colorALL">
				<view class="header-content-list">
					<view class="text-xs text-grey">{{$t('afanda.zyj')}}</view>
					<view class="text-lg">{{ headerList.per }}</view>
				</view>
				<view class="header-content-list">
					<view class="text-xs text-grey">{{$t('afanda.ztrs')}}</view>
					<view class="text-lg">{{ headerList.directNum }}</view>
				</view>
				<view class="header-content-list">
					<view class="text-xs text-grey">{{$t('afanda.sxrs')}}</view>
					<view class="text-lg">{{ headerList.teamNum }}</view>
				</view>
			</view>
			<view style="margin-left:30upx;color: #C3C3C3;">
				天天<text style="color: #000000;margin:0 14upx 0 6upx;">youkeymoney</text> 每日持币生息
			</view>
			<view class="content-dingcun" :style="'background:'+ backgroundALL+';color:'+colorALL">
				<view class="dingcun-card">
					<view style="display: flex;justify-content: center;align-items: center;">
						<view>
							<view style="font-size: 36upx;">{{$t('afanda.dcye')}}</view>
							<view style="font-size: 20upx;margin-top: 10upx;">DING  CUN YU E </view>
						</view>
						<view style="margin-top:10upx;margin-left: 40upx;font-size: 80upx;">{{ headerList.num }}</view>
					</view>
				</view>
				<view class="dingcun-title">{{$t('afanda.xzdcye')}}</view>
				<view class="price-card-wrap">
					<view class="price-card" :class="hb_status?'day-card':''" v-for="(item,index) in dc_price" :key="index" :style="selectID-1==index ? (hb_status?'border:solid 1px #B2E5F7;background:#D6F4FD;color:#61C8ED;':'background:#4397F1;'):''">
						<view @tap="select(item)">
							<view>{{ item.grade }}</view>
							<text>USDT</text>
						</view>
					</view>
				</view>
				<view>
					<button class="dc-btn" @click="on_dc">{{$t('afanda.ljdc')}}</button>
				</view>
				<view class="dc-rule">
					<view>{{$t('afanda.gzsm')}}：</view>
					<view>{{$t('afanda.dcmthon')}}</view>
				</view>
			</view>
			<view class="content-heyue" :style="'background:'+ backgroundALL+';color:'+colorALL">
				<view class="heyue-title">
					<view :style="'color:'+colorALL" style="font-size: 34upx;font-weight: 700;">
						{{$t('afanda.zjdc')}}
					</view>
					<view @click="toAll">{{$t('afanda.alldc')}}</view>
				</view>
				<view class="heyue-list" v-for="(item,index) in heyueData" :key="index">
					<view class="list-content">
						<view class="list-content-left">
							<view style="display: flex;align-items: center;">
								<view class="text-xl">USDT</view>
								<view :class="{'already-chehui':item.status==1}" @click="chehui(item)">{{ item.status==0?$t('afanda.withdraw'):$t('afanda.Withdrawn') }}</view>
							</view>
							<text style="color: #C1C1C1;">{{ item.createDate }}</text>
						</view>
						<view class="list-content-center">
							<view class="text-xxl">{{ item.amount }} <text style="font-size: 18upx;margin-left:12upx;color: #D1D1D1;">CNY</text></view>
							<text style="color: #A5A5A5;">{{$t('afanda.dcje')}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<pay-keyboard ref="son" :show_key="show_key" @hideFun="hideFun" @getPassword="getPassword"></pay-keyboard>
	</view>
</template>

<script>
	var This;
	import payKeyboard from '@/components/keyboard.vue'
	export default {
		components: {
			payKeyboard
		},
		data() {
			return {
				beijing: '../../../static/wallet/honghong.png',
				userdatas: '',
				isalert: false, //弹窗
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				windowHeight: 0,
				header_H: 0,
				nickname: '',
				hb_status: true, //true 白色   false 黑色
				noticeorder: true, //通知订单
				noticechat: true, //通知聊天
				isupdate: false, //是否有更新 
				dataz: '',
				headerList: [{
						amount: '765,787.00',
						title: this.$t('afanda.zyj')
					},
					{
						amount: '8765',
						title: this.$t('afanda.ztrs')
					},
					{
						amount: '78',
						title: this.$t('afanda.sxrs')
					}
				],
				dc_price: [],
				selectID: 1,
				selectPrice: 100,
				activeCard: false,
				heyueData: [],
				is_pay: '',
				show_key: false,
				payPwd: '',
				pages: 1,
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

			this.backgroundALL = uni.getStorageSync('localbk')
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(() => {
				this.tab_init();
			}, 500)
			var setdata = {
				"token": uni.getStorageSync("token"),
				"userId": uni.getStorageSync("id")
			}
			this.getData()
			console.log(setdata)
			//获取直推列表

			//获取档次列表
			uni.request({
				url: this.websiteUrlzh + 'afd/getGradeList',
				method: 'GET',
				data: setdata,
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					"Accept-Language": 'zh'
				},
				success: (res) => {
					if (res.data.code == 200) {
						this.dc_price = res.data.data

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
		methods: {
			select(item) {
				this.selectID = item.id;
				this.selectPrice = item.grade;
				console.log(item)
			},
			hideFun() {
				this.show_key = false
			},
			getPassword(n) {
				this.payPwd = n.password;
				this.hideFun();
				this.pay();
				console.log("用户输入的密码", this.payPwd)
			},
			getData() {
				uni.request({
					url: this.websiteUrlzh + 'afd/getInfo',
					method: 'GET',
					data: {
						"token": uni.getStorageSync("token"),
						"userId": uni.getStorageSync("id")
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language": 'zh'
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.headerList = res.data.data

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
				uni.request({
					url: this.websiteUrlzh + 'afd/getOrderList',
					method: 'GET',
					data: {
						"type": 0,
						"page": this.pages,
						"token": uni.getStorageSync("token"),
						"userId": uni.getStorageSync("id")
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language": 'zh'
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.heyueData = res.data.data

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
			//定存
			on_dc() {
				//验证支付密码
				uni.request({
					url: this.websiteUrl + 'user/isSettingPayPassword',
					method: 'GET',
					data: {
						"token": uni.getStorageSync("token"),
						"userId": uni.getStorageSync("id")
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language": 'zh'
					},
					success: (res) => {
						if (res.data.data) {
							this.show_key = true
						} else {
							uni.navigateTo({
								url: '/pages/wo/SafetyCenter/shezhiupdatezhifu'
							});
						}
					},
					fail: () => {

					}
				});
			},
			pay() {
				This = this;
				uni.request({
					url: this.websiteUrlzh + 'afd/investment',
					method: 'POST',
					data: {
						"token": uni.getStorageSync("token"),
						"userId": uni.getStorageSync("id"),
						"amount": this.selectPrice,
						"typeId": this.selectID,
						"payPwd": this.payPwd
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language": 'zh'
					},
					success: (res) => {
						this.$refs.son.password = ''
						if (res.data.code == 200) {
							uni.showToast({
								title: This.$t('stylePulic.success'),
								duration: 2000
							});
							this.getData()
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
			//撤回
			chehui(item) {
				This = this;
				uni.showModal({
					title: This.$t('stylePulic.prompt'),
					content: This.$t('stylePulic.Confirm'),
					success: function(res) {
						if (res.confirm) {
							uni.request({
								url: This.websiteUrlzh + 'afd/redemption',
								method: 'POST',
								data: {
									"token": uni.getStorageSync("token"),
									"userId": uni.getStorageSync("id"),
									"orderId": item.id
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded',
									"Accept-Language": 'zh'
								},
								success: (res) => {
									if (res.data.code == 200) {
										uni.showToast({
											title: This.$t('stylePulic.success'),
											duration: 2000
										});
										setTimeout(() => {
											This.getData()
										}, 1500)
									} else if (res.data.code == 500) {
										This.payPwd = ''
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
			toDetail() {
				uni.navigateTo({
					url: 'detail'
				});
			},
			toAll() {
				uni.navigateTo({
					url: 'allOrder'
				});
			},
			gotoMyTeam() {
				uni.navigateTo({
					url: '../myteam/myteam'
				})
			},
			exit_btn() {
				uni.navigateBack({ //后退按钮
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
		background: #F0F3F5;

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
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.header-title-right {
		font-size: 32upx;
		margin-left: auto;
		font-weight: bold;
		color: #72D6F6;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.header .header_box {
		height: 88upx;
	}

	.content {
		flex: 1;
		width: 100%;
		overflow: auto;
		box-sizing: border-box;
		height: 100%;
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		flex-shrink: 0;
		padding: 40upx 60upx;
	}

	.header-content-list {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.header-content-list view:first-child {
		margin-bottom: 30upx;
	}

	.content-dingcun {
		margin-top: 20upx;
		padding: 24upx 30upx;
	}

	.dingcun-card view {
		font-size: 52upx;
	}

	.dingcun-card {
		background: #4397F1;
		color: #fff;
		border-radius: 20upx;
		height: 180upx;
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
	}

	.dingcun-title {
		font-size: 36upx;
		padding: 40upx 0 30upx;
	}

	.price-card-wrap {
		display: flex;
		justify-content: space-between;
	}

	.price-card {
		border: 2px solid transparent;
		border-radius: 14upx;
		padding: 10upx 0;
		width: 25%;
		height: 120upx;
		background: #252A31;
		text-align: center;
		justify-content: center;
		align-items: center;
		display: flex;
		color: #fff;
	}

	.day-card {
		background: #fff;
		color: #333;
	}

	.price-card view {
		font-size: 52upx;
	}

	.price-card text {
		font-size: 32upx;
	}

	.dc-btn {
		margin-top: 30upx;
		background: #4397F1;
		border-radius:14upx;
		height: 88upx;
		line-height: 88upx;
		color: #fff;
	}

	.dc-rule {
		display: flex;
		justify-content: left;
		color: #C3C3C3;
		margin-top: 10upx;
		font-size: 20upx;
	}

	.list-text {
		margin-left: 20upx;
		font-size: 22upx;
		color: #999;
	}

	.list-text view:first-child {
		margin-bottom: 6upx;
	}

	.list-text view:first-child text {
		font-size: 32upx;
	}

	.list-left,
	.list-right {
		display: flex;
	}

	.list-left image {
		width: 64upx;
		height: 64upx;
		border-radius: 64upx;
	}

	.list-right button {
		width: 160upx;
		height: 72upx;
		border-radius: 72upx;
		color: #fff;
		font-size: 28upx;
		background: #5FCF64;
	}

	.list-right button:first-child {
		background: #F33F3F;
		margin-right: 30upx;
	}

	.content-heyue {
		padding: 30upx;
	}

	.heyue-title {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15upx;
	}

	.heyue-title view:first-child {
		font-size: 36upx;
	}

	.heyue-title view:last-child {
		font-size: 26upx;
		color: #9FCFFC;
	}

	.heyue-list {
		padding: 20upx 0;
	}

	.heyue-list-title {
		display: flex;
		align-items: center;
		padding-bottom: 30upx;
	}

	.heyue-list-title image {
		width: 60upx;
		height: 60upx;
		border-radius: 60upx;
	}

	.heyue-list-title .title-text {
		margin: 0 20upx;
		font-size: 36upx;
	}

	.title-tag {
		width: 68upx;
		height: 32upx;
		font-size: 20upx;
		text-align: center;
		line-height: 32upx;
		color: #fff;
		background: #F33F3F;
		border-radius: 32upx;
	}

	.list-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.text-xxl {
		font-size: 34upx;
		color: #FDC87B;
		font-weight: 700;
	}

	.text-xl {
		font-size: 36upx;
		line-height: 1.8;
		color: #6DCBEE;
	}

	.text-lg {
		font-size: 32upx;
	}

	.text-xs {
		font-size: 22upx;
	}

	.text-grey {
		color: #999;

	}
	.list-content-center{
		width: 160upx;
		text-align: left;
	}
	.list-content-center text {
		line-height: 2;
		font-size: 22upx;
		color: #999;
	}

	.list-content-left text {
		line-height: 2;
		font-size: 24upx;
		color: #999;
	}

	.list-content-right {
		width: 160upx;
		height: 72upx;
		border-radius: 72upx;
		text-align: center;
		line-height: 72upx;
		border: 2upx solid #4397F1;
		font-size: 28upx;
		color: #4397F1;
	}

	.already-chehui {
		border: 1px solid #CDCDCD;
		font-size: 24upx;
		margin-left: 20upx;
		color: #CDCDCD;
		border-radius: 6upx;
		padding: 4upx 2upx;
	}

	.pay_btn {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.pay_btn text {
		padding: 20rpx 30rpx;
		background: #007AFF;
		border-radius: 10rpx;
		font-size: 28rpx;
		color: #ffffff;
	}
</style>
