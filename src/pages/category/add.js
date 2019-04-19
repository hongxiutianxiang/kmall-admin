

import React,{ Component } from 'react'
import { connect } from 'react-redux'

import {
  Form, Input,Breadcrumb, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';



const { Option } = Select;

import { actionCreator } from './store'
import Layout from 'common/layout/index.js'




class CategoryAdd extends Component {

  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
  
    return (
    	<div>
    		<Layout>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
            <Breadcrumb.Item>添加分类</Breadcrumb.Item>
          </Breadcrumb>
          <Form {...formItemLayout}>
            <Form.Item label='分类名称'>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入分类名称' }],
              })(
                <Input placeholder="分类名称" style={{width:300}} />
              )}
            </Form.Item>
            <Form.Item label='父级分类'>
              {getFieldDecorator('pid', {
                rules: [{ required: true, message: '请选择父级分类' }],
              })(
                <Select style={{ width: 300 }}>
                  <Option value="0">根分类</Option>
                </Select>                
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button 
                type="primary" 
              >
               提交
              </Button>
            </Form.Item>
          </Form>
        </Layout>	
    	</div>
    )
  }
}


const WrappedCategoryAdd = Form.create()(CategoryAdd)
export default WrappedCategoryAdd
