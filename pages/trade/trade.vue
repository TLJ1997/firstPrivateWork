<template>
	<view class="container hi-columns" :style="backgroundALL == '#1c1f22' ? 'height: 100vh;background:#2c3031;' : 'height: 100vh;background:#F5F9FC;'">
		<!-- 标题栏 -->
		<view class="header hi-columns" :style="'padding-top: ' + statusBarH + 'px;'" style="margin-bottom: 0;">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<view class="tab_box hi-rows hi-flex-vcenter">
					<view :class="tab_index_num === 1 ? 'active_btn active' : 'active_btn'"></view>
					<view :class="tab_index_num === 0 ? 'text active' : 'text'" @click="tab_btn(0)">{{ $t('trade.bb') }}</view>
					<view :class="tab_index_num === 1 ? 'text active' : 'text'" @click="tab_btn(1)">{{ $t('trade.cw') }}</view>
				</view>
				<view></view>

				<!-- K线 -->
				<view class="item hi-columns hi-flex-vcenter" @tap="Submenu_btn()">
					<image src="../../static/trade/icon_more.png" mode=""></image>
					<text>{{ $t('trade.gd') }}</text>
				</view>

				<view style="width:46upx;height: 46upx;">
					<image :src="hb_status ? '../../static/home/nav_icon_menu_day.png' : '../../static/home/nav_icon_menu_night.png'"
					 mode="" style="width:56upx;height: 56upx;" @click="kxian()"></image>
				</view>

			</view>
		</view>
		<view class="content" :style="'height:' + (windowHeight - header_H) + 'px;'">
			<swiper class="swiper" :current="tab_index_num" :duration="500" :style="'height:' + (windowHeight - header_H) + 'px;'"
			 @change="tab_swipr">
				<swiper-item>
					<view class="swiper-item" :style="backgroundALL == '#1c1f22' ? 'background:#2c3031;' : 'background:#F0F3F5'">
						<scroll-view class="hi-columns" scroll-y="true" :style="'height:' + (windowHeight - header_H) + 'px;'">
							<view class="m_data_box hi-columns" :style="hb_status ? 'background:#ffffff;' : 'background:#2c3031;'">
								<view class="data_title hi-rows hi-flex-vcenter hi-space-between">
									<view class="items hi-rows hi-flex-vcenter" @click="eidt()">
										<image :src="hb_status ? '../../static/trade/icon_hoice_day.png' : '../../static/trade/icon_hoice_night.png'"></image>
										<text style="font-size: 40upx;" :style="hb_status ? 'color:#242933;' : 'color:#ffffff;'">{{ qiebizhong }}</text>
									</view>
									<view class="items" @click="zixuan()">
										<text :style="hb_status ? 'color:#242933;' : 'color:#ffffff;'">{{ $t('trade.zx') }}</text>
										<image :src="zixuan_status ? '../../static/trade/icon_selected.png' : '../../static/trade/icon_default.png'"
										 mode="" style="width: 26upx;height: 26upx;margin-left: 20upx;"></image>
									</view>
								</view>
								<view class="hi-rows">
									<view class="d_item" style="width: 400upx;padding-left: 30upx;">
										<view class="price-types nc-flex-row nc-flex-main-around nc-flex-sub-center">
											<view @tap="switchPriceType(index)" class="price-types-item" v-for="(item, index) in priceTypes" :key="index"
											 :class="{ active: currentPriceTypes == index }">
												{{ item }}
											</view>
										</view>

										<view class="buy_btm_box hi-rows hi-flex-vcenter hi-space-between">
											<view :class="buy_status ? 'btn active' : 'btn'" @click="buy_status_btn(true)" :style="
													buy_status
														? 'background: url(../../static/trade/btn_purchase_left.png) no-repeat;background-size: 185rpx 76rpx;'
														: 'background: url(../../static/trade/btn_left_nor.png) no-repeat;background-size: 185rpx 76rpx;'
												">
												{{ $t('trade.mr') }}
											</view>
											<view :class="buy_status ? 'btn' : 'btn active'" @click="buy_status_btn(false)" :style="
													buy_status
														? 'background: url(../../static/trade/btn_right_nor.png)no-repeat;background-size: 185rpx 76rpx;'
														: 'background: url(../../static/trade/btn_sellout_right.png)no-repeat;background-size: 185rpx 76rpx;'
												">
												{{ $t('trade.mc') }}
											</view>
										</view>

										<!-- 市价和限价切换 -->

										<view class="input_box hi-rows hi-flex-vcenter" v-show="currentPriceTypes == 0">
											<input :value="recommendPrice" @input="jiageshu" type="number" :style="hb_status ? 'color:#6E778A;' : ''"
											 :placeholder="$t('trade.je')" placeholder-style="color:#B8BECC;font-size: 12px;" />
											<text class="btn" @tap="jian_btn(0)">－</text>
											<text>|</text>
											<text class="btn" @tap="jia_btn(0)">＋</text>
										</view>
										<view class="hi-columns money_box" v-show="currentPriceTypes == 0">≈{{ recommendPriceCn }} CNY</view>
										<view style="color: #6E778A;padding: 30rpx 0;text-align: center;" v-show="currentPriceTypes == 1">按市价购买</view>

										<view class="input_box hi-rows hi-flex-vcenter">
											<input style="border-right: none;" v-model="numjia" @input="jiantingshu" type="number" :placeholder="$t('trade.sl')"
											 :style="hb_status ? 'color:#6E778A;' : ''" placeholder-style="color:#B8BECC;font-size: 12px;" />
											<text class="btn" style="font-size: 35upx;">{{ qiekai }}</text>
										</view>
										<view class="hi-columns money_box">{{ $t('trade.ky') }} {{ balance }} {{ symbol }}</view>

										<view class="bili_box hi-rows hi-space-between">
											<text :style="item.chcek ? 'border-color: #007F0E;' : ''" v-for="(item, index) in baifenbimaichu" :key="index"
											 @tap="baifenbitapmaichu(buy_status, item.title, index)">
												{{ item.title }}%
											</text>
											<!-- <text :class="buy_status?'active lv':'active red'">100%</text> -->
										</view>

										<view class="jy_text_box hi-rows hi-flex-vcenter hi-space-between">
											<text :style="hb_status ? 'color:#6E778A;' : ''" style="font-size: 28upx;">{{ $t('trade.jye') }}</text>
											<text :style="hb_status ? 'color:#6E778A;' : ''" style="font-size: 24upx;">{{ jiaoyie }} USDT</text>
										</view>
										<view v-if="!islogin" class="buy_btn" :class="buy_status ? 'lv' : 'red'" @tap="toLogin">{{ $t('trade.login') }}</view>
										<view v-else-if="buy_status" class="buy_btn lv" @tap="maimai">{{ $t('trade.mr') }}</view>
										<view v-else-if="!buy_status" class="buy_btn red" @tap="maimai">{{ $t('trade.mc') }}</view>
									</view>
									<view class="d_item" style="width: 50%;padding-left: 20upx;box-sizing: border-box;">
										<view class="r_item hi-columns" style="height: 358upx; position: relative;">
											<view class="row_title hi-rows hi-flex-vcenter hi-space-between">
												<text>{{ $t('trade.jg') }}</text>
												<text>{{ $t('trade.sl') }}</text>
											</view>
											<view style="position: absolute; width: 100%;" :style="'bottom:' + 28 * index + 'px;'" v-for="(item, index) in xiaoxibuy.depth.sells"
											 :key="index" @tap="jiagechuan('buy', item)">
												<view class="row_con hi-rows hi-flex-vcenter hi-space-between" style="width: 100%;position: relative;">
													<!-- <text style="z-index: 1;color: #c37986;">{{ item.price }}</text> -->
													<text style="z-index: 1;color: #c37986;">{{ item._id }}</text>
													<!-- <text style="z-index: 1;">{{ item.num }}</text> -->
													<text style="z-index: 1;">{{ item.remainingNum }}</text>
													<view class="bg buybg" style="background-color: #E0316C;" :style="{ width: beijingbaifenbi(item.remainingNum, item.totalNum) }"></view>
												</view>
											</view>
										</view>

										<view class="j_text hi-columns" v-if="xiaoxibuy.depth.currentPrice != null">
											<text class="t1">{{ xiaoxibuy.depth.currentPrice }}</text>
											<text class="t2">≈{{ xiaoxibuy.depth.currentPriceCn }} CNY</text>
										</view>

										<view class="r_item hi-columns" style="height:308upx;">
											<view class="row_con hi-rows hi-flex-vcenter hi-space-between" style="position: relative;" v-for="(item, index) in xiaoxibuy.depth.buys"
											 :key="index" @tap="jiagechuan('sell', item)">
												<text style="z-index: 1;color: #0aab8a;">{{ item._id }}</text>
												<text style="z-index: 1;">{{ item.remainingNum }}</text>
												<view class="bg buybg" style="background-color: #24B29B;" :style="{ width: beijingbaifenbi(item.remainingNum, item.totalNum) }"></view>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="weituo_box hi-columns" style="padding-bottom: 120upx;" :style="hb_status ? 'background:#ffffff;' : 'background:#2c3031;'">
								<view class="weituo_title" style="position: relative;display: inline-flex;" :style="hb_status? 'color:#242933;border-bottom: 1px solid rgba(0,0,0,.1);border-top: 20upx solid rgba(0,0,0,.1);'
											: 'color:#ffffff;border-bottom: 1rpx solid #2f3336;border-top:20upx solid #2f3336;'">
									<view style="width: 50%;text-align: left;font-size: 33upx;">{{ $t('trade.zjwt') }}</view>
									<view style="width: 50%;text-align: right;" @click="lishiweituo()">
										<text style="color: #39BAE8;">{{ $t('trade.lswt') }}</text>
									</view>
								</view>
								<view class="con_null_box hi-columns hi-flex-vcenter" v-if="xiaoxibuy && xiaoxibuy.commissions && xiaoxibuy.commissions.length == 0">
									<view class="hi-columns hi-flex-vcenter hi-flex-center">
										<image src="../../static/trade/icon_blank.png" mode="" style="height: 86upx;width: 86upx;margin-bottom: 20upx;"></image>
										<text>{{ $t('trade.nzwwtjl') }}</text>
									</view>
								</view>
								<view style="width: 100%; padding: 20upx; box-sizing: border-box;" v-if="xiaoxibuy && xiaoxibuy.commissions && xiaoxibuy.commissions.length != 0">
									<view v-for="(item, index) in xiaoxibuy.commissions" :key="index" style="padding-bottom: 20upx;border-bottom: #F1F1F1 1upx solid; padding-top: 20upx;">
										<view class="zhuyes">
											<view class="zuoye" v-if="item.type == 'sell'">
												<text class="zuowenwen" style="color: #E0316C;font-size: 33upx;">{{ $t('trade.mc') }}</text>
												<text class="youwenwen">{{ item.createDate }}</text>
											</view>
											<view class="zuoye" v-if="item.type == 'buy'">
												<text class="zuowenwen" style="color: #24B29B;font-size: 33upx;">{{ $t('trade.mr') }}</text>
												<text class="youwenwen">{{ item.createDate }}</text>
											</view>
											<view class="youye">
												<view>
													<block>
														<view class="mini-btn" @tap="chedan(item.orderNum)">{{ $t('trade.cx') }}</view>
													</block>
												</view>
											</view>
										</view>
										<view style="display: flex;justify-content: space-between;align-items:center;font-size: 25upx;padding: 10upx 0;color: #646464;">
											<view>
												<view style="color: #9fa2a5;">{{ $t('trade.jg') }}</view>
												<view style="text-align: center; margin-top: 10upx;">{{ item.price }}</view>
											</view>
											<view>
												<view style="color: #9fa2a5;">{{ $t('trade.sl') }}</view>
												<view style="text-align: center; margin-top: 10upx;">{{ item.totalNum }}</view>
											</view>
											<view>
												<view style="color: #9fa2a5; text-align:right ;">{{ $t('trade.sjcj') }}</view>
												<view style="text-align:right; margin-top: 10upx;">{{ (item.totalNum - item.remainingNum).toFixed(4) }}</view>
											</view>
										</view>
									</view>
								</view>
								<view class="con_null_box hi-columns hi-flex-vcenter" v-if="xiaoxibuy && xiaoxibuy.commissions && (xiaoxibuy.commissions.length != 0)">
									<text>{{ $t('trade.lswtck') }}</text>
								</view>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item hi-columns" :style="backgroundALL == '#1c1f22' ? 'background:#05060F;' : 'background:#F0F3F5'">
						<view class="title_box hi-rows hi-flex-vcenter hi-space-between">
							<view class="l_text changwai_tab hi-rows hi-flex-vcenter">
								<view class="l hi-columns hi-flex-center hi-flex-vcenter" @click="cw_tab_btn(0)">
									<text :style="hb_status ? 'color:#242933;' : 'color:#ffffff;'" :class="changwai.tab_index == 0 ? 'active' : ''">{{ $t('trade.wym') }}</text>
									<view :class="changwai.tab_index == 0 ? 'y_box' : 'y_box hide'"></view>
								</view>
								<view class="l hi-columns hi-flex-center hi-flex-vcenter" @click="cw_tab_btn(1)">
									<text :style="hb_status ? 'color:#242933;' : 'color:#ffffff;'" :class="changwai.tab_index == 1 ? 'active' : ''">{{ $t('trade.wymai') }}</text>
									<view :class="changwai.tab_index == 1 ? 'y_box' : 'y_box hide'"></view>
								</view>
							</view>
							<view class="r_box hi-rows hi-flex-vcenter">
								<view class="Submenu_box hi-columns" v-show="isSubmenu">
									<view class="sanjiao"></view>
									<view class="sub_item hi-rows" @click="sub_btn('fabugg')">
										<image src="../../static/trade/icon_edit.png" mode=""></image>
										<text>{{ $t('trade.fbgg') }}</text>
									</view>
									<view class="sub_item hi-rows" @click="sub_btn('gggl')">
										<image src="../../static/trade/icon_edit.png" mode=""></image>
										<text>{{ $t('trade.gggl') }}</text>
									</view>
									<view class="sub_item hi-rows" @click="sub_btn('xrgl')">
										<image src="../../static/trade/icon_trust.png" mode=""></image>
										<text>{{ $t('trade.xrgl') }}</text>
									</view>
									<view class="sub_item hi-rows" @click="sub_btn('ordergl')">
										<image src="../../static/trade/icon_order.png" mode=""></image>
										<text>{{ $t('trade.ddgl') }}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="nav_box hi-columns" style="background-color:#FFF;">
							<scroll-view class="grace-scroll-x hi-flex-vcenter hi-flex-center" scroll-x :scroll-into-view="'view' + bizhong.index"
							 style="width: 670upx;height: 100upx;">
								<view class="item hi-columns hi-flex-vcenter hi-flex-center" :id="'view' + item.id" :class="bizhong.index == index ? 'active' : ''"
								 v-for="(item, index) in bizhong.list" :key="index" @click="tobizhong(index)">
									<text>{{ item }}</text>
									<view :class="bizhong.index == index ? 'yd' : ''"></view>
								</view>
							</scroll-view>
						</view>
						<view class="list_box" :style="hb_status ? 'background: #FFFFFF;height: ' + (listBox_H - header_H) + 'px;' : 'height: ' + (listBox_H - header_H) + 'px;background: #18253D;'">
							<you-scroll ref="scroll" :colorStstus="hb_status" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore"
							 :style="'height: ' + listBox_H + 'px;'">
								<view class="list_con_wap hi-columns">

									<!-- 用户列表 -->
									<view class="item-view hi-rows" v-for="(item, index) in changwailist" :key="index" :style="hb_status ? 'border-bottom:1upx solid rgba(0,0,0,.1);' : 'border-bottom:1upx solid rgba(255,255,255,.1);'">
										<view class="tx_box">
											<image :src="item.head" style="border-radius: 50%;border:1upx solid #f5f5f5;" mode=""></image>
											<text class="shiming_text">实名</text>
										</view>
										<view class="r_con hi-columns">
											<view class="lst_title_box" :style="hb_status ? 'border-bottom:1upx solid rgba(0,0,0,.1);' : 'border-bottom:1upx solid rgba(255,255,255,.1);'" style="display: flex;justify-content: left;align-items: center;">
												<view class="title" :style="hb_status ? 'color: #5AC4EB;' : 'color: #FFFFFF;'">{{ item.nickname }}</view>
												<view class="hi-rows">
													<text style="font-size: 20upx;margin-left:18upx;color: #BCBEBE;">{{ $t('trade.xe') }}：{{ item.min }}-{{ item.max }}</text>
												</view>
											</view>
											<text style="color: #FDC16F;">{{ $t('trade.jy') }} 0</text>
											<view class="danjia_text" style="text-align: right;margin-top: -50upx;">
												<text class="money">{{ item.price }}</text> <text style="font-size: 20upx;color: #BCBEBE;">（CNY）</text>
											</view>
											<view class="pay_box hi-rows hi-flex-vcenter hi-space-between">
												<view class="pay_img">
													<block v-if="item.wxPay == true">
														<image src="../../static/wo/icon_wechat_open.png" style="width: 34upx;height: 35upx;margin: 0 5upx;" mode=""></image>
													</block>

													<block v-if="item.alPay == true">
														<image src="../../static/wo/icon_alipay_open.png" style="width: 34upx;height: 35upx;margin: 0 5upx;" mode=""></image>
													</block>

													<block v-if="item.bankPay == true">
														<image src="../../static/wo/icon_receivables_land.png" style="width: 34upx;height: 35upx;margin: 0 5upx;"
														 mode=""></image>
													</block>
												</view>
												<block v-if="changwai.tab_index == 0">
													<view class="btn" style="background: #24B29B;" @click="gou('buy', item.id)">{{ $t('trade.gm') }}</view>
												</block>
												<block v-if="changwai.tab_index == 1">
													<view class="btn" style="background: #E0316C;" @click="gou('sell', item.id)">{{ $t('trade.cs') }}</view>
												</block>
											</view>
										</view>
									</view>



								</view>
								<view>
									<div class="loadingText"></div>
								</view>
							</you-scroll>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view :class="isshow_left_muen ? 'left_muen_maks active' : 'left_muen_maks'" :style="hb_status ? 'background: rgba(0,0,0,.7);' : 'background: rgba(0,0,0,.3);'" @click="eidt()"></view>
		<view :class="isshow_left_muen ? 'left_muen_box hi-columns active' : 'left_muen_box'" :style="backgroundALL == '#1c1f22' ? 'background:#2c3031;' : 'background:#ffffff'">
			<!-- 标题栏 -->
			<view class="muen_header hi-columns" :style="'padding-top: ' + statusBarH + 'px;'">
				<view class="hi-rows hi-flex-vcenter  hi-space-between">
					<view class="hi-rows hi-flex-vcenter">
						<image :src="hb_status ? '../../static/home/nav_icon_back_day.png' : '../../static/home/nav_icon_back_night.png'"
						 mode="" style="width:46upx;height: 46upx;" @click="eidt()"></image>
					</view>
					<view class="hi-rows hi-flex-vcenter"></view>
				</view>
			</view>
			<view class="header_title_box hi-rows hi-flex-vcenter hi-space-between">
				<view class="header_item hi-rows hi-flex-vcenter hi-space-between">
					<text class="t1" :style="hb_status ? 'color: #242833;' : 'color: #ffffff;'">{{ $t('trade.bb') }}</text>
				</view>
				<view class="header_item"></view>
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
					<input type="text" v-model="shousuonei" @input="sousuo" :placeholder="$t('trade.ssbz')" placeholder-style="color: #8792A8;" />
					<!-- <button @tap="sousuo" style="width: 120upx; height: 60upx;border-radius: 10upx; background: #ececec; font-size: 30upx; position: absolute;right:20upx; padding: 0;line-height: 60upx;">搜索</button> -->
				</view>
			</view>
			<view class="list_bizhong">
				<view v-for="(items, index) in bizhonglist" :key="index" v-if="items != null" @click="tiaoti(items.tradingPair)"
				 class="hi-rows hi-flex-vcenter hi-space-between item" :style="hb_status ? 'border-bottom: 1upx solid rgba(0,0,0,.1);' : 'border-bottom: 1upx solid rgba(255,255,255,.1);'">
					<view class="hi-rows hi-flex-vcenter">
						<text class="t1" :style="hb_status ? 'color: #242833;' : 'color: #ffffff;'">{{ items.tradingPair }}</text>
					</view>
					<!-- <text class="t2">/USDT</text> -->
					<view class="hi-rows">
						<text class="r_t red">{{ items.price }}</text>
					</view>
				</view>

				<view class="hi-columns" style="height: 34upx;width: 100%; text-align: center;justify-content: center;height: 80upx;"
				 v-show="xianduo">
					<button @tap="zixuangengduo" style="width: 200upx; height: 60upx;border-radius: 10upx; background: #ececec; font-size: 30upx; padding: 0;line-height: 60upx;">
						{{ $t('trade.djjzgd') }}
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var g_KLine = {
		JSChart: null
	};
	var This;
	var buysellmsg;
	import youScroll from '@/components/you-scroll.vue';
	export default {
		components: {
			youScroll
		},
		data() {
			return {
				priceTypes: ['限价', '市价'],
				currentPriceTypes: 0,
				islogin: false,
				qiebizhong: 'YK/USDT',
				qiekai: 'YK',
				nummai: 0,
				numjia: 0,
				list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				tab_index_num: 0, //币币 和场外切换索引
				zixuan_status: false, //false 未选择    true 已选择
				buy_status: true, // true 买入   fasle 卖出
				listBox_H: 0, //list_box高度
				isSubmenu: false, //更多菜单
				changwai: {
					tab_index: 0, //0 买  1卖
					bizhong: 'USDT'
				},
				isshow_left_muen: false, //是否显示侧滑
				bibilist: '',
				bizhonglist: [],
				timer: '',
				pagejia: 1,
				buysell: 'buy',
				balance: '0.0000',
				recommendPrice: '0.0000',
				recommendPriceCn: '0.0000',
				symbol: 'USDT',
				xiaoxibuy: {
					depth: {
						currentPriceCn: '',
						currentPrice: '',
						sells: [],
						buys: []
					},
					commissions: []
				},
				usdtCn: '',
				jiaoyie: '',
				baifenbimaichu: [{
						title: '25',
						chcek: false
					},
					{
						title: '50',
						chcek: false
					},
					{
						title: '75',
						chcek: false
					},
					{
						title: '100',
						chcek: false
					}
				],
				shousuonei: '',
				xianduo: true,
				suobi: '',
				bizhong: {},
				lists: [],
				leixing: 'sell',
				changwailist: []
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

			if (uni.getStorageSync('token') != '') {
				this.islogin = true;
			}

			setTimeout(function() {
				var view = uni.createSelectorQuery().select('.header');
				view.boundingClientRect(data => {
					// console.log("节点离页面顶部的距离为" + data.height);
					This.header_H = data.height;
					console.log(This.header_H);
				}).exec();

				var listBox = uni.createSelectorQuery().select('.list_box');
				listBox
					.boundingClientRect(data => {
						// console.log("节点离页面顶部的距离为" + data.height);
						This.listBox_H = data.height;
						console.log(This.listBox_H);
					})
					.exec();
			}, 500);
		},
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk');
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(() => {
				this.tab_init();
			}, 500);
			var memberData = this.$member.memberObj;
			console.log(memberData.name);
			if (memberData.name == '0') {
				this.tab_index_num = 0;
			} else {
				this.tab_index_num = 1;
			}
			this.$eventHub.$on('jiayidui', data => {
				console.log('监听到交易对 - ' + data);
				var annd = data.split('/');
				this.qiekai = annd[0];
				this.qiebizhong = data;
				if (this.buy_status == true) {
					this.buysell = 'buy';
				} else {
					this.buysell = 'sell';
				}
				this.onelist();
			});
			var _this = this; //声明一个变量指向vue实例this,保证作用域一致
			uni.connectSocket({
				url: 'ws://42.194.218.215:10021/socket',
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
			buysellmsg = {
				token: uni.getStorageSync('token'),
				userId: uni.getStorageSync('id'),
				tradingPair: _this.qiebizhong
			};

			this.timer = setInterval(function() {
				uni.sendSocketMessage({
					data: JSON.stringify(buysellmsg)
				});
				// console.log(JSON.stringify(buysellmsg))
				uni.onSocketMessage(function(res) {
					// console.log(res)
					if (res.data == 'hello') {} else {
						var zhesi = res.data;
						_this.xiaoxibuy = JSON.parse(zhesi);
						// console.log(JSON.parse(res.data))
					}
				});
			}, 800);
			if (this.buy_status == true) {
				this.buysell = 'buy';
			} else {
				this.buysell = 'sell';
			}
			this.onelist();
			this.zixuanlist();
			this.jiaoyiduilist();
			uni.request({
				url: this.websiteUrlotc + 'otc/getSymbolList',
				method: 'GET',
				data: {},
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					'Accept-Language': 'zh'
				},
				success: res => {
					console.log(res);
					if (res.data.code == 200) {
						this.lists = res.data.data;
						(this.bizhong = {
							index: 0,
							list: this.lists
						}),
						(this.changwai.tab_index = 0);
						console.log(this.bizhong);
						this.tobizhong('0');
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
				},
				fail: () => {}
			});

			// g_KLine.JSChart.StopAutoUpdate();
			// g_KLine.JSChart=null;

			this.priceTypes = [this.$t('trade.xianjia'), this.$t('trade.shijia')];
		},
		onHide() {
			if (this.timer != null) {
				clearInterval(this.timer);
				this.timer = null;
				uni.closeSocket();
			}
		},
		methods: {
			//切换市价
			switchPriceType(index) {
				this.currentPriceTypes = index;
				// this.buy_status_btn(this.buy_status);
			},
			toLogin() {
				uni.redirectTo({
					url: '../login/login'
				});
			},
			tobizhong(e) {
				//切换币种
				this.bizhong.index = e;
				console.log(e);
				this.pagejia = 1;
				this.leixing = 'sell';
				var zhebishishasss = {
					page: this.pagejia,
					symbol: this.bizhong.list[this.bizhong.index],
					type: this.leixing
				};
				console.log(zhebishishasss);
				uni.request({
					url: this.websiteUrlotc + 'otc/getShopList',
					method: 'GET',
					data: zhebishishasss,
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					success: res => {
						console.log(res);
						if (res.data.code == 200) {
							this.changwailist = res.data.data.list;
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
					},
					fail: () => {}
				});
			},
			jiagechuan(type, item) {
				console.log('type:' + type);
				console.log('item:' + JSON.stringify(item));
				// if (this.buy_status == true) {
				// 	this.recommendPrice = jiage
				// } else{
				// 	this.recommendPrice = jiage
				// }
				if (this.currentPriceTypes == 0) {
					if (this.buy_status == true) {
						if (type == 'buy') {
							this.recommendPrice = item._id;
							this.numjia = item.remainingNum;
						}
					} else {
						if (type == 'sell') {
							this.recommendPrice = item._id;
							this.numjia = item.remainingNum;
						}
					}
				}
			},
			beijingbaifenbi(num, znum) {
				var dsdf = Math.round((num / znum) * 10000) / 100;

				return dsdf.toFixed(0) + '%';
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
			onelist() {
				var chushiyi = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					type: this.buysell,
					tradingPair: this.qiebizhong
				};
				console.log(chushiyi);
				uni.request({
					url: this.websiteUrlbibi + 'api/getPageInfo', //仅为示例，并非真实接口地址。
					data: chushiyi,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					method: 'GET',
					success: res => {
						console.log(res.data);

						if (res.data.code == 200) {
							this.balance = res.data.data.balance;
							this.zixuan_status = res.data.data.isOptional;
							this.recommendPrice = res.data.data.recommendPrice;
							this.recommendPriceCn = res.data.data.recommendPriceCn;
							this.symbol = res.data.data.symbol;
							this.usdtCn = res.data.data.usdtCn;
							let jiaoshu = Number(this.recommendPrice) * Number(0.0);
							this.jiaoyie = jiaoshu.toFixed(3);
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
			gengduozixuan() {
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
									title: '没有更多了',
									icon: 'none',
									duration: 1000
								});
							} else {
								uni.showToast({
									title: '已加载',
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
					title: '加载中'
				});
				setTimeout(() => {
					uni.hideLoading();
					that.pagejia = Number(that.pagejia) + 1;
					that.gengduozixuan();
				}, 1000);
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
			eidtttt() {
				//显示隐藏侧边栏

				uni.navigateTo({
					url: '../webview/index'
				});
				// const subNVue = uni.getSubNVueById('KXIAN')
				// subNVue.setStyle({
				// 	width:'100%',
				// 	height:'100%'
				// })
				// // const subNVues = uni.getCurrentSubNVue();
				// console.log(subNVue)
				// //打开 nvue 子窗体
				// subNVue.show('pop-in', 300, function(res){
				//     // 打开后进行一些操作...
				//     console.log(res)
				// });
			},
			tiaoti(e) {
				this.qiebizhong = e;
				this.isshow_left_muen = !this.isshow_left_muen;
				this.$eventHub.$emit('jiayidui', this.qiebizhong);
				buysellmsg = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					tradingPair: this.qiebizhong
				};
				console.log(buysellmsg);
				uni.sendSocketMessage({
					data: JSON.stringify(buysellmsg)
				});
			},
			nav1: function(jiaoyi) {
				this.closeDrawer1();
				this.$eventHub.$emit('jiayidui', jiaoyi);
				this.getall(this.niutype);
			},
			chedan(orderNum) {
				console.log(orderNum);
				var that = this;
				uni.showModal({
					title: '系统提示',
					content: '确定要撤单吗？',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '加载中'
							}); //出现加载中图标
							var buysellche = {
								token: uni.getStorageSync('token'),
								userId: uni.getStorageSync('id'),
								orderNum: orderNum,
								actionType: 1
							};
							console.log(buysellche);
							uni.request({
								// url: that.websiteUrlbibi + 'api/cancelOrder', //仅为示例，并非真实接口地址。
								url: that.websiteUrlbibi + 'api/placeAnOrder', //仅为示例，并非真实接口地址。
								data: buysellche,
								header: {
									'Content-Type': 'application/x-www-form-urlencoded',
									'Accept-Language': 'zh'
								},
								method: 'POST',
								success: res => {
									uni.hideLoading();
									console.log(res.data);
									if (res.data.code == 200) {
										uni.showToast({
											title: res.data.msg,
											icon: 'none',
											duration: 1000
										});
									} else if (res.data.code == 500) {
										that.myAlert(res.data.msg);
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
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			maimai() {
				var that = this;
				if (this.buy_status == true) {
					var maiwen = '是否买入？';
				} else {
					var maiwen = '是否卖出？';
				}
				if (this.numjia <= 0) {
					uni.showToast({
						title: '请输入正确的数量',
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				if (this.currentPriceTypes == 1) {
					this.onelist();
				}


				/* 市价 */
				// if (this.currentPriceTypes == 1) {
				// 	if (this.buy_status == true) {
				// 		if (this.xiaoxibuy.depth.sells.length > 0) {
				// 			this.recommendPrice = this.xiaoxibuy.depth.sells[this.xiaoxibuy.depth.sells.length - 1].price;
				// 			console.log("价格sells:"+this.recommendPrice)
				// 		}
				// 	} else {
				// 		// that.buysell = 'sell';
				// 		if (this.xiaoxibuy.depth.buys.length > 0) {
				// 			this.recommendPrice = this.xiaoxibuy.depth.buys[this.xiaoxibuy.depth.buys.length - 1].price;
				// 			console.log("价格buys:"+this.recommendPrice)
				// 		}
				// 	}
				// }
				uni.showModal({
					title: '系统提示',
					content: maiwen,
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '加载中'
							}); //出现加载中图标

							if (that.buy_status == true) {
								that.buysell = 'buy';
							} else {
								that.buysell = 'sell';
							}
							setTimeout(() => {
								console.log("that.recommendPrice:" + that.recommendPrice);
								var buysellnum = {
									token: uni.getStorageSync('token'),
									userId: uni.getStorageSync('id'),
									num: that.numjia,
									price: that.recommendPrice,
									tradingPair: that.qiebizhong,
									type: that.buysell,
									actionType: 0
								};
								/* 市价 */
								if (that.currentPriceTypes == 1) {
									if (that.buy_status == true) {
										if (that.xiaoxibuy.depth.sells.length > 0) {
											buysellnum.price = that.xiaoxibuy.depth.sells[that.xiaoxibuy.depth.sells.length - 1]._id;
											console.log("价格sells:" + that.recommendPrice)
										}
									} else {
										// that.buysell = 'sell';
										if (that.xiaoxibuy.depth.buys.length > 0) {
											buysellnum.price = that.xiaoxibuy.depth.buys[that.xiaoxibuy.depth.buys.length - 1]._id;
											console.log("价格buys:" + that.recommendPrice)
										}
									}
								}
								uni.request({
									// 买币的接口  'http://42.194.218.215:9999/api/placeAnOrder'
									url: that.websiteUrlbibi + 'api/placeAnOrder', //仅为示例，并非真实接口地址。
									data: buysellnum,
									header: {
										'Content-Type': 'application/x-www-form-urlencoded',
										'Accept-Language': 'zh'
									},
									method: 'POST',
									success: res => {
										uni.hideLoading();
										console.log(res.data);
										if (res.data.code == 200) {
											uni.showToast({
												title: res.data.msg,
												icon: 'none',
												duration: 1000
											});
										} else if (res.data.code == 500) {
											that.myAlert(res.data.msg);
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
							}, 1500);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			baifenbitapmaichu(c, e, a) {
				console.log(c);
				for (var i = 0, lenI = this.baifenbimaichu.length; i < lenI; ++i) {
					this.baifenbimaichu[i].chcek = false;
				}
				this.baifenbimaichu[a].chcek = true;
				console.log(e);
				if (c == true) {
					console.log('买入');
					this.baifenindexmaichu = a;
					let dahaha = (this.balance * (e / 100)) / Number(this.recommendPrice);
					this.numjia = dahaha.toFixed(6);
					let jiaoshu = Number(this.balance) * Number(e / 100);
					this.jiaoyie = jiaoshu.toFixed(3);
				} else {
					console.log('卖出');
					this.baifenindexmaichu = a;
					this.numjia = this.balance * (e / 100);
					let jiaoshu = Number(this.recommendPrice) * Number(this.numjia);
					this.jiaoyie = jiaoshu.toFixed(3);
				}
			},
			jiantingshu(e) {
				if (this.buy_status == true) {
					console.log('买入');
					// let dahaha = Number(e.detail.value)/Number(this.recommendPrice);
					// this.numjia = dahaha.toFixed(6)
					let dahaha = Number(e.detail.value) * Number(this.recommendPrice);
					this.jiaoyie = dahaha.toFixed(3);
				} else {
					console.log('卖出');
					this.numjia = e.detail.value;
					console.log(e.detail.value);
					let jiaoshu = Number(this.recommendPrice) * Number(this.numjia);
					this.jiaoyie = jiaoshu.toFixed(3);
				}
			},
			jiageshu(e) {
				this.recommendPrice = e.detail.value;
				let jiaoshu = Number(this.recommendPrice) * Number(this.numjia);
				this.jiaoyie = jiaoshu.toFixed(3);
			},
			jian_btn(e) {
				//如果是限价购买
				if (this.currentPriceTypes == 0) {
					//限价正常通过
					if (e == 0) {
						if (this.recommendPrice <= 0.001) {
							this.recommendPrice = 0.001;
						} else {
							let jianshu = Number(this.recommendPrice) - Number(0.001);
							this.recommendPrice = jianshu.toFixed(3);
							let chengshu = Number(this.recommendPrice) * Number(this.usdtCn);
							this.recommendPriceCn = chengshu.toFixed(3);
							let jiaoshu = Number(this.recommendPrice) * Number(this.numjia);
							this.jiaoyie = jiaoshu.toFixed(3);
						}
					}
				}
			},
			jia_btn(e) {
				//如果是限价购买
				if (this.currentPriceTypes == 0) {
					//限价正常通过
					if (e == 0) {
						let jianshu = Number(this.recommendPrice) + Number(0.001);
						this.recommendPrice = jianshu.toFixed(3);
						let chengshu = Number(this.recommendPrice) * Number(this.usdtCn);
						this.recommendPriceCn = chengshu.toFixed(3);
						let jiaoshu = Number(this.recommendPrice) * Number(this.numjia);
						this.jiaoyie = jiaoshu.toFixed(3);
					}
				}
			},
			gou(orderType, id) {
				console.log(orderType + '=========' + id);
				uni.navigateTo({
					url: 'cw_order/cw_order?orderType=' + orderType + '&id=' + id
				});
			},
			sub_btn(e) {
				if (e == 'fabugg') {
					uni.navigateTo({
						url: './fabugg/fabugg'
					});
					console.log('发布广告');
				} else if (e == 'gggl') {
					uni.navigateTo({
						url: '/pages/trade/advertMsg/advertMsg'
					});
					console.log('广告管理');
				} else if (e == 'xrgl') {
					console.log('信任广告');
				} else if (e == 'ordergl') {
					console.log('订单管理');
					uni.navigateTo({
						url: '/pages/trade/ordermanage/ordermanage'
					});
				}
				this.Submenu_btn();
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
			eidt() {
				//显示隐藏侧边栏
				this.isshow_left_muen = !this.isshow_left_muen;
				this.zixuanlist();
				this.jiaoyiduilist();
			},
			lishiweituo() {
				//历史委托
				uni.navigateTo({
					url: 'bibiweituo/bibiweituo'
				});
			},
			Submenu_btn() {
				this.isSubmenu = !this.isSubmenu;
			},
			bizhong_btn(e) {
				this.changwai.bizhong = e;
				uni.showToast({
					title: this.changwai.bizhong,
					duration: 1000,
					icon: 'none'
				});
			},
			cw_tab_btn(e) {
				//场外 买卖切换
				this.changwai.tab_index = e;
				console.log(this.changwai.tab_index);
				this.bizhong.index = 0;
				this.pagejia = 1;
				if (this.changwai.tab_index == '0') {
					this.leixing = 'sell';
				} else {
					this.leixing = 'buy';
				}

				var ascd = {
					page: this.pagejia,
					symbol: this.bizhong.list[this.bizhong.index],
					type: this.leixing
				};
				console.log(ascd);
				uni.request({
					url: this.websiteUrlotc + 'otc/getShopList',
					method: 'GET',
					data: ascd,
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Accept-Language': 'zh'
					},
					success: res => {
						console.log(res);
						if (res.data.code == 200) {
							this.changwailist = res.data.data.list;
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
					},
					fail: () => {}
				});
			},
			buy_status_btn(e) {
				//切换买入卖出
				this.buy_status = e;
				if (this.buy_status == true) {
					this.buysell = 'buy';
				} else {
					this.buysell = 'sell';
				}
				this.onelist();
				This.numjia = 0;
				console.log(This.numjia);
				for (var i = 0, lenI = this.baifenbimaichu.length; i < lenI; ++i) {
					this.baifenbimaichu[i].chcek = false;
				}
			},
			zixuan() {
				//自选切换
				this.zixuan_status = !this.zixuan_status;
				console.log(this.zixuan_status);
				if (this.zixuan_status == true) {
					var tianjianzixuan = {
						token: uni.getStorageSync('token'),
						userId: uni.getStorageSync('id'),
						tradingPair: this.qiebizhong,
						state: 1
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
				} else {
					var tianjianzixuan = {
						token: uni.getStorageSync('token'),
						userId: uni.getStorageSync('id'),
						tradingPair: this.qiebizhong,
						state: 0
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
				}
				this.zixuanlist();
			},
			tab_swipr(e) {
				//swipr切换
				this.tab_index_num = e.detail.current;
				console.log(this.tab_index_num);
			},
			kxian() {
				console.log('K线');
				uni.navigateTo({
					url: '../webview/index'
				})
			},
			tab_btn(e) {
				//点击币币和场外切换
				this.tab_index_num = e;
				if (e == 0) {
					let obj = {
						name: '0'
					};
					this.$member.setMemberObj(obj);
				} else {
					let obj = {
						name: '1'
					};
					this.$member.setMemberObj(obj);
				}
			},
			onPullDown(done) {
				// 下拉刷新
				console.log('执行');
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
				console.log('执行');
				uni.showLoading({
					title: '加载中'
				});
				var that = this;
				setTimeout(() => {
					that.pagejia = Number(that.pagejia) + 1;
					var saadfffss = {
						page: that.pagejia,
						symbol: that.bizhong.list[that.bizhong.index],
						type: that.leixing
					};
					console.log(saadfffss);
					uni.request({
						url: that.websiteUrlotc + 'otc/getShopList',
						method: 'GET',
						data: saadfffss,
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'Accept-Language': 'zh'
						},
						success: res => {
							uni.hideLoading();
							console.log(res);
							if (res.data.code == 200) {
								if (res.data.data.currentPage > res.data.data.totalPages) {
									uni.showToast({
										title: '没有更多了',
										icon: 'none',
										duration: 1000
									});
								} else {
									uni.showToast({
										title: '已加载',
										icon: 'none',
										duration: 1000
									});
									if (res.data.data.list == null || res.data.data.list == '') {
										// that.changwailist = [];
									} else {
										that.changwailist = that.changwailist.concat(res.data.data.list);
										console.log(that.changwailist);
									}
								}
							} else if (res.data.code == 500) {
								that.myAlert(res.data.msg);
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
						},
						fail: () => {}
					});
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

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.price-types {
		.price-types-item {
			height: 60rpx;
			box-sizing: border-box;
			padding: 15rpx 0;
			color: #6e778a;

			&.active {
				border-bottom: 2rpx solid #33b090;
				color: #33b090;
			}
		}
	}

	.zhuyes {
		width: 100%;
		display: inline-flex;
	}

	.zuoye {
		width: 75%;
	}

	.youye {
		width: 25%;
	}

	.zuowenwen {
		color: #ffb800;
		font-size: 28upx;
	}

	.youwenwen {
		color: #666;
		font-size: 25upx;
		margin-left: 10upx;
	}

	.mini-btn {
		background-color: #FDB44C;
		font-size: 26upx;
		color: #FFF;
		text-align: center;
		width: 100upx;
		border-radius: 8upx;

		float: right;
		height: 45upx;
		line-height: 45upx;
	}

	.header {
		padding: 0 40upx;
		box-sizing: border-box;
	}

	/* .header {padding: 0 40upx;box-sizing: border-box;position: fixed;width: 100%;left: 0;top: 0;z-index: 99999;} */
	.header .header_box {
		height: 88upx;
	}

	.tab_box {
		width: 320upx;
		height: 58upx;
		background: rgba(115, 153, 230, 0.2);
		border-radius: 10upx;
		position: relative;
	}

	.tab_box .text {
		width: 160upx;
		height: 58upx;
		line-height: 58upx;
		color: #8792a8;
		text-align: center;
		position: relative;
		z-index: 100;
	}

	.tab_box .text.active {
		color: #ffffff;
	}

	.tab_box .active_btn {
		width: 160upx;
		height: 58upx;
		background:#39BAE8;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
		border-radius: 10upx;
		transition: all 0.3s ease-in-out;
	}

	.tab_box .active_btn.active {
		left: 160upx;
	}

	.content {
		width: 100%;
		flex: 1;
	}

	.swiper-item {
		background: #007aff;
		height: 100%;
	}

	.bg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		z-index: 0;
		opacity: 0.3;
	}

	.buybg {
		background: #fdf4f7;
	}

	/* 币币 */
	.title_box {
		padding: 0 40upx;
		padding-top: 35upx;
		padding-bottom: 20upx;
		box-sizing: border-box;
	}

	.title_box .l_text {}

	.title_box .l_text .l text {
		font-size: 48upx;
	}

	.title_box .l_text .l .y_box {
		width: 12upx;
		height: 12upx;
		background: #4966f5;
		border-radius: 50%;
		margin-top: 10upx;
	}

	.title_box .changwai_tab .l {
		margin-right: 66upx;
	}

	.title_box .changwai_tab .l text {
		font-size: 30upx;
	}

	.title_box .changwai_tab .l text.active {
		font-size: 48upx;
	}

	.title_box .l_text .l .y_box.hide {
		display: none;
	}

	.title_box .r_box {
		position: relative;
	}

	.title_box .r_box .item {
		margin-left: 60upx;
	}

	.title_box .r_box .item image {
		width: 30upx;
		height: 30upx;
	}

	.title_box .r_box .item text {
		font-size: 22upx;
		color: #8792a8;
		margin-top: 14upx;
	}

	.title_box .r_box .Submenu_box {
		position: absolute;
		right: 150upx;
		top: -40upx;
		padding: 34upx 38upx;
		padding-bottom: 0;
		box-sizing: border-box;
		background: rgba(41, 95, 204, 0.6);
		width: 230upx;
		border-radius: 8upx;
		z-index: 999999999;
	}

	.title_box .r_box .Submenu_box .sanjiao {
		position: absolute;
		right: 15upx;
		top: -15upx;
		width: 0;
		height: 0;
		border-right: 15upx solid transparent;
		border-left: 15upx solid transparent;
		border-bottom: 15upx solid rgba(41, 95, 204, 0.6);
	}

	.title_box .r_box .Submenu_box .sub_item {
		padding-top: 27upx;
	}

	.title_box .r_box .Submenu_box .sub_item image {
		width: 34upx;
		height: 34upx;
	}

	.title_box .r_box .Submenu_box .sub_item text {
		font-size: 24upx;
		margin-left: 17upx;
		padding-bottom: 27upx;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		color: #ffffff;
	}

	.m_data_box {}

	.m_data_box .data_title {
		height: 88upx;
		padding: 0 30upx;
		box-sizing: border-box;
		border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
	}

	.m_data_box .data_title .items text {
		font-size: 30upx;
	}

	.m_data_box .data_title .items image {
		width: 36upx;
		height: 36upx;
		margin-right: 20upx;
	}

	.buy_btm_box {
		padding: 25upx 0;
	}

	.buy_btm_box .btn {
		width: 185rpx;
		height: 76upx;
		float: left;
		font-size: 28upx;
		color: #6e778a;
		line-height: 76upx;
		text-align: center;
	}

	.buy_btm_box .btn.active {
		font-size: 36upx;
		color: #ffffff;
	}

	.input_box {
		width: 100%;
		height: 80upx;
		border: 1upx solid #b8becc;
		border-radius: 8upx;
	}

	.input_box text {
		font-size: 40upx;
		color: #8792a8;
	}

	.input_box text.btn {
		font-size: 40upx;
		color: #8792a8;
		padding: 0 13upx;
	}

	.input_box input {
		font-size: 36upx;
		color: #ffffff;
		padding: 0 30upx;
		flex: 1;
		border-right: 1upx solid #8792a8;
		height: 100%;
	}

	.money_box {
		font-size: 20upx;
		color: #8792a8;
		margin-top: 10upx;
		margin-bottom: 40upx;
	}

	.bili_box {
		width: 100%;
	}

	.bili_box text {
		width: 84upx;
		height: 84upx;
		line-height: 84upx;
		text-align: center;
		border: 1px solid #b8becc;
		border-radius: 4upx;
		color: #8792a8;
	}

	.bili_box text.active.red {
		color: #e0316c;
		border: 1upx solid #e0316c;
	}

	.bili_box text.active.lv {
		color: #24b29b;
		border: 1upx solid #24b29b;
	}

	.jy_text_box {
		margin-top: 30upx;
		margin-bottom: 20upx;
	}

	.jy_text_box text {
		font-size: 32upx;
		font-weight: bold;
		color: #ccddff;
	}

	.buy_btn {
		width: 100%;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
		font-size: 36upx;
		color: #ffffff;
		font-weight: bold;
		border-radius: 8upx;
		margin-bottom: 25upx;
	}

	.buy_btn.red {
		background: #e0316c;
	}

	.buy_btn.lv {
		background: #24b29b;
	}

	.r_item {}

	.r_item .row_title {
		padding: 0 30upx;
		box-sizing: border-box;
		margin-top: 20upx;
	}

	.r_item .row_title text {
		font-size: 24upx;
		color: #8792a8;
		margin: 10upx 0;
	}

	.r_item .row_con.red {
		background: rgba(224, 49, 108, 0.1);
	}

	.r_item .row_con.lv {
		background: rgba(36, 178, 155, 0.1);
	}

	.r_item .row_con {
		padding: 0 30upx;
		height: 60upx;
		line-height: 60upx;
		box-sizing: border-box;
		padding-left: 10upx;
	}

	.r_item .row_con text {
		font-size: 26upx;
		color: #8792a8;
		margin: 8upx 0;
	}

	.r_item .row_con.red text {
		color: #e6175c;
	}

	.r_item .row_con.lv text {
		color: #24b29b;
	}

	.j_text {
		margin: 18upx 0;
	}

	.j_text .t1 {
		color: #d14b64;
		font-size: 35upx;
	}

	.j_text .t2 {
		color: #c6cfd4;
		font-size: 20upx;
	}

	.weituo_box {
		flex: 1;
		width: 100%;
		box-sizing: border-box;
	}

	.weituo_box .weituo_title {
		height: 100upx;
		font-size: 33upx;
		font-weight: bold;
		color: #ffffff;
		border-top: 15upx;
		line-height: 100upx;

		padding: 0 30upx;
		box-sizing: border-box;
	}

	.weituo_box .con_box {
		flex: 1;
		width: 100%;
		overflow: auto;
	}

	.weituo_box .con_null_box {
		width: 100%;
		flex: 1;
		padding: 100upx 0;
	}

	.weituo_box .con_null_box text {
		color: #8388a3;
	}

	.scrollView_cw {
		height: 88upx;
		background: #18253d;
		padding: 0 30upx;
		margin-bottom: 10upx;
		box-sizing: border-box;
	}

	.scrollView_cw .items {
		height: 88upx;
		line-height: 88upx;
		margin-right: 60upx;
		color: #6e778a;
		padding: 0;
		width: auto;
		border-bottom: 6upx solid rgba(0, 0, 0, 0);
		box-sizing: border-box;
	}

	.scrollView_cw .items.active {
		border-bottom: 6upx solid #4966f5;
	}

	.list_box {
		flex: 1;
		width: 100%;
	}

	.list_con_wap {}

	.list_con_wap .item-view {
		padding: 10upx;
		margin: 20upx;
		box-sizing: border-box;
		border-radius: 18upx;
		// border-bottom: 1upx solid #ececec;
		// box-shadow: 0upx 0upx 8upx 1upx rgba(0, 0, 0, .1);
		background-color: #FFFFFF;
	}

	.list_con_wap .item-view .tx_box {
		width: 60upx;
		position: relative;
	}

	.list_con_wap .item-view .tx_box image {
		width: 80upx;
		height: 80upx;
	}

	.list_con_wap .item-view .tx_box .shiming_text {
		padding: 2upx 16upx;
		background: #4fb757;
		color: #ffffff;
		font-size: 18upx;
		position: absolute;
		top: 13upx;
		right: -40upx;
		border-radius: 15upx;
	}

	.list_con_wap .item-view .r_con {
		flex: 1;
		// height: 300upx;
		padding-left: 50upx;
	}

	.list_con_wap .item-view .r_con .lst_title_box {
		// border-bottom: 1upx solid rgba(255, 255, 255, 0.1);
	}

	.list_con_wap .item-view .r_con .lst_title_box .title {
		font-size: 36upx;
		color: #ffffff;
	}

	.list_con_wap .item-view .r_con .lst_title_box view {
		font-size: 36upx;
		color: #ffffff;
	}

	.list_con_wap .item-view .r_con .lst_title_box view text {
		font-size: 20upx;
		color: #8792a8;
	}

	.list_con_wap .item-view .r_con .lst_title_box view text:nth-of-type(1) {
		margin-right: 50upx;
	}

	.list_con_wap .item-view .r_con .xiane_text {
		font-size: 26upx;
		color: #8792a8;
	}

	.list_con_wap .item-view .r_con .danjia_text .xiane_text {
		font-size: 20upx;
		color: #8792a8;
	}

	.list_con_wap .item-view .r_con .danjia_text .money {
		font-size: 40upx;
		color: #5AC4EB;
	}

	.list_con_wap .item-view .r_con view .pay_img {}

	.list_con_wap .item-view .r_con view .pay_img image {
		width: 32upx;
		height: 32upx;
		margin-right: 15upx;
	}

	.list_con_wap .item-view .r_con view .btn {
		font-size: 36upx;
		color: #ffffff;
		height: 60upx;
		line-height: 60upx;
		width: 160upx;
		text-align: center;
		background: #e0316c;
		border-radius: 30upx;
	}

	.list_con_wap .item-view .r_con view.pay_box {
		margin-top: 40upx;
	}

	.left_muen_maks {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9999999999;
		/*border-radius:0px 30px 30px 0px;*/
		transition: all 0.3s ease-in-out;
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
		overflow: hidden;
		z-index: 9999999999;
		border-radius: 0px 20upx 20upx 0px;
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
		border-bottom: 6upx solid #5AC4EB;
	}

	.search_box {
		width: 100%;
		padding: 0 40upx;
		margin: 20upx 0;
		box-sizing: border-box;
	}

	.search_box .search_warp {
		width: 100%;
		height: 88upx;
		line-height: 88upx;
		border: 1upx solid rgba(135, 146, 168, 1);
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
		font-size: 36upx;
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
