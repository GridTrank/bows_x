import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import {request} from '@/utils/http.js'

// #ifdef APP-PLUS
let main = plus.android.runtimeMainActivity();
plus.runtime.quit = function(){
	main.moveTaskToBack(false);
};
plus.nativeUI.toast = (function(str){
	if(str == '再按一次退出应用'){
		main.moveTaskToBack(false);
		return false;
	}else{
		uni.showToast({
			title:'Press the exit program again',
			position: 'bottom',
			icon:'none'
		})
	}
});
// #endif

export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif