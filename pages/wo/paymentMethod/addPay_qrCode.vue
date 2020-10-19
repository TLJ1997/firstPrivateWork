<template>
	<view class="container" :style="hb_status?'background:#ffffff;':'background:#05060F;'">
		<view class="header hi-columns" :style="'padding-top: '+statusBarH+'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'"
				 mode="" style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view class="set_text_title" :style="hb_status?'color:#000000':'color:#ffffff'">{{ type=='zfb'?$t('wo.tjzfbzfm'):$t('wo.tjwxzfm') }}</view>
			</view>
		</view>
		<view class="content hi-columns" :style="hb_status?'height: 100vh;background:#FFFFFF;padding-top:'+(header_H)+'px;':'background:'+backgroundALL+';padding-top:'+(header_H)+'px;'">
			<view class="content-section">
				<!-- 	<view class="content_text_title" :style="hb_status?'color:#000000':'color:#ffffff'">{{$t('wo.qbdbrskm')}}</view> -->
				<view class="collection-name" :style="hb_status?'color:#000000':'color:#fff'">
					<input v-model="name" :placeholder="input_skrname" />
				</view>
				<view class="section-pay" :style="hb_status?'background:#ffffff;color:#000000':'background:#252A31;color:#fff'">
					<!-- <view class="title">{{$t('wo.scskewm')}}</view> -->
					<view class="upload-img">
						<view class="delete" v-if="fileData !=''" @click="deleteImge">
							<image src="../../../static/img/icon_lose.png" />
						</view>
						<view class="add-img" @click="choosImage" v-if="fileData ==''">+</view>
						<image class="file-img" :src="fileData" mode="" v-else />
					</view>
				</view>
				<button class="add-btn" @click="add">{{$t('wo.ljtj')}}</button>
			</view>
		</view>






	</view>
</template>

<script>
	var This;
	export default {
		data() {
			return {
				input_skrname: this.$t('wo.qsrskrxm'),
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				windowHeight: 0,
				header_H: 0,
				hb_status: true, //true 白色   false 黑色	
				isRealName: true,
				type: 'zfb',
				codeType: 2,
				name: '',
				fileData: '',
				fileImg: ''
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
			console.log(this.colorALL)
		},
		methods: {
			choosImage() {
				var _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: function(res) {
						_this.myUpload(res.tempFilePaths[0])
						_this.fileData = res.tempFilePaths[0]
					}
				});
			},
			deleteImge() {
				this.fileData = ''
			},
			add() {
				uni.request({
					url: this.websiteUrl + 'user/bindPayInfo',
					method: 'POST',
					data: {
						"token": uni.getStorageSync("token"),
						"userId": uni.getStorageSync("id"),
						"img": this.fileImg,
						"type": this.codeType,
						"name": this.name
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language": 'zh'
					},
					success: (res) => {
						console.log(res)
						if (res.data.code == 200) {
							uni.showToast({
								title: '添加成功',
								duration: 2000
							});
							setTimeout(() => {
								uni.navigateBack();
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

					},
					fail: () => {

					}
				});
			},
			myUpload(path) {

				var This = this;
				if (uni.getStorageSync('token') == '' || uni.getStorageSync('token') == null || uni.getStorageSync('token') ===
					undefined) {
					uni.navigateTo({
						url: '/pages/login/login'
					});
					return false;
				}

				uni.showLoading({
					title: This.$t('wo.scz'),
					mask: true
				});
				uni.uploadFile({
					url: This.websiteUrl + 'user/uploadFile',
					filePath: path,
					name: 'file',
					header: {
						'content-type': 'multipart/form-data' //自定义请求头信息
					},
					formData: {
						"state": 3
					},
					success: uploadFileRes => {
						console.log(uploadFileRes);

						var uploadFileRes = JSON.parse(uploadFileRes.data);
						this.fileImg = uploadFileRes.data;
						uni.hideLoading();
						if (uploadFileRes.code == 200) {
							uni.showToast({
								title: this.$t('wo.sccg'),
								mask: true,
								duration: 1500,
								success() {
									console.log()
								}
							});
						}

					}
				});
			},
			exit_btn() {
				console.log(111)
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

<style lang="scss">
	.uni-text {
		font-size: 30upx;
		text-align: center;
		margin-top: 30upx;
	}


	page {
		min-height: 100%;
	}

	.container {
		width: 100%;
		min-height: 100vh;
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
	}

	.header .header_box {
		height: 88upx;

		image {
			position: relative;
		}
	}

	.content {
		flex: 1;
		width: 100%;
		overflow: auto;
		box-sizing: border-box;
		min-height: 100vh;
	}

	.set_text_title {
		font-size: 36upx;
		width: 100%;
		margin-left: -60upx;
		font-weight: bold;
		text-align: center;
	}

	.icon-arrow-right {
		color: #8792A8;
		font-size: 32upx;
	}

	.item_l {
		margin: 0 40upx;
		width: 670upx;
		padding: 25upx 40upx;
		box-sizing: border-box;
		border-radius: 16upx;
		margin-bottom: 20upx;
	}


	.yd_box {
		display: inline-flex;
		width: 16upx;
		height: 16upx;
		border-radius: 8upx;
		background: #E64340;
		position: relative;
		top: -30upx;
		right: -5upx;
	}

	.btn {
		width: 670upx;
		margin: 0 40upx;
		margin-top: 140upx;
		border: 2upx solid #3A74FC;
		color: #3A74FC;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		font-size: 36upx;
		border-radius: 50upx;
	}

	.content-section {
		padding:10upx 30upx;

		.content_text_title {
			font-size: 28upx;
		}

		.collection-name {
			display: flex;
			justify-content: left;
			align-items: center;
			margin-top: 40upx;
			// padding-bottom: 20upx;
			background-color: #F6F6F6;
			border-radius: 14upx;
			input {
				flex: 1;
				margin-left: 24upx;
				height: 80upx;
			}
		}

		.add-btn {
			margin-top: 80upx;
			background: #1F6ED4;
			border-radius: 20upx;
			height: 88upx;
			line-height: 88upx;
			color: #fff;
			font-size: 30upx;
			font-weight: 600;
		}
	}

	.section-pay {
		margin-top: 40upx;
		padding: 40upx 30upx;
		border-radius: 20upx;

		.title {
			font-size: 36upx;
		}

		.upload-img {
			position: relative;
			// margin-top: 30upx;
			width: 220upx;
			height: 220upx;
			border-radius: 20upx;
			overflow: hidden;
			border: 1upx solid #F2F2F2;

			.delete {
				height: 44upx;
				width: 100%;
				background: rgba($color: #000000, $alpha: 0.5);
				position: absolute;
				text-align: right;

				image {
					margin-top: 10upx;
					margin-right: 10upx;
					width: 32upx;
					height: 32upx;
				}
			}

			.add-img {
				width: 100%;
				height: 100%;
				text-align: center;
				line-height: 220upx;
				font-size: 100upx;
				color: #FCB550;
			}

			.file-img {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
