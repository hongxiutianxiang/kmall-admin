

import React,{ Component } from 'react'
import { connect } from 'react-redux'
import {
  Form, Input,Breadcrumb,InputNumber, Select,
  Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';

const { Option } = Select;

import CategorySelector from './category-selector.js'
import UploadImage from 'common/upload-image'
import RichEditor from 'common/rich-editor'


import { actionCreator } from './store'
import { UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAIL_IMAGE } from 'api'

import Layout from 'common/layout'



class ProductSave extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.handleSave(values)
          }
        });
    }        
    render(){
        const { getFieldDecorator } = this.props.form;
        const { 
            handleCategoryId,
            handleImages, 
            handleDetail,
          } = this.props;
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
        	<div className="ProductSave">
        		<Layout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                        <Breadcrumb.Item>添加商品</Breadcrumb.Item>
                    </Breadcrumb>
                    <Form {...formItemLayout}>
                        <Form.Item label="商品名称">
                          {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入商品名称!' }],
                          })(
                            <Input placeholder="商品名称" />
                          )}
                        </Form.Item>

                        <Form.Item label="商品描述">
                          {getFieldDecorator('description', {
                            rules: [{ required: true, message: '请输入商品描述!' }],
                          })(
                            <Input placeholder="商品描述" />
                          )}
                        </Form.Item>  

                        <Form.Item label="商品分类">
                          <CategorySelector getCategoryId={(pid,id)=>{
                            handleCategoryId(pid,id)
                          }} />
                        </Form.Item>

                        <Form.Item label="商品价格">
                          {getFieldDecorator('price', {
                            rules: [{ required: true, message: '请输入商品价格!' }],
                          })(
                            <InputNumber />
                          )}
                        </Form.Item>  

                        <Form.Item label="商品库存">
                          {getFieldDecorator('stock', {
                            rules: [{ required: true, message: '请输入商品库存!' }],
                          })(
                            <InputNumber />
                          )}
                        </Form.Item>

                        <Form.Item label="商品图片">
                          <UploadImage
                            action={UPLOAD_PRODUCT_IMAGE}
                            max={3}
                            getFileList={(fileList)=>{
                              handleImages(fileList)
                            }}
                          />
                        </Form.Item>

                        <Form.Item label="商品描述">
                          <RichEditor 
                            url={UPLOAD_PRODUCT_DETAIL_IMAGE}
                            getRichEditorValue={(value)=>{
                              handleDetail(value)
                            }}
                          />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                          <Button 
                            type="primary"
                            onClick={this.handleSubmit}
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
const WrappedProductSave = Form.create()(ProductSave);

const mapStateToProps = (state)=>{
    return {  
     
     }
}

const mapDispatchToProps = (dispatch)=>{
    return {
      handleCategoryId:(pid,id)=>{
        const action = actionCreator.getSetCategoryAction(pid,id);
        dispatch(action)
      },
      handleImages:(fileList)=>{
        const action = actionCreator.getSetImagesAction(fileList);
        dispatch(action)
      },
      handleDetail:(value)=>{
        const action = actionCreator.getSetDetailAction(value);
        dispatch(action)
      },
      handleSave:(values)=>{
        const action = actionCreator.getSaveAction(values);
        dispatch(action)
      },

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(WrappedProductSave)