
import axios from 'axios'

export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		const params = {
          method:options.method || 'get',
          url:options.url ||'',
          data:options.data	|| '',
          withCredentials:true,		
		}
		axios(params)
		.then(result=>{
			const data = result.data;
			if(data.code == 10){//没有权限
				//移出前端的登陆信息
				removeUserName();
				//跳转到登陆页面
				window.location.href = '/login'
				reject('没有权限')
			}else{
				resolve(result.data)
			}
		})
		.catch(err=>{
			reject(err)
		})
		
	})
}


export const setUserName = (username)=>{
	window.localStorage.setItem('username',username)
}
export const getUserName = ()=>{
	return window.localStorage.getItem('username')
}
export const removeUserName = ()=>{
	window.localStorage.removeItem('username')
}


