<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="../../static/images/common/back16.png" mode="" @tap="backOne"></image>
			</view>
			<view class="top-bar-right">
				<image src="../../static/images/userhome/more@3x.png" mode=""></image>
			</view>
		</view>
		<view class="bg">
			<view class="bg-bar">
			</view>
			<image class="bg-img" src="../../static/images/img/a2.jpg" mode="aspectFill"></image>
		</view>
		<view class="main">
			<view class="user-header">
				<view class="sex" :style="{background:sexColor}">
					<image src="../../static/images/userhome/女@3x.png" mode=""></image>
				</view>
				<view class="user-img">
					<image src="../../static/images/img/a2.jpg" mode="aspectFill"></image>
				</view>
			</view>
			<view class="user-imf">
				<view class="name">{{user.name}}</view>
				<view class="nick">昵称: {{user.nick}}</view>
				<view class="intr">{{user.intr}}</view>
			</view>
		</view>
		<view class="bottom-bar">
			<view class="button" @tap="addFriendAnimation">
				加我好友
			</view>
		</view>
		<view :animation="animationData" class="add-misg" :style="{height: addHeight + 'px', bottom: '-' + addHeight + 'px'}">
			<view class="name">{{user.name}}</view>
			<textarea :value="myname + '请求加为好友~~'"  maxlength="120" class="add-main" />
		</view>
		<view class="add-btn" :animation="animationData">
			<view class="cancel" @tap="addFriendAnimation">取消</view>
			<view class="send">发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sexColor: 'rgba(255, 93, 91, 1)',
				myname: 'dragonYoung',
				user: {
					name: '一之濑',
					nick: 'yizhilai',
					intr: '谁也不过是一只可爱的小天使，我们都是在天上飞来飞去，起讨厌有价值的东西，不过十一的天气和年上汽'
				},
				// 添加height高度
				addHeight: '',
				// 制作添加好友动画
				animationData: {}, 
				// 判断是否在 天剑好友界面
				isAdd: false
			};
		},
		mounted () {
			this.getHeight()
		},
		methods: {
			backOne () {
				uni.navigateBack({
					delta: 1
				})
			},
			getHeight () {
				const query = uni.createSelectorQuery().in(this);
				query.select('.bg').boundingClientRect(data => { 
					this.addHeight = data.height - 196
					console.log(data.height);  
				}).exec()
			},
			addFriendAnimation () {
				this.isAdd = !this.isAdd;
				var animation = uni.createAnimation({ 
					duration: 1000, 
					timingFunction: 'ease'
				}) 
				this.animation = animation 
				if (this.isAdd) {
					animation.bottom(0).step()
				} else {
					animation.bottom(-this.addHeight).step()
				}
				this.animationData = animation.export()
			}
		}
	}
</script>

<style lang="scss">
	@import '../../comons/css/common.scss';
	.top-bar {
		display: flex;
		justify-content: space-between;
	}
	.top-bar-left {
		padding-left: 25rpx;
		image {
			width: 32rpx;
			height: 32rpx;
		}
	}
	.top-bar-right {
		padding-right: 25rpx;
		image {
			width: 54rpx;
			height: 18rpx;
		}
	}
	
	.bg {
		z-index: -2;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.bg-bar {
			z-index: 1;
			width: 100%;
			height: 100%;
			// background-color: #eee;
		}
		.bg-img {
			opacity: 0.4;
			z-index: -1;
			position: absolute;
			left: -10rpx;
			top: -10rpx;
			width: 110%;
			height: 110%;
			filter: blur(16rpx);
		}
	}
	
	.main {
		position: relative;
		padding-top: 168rpx;
		text-align: center;
		.user-header {
			z-index: 10;
			position: relative;
			width: 412rpx;
			height: 412rpx;
			margin: 0 auto;
			.sex {
				z-index: 11;
				position: absolute;
				right: 22rpx;
				bottom: 22rpx;
				width: 64rpx;
				height: 64rpx;
				border-radius: $uni-border-radius-circle;
				image {
					padding: 16rpx;
					width: 32rpx;
					height: 32rpx;
				}
			}
			.user-img {
				overflow: hidden;
				width: 400rpx;
				height: 400rpx;
				border: 6rpx solid rgba(255, 255, 255, 1);
				border-radius: 48rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.user-imf {
			padding-top: 42rpx;
			.name {
				font-size: 52rpx;
				color: $uni-text-color;
				line-height: 74rpx;
			}
			.nick {
				font-size: $uni-font-size-base;
				line-height: 40rpx;
				color: $uni-text-color;
			}
			.intr {
				padding: 20rpx 120rpx;
				font-size: $uni-font-size-base;
				color: $uni-text-color;
				font-weight: 300;
				line-height: 48rpx;
			}
		}
		
	}
	
	.bottom-bar{
		position: fixed;
		bottom: 0;
		height: 108rpx;
		width: 100%;
		// background-color: #eee;
		.button {
			margin: 0 auto;
			text-align: center;
			line-height: 80rpx;
			width: 684rpx;
			height: 88rpx;
			background: $uni-color-primary;
			border-radius: $uni-border-radius-sm;
			font-size: $uni-font-size-lg;
		}
	}
	
	.add-misg {
		z-index: 8;
		position: fixed;
		width: 100%;
		box-sizing: border-box;
		padding: 0 56rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 40rpx 40rpx 0 0;
		.name {
			padding-top: 222rpx;
			font-size: 52rpx;
			color: $uni-text-color;
			line-height: 74rpx;
		}
		.add-main {
			padding: 20rpx;
			width: 100%;
			box-sizing: border-box;
			background: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
			font-size: $uni-font-size-lg;
			height: 320rpx;
			line-height: 44rpx;
		}
	}
	
	.add-btn {
		position: fixed;
		z-index: 100;
		bottom: -168px;
		height: 108rpx;
		width: 100%;
		display: flex;
		// background-color: #eee;
		box-sizing: border-box;
		padding: 0 56rpx;
		.cancel {
			flex: 0.3;
			text-align: center;
			line-height: 80rpx;
			height: 88rpx;
			background: $uni-bg-color-grey;
			border-radius: $uni-border-radius-lg;
			font-size: $uni-font-size-lg;
			margin-right: 22rpx;
		}
		.send {
			flex: 0.7;
			text-align: center;
			line-height: 80rpx;
			height: 88rpx;
			background: $uni-color-primary;
			border-radius: $uni-border-radius-lg;
			font-size: $uni-font-size-lg;
		}
	}
	
</style>
