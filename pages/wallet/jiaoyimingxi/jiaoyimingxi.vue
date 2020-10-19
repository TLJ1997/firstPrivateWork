<template>
	<view class="container hi-columns" :style="backgroundALL == '#1c1f22'?'background:#05060F;':'background:#F0F3F5'">
		<!-- 标题栏 -->
		<view class="header hi-columns" :style="'padding-top: '+statusBarH+'px;'">
			<view class="header_box hi-rows hi-flex-vcenter  hi-space-between">
				<view class="tab_box hi-rows hi-flex-vcenter">
					<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'" mode=""
					 style="width:46upx;height: 46upx;" @click="Back()"></image>
				</view>
				<view class="tab_box hi-rows hi-flex-vcenter">
					
				</view>
			</view>
		</view>
		<view class="zc_text hi-rows hi-flex-vcenter  hi-space-between">
			<view class="hi-rows">
				<text class="t_bt_text" :style="hb_status?'color: #242833;':'color: #ffffff;'">{{$t('wallet.jymx')}}</text>
				<view class="bt_bj">{{$t('wallet.ssjyjl')}}</view>
			</view>
			<view class="hi-columns hi-flex-vcenter" @click="edit()">
				<image src="../../../static/wallet/icon_screen.png" style="width: 30upx;height: 30upx;" mode=""></image>
				<text style="color: #8792A8;font-size: 22upx;margin-top: 10upx;">{{$t('wallet.sx')}}</text>
			</view>
			
		</view>
		<view class="content">
			<view class="list_box">
				<you-scroll ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll"  style="height: 100%;background: #007AFF;">
					<!-- <view>
						<view class="item_box hi-rows hi-space-between" v-for="item in list" :key="item" @click="scrollTo" :style="hb_status?'background: #FFFFFF;border-bottom: 1upx solid rgba(0,0,0,.1);':'background: #18253D;border-bottom: 1upx solid rgba(255,255,255,.1);'" open-type="navigate" >
								<view class="hi-rows">
									<image src="../../../static/wallet/icon_bizhong.png" mode="" style="width: 60upx;height: 60upx;"></image>
								</view>
								<view class="hi-columns" style="flex: 1;">
									<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-bottom: 10upx;">
										<text class="title" :style="hb_status?'color: #242833;':'color: #ffffff;'">NT场外账户</text>
										
									</view>
									<view class="hi-rows hi-flex-vcenter hi-space-between" style="margin-left: 20upx;">
										 <text class="flex1">时间：2019-09-21  11:49</text>
										 <text class="flex1 r">类型：网络转入</text>
									</view>
									<view class="hi-rows hi-flex-vcenter hi-space-between">
										 <text class="flex1">数量：<text style="font-weight: bold;font-size: 36upx;">1000.0000</text></text>
										 <text class="flex1 r"></text>
									</view>
								</view>
						</view>
					</view> -->
					<view style="font-size: 25upx; width: 100%;line-height: 80upx; text-align: center; color: #999;">{{$t('wallet.zwjl')}}</view>
				</you-scroll>
			</view>
			
			
			
		</view>
			
		
		<view :class="isshow_left_muen?'left_muen_maks active':'left_muen_maks'" :style="hb_status?'background: rgba(0,0,0,.7);':'background: rgba(0,0,0,.3);'" @click="edit()" ></view>	
		<view :class="isshow_left_muen?'left_muen_box active':'left_muen_box'" :style="backgroundALL == '#1c1f22'?'background:#18253D;':'background:#ffffff'">
			<!-- 标题栏 -->
			<view class="muen_header hi-columns" :style="'padding-top: '+statusBarH+'px;'">
				<view class="hi-rows hi-flex-vcenter  hi-space-between">
					<view class="hi-rows hi-flex-vcenter">
						<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'" mode=""
						 style="width:46upx;height: 46upx;" @click="edit()"></image>
					</view>
					<view class="hi-rows hi-flex-vcenter">
					</view>
				</view>
			</view>
			<view class="header_title_box hi-rows hi-flex-vcenter hi-space-between">
				<view class="header_item hi-rows hi-flex-vcenter hi-space-between">
					<text class="t1"  :style="hb_status?'color: #242833;':'color: #ffffff;'">{{$t('wallet.sx')}}</text>
				</view>
				<view class="header_item">
					
				</view>
			</view>
			<view style="height: 80vh; flex: 1;overflow-y: auto;padding-bottom: 160upx;box-sizing: border-box;">
				
					<view class="menu_l_title" :style="hb_status?'color: #242833;border-left: 6upx solid #242933;':'color: #ffffff;border-left: 6upx solid #ffffff;'">{{$t('wallet.zh')}}</view>
				<view class="menu_btns_box hi-rows hi-flex-vcenter hi-wrap">
					<view class="btns_text" :class="cwzh.index==0?'active':''" @click="tab_xz_btn('cwzh',0)" style="margin-right: 20upx;">{{cwzh.list[0].name}}</view>
					<view class="btns_text" :class="cwzh.index==1?'active':''" @click="tab_xz_btn('cwzh',1)">{{cwzh.list[1].name}}</view>
				</view>	
				<view class="menu_l_title" :style="hb_status?'color: #242833;border-left: 6upx solid #242933;':'color: #ffffff;border-left: 6upx solid #ffffff;'">{{$t('wallet.bm')}}</view>
				<view class="menu_btns_box hi-rows hi-flex-vcenter hi-space-between hi-wrap">
					<view class="btns_text" :class="biname.index==index?'active':''" @click="tab_xz_btn('biname',index)"  v-for="(item,index) in biname.list" :key="index">{{item.name}}</view>
				</view>	

				<view class="menu_l_title" :style="hb_status?'color: #242833;border-left: 6upx solid #242933;':'color: #ffffff;border-left: 6upx solid #ffffff;'">{{$t('wallet.lx')}}</view>
				<view class="menu_btns_box hi-rows hi-flex-vcenter hi-space-between hi-wrap">
					<view class="btns_text" :class="biType.index==index?'active':''" @click="tab_xz_btn('biType',index)"  v-for="(item,index) in biType.list" :key="index">{{item.name}}</view>
				</view>
				<view class="menu_l_title" :style="hb_status?'color: #242833;border-left: 6upx solid #242933;':'color: #ffffff;border-left: 6upx solid #ffffff;'">{{$t('wallet.sj')}}</view>
				<view class="menu_btns_box hi-rows hi-flex-vcenter hi-space-between hi-wrap">
					<view class="btns_texts">
						<picker mode="date" :value="startdate" :start="startDate" :end="endDate" @change="bindstartDateChange">
							<view class="uni-input" style="color:#8792A8;">{{startdate}}</view>
						</picker>
					</view>
					<view class="btns_textt"></view> 
					<view class="btns_texts">
						<picker mode="date" :value="enddate" :start="startDate" :end="endDate" @change="bindenddateDateChange">
							<view class="uni-input" style="color:#8792A8;">{{enddate}}</view>
						</picker>
					</view>
				</view>

			</view>
			
			<view class="btn_sx hi-rows hi-flex-vcenter hi-space-between" :style="hb_status?'background:rgba(255,255,255,1);':'background:rgba(34,48,77,1);'">
				<view class="b1" @click="Reset()">{{$t('wallet.cz')}}</view>
				<view class="b2" @click="ok()">{{$t('wallet.qd')}}</view> 
			</view>
			

		</view>	

	</view>
