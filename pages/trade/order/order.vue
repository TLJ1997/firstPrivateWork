<template>
	<view class="hi-columns" style="position: relative;height: 100%;width: 100%;">
		<view class="muen_header hi-columns" :style="'padding-top:'+statusBarH+'px;'" style="position: absolute;top: 0; width: 100%; background-color: #FFF;z-index: 99;">
			<view class="hi-rows hi-flex-vcenter  hi-space-between">
				<view class="hi-rows hi-flex-vcenter">
					<image :src="hb_status?'../../../static/home/nav_icon_back_day.png':'../../../static/home/nav_icon_back_night.png'"
					 mode="" style="width:46upx;height: 46upx;" @click="Back()"></image>
				</view>
				<view class="hi-rows hi-flex-vcenter" style="font-size: 35upx; font-weight: bold;">
					{{$t('trade.lt')}}
				</view>
			</view>
		</view>
		<view class="hi-columns order_box">
			
				<!-- 未付款 -->
				<view class="hi-columns anquantis_box" @tap="caonima(orderinfo.orderNum)">{{orderinfo.symbol}}{{$t('trade.aqtg')}}</view>
				<view class="hi-columns items">
					<view class="hi-rows p30 d_pay_box">
						<block v-if="state==0">
							<text class="t1">{{$t('trade.dfk')}}</text>
						</block>
						<block v-if="state==1">
							<text class="t1">{{$t('trade.dsf')}}</text>
						</block>
						<block v-if="state==2">
							<text class="t1">{{$t('trade.ywc')}}</text>
						</block>
						<block v-if="state==3">
							<text class="t1">{{$t('trade.yqx')}}</text>
						</block>
						<block v-if="state==4">
							<text class="t1">{{$t('trade.csqx')}}</text>
						</block>
						<block v-if="state==0">
							<uni-countdown ref="imtAudioset" color="#000" background-color="#FFF" border-color="#FFF" :day="days" :hour="hours"
							 :minute="minutes" :second="seconds" @timeup="timeup"></uni-countdown>
						</block>
						
					</view>
				</view>
			
			<view class="hi-rows items hi-wrap p10">
				<view class="hi-rows flex1 hi-space-between">
					<view class="fonts">{{$t('trade.ze')}}</view>
					<view class="fonts fontw">{{orderinfo.num*orderinfo.price}} CNY</view>
				</view>
				<view class="hi-rows flex1 hi-space-between" @tap="caonima(orderinfo.orderNum)">
					<view class="fonts">{{$t('trade.ddbh')}}</view>
					<view class="fonts" style="align-items: center;"><text style="font-size: 20upx;">{{orderinfo.orderNum}}</text>
						<image src="../../../static/wallet/icon_withdrawmoney.png" style="width: 27upx;height: 27upx;margin-left: 10upx;z-index: 99;"
						 mode=""></image>
					</view>
				</view>
				<view class="hi-rows flex1 hi-space-between" :style="show_order_status==false?'display: none;':''">
					<view class="fonts">{{$t('trade.sl')}}</view>
					<view class="fonts">{{orderinfo.num}}</view>
				</view>
				<view class="hi-rows flex1 hi-space-between" :style="show_order_status==false?'display: none;':''">
					<view class="fonts">{{$t('trade.dj')}}</view>
					<view class="fonts">{{orderinfo.price}} CNY</view>
				</view>
				<view style="position: absolute;left: 0; bottom: 0;background: #FFF;width: 100%;">
					<block v-if="state == 0">
						<!-- 待付款 -->
					
						<view class="hi-rows items p30" style="padding-bottom: 20upx;align-items: center;position: relative; border: 0;" v-if="orderinfo.type == 'buy'">
							<block v-if="orderinfo.userId == huancunuid">
								<view class="qx_btn" @tap="show_qxjy_alert(3)">{{$t('trade.qxjy')}}</view>
								<view class="bjy_pay_btn" @tap="show_qxjy_alert(1)">{{$t('trade.bjyzf')}}</view>
							</block>
							<block v-if="orderinfo.shopUserId == huancunuid">
								 <!-- 没有按钮 -->
							</block>
						</view>
						<view class="hi-rows items p30" style="padding-bottom: 20upx;align-items: center;position: relative; border: 0;" v-if="orderinfo.type == 'sell'">
							<block v-if="orderinfo.userId == huancunuid">
								<view class="qx_btn" @tap="show_qxjy_alert(3)">{{$t('trade.qxjy')}}</view>							
							</block>
							<block v-if="orderinfo.shopUserId == huancunuid">
								<view class="bjy_pay_btn" @tap="show_qxjy_alert(1)">{{$t('trade.bjyzf')}}</view>
							</block>
						</view>
					</block>
					
					<block v-if="state == 1">
						<!-- 待收币 -->
						<view class="hi-rows items p30" style="padding-bottom: 20upx;align-items: center;position: relative; border: 0;" v-if="orderinfo.type == 'buy'">
							<block v-if="orderinfo.userId == huancunuid">
								 <!-- 没有按钮 -->
							</block>
							<block v-if="orderinfo.shopUserId == huancunuid">
								<view class="bjy_pay_btn" @tap="show_qxjy_alert(2)">{{$t('trade.sf')}}{{orderinfo.symbol}}</view>
							</block>
						</view>
						<view class="hi-rows items p30" style="padding-bottom: 20upx;align-items: center;position: relative; border: 0;" v-if="orderinfo.type == 'sell'">
							<block v-if="orderinfo.userId == huancunuid">
								<view class="bjy_pay_btn" @tap="show_qxjy_alert(2)">{{$t('trade.sf')}}{{orderinfo.symbol}}</view>
							</block>
							<block v-if="orderinfo.shopUserId == huancunuid">
								 <!-- 没有按钮 -->
							</block>
						</view>
					</block>
					<!-- <block v-if="state == 0 && sellstate == true">
						
					
						<view class="hi-rows items p30" style="padding-bottom: 20upx;align-items: center;position: relative; border: 0;">
							<block>
								<view class="qx_btn" @tap="show_qxjy_alert(3)">取消交易</view>
								
							</block>
						</view>
					</block> -->
				</view>
				<block>
					<!-- 待付款 -->
				
					<view style="padding:30upx;align-items: center;border: 0; text-align: center;width: 100%;box-sizing: border-box;color: #ececec;">
						{{$t('trade.zwczqx')}}
					</view>
				</block>
			</view>
			

		</view>
		<scroll-view class="chat_boxs" id="ss" scroll-y :scroll-top="scrolltop" @scrolltoupper="topfun" :style="{ height: chathwinheight + 'px', bottom: inputheight + 'px' }">
			<!-- 聊天列表开始 -->
			<block v-for="(chatdata, index) in chatdata" :key="index">
				<view class="chat-all">
					<view class="user-chat-time">{{chatdata.time}}</view>
					<view class="chat-list" :class="{ 'user-chat-user-my': chatdata.isme }">
						<image v-if="!chatdata.isme" :src="chatdata.user_pic" mode="widthFix" lazy-load></image>
						<view class="chat-list-body-info">
							<!-- 文字 -->
							<text v-if="chatdata.msg_type == 'text'" @longpress="getClip(chatdata.msg)">{{ chatdata.msg }}</text>
							<!-- 图片 -->
							<image @click="imgq(chatdata.msg)" v-if="chatdata.msg_type == 'img'" :src="chatdata.msg" mode="widthFix"
							 lazy-load></image>
						</view>
						<image v-if="chatdata.isme" :src="chatdata.user_pic" mode="widthFix" lazy-load></image>
					</view>
				</view>
			</block>

			<!-- 聊天列表结束 -->
		</scroll-view>


		<view class="dibu">
			<view class="chat-input-box">
				<view class="icon iconfont icon-yuyin1">
					<image @tap="fs_img()" src="../../../static/wo/icon_addtwo.png" style="width: 60upx;height: 60upx;" mode=""></image>
				</view>
				<textarea class="chatinput" v-model="neirongin" placeholder-style="color:#c2c2c2" :placeholder="input_ltnr"
				 auto-height="true" @focus="jiaodian" @input="shuru" @linechange="hangshu" />
				<!-- <view @click="bqshow" class="icon iconfont icon-biaoqing1" style="font-size: 65upx;position: relative;top: 3upx;"></view> -->
		 		<view @click="fujia" v-if="!isshuru" class="icon iconfont icon-jiahao01" style="font-size: 70upx;"></view>
		 		<button class="mini-btn"  type="warn" style="padding: 0;" size="mini" @click="fasonginp">{{$t('trade.fs')}}</button>
		 		<!-- <button class="mini-btn" v-if="isshuru" type="warn" size="mini" @click="fasonginp">发送</button> -->
		 	</view>
		 	<view class="fujia" v-show="fujianisshow">
		 		<view style="font-size: 100upx;color: #c2c2c2;" class="icon iconfont icon-tupian"></view>
		 		<view style="font-size: 100upx;color: #c2c2c2;" class="icon iconfont icon-zhuanzhang"></view>
		 		<view style="font-size: 110upx;color: #c2c2c2;" class="icon iconfont icon-hongbao1"></view>
		 	</view>
		 	<view class="bq-main" v-show="bqisshow">
		 		<swiper class="swiper" :style="{ height: swiperheiight + 'px' }" :indicator-dots="true" :duration="100">
		 			<block v-for="(items, index) in bqnum" :key="index">
		 				<swiper-item>
		 					<view class="bq-item-box">
		 						<block v-for="(item, index1) in arr[index]" :key="index1">
		 							<view @click="bqxuan(item.emoji)" class="emoji" :style="{ width: bqmargin + 'px', height: bqmargin + 'px', fontSize: bqmargin - 15 + 'px' }">
		 								{{ item.emoji }}
		 							</view>
		 						</block>
		 						<view :style="{ fontSize: bqmargin + 'px' }" class="icon iconfont icon-liaotianshanchu del"></view>
		 					</view>
		 				</swiper-item>
		 			</block>
		 		</swiper>
		 	</view>
		 </view>
		 
		 
		 
		 <!-- 评价弹窗 -->
		 <view class="hi-rows alert_box" :style="pj_status.isshow==false?'display: none;':''" >
			 <view class="wrap_box">
			 	<view class="title">{{$t('trade.jypj')}}</view>
			 	<view class="alert_content">{{$t('trade.dp')}}</view>
			 	<view class="hi-rows hi-space-between alert_chebox">
			 		<text :class="pj_status.pj_indx==0?'active':''"  @click="pj_text_btn(0)" >{{$t('trade.hp')}}</text>
			 		<text :class="pj_status.pj_indx==1?'active':''"  @click="pj_text_btn(1)">{{$t('trade.zp')}}</text>
			 		<text :class="pj_status.pj_indx==2?'active':''"  @click="pj_text_btn(2)">{{$t('trade.cp')}}</text>
			 	</view>
			 	<view class="btn_box">
			 		<text @tap="show_pj_alert(1)">{{$t('trade.qx')}}</text>
			 		<text @tap="show_pj_alert(2)">{{$t('trade.qd')}}</text>
			 	</view>
			 </view>	
		 </view>
		 
		  <!-- 取消订单弹窗 -->
		 <view class="hi-rows alert_box" :style="qxjy_status.isshow==false?'display: none;':''" >
		 			 <view class="wrap_box">
		 			 	<view class="title">{{$t('trade.qxjy')}}</view>
		 			 	<view class="alert_content">{{$t('trade.xzqxyy')}}</view>
		 			 	<view class="hi-rows hi-wrap alert_qxjy_chebox">
		 			 		<text :class="qxjy_status.qxjy_indx==$t('trade.jgbhs')?'active':''"  @click="qxjy_text_btn($t('trade.jgbhs'))" >{{$t('trade.jgbhs')}}</text>
		 			 		<text :class="qxjy_status.qxjy_indx==$t('trade.wrxy')?'active':''"  @click="qxjy_text_btn($t('trade.jgbhs'))">{{$t('trade.jgbhs')}}</text>
		 			 		<text :class="qxjy_status.qxjy_indx==$t('trade.bzrhfk')?'active':''"  @click="qxjy_text_btn($t('trade.bzrhfk'))">{{$t('trade.bzrhfk')}}</text>
		 			 		<text :class="qxjy_status.qxjy_indx==$t('trade.fkydwt')?'active':''"  @click="qxjy_text_btn($t('trade.fkydwt'))">{{$t('trade.fkydwt')}}</text>
		 			 		<text :class="qxjy_status.qxjy_indx==$t('trade.xcd')?'active':''"  @click="qxjy_text_btn($t('trade.xcd'))">{{$t('trade.xcd')}}</text>
		 			 		<text :class="qxjy_status.qxjy_indx==$t('trade.bzrhjy')?'active':''"  @click="qxjy_text_btn($t('trade.bzrhjy'))">{{$t('trade.bzrhjy')}}</text>
		 			 	</view>
						<view class="hi-columns">
							 <checkbox-group class="uni-list" @change="qxjy_ty_btn">
							 <label class="hi-rows">
								<view>
									<checkbox :value="qxjy_status.value" :checked="qxjy_status.checked"></checkbox>
								</view>
								<view>{{$t('trade.whmqdfkgmj')}}</view>
							</label>
							</checkbox-group>
						</view>
		 			 	<view class="btn_box">
		 			 		<text @tap="show_qxjy_alert(1)">{{$t('trade.qx')}}</text>
		 			 		<text @tap="show_qxjy_alert(2)">{{$t('trade.qd')}}</text>
		 			 	</view>
		 			 </view>	
		 </view>
		 
		 
		 
		 
		 
	</view>
