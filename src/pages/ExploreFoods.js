import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { randomFoods } from '../services/MealsAPI';

const ExploreFoods = () => {
  const history = useHistory();
  const [foodRandom, setfoodRandom] = useState([]);

  const fetchFood = async () => {
    const { meals } = await randomFoods();
    setfoodRandom(meals);
    console.log(meals);
  };

  useEffect(() => {
    fetchFood();
  }, []);

  return (

    <div>
      <Header title="Explore Foods" />
      <section className="buttons_profile">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient

        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality

        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={
            () => history.push(`/foods/${foodRandom[0].idMeal}`)
          }
        >
          Surprise me!

        </button>
      </section>
      <Footer />
    </div>
  );
};
export default ExploreFoods;
