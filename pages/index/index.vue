<template>
	<view class="content">
		<topNav></topNav>
		<view class="head_wrap">
			Record Purchase
			<zb-popover 
				placement="bottom-end"
			    :options="actions"
			    ref="Popover1"
			    @select="selectActive"
			    class="item-popover">
			    <image src="../../static/more.png" mode="widthFix" class="more"></image>
			</zb-popover>
		</view>
		<view class="wrap">
			<view class="title mt20">
				Account ID
			</view>
			<view class="input_wrap mt20">
				<input class='input' type="text" placeholder="Account ID" />
			</view>
			<view class="btn_wrap mt20" @click="scan">
				SCAN QR CODE
			</view>

			<view class="title mt50">
				NRIC(Last 4 digits & letter)
			</view>
			<view class="input_wrap mt20">
				<input class='input' type="text" placeholder="NRIC(Last 4 digits & letter)" />
			</view>

			<view class="title mt50">
				Deposit Paid
			</view>
			<view class="input_wrap mt20">
				<input class='input' type="text" placeholder="Deposit Paid" />
			</view>

			<view class="title mt50">
				Package Amount
			</view>
			<view class="input_wrap mt20">
				<input class='input' type="text" placeholder="Package Amount" />
			</view>

			<view class="title mt50">
				Merchant
			</view>
			<view class="input_wrap mt20 row" @click="toMerchant">
				<text>{{MerchantVal}}</text>
				<image src="../../static/right.png" class="right" mode="widthFix"></image>
			</view>
			<view class="radio_wrap">
				<view class="radio_item ">
					<view class="left" :class="{'active':isAmex}" @click="isAmex=true">
						<view class="dark">
						</view>
					</view>
					<view class="">No AMEX</view>
				</view>
				<view class="radio_item mt20" >
					<view class="left" :class="{'active':!isAmex}" @click="isAmex=false">
						<view class="dark">
						</view>
					</view>
					<view class="">AMEX</view>
				</view>
			</view>
			<view class="btn_wrap record">
				RECORD OAYMENT
			</view>
		</view>

	</view>
</template>

<script>
	import zbPopover from '@/uni_modules/zb-popover/components/zb-popover/zb-popover.vue'
	export default {
		components:{
			zbPopover
		},
		data() {
			return {
				title: 'Hello',
				safeTop: '',
				isAmex:true,
				MerchantVal:'111',
				actions:[
					{text:'Laynch Survey',val:1},
					{text:'View Merchant',val:2},
				]
			}
		},
		onLoad() {
			let res = uni.getSystemInfoSync()
			this.safeTop = res.safeArea.top
		},
		methods: {
			toMerchant(){
				uni.navigateTo({
					url:'../../pages/merchants/merchants'
				})
			},
			scan(){
				uni.scanCode({
					success: (res) => {
						
					}
				})
			},
			selectActive(e){
				console.log(1212,e)
				if(e.val==1){
					uni.navigateTo({
						url:'../../pages/launch/launch'
					})
				}else{
					this.toMerchant()
				}
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
			position: relative;
			.item-popover{
				position: absolute;
				right:30upx;
				width:50upx;
				top:50%;
				z-index: 999;
				transform: translateY(-40%);
			}
			.more{
				width:50upx;
			}
			:deep .zb-popover{
				z-index: 999 !important;
				top: 80upx !important;
			}
			:deep .zb-popover__action-text{
				color: #000;
			}
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
			.right{
				width: 30upx;
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
						border-color: #4fd1c5;
						display: flex;
						justify-content: center;
						align-items: center;
						.dark {
							width: 20upx;
							height: 20upx;
							background-color: #4fd1c5;
							border-radius: 50%;
						}
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