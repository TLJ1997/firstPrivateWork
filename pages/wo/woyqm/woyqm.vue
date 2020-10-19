<template>
	<view class="container" :style="hb_status?'height: 100vh;background:#ffffff;':'background:#05060F;'"> 
		<view class="header hi-columns" :style="'padding-top: '+statusBarH+'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'" mode=""
				 style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view class="" @click="share_btn()">
					<image :src="hb_status?'../../../static/wo/icon_share.png':'../../../static/wo/icon_share1.png'" mode="" style="width: 46upx;height: 46upx;"></image>
				</view>
			</view>
		</view>
		<view class="content hi-columns" :style="hb_status?'background:#F0F3F5;padding-top:'+(header_H)+'px;':'background:#05060F;padding-top:'+(header_H)+'px;'">
			<image class="hi-columns" src="../../../static/wo/me_bg01.png" mode="" style="height:100%;width: 100%;margin-top: 40upx;"></image>
			<view class="user_box hi-columns hi-flex-vcenter" style="background: #FFFFFF url(../../../static/wo/me_bg02.png) no-repeat bottom;background-size: 560upx 80upx;">
				<view class="user_tx_box" style="background:url(../../../static/wo/icon_headportrait.png) no-repeat center;background-size: 128upx 128upx;">
					<image src="../../../static/wo/tx11.png" mode=""></image>
					<text class="sm_box">{{$t('wo.wsm')}}</text>
				</view>
				<text class="username">WIOJ9908</text>
				<text class="yq_t">{{$t('wo.yqm')}}</text>
				<text class="yqm_t">tf2Vtu</text>
				<view class="rwm_box" style="background:url(../../../static/wo/icon_qrcode.png) no-repeat center;background-size: 148upx 148upx;">
					<image src="../../../static/wo/erweim.png" mode=""></image>
				</view>
				
			</view>

		</view>
		
		<view class="share_maks"  v-show="share_status" style="background: rgba(0,0,0,.6);" @click="share_btn()"></view>
		<view class="share_box hi-columns" v-show="share_status" :style="hb_status?'background:#FFFFFF':'background:#18253D;'">
			<view class="item_box hi-rows hi-wrap">
				<view class="icon_box hi-columns hi-flex-vcenter">
					<image src="../../../static/wo/share_icon_wechat.png" mode=""></image>
					<text>{{$t('wo.wxhy')}}</text>
				</view>
				<view class="icon_box hi-columns hi-flex-vcenter">
					<image src="../../../static/wo/share_icon_friends.png" mode=""></image>
					<text>{{$t('wo.pyq')}}</text>
				</view>
				<view class="icon_box hi-columns hi-flex-vcenter">
					<image src="../../../static/wo/share_icon_microblog.png" mode=""></image>
					<text>{{$t('wo.xlwb')}}</text>
				</view>
				<view class="icon_box hi-columns hi-flex-vcenter">
					<image src="../../../static/wo/share_icon_qq.png" mode=""></image>
					<text>{{$t('wo.qqhy')}}</text>
				</view>
				<view class="icon_box hi-columns hi-flex-vcenter">
					<image src="../../../static/wo/share_icon_space.png" mode=""></image>
					<text>{{$t('wo.qqkj')}}</text>
				</view>
				<view class="icon_box hi-columns hi-flex-vcenter">
					<image src="../../../static/wo/share_icon_link.png" mode=""></image>
					<text>{{$t('wo.fzlj')}}</text>
				</view>
				<view class="icon_box hi-columns hi-flex-vcenter">
					<image src="../../../static/wo/share_icon_picture.png" mode=""></image>
					<text>{{$t('wo.fxtp')}}</text>
				</view>

			</view>
			
			<view class="btn" :style="hb_status?'border-top: 1upx solid rgba(0,0,0,.1);':'border-top: 1upx solid rgba(255,255,255,.1);'" @click="share_btn()">{{$t('wo.qx')}}</view>
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
				share_status:false

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
			share_btn(){
				this.share_status=!this.share_status;

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

.content{height: 100vh;position: relative;box-sizing: border-box;}
.user_box{width: 560upx;height: 510upx;position: absolute;bottom: 0;margin: 0 95upx;background: #FFFFFF;border-radius: 30upx 30upx 0 0;}

.user_tx_box{width: 128upx;height: 128upx;padding: 4upx;box-sizing: border-box;margin-top: -64upx;position: relative;}
.user_tx_box .sm_box{padding: 4upx 10upx;color: #FFFFFF;background:rgba(79,183,87,.8);border-radius: 13upx;position: absolute;bottom: 5upx;right: -10upx;font-size: 18upx;}
.user_tx_box image{width: 120upx;height:120upx;overflow: hidden;border-radius: 50%;margin-left: 4upx;margin-top: 4upx;}
.user_box .username{color: #242933;font-size: 30upx;margin-top: 12upx;}
.user_box .yq_t{color: #242933;font-size: 28upx;margin-top: 42upx;}
.user_box .yqm_t{color: #FFFFFF;font-size: 36upx;margin-top: 14upx;padding: 0upx 28upx;background: #3A74FC;border-radius: 25upx;height: 50upx;line-height: 50upx;display: inline-flex;}
.user_box .rwm_box{margin-top: 42upx;width: 148upx;height: 148upx;padding: 12upx;box-sizing: border-box;}
.user_box .rwm_box image{width: 126upx;height: 126upx;}



.share_maks{width: 100%;height: 100%;position: fixed;top: 0;left: 0;z-index: 9998;}
.share_box{width: 100%;height: 580upx;position: fixed; bottom:0;left: 0;z-index: 9999;border-radius:30px 30px 0px 0px;}
.share_box .btn{height: 100upx;line-height: 100upx;text-align: center;width: 100%;font-size: 32upx;color: #8792A8;margin: 0 40upx;box-sizing: border-box;}
.share_box .item_box{flex: 1;width: 100%;box-sizing: border-box;}
.share_box .item_box .icon_box{margin-top: 40upx;width: 25%;}
.share_box .item_box .icon_box image{width: 100upx;height: 100upx;}
.share_box .item_box .icon_box text{font-size: 26upx;color: #8792A8;} 


</style>
