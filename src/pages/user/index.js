

import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { Table,Breadcrumb  } from 'antd';
import moment from 'moment';

import { actionCreator } from './store'
import Layout from 'common/layout/index.js'


const dataSource = [{
  key: '1',
  username: 'admin',
  isAdmin: true,
  email: '1231@qq.com',
  phone:'18896352256',
  createdAt:'2019-04-17 19:34'
}];

const columns = [{
  title: '用户名',
  dataIndex: 'username',
  key: 'username',
}, {
  title: '是否是管理员',
  dataIndex: 'isAdmin',
  key: 'isAdmin',
  render:isAdmin=>isAdmin ? '是' : '否'
}, {
  title: '邮箱',
  dataIndex: 'email',
  key: 'email',
},{
  title: '电话',
  dataIndex: 'phone',
  key: 'phone',
},{
  title: '创建时间',
  dataIndex: 'createdAt',
  key: 'createdAt',
}];


class User extends Component {
  componentDidMount(){
    this.props.handlePage(1)
  }
  render(){
    const { list,current,pageSize,total,handlePage,isFetching } = this.props;
    const dataSource = list.map(user=>{
      return {
        key:user.get('_id'),
        username:user.get('username'),
        isAdmin:user.get('isAdmin'),
        email:user.get('email'),
        phone:user.get('phone'),
        createdAt:moment(user.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')      
      }
    }).toJS()
    return (
    	<div>
    		<Layout>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
            <Breadcrumb.Item>用户列表</Breadcrumb.Item>
          </Breadcrumb>
    			<Table
           dataSource={dataSource}
           columns={columns}
           pagination={{
              current:current,
              pageSize:pageSize,
              total:total
           }}
           onChange={(page)=>{
              handlePage(page.current)
           }}
           loading={{
              spinning:isFetching,
              tip:'正在加载数据'
           }}
          />
        </Layout>	
    	</div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    list:state.get('user').get('list'),
    current:state.get('user').get('current'),
    pageSize:state.get('user').get('pageSize'),
    total:state.get('user').get('total'),
    isFetching:state.get('user').get('isFetching'),
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    handlePage:(page)=>{
      const action = actionCreator.getPageAction(page)
      dispatch(action)
    }
  }
}




export default connect(mapStateToProps,mapDispatchToProps)(User)