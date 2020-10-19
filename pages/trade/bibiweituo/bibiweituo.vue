<template>
	<view class="container hi-columns" :style="hb_status?'background:#F0F3F5;':'background:#05060F'">
		<view class="header hi-columns" style="position: fixed;left: 0; width: 100%;"  :style="hb_status?'background:#F0F3F5;':'background:#05060F'">
			<view class="hi-columns" :style="'height:'+statusBarH+'px;width: 100%;'"></view>
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'" mode=""
				 style="width:46upx;height: 46upx;" @click="Back()"></image>
				 <view class=""></view>
			</view>
			<view class="nav_box hi-columns">
				<scroll-view  class="grace-scroll-x hi-flex-vcenter hi-flex-center" scroll-x  style="width: 670upx;height: 100upx;">
					<view class="item hi-columns hi-flex-vcenter hi-flex-center" :class="weituo.index==index?'active':''"  v-for="(item,index) in weituo.list" :key="index" @click="nav_bizhong(index)">
						<text :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{item.name}}</text>
						<view :class="weituo.index==index?'yd':''"></view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view style="height:240upx;width: 100%;"></view>
		<view class="s_box" :style="hb_status?'background:#F0F3F5;':'background:#05060F'">
			<view  :style="hb_status?'background:#F0F3F5;':'background:#05060F'">
				
				<view class="all_w_box hi-columns" style="padding-bottom: 50upx;" v-show="weituo.index==0">
					<view class="item hi-rows" :style="hb_status?'background:#ffffff;':'background:#18253D'" v-for="(itme,index) in list" :key="index">
						<view class="hi-rows" style="margin-right: 30upx;">
							<image :src="itme.imgUrl" mode="" style="width: 60upx;height: 60upx;border-radius: 50%;"></image>
						</view>
						<view class="hi-columns" style="flex: 1;">
							<view class="hi-rows hi-flex-vcenter hi-space-between">
								<view class="hi-rows hi-flex-vcenter" v-if="itme.type == 'sell'">
									<text class="biname" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{itme.tradingPair}}</text>
									<text class="dj_t">{{$t('trade.mc')}}</text>
								</view>
								<view class="hi-rows hi-flex-vcenter" v-if="itme.type == 'buy'">
									<text class="biname" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{itme.tradingPair}}</text>
									<text class="dj_t">{{$t('trade.mr')}}</text>
								</view>
								<view class="chexiao" @click="chexiao(itme.orderNum)">{{$t('trade.cx')}}</view>
							</view>
							<view class="hi-rows text_s">
								<text>{{$t('trade.wtsl')}}：{{itme.totalNum}}</text>
							</view>
							<view class="hi-rows text_s">
								<text>{{$t('trade.wtdj')}}：{{itme.price}}</text>
							</view>
							<view class="hi-rows text_s">
								<text>{{$t('trade.sjcj')}}：{{itme.realTimeDeals}}</text>
							</view>
							<view class="hi-rows text_s">
								<text>{{$t('trade.wtsj')}}：{{itme.createDate}}</text>
							</view>
						</view>
					</view>

				</view>
				
				<view class="lishiweituo_box hi-columns" style="padding-bottom: 50upx;" v-show="weituo.index==1">
					
					<view class="item hi-columns" :style="hb_status?'background:#ffffff;':'background:#18253D'" v-for="(item,index) in lishiweituo" :key="index">
						<view class="hi-rows hi-flex-vcenter hi-space-between padd30 p_border" :style="hb_status?'border-bottom: 1upx solid rgba(0,0,0,.1);':'border-bottom: 1upx solid rgba(255,255,255,.1);'">
							<view class="hi-rows hi-flex-vcenter">
								<view class="hi-rows">
									<image :src="item.imgUrl" mode="" style="width: 60upx;height: 60upx;"></image>
								</view>
								<view class="title" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{item.tradingPair}}</view>
								<view class="bz" v-if="item.type == 'sell'">{{$t('trade.mc')}}</view>
								<view class="bz" v-if="item.type == 'buy'">{{$t('trade.mr')}}</view>
							</view>
							<view class="r_t_status" v-if="item.state == 3">{{$t('trade.ycx')}}</view>
							<view class="r_t_status" v-if="item.state == 2">{{$t('trade.wqcj')}}</view>
							<view class="r_t_status" v-if="item.state == 1">{{$t('trade.bfcj')}}</view>
							<view class="r_t_status" v-if="item.state == 0">{{$t('trade.ddcj')}}</view>
						</view>
						<view class="hi-rows hi-flex-vcenter hi-space-between padd30 m10">
							<text class="t1">{{$t('trade.wtsj')}}：</text>
							<text class="t2" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{item.createDate}}</text>
						</view>
						<view class="hi-rows hi-flex-vcenter hi-space-between padd30 m10" v-show="item.istext==false">
							<text class="t1">{{$t('trade.wtdj')}}：</text>
							<text class="t2" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{item.price}}</text>
						</view>
						<view class="hi-rows hi-flex-vcenter hi-space-between padd30 m10" v-show="item.istext==false">
							<text class="t1">{{$t('trade.wtsl')}}：</text>
							<text class="t2" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{item.totalNum}}</text>
						</view>
						<view class="hi-rows hi-flex-vcenter hi-space-between padd30 m10" v-show="item.istext==false">
							<text class="t1">{{$t('trade.cjze')}}：</text>
							<text class="t2" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{item.actualTurnover}}</text>
						</view>
						<view class="hi-rows hi-flex-vcenter hi-space-between padd30 m10" v-show="item.istext==false">
							<text class="t1">{{$t('trade.cjjj')}}：</text>
							<text class="t2" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{item.avgPrice}}</text>
						</view>
						<view class="hi-rows hi-flex-vcenter hi-space-between padd30 m10" v-show="item.istext==false">
							<text class="t1">{{$t('trade.cjsl')}}：</text>
							<text class="t2" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{item.realTimeDeals}}</text>
						</view>
						<view class="hi-columns hi-flex-vcenter hi-flex-center hi-space-between padd30 m10" style="margin-top: 30upx;">
							
							<view class="hi-rows hi-flex-vcenter bts" @click="isshow_info(index)"><text>{{item.istext?$t('trade.zswzxx'):$t('trade.sq')}}</text><text class="grace-icons" :class="item.istext?'icon-arrow-down':'icon-arrow-up'" style="margin-left: 10upx;"></text></view>
							
						</view>
						
					</view>

				</view>
				
				
				
			</view>
		</view>
			
		<view class="alert_maks hi-columns" :style="hb_status?'background: rgba(0,0,0,.7);':'background: rgba(0,0,0,.3);'" v-show="isAlert_chexiao" @click="chexiao()"></view>
		<view class="alert_chexiao_box hi-columns hi-flex-vcenter" :style="hb_status?'background:#ffffff;':'background:#18253D'"  v-show="isAlert_chexiao">
			<view class="title" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{$t('trade.qdcxwtd')}}</view>
			<view class="btns_box hi-rows hi-flex-vcenter hi-space-between">
				<view class="b1" @click="ok(false)">{{$t('trade.qx')}}</view>
				<view class="b2" @click="ok(true)">{{$t('trade.qd')}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
		var This;
		import youScroll from '@/components/you-scroll'
	export default {
		components: {
			youScroll
		},
		data() {
			return {
				list: [],
				backgroundALL:'',
				colorALL:'',
				statusBarH: '',
				header_H:0,
				windowHeight:0,
				hb_status:true,
				isshow_money:true,//是否显示金额
				isAlert_chexiao:false, //撤销弹窗
				weituo:{
					index:0,
					list:[
						{
							id:1,
							name:this.$t('trade.qbwt')
						},
						{
							id:2,
							name:this.$t('trade.lswt')
						}
					]
				},
				lishiweituo:[
					// {
					// 	id:1,
					// 	name:'ETH/USDT',
					// 	istext:true
					// },
					// {
					// 	id:2,
					// 	name:'KMSS/USDT',
					// 	istext:true
					// },
					// {
					// 	id:3,
					// 	name:'KM/USDT',
					// 	istext:true
					// },
					// {
					// 	id:4,
					// 	name:'NT/USDT',
					// 	istext:true
					// }
				],
				pagejia:1,
				pagejiajia:1,
				wenzi:this.$t('trade.zwgd')
			}
		},
		onLoad() {
			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight
					// console.log(JSON.stringify(res))
					console.log(This.windowHeight)
				}
			})
			
			setTimeout(function(){
				
					var view = uni.createSelectorQuery().select(".header");
			view.boundingClientRect(data => {
				// console.log("节点离页面顶部的距离为" + data.height);
				This.header_H = data.height;
				console.log(This.header_H)
			}).exec();
			
				
				
			},500)
			 
			
		},
		onReachBottom: function() {
			var that = this
			uni.showLoading({
				title: that.$t('stylePulic.Loading')
			});
			if (this.weituo.index == 0) {
				
				setTimeout(() => {
					uni.hideLoading();
					that.pagejia = Number(that.pagejia) + 1
					that.jiazailist();
				},1000)
			} else{
				setTimeout(() => {
					uni.hideLoading();
					that.pagejiajia = Number(that.pagejiajia) + 1
					that.jiazailistjia();
				},1000)
			}
		},
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk')
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(()=>{
				this.tab_init();
			},500)
			this.zixuanlist()
			this.lishilist()
		},
		methods: {
			jiazailist() {
				let This=this;
				var zixuanlist = {
					token: uni.getStorageSync('token'),
					userId:uni.getStorageSync('id'),
					page:this.pagejia
				}
				console.log(zixuanlist)
				uni.request({
					url: this.websiteUrlbibi+'api/getAllCommission', //仅为示例，并非真实接口地址。
					data:zixuanlist,
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
								if (res.data.data.orders == null || res.data.data.orders == '') {
									this.list = []
								} else{
									this.list = this.list.concat(res.data.data.orders);
									console.log(this.list)
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
			zixuanlist(){
				var zixuanlist = {
					token: uni.getStorageSync('token'),
					userId:uni.getStorageSync('id'),
					page:1
				}
				console.log(zixuanlist)
				uni.request({
					url: this.websiteUrlbibi+'api/getAllCommission', //仅为示例，并非真实接口地址。
					data:zixuanlist,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							this.list = res.data.data.orders
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
			jiazailistjia() {
				let This=this;
				var ercijiazai = {
					token: uni.getStorageSync('token'),
					userId:uni.getStorageSync('id'),
					page:this.pagejiajia
				}
				console.log(ercijiazai)
				uni.request({
					url: this.websiteUrlbibi+'api/getHistoryCommission', //仅为示例，并非真实接口地址。
					data:ercijiazai,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							if (this.pagejiajia > res.data.data.totalPages) {
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
								if (res.data.data.orders == null || res.data.data.orders == '') {
									this.lishiweituo = []
								} else{
									this.lishiweituo = this.lishiweituo.concat(res.data.data.orders);
									console.log(this.lishiweituo)
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
			lishilist(){
				var lishilist = {
					token: uni.getStorageSync('token'),
					userId:uni.getStorageSync('id'),
					page:1
				}
				console.log(lishilist)
				uni.request({
					url: this.websiteUrlbibi+'api/getHistoryCommission', //仅为示例，并非真实接口地址。
					data:lishilist,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							this.lishiweituo = res.data.data.orders
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
			isshow_info(e){  //历史委托 是否显示完整信息
				console.log(e)
				this.lishiweituo[e].istext=!this.lishiweituo[e].istext
			},
			ok(e){

				
				setTimeout(function() {
					_this.chexiao()
				}, 1000);
				
			},
			chexiao(orderNum){ //撤销隐藏显示
				// this.isAlert_chexiao=!this.isAlert_chexiao
				console.log(orderNum)
				var that = this
				uni.showModal({
					title: that.$t('trade.xtts'),
					content: that.$t('trade.qdycdm'),
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title:that.$t('stylePulic.Loading')
							});//出现加载中图标
							var buysellche = {
								token: uni.getStorageSync('token'),
								userId:uni.getStorageSync('id'),
								orderNum:orderNum,
                                actionType:1
							}
							console.log(buysellche)
							uni.request({
                                // url: that.websiteUrlbibi + 'api/cancelOrder', //仅为示例，并非真实接口地址。
                                url: that.websiteUrlbibi + 'api/placeAnOrder', //仅为示例，并非真实接口地址。
								data:buysellche,
								header: {
									'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
								},
								method: 'POST',
								success: res => {
									uni.hideLoading();
									console.log(res.data);
									if (res.data.code == 200) {
										uni.showToast({
											title: res.data.msg,
											icon: 'none',
											duration: 1000
										});
										that.zixuanlist()
										that.lishilist()
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
			onPullDown(done) { // 下拉刷新
				console.log('下拉')
				
				
			},
			onScroll(e) { // 监听滚动
				console.log(e.detail.scrollTop)
			},
			onLoadMore(e) { // 加载更多
				setTimeout(() => {
					let len = this.list.length;
					for (let i = 1; i <= 10; i++) {
						this.list.push(len + i);
					}
				},1000*1)
			},
			scrollTo() {
				this.$refs.scroll.goTop();
			},
			nav_bizhong(e){ //切换币种
				this.weituo.index=e;
				console.log(e);
				if (this.weituo.index == 0) {
					this.list = []
					this.zixuanlist()
				} else{
					this.lishiweituo = []
					this.lishilist()
				}
				
				
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
				if(this.hb_status==true){
					console.log('白天')
				}else{
					console.log('晚上')
				}
			}
		}
	}
</script>

<style>
	page{background:#F0F3F5;}
.container{width: 100%;min-height:100vh;}
.header {padding: 0 40upx;box-sizing: border-box;width: 100%;}
.header .header_box {height: 88upx;}
	.nav_box{width: 100%;}
	.grace-scroll-x .item{display: inline-flex;margin-right: 60upx;}
	.grace-scroll-x .item text{font-size: 30upx;color: #FFFFFF;}
	.grace-scroll-x .item.active text{font-size:48upx;}
	.grace-scroll-x .item.active .yd{width: 12upx;height: 12upx;background: #3A74FC;border-radius: 6upx;}
	.s_box{flex: 1;width: 100%;padding: 0 40upx;box-sizing: border-box;float: left;background: #F0F3F5;}
	
	.all_w_box .item{width: 670upx;margin-top: 20upx;padding: 30upx;box-sizing: border-box;border-radius:20px;}
	.all_w_box .biname{font-size: 36upx;}
	.all_w_box .dj_t{height:26upx;padding: 4upx 10upx;background: #E0316C;color: #FFFFFF;font-size: 18upx;border-radius: 4upx;margin-left: 10upx;}
	.all_w_box .chexiao{width:140upx;height:58upx;text-align: center;line-height: 58upx; border:2upx solid rgba(58, 116, 252, 1);border-radius:30upx;font-size:32upx;color: #3A74FC;}
	.all_w_box .text_s{margin-top: 20upx;}
	.all_w_box .text_s text{color: #8792A8;font-size: 28upx;}
	
	.m10{margin: 10upx 0;}
	.padd30{padding: 0 30upx;box-sizing: border-box;}
	.p_border{padding-bottom: 30upx;margin-bottom: 30upx;}
	.lishiweituo_box{}
	.lishiweituo_box .item{padding: 30upx 0;box-sizing: border-box;margin-top: 20upx;border-radius: 20upx;}
	.lishiweituo_box .item .title{font-size: 36upx;margin-left: 30upx;}
	.lishiweituo_box .item .bz{font-size: 18upx;margin-left: 18upx;background: #E0316C;color: #FFFFFF;width: 50upx;height: 26upx;border-radius: 4upx;text-align: center;line-height: 26upx;}
	.lishiweituo_box .item .r_t_status{font-size: 32upx;color: #8792A8;}
	.lishiweituo_box .item .t1{font-size: 28upx;color: #8792A8;}
	.lishiweituo_box .item .t2{font-size: 28upx;}
	.lishiweituo_box .item .bts{border:2px solid rgba(58, 116, 252, 1);padding: 18upx 38upx;border-radius:29px;box-sizing: border-box;}
	.lishiweituo_box .item .bts text{color: #3A74FC;font-size: 24upx;}
	
	
	.alert_maks{width: 100%;height: 100%;position: fixed;top: 0;left: 0;z-index: 99998;transition: all .3s ease-in-out;}
	.alert_chexiao_box{width: 580upx;margin: 0 85upx;height: 350upx;position: fixed;top: 50%;margin-top: -175upx; left: 0;z-index: 99999;background: #FFFFFF;border-radius:20px;padding: 40upx;box-sizing: border-box;transition: all .3s ease-in-out;}
	.alert_chexiao_box .title{text-align: center;font-size: 36upx;margin-bottom: 97upx;margin-top: 68upx;}
	.alert_chexiao_box .btns_box{text-align: center;}
	.alert_chexiao_box .btns_box .b1{width: 240upx;height: 70upx;line-height: 70upx; text-align: center;border:2upx solid rgba(230, 67, 64, 1);border-radius:35upx;color: #E64340;font-size: 32upx;box-sizing: border-box;margin-right: 20upx;}
	.alert_chexiao_box .btns_box .b2{width: 240upx;height: 70upx;line-height: 70upx; text-align: center;background: #3A74FC; border-radius:35upx;color: #FFFFFF;font-size: 32upx;}
	
	
		.loadingText{margin: 20upx 0;font-size: 28upx;}
</style>
