<template>
	<view class="container nc-mode-night nc-bg-main" :style="'height:' + windowHeight + 'px;'">
		<view class="transparent" :style="'height:' + statusBarH + 'px;width: 100%;'"></view>
		<!-- 头部信息 -->
		<block>
			<!-- 交易 - 头部 -->
			<view v-show="currentNavIndex === 0" class="nc-flex-column nc-flex-main-between nc-info-bg header-info">
				<view class="nc-text-color-white nc-font-size-large">{{$t('wallet.zhzc')}}</view>
				<view class="nc-flex-row nc-flex-main-between nc-text-color-white nc-flex-sub-center">
					<text class="nc-font-size-x-large">0</text>
					<text class="nc-text-sub">YK ≈0 CNY</text>
					<text></text>
				</view>
				<view class="nc-flex-row nc-flex-main-between buttons">
					<view class="nc-info-bg-sub nc-text-color-white nc-button">{{$t('wallet.cb')}}</view>
					<view class="nc-info-bg-sub nc-text-color-white nc-button">{{$t('wallet.tb')}}</view>
					<view class="nc-info-bg-sub nc-text-color-white nc-button">{{$t('wallet.hz')}}</view>
				</view>
			</view>
			<!-- 算力 - 头部 -->
			<view v-show="currentNavIndex === 1" class="nc-flex-column nc-flex-main-between nc-info-bg header-info">
				<view class="nc-text-color-white nc-font-size-large">{{$t('wallet.slqb')}}</view>
				<view class="nc-flex-row nc-flex-main-between nc-text-color-white nc-flex-sub-center">
					<view>
						<text class="nc-font-size-x-large">0.00</text>
						<text class="nc-text-sub">YK ≈0 CNY</text>
					</view>
				</view>
				<view class="nc-flex-row nc-flex-main-between buttons">
					<view class="nc-info-bg-sub nc-text-color-white nc-button">{{$t('wallet.cb')}}</view>
					<view class="nc-info-bg-sub nc-text-color-white nc-button">{{$t('wallet.tb')}}</view>
					<view class="nc-info-bg-sub nc-text-color-white nc-button">{{$t('wallet.hz')}}</view>
				</view>
			</view>
			<!-- 节点 - 头部 -->
			<view v-show="currentNavIndex === 2" class="nc-flex-column nc-flex-main-between nc-info-bg header-info">
				<view class="nc-flex-row nc-flex-sub-center nc-height-100">
					<view class="nc-flex-item-grow-1 nc-text-align-center"><image style="height: 80upx;width:80upx;" src="../../../static/home/bg_me.png" mode=""></image></view>
					<view class="nc-flex-item-grow-2 nc-flex-column nc-flex-main-around nc-text-color-white nc-font-size-larger nc-height-100">
						<view class="nc-flex-row nc-flex-main-between">
							<text>{{$t('wallet.ljzy')}}</text>
							<text>0.00</text>
						</view>
						<view class="nc-flex-row nc-flex-main-between">
							<text>{{$t('wallet.qx')}}</text>
							<text>--</text>
						</view>
						<view class="nc-flex-row nc-flex-main-between">
							<text>{{$t('wallet.zt')}}</text>
							<text>--</text>
						</view>
					</view>
				</view>
				<view class="nc-flex-row nc-flex-main-between buttons">
					<view class="nc-info-bg-sub nc-text-color-white nc-button">{{$t('wallet.sxf')}}</view>
					<view class="nc-info-bg-sub nc-text-color-white nc-button">{{$t('wallet.jds')}}</view>
					<view class="nc-info-bg-sub nc-text-color-white nc-button">{{$t('wallet.hz')}}</view>
					<view class="nc-info-bg-sub nc-text-color-white nc-button nc-bg-disabled">{{$t('wallet.jc')}}</view>
				</view>
			</view>
		</block>
		<!-- 切换 -->
		<view class="nc-segmented-control">
			<view>
				<view class="nc-flex-row items nc-bg-main nc-text-sub nc-border-color">
					<view
						@tap="switchTab(index)"
						class="item nc-flex-item-grow-1 nc-text-align-center nc-text-color-sub nc-font-weight-bold"
						v-for="(item, index) in navitems"
						:key="index"
						:class="{ 'active nc-border-color-active nc-text-color-active': currentNavIndex == index }"
					>
						{{ item }}
					</view>
				</view>
			</view>
		</view>
		<!-- 滚动列表 -->
		<block>
			<!-- 交易 -->
			<view v-show="currentNavIndex === 0" class="trade nc-bg-main">
				<scroll-view id="trade-list" scroll-y="true" class="list" :style="'height:'+tradeListHeight+'px'">
					<view class="nc-flex-column nc-flex-main-between nc-border-color list-item" v-for="(item, index) in 15" :key="index">
						<view class="nc-flex-row nc-flex-main-between nc-flex-sub-center nc-text-color-active">
							<text class="nc-font-weight-bold">DPOM</text>
							<text>{{$t('wallet.mx')}} ></text>
						</view>
						<view class="detail nc-flex-column nc-flex-main-between">
							<view class="nc-flex-row nc-flex-main-between nc-text-color-sub">
								<text>{{$t('wallet.ky')}}(DPOM)</text>
								<text>{{$t('wallet.dj')}}(DPOM)</text>
								<text>{{$t('wallet.zh')}}(CNY)</text>
							</view>
							<view class="nc-flex-row nc-flex-main-between nc-text-color-white">
								<text>0</text>
								<text>0</text>
								<text>0</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 算力 -->
			<view v-show="currentNavIndex === 1"></view>
			<!--节点 -->
			<view v-show="currentNavIndex === 2"></view>
		</block>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			backgroundALL: '', //模式背景颜色
			colorALL: '', //模式字体颜色
			statusBarH: '', //状态栏高度
			header_H: 0, //
			windowHeight: 0,
			hb_status: true,
			navitems: [this.$t('wallet.jy'),this.$t('wallet.sl'), this.$t('wallet.jd')],
			currentNavIndex: 0,
			navNodeItems: ['V1', 'V2', 'V3'],
			currentNodeIndex: 0,
			tradeListHeight:0//交易列表高度
		};
	},
	onLoad() {
		let This = this;
		uni.getSystemInfo({
			success(res) {
				console.log(JSON.stringify(res));
				This.statusBarH = res.statusBarHeight;
				This.windowHeight = res.windowHeight;
				//#ifdef H5 || APP-PLUS
				// This.windowHeight = This.windowHeight - res.windowBottom;
				// console.log("res.windowBottom:"+res.windowBottom)
				//#endif
				console.log('statusBarHeight:' + res.statusBarHeight);
				console.log('windowHeight:' + res.windowHeight);
			}
		});

		setTimeout(() => {
			let tradeListView = uni.createSelectorQuery().select('#trade-list');
			tradeListView.boundingClientRect(data => {
				this.tradeListHeight = this.windowHeight - data.top;
				console.log('data.top:' + data.top);
				console.log('tradeListHeight:' + this.tradeListHeight);
				console.log('windowHeight:' + this.windowHeight);
			}).exec();
		}, 500);
	},
	onShow() {
		this.backgroundALL = uni.getStorageSync('localbk');
		this.colorALL = uni.getStorageSync('localcol');
		// this.tab_init();
		// this.nav_bizhong(0);
	},
	methods: {
		/* 切换 */
		switchTab(index) {
			this.currentNavIndex = index;
		},
		scrolltolower(e) {
			console.log(e);
		}
	}
};
</script>

<style lang="scss" scoped>
page,
.container {
	height: 100%;
	width: 100%;
	padding-bottom: calc(var(--window-bottom) + 0px);
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
.transparent {
	background-color: transparent;
}
.header .header_box {
	height: 88upx;
}

/* header-info */
.header-info {
	padding: 30upx;
	height: 250upx;
	.buttons {
		margin-top: 30upx;
	}
}
/* 切换组件 */

.nc-segmented-control {
	.items {
		border-bottom-width: 2upx;
		border-bottom-style: solid;
		.item {
			padding: 30upx 0;
			&.active {
				border-bottom-width: 4upx;
				border-bottom-style: solid;
			}
		}
	}
}
/* 交易 */
.trade {
	.list {
		.list-item {
			height: 150upx;
			padding: 30upx;
			border-bottom-width: 2upx;
			border-bottom-style: solid;
			.detail {
				height: 80upx;
			}
		}
	}
}
</style>
