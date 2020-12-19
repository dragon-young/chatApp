<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="../../static/images/common/back16.png" mode=""></image>
			</view>
			<view class="top-bar-center">
				详细
			</view>
			<view class="top-bar-right placeholder"></view>
		</view>
		<view class="main">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	@import '../../comons/css/common.scss';
	.top-bar {
		box-sizing: border-box;
		padding: 0 32rpx;
		justify-content: space-between;
		border-bottom: 1px solid #b6b6b6;
		.top-bar-left {
			image {
				width: 32rpx;
				height: 32rpx;
			}
		}
	}
</style>
