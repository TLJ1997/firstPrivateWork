<template>
	<view class="container hi-columns" :style="hb_status ? 'background:#FFF;' : 'background:#05060F'">
		<view class="header hi-columns">
			<view class="hi-columns" :style="'height:' + statusBarH + 'px;width: 100%;'"></view>
			<view class="hi-rows hi-flex-vcenter hi-space-between" style="padding-top: 40upx;padding-bottom: 30upx; box-sizing: border-box;">
				<view class=""></view>
				<view class="hi-rows" @click="eidt()">
					<text style="color: #FFF;font-size: 28upx;">{{ $t('wallet.bjb') }}</text>
					<!-- 编辑币图片 -->
					<image src="../../../static/wallet/icon_edit.png" style="width: 30upx;height: 30upx;margin-left: 10upx;" mode=""></image>
				</view>
			</view>
			<view class="nav_box hi-columns">
				<scroll-view class="grace-scroll-x hi-flex-vcenter hi-flex-center" scroll-x style="width: 670upx;height: 100upx;">
					<view class="item hi-columns hi-flex-vcenter hi-flex-center" :class="zhanghu.index == index ? 'active' : ''" v-for="(item, index) in zhanghu.list"
					 :key="index" @click="nav_bizhong(index)">
						<text>{{ item.name }}</text>
						<view :class="zhanghu.index == index ? 'yd' : ''"></view>
					</view>
				</scroll-view>
			</view>
		</view>
		<image class="banner" :src="hb_status ? '../../../static/wallet/bg_day.png' : '../../../static/wallet/bg_night.png'"
		 mode=""></image>

		<!-- 币币总资产折合 -->
		<view class="wallet_box" style="background: url(../../../static/wallet/bg_coin.png) no-repeat center;">
			<view class="hi-columns">
				<view class="hi-rows hi-flex-vcenter hi-space-between">
					<view class="l_z_text hi-flex-vcenter hi-space-between">
						<image src="../../../static/wallet/icon_coin.png" style="width: 46upx;height: 46upx;margin-right: 20upx;" mode=""></image>
						<text class="text">{{ changbi }}{{ $t('wallet.zjczh') }}</text>
					</view>
					<image class="isshow_money" :src="isshow_money ? '../../../static/wallet/icon_open.png' : '../../../static/wallet/icon_shut.png'"
					 @click="isshow_money_btn()" style="width: 40upx;height: 40upx;" mode=""></image>
				</view>
				<view class="money_text hi-columns" style="height: 80upx;">
					<block v-if="isshow_money">
						<text class="m_text">
							{{ equivalentUs }}
							<text style="font-size: 28upx;">(USDT)</text>
						</text>
					</block>
					<block v-else><text class="m_text" style="padding-top: 20upx;">****************</text></block>
				</view>
				<text class="safe_text">≈{{ equivalentCn }}(CNY)</text>
			</view>
		</view>
		
		<!-- 币种列表 -->
		<view class="grace-scroll-y con_box" :style="'height:' + (windowHeight - header_H) + 'px;'">
			<you-scroll ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" style="height: 100%;">
				<view class="bbList">
					<navigator class="bbItem" v-for="(itme, index) in lists" :key="index" open-type="navigate" :url="'/pages/wallet/bizc/bizc?buming=' + itme.symbol + '&diji=' + index + '&changwaibibi=' + changwaibibi"
					 :style="hb_status ? 'background: #FFFFFF;' : 'background: #18253D;'">
						<image :src="itme.imgUrl" class="bbImg"></image>
						<view class="bbName">
							{{ itme.symbol }}
						</view>
						<view class="keyong">
							<view :style="hb_status ? 'color: #18253D;' : 'color: #FFFFFF;'">{{ $t('wallet.ky') }}</view>
							<view style="color: #16C0F1;">{{ Number(itme.available).toFixed(4) }}</view>
						</view>
						<view class="keyong">
							<view :style="hb_status ? 'color: #18253D;' : 'color: #FFFFFF;'">{{ $t('wallet.dj') }}</view>
							<view class=" " style="color: #FDB957;">{{ Number(itme.hold).toFixed(4) }}</view>
						</view>
					</navigator>
				</view>
			</you-scroll>
		</view>


		<view :class="isshow_left_muen ? 'left_muen_maks active' : 'left_muen_maks'" :style="hb_status ? 'background: rgba(0,0,0,.7);' : 'background: rgba(0,0,0,.3);'"
		 @click="eidt()"></view>
		<view :class="isshow_left_muen ? 'left_muen_box active' : 'left_muen_box'" :style="backgroundALL == '#1c1f22' ? 'background:#18253D;' : 'background:#ffffff'">
			<!-- 标题栏 -->
			<view class="muen_header hi-columns" :style="'padding-top: ' + statusBarH + 'px;'">
				<view class="hi-rows hi-flex-vcenter  hi-space-between">
					<view class="hi-rows hi-flex-vcenter">
						<image :src="hb_status ? '../../../static/home/nav_icon_back_day.png' : '../../../static/home/nav_icon_back_night.png'" mode="" style="width:46upx;height: 46upx;" @click="eidt()"></image>
					</view>
					<view class="hi-rows hi-flex-vcenter"></view>
				</view>
			</view>
			<view class="header_title_box hi-rows hi-flex-vcenter hi-space-between">
				<view class="header_item hi-rows hi-flex-vcenter hi-space-between">
					<text class="t1" :style="hb_status ? 'color: #242833;' : 'color: #ffffff;'">{{ $t('wallet.bjb') }}</text>
					<text class="t2"></text>
				</view>
				<view class="header_item">
					<view class="h_btn" @click="editcoin()">{{ isedit ? $t('wallet.wc') : $t('wallet.bj') }}</view>
				</view>
			</view>
			<view class="menu_l_title" :style="hb_status ? 'color: #242833;' : 'color: #ffffff;'">
				{{ $t('wallet.ytj') }}
			</view>
			<view class="menu_btns_box hi-rows hi-flex-vcenter hi-left hi-wrap">
				<view class="btns_text" v-for="(b, index) in lists_select" :key="index" @click="deleteto(b.label)">
					{{ b.label }}
					<image src="/static/wallet/icon_delete.png" class="icon" v-show="isedit"></image>
				</view>
			</view>
			<!--drag-sorts :list="lists" :props="props" @change="onDragSortChange" ></drag-sorts-->
			<view class="menu_l_title" :style="hb_status ? 'color: #242833;border-left: 6upx solid #242933;' : 'color: #ffffff;border-left: 6upx solid #ffffff;'">
				{{ $t('wallet.wtj') }}
			</view>
			<view class="menu_btns_box hi-rows hi-flex-vcenter hi-left hi-wrap">
				<view class="btns_text2" v-for="(c, index) in listsssss" :key="index" @click="addto(c.label)">
					{{ c.label }}
					<image src="/static/wallet/icon_addto.png" class="icon" v-show="isedit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var This;
	import youScroll from '@/components/you-scroll';
	import dragSorts from '@/components/drag-sorts/index.vue';
	export default {
		components: {
			dragSorts,
			youScroll
		},
		data() {
			return {
				listsssss: [],
				isshow_left_muen: false, //是否显示编辑币侧滑
				isedit: false, //是否在编辑币
				changbi: this.$t('wallet.bb'),
				lists: [],
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				isshow_money: true, //是否显示金额
				zhanghu: {
					index: 0,
					list: [{
							id: 1,
							name: this.$t('wallet.bbzh')
						},
						{
							id: 2,
							name: this.$t('wallet.cwzh')
						}
					]
				},
				lists_select: [],
				equivalentCn: '0.0000',
				equivalentUs: '0.0000',
				changwaibibi: '2',
				shanchu: [],
				jiachu: []
			};
		},
		onLoad() {
			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight;
					// console.log(JSON.stringify(res))
					console.log(This.windowHeight);
				}
			});

			setTimeout(function() {
				var view = uni.createSelectorQuery().select('.header');
				view.boundingClientRect(data => {
					// console.log("节点离页面顶部的距离为" + data.height);
					This.header_H = data.height;
					console.log(This.header_H);
				}).exec();
			}, 500);
			this.zhanghu = {
				index: 0,
				list: [{
						id: 1,
						name: this.$t('wallet.bbzh')
					},
					{
						id: 2,
						name: this.$t('wallet.cwzh')
					}
				]
			};
		},
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk');
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(() => {
				this.tab_init();
			}, 500);
			this.nav_bizhong(0);

			this.zhanghu.list = [{
					id: 1,
					name: this.$t('wallet.bbzh')
				},
				{
					id: 2,
					name: this.$t('wallet.cwzh')
				}
			];
		},
		methods: {
			addto(label) {
				if (this.isedit) {
					this.lists_select.push({
						label: label
					});
					this.listsssss = this.listsssss.filter(function(item) {
						return item.label != label;
					});
				}
				console.log(this.lists_select);
			},
			deleteto(label) {
				if (this.isedit) {
					this.lists_select = this.lists_select.filter(function(item) {
						return item.label != label;
					});

					this.listsssss.push({
						label: label
					});
					console.log(this.listsssss);
				}
			},
			onPullDown(done) {
				var that = this; // 下拉刷新
				console.log('下拉');
				setTimeout(() => {
					that.chuangjian(that.changwaibibi);
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
			chuangjian(laile) {
				uni.request({
					// http://106.55.42.122:5555/account/getAccountList
					url: this.websiteUrlqiabao + 'account/getAccountList',
					method: 'GET',
					data: {
						token: uni.getStorageSync('token'),
						userId: uni.getStorageSync('id'),
						type: laile
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					success: res => {
						console.log(res);
						if (res.data.code == 200) {
							this.lists = res.data.data.accounts;
							this.equivalentCn = res.data.data.equivalentCn;
							this.equivalentUs = res.data.data.equivalentUs;
							// 截取小数点后四位
							this.equivalentCn = this.equivalentCn.substring(0,this.equivalentCn.indexOf('.')+3);
							this.equivalentUs = this.equivalentUs.substring(0,this.equivalentUs.indexOf('.')+5);
						} else if (res.data.code == 500) {
							this.myAlert(res.data.msg);
						} else if (res.data.code == 402) {
							if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
								console.log('开启了指纹手势可以验证登录');
								uni.reLaunch({
									url: '../../../pages/indexzhiwen/indexzhiwen'
								});
							} else {
								console.log('没开启指纹手势去登录');
								uni.reLaunch({
									url: '../../../pages/login/login'
								});
							}
						}
					},
					fail: () => {}
				});
			},
			eidt() {
				//显示隐藏侧边栏
				uni.request({
					url: this.websiteUrlqiabao + 'account/getEditSymbolList',
					method: 'GET',
					data: {
						token: uni.getStorageSync('token'),
						userId: uni.getStorageSync('id'),
						accountType: this.changwaibibi
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					success: res => {
						console.log(res);

						if (res.data.code == 200) {
							this.lists_select = [];
							this.listsssss = [];
							this.lists_select = res.data.data.showList;
							this.listsssss = res.data.data.noShowList;
							this.isshow_left_muen = !this.isshow_left_muen;
						} else if (res.data.code == 500) {
							this.myAlert(res.data.msg);
						} else if (res.data.code == 402) {
							if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
								console.log('开启了指纹手势可以验证登录');
								uni.reLaunch({
									url: '../../../pages/indexzhiwen/indexzhiwen'
								});
							} else {
								console.log('没开启指纹手势去登录');
								uni.reLaunch({
									url: '../../../pages/login/login'
								});
							}
						}
					},
					fail: () => {}
				});
				// const subNVue = uni.getSubNVueById('editcoin')
				// subNVue.setStyle({
				// 	width:'100%',
				// 	height:'100%'
				// })
				//const subNVue = uni.getCurrentSubNVue();
				// console.log(subNVue)
				// 打开 nvue 子窗体
				// subNVue.show('slide-in-left', 300, function(){
				//     // 打开后进行一些操作...

				// });
			},
			editcoin() {
				//编辑币
				this.isedit = !this.isedit;
				if (!this.isedit) {
					var kanya = {
						token: uni.getStorageSync('token'),
						userId: uni.getStorageSync('id'),
						accountType: this.changwaibibi,
						showSymbols: JSON.stringify(this.lists_select),
						notShowSymbols: JSON.stringify(this.listsssss),
						state: '0'
					};
					console.log(kanya);
					uni.request({
						url: this.websiteUrlqiabao + 'account/edit',
						method: 'POST',
						data: kanya,
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'Accept-Language': 'zh'
						},
						success: res => {
							console.log(res);

							if (res.data.code == 200) {
								this.myAlert(res.data.msg);
								if (this.changwaibibi == 2) {
									this.nav_bizhong(0);
								} else {
									this.nav_bizhong(1);
								}
							} else if (res.data.code == 500) {
								this.myAlert(res.data.msg);
							} else if (res.data.code == 402) {
								if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
									console.log('开启了指纹手势可以验证登录');
									uni.reLaunch({
										url: '../../../pages/indexzhiwen/indexzhiwen'
									});
								} else {
									console.log('没开启指纹手势去登录');
									uni.reLaunch({
										url: '../../../pages/login/login'
									});
								}
							}
						},
						fail: () => {}
					});
				}
			},
			huazhuan() {
				uni.navigateTo({
					url: '../huazhuan/huazhuan'
				});
			},
			nav_bizhong(e) {
				//切换币种
				this.zhanghu.index = e;
				if (e == 0) {
					this.changbi = this.$t('wallet.bb');
					this.chuangjian(2);
					this.changwaibibi = 2;
				} else {
					this.changbi = this.$t('wallet.cw');
					this.chuangjian(1);
					this.changwaibibi = 1;
				}

				console.log(e);
			},
			isshow_money_btn() {
				this.isshow_money = !this.isshow_money;
			},

			tab_init() {
				if (this.backgroundALL == '#1c1f22') {
					this.hb_status = false;
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
				if (this.hb_status == true) {
					console.log('白天');
				} else {
					console.log('晚上');
				}
			}
		}
	};
</script>

<style>
	page,
	.container {
		height: 100%;
		width: 100%;
	}

	.bbItem {
		display: flex;
		justify-content: left;
		align-items: center;
		width: 750upx;
		margin: 40upx 0;
		padding: 30upx;
	}

	.bbImg {
		width: 60upx;
		height: 60upx;
		border: 2upx solid #98DBF3;
		padding: 12upx;
		border-radius: 26upx;
	}

	.bbName {
		width: 60upx;
		font-weight: 500;
		font-size: 32upx;
		color: #26C4F2;
		margin: 0 30upx;
	}

	.keyong {
		width: 280upx;
	}

	.header {
		padding: 0 40upx;
		box-sizing: border-box;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 99999;
	}

	.header .header_box {
		height: 88upx;
	}

	.banner {
		width: 750upx;
		height: calc(var(--status-bar-height) + 400upx);
		position: fixed;
		top: 0;
		left: 0;
	}

	.nav_box {
		width: 100%;
	}

	.grace-scroll-x .item {
		display: inline-flex;
		margin-right: 60upx;
	}

	.grace-scroll-x .item text {
		font-size: 36upx;
		color: #ffffff;
		font-weight: 700;
	}

	.grace-scroll-x .item.active text {
		font-size: 36upx;
		color: #47BFE9;
		font-weight: 700;
	}

	/* .grace-scroll-x .item.active .yd {
	width: 12upx;
	height: 12upx;
	background: #ffffff;
	border-radius: 6upx;
} */

	.con_box {
		position: relative;
		/* z-index: 999999999999; */
		width: 100%;
		box-sizing: border-box;
	}

	.wallet_box {
		width: 670upx;
		height: 300upx;
		border-radius: 20upx;
		margin: 0 40upx;
		position: relative;
		/* z-index: 99999999; */
		box-sizing: border-box;
		margin-top: calc(var(--status-bar-height) + 200upx);
		padding: 40upx;
	}

	.l_z_text .text {
		font-size: 32upx;
		color: #ffffff;
	}

	.wallet_box .money_text {
		margin-left: 60upx;
	}

	.wallet_box .money_text .m_c {
		font-size: 30upx;
		color: #ffffff;
		margin-left: 30upx;
	}

	.wallet_box .money_text .m_text {
		font-size: 60upx;
		color: #ffffff;
	}

	.wallet_box .safe_text {
		font-size: 28upx;
		color: #ffffff;
		margin-left: 60upx;
	}

	.item_box {
		padding: 35upx 40upx;
		box-sizing: border-box;
		border-radius: 20upx;
		margin-top: 20upx;
	}

	.item_box .title {
		font-size: 32upx;
		margin-left: 20upx;
		font-weight: 500;
	}

	.item_box .m_box .t1 {
		font-size: 30upx;
		align-self: flex-end;
	}

	.item_box .m_box .t2 {
		font-size: 24upx;
		color: #8792a8;
		align-self: flex-end;
	}

	.item_box .r {
		align-items: flex-start;
		text-align: left;
	}

	.item_box .flex1 {
		flex: 1;
		color: #8792a8;
		font-size: 26upx;
	}

	.item_box .t {
		color: #ffffff;
	}

	.left_muen_maks {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/* z-index: 999999999999999999999999999999998; */
		/* z-index: 999999999999999999999999999999998; */
		/*border-radius:0px 20px 20px 0px;*/
		transition: all 0.1s ease-in-out;
	}

	.left_muen_maks.active {
		display: flex;
	}

	.left_muen_box {
		position: fixed;
		top: 0;
		left: -650upx;
		width: 650upx;
		height: 100%;
		z-index: 99999999;
		transition: all 0.1s ease-in-out;
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
		color: #2AC3F1;
		border: 1upx solid #2AC3F1;
		width: 120upx;
		height: 58upx;
		border-radius: 50upx;
		line-height: 58upx;
	}

	.left_muen_box .menu_l_title {
		padding-left: 35upx;
		margin: 40upx 0;
		color:#2AC3F1;
	}

	.left_muen_box .menu_btns_box {
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.left_muen_box .menu_btns_box .btns_text {
		font-size: 22upx;
		width: 180upx;
		height: 60upx;
		margin: 15upx 10upx;
		line-height: 60upx;
		text-align: center;
		border-radius: 30upx;
		/* background: rgba(192, 196, 204, 0.2); */
		border: 1px solid #2AC3F1;
		color: #2AC3F1;
		flex-wrap: wrap;
		position: relative;
	}
	.left_muen_box .menu_btns_box .btns_text2 {
		font-size: 22upx;
		width: 180upx;
		height: 60upx;
		margin: 15upx 10upx;
		line-height: 60upx;
		text-align: center;
		border-radius: 30upx;
		background: rgba(192, 196, 204, 0.2);
		color: #2AC3F1;
		flex-wrap: wrap;
		position: relative;
	}
	.left_muen_box .menu_btns_box .btns_text .icon {
		width: 30upx;
		height: 30upx;
		right: 0upx;
		top: -5upx;
		position: absolute;
	}

	.left_muen_box .menu_btns_box .btns_text2 .icon {
		width: 30upx;
		height: 30upx;
		right: 0upx;
		top: -5upx;
		position: absolute;
	}
</style>
