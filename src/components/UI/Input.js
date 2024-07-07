import classes from '../UI/Input.module.css'
import React from 'react'
const Input = React.forwardRef((props, ref)=>{
   return(
    <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} id={props.id} {...props.input}/>
    </div>
   )
})

export default Input