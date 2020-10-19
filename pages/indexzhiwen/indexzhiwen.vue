<template>
	<view style="text-align: center; width: 100%; padding-top: 300upx;">
		<image style="width: 180upx; height: 180upx; margin: 0 auto;" src="../../static/img/zhiwene.png"></image> 
		<view class="title" style="color: #DD524D; font-size: 26upx;">{{fingerText}}</view>
		<view class="title" v-on:click="mimayan()" style="font-size: 30upx; color: #007AFF;">{{$t('indexzhiwen.ssyz')}}</view>
		<view class="grace-margin">
			<view class="grace-shade grace-shade-black" v-if="show3" >
				<view class="grace-shade-msg grace-animate" style="border-radius: 30upx; padding: 0;">
					<view class="body" style="padding: 30upx; box-sizing: border-box;">
						<view style="width: 100%;font-size: 35upx; font-weight: bold; text-align: center;">{{$t('indexzhiwen.yzmm')}}</view>
						<view style="width: 100%; display:flex; align-items:center; margin-top:25upx; margin-bottom: 25upx;">
							<input type="password" v-model="mima" style=" width: 100%;height: 80upx; line-height: 80upx; text-align: left; border: 1upx solid #f5f5f5; padding-left: 10upx;" value="" :placeholder="qsrmm" />
						</view>		
					</view>
					<view style="display: inline-flex;width: 100%; border-top:1upx solid #f5f5f5 ;">
						<view @tap="chaoji()" style="font-size: 28upx;height: 80upx; line-height: 80upx; text-align: center; width: 49.5%; border-right: 1upx solid #f5f5f5; color: #007AFF;">{{$t('indexzhiwen.qd')}}</view>
						<view @tap="quxiaoshow" style="font-size: 28upx;height: 80upx; line-height: 80upx; text-align: center;width: 50%; color: #007AFF;">{{$t('indexzhiwen.qx')}}</view>
					</view>	
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {},
		data() {
			return {
				fingerText: '',
				show3:false,
				mima:'',
				qsrmm:this.$t('indexzhiwen.inputpassword')
			}
		},
		onLoad() {
			

		},
		onShow() {
			this.fingerOnClick()
		},
		onReady() {
			
		},
		methods: {		
			quxiaoshow(){
				this.show3 = false
				this.mima = ''
			},
			mimayan(){
				// this.show3 = true
				// this.mima = ''
				uni.navigateTo({
					url:'../shoushi/index'
				})
			},
			chaoji(){
				let This=this;
				if (this.mima == '') { 
					this.myAlert(This.$t('indexzhiwen.qsrqbmm'))
					return false
				}
				uni.request({
					url: this.websiteUrl + 'app/kuangji/yanzhengmima',
					method: 'POST',
					data: {
						token: uni.getStorageSync('token'),
						password:this.mima
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success: (res) => {    
						console.log(res.data)
						if (res.data.status == 1) {
							this.myAlert(res.data.msg);
							this.mima = ''
							let obj = {
									bian:'1'
								}
							this.$zhiwen.setMemberObj(obj);
							uni.switchTab({
								url: "../faxian/faxian"
							})
						} else{
							this.myAlert(res.data.msg);
							this.mima = ''
						}
					},
					fail: () => {
						this.myAlert(This.$t('indexzhiwen.fwqbcjdzcc'));
					}
				});
			},
			fingerOnClick: function(){
				var that = this;
				this.fingerText = that.$t('indexzhiwen.zhiwen');
				plus.fingerprint.authenticate(function(){
					plus.nativeUI.closeWaiting();//兼容Android平台关闭等待框
					that.myAlert(that.$t('indexzhiwen.zhiwenshibie'));
					// let obj = {
					// 		bian:'1'
					// 	}
					// that.$zhiwen.setMemberObj(obj);
					
					uni.showLoading({
						title: that.$t('indexzhiwen.yanzhengzhong'),
						mask: true
					})
					uni.request({
						url: that.websiteUrl + 'user/fingerprintLogin',
						method: "POST",
						data: {
							userId: uni.getStorageSync('id')
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
						},
						success(res) {
							uni.hideLoading()
							
							if (res.data.code == 200) {
								uni.showToast({
									title: res.data.msg,
									icon: "success",
									duration: 1500,
									mask: true,
									success() {
										uni.switchTab({
											url: "../index/index"
										})
										uni.setStorageSync('udata',res.data.data);
										uni.setStorageSync('isOpenFingerprint',res.data.data.isOpenFingerprint);
										uni.setStorageSync('isOpenGesture',res.data.data.isOpenGesture);
										uni.setStorageSync('already',res.data.data.already);
										uni.setStorageSync('challenge',res.data.data.challenge);
										uni.setStorageSync('email',res.data.data.email);
										uni.setStorageSync('head',res.data.data.head);
										uni.setStorageSync('id',res.data.data.id);
										uni.setStorageSync('inviteCode',res.data.data.inviteCode);
										uni.setStorageSync('isAdvancedRealName',res.data.data.isAdvancedRealName);
										uni.setStorageSync('isMerchant',res.data.data.isMerchant);
										uni.setStorageSync('isRealName',res.data.data.isRealName);
										uni.setStorageSync('level',res.data.data.level);
										uni.setStorageSync('mobile',res.data.data.mobile);
										uni.setStorageSync('status',res.data.data.status);
										uni.setStorageSync('token',res.data.data.token);
										uni.setStorageSync('nickname',res.data.data.nickname);
										
										setTimeout(function() {
											uni.reLaunch({
												url:'../index/index'
											})
					
										}, 1500)
					
					
									}
								})
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none",
									duration: 1500,
									mask: true,
									success() {
										This.text = that.$t('indexzhiwen.yanzhengshibai')
									}
								})
					
							}
					
					
							console.log(JSON.stringify(res))
					
					
						}
					
					})
				}, function(e){
					switch(e.code) {
						case e.AUTHENTICATE_MISMATCH:
							that.myAlert( this.$t('indexzhiwen.zwppsb'));
						break;
						case e.AUTHENTICATE_OVERLIMIT:
							plus.nativeUI.closeWaiting();//兼容Android平台关闭等待框
							that.myAlert(this.$t('indexzhiwen.ccxz'));
						break;
						default:
							plus.nativeUI.closeWaiting();//兼容Android平台关闭等待框
							that.myAlert( this.$t('indexzhiwen.zwsbsb'));
						break;
					}
				});
			}
		}
	}
</script>

<style>
	.title {
		font-size: 36upx;
		color: #8f8f94;
		text-align: center;
		width: 100%;
		height: 32px;
		display: block;
	}
</style>
