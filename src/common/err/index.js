
import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import { Alert } from 'antd';

import './index.css'

class Err extends Component {
  render(){
    return (
    	<div className="Err">
		    <Alert
		      message="好像走丢了"
		      description="This is an error message about missing."
		      type="error"
		      showIcon
		    />
		    <Link to="/">返回首页</Link>
    	</div>
    )
  }
}


export default Err