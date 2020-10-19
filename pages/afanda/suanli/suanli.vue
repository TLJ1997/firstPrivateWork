<template>
	<view class="container" :style="hb_status?'height: 100vh;background:#ffffff;':'background:#05060F;'"> 
		<view class="header hi-columns" :style="'padding-top: '+statusBarH+'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image src="../../../static/home/nav_icon_back_night.png" mode=""
				 style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view style="font-size: 37upx;text-align: center;font-weight: bold;color:#ffffff">{{$t('afanda.kcsl')}}</view>
			<!-- 	<view style="font-size: 37upx;text-align: center;font-weight: bold;color:#ffffff"></view> -->
			</view>
		</view>
		<view class="content hi-columns" :style="hb_status?'height: 100vh;background:#F0F3F5;padding-top:'+(header_H)+'px;':'background:'+backgroundALL+';padding-top:'+(header_H)+'px;'">
			<view class="set_text_title" :style="hb_status?'color:#000000':'color:#ffffff'"> </view>
			
			<view style="position: relative;width: 100%;height:350upx;background-size: 100% 100%; align-items: center;" :style="{ backgroundImage: `url(${beijing})`}">
				
				<view style="width: 100%; align-items: center;padding-top:130upx;">
					<view class="user_text hi-columns" style="align-items: center;">
						<text class="name" style="color:#ffffff;font-size: 28upx;">{{$t('afanda.jzzwc')}}</text>
						<text class="userid" style="font-weight:bold;font-size:40upx;color: #FFF;margin-top: 20upx;">0.00</text>
					</view>
				</view>
			</view>
			<view style="width: 100%;background-color: #f5f5f5;height:120upx;position: relative;box-sizing: border-box;">
				<view style="height: 120upx;background-color:#FFF;border-radius: 10upx;width:600upx;padding-top: 30upx; position: absolute;top:-50upx;left: 50%;margin-left: -300upx; display: inline-flex;">
					<view class="user_text hi-columns" style="align-items: center;width: 49.4%;">
						<text class="name" style="color:#000;font-weight:bold;font-size:30upx;">0.00</text>
						<text class="userid" style="font-size:28upx;color: #000;margin-top: 10upx;overflow: hidden;white-space: nowrap; text-overflow: ellipsis;">{{$t('afanda.cbsl')}}</text>
					</view>
					<view style="width: 1upx;height: 50upx;background-color: #009688; margin-top:20upx;"></view>
					<view class="user_text hi-columns" style="align-items: center;width: 49.4%;">
						<text class="name" style="color:#000;font-weight:bold;font-size:30upx;">0.00</text>
						<text class="userid" style="font-size:28upx;color: #000;margin-top: 10upx; overflow: hidden;white-space: nowrap; text-overflow: ellipsis;">{{$t('afanda.dcsl')}}</text>
					</view>
				</view>
			</view>
			<view style="width: 100%;background-color: #FFF;height: 80upx;padding: 0 30upx; box-sizing: border-box;display: inline-flex;">
				<view style="width:50%;font-weight:bold;font-size:35upx;color: #000;line-height: 80upx;">{{$t('afanda.wdkgsl')}}</view>
				<view style="width:50%; text-align: right;font-size: 30upx;color: #00B26A;line-height: 80upx;"></view>
			</view>
			<view style="width: 100%;">
				<view style="width: 100%;height: 60upx;padding:30upx;box-sizing: border-box;display: inline-flex;">
					<view style="width: 50%;font-size: 25upx;color: #999;line-height: 60upx;">{{$t('afanda.zhm')}}</view>
					<view style="width: 50%;font-size: 25upx;color: #999;text-align: right;line-height: 60upx;">{{$t('afanda.cb')}}</view>
				</view>
				<view style="width: 100%;height: 60upx;padding:30upx;box-sizing: border-box;display: inline-flex;">
					<view style="width: 50%;font-size:30upx;color: #000;line-height: 60upx;">513151315</view>
					<view style="width: 50%;font-size:30upx;color: #000;text-align: right;line-height: 60upx;">0.11</view>
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
				beijing:'../../../static/wallet/honghong.png',
				userdatas:'',
				isalert:false, //弹窗
				backgroundALL:'',
				colorALL:'',
				statusBarH: '',
				windowHeight:0,
				header_H:0,
				nickname:'',
				hb_status:true, //true 白色   false 黑色
				noticeorder:true,//通知订单
				noticechat:true,//通知聊天
				isupdate:false  //是否有更新 
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
			This.header_H = data.height-5;
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
			var setdata = {
				"token":uni.getStorageSync("token"),
				"id":uni.getStorageSync("userId")
			}
			console.log(setdata)
			
		},
		methods: {
			
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

.header {padding: 0 30upx;box-sizing: border-box;position: fixed;width: 100%;left: 0;top: 0;z-index: 99999;background-color: #f36c2a;}
.header .header_box {height: 88upx;}

.content{flex: 1;width: 100%;overflow:auto;box-sizing: border-box;height: 100%;}

.set_text_title{font-size: 48upx;width: 100%;margin: 30upx 0;padding: 0 40upx;box-sizing: border-box; text-align:right;}

.icon-arrow-right{color: #8792A8;font-size: 32upx;}
.item_l{margin: 0 40upx;width: 670upx;padding: 25upx 40upx;box-sizing: border-box;border-radius: 16upx;margin-bottom: 20upx;}

.userinfo{}
.userinfo .user_text{margin-left: 30upx;}
.userinfo .user_text .name{font-size: 38upx;color: #FFFFFF;line-height: 120upx;}
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
