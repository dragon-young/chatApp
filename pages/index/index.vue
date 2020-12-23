<template>
	<view class="content">
		<view class="top-bar">
			<navigator :url="'../userhome/userhome?id=' + uid" class="top-bar-left" hover-class="none">
				<image :src="imgurl"></image>
			</navigator>
			<view class="top-bar-center">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="top-bar-right">
				<view class="search">
					<image src="../../static/images/index/search@3x.png" mode="" @tap="toSearch"></image>
				</view>
				<view class="add">
					<image src="../../static/images/index/add@3x.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="main">
			<!-- 好友请求 -->
			<view class="apply">
				<view class="friend-list-l">
					<!-- 消息数量 -->
					<view class="tip">1</view>
					<!-- 好友头像 -->
					<image src="../../static/images/index/apply.jpg" mode=""></image>
				</view>
				<view class="friend-list-r">
					<!-- 好友名称 -->
					<view class="top">
						<view class="name">好友申请</view>
						<view class="time">13：24</view>
					</view>
					<!-- 好友内容 -->
					<view class="contents">
						茫茫人海，相遇即是缘分
					</view>
				</view>
			</view>
			<!-- 好友列表 -->
			<view class="friends">
				<view class="friend-list" v-for="item in friends" :key="item.id" @tap="toAccess(item)">
					<view class="friend-list-l">
						<!-- 消息数量 -->
						<view class="tip">{{item.tip>99? '99...' : item.tip}}</view>
						<!-- 好友头像 -->
						<image :src="item.imgUrl" mode=""></image>
					</view>
					<view class="friend-list-r">
						<!-- 好友名称 -->
						<view class="top">
							<view class="name">{{item.name}}</view>
							<view class="time">{{changeTime(item.time)}}</view>
						</view>
						<!-- 好友内容 -->
						<view class="contents">
							{{item.news}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../comons/js/friends.js'
	import myFun from '../../comons/js/myFun.js'
	export default {
		data() {
			return {
				friends: [],
				imgUrl: '',
				// 当前用户id
				currentId: '1',
				uid: '',		// 用户id
				imgurl: '',		// 用户头像
				token: ''		// token验证
			}
		},
		// 页面加载的时候，触发该函数
		onLoad() {
			this.getStorage()
			this.friends = []
			this.getFriends()
		},
		methods: {
			changeTime (date) {
				return myFun.dateTime(date)
			}, 
			getFriends () {
				uni.request({
					url: this.serverUrl + '/index/getfriend',
					data: {
						uid: this.uid,
						state: '0',
						token: this.token
					},
					method: 'POST',
					success:  data=> {
						console.log(data)
						let res = data.data
						if (res.status == 200) {
							// 成功
							
						} 
						else if(res.status == 500) {
							uni.showToast({
								title: '服务器出错啦',
								duration: 2000
							})
						}
					}
				})
				let e = datas.friends()
				for (var i = 0; i < datas.friends().length; i++) {
					if (this.isFriend(e[i])) {
						e[i].imgUrl = '../../static/images/img/' + e[i].imgUrl
						this.friends.push(e[i])
					}
				}
			},
			// isFriend 判断是否是好友
			isFriend (e) {
				let isF = 0
				let arr = datas.isFriend()
				for (let i = 0; i < arr.length; i++) {
					if (this.currentId === arr[i].userid && arr[i].friend == e.id) {
						isF = 1
						return isF
					}
				}
				return isF
			},
			// 跳转到搜索页面
			toSearch () {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			// 跳转到好友申请的页面
			toAccess (item) {
				uni.navigateTo({
					url: '../chat/chat?name=' + item.name
				})
			}, 
			// 获取缓存数据
			getStorage() {
				try {
					const value = uni.getStorageSync('user')
					if (value) {
						this.uid = value.id
						this.imgurl = this.serverUrl + '/user/' +  value.imgurl
						this.token = value.token
						console.log(this.imgurl)
					} else {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				} catch(e) {
					
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../../comons/css/common.scss";
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-bottom: 12rpx;
	}
	
	.top-bar {
		padding-right: 32rpx;
		padding-left: 32rpx;
		// box-sizing: border-box;
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
		flex-direction: space-between;
	}

	.top-bar-left {
		width:68rpx;
	}
	.top-bar-left image {
		width:68rpx;
		height:68rpx;
		border-radius: 16rpx;
	}
		
	.top-bar-center {
		flex: 1;
		text-align: center;
	}
		
	.top-bar-center image {
		width: 88rpx;
		height: 42rpx;
		margin: 0 auto;
	}
	.top-bar-right {
		// padding-right: 150rpx;
		display: flex;
		align-items: center;
		width: 200rpx;
		.search {
			width: 52rpx;
			height: 52rpx;
			margin-right: 40rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.add {
			width: 48rpx;
			height: 48rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.main {
		width: 100%;
		// border: 1px solid red;
		padding: 88rpx $uni-spacing-col-base 0;
		.friend-list, .apply {
			&:active {
				background-color: $uni-bg-color-grey;
			}
			height: 96rpx;
			padding: 16rpx $uni-spacing-col-base;
			display: flex;
			.friend-list-l {
				position: relative;
				image {
					width: 96rpx;
					height: 96rpx;
					border-radius: $uni-border-radius-base;
				}
				.tip {
					z-index: 12;
					position: absolute;
					top: -6rpx;
					left: 68rpx;
					min-width: 36rpx;
					height: 36rpx;
					background-color: $uni-color-warning;
					border-radius: $uni-border-radius-circle;
					text-align: center;
					line-height: 36rpx;
					color: #FFFFFF;
					font-size: $uni-font-size-sm;
				}
			}
			.friend-list-r {
				flex: 1;
				padding-left: 38rpx;
				display: flex;
				flex-direction: column;
				.top {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					.name {
						font-size: 36rpx;
						font-weight: 400;
						color: $uni-text-color;
					}
					.time {
						padding-right: 22rpx;
						font-size: $uni-font-size-sm;
						color: $uni-text-color-disable;
					}
				}
				.contents {
					padding-top: 6rpx;
					font-size: $uni-font-size-base;
					color: $uni-text-color-grey;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}
			}
		}
	}
	
	.friend-list {
		display: flex;
	}
</style>
