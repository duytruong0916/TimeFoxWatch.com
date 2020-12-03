import React from 'react';

const Layout =({title= 'Title', description='Description', className, children})=>{

    return(
     
            <div className={className}>{children}</div>
    
    )
}

export default Layout;