import classes from "./MealForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";
const MealForm = (props) => {
  const [isValid, setIsValid] = useState(true);
  const input_amount_ref = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const inputAmount = input_amount_ref.current.value;
    if (
      inputAmount.trim().length === 0 ||
      +inputAmount < 1 ||
      +inputAmount > 5
    ) {
      setIsValid(false);
      return;
    }
    props.onAddItem(+inputAmount);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={input_amount_ref}
        label="Amount"
        input={{
          id: "amount" + props.id,
          min: 1,
          max: "5",
          type: "number",
          defaultValue: "1",
        }}
      />
      <button type="submit">+Add</button>
      {!isValid && <p>Please enter value between (1-5)</p>}
    </form>
  );
};
export default MealForm;
