
import * as types from './actionTypes.js'
import { message } from 'antd'
import { request } from 'util'
import { GET_USERS,ADD_CATEGORY,GET_CATEGORIES } from 'api'

const getAddRequestAction = ()=>{
	return {
		type:types.ADD_REQUEST
	}
}
const getAddDoneAction = ()=>{
	return {
		type:types.ADD_DONE
	}
}
const setLeaveOneCategoriesAction = (payload)=>{
	return {
		type:types.SET_LEAVE_ONE_CATEGORIES,
		payload
	}
}

export const getAddAction = (values)=>{
	return (dispatch)=>{
		dispatch(getAddRequestAction())
		request({
			method:'post',
			url:ADD_CATEGORY,
			data:values
		})
		.then(result=>{
			if(result.code == 0){
				if(result.data){
					dispatch(setLeaveOneCategoriesAction(result.data))
				}
				message.success('添加分类成功')
			}else if(result.code == 1){
				message.error(result.message)
			}
		})
		.catch(err=>{
			console.log(err)
			message.err('添加分类失败')
		})
		.finally(()=>{
			dispatch(getAddDoneAction())
		})
	}
}

export const getLeaveOneCategoriesAction = ()=>{
	return (dispatch)=>{
		request({
			url:GET_CATEGORIES,
			data:{
				pid:0
			}
		})
		.then(result=>{
			dispatch(setLeaveOneCategoriesAction(result.data))
		})
		.catch(err=>{
			console.log(err)
		})
	}
}

