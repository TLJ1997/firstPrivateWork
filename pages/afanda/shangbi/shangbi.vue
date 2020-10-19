<template>
	<view class="container hi-columns" :style="backgroundALL == '#1c1f22' ? 'background:#05060F;' : 'background:#F0F3F5;'">
		<!-- 标题栏 -->
		<view class="muen_header hi-columns" :style="'padding-top:' + statusBarH + 'px;'">
			<view class="hi-rows hi-flex-vcenter  hi-space-between">
				<view class="hi-rows hi-flex-vcenter">
					<image
						:src="hb_status ? '../../../static/home/nav_icon_back_day.png' : '../../../static/home/nav_icon_back_night.png'"
						mode=""
						style="width:46upx;height: 46upx;"
						@click="Back()"
					></image>
				</view>
				<view class="hi-rows hi-flex-vcenter"></view>
			</view>
		</view>
		<scroll-view class="hi-columns" scroll-y :style="'height: ' + (windowHeight - header_H) + 'px;width: 100%;'">
			<view class="header_title_box hi-rows hi-flex-vcenter hi-space-between">
				<view class="header_item hi-rows hi-flex-vcenter hi-space-between">
					<text class="t1" :style="hb_status ? 'color: #242833;' : 'color: #ffffff;'">{{ $t('afanda.sbsq') }}</text>
				</view>
				<view class="header_item">
					<view class="buy_btm_box hi-rows hi-flex-vcenter hi-space-between">
						<!-- <view class="item hi-columns hi-flex-vcenter">
							<image src="../../../static/wallet/icon_withdrawmoney.png" mode=""></image>
							<text>提币订单</text>
						</view> -->
						<!-- <view class="item hi-columns hi-flex-vcenter" @click="tibishuming()">
							<image src="../../../static/wallet/icon_explain.png" mode=""></image>
							<text>转账说明</text>
						</view> -->
					</view>
				</view>
			</view>
			<view class="content hi-columns" :style="hb_status ? 'background:#FFFFFF;color:#242933;' : 'background:#18253D;color:#ffffff;'">
				<view class="item hi-columns" :style="hb_status ? 'border-bottom: 1upx solid rgba(36,41,51,.1);' : 'border-bottom: 1upx solid rgba(255,255,255,.1);'">
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin: 46upx 0 42upx 0;">
						<text class="t_text" :style="hb_status ? 'border-left: 6upx solid #242933;color: #242933;' : 'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'">
							{{ $t('afanda.lxrname') }}
						</text>
						<text class="t_r_infto" style="margin-right: 40upx; color: red;">{{ $t('afanda.bt') }}</text>
					</view>
					<view class="input_box hi-rows hi-flex-vcenter hi-space-between">
						<input v-model="asd1" value="" :placeholder="input_name" placeholder-style="color:#8792A8;font-size:36upx" />
					</view>
				</view>
				<view class="item hi-columns" :style="hb_status ? 'border-bottom: 1upx solid rgba(36,41,51,.1);' : 'border-bottom: 1upx solid rgba(255,255,255,.1);'">
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin: 46upx 0 42upx 0;">
						<text class="t_text" :style="hb_status ? 'border-left: 6upx solid #242933;color: #242933;' : 'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'">
							{{ $t('afanda.lxrphone') }}
						</text>
						<text class="t_r_infto" style="margin-right: 40upx; color: red;">{{ $t('afanda.bt') }}</text>
					</view>
					<view class="input_box hi-rows hi-flex-vcenter hi-space-between">
						<input v-model="asd2" value="" :placeholder="input_phone" placeholder-style="color:#8792A8;font-size:36upx" />
					</view>
				</view>
				<view class="item hi-columns" :style="hb_status ? 'border-bottom: 1upx solid rgba(36,41,51,.1);' : 'border-bottom: 1upx solid rgba(255,255,255,.1);'">
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin: 46upx 0 42upx 0;">
						<text class="t_text" :style="hb_status ? 'border-left: 6upx solid #242933;color: #242933;' : 'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'">
							{{ $t('afanda.bzzw') }}
						</text>
						<text class="t_r_infto" style="margin-right: 40upx; color: red;">{{ $t('afanda.bt') }}</text>
					</view>
					<view class="input_box hi-rows hi-flex-vcenter hi-space-between">
						<input v-model="asd3" value="" :placeholder="input_zwName" placeholder-style="color:#8792A8;font-size:36upx" />
					</view>
				</view>
				<view class="item hi-columns" :style="hb_status ? 'border-bottom: 1upx solid rgba(36,41,51,.1);' : 'border-bottom: 1upx solid rgba(255,255,255,.1);'">
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin: 46upx 0 42upx 0;">
						<text class="t_text" :style="hb_status ? 'border-left: 6upx solid #242933;color: #242933;' : 'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'">
							{{ $t('afanda.bzyw') }}
						</text>
						<text class="t_r_infto" style="margin-right: 40upx; color: red;">{{ $t('afanda.bt') }}</text>
					</view>
					<view class="input_box hi-rows hi-flex-vcenter hi-space-between">
						<input v-model="asd4" value="" :placeholder="input_ywName" placeholder-style="color:#8792A8;font-size:36upx" />
					</view>
				</view>
				<view class="item hi-columns" :style="hb_status ? 'border-bottom: 1upx solid rgba(36,41,51,.1);' : 'border-bottom: 1upx solid rgba(255,255,255,.1);'">
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin: 46upx 0 42upx 0;">
						<text class="t_text" :style="hb_status ? 'border-left: 6upx solid #242933;color: #242933;' : 'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'">
							{{ $t('afanda.fxl') }}
						</text>
						<text class="t_r_infto"></text>
					</view>
					<view class="input_box hi-rows hi-flex-vcenter hi-space-between">
						<input v-model="asd5" value="" :placeholder="input_fxl" placeholder-style="color:#8792A8;font-size:36upx" />
					</view>
				</view>
				<view class="item hi-columns" :style="hb_status ? 'border-bottom: 1upx solid rgba(36,41,51,.1);' : 'border-bottom: 1upx solid rgba(255,255,255,.1);'">
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin: 46upx 0 42upx 0;">
						<text class="t_text" :style="hb_status ? 'border-left: 6upx solid #242933;color: #242933;' : 'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'">
							{{ $t('afanda.scltll') }}
						</text>
						<text class="t_r_infto"></text>
					</view>
					<view class="input_box hi-rows hi-flex-vcenter hi-space-between">
						<input v-model="asd6" value="" :placeholder="input_ltl" placeholder-style="color:#8792A8;font-size:36upx" />
					</view>
				</view>

				<view class="item hi-columns">
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin: 46upx 0 42upx 0;">
						<text class="t_text" :style="hb_status ? 'color: #242933;' : 'color: #FFFFFF;'">{{ $t('afanda.xmjs') }}</text>
						<text class="t_r_infto" style="margin-right: 40upx; color: red;">{{ $t('afanda.bt') }}</text>
					</view>
					<view class="input_box hi-rows hi-flex-vcenter hi-space-between">
						<view class="textarea_box" style="background: #F5F5F5;">
							<textarea v-model="beizhu" :placeholder="input_xmjs" maxlength="200" @input="textarea" placeholder-style="color:#8792A8;"></textarea>
							<text class="num">{{ textarea_cursor_num }}/200</text>
						</view>
					</view>
				</view>
				<view class="item hi-columns" :style="hb_status ? 'border-bottom: 1upx solid rgba(36,41,51,.1);' : 'border-bottom: 1upx solid rgba(255,255,255,.1);'">
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin: 46upx 0 42upx 0;">
						<text class="t_text" :style="hb_status ? 'border-left: 6upx solid #242933;color: #242933;' : 'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'">
							{{ $t('afanda.sqyhl') }}
						</text>
						<text class="t_r_infto"></text>
					</view>
					<view class="input_box hi-rows hi-flex-vcenter hi-space-between">
						<input v-model="asd7" value="" :placeholder="input_yhl" placeholder-style="color:#8792A8;font-size:36upx" />
					</view>
				</view>
				<view class="item hi-columns" :style="hb_status ? 'border-bottom: 1upx solid rgba(36,41,51,.1);' : 'border-bottom: 1upx solid rgba(255,255,255,.1);'">
					<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin: 46upx 0 42upx 0;">
						<text class="t_text" :style="hb_status ? 'border-left: 6upx solid #242933;color: #242933;' : 'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'">
							{{ $t('afanda.yxys') }}
						</text>
						<text class="t_r_infto"></text>
					</view>
					<view class="input_box hi-rows hi-flex-vcenter hi-space-between">
						<input v-model="asd8" value="" :placeholder="input_yxys" placeholder-style="color:#8792A8;font-size:36upx" />
					</view>
				</view>
				<view style="width: 100%;line-height: 90upx;text-align: center;">{{ $t('afanda.sqbz') }}</view>
			</view>

			<view class="btn_tj" @tap="tijiao">{{ $t('afanda.submitApplication') }}</view>
		</scroll-view>
	</view>
