
import React,{ Component,Fragment } from 'react'
import { BrowserRouter as Router,Route,Link,Redirect,Switch } from 'react-router-dom'

import Login from 'pages/login'  //index.js
import Home from 'pages/home'
import User from 'pages/user'
import Err from 'common/err'
import Category from 'pages/category'
import Product from 'pages/product'

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
						<LoginRoute path="/login" component={Login} />
						<ProtectRouter exact path="/" component={Home} />
						<ProtectRouter path="/user" component={User} />
						<ProtectRouter path="/category" component={Category} />
						<ProtectRouter path="/product" component={Product} />
						<Route component={Err} />
					</Switch>
				</div>
			</Router>
		)
	}
}


export default App;