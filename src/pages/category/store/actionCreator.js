
import * as types from './actionTypes.js'
import { message } from 'antd'
import { request } from 'util'
import { GET_USERS,ADD_CATEGORY,GET_CATEGORIES,UPDATE_CATEGORY_NAME } from 'api'

const getPageRequestAction = ()=>{
	return {
		type:types.PAGE_REQUEST
	}
}
const getPageDoneAction = ()=>{
	return {
		type:types.PAGE_DONE
	}
}
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
const setPageAction = (payload)=>{
	return {
		type:types.SET_PAGE,
		payload
	}
}
const setLeaveOneCategoriesAction = (payload)=>{
	return {
		type:types.SET_LEAVE_ONE_CATEGORIES,
		payload
	}
}

export const getPageAction = (pid,page)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction())
		request({
			url:GET_CATEGORIES,
			data:{
				page:page,
				pid:pid
			}
		})
		.then(result=>{
			if(result.code == 0){
				dispatch(setPageAction(result.data))
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			dispatch(getPageDoneAction())
		})
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
export const getShowUpdateNameModel = (updateId,updateName)=>{
	return {
		type:types.SHOW_UPDATE_NAME_MODEL,
		payload:{updateId,updateName}
	}
}

export const getCloseUpdateNameModel = ()=>{
	return {
		type:types.CLOSE_UPDATE_NAME_MODEL
	}
}
export const getUpdateNameChangeAction = (payload)=>{
	return {
		type:types.UPDATE_NAME_CHANGE,
		payload
	}
}

export const getUpdateNameAction = (pid)=>{
	return (dispatch,getState)=>{
		const state = getState().get('category');
		request({
			method:'put',
			url:UPDATE_CATEGORY_NAME,
			data:{
				pid:pid,
				id:state.get('updateId'),
				name:state.get('updateName'),
				page:state.get('current'),
			}
		})
		.then(result=>{
			if(result.code == 0){
				message.success('更新名称成功')	
				dispatch(getCloseUpdateNameModel())
				dispatch(setPageAction(result.data))
			}
		})
	}
}

