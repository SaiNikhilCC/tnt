import React, { createContext, useState } from 'react'
export const Usercontext = createContext()
const Context = (props) => {
    const [image,setimage]=useState('')
    const [finalprice,setfinalprice]=useState()
  return (
    <div>
    <Usercontext.Provider value={{
         image,setimage,finalprice,setfinalprice
    }}>
    {props.children}
    </Usercontext.Provider>
    </div>
  )
}

export default Context
