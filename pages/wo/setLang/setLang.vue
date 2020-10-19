<template>
	<view class="container" :style="hb_status?'height: 100vh;background:#ffffff;':'background:#05060F;'"> 
		<view class="header hi-columns" :style="'padding-top: '+statusBarH+'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'" mode=""
				 style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view :style="hb_status?'color:#000000':'color:#ffffff'" style="font-size: 37upx;">{{$t('wo.yysz')}}</view>
			</view>
		</view>
		<view class="content hi-columns" :style="hb_status?'height: 100vh;background:#F0F3F5;padding-top:'+(header_H)+'px;':'background:'+backgroundALL+';padding-top:'+(header_H)+'px;'">
			<view class="set_text_title" :style="hb_status?'color:#000000':'color:#ffffff'"></view>


			
			<view class="item_l hi-columns" :style="backgroundALL == '#1c1f22'?'background: #18253D;':'background: #ffffff;'">
				
				<view class="items hi-rows hi-flex-vcenter hi-space-between" :style="hb_status?'border-bottom: 1px solid rgba(0,0,0,.1);padding-bottom: 25upx;':'border-bottom: 1px solid rgba(255,255,255,.1);padding-bottom: 25upx;'"  @click="tab_lang(0)">
					<text class="title" :style="hb_status?'color:#242933':'color:#ffffff'">English</text>
					<image src="../../../static/wo/icon_hoice.png" mode="" v-show="lang_index==0"  style="width: 30upx;height: 30upx;"></image>
				</view>
				
				<view class="items hi-rows hi-flex-vcenter hi-space-between" :style="hb_status?'border-bottom: 1px solid rgba(0,0,0,.1);padding-bottom: 25upx;padding-top: 25upx;':'border-bottom: 1px solid rgba(255,255,255,.1);padding-bottom: 25upx;padding-top: 25upx;'" @click="tab_lang(1)">
					<text class="title" :style="hb_status?'color:#242933':'color:#ffffff'">{{$t('wo.jtzw')}}</text>
					 <image src="../../../static/wo/icon_hoice.png"  v-show="lang_index==1" mode="" style="width: 30upx;height: 30upx;"></image>
				</view>
				
				<view class="items hi-rows hi-flex-vcenter hi-space-between" :style="hb_status?'border-bottom: 1px solid rgba(0,0,0,.1);padding-bottom: 25upx;padding-top: 25upx;':'border-bottom: 1px solid rgba(255,255,255,.1);padding-bottom: 25upx;padding-top: 25upx;'" @click="tab_lang(2)">
					<text class="title" :style="hb_status?'color:#242933':'color:#ffffff'">한국어</text>
					<image src="../../../static/wo/icon_hoice.png" mode=""  v-show="lang_index==2" style="width: 30upx;height: 30upx;"></image>
				</view>
				
				<view class="items hi-rows hi-flex-vcenter hi-space-between" style="padding-top: 25upx;" @click="tab_lang(3)">
					<text class="title" :style="hb_status?'color:#242933':'color:#ffffff'">Spanish</text>
					 <image src="../../../static/wo/icon_hoice.png" mode=""  v-show="lang_index==3" style="width: 30upx;height: 30upx;"></image>
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
				isalert:false, //弹窗
				backgroundALL:'',
				colorALL:'',
				statusBarH: '',
				windowHeight:0,
				header_H:0,
				hb_status:true, //true 白色   false 黑色
				lang_index:1     //0英文  1中文 2韩文  3 spanish  

			}
		},
		onLoad() {
		This = this;
		uni.getSystemInfo({
			success(res) {
				This.statusBarH = res.statusBarHeight;
				This.windowHeight = res.windowHeight
				console.log(JSON.stringify(res))
				console.log(This.windowHeight)
			}
		})
		var view = uni.createSelectorQuery().select(".header");
		view.boundingClientRect(data => {
			console.log("节点离页面顶部的距离为" + data.height);
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
			console.log(this.colorALL)
		},
		methods: {
			tab_lang(e){
				this.lang_index=e;
			},
			exit_btn(){
				uni.navigateBack({  //后退按钮
					delta:1
				})
			},
			tab_init(){
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
	page{height: 100%;}
.container{width: 100%;height: 100%;background: #F0F3F5;}

.header {padding: 0 30upx;box-sizing: border-box;position: fixed;width: 100%;left: 0;top: 0;z-index: 99999;}
.header .header_box {height: 88upx;}

.content{flex: 1;width: 100%;overflow:auto;box-sizing: border-box;height: 100%;}

.set_text_title{font-size: 48upx;width: 100%;margin: 30upx 0;padding: 0 40upx;box-sizing: border-box;}

.icon-arrow-right{color: #8792A8;font-size: 32upx;}
.item_l{margin: 0 40upx;width: 670upx;padding: 25upx 40upx;box-sizing: border-box;border-radius: 16upx;margin-bottom: 20upx;}

.userinfo{}
.userinfo .user_text{margin-left: 30upx;}
.userinfo .user_text .name{font-size: 38upx;color: #FFFFFF;}
.userinfo .user_text .title{font-size: 32upx;color: #FFFFFF;}
.userinfo .user_text .userid{font-size: 24upx;color: #8792A8;}
.right_box{}
.right_box .cheched_text{font-size: 28upx;color: #6E778A;margin-right: 25upx;}

.btn{width: 670upx;margin: 0 40upx;margin-top: 140upx;border: 2upx solid #6E778A;color: #6E778A;text-align: center;height: 100upx; line-height: 100upx;font-size: 36upx;border-radius: 50upx;}

.yd_box{display: inline-flex; width: 16upx;height: 16upx;border-radius: 8upx;background:#E64340;position: relative;top: -30upx;right: -5upx;}



/* 弹出对话框 */
.alert_box{position: fixed;top: 0;left: 0;width: 100%;height: 100%;padding: 0 43upx;box-sizing: border-box;z-index: 999999999999999999999999999999;}
.alert_box .mask_box{background: rgba(0,0,0,.2);height: 100%;width: 100%;position: absolute;top: 0;left: 0;}
.alert_box .content_box{width:580upx;height: 350upx;border-radius: 20upx;position: relative;z-index: 99999;padding: 40upx 30upx;box-sizing: border-box;}
.alert_box .content_box .text_box{width:100%;font-size: 36upx;color: #FFFFFF;padding-top: 60upx;}
.alert_box .content_box .btn_box view{text-align: center;height: 70upx; line-height: 70upx;border-radius: 35upx;width: 240upx; box-sizing: border-box;}
.alert_box .content_box .btn_box view:nth-of-type(1){border: 1px solid #E64340;color: #E64340;}
.alert_box .content_box .btn_box view:nth-of-type(2){background: #3A74FC;color: #FFFFFF;} 
</style>
