<template>
	<view class="container hi-columns" :style="backgroundALL == '#1c1f22' ? 'background:#05060F;' : 'background:#F0F3F5'">
		<!-- 标题栏 -->
		<view class="header hi-columns" :style="'padding-top: ' + statusBarH + 'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<view class="tab_box hi-rows hi-flex-vcenter"></view>
				<view class="tab_box hi-rows hi-flex-vcenter">
					<text @click="zh()">{{$t('wallet.zhang')}}</text>
					<text>{{$t('wallet.jymx')}}</text>
				</view>
			</view>
		</view>
		<image class="banner" :src="hb_status ? '../../static/wallet/bg_day.png' : '../../static/wallet/bg_night.png'" mode=""></image>
		<view class="zc_text hi-rows hi-flex-vcenter">
			<text class="t_bt_text">{{$t('wallet.zjc')}}</text>
			<view class="bt_bj" style="background: url(../../static/wallet/icon_notificationbox.png) no-repeat center;background-size: cover; overflow: hidden;white-space: nowrap; text-overflow: ellipsis;">
				{{$t('wallet.bzzhzh')}}
			</view>
		</view>
		<view class="content">
			<view class="wallet_box" style="background: url(../../static/wallet/bg_totalassets.png) no-repeat center;background-size: 700upx 280upx;">
				<view class="hi-columns" style="height: 100%;width: 100%;padding: 40upx 60upx;padding-bottom: 0;box-sizing: border-box;">
					<view class="hi-rows hi-flex-vcenter hi-space-between">
						<view class="l_z_text hi-flex-vcenter hi-space-between">
							<image src="../../static/wallet/icon_totalassets.png" style="width: 46upx;height: 46upx;margin-right: 20upx;" mode=""></image>
							<text class="text">{{$t('wallet.zzczh')}}(CNY)</text>
						</view>
						<image
							class="isshow_money"
							:src="isshow_money ? '../../static/wallet/icon_shut.png' : '../../static/wallet/icon_open.png'"
							@click="isshow_money_btn()"
							style="width: 40upx;height: 40upx;margin-right: 20upx;"
							mode=""
						></image>
					</view>
					<view class="money_text hi-rows  hi-flex-vcenter " style="height: 90upx;">
						<text class="m_c">¥</text>
						<block v-if="isshow_money"><text class="m_text">0,000,000.00</text></block>
						<block v-else><text class="m_text" style="padding-top: 20upx;">****************</text></block>
					</view>
					<view class="safe_box hi-rows hi-flex-vcenter hi-space-between">
						<text></text>
						<text class="safe_text">{{$t('wallet.bzz')}}</text>
					</view>
				</view>
			</view>
			<view class="hi-rows hi-flex-vcenter hi-space-between" style="padding: 0 80upx;padding-top: 40upx;padding-bottom: 30upx; box-sizing: border-box;">
				<view class=""></view>
				<view class="hi-rows" @click="eidt()">
					<text style="color: #8792A8;font-size: 22upx;">{{$t('wallet.bjb')}}</text>
					<image src="../../static/wallet/icon_edit.png" style="width: 30upx;height: 30upx;margin-left: 10upx;" mode=""></image>
				</view>
			</view>
			<view class="list_box">
				<you-scroll ref="scroll" :colorStstus="hb_status" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore" style="height: 100%;background: #007AFF;">
					<view>
						<navigator
							class="item_box hi-rows hi-flex-vcenter hi-space-between"
							v-for="(item, index) in lists"
							:key="index"
							@click="scrollTo"
							:style="hb_status ? 'background: #FFFFFF;' : 'background: #18253D;'"
							open-type="navigate"
							:url="'/pages/wallet/bizc/bizc?buming=' + item.label + '&diji=' + index"
						>
							<view class="hi-rows hi-flex-vcenter">
								<image src="../../static/wallet/icon_bizhong.png" mode="" style="width: 90upx;height: 90upx;"></image>
								<text class="title" :style="hb_status ? 'color: #242833;' : 'color: #ffffff;'">{{ item.label }}</text>
							</view>
							<view class="hi-rows hi-flex-vcenter">
								<view class="m_box hi-columns">
									<text class="t1" :style="hb_status ? 'color: #242833;' : 'color: #ffffff;'">0.0000</text>
									<text class="t2">≈0,000,000.00(CNY)</text>
								</view>
								<text class="grace-icons icon-arrow-right" style="font-size: 36upx;color: #8792A8;margin-left: 30upx;"></text>
							</view>
						</navigator>

						<div id="preloader_1">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</view>
				</you-scroll>
			</view>
		</view>

		<view
			:class="isshow_left_muen ? 'left_muen_maks active' : 'left_muen_maks'"
			:style="hb_status ? 'background: rgba(0,0,0,.7);' : 'background: rgba(0,0,0,.3);'"
			@click="eidt()"
		></view>
		<view :class="isshow_left_muen ? 'left_muen_box active' : 'left_muen_box'" :style="backgroundALL == '#1c1f22' ? 'background:#18253D;' : 'background:#ffffff'">
			<!-- 标题栏 -->
			<view class="muen_header hi-columns" :style="'padding-top: ' + statusBarH + 'px;'">
				<view class="hi-rows hi-flex-vcenter  hi-space-between">
					<view class="hi-rows hi-flex-vcenter">
						<image
							:src="hb_status ? '../../static/home/nav_icon_back_day.png' : '../../static/home/nav_icon_back_night.png'"
							mode=""
							style="width:46upx;height: 46upx;"
							@click="eidt()"
						></image>
					</view>
					<view class="hi-rows hi-flex-vcenter"></view>
				</view>
			</view>
			<view class="header_title_box hi-rows hi-flex-vcenter hi-space-between">
				<view class="header_item hi-rows hi-flex-vcenter hi-space-between">
					<text class="t1" :style="hb_status ? 'color: #242833;' : 'color: #ffffff;'">{{$t('wallet.bjb')}}</text>
					<text class="t2"></text>
				</view>
				<view class="header_item">
					<view class="h_btn" @click="editcoin()">{{ isedit ? $t('wallet.wc') : $t('wallet.bj') }}</view>
				</view>
			</view>
			<view class="menu_l_title" :style="hb_status ? 'color: #242833;border-left: 6upx solid #242933;' : 'color: #ffffff;border-left: 6upx solid #ffffff;'">{{$t('wallet.ytj')}}</view>
			<view class="menu_btns_box hi-rows hi-flex-vcenter hi-left hi-wrap">
				<view class="btns_text" v-for="b in lists_select" @click="deleteto(b.label)">
					{{ b.label }}
					<image src="/static/wallet/icon_delete.png" class="icon" v-show="isedit" />
				</view>
			</view>
			<!--drag-sorts :list="lists" :props="props" @change="onDragSortChange" ></drag-sorts-->
			<view class="menu_l_title" :style="hb_status ? 'color: #242833;border-left: 6upx solid #242933;' : 'color: #ffffff;border-left: 6upx solid #ffffff;'">{{$t('wallet.wtj')}}</view>
			<view class="menu_btns_box hi-rows hi-flex-vcenter hi-left hi-wrap">
				<view class="btns_text" v-for="b in lists" @click="addto(b.label)">
					{{ b.label }}
					<image src="/static/wallet/icon_addto.png" class="icon" v-show="isedit" />
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
		youScroll,
		dragSorts
	},
	data() {
		return {
			list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			backgroundALL: '',
			colorALL: '',
			statusBarH: '',
			header_H: 0,
			windowHeight: 0,
			hb_status: true,
			isshow_money: true, //是否显示金额
			isshow_left_muen: false, //是否显示编辑币侧滑
			isedit: false, //是否在编辑币
			props: {
				label: 'label'
			},
			lists: [
				{
					label: 'XLB'
				},
				{
					label: 'ETH'
				},
				{
					label: 'USDT'
				},
				{
					label: 'EOS'
				},
				{
					label: 'NEO'
				},
				{
					label: 'YK'
				},
				{
					label: 'NT'
				},
				{
					label: 'ONE'
				},
				{
					label: 'DUSD'
				},
				{
					label: 'TIDA'
				},
				{
					label: 'CCF'
				},
				{
					label: 'SAE'
				}
			],
			lists_select: []
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

		var view = uni.createSelectorQuery().select('.header');
		view.boundingClientRect(data => {
			// console.log("节点离页面顶部的距离为" + data.height);
			//This.header_H = data.height;
			console.log(This.header_H);
		}).exec();
	},
	onShow() {
		this.backgroundALL = uni.getStorageSync('localbk');
		this.colorALL = uni.getStorageSync('localcol');
		setTimeout(()=>{
				this.tab_init();
			},500)
	},
	onReady() {
		// console.log(this.$refs.scroll)
	},
	methods: {
		zh() {
			uni.navigateTo({
				url: 'zichan/zichan'
			});
		},
		onDragSortChange(e) {
			console.log(JSON.stringify(e));
		},
		eidt() {
			//显示隐藏侧边栏
			//this.isshow_left_muen=!this.isshow_left_muen;

			const subNVue = uni.getSubNVueById('editcoin');
			subNVue.setStyle({
				width: '100%',
				height: '100%'
			});
			//const subNVue = uni.getCurrentSubNVue();
			console.log(subNVue);
			// 打开 nvue 子窗体
			subNVue.show('slide-in-left', 300, function() {
				// 打开后进行一些操作...
			});
		},
		editcoin() {
			//编辑币
			this.isedit = !this.isedit;
			// 通过 id 获取 nvue 子窗体
		},
		addto(label) {
			if (this.isedit) {
				this.lists_select.push({
					label: label
				});
				this.lists = this.lists.filter(function(item) {
					return item.label != label;
				});
			}
		},
		deleteto(label) {
			if (this.isedit) {
				this.lists_select = this.lists_select.filter(function(item) {
					return item.label != label;
				});

				this.lists.push({
					label: label
				});
			}
		},
		isshow_money_btn() {
			//点击是否显示金额
			this.isshow_money = !this.isshow_money;
		},
		onPullDown(done) {
			// 下拉刷新
			console.log('下拉');
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
		}
	}
};
</script>

