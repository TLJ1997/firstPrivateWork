<template>
	<view style="">
		<view style="width: 100%; margin-top:300upx; text-align: center;position:relative;">
			<view style="width: 560upx; position: absolute; left: 50%; margin-left: -280upx;">
				<view style="display: inline-flex; width: 100%;">
					<view style="width: 33%; text-align: center; justify-content: center; margin-left: 10upx;">
						<image class="ranking-lists-image" style="width: 110rpx; height: 110rpx;" :src="rankingList[1].headImgPath" mode="widthFix"></image>
						<view style="color: #FFF;">{{rankingList[1].nickname}}</view>
						<view style="color: #000; margin-top: 30upx;">{{$t('wo.tjrs')}}</view>
						<view style="color: #000;">{{rankingList[1].num}}</view>
					</view>
					<view style="width: 33%;text-align: center; justify-content: center;margin-top: -130upx;">
						<image class="ranking-lists-image" style="width: 120rpx; height: 120rpx;" :src="rankingList[0].headImgPath" mode="widthFix"></image>
						<view style="color: #FFF;">{{rankingList[0].nickname}}</view>
						<view style="color: #000; margin-top: 30upx;">{{$t('wo.tj')}}</view>
						<view style="color: #000;">{{rankingList[0].num}}</view>
					</view>
					<view style="width: 33%;text-align: center; justify-content: center;margin-top: 60upx; margin-left: 10upx;">
						<image class="ranking-lists-image" :src="rankingList[2].headImgPath" mode="widthFix"></image>
						<view style="color: #FFF;">{{rankingList[2].nickname}}</view>
						<view style="color: #000; margin-top: 30upx;">{{$t('wo.tj')}}</view>
						<view style="color: #000;">{{rankingList[2].num}}</view>
					</view>
				</view>
			</view>
			<image src="../../../static/hehuoren/rankinglist_bg.png" style="width:560upx; height:560upx;" mode=""></image>
		</view>
		<gracePage headerBG="#FFFFFF" :customHeader="false">
			
			<view slot="gBody" class="ranking-list-wrap">
				<!-- 头部个人信息 -->
				<view class="header hi-columns" :style="'padding-top:'+statusBarH+'px;'" style="background: #000; padding-bottom: 20upx;">
					<view class="hi-rows hi-flex-vcenter  hi-space-between">
						<view class="hi-rows hi-flex-vcenter">
							<image src="../../../static/home/nav_icon_back_night.png" mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
						</view>
						<view style="color: #FFF;position: absolute;width: 200upx; text-align: center;margin-left: -100upx; left: 50%; font-size: 33upx;">{{$t('wo.bwphb')}}</view>
					</view>
				</view>
				
				<!-- 模拟一个内容区域 假的吸顶容器默认不在最顶部 -->
				<view style="background-color:#FFFFFF;border-radius: 20upx; padding: 25upx; box-sizing: border-box; border-bottom: 20upx solid #d9d9dc; top: 110upx;" :class="[isFixed ? 'grace-fixed-top' : '']">
					<view class="ranking-lists-item grace-nowrap grace-flex-vcenter">
						<image class="ranking-lists-image" :src="head" mode="widthFix"></image>
						<view class="ranking-lists-content">
							<text class="ranking-lists-content-name" style="padding:0upx 10upx 0upx 10upx; background: #3a74fc; color: #FFF; width: 120upx; border-radius: 30upx; text-align: center;">NO.{{mypaiming}}</text>
							<text class="ranking-lists-content-desc" style="color: #000000; font-size: 30upx; margin-top: 5upx; padding-left: 15upx;">{{nickname}}</text>
						</view>
						<view class="ranking-lists-zan">
							<text>{{$t('wo.tjrs')}}</text>
							<text class="ranking-lists-zan-num" style="margin-top: 10upx;">{{myrenshu}}</text>
						</view>
					</view>
				</view>
				<!-- 动态产生一个 view 当导航吸顶时展示占位 高度等于 导航的高度  -->
				<!-- <view style="height:111rpx;" v-if="isFixed"></view> -->

				<!-- 排行榜 -->
				<view class="ranking-lists" style="margin-top: 20upx;">
					<view class="ranking-lists-item grace-nowrap grace-flex-vcenter" v-for="(item,index) in rankingList" :key="index">
						<!-- <view class="ranking-lists-num" :style="{color:item.color?item.color:''}">{{index+1}}</view> -->
						<image class="ranking-lists-image" :src="item.headImgPath" mode="widthFix"></image>
						<view class="ranking-lists-content">
							<text class="ranking-lists-content-name" style="padding:0upx 10upx 0upx 10upx; background: #d9d9dc; width: 120upx; border-radius: 30upx; text-align: center; box-shadow:3upx 5upx 5upx #71DB1B;"
							 :style="{background:item.color?item.color:''}">NO.{{item.ranking}}</text>
							<text class="ranking-lists-content-desc" style="color: #000000; font-size: 30upx; margin-top:15upx; padding-left: 15upx;">{{item.nickname}}</text>
						</view>
						<view class="ranking-lists-zan">
							<text>{{$t('wo.tjrs')}}</text>
							<text class="ranking-lists-zan-num" style="margin-top: 10upx;">{{item.num}}</text>
						</view>
					</view>
				</view>
			</view>
		</gracePage>
	</view>
