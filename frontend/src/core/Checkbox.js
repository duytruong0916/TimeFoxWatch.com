
import React, { useState, useEffect } from 'react';
const Checkbox =({categories, handleFilter})=>{
    const [checked, setChecked] = useState([]);

    const handleToggle = c => () =>{
        const currentCategoryID =  checked.indexOf(c);
        const newCheckedCategory = [...checked];
        if(currentCategoryID===-1){
            newCheckedCategory.push(c);
        }else{
            newCheckedCategory.splice(currentCategoryID,1);
        }
        setChecked(newCheckedCategory);
        handleFilter(newCheckedCategory);
    }
    return categories.map((c,i)=>(
        <li className ='list-unstyled' key={i}>
            <input 
                    type='checkbox' 
                    className='form-check-input' 
                    onChange={handleToggle(c._id)}
                    value ={checked.indexOf(c._id===-1)}/>
            <label className='form-check-label ml-3'>{c.name}</label>
        </li>
    ));
}

export default Checkbox;