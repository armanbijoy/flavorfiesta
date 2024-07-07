
import CartContext from "./cart-context"
import { useReducer } from "react"

const defaultCartState ={
    items:[],
    totalAmount:0
}

const cartReducer = (state, action)=>{
    if(action.type==='ADD'){
        const updatedItems = state.items.concat(action.item)
        const updatedTotalAmount = state.totalAmount + action.price * action.amount
        
        return {
            items:updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState
}




const CartProvider = (props)=>{
    const[cartState, dispatchCartAction] =  useReducer(cartReducer, defaultCartState)


    const addItemTocartHandler  =item =>{
        dispatchCartAction({
            type:'ADD',
            item:item
        })
        
    }



    const removeItemFromCartHandler = id=>{
        dispatchCartAction({
            type:'Remove',
            id:id
        })

    }

    const cartContext = {
        items: cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemTocartHandler,
        removeItem: removeItemFromCartHandler
    }
    return <CartContext.Provider value={
        cartContext
    }>
        {props.children} 
    </CartContext.Provider>
}

export default CartProvider