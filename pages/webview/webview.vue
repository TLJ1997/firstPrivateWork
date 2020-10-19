<template>
	<view class="container hi-columns" style="background:#101f32;">
		<view class="header hi-columns" style="background:#101f32;">
			<view class="hi-columns" :style="'height:'+statusBarH+'px;width: 100%;'"></view>
			<view class="header_box hi-rows hi-flex-vcenter hi-space-between">
				<view class="header_box hi-rows hi-flex-vcenter">
					<image src="../../static/home/nav_ic.png" mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
					<view style="color: #FFF;font-size:40upx; font-weight: bold;" @click="paihang()">{{smyol}}</view>
				</view>
				<view style="width:46upx;height: 46upx;">
					<image :src="hb_status?'../../static/home/quanping.png':'../../static/home/quanping.png'" mode=""
				 style="width:46upx;height: 46upx;" @click="toALLDisplay(1)"></image>
				 </view>
			</view>
		</view>
		<view style="width: 100%; display: inline-flex; margin-top: 150upx;padding:20upx 30upx; box-sizing: border-box;">
			<view style="width:50%;" v-if="xiaoxibuy.increase >= 0">
				<view style="width: 100%;font-size: 40upx;color:#07c48a;font-weight: bold;">{{xiaoxibuy.currentPrice}}</view>
				<view style="width: 100%;color:#07c48a; margin-top: 20upx;">{{xiaoxibuy.increase}}%</view>
			</view>
			<view style="width:50%;" v-if="xiaoxibuy.increase < 0">
				<view style="width: 100%;font-size: 40upx;color:#e16d44;font-weight: bold;">{{xiaoxibuy.currentPrice}}</view>
				<view style="width: 100%;color:#e16d44; margin-top: 20upx;">{{xiaoxibuy.increase}}%</view>
			</view>
			<view style="width:50%;">
				<view style="width: 100%;color:#a3c1dd;display: inline-flex;">
					<view style="width: 25%;color:#a3c1dd; line-height: 40upx;">{{$t('webview.height')}}</view>
					<view style="width: 75%;color:#FFF;text-align: right;line-height: 40upx;">{{xiaoxibuy.high}}</view>
				</view>
				<view style="width: 100%;color:#a3c1dd;display: inline-flex;">
					<view style="width: 25%;color:#a3c1dd;line-height: 40upx;">{{$t('webview.low')}}</view>
					<view style="width: 75%;color:#FFF;text-align: right;line-height: 40upx;">{{xiaoxibuy.low}}</view>
				</view>
				<view style="width: 100%;color:#a3c1dd;display: inline-flex;">
					<view style="width:25%;color:#a3c1dd;line-height: 40upx;">{{$t('webview.l')}}</view>
					<view style="width:75%;color:#FFF; text-align: right;line-height: 40upx;">{{xiaoxibuy.familySize}}</view>
				</view>
			</view>
		</view>
		<view style="border-top:10upx solid #000000; width: 100%;text-align: right; box-sizing: border-box;">
			<view class="nav_box" style="display: inline-flex; padding: 0 30upx;box-sizing: border-box;">
				<scroll-view class="grace-scroll-x hi-flex-vcenter hi-flex-center" scroll-x :scroll-into-view="'view'+bizhong.index"
				 style="width:80%;height:60upx; padding-top: 20upx;">
					<view class="item hi-columns hi-flex-vcenter hi-flex-center" :id="'view'+item.id" :class="bizhong.index==index?'active':''"
					 v-for="(item,index) in bizhong.list" :key="index" @click="nav_bizhong(index)">
						<text>{{item.name}}</text>
						<view :class="bizhong.index==index?'yd':''"></view>
					</view>
				</scroll-view>
				<view style="width: 20%;text-align: right;">
					<image src="../../static/home/nav_rightt.png" id="grace-accordion-1" @tap="changeAccordion" hover-stay-time="100" hover-class="grace-opacity" style="width:46upx; height:46upx; margin-top: 15upx;" mode=""></image>
				</view>
				
			</view>
			<view :class="['grace-accordion-body', accordionActive == 'grace-accordion-1' ? 'grace-accordion-hide' : 'grace-accordion-show']" style="font-size:0;">
				<div class="button-sp-area">
					<scroll-view class="grace-scroll-x hi-flex-vcenter hi-flex-center" scroll-x :scroll-into-view="'view'+bizhong.index"
					 style="width:100%;height:60upx; padding-top: 20upx;">
						<view class="item hi-columns hi-flex-vcenter hi-flex-center" :id="'view'+item.id" :class="bizhongs.index==index?'active':''"
						 v-for="(item,index) in bizhongs.list" :key="index" @click="nav_bizhongs(index)">
							<text>{{item.name}}</text>
							<view :class="bizhong.index==index?'yd':''"></view>
						</view>
					</scroll-view>
				</div>
			</view>
		</view>
		<view style="width: 100%; background-color: #000000;border-top:10upx solid #000000;height:380px;">
			<div class='divchart' style='background-color:#101f32;' >
				
				<view>
					<canvas id="kline2" canvas-id='kline2' class='kline2' v-bind:style="{width: ChartWidth+'px', height: ChartHeight+'px'}"  v-show="KLine.IsShow"
					  @touchstart="KLineTouchStart" @touchmove='KLineTouchMove' @touchend='KLineTouchEnd' ></canvas>  
					<canvas id="minute2" canvas-id='minute2' class='minute' v-bind:style="{width: ChartWidth+'px', height: ChartHeight+'px'}" v-show="Minute.IsShow"
					   @touchstart="MinuteTouchStart" @touchmove='MinuteTouchMove' @touchend='MinuteTouchEnd' ></canvas>
				</view>
				
				
			</div>
		</view>
		<view style="width: 100%;padding:30upx; box-sizing: border-box;display: inline-flex;border-top:10upx solid #000000;">
			<view style="width: 33%; color: #FFF; text-align: left; font-size:27upx; ">{{$t('webview.mpsl')}} ({{danbi}})</view>
			<view style="width: 33%; color: #FFF; text-align: center; font-size: 27upx;">{{$t('webview.jg')}} ({{danbiyou}})</view>
			<view style="width: 33%; color: #FFF;text-align: right; font-size: 27upx;">{{$t('webview.mpsl')}} ({{danbi}})</view>
		</view>
		<view style="width: 100%;box-sizing: border-box;">
			<view style="width: 100%;display: inline-flex;">
				<view style="width: 50%;">
					<view v-for="(item,index) in buys" :key="index" style="width:100%;position: relative;display:inline-flex;padding:0 20upx;box-sizing: border-box;">
						<view style="width: 50%; line-height:75upx;font-size: 24upx; color: #a3c1dd;z-index: 2;">{{item.num}}</view>
						<view style="width: 50%; line-height: 75upx; text-align: right;font-size: 24upx;color:#e16d44;z-index: 2;">{{item.price}}</view>
						<view :style="'width:'+kaishi(item.num,item.totalNum)" style="background: #362a30;width: 100%;height: 75upx;position: absolute;opacity: 0.5;right: 0;top: 0;z-index: 1;"></view>
					</view>
				</view>
				<view style="width: 50%;">
					<view v-for="(itemn,indexx) in sells" :key="indexx" style="width:100%;position: relative;display:inline-flex;padding:0 20upx;box-sizing: border-box;">
						<view style="width: 50%; line-height: 75upx;font-size: 24upx; color: #00c38b;z-index: 2;">{{itemn.price}}</view>
						<view style="width: 50%; line-height: 75upx; text-align: right;font-size: 24upx;color: #a3c1dd;z-index: 2;">{{itemn.num}}</view>
						<view :style="'width:'+kaishi(itemn.num,itemn.totalNum)" style="background: #1e343c;width: 100%;height:75upx;position: absolute;opacity: 0.5;left: 0;top: 0;z-index: 1;"></view>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 150upx; text-align: center;"></view>
		</view>
		<view style="width: 100%;padding:20upx; box-sizing: border-box;display: inline-flex; position: fixed;bottom: 0;left: 0;background: #101f32;z-index: 3;">
			<view style="width:50%; color: #FFF; text-align: left;">
				<button @tap="quchangwai(0)" type="primary" style="padding: 0; background-color: #e16d44; width: 80%;font-size: 30upx;">{{$t('webview.mr')}}</button>
			</view>
			<view style="width:50%; color: #FFF; text-align: center;">
				<button @tap="quchangwai(1)" type="primary" style="padding: 0; background-color: #00c38b; width: 80%;font-size: 30upx;">{{$t('webview.mc')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	var This;
	import {JSCommon} from '../../umychart.uniapp/umychart.wechat.3.0.js'
	import {JSCommonHQStyle} from '../../umychart.uniapp/umychart.style.wechat.js'
	function DefaultData() { }
	
	DefaultData.GetKLineOption = function () 
	{
	    let data = 
	    {
	        Type: '历史K线图',         
	        Windows: //窗口指标
	        [
	            {Index:"EMPTY",Modify: false, Change: false,TitleHeight:0}, 	
				{Index:"VOL",Modify: false, Change: false},
				// {Index:"KDJ",Modify:true, Change:true, Overlay:true}			
	        ], 		
			OverlayIndex: //叠加指标 
			[
			    {Index:'PBX', Windows:0 }
			],
	        IsCorssOnlyDrawKLine:true,
	        CorssCursorTouchEnd:true,
			IsClickShowCorssCursor:true,
			//IsFullDraw:true, 
			IsAutoUpdate:true,          //是自动更新数据
			AutoUpdateFrequency:60000,   //数据更新频率
	        Border: //边框
	        {
	            Left:   2,
	            Right:  0, //右边间距
	            Top:    25,
	            Bottom: 25,
	        }, 
	        KLine:
	        {
				DragMode:1, 
	            Right:1,                            //复权 0 不复权 1 前复权 2 后复权
	            Period:0,                           //周期: 0 日线 1 周线 2 月线 3 年线 
	            PageSize:20,
	            IsShowTooltip:false,
				DrawType:0,
				RightSpaceCount:3.5,
	        },
			ExtendChart:
			[
				{Name:'KLineTooltip' },	//开启手机端tooltip
			], 		
			Frame:  //子框架设置
			[
			    {SplitCount:5,IsShowLeftText:false,Height:7,Custom: [{ Type: 0, Position: 'right'}]},
			    {SplitCount:2,Height:3,IsShowLeftText:false}
			],
	        
	    };
	 
	    return data;
	}
	 
	DefaultData.GetMinuteOption=function()
	{
	    var option= 
	    {
	        Type:'分钟走势图',   //创建图形类型            
	        IsAutoUpdate:true,       //是自动更新数据
	        DayCount:1,                 //1 最新交易日数据 >1 多日走势图
	        IsShowRightMenu:false,       //是否显示右键菜单
	        CorssCursorTouchEnd:true,
			//IsFullDraw:true,		
	        MinuteLine:
	        {
	            //IsDrawAreaPrice:false,      //是否画价格面积图
	        }, 
	        Border: //边框
	        {
	            Left:1,    //左边间距
	            Right:1,   //右边间距
	            Top:20,
	            Bottom:20
	        },            
	        Frame:  //子框架设置
	        [
	            {SplitCount:3},
	            {SplitCount:2},
	            {SplitCount:3},
	        ], 
	        ExtendChart:    //扩展图形
	        [
	            {Name:'MinuteTooltip' }  //手机端tooltip
	        ],
	    }; 
	    return option;
	}
	
	
	//周期枚举
	var KLINE_PERIOD_ID=
	{
	    KLINE_MINUTE_ID:4,
	    KLINE_5MINUTE_ID:5,
	    KLINE_15MINUTE_ID:6,
	    KLINE_30MINUTE_ID:7,
	    KLINE_60MINUTE_ID:8
	}
	
	//周期枚举
	var MINUTE_PERIOD_ID=
	{
	    MINUTE_ID:1,
	    MINUTE_2DAY_ID:2,
	    MINUTE_3DAY_ID:3,
	    MINUTE_4DAY_ID:4,
	    MINUTE_5DAY_ID:5,
	}
	
	var g_KLine={ JSChart:null };
	var g_Minute={ JSChart:null };
	export default {
		
		data() {
			let data=
			{
				//600000.sh   YK/USDT
				Symbol:'YK/USDT',
				ChartWidth:'',
				ChartHeight:380,
				KLine:
				{				
					Option:DefaultData.GetKLineOption(), 
					IsShow:true,
				},
				Minute:
				{				
					Option:DefaultData.GetMinuteOption(),
					IsShow:false,
				},			
				MINUTE_PERIOD_ID:MINUTE_PERIOD_ID,
				KLINE_PERIOD_ID:KLINE_PERIOD_ID,
				ServerUrl: 'http://42.194.218.215:8881/kline',
				smyol:'',
				danbi:'',
				danbiyou:'',
				show2:false,
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
					list: [{
							id: 1,
							name: '1'+this.$t('webview.fen')
						},
						{
							id: 2,
							name: '15'+this.$t('webview.fen')
				
						},
						{
							id: 3,
							name: '30'+this.$t('webview.fen')
						},
						{
							id: 4,
							name: '1'+this.$t('webview.xiaoshi')
						}
					]
				},
				bizhongs: {
					index: 0,
					list: [{
							id: 1,
							name: this.$t('webview.zt')
						},
						{
							id: 2,
							name: 'BOLL'
				
						},
						{
							id: 3,
							name: 'MACD'
						},
						{
							id: 4,
							name: 'VOL'
						},
						{
							id: 5,
							name: 'KDJ'
						}
					]
				},
				listts: [1, 2, 3, 4, 5],
				coinxzindex: 0,
				count:'0',
				level:'0',
				timer:'',
				buys:[],
				sells:[],
				xiaoxibuy:'',
				accordionActive: "grace-accordion-1"
			};		
			return data;
			
		},
		onLoad(e) {
			this.smyol = e.kname
			console.log(e)
			This = this;
			uni.getSystemInfo({
				success(res) {
					This.ChartWidth = res.windowWidth;
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight
					console.log(JSON.stringify(res))
					console.log(res.windowWidth)
				}
			})
			let that = this;
			if( e.kname != null ){
				this.Symbol = e.kname;
			}
			
			setTimeout(function() {

				var view = uni.createSelectorQuery().select(".header");
				view.boundingClientRect(data => {
					// console.log("节点离页面顶部的距离为" + data.height);
					This.header_H = data.height;
					console.log(This.header_H)
				}).exec();



			}, 500)
			var datas = e.kname.split('/')
			// var messages={
			// 	type:1,
			// 	jiaoyidui:'BEC/USDT'
			// }
			console.log(datas)
			This.danbi = datas[0]
			This.danbiyou = datas[1]
			uni.connectSocket({
				url: 'ws://106.55.42.122:10022/socket',
				header: {
					'content-type': 'application/json'
				},
			
				success: function(rs) {
					console.log(rs)
				}
			});
			uni.onSocketOpen(function(res) {
				console.log('WebSocket连接已打开！');
			});
			
			This.timer = setInterval(function() {
				let data = {
						tradingPair:This.smyol,
						type:1
					};
				uni.sendSocketMessage({
					data:JSON.stringify(data)
				});
				uni.onSocketMessage(function(res) {
					// console.log(res)
					if (res.data == 'hello') {
			
			
					} else {
						var zhesi = res.data;
						This.xiaoxibuy = JSON.parse(zhesi);
						// console.log(JSON.parse(res.data))	
						This.buys = This.xiaoxibuy.buys
						This.sells = This.xiaoxibuy.sells
					}
			
			
				});
			
			}, 1500);
			// switch (uni.getSystemInfoSync().platform) {
			// 	case 'android':
			
			// 		var pages2 = getCurrentPages();
			// 		var page2 = pages2[pages2.length - 1];
			// 		var currentWebview2 = page2.$getAppWebview();
			// 		var wb2 = plus.webview.create('http://134.175.142.212/dist/?symbol='+This.danbi, '', {
			// 			height: '320px',
			// 			top: '148px',
			// 			zindex: 10
						
			// 		});
					
			// 		currentWebview2.append(wb2);
			// 		break;
			// 	case 'ios':
					
			// 		var pages2 = getCurrentPages();
			// 		var page2 = pages2[pages2.length - 1];
			// 		var currentWebview2 = page2.$getAppWebview();
			// 		var wb2 = plus.webview.create('http://134.175.142.212/dist/?symbol='+This.danbi, '', {
			// 			height: '320px',
			// 			top: '160px',
			// 			zindex: 10
						
			// 		});
					
			// 		currentWebview2.append(wb2);
			// 		break;
			// 	default:
			// 		console.log('运行在开发者工具上')
			// 		break;
			// }


		},
		onReady()
		{
			//生成K线
			
			this.CreateKLineChart_app(); 
			//生成分时图
			//this.CreateMinuteChart_app()
		},	
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk')
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(()=>{
				this.tab_init();
			},500)
			var setdata = {
				token:uni.getStorageSync('token'),
				userId:uni.getStorageSync('id')
			}
			console.log(setdata)
			
			
		},
		onUnload() {
			if (This.timer != null) {
				clearInterval(This.timer);
				This.timer = null;
				uni.closeSocket();
			}
			if (g_KLine.JSChart)
			{
				g_KLine.JSChart.StopAutoUpdate();
				g_KLine.JSChart=null;
			}
			
			if(g_Minute.JSChart)
			{
				g_Minute.JSChart=null;
				g_Minute.JSChart.StopAutoUpdate();
			}
		},
		onHide() {
			if (This.timer != null) {
				clearInterval(This.timer);
				This.timer = null;
				uni.closeSocket();
			}
			// if (g_KLine.JSChart)
			// {
			// 	g_KLine.JSChart.StopAutoUpdate();
			// 	g_KLine.JSChart=null;
			// }
			
			if(g_Minute.JSChart)
			{
				g_Minute.JSChart=null;
				g_Minute.JSChart.StopAutoUpdate();
			}
			
		},
		methods: {
			toALLDisplay(value)
			{
				if( value == '1' ){
					uni.navigateTo({
						url: 'index1?symbol=' + this.Symbol
					});
				}else if( value == '2' ){
					uni.navigateTo({
						url: 'index2?symbol=' + this.Symbol
					});
				}else{
					g_KLine.JSChart = null;
					this.Symbol = value + "/USDT";
					this.CreateKLineChart_app(); 
				}
			},
			changeAccordion : function(e){
				console.log(e.currentTarget.id)
				var accordionIndex = e.currentTarget.id;
				if (This.accordionActive == accordionIndex){
					accordionIndex = '';
					}
				This.accordionActive = accordionIndex;
			},
			nav_bizhongs(e) { //切换币种
				this.bizhongs.index = e;
				console.log(this.bizhongs.index)
				if(e == 0){
					this.ChangeKLineIndex(0,'EMPTY')
				}else if(e == 1){
					this.ChangeKLineIndex(0,'BOLL')
				}else if(e == 2){
					this.ChangeKLineIndex(2,'MACD')
				}else if(e == 3){
					this.ChangeKLineIndex(1,'VOL')
				}else if(e == 4){
					this.ChangeKLineIndex(2,'KDJ')
				}
			},
			nav_bizhong(e) { //切换币种
				this.bizhong.index = e;
				console.log(this.bizhong.index)
				if(e == 0){
					this.ChangeKLinePeriod(KLINE_PERIOD_ID.KLINE_MINUTE_ID)
				}else if(e == 1){
					this.ChangeKLinePeriod(KLINE_PERIOD_ID.KLINE_15MINUTE_ID)
				}else if(e == 2){
					this.ChangeKLinePeriod(KLINE_PERIOD_ID.KLINE_30MINUTE_ID)
				}else if(e == 3){
					this.ChangeKLinePeriod(KLINE_PERIOD_ID.KLINE_60MINUTE_ID)
				}
			},
			quchangwai(e) {
				// if (e == 0) {
				// 	let obj = {
				// 		name: '0'
				// 	}
				// 	This.$maimai.setMemberObj(obj);
				// } else {
				// 	let obj = {
				// 		name: '1'
				// 	}
				// 	This.$maimai.setMemberObj(obj);
				// }
				uni.switchTab({
					url: '../trade/trade'
				})
			},
			kaishi(num,znum){
				var dsdf = (num / znum * 10000)/100
				var dongci = dsdf.toFixed(0)+'%'
				return dongci
			},
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
				if (this.hb_status == true) {
					console.log('白天')
				} else {
					console.log('晚上')
				}
			},
			
			CreateKLineChart_app()
			{
				if (g_KLine.JSChart) return;
				
				let element = new JSCommon.JSCanvasElement();
				element.IsUniApp=true;	//canvas需要指定下 是uniapp的app
				element.ID = 'kline2';
				element.Height = This.ChartHeight;  //高度宽度需要手动绑定!!
				element.Width = This.ChartWidth;
				
				var blackStyle=JSCommonHQStyle.GetStyleConfig(JSCommonHQStyle.STYLE_TYPE_ID.BLACK_ID);
				//blackStyle.DefaultTextColor='rgb(255,0,255)';		

				    
				    blackStyle.BGColor='rgb(12,23,37)';                 //背景
				    blackStyle.FrameTitleBGColor='rgb(16,28,45)';       //指标标题背景
				    blackStyle.FrameSplitTextColor='rgb(101,117,138)';  //刻度颜色
				
				    //K线颜色
				    blackStyle.UpBarColor='rgb(210,73,99)';   			//K线上涨柱子颜色
				    blackStyle.UpTextColor= blackStyle.UpBarColor;		//上涨价格颜色
				    blackStyle.DownBarColor='rgb(37,175,142)';			//K线下跌柱子颜色
				    blackStyle.DownTextColor=blackStyle.DownBarColor;	//下跌价格颜色
				
				    //指标线段颜色
				    blackStyle.Index.LineColor[0]='rgb(88,106,126)';    
				    blackStyle.Index.LineColor[1]='rgb(222,217,167)';
				    blackStyle.Index.LineColor[2]='rgb(113,161,164)';
				
				    //最新价格刻度颜色
				    blackStyle.FrameLatestPrice.UpBarColor='rgb(210,73,99)';
				    blackStyle.FrameLatestPrice.DownBarColor='rgb(37,175,142)';
				
				    //面积图颜色
				    blackStyle.CloseLineColor='rgb(113,121,133)';   //收盘价线颜色
				    blackStyle.CloseLineAreaColor=['rgba(36,41,57,0.8)','rgba(22,34,53,0.3)'];  //收盘价面积图颜色
				    
				    //最高最低价颜色
				    blackStyle.KLine.MaxMin.Color='rgb(255,250,240)';
				

				JSCommon.JSChart.SetStyle(blackStyle);
				
				//设置服务地址
				JSCommon.JSChart.SetDomain(this.ServerUrl);
				
				g_KLine.JSChart = JSCommon.JSChart.Init(element);
				this.KLine.Option.NetworkFilter=this.NetworkFilter;
				this.KLine.Option.Symbol=this.Symbol;
				this.KLine.Option.IsClickShowCorssCursor=true;
				this.KLine.Option.IsFullDraw=true; 
				this.KLine.Option.KLine.Period=4;
				g_KLine.JSChart.SetOption(this.KLine.Option);
				g_KLine.JSChart.AddEventCallback( { event:JSCommon.JSCHART_EVENT_ID.RECV_INDEX_DATA, callback:this.OnRecvHistoryData });
				g_KLine.JSChart.AddEventCallback({ event: JSCommon.JSCHART_EVENT_ID.ON_TITLE_DRAW, callback: this.OnTitleDraw });
			},
			
			//K线周期切换
			ChangeKLinePeriod:function(period)
			{
				this.Minute.IsShow=false;
				this.KLine.IsShow=true;
				console.log(period);
				if (!g_KLine.JSChart)    //不存在创建
				{
					this.KLine.Option.KLine.Period=period;
					this.CreateKLineChart();
				}
				else
				{
					g_KLine.JSChart.ChangePeriod(period);
				}
			},
					
			CreateMinuteChart_app()
			{
				if (g_Minute.JSChart) return;
				
				var element = new JSCommon.JSCanvasElement();
				// #ifdef APP-PLUS
				element.IsUniApp=true;	//canvas需要指定下 是uniapp的app
				// #endif
				element.ID = 'minute2';
				element.Height = this.ChartHeight;  //高度宽度需要手动绑定!!
				element.Width = this.ChartWidth;
					
				//用黑色风格
				var blackStyle=JSCommonHQStyle.GetStyleConfig(JSCommonHQStyle.STYLE_TYPE_ID.BLACK_ID);	
				JSCommon.JSChart.SetStyle(blackStyle);
				
				//设置服务地址
				//JSCommon.JSChart.SetDomain(this.ServerUrl);
				
				g_Minute.JSChart = JSCommon.JSChart.Init(element);
				this.Minute.Option.NetworkFilter=this.NetworkFilter;
				this.Minute.Option.Symbol=this.Symbol;
				this.Minute.Option.IsFullDraw=true;
				
				g_Minute.JSChart.SetOption(this.Minute.Option);
				
				g_Minute.JSChart.AddEventCallback({ event: JSCommon.JSCHART_EVENT_ID.ON_TITLE_DRAW, callback: this.OnMinuteTitleDraw });
			},
			
			//走势图多日切换
			ChangeMinutePeriod:function(period)
			{
				this.Minute.IsShow=true;
				this.KLine.IsShow=false;
				if (!g_Minute.JSChart)   //不存在创建
				{
					this.Minute.Option.DayCount=period;
					this.CreateMinuteChart();
				}
				else
				{
					g_Minute.JSChart.ChangeDayCount(period);
				}
			},
			
			//切换指标 windowId=窗口索引 name=指标名字
			ChangeKLineIndex:function(windowId,name)
			{
				if (!this.KLine.IsShow) return;
				if (!g_KLine.JSChart) return;
				
				g_KLine.JSChart.ChangeIndex(windowId,name);
			},
			
			NetworkFilter:function(data, callback)
			{
				console.log(`[HQChart:NetworkFilter] Name=${data.Name} Explain=${data.Explain}` );
				if (data.Name=='APIScriptIndex::ExecuteScript') this.CustomIndex(data, callback);
			},
			
			CustomIndex(data, callback)	//自定义指标
			{
				 var request=data.Request;
				 if (request.Data.indexname==this.$t('webview.dxdzhibiao'))
				 {
					 data.PreventDefault=true;				 
					 var hqchart=data.HQChart;
					 var kData=hqchart.ChartPaint[0].Data;
					 var closeLine={name:this.$t('webview.spjx'), type:0, data:kData.GetClose() };
					 var klineDate=kData.GetDate();				 
					 //模拟异步请求指标数据
					 setTimeout(function() 
					 {
						var apiData=
						{
							 code:0, 
							 stock:{ name:hqchart.Name, symbol:hqchart.Symbol }, 
							 outdata: { date:klineDate, outvar:[closeLine] } 
						};
						console.log('[NetworkFilter::NetworkFilter] apiData ', apiData);
						callback(apiData); 
					 }, 200);
					 
				 }
			},
			
			OnRecvHistoryData(e, data, obj)
			{
				console.log('[HQChart:OnRecvHistoryData] ', data, obj );			
				var period=data.HistoryData.Period;
				this.TestData=`${data.Stock.Name}, ${data.Stock.Symbol} 周期=${period}`;
			},
			
			OnTitleDraw(event, data, obj)
			{
				console.log('[OnTitleDraw]', event, data);
			},
			
			OnMinuteTitleDraw(event, data, obj)
			{
				console.log('[OnMinuteTitleDraw]', event, data);
			},
			
			///////////////////////////////////////////////
			//手势事件 app/小程序才有
			//KLine事件
			KLineTouchStart: function (event) 
			{
			  if (g_KLine.JSChart) g_KLine.JSChart.OnTouchStart(event);
			},
			
			KLineTouchMove: function (event) 
			{
			  if (g_KLine.JSChart) g_KLine.JSChart.OnTouchMove(event);
			},
			
			KLineTouchEnd: function (event) 
			{
			  if (g_KLine.JSChart) g_KLine.JSChart.OnTouchEnd(event);
			},
			
			//走势图事件
			MinuteTouchStart: function (event) 
			{
			  if (g_Minute.JSChart) g_Minute.JSChart.OnTouchStart(event);
			},
			
			MinuteTouchMove: function (event) 
			{
			  if (g_Minute.JSChart) g_Minute.JSChart.OnTouchMove(event);
			},
			
			MinuteTouchEnd: function (event) 
			{
			  if (g_Minute.JSChart) g_Minute.JSChart.OnTouchEnd(event);
			},
			
			ChangeSize:function()
			{
				this.ChangeSize_app();
			},
			
			ChangeSize_app:function()
			{
				//修改画布的大小
				this.ChartWidth=350;
				this.ChartHeight=550;
				
				if (g_Minute.JSChart)
				{
					//修改插件大小
					g_Minute.JSChart.CanvasElement.Height = this.ChartHeight;
					g_Minute.JSChart.CanvasElement.Width = this.ChartWidth;
					g_Minute.JSChart.OnSize();	//重新绘制
				}
				
				if (g_KLine.JSChart)
				{
					//修改插件大小
					g_KLine.JSChart.CanvasElement.Height = this.ChartHeight;
					g_KLine.JSChart.CanvasElement.Width = this.ChartWidth;
					g_KLine.JSChart.OnSize();//重新绘制
				}
			}
		}
	}
