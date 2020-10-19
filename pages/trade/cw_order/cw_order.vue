<template>
	<view class="container hi-columns" :style="backgroundALL == '#1c1f22'?'background:#05060F;':'background:#F0F3F5;'">
		<!-- 标题栏 -->
		<view class="muen_header hi-columns" :style="'padding-top:'+statusBarH+'px;'">
			<view class="hi-rows hi-flex-vcenter  hi-space-between">
				<view class="hi-rows hi-flex-vcenter">
					<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'"
					 mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
				</view>
				<view class="hi-rows hi-flex-vcenter">
				</view>
			</view>
		</view>
		<view class="header_title_box hi-rows hi-flex-vcenter hi-space-between">
			<view class="header_item hi-rows hi-flex-vcenter hi-space-between">
				<text class="t1" :style="hb_status?'color: #242833;':'color: #ffffff;'">{{$t('trade.ggxq')}}</text>
			</view>
			<view class="header_item">
			</view>
		</view>
		<view class="content" style="margin-bottom: 65upx;overflow: auto;">
			<view class="">
				<view class="hi-columns br" :style="hb_status?'background: #ffffff;':'background: #18253D;'">
					<view class="top_info hi-rows hi-flex-vcenter hi-space-between" :style="hb_status?'background:rgba(192,196,204,.1);':'background:rgba(192,196,204,.1);'">
						<image :src="userdata.head" mode="" style="width: 60upx;height: 60upx;margin-right: 30upx;"></image>
						<view class="r_info hi-columns hi-flex-center">
							<view class="title  hi-flex-vcenter hi-rows">
								<text class="name" :style="hb_status?'color: #242833;':'color: #ffffff;'">{{userdata.nickname}}</text>
								<text class="sm">{{$t('trade.ysm')}}</text>
							</view>
							<view class="hi-rows">
								<text class="hp">{{$t('trade.jy')}} 0</text>
								<!-- <text class="hp">好评 100.00%</text> -->
							</view>
						</view>
					</view>

					<view class="p30 t_box hi-rows hi-flex-vcenter hi-space-between">
						<view class="t1">{{$t('trade.bz')}}</view>
						<view class="t2" :style="hb_status?'color: #242833;':'color: #ffffff;'">{{userdata.symbol}}</view>
					</view>
					<view class="p30 t_box hi-rows hi-flex-vcenter hi-space-between">
						<view class="t1">{{$t('trade.dj')}}(CNY)</view>
						<view class="t2" :style="hb_status?'color: #242833;':'color: #ffffff;'"><text style="font-size: 28upx;color:#F36C2A;margin-right: 10upx;">¥</text><text
							 style="font-size: 48upx;color:#F36C2A;">{{userdata.price}}</text></view>
					</view>
					<view class="p30 t_box hi-rows hi-flex-vcenter hi-space-between">
						<view class="t1">{{$t('trade.xe')}}(CNY)</view>
						<view class="t2" :style="hb_status?'color: #242833;':'color: #ffffff;'">{{userdata.min}} - {{userdata.max}}</view>
					</view>
					<view class="p30 t_box hi-rows hi-flex-vcenter hi-space-between">
						<view class="t1">{{$t('trade.zffs')}}</view>
						<view class="t2" :style="hb_status?'color: #242833;':'color: #ffffff;'">
							<block v-if="userdata.wxPay == true">
								<image src="../../../static/wo/icon_wechat_open.png" style="width: 34upx;height: 35upx;margin: 0 5upx;" mode=""></image>
							</block>

							<block v-if="userdata.alPay == true">
								<image src="../../../static/wo/icon_alipay_open.png" style="width: 34upx;height: 35upx;margin: 0 5upx;" mode=""></image>
							</block>

							<block v-if="userdata.bankPay == true">
								<image src="../../../static/wo/icon_receivables_land.png" style="width: 34upx;height: 35upx;margin: 0 5upx;"
								 mode=""></image>
							</block>
						</view>
					</view>
					<view class="borderB1" :style="hb_status?'background:rgba(0,0,0,.1);':'background:rgba(255,255,255,.1);'"></view>
					<view class="p30 t_box hi-rows hi-flex-vcenter hi-space-between">
						<view class="t1">{{$t('trade.bz')}}</view>
						<view class="t2"></view>
					</view>
					<view class="hi-columns beizhun">
						<view class="">{{userdata.remark}}</view>
					</view>
				</view>


				<view class="hi-columns br mt30" :style="hb_status?'background: #ffffff;':'background: #18253D;'">
					<view class="nav_box">
						<block v-if="hb_status">
							<text class="b" :class="tab_type_status==0?'active':''" @click="tab_nav_btn(0)">{{$t('trade.aslgm')}}</text>
							<text class="b" :class="tab_type_status==1?'active':''" @click="tab_nav_btn(1)">{{$t('trade.ajggm')}}</text>
						</block>
						<block v-else>
							<text class="h" :class="tab_type_status==0?'active':''" @click="tab_nav_btn(0)">{{$t('trade.aslgm')}}</text>
							<text class="h" :class="tab_type_status==1?'active':''" @click="tab_nav_btn(1)">{{$t('trade.ajggm')}}</text>
						</block>
					</view>
					<view class="num_box hi-rows">
						<block v-if="tab_type_status==0">
							<input class="input_sr" v-model="shuliang" @focus="cionfoc" @input="coinin" type="text" value="" :placeholder="input_gmNumber" />
						</block>
						<block v-else>
							<input class="input_sr" v-model="jiajiajia" @focus="cnyfoc" @input="cnyin" type="text" value="" :placeholder="input_gmPrice" />
						</block>
						<block v-if="tab_type_status==0">
							<view class="hi-rows hi-flex-vcenter" style="margin-left: 15upx; margin-top: 10upx;">
								<text class="t3">{{userdata.symbol}}</text>
							</view>
						</block>
						<block v-else>
							<view class="hi-rows hi-flex-vcenter" style="margin-left: 15upx; margin-top: 10upx;">
								<text class="t3">CNY</text>
							</view>
						</block>

					</view>
					<view class="borderB1" :style="hb_status?'background:rgba(0,0,0,.1);margin-bottom:0;':'background:rgba(255,255,255,.1);margin-bottom:0;'"></view>
					<view class="hi-columns" style="color: #8792A8;font-size: 28upx;padding: 20upx 30upx;">{{$t('trade.xe')}}(CNY)：{{userdata.min}}
						- {{userdata.max}}</view>
					<block v-if="tab_type_status==0">
						<view class="hi-columns" style="color: #8792A8;font-size:28upx;padding: 20upx 30upx; text-align: right;">{{$t('trade.jysl')}}：{{shuliang}}{{userdata.symbol}}</view>
					</block>
					<block v-else>
						<view class="hi-columns" style="color: #8792A8;font-size: 28upx;padding: 20upx 30upx; text-align: right;">{{$t('trade.jysl')}}：{{jiage}}{{userdata.symbol}}</view>
					</block>

					<view class="p30 t_box hi-rows hi-flex-vcenter hi-space-between">
						<view class="t1">{{$t('trade.sfk')}}</view>
						<view class="t2" :style="hb_status?'color: #242833;':'color: #ffffff;'" style="display: inline-flex;">
							<view style="font-size: 48upx;color:#F36C2A;">¥ {{shifu}}</view>

						</view>
					</view>


				</view>


			</view>
		</view>
		<view class="btns_box hi-rows hi-space-between" :style="hb_status?'background:#FFFFFF;margin-bottom:'+paddingBottom+'rpx;':'background:#2d3033;margin-bottom:'+paddingBottom+'rpx;'">
			<view class="btn" style="background:#E0316C;color: #FFFFFF;" @tap="gou" v-if="orderType=='sell'">{{$t('trade.ljcs')}}</view>
			<view class="btn" style="background:#24B29B;color: #FFFFFF;" @tap="gou" v-else>{{$t('trade.ljgm')}}</view>
		</view>

		<view class="alert_maks" :class="isyichu==false?'active':''" :style="hb_status?'background: rgba(0,0,0,.7);':'background: rgba(0,0,0,.3);'"></view>
		<view class="hi-columns alert_yichu_box" :class="isyichu==false?'active':''" :style="hb_status?'background:#FFFFFF;':'background: #18253D;'">
			<view class="title" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{$t('trade.yjbl')}}</view>
			<view class="con">{{$t('trade.txt')}}</view>
			<view class="btn" @click="yichubz_btn()">{{$t('login.know')}}</view>
		</view>


	</view>
