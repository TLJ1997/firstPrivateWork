<template>
	<view class="logoPage">
		
		<view class="head">
			<image src="../../static/logo.png" class="logo"></image>
			<view class="title">
				币圈交易所
			</view>
		</view>
		
		<!-- 占位 撑开高度 -->
		<view class="zhanwei"></view>
		
		<!-- 账号 -->
		<view class="phone">
			<image src="/static/img/icon_Securityverification.png" class="user_icon"></image>
			<view style="width: 530upx;">
				<input type="text"  value="" v-model="Phone.MobilePhone" @input="phoneChange" :placeholder="input_phone"/>
			</view>
			<image src="/static/img/icon_Securityverification.png" class="close" @click="delPhone()"></image>
		</view>
		
		<!-- 密码 -->
		<view class="phone">
			<image src="/static/img/icon_Securityverification.png" class="user_icon"></image>
			<view style="width: 530upx;">
				<input :type="is_paswd ? 'text' : 'password'" value="" v-model="Passwd.Passwd" @input="PasswdChange" :placeholder="input_password"/>
			</view>
			<image :src="is_paswd ? '/static/show_pawsd.png' : '/static/hide_pwasd.png'" class="close" @tap="ishide()"></image>
		</view>
		
		<!-- 忘记密码 -->
		<view class="footer_txt">
			<view class="forget" @click="wangji">{{ $t('login.wjmm') }}</view>
			<view  @click="reg_btn">{{$t('login.zczh')}}</view>
		</view>
		
		<!-- 登录 -->
		<view class="btn"  @click="Login_btn()">
			{{ $t('login.login') }}
		</view>
		<!--登录验证框-->
		<logindialog :isshow="isshowverify" @verfy="verify" @close="closeverify"></logindialog>
	</view>
</template>

