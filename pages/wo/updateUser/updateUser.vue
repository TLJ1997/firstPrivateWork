<template>
	<view class="container" :style="hb_status?'background:#FFFFFF;':'background:#18253D;'">
		<view class="muen_header hi-columns" :style="'padding-top:'+statusBarH+'px;'">
			<view class="hi-rows hi-flex-vcenter  hi-space-between">
				<view class="hi-rows hi-flex-vcenter">
					<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'" mode=""
					 style="width:46upx;height: 46upx;" @click="Back()"></image>
				</view>
				<view class="hi-rows hi-flex-vcenter">
					<text :style="hb_status?'color: #242833;font-size: 24upx;':'color: #ffffff;font-size: 24upx;'" @click="loginType()" ></text>
				</view>
			</view>
		</view>
		<view class="header_title_box hi-columns hi-flex-vcenter">
			<view class="header_item hi-rows hi-flex-vcenter" style="align-self: flex-start;">
				<text class="t1" :style="hb_status?'color: #242833;font-size: 48upx;':'color: #ffffff;font-size: 48upx;'">{{$t('wo.xgnc')}}</text>
				<!-- <text class="t1" :style="hb_status?'color: #242833;font-size: 58upx;':'color: #ffffff;font-size: 58upx;'"></text> -->
			</view>
			<view class="header_item hi-rows" style="align-self: flex-start;margin-top: 40upx;">
				<text style="font-size: 22upx;color: #8792A8;"></text>
			</view>
		</view>
		
		
		<view class="input_item hi-rows hi-flex-vcenter" :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);margin-bottom: 80upx;':'border-bottom: 1upx solid rgba(255,255,255,.1);margin-bottom: 80upx;'">
			<input type="text"  value="" v-model="username"  @input="userChange" :placeholder="input_name" placeholder-style="color:#8792A8;" :style="hb_status?'color: #242833;':'color: #ffffff;'" />
		</view>
		
		
		<view class="btns_box" @click="save_btn()" style="background: #3A74FC;color: #FFFFFF;">{{$t('wo.bc')}}</view>
		
	</view>
</template>

<script>
		var This;
	export default {
		data() {
			return {
				input_name:this.$t('wo.xgnc'),
				nickname:'',
				backgroundALL:'',
				colorALL:'',
				statusBarH: '',
				windowHeight:0,
				header_H:0,
				hb_status:true, //true 白色   false 黑色
				paddingBottom:0,//判断苹果X底部高度
				username:''
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
			console.log(this.colorALL)
			this.username = uni.getStorageSync("nickname")
		},
		methods: {
			save_btn(){
				console.log(this.username)
					if(this.username == ''){
						this.myAlert('请输入新昵称')
						return false
					}
					uni.showLoading({
						title: '设置中...',
						mask: true
					})
					var quanbu = {
						token:uni.getStorageSync('token'),
						userId:uni.getStorageSync('id'),
						newNickname:this.username
					}
					console.log(quanbu)
					uni.request({
						url: this.websiteUrl + 'user/changeNickname',
						method: "POST",
						data:quanbu,
						header: {
							'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
						},
						success: (res) => {
							uni.hideLoading()
							console.log(res)
							if (res.data.code == 200) {
								this.myAlert(res.data.msg)
								setTimeout(function(){
									uni.navigateBack({
										delta:1
									})
								},1500)
								
								this.myAlert(res.data.msg)
								uni.setStorageSync('nickname',this.username);
								
							}
					
					
							
					
					
						}
					
					})
				
				
			},
			userChange(e){  //输入用户名
				this.username=e.detail.value;
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
	.container {width: 100%;height: 100%;overflow: hidden;box-sizing: border-box;}
	.muen_header>view {height: 88upx;padding: 0 40upx;box-sizing: border-box;}
	.header_title_box {padding: 0 40upx;box-sizing: border-box;margin: 20upx 0;}
	.header_title_box .header_item {text-align: center;}
	.header_title_box .header_item .t1 {font-size: 48upx;color: #FFFFFF;font-weight: bold;}
	.header_title_box .header_item .t2 {color: #8792A8;font-size: 22upx;margin-left: 19upx;}
	.header_title_box .header_item .h_btn {color: #3A74FC;border: 1upx solid #3A74FC;width: 120upx;height: 58upx;border-radius: 29upx;line-height: 58upx;}


.input_item{height: 104upx;line-height: 104upx;margin: 0 40upx;margin-bottom: 80upx;box-sizing: border-box;}
	.input_item input{flex: 1;padding-right: 30upx;box-sizing: border-box;color: #FFFFFF;font-size: 30upx;}
	.input_item .yzm_btn{color: #8792A8;font-size: 30upx;}
	.input_item .info{color: #8792A8;font-size: 30upx;}
	
	.input_item .dtyzm{color: #8792A8;font-size: 30upx;width: 180upx;height: 60upx;text-align: center;line-height: 60upx;background:rgba(192,196,204,.2);border-radius: 30upx;}
	
	.reg_btn_box{margin-bottom: 100upx;}
	.reg_btn_box .reg_btn{color: #4966F5;font-size: 22upx;}
	.btns_box{height: 100upx;border-radius: 50upx;background:#8DAFFC;line-height: 100upx;text-align: center;font-size: 36upx;color: #FFFFFF;transition: all .3s;margin: 0 40upx;}


</style>
