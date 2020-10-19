<template>
	<view class="container" :style="hb_status?'height: 100vh;background:#F0F3F5;':'background:'+backgroundALL+';'">
		<view class="header hi-columns" :style="'padding-top: '+statusBarH+'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'" mode=""
				 style="width:46upx;height: 46upx;" @click="exit_btn"></image>
				<view :style="hb_status?'color:#000000':'color:#ffffff'" style="font-size: 37upx;">{{$t('wo.grzl')}}</view>
			</view>
		</view>
		<view class="content hi-columns" :style="hb_status?'height: 100vh;background:#F0F3F5;padding-top:'+(header_H)+'px;':'background:'+backgroundALL+';padding-top:'+(header_H)+'px;'">
			<view class="set_text_title" :style="hb_status?'color:#000000':'color:#ffffff'"></view>
			

			<view class="item_l hi-columns" :style="backgroundALL == '#1c1f22'?'background: #18253D;':'background: #ffffff;'">
				<view class="items hi-rows hi-flex-vcenter hi-space-between" style="border-bottom: 1px solid rgba(0,0,0,.1);padding-bottom: 25upx;">
					<text class="title" :style="hb_status?'color:#242933':'color:#ffffff'">{{$t('wo.tx')}}</text>
					 <view class="right_box hi-rows hi-flex-vcenter">
						<avatar
							selWidth="200px" selHeight="400upx"
							:avatarSrc="userdatas" @upload="myUpload"
							avatarStyle="width:110upx;height:110upx;" >
						</avatar>
					 	<text  class="grace-icons icon-arrow-right"></text>
					 </view>
				</view>
				<navigator class="items hi-rows hi-flex-vcenter hi-space-between" style="padding: 40upx 0;" open-type="navigate" url="../updateUser/updateUser">
					<text class="title" :style="hb_status?'color:#242933':'color:#ffffff'">{{$t('wo.nc')}}</text>
					<view class="right_box hi-rows hi-flex-vcenter">
						<text class="cheched_text">{{nickname}}</text>
						<text  class="grace-icons icon-arrow-right"></text>
					</view>
				</navigator>
				<!-- <navigator class="items hi-rows hi-flex-vcenter hi-space-between" style="padding: 40upx 0;border-bottom: 1px solid rgba(0,0,0,.1);" open-type="navigate" url="../addUser/addUser">
					<text class="title" :style="hb_status?'color:#242933':'color:#ffffff'">添加账号</text>
					<view class="right_box hi-rows hi-flex-vcenter">
						<text class="cheched_text">未添账号</text>
						<text  class="grace-icons icon-arrow-right"></text>
					</view>
				</navigator>
				<view class="items hi-rows hi-flex-vcenter hi-space-between" style="padding: 40upx 0;">
					<text class="title" :style="hb_status?'color:#242933':'color:#ffffff'">我的邀请码</text>
					<view class="right_box hi-rows hi-flex-vcenter">
						<image src="../../../static/wo/erweima.png" mode="" style="width: 36upx;height: 36upx;"></image>
						<text  class="grace-icons icon-arrow-right"></text>
					</view>
				</view>
				 -->
				
			</view>
			
		
			

			
			
		</view>
		
		
		
	</view>
</template>
 
<script>
	var This;
	import avatar from "../../../components/touxiang/yq-avatar/yq-avatar.vue";
	export default {
		components: {
			avatar
		},
		data() {
			return {
				userdatas:'',
				backgroundALL:'',
				nickname:'',
				colorALL:'',
				statusBarH: '',
				windowHeight:0,
				header_H:0,
				hb_status:true, //true 白色   false 黑色

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
			this.userdatas = uni.getStorageSync("head")
			this.nickname = uni.getStorageSync("nickname")
		},
		methods: {
			myUpload(path) {  //更新头像
			    
				var This = this;
				if(uni.getStorageSync('token') == '' || uni.getStorageSync('token') ==null || uni.getStorageSync('token') ===undefined){
					uni.navigateTo({
						url: "/pages/login/login"
					});
					return false;
				}
				
					uni.showLoading({
						title:this.$t('wo.scz'),
						mask:true
					})
				console.log(this.userdatas)
				uni.uploadFile({
					url: This.websiteUrl +'user/uploadFile', //仅为示例，非真实的接口地址
					filePath: path,
					name: 'file',
					header: {
							'content-type': 'multipart/form-data' //自定义请求头信息
						},
					formData: {
						state: 0
					},
					success: (uploadFileRes) => {
						console.log(uploadFileRes);
						
						 var uploadFileRes=JSON.parse(uploadFileRes.data);
						uni.hideLoading();
						if(uploadFileRes.code==200){
							uni.showToast({
								title:this.$t('wo.sccg'),
								mask:true,
								duration:1500,
								success() {
									This.userdatas=uploadFileRes.data;
									uni.setStorageSync('head',uploadFileRes.data);
								}
							})
							uni.request({
								url: This.websiteUrl + 'user/changeHeadImg',
								method: 'POST',
								data: {
									token:uni.getStorageSync('token'),
									userId:uni.getStorageSync('id'),
									headImgUrl:uploadFileRes.data
								}, 
								header: {
									'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
								},
								success: (res) => {
									console.log(res)
									
									if (res.data.code == 200) {
										
									} else{
										
									}
									
								},
								fail: () => {
									
								}
							});
					
						} 
						
			
						console.log(JSON.stringify(uploadFileRes));
					}
				});		
				
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



</style>
