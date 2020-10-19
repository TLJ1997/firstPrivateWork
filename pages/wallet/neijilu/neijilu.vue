<template>
	<view class="container hi-columns" :style="backgroundALL == '#1c1f22'?'background:#05060F;':'background:#FFF;'">
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
		<view class="hi-columns" style="flex: 1;width: 100%;">
			<view class="header_title_box hi-rows hi-flex-vcenter hi-space-between">
				<view class="header_item hi-rows hi-flex-vcenter hi-space-between" style="text-align: center;">
					<view class="t1" style="text-align: center; width: 100%;" :style="hb_status?'color: #0065e0;':'color: #ffffff;'">{{num}}</view>
				</view>
				<view class="header_item">
				</view>
			</view>

			<view class="content hi-columns" :style="hb_status?'background:#FFFFFF;color:#242933;margin-bottom: 100upx;':'background: #18253D;color:#ffffff;margin-bottom: 100upx;'">
				
				<view class="item hi-columns">
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="border-bottom: 1upx solid #ececec;">
						<text class="t_text" :style="hb_status?'color: #999;':'color: #FFFFFF;'" >{{$t('wallet.bz')}}</text>
						<view class="hi-columns sm_text" style="flex: 1;overflow-y: auto;padding: 40upx; color: #6E778A; text-align: right;">
							<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;">{{symbol}}</view>
						</view>	
					</view>
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="border-bottom: 1upx solid #ececec;">
						<text class="t_text" :style="hb_status?'color: #999;':'color: #FFFFFF;'" >{{$t('wallet.lx')}}</text>
						<view class="hi-columns sm_text" style="flex: 1;overflow-y: auto;padding: 40upx; color: #6E778A; text-align: right;">
							<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;" v-if="type == 1">{{$t('wallet.cb')}}</view>
							<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;" v-if="type == 2">{{$t('wallet.tb')}}</view>
							<view style="font-weight: bold;font-size: 28upx; color: #393B59; line-height:50upx;" v-if="type == 3">
								<view v-if="fromAccountType == 1">{{$t('wallet.cwzh')}} ▶ {{$t('wallet.bbzh')}}</view>
								<view v-if="fromAccountType == 2">{{$t('wallet.bbzh')}} ▶ {{$t('wallet.cwzh')}}</view>
							</view>
						</view>
					</view>
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="border-bottom: 1upx solid #ececec;" v-if="type == 1 || type == 2 ">
						<text class="t_text" :style="hb_status?'color: #999;':'color: #FFFFFF;'" style="width: 40%;">{{$t('wallet.qkjyid')}}</text>
						<view class="hi-columns sm_text" style="flex: 1;padding: 40upx; color: #6E778A; text-align: right;width: 60%;word-break:break-all;white-space:normal;">
							<text style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx; text-align: right;white-space:normal;width:100%;word-break:break-all;">{{txid}}</text>
						</view>	
					</view>
					
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="border-bottom: 1upx solid #ececec;" v-if="type == 1">
						<text class="t_text" :style="hb_status?'color: #999;':'color: #FFFFFF;'" >{{$t('wallet.zt')}}</text>
						<view class="hi-columns sm_text" style="flex: 1;overflow-y: auto;padding: 40upx; color: #6E778A; text-align: right;" v-if="status == 0">
							<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;">{{$t('wallet.dtqr')}}</view>
						</view>
						<view class="hi-columns sm_text" style="flex: 1;overflow-y: auto;padding: 40upx; color: #6E778A; text-align: right;" v-if="status == 1">
							<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;">{{$t('wallet.qrdz')}}</view>
						</view>
						<view class="hi-columns sm_text" style="flex: 1;overflow-y: auto;padding: 40upx; color: #6E778A; text-align: right;" v-if="status == 2">
							<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;">{{$t('wallet.cg')}}</view>
						</view>
						<view class="hi-columns sm_text" style="flex: 1;overflow-y: auto;padding: 40upx; color: #6E778A; text-align: right;" v-if="status == 3">
							<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;">{{$t('wallet.sb')}}</view>
						</view>
					</view>
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="border-bottom: 1upx solid #ececec;" v-if="type == 2">
						<text class="t_text" :style="hb_status?'color: #999;':'color: #FFFFFF;'" >{{$t('wallet.zt')}}</text>
						<view class="hi-columns sm_text" style="flex: 1;overflow-y: auto;padding: 40upx; color: #6E778A; text-align: right;" v-if="status == 0">
							<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;">{{$t('wallet.dsh')}}</view>
						</view>
						<view class="hi-columns sm_text" style="flex: 1;overflow-y: auto;padding: 40upx; color: #6E778A; text-align: right;" v-if="status == 1">
							<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;">{{$t('wallet.cg')}}</view>
						</view>
						<view class="hi-columns sm_text" style="flex: 1;overflow-y: auto;padding: 40upx; color: #6E778A; text-align: right;" v-if="status == 2">
							<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;">{{$t('wallet.bh')}}</view>
						</view>
					</view>
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="border-bottom: 1upx solid #ececec;" v-if="type == 3">
						<text class="t_text" :style="hb_status?'color: #999;':'color: #FFFFFF;'" >{{$t('wallet.zt')}}</text>
						<view class="hi-columns sm_text" style="flex: 1;overflow-y: auto;padding: 40upx; color: #6E778A; text-align: right;" v-if="status == 0">
							<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;">{{$t('wallet.sb')}}</view>
						</view>
						<view class="hi-columns sm_text" style="flex: 1;overflow-y: auto;padding: 40upx; color: #6E778A; text-align: right;" v-if="status == 1">
							<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;">{{$t('wallet.cg')}}</view>
						</view>
						
					</view>
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="border-bottom: 1upx solid #ececec;" v-if="type == 2 ">
						<text class="t_text" :style="hb_status?'color: #999;':'color: #FFFFFF;'" >{{$t('wallet.tbdz')}}</text>
						<view class="hi-columns sm_text" style="flex: 1;overflow-y: auto;padding: 40upx; color: #6E778A; text-align: right;">
							<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;">{{address}}</view>
						</view>	
					</view>
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="border-bottom: 1upx solid #ececec;" v-if="type == 2 ">
						<text class="t_text" :style="hb_status?'color: #999;':'color: #FFFFFF;'" >{{$t('wallet.sxf')}}</text>
						<view class="hi-columns sm_text" style="flex: 1;overflow-y: auto;padding: 40upx; color: #6E778A; text-align: right;">
							<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;">{{fee}}</view>
						</view>	
					</view>
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="border-bottom: 1upx solid #ececec;">
						<text class="t_text" :style="hb_status?'color: #999;':'color: #FFFFFF;'" >{{$t('wallet.sj')}}</text>
						<view class="hi-columns sm_text" style="flex: 1;overflow-y: auto;padding: 40upx; color: #6E778A; text-align: right;">
							<view style="font-weight: bold;font-size: 30upx; color: #393B59; line-height:50upx;">{{createDate}}</view>
						</view>	
					</view>
					
				</view>

			</view>
			

 

		</view>


	</view>
