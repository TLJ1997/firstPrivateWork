<template>
	<view class="container" :style="hb_status ? 'height: 100vh;background:#ffffff;' : 'background:#05060F;'">
		<view class="header hi-columns" :style="hb_status ? 'background:#ffffff;padding-top: ' + statusBarH + 'px;' : 'background:#05060F;padding-top: ' + statusBarH + 'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image
					:src="hb_status ? '../../static/home/nav_icon_back_day.png' : '../../static/home/nav_icon_back_day.png'"
					mode=""
					style="width:46upx;height: 46upx;"
					@click="exit_btn"
				></image>
				<view :style="hb_status ? 'color: #333333;' : 'color: white;'" style="font-size: 37upx;text-align: left;font-weight: bold;color:#000;width: 55vw;">
					{{ $t('index.qbyy') }}
				</view>
				<!-- <view style="font-size: 37upx;text-align: center;font-weight: bold;color:#ffffff"></view> -->
			</view>
		</view>
		<view
			class="content hi-columns"
			style="margin-top: 88upx;"
			:style="hb_status ? 'height: 100vh;background:#F0F3F5;padding-top:' + header_H + 'px;' : 'background:' + backgroundALL + ';padding-top:' + header_H + 'px;'"
		>
			<view style="width: 100%; padding:20upx 10upx; box-sizing: border-box;">
				<view class="list hi-flex hi-space-between" style="margin-top:20upx 0;flex-wrap: wrap;padding: 0 15rpx;">
					<view @tap="gotoPage(item.name)" style="width: 180rpx;margin: 40rpx 0;" class="hi-columns hi-flex-vcenter" v-for="(item, index) in cateNav" :key="index">
						<image style="height: 54rpx;width: 54rpx;" :src="item.img" mode=""></image>
						<text :style="hb_status ? 'color: #333333;' : 'color: white;'" style="margin-top: 20rpx;">{{ item.name }}</text>
					</view>
				</view>
				<!-- RDT-->
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
			header_H: 44,
			nickname: '',
			hb_status: true, //true 白色   false 黑色
			noticeorder: true, //通知订单
			noticechat: true, //通知聊天
			isupdate: false, //是否有更新
			dataz: '',
			cateNav: [
				{
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
					name: this.$t('index.tb'),
					img: '/static/index/slider/tibi.png'
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
					name: this.$t('index.sc'),
					img: '/static/index/slider/shangcheng.png'
				},
				{
					pic: '',
					name: this.$t('index.yx'),
					img: '/static/index/slider/youxi.png'
				},
				{
					pic: '',
					name: this.$t('index.qg'),
					img: '/static/index/slider/qg.png'
				},
				{
					pic: '',
					name: '',
					img: ''
				},
				{
					pic: '',
					name: '',
					img: ''
				}
			]
		};
	},
	onLoad() {
		This = this;
		uni.getSystemInfo({
			success(res) {
				This.statusBarH = res.statusBarHeight;
				This.windowHeight = res.windowHeight;
				console.log(JSON.stringify(res));
				console.log(This.windowHeight);
			}
		});
		var view = uni.createSelectorQuery().select('.header');
		view.boundingClientRect(data => {
			console.log('节点离页面顶部的距离为' + data.height);
			This.header_H = data.height - 5;
			console.log(This.header_H);
		}).exec();
	},
	onShow() {
		this.backgroundALL = uni.getStorageSync('localbk');
		this.colorALL = uni.getStorageSync('localcol');
		setTimeout(() => {
			this.tab_init();
		}, 500);
		var setdata = {
			token: uni.getStorageSync('token'),
			userId: uni.getStorageSync('id')
		};
	},
	methods: {
		gotoPage(name) {
			let This=this;
			if (name == '认证') {
				if (uni.getStorageSync('isRealName') == 0) {
					if (uni.getStorageSync('locale')=='zh-cn') {
						uni.navigateTo({
							url: '../wo/certification/certification'
						});
					} else {
						uni.navigateTo({
							url: '../wo/certification/certification1'
						});
					}
				} else {
					this.myAlert('您已完成初级实名，不要重复认证');
				}
			} else if (name == This.$t('index.cb')) {
				uni.navigateTo({
					url: '../wallet/chongbi/chongbi?bizhong=USDT'
				});
			} else if (name == This.$t('index.tb')) {
				uni.navigateTo({
					url: '../wallet/tibi/tibi?bizhong=USDT'
				});
			} else if (name == This.$t('index.zb')) {
				uni.navigateTo({
					url: '../afanda/zhangben/zhangben'
				});
			} else if (name == This.$t('index.team')) {
				uni.navigateTo({
					url: '../afanda/tuandui/tuandui'
				});
			} else if (name == This.$t('index.kc')) {
				uni.navigateTo({
					url: '../afanda/chibi/chibishengxi'
				});
			} else if (name == This.$t('index.cjh')) {
				// uni.showModal({
				// 	title: this.$t('stylePulic.zwkf'),
				// 	showCancel: false
				// });
				
				uni.navigateTo({
					url: 'pages/kLine/chaojuhe'
				});
			} else if (name == This.$t('index.cs')) {
				uni.showModal({
					title: this.$t('stylePulic.zwkf'),
					showCancel: false
				});
			} else if (name == this.$t('index.yx')) {
				uni.showModal({
					title: this.$t('stylePulic.zwkf'),
					showCancel: false
				});
			} else if (name == this.$t('index.qg')) {
				// uni.showModal({
				// 	title: '暂未开放',
				// 	showCancel: false
				// });
				uni.navigateTo({
					url: '../afanda/qianggou/qianggou'
				});
			} else if (name == this.$t('index.more')) {
				uni.navigateTo({
					url: 'all'
				});
			}
		},
		afandao(page) {
			if ('' != page) {
				uni.navigateTo({
					url: page
				});
			} else {
				this.myAlert(this.$t('stylePulic.zwkf'));
			}
		},
		zhitui() {
			uni.navigateTo({
				url: '../teamlist/teamlist'
			});
		},
		exit_btn() {
			uni.navigateBack({
				//后退按钮
				delta: 1
			});
		},
		tab_init() {
			if (this.backgroundALL == '#272A33') {
				this.hb_status = false;
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#272A33'
				});
				uni.setTabBarStyle({
					backgroundColor: '#272A33',
					color: '#737373',
					selectedColor: '#267cc0'
				});
			} else {
				this.hb_status = true;
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#ffffff'
				});
				uni.setTabBarStyle({
					backgroundColor: '#ffffff',
					color: '#737373',
					selectedColor: '#267cc0'
				});
			}
		}
	}
};
</script>

