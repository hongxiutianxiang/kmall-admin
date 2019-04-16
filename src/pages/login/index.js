/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:54:27
*/

import React,{ Component } from 'react'
import axios from 'axios'
import {
  Form, Icon, Input, Button, Checkbox,message
} from 'antd';


import './index.css'

class NormalLoginForm extends Component {
  constructor(props){
  	super(props);
  	this.handleSubmit = this.handleSubmit.bind(this)
  }	
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios({
          method:'post',
          url:'http://127.0.0.1:3000/admin/login',
          data:values
        })
        .then(result=>{
          if(result.data.code == 0){ //登陆成功
            //跳转到后台首页
            window.location.href = '/'
          }else if(result.data.code == 1){
            message.error(result.data.message)
          }
        })
        .catch(err=>{
          console.log(err)
          message.err('网络请求失败，请稍后再试')
        })
        //.finally()
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    <div className="Login">	
      <Form className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入账号' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.handleSubmit}  className="login-form-button">
           登陆
          </Button>
        </Form.Item>
      </Form>
    </div>  
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm