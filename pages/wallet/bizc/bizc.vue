<template>
	<view class="container hi-columns" :style="hb_status?'background:#FFF;':'background:#05060F'">
		<view class="header hi-columns">
			<view class="hi-columns" :style="'height:'+statusBarH+'px;width: 100%;'"></view>
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image :src="hb_status?'../../../static/home/nav_icon_back_night.png':'../../../static/home/nav_icon_back_night.png'"
				 mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
				<view class=""></view>
			</view>
			<view class="nav_box hi-columns">
				<scroll-view class="grace-scroll-x hi-flex-vcenter hi-flex-center" scroll-x :scroll-into-view="'view'+bizhong.index"
				 style="width: 670upx;height: 100upx;">
					<view class="item hi-columns hi-flex-vcenter hi-flex-center" :id="'view'+item.id" :class="bizhong.index==index?'active':''"
					 v-for="(item,index) in bizhong.list" :key="index" @click="nav_bizhong(index)">
						<text>{{item.name}}</text>
						<view :class="bizhong.index==index?'yd':''"></view>
					</view>
				</scroll-view>
			</view>
			<view class="zc_box">
				<view class="hi-columns">
					<view class="hi-rows">
						<canvas canvas-id="canvasRing" id="canvasRing" class="charts"></canvas>
						<view class="hi-columns hi-space-between" style="flex: 1;padding-right: 40upx;box-sizing: border-box;padding-top: 30upx;padding-bottom: 30upx;">
							<view class="item_i hi-rows hi-flex-vcenter hi-space-between">
								<text class="zzc_text">{{bizhongming}}{{$t('wallet.zjc')}}</text>
								<image class="isshow_money" :src="isshow_money?'../../../static/wallet/icon_open.png':'../../../static/wallet/icon_shut.png'"
								 @click="isshow_money_btn()" style="width: 40upx;height: 40upx;" mode=""></image>
							</view>
							<view class="item_i">
								<text class="money_text" v-if="isshow_money">{{Number(balance).toFixed(4)}}</text>
								<text class="money_text" v-else>*****************</text>
							</view>
							<view class="item_i">
								<text class="cny">≈{{Number(equivalentCn).toFixed(4)}}(CNY)</text>
							</view>
						</view>
					</view>
					<block v-if="fenchangbi === '2'">
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="padding: 0 40upx; padding-top: 30upx; box-sizing: border-box;">
							<navigator open-type="navigate" :url="'/pages/wallet/chongbi/chongbi?bizhong='+bizhongming">
								<view class="btn">{{$t('wallet.cb')}}</view>
							</navigator>
							<navigator open-type="navigate" :url="'/pages/wallet/tibi/tibi?bizhong='+bizhongming">
								<view class="btn">{{$t('wallet.tb')}}</view>
							</navigator>
							<navigator open-type="navigate" :url="'/pages/wallet/huazhuan/huazhuan?bizhong='+bizhongming+'&changbi='+fenchangbi" v-show="bizhongming=='USDT'">
								<view class="btn">{{$t('wallet.hz')}}</view>
							</navigator>
						</view>
					</block>
					<block v-else>
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="padding: 0 40upx; padding-top: 30upx; box-sizing: border-box;">
							<navigator open-type="navigate" :url="'/pages/wallet/huazhuan/huazhuan?bizhong='+bizhongming+'&changbi='+fenchangbi">
								<view class="btn">{{$t('wallet.hz')}}</view>
							</navigator>
						</view>
					</block>
				</view>
			</view>
			<view class="zc_text hi-rows hi-flex-vcenter  hi-space-between" style="margin-top: -10upx;" :style="hb_status?'background:#FFF;':'background:#05060F'">
				<view class="hi-rows">
					<text class="t_bt_text" :style="hb_status?'color: #242833;':'color: #ffffff;'">{{$t('wallet.cwjl')}} <text style="font-size: 25upx;">（{{xiaowen}}）</text></text>
					<!-- <view class="bt_bj">共搜索到0条交易记录</view> -->
				</view>
				<view class="hi-columns hi-flex-vcenter" @click="showDialog1()">
					<image src="../../../static/wallet/icon_screen.png" style="width: 30upx;height: 30upx;" mode=""></image>
					<text style="color: #8792A8;font-size: 22upx;margin-top: 10upx;">{{$t('wallet.sx')}}</text>
				</view>

			</view>
		</view>
		<image class="banner" style="z-index: 1;" :src="hb_status?'../../../static/wallet/bg_day.png':'../../../static/wallet/bg_night.png'"
		 mode=""></image>
		<view class="grace-scroll-y con_box" :style="'height:'+(windowHeight - header_H )+'px;margin-top:'+(header_H )+'px;'">


			<view class="list_box">
				<scroll-view ref="scroll" style="height: 100%;" :style="hb_status?'background:#FFF;':'background:#05060F'">
					<view v-for="(item, index) in huohuolist" :key="index" class="bizhong" style="padding:0upx 35upx;" @click="coininfo(item.type,item.id)"
					 :style="hb_status?'background:#FFF;':'background:#05060F'">
						<view style="width: 100%;display: inline-flex;border-bottom: 1upx solid #ececec;padding-bottom: 30upx;">
							<view style="display: flex;flex-direction: column;justify-content:center; width: 37%;position: relative;">
								<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;" v-if="item.type == 1">{{$t('wallet.cb')}}</view>
								<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;" v-if="item.type == 2">{{$t('wallet.tb')}}</view>
								<view style="font-weight: bold;font-size: 28upx; color: #393B59; line-height:50upx;" v-if="item.type == 3">
									<view v-if="item.fromAccount == 1">{{$t('wallet.cwzh')}} ▶ {{$t('wallet.bbzh')}}</view>
									<view v-if="item.fromAccount == 2">{{$t('wallet.bbzh')}} ▶ {{$t('wallet.cwzh')}}</view>
								</view>
								<view style="font-size: 25upx;color: #7E8DA2;display: flex;flex-direction: column;">
									<text style="color: #989898;font-size: 28upx;margin-bottom: 10upx;">{{$t('trade.sl')}}</text>
									<text style="color: #333333;font-size: 28upx;">{{item.num}}</text>
								</view>
							</view>
							<view style="display: flex;align-items: flex-end;justify-content:center; width:23%;" v-if="item.type == 1">
								<view style="font-size: 25upx;color: #7E8DA2;display: flex;flex-direction: column;" v-if="item.status == 0">
									<text style="color: #989898;font-size: 28upx;margin-bottom: 10upx;">{{$t('wallet.zt')}}</text>
									<text style="color: #333333;font-size: 28upx;">{{$t('wallet.dtqr')}}</text>
								</view>
								<view style="font-size: 25upx;color: #7E8DA2;display: flex;flex-direction: column;" v-if="item.status == 1">
									<text style="color: #989898;font-size: 28upx;margin-bottom: 10upx;">{{$t('wallet.zt')}}</text>
									<text style="color: #333333;font-size: 28upx;">{{$t('wallet.qrdz')}}</text>
								</view>
								<view style="font-size: 25upx;color: #7E8DA2;display: flex;flex-direction: column;" v-if="item.status == 2">
									<text style="color: #989898;font-size: 28upx;margin-bottom: 10upx;">{{$t('wallet.zt')}}</text>
									<text style="color: #333333;font-size: 28upx;">{{$t('wallet.cg')}}</text>
								</view>
								<view style="font-size: 25upx;color: #7E8DA2;display: flex;flex-direction: column;" v-if="item.status == 3">
									<text style="color: #989898;font-size: 28upx;margin-bottom: 10upx;">{{$t('wallet.zt')}}</text>
									<text style="color: #333333;font-size: 28upx;">{{$t('wallet.sb')}}</text>
								</view>
							</view>
							<view style="display: flex;align-items: flex-end;justify-content:center; width: 24%;" v-if="item.type == 2">
								<view style="font-size: 25upx;color: #7E8DA2;display: flex;flex-direction: column;" v-if="item.status == 0">
									<text style="color: #989898;font-size: 28upx;margin-bottom: 10upx;">{{$t('wallet.zt')}}</text>
									<text style="color: #333333;font-size: 28upx;">{{$t('wallet.dsh')}}</text>
								</view>
								<view style="font-size: 25upx;color: #7E8DA2;display: flex;flex-direction: column;" v-if="item.status == 1">
									<text style="color: #989898;font-size: 28upx;margin-bottom: 10upx;">{{$t('wallet.zt')}}</text>
									<text style="color: #333333;font-size: 28upx;">{{$t('wallet.cg')}}</text>
								</view>
								<view style="font-size: 25upx;color: #7E8DA2;display: flex;flex-direction: column;" v-if="item.status == 2">
									<text style="color: #989898;font-size: 28upx;margin-bottom: 10upx;">{{$t('wallet.zt')}}</text>
									<text style="color: #333333;font-size: 28upx;">{{$t('wallet.bh')}}</text>
								</view>
							</view>
							<view style="display: flex;align-items: flex-end;justify-content:center; width: 24%;" v-if="item.type == 3">
								<view style="font-size: 25upx;color: #7E8DA2;display: flex;flex-direction: column;" v-if="item.status == 0">
									<text style="color: #989898;font-size: 28upx;margin-bottom: 10upx;">{{$t('wallet.zt')}}</text>
									<text style="color: #333333;font-size: 28upx;">{{$t('wallet.sb')}}</text>
								</view>
								<view style="font-size: 25upx;color: #7E8DA2;display: flex;flex-direction: column;" v-if="item.status == 1">
									<text style="color: #989898;font-size: 28upx;margin-bottom: 10upx;">{{$t('wallet.zt')}}</text>
									<text style="color: #333333;font-size: 28upx;">{{$t('wallet.cg')}}</text>
								</view>
							</view>
							<view style="display: flex;align-items: flex-end;justify-content: flex-end; width:36%;">
								<view style="font-size: 25upx;color: #7E8DA2;display: flex;flex-direction: column;">
									<text style="color: #989898;font-size: 28upx;margin-bottom: 10upx; text-align: right;">{{$t('wallet.time')}}</text>
									<text style="color: #333333;font-size: 28upx;text-align: right;">{{item.createDate}}</text>
								</view>

							</view>
							<view style="width:4%;display: flex;align-items: flex-end;justify-content: flex-end;">
								<image src="../../../static/img/sandian.png" style="width: 20upx; height: 45upx;" mode=""></image>
							</view>
						</view>
					</view>
					<view style="font-size: 25upx; width: 100%;line-height: 80upx; text-align: center; color: #999;" v-if="huohuolist.length == 0">{{$t('wallet.zwjl')}}</view>
				</scroll-view>
			</view>

			<view class="hi-rows" style="height: 140upx;width: 100%;"></view>
		</view>
		<graceBottomDialog :show="show1" v-on:closeDialog="closeDialog1">
			<view slot="btns" style="width: 100%; box-sizing: border-box;z-index: 9999999;">
				<view class="grace-btdialog-btns" style="width: 100%;display: block; background-color: #f3f4f6; padding: 35upx; box-sizing: border-box;">
					<view style="width: 100%; color:#007AFF; background-color: #FFF; border-radius: 20upx;padding: 0;  text-align: center; height: 80upx; line-height: 80upx;"
					 @tap="confirm1(0)">{{$t('wallet.qb')}}</view>
					<view style="width: 100%; color:#007AFF; background-color: #FFF; border-radius: 20upx;padding: 0;  text-align: center; margin-top: 20upx; height: 80upx; line-height: 80upx;"
					 @tap="confirm1(1)">{{$t('wallet.cz')}}</view>
					<view style="width: 100%; color:#007AFF; background-color: #FFF; border-radius: 20upx;padding: 0;  text-align: center; margin-top: 20upx; height: 80upx; line-height: 80upx;"
					 @tap="confirm1(2)">{{$t('wallet.tb')}}</view>
					<view style="width: 100%; color:#007AFF; background-color: #FFF; border-radius: 20upx;padding: 0; text-align: center; margin-top: 20upx; height: 80upx; line-height: 80upx;"
					 @tap="confirm1(3)">{{$t('wallet.hz')}}</view>
					<view style="width: 100%; color:#000; background-color: #FFF; border-radius: 20upx; text-align: center;padding: 0;  margin-top: 20upx; height: 80upx; line-height: 80upx;"
					 @tap="closeDialog1">{{$t('wallet.qx')}}</view>
				</view>
			</view>
		</graceBottomDialog>

	</view>