</template>

<script>
	import uniCountdown from '../../../components/uni-countdown/uni-countdown.vue'
	var This;
	var timer;
	var message;
	export default {
		components: {
			uniCountdown
		},
		data() {
			return {
				input_ltnr:this.$t('trade.qsrltnr'),
				huancunuid:uni.getStorageSync('id'),
				chatdatatt:[],
				chatdataaa:[],
				pagejia:1,
				days:'',
				hours:'',
				minutes:'',
				seconds:'',
				state:0,
				buystate:false,
				sellstate:false, 
				csendtimestamp:0,
				creceivetimestamp:0,
				c_business:'', // 1是出售    0是购买
				c_id:0,
				dl_user_id:0,
				c_user:0,//当前用户id
				to_userinfo:'',
				orderinfo:'',
				djs_timer:900,  //总秒数
				Minute:'00',	//分钟
				second:'00',	//秒数
				c_state:1, //待付款：1   待收币 2 待评价：3    超时取消：4   已取消：5     已完成 6
				pj_status:{     	//评价弹窗模块
					isshow:false,   //是否显示弹窗
					pj_indx:0     //评价选择      0为好评  1为中评   2为差评
				},
				qxjy_status:{     	//取消交易弹窗模块
					isshow:false,   //是否显示弹窗
					qxjy_indx:''     ,//评价选择  
					checked:false,
					value:1
				},
				show_order_status:true,
				order_num:'3239448',
				windowHeight:0,
				toid: 0,
				touser: 0,
				scrolltop: 0, //聊天记录底部位置
				bqisshow: false, //是否显示表情
				userlistallheight: 0, //所有聊天信息总高度
				fujianisshow: false, //附加框是否显示
				neirongin: '', //输入框内容
				isshuru: false, //判断输入框是否有内容
				chathwinheight: 0, //聊天记录窗口高度
				swiperheiight: 0, //表情框高度
				inputheight: 0, //输入框高度
				bqmargin: 0,
				bqnum: 0,
				statusBarH: '',
				header_H: 0,
				hb_status: true,
				arr: [], //表情数组集合
				bq: [
					{
						emoji: '😀'
					},
					{
						emoji: '😃'
					},
					{
						emoji: '😄'
					},
					{
						emoji: '😁'
					},
					{
						emoji: '😆'
					},
					{
						emoji: '😅'
					},
					{
						emoji: '😂'
					},
					{
						emoji: '🤣'
					},
					{
						emoji: '😌'
					},
					{
						emoji: '😊'
					},
					{
						emoji: '😇'
					},
					{
						emoji: '🙂'
					},
					{
						emoji: '🙃'
					},
					{
						emoji: '😉'
					},
					{
						emoji: '😌'
					},
					{
						emoji: '😍'
					},
					{
						emoji: '😘'
					},
					{
						emoji: '😗'
					},
					{
						emoji: '😙'
					},
					{
						emoji: '😚'
					},
					{
						emoji: '😋'
					},
					{
						emoji: '😜'
					},
					{
						emoji: '😝'
					},
					{
						emoji: '😛'
					},
					{
						emoji: '🤑'
					},
					{
						emoji: '🤗'
					},
					{
						emoji: '🤓'
					},
					{
						emoji: '😎'
					},
					{
						emoji: '🤡'
					},
					{
						emoji: '🤠'
					},
					{
						emoji: '😏'
					},
					{
						emoji: '😒'
					},
					{
						emoji: '😞'
					},
					{
						emoji: '😔'
					},
					{
						emoji: '😟'
					},
					{
						emoji: '😕'
					},
					{
						emoji: '🙁'
					},
					{
						emoji: '☹️'
					},
					{
						emoji: '😣'
					},
					{
						emoji: '😖'
					},
					{
						emoji: '😫'
					},
					{
						emoji: '😩'
					},
					{
						emoji: '😤'
					},
					{
						emoji: '😠'
					},
					{
						emoji: '😡'
					},
					{
						emoji: '😶'
					},
					{
						emoji: '😐'
					},
					{
						emoji: '😑'
					},
					{
						emoji: '😯'
					},
					{
						emoji: '😦'
					},
					{
						emoji: '😧'
					},
					{
						emoji: '😮'
					},
					{
						emoji: '😲'
					},
					{
						emoji: '😵'
					},
					{
						emoji: '😳'
					},
					{
						emoji: '😱'
					},
					{
						emoji: '😨'
					},
					{
						emoji: '😰'
					},
					{
						emoji: '😢'
					},
					{
						emoji: '😥'
					},
					{
						emoji: '🤤'
					},
					{
						emoji: '😭'
					},
					{
						emoji: '😓'
					},
					{
						emoji: '😪'
					},
					{
						emoji: '😴'
					},
					{
						emoji: '🙄'
					},
					{
						emoji: '🤔'
					},
					{
						emoji: '🤥'
					},
					{
						emoji: '😬'
					},
					{
						emoji: '🤐'
					},
					{
						emoji: '🤢'
					},
					{
						emoji: '🤧'
					},
					{
						emoji: '😷'
					},
					{
						emoji: '🤒'
					},
					{
						emoji: '🤕'
					},
					{
						emoji: '😈'
					},
					{
						emoji: '👿'
					},
					{
						emoji: '👹'
					},
					{
						emoji: '👺'
					},
					{
						emoji: '💩'
					},
					{
						emoji: '👻'
					},
					{
						emoji: '💀'
					},
					{
						emoji: '☠️'
					},
					{
						emoji: '👽'
					},
					{
						emoji: '🤖'
					},
					{
						emoji: '🎃'
					},
					{
						emoji: '😺'
					},
					{
						emoji: '😸'
					},
					{
						emoji: '😹'
					},
					{
						emoji: '😻'
					},
					{
						emoji: '😼'
					},
					{
						emoji: '😽'
					},
					{
						emoji: '🙀'
					},
					{
						emoji: '😿'
					},
					{
						emoji: '😾'
					},
					{
						emoji: '👐'
					},
					{
						emoji: '🙌'
					},
					{
						emoji: '👏'
					},
					{
						emoji: '🙏'
					},
					{
						emoji: '🤝'
					},
					{
						emoji: '👍'
					},
					{
						emoji: '👎'
					},
					{
						emoji: '👊'
					},
					{
						emoji: '✊'
					},
					{
						emoji: '🤛'
					},
					{
						emoji: '🤜'
					},
					{
						emoji: '🤞'
					},
					{
						emoji: '✌️'
					},
					{
						emoji: '🤘'
					},
					{
						emoji: '👌'
					},
					{
						emoji: '👈'
					},
					{
						emoji: '👉'
					},
					{
						emoji: '👆'
					},
					{
						emoji: '👇'
					},
					{
						emoji: '☝️'
					},
					{
						emoji: '✋'
					},
					{
						emoji: '🤚'
					},
					{
						emoji: '🖐'
					},
					{
						emoji: '🖖'
					},
					{
						emoji: '👋'
					},
					{
						emoji: '🤙'
					},
					{
						emoji: '💪'
					},
					{
						emoji: '🖕'
					},
					{
						emoji: '✍️'
					},
					{
						emoji: '🤳'
					},
					{
						emoji: '💅'
					},
					{
						emoji: '💍'
					},
					{
						emoji: '💄'
					},
					{
						emoji: '💋'
					},
					{
						emoji: '👄'
					},
					{
						emoji: '👅'
					},
					{
						emoji: '👂'
					},
					{
						emoji: '👃'
					},
					{
						emoji: '👣'
					},
					{
						emoji: '👁'
					},
					{
						emoji: '👀'
					},
					{
						emoji: '🗣'
					},
					{
						emoji: '👤'
					},
					{
						emoji: '👥'
					},
					{
						emoji: '👶'
					},
					{
						emoji: '👦'
					},
					{
						emoji: '👧'
					},
					{
						emoji: '👨'
					},
					{
						emoji: '👩'
					},
					{
						emoji: '👱'
					},
					{
						emoji: '👴'
					},
					{
						emoji: '👵'
					},
					{
						emoji: '👲'
					},
					{
						emoji: '👚'
					},
					{
						emoji: '👕'
					},
					{
						emoji: '👔'
					},
					{
						emoji: '👗'
					},
					{
						emoji: '👙'
					},
					{
						emoji: '🌂'
					},
					{
						emoji: '☂️'
					},
					{
						emoji: '🐶'
					},
					{
						emoji: '🐱'
					},
					{
						emoji: '🐭'
					},
					{
						emoji: '🐹'
					},
					{
						emoji: '🐰'
					},
					{
						emoji: '🦊'
					},
					{
						emoji: '🐻'
					},
					{
						emoji: '🐼'
					},
					{
						emoji: '🐨'
					},
					{
						emoji: '🐯'
					},
					{
						emoji: '🦁'
					},
					{
						emoji: '🐮'
					},
					{
						emoji: '🐷'
					},
					{
						emoji: '🐽'
					},
					{
						emoji: '🐸'
					},
					{
						emoji: '🐵'
					},
					{
						emoji: '🙈'
					},
					{
						emoji: '🙉'
					},
					{
						emoji: '🙊'
					},
					{
						emoji: '🐒'
					},
					{
						emoji: '🐔'
					},
					{
						emoji: '🐧'
					},
					{
						emoji: '🐦'
					},
					{
						emoji: '🐤'
					},
					{
						emoji: '🐣'
					},
					{
						emoji: '🐥'
					},
					{
						emoji: '🦆'
					},
					{
						emoji: '🦅'
					},
					{
						emoji: '🦉'
					},
					{
						emoji: '🦇'
					},
					{
						emoji: '🐺'
					},
					{
						emoji: '🐗'
					},
					{
						emoji: '🐴'
					},
					{
						emoji: '🦄'
					},
					{
						emoji: '🐝'
					},
					{
						emoji: '🐛'
					},
					{
						emoji: '🦋'
					},
					{
						emoji: '🐌'
					},
					{
						emoji: '🐚'
					},
					{
						emoji: '🐞'
					},
					{
						emoji: '🐜'
					},
					{
						emoji: '🕷'
					},
					{
						emoji: '🕸'
					},
					{
						emoji: '🐢'
					},
					{
						emoji: '🐍'
					},
					{
						emoji: '🦎'
					},
					{
						emoji: '🦂'
					},
					{
						emoji: '🦀'
					},
					{
						emoji: '🦑'
					},
					{
						emoji: '🐙'
					},
					{
						emoji: '🦐'
					},
					{
						emoji: '🐠'
					},
					{
						emoji: '🐟'
					},
					{
						emoji: '🐡'
					},
					{
						emoji: '🐬'
					},
					{
						emoji: '🦈'
					},
					{
						emoji: '🐳'
					},
					{
						emoji: '🐋'
					},
					{
						emoji: '🐊'
					},
					{
						emoji: '🐆'
					},
					{
						emoji: '🐅'
					},
					{
						emoji: '🐃'
					},
					{
						emoji: '🐂'
					},
					{
						emoji: '🐄'
					},
					{
						emoji: '🦌'
					},
					{
						emoji: '🐪'
					},
					{
						emoji: '🐫'
					},
					{
						emoji: '🐘'
					},
					{
						emoji: '🦏'
					},
					{
						emoji: '🦍'
					},
					{
						emoji: '🐎'
					},
					{
						emoji: '🐖'
					},
					{
						emoji: '🐐'
					},
					{
						emoji: '🐏'
					},
					{
						emoji: '🐑'
					},
					{
						emoji: '🐕'
					},
					{
						emoji: '🐩'
					},
					{
						emoji: '🐈'
					},
					{
						emoji: '🐓'
					},
					{
						emoji: '🦃'
					},
					{
						emoji: '🕊'
					},
					{
						emoji: '🐇'
					},
					{
						emoji: '🐁'
					},
					{
						emoji: '🐀'
					},
					{
						emoji: '🐿'
					},
					{
						emoji: '🐾'
					},
					{
						emoji: '🐉'
					},
					{
						emoji: '🐲'
					},
					{
						emoji: '🌵'
					},
					{
						emoji: '🎄'
					},
					{
						emoji: '🌲'
					},
					{
						emoji: '🌳'
					},
					{
						emoji: '🌴'
					},
					{
						emoji: '🌱'
					},
					{
						emoji: '🌿'
					},
					{
						emoji: '☘️'
					},
					{
						emoji: '🍀'
					},
					{
						emoji: '🎍'
					},
					{
						emoji: '🍃'
					},
					{
						emoji: '🍂'
					},
					{
						emoji: '🍁'
					},
					{
						emoji: '🍄'
					},
					{
						emoji: '🌾'
					},
					{
						emoji: '💐'
					},
					{
						emoji: '🌷'
					},
					{
						emoji: '🌹'
					},
					{
						emoji: '🥀'
					},
					{
						emoji: '🌻'
					},
					{
						emoji: '🌼'
					},
					{
						emoji: '🌸'
					},
					{
						emoji: '🌺'
					},
					{
						emoji: '🌎'
					},
					{
						emoji: '🌍'
					},
					{
						emoji: '🌞'
					},
					{
						emoji: '🌛'
					},
					{
						emoji: '🌜'
					},
					{
						emoji: '🌙'
					},
					{
						emoji: '⭐️'
					},
					{
						emoji: '⚡️'
					},
					{
						emoji: '🔥'
					},
					{
						emoji: '💥'
					},
					{
						emoji: '☀️'
					},
					{
						emoji: '🌤'
					},
					{
						emoji: '⛅️'
					},
					{
						emoji: '🌥'
					},
					{
						emoji: '🌦'
					},
					{
						emoji: '🌈'
					},
					{
						emoji: '☁️'
					},
					{
						emoji: '🌧'
					},
					{
						emoji: '⛈'
					},
					{
						emoji: '🌩'
					},
					{
						emoji: '🌨'
					},
					{
						emoji: '☃️'
					},
					{
						emoji: '⛄️'
					},
					{
						emoji: '❄️'
					},
					{
						emoji: '🌬'
					},
					{
						emoji: '💨'
					},
					{
						emoji: '☔️'
					},
					{
						emoji: '🍏'
					},
					{
						emoji: '🍎'
					},
					{
						emoji: '🍐'
					},
					{
						emoji: '🍊'
					},
					{
						emoji: '🍋'
					},
					{
						emoji: '🍌'
					},
					{
						emoji: '🍉'
					},
					{
						emoji: '🍇'
					},
					{
						emoji: '🍓'
					},
					{
						emoji: '🍈'
					},
					{
						emoji: '🍒'
					},
					{
						emoji: '🍑'
					},
					{
						emoji: '🍍'
					},
					{
						emoji: '🥝'
					},
					{
						emoji: '🥑'
					},
					{
						emoji: '🍅'
					},
					{
						emoji: '🍆'
					},
					{
						emoji: '🥒'
					},
					{
						emoji: '🥕'
					},
					{
						emoji: '🌽'
					},
					{
						emoji: '🌶'
					},
					{
						emoji: '🥔'
					},
					{
						emoji: '🍠'
					},
					{
						emoji: '🍨'
					},
					{
						emoji: '🍦'
					},
					{
						emoji: '🍰'
					},
					{
						emoji: '🎂'
					},
					{
						emoji: '🍮'
					},
					{
						emoji: '🍭'
					},
					{
						emoji: '🍬'
					},
					{
						emoji: '🍫'
					},
					{
						emoji: '🍿'
					},
					{
						emoji: '🍩'
					},
					{
						emoji: '🍪'
					},
					{
						emoji: '🥛'
					},
					{
						emoji: '🍼'
					},
					{
						emoji: '☕️'
					},
					{
						emoji: '🍵'
					},
					{
						emoji: '🍶'
					},
					{
						emoji: '🍺'
					},
					{
						emoji: '🍻'
					},
					{
						emoji: '🥂'
					},
					{
						emoji: '🍷'
					},
					{
						emoji: '🥃'
					},
					{
						emoji: '🍸'
					},
					{
						emoji: '🍹'
					},
					{
						emoji: '🍾'
					},
					{
						emoji: '🥄'
					},
					{
						emoji: '🍴'
					},
					{
						emoji: '🍽'
					},
					{
						emoji: '💎'
					},
					{
						emoji: '⚖️'
					},
					{
						emoji: '🖤'
					},
					{
						emoji: '💔'
					},
					{
						emoji: '❣️'
					},
					{
						emoji: '💕'
					},
					{
						emoji: '💞'
					},
					{
						emoji: '💓'
					},
					{
						emoji: '💗'
					},
					{
						emoji: '💖'
					},
					{
						emoji: '💘'
					},
					{
						emoji: '💝'
					},
					{
						emoji: '⚠️'
					}
				],
				chatdata: [
					/* {
						isme: true, //判断是不是自己
						user_pic: '../../../../static/chat/tx.jpg', //头像
						msg_type: 'text', //文本类型
						msg: '您好！', //内容
						time: '22:05' //13位时间戳
					},*/
					
				],
				timer:''
			}
		}, 
		onLoad(option) {
			This=this;
			this.c_id=option.id;
			this.onloaddata(option.id)
			this.timer = setInterval(function() {	
				uni.request({
					url: This.websiteUrlotc + 'otc/getOrderStatus',
					method:"GET",
					data: {
						orderId:option.id,
						token: uni.getStorageSync('token'),
						userId: uni.getStorageSync('id')
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success: res => {
						// console.log(res)
						This.state = res.data.data
						 // console.log(This.state)
					}
				})	
			},1000); 
			var _this = this; //声明一个变量指向vue实例this,保证作用域一致
				uni.connectSocket({
					url: 'ws://106.55.42.122:33333/chat/' +uni.getStorageSync('id'),
					header: {
						'content-type': 'application/json'
					},
					
					success:function(rs){
						console.log(rs)
					}
				});
				uni.onSocketOpen(function (res) {
					console.log('WebSocket连接已打开！');			
				});
				uni.sendSocketMessage({
					data: JSON.stringify(message)
				});
				uni.onSocketMessage(function (res) {
					if (res.data == 'hello') {
						
					}else{
						var zhesi = res.data;
						
						console.log(res)
						_this.xiaoxibuy = JSON.parse(zhesi); 
						if (_this.xiaoxibuy.type == 'text') {
							var texttt={
									isme: false, //判断是不是自己
									user_pic:uni.getStorageSync('head'), //头像
									msg_type:'text', //文本类型
									msg:_this.xiaoxibuy.msg, //内容
									time:_this.xiaoxibuy.createDate//13位时间戳
								}
							This.chatdata.push(texttt)
						} else{
							var texttt={
									isme: false, //判断是不是自己
									user_pic:uni.getStorageSync('head'), //头像
									msg_type:'img', //文本类型
									msg:_this.xiaoxibuy.msg, //内容
									time:_this.xiaoxibuy.createDate//13位时间戳
								}
							This.chatdata.push(texttt)
						}
						This.getwininfo();
					}		 			
					
				});
				
					
	
		},
		onShow() {
			uni.getSystemInfo({
				success(res) {
					This.statusBarH = res.statusBarHeight;
					This.windowHeight = res.windowHeight
					// console.log(JSON.stringify(res))
					console.log(This.windowHeight)
				}
			})
			
		},
		onHide() {
			
			
		},
		onUnload() {
			if(this.timer != null) {
				clearInterval(this.timer);  
				this.timer = null; 
				uni.closeSocket();
			}  	
			
			 
			
		},
		methods: {
			show_qxjy_alert(e){
				var that = this
				if (e == 1) {
					var maiwen = '是否标记付款？'
				}else if(e == 2) {
					var maiwen = '是否释放？'
				}else if(e == 3) {
					var maiwen = '是否取消订单？'
				}
				
				uni.showModal({
					title: '系统提示',
					content: maiwen,
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '加载中'
							}); //出现加载中图标

							var buysellnums = {
								token: uni.getStorageSync('token'),
								userId: uni.getStorageSync('id'),
								orderId: This.c_id,
								state: e
								
							}
							console.log(buysellnums)
							uni.request({
								url: This.websiteUrlotc + 'otc/updateOtcOrder', //仅为示例，并非真实接口地址。
								data: buysellnums,
								header: {
									'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
								},
								method: 'POST',
								success: res => {
									uni.hideLoading();
									console.log(res.data);
									if (res.data.code == 200) {
										uni.showToast({
											title: res.data.msg,
											icon: 'none',
											duration: 1000
										});
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
			timeup(){
				
			},
			Back() {
				uni.navigateBack({ //后退
					delta: 1
				})
			},

			pj_text_btn(e){  //点击中差评按钮事件
				this.pj_status.pj_indx=e;
			},
			
			//查看图片
			imgq(e) {
				uni.previewImage({
					urls:[e]
				})
			},
			getwininfo(type) {
				let q = uni.createSelectorQuery();
				q.select('.dibu').boundingClientRect();
				q.selectAll('.chat-all').boundingClientRect();
				q.selectAll('.order_box').boundingClientRect();
				q.exec(ret => {
					// console.log(JSON.stringify(ret))
					for (var i = 0; i < ret[1].length; i++) {
						this.userlistallheight += ret[1][i].height;
					}
					if (this.userlistallheight > this.chathwinheight) {
						this.scrolltop = this.userlistallheight;
					}
					this.scrolltop = this.scrolltop + 119;
					this.inputheight = ret[0].height;
					uni.getSystemInfo({
						success: res => {
							this.swiperheiight = (res.windowWidth / 9) * 5.5;
							this.width = res.windowWidth;
							this.bqmargin = res.windowWidth / 9;
							if (type == 'bq') {
								this.chathwinheight = res.windowHeight - uni.upx2px(this.inputheight) + this.swiperheiight;
							} else {
								this.chathwinheight = res.windowHeight - uni.upx2px(this.inputheight);
							}
						}
					});
				});
			},
			//滚动到顶部触发
			topfun() {
	
				console.log('已经到顶部了，可以执行加载更多');
				uni.showLoading({
					title: '加载中'
				});
				var that = this
				setTimeout(() => {
					that.pagejia = Number(that.pagejia) + 1
					var touidjiluss = {
						page: that.pagejia,
						orderId:This.c_id,
						token: uni.getStorageSync('token'),
						userId: uni.getStorageSync('id')
					}
					console.log(touidjiluss)
						uni.request({
						url: this.websiteUrlotc + 'otc/getChatRecord',
						method:"GET",
						data: touidjiluss,
						header: {
							'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
						},
						success: (res) => {
							uni.hideLoading();
							console.log(res)
							if (res.data.code == 200) {
								if (that.pagejia > res.data.data.totalPages) {
									uni.showToast({
										title:that.$t('stylePulic.Nomore'),
										icon: 'none',
										duration: 1000
									});
								} else{
									uni.showToast({
										title:that.$t('stylePulic.Loaded'),
										icon: 'none',
										duration: 1000 
									});
									if (res.data.data.list == null || res.data.data.list == '') {
										
									} else{
										var chatdatas = res.data.data.list;
										
											if(chatdatas.length!=0){
												
												for(var i=0;i<chatdatas.length;i++){
													var msg_types='';
													if(chatdatas[i].type=='text'){
														msg_types='text'
													}
													if(chatdatas[i].type=='img'){
														msg_types='img'
													}
													
													if(uni.getStorageSync('id') == chatdata[i].fromUser){
													
														console.log('自己')
													var texts={
															isme: true, //判断是不是自己
															user_pic:uni.getStorageSync('head'), //头像
															msg_type: msg_types, //文本类型
															msg: chatdatas[i].msg, //内容
															time: chatdatas[i].createDate //13位时间戳
														}
														var sdsd = This.chatdata.unshift(texts)
													} else if(uni.getStorageSync('id') == chatdatas[i].toUser){
														console.log('对方')
													var texts={
															isme: false, //判断是不是自己
															user_pic:uni.getStorageSync('head'), //头像
															msg_type: msg_types, //文本类型
															msg: chatdatas[i].msg, //内容
															time:chatdatas[i].createDate //13位时间戳
														}
														var sdsd = This.chatdata.unshift(texts)
													}
													
													
												}
												// for (var i = 0, lenI = This.chatdataaa.length; i < lenI; ++i) {
												// 	var sdsd = This.chatdata.unshift(This.chatdataaa[i])
												// }
												// This.getwininfo();	
											}	
	
									}
								}
							}
					
						},
						fail: () => {
					
						}
					});
					
				}, 1000 * 1)
			},
			//输入框行数监听
			hangshu(e) {
				this.getwininfo();
			},
			bqshow() {
				this.fujianisshow = false;
				if (this.bqisshow) {
					// this.getwininfo();
					this.inputheight = this.inputheight - this.swiperheiight;
			
					this.bqisshow = false;
				} else {
					this.bqisshow = true;
					this.inputheight = this.inputheight + this.swiperheiight;
				}
				
			},
			fujia() {
				this.bqisshow = false;
				if (this.fujianisshow) {
					this.fujianisshow = false;
					this.getwininfo();
				} else {
					this.fujianisshow = true;
					this.getwininfo();
				}
				plus.key.hideSoftKeybord();
			},
			//键盘输入监听
			shuru(e) {
				this.isshuru = true;
				if (this.neirongin == '' || this.neirongin == null || this.neirongin == undefined) {
					this.isshuru = false;
				}
			},
			//发送按钮
			fasonginp() {
				let This=this;
				if(this.neirongin==''){
					uni.showToast({
						title:This.$t('trade.nrbnwk'),
						mask:true,
						icon:"none",
						duration:1000
					})
					return false;
				}	
				if(This.orderinfo.userId == uni.getStorageSync('id')){
					message  = {
						fromUser:uni.getStorageSync('id'),
						toUser: This.orderinfo.shopUserId,
						type: "text",
						msg:this.neirongin,
						orderId:This.c_id
					};
					console.log(message)
					this.getwininfo();			
					uni.sendSocketMessage({
						data: JSON.stringify(message),
						success(res) {
							 console.log(JSON.stringify(res))
						}
					});
				}else if(This.orderinfo.shopUserId == uni.getStorageSync('id')){
					message  = {
						fromUser:uni.getStorageSync('id'),
						toUser: this.orderinfo.userId,
						type: "text",
						msg:this.neirongin,
						orderId:This.c_id
					};
					console.log(message)
					this.getwininfo();			
					uni.sendSocketMessage({
						data: JSON.stringify(message),
						success(res) {
							 console.log(JSON.stringify(res))
						}
					});
				}
				var texttt={
						isme: true, //判断是不是自己
						user_pic:uni.getStorageSync('head'), //头像
						msg_type:'text', //文本类型
						msg:this.neirongin, //内容
						time: '' //13位时间戳
					}
				This.chatdata.push(texttt)
				this.neirongin='';
				if (this.bqisshow) {
					this.getwininfo('bq');
				}
			},
			//表情选择
			bqxuan(e) {
				this.isshuru = true;
				this.neirongin = this.neirongin + e;
			},
			//焦点
			jiaodian(e) {
				if (this.bqisshow) {
					this.inputheight = this.inputheight - this.swiperheiight;
					this.bqisshow = false;
					return false;
				}
				this.getwininfo();
				this.fujianisshow = false;
			},
			is_show(e){
				this.show_order_status=!this.show_order_status;
			},
			onloaddata(c_id){
				uni.request({
					url: this.websiteUrlotc + 'otc/getOrderByOrderId',
					method:"GET",
					data: {
						orderId: c_id,
						token: uni.getStorageSync('token'),
						userId: uni.getStorageSync('id')
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success: res => {
						console.log(res)
						this.orderinfo =res.data.data;
						this.state = this.orderinfo.state
						// if(this.orderinfo.type == 'buy'){
						// 	if(this.orderinfo.userId == uni.getStorageSync('id')){
						// 		console.log('我是买家buy')
						// 		this.buystate = true 
						// 		this.sellstate = false 
						// 	}else if(this.orderinfo.shopUserId == uni.getStorageSync('id')) {
						// 	   console.log('我是卖家buy')
						// 	   this.buystate = false
						// 	   this.sellstate = true 
						// 	}
						// }else if(this.orderinfo.type == 'sell'){
						// 	if(this.orderinfo.userId == uni.getStorageSync('id')){
						// 		console.log('我是卖家sell')
						// 		this.buystate = false
						// 		this.sellstate = true 
						// 	}else if(this.orderinfo.shopUserId == uni.getStorageSync('id')) {
						// 		console.log('我是买家sell')
						// 		this.buystate = true
						// 		this.sellstate = false 
						// 	}
						// }

						var date1 = new Date(); //开始时间
						var date3 = this.orderinfo.endDate - date1.getTime(); //时间差的毫秒数   
						console.log(this.orderinfo.endDate)
						console.log(date1.getTime())
						//------------------------------		 
						//计算出相差天数
						this.days = Math.floor(date3 / (24 * 3600 * 1000))
						//计算出小时数	 
						var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
						this.hours = Math.floor(leave1 / (3600 * 1000))
						//计算相差分钟数
						var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
						this.minutes = Math.floor(leave2 / (60 * 1000))
						//计算相差秒数 
						var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
						this.seconds = Math.round(leave3 / 1000)		
						console.log(this.days+'===='+this.hours+'===='+this.minutes+'===='+this.seconds)
						This.$refs.imtAudioset.toSeconds(this.days, this.hours, this.minutes, this.seconds);		
				
						this.loadchatjl(this.orderinfo.shopUserId) //调用聊天历史记录
					
						
					}
				})
			},
			zhuangtaiok(c_id){
				uni.request({
					url: This.changwaiServerUrl+'/otc/queryForPay',
					method:"get",
					data: {
						c_id: c_id
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success(res) {
							
					This.c_state=res.data.data.c_state;
					console.log(This.c_state)	
					}
				})
			},
			loadchatjl(touid){
				
				var touidjilu = {
					page: 1,
					orderId:This.c_id,
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id')
				}
				console.log(touidjilu)
					uni.request({
					url: this.websiteUrlotc + 'otc/getChatRecord',
					method:"GET",
					data: touidjilu,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success(res) {
						console.log(res)
						
						var chatdata=res.data.data.list;
						
							if(chatdata.length!=0){
								// for(var i=chatdata.length-1;i>=0;i--) {
								for(var i=0;i<chatdata.length;i++){
									var msg_type='';
									if(chatdata[i].type=='text'){
										msg_type='text'
									}
									if(chatdata[i].type=='img'){
										msg_type='img'
									}
									
									
									if(uni.getStorageSync('id') == chatdata[i].fromUser){
										console.log('自己')
									var text={
											isme: true, //判断是不是自己
											user_pic:uni.getStorageSync('head'), //头像
											msg_type: msg_type, //文本类型
											msg: chatdata[i].msg, //内容
											time: chatdata[i].createDate //13位时间戳
										}
										var sdsds = This.chatdata.unshift(text)
									} else if(uni.getStorageSync('id') == chatdata[i].toUser){
										console.log('对方')
									var text={
											isme: false, //判断是不是自己
											user_pic:uni.getStorageSync('head'), //头像
											msg_type: msg_type, //文本类型
											msg: chatdata[i].msg, //内容
											time:chatdata[i].createDate //13位时间戳
										}
										var sdsds = This.chatdata.unshift(text)
									}
									
								}
								setTimeout(() => {
									This.getwininfo();
								}, 1500 * 1)
									
							}	
						
						console.log(JSON.stringify(res))
					}
					
					
				})
				
			},
			add0(m){return m<10?'0'+m:m },
			getLocalTime(nS) { 
				   var time = new Date(nS);
					var y = time.getFullYear();
					var m = time.getMonth()+1;
					var d = time.getDate();
					var h = time.getHours();
					var mm = time.getMinutes();
					var s = time.getSeconds();
					return y+'-'+ this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
			} ,
			shifang() {		//点击释放币
			console.log('点击释放币')
				
				// uni.setStorageSync('setpasswd_status',0)
				
					this.isshow==true;
				if(uni.getStorageSync('setpasswd')==0){
					
					uni.navigateTo({
						url:"/pages/lockyanzheng/lockyangzheng"
					})
					
				}

				
			},
			sf_btn(){
				let This=this;
				uni.getStorageSync('setpasswd',0)
				uni.showLoading({
					title:This.$t('trade.sfz'),
					mask:true
				})
						
				
				uni.request({
					url: This.changwaiServerUrl+'/otc/updateOtcCheckState',
					method:"post",
					data: {
						c_id: This.c_id,
						c_user: uni.getStorageSync('udata').user,
						c_token: uni.getStorageSync('udata').token,
						c_state:3,
						c_business: This.orderinfo.c_business
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						"Accept-Language":'zh'
					},
					success(res) {
					
							uni.hideLoading();
							if(res.data.status==1){
								uni.setStorageSync('setpasswd',0)
								uni.showToast({
									title:This.$t('trade.sfcg'),
									duration:1500,
									mask:true,
									icon:"none",
									success() {
										clearInterval(This.timer);
										This.onloaddata(This.c_id);
									
									}
								})
								
								
							}else if(res.data.status==2){
								uni.showToast({
									title:res.data.info,
									duration:1500,
									mask:true,
									icon:"none",
									success() {
										setTimeout(function(){
												uni.navigateTo({
													url:"../../../login/login"
												})
										},1500)
									}
								})
							}else{
								uni.showToast({
									title:This.$t('trade.sfsb'),
									mask:true,
									duration:1500,
									icon:"none"
								})
							}
					
						
					}
				})
				
			},
			
			fs_img(){
				
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera','album'], //从相册选择
					success: function (res) {
						
						
						for(var i=0;i<res.tempFilePaths.length;i++){
							
							uni.uploadFile({
								url: This.websiteUrlotc+'otc/uploadFile', //仅为示例，非真实的接口地址
								filePath: res.tempFilePaths[i],
								name: 'file',
								header: {
										'content-type': 'multipart/form-data' //自定义请求头信息
									},
								success: (uploadFileRes) => {
									var uploadFileRes=JSON.parse(uploadFileRes.data)
									console.log(JSON.stringify(uploadFileRes));
									
									var imgUrl=uploadFileRes.data
									
									
									if(This.orderinfo.userId == uni.getStorageSync('id')){
										message  = {
											fromUser:uni.getStorageSync('id'),
											toUser: This.orderinfo.shopUserId,
										    type: "img",
										    msg:imgUrl,
											orderId:This.c_id
										};		
										uni.sendSocketMessage({
											data: JSON.stringify(message),
											success(res) {
												 console.log(JSON.stringify(res))
											}
										});
									}else if(This.orderinfo.shopUserId == uni.getStorageSync('id')){
										message  = {
											fromUser:uni.getStorageSync('id'),
											toUser: This.orderinfo.userId,
										    type: "img",
										    msg:imgUrl,
											orderId:This.c_id
										};		
										uni.sendSocketMessage({
											data: JSON.stringify(message),
											success(res) {
												 console.log(JSON.stringify(res))
											}
										});
									}
									
									var textim={
											isme: true, //判断是不是自己
											user_pic:uni.getStorageSync('head'), //头像
											msg_type:'img', //文本类型
											msg:imgUrl, //内容
											time: '' //13位时间戳
										}
									This.chatdata.push(textim)
									This.getwininfo();	
								}
							});		
							
							
							
						}
						
						
						
						
						
						
						
					}
				});
				
				
			},
			getClip(e){
				uni.setClipboardData({
					data:e,
					success: function () {
						console.log('复制成功');
					}
				});
			},
			caonima(es){
				//复制订单号
				let This=this;
				console.log(es)
				var vaonima = es
				uni.setClipboardData({
					data: JSON.stringify(vaonima),
					success: function (res) {
						uni.showToast({
							title: This.$t('trade.fzcg'),
							duration: 2000
						});
					}
				});
				
			}
		},
		onReady() {
			this.getwininfo();
			let bqnum = this.bq;
			this.bqnum = Math.ceil(bqnum.length / 44);
			for (var i = 0; i < bqnum.length; i += 44) {
				this.arr.push(bqnum.slice(i, i + 44));
			}
		}
	}
</script>

<style>
	.muen_header>view {
		height: 88upx;
		padding: 0 40upx;
		box-sizing: border-box;
	}
	
	.header_title_box {
		padding: 0 0 20upx 40upx;
		box-sizing: border-box;
		margin: 0upx 0;
	}
	
	.header_title_box .header_item {
		text-align: center;
	}
	
	.header_title_box .header_item .t1 {
		font-size: 48upx;
		color: #FFFFFF;
		font-weight: bold;
	}
	
	.header_title_box .header_item .t2 {
		color: #8792A8;
		font-size: 22upx;
		margin-left: 19upx;
	}
	
	.header_title_box .header_item .h_btn {
		color: #3A74FC;
		border: 1upx solid #3A74FC;
		width: 120upx;
		height: 58upx;
		border-radius: 29upx;
		line-height: 58upx;
	}
	.alert_box{width: 100%;height: 100%;background: rgba(0,0,0,.4);position: fixed;top: 0;left: 0;padding: 0 50upx;align-items: center;z-index: 99999999999999999;box-sizing: border-box;}
	.alert_box .wrap_box{width: 100%;background: #FFFFFF;padding: 20upx 32upx;border-radius: 20upx;box-sizing: border-box;}
	.alert_box .wrap_box .title{font-size: 40upx;color: #3C3E5B;font-weight: bold;text-align: center;width: 100%;margin: 30upx 0;}
	.alert_box .wrap_box .alert_content{font-size: 34upx;color: #3C3E5B;}
	.alert_box .wrap_box .alert_chebox{margin: 40upx 0;}
	.alert_box .wrap_box .alert_qxjy_chebox{margin: 40upx 0;}
	
	
	.alert_box .wrap_box .alert_qxjy_chebox text{font-size: 30upx;color: #393b59;padding: 14upx 50upx;border: 1px solid #c9d4e3; border-radius: 10upx;margin: 10upx;box-sizing: border-box;}
	.alert_box .wrap_box .alert_qxjy_chebox text.active{background: #0080ff;border: 1px solid #0080FF;color: #FFFFFF;}
	.alert_box .wrap_box .btn_qx_box{background: #0080ff;border: none;}
	
	
	.alert_box .wrap_box .alert_chebox text{font-size: 34upx;color: #FFFFFF;padding: 14upx 50upx;background: #c9d4e3;  border-radius: 20upx;}
	.alert_box .wrap_box .alert_chebox text.active{background: #0080ff;}
	.alert_box .wrap_box .btn_box{display: flex;flex-direction: row;justify-content: flex-end;}
	.alert_box .wrap_box .btn_box text{color: #0080ff;margin: 0 30upx;margin-bottom: 30upx;}
	
	.chat_boxs{padding-top: calc(var(--status-bar-height) + 550rpx) ;box-sizing: border-box;}
	
	page{height: 100%;background: #f3f5f7;}
.order_box{position: absolute;top:150upx;left: 0;width: 100%;z-index: 9999999999999999;background: #FFFFFF;}
.items{border-bottom: 1upx solid #e5e8f3;}
.anquantis_box{height: 40upx;line-height: 40upx;width: 100%;background: #f8f2d7;font-size: 28upx;text-align: center;color: #191916;}
.hi-rows{margin: 10upx 0;}
.p30{padding: 0 30upx;box-sizing: border-box;}
.p10{padding: 20upx 10upx;box-sizing: border-box;}
.fonts{font-size: 28upx;color: #8e9bae;}
.fontw{font-weight: bold;color: #393b59;font-size: 32upx;}
.timer_num{font-size: 28upx;color: #20ad3f;}
.usernames{color: #2391ff;}
.tab_s_btn{width: 41upx;height: 41upx;align-items: center;position: absolute;right: 20upx;top: 20upx;}
.d_pay_box{}
.d_pay_box .t1{font-size: 34upx;font-weight: bold;color: #393b59;margin-right: 26upx;}
.d_pay_box .t2{font-size: 32upx;font-weight: bold;color: #f75f59;}
.flex1{width: 50%;padding: 0 20upx;box-sizing: border-box;}
.qx_btn{font-size: 26upx;color: #FFFFFF;border-radius: 14upx;height: 74upx;width: 184upx;background: #c9d4e3;text-align: center;line-height: 74upx;margin-right: 34upx;}
.bjy_pay_btn{font-size: 26upx;color: #FFFFFF;border-radius: 14upx;height: 74upx;width: 306upx;background: #0080ff;text-align: center;line-height: 74upx;}

.chat_box{display: flex;flex-direction: column;justify-content: flex-end;}
.chat_box .chat_item{}
.chat_box .chat_input{height: 98upx;border-top: 2upx solid #e5e8f3;background: #0080FF;}
.chat_input_box{height: 98upx;border-top: 2upx solid #e5e8f3;position: fixed;bottom: 0;left: 0;width: 100%;background: #FFFFFF;}


@import url('iconfont.css');
.icon-yuyin1{width: 60upx;height: 60upx;margin-left: 20upx;margin-right: 20upx;}
#ss {
	position: fixed;
	padding-bottom: 20upx;
}
.bq-item-box {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.bq-item-box .emoji {
	text-align: center;
}
.chat-input-box {
	border-top: #c2c2c2 1px solid;
	border-bottom: #c2c2c2 1px solid;
	display: flex;
	padding: 10upx 10upx;
	box-sizing: border-box;
	flex-direction: row;
	align-items: center;
	width: 100%;
	overflow: hidden;
}
.chatinput {
	border: #c2c2c2 1px solid;
	border-radius: 10upx;
	padding: 20upx 10upx;
	font-size: 30upx;
	flex: 1;
}
.dibu {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 120upx;
	display: flex;
	flex-direction: row;
}
.fujia {
	height: 200upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20upx;
}
.mini-btn {
	width: 140upx;
	font-size: 20upx;
	background-color: #009688;
	height: 70upx;
	line-height: 70upx;
	padding: 0;
	margin: 0;
	margin-left: 20upx;
	margin-right: 10upx;
	border: none;

}
.chat-list {
	display: flex;
	padding: 0 10upx;
}
.chat-list > image {
	width: 80upx;
	height: 80upx;
	border-radius: 100%;
	flex-shrink: 0;
}
.chat-list .chat-list-body-info {
	display: flex;
	align-items: center;
	text-align: justify;
	position: relative;
	background-color: #f4f4f4;
	padding: 15upx;
	margin-left: 20upx;
	border-radius: 10upx;
	margin-right: 120upx;
}
.chat-list .chat-list-body-info > text {
	line-height: 40upx;
	word-break: break-all;
	font-size: 30upx;
	color: #646464;
}
.chat-list .chat-list-body-info:after {
	position: absolute;
	left: -30upx;
	right: 0;
	top: 30upx;
	content: '';
	width: 0;
	height: 0;
	border: #f4f4f4 16upx solid;
	border-color: transparent #f4f4f4 transparent transparent;
}
.chat-list .chat-list-body-info > image {
	max-width: 150upx;
	max-height: 200upx;
	border-radius: 10upx;
}
.user-chat-user-my {
	justify-content: flex-end;
}
.user-chat-user-my .chat-list-body-info {
	margin-left: 120upx;
	margin-right: 20upx;
	background-color: #f5deb3;
}
.user-chat-user-my .chat-list-body-info > text {
	line-height: 40upx;
	word-break: break-all;
	font-size: 30upx;
	color: #646464;
}
.user-chat-user-my .chat-list-body-info:after {
	position: absolute;
	left: auto;
	right: -30upx;
	top: 30upx;
	content: '';
	width: 0;
	height: 0;
	border: #f5deb3 16upx solid;
	border-color: transparent transparent transparent #f5deb3;
}
.user-chat-time {
	text-align: center;
	padding: 30upx 0;
	color: #a2a2a2;
	font-size: 24upx;
}






</style>
