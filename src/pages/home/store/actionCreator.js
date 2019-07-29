
import * as types from './actionTypes.js'
import { request } from 'util'
import { ADMIN_COUNT } from 'api'

const setCountAction = (payload)=>{
	return {
		type:types.SET_COUNT,
		payload
	}
}

export const getCountAction = ()=>{
	return (dispatch)=>{
		request({
			url:ADMIN_COUNT
		})
		.then(result=>{
			if(result.code == 0){
				const action = setCountAction(result.data)
				console.log('11',result)
				dispatch(action)				
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}


