import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import axios from "axios";
import { useEffect, useState } from "react";
const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const loadedMeals = [];
  const doGetRequest = async () => {
    let res = await axios.get(
      "https://food-order-app-e4e92-default-rtdb.firebaseio.com/.json"
    );

    let data = res.data.meals;
    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }
    setMeals(loadedMeals);
    setLoading(false);
  };
  useEffect(() => {
    doGetRequest().catch((err) => {
      setLoading(false);
      setHttpError(err.message);
    });
  }, []);
  if (isLoading) {
    return <p className={classes.mealsLoading}>Loading...</p>;
  }
  if (httpError) {
    return <p className={classes.requestError}>{httpError}</p>;
  }
  return (
    <Card className={classes.meals}>
      <ul>
        {meals.map((meal) => {
          return (
            <li key={meal.id}>
              <MealItem meal={meal} />
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
export default AvailableMeals;
