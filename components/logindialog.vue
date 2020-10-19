<template>
	<view>
		<view v-if="isshow">
			
			<view class="layer"></view>
			<view class="dialog">
				<view class="title">{{$t('components.aqrz')}}</view>
				<view class="desc">{{$t('components.zzaq')}}</view>
				<loginVerify @verfy="verfy"></loginVerify>
				<img src="/static/img/icon_lose.png" class="closeico" @click="close">
			</view>
		</view>
		
		<!--验证加载中框-->
		<uni-popup ref="popup" type="center" :maskClick="false" :custom="true">
			<view class="scanpopup">
				<img src="/static/img/scan.gif" class="scangif"><br>
				<text class="popuptitle">{{$t('components.aqjc')}}</text>
			</view>
		</uni-popup>
	
	</view>
</template>

<script>
	import loginVerify from '@/components/loginVerify'
	import uniPopup from '@/components/uni-popup/uni-popup'
	
	export default {
		components:{
			loginVerify,
			uniPopup
		},
		props:{
			isshow:false
		},
		data() {
			return {
				isverify:false
			};
		},
		methods:{
			verfy(isverify){
				this.isverify=isverify;
				if(isverify){
					this.$refs.popup.open();
					var t=this;
					setTimeout(function(){
						t.$refs.popup.close();
						t.$emit("verfy",true);
					},2000)
				}
				this.$emit("verfy",isverify);
			},
			close(){
				this.isshow=false;
				this.$emit("close");
			}
		}
	}
</script>

<style lang="scss">
	.layer{
		background: #000000;
		opacity: 0.5;
		width:100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 99998;
	}
.dialog{
		background: #fff;
		width:600upx;
		height:900upx;
		position:absolute;
		border:0px;
		border-radius: 30upx;
		left:75upx;
		top:217upx;
		/*margin-left:-150upx;
		margin-top:-150upx;*/
		z-index: 999999;
}
.title{
	font-size:36upx;
	font-weight:500;
	color:#242933;
	text-align: center;
	margin-top: 80upx;
}
.desc{
	font-size:24upx;
	font-weight:400;
	color:#8792A8;
	line-height:36upx;
	margin-top:35upx;
	margin-left: 85upx;
	width:430upx;
}
.closeico{
	position:absolute;
	left:50%;
	//top:980upx;
	bottom: 20upx;
	width: 80upx;
	height: 80upx;
}

	.scanpopup{width: 280upx;height: 280upx;border-radius: 20upx;background: #fff;text-align: center;}
	.scangif{width: 90upx;height: 90upx;margin-top: 60upx;}
	.popuptitle{font-size:32upx;font-weight:400;color:#242933;text-align: center;}
</style>