</template>
<script>
	 var This;
	import gracePage from "../../../graceUI/components/gracePage.vue";
	import graceNavBar from "../../../graceUI/components/graceNavBar.vue";
	export default {
		data() {
			return {
				rankingList: [
				],
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				navItems: [this.$t('wo.tj'), this.$t('wo.xw'),this.$t('wo.yinyue'), this.$t('wo.yd'), this.$t('wo.js'), this.$t('wo.sp'), this.$t('wo.qt')],
				navIndex: 0,
				// 动态吸顶
				isFixed: false,
				// 顶部内容高度
				headerHeight: 100,
				pagejia:1,
				head:'',
				nickname:'',
				myrenshu:'',
				mypaiming:''
			};
		},
		onReady() {
			var _self = this;
			// 获取顶部内容高度
			uni.createSelectorQuery().select('#header').fields({
				size: true
			}, function(res) {
				if (!res) {
					return;
				}
				_self.headerHeight = res.height;
			}).exec();
			uni.getSystemInfo({
				success(res) {
					_self.statusBarH = res.statusBarHeight;
					_self.windowHeight = res.windowHeight
					// console.log(JSON.stringify(res))
					console.log(_self.windowHeight)
				}
			})
			var setdata = {
				token:uni.getStorageSync('token'),
				userId:uni.getStorageSync('id'),
				page:1
			}
			console.log(setdata)
			uni.request({
				url: this.websiteUrl+'user/getRanking', 
				data:setdata,  
				dataType:'json',
				method:'GET',
				header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh' //自定义请求头信息
					},
					success: (res) => { 
			
				
						console.log(res);
						if (res.data.code == 200) {
							this.myrenshu = res.data.data.myselfNum
							this.mypaiming = res.data.data.myselfRanking
							this.nickname = uni.getStorageSync('nickname')
							this.head = uni.getStorageSync('head')
							this.rankingList = res.data.data.resultRankings
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
		onReachBottom: function() {
			var that = this
			uni.showLoading({
				title: '加载中'
			});
			setTimeout(function() {
				uni.hideLoading();
				that.pagejia = Number(that.pagejia) + 1
				that.jiazailist()
			}, 1000);
		},
		methods: {
			jiazailist() {
				let This=this;
				var zhebishishasss = {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					page: this.pagejia
				}
				console.log(zhebishishasss)
				uni.request({
					url: this.websiteUrl+'user/getRanking',
					method: 'GET',
					data: zhebishishasss,
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success: (res) => {
						console.log(res)
			
						if (res.data.code == 200) {
							if (this.pagejia > res.data.data.totalPage) {
								uni.showToast({
									title: This.$t('stylePulic.Nomore'),
									icon: 'none',
									duration: 1000
								});
							} else {
								if (res.data.data.resultRankings == null || res.data.data.resultRankings.length == 0) {
									uni.showToast({
										title: This.$t('stylePulic.Nomore'),
										icon: 'none',
										duration: 1000
									});
								} else {
									uni.showToast({
										title: This.$t('stylePulic.Loaded'),
										icon: 'none',
										duration: 1000
									});
									this.rankingList = this.rankingList.concat(res.data.data.resultRankings);
									console.log(this.rankingList)
								}
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
			
					},
					fail: () => {
			
					}
				});
			},
			Back() {
				uni.navigateBack({ //后退
					delta: 1
				})
			},
			onPageScroll: function(e) {
				// 根据滚动高度动态吸顶
				if (e.scrollTop >= this.headerHeight) {
					this.isFixed = true;
				} else {
					this.isFixed = false;
				}
			},
		},
		components: {
			gracePage,
			graceNavBar
		}
	}
</script>
<style>
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

	page {
		background: url(../../../static/hehuoren/bg.png) no-repeat #E5E5E5;
		background-size: 100% auto;
	}

	.ranking-list-wrap {
		background-color: #FFFFFF;
		/* margin: 25rpx; */
		margin-top:0rpx;
		border-radius: 16rpx;
	}

	.header-msg {
		margin: 0 30rpx;
		border-bottom: 8rpx solid #F6F6F6;
		margin-top: 30rpx;
		padding-bottom: 20rpx;
	}

	.header-msg-item {
		width: 200rpx;
	}

	.header-msg-text {
		font-size: 32rpx;
		font-weight: bold;
		color: #666666;
	}

	.header-msg-text-small {
		font-size: 22rpx;
		margin: 10rpx;
		color: #666666;
	}

	.header-msg-face {
		width: 140rpx;
		height: 140rpx;
		margin: 5rpx;
		border-radius: 120rpx;
		border: 6rpx solid #E5E5E5;
	}

	.ranking-lists {
		padding: 25rpx;
	}

	.ranking-lists-item {
		padding: 20rpx;
	}

	.ranking-lists-num {
		width: 60rpx;
		line-height: 80rpx;
		font-size: 50rpx;
		color: #666666;
		font-weight: bold;
		font-style: italic;
		flex-shrink: 0;
	}

	.ranking-lists-image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		margin: 0 20rpx;
		flex-shrink: 0;
		border: 6rpx solid #E5E5E5;
	}

	.ranking-lists-content {
		width: 600rpx;
		margin: 0 10rpx;
	}

	.ranking-lists-content-name {
		font-size: 30rpx;
		line-height: 56rpx;
		color: #333333;
		width: 100%;
		display: block;
		line-height: 50rpx;
	}

	.ranking-lists-content-desc {
		color: #999999;
		font-size: 24rpx;
		line-height: 36rpx;
		width: 100%;
		display: block;
	}

	.ranking-lists-zan {
		width: 120rpx;
		flex-shrink: 0;
	}

	.ranking-lists-zan-icon {
		font-size: 50rpx;
		width: 100%;
		color: #999999;
		display: block;
		text-align: center;
	}

	.ranking-lists-zan-num {
		font-size: 22rpx;
		color: #999999;
		width: 100%;
		display: block;
		text-align: center;
	}

	.zan-active {
		color: #FF0036 !important;
	}

	.bgF5 {
		background: #F8F8F8 !important;
	}
</style>