</template>

<script>
	var This;
	import youScroll from '@/components/you-scroll'
	export default {
		components: {
			youScroll
		},
		data() {
			const currentDate = this.getDate({
			            format: true
			        })
			return {
				cwzh:{
					index:0,
					list:[
						{
							id:1,
							name:this.$t('wallet.bbzh')
						},
						{
							id:2,
							name:this.$t('wallet.cwzh')
						}
					]
				},
				biname:{
					index:0,
					list:[
						{
							id:1,
							name:this.$t('wallet.qb')
						},
						{
							id:2,
							name:'ETH'
						},
						{
							id:3,
							name:'USDT'
						},
						{
							id:4,
							name:'EOS'
						},
						{
							id:5,
							name:'NEO'
						},
						{
							id:6,
							name:'YK'
						},
						{
							id:7,
							name:'NT'
						},
						{
							id:8,
							name:'ONE'
						},
						{
							id:9,
							name:'DUSD'
						}
					]
					
				},
				biType:{
					index:0,
					list:[
						{
							id:1,
							name:this.$t('wallet.qb')
						},
						{
							id:2,
							name:this.$t('wallet.wlzr')
						},
						{
							id:3,
							name:this.$t('wallet.wlzc')
						},
						{
							id:4,
							name:this.$t('wallet.jyzr')
						},
						{
							id:5,
							name:this.$t('wallet.jyzc')
						},
						{
							id:6,
							name:this.$t('wallet.zjhz')
						}
					]
				},
				startdate: currentDate, //开始日期
				enddate: currentDate, //结束日期
				list: [1, 2, 3, 4, 5],
				backgroundALL:'',
				colorALL:'',
				statusBarH: '',
				header_H:0,
				windowHeight:0,
				hb_status:true,
				isshow_money:true ,//是否显示金额
				isshow_left_muen:false, //是否显示编辑币侧滑
				props: {
				        label: 'label'
				      },
				      lists: [
				        {
				          label: 'XLB'
				        },
				        {
				          label: 'ETH'
				        },
				        {
				          label: 'USDT'
				        },
				        {
				          label: 'EOS'
				        },
				        {
				          label: 'NEO'
				        },
				        {
				          label: 'YK'
				        },
				        {
				          label: 'NT'
				        },
				        {
				          label: 'ONE'
				        },
				        {
				          label: 'DUSD'
				        },
				        {
				          label: 'TIDA'
				        }
				      ]
				 
			};
		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
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
				}
			})
			
			var view = uni.createSelectorQuery().select(".header");
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
		onReady() {
			// console.log(this.$refs.scroll)
		},
		methods: {
			tab_xz_btn(name,index){
				if(name=='cwzh'){
					this.cwzh.index=index
					
				}else if(name=='biname'){
					
					this.biname.index=index
					
				}else if(name=='biType'){
					
					this.biType.index=index
				}
			},
			Reset(){
				this.cwzh.index=0;
				this.biname.index=0;
				this.biType.index=0;
				console.log('重置')
			},
			ok(){
				this.isshow_left_muen=!this.isshow_left_muen;
				console.log('账户--'+this.cwzh.list[this.cwzh.index].name)
				console.log('币名--'+this.biname.list[this.biname.index].name)
				console.log('类型--'+this.biType.list[this.biType.index].name)
				console.log('开始时间--'+this.startdate)
				console.log('结束时间--'+this.enddate)
			
			},
			 bindPickerChange: function(e) {
			            console.log('picker发送选择改变，携带值为', e.target.value)
			            this.index = e.target.value
			        },
			bindstartDateChange: function(e) {
			            this.startdate = e.target.value
			        },
			bindenddateDateChange: function(e) {
						this.enddate = e.target.value
					},
			 bindTimeChange: function(e) {
			            this.time = e.target.value
			        },
			getDate(type) {  //时间
			            const date = new Date();
			            let year = date.getFullYear();
			            let month = date.getMonth() + 1;
			            let day = date.getDate();
			
			            if (type === 'start') {
			                year = year - 60;
			            } else if (type === 'end') {
			                year = year + 2;
			            }
			            month = month > 9 ? month : '0' + month;;
			            day = day > 9 ? day : '0' + day;
			            return `${year}-${month}-${day}`;
			        },
			Back(){
				uni.navigateBack({
					delta:1
				})
			},
			onDragSortChange (e) {
			      console.log(JSON.stringify(e))
			    },
			edit(){ //显示隐藏侧边栏
				this.isshow_left_muen=!this.isshow_left_muen;
			},
			isshow_money_btn(){  //点击是否显示金额
				this.isshow_money=!this.isshow_money;
			},
			onPullDown(done) { // 下拉刷新
				console.log('下拉')
				setTimeout(() => {
					this.list = [1,2,3,4,5,6,7,8,9,10];
					done(); // 完成刷新
				},1000*1)
			},
			onScroll(e) { // 监听滚动
				console.log(e.detail.scrollTop)
			},
			onLoadMore(e) { // 加载更多
				setTimeout(() => {
					let len = this.list.length;
					for (let i = 1; i <= 10; i++) {
						this.list.push(len + i);
					}
				},1000*1)
			},
			scrollTo() {
				this.$refs.scroll.goTop();
			},
			tab_init(){
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
	};
</script>

<style>
	
	.container {width: 100%;height: 100%;overflow: hidden;}
		
		/* .header {padding: 0 40upx;box-sizing: border-box;} */
		.header {padding: 0 40upx;box-sizing: border-box;position: fixed;width: 100%;left: 0;top: 0;z-index: 99999;}
		.header .header_box {height: 88upx;} 
	.tab_box text{font-size: 30upx;color: #FFFFFF;margin-left: 40upx;}
	
		.banner{width: 750upx;height:calc(var(--status-bar-height) + 400upx) ;position: fixed;top: 0;left: 0;}
		.zc_text{width: 750upx;position: fixed;top: calc(var(--status-bar-height) + 88upx) ;left: 0;padding: 0 40upx;box-sizing: border-box;margin-bottom: 20upx;}
		.zc_text .t_bt_text{font-size: 48upx;color: #FFFFFF;margin-right: 10upx;}
		.zc_text .bt_bj{font-size: 22upx;color: #8792A8;align-self: flex-end;}
		
		
		.content{width: 100%;flex: 1;padding-top:calc(var(--status-bar-height) + 200upx);box-sizing: border-box;}
		.wallet_box{width: 670upx;height: 280upx;border-radius: 20upx;margin: 0 40upx;position: relative;z-index: 99999999;box-sizing: border-box;}
		.l_z_text .text{font-size: 32upx;color: #FFFFFF;}
		.wallet_box .money_text{padding: 20upx 0;}
		.wallet_box .money_text .m_c{font-size: 30upx;color: #FFFFFF;margin-right: 20upx;margin-left: 30upx;}
		.wallet_box .money_text .m_text{font-size: 60upx;color: #FFFFFF;}
		.wallet_box .safe_box{}
		.wallet_box .safe_box .safe_text{font-size: 22upx;color: #FFFFFF;width: 100upx;height: 36upx;background: #4FB757;border-radius: 18upx;line-height: 36upx;text-align: center;}

	
	.list_box{flex: 1;width: 100%;overflow: auto;}  

	
	.item_box{padding: 35upx 40upx;box-sizing: border-box;}
	.item_box .title{font-size: 36upx;margin-left: 30upx;font-weight:500;}
	.item_box .m_box .t1{font-size: 30upx;align-self: flex-end;}
	.item_box .m_box .t2{font-size: 24upx;color: #8792A8;align-self: flex-end;}
	.item_box .r{align-items: flex-start;text-align: right;}
	.item_box .flex1{flex: 1;color: #8792A8;font-size: 26upx;}
	.item_box .t{color: #FFFFFF;}
	
	
	
	
	.left_muen_maks{display: none; position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 999999999999999999999999999999998;border-radius:0px 30px 30px 0px;transition: all .3s ease-in-out;}
	.left_muen_maks.active{display: flex;}
	.left_muen_box{position: fixed;top: 0;left: -650upx;width: 650upx;height: 100%;z-index: 999999999999999999999999999999999;border-radius:0px 30px 30px 0px;transition: all .3s ease-in-out;}
	.left_muen_box.active{left: 0;}
	.muen_header>view{height: 88upx;padding: 0 40upx;box-sizing: border-box;}
	.header_title_box{padding: 0 40upx;box-sizing: border-box;margin: 20upx 0;}
	.header_title_box .header_item{text-align: center;}
	.header_title_box .header_item .t1{font-size: 48upx;color: #FFFFFF;font-weight: bold;}
	.header_title_box .header_item .t2{color: #8792A8;font-size: 22upx;margin-left: 19upx;}
	.header_title_box .header_item .h_btn{color:#3A74FC;border: 1upx solid #3A74FC;width: 120upx;height: 58upx;border-radius: 29upx;line-height: 58upx;}
	.left_muen_box .menu_l_title{padding-left: 35upx;margin: 40upx 0;}
	.left_muen_box .menu_btns_box{padding: 0 40upx;box-sizing: border-box;}
	.left_muen_box .menu_btns_box .btns_text{font-size:22upx;width: 180upx;height: 60upx;margin: 15upx 0; line-height: 60upx;text-align: center;border-radius: 30upx;background:rgba(192,196,204,.2);color: #8792A8;flex-wrap: wrap;}
	.left_muen_box .menu_btns_box .btns_text.active{background:#3A74FC;color: #FFFFFF;}
	
	.left_muen_box .menu_btns_box .btns_texts{font-size:22upx;width: 250upx;height: 60upx;margin: 15upx 0; line-height: 60upx;text-align: center;border-radius: 30upx;background:rgba(192,196,204,.2);color: #8792A8;flex-wrap: wrap;}
	.left_muen_box .menu_btns_box .btns_texts input{font-size:22upx;color: #8792A8;}
	.left_muen_box .menu_btns_box .btns_textt{width:22upx;height:2upx;background:rgba(135,146,168,1);border-radius:1upx;}
	
	.btn_sx{padding: 40upx;box-sizing: border-box;width:100%;height:160upx;border-radius:0px 0px 30upx 0px;align-items: flex-end;position: absolute;bottom: 0;left: 0;}
	.btn_sx .b1{width:270upx;height:80upx;text-align: center;line-height: 80upx; background:rgba(192,196,204,0);border:2upx solid rgba(230, 67, 64, 1);border-radius:40upx;font-size: 32upx;color: #E64340;}
	.btn_sx .b2{width:270upx;height:80upx;text-align: center;line-height: 80upx; background:#3A74FC;border-radius:40upx;font-size: 32upx;color: #FFFFFF;}
	
	
	page {
		height: 100%;
		overflow: hidden;
	}

	.content {
		text-align: center;
		height: 100%;
	}
	.content .block {
		height: 200px;
		line-height: 200px;
		text-align: center;
		margin: 10px;
		background-color: aquamarine;
	}
	.content .loadingText {
		line-height: 30px;
		text-align: center;
		font-size: 12px;
		color: #999;
	}

	#preloader_1{
		height: 40px;
		line-height: 40px;
		position:relative;
		text-align: center;
	}
	#preloader_1 span{
		width: 5px;
		height: 5px;
		margin: 0 1px;
		display: inline-block;
		vertical-align: middle;
		background: #9b59b6;
		animation: preloader_1 1.5s  infinite ease-in-out;
	}  
	#preloader_1 span:nth-child(2){
		animation-delay: .2s;  
	}
	#preloader_1 span:nth-child(3){
		animation-delay: .4s;
	}
	#preloader_1 span:nth-child(4){
		animation-delay: .6s;
	}
	#preloader_1 span:nth-child(5){
		animation-delay: .8s;
	}
	@keyframes preloader_1 {
		0% {height:5px;background:#9b59b6;}
		25% {height:30px;background:#3498db;}
		50% {height:5px;background:#9b59b6;}
		100% {height:5px;background:#9b59b6;}
	}
</style>
