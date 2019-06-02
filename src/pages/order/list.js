

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, Button, Table, InputNumber, Divider,Modal,Input } from 'antd'
import { Link } from "react-router-dom"
import { actionCreator } from './store'
import Layout from 'common/layout'


class OrderList extends Component {


    componentDidMount() {
        this.props.handlePage(1);
    }
    render() {
        const { 
            list, 
            current, 
            pageSize, 
            total, 
            handlePage, 
            isPageFetching,
            handleUpdateOrder,
     
        } = this.props;
        const dataSource = list.map(order => {
            return {
                key: order.get('_id'),
                id: order.get('_id'),
                name: order.get('name'),
                order: order.get('order'),
                state:order.get('state')
            }
        }).toJS()
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '排序',
            dataIndex: 'order',
            key: 'order',
            render: (order,record) => <InputNumber 
                    defaultValue={order} 
                    onBlur={(ev)=>{
                        console.log('ff')
                        handleUpdateOrder(record.id,ev.target.value)
                    }}
                />
        },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (order, record) => (
                <span>
                  <Link to={"/order/detail/"+record.id} >查看详情</Link>  
                  <Divider type="vertical" />
                  <Link to={"/order/save/"+record.id} >修改</Link>
                </span>
            ),
        }];
        return (
            <div className="OrderList">
            <Layout>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                <Breadcrumb.Item>商品列表</Breadcrumb.Item>
              </Breadcrumb>
              <div className="clearfix">
                <Link style={{float:'right'}} to="/order/save">
                    <Button  type="primary" >添加商品</Button>
                </Link>
              </div>
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
                        spinning:isPageFetching,
                        tip:'正在加载数据'
                    }}
                />                     
            </Layout>
          </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        list: state.get('order').get('list'),
        current: state.get('order').get('current'),
        pageSize: state.get('order').get('pageSize'),
        total: state.get('order').get('total'),
        isPageFetching: state.get('order').get('isPageFetching'),
    }
}

const mapDispatchToProps = (dispath) => {
    return {
        handlePage: (page) => {
            const action = actionCreator.getPageAction(page)
            dispath(action)
        },
        handleUpdateOrder:(id,newOrder)=>{
            const action = actionCreator.getUpdateOrderAction(id,newOrder)
            dispath(action)            
        },
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)