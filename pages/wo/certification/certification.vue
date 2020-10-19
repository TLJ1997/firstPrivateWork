<template>
	<view class="Page">
		<view class="content" :style="'padding-top:' + statusBarH + 'px;'">
			<image src="/static/youkey/bg.png" class="bg"></image>
			<image :src="hb_status ? '../../../static/home/nav_icon_back_day.png' : '../../../static/home/nav_icon_back_night.png'"
			 mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
			<view class="head">
				<image src="/static/logo.png" class="logo"></image>
				<view class="name">
					币圈交易所
				</view>
				<view class="title">
					<text>{{$t('wo.smrz')}}</text>
					<text style="font-size: 24upx;margin-left:20upx;color: #C0C2C5;">{{$t('wo.zg')}}</text>
				</view>
			</view>
			<!-- 占位符 -->
			<view style="height: 400upx;"></view>

			<view class="ipt_name">
				<image src="../../../static/youkey/user.png"></image>
				<input type="text" value="" v-model="userinfo.username" @input="usernameChange" :placeholder="name"
				 placeholder-style="color:#C1C1C1;" style="width: 580upx;" />

				<image :src="hb_status ? '../../../static/home/nav_icon_close_day.png' : '../../../static/home/nav_icon_close_night.png'"
				 mode="" style="width:30upx;height: 30upx;padding: 10upx;" @click="delusername()" v-show="userinfo.username != ''"></image>
			</view>
			<view class="ipt_name">
				<image src="../../../static/youkey/card.png"></image>
				<input type="text" value="" v-model="Card.IDCard" @input="IDCardChange" :placeholder="idCard" placeholder-style="color:#C1C1C1;"
				 style="width: 580upx;" />
				<image :src="hb_status ? '../../../static/home/nav_icon_close_day.png' : '../../../static/home/nav_icon_close_night.png'"
				 mode="" style="width:30upx;height: 30upx;" @click="delPasswdok()" v-show="Card.IDCard != ''"></image>
			</view>
			<view class="btn" @click="Login_btn()">
				{{$t('wo.rz')}}
			</view>
		</view>
	</view>
</template>

