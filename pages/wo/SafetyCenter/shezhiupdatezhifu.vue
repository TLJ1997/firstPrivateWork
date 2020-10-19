<template>
	<view class="container hi-columns" :style="backgroundALL == '#272A33'?'background:#18253D;':'background:#F0F3F5;'">
		<!-- 标题栏 -->
		<view class="muen_header hi-columns" :style="'padding-top:'+statusBarH+'px;'">
			<view class="hi-rows hi-flex-vcenter  hi-space-between">
				<view class="hi-rows hi-flex-vcenter">
					<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'"
					 mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
				</view>
				<view class="hi-rows hi-flex-vcenter">
					<text :style="hb_status?'color: #242833;font-size: 24upx;':'color: #ffffff;font-size: 24upx;'" @click="loginType()"></text>
				</view>
			</view>
		</view>
		<view class="header_title_box hi-columns hi-flex-vcenter">
			<view class="header_item hi-rows hi-flex-vcenter" style="align-self: flex-start;">
				<text class="t1" :style="hb_status?'color: #242833;font-size: 48upx;':'color: #ffffff;font-size: 48upx;'">{{$t('wo.szzfmm')}}</text>
				<!-- <text class="t1" style="font-size: 22upx;color: #8792A8;align-self: flex-start;margin-top: 40upx;margin-left: 20upx;"></text> -->
			</view>
			<!-- <view class="header_item hi-columns" style="align-self: flex-start;margin-top: 40upx;">
				<text style="font-size: 48upx;color: #3A74FC;text-align: left;"></text>
				<text class="t1" style="font-size: 24upx;color: #8792A8;align-self: flex-start;margin-left: 20upx;"></text>
			</view> -->
		</view>




		<view class="hi-columns" style="margin-top: 60upx;padding: 0 60upx;box-sizing: border-box;">

			<view style="display: inline-flex; width: 100%; position: relative;">
				<view style="width:40%; height: 70upx; line-height: 70upx; font-size: 35upx;">{{$t('wo.xzyzfs')}}</view>
				<picker class="picker-item" style="width:60%;" mode="selector" :value="caindex" :range="xiyanzhuangs" @change="textChangeCation">
					<view v-model="xiayibu" style="width:90%; height: 70upx; line-height: 70upx; text-align: right;">{{xiyanzhuangs[caindex]}}</view>
				</picker>
			</view>
			<view class="input_item hi-rows hi-flex-vcenter" style="margin-top: 40upx;" :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);margin-bottom:40upx;':'border-bottom: 1upx solid rgba(255,255,255,.1);margin-bottom: 40upx;'">

				<view style="width:60%;">
					<input type="text" v-model="yanzhengma" style="width: 100%;color:#000; height:85upx; line-height:85upx; text-align: left; "
					 :placeholder="input_code" />
				</view>
				<button type="primary" :disabled="btn_state" @tap="fasongma(xiyanzhuangs[caindex])" style="width:40%; background: #007AFF; font-size: 30upx;height: 80upx; border-radius: 50upx; line-height: 80upx; margin-top:15upx; ">{{yzm_text}}</button>
			</view>
			<view class="input_item hi-rows hi-flex-vcenter" :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);margin-bottom: 80upx;':'border-bottom: 1upx solid rgba(255,255,255,.1);margin-bottom: 80upx;'">

				<input type="number" password="true" value="" maxlength="6" v-model="passwd1" @input="passwd1Change" :placeholder="input_numberpwd"
				 placeholder-style="color:#8792A8;" :style="hb_status?'color: #242833;flex:1;':'color: #ffffff;flex:1;'" />
				<image :src="hb_status?'../../../static/home/nav_icon_close_day.png':'../../../static/home/nav_icon_close_night.png'"
				 mode="" style="width:30upx;height: 30upx;" @click="delpasswd1()" v-show="passwd1!=''"></image>
			</view>
			<view class="input_item hi-rows hi-flex-vcenter" :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);margin-bottom: 80upx;':'border-bottom: 1upx solid rgba(255,255,255,.1);margin-bottom: 80upx;'">

				<input type="number" password="true" value="" maxlength="6" v-model="passwd2" @input="passwd2Change" :placeholder="input_qrmm"
				 placeholder-style="color:#8792A8;" :style="hb_status?'color: #242833;flex:1;':'color: #ffffff;flex:1;'" />
				<image :src="hb_status?'../../../static/home/nav_icon_close_day.png':'../../../static/home/nav_icon_close_night.png'"
				 mode="" style="width:30upx;height: 30upx;" @click="delpasswd2()" v-show="passwd2!=''"></image>
			</view>


			<view class="btns_box" @tap="baocun(xiyanzhuangs[caindex])" :style="passwd!=''&&passwd1!=''&&passwd2!=''?'background: #3A74FC;color: #FFFFFF;':''">{{$t('wo.qd')}}</view>

		</view>




	</view>
