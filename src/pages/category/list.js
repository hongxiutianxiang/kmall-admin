

import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { Table,Breadcrumb  } from 'antd';
import { Link } from 'react-router-dom'

import { actionCreator } from './store'
import Layout from 'common/layout/index.js'




class CategoryAdd extends Component {
  render(){
  
    return (
    	<div>
    		<Layout>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>分类管理</Breadcrumb.Item>
            <Breadcrumb.Item>分类列表</Breadcrumb.Item>
          </Breadcrumb>
          <Link to="/category/add">添加分类</Link>
        </Layout>	
    	</div>
    )
  }
}





export default CategoryAdd