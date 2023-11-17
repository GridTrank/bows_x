<template>
	<view class="content">
		<view class="nav_bar" :style="'height:'+safeTop+'px'"> </view>
		<view class="head_wrap">
			Login
		</view>
		<view class="wrap">
			<view class="title mt20">
				Account ID
			</view>
			<view class="input_wrap mt20">
				<input class='input' type="text" placeholder="Account ID" v-model="account" />
			</view>

			<view class="title mt50">
				Password
			</view>
			<view class="input_wrap mt20">
				<input class='input' type="password" placeholder="Password" v-model="password" />
			</view>

			<view class="btn_wrap record" @click="login">
				LOGIN
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				safeTop: '',
				account:'121212',
				password:'121212'
			}
		},
		onLoad() {

			let res = uni.getSystemInfoSync()
			console.log(res)
			this.safeTop = res.safeArea.top
		},
		methods: {
			login(){
				uni.reLaunch({
					url:'../../pages/index/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #fafafa;
		min-height: 100vh;
		.nav_bar {
			background-color: #4fd1c5;
		}
		.head_wrap{
			background-color: #4fd1c5;
			height: 100upx;
			text-align: center;
			line-height: 100upx;
			color: #fff;
			font-size: 32upx;
			font-weight: 600;
		}
		.wrap{
			padding:10upx  30upx 10upx;
		}
		.title {
			font-size: 32upx;
		}

		.input_wrap {
			background-color: #fff;
			height: 100upx;
			border-radius: 150upx;
			padding: 0 40upx;
			box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);

			.input {
				height: 100upx;
			}
		}

		.btn_wrap {
			background-color: #4fd1c5;
			height: 100upx;
			border-radius: 150upx;
			padding: 0 40upx;
			line-height: 100upx;
			text-align: center;
			color: #fff;
			font-size: 32upx;

			&.record {
				margin-top: 30upx;
			}
		}

		.radio_wrap {
			margin-top: 40upx;

			.radio_item {
				display: flex;
				align-items: center;

				.left {
					width: 30upx;
					height: 30upx;
					border-radius: 50%;
					border: 4upx solid #666;
					margin-right: 20upx;

					&.active {
						.dark {}
					}
				}
			}
		}
	}

	.mt20 {
		margin-top: 20upx;
	}

	.mt50 {
		margin-top: 50upx;
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>