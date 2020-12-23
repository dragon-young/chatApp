<template>
	<view class="content">
		<!-- 头部 -->
		<view class="top-bar">
			<!-- 搜索 -->
			<view class="search-div">
				<input type="text" class="search" value="" placeholder="搜索用户/群" placeholder-style="font-weight:500;color:#999" @input="search" />
				<image class="img-search" src="../../static/images/index/search@3x.png" mode=""></image>
			</view>
			<!--  -->
			<view class="top-bar-right">
				<view class="text" @tap="backOne">
					取消
				</view>
			</view>
		</view>
		<!-- 内容区域 -->
		<view class="main">
			<div class="search-user result">
				<view class="title" v-if="searchUserList.length>0">用户</view>
				<view class="list_user" v-for="item in searchUserList" :key="item.id">
					<navigator :url="'../userhome/userhome?id=' + item._id"  hover-class="none">
						<image :src="item.imgurl" mode=""></image>
					</navigator>
					<view class="names">
						<view class="name" v-html="item.name"></view>
						<view class="email" v-html="item.email"></view>
					</view>
					<view class="right-bt">
						<view class="text-common send" v-if="item.isF === 1">
							发消息
						</view>
						<view class="text-common add" v-if="item.isF === 0" @tap="addFriendBtn(item._id)">
							加好友
						</view>
					</view>
				</view>
			</div>
		</view>
		
		<!-- 添加好友动画 -->
		<view class="modify" :style="{bottom:-widHeight+'px'}" :animation="animationData">
			<view class="modify-header">
				<view class="close" @tap="modify()">取消</view>
				<view class="title">添加好友</view>
				<view class="define" @tap="addSubmit()">确定</view>
			</view>
			<div class="modify-main">
				<textarea class="modify-content" v-model="msg" placeholder="" />
			</div>
		</view>
	</view>
</template>

