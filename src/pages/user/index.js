

import React,{ Component } from 'react'
import { Table, Divider, Tag } from 'antd';

import Layout from 'common/layout/index.js'

import './index.css'

const dataSource = [{
  key: '1',
  username: 'admin',
  isAdmin: 'true',
  email: '1231@qq.com',
  date:'2019-04-17 19:34'
}, {
  key: '1',
  username: 'admin2',
  isAdmin: 'true',
  email: '546123@qq.com',
  date:'2019-04-17 19:34'
}];

const columns = [{
  title: '用户名',
  dataIndex: 'username',
  key: 'username',
}, {
  title: '是否是管理员',
  dataIndex: 'isAdmin',
  key: 'isAdmin',
}, {
  title: '邮箱',
  dataIndex: 'email',
  key: 'email',
},{
  title: '创建时间',
  dataIndex: 'date',
  key: 'date',
}];


class User extends Component {
  render(){
    return (
    	<div>
    		<Layout>
    			<Table dataSource={dataSource} columns={columns} />
           </Layout>	
    	</div>
    )
  }
}


export default User