<script>
	var This;
	import logindialog from '../../components/logindialog.vue';
	import md5 from '../../static/js/md5.min.js';
	import codes from '@/common/world-code.js';
	export default {
		components: {
			logindialog
		},
		data() {
			return {
				input_phone: this.$t('login.inputPhone'),
				input_code: this.$t('login.inputCode'),
				input_password: this.$t('login.inputPasword'),
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				isshowverify: false,
				isverify: false,
				hb_status: true,
				paddingBottom: 0, //判断苹果X底部高度
				isLoginType: false, // true 快捷登录    false账号登录
				vcodeBtnName: '获取验证码',
				countNum: 60, //倒计时时间
				countDownTimer: null, //定时器
				Phone: {
					MobilePhone: '',
					status: false
				},
				Passwd: {
					Passwd: '',
					status: false
				},
				yzm: '',
				worldCodes: codes,
				currentCode: 36,
				is_paswd:false
			};
		},
		onLoad() {
			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight;
					// console.log(JSON.stringify(res))
					//console.log(This.windowHeight)

					var model = res.model;
					if (model.search('iPhone X') != -1) {
						This.paddingBottom = 68;
					}
				}
			});

			var view = uni.createSelectorQuery().select('.muen_header');
			view.boundingClientRect(data => {
				// console.log("节点离页面顶部的距离为" + data.height);
				//This.header_H = data.height;
				//console.log(This.header_H)
			}).exec();
		},
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk');
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(() => {
				this.tab_init();
			}, 500);
		},
		methods: {
			ishide() {
				this.is_paswd = !this.is_paswd;
			},
			worldCodeChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value);
				console.log('picker发送选择改变，携带值为', JSON.stringify(e));
				this.currentCode = e.detail.value;
			},
			reg_btn() {
				//注册账号或者忘记密码
				// if (this.isLoginType) {
				uni.navigateTo({
					url: 'reg/reg' //注册
				});
				// } else {
				// 	uni.navigateTo({
				// 		url: "resetPasswd/resetPasswd" //忘记密码
				// 	})
				// }
			},
			wangji() {
				uni.navigateTo({
					url: '../wo/SafetyCenter/waimianpass' //注册
				});
			},
			delPasswd() {
				//清空密码
				this.Passwd.Passwd = '';
			},
			PasswdChange(e) {
				//输入密码
				this.Passwd.Passwd = e.detail.value;
			},
			delPhone() {
				//清空手机号码
				this.Phone.MobilePhone = '';
				this.Phone.status = false;
			},
			loginType() {
				//切换登录方式
				// this.isLoginType = !this.isLoginType;
				this.Phone.MobilePhone = '';
			},
			phoneChange(e) {
				//输入手机号码
				// this.checkPhone(e.detail.value)

				console.log(JSON.stringify(e.detail.value));
			},
			checkPhone(phone) {
				//手机号码正则

				if (!/^1[3456789]\d{9}$/.test(phone)) {
					/* uni.showToast({
					        	title:"手机号码错误",
								icon:"none",
								mask:true,
								duration:1500
					        })
					        return false; */
					this.Phone.status = false;
				} else {
					this.Phone.status = true;
				}
			},
			verify: function(isverify) {
				//alert(isverify)

				this.isverify = isverify;
				if (isverify) {
					this.getVCode();
					this.isshowverify = false;
				}
			},
			closeverify: function() {
				this.isverify = false;
				this.isshowverify = false;
			},
			getVCode: function() {
				let This = this;
				//获取验证码

				if (this.Phone.status) {
					var myreg = /^[1][1,2,3,4,5,7,8,9][0-9]{9}$/;
					if (!myreg.test(this.Phone.MobilePhone)) {
						uni.showToast({
							title: This.$t('login.zqtxsjhm'),
							icon: 'none'
						});
						return false;
					}
					// 手机号码为 :  this.phoneno
					// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
					if (this.vcodeBtnName != This.$t('login.hq_code') && this.vcodeBtnName != This.$t('login.cxfs')) {
						return;
					}
					this.vcodeBtnName = '发送中...';
					// 与后端 api 交互，发送验证码 【自己写的具体业务代码】
					//alert(md5('123'))
					//console.log(md5('13644729399/KxCc7MZFtD3riDQhucyDHohMcMUqHpjvXtmjhvJvj3gHc9SiHxo6'))
					/*this.$axios.post('user/mobileNumber', {
						     mobileNumber: this.Phone.MobilePhone,
						     mobileStrMd5: md5(this.Phone.MobilePhone+'/KxCc7MZFtD3riDQhucyDHohMcMUqHpjvXtmjhvJvj3gHc9SiHxo6')
						   })
						   .then(function (response) {
							  
						     console.log(response);
						   })
						   .catch(function (error) {
						     console.log(error);
						   });*/
					var t = this;
					this.req(
						'user/login', {
							mobileNumber: this.Phone.MobilePhone,
							mobileStrMd5: md5(this.Phone.MobilePhone + '/KxCc7MZFtD3riDQhucyDHohMcMUqHpjvXtmjhvJvj3gHc9SiHxo6')
						},
						function(res) {
							if (res.data.status == 200) {
								// 假设发送成功，给用户提示
								uni.showToast({
									title: This.$t('login.fasongdaunxin'),
									icon: 'none'
								});
								// 倒计时
								t.countNum = 60;
								t.countDownTimer = setInterval(
									function() {
										t.countDown();
									}.bind(t),
									1000
								);
								t.Phone.status = false;
							} else {
								uni.showToast({
									title: This.$t('login.fssb'),
									icon: 'none'
								});
							}
						}
					);
				}
			},
			countDown: function() {
				let This = this;
				if (this.countNum < 1) {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = This.$t('login.cxfs');
					this.Phone.status = true;
					return;
				}
				this.countNum--;
				this.vcodeBtnName = this.countNum + This.$t('login.mcf');
			},
			yzmChange(e) {
				this.yzm = e.detail.value;
			},
			Login_btn() {
				let This = this;
				if (this.Phone.MobilePhone == '') {
					uni.showToast({
						title: This.$t('login.srzh'),
						icon: 'none',
						duration: 1500,
						position: 'bottom'
					});
					return false;
				}
				if (this.Passwd.Passwd == '') {
					uni.showToast({
						title: This.$t('login.srmm'),
						icon: 'none',
						duration: 1500,
						position: 'bottom'
					});
					return false;
				}
				var sdata = {
					account: this.Phone.MobilePhone,
					pwd: this.Passwd.Passwd
				};
				console.log(sdata);
				//调用登录API
				uni.request({
					url: this.websiteUrl + 'user/login',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh' //自定义请求头信息
					},
					data: sdata,
					method: 'POST',
					success: res => {
						console.log('登陆成功:' + JSON.stringify(res));
						this.myAlert(res.data.msg);
						if (res.data.code == 200) {
							uni.setStorageSync('udata', res.data.data);
							uni.setStorageSync('isOpenFingerprint', res.data.data.isOpenFingerprint);
							uni.setStorageSync('isOpenGesture', res.data.data.isOpenGesture);
							uni.setStorageSync('already', res.data.data.already);
							uni.setStorageSync('challenge', res.data.data.challenge);
							uni.setStorageSync('email', res.data.data.email);
							uni.setStorageSync('head', res.data.data.head);
							uni.setStorageSync('id', res.data.data.id);
							uni.setStorageSync('inviteCode', res.data.data.inviteCode);
							uni.setStorageSync('isAdvancedRealName', res.data.data.isAdvancedRealName);
							uni.setStorageSync('isMerchant', res.data.data.isMerchant);
							uni.setStorageSync('isRealName', res.data.data.isRealName);
							uni.setStorageSync('level', res.data.data.level);
							uni.setStorageSync('mobile', res.data.data.mobile);
							uni.setStorageSync('status', res.data.data.status);
							uni.setStorageSync('token', res.data.data.token);
							uni.setStorageSync('nickname', res.data.data.nickname);
							uni.reLaunch({
								url: '../index/index'
							});
						} else {}
					}
				});

				// }
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
			}
		},
		watch: {
			isLoginType(newval, oldval) {
				if (newval != oldval) {
					this.yzm = '';
					this.Passwd.Passwd = '';
				}
			},
			Phone: {
				handle(newval, oldval) {
					console.log(checkPhone(newval.MobilePhone));
				}
			},
			deep: true
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
		background: url(../../static/banner/bgBig.png) repeat fixed center;

		.logo {
			width: 200upx;
			height: 100upx;
			margin-top: 60upx;
		}

		.title {
			font-size: 38upx;
			font-weight: 600;
			color: #9D9E9B;
		}

		// 占位
		.zhanwei {
			height: 400upx;
		}

		.phone {
			display: flex;
			justify-content: left;
			align-items: center;
			width: 600upx;
			height: 80upx;
			border-radius: 20upx;
			padding:0 30upx;
			margin-bottom: 90upx;
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
		}
	
		.footer_txt{
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 650upx;
			height: 80upx;
			margin-top: -80upx;
			color: #75B0FD;
		}
		
		// 登录
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
			
	}
</style>


