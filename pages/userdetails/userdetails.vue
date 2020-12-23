<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="../../static/images/common/back16.png" mode="" @tap="backOne"></image>
			</view>
			<view class="top-bar-center">
				详细
			</view>
			<view class="top-bar-right placeholder"></view>
		</view>
		<view class="main">
			<view class="column heads">
				<view class="low head">
					<view class="title">头像</view>
					<view class="user-head" v-if="uid==fid">
						<image-cropper :src="tempFilePath" @confirm="confirm"  @cancel="cancel"></image-cropper>
						<image :src="cropFilePath" @tap="upload" class="user-img"></image>
					</view>
					<view class="user-head" v-if="uid!=fid">
						<image :src="user.imgurl" class="user-img"></image>
					</view>
					<view class="more" v-if="uid==fid">
						<image src="../../static/images/userdetails/右箭头.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="low" @tap="modify()">
					<view class="title">签名</view>
					<view class="cont">
						{{user.explain}}
					</view>
					<view class="more" @tap="modify()">
						<image src="../../static/images/userdetails/右箭头.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="low" @tap="modify()">
					<view class="title">注册</view>
					<view class="cont">
						{{user.time}}
					</view>
					<view class="more">
						<image src="../../static/images/userdetails/右箭头.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="column">
				<view class="low" @tap="modify()">
					<view class="title">昵称</view>
					<view class="cont">
						{{user.markname}}
					</view>
					<view class="more">
						<image src="../../static/images/userdetails/右箭头.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="low" @tap="modify()">
					<view class="title">性别</view>
					<view class="cont">
						{{user.sex=='asexual'?'女': '男'}}
					</view>
					<view class="more">
						<image src="../../static/images/userdetails/右箭头.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="low" @tap="modify()">
					<view class="title">生日</view>
					<view class="cont">
						{{user.birthday}}
					</view>
					<view class="more" @tap="modify()">
						<image src="../../static/images/userdetails/右箭头.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="low" @tap="modify()">
					<view class="title">电话</view>
					<view class="cont">
						{{user.phone}}
					</view>
					<view class="more">
						<image src="../../static/images/userdetails/右箭头.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="low" @tap="modify()">
					<view class="title">邮箱</view>
					<view class="cont">
						{{user.email}}
					</view>
					<view class="more">
						<image src="../../static/images/userdetails/右箭头.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="column">
				<view class="low" @tap="modify()">
					<view class="title">密码</view>
					<view class="cont">
						*******
					</view>
					<view class="more">
						<image src="../../static/images/userdetails/右箭头.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="bt2">
				退出应用
			</view>
		</view>
		<view class="modify" :style="{bottom:-widHeight+'px'}" :animation="animationData">
			<view class="modify-header">
				<view class="close" @tap="modify()">取消</view>
				<view class="title">签名</view>
				<view class="define" @tap="modify()">确定</view>
			</view>
			<div class="modify-main">
				<input type="text" class="modify-pwd" v-model="pwd" placeholder="现密码" placeholder-style="color:#aaa" />
				<textarea class="modify-content" v-model="data" placeholder="" />
			</div>
		</view>
	</view>
</template>

<script>
	import ImageCropper from "../../components/ling-imgcropper/ling-imgcropper.vue";
	export default {
		data() {
			return {
				tempFilePath: '',
				cropFilePath: '../../static/images/img/a1.jpg',
				data: '修改的内容',
				animationData: {}, // 动画
				isModify: false,
				widHeight: '',	// 页面高度
				pwd: '',	// 原密码
				animationData: {},
				uid: '',
				myname: '',
				markname: '',
				user: '',
				fid: ''
			};
		},
		onLoad(e) {
			this.fid = e.id;
			this.getStorage()
			this.getUserInfo()
			// this.judgefriend()
		},
		mounted() {
			this.getHeight()
		},
		components: {ImageCropper},
		methods: {
			getMarkName () {
				uni.request({
					url: this.serverUrl + '/user/getmarkname',
					data: {
						uid: this.uid,
						fid: this.fid,
						toekn: this.token
					},
					method: 'POST',
					success:  data=> {
						console.log(data)
						let res = data.data
						if (res.status == 200) {
							// 成功
							// this.markname = res.markname
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
			// 获取用户信息
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
							res.result.imgurl = this.serverUrl + '/user/' +  res.result.imgurl
							if (typeof(res.explain) == 'undefined') {
								res.result.explain = '这个人很懒， 什么都没有留下'
							}
							this.getMarkName()
							if (this.markname.length == 0) {
								this.markname = res.name;
							}
							this.user = res.result
							console.log(this.user)
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
			// 获取缓存数据
			getStorage() {
				try {
					const value = uni.getStorageSync('user')
					if (value) {
						this.uid = value.id
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
			// 返回上一个界面
			backOne () {
				uni.navigateBack({
					delta: 1
				})
			},
			upload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.tempFilePath = res.tempFilePaths.shift()
					}
				});
			},
			confirm(e) {
				this.tempFilePath = ''
				this.cropFilePath = e.detail.tempFilePath
			},
			// 获取页面高度
			getHeight () {
				const query = uni.createSelectorQuery().in(this);
				query.select('.modify').boundingClientRect(data => { 
					this.widHeight = data.height
				}).exec()
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
		
		}
	}
</script>

<style lang="scss">
	@import '../../comons/css/common.scss';
	.top-bar {
		z-index: 111;
		background-color: #FFFFFF;
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
	
	.main {
		padding-top: 118rpx;
		display: flex;
		flex-direction: column;
		.column {
			display: flex;
			flex-direction: column;
			padding-top: 12rpx;
			width: 100%;
			border-bottom: 1px solid $uni-border-color;
			.low {
				display: flex;
				// flex-direction: row;
			}
			.title {
				flex: none;
				padding: 0 $uni-spacing-col-base;
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				line-height: 112rpx;
			}
			.head {
				height: 148rpx;
				display: flex;
				align-items: center;
			}
			.user-head {
				flex: anto;
			}
			.user-img {
				width: $uni-img-size-lg;
				height: $uni-img-size-lg;
				border-radius: $uni-border-radius-base;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.cont {
				flex: auto;
				font-size: $uni-font-size-lg;
				color: $uni-text-color-grey;
				line-height: 112rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.more {
				flex: more;
				align-items: center;
				line-height: 112rpx;
				image {
					width: 88rpx;
					height: 28rpx;
				}
			}
		}
		.bt2 {
			text-align: center;
			font-size: 32rpx;
			font-weight: 400;
			color: rgba(255, 93, 91, 1);
			line-height: 44px;
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
