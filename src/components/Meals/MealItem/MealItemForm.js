import { useRef, useState } from 'react'
import Input from '../../UI/Input'
import classes from '../MealItem/MealItemForm.module.css'

const MealItemForm = (props)=>{
    const [amountisValid, setAmountIsValid] = useState(true)
    const amountInputRef = useRef()

    const submitHandler = event =>{
        event.preventDefault()
        const eneteredAmount = amountInputRef.current.value
        const eneteredAmountNumber = +eneteredAmount

        if(eneteredAmount.trim().length ===0 || eneteredAmountNumber <1 || eneteredAmountNumber >5){
            setAmountIsValid(false)
            return
        }

        props.onAddtoCart(eneteredAmountNumber)
    }


    
    return(
        <form onSubmit={submitHandler} className={classes.form}>
            <Input
            ref={amountInputRef}
            label="Amount" input={{
                id:'amount',
                type:'number',
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'1'
            }}/>
            <button>+ Add</button>
            {!amountisValid && <p>Please enter a valid amount (1-5)</p>}
        </form>
    )
}

export default MealItemForm