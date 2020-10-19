<template>
	<view class="content">
		<view class="muen_header hi-columns" :style="'padding-top:'+statusBarH+'px;'">
			<view class="hi-rows hi-flex-vcenter  hi-space-between">
				<view class="hi-rows hi-flex-vcenter">
					<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'"
					 mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
				</view>
				<view class="hi-rows hi-flex-vcenter" style="font-size: 35upx; font-weight: bold;">
					{{$t('trade.gggl')}}
				</view>
			</view>
		</view>
		<view class="hi-columns list_box">
			<block v-for="(item,index) in list_data" :key="index" >
				<view class="hi-columns item">
					<view class="hi-rows hi-space-between ls1">
						<text class="t1" style="color:#000;font-size: 40upx;">{{item.symbol}} {{item.type=="sell"?$t('trade.cs'):$t('trade.mr')}}{{$t('trade.bc')}}</text>
						<text class="t2" style="color: #21803c;"> {{item.state == 0?$t('trade.ysj'):$t('trade.yxj')}}</text>
					</view>
					<view class="hi-columns c_con">
						<view class="hi-rows hi-space-between i_index">
							<text class="dj_text">{{$t('trade.dj')}}：{{item.price}} CNY</text>
							<view class="hi-rows">
						
								<block v-if = "item.wxPay == true">
										<image src="../../../static/wo/icon_wechat_open.png" style="width: 34upx;height: 35upx;margin: 0 5upx;" mode=""></image>
								</block> 
								
								<block v-if="item.alPay == true" >
										<image src="../../../static/wo/icon_alipay_open.png" style="width: 34upx;height: 35upx;margin: 0 5upx;" mode=""></image>
								</block>
								
								<block v-if="item.bankPay == true" >
										<image src="../../../static/wo/icon_receivables_land.png" style="width: 34upx;height: 35upx;margin: 0 5upx;" mode=""></image>
								</block>
						
							</view>
							
						</view>
						<view class="hi-columns i_index">{{$t('trade.jyxe')}}：{{item.min}}-{{item.max}} CNY</view>
						<view class="hi-columns i_index">{{$t('trade.cjsj')}}：{{item.createDate}}</view>
						<view class="hi-columns i_index" style="width: 100%; display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp:1;overflow: hidden;">{{$t('trade.ggbz')}}：{{item.remark}}</view>
					</view>
					<view class="hi-rows btn_box">
						<block v-if="item.state == 0">
							<text style="background:green; color: #FFF;border: 0;border-radius: 30upx;" @tap="dowedit(item.id)">{{$t('trade.xj')}}</text>
						</block>
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
				tab_index:1,
				bz_index:1,
				index: 0,	//币种切换
				bz_arr:[],//币种
				list_data:[],
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				pagejia:1
			}
		},
		onLoad() {
			This=this;
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
		onShow() {
			this.order_list(); 
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
					page:this.pagejia
				}
				console.log(gengduo)
				uni.request({
					url: this.websiteUrlotc+'otc/getMyselfShopList', //仅为示例，并非真实接口地址。
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
			order_list(){
				let This=this;
				uni.showLoading({
					title:This.$t('stylePulic.Loading')+"...",
					mask:true
				})
				var zixuanlist = {
					token: uni.getStorageSync('token'),
					userId:uni.getStorageSync('id'),
					page:1
				}
				console.log(zixuanlist)
				uni.request({
					url: this.websiteUrlotc+'otc/getMyselfShopList', //仅为示例，并非真实接口地址。
					data:zixuanlist,
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
			dowedit(id){
				console.log(id)
				var that = this
				uni.showModal({
					title:that.$t('stylePulic.prompt'),
					content:that.$t('trade.zdyxjm'),
					success: res => {
						if(res.confirm){
							
							uni.request({
								url:that.websiteUrlotc+'otc/updateShopState',
								method:"POST",
								data:{
									token: uni.getStorageSync('token'),
									userId:uni.getStorageSync('id'),
									shopId:id
									},
								header: {
									'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
								},
								success: ress => {
									console.log(ress)
									if (ress.data.code == 200) {
										that.myAlert(ress.data.msg)
										that.order_list()
									} else if (ress.data.code == 500) {
										that.myAlert(res.data.msg)
									} else if (ress.data.code == 402) {
									
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
							})
							
							
						}
					}
					
				})
				
				
				
			}
			
		},
	filters: {
		numFilter(value) {

			let realVal =value.toFixed(2);
			return realVal;
		}
	}
	}
</script>

<style>
page{
	background-color: #eff3f6;
}
.muen_header>view {height: 88upx;padding: 0 40upx;box-sizing: border-box;}
	.header_title_box {padding: 0 0 20upx 40upx;box-sizing: border-box;margin: 0upx 0;}
	.header_title_box .header_item {text-align: center;}
	.header_title_box .header_item .t1 {font-size: 48upx;color: #FFFFFF;font-weight: bold;}
	.header_title_box .header_item .t2 {color: #8792A8;font-size: 22upx;margin-left: 19upx;}
	.header_title_box .header_item .h_btn {color: #3A74FC;border: 1upx solid #3A74FC;width: 120upx;height: 58upx;border-radius: 29upx;line-height: 58upx;}
view,text{font-size: 28upx;}
.nav_box{height: 88upx;align-items: center;border-bottom: 22upx solid #eff3f6;background: #FFFFFF;width: 100%;position: fixed;top: 0;left: 0;}
.nav_box view{flex: 1;text-align: center;padding: 20upx 0;font-size: 34upx;color: #78889e;border-bottom: 8upx solid #FFFFFF;}
.nav_box view.active{border-bottom: 8upx solid #0080FF;color: #0080FF;}
.list_box{ padding: 30upx; box-sizing: border-box;}
.list_box .item{border-bottom: 22upx solid #eff3f6;background: #FFFFFF;}
.list_box .item>.hi-rows{border-bottom: 2upx solid #e5e8f3;padding: 42upx 20upx;box-sizing: border-box;}
.list_box .item>.hi-columns{border-bottom: 2upx solid #e5e8f3;padding: 42upx 20upx;box-sizing: border-box;}
.list_box .item>.c_con{justify-content: flex-end;}
.list_box .item>.c_con .i_index{justify-content: space-between;margin: 5upx 0;color: #a6a6ae;}
.dj_text{font-size: 34upx;font-weight: bold;color: #757581;}
.btn_box{justify-content: flex-end;}
.btn_box text{padding: 10upx 30upx;color: #0080ff;border: 1upx solid #0080ff;border-radius: 10upx;margin: 0 20upx;}
</style>

