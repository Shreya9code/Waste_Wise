import React from 'react'
import './input.css'
const Input = ({placeholder,required,onChange,value,type}) => {
  return (
    <input onChange={onChange}
     value={value}
     placeholder={placeholder}
     required={required}
     type={type}
     className='ui_input'
    />
  )
}

export default Input
