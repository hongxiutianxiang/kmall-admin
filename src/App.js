
import React,{ Component,Fragment } from 'react'
import { BrowserRouter as Router,Route,Link,Redirect,Switch } from 'react-router-dom'

import Login from 'pages/login'  //index.js
import Home from 'pages/home'
import User from 'pages/user'
import Err from 'common/err'

import { getUserName } from 'util'

import './App.css'



class App extends Component{
	
	render(){
		const ProtectRouter = ({component:Component,...rest})=>(
			<Route
				{...rest}
				render={(props)=>{
					return getUserName()
					? <Component {...props} />
					: <Redirect to='/login' />
				}}
			/>
		)
		const LoginRoute = ({component:Component,...rest})=>{
			return getUserName()
			? <Redirect to='/' />
			: <Component {...rest} />
		}

		return( 	
			<Router>
				<div className="App">
					<Switch>
						<ProtectRouter exact path="/" component={Home} />
						<LoginRoute path="/login" component={Login} />
						<ProtectRouter path="/user" component={User} />
						<Route component={Err} />
					</Switch>
				</div>
			</Router>
		)
	}
}


export default App;