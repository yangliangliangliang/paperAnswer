import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations.js";

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		paperData:{
			questionData:{ },
			answerItems:[],
			exactItem:0,
			classify:1,//=>判断试卷类型是答题 / 批改
		},
		modelData:[ ],//用户答题的所有答案
		trueFalse:false,//=>试题的对/错
		storeIconModel:[],//=>存储每道题对/错的图标
	},
	mutations,
})

export default store
