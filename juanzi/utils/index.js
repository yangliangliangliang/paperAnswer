export const abc = function(index){
	let str = "ABCDEFHGHIJKLMNOPQRSTUVWXYZ";
	return str[index];
};

//计算时，分，秒
export const calcTimer =  function (timer) {
		if(timer === 0 || typeof timer !== 'number') {
			return '00:00'
		}
		let mm = Math.floor(timer / 60)
		let ss = Math.floor(timer % 60)
		if(mm < 10) {
			mm = '0' + mm
		}
		if(ss < 10) {
			ss = '0' + ss
		}
		return mm + ':' + ss
	};
	
export const debounce = function(fun,delay,immediate){
		let timer ;
		return function(){
			clearTimeout(timer);
			if(immediate){
				let callNow = !timer;
				timer = setTimeout(()=>{
					timer = null;
				},delay);
				if(callNow)fun();
			}else{
				timer = setTimeout(()=>{
					fun();
				},delay)
			}
		}
	};