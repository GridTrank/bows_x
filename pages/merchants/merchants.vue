<template>
	<view class="">
		<!-- <topNav></topNav> -->
		<view class="head_wrap" :style="'padding-top:'+safeTop+'px'">
			<image src="../../static/back.png" mode="widthFix" class="back" @click="back"></image>
			<text class="tit">Merchants</text>
			
			<text class="refresh">Refresh</text>
		</view>
		<view class="" :style="'height:'+(safeTop+44)+'px'"> </view>
		<view class="list_wrap">
			 <view class="item" v-for="(item,index) in 30" :key="index" @click="selectItem(item)">
			 	name {{index}}
			 </view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				safeTop:''
			};
		},
		onLoad() {
			let res = uni.getSystemInfoSync()
			this.safeTop = res.safeArea.top
			console.log(this.safeTop)
		},
		methods:{
			back(){
				uni.navigateBack()
			},
			selectItem(item){
				let pages = getCurrentPages();
				let page = pages[pages.length - 2];
				page.$vm.MerchantVal='name'+item
				this.back()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head_wrap{
		position: fixed;
		height: 88upx;
		background-color: #4fd1c5;
		width: 100%;
		text-align: center;
		line-height: 88upx;
		
		display: flex;
		justify-content: space-between;
		align-items: center;
		.back{
			width: 50upx;
			margin-left: 30upx;
		}
		.tit{
			position: absolute;
			top: 48%;
			color: #fff;
			font-size: 36upx;
			font-weight: 600;
			left: 50%;
			transform: translateX(-50%)
		}
		.refresh{
			color: #fff;
			font-weight: 400;
			margin-right: 30upx;
		}
	}
.list_wrap{
	min-height: 100vh;
	background-color: #fafafa;
	.item{
		height: 100upx;
		line-height: 100upx;
		padding-left: 20upx;
		border-bottom: 2upx solid #eee;
		&:last-child{
			border: none;
		}
	}
}
</style>
