import CartContext from '../../store/cart-context'; // Importing the CartContext to use the context data.
import Modal from '../UI/Modal'; // Importing a Modal component for the cart display.
import classes from './Cart.module.css'; // Importing CSS module for styling.
import { useContext } from 'react'; // Importing useContext hook from React.
import CartItem from './CartItem'; // Importing CartItem component to display individual items in the cart.

const Cart = (props) => {
  // Using the useContext hook to get access to the CartContext data and methods.
  const cartCtx = useContext(CartContext);
  
  console.log('Total amount::', cartCtx); // Logging the cart context data to the console for debugging.

  // Formatting the total amount to include a dollar sign.
  const totalAmount = `$${cartCtx.totalAmount}`;

  // Checking if the cart has any items.
  const hasItems = cartCtx.items.length > 0;

  // Handler function to remove an item from the cart by its ID.
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // Handler function to add an item to the cart.
  const cartItemAddHandler = item => {
    cartCtx.addItem(item);
  };

  // Generating the list of cart items to be displayed.
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        // Using the CartItem component for each item, binding the remove and add handlers with the item ID or item itself.
        <li key={item.id}>
          <CartItem 
            key={item.id} 
            name={item.name} 
            amount={item.amount} 
            price={item.price} 
            onRemove={cartItemRemoveHandler.bind(null, item.id)} 
            onAdd={cartItemAddHandler.bind(null, item)} 
          />
        </li>
      ))}
    </ul>
  );

  return (
    // Rendering the Modal component and passing the onClose prop.
    <Modal onClose={props.onClose}>
      {cartItems} {/* Displaying the list of cart items. */}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span> {/* Displaying the total amount. */}
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes['button--alt']}>Close</button> {/* Close button to close the cart modal. */}
        {hasItems && <button className={classes.button}>Order</button>} {/* Order button, displayed only if there are items in the cart. */}
      </div>
    </Modal>
  );
};

export default Cart;
