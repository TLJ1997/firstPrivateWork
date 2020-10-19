<template>
	<view class="container" :style="hb_status?'height: 100vh;background:#ffffff;':'background:#05060F;'">
		<view class="header hi-columns" :style="'padding-top: '+statusBarH+'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'"
				 mode="" style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view :style="hb_status?'color:#000000':'color:#ffffff'" style="font-size: 37upx;">{{$t('wo.aqzx')}}</view>
			</view>
		</view>
		<view class="content hi-columns" :style="hb_status?'height: 100vh;background:#F0F3F5;padding-top:'+(header_H)+'px;':'background:'+backgroundALL+';padding-top:'+(header_H)+'px;'">
			<view class="set_text_title" :style="hb_status?'color:#000000':'color:#ffffff'"></view>

			<view class="item_l hi-columns hi-flex-vcenter hi-space-between">
				<view class="userinfo hi-columns">
					<image src="../../../static/wo/icon_safetycenter.png" mode="" style="width: 289upx;height: 289upx;"></image>
					<view class="user_text hi-columns">
						<text class="userid">{{$t('wo.aqzhydjq')}}</text>
					</view>
				</view>

			</view>

			<!-- <navigator class="item_l hi-rows hi-flex-vcenter hi-space-between" :style="backgroundALL == '#1c1f22'?'background: #18253D;padding:40upx;':'background: #ffffff;padding:40upx;'"
			 open-type="navigate" url="/pages/wo/SafetyCenter/bindphone">
				<view class="userinfo hi-rows">
					<view class="user_text hi-columns hi-flex-vcenter" style="margin-left: 0;">
						<text class="title" :style="hb_status?'color:#242933':'color:#ffffff'">绑定手机/邮箱</text>
					</view>
				</view>
				<view class="right_box hi-rows hi-flex-vcenter">
 -->

					<!-- <block v-if="hb_status">
						<text class="cheched_text" :style="bindphone?'color:#242933':'color:#E64340'">{{bindphone?'已绑定':'未绑定'}}</text>
					</block>
					<block v-else>
						<text class="cheched_text" :style="bindphone?'color:#ffffff':'color:#E64340'">{{bindphone?'已绑定':'未绑定'}}</text>
					</block> -->


					<!-- <text class="grace-icons icon-arrow-right"></text>
				</view>
			</navigator> -->

			<navigator class="item_l hi-rows hi-flex-vcenter hi-space-between" :style="backgroundALL == '#1c1f22'?'background: #18253D;padding:40upx;':'background: #ffffff;padding:40upx;'"
			 open-type="navigate" url="/pages/wo/SafetyCenter/updatePasswd">
				<view class="userinfo hi-rows">
					<view class="user_text hi-columns hi-flex-vcenter" style="margin-left: 0;">
						<text class="title" :style="hb_status?'color:#242933':'color:#ffffff'">{{$t('wo.dlmm')}}</text>
					</view>
				</view>
				<view class="right_box hi-rows hi-flex-vcenter">

					<block v-if="hb_status">
						<text class="cheched_text" :style="bindpasswd?'color:#242933':'color:#E64340'">{{bindpasswd?$t('wo.ysz'):$t('wo.wsz')}}</text>
					</block>
					<block v-else>
						<text class="cheched_text" :style="bindpasswd?'color:#ffffff':'color:#E64340'">{{bindpasswd?$t('wo.ysz'):$t('wo.wsz')}}</text>
					</block>


					<text class="grace-icons icon-arrow-right"></text>
				</view>
			</navigator>
			<navigator class="item_l hi-rows hi-flex-vcenter hi-space-between" :style="backgroundALL == '#1c1f22'?'background: #18253D;padding:40upx;':'background: #ffffff;padding:40upx;'"
			 open-type="navigate" url="/pages/wo/SafetyCenter/updatezhifu">
				<view class="userinfo hi-rows">
					<view class="user_text hi-columns hi-flex-vcenter" style="margin-left: 0;">
						<text class="title" :style="hb_status?'color:#242933':'color:#ffffff'">{{$t('wo.zfmm')}}</text>
					</view>
				</view>
				<view class="right_box hi-rows hi-flex-vcenter">

					<block v-if="hb_status">
						<text class="cheched_text" :style="bindpasswd?'color:#242933':'color:#E64340'">{{bindpasswd?$t('wo.ysz'):$t('wo.wsz')}}</text>
					</block>
					<block v-else>
						<text class="cheched_text" :style="bindpasswd?'color:#ffffff':'color:#E64340'">{{bindpasswd?$t('wo.ysz'):$t('wo.wsz')}}</text>
					</block>


					<text class="grace-icons icon-arrow-right"></text>
				</view>
			</navigator>


			<view class="item_l hi-columns" :style="backgroundALL == '#1c1f22'?'background: #18253D;':'background: #ffffff;'">
				<navigator class="items hi-rows hi-flex-vcenter hi-space-between" style="border-bottom: 1px solid rgba(0,0,0,.1);padding-bottom: 25upx;"
				 url="/pages/wo/SafetyCenter/signPasswd">
					<text class="title" :style="hb_status?'color:#242933':'color:#ffffff'">{{$t('wo.ssmm')}}</text>
					<view class="user_text hi-rows hi-flex-vcenter" style="margin-left: 0;">

						<block v-if="hb_status">
							<text class="title" :style="bindshoupasswd?'color:#242933':'color:#E64340'">{{bindshoupasswd?$t('wo.ykq'):$t('wo.wkq')}}</text>
						</block>
						<block v-else>
							<text class="title" :style="bindshoupasswd?'color:#ffffff':'color:#E64340'">{{bindshoupasswd?$t('wo.ykq'):$t('wo.wkq')}}</text>
						</block>



						<text class="grace-icons icon-arrow-right" style="margin-left: 20upx;"></text>
					</view>
				</navigator>
				<view class="items hi-rows hi-flex-vcenter hi-space-between" style="padding-top: 25upx;">
					<text class="title" :style="hb_status?'color:#242933':'color:#ffffff'">{{$t('wo.zwmm')}}</text>
					<switch :checked="noticechat" @change="switch1Change" />
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
				windowHeight: 0,
				header_H: 0,
				hb_status: true, //true 白色   false 黑色
				noticechat: true, //指纹密码
				bindphone: false, //绑定手机				
				bindpasswd: true, //登录密码				
				bindshoupasswd: false, //手势密码			
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
			if (uni.getStorageSync('isOpenGesture') == 1) {
				this.bindshoupasswd = true
			} else {
				this.bindshoupasswd = false
			}
			if (uni.getStorageSync('isOpenFingerprint') == 1) {
				this.noticechat = true
			} else {
				this.noticechat = false
			}
		},
		methods: {



			userdata() {
				uni.navigateTo({
					url: "../userdata/userdata"
				})
			},
			noticechat_btn(e) {
				this.noticechat = e.detail.value;
				console.log(e.detail.value)

			},
			switch1Change: function(e) {
				if (e.target.value == true) {
					// 判断设备是否支持指纹识别
					if (plus.fingerprint) {
						if (!plus.fingerprint.isSupport()) {
							this.myAlert(this.$t('wo.csbbzczwsb'));
							this.noticechat = false
							return false
						}
						if (!plus.fingerprint.isKeyguardSecure()) {
							this.myAlert(this.$t('wo.wszmmsb'));
							this.noticechat = false
							return false
						}
						if (!plus.fingerprint.isEnrolledFingerprints()) {
							this.myAlert(this.$t('wo.csbwrrzw'));
							this.noticechat = false
							return false
						}

						this.noticechat = true
						uni.request({
							url: this.websiteUrl + 'user/openOrCloseFingerprint',
							method: 'POST',
							data: {
								token: uni.getStorageSync('token'),
								userId: uni.getStorageSync('id'),
								state: 1
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
							},
							success: (res) => {
								console.log(res)
								this.myAlert(res.data.msg);
								if (res.data.code == 200) {
									uni.setStorageSync('isOpenFingerprint', 1);
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
					} else {
						console.log('system.updatePrompt');
					}
				} else {
					uni.request({
						url: this.websiteUrl + 'user/openOrCloseFingerprint',
						method: 'POST',
						data: {
							token: uni.getStorageSync('token'),
							userId: uni.getStorageSync('id'),
							state: 0
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
						},
						success: (res) => {
							console.log(res)
							this.myAlert(res.data.msg);
							if (res.data.code == 200) {
								uni.setStorageSync('isOpenFingerprint', 0);
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
				}
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

	.set_text_title {
		font-size: 48upx;
		width: 100%;
		margin: 30upx 0;
		padding: 0 40upx;
		box-sizing: border-box;
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

	.userinfo {}

	.userinfo .user_text {
		margin-left: 30upx;
	}

	.userinfo .user_text .name {
		font-size: 38upx;
		color: #FFFFFF;
	}

	.userinfo .user_text .title {
		font-size: 32upx;
		color: #FFFFFF;
	}

	.userinfo .user_text .userid {
		font-size: 24upx;
		color: #8792A8;
	}

	.right_box {}

	.right_box .cheched_text {
		font-size: 28upx;
		color: #6E778A;
		margin-right: 25upx;
	}

	.btn {
		width: 670upx;
		margin: 0 40upx;
		margin-top: 140upx;
		border: 2upx solid #6E778A;
		color: #6E778A;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		font-size: 36upx;
		border-radius: 50upx;
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



	/* 弹出对话框 */
	.alert_box {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 0 43upx;
		box-sizing: border-box;
		z-index: 999999999999999999999999999999;
	}

	.alert_box .mask_box {
		background: rgba(0, 0, 0, .2);
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.alert_box .content_box {
		width: 580upx;
		height: 350upx;
		border-radius: 20upx;
		position: relative;
		z-index: 99999;
		padding: 40upx 30upx;
		box-sizing: border-box;
	}

	.alert_box .content_box .text_box {
		width: 100%;
		font-size: 36upx;
		color: #FFFFFF;
		padding-top: 60upx;
	}

	.alert_box .content_box .btn_box view {
		text-align: center;
		height: 70upx;
		line-height: 70upx;
		border-radius: 35upx;
		width: 240upx;
		box-sizing: border-box;
	}

	.alert_box .content_box .btn_box view:nth-of-type(1) {
		border: 1px solid #E64340;
		color: #E64340;
	}

	.alert_box .content_box .btn_box view:nth-of-type(2) {
		background: #3A74FC;
		color: #FFFFFF;
	}
</style>
