<template>
	<view class="container" :style="hb_status?'height: 100vh;background:#ffffff;':'background:#05060F;'"> 
		<web-view src="http://p.qiao.baidu.com/cps/chat?siteId=15663487&userId=29120886&siteToken=bfc68a686f1bf5690eff5162c8a386d6"></web-view>
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