</template>

<script>
	var This;
	import md5 from '../../../static/js/md5.min.js'
	export default {
		data() {
			return {
				input_code:this.$t('wo.qsryzm'),
				input_numberpwd:this.$t('wo.qsrszmm'),
				input_qrmm:this.$t('wo.qqrmm'),
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				paddingBottom: 0, //判断苹果X底部高度
				passwd: '',
				passwd1: '',
				passwd2: '',
				caindex: 0,
				btn_state: false,
				xiyanzhuangs: [],
				yzm_text: this.$t('wo.hqyzm'),
				yanzhengma: ''

			}
		},
		onLoad() {
			this.xiyanzhuangs = []
			if (uni.getStorageSync('mobile') != '') {
				if (this.xiyanzhuangs.length == 0) {
					this.xiyanzhuangs = [uni.getStorageSync('mobile')]
				} else {
					this.xiyanzhuangs = this.xiyanzhuangs.concat(uni.getStorageSync('mobile'))
				}

			}
			if (uni.getStorageSync('email') != '') {
				if (this.xiyanzhuangs.length == 0) {
					this.xiyanzhuangs = [uni.getStorageSync('email')]
				} else {
					this.xiyanzhuangs = this.xiyanzhuangs.concat(uni.getStorageSync('email'))
				}
			}
			console.log(this.xiyanzhuangs)
			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight
					// console.log(JSON.stringify(res))
					console.log(This.windowHeight)

					var model = res.model
					if (model.search('iPhone X') != -1) {
						This.paddingBottom = 68;
					}

				}
			})

			var view = uni.createSelectorQuery().select(".muen_header");
			view.boundingClientRect(data => {
				// console.log("节点离页面顶部的距离为" + data.height);
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
		},
		methods: {
			baocun(zhanghao) {
				if (this.yanzhengma == '') {
					this.myAlert(this.$t('wo.qsryzm'))
					return false
				}
				if (this.passwd1 == '') {
					this.myAlert(this.$t('wo.qsrxmm'))
					return false
				}
				if (!reg.test(this.passwd1)) {
					this.myAlert(this.$t('wo.mmznslwsz'))
					return false
				}
				if (this.passwd1 != this.passwd2) {
					this.myAlert(this.$t('wo.lcmmsrbyz'))
					return false
				}
				uni.showLoading({
					title: this.$t('wo.xgz'),
					mask: true
				})
				var quanbu = {
					account: zhanghao,
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					verifyCode: this.yanzhengma,
					newPayPwd: this.passwd1
				}
				console.log(quanbu)
				uni.request({
					url: this.websiteUrl + 'user/changePayPwd',
					method: "POST",
					data: quanbu,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success: (res) => {
						uni.hideLoading()
						console.log(res)
						if (res.data.code == 200) {
							uni.showToast({
								title:res.data.msg
							});
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)

						} else {
							this.myAlert(res.data.msg)

						}





					}

				})
			},
			fasongma(zhanghao) {
				console.log(zhanghao)


				var Regx = /^[A-Za-z0-9]*$/;
				if (Regx.test(zhanghao)) {
					console.log('手机')
					this.fs_yzm(zhanghao)

				} else {
					console.log('邮箱')
					this.youxiang_yzm(zhanghao)

				}



			},
			fs_yzm(zhanghao) {
				let This=this;
				console.log(zhanghao)
				if (this.btn_state == false) {
					var shoudata = {
						account: zhanghao,
						privateKey: md5(zhanghao + 'XOUdGYC62DHkMVNL')
					}
					console.log(shoudata)
					uni.request({
						url: this.websiteUrl + "user/sendSms",
						dataType: "json",
						header: {
							'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh' //自定义请求头信息
						},
						data: shoudata,
						method: "POST",
						success: (res) => {
							console.log(res.data)

							if (res.data.code == 200) {

								uni.showToast({
									title: res.data.msg,
									icon: "none",
									duration: 1000
								});
								this.btn_state = true;
								var sj_num = 60;
								var that = this
								var settime = setInterval(function() {
									that.yzm_text = This.$t('wo.fscg')+"(" + sj_num + ")";
									if (sj_num == 0) {
										that.btn_state = false;
										that.yzm_text = This.$t('wo.hqyzm');
										clearInterval(settime);
									}
									// console.log(sj_num);
									// console.log(that.btn_state)
									// console.log(that.yzm_text)
									sj_num--;
								}, 1000)

							} else {
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
			youxiang_yzm(zhanghao) {
				let This=this;
				console.log(zhanghao)
				if (this.btn_state == false) {
					var lailaiyou = {
						account: zhanghao,
						privateKey: md5(zhanghao + 'XOUdGYC62DHkMVNL'),
						state: 1
					}
					console.log(lailaiyou)
					uni.request({
						url: this.websiteUrl + "user/sendEmail",
						dataType: "json",
						header: {
							'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh' //自定义请求头信息
						},
						data: lailaiyou,
						method: "POST",
						success: (res) => {
							console.log(res.data)

							if (res.data.code == 200) {

								uni.showToast({
									title: res.data.msg,
									icon: "none",
									duration: 1000
								});
								this.btn_state = true;
								var sj_num = 60;
								var that = this
								var settime = setInterval(function() {
									that.yzm_text = This.$t('wo.fscg')+"(" + sj_num + ")";
									if (sj_num == 0) {
										that.btn_state = false;
										that.yzm_text = This.$t('wo.hqyzm');
										clearInterval(settime);
									}
									// console.log(sj_num);
									// console.log(that.btn_state)
									// console.log(that.yzm_text)
									sj_num--;
								}, 1000)

							} else {
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
			textChangeCation(evt) { //
				this.caindex = parseInt(evt.mp.detail.value);
				console.log(this.caindex)
				this.btn_state == false
			},
			delpasswd() {
				this.passwd = '';
			},
			passwdChange(e) { //输入旧密码

				this.passwd = e.detail.value


			},
			delpasswd1() {
				this.passwd1 = '';
			},
			passwd1Change(e) { //输入新密码

				this.passwd1 = e.detail.value


			},
			delpasswd2() {
				this.passwd2 = '';
			},
			passwd2Change(e) { //输入重新新密码

				this.passwd2 = e.detail.value


			},
			Login_btn() {
				let This=this;

				if (this.passwd != '' && this.passwd1 != '' && this.passwd2 != '' && this.passwd2 == this.passwd1) {

					uni.showToast({
						title: This.$t('wo.szwc'),
						icon: "none",
						mask: true,
						duration: 1500
					})

				} else {
					uni.showToast({
						title:This.$t('wo.sjhmgscw'),
						icon: "none",
						mask: true,
						duration: 1500
					})

				}


			},
			Back() {
				uni.navigateBack({ //后退
					delta: 1
				})
			},
			tab_init() {
				if (this.backgroundALL == '#272A33') {
					this.hb_status = false;
					uni.setNavigationBarColor({
						frontColor: '#ffffff',
						backgroundColor: '#272A33'

					})
					uni.setTabBarStyle({
						backgroundColor: '#272A33',
						"color": "#737373",
						"selectedColor": "#267cc0"
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
						"selectedColor": "#267cc0"
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

	.br {
		border-radius: 20upx;
		overflow: hidden;
	}

	.p30 {
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.borderB1 {
		width: 100%;
		height: 1upx;
		background: rgba(255, 255, 255, .1);
		margin: 30upx 0;
	}

	.mt30 {
		margin-top: 30upx;
		padding-bottom: 20upx;
	}

	.b {
		color: #242833;
	}

	.h {
		color: #FFFFFF;
	}

	.content {
		box-sizing: border-box;
		width: 670upx;
		margin: 0 40upx;
		padding-bottom: 40upx;
		flex: 1;
		margin-top: 20upx;
	}

	.container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
	}

	.muen_header>view {
		height: 88upx;
		padding: 0 40upx;
		box-sizing: border-box;
	}

	.header_title_box {
		padding: 0 40upx;
		box-sizing: border-box;
		margin: 20upx 0;
	}

	.header_title_box .header_item {
		text-align: center;
	}

	.header_title_box .header_item .t1 {
		font-size: 48upx;
		color: #FFFFFF;
		font-weight: bold;
	}

	.header_title_box .header_item .t2 {
		color: #8792A8;
		font-size: 22upx;
		margin-left: 19upx;
	}

	.header_title_box .header_item .h_btn {
		color: #3A74FC;
		border: 1upx solid #3A74FC;
		width: 120upx;
		height: 58upx;
		border-radius: 29upx;
		line-height: 58upx;
	}



	.input_item {
		height: 104upx;
		line-height: 104upx;
		margin-bottom: 60upx;
	}

	.input_item input {
		flex: 1;
		padding-right: 30upx;
		box-sizing: border-box;
		color: #FFFFFF;
		font-size: 30upx;
	}

	.input_item .yzm_btn {
		color: #8792A8;
		font-size: 30upx;
	}

	.input_item .info {
		color: #8792A8;
		font-size: 30upx;
	}

	.input_item .dtyzm {
		color: #8792A8;
		font-size: 30upx;
		width: 180upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
		background: rgba(192, 196, 204, .2);
		border-radius: 30upx;
	}

	.reg_btn_box {
		margin-bottom: 100upx;
	}

	.reg_btn_box .reg_btn {
		color: #4966F5;
		font-size: 22upx;
	}

	.btns_box {
		width: 100%;
		height: 100upx;
		border-radius: 50upx;
		background: #8DAFFC;
		line-height: 100upx;
		text-align: center;
		font-size: 36upx;
		color: #FFFFFF;
		transition: all .3s;
	}


	.alert_maks {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99998;
		transition: all .3s;
	}

	.alert_yichu_box {
		background: #FFFFFF;
		width: 630upx;
		display: inline-flex;
		position: fixed;
		z-index: 99999;
		top: 50%;
		left: 60upx;
		margin-top: -265upx;
		padding: 40upx;
		box-sizing: border-box;
		border-radius: 20upx;
		transition: all .3s;
	}

	.alert_yichu_box .title {
		width: 100%;
		font-size: 36upx;
		text-align: center;
		margin-bottom: 50upx;
	}

	.alert_yichu_box .con {
		color: #6E778A;
		font-size: 30upx;
		line-height: 48upx;
		margin-bottom: 55upx;
	}

	.alert_yichu_box .btn {
		width: 240upx;
		height: 70upx;
		line-height: 70upx;
		border-radius: 35upx;
		text-align: center;
		background: #3A74FC;
		font-size: 32upx;
		color: #FFFFFF;
		margin-left: 155upx;
	}

	.alert_maks.active {
		display: none;
	}

	.alert_yichu_box.active {
		display: none;
	}
</style>
