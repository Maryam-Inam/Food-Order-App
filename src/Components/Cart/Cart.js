import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import React, { useContext, useState } from "react";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem/CartItem";
import Checkout from "./Checkout";
import axios from "axios";

const Cart = (props) => {
  const [isCheckout, setCheckout] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [didSubmit, setSubmit] = useState(false);
  const ctx = useContext(CartContext);
  const onRemoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const onAddHandler = (item) => {
    ctx.addItem(item);
  };
  console.log("items of cart", ctx.items);
  const orderHandler = (event) => {
    setCheckout(true);
  };
  const postData = async (userData) => {
    await axios.post(
      "https://food-order-app-e4e92-default-rtdb.firebaseio.com/orders.json",
      JSON.stringify({
        user: userData,
        orderedItems: ctx.items,
      })
    );
  };
  const checkoutHandler = (userData) => {
    setSubmitting(true);
    postData(userData)
      .then((res) => {
        setSubmitting(false);
        setSubmit(true);
        ctx.clearCart();
      })
      .catch((err) => console.log(err));
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={onRemoveHandler.bind(null, item.id)}
          onAdd={onAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const actionButtons = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      <button className={classes.button} onClick={orderHandler}>
        Order
      </button>
    </div>
  );
  const modalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{ctx.totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={checkoutHandler} />
      )}
      {!isCheckout && actionButtons}
    </React.Fragment>
  );
  const isSubmittingContent = <p>Sending data</p>;
  const didSubmitContent = <p>Your data has been added to the cart</p>;
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && didSubmit && didSubmitContent}
    </Modal>
  );
};
export default Cart;