</template>

<script>
	var This;
	export default {
		data() {
			return {
				input_gmNumber: this.$t('trade.qsrgmsl'),
				input_gmPrice: this.$t('trade.qsrgmjg'),

				id: '',
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				paddingBottom: 0, //判断苹果X底部高度
				isyichu: false,
				orderType: '', //买卖状态
				bizhong: '', //币种
				tab_type_status: 0, // 按数量或者价格    0数量   1价格
				userdata: '',
				shifu: '0.0',
				jiage: 0,
				shuliang: 0,
				jiajiajia: ''
			}
		},
		onLoad(e) {
			this.orderType = e.orderType
			this.id = e.id
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
			var asdwwww = {
				shopId: this.id,
				token: uni.getStorageSync('token'),
				userId: uni.getStorageSync('id')
			}
			console.log(asdwwww)
			uni.request({
				url: this.websiteUrlotc + 'otc/getShopByShopId',
				method: 'GET',
				data: asdwwww,
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					"Accept-Language": 'zh'
				},
				success: (res) => {
					console.log(res)
					if (res.data.code == 200) {
						this.userdata = res.data.data

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
			setTimeout(() => {
				this.tab_init();
			}, 500)
		},
		methods: {
			cionfoc(e) {

				if (e.detail.value <= 0) {
					this.shuliang = 0
				} else {
					this.shifu = (Number(e.detail.value) * Number(this.userdata.price)).toFixed(2);
					this.shuliang = 0
				}


			},
			//货币输入监听
			coinin(e) {


				if (e.detail.value <= 0) {
					this.shuliang = 0
				} else {
					this.shifu = (Number(e.detail.value) * Number(this.userdata.price)).toFixed(2);
					this.shuliang = e.detail.value
				}


			},
			//人民币焦点
			cnyfoc(e) {

				if (e.detail.value <= 0) {
					this.jiage = 0
				} else {
					this.jiajiajia = e.detail.value
					this.shifu = this.jiajiajia
					this.jiage = (Number(e.detail.value) / Number(this.userdata.price)).toFixed(2);
					console.log(this.jiage)
				}
			},
			//人民币输入监听
			cnyin(e) {



				if (e.detail.value <= 0) {
					this.jiage = 0
				} else {
					this.jiajiajia = e.detail.value
					this.shifu = this.jiajiajia
					this.jiage = (Number(e.detail.value) / Number(this.userdata.price)).toFixed(2);
					console.log(this.jiage)
				}



			},
			xd_order() {
				let This = this;
				console.log(this.cny) //704.91
				console.log(this.xrmin) // 100
				console.log(this.xrmax) //30000
				if (Number(this.cny) == '' || Number(this.cny) == 0 || Number(this.cny) < Number(this.xrmin) || Number(this.cny) >
					Number(this.xrmax)) {
					uni.showToast({
						title: This.$t('trade.jyxe') + this.xrmin + '-' + this.xrmax + ' CNY',
						icon: "none",
						duration: 1000,
						mask: true
					})
					return false;
				}

				this.qdxd_status = !this.qdxd_status;
			},
			gou() {
				let This = this;
				if (this.tab_type_status == '0') {
					if (this.shuliang <= 0 || this.shuliang == '') {
						console.log('数量')
						uni.showToast({
							title: This.$t('trade.slblwk'),
							icon: "none",
							mask: true,
							duration: 1000
						})
						return false;
					}
				} else {
					if (this.jiajiajia <= 0 || this.jiajiajia == '') {
						console.log('最小量')
						uni.showToast({
							title: This.$t('trade.jgblwk'),
							icon: "none",
							mask: true,
							duration: 1000
						})
						return false;
					}
				}

				var that = this
				uni.showModal({
					title: This.$t('trade.xtts'),
					content: This.$t('trade.qdxdm'),
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '加载中'
							}); //出现加载中图标
							if (that.tab_type_status == '0') {
								var buysellche = {
									token: uni.getStorageSync('token'),
									userId: uni.getStorageSync('id'),
									num: that.shuliang,
									shopId: that.id

								}
							} else {
								var buysellche = {
									token: uni.getStorageSync('token'),
									userId: uni.getStorageSync('id'),
									num: that.jiage,
									shopId: that.id

								}
							}

							console.log(buysellche)
							uni.request({
								url: that.websiteUrlotc + 'otc/addOrder', //仅为示例，并非真实接口地址。
								data: buysellche,
								header: {
									'Content-Type': 'application/x-www-form-urlencoded',
									"Accept-Language": 'zh'
								},
								method: 'POST',
								success: res => {
									uni.hideLoading();
									if (res.data.code == 200) {
										that.myAlert(This.$t('trade.ddycj'))
										setTimeout(function() {
											if (that.orderType == 'sell') {
												uni.navigateTo({
													url: "../order/order?id=" + res.data.data
												})
											} else {
												uni.navigateTo({
													url: "confirm?id=" + res.data.data
												})
											}
										}, 1500)

									} else if (res.data.code == 500) {
										that.myAlert(res.data.msg)
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

								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			tab_nav_btn(e) {
				this.tab_type_status = e;
				this.shifu = '0.0'
				this.jiage = 0
				this.shuliang = 0
			},
			yichubz_btn() { //溢出显示隐藏

				this.isyichu = !this.isyichu
				console.log(this.isyichu)
			},
			Back() {
				uni.navigateBack({ //后退
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

	.buy_btm_box .item {
		margin-left: 60upx;
	}

	.buy_btm_box .item image {
		width: 30upx;
		height: 30upx;
	}

	.buy_btm_box .item text {
		font-size: 22upx;
		color: #8792A8;
		margin-top: 14upx;
	}

	.bi_title {
		width: 670upx;
		height: 88upx;
		margin: 30upx 40upx;
		border-radius: 16upx;
		line-height: 88upx;
		padding-left: 40upx;
		font-size: 36upx;
		box-sizing: border-box;
	}

	.bi_title .name {
		font-size: 36upx;
		margin: 0 20upx;
	}


	.top_info {
		padding: 38upx 30upx;
		box-sizing: border-box;
		margin-bottom: 15upx;
	}

	.top_info .r_info {
		flex: 1;
	}

	.top_info .r_info .name {
		font-size: 36upx;
		margin-right: 10upx;
	}

	.top_info .r_info .hp {
		font-size: 22upx;
		margin-right: 60upx;
		color: #8792A8;
	}

	.top_info .r_info .sm {
		font-size: 18upx;
		color: #FFFFFF;
		background: #4FB757;
		padding: 4upx 10upx;
		border-radius: 4upx;
	}

	.beizhun {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		margin: 20upx 0;
		margin-bottom: 43upx;
	}

	.beizhun input {
		height: 70upx;
		width: 100%;
		background: rgba(192, 196, 204, .2);
		color: #FFFFFF;
		padding: 0 20upx;
		box-sizing: border-box;
	}


	.nav_box {
		border-bottom: 4upx solid rgba(192, 196, 204, .2);
		margin-left: 30upx;
		display: inline-flex;
		/* width: 56%; */
		margin-top: 30upx;
	}

	.nav_box text.active {
		color: #3A74FC;
		border-bottom: 4upx solid #3A74FC;
	}

	.nav_box text {
		height: 60upx;
		line-height: 60upx;
		font-size: 32upx;
	}

	.nav_box text:nth-of-type(1) {
		margin-right: 60upx;
	}

	.num_box {
		margin-top: 60upx;
	}

	.num_box input {
		flex: 1;
		padding-left: 30upx;
		box-sizing: border-box;
		padding-right: 30upx;
	}

	.num_box .t1 {
		color: #8792A8;
		margin-right: 30upx;
	}

	.num_box .t2 {
		color: rgba(255, 255, 255, .1);
		margin-right: 30upx;
	}

	.num_box .t3 {
		color: #3A74FC;
		margin-right: 30upx;
	}

	.t_box {
		padding-top: 12upx;
		padding-bottom: 12upx;
	}

	.t_box .t1 {
		color: #8792A8;
		font-size: 28upx;
	}

	.t_box .t2 {
		font-size: 36upx;
	}

	.t_box .t2 image {
		width: 32upx;
		height: 32upx;
		margin-left: 15upx;
	}

	.btns_box {
		height: 120upx;
		padding: 16upx 40upx;
		box-sizing: border-box;
	}

	.btns_box .btn {
		height: 88upx;
		width: 50%;
		margin-left: 25%;
		text-align: center;
		line-height: 88upx;
		border-radius: 44upx;
		font-size: 36upx;
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
