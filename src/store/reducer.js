
// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'
import { reducer as loginReducer  } from 'pages/login/store'
import { reducer as homeReducer  } from 'pages/home/store'
import { reducer as userReducer  } from 'pages/user/store'

export default combineReducers({
	// todolist:todolistReducer
	login:loginReducer,
	home:homeReducer,
	user:userReducer
})