<template>
	<view class="container hi-columns" :style="backgroundALL == '#1c1f22'?'background:#18253D;':'background:#F0F3F5;'">
		<!-- 标题栏 -->
		<view class="muen_header hi-columns" :style="'padding-top:'+statusBarH+'px;'">
			<view class="hi-rows hi-flex-vcenter  hi-space-between">
				<view class="hi-rows hi-flex-vcenter">
					<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'"
					 mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
				</view>
				<view class="hi-rows hi-flex-vcenter">
					<text :style="hb_status?'color: #242833;font-size: 24upx;':'color: #ffffff;font-size: 24upx;'" @click="loginType()" ></text>
				</view>
			</view>
		</view>
		
		<view class="" style="flex: 1; overflow-y: auto;">
			<view class="header_title_box hi-rows hi-flex-vcenter hi-space-between">
				<view class="header_item hi-rows hi-flex-vcenter" style="align-self: flex-start;">
					<text class="t1" :style="hb_status?'color: #242833;font-size: 48upx;':'color: #ffffff;font-size: 48upx;'">{{$t('wo.ghgrzybj')}}</text>
					<text class="t1" style="font-size: 22upx;color: #8792A8;align-self: flex-start;margin-top: 40upx;margin-left: 20upx;"></text>
				</view>
				<view class="header_item hi-rows" style="">
					<view style="font-size: 28upx;color: #3A74FC;padding: 16upx 28upx;border: 1upx solid #3A74FC;border-radius: 29upx;">{{$t('wo.zdybj')}}</view>
				</view>
			</view>
			<view class="hi-columns">
				<view class="item_bb hi-columns">
					<view class="hi-rows hi-flex-vcenter hi-space-between">
						<text class="t1" :style="hb_status?'color: #242933;border-left: 6upx solid #242933;':'color:#FFFFFF;border-left: 6upx solid #FFFFFF;'">{{$t('wo.tjbjt')}}</text>
						<text class="t2"></text> 
					</view>
					<view class="img_box hi-rows hi-wrap hi-space-between">
						
						<view class="item_img hi-columns">
							<image src="../../../static/wo/me_homepage_bg01.png" mode=""></image>
							<view class="hi-rows hi-flex-vcenter hi-space-between">
								<text class="Img_t1">{{$t('wo.kj')}}</text>
								<text class="Img_t2">{{$t('wo.ljsy')}}</text>
							</view>
						</view>
						<view class="item_img hi-columns">
							<image src="../../../static/wo/me_homepage_bg02.png" mode=""></image>
							<view class="hi-rows hi-flex-vcenter hi-space-between">
								<text class="Img_t1">{{$t('wo.kj')}}</text>
								<text class="Img_t2">{{$t('wo.ljsy')}}</text>
							</view>
						</view>
						<view class="item_img hi-columns">
							<image src="../../../static/wo/me_homepage_bg03.png" mode=""></image>
							<view class="hi-rows hi-flex-vcenter hi-space-between">
								<text class="Img_t1">{{$t('wo.kj')}}</text>
								<text class="Img_t2">{{$t('wo.ljsy')}}</text>
							</view>
						</view>
						<view class="item_img hi-columns">
							<image src="../../../static/wo/me_homepage_bg04.png" mode=""></image>
							<view class="hi-rows hi-flex-vcenter hi-space-between">
								<text class="Img_t1">{{$t('wo.kj')}}</text>
								<text class="Img_t2 active">{{$t('wo.ljsy')}}</text>
							</view>
						</view>
						<view class="item_img hi-columns">
							<image src="../../../static/wo/me_homepage_bg05.png" mode=""></image>
							<view class="hi-rows hi-flex-vcenter hi-space-between">
								<text class="Img_t1">{{$t('wo.kj')}}</text>
								<text class="Img_t2">{{$t('wo.ljsy')}}</text>
							</view>
						</view>
						<view class="item_img hi-columns">
							<image src="../../../static/wo/me_homepage_bg06.png" mode=""></image>
							<view class="hi-rows hi-flex-vcenter hi-space-between">
								<text class="Img_t1">{{$t('wo.kj')}}</text>
								<text class="Img_t2">{{$t('wo.ljsy')}}</text>
							</view>
						</view>
						<view class="item_img hi-columns">
							<image src="../../../static/wo/me_homepage_bg07.png" mode=""></image>
							<view class="hi-rows hi-flex-vcenter hi-space-between">
								<text class="Img_t1">{{$t('wo.kj')}}</text>
								<text class="Img_t2">{{$t('wo.ljsy')}}</text>
							</view>
						</view>
						<view class="item_img hi-columns">
							<image src="../../../static/wo/me_homepage_bg08.png" mode=""></image>
							<view class="hi-rows hi-flex-vcenter hi-space-between">
								<text class="Img_t1">{{$t('wo.kj')}}</text>
								<text class="Img_t2">{{$t('wo.ljsy')}}</text>
							</view>
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
				paddingBottom:0,//判断苹果X底部高度
				text:'',
				num:0
				

			}
		},
		onLoad() {
			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight
					// console.log(JSON.stringify(res))
					console.log(This.windowHeight)
					
					var model = res.model
					if (model.search('iPhone X') != -1){
					   This.paddingBottom = 68;
					}
			
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
			textarea(e){
				this.text=e.detail.value;
				this.num=e.detail.cursor;
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
			}
		}
	}
</script>

<style>
	page {height: 100%;}
	.br{border-radius: 20upx;overflow: hidden;}
	.p30{padding: 0 30upx;box-sizing: border-box;}
	.borderB1{width:100%;height:1upx;background:rgba(255,255,255,.1);margin: 30upx 0;}
	.mt30{margin-top: 30upx;padding-bottom: 20upx;}
	.b{color: #242833;}
	.h{color: #FFFFFF;}
	
	.content{box-sizing: border-box;width: 670upx;margin: 0 40upx;padding-bottom: 40upx;flex: 1; margin-top: 20upx;}
	.container {width: 100%;height: 100%;overflow: hidden;box-sizing: border-box;}
	.muen_header>view {height: 88upx;padding: 0 40upx;box-sizing: border-box;}
	.header_title_box {padding: 0 40upx;box-sizing: border-box;margin: 20upx 0;}
	.header_title_box .header_item {text-align: center;}
	.header_title_box .header_item .t1 {font-size: 48upx;color: #FFFFFF;font-weight: bold;}
	.header_title_box .header_item .t2 {color: #8792A8;font-size: 22upx;margin-left: 19upx;}
	.header_title_box .header_item .h_btn {color: #3A74FC;border: 1upx solid #3A74FC;width: 120upx;height: 58upx;border-radius: 29upx;line-height: 58upx;}

	 
	.item_bb{width: 100%;border-radius:20upx;}
	.item_bb>.hi-rows{margin-bottom: 30upx;}
	.item_bb .t1{font-size: 28upx;color: #242933;margin-top: 20upx;padding-left: 35upx;box-sizing: border-box;}
	.item_bb .t2{font-size: 20upx;color: #8792A8;padding-right: 40upx;box-sizing: border-box;}
	
	.img_box{padding: 0 40upx;}
	.item_img{width: 320upx;margin-top: 20upx;}
	.item_img .hi-rows{margin: 20upx 0;}
	.item_img .Img_t1{font-size: 22upx;color: #8792A8;}
	.item_img .Img_t2{font-size: 24upx;color: #3A74FC;}
	.item_img .Img_t2.active{color: #4FB757;}
	.item_img image{width: 320upx;height: 170upx;border-radius: 10upx;}
	
</style>

