<template>
	<view style="background-size: 100%;width: 100vw;height: 100vh;">
		<view :style="'padding-top: ' + statusBarH + 'px;'"></view>
		<image src="/static/kuangchi/tao/mianfei.png" class="bgImg"></image>
		<view class="head"  :style=" 'height:' + statusBarH + 'px;' ">
			<image src="/static/kuangchi/tao/goBack.png" mode="" style="width:46upx;height: 46upx;" @click="back()"></image>
			<view>免费矿机</view>
			<view></view>
		</view>
		<view class="zichan">
			<view class="zichanItem biankuang">
				<view>挖矿资产</view>
				<view style="color: #39BAE8;font-weight: 600;">{{remaining}} USDT</view>
			</view>
			<view class="zichanItem">
				<view>签到收益</view>
				<view style="color: #39BAE8;font-weight: 600;">{{grandTotal}} BEC</view>
			</view>
		</view>
		<view class="footer">
			<view class="tixian" @tap="getWithdraw">
				提现
			</view>
			<view class="qiandao" @tap="qiandao">
				签到
			</view>
		</view>
		<!-- 签到弹框 -->
		<view class="bgceng" v-if="showQiandao">
			<image src="/static/kuangchi/tao/tanchuan.png" class="qiandaoSuccess" @click="showQiandao = false"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showQiandao:false,
				remaining:'',
				grandTotal:'',
				zhimi:'',
				statusBarH:'',
				// 签到状态
				isShowBalls:false,
				isQiandao:''
			};
		},
		onShow() {
			/* 获取免费信息 */
			this.getFreeInfo();
		},
		onLoad(e) {
			let This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					console.log('导航栏高度',This.statusBarH)
				}
			});
			
			/* 是否绑定支付密码 */
			this.checkPayPwd();
			// 是否已签到
			this.getIsSignIn();
		},
		methods: {
			// 是否已签到
			getIsSignIn() {
				let _this = this;
				let sendData = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id')
				};
				uni.request({
					url: this.websiteUrlzhh + 'afd/isSignIn', //仅为示例，并非真实接口地址。
					data: sendData,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language": 'zh'
					},
					method: 'POST',
					success: res => {
						console.log("是否已签:" + res.data.data);
						if (res.data.code == 200) {
							if (!res.data.data) {
								_this.isShowBalls = true;
							}
						}
					}
				});
			},
			// 提现
			getWithdraw() {
				var _this = this;
				uni.request({
					url: this.websiteUrlzhh + '/afd/withdraw',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
						'Accept-Language': 'zh'
					},
					data: {
						token: uni.getStorageSync('token'),
						userId: uni.getStorageSync('id')
					},
					success: res => {
						if (res.data.code == 200) {
							console.log('获取到的数据:' + JSON.stringify(res));
						}
						if (res.data.code == 402) {
							uni.reLaunch({
								url: '../../login/login'
							});
						}
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				});
			},
			// 签到
			qiandao() {
				var _this = this;

				uni.request({
					url: this.websiteUrlzhh + '/afd/signIn',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
						'Accept-Language': 'zh'
					},
					data: {
						token: uni.getStorageSync('token'),
						userId: uni.getStorageSync('id')
					},
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							_this.showQiandao = true;
							_this.getFreeInfo();
						}else if (res.data.code == 402) {
							uni.reLaunch({
								url: '../../login/login'
							});
						}else {
							uni.showToast({
								icon:'none',
								title:res.data.msg
							})
						}
					}
				});
			},
			// 签到收益 挖矿收益
			getFreeInfo() {
				var _this = this;
				uni.request({
					url: this.websiteUrlzhh + 'afd/getFreeCredit',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
						'Accept-Language': 'zh'
					},
					data: {
						token: uni.getStorageSync('token'),
						userId: uni.getStorageSync('id')
					},
					success: res => {
						if (res.data.code == 200) {
							_this.remaining = res.data.data.remaining;
							_this.grandTotal = res.data.data.grandTotal;
						}
						if (res.data.code == 402) {
							uni.reLaunch({
								url: '../../login/login'
							});
						}
					}
				});
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 是否绑定支付密码
			checkPayPwd() {
				var that = this;
				var zhebishisha = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id')
				};
				uni.request({
					url: this.websiteUrl + 'user/isSettingPayPassword',
					method: 'GET',
					data: zhebishisha,
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					success: res => {
						console.log('判断是否绑定', res.data);
						if (res.data.code == 200) {
							that.zhimi = res.data.data;
						} else {}
					},
					fail: () => {}
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.bgImg{
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.head{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30upx;
		color: #FFFFFF;
	}
	
	.bgceng{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	}
	.qiandaoSuccess{
		position: fixed;
		top: 30vh;
		left: 100upx;
		width: 530upx;
		height: 590upx;
		z-index: 9999;
	}
	
	.zichan {
		position: absolute;
		bottom: 190upx;
		width: 600upx;
		margin: 0 50upx;
		border: 4upx solid #39BAE8;
		padding: 0 20upx;
		border-radius: 20upx;
	}

	.zichanItem {
		display: flex;
		justify-content: space-between;
		color: #fff;
		height: 100upx;
		line-height: 100upx;
		font-size: 34upx;
	}
	
	.biankuang{
		border-bottom: 2upx solid #39BAE8;
	}

	.footer {
		position: absolute;
		left: -20upx;
		bottom: 70upx;
		color: #FFFFFF;
		width: 580upx;
		height: 100upx;
		display: flex;
		justify-content: space-between;
		padding: 0 110upx;

	}

	.tixian {
		width: 300upx;
		height: 80upx;
		line-height: 80upx;
		background-color: #39B9E7;
		margin-right: 30upx;
		text-align: center;
		border-radius: 20upx;
		font-size: 36upx;
	}

	.qiandao {
		width: 300upx;
		height: 80upx;
		line-height: 80upx;
		background-color: #2C2D3F;
		margin-right: 20upx;
		margin-left: 30upx;
		text-align: center;
		border-radius: 20upx;
		font-size: 36upx;
	}

</style>
