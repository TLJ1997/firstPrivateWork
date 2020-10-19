<template>
	<view class="container hi-columns" :style="hb_status?'background:#FFF;':'background:#05060F'">
		<view class="header hi-columns">
			<view class="hi-columns" :style="'height:'+statusBarH+'px;width: 100%;'"></view>
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<image :src="hb_status?'../../../static/home/nav_icon_back_night.png':'../../../static/home/nav_icon_back_night.png'"
				 mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
				<view style="color: #FFF;font-size: 32upx;" @click="paihang()">{{$t('wo.phb')}}</view>
			</view>
			<view class="nav_box hi-columns">
				<scroll-view class="grace-scroll-x hi-flex-vcenter hi-flex-center" scroll-x :scroll-into-view="'view'+bizhong.index"
				 style="width: 670upx;height: 100upx;">
					<view class="item hi-columns hi-flex-vcenter hi-flex-center" :id="'view'+item.id" :class="bizhong.index==index?'active':''"
					 v-for="(item,index) in bizhong.list" :key="index" @click="nav_bizhong(index)">
						<text>{{item.name}}</text>
						<view :class="bizhong.index==index?'yd':''"></view>
					</view>
				</scroll-view>
			</view>
		</view>
		<image class="banner" :src="hb_status?'../../../static/hehuoren/bg.png':'../../../static/hehuoren/bg.png'" mode=""></image>
		<view class="login_box" style="position: relative;" v-show="coinxzindex === 0">
			<view @tap="guize" style="position: absolute;background: #414352;border-bottom-left-radius: 20upx;height: 50upx;line-height: 50upx; border-top-left-radius: 20upx; right: 0upx; color: #fed8b8; top: 250upx; text-align: center; width: 120upx;">{{$t('wo.gz')}}</view>
			<view style="width: 100%;padding: 30upx;box-sizing: border-box;height:80%; margin-top: 250upx;">
				<view style="background:url(../../../static/hehuoren/bronze_bg.png) no-repeat;background-size: 100% 100%;  width: 100%; height:986upx;position: relative; padding:80upx;box-sizing: border-box;">
					<view style="width:100%; margin-top: 270upx;" v-if="level == 0">
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-bottom: 20upx; display: inline-flex;">
							<text class="t1" style="margin-top: 10upx;" :style="hb_status?'color: #242933;':'color:#FFFFFF;'">{{$t('wo.czz')}}</text>
							<text class="t2" style="color:#000;font-size: 50upx; font-weight: bold; margin-left: 15upx;">{{count}}%</text> 
						</view>
						<progress border-radius='20' activeColor='#4245d7' backgroundColor='#ececec' :percent="count" />
					</view>
					<view style="width:100%; margin-top: 270upx;" v-if="level > 0">
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-bottom: 20upx; display: inline-flex;">
							<text class="t1" style="margin-top: 10upx;" :style="hb_status?'color: #242933;':'color:#FFFFFF;'">{{$t('wo.czz')}}</text>
							<text class="t2" style="color:#000;font-size: 50upx; font-weight: bold; margin-left: 15upx;">100%</text> 
						</view>
						<progress border-radius='20' activeColor='#4245d7' backgroundColor='#ececec' percent="100" />
					</view>
					<view style="width: 100%; margin-top: 150upx;">
						<view style="width: 100%; color: #ffd9b9;">
							{{$t('wo.zxfl')}}
						</view>
						<view style="width: 100%; color: #ffd9b9; font-size:30upx; margin-top: 15upx;">
							{{$t('wo.jysylfr')}}
						</view>
						<view style="width: 100%; color: #ffd9b9; margin-top: 30upx;">
							{{$t('wo.cztj')}}
						</view>
						<view style="width: 100%; color: #ffd9b9; font-size: 30upx;margin-top: 15upx;">
							{{$t('wo.cjhhr')}}
						</view>
					</view>
					<view @tap="tiaozhan" style="background:url(../../../static/hehuoren/button.png) no-repeat;background-size: 100% 100%;height: 120upx; width: 100%;box-sizing: border-box; margin-top: 30upx;">		
						<view style=" text-align: center; line-height: 110upx;font-size: 32upx;">{{$t('wo.wytz')}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="login_box" style="position: relative;" v-show="coinxzindex === 1">
			<view @tap="guize" style="position: absolute;background: #414352;border-bottom-left-radius: 20upx;height: 50upx;line-height: 50upx; border-top-left-radius: 20upx; right: 0upx; color: #fed8b8; top: 250upx; text-align: center; width: 120upx;">{{$t('wo.gz')}}</view>
			<view style="width: 100%;padding: 30upx;box-sizing: border-box;height:80%; margin-top: 250upx;">
				<view style="background:url(../../../static/hehuoren/silver_bg.png) no-repeat;background-size: 100% 100%;  width: 100%; height:986upx;position: relative; padding:80upx;box-sizing: border-box;">
					<view style="width:100%; margin-top: 270upx;" v-if="level == 1">
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-bottom: 20upx; display: inline-flex;">
							<text class="t1" style="margin-top: 10upx;" :style="hb_status?'color: #242933;':'color:#FFFFFF;'">{{$t('wo.czz')}}</text>
							<text class="t2" style="color:#000;font-size: 50upx; font-weight: bold; margin-left: 15upx;">{{count}}%</text> 
						</view>
						<progress border-radius='20' activeColor='#4245d7' backgroundColor='#ececec' :percent="count" />
					</view>
					<view style="width:100%; margin-top: 270upx;" v-if="level < 1">
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-bottom: 20upx; display: inline-flex;">
							<text class="t1" style="margin-top: 10upx;" :style="hb_status?'color: #242933;':'color:#FFFFFF;'">{{$t('czz')}}</text>
							<text class="t2" style="color:#000;font-size: 50upx; font-weight: bold; margin-left: 15upx;">0%</text> 
						</view>
						<progress border-radius='20' activeColor='#4245d7' backgroundColor='#ececec' percent="0" />
					</view>
					<view style="width:100%; margin-top: 270upx;" v-if="level > 1">
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-bottom: 20upx; display: inline-flex;">
							<text class="t1" style="margin-top: 10upx;" :style="hb_status?'color: #242933;':'color:#FFFFFF;'">{{$t('wo.czz')}}</text>
							<text class="t2" style="color:#000;font-size: 50upx; font-weight: bold; margin-left: 15upx;">100%</text> 
						</view>
						<progress border-radius='20' activeColor='#4245d7' backgroundColor='#ececec' percent="100" />
					</view>
					<view style="width: 100%; margin-top: 150upx;">
						<view style="width: 100%; color: #ffd9b9;">
							{{$t('wo.zxfl')}}
						</view>
						<view style="width: 100%; color: #ffd9b9; font-size:30upx; margin-top: 15upx;">
							{{$t('wo.jysylfresw')}}
						</view>
						<view style="width: 100%; color: #ffd9b9; margin-top: 30upx;">
							{{$t('wo.cztj')}}
						</view>
						<view style="width: 100%; color: #ffd9b9; font-size: 30upx;margin-top: 15upx;">
							{{$t('wo.cjhhr')}}
						</view>
					</view>
					<view style="background:url(../../../static/hehuoren/button.png) no-repeat;background-size: 100% 100%;height: 120upx; width: 100%;box-sizing: border-box; margin-top: 30upx;">		
						<view style=" text-align: center; line-height: 110upx;font-size: 32upx;">{{$t('wo.wycz')}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="login_box" style="position: relative;" v-show="coinxzindex === 2">
			<view @tap="guize" style="position: absolute;background: #414352;border-bottom-left-radius: 20upx;height: 50upx;line-height: 50upx; border-top-left-radius: 20upx; right: 0upx; color: #fed8b8; top: 250upx; text-align: center; width: 120upx;">{{$t('wo.gz')}}</view>
			<view style="width: 100%;padding: 30upx;box-sizing: border-box;height:80%; margin-top: 250upx;">
				<view style="background:url(../../../static/hehuoren/gold_bg.png) no-repeat;background-size: 100% 100%;  width: 100%; height:986upx;position: relative; padding:80upx;box-sizing: border-box;">
					<view style="width:100%; margin-top: 270upx;" v-if="level == 2">
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-bottom: 20upx; display: inline-flex;">
							<text class="t1" style="margin-top: 10upx;" :style="hb_status?'color: #242933;':'color:#FFFFFF;'">{{$t('wo.czz')}}</text>
							<text class="t2" style="color:#000;font-size: 50upx; font-weight: bold; margin-left: 15upx;">{{count}}%</text> 
						</view>
						<progress border-radius='20' activeColor='#4245d7' backgroundColor='#ececec' :percent="count" />
					</view>
					<view style="width:100%; margin-top: 270upx;" v-if="level < 2">
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-bottom: 20upx; display: inline-flex;">
							<text class="t1" style="margin-top: 10upx;" :style="hb_status?'color: #242933;':'color:#FFFFFF;'">{{$t('wo.czz')}}</text>
							<text class="t2" style="color:#000;font-size: 50upx; font-weight: bold; margin-left: 15upx;">0%</text> 
						</view>
						<progress border-radius='20' activeColor='#4245d7' backgroundColor='#ececec' percent="0" />
					</view>
					<view style="width:100%; margin-top: 270upx;" v-if="level > 2">
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-bottom: 20upx; display: inline-flex;">
							<text class="t1" style="margin-top: 10upx;" :style="hb_status?'color: #242933;':'color:#FFFFFF;'">{{$t('wo.czz')}}</text>
							<text class="t2" style="color:#000;font-size: 50upx; font-weight: bold; margin-left: 15upx;">100%</text> 
						</view>
						<progress border-radius='20' activeColor='#4245d7' backgroundColor='#ececec' percent="100" />
					</view>
					<view style="width: 100%; margin-top: 150upx;">
						<view style="width: 100%; color: #ffd9b9;">
							{{$t('wo.zxfl')}}
						</view>
						<view style="width: 100%; color: #ffd9b9; font-size:30upx; margin-top: 15upx;">
							{{$t('wo.jysylsw')}}
						</view>
						<view style="width: 100%; color: #ffd9b9; margin-top: 30upx;">
							{{$t('wo.cztj')}}
						</view>
						<view style="width: 100%; color: #ffd9b9; font-size: 30upx;margin-top: 15upx;">
							{{$t('wo.ssrwccjhhr')}}
						</view>
					</view>
					<view style="background:url(../../../static/hehuoren/button.png) no-repeat;background-size: 100% 100%;height: 120upx; width: 100%;box-sizing: border-box; margin-top: 30upx;">		
						<view style=" text-align: center; line-height: 110upx;font-size: 32upx;">{{$t('wo.wycz')}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="login_box" style="position: relative;" v-show="coinxzindex === 3">
			<view @tap="guize" style="position: absolute;background: #414352;border-bottom-left-radius: 20upx;height: 50upx;line-height: 50upx; border-top-left-radius: 20upx; right: 0upx; color: #fed8b8; top: 250upx; text-align: center; width: 120upx;">{{$t('wo.gz')}}</view>
			<view style="width: 100%;padding: 30upx;box-sizing: border-box;height:80%; margin-top: 250upx;">
				<view style="background:url(../../../static/hehuoren/platinum_bg.png) no-repeat;background-size: 100% 100%;  width: 100%; height:986upx;position: relative; padding:80upx;box-sizing: border-box;">
					<view style="width:100%; margin-top: 270upx;" v-if="level == 3">
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-bottom: 20upx; display: inline-flex;">
							<text class="t1" style="margin-top: 10upx;" :style="hb_status?'color: #242933;':'color:#FFFFFF;'">{{$t('wo.czz')}}</text>
							<text class="t2" style="color:#000;font-size: 50upx; font-weight: bold; margin-left: 15upx;">{{count}}%</text> 
						</view>
						<progress border-radius='20' activeColor='#4245d7' backgroundColor='#ececec' :percent="count" />
					</view>
					<view style="width:100%; margin-top: 270upx;" v-if="level < 3">
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-bottom: 20upx; display: inline-flex;">
							<text class="t1" style="margin-top: 10upx;" :style="hb_status?'color: #242933;':'color:#FFFFFF;'">{{$t('wo.czz')}}</text>
							<text class="t2" style="color:#000;font-size: 50upx; font-weight: bold; margin-left: 15upx;">0%</text> 
						</view>
						<progress border-radius='20' activeColor='#4245d7' backgroundColor='#ececec' percent="0" />
					</view>
					<view style="width:100%; margin-top: 270upx;" v-if="level > 3">
						<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-bottom: 20upx; display: inline-flex;">
							<text class="t1" style="margin-top: 10upx;" :style="hb_status?'color: #242933;':'color:#FFFFFF;'">{{$t('wo.czz')}}</text>
							<text class="t2" style="color:#000;font-size: 50upx; font-weight: bold; margin-left: 15upx;">100%</text> 
						</view>
						<progress border-radius='20' activeColor='#4245d7' backgroundColor='#ececec' percent="100" />
					</view>
					<view style="width: 100%; margin-top: 150upx;">
						<view style="width: 100%; color: #ffd9b9;">
							{{$t('wo.zxfl')}}
						</view>
						<view style="width: 100%; color: #ffd9b9; font-size:30upx; margin-top: 15upx;">
							{{$t('wo.jysfrylw')}}
						</view>
						<view style="width: 100%; color: #ffd9b9; margin-top: 30upx;">
							{{$t('wo.cztj')}}
						</view>
						<view style="width: 100%; color: #ffd9b9; font-size: 30upx;margin-top: 15upx;">
							{{$t('wo.wsrwccjhhr')}}
						</view>
					</view>
					<view style="background:url(../../../static/hehuoren/button.png) no-repeat;background-size: 100% 100%;height: 120upx; width: 100%;box-sizing: border-box; margin-top: 30upx;">		
						<view style=" text-align: center; line-height: 110upx;font-size: 32upx;">{{$t('wo.wycz')}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="grace-margin">
			<view class="grace-shade grace-shade-black" v-if="show2" >
				<view class="grace-shade-msg grace-animate" style="border-radius: 30upx;">
					<view style="display: inline-flex; width: 100%; position: relative;">
						<view style="width:100%; height: 70upx; line-height: 70upx; font-size: 35upx;">{{$t('wo.hhrgz')}}</view>
						<view class="close-btn grace-icons icon-close3" style="font-size: 38upx; margin-top: 15upx; position: absolute; right: 15upx;" @tap="beifen"></view>
					</view>
					<view class="body">						
						<view style="width: 100%;padding: 30upx;box-sizing: border-box;">
							<scroll-view scroll-y="true" style="height: 400upx;">
								<view style="width: 100%; text-align: left;">
									<text :nodes="tbDescription" style="line-height: 40upx; text-align: left;">
									<view>{{$t('wo.hhrtext1')}}</view>
																	<view>{{$t('wo.hhrtext2')}}</view>
									
									<view>{{$t('wo.hhrtext3')}}</view>
									<view>{{$t('wo.hhrtext4')}}</view>
									<view>{{$t('wo.hhrtext5')}}</view>
									<view>{{$t('wo.hhrtext6')}}</view>
									<view>{{$t('wo.hhrtext7')}}</view>
									<view>{{$t('wo.hhrtext8')}}</view>
									<view>{{$t('wo.hhrtext9')}}</view>
									<view>{{$t('wo.hhrtext10')}}</view>
									<view>{{$t('wo.hhrtext11')}}</view>
									<view>{{$t('wo.hhrtext12')}}</view>
									<view>{{$t('wo.hhrtext13')}}</view>
									<view>{{$t('wo.hhrtext14')}}</view>
									<view>{{$t('wo.hhrtext15')}}</view>
									<view>{{$t('wo.hhrtext16')}}</view>
									<view>{{$t('wo.hhrtext17')}}</view>
									<view>{{$t('wo.hhrtext18')}}</view>
									<view>{{$t('wo.hhrtext19')}}</view>
									<view>{{$t('wo.hhrtext20')}}</view>
									<view>{{$t('wo.hhrtext21')}}</view>
									<view>{{$t('wo.hhrtext22')}}</view>
									<view>{{$t('wo.hhrtext23')}}</view>
									<view>{{$t('wo.hhrtext24')}}</view>
									<view>{{$t('wo.hhrtext25')}}</view>
									<view>{{$t('wo.hhrtext26')}}</view>
									</text>
								</view>
							</scroll-view>
							
							
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var This;
	var _self;
	var canvaRing = null;
	import graceBottomDialog from '../../../graceUI/components/graceBottomDialog.vue';

	export default {
		components: {
			graceBottomDialog: graceBottomDialog
		},
		data() {
			return {
				
				show2:false,
				show1: false,
				bizhongming: '',
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				isshow_money: true, //是否显示金额
				bizhong: {
					index: 0,
					list: [{
							id: 1,
							name: this.$t('wo.qt')
						},
						{
							id: 2,
							name: this.$t('wo.by')

						},
						{
							id: 3,
							name: this.$t('wo.hj')
						},
						{
							id: 4,
							name: this.$t('wo.bj')
						}
					]
				},
				listts: [1, 2, 3, 4, 5],
				coinxzindex: 0,
				count:'0',
				level:'0'
			}
		},
		onLoad(e) {
			console.log(e)
			this.bizhongming = e.buming
			this.nav_bizhong(0)
			This = this;
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight
					// console.log(JSON.stringify(res))
					console.log(This.windowHeight)
				}
			})

			setTimeout(function() {

				var view = uni.createSelectorQuery().select(".header");
				view.boundingClientRect(data => {
					// console.log("节点离页面顶部的距离为" + data.height);
					This.header_H = data.height;
					console.log(This.header_H)
				}).exec();



			}, 500)

			



		},
		onShow() {
			this.backgroundALL = uni.getStorageSync('localbk')
			this.colorALL = uni.getStorageSync('localcol');
			setTimeout(()=>{
				this.tab_init();
			},500)
			var setdata = {
				token:uni.getStorageSync('token'),
				userId:uni.getStorageSync('id')
			}
			console.log(setdata)
			uni.request({
				url: this.websiteUrl+'user/getPartnerLevel', 
				data:setdata,  
				dataType:'json',
				method:'POST',
				header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh' //自定义请求头信息
					},
					success: (res) => { 

				
						console.log(res);
						if(res.data.code == 200){
							this.level = res.data.data.level
							if (this.level == 0) {
								this.count = res.data.data.count
							}else if (this.level == 1) {
								this.count = res.data.data.count*10
							}else if (this.level == 2) {
								let total = 30
								let num = res.data.data.count
								this.count = Number(Math.round(num / total * 10000)/ 100.00).toFixed(0)
							}else if (this.level == 3) {
								let total = 50
								let num = res.data.data.count
								this.count = Number(Math.round(num / total * 10000)/ 100.00).toFixed(0)
							}
							
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

						
					}
			})
		},
		methods: {
			tiaozhan(){
				var that = this
				uni.showModal({
					title: this.$t('wo.xtts'),
					content: this.$t('wo.sffqtz'),
					success: function(res) {
						if (res.confirm) {
								var setdata = {
									token:uni.getStorageSync('token'),
									userId:uni.getStorageSync('id')
								}
								console.log(setdata)
								uni.request({
									url: that.websiteUrl+'user/issueAChallenge', 
									data:setdata,  
									dataType:'json',
									method:'POST',
									header: {
											'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh' //自定义请求头信息
										},
										success: (res) => { 
								
									
											console.log(res);
											if(res.data.code == 200){
												that.myAlert(res.data.msg)
											} else if (res.data.code == 500) {
												that.myAlert(res.data.msg)
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
								
											
										}
								})
						} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
				});
			},
			guize(){
				this.show2 = true
			},
			beifen(){
				this.show2 = false
			},
			nav_bizhong(e) { //切换币种
				this.bizhong.index = e;
				this.bizhongming = this.bizhong.list[e].name
				this.coinxzindex = e
				console.log(e);
				var setdata = {
					token:uni.getStorageSync('token'),
					userId:uni.getStorageSync('id')
				}
				console.log(setdata)
				uni.request({
					url: this.websiteUrl+'user/getPartnerLevel', 
					data:setdata,  
					dataType:'json',
					method:'POST',
					header: {
							'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh' //自定义请求头信息
						},
						success: (res) => { 
				
					
							console.log(res);
							if(res.data.code == 200){
								this.level = res.data.data.level
								if (this.level == 0) {
									this.count = res.data.data.count
								}else if (this.level == 1) {
									this.count = res.data.data.count*10
								}else if (this.level == 2) {
									let total = 30
									let num = res.data.data.count
									this.count = Number(Math.round(num / total * 10000)/ 100.00).toFixed(0)
								}else if (this.level == 3) {
									let total = 50
									let num = res.data.data.count
									this.count = Number(Math.round(num / total * 10000)/ 100.00).toFixed(0)
								}
								
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
				
							
						}
				})
			},
			isshow_money_btn() {
				this.isshow_money = !this.isshow_money;
			},


			Back() {
				uni.navigateBack({ //后退
					delta: 1
				})
			},
			paihang() {
				uni.navigateTo({
					url:'../paihang/paihang'
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
				if (this.hb_status == true) {
					console.log('白天')
				} else {
					console.log('晚上')
				}
			}
		}
	}
</script>

<style>
	.login_box{
		width: 100%;
		height: 100%;
		
	}
	.btns {
		display: flex;
		height: 88upx;
		line-height: 88upx;
		width: 90%;
		justify-content: center;
		background: #F8C94A;
		color: #FFF;
		border-radius: 14upx;
		font-size: 38upx;
	}

	page,
	.container {
		height: 100%;
		width: 100%;
	}

	.zc_text {
		width: 750upx;
		position: relative;
		left: 0;
		padding: 0 40upx;
		box-sizing: border-box;
		margin-bottom: 20upx;
	}

	.zc_text .t_bt_text {
		font-size: 40upx;
		color: #FFFFFF;
		font-weight: bold;
	}

	.zc_text .bt_bj {
		font-size: 22upx;
		color: #8792A8;
		align-self: flex-end;
	}

	.header {
		padding: 0 40upx;
		box-sizing: border-box;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 99999;
	}

	.header .header_box {
		height: 88upx;
	}

	.banner {
		width: 750upx;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}

	.nav_box {
		width: 100%;
	}

	.grace-scroll-x .item {
		display: inline-flex;
		width: 25%;
	}

	.grace-scroll-x .item text {
		font-size: 30upx;
		color: #fed8b8;
	}

	.grace-scroll-x .item.active text {
		font-size: 48upx;
		color: #fed8b8;
	}

	.grace-scroll-x .item.active .yd {
		width: 12upx;
		height: 12upx;
		background: #fed8b8;
		border-radius: 6upx;
	}

	.con_box {
		position: relative;
		z-index: 99999;
		width: 100%;
		padding-top: 30upx;
		box-sizing: border-box;
		padding-top: 60upx;
	}

	.zc_box {
		width: 670upx;
		box-shadow: 0px 4px 20px 0px rgba(73, 102, 245, 0.2);
		background: rgba(36, 178, 155, 1);
		border-radius: 20upx;
		height: 380upx;
		margin: 0 40upx 30upx 40upx;
	}

	.zc_box .item_i .zzc_text {
		font-size: 32upx;
		color: #FFFFFF;
	}

	.zc_box .item_i .money_text {
		font-size: 46upx;
		color: #FFFFFF;
		display: inline-flex;
		width: 400upx;
	}

	.zc_box .item_i .cny {
		font-size: 28upx;
		color: #FFFFFF;
	}

	.zc_box .btn {
		font-size: 28upx;
		color: #FFFFFF;
		width: 165upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		border-radius: 30upx;
		border: 1upx solid #FFFFFF;
	}

	.item_wallet_box {
		padding: 30upx 40upx;
		box-sizing: border-box;
		width: 670upx;
		margin: 0upx 40upx 20upx 40upx;
		border-radius: 20upx;
		padding-left: 0;
	}

	.item_wallet_box .title {
		font-size: 30upx;
		color: #FFFFFF;
	}

	.item_wallet_box .btns {
		font-size: 30upx;
		color: #FFFFFF;
		width: 180upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		border: 2upx solid rgba(58, 116, 252, 1);
		border-radius: 30upx;
		color: #3A74FC;
	}

	.item_wallet_box .money {
		color: #F36C2A;
		font-size: 36upx;
	}

	.item_wallet_box .cny {
		color: #8792A8;
		font-size: 28upx;
	}

	.item_wallet_box .r {
		align-items: flex-start;
		text-align: left;
	}

	.item_wallet_box .flex1 {
		flex: 1;
		color: #8792A8;
	}

	.list_box {
		flex: 1;
		width: 100%;
		overflow: auto;
	}


	.item_box {
		padding: 35upx 40upx;
		box-sizing: border-box;
	}

	.item_box .title {
		font-size: 36upx;
		margin-left: 30upx;
		font-weight: 500;
	}

	.item_box .m_box .t1 {
		font-size: 30upx;
		align-self: flex-end;
	}

	.item_box .m_box .t2 {
		font-size: 24upx;
		color: #8792A8;
		align-self: flex-end;
	}

	.item_box .r {
		align-items: flex-start;
		text-align: right;
	}

	.item_box .flex1 {
		flex: 1;
		color: #8792A8;
		font-size: 26upx;
	}

	.item_box .t {
		color: #FFFFFF;
	}

	.charts {
		width: 240upx;
		height: 240upx;
	}

	.charts1 {
		width: 130upx;
		height: 130upx;
	}
</style>
