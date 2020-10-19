<template>
	<view class="container" :style="hb_status?'height: 100vh;background:#ffffff;':'background:#05060F;'">
		<view class="header hi-columns"  :style="hb_status?'background:#ffffff;':'background:#05060F;'">
			<view class="" :style="'height: ' + statusBarH + 'px;width: 100%;'"></view>
			<view class="header_box hi-rows hi-flex-vcenter">
				<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'" mode="" style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view class="header-title" :style="'color:'+colorALL">{{$t('afanda.why')}}</view>
				<view class="header-title-right">{{$t('afanda.hysm')}}</view>
			</view>
		</view>
		<view class="content hi-columns" :style="hb_status?'background:#F0F3F5;padding-top:'+(header_H+10)+'px;':'background:#05060F;padding-top:'+(header_H+10)+'px;'">
			<view class="set_text_title" :style="hb_status?'color:#000000':'color:#ffffff'"> </view>
			<view class="header-content" :style="'background:'+ backgroundALL+';color:'+colorALL">
				<view class="header-content-list" v-for="(item,index) in headerList" :key="index">
					<text>{{ item.title }}</text>
					<text style="font-size: 32upx;">{{ item.price }}</text>
					<text :style="item.percentage>0?'color:#EE5A5A;':'color:#5FCF64;'">{{ item.percentage>0? '+' + item.percentage : item.percentage }}%</text>
					<text>{{ item.cny }}</text>
					<text style="color:#999;font-size:22upx;">{{ item.amount }}</text>
				</view>
			</view>			
			<view class="content-zhangdie" :style="'background:'+ backgroundALL+';color:'+colorALL">
				<view class="zhangdie-title">{{$t('afanda.kzd')}}</view>
				<view class="zhangdie-list" v-for="(item,index) in risingData" :key="index">
					<view class="list-left">
						<image src="../../../static/image/icon__me_community.png"/>
						<view class="list-text">
							<view><text :style="'color:'+colorALL">{{ item.up }}</text>/{{ item.down }}</view>
							<view>{{ item.amount }}</view>
						</view>
					</view>
					<view class="list-right" @click="navTo('/pages/kLine/index')">
						<button>{{$t('afanda.kz')}}</button>
						<button>{{$t('afanda.kd')}}</button>
					</view>
				</view>
			</view>
			<view class="content-heyue" :style="'background:'+ backgroundALL+';color:'+colorALL">
				<view class="heyue-title">
					<view :style="'color:'+colorALL">
						{{$t('afanda.zjhy')}}
					</view>
					<view>{{$t('afanda.qbhy')}}</view>
				</view>
				<view class="heyue-list" v-for="(item,index) in heyueData" :key="index">
					<view class="heyue-list-title">
						<image src="../../../static/image/icon__me_community.png"/>
						<view class="title-text" :style="'color:'+colorALL">{{ item.title }}</view>
						<view class="title-tag" :style="item.status==1?'background:#5FCF64':''">{{ item.status==0?$t('afanda.kz'):$t('afanda.kd') }}</view>
					</view>
					<view class="list-content">
						<view class="list-content-left">
							<view class="time">
								<view>{{ item.time }}</view>
								<text>{{$t('afanda.wtsj')}}</text>
							</view>
							<view>
								<view class="text-lg">{{ item.price }}</view>
								<text>{{$t('afanda.wtj')}}</text>
							</view>
						</view>
						<view class="list-content-center">
							<view class="price">
								<view class="text-lg">{{ item.total }}</view>
								<text>{{$t('afanda.wtze')}}</text>
							</view>
							<view>
								<view class="text-lg">{{ item.surplus }}</view>
								<text>{{$t('afanda.sywt')}}</text>
							</view>
						</view>
						<view class="list-content-right">{{$t('afanda.cx')}}</view>
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
				beijing: '../../../static/wallet/honghong.png',
				userdatas: '',
				isalert: false, //弹窗
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				windowHeight: 0,
				header_H: 0,
				nickname: '',
				hb_status: true, //true 白色   false 黑色
				noticeorder: true, //通知订单
				noticechat: true, //通知聊天
				isupdate: false, //是否有更新 
				dataz: '',
				headerList: [
					{ 
						title: 'BTC/USDT',
						price: '787.00',
						percentage: '-8.0',
						cny: '986.00CNY',
						amount: this.$t('afanda.liang')
					},
					{ 
						title: 'BTC/USDT',
						price: '787.00',
						percentage: '-8.0',
						cny: '986.00CNY',
						amount: this.$t('afanda.liang')
					},
					{ 
						title: 'BTC/USDT',
						price: '787.00',
						percentage: '8.0',
						cny: '986.00CNY',
						amount: this.$t('afanda.liang')
					},
				],
				risingData: [
					{ up: 'BTC', down: 'USDT', amount: this.$t('afanda.liang') },
					{ up: 'BTC', down: 'USDT', amount: this.$t('afanda.liang') },
					{ up: 'BTC', down: 'USDT', amount: this.$t('afanda.liang') }
				],
				heyueData: [
					{ title: 'BTC/USDT',
						time: '2020-07-15 12:23',
						price: '7.09',
						total: '658.9',
						surplus: '878,887,98',
						status: 0
					},
					{ title: 'BTC/USDT',
						time: '2020-07-15 12:23',
						price: '7.09',
						total: '658.9',
						surplus: '878,887,98',
						status: 1
					}
				]
			}
		},
		onLoad() {
			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight
					console.log(JSON.stringify(res))
					console.log(This.windowHeight)
				}
			})
		},
		onReady() {
			var view = uni.createSelectorQuery().select(".header");
			view.boundingClientRect(data => {
				console.log("节点离页面顶部的距离为" + data.height);
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
			console.log(this.colorALL)
			var setdata = {
				"token": uni.getStorageSync("token"),
				"userId": uni.getStorageSync("id")
			}
			console.log(setdata)
			uni.request({
				 // url: this.websiteUrl + 'afd/getMyTeamInfo',
				url: this.websiteUrl + 'user/getReport',
				method: 'GET',
				data: {
					userId: uni.getStorageSync("id")
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
				},
				success: (res) => {
					console.log(res)
					this.dataz = res.data.data

				},
				fail: () => {

				}
			});
		},
		methods: {
			navTo(e){
				uni.navigateTo({
					 url: e
				});
			},
			gotoMyTeam(){
				uni.navigateTo({
					url:'../myteam/myteam'
				})
			},
			exit_btn() {
				uni.navigateBack({ //后退按钮
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

	.container {
		width: 100%;
		height: 100%;
		background: #F0F3F5;
	}

	.header {
		padding: 0 30upx;
		box-sizing: border-box;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 99999;
		background-color: #FFF;
	}

	.header-title{
		font-size: 41upx;
		margin-left: 20upx;
		font-weight: bold;
	}
	.header-title-right{
		font-size: 31upx;
		margin-left: auto;
		font-weight: bold;
		color: #4397F1;
	}

	.header .header_box {
		height: 88upx;
	}

	.content {
			flex: 1;
			width: 100%;
			overflow: auto;
			box-sizing: border-box;
			height: 100%;
	}
	.header-content{
		display: flex;
		justify-content: space-between;
		flex-shrink: 0;
		padding: 30upx 60upx;
	}
	.header-content-list{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.header-content-list text{
		line-height: 1.5;
		font-size: 24upx;
	}
	.content-zhangdie{
		margin-top: 10upx;
		padding: 24upx 30upx;
	}
	.zhangdie-title{
		display: inline-block;
		font-size: 32upx;
		color: #4397F1;
		padding-bottom: 10upx;
		border-bottom: 6upx solid #4397F1;
		margin-bottom: 30upx;
	}
	.zhangdie-list{
		display: flex;
		justify-content: space-between;
		padding: 30upx 0;
	}
	.list-text{
		margin-left: 20upx;
		font-size: 22upx;
		color: #999;
	}
	.list-text view:first-child{
		margin-bottom: 6upx;
	}
	.list-text view:first-child text{
		font-size: 32upx;
	}
	.list-left, .list-right{
		display: flex;
	}
	.list-left image{
		width: 64upx;
		height: 64upx;
		border-radius: 64upx;
	}

	.list-right button{
		width: 160upx;
		height: 72upx;
		border-radius: 72upx;
		color: #fff;
		font-size: 28upx;
		background: #5FCF64;
	}
	.list-right button:first-child{
		background: #F33F3F;
		margin-right: 30upx;
	}

	.content-heyue{
		margin-top: 20upx;
		padding: 30upx;
	}
	.heyue-title{
		display: flex;
		justify-content: space-between;
		margin-bottom: 15upx;
	}
	.heyue-title view:first-child{
		font-size: 36upx;
	}
	.heyue-title view:last-child{
		font-size: 26upx;
		color: #4397F1;
	}
	.heyue-list{
		padding: 30upx 0;
	}
	.heyue-list-title{
		display: flex;
		align-items: center;
		padding-bottom: 30upx;
	}
	.heyue-list-title image{
		width: 60upx;
		height: 60upx;
		border-radius: 60upx;
	}
	.heyue-list-title .title-text{
		margin: 0 20upx;
		font-size: 36upx;
	}
	.title-tag{
		width: 68upx;
		height: 32upx;
		font-size: 20upx;
		text-align: center;
		line-height: 32upx;
		color: #fff;
		background: #F33F3F;
		border-radius: 32upx;
	}
	.list-content{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.text-lg{
		font-size: 32upx;
	}
	.list-content-left .time{
		margin-bottom: 20upx;
		font-size: 24upx;
	}
	.list-content-left text, .list-content-center text{
		line-height: 2;
		font-size: 22upx;
		color: #999;
	}
	.list-content-center .price{
		margin-bottom: 20upx;
	}
	.list-content-right{
		width: 160upx;
		height: 72upx;
		border-radius: 72upx;
		text-align: center;
		line-height: 72upx;
		border: 2upx solid #4397F1;
		font-size: 28upx;
		color: #4397F1;
	}
</style>