</template>

<script>
	var This;
	export default {
		data() {
			return {
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				ide:'',
				typee:'',
				address: '',
				createDate:'',
				fee:'',
				fromAccountType:'',
				num: '',
				status:'',
				symbol:'',
				toAccountType:'',
				txid:'',
				type:''
			}
		},
		onLoad(e) {
			console.log(e)
			this.typee = e.type
			this.ide = e.id
			var zhebishisha = {
				recordId: this.ide,
				token: uni.getStorageSync('token'),
				userId: uni.getStorageSync('id'),
				type: this.typee
			}
			console.log(zhebishisha)
			uni.request({
				url: this.websiteUrlqiabao + 'account/getRecordDetails',
				method: 'GET',
				data: zhebishisha,
				header: {
					'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
				},
				success: (res) => {
					console.log(res)
			
					if (res.data.code == 200) {
						this.address = res.data.data.address
						this.createDate = res.data.data.createDate
						this.fee = res.data.data.fee
						this.fromAccountType = res.data.data.fromAccountType
						this.num = res.data.data.num
						this.status = res.data.data.status
						this.symbol = res.data.data.symbol
						this.toAccountType = res.data.data.toAccountType
						this.txid = res.data.data.txid
						this.type = res.data.data.type
					} else {
						
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
	
	.content .item .t_text{font-size: 28upx;padding-left: 34upx;box-sizing: border-box;}
	.content .item .t_r_infto{color: #8792A8;font-size: 20upx;}
	.content .item .input_box{padding: 0 40upx;box-sizing: border-box;padding-left: 0;padding-bottom: 23upx;}
	.content .item .input_box input{font-size: 36upx;padding-left: 34upx;box-sizing: border-box;color: #8792A8;flex: 1;}
	.content .item .input_box .biz{font-size: 22upx;color: #8792A8;padding-right: 30upx;border-right: 2upx solid rgba(0,0,0,.1);margin-right: 30upx;}
	.content .item .input_box .all_btn{font-size: 28upx;color: #3A74FC;}
	.content .item .input_box .textarea_box{min-height: 240upx;background: #C0C4CC;width: 590upx;margin-left: 40upx;padding: 20upx;box-sizing: border-box;position: relative;}
		.content .item .input_box .textarea_box textarea{flex: 1;font-size: 28upx;width: 100%;padding-bottom: 20upx;box-sizing: border-box;}
		.content .item .input_box .textarea_box .num{font-size: 20upx;color: #8792A8;position: absolute;right: 20upx;bottom: 20upx;}
	
	.sm_text text{line-height: 48upx;}
	
	page {
		height: 100%;
	}

	.container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
	}

	.muen_header {}

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
	.bi_title .name{font-size: 36upx;margin: 0 20upx;}

	.content {
		width: 670upx;
		margin: 0 40upx;
		border-radius: 16upx;
		box-sizing: border-box;
		padding-bottom: 55upx;
	}

	
</style>
