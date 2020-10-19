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
			<view class="header_title_box hi-columns hi-flex-vcenter">
				<view class="header_item hi-rows hi-flex-vcenter" style="align-self: flex-start;">
					<text class="t1" :style="hb_status?'color: #242833;font-size: 48upx;':'color: #ffffff;font-size: 48upx;'">{{$t('wo.zxkf')}}</text>
					<text class="t1" style="font-size: 22upx;color: #8792A8;align-self: flex-start;margin-top: 40upx;margin-left: 20upx;">{{$t('wo.dqkffm')}}</text>
				</view>
				<!-- <view class="header_item hi-rows" style="align-self: flex-start;margin-top: 40upx;">
					<text style="font-size: 48upx;color: #3A74FC;">中国</text>
				</view> -->
			</view>
			<view class="hi-columns" style="margin: 40upx;box-sizing: border-box;">
				<view class="item_bb hi-columns" :style="hb_status?'background: #FFFFFF;':'background: #18253D;'">
					<view class="hi-rows hi-flex-vcenter hi-space-between">
						<text class="t1" :style="hb_status?'color: #242933;border-left: 6upx solid #242933;':'color:#FFFFFF;border-left: 6upx solid #FFFFFF;'">{{$t('wo.lynr')}}</text>
						<text class="t2">{{$t('wo.bt')}}</text> 
					</view>
					<view class="textarea_box"> 
						<textarea :value="text" :placeholder="lynr" @input="textarea" maxlength="500" />
						<text class="num">{{num}}/500</text>
					</view>
					
				</view>
			</view>
			<view class="hi-columns" style="margin: 40upx;box-sizing: border-box;">
				<view class="hauto hi-columns" :style="hb_status?'background: #FFFFFF;':'background: #18253D;'">
					<view class="hi-rows hi-flex-vcenter hi-space-between">
						<text class="t1" :style="hb_status?'color: #242933;border-left: 6upx solid #242933;':'color:#FFFFFF;border-left: 6upx solid #FFFFFF;'">{{$t('wo.ndlxfs')}}</text>
						<text class="t2">{{$t('wo.bt')}}</text>
					</view>
					<view class="input_box hi-columns">
						<input type="text" value="" :placeholder="name"  :style="hb_status?'color: #242933;border-bottom: 1upx solid rgba(36,41,51,.1);':'color:#FFFFFF;border-bottom: 1upx solid rgba(255,255,255,.1);'" />
						<input type="text" value="" :placeholder="phone" :style="hb_status?'color: #242933;border-bottom: 1upx solid rgba(36,41,51,.1);':'color:#FFFFFF;border-bottom: 1upx solid rgba(255,255,255,.1);'"/>
						<input type="text" value="" :placeholder="yx" :style="hb_status?'color: #242933;border-bottom: 1upx solid rgba(36,41,51,.1);':'color:#FFFFFF;border-bottom: 1upx solid rgba(255,255,255,.1);'" />
						<input type="text" value="" :placeholder="dz" :style="hb_status?'color: #242933;border-bottom: 1upx solid rgba(36,41,51,.1);':'color:#FFFFFF;border-bottom: 1upx solid rgba(255,255,255,.1);'" />
					</view>	
				</view>
			</view>
			
			<view class="btns">{{$t('wo.fsly')}}</view>
			
		</view>
		
		
		
		


		
	</view>
</template>

<script>
	var This;
	export default {
		data() {
			return {
				lynr:this.$t('wo.qzcsrlynr'),
				name:this.$t('wo.xm'),
				phone:this.$t('wo.dh'),
				yx:this.$t('wo.yx'),
				dz:this.$t('wo.dz'),
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

	 
	.item_bb{width: 100%;height: 520upx;border-radius:20upx;}
	.item_bb>.hi-rows{margin-top: 50upx;margin-bottom: 30upx;}
	.item_bb .t1{font-size: 28upx;color: #242933;margin-top: 20upx;padding-left: 35upx;box-sizing: border-box;}
	.item_bb .t2{font-size: 20upx;color: #8792A8;padding-right: 40upx;box-sizing: border-box;}
	.textarea_box{position: relative;box-sizing: border-box;width:590upx;height:370upx;margin:40upx;}
	.textarea_box textarea{ background: #C0C4CC;padding: 20upx;margin: 0;width: 100%;height: 100%;box-sizing: border-box;}
	.textarea_box .num{position: absolute;bottom: 20upx;right: 20upx;color: #8792A8;font-size: 20upx;}
	
	.input_box{padding: 0upx 40upx;box-sizing: border-box;}
	.input_box input{padding: 24upx 0;}
	
	.hauto>.hi-rows{margin-top: 50upx;margin-bottom: 30upx;}
	.hauto .t1{font-size: 28upx;color: #242933;margin-top: 20upx;padding-left: 35upx;box-sizing: border-box;}
	.hauto .t2{font-size: 20upx;color: #8792A8;padding-right: 40upx;box-sizing: border-box;}
	.hauto{width: 100%;border-radius:20upx;margin-bottom: 30upx;padding-bottom: 40upx;} 
	
	
	
	.items{margin: 0 40upx;padding: 40upx;border-radius:16px;margin-bottom: 20upx;}
	.items .ts{font-size: 32upx;}
	
	.icon-arrow-right{font-size: 32upx; color: #8792A8;}
	
	.btns{margin: 0 40upx;margin-top: 60upx;height: 100upx;line-height: 100upx;font-size: 36upx; text-align: center;border-radius: 50upx;color: #3A74FC;border: 1upx solid #3A74FC;margin-bottom: 30upx;}
</style>

