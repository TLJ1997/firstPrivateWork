<template>
	<view class="container hi-columns" :style="isDarkMode ? 'background-color:#1D2024;' : 'background-color:#F5F5F5;'">
		<!-- 标题栏 -->
		<view class="muen_header hi-columns" :style="{ paddingTop: `${statusBarH}px` }">
			<view class="hi-rows hi-flex-vcenter hi-space-between">
				<image 
				:src="isDarkMode ? '/static/gongyi/icon_go back@2x.png' : '/static/kuangchi/icon_go back@2x.png'"
				style="width:46upx;height: 46upx;" @click="Back()"></image>
				<view class="hi-rows hi-flex-vcenter" style="font-size: 36rpx;color: white;" :style="isDarkMode ? 'color:white' : 'color:black'">{{xieyi.name}}</view>
				<view></view>
			</view>
		</view>
		<view v-html="agreement[xieyi.type]" class="content" style="padding: 30rpx;" v-if="xieyi.type!=''" :style="isDarkMode ? 'color:white' : 'color:#000'">
			<!-- {{agreement[xieyi.type]}} -->
		</view>
	</view>
</template>

<script>
var This;
import agreement from '@/common/xieyi.js';
export default {
	data() {
		return {
			xieyi:{
				name:"",
				type:'register'
			},
			agreement:agreement,
			backgroundALL: '',
			colorALL: '',
			statusBarH: '',
			windowHeight: 0,
			hb_status: true,
			isDarkMode: false //是否为黑夜模式
		};
	},
	onLoad(e) {
		var This = this;
		uni.getSystemInfo({
			success(res) {
				This.statusBarH = res.statusBarHeight;
				This.windowHeight = res.windowHeight;
			}
		});
		this.xieyi.name = e.name? e.name:'';
		this.xieyi.type = e.type? e.type:'';
		console.log(agreement[this.xieyi.type]);
	},
	onShow() {
		this.isDarkMode = uni.getStorageSync('localbk') == '#1c1f22';
	},
	methods: {
		Back() {
			uni.navigateBack({
				//后退
				delta: 1
			});
		},
		switchTab(index) {
			this.navIndex = index;
		}
	}
};
</script>

<style scoped lang="scss">
page {
	height: 100%;
}
.container {
	min-height: 100vh;
}
.muen_header > view {
	height: 88upx;
	padding: 0 40upx;
	box-sizing: border-box;
}
.white-09 {
	color: rgba($color: #ffffff, $alpha: 0.9);
}
.title{
	height: 140rpx;
	background-image: linear-gradient(to right,#4FBCFF,#1586FF);
	border-radius: 20rpx;
}
checkbox{
	height: 26rpx;
	width: 26rpx;
}
.suanli-item{
	width: 220rpx;
	height: 140rpx;
	margin-bottom: 20rpx;
	border-radius: 14rpx;
}
.confirm-button{
	height: 88rpx;
	width: 220rpx;
	border-radius: 44rpx;
	line-height: 88rpx;
	text-align: center;
	color: white;
	font-size: 32rpx;
	background-image: linear-gradient(to right,#4FBCFF,#1586FF);
}
</style>