</template>

<script>
	var This;
	var _self;
	var canvaRing = null;
	import youScroll from '@/components/you-scroll'
	import graceBottomDialog from '../../../graceUI/components/graceBottomDialog.vue';
	import uCharts from '@/components/u-charts/u-charts.js';
	export default {
		components: {
			graceBottomDialog: graceBottomDialog,
			youScroll
		},
		data() {
			return {
				xiaowen: this.$t('wallet.qb'),
				show1: false,
				bizhongming: '',
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				isshow_money: true, //是否显示金额
				bizhong: {
					index: 0,
					list: [

					]
				},
				huohuolist: [],
				listts: [1, 2, 3, 4, 5],
				charts: {
					cWidth: '',
					cHeight: '',
					pixelRatio: 1,
					serverData: [{
							name: this.$t('wallet.yb'),
							data: 30,
							color: '#FF4C88'
						},
						{
							name: this.$t('wallet.eb'),
							data: 20,
							color: '#FAC519'
						},
						{
							name: this.$t('wallet.sanb'),
							data: 50,
							color: '#5E44FF'
						}
					]
				},
				charts1: {
					cWidth: '',
					cHeight: '',
					pixelRatio: 1,
					serverData: [{
							id: "001",
							data: [{
									name:  this.$t('wallet.yb'),
									data: 20,
									color: '#FF4C88'
								},
								{
									name:  this.$t('wallet.eb'),
									data: 80,
									color: '#FAC519'
								}
							]
						}
						// ,
						// {
						// 	id:"002",
						// 	data:[
						// 		{	
						// 			name:'一班',
						// 			data:60,
						// 			color: '#FF4C88'
						// 		},
						// 		{
						// 			name:'二班',
						// 			data:40,
						// 			color:'#FAC519'
						// 		}
						// 	]
						// },
						// {
						// 	id:"003",
						// 	data:[
						// 		{	
						// 			name:'一班',
						// 			data:26,
						// 			color: '#FF4C88'
						// 		},
						// 		{
						// 			name:'二班',
						// 			data:74,
						// 			color:'#FAC519'
						// 		}
						// 	]
						// }

					]

				},
				fenchangbi: '1',
				dadengji: '',
				buxianchong: false,
				leixing: 0,
				pagejia: 1,
				balance: '0.000',
				equivalentCn: '0.000'
			}
		},
		onReachBottom: function() {
			var that = this
			uni.showLoading({
				title:  this.$t('stylePulic.Loading')
			});
			setTimeout(function() {
				uni.hideLoading();
				that.pagejia = Number(that.pagejia) + 1
				that.jiazailist(that.dadengji)
			}, 1000);
		},
		onLoad(e) {
			console.log(e)
			this.bizhongming = e.buming
			this.fenchangbi = e.changwaibibi

			this.dadengji = e.diji
			uni.request({
				url: this.websiteUrlqiabao + 'account/getSymbolList',
				method: 'GET',
				data: {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					type: this.fenchangbi
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
				},
				success: (res) => {
					console.log(res)
					if (res.data.code == 200) {
						this.lists = res.data.data
						this.bizhong = {
								index: 0,
								list: this.lists
							},
							console.log(this.bizhong)
						this.nav_bizhong(this.dadengji)
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

			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight
					// console.log(JSON.stringify(res))
					console.log(This.windowHeight)
				}
			})

			setTimeout(function() {

				var view = uni.createSelectorQuery().select(".header");
				view.boundingClientRect(data => {
					// console.log("节点离页面顶部的距离为" + data.height);
					This.header_H = data.height;
					console.log(This.header_H)
				}).exec();



			}, 500)

			_self = this;
			_self.charts.cWidth = uni.upx2px(240);
			_self.charts.cHeight = uni.upx2px(240);
			_self.showRing('canvasRing');


			_self.charts1.cWidth = uni.upx2px(130);
			_self.charts1.cHeight = uni.upx2px(130);

			for (var i = 0; i < _self.charts1.serverData.length; i++) {

				var id = 'canvasRing' + This.charts1.serverData[i].id;
				console.log(id)
				console.log(i)

				_self.showRing1(id, _self.charts1.serverData[i].data);



			}



		},
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk')
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(()=>{
				this.tab_init();
			},500)
		},
		methods: {
			onPullDown(done) { // 下拉刷新
				console.log('下拉')
				setTimeout(() => {
					this.list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
					done(); // 完成刷新
				}, 1000 * 1)
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
				}, 1000 * 1)
			},
			scrollTo() {
				this.$refs.scroll.goTop();
			},
			showDialog1: function() {
				this.show1 = true;
			},
			closeDialog1: function() {
				this.show1 = false;
			},
			confirm1: function(index) {
				console.log(index)
				if (index == 0) {
					this.xiaowen = this.$t('wallet.qb')
				} else if (index == 1) {
					this.xiaowen = this.$t('wallet.cz')
				} else if (index == 2) {
					this.xiaowen =  this.$t('wallet.tb')
				} else if (index == 3) {
					this.xiaowen = this.$t('wallet.hz')
				}

				this.closeDialog1();
				// if (index == 1) {
				// 	this.show2 = true
				// } else{
				// 	uni.navigateTo({
				// 		url: '../shanduimingxi/shanduimingxi?addre='+this.addres
				// 	})
				// }
				this.leixing = index
				this.pagejia = 1
				var zhebishishaaaa = {
					accountType: this.fenchangbi,
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					page: this.pagejia,
					symbol: this.bizhongming,
					type: index
				}
				console.log(zhebishishaaaa)
				uni.request({
					url: this.websiteUrlqiabao + 'account/getSymbolInfo',
					method: 'GET',
					data: zhebishishaaaa,
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success: (res) => {
						console.log(res)

						if (res.data.code == 200) {
							this.balance = res.data.data.balance
							this.equivalentCn = res.data.data.equivalentCn
							this.huohuolist = res.data.data.records
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
			huazhuan() {
				uni.navigateTo({
					url: "../huazhuan/huazhuan?bizhong=" + this.bizhongming
				})
			},
			coininfo(type,id){
				uni.navigateTo({
					url: "../neijilu/neijilu?type=" +type+"&id="+id
				})
			},
			jiazailist(e) {
				let This=this;
				console.log(e)
				var zhebishishasss = {
					accountType: this.fenchangbi,
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					page: this.pagejia,
					symbol: this.bizhongming,
					type: this.leixing
				}
				console.log(zhebishishasss)
				uni.request({
					url: this.websiteUrlqiabao + 'account/getSymbolInfo',
					method: 'GET',
					data: zhebishishasss,
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success: (res) => {
						console.log(res)

						if (res.data.code == 200) {
							if (this.pagejia > res.data.data.totalPage) {
								uni.showToast({
									title: This.$t('stylePulic.Nomore'),
									icon: 'none',
									duration: 1000
								});
							} else {
								if (res.data.data.records == null || res.data.data.records.length == 0) {
									uni.showToast({
										title:This.$t('stylePulic.Nomore'),
										icon: 'none',
										duration: 1000
									});
								} else {
									uni.showToast({
										title: This.$t('stylePulic.Loaded'),
										icon: 'none',
										duration: 1000
									});
									this.huohuolist = this.huohuolist.concat(res.data.data.records);
									console.log(this.huohuolist)
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

					},
					fail: () => {

					}
				});
			},
			nav_bizhong(e) { //切换币种
				this.bizhong.index = e;
				this.dadengji = e
				this.bizhongming = this.bizhong.list[e].name
				console.log(e);
				this.pagejia = 1
				this.leixing = 0
				this.xiaowen = this.$t('wallet.qb')
				var zhebishisha = {
					accountType: this.fenchangbi,
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					page: this.pagejia,
					symbol: this.bizhongming,
					type: this.leixing
				}
				console.log(zhebishisha)
				uni.request({
					url: this.websiteUrlqiabao + 'account/getSymbolInfo',
					method: 'GET',
					data: zhebishisha,
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success: (res) => {
						console.log(res)

						if (res.data.code == 200) {
							this.balance = res.data.data.balance
							this.equivalentCn = res.data.data.equivalentCn
							this.huohuolist = res.data.data.records
						} else {
							this.huohuolist = []
						}

					},
					fail: () => {

					}
				});
			},
			isshow_money_btn() {
				this.isshow_money = !this.isshow_money;
			},

			showRing(canvasId) {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: {
						show: false,
						backgroundColor: 'rgba(0,0,0,1)'
					},
					extra: {
						pie: {
							offsetAngle: -45,
							ringWidth: 17 * _self.charts.pixelRatio,
							labelWidth: 15
						}
					},
					pixelRatio: _self.charts.pixelRatio,
					series: _self.charts.serverData,
					animation: true,
					width: _self.charts.cWidth * _self.charts.pixelRatio,
					height: _self.charts.cHeight * _self.charts.pixelRatio,
					disablePieStroke: false,
					dataLabel: false,
					background: '#39BAE8'
				});
			},
			touchRing(e) {
				canvaRing.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},

			Back() {
				uni.navigateBack({ //后退
					delta: 1
				})
			},
			showRing1(canvasId, chartData) {
				console.log(JSON.stringify(chartData))
				var canvaRing = 'canvaRing' + canvasId;
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: {
						show: false,
						backgroundColor: 'rgba(0,0,0,1)'
					},
					extra: {
						pie: {
							offsetAngle: -45,
							ringWidth: 17 * _self.charts1.pixelRatio,
							labelWidth: 15
						}
					},
					pixelRatio: _self.charts1.pixelRatio,
					series: chartData,
					animation: true,
					width: _self.charts1.cWidth * _self.charts1.pixelRatio,
					height: _self.charts1.cHeight * _self.charts1.pixelRatio,
					disablePieStroke: false,
					dataLabel: false,
					background: '#39BAE8'
				});
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
				if (this.hb_status == true) {
					console.log('白天')
				} else {
					console.log('晚上')
				}
			}
		}
	}
</script>

<style>
	.btns {
		display: flex;
		height: 88upx;
		line-height: 88upx;
		width: 90%;
		justify-content: center;
		background: #F8C94A;
		color: #FFF;
		border-radius: 14upx;
		font-size: 38upx;
	}

	page,
	.container {
		height: 100%;
		width: 100%;
	}

	.zc_text {
		width: 100%;
		position: relative;
		left: 0;
		padding-top: 30upx;
		box-sizing: border-box;
		margin-bottom: 20upx;
	}

	.zc_text .t_bt_text {
		font-size: 40upx;
		color: #FFFFFF;
		font-weight: bold;
	}

	.zc_text .bt_bj {
		font-size: 22upx;
		color: #8792A8;
		align-self: flex-end;
	}

	.header {
		padding: 0 30upx;
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
		font-size: 30upx;
		color: #FFFFFF;
	}

	.grace-scroll-x .item.active text {
		font-size: 48upx;
	}

	.grace-scroll-x .item.active .yd {
		width: 12upx;
		height: 12upx;
		background: #FFFFFF;
		border-radius: 6upx;
	}

	.con_box {
		position: relative;
		width: 100%;
		box-sizing: border-box;
	}

	.zc_box {
		width: 100%;
		background: #39BAE8;
		border-radius: 20upx;
		height: 380upx;
		z-index: 2;
	}

	.zc_box .item_i .zzc_text {
		font-size: 32upx;
		color: #FFFFFF;
	}

	.zc_box .item_i .money_text {
		font-size: 46upx;
		color: #FFFFFF;
		display: inline-flex;
		width: 400upx;
	}

	.zc_box .item_i .cny {
		font-size: 28upx;
		color: #FFFFFF;
	}

	.zc_box .btn {
		font-size: 28upx;
		color: #FFFFFF;
		width: 165upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		border-radius: 30upx;
		border: 1upx solid #FFFFFF;
	}

	.item_wallet_box {
		padding: 30upx 40upx;
		box-sizing: border-box;
		width: 670upx;
		margin: 0upx 40upx 20upx 40upx;
		border-radius: 20upx;
		padding-left: 0;
	}

	.item_wallet_box .title {
		font-size: 30upx;
		color: #FFFFFF;
	}

	.item_wallet_box .btns {
		font-size: 30upx;
		color: #FFFFFF;
		width: 180upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		border: 2upx solid rgba(58, 116, 252, 1);
		border-radius: 30upx;
		color: #3A74FC;
	}

	.item_wallet_box .money {
		color: #F36C2A;
		font-size: 36upx;
	}

	.item_wallet_box .cny {
		color: #8792A8;
		font-size: 28upx;
	}

	.item_wallet_box .r {
		align-items: flex-start;
		text-align: left;
	}

	.item_wallet_box .flex1 {
		flex: 1;
		color: #8792A8;
	}

	.list_box {
		flex: 1;
		width: 100%;
	}


	.item_box {
		padding: 35upx 40upx;
		box-sizing: border-box;
	}

	.item_box .title {
		font-size: 36upx;
		margin-left: 30upx;
		font-weight: 500;
	}

	.item_box .m_box .t1 {
		font-size: 30upx;
		align-self: flex-end;
	}

	.item_box .m_box .t2 {
		font-size: 24upx;
		color: #8792A8;
		align-self: flex-end;
	}

	.item_box .r {
		align-items: flex-start;
		text-align: right;
	}

	.item_box .flex1 {
		flex: 1;
		color: #8792A8;
		font-size: 26upx;
	}

	.item_box .t {
		color: #FFFFFF;
	}

	.charts {
		width: 240upx;
		height: 240upx;
	}

	.charts1 {
		width: 130upx;
		height: 130upx;
	}
</style>