</template>

<script>
var This;
export default {
	data() {
		return {
			input_name: this.$t('afanda.srlxrxm'),
			input_phone: this.$t('afanda.qsrlxrphone'),
			input_zwName: this.$t('afanda.srbzzw'),
			input_ywName: this.$t('afanda.srbzyw'),
			input_fxl: this.$t('afanda.srfxl'),
			input_ltl: this.$t('afanda.sryltl'),
			input_xmjs: this.$t('afanda.xmjs'),
			input_yhl: this.$t('afanda.srsqyhl'),
			input_yxys: this.$t('afanda.sryxys'),

			backgroundALL: '',
			colorALL: '',
			statusBarH: '',
			header_H: 0,
			windowHeight: 0,
			hb_status: true,
			textarea_cursor_num: 0,
			bizhongming: '',
			fee: '',
			tbDescription: '',
			addressshu: '',
			shuliang: '',
			beizhu: '',
			available: '',
			asd1: '',
			asd2: '',
			asd3: '',
			asd4: '',
			asd5: '',
			asd6: '',
			asd7: '',
			asd8: ''
		};
	},
	onLoad(e) {
		this.bizhongming = e.bizhong;
		This = this;
		var zhebishisha = {
			symbol: this.bizhongming,
			token: uni.getStorageSync('token'),
			userId: uni.getStorageSync('id')
		};
		console.log(zhebishisha);
		uni.request({
			url: this.websiteUrlqiabao + 'account/getWithdrawalInfo',
			method: 'GET',
			data: zhebishisha,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'Accept-Language': 'zh'
			},
			success: res => {
				console.log(res);

				if (res.data.code == 200) {
					this.fee = res.data.data.fee;
					this.tbDescription = res.data.data.tbDescription;
					this.available = res.data.data.available;
				} else {
				}
			},
			fail: () => {}
		});
		uni.getSystemInfo({
			success(res) {
				This.statusBarH = res.statusBarHeight;
				This.windowHeight = res.windowHeight;
				// console.log(JSON.stringify(res))
				console.log(This.windowHeight);
			}
		});

		var view = uni.createSelectorQuery().select('.muen_header');
		view.boundingClientRect(data => {
			// console.log("节点离页面顶部的距离为" + data.height);
			This.header_H = data.height;
			console.log(This.header_H);
		}).exec();
	},
	onShow() {
		this.backgroundALL = uni.getStorageSync('localbk');
		this.colorALL = uni.getStorageSync('localcol');
		setTimeout(() => {
			this.tab_init();
		}, 500);
	},
	methods: {
		quanbu(shu) {
			let This=this;
			if (shu <= 0) {
				this.myAlert(This.$t('afanda.zwktbye'));
			} else {
				this.shuliang = shu;
			}
		},
		tijiao() {
			let This=this;
			if (this.asd1 == '' || this.asd2 == '' || this.asd3 == '' || this.asd4 == '') {
				this.myAlert(This.$t('afanda.srbty'));
				return false;
			}
			uni.showLoading({
				title: This.$t('afanda.tjz'),
				mask: true
			});
			var that = this;
			setTimeout(() => {
				uni.hideLoading();
				that.myAlert(This.$t('afanda.tjcg'));
			}, 2000);
		},
		tibishuming() {
			uni.navigateTo({
				url: '../tibiExplain/tibiExplain?neirong=' + this.tbDescription
			});
		},
		textarea(e) {
			this.textarea_cursor_num = e.detail.cursor;
			console.log(JSON.stringify(e.detail.cursor));
		},
		scan() {
			//扫码
			var that = this;
			uni.scanCode({
				success: function(res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					that.addressshu = res.result;
				}
			});
		},
		Back() {
			uni.navigateBack({
				//后退
				delta: 1
			});
		},
		tab_init() {
			if (this.backgroundALL == '#1c1f22') {
				this.hb_status = false;
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#1c1f22'
				});
				uni.setTabBarStyle({
					backgroundColor: '#1c1f22',
					color: '#737373',
					selectedColor: '#D3674D'
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
					selectedColor: '#D3674D'
				});
			}
		}
	}
};
</script>

