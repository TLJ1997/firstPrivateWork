<template>
	<view class="logoPage">
		
		<view class="head" :style="'padding-top:' + statusBarH + 'px;'">
			<image src="/static/logo.png" class="logo"></image>
			<view class="title">
				币圈交易所
			</view>
		</view>
		
		<!-- 账号 -->
		<view class="phone" style="margin-top: 30upx;">
			<image src="/static/img/icon_Securityverification.png" class="user_icon"></image>
			<view style="width: 530upx;">
				<input type="text"  value="" v-model="mobile" :placeholder="input_phone">
			</view>
			<!-- <image src="/static/img/icon_Securityverification.png" class="close" @click="delPhone()"></image> -->
		</view>
		
		<!-- 验证码 -->
		<view class="phone">
			<image src="/static/img/icon_Securityverification.png" class="user_icon"></image>
			<view style="width: 480upx;">
				<input value="" v-model="code" :placeholder="input_code"/>
			</view>
			<view class="YZM" :disabled="btn_state" @tap="fs_yzm()">
				{{ yzm_text }}
			</view>
		</view>
		
		<!-- 密码 -->
		<view class="phone">
			<image src="/static/img/icon_Securityverification.png" class="user_icon"></image>
			<view style="width: 530upx;">
				<input :type="is_paswd ? 'text' : 'password'"  value="" v-model="mima" :placeholder="input_pwd"/>
			</view>
			<image
				:src="is_paswd ? '../../../static/show_pawsd.png' : '../../../static/hide_pwasd.png'"
				class="close"
				@tap="ishide()"
			></image>
		</view>
		
		<!-- 确认密码 -->
		<view class="phone">
			<image src="/static/img/icon_Securityverification.png" class="user_icon"></image>
			<view style="width: 530upx;">
				<input :type="is_paswdtwo ? 'text' : 'password'"  v-model="zaimima" :placeholder="input_passwords"/>
			</view>
			<image
				:src="is_paswdtwo ? '../../../static/show_pawsd.png' : '../../../static/hide_pwasd.png'"
				class="close"
				@tap="itwoshide()"
			></image>
		</view>
		
		<!-- 邀请码 -->
		<view class="phone">
			<image src="/static/img/icon_Securityverification.png" class="user_icon"></image>
			<view style="width: 530upx;">
				<input type="text"  v-model="namemobile" :placeholder="input_yqm"/>
			</view>
		</view>
		
		<view class="btn" @tap="xiayibu">
			注册
		</view>
		
		<view class="gologin" @click="goLogin()">已有账号，去登录</view>
	</view>
</template>

