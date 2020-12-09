<template>
	<view class="content">
		<view class="top-bar">
			<!-- 左边的图标 -->
			<view class="top-bar-left">
				<image src="../../static/images/common/back16.png" mode="" class="img-back" @tap="BackToLogin"></image>
			</view>
		</view>
		<!-- logo -->
		<view class="logo">
			<image src="../../static/images/login/火@3x.png" mode=""></image>
		</view>
		<view class="main">
			<view class="title">
				注册
			</view>
			<view class="inputs">
			    <view class="inputs-div">
					<input v-model="username" type="text" placeholder="请取个名字" value="" class="name" placeholder-style="color:#999;font-weight:500" />
					<view class="occupy" v-if="userOccupy">已占用</view>
					<image src="../../static/images/reigster/ok.png" mode="" class="ok" v-if="isUser"></image>
				</view>
				<view class="inputs-div">
					<input type="text" @blur="isEmailInput" v-model="email" placeholder="请输入邮箱" value="" class="email" placeholder-style="color:#999;font-weight:500" />
					<view class="occupy"  v-if="emailOccupy">已占用</view>
					<view class="unvaild" v-if="isVaild">邮箱无效</view>
					<image src="../../static/images/reigster/ok.png" mode="" class="ok" v-if="isEmail"></image>
				</view>
				<view class="inputs-div">
					<input :type="pswtype" @input="getPassword" placeholder="请输入密码" value="" class="password" placeholder-style="color:#999;font-weight:500" />
					<image :src="pswImgUrl" mode="" class="look" @tap="pswShowOrHidden"></image>
				</view>
			</view>
		</view>
		<view :class="[isOk ? 'submit' : 'submit1']">注册</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pswtype: 'password',
				isUser: true,		// 名字是否可用
				isEmail: false,		// 邮箱是否输入正确
				islook: true,		// 密码可视与不可视
				isVaild: false,     // 邮箱是否无效
				userOccupy: false,  // 用户名是否已占有
				emailOccupy: false,	// 邮箱是否已占有
				pswImgUrl: '../../static/images/reigster/unlook16.png',
				email: '',
				// isOk: false, // 用户名、邮箱、密码是否输入完成
				username: '', // 用户输入的用户名
				password: '', // 用户输入的密码
			}
		},
		methods: {
			// 密码的显示与隐藏的行为
			pswShowOrHidden () {
				// console.log(this.islook)
				if (this.islook) {
					this.pswtype = 'text'
					this.islook = !this.islook
					this.pswImgUrl = '../../static/images/reigster/look16.png'
				} else {
					this.pswtype = 'password'
					this.islook = !this.islook
					this.pswImgUrl = '../../static/images/reigster/unlook16.png'
				}
				// console.log(this.pswImgUrl)
			},
			// 判断邮箱是否符合要求的行为
			isEmailInput () {
				// 1. 拿到用户输入的邮箱
				// console.log(this.email)
				// 2. 邮箱验证的正则表达式
				let reg = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
				if (this.email !== '') {
					if (!reg.test(this.email)) {
						this.isEmail = false
						this.isVaild = true
					} else {
						// console.log("邮箱输入成功")
						this.isVaild = false
						this.isEmail = true
					}
				}
			},
			// 返回到登陆页面页面
			BackToLogin () {
				uni.navigateBack({
					delta: 1
				})
			},
			// 获取表单中密码的值
			getPassword (e) {
				this.password = e.detail.value
				// console.log(this.password)
			}
		},
		computed: {
			isOk () {
				if (this.isUser && this.isEmail && this.password.length > 5) {
					return true
				} else {
					return false
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../../comons/css/common.scss";
	
	.top-bar {
		background: $uni-bg-color;
		.top-bar-left {
			padding-left: 16rpx;
			align-items: center;
			.text {
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
				line-height: 88rpx;
			}
			.img-back {
				width: 46rpx;
				height: 38rpx;
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
			.inputs-div {
				position: relative;
				.occupy, .unvaild {
					position: absolute;
					top: 40rpx;
					right: 0;
					font-size: 32rpx;
					color: red;
				}
			}
			.ok {
				position: absolute;
				top: 46rpx;
				right: 0;
				width: 42rpx;
				height: 32rpx;
			}
			.look {
				position: absolute;
				top: 46rpx;
				right: 0;
				width: 42rpx;
				height: 32rpx;
			}
			
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
	.submit1 {
		width: 520rpx;
		height: 96rpx;
		background: rgba(30, 40, 50, 0.2);
		border-radius: 48rpx;
		font-size: $uni-font-size-lg;
		font-weight: 600;
		color: $uni-text-color-inverse;
		line-height: 44px;
		margin: 0 auto;
		text-align: center;
	}
	
</style>
