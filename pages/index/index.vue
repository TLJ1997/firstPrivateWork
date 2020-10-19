<template>
	<view class="container hi-columns" :style="'height:100vh;background:' + backgroundALL + ';'">
		<view :class="loading_status == false ? 'loading_c' : 'loading_c active'">
			<view class="" style="position: absolute;top: 40%;left: 225upx;font-size: 34upx;color: #FFFFFF; width: 300upx;height: 200upx;background: #1c1f22;text-align: center;line-height: 200upx;border-radius: 30upx;">
				<view class="loading_text" style="height: 200upx;line-height: 200upx;font-size: 36upx; color: #FFF;">{{ $t('index.yxz') }}{{ jdt }}%</view>
			</view>
		</view>
		<view class="header hi-columns" :style="hb_status ? 'background-image: linear-gradient(#8AC2DA, #B7D7E8) !important;' : 'background: #1A1B2F;'">
			<view class="" :style="'height: ' + statusBarH + 'px;width: 100%;'"></view>
			<view class="head_conter">
				<view class="head_user">
					<image :src="userdata" mode="" style="width:72upx;height: 72upx;border-radius: 36upx;"></image>
					<view :style="hb_status ? 'color: #1A1B2F;' : 'color: #fff;'" style="margin-left: 18upx;font-size: 46upx;font-weight: 700;">{{nickname|| '未登录'}}</view>
				</view>
				<view class="head_user">
					<navigator url="/pages/wo/kefu">
						<image :src="hb_status ? '../../static/index/slider/kefu.png':'../../static/index/slider/kefu2.png'" mode=""
						 style="width:48upx;height: 48upx;border-radius: 36upx;"></image>
					</navigator>
					<image @tap="scanCode" :src="hb_status ? '../../static/index/slider/saoma.png':'../../static/index/slider/saoma2.png'"
					 mode="" style="width:48upx;height: 48upx;margin-left: 24upx;"></image>
				</view>
			</view>
		</view>

		<view :style="'padding-top: ' + header_H + 'px;box-sizing: border-box;'">
			<view>
				<scroll-view class="content hi-columns" :style=" hb_status ? 'background-image: linear-gradient(#B7D7E8, #F6FAFC,#FFF);height:' + (windowHeight - header_H + 10) + 'px' : 'background: #1A1B2F;height:' + (windowHeight - header_H + 10) + 'px'"
				 scroll-y="true" scroll-with-animation="500" style="padding-top: 20upx;">
					<!-- 轮播图 -->
					<swiper class="grace-swiper swiper1" autoplay="true" indicator-color="rgba(255, 255, 255, .2)" indicator-active-color="rgba(255, 255, 255, 1)" style="height:276rpx;margin-top: 10upx;" interval="3000" circular="true">
						<swiper-item v-for="(itme, index) in lunbolist" :key="index">
							<navigator url="" class="grace-img-in">
								<image :src="itme.url"></image>
							</navigator>
						</swiper-item>
					</swiper>

					<view class="index_four">
						<view :style="hb_status ? 'background: #ffffff;' : 'background: #232437;'" v-for="(item, index) in showBiTypes"
						 :key="index" @tap="tiaoti(item.symbol, item.baseSymbol)" :class="hb_status ?'four_item2':'four_item'">
							<view class="four_title">
								<view class="bim" :style="hb_status ? 'background: #E7F3FE;' : 'background: #2E3B57;'">
									{{item.symbol }}
								</view>
								<view class="four_usdt">
									<view style="font-size: 18upx;margin-bottom: 6upx;" :style="hb_status ? 'color:#9ECEFC;' : 'color:#3A98C0;'">USDT</view>
									<view style="font-size: 18upx;color:#F5AD49;" v-if="item.increase >= 0">+{{item.increase}}%</view>
									<view style="font-size: 18upx;color:#F5AD49;" v-if="item.increase < 0">-{{item.increase}}%</view>
								</view>
							</view>
							<view class="four_num">
								<view class="num_title">
									<view style="font-size: 26upx;margin-bottom: 4upx;" :style="hb_status ? 'color:#44BDE9;' : 'color:#39B9E6;'">{{ item.closingPrice }}</view>
									<view style="font-size: 18upx;" :style="hb_status ? 'color:#000;' : 'color:#76777F;'">≈{{ item.cnyPrice.toFixed(4) }}</view>
								</view>
								<view style="font-size: 20upx;color:#76777F;">CNY</view>
							</view>
						</view>
					</view>


					<view style="margin-top: -60upx; width: 100%;padding:60upx 0 20upx 0;border-top-left-radius: 30upx;border-top-right-radius: 30upx;"
					 :style="hb_status ? 'background-image: linear-gradient(#E8F2F7, #F6FAFC,#FFF) !important;' : 'background: #1A1B2F;'">
						<!-- 公告 -->
						<view class="gg_box hi-rows hi-flex-vcenter hi-space-between" :style="hb_status ? 'border-bottom: 1rpx #F5F5F5' : 'border-bottom: 1rpx solid #2f3336'">
							<view class="img_l">
								<image src="../../static/image/icon_home_message.png" mode="" style="height: 40upx;width:40upx;"></image>
							</view>
							<view class="gg_text" style="margin-left: 15upx;" :style="hb_status ? 'color:#000;' : 'color:#76777F;'">
								<swiper class="swiper" :indicator-dots="false" vertical="true" autoplay="true" interval="3000" :duration="duration"
								 style="height: 50upx; width: 80%;" circular="true">
									<swiper-item v-for="(item, index) in gonggaolist" :key="index">
										<view class="swiper-item text-cut" style="font-size: 29upx;" :style="hb_status ? 'color:#000;' : 'color:#76777F;'">{{ item.title }}</view>
									</swiper-item>
								</swiper>
							</view>
							<text @tap="qugonglist">{{ $t('index.more') }}</text>
						</view>
					</view>

					<!-- 货币交易 -->

					<view :style="hb_status ? 'background: #ffffff;' : 'background: #1A1B2F;'" class="list hi-flex hi-space-between"
					 style="margin-top:-60upx;flex-wrap: wrap;padding: 0 15rpx;">
						<view @tap="gotoPage(item.name)" style="width: 180rpx;margin: 40rpx 0 0 0;" class="hi-columns hi-flex-vcenter"
						 v-for="(item, index) in cateNav" :key="index">
							<image style="height: 54rpx;width: 54rpx;" :src="item.img" mode=""></image>
							<text :style="hb_status ? 'color: #333333;' : 'color: #7E7E85;'" style="margin-top: 20rpx;">{{ item.name }}</text>
						</view>
					</view>
					<!-- <view class="banner_gg_box">
							
						</view> -->
					<view style="display: flex;justify-content: space-around;" @tap="quhehuoren">
						<image src="../../static/banner/banner.png" mode="" style="width:700upx;height: 120upx;border-radius: 60upx;"
						 :style="hb_status ? 'opacity: 1;' : 'opacity: .8;'"></image>
					</view>

					<!-- 主版-->
					<view class="b_list_box hi-columns" :style="hb_status ? 'background: #ffffff;' : 'background: #1A1B2F;'">
						<view class="tab_nav_box nc-flex-row nc-flex-main-around nc-flex-sub-center" style="height: 80upx;">
							<text @click="tab_nav(0)" :style="current == 0 ? 'color: #6AB5FA;' : ''">{{ $t('index.zhuban') }}</text>
							<text :style="current == 1 ? 'color: #6AB5FA;' : ''" @click="tab_nav(1)">{{ $t('index.cxb') }}</text>
						</view>
						<swiper class="swiper hi-columns" :current="current" @change="intervalChange" circular="true" :indicator-dots="indicatorDots"
						 :autoplay="autoplay" :interval="interval" :duration="duration" :style="'height:' + (list_num[current] * 60 + 100) + 'px;'">
							<swiper-item>
								<view class="swiper-item hi-columns">
									<view class="lst_title hi-rows hi-flex-vcenter hi-space-arount">
										<view style="margin-left:40upx;">{{ $t('index.bz') }}</view>
										<view style="margin-left:140upx;">
											{{ $t('index.zxjg') }}
										</view>
										<view style="margin-left:80upx;">{{ $t('index.zf') }}(24h)</view>
									</view>
									
									
									<view class="list_warp" v-for="(itme, index) in xiaoxibuy" :key="index" @tap="tiaoti(itme.symbol, itme.baseSymbol)">
										<view class="list_box hi-rows hi-flex-vcenter hi-space-between" style="margin-top:20upx;">
											<view class="itme_row hi-rows hi-flex-vcenter" style="width: 40%;">
												<view class="itme_row hi-rows " style="padding: 16upx 16upx;border:2upx solid #39B9E7;border-radius: 20upx;margin-right:22upx;display: flex;justify-content: space-around;">
													<image :src="itme.imgUrl" style="width: 50upx;height: 50upx;" mode=""></image>
												</view>
												<view style="">
													<view style="width: 100%;">
														<text class="name1" :style="hb_status ? 'color: #3CBBE8;' : 'color: #39B9E7;'">{{ itme.symbol }}</text>
														<text class="name2" :style="hb_status ? 'color: #B4D9FC;' : 'color: #39B9E7;'">{{ itme.baseSymbol }}</text>
													</view>
													<view style="width: 180upx;">
														<text style="font-size: 18upx;color: #FCB34B;">{{ $t('hangqing.l') }} {{ itme.familySize }}</text>
													</view>
												</view>
											</view>
											<view class="itme_row hi-flex-vcenter" style="text-align: center;justify-content: center;width: 40%;">
												<view style="width: 100%;text-align: right;">
													<text class="price" :style="hb_status ? 'color: #3CBBE8;' : 'color: #38B7E4;'">{{ itme.closingPrice }}<text
														 style="font-size: 18upx;color: #CECECE;margin-left: 8upx;">CNY</text></text>
												</view>
												<view style="width: 100%;text-align: right;">
													<text style="color: #999;font-size: 22upx;">≈￥{{ itme.cnyPrice }}</text>
												</view>
											</view>
											<view class="itme_row hi-rows hi-flex-vcenter" style="justify-content: flex-end;width: 30%;" v-if="itme.increase >= 0">
												<text class="moneys" style="color: #FCB34B;">+{{ itme.increase }}%</text>
											</view>
											<view class="itme_row hi-rows hi-flex-vcenter" style="justify-content: flex-end;width: 30%;" v-if="itme.increase < 0">
												<text class="moneys" style="color: #FCB34B;">{{ itme.increase }}%</text>
											</view>
										</view>
									</view>
									
									
									
								</view>
							</swiper-item>
						</swiper>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>




