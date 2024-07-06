import { Fragment, useState } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {

  const [cartIsShown, setCartIsShown] = useState(false)

  const showCartHandler= ()=>{
    setCartIsShown(true)
  }

  const handCartHandler = ()=>{
    setCartIsShown(false)
  }
  return (
    <Fragment>
      {cartIsShown && <Cart onClose={handCartHandler} />}
      
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
