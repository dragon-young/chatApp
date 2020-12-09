export default {
	dateTime: function (date) {
		let oldTime = new Date(date)
		// 旧的时间的年， 月， 日
		let Y = oldTime.getFullYear()
		let M = oldTime.getMonth() + 1
		/**
		 * getDate() 从 Date 对象返回一个月中的某一天 (1 ~ 31)
		 * getDay() 从 Date 对象返回一周中的某一天 (0 ~ 6)
		 */
		let D = oldTime.getDate()
		// getTime() 返回 1970 年 1 月 1 日至今的毫秒数
		let d = oldTime.getTime()
		// 旧的时间的时， 分
		let h = oldTime.getHours()
		let m = oldTime.getMinutes()
		// 获取当前时间
		let now = new Date()
		let nd = now.getTime()
		let nh = now.getHours()
		let nm = now.getMinutes()
		let nY = now.getFullYear()
		let nM = now.getMonth() + 1
		let nD = now.getDate()
		
		// 当前时间的处理
		if (M === nM && Y === nY && D === nD) {
			if (h < 10) h = '0' + h
			if (m < 10) m = '0' + m
			return h + ':' + m
		} else if (M === nM && Y === nY && D + 1 === nD) {
			// 昨天时间处理
			if (h < 10) h = '0' + h
			if (m < 10) m = '0' + m
			return '昨天' + h + ':' + m
		} else {
			return Y + '/' + 'M' + 'D'
		} 
		
		
	} 
}