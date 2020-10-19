<template>
	<view class="container hi-columns" :style="backgroundALL == '#1c1f22'?'background:#05060F;':'background:#F0F3F5;'">
		<!-- 标题栏 -->
		<view class="muen_header hi-columns" :style="'padding-top:'+statusBarH+'px;'">
			<view class="hi-rows hi-flex-vcenter  hi-space-between">
				<view class="hi-rows hi-flex-vcenter">
					<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'"
					 mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
				</view>
				<view class="hi-rows hi-flex-vcenter">
				</view>
			</view>
		</view>
		<view class="header_title_box hi-rows hi-flex-vcenter hi-space-between">
			<view class="header_item hi-rows hi-flex-vcenter hi-space-between">
				<text class="t1" :style="hb_status?'color: #242833;':'color: #ffffff;'">发布广告</text>
			</view>
			<view class="header_item">
			</view>
		</view>
		<view class="content" style="flex: 1;margin-bottom: 100upx;">
			
			<view class="item" style="width: 100%;" :style="hb_status?'flex: 1;background:#FFFFFF;color:#242933;margin-bottom: 100upx;':'flex: 1;background: #18253D;color:#ffffff;margin-bottom: 100upx;'">
				
				<view class="hi-columns" style="margin: 46upx 0 42upx 0;" :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);':'border-bottom: 1upx solid rgba(255,255,255,.1);'">
					<text class="t_text" :style="hb_status?'border-left: 6upx solid #242933;color: #242933;':'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'" >{{$t('trade.jylx')}}</text>
					<view class="hi-rows hi-flex-vcenter hi-space-between ims">
						<text class="t_name" :style="hb_status?'color: #242933;':'color: #FFFFFF;'" >{{bizhong.list[bizhong.index]}}</text>
						<view class="hi-rows hi-flex-vcenter">
							<picker @change="bindbizhongChange" :value="bizhong.list[bizhong.index]" :range="bizhong.list">        
								<text class="t_r_infto">{{$t('trade.xzbz')}}</text>
								<text class="grace-icons icon-arrow-right"></text>
							</picker>
						</view>
					</view>
				</view>
				
				<view class="hi-columns" style="margin-bottom: 30upx;" :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);':'border-bottom: 1upx solid rgba(255,255,255,.1);'">
					<text class="t_text" :style="hb_status?'border-left: 6upx solid #242933;color: #242933;':'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'" >{{$t('trade.jylx')}}</text>
					
					<radio-group class="hi-columns" @change="jytypeChange">
						<label class="hi-columns" :class="index==1?'pb40':'m40'"   v-for="(item,index) in radioItems.name" :key="index" :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);':'border-bottom: 1upx solid rgba(255,255,255,.1);'">
							<view class="hi-rows hi-flex-vcenter hi-space-between">
								<view class="hi-rows hi-flex-vcenter">
									<image :src="item.icon" mode="" style="width: 48upx;height: 48upx;margin-right: 30upx;"></image>
									<text :style="hb_status?'color: #242933;':'color: #FFFFFF;'" >{{item.value}}</text>
								</view>
								<view class="hi-rows hi-flex-vcenter">
									 <radio :id="item.name" :value="item.name"  :checked="item.checked"></radio>
								</view>
							</view>	
						</label>
					</radio-group>
				</view>
				
				<!-- <view class="hi-columns" style="margin-bottom: 30upx;" :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);':'border-bottom: 1upx solid rgba(255,255,255,.1);'">
					<text class="t_text" :style="hb_status?'border-left: 6upx solid #242933;color: #242933;':'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'" >交易地区</text>
					<view class="hi-rows hi-flex-vcenter hi-space-between ims">
						<text class="t_name" :style="hb_status?'color: #242933;':'color: #FFFFFF;'" >{{area.name[area.index]}}</text>
						<view class="hi-rows hi-flex-vcenter">
							<picker @change="bindareaChange" :value="area.name[area.index]" :range="area.name">        
								<text class="t_r_infto">选择地域</text>
								<text class="grace-icons icon-arrow-right"></text>
							</picker>
						</view>
					</view>
				</view>
				
				<view class="hi-columns" style="margin-bottom: 30upx;" :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);':'border-bottom: 1upx solid rgba(255,255,255,.1);'">
					<text class="t_text" :style="hb_status?'border-left: 6upx solid #242933;color: #242933;':'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'" >货币类型</text>
					<view class="hi-rows hi-flex-vcenter hi-space-between ims">
						<text class="t_name" :style="hb_status?'color: #242933;':'color: #FFFFFF;'" >{{bitype.name[bitype.index]}}</text>
						<view class="hi-rows hi-flex-vcenter">
							<picker @change="bindbitypeChange" :value="bitype.name[bitype.index]" :range="bitype.name">        
								<text class="t_r_infto">选择货币类型</text>
								<text class="grace-icons icon-arrow-right"></text>
							</picker>
						</view>
					</view>
				</view> -->
				
				<view class="hi-columns" style="margin-bottom: 30upx;">
					
					<view class="hi-rows hi-flex-vcenter" :style="hb_status?'border-left: 6upx solid #242933;color: #242933;':'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'">
						<text class="t_text">{{$t('trade.yjbl')}} </text><image src="../../../static/trade/icon_problem.png" style="width: 30upx;height: 30upx;margin-left: 20upx;" mode="" @click="yichubz_btn"></image>
					</view>
					<view class="hi-columns" :class="false?'pb40':'m40'"  :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);':'border-bottom: 1upx solid rgba(255,255,255,.1);'">
							<view class="hi-rows hi-flex-vcenter hi-space-between">
								<view class="hi-rows hi-flex-vcenter">
									<text class="t_name" :style="hb_status?'color: #242933;':'color: #FFFFFF;'" >{{yichubili}}%</text>
								</view>
								<view class="hi-rows hi-flex-vcenter">
									<text class="t_r_infto" style="font-size: 22upx;">{{$t('trade.dqscckz')}}{{jiage}} CNY/{{bizhong.list[bizhong.index]}}</text>
								</view>
							</view>	
					</view> 
					<view class="hi-columns" :class="true?'pb40':'m40'"  :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);':'border-bottom: 1upx solid rgba(255,255,255,.1);'">
							<view class="hi-columns">
								<slider min="-10" max="10" step="0.1" :value="yichubili" @change="sliderChange" activeColor="#3A74FC" backgroundColor="#C0C4CC" block-color="#3A74FC" block-size="20"  />
							</view>	
					</view>
				</view>
				
				<view class="hi-columns" style="margin-bottom: 30upx;">
					<text class="t_text" :style="hb_status?'border-left: 6upx solid #242933;color: #242933;':'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'" >{{$t('trade.jyjg')}}(CNY)</text>
					<view class="hi-columns" :class="true?'pb40':'m40'"  :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);':'border-bottom: 1upx solid rgba(255,255,255,.1);'">
							<view class="hi-rows hi-flex-vcenter hi-space-between">
								<view class="hi-rows hi-flex-vcenter">
									<text class="t_name" :style="hb_status?'color: #242933;':'color: #FFFFFF;'" >{{zuizhongjia}}</text>
								</view>
								<view class="hi-rows hi-flex-vcenter">
									<!-- <text class="t_r_infto" style="font-size: 22upx;">当前报价大约排在78位</text> -->
								</view>
							</view>	
					</view> 
				</view>
				