<script>
	var This;
	export default {
		data() {
			return {
				name: this.$t('wo.name'),
				idCard: this.$t('wo.sfzh'),
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				paddingBottom: 0, //判断苹果X底部高度
				isyichu: false,
				isLoginType: true, // true 快捷登录    false账号登录
				vcodeBtnName: '获取验证码',
				countNum: 60, //倒计时时间
				countDownTimer: null, //定时器
				userinfo: {
					username: '',
					status: false
				},
				Card: {
					IDCard: '',
					status: false
				}
			};
		},
		onLoad() {
			console.log("token:" + uni.getStorageSync('token'));
			console.log(uni.getStorageSync('token') == '');

			if (uni.getStorageSync('token') == '') {
				uni.reLaunch({
					url: '../../login/login'
				});
			}
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

			var view = uni.createSelectorQuery().select('.muen_header');
			view.boundingClientRect(data => {
				// console.log("节点离页面顶部的距离为" + data.height);
				This.header_H = data.height;
				console.log(This.header_H);
			}).exec();
		},
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk');
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(() => {
				this.tab_init();
			}, 500)
		},
		methods: {
			delPasswdok() {
				//清空确认密码
				this.Card.IDCard = '';
			},
			IDCardChange(e) {
				//输入确认密码
				this.Card.IDCard = e.detail.value;
			},
			delusername() {
				//清空密码
				this.userinfo.username = '';
			},
			usernameChange(e) {
				//输入密码
				this.userinfo.username = e.detail.value;
			},
			phoneChange(e) {
				//输入手机号码
				this.checkPhone(e.detail.value);

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
			getVCode: function() {
				//获取验证码
				if (this.Phone.status) {
					var myreg = /^[1][1,2,3,4,5,7,8,9][0-9]{9}$/;
					if (!myreg.test(this.Phone.MobilePhone)) {
						uni.showToast({
							title: this.$t('wo.qzqtxsjhm'),
							icon: 'none'
						});
						return false;
					}
					// 手机号码为 :  this.phoneno
					// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
					if (this.vcodeBtnName != this.$t('wo.hqyzm') && this.vcodeBtnName != this.$t('wo.cxfs')) {
						return;
					}
					this.vcodeBtnName = this.$t('wo.fasongzhong');
					// 与后端 api 交互，发送验证码 【自己写的具体业务代码】
					// 假设发送成功，给用户提示
					uni.showToast({
						title: '短信已发送，请注意查收',
						icon: 'none'
					});
					// 倒计时
					this.countNum = 60;
					this.countDownTimer = setInterval(
						function() {
							this.countDown();
						}.bind(this),
						1000
					);
				}
			},
			countDown: function() {
				if (this.countNum < 1) {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = this.$t('wo.cxfs');
					return;
				}
				this.countNum--;
				this.vcodeBtnName = this.countNum + this.$t('wo.mcf');
			},
			yzmChange(e) {
				this.yzm = e.detail.value;
			},
			// 上传图片
			uploadImg(path) {
				let _this = this;
				uni.uploadFile({
					url: _this.websiteUrl + 'user/uploadFile', //仅为示例，非真实的接口地址
					name: 'file',
					filePath: path,
					formData: {
						state: 1
					},
					header: {
						'content-type': 'multipart/form-data' //自定义请求头信息
					},
					success(res) {
						console.log('-------------------------------');

						let responseData = JSON.parse(res.data);

						if (responseData.code == 200) {
							/* 提交验证 */
							_this.submitCheck(responseData.data);
						}
						console.log(responseData);
					},
					complete(res) {
						console.log('complete:' + JSON.stringify(res));
					}
				});
			},
			/* 提交 */
			submitCheck(imgUrl) {
				let _this = this;
				var shiming = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					idCard: this.Card.IDCard,
					realName: this.userinfo.username,
					imgUrl: imgUrl
				};
				console.log(shiming);
				uni.request({
					url: this.websiteUrl + 'user/realNameCertification',
					method: 'POST',
					data: shiming,
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					success: res => {
						console.log(res);
						// _this.myAlert(res.data.msg);
						if (res.data.code == 200) {
							uni.setStorageSync('isRealName', 1);
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								});
							}, 1500);
							_this.userinfo = {
								username: '',
								status: false
							};
							_this.Card = {
								IDCard: '',
								status: false
							};
						} else if (res.data.code == 500) {
							_this.myAlert(res.data.msg);
						} else if (res.data.code == 402) {
							if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
								console.log('开启了指纹手势可以验证登录');
								uni.reLaunch({
									url: '../../indexzhiwen/indexzhiwen'
								});
							} else {
								console.log('没开启指纹手势去登录');
								uni.reLaunch({
									url: '../../login/login'
								});
							}
						}
						uni.showToast({
							title: res.data.msg
						});
					},
					fail: () => {}
				});
			},
			getUserPhoto() {
				var _this = this;
				uni.chooseImage({
					sizeType: ['compressed'],
					sourceType: ['camera'],
					success: function(res) {
						_this.uploadImg(res.tempFilePaths[0]);
					}
				});
			},
			Login_btn() {
				var _this = this;
				// if(this.userinfo.username!='' && this.Card.IDCard!=''){

				// 	console.log('姓名：'+this.userinfo.username)
				// 	console.log('身份证号：'+this.Card.IDCard)

				// 	uni.navigateTo({
				// 		url:"/pages/wo/certification/certification1?username="+this.userinfo.username+'&IDCard='+this.Card.IDCard
				// 	})

				// }
				if (this.userinfo.username == '') {
					this.myAlert(_this.$t('wo.qsrxm'));
					return false;
				}
				if (this.Card.IDCard == '') {
					this.myAlert(_this.$t('wo.rsrsfzhm'));
					return false;
				}
				/* 调取摄像头进行实名认证 */
				this.getUserPhoto();
			},
			yichubz_btn() {
				//溢出显示隐藏

				this.isyichu = !this.isyichu;
				console.log(this.isyichu);
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
		}
	};
</script>

<style lang="scss" scoped>
	.Page {
		.content {
			padding: 0 34upx;

			.bg {
				position: fixed;
				top: 0;
				left: 0;
				width: 100vw;
				height: 100vh;
				z-index: -1;
			}

			.logo {
				width: 156upx;
				height: 80upx;
				margin: 20upx 0;
			}

			.name {
				font-size: 38upx;
				font-weight: 600;
			}

			.title {
				font-size: 34upx;
				font-weight: 600;
				color: #8E8F91;
				margin-top: 30upx;
			}

			.ipt_name {
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding: 10upx 20upx;
				width: 100%;
				height: 68upx;
				background-color: #FFFFFF;
				border-radius: 10upx;
				box-shadow: 0upx 0upx 8upx 1upx rgba(0, 0, 0, .1);
				margin-bottom: 80upx;

				image {
					margin-right: 20upx;
					width: 45upx;
					height: 36upx;
				}
			}

			.btn {
				width: 100%;
				height: 68upx;
				line-height: 68upx;
				background-color: #1F6ED4;
				text-align: center;
				color: #FFFFFF;
				border-radius: 18upx;
			}
		}

	}
</style>
