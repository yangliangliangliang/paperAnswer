import Vue from 'vue';
import App from './App';
import store from "./store/index.js";

App.mpType = 'app'
Vue.config.productionTip = false;
Vue.prototype.$store = store;




//Hscreen 0 横屏，1竖屏
//editor 0 可编辑，1不可编辑
// classify 0 答题，1批改
let  paperLength;

window.initData = function(jsonData,Hscreen,editor,classify){
	let { titleItems,answerItems,name,userName,doTime,accuracy} = jsonData;
	var questionItems = titleItems.map((item)=>{
		return item.questionItems;
	});
	var pageObj = {
		questionItems:questionItems.flat(Infinity),
		answerItems,
		Hscreen,
		editor,
		classify,
		title:{
			name,
			userName,
			doTime,
			accuracy
		}
	};
	paperLength = pageObj.questionItems.length;//所有数组的length
	store.commit("getPaperData",pageObj)
	uni.reLaunch({
	    url: '/pages/kj/kj'
	});
};	
//提交试卷
window.getPaperAnswerData = function(){
	let data = store.state.modelData;
	console.log( typeof data)
	return window.webkit.messageHandlers.setPaperAnswerData.postMessage({"params":data});
};	



//切换题目
window.switchItem = function(itemOrder){
	if(itemOrder>paperLength)return;
	store.commit("switchItem",itemOrder - 1 );
}




const app = new Vue({
    ...App
})
app.$mount()

