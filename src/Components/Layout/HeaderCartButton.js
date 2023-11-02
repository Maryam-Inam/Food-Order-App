import { Fragment } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import Cart from "../Cart/Cart";
import { useState, useContext } from "react";
import CartContext from "../store/cart-context";
const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const numberOfCartItems = ctx.items.length;
  const [cartIsShown, setCartShown] = useState(false);
  const openCartHandler = () => {
    setCartShown(true);
  };
  const closeCartHandler = () => {
    setCartShown(false);
  };
  return (
    <Fragment>
      {cartIsShown && <Cart onClose={closeCartHandler} />}
      <button className={classes.button} onClick={openCartHandler}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>My Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    </Fragment>
  );
};
export default HeaderCartButton;