<script>
	var This;
	import md5 from '../../../static/js/md5.min.js';
	import codes from '@/common/world-code.js'
	export default {
		data() {
			return {
				input_phone: this.$t('login.qsrsjhm'),
				input_code: this.$t('login.qsr_code'),
				input_passwords: this.$t('login.qzcsrmm'),
				input_yqm: this.$t('login.qsryzm'),
				input_yxzh: this.$t('login.qsryxzh'),
				input_pwd: this.$t('login.srmm'),

				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				show3: false,
				header_H: 0,
				windowHeight: 0,
				items: [this.$t('login.sjzc'), this.$t('login.yxzc')],
				hb_status: true,
				colors: ['#999', '#4cd964', '#dd524d'],
				is_paswd: false,
				is_paswdtwo: false,
				coinxzindex: 0,
				activeColor: '#000',
				yzm_text: this.$t('login.hq_code'),
				mobile: '',
				code: '',
				mima: '',
				zaimima: '',
				namemobile: '',
				syouxiang: '',
				scode: '',
				smima: '',
				syzm_text: this.$t('login.hq_code'),
				szaimima: '',
				snamemobile: '',
				btn_state: false,
				codede: '111',
				sbtn_state: false,
				zhanghao: '',
				szhanghao: '',
				dongtu: '',
				mobileyan: '',
				bianurl: 'http://193.112.99.17:81/app/kuangji/verify',
				worldCodes: codes,
				currentCode: 36
			};
		},
		onLoad() {
			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight;
					// console.log(JSON.stringify(res))
					console.log(This.windowHeight);

					var model = res.model;
					if (model.search('iPhone X') != -1) {
						This.paddingBottom = 68;
					}
				}
			});
		},
		onShow: function() {
			this.backgroundALL = uni.getStorageSync('localbk');
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(() => {
				this.tab_init();
			}, 500);
		},
		methods: {
			goLogin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			worldCodeChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value);
				console.log('picker发送选择改变，携带值为', JSON.stringify(e));
				this.currentCode = e.detail.value;
			},
			Back() {
				uni.navigateBack({
					//后退
					delta: 1
				});
			},
			tab_init() {
				if (this.backgroundALL == '#1c1f22') {
					this.hb_status = false;
					uni.setNavigationBarColor({
						frontColor: '#ffffff',
						backgroundColor: '#1c1f22'
					});
					uni.setTabBarStyle({
						backgroundColor: '#1c1f22',
						color: '#737373',
						selectedColor: '#D3674D'
					});
				} else {
					this.hb_status = true;
					uni.setNavigationBarColor({
						frontColor: '#000000',
						backgroundColor: '#ffffff'
					});
					uni.setTabBarStyle({
						backgroundColor: '#ffffff',
						color: '#737373',
						selectedColor: '#D3674D'
					});
				}
			},
			ishide() {
				this.is_paswd = !this.is_paswd;
			},
			itwoshide() {
				this.is_paswdtwo = !this.is_paswdtwo;
			},
			trim(s) {
				return s.replace(/(^\s*)|(\s*$)/g, '');
			},
			login() {
				uni.reLaunch({
					url: '/pages/login/login'
				});
			},
			onClickItem(index) {
				this.coinxzindex = index;
				console.log(index);
			},
			xiayibu(e) {
				let This = this;
				if (this.mobile == '') {
					uni.showToast({
						title: This.$t('login.qsrsjhm'),
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				if (this.code == '') {
					uni.showToast({
						title: This.$t('login.qsr_code'),
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				if (this.mima == '') {
					uni.showToast({
						title: This.$t('login.srmm'),
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				if (this.zaimima == '' || this.zaimima != this.mima) {
					uni.showToast({
						title: This.$t('login.decmmbzq'),
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				if (this.namemobile == '') {
					uni.showToast({
						title: This.$t('login.qsryqm'),
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				console.log(this.code + '====' + this.mobile + '====' + this.mima + '====' + this.namemobile + '====' + this.zaimima);

				uni.request({
					url: this.websiteUrl + 'user/registered',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh' //自定义请求头信息
					},
					data: {
						verifyCode: this.code,
						account: this.mobile,
						pwd: this.mima,
						inviteCode: this.namemobile
					},
					method: 'POST',
					success: res => {
						console.log(res.data);

						if (res.data.code == 200) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 1000
							});
							uni.reLaunch({
								url: '/pages/login/login'
							});
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 1000
							});
						}
					}
				});
			},
			xiayibutwo(e) {
				let This = this;
				if (this.syouxiang == '') {
					uni.showToast({
						title: This.$t('login.qsryxzh'),
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				if (this.scode == '') {
					uni.showToast({
						title: This.$t('login.qsryxyzm'),
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				if (this.smima == '') {
					uni.showToast({
						title: This.$t('login.srmm'),
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				if (this.szaimima == '' || this.smima != this.szaimima) {
					uni.showToast({
						title: This.$t('login.decmmbzq'),
						icon: 'none',
						duration: 1000
					});
					return false;
				}

				uni.request({
					url: this.websiteUrl + 'user/registered',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh' //自定义请求头信息
					},
					data: {
						verifyCode: this.scode,
						account: this.syouxiang,
						pwd: this.smima,
						inviteCode: this.snamemobile
					},
					method: 'POST',
					success: res => {
						console.log(res.data);

						if (res.data.code == 200) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 1000
							});
							uni.reLaunch({
								url: '/pages/login/login'
							});
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 1000
							});
						}
					}
				});
			},
			fs_yzm() {
				let This = this;
				if (this.mobile == '' || this.mobile.length != 11) {
					uni.showToast({
						title: This.$t('login.qzqsrsjhm'),
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				if (this.btn_state == false) {
					var shoudata = {
						account: this.mobile,
						privateKey: md5(this.mobile + 'XOUdGYC62DHkMVNL')
					};
					console.log(shoudata);
					uni.request({
						url: this.websiteUrl + 'user/sendSms',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'Accept-Language': 'zh' //自定义请求头信息
						},
						data: shoudata,
						method: 'POST',
						success: res => {
							console.log(res.data);

							if (res.data.code == 200) {
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 1000
								});
								this.btn_state = true;
								var sj_num = 60;
								var that = this;
								var settime = setInterval(function() {
									that.yzm_text = "This.$t('login.fscg')(" + sj_num + ')';
									if (sj_num == 0) {
										that.btn_state = false;
										that.yzm_text = This.$t('login.hq_code');
										clearInterval(settime);
									}
									console.log(sj_num);
									console.log(that.btn_state);
									console.log(that.yzm_text);
									sj_num--;
								}, 1000);
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 1000
								});
							}
						}
					});
				}
			},
			youxiang_yzm() {
				let This = this;
				if (this.syouxiang == '') {
					uni.showToast({
						title: This.$t('login.qzqsryxzh'),
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				if (this.sbtn_state == false) {
					var lailaiyou = {
						email: this.syouxiang, //需要改成account
						privateKey: md5(this.syouxiang + 'XOUdGYC62DHkMVNL'),
						state: 0
					};
					console.log(lailaiyou);
					uni.request({
						url: this.websiteUrl + 'user/sendEmail',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'Accept-Language': 'zh' //自定义请求头信息
						},
						data: lailaiyou,
						method: 'POST',
						success: res => {
							console.log(res.data);

							if (res.data.code == 200) {
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 1000
								});
								this.sbtn_state = true;
								var ssj_num = 60;
								var that = this;
								var settime = setInterval(function() {
									that.syzm_text = '发送成功(' + ssj_num + ')';
									if (ssj_num == 0) {
										that.sbtn_state = false;
										that.syzm_text = this.$t('login.hq_code');
										clearInterval(settime);
									}
									console.log(ssj_num);
									console.log(that.sbtn_state);
									console.log(that.syzm_text);
									ssj_num--;
								}, 1000);
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 1000
								});
							}
						}
					});
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.logoPage {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		padding: 50upx;
		padding-top: 0;
		background: url(/static/banner/bgBig.png) repeat fixed center;

		.logo {
			width: 200upx;
			height: 100upx;
			margin-top: 40upx;
		}

		.title {
			font-size: 38upx;
			font-weight: 600;
			color: #9D9E9B;
		}

		.phone {
			display: flex;
			justify-content: left;
			align-items: center;
			width: 600upx;
			height: 80upx;
			border-radius: 20upx;
			padding:0 30upx;
			margin-bottom: 60upx;
			box-shadow: 0upx 0upx 8upx 1upx rgba(0, 0, 0, .1);
			.user_icon{
				width: 40upx;
				height: 40upx;
				margin-right: 20upx;
			}
			.close{
				width: 30upx;
				height:30upx;
			}
			.YZM{
				width: 250upx;
				height:60upx;
				line-height: 60upx;
				text-align: center;
				background-color: #FDB44B;
				border-radius: 16upx;
				color: #FFFFFF;
			}
		}
		
		// 注册
		.btn{
			width: 650upx;
			height: 80upx;
			line-height: 80upx;
			font-size: 38upx;
			border-radius: 30upx;
			margin-top: 90upx;
			text-align: center;
			box-shadow: 0upx 0upx 8upx 1upx rgba(0, 0, 0, .1);
			color: #FFFFFF;
			background-color: #1F6ED4;
		}
			
		// 登录
		.gologin{
			text-align: center;
			margin-top: 25upx;
			padding: 14upx 0;
		}
	}
</style>
