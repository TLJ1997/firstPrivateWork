<template>
	<view class="content" style="height:100vh;width: 100%; box-sizing: border-box; float: left;">
		<!-- 标题栏 -->
		<view class="muen_header hi-columns" :style="'padding-top:' + statusBarH + 'px;'">
			<!-- <view class="hi-rows hi-flex-vcenter  hi-space-between">
				<view class="hi-rows hi-flex-vcenter">
					<image
						:src="hb_status ? '../../static/home/nav_icon_back_day.png' : '../../static/home/nav_icon_back_night.png'"
						mode=""
						style="width:46upx;height: 46upx;"
						@click="Back()"
					></image>
				</view>
				<view class="hi-rows hi-flex-vcenter"><text :style="hb_status ? 'color: #242833;font-size: 24upx;' : 'color: #ffffff;font-size: 24upx;'"></text></view>
			</view> -->
		</view>
		<view class="header_title_box hi-columns" style="padding: 0 30rpx;">
			<view class="header_item hi-rows hi-space-between">
				<view class="hi-rows hi-flex-vcenter">
					<image
						:src="hb_status ? '../../static/home/nav_icon_back_day.png' : '../../static/home/nav_icon_back_night.png'"
						mode=""
						style="width:46upx;height: 46upx;"
						@click="Back()"
					></image>
				</view>
				<text class="t1" :style="hb_status ? 'color: #242833;font-size: 36upx;' : 'color: #ffffff;font-size: 36upx;'">{{$t('zhifu.zf')}}</text>
				<text></text>
			</view>
			<!-- <view class="header_item hi-rows" style="align-self: flex-start;margin-top: 40upx;">
				<text style="font-size: 48upx;color: #3A74FC;">中国</text>
			</view> -->
		</view>
		<view class="tab_box" style="padding-top: 30upx;">
			<view :class="tab_status == 1 ? 'tab_lst show' : 'tab_lst'">
				<form @submit="formSubmit">
					<view view class="lst m20" style="padding-top: 0upx;">
						<view style="width: 100%; background-color: #FFF;border-radius: 20upx; padding: 30upx; box-sizing: border-box;">
							<view class="title">
								<view class="title_dz" style="color: #000; font-size: 33upx;">{{$t('zhifu.srje')}}</view>
								<view style="width:100%; display: inline-flex; margin-top: 30upx; margin-bottom: 30upx;">
									<!-- <view style="line-height:70upx;">￥</view> -->
									<input class="dz" name="num" v-model="num" type="number" :placeholder="input_Amount" />
									<!-- <view @tap="nextStep()" style="width: 90upx;height: 90upx;box-sizing: border-box; color: #FFFFFF;padding-top: 5upx;padding-left: 5upx;border-radius: 14upx;z-index:1;">
										<image src="../../static/wallet/icon_scan.png" mode="" style="height: 60upx;width: 60upx;"></image>
									</view> -->
								</view>
							</view>
						</view>
					</view>
					<view style="width: 100%;height: 120upx;box-sizing: border-box;padding:20upx 30upx 20upx 30upx;">
						<button @tap="xiayibu" class="btns grace-gtbg-blue" style="background-color: #3e9af0; width:100%;color: #FFF; font-size: 30upx;">{{$t('zhifu.xyb')}}</button>
					</view>
					<view view class="lst m20" style="padding-top: 0upx;">
						<view style="width: 100%; background-color: #FFF;border-radius: 20upx; padding: 30upx; box-sizing: border-box;">
							<view style="width: 100%;">{{$t('zhifu.sm')}}：</view>
							<view style="width: 100%;">{{$t('zhifu.zdsmzfyyq')}}</view>
							<!-- <view style="width: 100%;">每个账号单笔支付限额1000元</view> -->
							<!-- <view style="width: 100%;">每天限额支付5次</view> -->
							<view style="width: 100%;">{{$t('zhifu.dbsxf')}}</view>
							<!-- <view style="margin-top: 50upx;">例如:</view>
							<view style="width: 100%;">扫码100元，商家实际到账100元</view>
							<view style="width: 100%;">扫码扣除价值100元的HGA</view>
							<view style="width: 100%;">加上手续费5个HGA和5%价值的HGA</view> -->
						</view>
						<!-- 说明:
							最低扫码10个币起
							每个账户每天限额1000元
							手续费单笔5个币+5%的手续费

							例如:
							扫码100元，商家实际到账100元
							扫码扣除价值100元的HGA
							加上手续费5个HGA和5%价值的HGA -->
					</view>
					<graceBottomDialog :show="show2">
						<view slot="btns">
							<view
								class="grace-btdialog-btns"
								style="width: 100%; display: inline-flex;background:#f8f8f8; height: 90upx; box-sizing: border-box;padding-left: 10upx; padding-right: 10upx;"
							>
								<view @tap="closeDialog2" style="line-height: 90upx; width: 50%;">{{$t('zhifu.qx')}}</view>
								<view @tap="confirm2" style="color:#3688FF;line-height: 90upx;width: 50%;text-align: right;">
									<text style="padding:10upx 30upx 10upx 30upx;background-color: #00BA62;color: #FFF;border-radius: 10upx;">{{$t('zhifu.ljfk')}}</text>
								</view>
							</view>
						</view>
						<view slot="content">
							<view style="width: 100%;padding: 30upx; box-sizing: border-box;">
								<input
									class="text"
									type="password"
									v-model="mima"
									:placeholder="input_jymm"
									style="margin-top: 30upx;height: 60upx; font-weight: bold; background-color: #ececec;border: 1upx solid #f5f5f5; width: 100%;border-radius: 40upx;text-align: center;"
								/>
							</view>
							<view style="width: 100%;padding: 30upx; box-sizing: border-box;display: inline-flex;">
								<view style="width:30%;"><view style="width: 100%;">{{$t('zhifu.jylx')}}</view></view>
								<view style="width:70%;">
									<view style="width: 100%;text-align: right;color: #00BA62;">{{ paySymbol }}</view>
								</view>
							</view>
							<view style="width: 100%;padding: 30upx; box-sizing: border-box;display: inline-flex;">
								<view style="width:30%;"><view style="width: 100%;">{{$t('zhifu.fklx')}}</view></view>
								<view style="width:70%;">
									<view style="width: 100%;text-align: right;color: #00BA62;">{{ coinname }}</view>
								</view>
							</view>
							<view style="width: 100%;padding:30upx; box-sizing: border-box;display: inline-flex;">
								<view style="width:30%;"><view style="width: 100%;">{{$t('zhifu.fksl')}}</view></view>
								<view style="width:70%;">
									<view style="width: 100%;text-align: right;color: #00BA62;">{{ numxin }}</view>
								</view>
							</view>
							<view style="width: 100%;padding: 30upx; box-sizing: border-box;display: inline-flex;">
								<view style="width:30%;"><view style="width: 100%;">{{$t('zhifu.sxf')}}</view></view>
								<view style="width:70%;">
									<view style="width: 100%;text-align: right;color: #00BA62;">{{ sxf }}</view>
								</view>
							</view>
							<view style="width: 100%;padding: 30upx; box-sizing: border-box;display: inline-flex;">
								<view style="width:30%;"><view style="width: 100%;">{{$t('zhifu.zfksl')}}</view></view>
								<view style="width:70%;">
									<view style="width: 100%;text-align: right;color: #00BA62;">{{ totalnum }}</view>
								</view>
							</view>
						</view>
					</graceBottomDialog>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
