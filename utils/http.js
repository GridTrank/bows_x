let url='http://ec2-52-76-78-186.ap-southeast-1.compute.amazonaws.com/api/1.2/web/module_event_bows/getmerchantlist.php?key=f39eb57fdcde5a4daa9c077dae08b933fe4370c7'


let baseUrl = 'https://sxb2bmallapi.loveinway.com/customer-api/';

export default baseUrl;
export const request = (url,data,method,cacheName,time)=>{
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			data:data,
			header:{
				'token':uni.getStorageSync('token') || '',
                // 'content-type':'application/x-www-form-urlencoded'
			},
			method: method || 'GET',
			success: (res) => {
				console.log(111,res)
				uni.hideLoading()
				if (Number(res.data.code) == 200) {
					resolve(res.data)
				} else if (Number(res.data.code) === 10021 || Number(res.data.code) === 10020) {
					uni.showToast({
						title: '登录过期，请重新登录',
						icon: 'none'
					})
					uni.clearStorageSync()
					// setTimeout(() => {
					// 	uni.navigateTo({
					// 		url: '/pages/Login/Login'
					// 	})
					// }, 1500)
					reject(res.data)
				} else {
					uni.showToast({
						title: res.data.msg || '请求失败',
						icon: 'none'
					})
					reject(res.data)
				}
			},
			fail: function(err) {
				uni.hideLoading()
				reject(err)
			}
		})

	})
}
