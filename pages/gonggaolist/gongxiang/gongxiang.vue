<template>
	<view class="grace-margin" :style="{background:backgroundALL}" style="height:100vh;width: 100%;margin: 0;box-sizing: border-box; padding: 30upx;">
		<view class="grace-news-list" style="margin-top:10px;">
			<view style="padding: 20upx;">
				<view style="display: flex;justify-content: space-between;">
					<view class="new_icon">
						hot
					</view>
					<view class="time" :style="{color:colorALL}">
						{{times}}
					</view>
				</view>
				<view class="tuwen" style="font-size: 35upx; font-weight: bold;" :style="{color:colorALL}">{{tuwenlist.title}}</view>
				<view class="tushi" :style="{color:colorALL}">{{tuwenlist.time}}</view>
				<rich-text :nodes="dashea" class="info-content" :style="{color:colorALL}"></rich-text>
			</view>
		</view>
		<view class="footer">
			<view :style="{color:colorALL}">youkeycoin</view>
			<image src="../../../static/index/gonggao.png" class="fotImg"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tuwenlist: '',
				dashea:[],
				backgroundALL:'',
				cibackgroundALL:'',
				colorALL:'',
				times:''
			}
		}, 
		onShow:function(){
			this.backgroundALL = uni.getStorageSync('localbk')
			this.cibackgroundALL = uni.getStorageSync('cilocalbk')
			this.colorALL = uni.getStorageSync('localcol')
			if (this.backgroundALL == '#020229') {
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: this.cibackgroundALL
			
				})
			} else {
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#ffffff'
				})
			}
		},
		onLoad(option) {
			console.log(option.id)
			let _this = this;
			uni.request({
				url: _this.websiteUrlshou + 'index/getAnnouncementById',
				method: 'GET',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					"Accept-Language":'zh'
				},
				data: {
					id: option.id
				},
				success: res => {
					console.log('res.data: ' + JSON.stringify(res.data));
					_this.tuwenlist = res.data.data 
					_this.dashea = res.data.data.content
					_this.times = res.data.data.createDate
				},
				fail: () => {},
				complete: () => {}
			});


		},
		methods: {
			
	}
}
</script>

<style>
	.footer{
		float: right;
		font-size: 32upx;
		font-weight: 700;
		text-align: left;
	}
		
	.fotImg{
		width: 80upx;
		height: 40upx;
		margin-left: 80upx;
		margin-top: 20upx;
	}
	.new_icon {
		width: 80upx;
		height: 30upx;
		line-height: 30upx;
		text-align: center;
		background-color: #FDB44B;
		color: #FFFDEF;
		border-radius: 6upx;
		font-size: 24upx;
		margin-right: 20upx;
		padding: 6upx 0;
	}
	
	.content {
		box-sizing: border-box;
	}
	.tuwen{
		margin-top: 30upx;
	}
	.tushi{
		line-height: 100upx;
		font-size: 24upx;
		color: #999;
	}
	.chaochu{
		overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
	}
	.info {
		color: #0080FF;
		
		margin: 10upx 0;
		margin-top: 30upx;
	}

	.input_box {
		border-bottom: 4upx solid #0080FF;
	}

	.input_box input {
		height: 80upx;
		line-height: 80upx;
		font-size: 34upx;
	}

	.btn {
		height: 80upx;
		line-height: 80upx;
		width: 100%;
		text-align: center;
		background: #0080FF;
		border-radius: 16upx;
		color: #FFFFFF;
		margin-top: 130upx;
	}
	.info-content{
		display: flex;
		font-size:30upx;
		color: #383838;
		line-height: 1.75em;
		text-indent: 2em;
	}
</style>
