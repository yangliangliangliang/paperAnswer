<script>
	
	export default {
		
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
			// console.log(this.$Router)
		},
		onHide: function() {
			console.log('App Hide');
		},
	};
</script>

<style>
	/*每个页面公共css */
	
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		
	}
	/* #endif */
</style>
