<template>
	<view class="container hi-columns" :style="backgroundALL == '#1c1f22'?'background:#000;':'background:#F0F3F5;'">
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
					<text class="t1" :style="hb_status?'color: #242833;font-size: 48upx;':'color: #ffffff;font-size: 48upx;'">{{$t('wo.bwhhr')}}</text>
					<!-- <view class="t1" style="font-size: 28upx;color: #8792A8;align-self: flex-start;margin-top: 40upx;margin-left: 20upx;" @tap="fuzhi(yaoqingma)">
						<text style="color: #8797a8;">邀请码 ： {{yaoqingma}}22221 </text>
						<image src="../../../static/home/icon_copy.png" style="width:40upx;height:40upx; margin-left:10upx;" mode=""></image> 
					</view> -->
				</view>
			<!-- 	<view class="header_item hi-rows" style="align-self: flex-start;margin-top: 40upx;">
					
				</view> -->
			</view>
			<view class="hi-columns" style="margin: 40upx;box-sizing: border-box;" v-if="level == 0">
				<view class="item_bb" style="display: inline-flex; align-items: center;" :style="hb_status?'background: #FFFFFF;':'background: #18253D;'">
					<view style="width: 18%; text-align: center;">
						<image src="../../../static/home/icon_ordinary.png" style="width: 80upx;height: 120upx;" mode=""></image>
					</view>
					<view style="width: 82%;">
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-bottom: 20upx;">
							<text class="t1" :style="hb_status?'color: #242933;border-left: 6upx solid #242933;':'color:#FFFFFF;border-left: 6upx solid #FFFFFF;'">{{$t('wo.pthhr')}}</text>
							<text class="t2" style="color:#4245d7">{{count}}%</text> 
						</view>
						<progress border-radius='20' activeColor='#4245d7' backgroundColor='#ececec' :percent="count" />
					</view>
				</view>
			</view>
			
			<!-- <view class="hi-columns" style="margin: 40upx;box-sizing: border-box;">
				<view class="item_bb" style="display: inline-flex; align-items: center;" :style="hb_status?'background: #FFFFFF;':'background: #18253D;'">
					<view style="width: 18%; text-align: center;">
						<image src="../../../static/home/icon_intermediate.png" style="width: 80upx;height: 120upx;" mode=""></image>
					</view>				
					<view style="width: 82%;">
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-bottom: 20upx;">
							<text class="t1" :style="hb_status?'color: #242933;border-left: 6upx solid #242933;':'color:#FFFFFF;border-left: 6upx solid #FFFFFF;'">中级合伙人</text>
							<text class="t2" style="color:#26b99a">{{rendata.intermediatePartner}}%</text> 
						</view>
						<progress border-radius='20' activeColor='#26b99a' backgroundColor='#ececec' :percent="rendata.intermediatePartner" />
					</view>
				</view>
			</view>
			<view class="hi-columns" style="margin: 40upx;box-sizing: border-box;">
				<view class="item_bb" style="display: inline-flex; align-items: center;" :style="hb_status?'background: #FFFFFF;':'background: #18253D;'">
					<view style="width: 18%; text-align: center;">
						<image src="../../../static/home/icon_advanced.png" style="width: 80upx;height: 120upx;" mode=""></image>
					</view>				
					<view style="width: 82%;">
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-bottom: 20upx;">
							<text class="t1" :style="hb_status?'color: #242933;border-left: 6upx solid #242933;':'color:#FFFFFF;border-left: 6upx solid #FFFFFF;'">高级合伙人</text>
							<text class="t2" style="color:#d140cb">{{rendata.advancedPartner}}%</text> 
						</view>
						<progress border-radius='20' activeColor='#d140cb' backgroundColor='#ececec' :percent="rendata.advancedPartner" />
					</view>
				</view>
			</view>
			<view class="hi-columns" style="margin: 40upx;box-sizing: border-box;">
				<view class="item_bb" style="display: inline-flex; align-items: center;" :style="hb_status?'background: #FFFFFF;':'background: #18253D;'">
					<view style="width: 18%; text-align: center;">
						<image src="../../../static/home/icon_super.png" style="width: 80upx;height: 120upx;" mode=""></image>
					</view>	
					<view style="width: 82%;">
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-bottom: 20upx;">
							<text class="t1" :style="hb_status?'color: #242933;border-left: 6upx solid #242933;':'color:#FFFFFF;border-left: 6upx solid #FFFFFF;'">超级合伙人</text>
							<text class="t2" style="color:#e64c3c">{{rendata.superPartner}}%</text> 
						</view>
						<progress border-radius='20' activeColor='#e64c3c' backgroundColor='#ececec' :percent="rendata.superPartner" />
					</view>	
				</view>
			</view> -->
		</view>
		
		
		
		


		
	</view>
