

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
      leveTwoId:'',
      isChanged:false,
      needLoadLvelTwo:false,
    }
    this.handleLevelOneChange = this.handleLevelOneChange.bind(this)
    this.handleLevelTwoChange = this.handleLevelTwoChange.bind(this)
    
  }
  componentDidMount(){
    this.loadLevelOneCategories();
  }
  static getDerivedStateFromProps(props,state){
    const { parentCategoryId,categoryId } = props;
    const leveOneIdChanged = parentCategoryId != state.leveOneId;
    const leveTwoIdChanged = categoryId != state.leveTwoId;

    //新增商品时，不更新state
    if(state.leveOneId && !parentCategoryId && !categoryId){
      return null;
    }

    //分类Id没有改变，不更新state
    if(!leveOneIdChanged && !leveTwoIdChanged){
      return null;
    }
    if(state.isChanged){
      return null;
    }

    //更新state
    if(parentCategoryId == 0){
      return{
        leveOneId:categoryId,
        leveTwoId:'',
        isChanged:true,
      }
    }else{
      return{
        leveOneId:parentCategoryId,
        leveTwoId:categoryId,
        isChanged:true,
        needLoadLvelTwo:true,
      }
    }

    return null;
  }
  componentDidUpdate(){
    if(this.state.needLoadLvelTwo){
      this.loadLevelTowCategories();
      this.setState(()=>({needLoadLvelTwo:false}))
    }
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
    const { disabled } = this.props;
    const levelOneOptions = levelOneCategories.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
    const levelTwoOptions = levelTwoCategories.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
    return (
    	<div className="CategorySelector">
    	   <Select 
          style={{width:200,marginRight:10}}
          onChange={this.handleLevelOneChange}
          value={leveOneId}
          disabled={disabled}
        >
            {levelOneOptions}
         </Select>
         {
          levelTwoOptions.length
          ? <Select 
                style={{width:200}}
                onChange={this.handleLevelTwoChange}
                value={leveTwoId}
                disabled={disabled}
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