<script>
export default {
	data() {
		return {};
	},
	onLoad() {
		let date = new Date();
		let nowTime = date.getHours();
		console.log(nowTime);
		if (nowTime >= 20 || nowTime < 8) {
			uni.setStorageSync('localbk', '#1c1f22');
			uni.setStorageSync('localcol', '#FFF');
		} else {
			uni.setStorageSync('localbk', '#fff');
			uni.setStorageSync('localcol', '#000');
		}
	},
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
		
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
	}
};
</script>

<style lang="scss">
@import '/assets/css/index.scss';
@import './assets/css/reset.css';
@import '/graceUI/graceUI.css';
@import '/graceUI/graceIcons.css';
@import '/graceUI/animate.css';
@font-face {
	font-family: yticon;
	font-weight: normal;
	font-style: normal;
	src: url('https://at.alicdn.com/t/font_1078604_zb46p0wdmn.ttf') format('truetype');
}
/*每个页面公共css */

.content {
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}
.flex-itmes {
	flex: 1;
}
.yticon {
	font-family: 'yticon' !important;

	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.icon-iconfontshanchu1:before {
	content: '\e619';
}

.icon-iconfontweixin:before {
	content: '\e611';
}

.icon-shang:before {
	content: '\e624';
}

.icon-shouye:before {
	content: '\e626';
}

.icon-shanchu4:before {
	content: '\e622';
}

.icon-xiaoxi:before {
	content: '\e618';
}

.icon-jiantour-copy:before {
	content: '\e600';
}

.icon-fenxiang2:before {
	content: '\e61e';
}

.icon-pingjia:before {
	content: '\e67b';
}

.icon-daifukuan:before {
	content: '\e68f';
}

.icon-pinglun-copy:before {
	content: '\e612';
}

.icon-shoucang:before {
	content: '\e645';
}

.icon-xuanzhong2:before {
	content: '\e62f';
}

.icon-icon-test:before {
	content: '\e60c';
}

.icon-bianji:before {
	content: '\e646';
}

.icon-zuoshang:before {
	content: '\e613';
}

.icon-jia2:before {
	content: '\e60a';
}

.icon-sousuo:before {
	content: '\e7ce';
}

.icon-arrow-fine-up:before {
	content: '\e601';
}

.icon-hot:before {
	content: '\e60e';
}

.icon-lishijilu:before {
	content: '\e6b9';
}

.icon-xiatubiao--copy:before {
	content: '\e608';
}

.icon-shoucang_xuanzhongzhuangtai:before {
	content: '\e6a9';
}

.icon-jia1:before {
	content: '\e61c';
}

.icon-bangzhu1:before {
	content: '\e63d';
}

.icon-arrow-left-bottom:before {
	content: '\e602';
}

.icon-arrow-right-bottom:before {
	content: '\e603';
}

.icon-arrow-left-top:before {
	content: '\e604';
}

.icon-icon--:before {
	content: '\e744';
}

.icon-zuojiantou-up:before {
	content: '\e605';
}

.icon-xia:before {
	content: '\e62d';
}

.icon--jianhao:before {
	content: '\e60b';
}

.icon-Group-:before {
	content: '\e688';
}

.icon-you:before {
	content: '\e606';
}

.icon-forward:before {
	content: '\e607';
}

.icon-tuijian:before {
	content: '\e610';
}

.icon-bangzhu:before {
	content: '\e679';
}

.icon-share:before {
	content: '\e656';
}

.icon-shezhi1:before {
	content: '\e61d';
}

.icon-fork:before {
	content: '\e61b';
}

.icon-iLinkapp-:before {
	content: '\e654';
}

.icon-saomiao:before {
	content: '\e60d';
}

.icon-shezhi:before {
	content: '\e60f';
}

.icon-shouhoutuikuan:before {
	content: '\e631';
}

.icon-gouwuche:before {
	content: '\e609';
}

.icon-dizhi:before {
	content: '\e614';
}

.icon-xingxing:before {
	content: '\e70b';
}

.icon-zuanshi:before {
	content: '\e615';
}

.icon-zuo:before {
	content: '\e63c';
}

.icon-shoucang2:before {
	content: '\e62e';
}

.icon-yishouhuo:before {
	content: '\e71a';
}

/* 声明 flex */
.hi-flex {
	display: flex !important;
}
/* flex 竖向 */
.hi-rows {
	display: flex;
	flex-direction: row !important;
}
/* flex 横向 */
.hi-columns {
	display: flex;
	flex-direction: column !important;
}
/* flex 自动换行 */
.hi-wrap {
	display: flex;
	flex-wrap: wrap;
}
/* flex 横向不换行 */
.hi-nowrap {
	display: flex;
	flex-wrap: nowrap !important;
}
/* flex 横向两端对齐 */
.hi-space-between {
	display: flex;
	justify-content: space-between !important;
}
/* flex 横向两端对齐 */
.hi-left {
	display: flex;
	justify-content: flex-start !important;
}
/* flex 横向居中 */
.hi-flex-center {
	justify-content: center;
}
/* flex 垂直顶端对齐 */
.hi-flex-top {
	align-items: flex-start;
}
/* flex 垂直居中对齐 */
.hi-flex-vcenter {
	align-items: center;
}
/* flex 垂直底部对齐 */
.hi-flex-bottom {
	align-items: flex-end;
}
</style>
