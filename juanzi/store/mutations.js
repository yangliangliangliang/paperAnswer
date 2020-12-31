// import  {GETPAPERDATA,SETALLPAPERANSWER,SWITCHITEM } from "./mutations-type.js";

let paperLength;
let storeIconModel = [];
let modelData = [];
export default {
	//横屏/竖屏的判断
	getPaperData(state,options){
		let {
			questionItems,
			answerItems,
			Hscreen,
			editor,
			classify,
			title
		} = options;
		paperLength = state.paperData.paperLength = questionItems.length;
		state.paperData.questionData = questionItems;
		state.paperData.answerItems = answerItems;//=>试卷的状态
		state.paperData.Hscreen = typeof Hscreen == "undefined"?0:Hscreen ;//=>默认横屏
		state.paperData.editor = editor || 0;
		state.paperData.classify = typeof classify == "undefined"?1:classify ;//=>默认答题
		state.paperData.title = title;//=>试卷顶部的title信息
		
		//创建虚拟答案对象并返回给ios
		for(let i = 0 ;i<paperLength;i++){
			modelData.push({
					content:{},
					contentArray:{},
					id:questionItems[i].id,
					score:questionItems[i].score,
					questionScore:"",
					questionId:i + 1,
					// playbackSpeed:null,//=>播放速度
					// playbackTimes:1,//=>播放次数
			});
			//让storeIconModel的所有trueFalse:3，改动正确 0 / 错误 1的时候可以更换图标
			storeIconModel.push({
				trueFalse:3
			});
		};
		state.modelData = modelData;//=>获取用户答题的所有信息
		state.storeIconModel = storeIconModel;//=>创建试卷每道题的正确/错误的数组
	},
	//获取用户答案 ，在prefixContent页面中使用
	getPaperContent(state,options){
		let { itemOrder,content} = options;
		state.modelData[itemOrder - 1].content = content ;
	},
	//获取用户批改分数 ，在pigai页面中使用
	getInputValue(state,options){
		let { questionScore,itemOrder} = options;
		state.modelData[itemOrder - 1].questionScore = questionScore ;
	},
	//获取用户批改分数 ，在prefixContent页面中使用
	getComment(state,options){
		let { detailValue} = options;
		state.modelData.comment = detailValue;
	},
	//指定跳转到具体题目
	switchItem(state,options){
		state.paperData.exactItem  = options  ;
	},
	//存储正确/ 错误图标的对象，和answerItems每道题的score的值
	storeIcon(state,options){
		let {itemOrder,clickIndex,data}= options;
		state.storeIconModel[itemOrder].trueFalse = clickIndex;
		state.paperData.answerItems[itemOrder].score = data;
	},
	
}