</template>

<script>
	var This;
	var systemInfo = require('../../graceUI/jsTools/systemInfo.js');
	import youScroll from '@/components/you-scroll';
	export default {
		components: {
			youScroll
		},
		data() {
			return {
				showBiTypes: [],
				isRealName: 0,
				cateNav: [],
				list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				backgroundALL: '',
				colorALL: '',
				hb_status: true, //true 白色   false 黑色
				statusBarH: '',
				loading_status: false,
				jdt: '',
				windowHeight: 0,
				header_H: 0,
				indicatorDots: false,
				autoplay: false,
				interval: 2000,
				duration: 500,
				current: 0,
				list_num: [9, 9],
				timer: '',
				xiaoxibuy: [],
				wsbian: '2',
				lunbolist: [],
				gonggaolist: [],
				pigubuy: [{
						bizhong: 'YK/USDT',
						price_usd: '1220000',
						change_percent: 10,
						market: '222'
					},
					{
						bizhong: 'YK/USDT',
						price_usd: '1220000',
						change_percent: 10,
						market: '222'
					},
					{
						bizhong: 'YK/USDT',
						price_usd: '1220000',
						change_percent: 10,
						market: '222'
					}
				],
				userdata: '',
				nickname: ''
			};
		},
		onLoad() {
			this.userdata = uni.getStorageSync('head');
			this.nickname = uni.getStorageSync('nickname');

			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight;
					console.log(JSON.stringify(res));
					console.log(This.windowHeight);
				}
			});

			setTimeout(function() {
				var view = uni.createSelectorQuery().select('.header');
				view.boundingClientRect(data => {
					console.log('节点离页面顶部的距离为' + data.height);
					This.header_H = data.height;
				}).exec();
			}, 500);
			// #ifdef APP-PLUS
			var This = this;
			This.getupdate();
			// #endif
		},
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk');
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(() => {
				this.tab_init();
			}, 500);
			// if ( uni.getStorageSync("token") <= 0 ) {
			// 	this.myAlert('请重新登陆');
			// 	uni.reLaunch({
			// 		url: '../login/login'
			// 	});
			// }else{

			// }
			var _this = this; //声明一个变量指向vue实例this,保证作用域一致

			// 创建一个websocket连接
			uni.connectSocket({
				url: 'ws://106.55.42.122:7777/quotes', //服务器接口地址
				header: {
					'content-type': 'application/json'
				},

				success: function(rs) {
					console.log(rs);
				}
			});
			// 监听websocket连接打开事件 必须写
			uni.onSocketOpen(function(res) {
				console.log('WebSocket连接已打开！');
			});
			this.timer = setInterval(function() {
				// 通过websocket连接发送数据
				uni.sendSocketMessage({
					data: _this.wsbian
				});
				// 监听websocket接收到服务器的消息事件
				uni.onSocketMessage(function(res) {
					if (res.data == 'hello') {} else {
						var zhesi = res.data;
						_this.xiaoxibuy = JSON.parse(zhesi);
						_this.showBiTypes = [];
						_this.xiaoxibuy.map((item, index) => {
							if (item.symbol == 'NEO') {
								_this.showBiTypes[0] = item;
							} else if (item.symbol == 'ETH') {
								_this.showBiTypes[1] = item;
							} else if (item.symbol == 'YK') {
								_this.showBiTypes[2] = item;
							} else if (item.symbol == 'BCH') {
								_this.showBiTypes[3] = item;
							}
						});
						_this.list_num = [_this.xiaoxibuy.length, _this.xiaoxibuy.length];
					}
				});
			}, 1000);
			uni.request({
				url: this.websiteUrlshou + 'index/getIndexCarouselImgs',
				method: 'GET',
				data: {},
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					'Accept-Language': 'zh'
				},
				success: res => {
					this.lunbolist = res.data.data;
				},
				fail: () => {}
			});
			uni.request({
				url: this.websiteUrlshou + 'index/getIndexAnnouncementTitles',
				method: 'GET',
				data: {},
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					'Accept-Language': 'zh'
				},
				success: res => {
					this.gonggaolist = res.data.data;
				},
				fail: () => {}
			});

			this.setTabbar();

			this.cateNav = [{
					pic: '',
					name: this.$t('index.rz'),
					img: '/static/index/slider/renzheng.png'
				},
				{
					pic: '',
					name: this.$t('index.cb'),
					img: '/static/index/slider/chongbi.png'
				},
				{
					pic: '',
					name: this.$t('index.qg'),
					img: '/static/index/slider/qg.png'
				},
				{
					pic: '',
					name: this.$t('index.kc'),
					img: '/static/index/slider/chibi.png'
				},
				{
					pic: '',
					name: this.$t('index.zb'),
					img: '/static/index/slider/zhangben.png'
				},
				{
					pic: '',
					name: this.$t('index.team'),
					img: '/static/index/slider/tuandui.png'
				},
				{
					pic: '',
					name: this.$t('index.cjh'),
					img: '/static/index/slider/weiheyue.png'
				},
				{
					pic: '',
					name: this.$t('index.more'),
					img: '/static/index/slider/youxi.png'
				}
			];
		},
		onHide() {
			if (this.timer != null) {
				clearInterval(this.timer);
				this.timer = null;
				uni.closeSocket();
			}
		},
		methods: {
			setTabbar() {
				let tabbars = ['tabbar.index', 'tabbar.quotation', 'tabbar.trade', 'tabbar.assets', 'tabbar.my'];
				tabbars.map((item, index) => {
					uni.setTabBarItem({
						index: index,
						text: this.$t(item)
					});
				});
			},
			tab_init() {
				if (this.backgroundALL == '#1c1f22') {
					this.hb_status = false;
					// this.heizhongtai = true;
					uni.setNavigationBarColor({
						frontColor: '#ffffff',
						backgroundColor: '#1c1f22'
					});
					uni.setTabBarStyle({
						backgroundColor: '#2d3033',
						color: '#8792A8',
						selectedColor: '#2889FA'
					});
				} else {
					this.hb_status = true;
					uni.setNavigationBarColor({
						frontColor: '#000000',
						backgroundColor: '#ffffff'
					});
					uni.setTabBarStyle({
						backgroundColor: '#ffffff',
						color: '#8792A8',
						selectedColor: '#2889FA'
					});
				}
			},
			/*  */
			gotoPage(name) {
				if (name == this.$t('index.rz')) {
					if (uni.getStorageSync('isRealName') == 0) {
						if (uni.getStorageSync('locale') == 'zh-cn') {
							uni.navigateTo({
								url: '../wo/certification/certification'
							});
						} else {
							uni.navigateTo({
								url: '../wo/certification/certification1'
							});
						}
					} else {
						this.myAlert(this.$t('index.wcrz'));
					}
				} else if (name == this.$t('index.cb')) {
					uni.navigateTo({
						url: '../wallet/chongbi/chongbi?bizhong=USDT'
					});
				} else if (name == this.$t('index.qg')) {
					uni.navigateTo({
						url: '../afanda/qianggou/qianggou'
					});
				} else if (name == this.$t('index.zb')) {
					uni.navigateTo({
						url: '../afanda/zhangben/zhangben'
					});
				} else if (name == this.$t('index.team')) {
					uni.navigateTo({
						url: '../afanda/tuandui/tuandui'
					});
				} else if (name == this.$t('index.kc')) {
					uni.navigateTo({
						url: '../afanda/chibi/chibishengxi'
					});
				} else if (name == this.$t('index.cjh')) {
					uni.navigateTo({
						url: '../kLine/chaojuhe'
					});
				} else if (name == this.$t('index.sc')) {
					uni.showModal({
						title: this.$t('stylePulic.zwkf'),
						showCancel: false
					});
				} else if (name == this.$t('index.yx')) {
					uni.showModal({
						title: this.$t('stylePulic.zwkf'),
						showCancel: false
					});
				} else if (name == this.$t('index.more')) {
					uni.navigateTo({
						url: 'all'
					});
				}
			},
			tiaoti(e, a) {
				this.$eventHub.$emit('jiayidui', e + '/' + a);
				uni.switchTab({
					url: '../trade/trade'
				});
			},
			afandao(index) {
				if (index == 0) {
					uni.navigateTo({
						url: '../afanda/zhaungzhang/zhaungzhang'
					});
				} else if (index == 1) {
					uni.navigateTo({
						url: '../afanda/chibi/chibishengxi'
					});
				} else if (index == 2) {
					uni.navigateTo({
						url: '../afanda/zhangben/zhangben'
					});
				} else if (index == 3) {
					uni.navigateTo({
						url: '../wo/yaoqingzhu/yaoqingzhu'
					});
				} else if (index == 4) {
					this.myAlert(this.$t('stylePulic.zwkf'));
				} else if (index == 5) {
					this.myAlert(this.$t('stylePulic.zwkf'));
				} else if (index == 6) {
					uni.navigateTo({
						url: '../afanda/dingdanzhongxin/dingdanzhongxin'
					});
				} else if (index == 7) {
					uni.navigateTo({
						url: '../afanda/weiheyue/weiheyue'
					});
				} else if (index == 8) {
					this.myAlert(this.$t('stylePulic.zwkf'));
				} else if (index == 9) {
					this.myAlert(this.$t('stylePulic.zwkf'));
				}
			},
			scanCode() {
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('扫码内容：' + res);
						if (res && res.result) {
							uni.navigateTo({
								url: '../zhifu/zhifu?codeText=' + encodeURIComponent(JSON.stringify(res.result))
							});
						}
					}
				});
			},
			qugonglist() {
				uni.navigateTo({
					url: '../gonggaolist/gonggaolist'
				});
			},
			quhehuoren() {
				uni.navigateTo({
					url: '/pages/wo/yaoqingzhu/yaoqingzhu'
				});
			},
			quchangwai(e) {
				if (e == 0) {
					let obj = {
						name: '1'
					};
					this.$member.setMemberObj(obj);
				} else {
					let obj = {
						name: '0'
					};
					this.$member.setMemberObj(obj);
				}
				uni.switchTab({
					url: '../trade/trade'
				});
			},
			onPullDown(done) {
				// 下拉刷新
				setTimeout(() => {
					this.list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
					done(); // 完成刷新
				}, 1000 * 1);
			},
			onScroll(e) {
				// 监听滚动
				console.log(e.detail.scrollTop);
			},
			onLoadMore(e) {
				// 加载更多
				setTimeout(() => {
					let len = this.list.length;
					for (let i = 1; i <= 10; i++) {
						this.list.push(len + i);
					}
				}, 1000 * 1);
			},
			scrollTo() {
				this.$refs.scroll.goTop();
			},
			onChange(e) {
				this.status = e.detail.value;
			},
			tab_nav(e) {
				this.wsbian = e + 1;
				this.current = e;
			},
			intervalChange(e) {
				this.current = e.detail.current;
				console.log(JSON.stringify(e.detail.current));
			},
			getupdate() {
				var This = this;
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					console.log(JSON.stringify(widgetInfo));
					var server = This.websiteUrlshou + 'index/isUpdate'; //检查更新地址
					var shebei;
					uni.getSystemInfo({
						success: function(res) {
							shebei = res.platform;
						}
					});
					var req = {
						//升级检测数据
						version: widgetInfo.version
					};
					console.log(req);
					uni.request({
						url: This.websiteUrlshou + 'index/isUpdate',
						dataType: 'json',
						method: 'POST',
						data: req,
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'Accept-Language': 'zh' //自定义请求头信息
						},
						success: res => {
							console.log(JSON.stringify(res));

							if (res.statusCode == 200 && res.data.data.status === 1) {
								// console.log(JSON.stringify(res))
								uni.showModal({
									title: This.$t('index.gxts'),
									content: res.data.data.note,
									showCancel: true,
									success(ress) {
										console.log(res.data.data.url);

										if (ress.confirm) {
											console.log('用户点击确定');
											if (res.data.data.url.substring(res.data.data.url.length - 3) == 'wgt') {
												var dtask = plus.downloader.createDownload(
													res.data.data.url, {
														//拿到下载任务的对象
														filename: '_doc/update/'
													},
													function(d, status) {
														plus.nativeUI.closeWaiting();
														if (status == 200) {
															//在回调中根据状态 进行操作
															var path = d.filename;
															This.installWgt(path);
														} else {
															uni.showToast({
																title: '配置出错,请检查网络链接！',
																duration: 2000
															});
														}
													}
												);

												dtask.start();

												dtask.addEventListener('statechanged', function(task, status) {
													console.log(task.state);
													switch (task.state) {
														case 1:
															console.log('正在下载');
															break;
														case 2:
															console.log('已连接到服务器');
															break;
														case 3:
															This.jdt = parseInt((parseFloat(task.downloadedSize) / parseFloat(task.totalSize)) * 100);
															if (This.jdt % 10 == 0) {
																// console.log("　　 已下载" + prg + "%　　 ");
																if (This.jdt == 100) {
																	This.loading_status = false;
																} else {
																	This.loading_status = true;
																}
																console.log('　　 已下载' + This.jdt + '%　　 ');
																break;
															}

														case 4:
															plus.nativeUI.closeWaiting();
															break;
													}
												});
											} else {
												plus.runtime.openURL(res.data.data.url);
												// #ifdef APP-PLUS
												plus.runtime.quit();
												// #endif
											}
										} else if (ress.cancel) {
											// #ifdef APP-PLUS
											plus.runtime.quit();
											// #endif
											console.log('用户点击取消');
										}
									}
								});
							}
						}
					});
				});
			},
			installWgt(path) {
				plus.nativeUI.showWaiting('更新中...');
				plus.runtime.install(
					path, {},
					function() {
						plus.nativeUI.closeWaiting();
						console.log('安装wgt文件成功！');
						plus.nativeUI.alert('应用更新完成！', function() {
							plus.runtime.restart();
						});
					},
					function(e) {
						plus.nativeUI.closeWaiting();
						console.log('安裝wgt文件失败[' + e.code + ']：' + e.message);
						plus.nativeUI.alert('更新失败[' + e.code + ']：' + e.message);
					}
				);
			}
		}
	};
