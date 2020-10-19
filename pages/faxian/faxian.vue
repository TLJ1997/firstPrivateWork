<template>
	<view class="content" :style="{background:backgroundALL}" style="height:100vh;">
		
		<view style="width: 200upx;text-align: left; font-size: 32upx; margin-left: 10upx; color: #000;" :style="{color:colorALL}">12121212</view>

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backgroundALL:'',
				colorALL:''
			}
		},
		onLoad() { 
			
		},
		onShow() {
			
			
			this.backgroundALL = uni.getStorageSync('localbk')
			this.colorALL = uni.getStorageSync('localcol') 
			if( this.backgroundALL == '#1c1f22' ){
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#1c1f22'
			
				})
				uni.setTabBarStyle({
				  backgroundColor: '#1c1f22',
				  "color" : "#737373",
				  "selectedColor" : "#267cc0"
				})
			}else{
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#ffffff'
				})
				uni.setTabBarStyle({
				 backgroundColor: '#ffffff',
				"color" : "#737373",
				"selectedColor" : "#267cc0"
				})
			}
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.cp_box{width: 100%;padding: 0 20upx;box-sizing: border-box;}
	.cp_box .cp_title{width: 100%;float: left;}
	
	.cp_box .cp_title .title{float: left;font-size: 44upx;color: #D3B581;}
	.cp_box .cp_title .gd{float: right;font-size: 34upx;color: #666666;}
	
	.cp_box .list_box{width: 710upx;padding:20upx;background: #FFF;float: left;/* box-shadow: 0 0upx 20upx #E5E5E5; */box-sizing: border-box;border-radius: 16upx;}
	.cp_box .list_box .title{width: 100%;text-align: center;display: flex;justify-content: space-around;margin-top: 20upx;}
	.cp_box .list_box .title view{color: #E3E3E3;font-size: 40upx;}
	.cp_box .list_box .cp_l{width: 100%;border-radius: 10upx; text-align: center;display: flex;padding-left: 20upx;border: none;border-radius: 0; border-bottom: 1px solid #ececec;box-sizing: border-box;}
	.cp_box .list_box .cp_l .c_center{overflow: hidden;margin: 20upx 0;}
	
	.cp_box .list_box .cp_l .c_center image{width: 80upx;height: 80upx;float: left;border-radius: 50%;} 
	.cp_box .list_box .cp_l .c_center .text{float:right;margin-left: 6upx;text-align: left;width: 100upx;}
	.cp_box .list_box .cp_l .c_center .text view{font-size: 26upx;color: #E3E3E3;line-height:80upx;}
	.cp_box .list_box .cp_l .c_center .text view text{font-size: 30upx; font-weight: bold;}
	.cp_box .list_box .cp_l .c_center .money{font-size: 30upx;color: #999999;}
	
	.cp_box .list_box .cp_l  .ls1{width: 200upx;}
	.cp_box .list_box .cp_l  .ls2{width: 260upx;}
	.cp_box .list_box .cp_l  .ls3{width: 190upx;text-align: right;}
	.cp_box .list_box .cp_l  .ls3 text{padding: 10upx 20upx;background:red;color: #FFFFFF;width: 148upx !important;text-align: center; font-size: 34upx;position: relative;top: 15upx;border-radius: 10upx;display: inline-block;}
	.cp_box .list_box .cp_l  .ls1 .text view{font-size: 26upx;color: #E3E3E3;}
	.cp_box .list_box .cp_l .ls1 .text view text{font-size: 30upx; font-weight: bold;color: #E3E3E3;}
	.content{padding: 0;}
	.loading_c {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 999999;
		display: none;
	}
	.loading_c.active {
		display: block;
	}
	.padd30 {
		padding: 0 30upx;
	}
	.xxbanner {
		height: 60upx;
		background: #ffffff;
		padding-top: 15upx;
		padding-bottom: 15upx;
		margin-bottom: 15upx;
		margin-top: 15upx;
	}
	.xxbanner .swiper {
		flex: 1;
		height: 60upx;
	}
	.xxbanner .swiper swiper-item .swiper-item {
		font-size: 32upx;
		color: #5e6078;
	}
.hi-rows{display:flex; flex-direction:row !important; border-bottom: 0upx;}
/* banner */
.banner_box{width: 100%;display: block;flex-direction: column;height: 335upx;}
.banner_box .swiper{height: 335upx;width: 100%;}
.banner_box .swiper image{width: 100%;height: 335upx;}
/* 导航 */
.nav_box{display: flex;flex-direction: column;}
.nav_box .itmes{display: flex;flex-direction: row;justify-content: center;}
.nav_box .itmes .i_box{width: 74upx;flex: 1;display: flex;flex-direction: row;text-align: center;justify-content: space-between;margin: 2upx;background: #FFFFFF;padding: 30upx 30upx;}
.nav_box .itmes .i_box image{width: 83upx;height: 85upx;display: inline-block;align-self: center;}
.nav_box .itmes .i_box view.title{font-size:32upx;color: #494b61;}
.nav_box .itmes .i_box view.info{font-size:28upx;color: #9898a6;}

.bt_box{display: flex;flex-direction: row;padding: 20upx 20upx;margin-top: 20upx;box-sizing: border-box;margin-bottom: 2px; color: #FFF;}

page{
	background-color: #FFF;
}

.itme{display: flex;flex-direction: row;justify-content: center;}
.itme .i_box{width: 74upx;flex: 1;display: flex;flex-direction: column;text-align: center;justify-content: space-between;background: #FFFFFF;padding: 30upx 30upx;}
.itme .i_box image{width: 83upx;height: 85upx;display: inline-block;align-self: center;}
.itme .i_box view.title{font-size:32upx;color: #494b61;}
.itme .i_box view.info{font-size:28upx;color: #9898a6;}
.cate-section {
		display: inline-flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		padding: 30upx 0upx;
		background: #fff;

		.cate-item {
			width: 24.5%;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 28upx;
			color:#000;
		}
		.dongci{
			
		}
		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		.dongci image {
		width: 88upx;
		border-radius: 50%;
			height: 88upx;
			margin-bottom: 14upx;
			opacity: .7;
			box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
			border: 1upx solid #F3F4F5;
		}
		.dapipi image {
		width: 88upx;

			height: 88upx;
			margin-bottom: 14upx;
			opacity: .7;

		}
		text {
			width: 165upx;
			line-height: 40upx;
			text-align: center;
			color: #4C4C4C;
		}
	}
</style>
