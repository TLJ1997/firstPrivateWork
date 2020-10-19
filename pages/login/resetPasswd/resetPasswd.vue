<template>
	<view class="container hi-columns" :style="backgroundALL == '#1c1f22'?'background:#18253D;':'background:#F0F3F5;'">
		<!-- 标题栏 -->
		<view class="muen_header hi-columns" :style="'padding-top:'+statusBarH+'px;'">
			<view class="hi-rows hi-flex-vcenter  hi-space-between">
				<view class="hi-rows hi-flex-vcenter">
					<image :src="hb_status?'../../../static/home/nav_icon_close_day.png':'../../../static/home/nav_icon_close_night.png'"
					 mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
				</view>
				<view class="hi-rows hi-flex-vcenter">
					<text :style="hb_status?'color: #242833;font-size: 24upx;':'color: #ffffff;font-size: 24upx;'" @click="loginType()" ></text>
				</view>
			</view>
		</view>
		<view class="header_title_box hi-columns hi-flex-vcenter">
			<view class="header_item hi-rows hi-flex-vcenter" style="align-self: flex-start;">
				<text class="t1" :style="hb_status?'color: #242833;font-size: 48upx;':'color: #ffffff;font-size: 48upx;'">{{$t('login.yzsjhyzm')}}</text>
				<!-- <text class="t1" :style="hb_status?'color: #242833;font-size: 58upx;':'color: #ffffff;font-size: 58upx;'"></text> -->
			</view>
			<view class="header_item hi-rows" style="align-self: flex-start;margin-top: 40upx;">
				<text style="font-size: 22upx;color: #8792A8;">{{$t('login.qsyyzcdsjh')}}</text>
			</view>
		</view>
		
		
		
		
		<view class="hi-columns" style="margin-top: 60upx;padding: 0 60upx;box-sizing: border-box;">
			
			<view class="input_item hi-rows hi-flex-vcenter" :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);margin-bottom: 30upx;':'border-bottom: 1upx solid rgba(255,255,255,.1);margin-bottom: 30upx;'">
				<input type="text" value="" v-model="Phone.MobilePhone" @input="phoneChange" :placeholder="input_phone" placeholder-style="color:#8792A8;" :style="hb_status?'color: #242833;':'color: #ffffff;'" />
					<image :src="hb_status?'../../../static/home/nav_icon_close_day.png':'../../../static/home/nav_icon_close_night.png'"
					 mode="" style="width:30upx;height: 30upx;margin-right: 30upx;" @click="delPhone()"></image>
					 <text class="yzm_btn" @click="isshowverify=true" :style="Phone.status?'color: #4966F5;':''">{{vcodeBtnName}}</text>
			</view>
			<view class="input_item hi-rows hi-flex-vcenter" :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);':'border-bottom: 1upx solid rgba(255,255,255,.1);'">
				<input type="number" value="" v-model="yzm" @input="yzmChange" :placeholder="input_code" placeholder-style="color:#8792A8;" :style="hb_status?'color: #242833;':'color: #ffffff;'" />
			</view>

			<view class="btns_box" @click="Login_btn()" :style="Phone.status&&yzm!=''?'background: #3A74FC;color: #FFFFFF;':''">{{$t('login.xyb')}}</view>
			
		</view>
		
		<!--登录验证框-->
		<logindialog :isshow="isshowverify" @verfy="verify" @close="closeverify"></logindialog>
		
	</view>
</template>

