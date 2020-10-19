<template>
	<view class="container" :style="hb_status?'height: 100vh;background:#ffffff;':'background:#05060F;'"> 
		<view class="header hi-columns" :style="'padding-top: '+statusBarH+'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'" mode=""
				 style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view :style="hb_status?'color:#000000':'color:#ffffff'" style="font-size: 37upx;">{{$t('wo.ssmm')}}</view>
			</view> 
		</view>
		<view class="content hi-columns" :style="hb_status?'height: 100vh;background:#F0F3F5;padding-top:'+(header_H)+'px;':'background:'+backgroundALL+';padding-top:'+(header_H)+'px;'">
			<view class="set_text_title" :style="hb_status?'color:#000000':'color:#ffffff'"></view>

			
			<!-- <view class="item_l hi-columns " :style="backgroundALL == '#1c1f22'?'background: #18253D;':'background: #ffffff;'"> -->
			<view class="item_l hi-columns ">
				<view class="ss_title hi-rows hi-flex-center">{{text}}</view>
				 <mpvue-gesture-lock :containerWidth="590" :cycleRadius="70" @end="onEnd" :password="password"></mpvue-gesture-lock>
			</view>

		</view>
		  
		

	
		
		
	</view>
</template>
 
<script>
	    import mpvueGestureLock from '@/components/mpvueGestureLock';
	var This;
	export default {
		components: {
		            mpvueGestureLock
		        },
		data() {
			return {
				backgroundALL:'',
				colorALL:'',
				statusBarH: '',
				windowHeight:0,
				header_H:0,
				hb_status:true, //true 白色   false 黑色	
				title : this.$t('wo.ssta'),
				password: [],
				text: this.$t('wo.ssryssmm'),
				passwdnum:1,
				yuanshimima:'123456'//原始密码

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
		onEnd(data) {
			

			if(this.passwdnum==1){
				
					if (data.join('') == this.yuanshimima) {
						this.text = this.$t('wo.qsrxssmm')
						this.passwdnum=2;
						console.log(data.join(''))
						console.log('原始密码正确')
					}else{
						this.text = this.$t('wo.ysmmcw')
							console.log('原始密码错误')
					}

				
			}else if(this.passwdnum==2){
				
				if (data.join('').length>=5) {
					this.text = this.$t('wo.qcxsrxssmm')
					this.passwdnum=3;
					this.password.push(data.join(''));
				}else{
					this.text = this.$t('wo.mmqsrwwsys')
				}
				
				
			}else if(this.passwdnum==3){
				if (data.join('').length>=5 && data.join('') ==this.password[0]) {
					this.text = this.$t('wo.xssmmszwc')
				}else{
					this.text = this.$t('wo.lcmmbyzqcxsrxmm')
					this.passwdnum=2
				}
			}
			
			// if (this.password.length) {
			// 	if (this.password.join('') === data.join('')) {
			// 		this.text = '手势设定完成'
			// 		this.password = []
			// 	} else {
			// 		this.text = '两次手势设定不一致'
			// 		this.password = []
			// 	}
			// } else {
			// 	this.text = '请确认手势设定'
			// 	this.password = data
			// }
			
			
			
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
	   .uni-text{
	        font-size: 30upx;
	        text-align: center;
	        margin-top: 30upx;
	    }
	
	
	page{height: 100%;}
.container{width: 100%;height: 100%;background: #F0F3F5;}

.header {padding: 0 30upx;box-sizing: border-box;position: fixed;width: 100%;left: 0;top: 0;z-index: 99999;}
.header .header_box {height: 88upx;}

.content{flex: 1;width: 100%;overflow:auto;box-sizing: border-box;height: 100%;}

.set_text_title{font-size: 48upx;width: 100%;margin: 30upx 0;padding: 0 40upx;box-sizing: border-box;font-weight: bold;margin-bottom: 215upx;}

.icon-arrow-right{color: #8792A8;font-size: 32upx;}
.item_l{margin: 0 40upx;width: 670upx;padding: 25upx 40upx;box-sizing: border-box;border-radius: 16upx;margin-bottom: 20upx;}


.yd_box{display: inline-flex; width: 16upx;height: 16upx;border-radius: 8upx;background:#E64340;position: relative;top: -30upx;right: -5upx;}


.ss_title{font-size: 24upx;color: #3A74FC;margin-bottom: 30upx;}

</style>
