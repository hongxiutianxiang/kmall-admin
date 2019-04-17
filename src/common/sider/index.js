

import React,{ Component } from 'react'
import { NavLink } from 'react-router-dom'
import {Layout, Menu, Breadcrumb, Icon} from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

import './index.css'

class AdminSide extends Component {
  render(){
    return (
    	<div className='AdminSide'>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              style={{ minHeight: 880, borderRight: 0 }}
            >
	            <Menu.Item key="1">
	            	<NavLink exact to='/'>首页</NavLink>
	            </Menu.Item>
	            <Menu.Item key="2">
	            	<NavLink to='user'>用户管理</NavLink>
	            </Menu.Item>
              <Menu.Item key="2">
                <NavLink to='aaa'>商品管理</NavLink>
              </Menu.Item>
            </Menu>
          </Sider>		
    	</div>
    )
  }
}


export default AdminSide