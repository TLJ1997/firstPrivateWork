<template>
	<view class="Page" :style="hb_status?'background:#ffffff;':'background:#05060F;'">
		<view class="content" :style="'padding-top: '+statusBarH+'px;'">
			<view class="head">
				<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'"
				 style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view class="name" :style="hb_status?'color:#000000':'color:#ffffff'">{{$t('wo.zfgl')}}</view>
			</view>
			<view class="item" @click="addPay('zfb')">
				<image src="../../../static/img/pay_zfb.png"></image>
				<text>{{$t('wo.zfb')}}</text>
			</view>
			<view class="item" @click="addPay('wx')">
				<image src="../../../static/img/pay_wx.png"></image>
				<view>
					<text>{{$t('wo.wxzf')}}</text>
				</view>
			</view>
			<view class="item" @click="addPay('yhk')">
				<image src="../../../static/img/pay_yl.png"></image>
				<view>
					<text>{{$t('wo.yhk')}}</text>
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
				windowHeight: 0,
				header_H: 0,
				hb_status: true, //true 白色   false 黑色	
				isRealName: true
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
			setTimeout(() => {
				this.tab_init();
			}, 500)
			console.log(this.colorALL)
		},
		methods: {
			exit_btn() {
				uni.navigateBack({ //后退按钮
					delta: 1
				})
			},
			addPay(type) {
				if (type == 'yhk') {
					uni.navigateTo({
						url: 'my_yhk'
					});
				} else {
					uni.navigateTo({
						url: 'my_qrCode?type=' + type
					});
				}
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

<style lang="scss" scoped>
	.Page {
		view {
			box-sizing: border-box;
		}

		.content {
			padding: 0 34upx;

			.head {
				display: flex;
				justify-content: left;
				margin-bottom: 30upx;

				.name {
					margin-left: 20upx;
					font-size: 38upx;
					font-weight: 600;
				}
			}

			.item {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				width: 100%;
				height: 220upx;
				background-color: #F2F2F2;
				border-radius: 20upx;
				margin-bottom: 24upx;

				image {
					width: 104upx;
					height: 90upx;
					margin-bottom: 20upx;
				}
			}

		}
	}
</style>
