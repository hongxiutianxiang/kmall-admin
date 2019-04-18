

import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { Table,Breadcrumb  } from 'antd';
import { Route,Switch } from 'react-router-dom'

import { actionCreator } from './store'
import Layout from 'common/layout/index.js'
import CategoryAdd from './add.js'
import CategoryList from './list.js'


class Category extends Component {
  render(){
     return (
      <Switch>
        
        <Route path="/category/add" component={CategoryAdd} />
        <Route path="/category" component={CategoryList} />
      </Switch>
    )
  }
}






export default Category