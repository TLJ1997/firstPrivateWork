<template>
	<view class="hi-columns content" style="background:#F0F3F5;">
		<view style="position: fixed;top: 0; background:#F0F3F5; width: 100%;">
			<view class="muen_header hi-columns" :style="'padding-top:'+statusBarH+'px;'">
				<view class="hi-rows hi-flex-vcenter  hi-space-between">
					<view class="hi-rows hi-flex-vcenter">
						<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'"
						 mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
					</view>
					<view class="hi-rows hi-flex-vcenter" style="font-size: 35upx; font-weight: bold;">
						{{$t('trade.ddgl')}}
					</view>
				</view>
			</view>
			<view class="title_box hi-rows hi-flex-vcenter hi-space-between ">
				<view class="l_text changwai_tab hi-rows hi-flex-vcenter">
					<view class="l hi-columns hi-flex-center hi-flex-vcenter" @click="cw_tab_btn(1)">
						<text :style="hb_status?'color:#242933;':'color:#ffffff;'" :class="changwai.tab_index==1?'active':''">{{$t('trade.jxz')}}</text>
						<view :class="changwai.tab_index==1?'y_box':'y_box hide'"></view>
					</view>
					<view class="l hi-columns hi-flex-center hi-flex-vcenter" @click="cw_tab_btn(2)">
						<text :style="hb_status?'color:#242933;':'color:#ffffff;'" :class="changwai.tab_index==2?'active':''">{{$t('trade.yjs')}}</text>
						<view :class="changwai.tab_index==2?'y_box':'y_box hide'"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="hi-columns list_box">
			<block v-for="(item,index) in list_data" :key="index">
				<view class="hi-rows hi-space-between item" style="background-color: #FFF; padding: 30upx;border-radius: 10upx; margin-bottom: 20upx;" @tap="link(item.id)">
					<view class="hi-rows hi-flex-vcenter">
						<view class="hi-columns  r_box" style="text-align: left;justify-content: flex-start;">
							<view class="username" style="width: 100%;text-align: left;font-size: 35upx;">{{item.account}}</view>
							<view>{{item.createDate}}</view>
							<view class="hi-rows hi-flex-vcenter r"><text class="money">{{$t('trade.jyje')}}：{{item.price}} CNY</text></view>
						</view>
					</view>
					<view class="hi-columns  r_box">
						
						<view class="hi-rows hi-flex-vcenter" v-if="item.type=='buy' && item.userId == huancunuid">
							<text class="goumai">{{$t('trade.gm')}} {{item.symbol}}</text>
						</view>
						<view class="hi-rows hi-flex-vcenter" v-if="item.type=='buy' && item.shopUserId == huancunuid">
							<text class="goumai" style="background: #1AAD19;border: none;">{{$t('trade.cs')}} {{item.symbol}}</text>
						</view>
						<view class="hi-rows hi-flex-vcenter" v-if="item.type=='sell' && item.userId == huancunuid">
							<text class="goumai" style="background: #1AAD19;border: none;">{{$t('trade.cs')}} {{item.symbol}}</text>
						</view>
						<view class="hi-rows hi-flex-vcenter" v-if="item.type=='sell' && item.shopUserId == huancunuid">
							<text class="goumai">{{$t('trade.gm')}} {{item.symbol}}</text>
						</view>
						<block v-if="item.state==0">
							<view class="status_text">{{$t('trade.dfk')}}</view>
						</block>
						<block v-if="item.state==1">
							<view class="status_text">{{$t('trade.dsf')}}</view>
						</block>
						<block v-if="item.state==2">
							<view class="status_text">{{$t('trade.ywc')}}</view>
						</block>
						<block v-if="item.state==3">
							<view class="status_text">{{$t('trade.yqx')}}</view>
						</block>
						<block v-if="item.state==4">
							<view class="status_text">{{$t('trade.csqx')}}</view>
						</block>
						<view class="order_text">{{$t('trade.ddbh')}}：{{item.orderNum}}</view>
					</view>
				</view>
			</block>

		</view>
	</view>
</template>

<script>
	var This;
	export default {
		data() {
			return {
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				tab_index: 0,
				bz_index: 1,
				index: 0, //币种切换
				bz_arr: [], //币种
				login_userId: 0,
				changwai: {
					tab_index: 1, //0 买  1卖
					bizhong: 'USDT'
				},
				list_data: [],
				huancunuid:uni.getStorageSync('id')
			}
		},
		onShow() {
			this.changwai.tab_index = 1
			This = this;
			this.order_list(0);
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight
					// console.log(JSON.stringify(res))
					console.log(This.windowHeight)
				}
			})
		},
		onReachBottom: function() {
			var that = this
			uni.showLoading({
				title: that.$t('stylePulic.Loading')
			});
			setTimeout(function() {
				uni.hideLoading();
				that.pagejia = Number(that.pagejia) + 1
				that.gengduozixuan()
			}, 1000);
		},
		methods: {
			Back() {
				uni.navigateBack({ //后退
					delta: 1
				})
			},
			gengduozixuan(){
				let This=this;
				var gengduo = {
					token: uni.getStorageSync('token'),
					userId:uni.getStorageSync('id'),
					page:this.pagejia,
					status: this.changwai.tab_index
				}
				console.log(gengduo)
				uni.request({
					url: this.websiteUrlotc + 'otc/getMyselfOrderList', //仅为示例，并非真实接口地址。
					data:gengduo,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							if (this.pagejia > res.data.data.totalPages) {
								uni.showToast({
									title:This.$t('stylePulic.Nomore'),
									icon: 'none',
									duration: 1000
								});
							} else{
								uni.showToast({
									title:This.$t('stylePulic.Loaded'),
									icon: 'none',
									duration: 1000 
								});
								if (res.data.data.list == null || res.data.data.list == '') {
									this.list_data = []
								} else{
									this.list_data = this.list_data.concat(res.data.data.list);
									console.log(this.list_data)
								}
							}
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
						
					}
				});
			},
			cw_tab_btn(e) { //场外 买卖切换
				this.changwai.tab_index = e;
				console.log(this.changwai.tab_index);
				this.pagejia = 1

				var ascd = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					page: 1,
					status: this.changwai.tab_index
				}
				console.log(ascd)
				uni.request({
					url: this.websiteUrlotc + 'otc/getMyselfOrderList',
					method: 'GET',
					data: ascd,
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success: (res) => {
						console.log(res)
						if (res.data.code == 200) {
							this.list_data = res.data.data.list
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
			},
			order_list() {
				uni.showLoading({
					title:this.$t('stylePulic.Loading')+"...",
					mask: true
				})
				var zixuanlist = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					page: 1,
					status: 1
				}
				console.log(zixuanlist)
				uni.request({
					url: this.websiteUrlotc + 'otc/getMyselfOrderList', //仅为示例，并非真实接口地址。
					data: zixuanlist,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						uni.hideLoading()
						if (res.data.code == 200) {
							this.list_data = res.data.data.list
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

					}
				});
			},
			link(orderid) {
				console.log(orderid)
				uni.navigateTo({
					url: "../order/order?id=" + orderid
				})

			}

		}
	}