<!-- 				<view class="hi-columns" style="margin-bottom: 30upx;">
					<text class="t_text" :style="hb_status?'border-left: 6upx solid #242933;color: #242933;':'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'" >最高价(CNY)</text>
					<view class="hi-columns" :class="true?'pb40':'m40'"  :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);':'border-bottom: 1upx solid rgba(255,255,255,.1);'">
							<view class="hi-rows hi-flex-vcenter hi-space-between">
								<view class="hi-rows hi-flex-vcenter">
									<text class="t_name" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">0.0000</text>
								</view>
								<view class="hi-rows hi-flex-vcenter">
									<text class="t_r_infto" style="font-size: 22upx;"></text>
								</view>
							</view>	
					</view> 
				</view> -->
				
				<view class="hi-columns" style="margin-bottom: 30upx;">
					<text class="t_text" :style="hb_status?'border-left: 6upx solid #242933;color: #242933;':'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'" >{{$t('trade.zxl')}}(CNY)</text>
					<view class="hi-columns" :class="true?'pb40':'m40'"  :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);':'border-bottom: 1upx solid rgba(255,255,255,.1);'">
							<view class="hi-rows hi-flex-vcenter hi-space-between">
								<view class="hi-rows hi-flex-vcenter">
									<input type="text" v-model="minnum" />
								</view>
								<view class="hi-rows hi-flex-vcenter">
									<text class="t_r_infto" style="font-size: 22upx;"></text>
								</view>
							</view>	
					</view> 
				</view>
				
				<view class="hi-columns" style="margin-bottom: 30upx;">
					<text class="t_text" :style="hb_status?'border-left: 6upx solid #242933;color: #242933;':'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'" >{{$t('trade.zdl')}}(CNY)</text>
					<view class="hi-columns" :class="true?'pb40':'m40'"  :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);':'border-bottom: 1upx solid rgba(255,255,255,.1);'">
							<view class="hi-rows hi-flex-vcenter hi-space-between">
								<view class="hi-rows hi-flex-vcenter">
									<input type="text" v-model="maxnum" />
								</view>
								<view class="hi-rows hi-flex-vcenter">
									<text class="t_r_infto" style="font-size: 22upx;"></text>
								</view>
							</view>	
					</view> 
				</view>
				
				<view class="hi-columns" style="margin-bottom: 30upx;" :style="hb_status?'border-bottom: 1upx solid rgba(36,41,51,.1);':'border-bottom: 1upx solid rgba(255,255,255,.1);'">
					<text class="t_text" :style="hb_status?'border-left: 6upx solid #242933;color: #242933;':'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'" >{{$t('trade.zffs')}}</text>
					<view class="form_main">
						<view class="form_con form_input">
							<view class="uni-list">
								<checkbox-group @change="checkboxChange">
									<view class="zf0">
										<block class="uni-list-cell uni-list-cell-pd" v-for="item in zfitems" :key="item.value">
											<view class="zf1">
												<view><checkbox :value="item.value" :checked="item.checked" /></view>
												<view>{{ item.name }}</view>
											</view>
										</block>
									</view>
								</checkbox-group>
							</view>
						</view>
					</view>
				</view>
				
				<view class="hi-columns" style="margin-bottom: 30upx;">
					<text class="t_text" :style="hb_status?'border-left: 6upx solid #242933;color: #242933;':'color: #FFFFFF;border-left: 6upx solid #FFFFFF;'" >{{$t('trade.jysm')}}</text>
					<view class="input_box hi-rows hi-flex-vcenter hi-space-between">
						<view class="textarea_box" :style="hb_status?'background: #C0C4CC;':'background: #C0C4CC;'">
							<textarea :placeholder="$t('trade.zzjymxzzs')" maxlength="200" @input="textarea" v-model="textarea_text"  placeholder-style="color:#8792A8;"></textarea>
							<text class="num">{{textarea_cursor_num}}/200</text>
						</view>
					</view>
				</view>

			</view>
		
		
				<view class="btn_tj" @tap="lijifabu">{{$t('trade.ljfb')}}</view>
		</view>

		<view class="alert_maks" :class="isyichu==false?'active':''" :style="hb_status?'background: rgba(0,0,0,.7);':'background: rgba(0,0,0,.3);'"></view>
		<view class="hi-columns alert_yichu_box" :class="isyichu==false?'active':''" :style="hb_status?'background:#FFFFFF;':'background: #18253D;'">
			<view class="title" :style="hb_status?'color: #242933;':'color: #FFFFFF;'">{{$t('trade.yjbl')}}</view>
			<view class="con">{{$t('trade.txt')}}</view>
			<view class="btn" @click="yichubz_btn()">{{$t('login.know')}}</view>
		</view>

		
	</view>
