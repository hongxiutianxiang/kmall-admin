

import React,{ Component } from 'react'
import { Select } from 'antd';

import { request } from 'util'
import { GET_CATEGORIES } from 'api'

const Option = Select.Option;
 

class CategorySelector extends Component {
  constructor(props){
    super(props);
    this.state={
      levelOneCategories:[],
      leveOneId:'',
      levelTwoCategories:[],
      leveTwoId:''
    }
    this.handleLevelOneChange = this.handleLevelOneChange.bind(this)
    this.handleLevelTwoChange = this.handleLevelTwoChange.bind(this)
    
  }
  componentDidMount(){
    this.loadLevelOneCategories();
  }
  loadLevelOneCategories(){
    request({
      url:GET_CATEGORIES,
      data:{
        pid:0
      }
    })
    .then(result=>{
      if(result.code == 0){
        this.setState(()=>({levelOneCategories:result.data}))
      }
    })
  }
  handleLevelOneChange(value){
    this.setState(()=>({leveOneId:value,leveTwoId:''}),()=>{
      this.loadLevelTowCategories()
      this.onValueChange()
    })
  }
  loadLevelTowCategories(){
    request({
      url:GET_CATEGORIES,
      data:{
        pid:this.state.leveOneId
      }
    })
    .then(result=>{
      if(result.code == 0){
        this.setState(()=>({levelTwoCategories:result.data}))
      }
    })
  }
  handleLevelTwoChange(value){
    this.setState(()=>({leveTwoId:value}),()=>{
      this.onValueChange()
    })
  }
  onValueChange(){
    const { getCategoryId } = this.props
    const { leveOneId,leveTwoId } = this.state
    if(leveTwoId){
      getCategoryId(leveOneId,leveTwoId)
    }else{
      getCategoryId(0,leveOneId)
    }
    
  }
  render(){
    const { levelOneCategories,levelTwoCategories,leveOneId,leveTwoId } = this.state;
    const levelOneOptions = levelOneCategories.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
    const levelTwoOptions = levelTwoCategories.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
    return (
    	<div className="CategorySelector">
    	   <Select 
          style={{width:200,marginRight:10}}
          onChange={this.handleLevelOneChange}
          value={leveOneId}
        >
            {levelOneOptions}
         </Select>
         {
          levelTwoOptions.length
          ? <Select 
                style={{width:200}}
                onChange={this.handleLevelTwoChange}
                value={leveTwoId}
            >
                {levelTwoOptions}
            </Select>
          : null
         }
        
    	</div>
    )
  }
}






export default CategorySelector