<template>
	<div class='divchart' style='background-color:#101f32;' >
		<view>
			<canvas id="kline2" canvas-id='kline2' class='kline2' v-bind:style="{width: ChartWidth+'px', height: ChartHeight+'px'}"  v-show="KLine.IsShow"
			  @touchstart="KLineTouchStart" @touchmove='KLineTouchMove' @touchend='KLineTouchEnd' ></canvas>  
			<canvas id="minute2" canvas-id='minute2' class='minute' v-bind:style="{width: ChartWidth+'px', height: ChartHeight+'px'}" v-show="Minute.IsShow"
			   @touchstart="MinuteTouchStart" @touchmove='MinuteTouchMove' @touchend='MinuteTouchEnd' ></canvas>
		</view>
		
		<div class="button-sp-area">
			<button class="mini-btn" type="default" size="mini" @click="ChangeKLinePeriod(KLINE_PERIOD_ID.KLINE_MINUTE_ID)">1{{$t('hqchart.minute')}}</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeKLinePeriod(KLINE_PERIOD_ID.KLINE_15MINUTE_ID)">15{{$t('hqchart.minute')}}</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeKLinePeriod(KLINE_PERIOD_ID.KLINE_30MINUTE_ID)">30{{$t('hqchart.minute')}}</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeKLinePeriod(KLINE_PERIOD_ID.KLINE_60MINUTE_ID)">60{{$t('hqchart.minute')}}</button>
		</div>
		<div class="button-sp-area">
			<button class="mini-btn" type="default" size="mini" @click="ChangeKLineIndex(0,'EMPTY')">{{$t('hqchart.ztkzb')}}</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeKLineIndex(0,'BOLL')">BOLL</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeKLineIndex(2,'MACD')">MACD</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeKLineIndex(1,'VOL')">VOL</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeKLineIndex(2,'KDJ')">KDJ</button>
		</div>
	</div>
</template>

<script>

import {JSCommon} from '../../umychart.uniapp/umychart.wechat.3.0.js'
import {JSCommonHQStyle} from '../../umychart.uniapp/umychart.style.wechat.js'

function DefaultData() { }

DefaultData.GetKLineOption = function () 
{
    let data = 
    {
        Type: this.$t('hqchart.history'),         
        Windows: //窗口指标
        [
            {Index:"BOLL",Modify: false, Change: false}, 	
			{Index:"VOL",Modify: false, Change: false},
			{Index:"KDJ",Modify:true, Change:true, Overlay:true}			
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
            Right:  55, //右边间距
            Top:    25,
            Bottom: 25,
        }, 
        KLine:
        {
			DragMode:1, 
            Right:1,                            //复权 0 不复权 1 前复权 2 后复权
            Period:0,                           //周期: 0 日线 1 周线 2 月线 3 年线 
            PageSize:35,
            IsShowTooltip:false,
			DrawType:0, 
			RightSpaceCount: 0.1,
        },		
		ExtendChart:
		[
			{Name:'KLineTooltip' },	//开启手机端tooltip
		], 		
		Frame:  //子框架设置
		[
		    {SplitCount:5,IsShowLeftText:false,Custom: [{ Type: 0, Position: 'right'}]},
		    {SplitCount:2,IsShowLeftText:false},
		    {SplitCount:3,IsShowLeftText:false},
		],
        
    };
 
    return data;
}
 
DefaultData.GetMinuteOption=function()
{
    var option= 
    {
        Type:this.$t('hqchart.minute_zst'),   //创建图形类型            
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
export default 
{
	data() 
	{
		let data=
		{
			//600000.sh   BEC/USDT
			Symbol:'ETH/USDT',
			ChartWidth:500,
			ChartHeight:300,
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
			ServerUrl: 'http://106.55.42.122:8888/kline'
		};		
		return data;
	},
	onLoad(values) {
		let that = this;
		if( values.symbol != null ){
			this.Symbol = values.symbol;
		}
		uni.getSystemInfo({
		    success: function (res) {
		        //提取屏幕宽度
				that.ChartWidth = res.windowWidth;
		    }
		});
	},
	onReady()
	{
		//生成K线
		this.CreateKLineChart_app(); 
		//生成分时图
		//this.CreateMinuteChart_app()
	},	
	onHide()
	{
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
	onUnload()
	{
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
	methods: 
	{
		CreateKLineChart_app()
		{
			if (g_KLine.JSChart) return;
			
			let element = new JSCommon.JSCanvasElement();
			element.IsUniApp=true;	//canvas需要指定下 是uniapp的app
			element.ID = 'kline2';
			element.Height = this.ChartHeight;  //高度宽度需要手动绑定!!
			element.Width = this.ChartWidth;
			
			var blackStyle=JSCommonHQStyle.GetStyleConfig(JSCommonHQStyle.STYLE_TYPE_ID.BLACK_ID);
			//blackStyle.DefaultTextColor='rgb(255,0,255)';			
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
			 if (request.Data.indexname==this.$t('hqchart.dxdzb'))
			 {
				 data.PreventDefault=true;				 
				 var hqchart=data.HQChart;
				 var kData=hqchart.ChartPaint[0].Data;
				 var closeLine={name:this.$t('hqchart.spjx'), type:0, data:kData.GetClose() };
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
	
</style>
