import classes from "./MealItem.module.css";
import MealForm from "./MealForm";
import CartContext from "../../store/cart-context";
import { useContext } from "react";
const MealItem = (props) => {
  const ctx = useContext(CartContext);
  const addItemHandler = (amount) => {
    ctx.addItem({ amount: amount, ...props.meal });
  };
  return (
    <div className={classes.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={classes.description}>{props.meal.description}</div>
        <div className={classes.price}>{`$${props.meal.price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealForm id={props.meal.id} onAddItem={addItemHandler} />
      </div>
    </div>
  );
};
export default MealItem;
