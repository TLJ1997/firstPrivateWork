<template>
	<view class="container" :style="hb_status?'height: 100vh;background:#ffffff;':'background:#05060F;'"> 
		<view class="header hi-columns" :style="'padding-top: '+statusBarH+'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'" mode=""
				 style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				 <view :style="hb_status?'color:#000000':'color:#ffffff'" style="font-size: 37upx;text-align: center;font-weight: bold;">{{$t('afanda.mj')}}</view>
				 <view style="" @tap="shangbi">{{$t('afanda.sbsq')}}</view>
			</view>
		</view>
		<view class="coinxz">
			<view v-for="(item, index) in items" :key="index" @tap="onClickItem(index)" :class="{ active: coinxzindex == index }" style="overflow: hidden;white-space: nowrap; text-overflow: ellipsis;">{{ item }}</view>
		</view>
		<view class="contbox">
			<view class="contentwai">
				<view class="onffbox">
					<view class="bagghe" v-for="(item, index) in gethos" :key="index">
						<view style="display: inline-flex; width: 100%;">
							<view  style="width: 50%; margin-top: 30upx;">
								<view style=" font-weight: bold;width: 85%;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">{{item.type}}</view>
								<view style="font-size:25upx; color:#999; margin-top: 20upx;">{{item.value}} -> {{item.duihuanshuliang}}</view>
							</view>
							<view  style="width: 50%; margin-top: 30upx;">
								<view style=" font-weight: bold; text-align: right; color: green;">{{item.time}}</view>
								<view style="font-size:30upx; color: #3591c4; margin-top: 20upx;text-align: right;">{{item.zhuangtai}}</view>
							</view>
							<!-- <view style="width: 50%; line-height: 150upx; text-align:right ;">
								<text style="color: #000000; font-weight: bold;"><text style="color: #a2927b;"> {{item.time}} </text></text>
							</view> -->
						</view>
					</view>
					<view style="color: #999; text-align: center; width: 100%; line-height: 80upx; justify-content: center;text-align: center;" v-if="gethos == '' || gethos == null ">
						<!-- <image src="../../static/img/zanwu.png" mode="" style="width: 180upx; height: 180upx;"></image> -->
						<view style="width: 100%; text-align: center;color: #999; font-size: 21upx;">{{$t('afanda.zwsj')}}</view>				
					</view>
					<view style="height: 200upx;"></view>
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
				items: [
					this.$t('afanda.shz'),
					this.$t('afanda.dtmj'),
					this.$t('afanda.mjz'),
					this.$t('afanda.mjjs')
				],		
				colors: [
					'#999',
					'#4cd964',
					'#dd524d'
				],
				coinxzindex:0,
				activeColor: '#000',
				name:'',
				gethos:[],
				address:'',
				bitype:'',
				beijing:'../../../static/wallet/bg_totalassets.png',
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
		 //this.$toggleLang('English');
		let This = this;
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
			var setdata = {
				"token":uni.getStorageSync("token"),
				"id":uni.getStorageSync("userId")
			}
			console.log(setdata)
			
		},
		methods: {
			shangbi(){
				uni.navigateTo({
					url:'../shangbi/shangbi'
				})
			},
			onClickItem(index) {
				this.coinxzindex = index;
				console.log(index)
				this.gethoslist(this.address,this.coinxzindex)
				
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

<style lang="scss">
	.btns {
		display: flex;
		height: 88upx;
		line-height: 88upx;
		width: 90%;
		justify-content: center;
		background: #F8C94A;
		color: #FFF;
		border-radius: 14upx;
		font-size: 31upx;
	}
	.budaowen{
		width: 100%;
		height: 90upx;
		border-bottom: 1upx solid #E5E8F3;
	}
	.xuanzewen{
		display: inline-flex;
		width: 100%;
		height: 90upx;
		line-height: 90upx;
	}
	.to {
		flex-shrink: 0;
		width: 30upx;
		height: 30upx;
	}
	.buwen{
		width: 80%;
		line-height: 90upx;
		font-weight: bold;
	}
	.xiaotu{
		width: 20%;
		padding-top: 20upx;
	}
	.xiaotu image{
		width: 50upx;
		height: 50upx;
	}
	.contbox{
		margin-top: 90upx;
	}
	.onffbox{
		width: 100%;
	}
	.bagghe{
		padding: 0 30upx;
		box-sizing: border-box;
		height: 150upx;
		border-bottom:1upx solid #f5f5f5;
	}
	.coinxz{
		position: fixed;
		width: 100%;
		top: 130upx;
		left: 0;
		display: flex;
		justify-content: space-around;
		border-bottom: 1upx #F6F8FF solid;
		background-color: #FFFFFF;
	}
	.coinxz .active{
		border-bottom:5upx solid #0080FF;
		color: #0080FF;
		font-weight: bold;
		font-size: 30upx;
	}
	.coinxz view{
		
		text-align: center;
		height: 80upx;
		line-height: 80upx;
		font-size: 30upx;
	}
	page{
		background: #fff;
	}
	.container{
		position:relative;
		width: 100vw;
	}
	.tuanshouyi{
		padding-top: 30upx;
	}
	.diantuanbox{
		padding: 30upx;
	}
	.tuandianyi{
		width: 50%;
		float: left;
	}
	.onebox{
		height: 80upx;
		line-height: 80upx;
		width: 100%;
		display: block;
		margin-top: 20upx;
	}
	.youtuan{
		width: 50%;
		float: left;
	}
	.tuanone{
		font-size: 28upx;
		float: left;
		background:linen;
		width:80%;
		border-radius: 30upx;
		text-align: center;
	}
	.tj-sction{
		border-bottom: 1upx solid #f5f1ea;
		 display:flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
		.tj-item{
			 display:flex;
			 position: relative;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			font-size: 30upx;
			color: #000;
			background-color:#FFF;
			margin-bottom: 40upx;
			border-radius: 10upx;
			width: 40%;
		}
		.num{
			font-size:30upx;
			color: #FFF;
			margin-bottom: 8upx;
		}
	}
	page{height: 100%;}
.container{width: 100%;height: 100%;background: #F0F3F5;}

.header {padding: 0 30upx;box-sizing: border-box;position: fixed;width: 100%;left: 0;top: 0;z-index: 99999;}
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