</script>

<style>
	@import "../../graceUI/animate.css";
	.grace-accordion-show{height:auto; animation:fadeIn 300ms linear;}
	.grace-accordion-hide{height:0; animation:fadeOut 300ms linear;}
	.grace-accordion-title{color:#FFFFFF;}
	.grace-accordion-title .grace-icons:before{margin-right:10rpx; font-size:40rpx !important;}
	.login_box{
		width: 100%;
		height: 100%;
		
	}
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
		
		width: 100%;
	}

	.zc_text {
		width: 750upx;
		position: relative;
		left: 0;
		padding: 0 40upx;
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
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}

	.nav_box {
		width: 100%;
	}

	.grace-scroll-x .item {
		display: inline-flex;
		width: 25%;
	}

	.grace-scroll-x .item text {
		font-size:27upx;
		color: #FFF;
	}

	.grace-scroll-x .item.active text {
		font-size: 30upx;
		color: #4c7ada;
	}

	.grace-scroll-x .item.active .yd {
		width: 80upx;
		height:3upx;
		margin-top: 15upx;
		background: #4c7ada;
		border-radius: 6upx;
	}

	.con_box {
		position: relative;
		z-index: 99999;
		width: 100%;
		padding-top: 30upx;
		box-sizing: border-box;
		padding-top: 60upx;
	}

	.zc_box {
		width: 670upx;
		box-shadow: 0px 4px 20px 0px rgba(73, 102, 245, 0.2);
		background: rgba(36, 178, 155, 1);
		border-radius: 20upx;
		height: 380upx;
		margin: 0 40upx 30upx 40upx;
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
		overflow: auto;
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