</template>

<script>
	import graceCirProgress from '../../../graceUI/components/graceCirProgress.vue';
	var This;
	export default {
		components:{
		        graceCirProgress
		    },
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
				num:0,
				rendata:'',
				yaoqingma:'',
				count:'0',
				level:'0'
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
			var setdata = {
				token:uni.getStorageSync('token'),
				userId:uni.getStorageSync('id')
			}
			console.log(setdata)
			uni.request({
				url: this.websiteUrl+'user/getPartnerLevel', 
				data:setdata,  
				dataType:'json',
				method:'POST',
				header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh' //自定义请求头信息
					},
					success: (res) => { 
						console.log(res);
						this.level = res.data.data.level
						this.count = res.data.data.count
					}
			})
			
		},
		methods: {
			fuzhi(wallet){
				uni.setClipboardData({
					data: wallet,
					success: function (res) {
						uni.showToast({
							title:this.$t('wo.yfz'),
							duration: 2000
						});
					}
				});
			},
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
	.header_title_box .header_item .t2 {color: #8792A8;font-size:28upx;margin-left: 19upx;}
	.header_title_box .header_item .h_btn {color: #3A74FC;border: 1upx solid #3A74FC;width: 120upx;height: 58upx;border-radius: 29upx;line-height: 58upx;}

	 
	.item_bb{width: 100%;border-radius:20upx;padding: 15upx 30upx; box-sizing: border-box;}
	.item_bb>.hi-rows{}
	.item_bb .t1{font-size: 28upx;color: #242933;box-sizing: border-box;}
	.item_bb .t2{font-size: 28upx;color: #8792A8;box-sizing: border-box;}
	.textarea_box{position: relative;box-sizing: border-box;width:590upx;height:370upx;margin:40upx;}
	.textarea_box textarea{ background: #C0C4CC;padding: 20upx;margin: 0;width: 100%;height: 100%;box-sizing: border-box;}
	.textarea_box .num{position: absolute;bottom: 20upx;right: 20upx;color: #8792A8;font-size: 20upx;}
	
	.input_box{padding: 0upx 40upx;box-sizing: border-box;}
	.input_box input{padding: 24upx 0;}
	
	.hauto>.hi-rows{}
	.hauto .t1{font-size: 28upx;color: #242933;padding-left: 35upx;box-sizing: border-box;}
	.hauto .t2{font-size: 20upx;color: #8792A8;padding-right: 40upx;box-sizing: border-box;}
	.hauto{width: 100%;border-radius:20upx;margin-bottom: 30upx;padding-bottom: 40upx;} 
	
	
	
	.items{margin: 0 40upx;padding: 40upx;border-radius:16px;margin-bottom: 20upx;}
	.items .ts{font-size: 32upx;}
	
	.icon-arrow-right{font-size: 32upx; color: #8792A8;}
	
	.btns{margin: 0 40upx;margin-top: 60upx;height: 100upx;line-height: 100upx;font-size: 36upx; text-align: center;border-radius: 50upx;color: #3A74FC;border: 1upx solid #3A74FC;margin-bottom: 30upx;}
</style>

