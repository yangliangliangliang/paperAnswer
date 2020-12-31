<template>
	<block class="content">
		<text v-html="item.content"></text>
	</block>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object
			}
		},
	}
</script>
<style lang="scss" scoped>
</style>
