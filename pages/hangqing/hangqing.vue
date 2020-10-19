<template>
	<view class="container hi-columns" :style="'background:' + backgroundALL + ';'">
		<view class="header hi-columns" :style="hb_status ? 'background: #ffffff;color: #242933;' : 'background: #2b2f30;color:white;'">
			<view class="" :style="'height: ' + statusBarH + 'px;width: 100%;'"></view>
			<view class="header_box hi-flex hi-space-between hi-flex-vcenter">
				<view></view>
				<view style="font-size: 40upx;font-weight: bold;text-align: center;">{{$t('hangqing.hq')}}</view>
				<view @tap="eidt()">{{$t('hangqing.bjzx')}}</view>
			</view>
		</view>
		<view :style="'margin-top: ' + header_H + 'px;box-sizing: border-box;'" style="position: relative;width: 100%; background-color: #FFF;">
			<view style="position: absolute;top: 0;width: 100%;" :style="hb_status ? 'background: #ffffff;' : 'background: #2b2f30;'">
				<view class="hi-flex nc-flex-main-around" :style="hb_status ? 'background: #ffffff;color: #242933;' : 'background: #2b2f30;color:white;'">
					<view class="list-item" v-for="(item, switchIndex) in naveSwitchs" :key="switchIndex" :class="naveSwitchsIndex == switchIndex ? 'switch-active' : ''"
					 @tap="nav_switch(switchIndex)">
						{{ item }}
					</view>
				</view>
				<view class="content hi-columns">
					<view class="b_list_box hi-columns">
						<view class="swiper hi-columns" style="padding-bottom: 130upx;">
							<view>
								<view class="swiper-item hi-columns">
									<view class="lst_title hi-rows hi-flex-vcenter hi-space-between">
										<view>{{$t('hangqing.bz')}}</view>
										<view style="text-align: center;">
											{{$t('hangqing.zxj')}}
											<!-- {{list_num[current] * 100}} -->
										</view>
										<view style="text-align: right;">{{$t('hangqing.zf')}}(24h)</view>
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
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view :class="isshow_left_muen ? 'left_muen_maks active' : 'left_muen_maks'" :style="hb_status ? 'background: rgba(0,0,0,.7);' : 'background: rgba(0,0,0,.3);'"
		 @click="eidt()"></view>
		 <!-- 编辑自选弹框 -->
		<view :class="isshow_left_muen ? 'left_muen_box hi-columns active' : 'left_muen_box'" :style="backgroundALL == '#1c1f22' ? 'background:#2c3031;' : 'background:#ffffff'">
			<!-- 标题栏 -->
			
			
			<view style="display: flex;justify-content: left;align-items: center;">
				<view class="muen_header hi-columns">
					<view class="hi-rows hi-flex-vcenter  hi-space-between">
						<view class="hi-rows hi-flex-vcenter">
							<image :src="hb_status ? '../../static/home/nav_icon_back_day.png' : '../../static/home/nav_icon_back_night.png'"
							 mode="" style="width:46upx;height: 46upx;" @click="eidt()"></image>
						</view>
						<view class="hi-rows hi-flex-vcenter"></view>
					</view>
				</view>
				<view class="header_title_box hi-rows hi-flex-vcenter hi-space-between">
					<view class="header_item hi-rows hi-flex-vcenter hi-space-between"><text class="t1" :style="hb_status ? 'color: #242833;' : 'color: #ffffff;'">{{$t('hangqing.bb')}}</text></view>
					<view class="header_item"></view>
				</view>
			</view>
			
			
			<scroll-view class="grace-scroll-x" scroll-x :style="hb_status ? 'border-bottom: 1upx solid rgba(0,0,0,.1);' : 'border-bottom: 1upx solid rgba(255,255,255,.1);'">
				<view class="item" :class="bibilist.index == index ? 'active' : ''" v-for="(item, index) in bibilist.lists" :key="index"
				 @click="nav_bizhong(index, item.label)">
					<text>{{ item.label }}</text>
				</view>
			</scroll-view>
			<view class="search_box hi-columns" v-show="!xianduo">
				<view class="search_warp hi-rows hi-flex-vcenter" style="position:relative ;">
					<text class="grace-icons icon-search"></text>
					<input type="text" v-model="shousuonei" @input="sousuo" :placeholder="input_ssbz" placeholder-style="color: #C6C6C6;" />
				</view>
			</view>
			<view class="list_bizhong">
				<view v-for="(items, index) in bizhonglist" :key="index" v-if="items != null" @click="tiaoti(items.tradingPair)" class="hi-rows hi-flex-vcenter hi-space-between item" :style="hb_status ? 'border-bottom: 1upx solid rgba(0,0,0,.1);' : 'border-bottom: 1upx solid rgba(255,255,255,.1);'">
					<view class="hi-rows hi-flex-vcenter">
						<text class="t1" :style="hb_status ? 'color: #66C9ED;' : 'color: #ffffff;'">{{ items.tradingPair }}</text>
					</view>
					<view class="hi-rows">
						<text class="r_t":style="hb_status ? 'color: #000;' : 'color: #red;'">{{ items.price }}</text>
					</view>
				</view>

				<view class="hi-columns" style="height: 34upx;width: 100%; text-align: center;justify-content: center;height: 80upx;"
				 v-show="xianduo">
					<button @tap="zixuangengduo" style="width: 200upx; height: 60upx;border-radius: 10upx; background: #ececec; font-size: 30upx; padding: 0;line-height: 60upx;">
						{{$t('hangqing.djjagd')}}
					</button>
				</view>
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
				input_ssbz: this.$t('hangqing.ssbz'),
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
				wsbian: '1',
				lunbolist: [],
				gonggaolist: [],
				isshow_left_muen: false, //是否显示侧滑
				bibilist: '',
				bizhonglist: [],
				pagejia: 1,
				shousuonei: '',
				xianduo: true,
				naveSwitchs: [this.$t('hangqing.hq'), this.$t('hangqing.zx')],
				naveSwitchsIndex: 0,
				fileterJiyiDui: '',
				qiebizhong: 'YK/USDT'
			};
		},
		onLoad() {
			//
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
					console.log(This.header_H);
				}).exec();
			}, 500);
		},
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk');
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(() => {
				this.tab_init();
			}, 500);

			var _this = this; //声明一个变量指向vue实例this,保证作用域一致
			uni.connectSocket({
				url: 'ws://106.55.42.122:7777/quotes',
				header: {
					'content-type': 'application/json'
				},

				success: function(rs) {
					console.log(rs);
				}
			});
			uni.onSocketOpen(function(res) {
				console.log('WebSocket连接已打开！');
			});
			this.timer = setInterval(function() {
				uni.sendSocketMessage({
					data: _this.wsbian
				});
				uni.onSocketMessage(function(res) {
					// console.log(res)
					if (res.data == 'hello') {} else {
						var zhesi = res.data;
						var list = JSON.parse(zhesi);
						list.map(v => {
							v.familySize = v.familySize.toFixed(2);
						});
						if (_this.naveSwitchsIndex == 1) {
							list = list.filter(item => {
								let str = JSON.stringify(_this.bizhonglist);
								return str.includes(item.symbol);
							});
						}
						_this.xiaoxibuy = list;
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
					console.log(res);
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
					console.log(res);
					this.gonggaolist = res.data.data;
				},
				fail: () => {}
			});
		},
		onHide() {
			if (this.timer != null) {
				clearInterval(this.timer);
				this.timer = null;
				uni.closeSocket();
			}
		},
		methods: {
			zixuan(tradingPair, status) {
				var tianjianzixuan = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					tradingPair: tradingPair,
					state: status
				};
				console.log(tianjianzixuan);
				uni.request({
					url: this.websiteUrlbibi + 'api/setOptionalTradingPair', //仅为示例，并非真实接口地址。
					data: tianjianzixuan,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					method: 'POST',
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							this.myAlert(res.data.msg);
						} else if (res.data.code == 500) {
							this.myAlert(res.data.msg);
						} else if (res.data.code == 402) {
							if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
								console.log('开启了指纹手势可以验证登录');
								uni.reLaunch({
									url: '../../pages/indexzhiwen/indexzhiwen'
								});
							} else {
								console.log('没开启指纹手势去登录');
								uni.reLaunch({
									url: '../../pages/login/login'
								});
							}
						}
					}
				});
				this.zixuanlist();
			},
			nav_switch(index) {
				this.naveSwitchsIndex = index;
				console.log('切换到：' + index);
				this.zixuanlist();
			},

			nav_bizhong(e, bizhong) {
				//切换侧滑币种
				this.bibilist.index = e;
				console.log(e + '==========' + bizhong);
				this.suobi = bizhong;
				if (this.bibilist.index == 0) {
					this.zixuanlist();
					this.xianduo = true;
				} else {
					this.suoyinlist(bizhong);
					this.xianduo = false;
				}
				this.shousuonei = '';
			},
			zixuanlist() {
				var zixuanlist = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					page: 1
				};
				console.log(zixuanlist);
				uni.request({
					url: this.websiteUrlbibi + 'api/optionalTradingPair', //仅为示例，并非真实接口地址。
					data: zixuanlist,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							this.bizhonglist = res.data.data.optionals;
						} else if (res.data.code == 500) {
							this.myAlert(res.data.msg);
						} else if (res.data.code == 402) {
							if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
								console.log('开启了指纹手势可以验证登录');
								uni.reLaunch({
									url: '../../pages/indexzhiwen/indexzhiwen'
								});
							} else {
								console.log('没开启指纹手势去登录');
								uni.reLaunch({
									url: '../../pages/login/login'
								});
							}
						}
					}
				});
			},
			suoyinlist(bizhong) {
				var huoqubaseSymbol = {
					baseSymbol: bizhong
				};
				uni.request({
					url: this.websiteUrlbibi + 'api/getTradingPairList', //仅为示例，并非真实接口地址。
					data: huoqubaseSymbol,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							this.bizhonglist = res.data.data;
						} else if (res.data.code == 500) {
							this.myAlert(res.data.msg);
						} else if (res.data.code == 402) {
							if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
								console.log('开启了指纹手势可以验证登录');
								uni.reLaunch({
									url: '../../pages/indexzhiwen/indexzhiwen'
								});
							} else {
								console.log('没开启指纹手势去登录');
								uni.reLaunch({
									url: '../../pages/login/login'
								});
							}
						}
					}
				});
			},
			eidt() {
				//显示隐藏侧边栏
				this.isshow_left_muen = !this.isshow_left_muen;
				this.zixuanlist();
				this.jiaoyiduilist();
			},
			gengduozixuan() {
				var This = this;
				var gengduo = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					page: this.pagejia
				};
				console.log(gengduo);
				uni.request({
					url: this.websiteUrlbibi + 'api/optionalTradingPair', //仅为示例，并非真实接口地址。
					data: gengduo,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							if (this.pagejia > res.data.data.totalPages) {
								uni.showToast({
									title: This.$t('stylePulic.Nomore'),
									icon: 'none',
									duration: 1000
								});
							} else {
								uni.showToast({
									title: This.$t('stylePulic.Loaded'),
									icon: 'none',
									duration: 1000
								});
								if (res.data.data.optionals == null || res.data.data.optionals == '') {
									this.bizhonglist = [];
								} else {
									this.bizhonglist = this.bizhonglist.concat(res.data.data.optionals);
									console.log(this.bizhonglist);
								}
							}
						} else if (res.data.code == 500) {
							this.myAlert(res.data.msg);
						} else if (res.data.code == 402) {
							if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
								console.log('开启了指纹手势可以验证登录');
								uni.reLaunch({
									url: '../../pages/indexzhiwen/indexzhiwen'
								});
							} else {
								console.log('没开启指纹手势去登录');
								uni.reLaunch({
									url: '../../pages/login/login'
								});
							}
						}
					}
				});
			},
			zixuangengduo() {
				var that = this;
				uni.showLoading({
					title: that.$t('stylePulic.Loading')
				});
				setTimeout(() => {
					uni.hideLoading();
					that.pagejia = Number(that.pagejia) + 1;
					that.gengduozixuan();
				}, 1000);
			},
			sousuo(e) {
				console.log(e);
				var xuanwo = {
					baseSymbol: this.suobi,
					parameter: this.shousuonei
				};
				console.log(xuanwo);
				uni.request({
					url: this.websiteUrlbibi + 'api/searchForInfo', //仅为示例，并非真实接口地址。
					data: xuanwo,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							this.bizhonglist = res.data.data;
						} else if (res.data.code == 500) {
							this.myAlert(res.data.msg);
						} else if (res.data.code == 402) {
							if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
								console.log('开启了指纹手势可以验证登录');
								uni.reLaunch({
									url: '../../pages/indexzhiwen/indexzhiwen'
								});
							} else {
								console.log('没开启指纹手势去登录');
								uni.reLaunch({
									url: '../../pages/login/login'
								});
							}
						}
					}
				});
			},
			jiaoyiduilist() {
				uni.request({
					url: this.websiteUrlbibi + 'api/getBaseSymbolList', //仅为示例，并非真实接口地址。
					data: {},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);
						this.bibilist = {
							index: 1,
							lists: res.data.data
						};
						console.log(this.bibilist);
						this.suoyinlist(res.data.data[1].label);
						this.xianduo = false;
					}
				});
			},
			tiaoti(e) {
				this.fileterJiyiDui = (e + '').split('/')[0];
				console.log(this.fileterJiyiDui);
				this.isshow_left_muen = false;
				// this.$eventHub.$emit('jiayidui',e+'/'+a);
				// uni.switchTab({
				// 	url:'../trade/trade'
				// })
				this.zixuan(e, this.bibilist.index);
			},
			tiaoTrade(e, a) {
				console.log(e, a);
				this.$eventHub.$emit('jiayidui', e + '/' + a);
				uni.switchTab({
					url: '../trade/trade'
				});
			},
			afandao(index) {
				var This = this;
				if (index == 0) {
					uni.navigateTo({
						url: '../afanda/zhaungzhang/zhaungzhang'
					});
				} else if (index == 1) {
					uni.navigateTo({
						url: '../afanda/kuangchi/kuangchi'
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
					this.myAlert(This.$t('hangqing.zwkf'));
				} else if (index == 5) {
					this.myAlert(This.$t('hangqing.zwkf'));
				} else if (index == 6) {
					uni.navigateTo({
						url: '../afanda/dingdanzhongxin/dingdanzhongxin'
					});
				} else if (index == 7) {
					uni.navigateTo({
						url: '../afanda/tuandui/tuandui'
					});
				} else if (index == 8) {
					this.myAlert(This.$t('hangqing.zwkf'));
				} else if (index == 9) {
					this.myAlert(This.$t('hangqing.zwkf'));
				}
			},
			qugonglist() {
				uni.navigateTo({
					url: '../gonggaolist/gonggaolist'
				});
			},
			quhehuoren() {
				uni.navigateTo({
					url: '../wo/xinhehuo/xinhehuo'
				});
				// uni.navigateTo({
				// 	url:"../wo/hehuoren/hehuoren"
				// })
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
			tab_init() {
				if (this.backgroundALL == '#1c1f22') {
					this.hb_status = false;
					uni.setNavigationBarColor({
						frontColor: '#ffffff',
						backgroundColor: '#2d3033'
					});
					uni.setTabBarStyle({
						backgroundColor: '#2d3033',
						color: '#8792A8',
						selectedColor: '#267cc0',
						borderStyle: 'black'
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
						selectedColor: '#267cc0',
						borderStyle: 'white'
					});
				}
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
							console.log(res.platform);
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
									title: This.$t('hangqing.gxts'),
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
																title: This.$t('hangqing.pzcc'),
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
				let This = this;
				plus.nativeUI.showWaiting(This.$t('stylePulic.gxz'));
				plus.runtime.install(
					path, {},
					function() {
						plus.nativeUI.closeWaiting();
						console.log('安装wgt文件成功！');
						plus.nativeUI.alert(This.$t('stylePulic.yygxwc'), function() {
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

<style>
	.list-item {
		font-size: large;
		padding: 15rpx 0;
	}

	.switch-active {
		color: #70B8FA;
		font-weight: 700;
		/* border-bottom: 4rpx solid #007aff; */
	}

	.container {
		width: 100%;
		min-height: 100vh;
		height: 100%;
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
		width: 690rpx;
		height: 276rpx;
		border-radius: 20upx;
	}

	/* 公告 */
	.gg_box {
		box-sizing: border-box;
		height: 70upx;
		border-radius: 20upx;
	}

	.gg_box .img_l {
		width: 50upx;
		align-self: flex-start;
	}

	.gg_box text {
		color: #000;
		margin-right: 30upx;
		font-size: 25upx;
		/* border-left: 4upx solid #999999; */
		padding-left: 30upx;
	}

	.gg_box .gg_text {
		font-size: 24upx;
		color: #ffffff;
		flex: 1;
		margin: 0 20upx;
	}

	/* 货币 */
	.hb_box {
		margin: 0 30upx;
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
		margin: 20upx 30upx;
		height: 138upx;
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

	.tab_nav_box view {
		margin-right: 28upx;
		width: 50%;
		text-align: center;
		color: #999;

		font-size: 35upx;
		line-height: 120upx;
	}

	.tab_nav_box .active {
		color: #000000;
		font-size: 40upx;
		/* font-weight: bold; */
		/* border-bottom: 6upx solid #f53152; */
		padding-bottom: 33upx;
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
		height: 120upx;
		/* 	border-bottom: 1upx solid rgba(0, 0, 0, .1); */
	}

	.list_warp {
		padding: 0 30upx;
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
		font-size: 36upx;
	}

	.list_box .itme_row .name2 {
		color: #8792a8;
		font-size: 20upx;
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
		border-radius: 30upx;
		width: 160upx;
		padding: 0 15upx;
		height: 50upx;
		line-height: 50upx;
		text-align: right;
		background: #f53152;
		font-size: 30upx;
		color: #fff;

		align-self: flex-end;
	}

	.list_box .itme_row .moneys {
		border-radius: 30upx;
		width: 170upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		/* background: #00b090; */
		font-size: 30upx;
		color: #ffffff;

		align-self: flex-end;
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

	.left_muen_maks {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9999999999;
		transition: all 0.3s ease-in-out;
	}

	.left_muen_maks.active {
		display: flex;
	}

	.left_muen_box {
		position: fixed;
		top: 0;
		left: -650upx;
		width: 600upx;
		height: 100%;
		overflow: hidden;
		z-index: 9999999999;
		/* border-radius: 0px 20upx 20upx 0px; */
		transition: all 0.3s ease-in-out;
	}

	.left_muen_box.active {
		left: 0;
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
		color: #ffffff;
		font-weight: bold;
	}

	.header_title_box .header_item .t2 {
		color: #8792a8;
		font-size: 22upx;
		margin-left: 19upx;
	}

	.header_title_box .header_item .h_btn {
		color: #3a74fc;
		border: 1upx solid #3a74fc;
		width: 120upx;
		height: 58upx;
		border-radius: 29upx;
		line-height: 58upx;
	}

	.left_muen_box .menu_l_title {
		padding-left: 35upx;
		margin: 40upx 0;
	}

	.left_muen_box .menu_btns_box {
		padding: 0 40upx;
		box-sizing: border-box;
	}

	.left_muen_box .menu_btns_box .btns_text {
		font-size: 22upx;
		width: 180upx;
		height: 60upx;
		margin: 15upx 0;
		line-height: 60upx;
		text-align: center;
		border-radius: 30upx;
		background: rgba(192, 196, 204, 0.2);
		color: #8792a8;
		flex-wrap: wrap;
	}

	.grace-scroll-x {
		padding: 0upx 40upx;
		box-sizing: border-box;
	}

	.grace-scroll-x .item {
		display: inline-flex;
		margin-right: 60upx;
		border-bottom: 6upx solid rgba(0, 0, 0, 0);
		height: 80upx;
		line-height: 80upx;
	}

	.grace-scroll-x .item text {
		font-size: 30upx;
		color: #6e778a;
	}

	.grace-scroll-x .item.active {
		border-bottom: 6upx solid #4966f5;
	}

	.search_box {
		width: 100%;
		padding: 0 40upx;
		margin: 20upx 0;
		box-sizing: border-box;
	}

	.search_box .search_warp {
		width: 100%;
		height: 70upx;
		line-height: 70upx;
		/* border: 1upx solid rgba(135, 146, 168, 1); */
		border-radius: 16upx;
	}

	.search_box .search_warp .grace-icons {
		font-size: 28upx;
		color: #8792a8;
		margin: 0 30upx;
	}

	.search_box .search_warp input {
		font-size: 28upx;
		color: #8792a8;
		flex: 1;
		padding-right: 20upx;
		box-sizing: border-box;
	}

	.list_bizhong {
		width: 100%;
		overflow-y: auto;
		flex: 1;
		padding: 0 40upx;
		box-sizing: border-box;
		padding-right: 0;
	}

	.list_bizhong .item {
		width: 100%;
		padding-right: 40upx;
		box-sizing: border-box;
		height: 110upx;
	}

	.list_bizhong .item .t1 {
		font-size: 30upx;
	}

	.list_bizhong .item .t2 {
		font-size: 24upx;
		color: #8792a8;
	}

	.list_bizhong .item .r_t {
		font-size: 32upx;
	}

	.list_bizhong .item .r_t.red {
		color: #e0316c;
	}

	.list_bizhong .item .r_t.lv {
		color: #24b29b;
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

	/* 
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
    	animation-delay: .2s;
    }
    
    #preloader_1 span:nth-child(3) {
    	animation-delay: .4s;
    }
    
    #preloader_1 span:nth-child(4) {
    	animation-delay: .6s;
    }
    
    #preloader_1 span:nth-child(5) {
    	animation-delay: .8s;
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
    } */
</style>
