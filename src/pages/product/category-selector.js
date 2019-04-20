

import React,{ Component } from 'react'
import { Select } from 'antd';

const Option = Select.Option;
 

class CategorySelector extends Component {
  constructor(props){
    super(props);
    this.state={
      levelOneCategories:[]
    }
  }
  render(){
    const { levelOneCategories } = this.state;
    const levelOneOptions = levelOneCategories.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
    return (
    	<div className="CategorySelector">
    	   <Select style={{width:200,marginRight:10}}>
            {levelOneOptions}
         </Select>
         <Select style={{width:200}}></Select>
    	</div>
    )
  }
}






export default CategorySelector