

import React,{ Component } from 'react'
import { connect } from 'react-redux'

//1.引入login相关的action
import { actionCreator } from './store'

import axios from 'axios'
import {
  Form, Icon, Input, Button,message
} from 'antd';


import './index.css'

class NormalLoginForm extends Component {
  constructor(props){
  	super(props);
  	this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      isFetching:false
    }
  }	
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleLogin(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    <div className="Login">	
      <Form className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入账号' },{pattern:/^[a-z0-9_]{3,6}$/, message: '用户名为3-6位数字字母下划线' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' },{pattern:/^\w{3,6}$/, message: '密码为3-6位字符' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            onClick={this.handleSubmit}  
            className="login-form-button"
            loading={this.props.isFetching}
          >
           登陆
          </Button>
        </Form.Item>
      </Form>
    </div>  
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    isFetching:state.get('login').get('isFetching')
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    handleLogin:(values)=>{
      //1.派发登陆的action
      //2.其实这个登陆的action是一个能够发送ajax请求的函数
      //3.dispatch能够派发函数是因为引用了redux-thunk
      const action = actionCreator.getLoginAction(values);
      dispatch(action)
    }
  }
}


const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default connect(mapStateToProps,mapDispatchToProps) (WrappedNormalLoginForm)