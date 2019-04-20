

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
	            	<NavLink to='/user'>用户管理</NavLink>
	            </Menu.Item>
              <Menu.Item key="3">
                <NavLink to='/category'>分类管理</NavLink>
              </Menu.Item>
              <Menu.Item key="4">
                <NavLink to='/product'>商品管理</NavLink>
              </Menu.Item>
              <Menu.Item key="5">
                <NavLink to='ccc'>订单管理</NavLink>
              </Menu.Item>
            </Menu>
          </Sider>		
    	</div>
    )
  }
}


export default AdminSide