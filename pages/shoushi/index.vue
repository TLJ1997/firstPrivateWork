<template>
	<view style="background: url(../../static/jiesuo.png);background-size: 100% 100%; height: 100vh;">
		<view class="muen_header hi-columns" :style="'padding-top:'+statusBarH+'px;'">
			<view class="hi-rows hi-flex-vcenter  hi-space-between">
				<view class="hi-rows hi-flex-vcenter" style="margin-top: 30upx;margin-left: 30upx;">
					<image :src="hb_status?'../../static/home/nav_icon_back_day.png':'../../static/home/nav_icon_back_night.png'"
					 mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
				</view>
				
			</view>
		</view>
		<view style="padding-top:150upx;">
			<view class="uni-text">{{text}}</view>
			<view style="margin-top:30upx;">
				<mpvue-gesture-lock :containerWidth="590" :cycleRadius="70" @end="onEnd" :password="password"></mpvue-gesture-lock>
			</view>
		</view>
		<view style="width: 100%; padding: 30upx;box-sizing: border-box;" v-show="yanbuyan">
			<view class="btns_box" @tap="wancheng()" style="background: #3A74FC;color: #FFFFFF; margin-top: 10upx;">{{$t('shoushi.xyb')}}</view>
		</view>
		<view class="grace-margin">
			<view class="grace-shade grace-shade-black" v-if="show2" >
				<view class="grace-shade-msg grace-animate" style="border-radius: 30upx;">
					<view style="display: inline-flex; width: 100%; position: relative;">
						<view style="width:100%; height: 70upx; line-height: 70upx; font-size: 35upx;">{{$t('shoushi.xzyzfs')}}</view>
						<view class="close-btn grace-icons icon-close3" style="font-size: 38upx; margin-top: 15upx; position: absolute; right: 15upx;" @tap="beifen"></view>
					</view>
					<view class="body">						
						<view style="width: 100%;display: inline-flex;padding: 30upx;box-sizing: border-box;">
							<view style="width: 30%;line-height: 70upx;">{{$t('shoushi.xzfs')}}</view>
							<picker class="picker-item" style="width:70%;" mode="selector" :value="caindex" :range="xiyanzhuangs" @change="textChangeCation">
								<view v-model="xiayibu" style="width:90%; background-color: #FFF; border-radius: 50upx; height: 70upx; line-height: 70upx; text-align: center;">{{xiyanzhuangs[caindex]}}</view>
							</picker>
							
						</view>
						<view style="width:100%;padding: 30upx;box-sizing: border-box; text-align: center;">
							<input type="text" v-model="yanzhengma" style="border: 1upx solid #ececec;border-radius: 50upx; text-align: center; width: 100%; height: 75upx; line-height: 75upx;background: #FFF;" :placeholder="input_code" />
						</view>
						<view style="width: 100%; padding: 30upx;box-sizing: border-box; display: inline-flex;">
							<button type="primary" :disabled="btn_state" @tap="fasongma(xiyanzhuangs[caindex])" style="width: 49%; background: #007AFF; font-size: 30upx;height: 80upx; border-radius: 50upx; line-height: 80upx; margin-top: 35upx; ">{{yzm_text}}</button>
							<view style="width: 2%;"></view>
							<button type="primary" @tap="baocun(xiyanzhuangs[caindex])" style="width: 49%;background: #007AFF; font-size: 30upx;height: 80upx; border-radius: 50upx; line-height: 80upx; margin-top: 35upx; ">{{$t('shoushi.bcss')}}</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mpvueGestureLock from '../../components/mpvueGestureLock';
	import md5 from '../../static/js/md5.min.js'
	var This;
	export default {
		components: {
			mpvueGestureLock
		},
		data() {
			return {
				input_code:this.$t('shoushi.yzm'),
				title: this.$t('shoushi.ssta'),
				password: [],
				show2:false,
				text: this.$t('shoushi.qsdss'),
				status: 0,
				statusBarH: '',
				show3: false,
				header_H: 0,
				btn_state:false,
				windowHeight: 0,
				yanbuyan:false,
				xiayibu:this.$t('shoushi.qxz'),
				caindex:0,
				xiyanzhuangs:[],
				yzm_text:this.$t('shoushi.hqyzm'),
				yanzhengma:''
			}
		},
		onLoad(e) {
			this.xiyanzhuangs = []
			if (uni.getStorageSync('mobile') != '') {
				if (this.xiyanzhuangs.length == 0) {
					this.xiyanzhuangs = [uni.getStorageSync('mobile')]
				} else{
					this.xiyanzhuangs = this.xiyanzhuangs.concat(uni.getStorageSync('mobile'))
				}
					
			} 
			if(uni.getStorageSync('email') != ''){
				if (this.xiyanzhuangs.length == 0) {
					this.xiyanzhuangs = [uni.getStorageSync('email')]
				} else{
					this.xiyanzhuangs = this.xiyanzhuangs.concat(uni.getStorageSync('email'))
				}
			}
			console.log(this.xiyanzhuangs)
			This=this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight
					
			
				}
			})
			This = this;
			if (uni.getStorageSync('already') == true) {
				this.yanbuyan = false
				this.status = 1
			}else{
				this.yanbuyan = true
				this.status = 0
			}


		},
		methods: {
			baocun(zhanghao){
				let This=this;
				if(this.yanzhengma == ''){
					this.myAlert(This.$t('shoushi.qsr_code'))
					return false
				}
				uni.showLoading({
					title: This.$t('shoushi.szz'),
					mask: true
				})
				var quanbu = {
					account:zhanghao,
					token:uni.getStorageSync('token'),
					userId:uni.getStorageSync('id'),
					verifyCode:this.yanzhengma,
					gesturePwd:this.password
				}
				console.log(quanbu)
				uni.request({
					url: this.websiteUrl + 'user/changeGesturePwd',
					method: "POST",
					data:quanbu,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success: (res) => {
						uni.hideLoading()
						console.log(res)
						if (res.data.code == 200) {
							this.myAlert(res.data.msg)
							setTimeout(function(){
								uni.navigateBack({
									delta:2
								})
							},1500)
							uni.request({
								url: this.websiteUrl + 'user/openOrCloseGesture',
								method: 'POST',
								data: {
									token:uni.getStorageSync('token'),
									userId:uni.getStorageSync('id'),
									state:1
								}, 
								header: {
									'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
								},
								success: (res) => {
									console.log(res)
									this.myAlert(res.data.msg);
									if (res.data.code == 200) {
										uni.setStorageSync('isOpenGesture',1);
										uni.setStorageSync('already',true);
									} else{
										
									}
									
								},
								fail: () => {
									
								}
							});
						}else{
							this.myAlert(res.data.msg)
							uni.setStorageSync('already',false);
							uni.setStorageSync('isOpenGesture',0);
						}
				
				
						
				
				
					}
				
				})
			},
			wancheng(){
				let This=this;
				if (this.text == This.$t('shoushi.sssdwc')) {
					this.show2 = true
					
				} else{
					this.myAlert(This.$t('shoushi.qxsdss'))
				}
			},
			beifen(){
				this.show2 = false
			},
			fasongma(zhanghao){
				let This=this;
				console.log(zhanghao)
				if (this.text == This.$t('shoushi.sssdwc')) {
					
					var Regx = /^[A-Za-z0-9]*$/;
					           if (Regx.test(zhanghao)) {
									console.log('手机')
									this.fs_yzm(zhanghao)
					               
					           }
					           else {
									console.log('邮箱')
									this.youxiang_yzm(zhanghao)
					               
					           }
				} else{
					this.myAlert(This.$t('shoushi.qxsdss'))
				}
				 
				
			},
			fs_yzm(zhanghao){
				let This=this;
				console.log(zhanghao)
				if(this.btn_state==false){
					var shoudata = {
							account:zhanghao,
							privateKey:md5(zhanghao + 'XOUdGYC62DHkMVNL') 
							}
					console.log(shoudata)
					uni.request({
						url:this.websiteUrl+"user/sendSms",
						dataType:"json",
						header: {
								'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh' //自定义请求头信息
							},
						data:shoudata,
						method:"POST",
						success: (res) => { 
							console.log(res.data)
							
							if(res.data.code==200){
								
								uni.showToast({
									title: res.data.msg,
									icon: "none",
									duration: 1000
								});
								this.btn_state=true;
								var sj_num = 60;
								var that = this
								var settime=setInterval(function(){
									that.yzm_text = "发送成功("+sj_num+")";
									if(sj_num == 0){
										that.btn_state=false;
										that.yzm_text=This.$t('shoushi.hqyzm');
										clearInterval(settime);
									}
									// console.log(sj_num);
									// console.log(that.btn_state)
									// console.log(that.yzm_text)
									sj_num--;
								},1000)
								
							}else{
								uni.showToast({
									title: res.data.msg,
									icon: "none",
									duration: 1000
								});
								
							}
				
						}
					})
					
					
					
					
				}
			},
			youxiang_yzm(zhanghao){
				let This=this;
				console.log(zhanghao)
					if(this.btn_state==false){
						var lailaiyou = {
							email:zhanghao,
							privateKey:md5(zhanghao + 'XOUdGYC62DHkMVNL'),
							state:1
						}
						console.log(lailaiyou)
						uni.request({
							url:this.websiteUrl+"user/sendEmail",
							dataType:"json",
							header: {
									'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh' //自定义请求头信息
								},
							data:lailaiyou,
							method:"POST",
							success: (res) => {
								console.log(res.data)
								
								if(res.data.code==200){
									
									uni.showToast({
										title: res.data.msg,
										icon: "none",
										duration: 1000
									});
									this.btn_state=true;
									var sj_num = 60;
									var that = this
									var settime=setInterval(function(){
										that.yzm_text = "发送成功("+sj_num+")";
										if(sj_num == 0){
											that.btn_state=false;
											that.yzm_text=This.$t('shoushi.hqyzm');
											clearInterval(settime);
										}
										// console.log(sj_num);
										// console.log(that.btn_state)
										// console.log(that.yzm_text)
										sj_num--;
									},1000)
									
								}else{
									uni.showToast({
										title: res.data.msg,
										icon: "none",
										duration: 1000
									});
									
								}
											
							}
						})
						
					}
			},
			textChangeCation(evt) {//
				this.caindex = parseInt(evt.mp.detail.value);
				console.log(this.caindex)
				this.btn_state == false
			},
			Login_btn(){
				
			},
			Back() {
				uni.navigateBack({ //后退
					delta: 1
				})
			},
			onEnd(data) {
				let This=this;
				console.log(This.status)
				console.log(data)
				if(This.status == 0){
					if (this.password.length) {
						if (this.password.join('') === data.join('')) {
							this.text = This.$t('shoushi.sssdwc')
							
							
						} else {
							this.text = This.$t('shoushi.ssbyz')
							this.password = []
						}
					} else {
						this.text = This.$t('shoushi.qrss')
						this.password = data;
						console.log(data)
					}
				}else{
					this.yzerjipasswd(data);
				}
			},
			seterjipasswd(password) { //设置二级密码
			let This=this;
				uni.showLoading({
					title: This.$t('shoushi.szz'),
					mask: true
				})
				uni.request({
					url: 'http://47.111.172.84:81/app/user/shoushipassword',
					method: "POST",
					data: {
						token: uni.getStorageSync('udata').token,
						password: password
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success(res) {
						uni.hideLoading()
						if (res.data.status == 1) {
							uni.showToast({
								title: res.data.msg,
								icon: "success",
								duration: 1500,
								mask: true,
								success() {
									uni.setNavigationBarTitle({
										title:This.$t('shoushi.yzejmm')
									})
									This.status = 1;
									This.text = This.$t('shoushi.yzejmm')

								}
							})
						}


						console.log(JSON.stringify(res))


					}

				})


			},
			yzerjipasswd(password) {
				let This=this;
				uni.showLoading({
					title:This.$t('shoushi.yzz'),
					mask: true
				})
				uni.request({
					url: this.websiteUrl + 'user/expiredLogin',
					method: "POST",
					data: {
						userId: uni.getStorageSync('id'),
						gesture: password
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success(res) {
						uni.hideLoading()
						console.log(password)
						if (res.data.code == 200) {
							uni.showToast({
								title: res.data.msg,
								icon: "success",
								duration: 1500,
								mask: true,
								success() {
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
									This.text = This.$t('shoushi.cxyz')
								}
							})

						}


						console.log(JSON.stringify(res))


					}

				})
			}


		}
	}
</script>

<style>
	.uni-text {
		font-size: 30upx;
		text-align: center;
		
		color: #FFF;
	}
	.btns_box {
		width: 100%;
		height: 100upx;
		border-radius: 50upx;
		background: rgba(192, 196, 204, .2);
		line-height: 100upx;
		text-align: center;
		font-size: 36upx;
		color: #8792A8;
		transition: all .3s;
	}
</style>