</template>

<script>
	var This;
	export default {
		data() {
			return {
				backgroundALL: '',
				colorALL: '',
				statusBarH: '',
				header_H: 0,
				windowHeight: 0,
				hb_status: true,
				bizhong:{  //币种
					
				},
				radioItems:{ //交易类型
					checked:'sell',
					name:[
						{
								name: 'buy',
								value: this.$t('trade.mr'),
								icon:"../../../static/trade/icon_purchase.png"
								
							},
							{
								name: 'sell',
								value: this.$t('trade.mc'),
								icon:"../../../static/trade/icon_sellout.png",
								checked: 'true'
							}
					]
				},
				area:{  //币种
					index:0,
					name:[this.$t('trade.zg'),this.$t('trade.mg'),this.$t('trade.yg')]
				},
				bitype:{  //币种
					index:0,
					name:["CNY",'XLB','ETH','EOS','NEO']
				},
				yichubili:"0.0" ,//溢出比例
				zfitems: [
					{
						value: 'yl',
						name: this.$t('trade.yhk'),
						checked:false
					},
					{
						value: 'zfb',
						name: this.$t('trade.zfb'),
						checked: 'true'
					},
					{
						value: 'wx',
						name: this.$t('trade.wx'),
						checked:false
					}
				],
				textarea_cursor_num:0,//输入文字个数
				textarea_text:'',//输入文字内容
				isyichu:false,
				lists:[],
				jiage:'',
				zuizhongjia:'',
				minnum: 0,
				maxnum: 0,
				wxpay: false,
				zfbpay: true,
				ylpay: false
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
			uni.request({
				url: this.websiteUrlotc + 'otc/getSymbolCnyPrice',
				method: 'GET',
				data: {
					symbol:'usdt'
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
				},
				success: (res) => {
					console.log(res)
					this.jiage = res.data.data
					var moren =Number(this.jiage)+ Number(this.jiage*0.0)
					this.zuizhongjia = moren.toFixed(2)
			
				},
				fail: () => {
			
				}
			});
			uni.request({
				url: this.websiteUrlotc + 'otc/getSymbolList',
				method: 'GET',
				data: {},
				header: {
					'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
				},
				success: (res) => {
					console.log(res)
					if (res.data.code == 200) {
						this.lists = res.data.data
						this.bizhong = {
								index: 0,
								list: this.lists
							},
						console.log(this.bizhong)
						
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
			var view = uni.createSelectorQuery().select(".muen_header");
			view.boundingClientRect(data => {
				// console.log("节点离页面顶部的距离为" + data.height);
				//This.header_H = data.height;
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
			lijifabu(){
				let This=this;
				
				if(this.minnum <= 0 || this.minnum ==''){
					console.log('最小量')
					uni.showToast({
						title:This.$t('trade.zdlbnwk'),
						icon:"none",
						mask:true,
						duration:1000
					})
					return false;
				}
				if(this.maxnum <= 0 || this.maxnum ==''){
					console.log('最大量')
					uni.showToast({
						title:This.$t('trade.zxlbnwk'),
						icon:"none",
						mask:true,
						duration:1000
					})
					return false;
				}
				if(this.maxnum <= this.minnum){
					console.log('最大量等于或者小于最小量')
					uni.showToast({
						title:This.$t('trade.zdldyxyzxl'),
						icon:"none",
						mask:true,
						duration:1000
					})
					return false;
				}
				if(this.ylpay == false && this.wxpay == false && this.zfbpay == false){
					uni.showToast({
						title:This.$t('trade.zsdyygzffs'),
						icon:"none",
						mask:true,
						duration:1000
					})
					return false;
				}
				var that = this
				uni.showModal({
					title: This.$t('trade.xtts'),
					content: This.$t('trade.qdxdm'),
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title:that.$t('stylePulic.Loading')
							});//出现加载中图标
							var buysellche = {
								token: uni.getStorageSync('token'),
								userId:uni.getStorageSync('id'),
								wx:that.wxpay,
								al:that.zfbpay,
								bank:that.ylpay,
								max:that.maxnum,
								min:that.minnum,
								proportion:that.yichubili,//比例
								remark:that.textarea_text,//备注
								symbol:that.bizhong.list[that.bizhong.index],
								type:that.radioItems.checked
							}
							console.log(buysellche)
							uni.request({
								url: that.websiteUrlotc+'otc/addShop', //仅为示例，并非真实接口地址。
								data:buysellche,
								header: {
									'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
								},
								method: 'POST',
								success: res => {
									uni.hideLoading();
									console.log(res.data);
									if (res.data.code == 200) {
										that.myAlert(res.data.msg)
										setTimeout(function(){
											uni.navigateBack({
												delta:1
											})
										},1500)
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
							});
					} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
				});
			},
			yichubz_btn(){ //溢出显示隐藏
			
				this.isyichu=!this.isyichu
				console.log(this.isyichu)
			},
			textarea(e){
				this.textarea_cursor_num= e.detail.cursor;
				console.log(JSON.stringify(e.detail.cursor))
				console.log(JSON.stringify(e.detail.value))
				
				},
			sliderChange(e) {  //溢出比例
				
				this.yichubili=(e.detail.value).toFixed(1)
			    console.log('value 发生变化：' + this.yichubili)
				if(this.yichubili<0){
				 	var ifif = Number(this.jiage) + Number(this.jiage) * (Number(this.yichubili)/100)
				 	this.zuizhongjia = ifif.toFixed(2)

				}else{
				 	
				 	var elseelse = Number(this.jiage) * (Number(this.yichubili)/100)+Number(this.jiage)
					this.zuizhongjia = elseelse.toFixed(2)
				}
			},
			jytypeChange(e){   //交易类型
				var checked = e.target.value
					var changed = {}
					for (var i = 0; i < this.radioItems.name.length; i++) {
						if (checked.indexOf(this.radioItems.name[i].name) !== -1) {
							changed['radioItems.name[' + i + '].checked'] = true
						} else {
							changed['radioItems.name[' + i + '].checked'] = false
						}
					}
					this.radioItems.checked=checked;
				console.log(this.radioItems.checked);
				
			},
			checkboxChange: function(e) {
				var zfitems = this.zfitems,
					values = e.detail.value;
				if (values.length < 1) {
					this.myAlert(this.$t('trade.zffsbnwk'));
					this.wxpay = false;
					this.ylpay = false;
					this.zfbpay = false;
					return false;
				}
				this.wxpay = values.indexOf('wx') != -1 ? true : false;
				this.ylpay = values.indexOf('yl') != -1 ? true : false;
				this.zfbpay = values.indexOf('zfb') != -1 ? true : false;
				console.log('微信支付是否开启' + this.wxpay);
				console.log('银行卡支付是否开启' + this.ylpay);
				console.log('支付宝支付是否开启' + this.zfbpay);
			},
			bindbizhongChange(e){  //币种
				this.bizhong.index=e.detail.value;
				this.yichubili = '0.0'
				console.log(this.bizhong.index)
				uni.request({
					url: this.websiteUrlotc + 'otc/getSymbolCnyPrice',
					method: 'GET',
					data: {
						symbol:this.bizhong.list[this.bizhong.index]
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success: (res) => {
						console.log(res)
						this.jiage = res.data.data
						var moren1 =Number(this.jiage)+ Number(this.jiage*0.0)
						this.zuizhongjia = moren1.toFixed(2)
				
					},
					fail: () => {
				
					}
				});
			},
			bindareaChange(e){  //地区
				this.area.index=e.detail.value;
				console.log(this.area.index)
			},
			bindbitypeChange(e){  //货币类型
				this.bitype.index=e.detail.value;
				console.log(this.bitype.index)
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
.form_main {
	display: flex;
	align-items: center;
	border-bottom: 1upx solid #f2f4ff !important;
	padding: 15upx 20upx;
}
.form_main .form_text {

}
.form_main .form_con {
	width: 100%;
	margin-top: 30upx;
	margin-bottom: 30upx;
	color: #66677b;
	font-size: 30upx;
}
.form_main .form_input {
	display: flex;
	justify-content: space-between;
	font-size: 30upx;
}
.zf0 {
	display: flex;
	justify-content: space-between;
}
.zf1 {
	display: flex;
	margin-right: 20upx;
}
	.content{box-sizing: border-box;width: 670upx;margin: 0 40upx;padding-bottom: 40upx;margin-top: 0upx;}
	.container {width: 100%;height: 100%;box-sizing: border-box;}
	.muen_header>view {height: 88upx;padding: 0 40upx;box-sizing: border-box;}
	.header_title_box {padding: 0 0 20upx 40upx;box-sizing: border-box;margin: 0upx 0;}
	.header_title_box .header_item {text-align: center;}
	.header_title_box .header_item .t1 {font-size: 48upx;color: #FFFFFF;font-weight: bold;}
	.header_title_box .header_item .t2 {color: #8792A8;font-size: 22upx;margin-left: 19upx;}
	.header_title_box .header_item .h_btn {color: #3A74FC;border: 1upx solid #3A74FC;width: 120upx;height: 58upx;border-radius: 29upx;line-height: 58upx;}
	.buy_btm_box .item {margin-left: 60upx;}
	.buy_btm_box .item image {width: 30upx;height: 30upx;}
	.buy_btm_box .item text {font-size: 22upx;color: #8792A8;margin-top: 14upx;}
	.bi_title {width: 670upx;height: 88upx;margin: 30upx 40upx;border-radius: 16upx;line-height: 88upx;padding-left: 40upx;font-size: 36upx;box-sizing: border-box;}
	.bi_title .name{font-size: 36upx;margin: 0 20upx;}
	
	.p40{padding: 30upx 40upx;box-sizing: border-box;padding-bottom: 0;}
	
	.pb40{padding: 30upx 40upx;box-sizing: border-box;}
	.m40{padding: 30upx 40upx;padding-left: 0;margin-left: 40upx;box-sizing: border-box;}
	.ims{padding: 30upx 0;padding-left: 40upx;padding-right: 40upx;box-sizing: border-box;}
	.content .item {overflow-y: auto;border-radius:20upx;}
	.content .item .t_text{font-size: 28upx;padding-left: 34upx;box-sizing: border-box;border-left: 6upx solid #242933;}
	.content .item .t_r_infto{color: #8792A8;font-size: 28upx;}
	
	.content .item .t_name{font-size: 36upx;padding-left: 6upx;}
	.content .item .icon-arrow-right{font-size: 28upx;color: #8792A8;}
	
	.input_box{padding: 0 40upx;box-sizing: border-box;padding-left: 0;padding-bottom: 23upx;border-radius:2px;padding-top: 30upx;}
	.input_box .textarea_box{min-height: 240upx;background: #C0C4CC;width: 590upx;margin-left: 40upx;padding: 20upx;box-sizing: border-box;position: relative;}
	.input_box .textarea_box textarea{flex: 1;font-size: 28upx;width: 100%;padding-bottom: 20upx;box-sizing: border-box;}
	.input_box .textarea_box .num{font-size: 20upx;color: #8792A8;position: absolute;right: 20upx;bottom: 20upx;}
	
	.btn_tj{width: 100%;height: 100upx;line-height: 100upx;text-align: center;border:2px solid rgba(58, 116, 252, 1);border-radius:50px;color: #3A74FC;font-size: 36upx;}
	
	
	.alert_maks{width: 100%;height: 100%;position: fixed;top: 0;left: 0;z-index: 99998;transition: all .3s;}
	.alert_yichu_box{background: #FFFFFF;width:630upx;display: inline-flex;position:fixed;z-index: 99999;top: 50%;left:60upx;margin-top: -265upx;padding: 40upx;box-sizing: border-box;border-radius: 20upx;transition: all .3s;}
	.alert_yichu_box .title{width: 100%;font-size: 36upx;text-align: center;margin-bottom: 50upx;}
	.alert_yichu_box .con{color: #6E778A;font-size: 30upx;line-height: 48upx;margin-bottom: 55upx;}
	.alert_yichu_box .btn{width:240upx;height:70upx;line-height: 70upx; border-radius: 35upx;text-align: center;background: #3A74FC;font-size: 32upx;color: #FFFFFF;margin-left: 155upx;}
	.alert_maks.active{display: none;}
	.alert_yichu_box.active{display: none;}
	
</style>
