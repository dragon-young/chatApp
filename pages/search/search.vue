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
					<image :src="item.imgUrl" mode=""></image>
					<view class="names">
						<view class="name" v-html="item.name"></view>
						<view class="email" v-html="item.email"></view>
					</view>
					<view class="right-bt">
						<view class="text-common send" v-if="item.isF === 1">
							发消息
						</view>
						<view class="text-common add" v-if="item.isF === 0">
							加好友
						</view>
					</view>
				</view>
			</div>
		</view>
	</view>
</template>

<script>
	import datas from '../../comons/js/friends.js'
	export default {
		data() {
			return {
				searchUserList: []
			};
		},
		methods: {
			// 关键字搜索
			search (e) {
				// console.log(e.detail.value)
				this.searchUserList = []
				let value = e.detail.value
				// console.log(value.trim().length)
				if (value.trim().length > 0) {
					// console.log(value.trim())
					this.searchUser(value.trim())
				};
				
			},
			// 根据关键字搜索用户
			searchUser (e) {
				let arr = datas.friends()
				let exp = eval("/" + e + "/g")
				for (let i=0;i<arr.length;i++) {
					if (arr[i].name.search(e) !== -1 || arr[i].email.search(e) !== -1) {
						this.isFriend(arr[i])
						arr[i].name = arr[i].name.replace(exp, "<span style='color:#4AAAFF'>" + e + "</span>")
						arr[i].email = arr[i].email.replace(exp, "<span style='color:#4AAAFF'>" + e + "</span>")
						arr[i].imgUrl = '../../static/images/img/' + arr[i].imgUrl
						this.searchUserList.push(arr[i])
					}
				}
			},
			// 判断是否为好友
			isFriend: function(e) {
				let isF = 0;
				let arr = datas.isFriend()
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].friend === e.userid) {
						isF = 1
					}
				}
				e.isF = isF
				// console.log(e.isF)
			},
			// 返回首页的方法
			backOne () {
				uni.navigateBack({
					delta: 1
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
</style>