<style>
.content .item .t_text {
	font-size: 28upx;
	padding-left: 34upx;
	box-sizing: border-box;
	border-left: 6upx solid #242933;
}

.content .item .t_r_infto {
	color: #8792a8;
	font-size: 20upx;
}

.content .item .input_box {
	padding: 0 40upx;
	box-sizing: border-box;
	padding-left: 0;
	padding-bottom: 23upx;
}

.content .item .input_box input {
	font-size: 36upx;
	padding-left: 34upx;
	box-sizing: border-box;
	color: #8792a8;
	flex: 1;
}

.content .item .input_box .biz {
	font-size: 22upx;
	color: #8792a8;
	padding-right: 30upx;
	border-right: 2upx solid rgba(0, 0, 0, 0.1);
	margin-right: 30upx;
}

.content .item .input_box .all_btn {
	font-size: 28upx;
	color: #3a74fc;
}

.content .item .input_box .textarea_box {
	min-height: 240upx;
	background: #c0c4cc;
	width: 590upx;
	margin-left: 40upx;
	padding: 20upx;
	box-sizing: border-box;
	position: relative;
}

.content .item .input_box .textarea_box textarea {
	flex: 1;
	font-size: 28upx;
	width: 100%;
	padding-bottom: 20upx;
	box-sizing: border-box;
}

.content .item .input_box .textarea_box .num {
	font-size: 20upx;
	color: #8792a8;
	position: absolute;
	right: 20upx;
	bottom: 20upx;
}

.btn_tj {
	width: 670upx;
	height: 100upx;
	line-height: 100upx;
	text-align: center;
	/* border: 2px solid rgba(58, 116, 252, 1); */
	background-color: #3a74fc;
	border-radius: 50px;
	color: #fff;
	font-size: 36upx;
	margin: 60upx 40upx;
}

page {
	height: 100%;
}

.container {
	width: 100%;
	height: 100%;
	overflow: hidden;
	box-sizing: border-box;
}

.muen_header {
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
	color: #8792a8;
	margin-top: 14upx;
}

.bi_title {
	width: 670upx;
	height: 88upx;
	margin: 30upx 40upx;
	border-radius: 16upx;
	line-height: 88upx;
	padding-left: 40upx;
	padding-right: 30upx;
	font-size: 36upx;
	box-sizing: border-box;
}

.content {
	width: 670upx;
	margin: 0 40upx;
	border-radius: 16upx;
	box-sizing: border-box;
	padding-bottom: 55upx;
}
</style>