import graceBottomDialog from '../../graceUI/components/graceBottomDialog.vue';
export default {
	components: {
		graceBottomDialog: graceBottomDialog
	},
	data() {
		return {
			input_Amount:this.$t('zhifu.qsrje'),
			input_jymm:this.$t('zhifu.qsrjymm'),
			hb_status: true,
			statusBarH: '',
			paddingBottom: 0, //判断苹果X底部高度
			show2: false,
			tab_status: 1,
			name: '',
			num: '',
			coinid: '',
			coinaddr: '',
			total: '',
			timer_status: true,
			count: 0,
			saotext: '',
			shuliang: '',
			mima: '',
			yue: '',
			shouxufei: '',
			backgroundALL: '',
			cibackgroundALL: '',
			colorALL: '',
			userToken: uni.getStorageSync('token'),
			beizhu: '',
			coinname: '',
			numxin: '',
			sxf: '',
			totalnum: '',
			paySymbol:''
		};
	},
	onLoad(e) {
		var This = this;
		// 接收二维码内容
		This.saotext = JSON.parse(decodeURIComponent(e.codeText));
		console.log('saotext:' + This.saotext);

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
	onShow() {},
	onHide() {
		this.count = 0;
	},
	methods: {
		Back() {
			uni.navigateBack({
				//后退
				delta: 1
			});
		},
		closeDialog2: function() {
			this.show2 = false;
			this.num = '';
			this.numxin = '';
			this.mima = '';
			this.saotext = '';
			this.totalnum = '';
		},
		confirm2: function() {
			if (this.mima == '') {
				uni.showToast({
					title: this.$t('zhifu.qsrjymm'),
					icon: 'none',
					duration: 1500
				});
				return false;
			}
			var that = this;
			uni.showModal({
				title:  that.$t('zhifu.xtts'),
				content: that.$t('zhifu.qdfkm'),
				showCancel: true,
				success: function(res) {
					if (res.confirm) {
						uni.showLoading({
							title:  that.$t('zhifu.qsd'),
							mask: true
						});
						var zhuangming = {
							token: uni.getStorageSync('token'),
							userId: uni.getStorageSync('id'),
							amount:that.num,
							url:that.saotext,
							payPwd:that.mima
						};
						console.log("zhuangming:"+JSON.stringify(zhuangming));
						uni.request({
							url: that.websiteUrlzh + 'afd/saoma', //仅为示例，并非真实接口地址。
							method: 'POST',
							data: zhuangming,
							header: {
								'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
							},
							success: res => {
								uni.hideLoading();
								console.log("支付:"+JSON.stringify(res));
								that.myAlert(res.data.msg);

								that.closeDialog2();
								that.num = '';
								that.mima = '';
								that.numxin = '';
								that.saotext = '';
								that.totalnum = '';

								if (res.data.code == 402) {
									uni.reLaunch({
										url: '../login/login'
									});
								}
								if(res.data.code == 200){
									that.Back();
								}
							},complete(e) {
								// console.log("支付complete:"+JSON.stringify(e));
							}
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
						// 跳转至首页
						// uni.navigateTo({
						// 	url:'../index/index'
						// })
					}
				}
			});
		},
		formSubmit(e) {
			console.log(e);

			if (toaddr == '') {
				uni.showToast({
					title:  this.$t('zhifu.qsrzzzdz'),
					icon: 'none',
					duration: 1500
				});
				return false;
			}
		},
		hqjd() {},
		xiayibu() {
			let This = this;
			// 检测是否绑定支付密码
			uni.request({
				url: This.websiteUrl + 'user/isSettingPayPassword', //仅为示例，并非真实接口地址。
				method: 'GET',
				data: {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id')
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: ress => {
					console.log('xiayibu ress.data', JSON.stringify(ress.data));
					// 已绑定支付密码
					if (ress.data.code == 200) {
						if (ress.data.data) {
							if (This.num == '') {
								uni.showToast({
									title: This.$t('zhifu.qsrje'),
									icon: 'none',
									duration: 1500
								});
								return false;
							}
							if (This.num <= 0) {
								uni.showToast({
									title: This.$t('zhifu.qsrzqje'),
									icon: 'none',
									duration: 1500
								});
								return false;
							} else {
								console.log("---getPay----");
								This.getPay();
								console.log("---getPay----");
								// this.show2 = true;
							}
						}
						// 未绑定支付密码
						else {
							uni.showModal({
								title: This.$t('zhifu.xtts'),
								content:This.$t('zhifu.qbdzfmm'),
								showCancel: false,
								success: function(res) {
									//console.log(res);
									if (res.confirm) {
										uni.navigateTo({
											url: '../wo/SafetyCenter/shezhiupdatezhifu'
										});
									} else {
									}
								}
							});
							return false;
						}
					}
					else if (ress.data.code == 402) {
						uni.reLaunch({
							url: '../login/login'
						});
					} else {
						console.log('请求出错:' + JSON.stringify(ress.data));
					}
				},
				fail(e) {
					console.log('未绑定支付密码:' + e);
				}
			});
		},
		getPay(){
			
			console.log("---getPay 进入----");
			let This = this;
			let requestParams = {
				token: uni.getStorageSync('token'),
				userId: uni.getStorageSync('id'),
				amount:This.num,
				url:This.saotext
				
			}
			console.log('参数:'+JSON.stringify(requestParams))
			uni.request({
				url: This.websiteUrlzh + 'afd/getPay', //仅为示例，并非真实接口地址。
				method: 'GET',
				data: requestParams,
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: ress => {
					console.log('getPay requestParams:'+JSON.stringify(requestParams));
					console.log('getPay ress', JSON.stringify(ress));
					if (ress.data.code == 200) {
						// 支付类型
						This.coinname =  ress.data.data.payType;
						// 
						This.numxin = ress.data.data.payAmount;
						//
						This.totalnum = ress.data.data.totalNum;
						// 手续费
						This.sxf = ress.data.data.fee;
						
						This.paySymbol = ress.data.data.paySymbol;
						This.show2 = true;
						console.log('getPay res.data:' + JSON.stringify(ress.data));
					} else {
						console.log('get Pay 请求出错:' + JSON.stringify(ress));
					}
				},complete(e){
					console.log("get Pay complete:"+JSON.stringify(e));
				}
			});
		},
		// 验证支付密码是否正确
		chekPayPassword() {
			var This = this;
			uni.request({
				url: This.websiteUrl + 'user/verificationPayPassWord', //仅为示例，并非真实接口地址。
				method: 'GET',
				data: {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					payPassWord: This.mima
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: ress => {
					console.log('ress.data', JSON.stringify(ress.data));
					// 支付密码正确
					if (ress.data.code == 200) {
						if (ress.data.data) {
							// 直接支付
							// This.requestPay();
						} else {
							uni.showModal({
								title:This.$t('zhifu.xtts'),
								content:This.$t('zhifu.zfmmbzq'),
								showCancel: false,
								success: function(res) {}
							});
						}
					} else {
						console.log('请求出错:' + JSON.stringify(ress.data));
					}
				}
			});
		},
		// 请求支付
		requestPay() {
			var This = this;
			// 请求支付
			uni.request({
				url: This.webUrl + '/api/user/smpayinfo', //仅为示例，并非真实接口地址。
				method: 'GET',
				data: {
					num: This.num
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
					Authorization: This.userToken
				},
				success: ress => {
					console.log('ress.data', JSON.stringify(ress.data));
					if (ress.data.status == 1000) {
						This.coinname = ress.data.data.coinname;
						This.numxin = ress.data.data.num;
						This.sxf = ress.data.data.sxf;
						This.totalnum = ress.data.data.totalnum;
						This.show2 = true;
					}
					if (ress.data.code == 444) {
						uni.reLaunch({
							url: '../login'
						});
					}
				}
			});
		}
	}
};
</script>

<style>
.grace-select-tags {
	padding: 30upx;
}
.grace-select-tags checkbox-group,
.grace-select-tags radio-group {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
}
.grace-select-tags label {
	display: block;
	width: 31.3%;
	overflow: hidden;
	padding: 20upx 0;
	text-align: center;
	height: 50upx;
	line-height: 50upx;
	margin: 6px 1%;
	background: #ffffff;
	font-size: 26upx;
	border-radius: 8upx;
}
.grace-select-tags label checkbox,
.grace-select-tags label radio {
	display: none;
}
.grace-checked {
	background: #e76b61 !important;
	color: #ffffff;
}
page {
	height: 100%;
	background: #fff;
}

.content {
	height: 100%;
	width: 100%;
	background: #eff2fe;
	box-sizing: border-box;
}

.tab_nav {
	width: 100%;
	height: 72upx;
	background: #fff;
	padding: 0 30upx;
	box-sizing: border-box;
}

.tab_nav .tab {
	width: 100%;
	float: left;
	height: 100%;
	height: 72upx;
	line-height: 72upx;
	text-align: center;
	border-bottom: 1px solid #fff;
	box-sizing: border-box;
}

.tab_nav .tab text {
	font-size: 34upx;
	color: #6d6d6d;
	color: #d3b581;
}

.tab_nav .tab.active {
	border-bottom: 1px solid #fff;
}

.tab_nav .tab.active text {
	color: #d3b581;
}

.tab_box {
	display: flex;
	height: 1100upx;
}

.tab_box .tab_lst {
	display: none;
	width: 100%;
}

.tab_box .tab_lst.show {
	display: block;
}

.tab_lst .lst {
	width: 100%;
	padding: 30upx;
	box-sizing: border-box;
	position: relative;
}

.m20 {
}

.tab_lst .lst .title {
	background-color: #fff;
	border-radius: 30upx;
}

.tab_lst .lst .text {
}

.tab_lst .lst .title_dz {
}

.tab_lst .lst .dz {
	float: left;
	width: 95%;
	height: 70upx;
	line-height: 70upx;
	font-size: 30upx;
	border-bottom: 1px solid #ececec;
	color: #000;
	box-sizing: border-box;
}

.tab_lst .lst .all_btn {
	float: right;
	color: #007aff;
	font-size: 34upx;
	line-height: 70upx;
}

.button-hover[type='primary'] {
	color: #000000;
	background-color: #d3b581;
}

._button {
	background-color: #d3b581;
	color: #000000;
}
</style>
