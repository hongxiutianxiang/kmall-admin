

import React,{ Component } from 'react'

import {Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd';

import { getUserName,request,removeUserName } from 'util'
import { USER_LOGOUT } from 'api'
import './index.css'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class AdminHeader extends Component{
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout(){
    request({
      url:USER_LOGOUT
    })
    .then(result=>{
      //退出成功
      if(result.code==0){
        //清除本地储存信息
        removeUserName()
        //页面跳转到登陆页面
        window.location.href = '/login'
      }
    })
  }
  render(){
    const menu = (
      <Menu onClick={this.handleLogout}>
        <Menu.Item key="0">
         <Icon type="logout" />退出
        </Menu.Item>
      </Menu>
    ); 
    return(
      <div className="AdminHeader">
        <Header className="header">
          <div className="logo">KMALL</div>
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                {getUserName()} <Icon type="down" />
              </a>
            </Dropdown>
        </Header>
      </div>
    )
  }
}



export default AdminHeader


