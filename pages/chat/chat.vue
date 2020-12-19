<template>
	<view class="content">
		<view class="top-bar">
			<view class="back">
				<image src="../../static/images/common/back16.png" mode="" @tap="toBack"></image>
			</view>
			<view class="title">
				{{name}}
			</view>
		</view>
		<view class="footer">
			<view class="video"></view>
			<view class="inputs">
				<input type="text" value="" />
			</view>
			<view class="express">
				<image src="../../static/images/reigster/unlook16.png" mode=""></image>
			</view>
			<view class="add">
				<image src="../../static/images/index/add@3x.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad (option) {
			this.name = option.name
		},
		data() {
			return {
				name: ''
			};
		},
		methods: {
			toBack () {
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../comons/css/common.scss";
	.top-bar {
		display: flex;
		// line-height: 88rpx;
		background-color: $uni-bg-color-grey;
		align-items: center;
		.back {
			padding: 0 22rpx;
			image {
				width: 32rpx;
				height: 32rpx;
			}
		}
		.title {
			padding-bottom: 5rpx;
		}
	}
	.footer {
		display: flex;
		position: fixed;
		bottom: 0;
		z-index: 999;
		width: 100%;
		height: 88rpx;
		background-color: #FFFFFF;
		overflow: hidden;
		.inputs {
			border: 1px solid #ccc;
		}
		.express {
			image {
				width: 32rpx;
				height: 32rpx;
			}
		}
		.add {
			image {
				width: 32rpx;
				height: 32rpx;
			}
		}
	}
</style>
