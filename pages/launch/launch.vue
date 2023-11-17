<template>
	<view class="content">
		<topNav></topNav>
		<view class="head_wrap">
			<image src="../../static/back.png" mode="widthFix" class="back" @click="back"></image>
			<text class="tit">Laynch Survey</text>
			

		</view>
		<view class="wrap">
			<view class="title">
				Account ID
			</view>
			<view class="input_wrap mt20">
				<input class='input'  type="text" placeholder="Account ID" />
			</view>
			<view class="btn_wrap mt20">
				SCAN QR CODE
			</view>

			<view class="title mt60">
				Bride's Name
			</view>
			<view class="input_wrap mt20">
				<input class='input' type="text" placeholder="Bride's Name" />
			</view>

			<view class="title mt60">
				Groom's Name
			</view>
			<view class="input_wrap mt20">
				<input class='input' type="text" placeholder="Groom's Name" />
			</view>

			<view class="btn_wrap record">
				LAUNCH SURVEY
			</view>

		</view>

	</view>
</template>

<script>
	
	// http://ec2-52-76-78-186.ap-southeast-1.compute.amazonaws.com/api/1.2/web/module_event_bows/getcustomerdetails.php  --扫码后调用接口会获取页面数据
	// account_id
	// key
	// 
	
	// 点击按钮跳转链接
	// http://www.bows.sg/survey.php?bridename=Jacky%20Brides%20Testing&groomname=Jacky%20Groom%20Testing&account_id=1697595172319661
	export default {
		data() {
			return {
				title: 'Hello',
				
			}
		},
		onLoad() {

		},
		methods: {
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #fafafa;
		min-height: 100vh;

		.head_wrap {
			background-color: #4fd1c5;
			height: 100upx;
			text-align: center;
			line-height: 100upx;
			color: #fff;
			font-size: 32upx;
			font-weight: 600;
			position: relative;
			display: flex;
			align-items: center;
			
			.back{
				width: 50upx;
				margin-left: 30upx;
			}
			.tit{
				position: absolute;
				top: 50%;
				color: #fff;
				font-size: 36upx;
				font-weight: 600;
				left: 50%;
				transform: translate(-50%,-50%)
			}
		}
		.wrap{
			padding:10upx  30upx 10upx;
			margin-top: 20upx;
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

	.mt60 {
		margin-top: 50upx;
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>