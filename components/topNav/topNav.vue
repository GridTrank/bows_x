<template>
	<view class="nav_bar" :style="'height:'+safeTop+'px'"> </view>
</template>

<script>
	export default {
		name:"topNav",
		data() {
			return {
				safeTop: '',
			};
		},
		mounted() {
			let res = uni.getSystemInfoSync()
			this.safeTop = res.safeArea.top
		}
	}
</script>

<style lang="scss" scoped>
.nav_bar {
	background-color: #4fd1c5;
	width: 100vw;
}
</style>