</script>

<style>
	page {
		background: #F0F3F5;
	}

	.title_box {
		padding: 0 40upx;
		padding-top: 35upx;
		padding-bottom: 20upx;
		box-sizing: border-box;
	}

	.title_box .l_text {}

	.title_box .l_text .l text {
		font-size: 48upx;
	}

	.title_box .l_text .l .y_box {
		width: 12upx;
		height: 12upx;
		background: #4966F5;
		border-radius: 50%;
		margin-top: 10upx;
	}

	.title_box .changwai_tab .l {
		margin-right: 66upx;
	}

	.title_box .changwai_tab .l text {
		font-size: 30upx;
	}

	.title_box .changwai_tab .l text.active {
		font-size: 48upx;
	}

	.title_box .l_text .l .y_box.hide {
		display: none;
	}


	.title_box .r_box {
		position: relative;
	}

	.title_box .r_box .item {
		margin-left: 60upx;

	}

	.title_box .r_box .item image {
		width: 30upx;
		height: 30upx;
	}

	.title_box .r_box .item text {
		font-size: 22upx;
		color: #8792A8;
		margin-top: 14upx;
	}

	.title_box .r_box .Submenu_box {
		position: absolute;
		right: 0;
		top: 90upx;
		padding: 34upx 38upx;
		padding-bottom: 0;
		box-sizing: border-box;
		background: rgba(41, 95, 204, .6);
		width: 230upx;
		border-radius: 8upx;
		z-index: 999999999999999999999999999;
	}

	.title_box .r_box .Submenu_box .sanjiao {
		position: absolute;
		right: 15upx;
		top: -15upx;
		width: 0;
		height: 0;
		border-right: 15upx solid transparent;
		border-left: 15upx solid transparent;
		border-bottom: 15upx solid rgba(41, 95, 204, .6);
	}

	.title_box .r_box .Submenu_box .sub_item {
		padding-top: 27upx;
	}

	.title_box .r_box .Submenu_box .sub_item image {
		width: 34upx;
		height: 34upx;
	}

	.title_box .r_box .Submenu_box .sub_item text {
		font-size: 24upx;
		margin-left: 17upx;
		padding-bottom: 27upx;
		border-bottom: 1px solid rgba(255, 255, 255, .1);
		color: #FFFFFF;
	}

	.muen_header>view {
		height: 88upx;
		padding: 0 40upx;
		box-sizing: border-box;
	}

	.header_title_box {
		padding: 0 0 20upx 40upx;
		box-sizing: border-box;
		margin: 0upx 0;
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

	view,
	text {
		font-size: 24upx;
	}

	.nav_box {
		height: 88upx;
		align-items: center;
		border-bottom: 22upx solid #eff3f6;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		background: #FFFFFF;
	}

	.nav_box view {
		flex: 1;
		text-align: center;
		padding: 20upx 0;
		font-size: 34upx;
		color: #78889e;
		border-bottom: 8upx solid #FFFFFF;
	}

	.nav_box view.active {
		border-bottom: 8upx solid #0080FF;
		color: #0080FF;
	}

	.list_box {
		padding: 0 20upx;
		box-sizing: border-box;
		padding-top: 280upx;
	}

	.list_box .item {
		padding: 42upx 0;
		border-bottom: 2upx solid #e5e8f3;
		align-items: center;
	}

	.list_box .item .hi-rows image {
		width: 77upx;
		height: 77upx;
		margin-right: 36upx;
	}

	.text_box .hi-flex-vcenter {
		text-align: left;
	}

	.text_box .r text {
		text-align: right;
	}

	.username {
		font-weight: bold;
		margin-right: 10upx;
	}

	.goumai {
		padding: 6upx 8upx;
		background: #4db0f5;
		border: 1upx solid #38a7f4;
		border-radius: 6upx;
		color: #FFFFFF;
		font-size: 22upx;
	}

	.money {
		color: #7e8da2;
	}

	.r_box {
		text-align: right;
	}

	.r_box view {
		margin: 10upx 0;
		align-self: flex-end;
		font-size: 24upx;
	}

	.status_text {
		color: #f75f59;
	}

	.order_text {
		color: #78889e;
	}
</style>
