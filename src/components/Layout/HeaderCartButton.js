import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
const HeaderCartButton = (props)=>{
    const cartCtx = useContext(CartContext)
    const numberofCartItems = cartCtx.items.reduce((curNumber, item)=>{
        return curNumber+ item.amount
    },0)
    return(
       
       <button onClick={props.onClick} className={classes.button}>
        <span  className={classes.icon}>
            <CartIcon/>
        </span>
        <span>
            Your Cart
        </span>
        <span  className={classes.badge}>
            {numberofCartItems}
        </span>
       </button>
    )

    
}
export default HeaderCartButton