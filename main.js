import Vue from 'vue'
import App from './App'
//import Axios from 'axios'
// import ''
// import './assets/fonts/iconfont.css'
//Vue.prototype.$axios = Axios
//Axios.defaults.baseURL = 'http://192.168.0.107:8001/'
//Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
import VueI18n from './common/lang/vue-i18n.js'
import cnLang from './common/lang/zh-cn.js'
import enLang from './common/lang/en-us.js'

Vue.use(VueI18n)

if(['zh-cn', 'en-us'].indexOf(uni.getStorageSync('locale')) == -1){
    uni.setStorageSync('locale', 'zh-cn')
}
const i18n = new VueI18n({
  //直接读取缓存中的当前语言是什么，首次加载就是这个语言
    locale: uni.getStorageSync('locale'),
    messages: {
        'zh-cn': cnLang,
        'en-us': enLang,
    },
})

function toggleLang (){
    return new Promise(function(resolve, reject){
        uni.showActionSheet({
            itemList: ['中文', 'English'],
			showCancel:false,
            success: (e)=> {
                let lang = 'zh-cn'
                switch (e.tapIndex){
                    case 0: lang = 'zh-cn'
                        break;
                    case 1: lang = 'en-us'
                        break;
                    default: lang = 'zh-cn'
                        break;
                }
                                //切换后直接修改他的语言，并且别忘了注册到缓存中
                i18n.locale = lang
                uni.setStorageSync('locale', lang);
                resolve({code:1})
            }
        })
    })
    
}

Vue.prototype._i18n = i18n;
Vue.prototype.$toggleLang = toggleLang;
Vue.config.productionTip = false

Vue.prototype.myAlert = function(content) {
	
	uni.showModal({
		title: this.$t('trade.xtts'),
		content: content,
		showCancel: false,
		success: function(res) {
			//console.log(res);
		}
	});
	
}
import zhiwen from './common/zhiwen.js'
Vue.prototype.$zhiwen = zhiwen;
import member from './common/common.js'
Vue.prototype.$member = member;
import maimai from './common/maimai.js'
Vue.prototype.maimai = maimai;
//生成从minNum到maxNum的随机数
Vue.prototype.randomNum = function(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}
//首页轮播公告服务器
Vue.prototype.websiteUrlshou ='http://106.55.42.122:7777/'
//首页轮播公告服务器
Vue.prototype.websiteUrlWS = 'ws://106.55.42.122:7777/'
//登录服务器
Vue.prototype.websiteUrl ='http://106.55.42.122:8888/'
//钱包服务器
Vue.prototype.websiteUrlqiabao ='http://106.55.42.122:5555/'
//币币服务器
Vue.prototype.websiteUrlbibi ='http://42.194.218.215:9999/'
//制度服务器
Vue.prototype.websiteUrlzh ='http://106.55.42.122:9998/'
//制度服务器
Vue.prototype.websiteUrlzhh ='http://106.55.42.122:9997/'
//OTC服务器
Vue.prototype.websiteUrlotc ='http://106.55.42.122:22222/'
Vue.prototype.req=function(url,data,callback,method){
	uni.request({
	    url: 'http://106.55.42.122:8888/'+url, //仅为示例，并非真实接口地址。
	    data: data,
		method:method||'post',
	    header: {
	        'Content-Type' : 'application/x-www-form-urlencoded' //自定义请求头信息
	    },
	    success: (res) => {
	        console.log(res.data);
	        if (typeof callback === "function") {
				callback(res);
			}
	    },
		fail:()=>{
			uni.showToast({
				title:'request error'
			})
		}
	});
}


Vue.prototype.$eventHub = new Vue();

App.mpType = 'app'
const app = new Vue({
	i18n,
	...App
})
app.$mount()