<script>
	var This;
	import logindialog from '@/components/logindialog.vue'	
	import md5 from '@/static/js/md5.min.js'
	
	export default {
		components:{
			logindialog
		}, 
		data() {
			return {
				input_phone:this.$t('login.qsrsjhm'),
				input_code:this.$t('login.qsr_code'),
				
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				paddingBottom:0,//判断苹果X底部高度
				isyichu:false,
				isLoginType:true,  // true 快捷登录    false账号登录
				vcodeBtnName: this.$t('login.hq_code'),
				countNum : 60,//倒计时时间
				countDownTimer : null,//定时器
				Phone:{
					MobilePhone:"",
					status:false
				},
				Passwd:{
					Passwd:"",
					status:false
				},
				Passwdok:{
					Passwd:"",
					status:false
				},
				dtyzm:{
					yzm:"",
					status:false
				},
				yqm:'',
				yzm:'',
				isshowverify:false,//是否显示验证对话框
				isverify:false//验证对话框是否已经验证
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
		},
		methods: {
			reg_btn(){   //注册账号或者忘记密码
				if(this.isLoginType){
					 uni.navigateTo({
					 	url:"reg/reg"     //注册
					 })
				}else{
					uni.navigateTo({
						url:"resetPasswd/resetPasswd"   //忘记密码
					})
				}
			},
			delPasswdok(){ //清空确认密码
				this.Passwdok.Passwd='';
			},
			PasswdokChange(e){ //输入确认密码
				this.Passwdok.Passwd=e.detail.value;
			},
			delPasswd(){  //清空密码
				this.Passwd.Passwd='';
			},
			PasswdChange(e){  //输入密码
				this.Passwd.Passwd=e.detail.value;
			},
			delPhone(){  //清空手机号码
				this.Phone.MobilePhone=''
				this.Phone.status=false;
			},
			loginType(){  //切换登录方式
				uni.reLaunch({
					url:"../login"
				})
			},
			phoneChange(e){  //输入手机号码
				this.checkPhone(e.detail.value)
				
				console.log(JSON.stringify(e.detail.value))
				
			},
			checkPhone(phone){  //手机号码正则
				
				if(!(/^1[3456789]\d{9}$/.test(phone))){ 
					
				       /* uni.showToast({
				        	title:"手机号码错误",
							icon:"none",
							mask:true,
							duration:1500
				        })
				        return false; */
						this.Phone.status=false;
				}else{
					this.Phone.status=true;
				} 
				
				
			},
			verify:function(isverify){
				//alert(isverify)
				
				this.isverify=isverify;
				if(isverify){
					this.getVCode();
					this.isshowverify=false;
				}
			},
			closeverify:function(){
				this.isverify=false;
				this.isshowverify=false;
			},
			 getVCode : function(){//获取验证码
			 let This=this;
				 if(this.Phone.status){
					 var myreg=/^[1][1,2,3,4,5,7,8,9][0-9]{9}$/;
					 if (!myreg.test(this.Phone.MobilePhone)){
					 	uni.showToast({ title: This.$t('login.qzqsrsjhm'), icon : "none"});
					 	return false;
					 }
					 var t = this;
					 var t=this;
					 this.req('user/mobileNumber',{
					   mobileNumber: this.Phone.MobilePhone,
					   mobileStrMd5: md5(this.Phone.MobilePhone+'/KxCc7MZFtD3riDQhucyDHohMcMUqHpjvXtmjhvJvj3gHc9SiHxo6')
					 },function(res){
					 		if(res.data.success){
								 // 手机号码为 :  this.phoneno
								 // vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
								 if (t.vcodeBtnName != This.$t('login.hq_code') && t.vcodeBtnName != '重新发送'){return ;}
								 t.vcodeBtnName = This.$t('login.fasong');
								 // 与后端 api 交互，发送验证码 【自己写的具体业务代码】
								 // 假设发送成功，给用户提示
								 uni.showToast({ title: This.$t('login.fasongdaunxin'), icon : "none"});
								 // 倒计时
								 t.countNum = 60;
								 t.countDownTimer = setInterval(function(){t.countDown();}.bind(t), 1000);
							}
						})
						
						
				 }
				 
				
			},
			countDown : function(){
				let This=this;
				if (this.countNum < 1){
				  clearInterval(this.countDownTimer);
				  this.vcodeBtnName = This.$t('login.cxfs');
				  return ;
				}
				this.countNum--;
				this.vcodeBtnName =  this.countNum +  This.$t('login.mcf');
			},
			yzmChange(e){
				this.yzm=e.detail.value;
			},
			Login_btn(){
				this.checkPhone(this.Phone.MobilePhone);
				if(this.Phone.status&&this.yzm!=''){
					
						uni.navigateTo({
							url:"resetPasswd1?Phone="+this.Phone.MobilePhone+"&yzm="+this.yzm
						})
						
					
					
					// uni.showToast({
					// 	title:"下一步",
					// 	mask:true,
					// 	duration:1500,
					// 	icon:"success"
					// })
					
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

	
	
	.input_item{height: 104upx;line-height: 104upx;margin-bottom: 60upx;}
	.input_item input{flex: 1;padding-right: 30upx;box-sizing: border-box;color: #FFFFFF;font-size: 30upx;}
	.input_item .yzm_btn{color: #8792A8;font-size: 30upx;}
	.input_item .info{color: #8792A8;font-size: 30upx;}
	
	.input_item .dtyzm{color: #8792A8;font-size: 30upx;width: 180upx;height: 60upx;text-align: center;line-height: 60upx;background:rgba(192,196,204,.2);border-radius: 30upx;}
	
	.reg_btn_box{margin-bottom: 100upx;}
	.reg_btn_box .reg_btn{color: #4966F5;font-size: 22upx;}
	.btns_box{width: 100%;height: 100upx;border-radius: 50upx;background:#8DAFFC;line-height: 100upx;text-align: center;font-size: 36upx;color: #FFFFFF;transition: all .3s;}
	

	.alert_maks{width: 100%;height: 100%;position: fixed;top: 0;left: 0;z-index: 99998;transition: all .3s;}
	.alert_yichu_box{background: #FFFFFF;width:630upx;display: inline-flex;position:fixed;z-index: 99999;top: 50%;left:60upx;margin-top: -265upx;padding: 40upx;box-sizing: border-box;border-radius: 20upx;transition: all .3s;}
	.alert_yichu_box .title{width: 100%;font-size: 36upx;text-align: center;margin-bottom: 50upx;}
	.alert_yichu_box .con{color: #6E778A;font-size: 30upx;line-height: 48upx;margin-bottom: 55upx;}
	.alert_yichu_box .btn{width:240upx;height:70upx;line-height: 70upx; border-radius: 35upx;text-align: center;background: #3A74FC;font-size: 32upx;color: #FFFFFF;margin-left: 155upx;}
	.alert_maks.active{display: none;}
	.alert_yichu_box.active{display: none;}
	
</style>
