
import React from 'react'
import {BsArrowRight} from 'react-icons/bs'

const FOF = () => {
  return (
    <div style={{marginTop:'10%'}} className='d-flex justify-content-center align-items-center'>
        <div>
        <h2 style={{textAlign:'center', alignItems:'center'}}>404 Page Not Found</h2>
        <p style={{textAlign:'center',alignItems:'center'}}>The pages you requested does not exist</p>
        <center>
        <button style={{textAlign:'center', alignItems:'center'}}>CONTINUE SHOOPING &nbsp; <BsArrowRight/> 
        </button>
        </center>
        </div>
        
    </div>
  )
}

export default FOF