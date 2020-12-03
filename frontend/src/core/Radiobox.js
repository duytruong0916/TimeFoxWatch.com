
import React, { useState, useEffect, Fragment } from 'react';
const Radiobox =({prices, handleFilter})=>{
    const [values, setValue] =  useState(0)
    const handleChange =(e)=>{
        handleFilter(e.target.value);
        setValue(e.target.value);
    }
    return prices.map((c,i)=>(
        <div key={i}>
            <input 
                    type='radio' 
                    className='form-check-input' 
                    onChange={handleChange}
                    name={c}
                    value ={`${c._id}`}/>
            <label className='form-check-label ml-3 '>{c.name}</label>
        </div>
    ));
}

export default Radiobox;