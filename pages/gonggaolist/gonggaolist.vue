<template>
	<view class="grace-margin" :style="{background:backgroundALL}" style="height:100vh;width: 100%;margin: 0;box-sizing: border-box; padding: 30upx;">
		<view class="grace-news-list" style="margin-top:10px;">
			<view class="item" v-for="(item, index) in tuwenlist" :key="index" @tap="quxiangqing(item.id)" style="border-bottom: 1upx solid #f5f5f5; height: 70upx; padding-top: 15upx;">

				<view class="body">
					<view class="new_icon">
						hot
					</view>
					<view class="chaochu title" :style="{color:colorALL}">{{item.title}}</view>
				</view>
				<image src="/static/icon_next step.png" style="width: 50upx;height: 50upx;opacity: .6;"></image>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tuwenlist: [],
				backgroundALL: '',
				cibackgroundALL: '',
				colorALL: ''
			}
		},
		onShow: function() {
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
		onLoad() {

			uni.request({
				url: this.websiteUrlshou + 'index/getIndexAnnouncementTitles',
				method: 'GET',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					"Accept-Language": 'zh'
				},
				data: {
					token: uni.getStorageSync('udata').token,
					lang: 'zh_CN'
				},
				success: res => {
					console.log('res.data: ' + JSON.stringify(res.data));
					this.tuwenlist = res.data.data
					console.log(this.tuwenlist)
				},
				fail: () => {},
				complete: () => {}
			});


		},
		methods: {
			quxiangqing(id) {
				uni.navigateTo({
					url: "gongxiang/gongxiang?id=" + id
				})
			}
		}
	}
</script>

<style>
	@import "../../graceUI/graceUI.css";

	.content {
		box-sizing: border-box;
	}

	.chaochu {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		font-weight: 700;
	}

	.info {
		color: #0080FF;
		font-size: 28upx;
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

	.item {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.body{
		display: flex;
		justify-content: left;
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
	}
</style>
