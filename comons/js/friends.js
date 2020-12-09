export default {
	friends: function () {
		let friendArr = [
			{
				id: '1',
				userid : '1',
				imgUrl: 'a1.jpg',
				tip: 13,
				name: '一之濑',
				email: 'yizhilai@dragon.com',
				time: new Date(),
				news: '你好啊，我来自遥远的星系, 我非常欣赏你的才华，请跟着我来吧'
			},
			{
				id: '2',
				userid : '2',
				imgUrl: 'a2.jpg',
				tip: 12,
				name: '付佳慧',
				email: 'fujiahui@qq.com',
				time: new Date(),
				news: '即便时光依旧流失，吾也不会放过你'
			},
			{
				id: '3',
				userid : '3',
				imgUrl: 'a3.jpg',
				tip: 3,
				name: '小时雨',
				email: 'satr@12306.com',
				time: new Date(),
				news: '今晚的流星雨， 好大啊'
			},
			{
				id: '4',
				userid : '4',
				imgUrl: 'a4.jpg',
				tip: 5,
				name: '无双剑姬',
				email: 'jianji@qq.com',
				time: new Date(),
				news: '我讨厌有价值的东西'
			},
			{
				id: '5',
				userid : '5',
				imgUrl: 'a5.jpg',
				tip: 6,
				name: '时光',
				email: 'shiguan@qq.com',
				time: new Date(),
				news: '时光不负有心人，但愿别等闲'
			},
			{
				id: '6',
				userid : '6',
				imgUrl: 'a6.jpg',
				tip: 97,
				name: '时光',
				email: '154@qq.com',
				time: new Date(),
				news: '时光不负有心人，但愿别等闲'
			},
			{
				id: '7',
				userid : '7',
				imgUrl: 'a7.jpg',
				tip: 99,
				name: '时光',
				email: '154@qq.com',
				time: new Date(),
				news: '时光不负有心人，但愿别等闲'
			},
			{
				id: '8',
				userid : '8',
				imgUrl: 'a8.jpg',
				tip: 13,
				name: '时光',
				email: '154@qq.com',
				time: new Date(),
				news: '时光不负有心人，但愿别等闲'
			},
			{
				id: '9',
				userid : '9',
				imgUrl: 'a8.jpg',
				tip: 13,
				name: '时光',
				email: '154@qq.com',
				time: new Date(),
				news: '时光不负有心人，但愿别等闲'
			},
			{
				id: '10',
				userid : '10',
				imgUrl: 'a8.jpg',
				tip: 13,
				name: '时光',
				email: '154@qq.com',
				time: new Date(),
				news: '时光不负有心人，但愿别等闲'
			},
			{
				id: '11',
				userid : '11',
				imgUrl: 'a8.jpg',
				tip: 13,
				name: '时光',
				email: '154@qq.com',
				time: new Date(),
				news: '时光不负有心人，但愿别等闲'
			},
			{
				id: '12',
				userid : '12',
				imgUrl: 'a8.jpg',
				tip: 13,
				name: '时光',
				email: '154@qq.com',
				time: new Date(),
				news: '时光不在于你拥有什么， 而在于你如何去使用'
			},
			{
				id: '13',
				userid : '13',
				imgUrl: 'a8.jpg',
				tip: 13,
				name: '蛮王',
				email: '154@qq.com',
				time: new Date(),
				news: '我的大刀已经饥渴难耐了'
			}
		]
		return friendArr;
	},
	isFriend: function () {
		let isFriend = [
			{
				userid: '1',
				friend: '2'
			},
			{
				userid: '1',
				friend: '5'
			},
			{
				userid: '1',
				friend: '6'
			},
			{
				userid: '1',
				friend: '8'
			},
			{
				userid: '2',
				friend: '1'
			},
			{
				userid: '2',
				friend: '3'
			},
			{
				userid: '2',
				friend: '4'
			},
			{
				userid: '2',
				friend: '5'
			}
		]
		return isFriend;
	}
}