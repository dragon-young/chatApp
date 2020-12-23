<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="../../static/images/common/back16.png" mode="" @tap="backOne"></image>
			</view>
			<view class="top-bar-right">
				<image v-if="relation == 0 || relation == 1" src="../../static/images/userhome/more@3x.png" mode="" @tap="goDetails"></image>
			</view>
		</view>
		<view class="bg">
			<view class="bg-bar">
			</view>
			<image class="bg-img" :src="imgurl" mode="aspectFill"></image>
		</view>
		<view class="main">
			<view class="user-header">
				<view class="sex" :style="{background:sexColor}">
					<image :src="seximg" mode=""></image>
				</view>
				<view class="user-img">
					<image :src="imgurl" mode="aspectFill"></image>
				</view>
			</view>
			<view class="user-imf">
				<view class="name">{{user.name}}</view>
				<view class="nick">昵称: {{user.name}}</view>
				<view class="intr">{{user.explain}}</view>
			</view>
		</view>
		<view class="bottom-bar">
			<view class="button" @tap="addFriendBtn" v-if="relation == 2">
				加我好友
			</view>
			<view class="button" @tap="addFriendAnimation" v-if="relation ==0">
				发送消息
			</view>
		</view>
		<view :animation="animationData" class="add-misg" :style="{height: addHeight + 'px', bottom: '-' + addHeight + 'px'}">
			<view class="name">{{user.name}}</view>
			<textarea :value="myname + '请求加为好友~~'"  maxlength="120" class="add-main" />
		</view>
		<view class="add-btn" :animation="animationData">
			<view class="cancel" @tap="addFriendAnimation">取消</view>
			<view class="send" @tap="send">发送</view>
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
				},
				// 添加height高度
				addHeight: '',
				// 制作添加好友动画
				animationData: {}, 
				// 判断是否在 天剑好友界面
				isAdd: false,
				seximg: '../../static/images/userhome/女@3x.png',
				id: '', 	//'用户id，通过token拿取'
				token: '',
				fid: '',	// 好友id， 通过点击头像 传参的方式获取
				imgurl: '',
				markname: '',
				relation: 1, 	// 表示关系， 0表示自己， 1表示好友， 2 表示陌生人
			};
		},
		onLoad(e){
			this.getStorage()
			this.fid = e.id
			this.getUserInfo()
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
					// console.log(data.height);  
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
			},
			// 获取缓存数据
			getStorage() {
				try {
					const value = uni.getStorageSync('user')
					if (value) {
						this.id = value.id
						this.token = value.token
					} else {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				} catch(e) {
					
				}
			},
			getUserInfo () {
				uni.request({
					url: this.serverUrl + '/user/details',
					data: {
						id: this.fid,
						token: this.token
					},
					method: 'POST',
					success:  data=> {
						// console.log(data)
						let res = data.data
						if (res.status == 200) {
							// 成功
							// console.log(res)
							this.imgurl = this.serverUrl + '/user/' +  res.result.imgurl
							if (typeof(res.explain) == 'undefined') {
								res.result.explain = '这个人很懒， 什么都没有留下'
							}
							if (this.markname.length == 0) {
								this.markname = res.name;
							}
							this.sexJudge(res.result.sex)
							this.user = res.result
							this.judgefriend()
						} 
						else if(res.status == 500) {
							uni.showToast({
								title: '服务器出错啦',
								duration: 2000
							})
						}
					}
				})
			},
			// 性别判断
			sexJudge:function(e) {
				console.log(e);
				if (e == 'asexual') {
					this.seximg = '../../static/images/userhome/女@3x.png'
					this.sexColor = 'rgba(255, 93, 91, 1)'
				} else {
					this.sexColor= 'rgba(0, 170, 255, 1.0)'
					this.seximg = '../../static/images/userhome/男@3x.png'
				}
			},
			judgefriend () {
				if (this.id == this.fid) {
					this.relation = 0
				} else {
					// 如果不是自己
					uni.request({
						url: this.serverUrl + '/search/isfriend',
						data: {
							uid: this.id,
							fid: this.uid,
							toekn: this.token
						},
						method: 'POST',
						success:  data=> {
							console.log(data)
							let res = data.data
							if (res.status == 200) {
								// 成功
								this.relation = 1;
								this.getMarkName()
							} else if (res.status == 400) {
								// 陌生人
								this.relation = 2
							}
							else if(res.status == 500) {
								uni.showToast({
									title: '服务器出错啦',
									duration: 2000
								})
							}
						}
					})
				}
			},
			getMarkName () {
				uni.request({
					url: this.serverUrl + '/user/markname',
					data: {
						uid: this.id,
						fid: this.uid,
						toekn: this.token
					},
					method: 'POST',
					success:  data=> {
						console.log(data)
						let res = data.data
						if (res.status == 200) {
							// 成功
							// 修改昵称
							this.markname = res.markname
						}
						else if(res.status == 500) {
							uni.showToast({
								title: '服务器出错啦',
								duration: 2000
							})
						}
					}
				})
			},
			addFriendBtn() {
				this.addFriendAnimation()
			},
			send () {
				this.addFriendAnimation()
				uni.request({
					url: this.serverUrl + '/friend/applyfriend',
					data: {
						uid: this.id,
						fid: this.fid,
						msg: this.msg,
						token: this.token
					},
					method: 'POST',
					success:  data=> {
						// console.log(data)
						let res = data.data
						if (res.status == 200) {
							uni.showToast({
								title: '已经提出申请',
								duration: 2000
							})
						} 
						else if(res.status == 500) {
							uni.showToast({
								title: '服务器出错啦',
								duration: 2000
							})
						} else if (res.status == 300) {
							console.log("验证失效");
						}
					}
				})
			},
			goDetails () {
				uni.navigateTo({
					url: '../userdetails/userdetails?id=' + this.id 
				})
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
