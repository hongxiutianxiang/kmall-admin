

import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { Card, Col, Row } from 'antd';

import Layout from 'common/layout/index.js'

import './index.css'

class Home extends Component {
  render(){
    return (
    	<div>
    		<Layout>
			    <Row gutter={16}>
			      <Col span={8}>
			        <Card title="用户数量" bordered={false}>455</Card>
			      </Col>
			      <Col span={8}>
			        <Card title="商品数据" bordered={false}>545</Card>
			      </Col>
			      <Col span={8}>
			        <Card title="订单数量" bordered={false}>230</Card>
			      </Col>
			    </Row>
           </Layout>		
    	</div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    
    
  }
}




export default connect(mapStateToProps,mapDispatchToProps)(Home)