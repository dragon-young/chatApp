<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-right">
				<view class="text" @tap="toRegister">
					注册
				</view>
			</view>
		</view>
		<!-- logo -->
		<view class="logo">
			<image src="../../static/images/login/火@3x.png" mode=""></image>
		</view>
		<view class="main">
			<view class="title">
				登陆
			</view>
			<view class="login">你好啊，欢迎来到World</view>
			<view class="inputs">
				<input type="text" v-model="usernameOrEmail" placeholder="用户名/邮箱" value="" class="user" placeholder-style="color:#999;font-weight:500" />
				<input type="password" v-model="password" placeholder="密码" value="" class="password" placeholder-style="color:#999;font-weight:500" />
			</view>
			<view class="tips">
				输入用户或密码失败！
			</view>
		</view>
		<view class="submit" @tap="login">登陆</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				usernameOrEmail: '',
				password: ''
			}
		},
		methods: {
			// 跳转到注册页面
			toRegister () {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			// 点击登录的相关操作
			login () {
				// 1. 表单的预验证 (只有用户名或密码都不为空的时候，才去提交表单数据)
				if (this.usernameOrEmail && this.password) {
					console.log("提交")
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../../comons/css/common.scss";
	
	.top-bar {
		background: $uni-bg-color;
		flex-direction: row-reverse;
		.top-bar-right {
			align-items: center;
			width: 100rpx;
			.text {
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 88rpx;
			}
		}
	}
	
	.logo {
		text-align: center;
		image {
			padding-top: 256rpx;
			width: 194rpx;
			height: 92rpx;
			margin: 0 auto;
		}
	}
	
	.main {
		padding: 54rpx $uni-spacing-row-lg;
		// width: 100%;
		.title {
			font-size: 56rpx;
			color: $uni-text-color;
			font-weight: 500;
			line-height: 80rpx;
		}
		.login {
			font-size: 40rpx;
			color: $uni-text-color-grey;
			line-height: 56rpx;
		}
		.inputs {
			padding-top: 48rpx;
			input {
				height: 98rpx;
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				border-bottom: 1px solid $uni-border-color;
			}
		}
		.tips {
			font-size: $uni-font-size-lg;
			color: $uni-color-warning;
			line-height: 56rpx;
		}
	}
	
	.submit {
		width: 520rpx;
		height: 96rpx;
		background: $uni-color-primary;
		border-radius: 48rpx;
		font-size: $uni-font-size-lg;
		font-weight: 600;
		color: rgba(30, 40, 50, 1);
		line-height: 44px;
		margin: 0 auto;
		text-align: center;
	}
	
</style>
