<template>
	<view class="container" :style="hb_status?'background:#ffffff;':'background:#05060F;'"> 
		<view class="header hi-columns" :style="'padding-top: '+statusBarH+'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'" mode=""
				 style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view class="set_text_title" :style="hb_status?'color:#000000':'color:#ffffff'">{{$t('wo.tjyhk')}}</view>
			</view> 
		</view>
		<view class="content hi-columns" :style="hb_status?'height: 100vh;background:#F0F3F5;padding-top:'+(header_H)+'px;':'background:'+backgroundALL+';padding-top:'+(header_H)+'px;'">
			<view class="content-section">
				<view class="content_text_title" :style="hb_status?'color:#000000':'color:#ffffff'">{{$t('wo.bdckryhk')}}</view>
				<view class="section-pay" :style="hb_status?'color:#000000':'color:#fff'">
					<view class="collection-name">
						<view class="lable" style="overflow: hidden;white-space: nowrap; text-overflow: ellipsis;">{{$t('wo.khh')}}</view>
						<view class="input">
							<picker @change="bindPickerChange" :value="index" :range="array">
									<view class="uni-input" style="font-size:36upx">{{array[index]}}</view>
							</picker>
						</view>
						<text class="grace-icons icon-arrow-down settings-item-value"></text>
					</view>
					<view class="collection-name"><view class="lable" style="overflow: hidden;white-space: nowrap; text-overflow: ellipsis;">{{$t('wo.khzh')}}</view><input v-model="bankInfo" :placeholder="input_khzh" /></view>
					<view class="collection-name"><view class="lable" style="overflow: hidden;white-space: nowrap; text-overflow: ellipsis;">{{$t('wo.ckr')}}</view><input v-model="name" :placeholder="input_name" /></view>
					<view class="collection-name"><view class="lable" style="overflow: hidden;white-space: nowrap; text-overflow: ellipsis;">{{$t('wo.kh')}}</view><input v-model="number" :placeholder="input_yhk" /></view>
					<button class="add-btn" @click="add">{{$t('wo.ljtj')}}</button>
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
				input_khzh:this.$t('wo.qsrkhhzh'),
				input_name:this.$t('wo.qsrckrxm'),
				input_yhk:this.$t('wo.ckrbryhkh'),
				backgroundALL:'',
				colorALL:'',
				statusBarH: '',
				windowHeight:0,
				header_H:0,
				hb_status:true, //true 白色   false 黑色	
				isRealName:true,
				array: [this.$t('wo.jsyh'), this.$t('wo.zgnyyh'),this.$t('wo.zggsyh'),this.$t('wo.zgjtyh'),this.$t('wo.zgzsyh')],
				index: 0,
				name: '',
				number: '',
				bankInfo: ''
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
		},
		onReady() {
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
			bindPickerChange: function(e) {
					this.index = e.target.value
			},
			exit_btn(){
				uni.navigateBack({  //后退按钮
					delta:1
				})
			},
			add(){
				let This=this;
				if(this.bankInfo==''){
					this.myAlert(This.$t('wo.qsrkhhzh'));
					return false;
				}
				if(this.number==''){
					this.myAlert(This.$t('wo.ckrbryhkh'));
					return false;
				}
				if(this.name==''){
					this.myAlert(This.$t('wo.qsrckrxm'));
					return false;
				}
				uni.request({
						url: this.websiteUrl + 'user/bindPayInfo',
						method: 'POST',
						data: {
							"token": uni.getStorageSync("token"),
							"userId": uni.getStorageSync("id"),
							"type": 1,
							"bankInfo": this.bankInfo,
							"bank": this.array[this.index],
							"bankNum": this.number,
							"name": this.name
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded',
								"Accept-Language":'zh'
						},
						success: (res) => {
							if (res.data.code == 200) {
								uni.showToast({
									title: This.$t('wo.cg'),
									duration: 2000
								});
								setTimeout(()=>{
									uni.navigateBack();
								},1500)
							} else if (res.data.code == 500) {
								this.myAlert(res.data.msg)
							} else if (res.data.code == 402) {
								if (uni.getStorageSync('isOpenFingerprint') == 1 || uni.getStorageSync('isOpenGesture') == 1) {
									console.log('开启了指纹手势可以验证登录')
									uni.reLaunch({
										url: '../../../pages/indexzhiwen/indexzhiwen'
									});
								} else {
									console.log('没开启指纹手势去登录')
									uni.reLaunch({
										url: '../../../pages/login/login'
									});

								}
							}

						},
						fail: () => {
							
						}
				});
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
	.uni-text{
			font-size: 30upx;
			text-align: center;
			margin-top: 30upx;
	}
	
	
 page{min-height: 100%;}
.container{width: 100%;min-height: 100vh;background: #F0F3F5;}

.header {padding: 0 30upx;box-sizing: border-box;position: fixed;width: 100%;left: 0;top: 0;z-index: 99999;}
.header .header_box {height: 88upx;image{position: relative;}}

.content{flex: 1;width: 100%;overflow:auto;box-sizing: border-box;min-height: 100vh;}

.set_text_title{font-size: 36upx;width: 100%;margin-left: -60upx;font-weight: bold;text-align: center;}

.icon-arrow-right{color: #8792A8;font-size: 32upx;}
.item_l{margin: 0 40upx;width: 670upx;padding: 25upx 40upx;box-sizing: border-box;border-radius: 16upx;margin-bottom: 20upx;}


.yd_box{display: inline-flex; width: 16upx;height: 16upx;border-radius: 8upx;background:#E64340;position: relative;top: -30upx;right: -5upx;}

.btn{width: 670upx;margin: 0 40upx;margin-top: 140upx;border: 2upx solid #3A74FC;color: #3A74FC;text-align: center;height: 100upx; line-height: 100upx;font-size: 36upx;border-radius: 50upx;}
.content-section{
	padding: 30upx;
	.content_text_title{
		font-size: 28upx;
	}
}
.section-pay{
	.collection-name{
		margin-top: 90upx;
		font-size: 36upx;
		display: flex;
		align-items: center;
		border-bottom: 1upx solid #999999;
		padding-bottom: 30upx;
		.lable{
			font-size: 36upx;
			width: 150upx;
		}
		input, .input{
			flex: 1;
			margin-left: 24upx;
		}
	}
	.add-btn{
		margin-top: 80upx;
		background: #4397F1;
		border-radius: 14upx;
		height: 88upx;
		line-height: 88upx;
		color: #fff;
	}
}
</style>
