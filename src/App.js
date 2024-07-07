import React from "react";
import {  useState } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {

  const [cartIsShown, setCartIsShown] = useState(false)

  const showCartHandler= ()=>{
    setCartIsShown(true)
  }

  const handCartHandler = ()=>{
    setCartIsShown(false)
  }
  return (
     <CartProvider>
      {cartIsShown && <Cart onClose={handCartHandler} />}
      
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
      </CartProvider>
  );
}

export default App;
