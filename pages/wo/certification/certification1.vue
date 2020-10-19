<template>
	<view class="container hi-columns" :style="backgroundALL == '#1c1f22'?'background:#18253D;':'background:#F0F3F5;'">
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
		<view class="header_title_box hi-columns hi-flex-vcenter">
			<view class="header_item hi-rows hi-flex-vcenter" style="align-self: flex-start;">
				<text class="t1" :style="hb_status?'color: #242833;font-size: 48upx;':'color: #ffffff;font-size: 48upx;'">{{$t('wo.smrz')}}</text>
				<text class="t1" style="font-size: 22upx;color: #8792A8;align-self: flex-start;margin-top: 40upx;margin-left: 20upx;">{{$t('wo.smhbkxg')}}</text>
			</view>
			<!-- <view class="header_item hi-rows" style="align-self: flex-start;margin-top: 40upx;"> -->
				<!-- <text style="font-size: 48upx;color: #3A74FC;">中国</text> -->
			<!-- </view> -->
		</view>
		
		
		
		
		<view class="hi-columns" style="margin-top: 60upx;box-sizing: border-box;">
			
			<view class="input_item hi-rows hi-flex-center hi-flex-vcenter" :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);margin-bottom: 30upx;':'border-bottom: 1upx solid rgba(255,255,255,.1);margin-bottom: 30upx;'">
				<view class="hi-columns hi-flex-vcenter box_add" >
					
					<block v-if="CardImg.Cardz">
						<image class="fsz_img" :src="CardImg.Cardz" mode=""></image>
					</block>
					<block v-else>
						<image class="z_icon_bj" src="../../../static/wo/icon_just.png" mode=""></image>
						<text class="text_info">{{$t('wo.tjsfzttxym')}}</text>
					</block>
					<image class="add_btn" src="../../../static/wo/icon_add.png" @click="add_btn('z')" mode=""></image>
				</view>
			</view>
			<view class="input_item hi-rows hi-flex-center hi-flex-vcenter" :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);margin-bottom: 80upx;':'border-bottom: 1upx solid rgba(255,255,255,.1);margin-bottom: 80upx;'">
				<view class="hi-columns hi-flex-vcenter box_add">
					<block v-if="CardImg.Cardf">
						<image class="fsz_img" :src="CardImg.Cardf" mode=""></image>
					</block>
					<block v-else>
						<image class="z_icon_bj" src="../../../static/wo/icon_back.png" mode=""></image>
						<text class="text_info">{{$t('wo.tjsfzdghym')}}</text>
					</block>
					
					<image class="add_btn" src="../../../static/wo/icon_add.png" mode="" @click="add_btn('f')"></image>
				</view>
			</view>

			<view class="btns_box" @click="Login_btn()" :style="userinfo.username!='' && Card.IDCard!='' ?'background: #3A74FC;color: #FFFFFF;':''">{{$t('wo.tj')}}</view>
			
		</view>
		

		<view class="alert_box hi-rows hi-flex-vcenter hi-flex-center" v-show="ishide">
			<view class="mask_box" @tap="upgradebtn()" :style="hb_status?'background:rgba(255,255,255,.3);':'background:rgba(0,0,0,.3);'"></view>
			<view class="content_box hi-columns hi-flex-center hi-space-between" :style="backgroundALL == '#1c1f22'?'background: #2d3033;':'background: #ffffff;'">
				<view class="text_box hi-rows hi-flex-center" :style="backgroundALL == '#1c1f22'?'color: #ffffff;':'color: #292C33;'">{{$t('wo.tjcg')}}</view>
				<view class="hi-rows hi-flex-center" style="color: #8792A8;font-size: 28upx;margin-bottom: 40upx;margin-top: 20upx;">{{$t('wo.wcsh')}}</view>
				
				<view class="btn_box hi-columns hi-flex-vcenter hi-flex-center hi-space-between">
					<view @click="upgrade()" style="width: 240upx;">{{$t('wo.wzdl')}}</view>
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
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				paddingBottom:0,//判断苹果X底部高度
				isyichu:false,
				ishide:false,  //是否有显示
				username:'',
				IDCard:'',
				CardImg:{
					Cardz:'',
					Cardf:''
				}

			}
		},
		onLoad(e) {
			console.log(e) 
			this.username=e.username;
			this.IDCard=e.IDCard;
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
		},
		methods: {
			upgrade(e){
				let This=this;
				if(e==0){
					this.upgradebtn();
					console.log('取消')
				}else{
					
					uni.showToast({
						title:This.$t('wp.tjcg'),
						duration:1000,
						icon:"success"
					})
					
					this.upgradebtn();
					console.log('确定')
				}
			},
			upgradebtn(){
				this.ishide=!this.ishide;
			},
			add_btn(e){
				
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['camera','album'], //从相册选择
				    success: function (res) {
						
						if(e=='z'){
							This.CardImg.Cardz=	res.tempFilePaths[0];

						}else{
							This.CardImg.Cardf=	res.tempFilePaths[0];
							
						}
						
				        console.log(JSON.stringify(res.tempFilePaths[0]));
				    }
				});	
				
				
			},
			
			Login_btn(){
				
				if(this.CardImg.Cardz!='' && this.CardImg.Cardf!='' && this.username!='' && this.IDCard!=''){
					this.upgradebtn();
					console.log('姓名：'+this.username)
					console.log('身份证号：'+this.IDCard)
					console.log('身份证正面：'+this.CardImg.Cardz)
					console.log('身份证反面：'+this.CardImg.Cardf)
					
				}else{
					
					uni.showToast({
						title:"信息请填写完整",
						duration:1000,
						icon:"success"
					})
					
				}
					
				
			},
			yichubz_btn(){ //溢出显示隐藏
			
				this.isyichu=!this.isyichu
				console.log(this.isyichu)
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
	.header_title_box .header_item .t2 {color: #8792A8;font-size: 22upx;margin-left: 19upx;}
	.header_title_box .header_item .h_btn {color: #3A74FC;border: 1upx solid #3A74FC;width: 120upx;height: 58upx;border-radius: 29upx;line-height: 58upx;}

	
	
	.input_item{width:670upx;height:420upx;background:rgba(192,196,204,.2);border-radius:20upx;margin: 0 40upx; margin-bottom: 60upx;}
	.box_add{position: relative;}
	.z_icon_bj{width: 200upx;height: 200upx;}
	.text_info{font-size: 20upx;color: #8792A8;}
	.box_add .add_btn{width: 80upx;height: 80upx; position: absolute;left: 50%;top: 60upx;margin-left: -40upx;}
	.fsz_img{width:670upx;height:420upx;}

	.btns_box{width: 670upx;height: 100upx; margin-left: 40upx; border-radius: 50upx;background:#8DAFFC;line-height: 100upx;text-align: center;font-size: 36upx;color: #FFFFFF;transition: all .3s;}
	

	/* 弹出对话框 */
	.alert_box{position: fixed;top: 0;left: 0;width: 100%;height: 100%;padding: 0 43upx;box-sizing: border-box;z-index: 999999999999999999999999999999;}
	.alert_box .mask_box{background: rgba(0,0,0,.2);height: 100%;width: 100%;position: absolute;top: 0;left: 0;}
	.alert_box .content_box{width:630upx;height: 350upx;border-radius: 20upx;position: relative;z-index: 99999;padding: 40upx 60upx;box-sizing: border-box;}
	.alert_box .content_box .text_box{width:100%;font-size: 36upx;color: #FFFFFF;padding-top: 30upx;}
	.alert_box .content_box .btn_box view{text-align: center;height: 70upx; line-height: 70upx;border-radius: 35upx;width: 240upx; box-sizing: border-box;}
	.alert_box .content_box .btn_box view{background: #3A74FC;color: #FFFFFF;} 
</style>