<style>
.container {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

/* .header {padding: 0 40upx;box-sizing: border-box;} */
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
.tab_box text {
	font-size: 30upx;
	color: #ffffff;
	margin-left: 40upx;
}

.banner {
	width: 750upx;
	height: calc(var(--status-bar-height) + 400upx);
	position: fixed;
	top: 0;
	left: 0;
}
.zc_text {
	width: 750upx;
	position: fixed;
	top: calc(var(--status-bar-height) + 88upx);
	left: 0;
	padding: 0 40upx;
	box-sizing: border-box;
	margin-bottom: 20upx;
}
.zc_text .t_bt_text {
	font-size: 48upx;
	color: #ffffff;
	margin-right: 10upx;
}
.zc_text .bt_bj {
	width: 445upx;
	height: 40upx;
	font-size: 22upx;
	color: #ffffff;
	line-height: 40upx;
	text-align: center;
}

.content {
	width: 100%;
	flex: 1;
	padding-top: calc(var(--status-bar-height) + 200upx);
	box-sizing: border-box;
}
.wallet_box {
	width: 100%;
	height: 300upx;
	border-radius: 20upx; /*margin: 0 40upx;*/
	position: relative;
	z-index: 99999999;
	box-sizing: border-box;
}
.l_z_text .text {
	font-size: 32upx;
	color: #ffffff;
}
.wallet_box .money_text {
	padding: 20upx 0;
}
.wallet_box .money_text .m_c {
	font-size: 30upx;
	color: #ffffff;
	margin-right: 20upx;
	margin-left: 30upx;
}
.wallet_box .money_text .m_text {
	font-size: 60upx;
	color: #ffffff;
}
.wallet_box .safe_box {
}
.wallet_box .safe_box .safe_text {
	font-size: 22upx;
	color: #ffffff;
	width: 100upx;
	height: 36upx;
	background: #4fb757;
	border-radius: 18upx;
	line-height: 36upx;
	text-align: center;
}

.list_box {
	flex: 1;
	width: 100%;
	overflow: auto;
	padding: 0 40upx;
	box-sizing: border-box;
}
.list_box .item_box {
	padding: 35upx 40upx;
	box-sizing: border-box;
	border-radius: 20upx;
	margin: 20upx 0;
}
.list_box .item_box .title {
	font-size: 36upx;
	margin-left: 30upx;
	font-weight: 500;
}
.list_box .item_box .m_box .t1 {
	font-size: 30upx;
	align-self: flex-end;
}
.list_box .item_box .m_box .t2 {
	font-size: 24upx;
	color: #8792a8;
	align-self: flex-end;
}

.left_muen_maks {
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9999999; /*border-radius:0px 20px 20px 0px;*/
	transition: all 0.5s ease-in-out;
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
	z-index: 9999999;
	border-radius: 0px 20px 20px 0px;
	transition: all 0.6s ease-in-out;
}
.left_muen_box.active {
	left: 0;
}

.muen_header > view {
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
	border-radius: 50upx;
	line-height: 58upx;
}
.left_muen_box .menu_l_title {
	padding-left: 35upx;
	margin: 40upx 0;
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
	background: rgba(192, 196, 204, 0.2);
	color: #8792a8;
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

page {
	height: 100%;
	overflow: hidden;
}

.content {
	text-align: center;
	height: 100%;
}
.content .block {
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