</script>

<style lang="scss">
	.grabBag_body {
		flex: 1;
		padding: 20upx;
		display: flex;
		flex-direction: column;
		border-radius: 25upx;

		.grabBag_head {
			width: 100%;

			box-sizing: border-box;
			display: flex;
			align-items: center;

			.label {
				margin-right: 44upx;
			}

			.grabBag_head_content {
				flex: 1;
				overflow: auto;
				display: flex;
				align-items: center;
				padding-right: 10upx;
				box-sizing: border-box;

				&::-webkit-scrollbar {
					display: none;
				}

				.grabBag_head_inner {
					display: flex;

					.grabBag_head_item {
						margin-right: 28upx;
						margin-left: 28upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						flex-shrink: 0;

						.date {
							font-size: 40upx;
							font-weight: bolder;
							color: #000000;
						}

						.label_text {
							margin-top: 15upx;
							font-size: 26upx;
							color: #999;

							&.active {
								margin-top: 10upx;
								border-radius: 19upx;
								padding: 6upx 21upx;
								font-size: 30upx;
								color: #fff;
								background-color: #f43840;
								border-radius: 30upx;
							}
						}
					}
				}
			}
		}
	}

	.container {
		width: 100%;
		min-height: 100%;
	}

	.loading_c {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 999999;
		display: none;
	}

	.loading_c.active {
		display: block;
	}

	.header {
		padding-left: 30upx;
		padding-right: 30upx;
		box-sizing: border-box;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 9999999;

		.head_conter {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.head_user {
				display: flex;
				align-items: center;
			}
		}
	}

	.header .header_box {
		height: 88upx;
	}

	.content {
		flex: 1;
	}

	/* baner */
	.swiper {}

	.swiper1 {
		padding: 0 30upx;
		box-sizing: border-box;
		margin-top: 10upx;
	}

	.swiper1 image {
		width: 700px;
		height: 240rpx;
		border-radius: 20upx;
	}

	/* 公告 */
	.gg_box {
		margin: 20upx 30upx;
		box-sizing: border-box;
		height: 70upx;
	}

	.gg_box .img_l {
		padding-top: 16upx;
		align-self: flex-start;
	}

	.text-cut {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.gg_box text {
		color: #4397f1;
		margin-right: 30upx;
		font-size: 22upx;
		padding-left: 30upx;
	}

	.gg_box .gg_text {
		font-size: 24upx;
		color: #ffffff;
		flex: 1;
		padding-top: 10upx;
	}

	/* 货币 */
	.hb_box {
		margin: 0 15upx;
	}

	.hb_box .hb_warp {
		width: 335upx;
		height: 140upx;
		border-radius: 20upx;
		padding: 40upx 30upx;
		box-sizing: border-box;
	}

	.hb_box .hb_warp image {
		margin-right: 30upx;
	}

	.hb_box .hb_warp .r_text .t1 {
		font-size: 36upx;
		font-weight: bold;
	}

	.hb_box .hb_warp .r_text .t2 {
		font-size: 22upx;
	}

	.banner_gg_box {
		margin: 20upx 15upx;
		height: 188upx;
		border-radius: 20upx;
		position: relative;
	}

	.banner_gg_box .icon_close {
		position: absolute;
		top: 20upx;
		right: 20upx;
		width: 20upx;
		height: 20upx;
	}

	.banner_gg_box .gg_text_box {
		position: absolute;
		bottom: 0upx;
		left: 0upx;
		width: 70upx;
		height: 28upx;
		text-align: center;
		line-height: 28upx;
		font-size: 18upx;
		border-radius: 20upx;
		background: rgba(255, 255, 255, 0.4);
		color: #ffffff;
	}

	/* 列表 */
	.b_list_box {
		width: 100%;
	}

	.tab_nav_box {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		height: 120upx;
		line-height: 120upx;
		border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
	}

	.tab_nav_box text {
		margin-right: 28upx;
		color: #8c949f;
		font-weight: bold;
		font-size: 30upx;
		line-height: 120upx;
	}

	.tab_nav_box .active {
		color: #9baff6;
	}

	.index_four {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0 20upx;

		.four_item {
			width: 160upx;
			height: 160upx;
			box-sizing: border-box;
			border-radius: 32upx;
			padding: 15upx;

			.four_title {
				display: flex;
				justify-content: space-between;

				.bim {
					width: 48upx;
					height: 48upx;
					border-radius: 24upx;
					font-size: 20upx;
					text-align: center;
					line-height: 48upx;
					color: #3A98C0;
				}

				.four_usdt {
					text-align: right;
				}
			}

			.four_num {
				display: flex;
				justify-content: space-between;
				margin-top: 30upx;
			}
		}

		// 
		.four_item2:first-child {
			background-color: #35B0E8;
		}

		.four_item2 {
			width: 160upx;
			height: 160upx;
			box-sizing: border-box;
			border-radius: 32upx;
			padding: 15upx;
			border: 2upx solid #C0E0FD;

			.four_title {
				display: flex;
				justify-content: space-between;

				.bim {
					width: 48upx;
					height: 48upx;
					border-radius: 24upx;
					font-size: 20upx;
					text-align: center;
					line-height: 48upx;
					color: #3A98C0;
				}

				.four_usdt {
					text-align: right;
				}
			}

			.four_num {
				display: flex;
				justify-content: space-between;
				margin-top: 30upx;
			}
		}


	}


	.b_list_box .lst_title {
		height: 60upx;
		line-height: 60upx;
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.b_list_box .lst_title view {
		color: #8792a8;
		font-size: 24upx;
		width: 33.333%;
	}

	.b_list_box .list_box {
		width: 100%;
		box-sizing: border-box;
		height: 100upx;
		border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
	}

	.list_warp {
		padding: 0 50upx;
		box-sizing: border-box;
		width: 100%;
	}

	.list_box {
		width: 100%;
	}

	.list_box .itme_row {
		width: 33.333%;
	}

	.list_box .itme_row .name1 {
		color: #242933;
		font-size: 32upx;
	}

	.list_box .itme_row .name2 {
		color: #8792a8;
		font-size: 18upx;
		margin-left: 6upx;
	}

	.list_box .itme_row .price {
		font-size: 36upx;
	}

	.list_box .itme_row .icon_up {
		width: 24upx;
		height: 24upx;
		margin-left: 10upx;
	}

	.list_box .itme_row .money {
		width: 130upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		background: #e0ebff;
		font-size: 30upx;
		color: #4966f5;

		align-self: flex-end;
	}

	.list_box .itme_row .moneys {
		border-radius: 30upx;
		width: 170upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		// background: #24b29b;
		font-size: 30upx;
		color: #ffffff;

		align-self: flex-end;
	}

	.list {
		display: flex;
		margin: 20upx 0;
		justify-content: space-between;

		navigator {
			flex: 1;
		}
	}

	.list .li:nth-of-type(2) {
		margin: 0 40upx;
	}

	.li .num {
		display: flex;
		flex-direction: column;
	}

	.block {
		height: 200px;
		line-height: 200px;
		text-align: center;
		margin: 10px;
		background-color: aquamarine;
	}

	.content .loadingText {
		line-height: 30px;
		text-align: center;
		font-size: 12px;
		color: #999;
	}

	#preloader_1 {
		height: 40px;
		line-height: 40px;
		position: relative;
		text-align: center;
	}

	#preloader_1 span {
		width: 5px;
		height: 5px;
		margin: 0 1px;
		display: inline-block;
		vertical-align: middle;
		background: #9b59b6;
		animation: preloader_1 1.5s infinite ease-in-out;
	}

	#preloader_1 span:nth-child(2) {
		animation-delay: 0.2s;
	}

	#preloader_1 span:nth-child(3) {
		animation-delay: 0.4s;
	}

	#preloader_1 span:nth-child(4) {
		animation-delay: 0.6s;
	}

	#preloader_1 span:nth-child(5) {
		animation-delay: 0.8s;
	}

	@keyframes preloader_1 {
		0% {
			height: 5px;
			background: #9b59b6;
		}

		25% {
			height: 30px;
			background: #3498db;
		}

		50% {
			height: 5px;
			background: #9b59b6;
		}

		100% {
			height: 5px;
			background: #9b59b6;
		}
	}
</style>