<script>
	import datas from '../../comons/js/friends.js'
	import myfun from '../../comons/js/myFun.js'
	export default {
		data() {
			return {
				searchUserList: [],
				id: '',	// 用户id
				token: '',
				isModify: '',
				animationData: {},
				widHeight:'',
				msg: '请求加为好友！！',
				myname: '',	
				fid: '',
				isF: 0,
			};
		},
		mounted() {
			this.getHeight()
		},
		
		onLoad() {
			this.getStorage()
		},
		methods: {
			getHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.modify').boundingClientRect(data => { 
					this.widHeight = data.height
					// console.log(data);  
				}).exec()
			},
			// 获取缓存数据
			getStorage() {
				try {
					const value = uni.getStorageSync('user')
					if (value) {
						this.id = value.id
						this.myname = value.name
						this.token = value.token
					} else {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				} catch(e) {
					
				}
			},
			search: myfun.Debounce(function(e) {
				// console.log(e.detail.value)
				this.searchUserList = []
				let value = e.detail.value
				// console.log(value.trim().length)
				this.value = value
				if (value.trim().length > 0) {
					// console.log(value.trim())
					this.searchUser(value.trim())
				};
			}, 1000),
			// 关键字搜索
			// search (e) {
			// 	// console.log(e.detail.value)
			// 	this.searchUserList = []
			// 	let value = e.detail.value
			// 	// console.log(value.trim().length)
			// 	if (value.trim().length > 0) {
			// 		// console.log(value.trim())
			// 		this.searchUser(value.trim())
			// 	};
				
			// },
			// 根据关键字搜索用户
			searchUser (e) {
				uni.request({
					url: this.serverUrl + '/search/user',
					data: {
						data: this.value,
						token: this.token
					},
					method: 'POST',
					success:  data=> {
						// console.log(data)
						let res = data.data
						if (res.status == 200) {
							let arr = res.result
							let exp = eval("/" + e + "/g")
							for (let i=0;i<arr.length;i++) {
								if (arr[i].name.search(e) !== -1 || arr[i].email.search(e) !== -1) {
									let isFriend = this.isFriend(arr[i])
									arr[i].isF = isFriend.isF
									arr[i].name = arr[i].name.replace(exp, "<span style='color:#4AAAFF'>" + e + "</span>")
									arr[i].email = arr[i].email.replace(exp, "<span style='color:#4AAAFF'>" + e + "</span>")
									arr[i].imgurl = this.serverUrl + '/user/' + arr[i].imgurl
									// console.log(arr[i].imgurl);
									this.searchUserList.push(arr[i])
									// console.log(this.searchUserList[i]);
									// console.log(this.searchUserList[i]);
								}
							}
							
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
			// 判断是否为好友
			isFriend: function(e) {
				// console.log(e);
				// console.log(this.id);
				// console.log(e._id);
				uni.request({
					url: this.serverUrl + '/search/isfriend',
					data: {
						uid: this.id,
						fid: e._id,
						token: this.token
					},
					method: 'POST',
					success:  data=> {
						let res = data.data
						// console.log(res);
						if (res.status == 200) {
							// 是好友
							this.isF = 1
							// console.log(isF);
						} else if (res.status == 400) {
							// 不是好友
							this.isF = 0 
						}
						else if(res.status == 500) {
							uni.showToast({
								title: '服务器出错啦',
								duration: 2000
							})
						} else if (res.status == 300) {
							console.log("验证失效");
						}
						e.isF = this.isF
		
					}
				})
				return e;
				
			},
			// 返回首页的方法
			backOne () {
				uni.navigateBack({
					delta: 1
				})
			},
			// 修改动画
			modify () {
				this.isModify = !this.isModify;
				var animation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease'
				})
				
				if(this.isModify) {
					animation.bottom(0).step()
				}else {
					animation.bottom(-this.widHeight).step()
				}
				this.animationData = animation.export()
			},
			addFriendBtn (fid) {
				this.fid = fid
				// console.log(fid);
				this.msg = this.myname + '请求加你为好友！！'
				this.modify()
			},
			// 确定添加好友
			addSubmit () {
				this.modify()
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
			}
		}
	}
</script>

<style lang="scss">
	@import "../../comons/css/common.scss";
	.top-bar {
		background: $uni-bg-color;
		flex-direction: row-reverse;
		.search-div {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: -1;
			box-sizing: border-box;
			padding: 20rpx 118rpx 14rpx $uni-spacing-col-base;
			.search {
				height: 60rpx;
				background-color: $uni-bg-color-grey;
				border-radius: 10rpx;
				padding-left: 16rpx;
				padding-right: 68rpx;
			}
			.img-search {
				position: absolute;
				top: 25rpx;
				right: 128rpx;
				width: 46rpx;
				height: 46rpx;
			}
		}
		.top-bar-right {
			padding-right: 32rpx;
			align-items: center;
			padding-top: 6rpx;
			.text {
				font-size: $uni-font-size-lg;
				font-weight: 500;
				color: $uni-text-color;
			}
		}
	}
	
	.main {
		padding: 88rpx $uni-spacing-row-base;
		.title {
			font-size: 36rpx;
			font-weight: 600;
			line-height: 60rpx;
			// padding: 22rpx 0;
		}
		.list_user {
			display: flex;
			padding-top: 18rpx;
			padding-bottom: 18rpx;
			// border: 1px solid red;
			&:active {
				background: $uni-bg-color-grey;
			}
			image {
				width: 96rpx;
				height: 96rpx;
				border-radius: $uni-border-radius-base;
			}
			.names {
				padding-left: 18rpx;
				.email {
					padding-top: 8rpx;
				}
			}
			.right-bt {
				display: flex;
				flex-direction: row-reverse;
				flex: 1;
				text-align: right;
				align-items: center;
				.text-common {
					width: 120rpx;
					height: 48rpx;
					border-radius: 24rpx;
					text-align: center;
					margin-right: 22rpx;
					font-size: $uni-font-size-sm;
					line-height: 48rpx;
				}
				.send {
					background: $uni-color-primary;
					color: $uni-text-color;
				}
				.add {
					background: rgba(74, 170, 255, 0.1);
					color: $uni-color-success;
				}
			}
		}
	}
	// 修改弹框
	.modify {
		position: fixed;
		z-index: 1002;
		// bottom: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: #fff;
		.modify-header {
			width: 100%;
			height: 88rpx;
			padding-top: var(--status-bar-height);
			display: flex;
			flex-direction: row;
			align-items: center;
			border-bottom: 1px solid $uni-border-color;
			.close {
				padding-left: 32rpx;
				font-weight: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 44rpx;
			}
			.title {
				flex: auto;
				text-align: center;
				font-size: 40rpx;
				color: $uni-text-color;
				line-height: 88rpx;
			}
			.define {
				padding-right: $uni-spacing-col-base;
				font-size: $uni-font-size-lg;
				color: $uni-color-success;
				line-height: 44rpx;
			}
			
		}
		.modify-main {
			display: flex;
			padding: $uni-spacing-row-base;
			flex-direction: column;
			.modify-pwd {
				padding: 16rpx 20rpx;
				margin-bottom: $uni-spacing-col-lg;
				flex: auto;
				background: $uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 88rpx;
			}
			.modify-content {
				width: 100%;
				box-sizing: border-box;
				padding: 16rpx 20rpx;
				flex: auto;
				height: 306rpx;
				background: $uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 44rpx;
			}
		}
	}
</style>