<style>
page {
	height: 100%;
}

.container {
	width: 100%;
	height: 100%;
	background: #f0f3f5;
}

.header {
	padding: 0 30upx;
	box-sizing: border-box;
	position: fixed;
	width: 100%;
	left: 0;
	top: 0;
	z-index: 99999;
	background-color: #fff;
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

.set_text_title {
	font-size: 48upx;
	width: 100%;
	margin: 30upx 0;
	padding: 0 40upx;
	box-sizing: border-box;
	text-align: right;
}

.icon-arrow-right {
	color: #8792a8;
	font-size: 32upx;
}

.item_l {
	margin: 0 40upx;
	width: 670upx;
	padding: 25upx 40upx;
	box-sizing: border-box;
	border-radius: 16upx;
	margin-bottom: 20upx;
}

.userinfo {
}

.userinfo .user_text {
	margin-left: 30upx;
}

.userinfo .user_text .name {
	font-size: 38upx;
	color: #ffffff;
	line-height: 120upx;
}

.userinfo .user_text .title {
	font-size: 32upx;
	color: #ffffff;
}

.userinfo .user_text .userid {
	font-size: 24upx;
	color: #8792a8;
}

.right_box {
}

.right_box .cheched_text {
	font-size: 28upx;
	color: #6e778a;
	margin-right: 25upx;
}

.btn {
	width: 670upx;
	margin: 0 40upx;
	margin-top: 140upx;
	border: 2upx solid #6e778a;
	color: #6e778a;
	text-align: center;
	height: 100upx;
	line-height: 100upx;
	font-size: 36upx;
	border-radius: 50upx;
}

.yd_box {
	display: inline-flex;
	width: 16upx;
	height: 16upx;
	border-radius: 8upx;
	background: #e64340;
	position: relative;
	top: -30upx;
	right: -5upx;
}

/* 弹出对话框 */
.alert_box {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 0 43upx;
	box-sizing: border-box;
	z-index: 999999999999999999999999999999;
}

.alert_box .mask_box {
	background: rgba(0, 0, 0, 0.2);
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
}

.alert_box .content_box {
	width: 580upx;
	height: 350upx;
	border-radius: 20upx;
	position: relative;
	z-index: 99999;
	padding: 40upx 30upx;
	box-sizing: border-box;
}

.alert_box .content_box .text_box {
	width: 100%;
	font-size: 36upx;
	color: #ffffff;
	padding-top: 60upx;
}

.alert_box .content_box .btn_box view {
	text-align: center;
	height: 70upx;
	line-height: 70upx;
	border-radius: 35upx;
	width: 240upx;
	box-sizing: border-box;
}

.alert_box .content_box .btn_box view:nth-of-type(1) {
	border: 1px solid #e64340;
	color: #e64340;
}

.alert_box .content_box .btn_box view:nth-of-type(2) {
	background: #3a74fc;
	color: #ffffff;
}
</style>
