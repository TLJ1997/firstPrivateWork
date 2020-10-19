<template>
	<view :style="{background:backgroundALL}" style="height:100vh;">
			<view class="list">
				<view class="li " :style="{background:backgroundALL}">
					<view class="text" :style="{color:colorALL}">{{$t('heibai.NightSwitch')}}</view>
					<view class="r">
						<switch :checked="heizhongtai" @change="switch2Change" color="#0080FF" />
					</view>
				</view>
			</view>

			<view class="container" v-show="buxian">
				<view class="dot"></view>
				<view class="pulse"></view>
			</view>
			<view class="container" v-show="buxian1">
				<view class="dot"></view>
				<view class="pulse1"></view>
			</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				buxian:false,
				buxian1:false,
				xuanzhongtai:false,
				heizhongtai:false,
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
				this.heizhongtai = true;
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#1c1f22'
			
				})
			}else{
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#ffffff'
				})
			}
			
		},
		methods: {
			switch2Change: function (e) {
				let This=this;
				console.log(e.target.value)
				if (e.target.value == true) {
					this.buxian = true;
					this.buxian1 = false;
					var that = this
					setTimeout(function() {
						that.buxian = false;
						uni.hideLoading();
						uni.showToast({
							title: This.$t('heibai.dkyjms'),
							icon: "none",
							duration: 1000
						});
						that.backgroundALL = '#1c1f22'
						that.colorALL = '#FFF'
					}, 2000);
					
					uni.setStorageSync('localbk', '#1c1f22');
					uni.setStorageSync('localcol', '#FFF');
				} else{
					this.buxian1 = true;
					this.buxian = false;
					var that = this
					setTimeout(function() {
						that.buxian1 = false;
						uni.hideLoading();
						uni.showToast({
							title: This.$t('heibai.gbyjms'),
							icon: "none",
							duration: 1000
						});
						that.backgroundALL = '#FFF'
						that.colorALL = '#000'
					}, 2000);
					uni.setStorageSync('localbk', '#FFF');
					uni.setStorageSync('localcol', '#000');
				}
				
			}
	
		}
	}
</script>

<style lang="scss">
	
@keyframes warn {
	0% {
		transform: scale(0);
		opacity: 0.9;
	}

	50% {
		transform: scale(0.1);
		opacity: 0.3;
	}

	100% {
		transform: scale(1);
		opacity: 0.0;
	}
}
@-webkit-keyframes "warn" {
	0% {
		-webkit-transform: scale(0);
		opacity: 0.9;
	}

	50% {
		-webkit-transform: scale(0.1);
		opacity: 0.3;
	}

	100% {
		-webkit-transform: scale(1);
		opacity: 0.0;
	}
}
 
.container {
	position: fixed;
	width: 100%;
	height:100%;
	top: 0upx;
	left: 0upx;
	overflow: hidden;
	box-sizing:border-box;
}
/* 保持大小不变的小圆圈  */

/* 产生动画（向外扩散变大）的圆圈  */
.pulse {
	position: absolute;
	width: 500upx; 
	height: 500upx;
	border:400upx solid #000;
	left: 0upx;
	margin-left: -280upx;
	background-color: #000;
	-webkit-border-radius: 30px;
	-moz-border-radius: 30px;
	border-radius: 50%;
	z-index: 1;
	opacity: 0;
	-webkit-animation: warn 2s ease-out;
	-moz-animation: warn 2s ease-out;
	animation: warn 2s ease-out;
	-webkit-animation-iteration-count: infinite;
	-moz-animation-iteration-count: infinite;
	animation-iteration-count: infinite;
}
.pulse1 {
	position: absolute;
	width: 500upx; 
	height: 500upx;
	border:400upx solid #FFF;
	left: 0upx;
	margin-left: -280upx;
	background-color: #FFF;
	-webkit-border-radius: 30px;
	-moz-border-radius: 30px;
	border-radius: 50%;
	z-index: 1;
	opacity: 0;
	-webkit-animation: warn 2s ease-out;
	-moz-animation: warn 2s ease-out;
	animation: warn 2s ease-out;
	-webkit-animation-iteration-count: infinite;
	-moz-animation-iteration-count: infinite;
	animation-iteration-count: infinite;
}

page {
	background-color: #f2f4ff;
	font-size: 30upx;
}

.list {
	width: 100%;
	
	
	display: flex;
	flex-direction: column;
	&:last-child {
		border: none;
	}
	.li {
		width: 100%;
		height: 100upx;
		padding: 0 30upx;
		box-sizing: border-box;
		border-bottom: 1px solid #e5e8f3;
		display: flex;
		align-items: center;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background: #ffffff;
		&.noborder {
			border-bottom: 0;
		}
		.r{
			display: flex;flex-direction: row;align-items: center;
			
		}
		.text {
			color: #393b59;
			font-weight: bold;
			
		}
		.to {
			flex-shrink: 0;
			width: 30upx;
			height: 30upx;
		}
	}
}

</style>
