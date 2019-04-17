

import React,{ Component } from 'react'

import {Layout, Menu, Icon,} from 'antd';

import AdminHeader from 'common/header/index.js'
import AdminSide from 'common/sider/index.js'


const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class AdminLayout extends Component{
  render(){
    return(
      <div className="AdminLayout">
          <Layout>
          
            <AdminHeader />
          
            <Layout>
              <AdminSide />
              <Layout style={{ padding: '0 24px 24px' }}>
              
                <Content style={{
                  background: '#fff', padding: 24, margin: 0, minHeight: 280,
                }}
                >
                  {this.props.children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
      </div>
    )
  }
}



export default AdminLayout


