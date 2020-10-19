<template>
	<view class="Page" :style="hb_status?'background:#ffffff;':'background:#05060F;'">
		<view class="content" :style="'padding-top: '+statusBarH+'px;'">
			<view class="head">
				<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'"
				 style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view class="name">
					{{ type=='zfb'?$t('wo.zfbskm'):$t('wo.wxskm') }}
				</view>
			</view>
			<view class="title">
				<text>{{ type=='zfb'?$t('wo.wdzfbskm'):$t('wo.wdwxskm') }}：</text>
				<text style="margin-left: 30upx;color: #2BBFF4;font-size: 28upx;">{{ qrCodeData.length }}</text>
			</view>
			
			<view class="list" v-for="(item,index) in qrCodeData" :key="index" @click="selcet(item,0)">
				<image  :src="item.img"></image>
				<view class="user">
					<view class="name">
						{{ item.name }}
					</view>
					<view class="status" v-show="item.status==0">
						{{$t('wo.yjh')}}
					</view>
					<view class="status2" v-show="item.status !== 0">
						未激活
					</view>
				</view>
				<view class="btn"  @click.stop="selcet(item,3)">
					{{$t('wo.sc')}}
				</view>
			</view>
		</view>
		<view class="footer" @click="toAdd">
			+ {{$t('wo.tjskm')}}
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
				windowHeight: 0,
				header_H: 0,
				hb_status: true, //true 白色   false 黑色	
				isRealName: true,
				type: 'zfb',
				codeType: 2,
				qrCodeData: [],
				pages: 1,
				pageTotal: 0
			}
		},
		onLoad(receive) {
			this.type = receive.type;
			if (receive.type == 'zfb') {
				this.codeType = 2
			} else {
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
			setTimeout(() => {
				this.tab_init();
			}, 500)
		},
		methods: {
			getData() {
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
						"Accept-Language": 'zh'
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
			exit_btn() {
				uni.navigateBack({ //后退按钮
					delta: 1
				})
			},
			selcet(item, type) {
				let This = this;
				let titleText = '';
				if (type == 0) {
					if (item.status == 0) {
						titleText = This.$t('wo.qxjh')
						type = 1
					} else {
						titleText = This.$t('wo.jh')
					}
				} else {
					titleText = This.$t('wo.sc')
				}
				uni.showModal({
					title: This.$t('wo.ts'),
					content: This.$t('wo.qd') + titleText + This.$t('wo.ma'),
					success: function(res) {
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
									"Accept-Language": 'zh'
								},
								success: (res) => {
									if (res.data.code == 200) {
										uni.showToast({
											title: '成功！',
											duration: 2000
										});
										setTimeout(() => {
											This.pages = 1
											This.qrCodeData = []
											This.getData()
										}, 1500)
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
			toAdd() {
				uni.navigateTo({
					url: 'addPay_qrCode?type=' + this.type
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
			}
		},
		onReachBottom() {
			let This = this;
			if (this.pageTotal > this.pages) {
				this.pages++
				uni.showLoading({
					title: This.$t('stylePulic.Loading')
				});
				this.getData()
			} else {
				uni.showToast({
					title: This.$t('stylePulic.Nomore'),
					icon: 'none',
					duration: 1000
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Page {
		view {
			box-sizing: border-box;
		}

		.content {
			padding: 0 34upx;

			.head {
				display: flex;
				justify-content: left;
				align-items: center;

				.name {
					font-size: 34upx;
					font-weight: 600;
					margin-left: 20upx;
				}
			}

			.title {
				font-size: 24upx;
				margin: 30upx 0;
			}
			.list{
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin-bottom: 50upx;
				border: 1px solid #F3F5F7;
				padding: 20upx 0 ;
				image{
					width: 120upx;
					height: 120upx;
				}
				.user{
					.name{
						font-size: 28upx;
						font-weight: 600;
					}
					.status{
						font-size: 24upx;
						background-color: #FDB44B;
						color: #FFFFFF;
						padding: 6upx 20upx;
						border-radius: 10upx;
						margin-top: 20upx;
					}
					.status2{
						font-size: 24upx;
						background-color: #777777;
						color: #FFFFFF;
						padding: 6upx 20upx;
						border-radius: 10upx;
						margin-top: 20upx;
					}
				}
				.btn{
					color: #FFFFFF;
					background-color: #00BBF0;
					font-size: 32upx;
					padding: 8upx 20upx;
					border-radius: 14upx;
				}
			}

		}
		.footer{
			position: fixed;
			left: 0;
			bottom: 0;
			width: 750upx;
			height: 80upx;
			line-height: 80upx;
			background-color: #00BBF0;
			color: #FFFFFF;
			font-size: 28upx;
			font-weight: 600;
			text-align: center;
			border-radius: 14upx 14upx 0 0;
		}
	}
</style>
