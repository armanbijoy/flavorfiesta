import CartContext from "./cart-context"; // Importing the CartContext to provide context data.
import { useReducer } from "react"; // Importing useReducer hook from React.

// Defining the initial state for the cart.
const defaultCartState = {
    items: [],
    totalAmount: 0
};

// Reducer function to handle different cart actions.
const cartReducer = (state, action) => {
    if (action.type === 'ADD') { // Handling the 'ADD' action type.
        // Updating the total amount based on the added item's price and amount.
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        // Finding the index of the existing item in the cart (if any).
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if (existingCartItem) { // If the item already exists in the cart.
            // Creating an updated item with the increased amount.
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem; // Updating the item in the array.
        } else {
            updatedItems = state.items.concat(action.item); // Adding the new item to the cart.
        }

        // Returning the updated state.
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'REMOVE') { // Handling the 'REMOVE' action type.
        // Finding the index of the item to be removed.
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        // Updating the total amount based on the removed item's price.
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        let updatedItems;

        if (existingCartItem.amount === 1) { // If only one item exists, remove it from the array.
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else { // If more than one item exists, decrease the amount by one.
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        // Returning the updated state.
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    
    // Returning the default state if no action types match.
    return defaultCartState;
};

// CartProvider component to provide cart context to its children.
const CartProvider = (props) => {
    // Using useReducer hook with the cartReducer and initial state.
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    // Function to dispatch the 'ADD' action.
    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        });
    };

    // Function to dispatch the 'REMOVE' action.
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        });
    };

    // Creating the context value with state and handler functions.
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    // Providing the context to child components.
    return (
        <CartContext.Provider value={cartContext}>
            {props.children} 
        </CartContext.Provider>
    );
};

export default CartProvider;
