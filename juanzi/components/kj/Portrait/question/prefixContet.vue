<template>
	<view class="kjList" >
		<view class="items">
			<!-- 没有用户答案 -->
			<!-- <block v-if="[1,2].includes(classify)"> -->
				<view class="content" v-for="(item,index) in pageList.items" :key="index" >
					<!-- 单选题 -->
					<block v-if="pageList.questionType == 1">
						<view class="select " >
							<view :class="[currentIndex == index && pageList.itemOrder === itemNumber?'selectActive  com':'prefix  com']"
								@click="selectItem(pageList.itemOrder,index)">
								{{item.prefix}}
							</view>
							
							<PingContent :item="item"></PingContent>
							
						</view>
						
					</block>
					<!-- 多选题 -->
					<block v-else-if="pageList.questionType == 2">
						<view class="select " >
							<view :class="[selectId.includes(index) && pageList.itemOrder == itemsNumber?'selectActive  com':'prefix  com']"
								@click="selectItem(pageList.itemOrder,index)">
								{{item.prefix}}
							</view>
							<PingContent :item="item"></PingContent>
						</view>
					</block>
					
	
					
					<!-- 填空题 -->
					<block v-else-if="pageList.questionType == 4"></block>
					
					<block v-else-if="pageList.materialsChild == 1">
						465
					</block>
				
				</view>
			<!-- </block> -->
			<!-- 有用户答案 -->
			<block v-if="0">
				<view class="content" v-for="(item,index) in pageList.items" :key="index" >
					<!-- 单选题 -->
					<block v-if="pageList.questionType == 1">
						<view class="select " >
							<!-- prefix -->
						<!-- 	<view :class="[answerItems[index].content == index && pageList.itemOrder === itemNumber?'selectActive  com':'prefix  com']"
								@click="selectItem(pageList.itemOrder,index)">
								{{item.prefix}}
							</view>
							<PingContent :item="item"></PingContent>
							 -->
						</view>
						
					</block>
					<!-- 多选题 -->
					<block v-else-if="pageList.questionType == 2">
						<view class="select " >
							{{answerItems[index].con}}
							<view :class="[answerItems[index].contentArray.includes(index) && pageList.itemOrder == itemsNumber?'selectActive  com':'prefix  com']"
								@click="selectItem(pageList.itemOrder,index)">
								{{item.prefix}}
							</view>
							<PingContent :item="item"></PingContent>
						</view>
					</block>
				</view>
			</block>
		</view>
	
	</view>
</template>

<script>
	import PingContent from "./prefixContet/pingContent.vue";
	import { abc } from "@/utils/index.js";
	export default {
		components:{
			PingContent
		},
		props:{
			pageList:{
				type:Object
			},
			answerItems:{
				type:Array
			},
			classify:{
				type:Number
			}
		},
		data() {
			return {
				itemOrder:"",
				// content:"",
				items:"",
				analyze:"",
				questionType:"",
				currentIndex:1,//=>当前点击的选项
				itemNumber:0,//=>单选题第几道题
				itemsNumber:0,//=>多选题第几道题
				itemsIndex:0,//=>多选题索引
				judgeNumber:0,//=>判断题第几道题
				judgeIndex:0,//=>判断题索引
				selectId:[],
			};
		},
		created() {
			//填空题
			this.judgeTk();
			// console.log(this.answerItems)
		},
		methods:{
			//填空题
			judgeTk(){
				let dataList = this.pageList;
				for(let i in dataList){
					if(!dataList.hasOwnProperty(i))return;    
					//填空题
					if(dataList.questionType == 4){
						// 填空有长度
						dataList.content = dataList.content.replace(/(<span(.*?)<\/span><span(.*?)<\/span>)/g,(item)=>{
							let selectType = item.match(/(\w+)Gap/)[1] == "number"?"tel" : item.match(/(\w+)Gap/)[1];
							let maxlen = item.match(/(\d+)length/)[1];
							let valWidth = (50+maxlen*7)+"px";
							return`<input 
								type=${selectType}
								maxlength = ${maxlen} `+"style='" +
								`width:${valWidth};` +
								`
								height: 30px;
								outline: 0;
								box-sizing: border-box;
								text-align: center;
								font-size:16px;
								border-radius:10px;
								border: 1px solid #C4E1FF;
								color: #000000;
								background: #C4E1FF;
								margin:6px;
								` +  "'/>"
						});
						// 填空没长度
						dataList.content = dataList.content.replace(/<span(.*?)<\/span>/g,(item)=>{
							let seleType = item.match(/(\w+)Gap/)[1] == "number"?"tel" : item.match(/(\w+)Gap/)[1];
							return`<input
								type=${seleType}
								maxlength = 1 `+"style='" +
								`width:50px;
								height: 30px;
								outline: 0;
								box-sizing: border-box;
								text-align: center;
								font-size:16px;
								border-radius:10px;
								border: 1px solid #C4E1FF;
								color: #00000;
								background: #C4E1FF;
								margin:6px;
								` +  "'/>"
						});
						
						break;
					}

				}

			},
			//点击单选题
			selectItem(itemOrder,correct){
				var currentObj = new Object;
				var  {editor,classify } = this.$store.state.paperData;
				//是否编辑 1不可编辑 0可编辑
				if(editor == 1 || classify !== 2)return;
				this.currentIndex = correct;
				this.itemNumber = itemOrder;
				// modelData[itemOrder-1].content = abc(correct);
				var content = abc(correct);
				// console.log(modelData)
				//获取答题后的数据对象
				this.$store.commit("getPaperContent",{itemOrder,content})
				// console.log("点击单选题第"+itemOrder+"题，并且选择了"+correct)
			},
			
			//点击多选题
			selectItems(index,correct){
				if(this.selectId.includes(correct)){
					this.selectId=this.selectId.filter(function (ele){
						return ele != correct;
					});
				}else{
					//问题1，为啥this.selectId调用方法才会重新渲染页面，this.selectId[1]= 2就不行
					this.selectId.push(correct);
					// console.log(this.selectId)
					this.itemsIndex = correct;
					this.itemsNumber = index;
					console.log("点击多选题第"+index+"题，并且选择了"+correct)
				}
			},
			judgeItem(index,correct){
				this.judgeIndex = correct;
				this.judgeNumber = index;
				console.log("点击判断题第"+index+"题，并且选择了"+correct)
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import  "./css/com.css";
</style>